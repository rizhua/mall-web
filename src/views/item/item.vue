<template src="./item.html"></template>
<style src="./item.less" lang="less" scoped></style>

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
      serverList: [
        { name: "正品保证", path: "" },
        { name: "门店自提", path: "" },
        { name: "极速退款", path: "" },
        { name: "七天无理由退换", path: "" },
        { name: "支付方式", path: "" },
      ],
      imgList: [],
      num: 1,
      sizeIndex: 0,
      imgIndex: 0,
      currentImgIndex: 0,
    };
  },
  methods: {
    handleChange(type) {
      if (type == "add") {
        this.num++;
      } else {
        if (this.num == 1) {
          return;
        }
        this.num--;
      }
    },

    onMore(type) {
      if (type == "prev") {
        this.$refs.trackRef.prev();
      } else {
        this.$refs.trackRef.next();
      }
    },

    onToggle(type) {
      if (type == "prev") {
        this.$refs.specRef.prev();
      } else {
        this.$refs.specRef.next();
      }
    },

    addClass(index) {
      this.currentImgIndex = index;
    },

    toggleSize(index) {
      this.sizeIndex = index;
    },
    toggleImg(index) {
      this.imgIndex = index;
    },
  },
};
</script>
