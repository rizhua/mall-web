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
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };

    var postCode = (rule, value, cb) => {
      const regCode = /^[0-9]{6}$/;
      if (regCode.test(value)) {
        return cb();
      }
      cb(new Error("请输入正确的邮政编码"));
    };

    return {
      addressRules: {
        addrId: [{ required: true, message: "请输入地址", trigger: "blur" }],
        detail: [
          {
            required: true,
            message: "详细地址长度需要在5-120个汉字或字符，不能包含表情符号",
            trigger: "blur",
          },
        ],
        postalCode: [
          {
            validator: postCode,
            trigger: "blur",
          },
        ],
        Consignee: [
          {
            required: true,
            message:
              "收货人姓名应为2-25个字符，一个汉字为两个字符，不能包含表情符号",
            trigger: "blur",
          },
        ],
        tel: [
          {
            required: true,
            message: "6-20个数字",
            trigger: "blur",
          },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      storeList: [
        {
          id: 33,
          storeName: "张三店铺",
          message: "",
          freight: 23.5,
          totalPrice: 0,
          textarea: "",
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
          textarea: "",
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
      props: {
        lazy: true,
        lazyLoad: this.cascader,
      },
      currentAddr: {},
      addressList: [],
      addressInfo: {},
      currentIndex: 0,
      totalPriceAll: 0,
      addAddrdialog: false,
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
    this.getAddress();
    this.getCart();
    this.sumPrice();

    // this.cascader();
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
          this.addressList.forEach((e) => {
            let region = e.region.split(",");
            e.city = region[0] + region[1];
            e.detail = region[2] + e.detail;
            if (e.IsDefault) {
              this.currentAddr = e;
              e.IsDefault = true;
            } else {
              e.IsDefault = false;
            }
          });
          this.addressList.sort(function(a, b) {
            return b.IsDefault - a.IsDefault;
          });
          console.log(this.addressList);
        } else {
          this.addressList = [];
        }
      });
    },

    // 商品数据
    getCart() {
      // let data = {};
      // this.$http({
      //   method: "get",
      //   url: "/api/cart/list",
      //   params: data,
      // }).then((res) => {
      //   if (1000 == res.data.code) {
      //     // this.storeList = res.data.list;
      //   } else {
      //     // this.storeList = [];
      //   }
      this.sumPrice();
      // });
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

    // 获取省级地址
    cascader(node, resolve) {
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

    // 切换地址
    toggleAddr(index) {
      this.currentIndex = index;
      this.currentAddr = this.addressList[index];
    },

    // 设置地址
    setAddress(formName) {
      this.$refs[formName].validate((val) => {
        if (val) {
          let data = this.addressInfo;
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
        }
      });
    },

    // 设为默认地址
    setDefaultAddr(index) {
      console.log(index);
    },

    // 修改或新建地址对话框
    disAddress(idx, item) {
      this.addAddrdialog = true;
      this.addressInfo = {};
      if (!isNaN(idx)) {
        this.addressInfo = Object.assign({}, item);
        this.addressInfo.addrId = [3392, 3496, 3503];
      } else {
        console.log(idx);
      }
    },

    resetForm() {
      this.addressInfo = {};
      this.$refs.addressInfoRef.resetFields();
      this.addAddrdialog = false;
      console.log(this.addressList);
    },

    handleChange() {
      const checkedNodes = this.$refs["cascaderAddr"]
        .getCheckedNodes()[0]
        .pathLabels.join(",");
      this.addressInfo.region = checkedNodes;
      console.log(this.addressInfo);
    },

    submitOrder() {
      // this.set()
    },
  },
};
</script>
