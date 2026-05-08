<?php

/**
 * Plugin para adicionar um Metabox Personalizado para Gatilhos do App
 * e disponibilizar via API REST.
 */

// 🚀 Bloqueia acesso direto ao arquivo por segurança
if (!defined('ABSPATH')) {
    exit;
}

// 1️⃣ Criar o Meta Box no Admin
function add_app_trigger_metabox()
{
    add_meta_box(
        'app_trigger_box',
        'Gatilhos do App',
        'render_app_trigger_metabox',
        'app',
        'normal',
        'default'
    );
}
add_action('add_meta_boxes', 'add_app_trigger_metabox');

// 2️⃣ Exibir os Campos no Meta Box
function render_app_trigger_metabox($post)
{
    $triggers = get_post_meta($post->ID, 'app_trigger', true);
    if (!is_array($triggers)) {
        $triggers = [];
    }

    wp_nonce_field(basename(__FILE__), 'app_trigger_nonce');
?>
    <div id="app-trigger-container">
        <?php foreach ($triggers as $index => $trigger) : ?>
            <div class="app-trigger">
                <input type="text" class="trigger-title" name="app_trigger[<?php echo $index; ?>][title]" value="<?php echo esc_attr($trigger['title']); ?>" placeholder="Título">
                <textarea class="trigger-desc" name="app_trigger[<?php echo $index; ?>][description]" placeholder="Descrição"><?php echo esc_textarea($trigger['description']); ?></textarea>
                <button type="button" class="remove-trigger">✖</button>
            </div>
        <?php endforeach; ?>
    </div>
    <button type="button" id="add-trigger">➕ Adicionar Gatilho</button>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('add-trigger').addEventListener('click', function() {
                let container = document.getElementById('app-trigger-container');
                let index = Date.now(); // garante unicidade

                let div = document.createElement('div');
                div.className = 'app-trigger';
                div.innerHTML = `
                    <input type="text" class="trigger-title" name="app_trigger[${index}][title]" placeholder="Título">
                    <textarea class="trigger-desc" name="app_trigger[${index}][description]" placeholder="Descrição"></textarea>
                    <button type="button" class="remove-trigger">✖</button>
                `;
                container.appendChild(div);

                div.style.opacity = '0';
                setTimeout(() => {
                    div.style.opacity = '1';
                }, 100);
            });

            document.getElementById('app-trigger-container').addEventListener('click', function(e) {
                if (e.target.classList.contains('remove-trigger')) {
                    let div = e.target.parentElement;
                    div.style.opacity = '0';
                    setTimeout(() => {
                        div.remove();
                    }, 200);
                }
            });
        });
    </script>

    <style>
        #app-trigger-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .app-trigger {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f9f9f9;
            padding: 10px;
            border-radius: 8px;
            transition: opacity 0.2s ease-in-out;
        }

        .trigger-title,
        .trigger-desc {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
        }

        .trigger-title {
            flex: 1;
            min-width: 150px;
        }

        .trigger-desc {
            flex: 2;
            min-height: 40px;
            resize: vertical;
        }

        .remove-trigger {
            background: #ff4d4d;
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.2s;
        }

        .remove-trigger:hover {
            background: #cc0000;
        }

        #add-trigger {
            background: #0073e6;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            margin-top: 10px;
        }

        #add-trigger:hover {
            background: #005bb5;
        }
    </style>
<?php
}

// 3️⃣ Salvar os Dados com Segurança
function save_app_trigger($post_id)
{
    if (!isset($_POST['app_trigger_nonce']) || !wp_verify_nonce($_POST['app_trigger_nonce'], basename(__FILE__))) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['app_trigger']) && is_array($_POST['app_trigger'])) {
        $triggers = [];

        foreach ($_POST['app_trigger'] as $trigger) {
            if (!empty($trigger['title'])) {
                $triggers[] = [
                    'title'       => sanitize_text_field($trigger['title']),
                    'description' => sanitize_textarea_field($trigger['description'] ?? ''),
                ];
            }
        }

        update_post_meta($post_id, 'app_trigger', $triggers);
    } else {
        delete_post_meta($post_id, 'app_trigger');
    }
}
add_action('save_post', 'save_app_trigger');

// 4️⃣ Exibir os Dados na API REST
function register_app_trigger_rest_field()
{
    register_rest_field(
        'app',
        'app_trigger',
        array(
            'get_callback'    => 'get_app_trigger_meta',
            'update_callback' => 'update_app_trigger_meta',
            'schema'          => array(
                'description' => 'Lista de gatilhos do app',
                'type'        => 'array',
                'items'       => array(
                    'type'       => 'object',
                    'properties' => array(
                        'title'       => array('type' => 'string', 'description' => 'Título do gatilho'),
                        'description' => array('type' => 'string', 'description' => 'Descrição do gatilho'),
                    ),
                ),
            ),
        )
    );
}
add_action('rest_api_init', 'register_app_trigger_rest_field');

// 5️⃣ Buscar e Atualizar via API
function get_app_trigger_meta($object, $field_name, $request)
{
    $triggers = get_post_meta($object['id'], 'app_trigger', true);
    return is_array($triggers) ? array_values($triggers) : [];
}

function update_app_trigger_meta($value, $object)
{
    if (!is_array($value)) {
        return new WP_Error('invalid_data', 'O campo app_trigger deve ser um array', ['status' => 400]);
    }

    update_post_meta($object->ID, 'app_trigger', array_values($value));
}
