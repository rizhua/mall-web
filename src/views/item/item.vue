<template src="./item.html"></template>
<style src="./item.less" lang="less" scoped></style>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    "rz-header": Header,
    "rz-footer": Footer,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      specSwiperOption: {
        speed: 200,
        slidesPerView: 4,
        slidesPerGroup: 4,
        simulateTouch: false,
        navigation: {
          nextEl: ".spec-button-next",
          prevEl: ".spec-button-prev",
        },
      },
      tarckSwiperOption: {
        loop: true,
        speed: 200,
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 38,
        simulateTouch: false,
        direction: "vertical",
        navigation: {
          nextEl: ".tarck-button-next",
          prevEl: ".tarck-button-prev",
        },
      },
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
      imageList: [
        { src: require("../../assets/img/xiezi.jpg") },
        { src: require("../../assets/img/xiezi1.jpg") },
        { src: require("../../assets/img/xiezi2.jpg") },
        { src: require("../../assets/img/xiezi3.jpg") },
        { src: require("../../assets/img/xiezi4.jpg") },
        { src: require("../../assets/img/xiezi5.jpg") },
        { src: require("../../assets/img/xiezi6.jpg") },
      ],
    };
  },
  computed: {
    currentImage() {
      return this.imageList[this.currentImgIndex].src;
    },
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

    addClass(idx) {
      this.currentImgIndex = idx;
    },

    toggleSize(idx) {
      this.sizeIndex = idx;
    },

    toggleImg(idx) {
      this.imgIndex = idx;
    },
  },
};
</script>
