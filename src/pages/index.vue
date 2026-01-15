<template>
  <div>
    <Welcome />
    <Header />
    <Section1 />
    <Section2 />
    <Section3 />
    <Etc />
    <BottomToggle />
  </div>
</template>

<script>
import Header from "../components/header.vue";
import Section1 from "../components/section-1.vue";
import Section2 from "../components/section-2.vue";
import Section3 from "../components/section-3.vue";
import Etc from "../components/etc.vue";
import BottomToggle from "../components/bottom-toggle.vue";
import Welcome from "../components/welcome.vue";

export default {
  name: "IndexPage",
  components: {Welcome, Header, Section1, Section2, Section3, Etc, BottomToggle },
  mounted() {
    // On initial load (no hash), scroll into the 'plan' pinned scene so it's immediately visible
    if (!window.location.hash || window.location.hash === '#top') {
      this.$nextTick(() => {
        // delay slightly to allow layout and images to settle
        setTimeout(() => {
          const el = document.getElementById('plan');
          if (!el) return;
          const wrapTop = el.getBoundingClientRect().top + window.scrollY;
          const wrapHeight = el.offsetHeight;
          const vp = window.innerHeight;
          const range = Math.max(0, wrapHeight - vp);
          const progress = 0.18; // same tuning as other scroll helpers
          const target = Math.round(wrapTop + range * progress);
          window.scrollTo({ top: target, behavior: 'smooth' });
        }, 60);
      });
    }
  },
};
</script>
