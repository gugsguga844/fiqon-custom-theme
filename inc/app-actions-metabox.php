<?php

/**
 * Plugin para adicionar um Metabox Personalizado para Ações do App
 * e disponibilizar via API REST.
 */

// 🚀 Bloqueia acesso direto ao arquivo por segurança
if (!defined('ABSPATH')) {
    exit;
}

// 1️⃣ Criar o Meta Box no Admin
function add_app_actions_metabox()
{
    add_meta_box(
        'app_actions_box',
        'Ações do App',
        'render_app_actions_metabox',
        'app',
        'normal',
        'default'
    );
}
add_action('add_meta_boxes', 'add_app_actions_metabox');

// 2️⃣ Exibir os Campos no Meta Box
function render_app_actions_metabox($post)
{
    $actions = get_post_meta($post->ID, 'app_actions', true);
    if (!is_array($actions)) {
        $actions = [];
    }

    wp_nonce_field(basename(__FILE__), 'app_actions_nonce');
?>
    <div id="app-actions-container">
        <?php foreach ($actions as $index => $action) : ?>
            <div class="app-action">
                <input type="text" class="action-title" name="app_actions[<?php echo $index; ?>][title]" value="<?php echo esc_attr($action['title']); ?>" placeholder="Título">
                <textarea class="action-desc" name="app_actions[<?php echo $index; ?>][description]" placeholder="Descrição"><?php echo esc_textarea($action['description']); ?></textarea>
                <button type="button" class="remove-action">✖</button>
            </div>
        <?php endforeach; ?>
    </div>
    <button type="button" id="add-action">➕ Adicionar Ação</button>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('add-action').addEventListener('click', function() {
                let container = document.getElementById('app-actions-container');
                let index = Date.now();

                let div = document.createElement('div');
                div.className = 'app-action';
                div.innerHTML = `
                <input type="text" class="action-title" name="app_actions[\${index}][title]" placeholder="Título">
                <textarea class="action-desc" name="app_actions[\${index}][description]" placeholder="Descrição"></textarea>
                <button type="button" class="remove-action">✖</button>
            `;
                container.appendChild(div);

                div.style.opacity = '0';
                setTimeout(() => {
                    div.style.opacity = '1';
                }, 100);
            });

            document.getElementById('app-actions-container').addEventListener('click', function(e) {
                if (e.target.classList.contains('remove-action')) {
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
        #app-actions-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .app-action {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f9f9f9;
            padding: 10px;
            border-radius: 8px;
            transition: opacity 0.2s ease-in-out;
        }

        .action-title,
        .action-desc {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
        }

        .action-title {
            flex: 1;
            min-width: 150px;
        }

        .action-desc {
            flex: 2;
            min-height: 40px;
            resize: vertical;
        }

        .remove-action {
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

        .remove-action:hover {
            background: #cc0000;
        }

        #add-action {
            background: #0073e6;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            margin-top: 10px;
        }

        #add-action:hover {
            background: #005bb5;
        }
    </style>
<?php
}

// 3️⃣ Salvar os Dados com Segurança
function save_app_actions($post_id)
{
    if (!isset($_POST['app_actions_nonce']) || !wp_verify_nonce($_POST['app_actions_nonce'], basename(__FILE__))) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['app_actions']) && is_array($_POST['app_actions'])) {
        $actions = [];

        foreach ($_POST['app_actions'] as $action) {
            if (!empty($action['title'])) {
                $actions[] = [
                    'title'       => sanitize_text_field($action['title']),
                    'description' => sanitize_textarea_field($action['description'] ?? ''),
                ];
            }
        }

        update_post_meta($post_id, 'app_actions', $actions);
    } else {
        delete_post_meta($post_id, 'app_actions');
    }
}
add_action('save_post', 'save_app_actions');

// 4️⃣ Exibir os Dados na API REST
function register_app_actions_rest_field()
{
    register_rest_field(
        'app',
        'app_actions',
        array(
            'get_callback'    => 'get_app_actions_meta',
            'update_callback' => 'update_app_actions_meta',
            'schema'          => array(
                'description' => 'Lista de ações do app',
                'type'        => 'array',
                'items'       => array(
                    'type'       => 'object',
                    'properties' => array(
                        'title' => array('type' => 'string', 'description' => 'Título do gatilho'),
                        'description' => array(
                            'type' => 'string',
                            'description' => 'Descrição do gatilho',
                            'default' => '', // <- permite vazio
                        ),
                    ),
                ),
            ),
        )
    );
}
add_action('rest_api_init', 'register_app_actions_rest_field');

// 5️⃣ Buscar e Atualizar via API
function get_app_actions_meta($object, $field_name, $request)
{
    $actions = get_post_meta($object['id'], 'app_actions', true);
    return is_array($actions) ? array_values($actions) : [];
}

function update_app_actions_meta($value, $object)
{
    if (!is_array($value)) {
        return new WP_Error('invalid_data', 'O campo app_actions deve ser um array', ['status' => 400]);
    }

    update_post_meta($object->ID, 'app_actions', array_values($value));
}
