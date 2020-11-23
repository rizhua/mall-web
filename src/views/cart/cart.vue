<template src="./cart.html"></template>
<style src="./cart.less" lang="less" scoped></style>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";

export default {
  data() {
    return {
      allChecked: false,
      isIndeterminate: false,
      totalNum: 0,
      totalPrice: 0,
      allSelected: [],
      storeList: [
        {
          id: 33,
          storeName: "张三店铺",
          checked: false,
          children: [
            {
              id: "336",
              image: require("../../assets/img/xiezi.jpg"),
              title:
                "简易窗帘杆免打孔安装卧室轨道支架免钉可伸缩挂钩式宜家超长单杆",
              spec: "黑色伸缩范围310-360【送窗帘环】",
              price: 144.0,
              amount: 144.0,
              count: 1,
              checked: false,
              children: null,
            },
            {
              id: "339",
              image: require("../../assets/img/xiezi.jpg"),
              title:
                "简易窗帘杆免打孔安装卧室轨道支架免钉可伸缩挂钩式宜家超长单杆",
              spec: "黑色伸缩范围310-360【送窗帘环】",
              price: 77.55,
              amount: 77.55,
              count: 1,
              checked: false,
              children: null,
            },
          ],
        },
        {
          id: "20",
          storeName: "李四店铺",
          checked: false,
          children: [
            {
              id: 201,
              image: require("../../assets/img/xiezi.jpg"),
              title: "苹果12plus",
              spec: "128G 全网通 水砖色",
              price: 1144.0,
              amount: 1144.0,
              count: 1,
              checked: false,
              children: null,
            },
          ],
        },
      ],
    };
  },
  computed: {},
  components: {
    "rz-header": Header,
    "rz-footer": Footer,
  },
  mounted() {
    this.getStore();
  },

  methods: {
    getStore() {
      let data = {};
      this.$http({
        method: "get",
        url: "/api/cart/list",
        data: data,
      }).then((res) => {
        console.log(res);
        if (1000 == res.data.code) {
          this.storeList = res.data.list;
        } else {
          // this.storeList = [];
        }
      });
    },

    changeTitleChecked(pgoods, store, idx, event) {
      let checked = event.target.checked;
      store.checked = checked;
      if (Array.isArray(store.children)) {
        store.children.forEach((e) => {
          e.checked = checked;
          if (Array.isArray(e.children)) {
            this.changeTitleChecked(store, e, idx, event);
          }
        });
      }

      if (pgoods === null) {
        this.determin();
      } else {
        // 兄弟
        if (checked) {
          pgoods.checked = true;
          this.allChecked = true;
          // 添加选中的项
          this.allSelected.indexOf(store) === -1 &&
            this.allSelected.push(store);
          console.log(this.allSelected);

          this.determin();
        } else {
          let tmp = pgoods.children.some((e) => {
            return e.checked == true;
          });
          pgoods.checked = tmp;
          this.determin();
        }
      }
      this.sumNum();
    },

    //不确定 函数
    determin() {
      let tru = 0;
      let seleleng = this.storeList.length;
      this.storeList.forEach((e) => {
        if (e.checked) {
          tru++;
        }
      });
      this.allChecked = tru === seleleng;
      this.isIndeterminate = tru >= 1 && tru < seleleng;
    },

    changeAllChecked(event) {
      let checked;
      if ("boolean" == typeof event) {
        checked = event;
      } else {
        checked = event.target.checked;
      }
      this.allChecked = checked;
      this.isIndeterminate = false;
      this.storeList.forEach((e) => {
        e.checked = checked;
        if (Array.isArray(e.children)) {
          e.children.forEach((v) => {
            v.checked = checked;
          });
        }
      });
      this.sumNum();
    },

    sumNum() {
      let tCount = 0;
      let tPrice = 0;
      this.storeList.forEach((e) => {
        e.children.forEach((item) => {
          if (item.checked) {
            tCount += item.count;
            tPrice += item.amount;
          }
        });
      });
      this.totalNum = tCount;
      this.totalPrice = tPrice;
    },

    del(pidx, index) {
      let seft = this.storeList[pidx].children;
      seft.splice(index, 1);
      if (seft.length == 0) {
        this.storeList.splice(pidx, 1);
      }
      this.sumNum();
    },

    handleChange(idx, pidx) {
      let seft = this.storeList[pidx].children[idx];
      seft.amount = seft.price * seft.count;
      this.sumNum();
    },

    selectDel() {
      this.storeList.forEach((e, pidx) => {
        e.children.forEach((item, index) => {
          if (item.checked) {
            this.del(pidx, index);
          }
        });
      });
    },

    toOrder() {
      // 更新购物车
      let data = [];

      if (1 > data.length) {
        this.$message.error("a");
      }
      this.$http({
        method: "post",
        url: "/api/cart/update",
        data: data,
      }).then((res) => {
        if (1000 == res.data.code) {
          // 跳转结算页面
          this.$router.push("/order");
        }
      });
    },
  },
};
</script>
