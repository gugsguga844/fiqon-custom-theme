<?php

/**
 * Recommended way to include parent theme styles.
 * (Please see http://codex.wordpress.org/Child_Themes#How_to_Create_a_Child_Theme)
 *
 */

add_action('wp_enqueue_scripts', 'hello_elementor_child_style');
function hello_elementor_child_style()
{
  wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
  wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));
}

/**
 * Your code goes below.
 */

/** * Use GD instead of Imagick.
 */
function cb_child_use_gd_editor($array)
{
  return array('WP_Image_Editor_GD');
}
add_filter('wp_image_editors', 'cb_child_use_gd_editor');

//pesquisa
// Search filter function
function search_filter($query)
{
  if ($query->is_search) {
    $query->set('post_type', 'post');
  }
  return $query;
}
add_filter('pre_get_posts', 'search_filter');


function limit_search_results($query)
{
  if ($query->is_search && !is_admin()) {
    $query->set('posts_per_page', 9);
  }
  return $query;
}
add_filter('pre_get_posts', 'limit_search_results');

function registrar_meus_menus()
{
  register_nav_menus(array(
    'menu-principal' => __('Menu Principal', 'hello-elementor-child'),
  ));
}
add_action('init', 'registrar_meus_menus');



function hello_elementor_child_enqueue_assets()
{
  // Enfileira o CSS global para todas as páginas
  wp_enqueue_style(
    'hello-elementor-global-style',
    get_stylesheet_directory_uri() . '/assets/css/global.css',
    array(), // Sem dependências
    false, // Sem versão (evita cache)
    'all' // Para todos os dispositivos
  );

  if (is_singular('app')) {
    // Estilo para Single
    wp_enqueue_style(
      'hello-elementor-single-style',
      get_stylesheet_directory_uri() . '/assets/css/app.css'
    );

    // Script para Single
    wp_enqueue_script(
      'hello-elementor-single-script',
      get_stylesheet_directory_uri() . '/assets/js/index.js',
      array(),
      false,
      true // Carrega no rodapé
    );
  }

  // Estilo para Arquivo (Archive)
  wp_enqueue_style(
    'hello-elementor-archive-style',
    get_stylesheet_directory_uri() . '/assets/css/archive-apps.css',
    array(), // Sem dependências
    false, // Sem versão (evita cache)
    'all' // Para todos os dispositivos
  );
}
add_action('wp_enqueue_scripts', 'hello_elementor_child_enqueue_assets');

function enqueue_react_scripts() {
  wp_enqueue_script(
      'react-bundle',
      get_stylesheet_directory_uri() . '/dist/bundle.js',
      array(),
      '1.0.0',
      true
  );

  $data = array(
      'is_single'  => is_single(),
      'is_archive' => is_archive(),
      'post'       => array(),
      'posts'      => array(),
  );

  if ( is_single() ) {
      // Recupera o ID do post atual
      $post_id = get_the_ID();

      $data['post'] = array(
          'title'   => get_the_title( $post_id ),
          'content' => get_the_content( null, false, $post_id ),
          // ACF:
          'acf'     => get_fields( $post_id ), // <-- pega todos os campos do ACF
      );

  } elseif ( is_archive() ) {
      // Se quiser listar ACF do loop de posts, basta iterar e pegar cada post
      while ( have_posts() ) {
          the_post();
          $post_id = get_the_ID();

          $data['posts'][] = array(
              'title'   => get_the_title( $post_id ),
              'link'    => get_permalink( $post_id ),
              // ACF:
              'acf'     => get_fields( $post_id ),
          );
      }
  }

  wp_localize_script( 'react-bundle', 'wpData', $data );
}
add_action( 'wp_enqueue_scripts', 'enqueue_react_scripts' );


$actions_path = get_stylesheet_directory() . '/inc/app-actions-metabox.php';
if (file_exists($actions_path)) {
    require_once $actions_path;
}

$trigger_path = get_stylesheet_directory() . '/inc/app-trigger-metabox.php';
if (file_exists($trigger_path)) {
    require_once $trigger_path;
}









