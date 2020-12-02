<template src="./myorder.html"></template>
<style src="./myorder.less" lang="less" scoped></style>

<script>
export default {
  components: {},
  data() {
    return {
      tabsLabel: ["全部订单", "待付款", "待收货", "待评价"],
      orderList: [
        {
          id: 33,
          date: "2018-06-17 19:55:30",
          code: 76596395451,
          children: [
            {
              id: "336",
              title: "金士顿(Kingston)",
              spec: "16GB SD卡 高速相机内存卡 Class10 UHS-I存储卡",
              amount: 144.0,
              count: 1,
              Consignee: "张三",
              state: "已完成",
              pay: "在线支付",
            },
            {
              id: "339",
              title: "金士顿(Kingston)",
              spec:
                "16GB SD卡 高速相机高速相机内存卡高速相机内存卡高速相机内存卡内存卡 Class10 UHS-I存储卡",
              price: 77.0,
              amount: 77.0,
              count: 1,
              Consignee: "李四",
              state: "已完成",
              pay: "在线支付",
            },
          ],
        },
        {
          id: "20",
          date: "2018-06-17 19:55:30",
          code: 76596395451,
          children: [
            {
              id: 201,
              title: "iphone12",
              spec: "128G 全网通 水砖色",
              amount: 1144.0,
              count: 1,
              Consignee: "赵云",
              state: "已完成",
              pay: "在线支付",
            },
          ],
        },
      ],
      currentIndex: 0,
      keyword: "",
      currentPage: 1,
    };
  },
  mounted() {
    // this.getOrderList();
  },
  methods: {
    getOrderList() {
      let data = {};
      this.$http({
        method: "get",
        url: "/api/user/getorder",
        params: data,
      }).then((res) => {
        if (1000 == res.data.code) {
          this.orderList = res.data.list;
        } else {
          this.orderList = [];
        }
      });
    },

    tabClick(index) {
      this.currentIndex = index;
    },

    search() {
      console.log(123);
    },

    handleSizeChange(newSize) {
      console.log(newSize);
      this.getEvalList();
    },

    handleCurrentChange(newnum) {
      console.log(newnum);
      this.getEvalList();
    },
  },
};
</script>
