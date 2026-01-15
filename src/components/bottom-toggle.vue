<template>
  <nav class="bottom-toggle" role="navigation" aria-label="Sections">
    <div class="inner">
      <div class="indicator" aria-hidden="true"></div>
      <button
        v-for="(item, i) in items"
        :key="item.id"
        :class="['btn', { active: i === active }]
        "
        @click="goto(i)"
        :aria-current="i === active ? 'true' : 'false'"
      >
        <span class="num">{{ i + 1 }}</span>
        <span class="label-txt">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'BottomToggle',
  data() {
    return {
      items: [
        { id: 'plan', label: 'plan' },
        { id: 'time', label: 'design' },
        { id: 'build', label: 'build' },
      ],
      active: 0,
      triggers: [],
    };
  },
  mounted() {
    // Create ScrollTriggers for each section to update active index
    this.items.forEach((item, i) => {
      const el = document.querySelector(`#${item.id}`);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => this.setActive(i),
        onEnterBack: () => this.setActive(i),
      });

      this.triggers.push(st);
    });

    // Place indicator correctly
    this.$nextTick(() => {
      this.updateIndicator(true);
      window.addEventListener('resize', this.updateIndicator);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateIndicator);
    this.triggers.forEach((t) => t.kill());
  },
  methods: {
    setActive(i) {
      if (this.active === i) return;
      this.active = i;

      // subtle pop on active button
      this.$nextTick(() => {
        const buttons = this.$el.querySelectorAll('.btn');
        const activeBtn = buttons[this.active];
        if (activeBtn) {
          gsap.fromTo(
            activeBtn,
            { scale: 0.96 },
            { scale: 1, duration: 0.32, ease: 'power2.out' }
          );
        }
      });

      this.updateIndicator();
    },
    goto(i) {
      const id = this.items[i].id;
      const el = document.querySelector(`#${id}`);
      if (!el) return;

      // Scroll a bit into the pinned scene instead of to the absolute top.
      // This ensures the GSAP timeline is past its initial (invisible) state.
      const wrapTop = el.getBoundingClientRect().top + window.scrollY;
      const wrapHeight = el.offsetHeight;
      const vp = window.innerHeight;
      const range = Math.max(0, wrapHeight - vp);
      const progress = 0.18; // tuned to show content (20% into scene)
      const target = Math.round(wrapTop + range * progress);

      window.scrollTo({ top: target, behavior: 'smooth' });

      // optimistic update so UI feels immediate
      this.setActive(i);
    },
    updateIndicator(immediate = false) {
      this.$nextTick(() => {
        const root = this.$el.querySelector('.inner');
        const buttons = this.$el.querySelectorAll('.btn');
        const indicator = this.$el.querySelector('.indicator');
        if (!buttons.length || !indicator || !root) return;

        const activeBtn = buttons[this.active];
        const left = activeBtn.offsetLeft;
        const width = activeBtn.offsetWidth;

        const props = { x: left, width };

        // ensure transform origin for subtle scale effect
        indicator.style.transformOrigin = 'center center';

        if (immediate) {
          gsap.set(indicator, { ...props, scaleX: 1, opacity: 1 });
        } else {
          gsap.to(indicator, {
            ...props,
            duration: 0.32,
            ease: 'power2.out',
            onStart: () => {
              gsap.fromTo(
                indicator,
                { opacity: 0.86, scaleX: 0.98 },
                { opacity: 1, scaleX: 1.03, duration: 0.16, ease: 'power2.out' }
              );
            },
            onComplete: () => {
              gsap.to(indicator, { scaleX: 1, duration: 0.16, ease: 'power2.out' });
            },
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.bottom-toggle {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 28px;
  z-index: 60;
  pointer-events: auto;
}

.bottom-toggle .inner {
  position: relative;
  display: inline-flex;
  gap: 10px;
  background: rgba(255,255,255,0.03);
  padding: 8px;
  border-radius: 28px;
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.bottom-toggle .btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 0;
  padding: 8px 12px;
  color: var(--muted2);
  cursor: pointer;
  border-radius: 14px;
  font-size: 13px;
}

.bottom-toggle .btn:hover { color: var(--text); }

.bottom-toggle .btn .num {
  font-weight: 700;
}

.bottom-toggle .indicator {
  position: absolute;
  top: 4px;
  left: 0;
  height: calc(100% - 8px);
  width: 34px;
  background: rgba(255,255,255,0.08);
  border-radius: 12px;
  z-index: -1;
  transform-origin: center center;
  will-change: transform, opacity;
  opacity: 0.95;
}

.bottom-toggle .btn.active {
  color: var(--text);
}

@media (max-width: 640px){
  .bottom-toggle { bottom: 18px; }
  .bottom-toggle .inner { gap: 6px; padding: 6px; }
  .bottom-toggle .btn { padding: 6px 10px; font-size: 12px; }
}
</style>