<?php
// SEO: título e descrição personalizados
function custom_archive_meta_tags() {
    ?>
    <title>Integrações com a Fiqon</title>
    <meta name="description" content="Explore nossas ferramentas conectáveis e descubra possibilidades incríveis de automações entre apps.">
    <?php
}
add_action('wp_head', 'custom_archive_meta_tags');
?>

<?php
// Se tiver query default do WordPress, use o loop padrão
$posts_array = array();

if ( have_posts() ) {
    while ( have_posts() ) {
        the_post();
        $post_id = get_the_ID();

        $posts_array[] = array(
            'title'   => get_the_title($post_id),
            'content' => apply_filters('the_content', get_the_content(null, false, $post_id)),
            'link'    => get_permalink($post_id),
            'acf'     => get_fields($post_id), // pega todos os campos ACF
        );
    }
    wp_reset_postdata();
}

$data = array(
    'posts' => $posts_array,
);

// Envia para o React via wp_localize_script()
wp_localize_script('meu-react-app', 'wpData', $data);
?>

<?php get_header(); ?>
<div id="root"></div>
<?php get_footer(); ?>
