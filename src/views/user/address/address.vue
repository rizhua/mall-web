<template src="./address.html"></template>
<style src="./address.less" lang="less" scoped></style>

<script>
export default {
  components: {},
  data() {
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };

    return {
      props: {
        lazy: true,
        lazyLoad: this.cascader,
      },
      addressRules: {
        addrId: [{ required: true, message: "请输入地址", trigger: "blur" }],
        detail: [
          {
            required: true,
            message: "详细地址长度需要在5-120个汉字或字符，不能包含表情符号",
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
      addressList: [],
      addressInfo: {},
      addressNum: 0,
      addAddrdialog: false,
    };
  },
  mounted() {
    this.getAddress();
  },
  methods: {
    getAddress() {
      let data = {
        currPage: 1,
        pageSize: 20,
      };
      this.$http({
        method: "get",
        url: "/api/area/getAddress",
        params: data,
      }).then((res) => {
        if (1000 == res.data.code) {
          this.addressList = res.data.list;
          this.addressNum = res.data.list.length;
          this.addressList.forEach((e) => {
            let region = e.region.split(",");
            e.city = region[0] + region[1];
            e.detail = region[2] + e.detail;
          });
          this.addressList.sort(function(a, b) {
            return b.isDefault - a.isDefault;
          });
        } else {
          this.addressList = [];
        }
      });
    },

    // 修改或新建地址对话框
    disAddress(idx, item) {
      console.log(idx, item);
      this.addAddrdialog = true;
      if (!isNaN(idx)) {
        this.addressInfo = Object.assign({}, item);
        this.addressInfo.addrId = [3392, 3496, 3503];
      } else {
        console.log(idx);
      }
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

    delAddress(idx) {
      console.log(idx);
      let data = {};
      this.$http({
        method: "get",
        url: "/api/user/delAddress",
        params: data,
      }).then((res) => {
        if (res.data.code == 1000) {
          this.$message.success("删除成功");
          this.getAddress();
        }
      });
    },

    resetForm() {
      this.addressInfo = {};
      this.$refs.addressInfoRef.resetFields();
      this.addAddrdialog = false;
    },

    handleChange() {
      const checkedNodes = this.$refs["cascaderAddr"]
        .getCheckedNodes()[0]
        .pathLabels.join(",");
      this.addressInfo.region = checkedNodes;
      console.log(this.addressInfo);
    },
  },
};
</script>
