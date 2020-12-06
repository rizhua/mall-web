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
          path: "favorite",
          name: "Favorite",
        },
        {
          label: "我的积分",
          path: "integral",
          name: "Integral",
        },
        {
          label: "我的订单",
          path: "myorder",
          name: "Myorder",
        },
        {
          label: "售后服务",
          path: "saleService",
          name: "SaleService",
        },
        {
          label: "评价管理",
          path: "manage",
          name: "Manage",
        },
        {
          label: "收货地址",
          path: "address",
          name: "Address",
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

    asd() {
      console.log(this.$route.path);
    },
  },
};
</script>
