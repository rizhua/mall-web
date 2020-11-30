<template src="./item.html"></template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";

export default {
  components: {
    "rz-header": Header,
    "rz-footer": Footer,
  },
  data() {
    return {
      user: {
        firstName: "huang",
        lastName: "guang",
      },
    };
  },
};
</script>
