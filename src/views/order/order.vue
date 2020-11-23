<template src="./order.html"></template>
<style src="./order.less" lang="less" scoped></style>

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
      props: {
        lazy: true,
        lazyLoad: this.lazyLoad,
      },
      currentAddr: {},
      addressList: [
        {
          id: "1",
          province: "广东省",
          city: "深圳市",
          receiver: "郭富城",
          area: "南山区",
          address: "新安街道宝民一路灶下村三坊八巷1号405",
          mobile: "13799784355",
          defaultAddr: true,
        },
        {
          id: "2",
          province: "黑龙江省",
          city: "嘻哈市",
          receiver: "张学勇",
          area: "北野区",
          address: "新安街道宝民一路灶下村三坊八巷1号405",
          mobile: "13799784355",
          defaultAddr: false,
        },
        {
          id: "3",
          province: "浙江省",
          city: "宝路市",
          receiver: "刘德华",
          area: "天堂区",
          address: "新安街道宝民一路灶下村三坊八巷1号405",
          mobile: "13799784355",
          defaultAddr: false,
        },
      ],
      addressInfo: {
        addr: "",
        detailAddr: "",
        postalCode: "",
        receiver: "",
        mobile: "",
        checked: false,
      },
      addressRules: {
        addr: [{ required: true, trigger: "change" }],
        detailAddr: [
          {
            required: true,
            message: "详细地址长度需要在5-120个汉字或字符，不能包含表情符号",
            trigger: "blur",
          },
        ],
        postalCode: [],
        receiver: [
          {
            required: true,
            message:
              "收货人姓名应为2-25个字符，一个汉字为两个字符，不能包含表情符号",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "6-20个数字",
            trigger: "blur",
          },
        ],
      },
      storeList: [
        {
          id: 33,
          storeName: "张三店铺",
          message: "",
          freight: 23.5,
          totalPrice: 0,
          children: [
            {
              id: "336",
              image: require("../../assets/img/xiezi.jpg"),
              title:
                "简易窗帘杆免打孔安装卧室轨道支架免钉可伸缩挂钩式宜家超长单杆简易窗帘杆免打孔安装卧室轨道支架免钉可伸缩挂钩式宜家超长单杆简易窗帘杆免打孔安装卧室轨道支架免钉可伸缩挂钩式宜家超长单杆",
              spec:
                "黑色伸缩范围310-360【送窗帘环】黑色伸缩范围310-360【送窗帘环】黑色伸缩范围310-360【送窗帘环】",
              price: 144.0,
              amount: 144.0,
              count: 1,
              children: null,
            },
            {
              id: "339",
              image: require("../../assets/img/xiezi.jpg"),
              title:
                "简易窗帘杆免打孔安装卧室轨道支架免钉可伸缩挂钩式宜家超长单杆",
              spec: "黑色伸缩范围310-360【送窗帘环】",
              price: 77.0,
              amount: 77.0,
              count: 1,
              children: null,
            },
          ],
        },
        {
          id: "20",
          storeName: "李四店铺",
          message: "",
          freight: 4.7,
          totalPrice: 0,
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
      currentIndex: 0,
      totalPriceAll: 0,
      addAddrdialog: false,
      titleDialog: "",
    };
  },
  filters: {
    strSplice(val) {
      const v = val.split("");
      return v.splice(0, val.length - 1).join("");
    },
  },
  computed: {
    // 转化地址数组转为对象
  },
  mounted() {
    // this.getAddress();
    // this.getCart();
  },
  methods: {
    // 收货地址
    getAddress() {
      let data = {};
      this.$http({
        method: "get",
        url: "/api/area/getAddress",
        params: data,
      }).then((res) => {
        if (1000 == res.data.code) {
          this.addressList = res.data.list;
        } else {
          // this.addressList = [];
        }

        let defaultAddr = this.addressList.filter((addr) => {
          return addr.defaultAddr == true;
        });
        this.currentAddr = defaultAddr[0];
        console.log(this.currentAddr);
      });
    },

    // 商品数据
    getCart() {
      let data = {};
      this.$http({
        method: "get",
        url: "/api/cart/list",
        params: data,
      }).then((res) => {
        if (1000 == res.data.code) {
          this.storeList = res.data.list;
        } else {
          // this.storeList = [];
        }
        this.sumPrice();
      });
    },

    // 获取省级地址
    lazyLoad(node, resolve) {
      let data = {};
      if (0 < node.level) {
        data = {
          parentId: node.value,
        };
      }
      this.$http({
        method: "get",
        url: "/api/area/getRegion",
        params: data,
      }).then((res) => {
        if (res.data.code == 1000) {
          const areas = res.data.list.map((value) => ({
            value: value.ID,
            label: value.Name,
            leaf: node.level >= 2,
          }));
          resolve(areas);
        }
      });
    },

    sumPrice() {
      let amount = 0;
      this.storeList.forEach((e) => {
        amount = 0;
        e.children.forEach((v) => {
          amount += v.amount;
          e.totalPrice = amount + e.freight;
        });
      });
      this.totalPriceAll = this.storeList.reduce(function(pre, item) {
        return pre + item.totalPrice;
      }, 0);
    },

    toggleAddr(index) {
      this.currentIndex = index;
      this.currentAddr = this.addressList[index];
    },

    dialog(index) {
      if (!isNaN(index)) {
        console.log(index);
        this.titleDialog = "修改地址";
      } else {
        this.titleDialog = "添加地址";
      }
      this.addAddrdialog = true;
    },

    setAddress() {
      let data = {};
      this.$http({
        method: "post",
        url: "/api/area/setAddress",
        data: data,
      }).then((res) => {
        if (1000 == res.data.code) {
          this.getAddress();
          this.addAddrdialog = false;
        } else {
          this.$message.error("错误");
        }
      });
      this.addAddrdialog = false;
    },
  },
};
</script>
