<template>
  <div class="welcome" ref="root">
    <span class="word">WELCOME</span>
  </div>
</template>

<script>
export default {
  name: "WelcomeOverlay",

  mounted() {
    // tampil saat refresh (kalau kamu mau)
    this.show();

    // ✅ supaya bisa dimunculkan lagi saat tombol Get Started diklik
    this._onShow = () => this.show();
    window.addEventListener("showWelcome", this._onShow);
  },

  methods: {
    show() {
      const el = this.$refs.root;
      if (!el) return;

      // tampilkan
      el.style.display = "flex";
      el.style.opacity = "1";

      // setiap kali show, pasang lagi listener hide
      this._hide = () => {
        el.style.display = "none";
        window.removeEventListener("wheel", this._hide);
        window.removeEventListener("touchmove", this._hide);
        window.removeEventListener("keydown", this._hide);
      };

      // hilang hanya saat aksi user
      window.addEventListener("wheel", this._hide, { passive: true });
      window.addEventListener("touchmove", this._hide, { passive: true });
      window.addEventListener("keydown", this._hide);
    },
  },

  beforeDestroy() {
    window.removeEventListener("showWelcome", this._onShow);
    window.removeEventListener("wheel", this._hide);
    window.removeEventListener("touchmove", this._hide);
    window.removeEventListener("keydown", this._hide);
  },
};
</script>

<style scoped>
.welcome {
  position: fixed;
  inset: 0;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.35);
  pointer-events: none;
}

.word {
  color: #adff2f;
  font-size: clamp(28px, 8vw, 96px);
  font-weight: 800;
  letter-spacing: 0.14em;
}
</style>
