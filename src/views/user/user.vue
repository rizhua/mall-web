<template src="./user.html"></template>
<style src="./user.less" lang="less" scoped></style>

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
      currentIndex: 0,
      tabsList: [
        {
          label: "我的收藏",
          name: "favorite",
        },
        {
          label: "我的积分",
          name: "integral",
        },
        {
          label: "我的订单",
          name: "myorder",
        },
        {
          label: "售后服务",
          name: "saleService",
        },
        {
          label: "评价管理",
          name: "manage",
        },
        {
          label: "收货地址",
          name: "address",
        },
      ],
    };
  },
  methods: {
    // tabClick(index) {
    //   let path = this.tabsList[index].name;
    //   if (this.currentIndex !== index) {
    //     this.currentIndex = index;
    //     this.$router.push({ path: path });
    //   } else {
    //     return;
    //   }
    // },
  },
};
</script>
