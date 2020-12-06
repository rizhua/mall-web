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
      num: 1,
      currentIndex: 0,
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

    clickMore(e, type) {
      console.log(type);
      let imgList = document.getElementById("imgList");
      let target = document.getElementById("tarckList").clientHeight + 32;
      let imgLenght = imgList.clientHeight - 32;
      console.log(target);
      console.log(imgLenght);
      if (type === "prev") {
        if (this.currentIndex == 0) {
          this.currentIndex = -4;
          imgList.style.top = imgLenght;
        } else {
          this.currentIndex++;
          target = this.currentIndex * target;
          this.animate(imgList, target);
          console.log(this.currentIndex);
        }
      } else {
        if (this.currentIndex !== -4) {
          this.currentIndex--;
          target = this.currentIndex * target;
          this.animate(imgList, target);
        } else {
          this.currentIndex = 0;
          imgList.style.top = 0;
        }
        console.log(this.currentIndex);
      }
      console.log(imgList.offsetTop);
    },

    animate(obj, target) {
      clearInterval(obj.timer);
      obj.timer = setInterval(() => {
        let leader = obj.offsetTop;
        let step = 20;
        step = leader < target ? step : -step;
        if (Math.abs(leader - target) >= Math.abs(step)) {
          leader = leader + step;
          obj.style.top = leader + "px";
        } else {
          obj.style.top = target + "px";
          clearInterval(obj.timer);
        }
      }, 15);
    },
  },
};
</script>
