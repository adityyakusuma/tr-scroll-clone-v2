<template>
  <section id="build" ref="wrap" class="sticky-wrap section">
    <div ref="pin" class="sticky-inner">
      <div class="container two-col">
        <!-- teks -->
        <div class="text" ref="text">
          <h2 class="heading"><i>Magic happens to build it out</i></h2>
          <p class="desc">Transforming concepts a functional product.</p>
        </div>

        <!-- gambar -->
        <div class="img-box" ref="card">
          <picture>
            <source srcset="@/assets/images/Fruit03.webp" type="image/webp" />
            <img src="@/assets/images/Fruit03.jpg"
                 alt="Build image"
                 class="img-real"
                 loading="lazy"
            />
          </picture>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "AppSectionThree",

  mounted() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.wrap,
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers: true,
      },
    });

    tl.fromTo(
      this.$refs.text,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, ease: "none", duration: 0.3 }
    );

    tl.fromTo(
      this.$refs.card,
      { y: 60, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, ease: "none", duration: 0.4 },
      0
    );

    tl.to(
      this.$refs.card,
      { y: -90, x: 40, scale: 0.92, ease: "none", duration: 0.6 },
      0.35
    );

    // Scroll-driven scale + fade: image scales up while scrolling through the scene and fades near the end
    const scaleTl = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.wrap,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    scaleTl.to(this.$refs.card, { scale: 1.08, ease: 'none' });
    scaleTl.to(this.$refs.card, { opacity: 0, ease: 'none' }, 0.85);

    // Smoothly animate card into a fullscreen fixed element on enter, and back on leave
    (() => {
      // guard against missing refs (defensive)
      if (!this.$refs || !this.$refs.wrap || !this.$refs.card) return;

      let originalStyles = null;

      const open = (el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        originalStyles = {
          position: el.style.position || '',
          top: el.style.top || '',
          left: el.style.left || '',
          width: el.style.width || '',
          height: el.style.height || '',
          zIndex: el.style.zIndex || '',
          borderRadius: el.style.borderRadius || '',
        };

        gsap.set(el, {
          position: 'fixed',
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          margin: 0,
          zIndex: 15,
        });

        gsap.to(el, {
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          duration: 0.68,
          ease: 'power3.out',
        });

        const img = el.querySelector('img') || el.querySelector('picture');
        if (img) gsap.to(img, { scale: 1.02, duration: 0.9, ease: 'power3.out' });
      };

      const close = (el) => {
        if (!el || !originalStyles) return;
        const rect = el._lastRect || el.getBoundingClientRect();
        gsap.to(el, {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: originalStyles.borderRadius || 'inherit',
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => {
            el.style.position = originalStyles.position;
            el.style.top = originalStyles.top;
            el.style.left = originalStyles.left;
            el.style.width = originalStyles.width;
            el.style.height = originalStyles.height;
            el.style.zIndex = originalStyles.zIndex;
            el.style.borderRadius = originalStyles.borderRadius;
          },
        });

        const img = el.querySelector('img') || el.querySelector('picture');
        if (img) gsap.to(img, { scale: 1, duration: 0.45, ease: 'power3.inOut' });
      };

        const mq = window.matchMedia('(min-width: 1024px)');
      const isLarge = () => mq.matches;

      let st = null;

      const createST = () => {
        if (st) st.kill();
        if (!isLarge()) return;
        st = ScrollTrigger.create({
          trigger: this.$refs.wrap,
          start: 'top top',
          end: 'bottom top',
          onEnter: () => {
            this.$refs.card._lastRect = this.$refs.card.getBoundingClientRect();
            open(this.$refs.card);
          },
          onEnterBack: () => {
            this.$refs.card._lastRect = this.$refs.card.getBoundingClientRect();
            open(this.$refs.card);
          },
          onLeave: () => close(this.$refs.card),
          onLeaveBack: () => close(this.$refs.card),
        });
        this._section3ST = st;
      };

      const destroyST = () => { if (st) { st.kill(); st = null; this._section3ST = null; } };

      if (mq.addEventListener) {
        mq.addEventListener('change', (e) => { e.matches ? createST() : destroyST(); });
      } else {
        mq.addListener((e) => { e.matches ? createST() : destroyST(); });
      }

      this._section3_onResize = () => { if (isLarge()) createST(); else destroyST(); };
      window.addEventListener('resize', this._section3_onResize);

      if (isLarge()) createST();

      // keep reference for cleanup
      this._section3ST = st;
    })();
  },
  beforeDestroy() {
    if (this._section3ST) this._section3ST.kill();
    if (this._section3_onResize) window.removeEventListener('resize', this._section3_onResize);
  }
};
</script>

<style scoped>
/* reuse existing styles from other sections */
.text {
  max-width: 480px;
}

@media (max-width: 768px) {
  .text {
    max-width: 100%;
  }
}

.img-real {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

</style>
