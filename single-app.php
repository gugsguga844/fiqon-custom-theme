<?php
// Supondo que você esteja carregando um post específico
$post_id = get_the_ID();
$post_data = array(
  'title'   => get_the_title($post_id),
  'content' => apply_filters('the_content', get_the_content(null, false, $post_id)),
  'link'    => get_permalink($post_id),
);

// Pegar todos os campos ACF
$acf_fields = get_fields($post_id); // retorna array associativo

// Junta tudo em um só objeto/array que será jogado no JS
$wpData = array(
  'post' => $post_data,
  'acf'  => $acf_fields,
);

// Usa wp_localize_script ou wp_add_inline_script, dependendo da sua config
wp_localize_script('meu-react-app', 'wpData', $wpData);
?>

<?php get_header(); ?>
<div id="root"></div> <!-- React vai renderizar aqui -->
<?php get_footer(); ?>