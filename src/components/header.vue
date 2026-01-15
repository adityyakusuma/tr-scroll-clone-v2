<template>
  <header class="section" id="top">
    <div class="container">
      <nav class="nav" ref="nav" aria-label="Main navigation">
        <a href="#plan" @click.prevent="gotoSection('plan')">plan</a>
        <a href="#time" @click.prevent="gotoSection('time')">design</a>
        <a href="#build" @click.prevent="gotoSection('build')">build</a>
      </nav>
    </div>
  </header>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "AppHeader",

  mounted() {
    // Set kondisi awal (biar tidak kedip)
    if (this.$refs.nav) {
      gsap.set(this.$refs.nav, { opacity: 0, y: -8 });
      // Animasi saat page load
      gsap.to(this.$refs.nav, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.08 });
    }
  },

  methods: {
    gotoSection(id) {
      const el = document.getElementById(id);
      if (!el) return;
      const wrapTop = el.getBoundingClientRect().top + window.scrollY;
      const wrapHeight = el.offsetHeight;
      const vp = window.innerHeight;
      const range = Math.max(0, wrapHeight - vp);
      const progress = 0.18; // tuned to show content inside pinned scene
      const target = Math.round(wrapTop + range * progress);
      window.scrollTo({ top: target, behavior: 'smooth' });
    },
  },
};
</script>

<style scoped>
.header-wrap{
  padding-top: 28px;
}

.topbar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand{
  font-weight: 700;
  letter-spacing: 0.08em;
  font-size: 12px;
  color: rgba(255,255,255,0.75);
}

.nav {
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 100;
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 6px 10px;
  border-radius: 12px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
}

.nav a{
  color: var(--muted);
  text-decoration: none;
  font-size: 14px;
  padding: 4px 6px;
}

.nav a::after{
  content: '.';
  margin-left: 6px;
  color: var(--text);
}

.nav a:hover{
  color: var(--text);
  text-decoration: none;
} 

.hero{ display:none; }


@media (max-width: 768px){
  .hero{ padding: 52px 0 6px; }
  .title{ font-size: 40px; }
  .nav{ display: none; } /* simple & clean di mobile */
}

.header-wrap {
  min-height: 70vh;
  display: flex;
  align-items: flex-start;
}

.nav {
  display: flex;
  gap: 12px;
  align-items: center;
}

.nav a {
  color: var(--muted);
  text-decoration: none;
  font-size: 14px;
}

.nav a:hover {
  color: var(--text);
} 

.logo {
  margin-right: 8px;
  font-weight: 600;
  letter-spacing: 0.08em;
}
</style>
