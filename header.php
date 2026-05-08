<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>
    <?php wp_title(); ?>
  </title>
  <?php wp_head(); ?>

  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const menuToggle = document.getElementById('menu-toggle');
      const menu = document.getElementById('menu');
      // Seleciona todos os links dentro do menu mobile
      const menuLinks = document.querySelectorAll('#menu a');

      if (menuToggle && menu) {
        // 1. Abre/fecha o menu ao clicar no botão hambúrguer
        menuToggle.addEventListener('click', function () {
          menuToggle.classList.toggle('open');
          menu.classList.toggle('open');
        });

        // 2. Fecha o menu automaticamente ao clicar em qualquer link
        menuLinks.forEach(function (link) {
          link.addEventListener('click', function () {
            menuToggle.classList.remove('open');
            menu.classList.remove('open');
          });
        });
      }
    });
  </script>
</head>

<body <?php body_class(); ?>>

  <header class="fiqon-navbar">
    <div class="nav-container">
      <div class="logo">
        <a href="<?php echo esc_url(home_url('/')); ?>">
          <img
            src="<?php echo esc_url('https://fiqon.com.br/wp-content/uploads/2025/09/agLOGO_FIQON_1@3x-300x65.png'); ?>"
            alt="Logo Fiqon" class="logo-img" />
        </a>
      </div>

      <nav class="desktop-menu">
        <ul class="menu-items">
          <li><a href="https://fiqon.com.br/#funcionalidades">Agentes IA</a></li>
          <li><a href="https://fiqon.com.br/aplicativos/">Aplicativos</a></li>
          <li><a href="https://fiqon.com.br/planos">Planos</a></li>
        </ul>
      </nav>

      <div class="menu-buttons">
        <a target="_blank" class="cta-btn" href="https://fiqon.app/login/">
          <div class="c-btn c-btn-outline">Entrar</div>
        </a>
        <a class="cta-btn" href="#contato">
          <div class="c-btn c-btn-primary">Fale com um especialista</div>
        </a>
      </div>

      <div class="menu-toggle" id="menu-toggle">
        <span class="bar top-bar"></span>
        <span class="bar middle-bar"></span>
        <span class="bar bottom-bar"></span>
      </div>
    </div>
  </header>

  <nav class="menu" id="menu">
    <ul class="menu-items">
      <li><a href="https://fiqon.com.br/#funcionalidades">Funcionalidades</a></li>
      <li><a href="https://fiqon.com.br/aplicativos/">Aplicativos</a></li>
      <li><a href="https://fiqon.com.br/planos">Planos</a></li>
    </ul>
    <div class="menu-buttons-mobile">
      <a class="cta-btn" href="https://fiqon.app/login/">
        <div class="c-btn c-btn-outline">Entrar</div>
      </a>
      <a class="cta-btn" href="#contato">
        <div class="c-btn c-btn-primary">Fale com um especialista</div>
      </a>
    </div>
  </nav>