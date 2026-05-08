<footer class="footer">
  <div class="footer-container">
    <div class="footer-column">
      <h3>FiqOn</h3>
      <ul>
        <li><a href="https://fiqon.com.br/aplicativos/">Aplicativos</a></li>
      </ul>
    </div>

    <div class="footer-column">
      <h3>Conteúdos</h3>
      <ul>
        <li><a href="https://fiqon.com.br/blog/">Blog</a></li>
      </ul>
    </div>

    <div class="footer-column">
      <h3>A Empresa</h3>
      <ul>
        <li><a href="https://fiqon.com.br/quem-somos/">Quem somos</a></li>
        <li><a href=" https://www.inhire.com.br/carreiras-fiqon/">Trabalhe conosco</a></li>
        <li><a href="https://fiqon.com.br/politica-de-privacidade/">Política de privacidade de dados</a></li>
        <li><a href="https://fiqon.app/politicas-de-privacidade">Política de privacidade da plataforma</a></li>
        <li><a href="https://api.whatsapp.com/send?phone=554299101242">Suporte para parceiros</a></li>
      </ul>
    </div>

    <div class="footer-column column-void"></div>

    <div class="logo-container">
      <div class="footer-column logo-column">
        <a href="<?php echo esc_url(home_url('/')); ?>">
          <img
            src="<?php echo esc_url('https://fiqon.com.br/wp-content/uploads/2025/06/Logo_FiqOn_Branco.png'); ?>"
            alt="Logo Fiqon"
            class="footer-logo" />
        </a>
        <div class="social-icons">
          <a href="https://www.instagram.com/fiq.on/"><img
              src="<?php echo esc_url('https://fiqon.com.br/wp-content/uploads/2025/06/instagram.png'); ?>"
              alt="Instagram" /></a>
          <a href="https://www.facebook.com/FiqOnTecnologia"><img
              src="<?php echo esc_url('https://fiqon.com.br/wp-content/uploads/2025/06/facebook.png'); ?>"
              alt="Facebook" /></a>
          <a href="https://www.linkedin.com/company/fiqon/"><img
              src="<?php echo esc_url('https://fiqon.com.br/wp-content/uploads/2025/06/linkedin2.png'); ?>"
              alt="LinkedIn" /></a>
          <a href="https://www.tiktok.com/@fiq.on"><img
              src="<?php echo esc_url('https://fiqon.com.br/wp-content/uploads/2025/06/tiktok3.png'); ?>"
              alt="TikTok" /></a>
        </div>
      </div>
    </div>
  </div>
  <?php wp_footer(); ?>
</footer>
<script>
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    menuToggle.classList.toggle("open");
  });
</script>
</body>

</html>