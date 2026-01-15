<template>
  <section class="section" ref="cta" id="learn">
    <div class="container cta">
      <header class="cta-head">
        <h2 class="heading"><i>Thank You</i></h2>
      </header>

      <main class="cta-main">
        <a class="btn" role="button" @click.prevent="onGetStartedClick">Get Started</a>
      </main>

      <footer class="cta-foot">
        <p class="footer-text">Built by Adit</p>
      </footer>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "AppEtc",
  mounted() {
    gsap.fromTo(
      this.$refs.cta,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: this.$refs.cta,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
        },
      }
    );
  },
  methods: {
    onGetStartedClick() {
      window.dispatchEvent(new CustomEvent("showWelcome"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.cta {
  position: relative;
  z-index: 25;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  padding: 48px 18px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
}

.container.cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.cta-main {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  display: inline-block;
  text-decoration: none;
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 999px;
  border: 1px solid #c8f169;
  color: #c8f169;
  background: transparent;
  transition: all 0.2s ease;
}

.btn:hover {
  background: rgba(200, 241, 105, 0.12);
  transform: translateY(-2px);
  opacity: 0.9;
}

.footer-text {
  margin: 0;
  color: var(--muted2);
  font-size: 14px;
}
</style>
