<template src="./saleService.html"></template>
<style src="./saleService.less" lang="less" scoped></style>

<script>
export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          returnNuber: "701246117",
          orderNumber: "82612679359",
          info: "罗技(Logitech)M220 无线静音鼠标 畅销外形 灰色 M185升级版",
          time: "2019-12-02",
          state: "上门换新",
        },
        {
          returnNuber: "701246117",
          orderNumber: "679999359",
          info: "罗技(Logitech)M220 无线静音鼠标 畅销外形 灰色 M185升级版",
          time: "2019-12-02",
          state: "上门换新",
        },
        {
          returnNuber: "701246117",
          orderNumber: "61267569359",
          info: "罗技(Logitech)M220 无线静音鼠标 畅销外形 灰色 M185升级版",
          time: "2019-12-02",
          state: "上门换新",
        },
        {
          returnNuber: "701246117",
          orderNumber: "8232879359",
          info: "罗技(Logitech)M220 无线静音鼠标 畅销外形 灰色 M185升级版",
          time: "2019-12-02",
          state: "上门换新",
        },
      ],
      getCodeList: [],
      currentRange: "最近三个月",
      currentState: "处理中",
    };
  },
  mounted() {
    this.getEvalList();
  },
  methods: {
    getEvalList() {
      let data = {};
      this.$http({
        method: "get",
        url: "/api/user/getOrderCode",
        params: data,
      }).then((res) => {
        if (1000 == res.data.code) {
          this.getCodeList = res.data.list;
        } else {
          this.getCodeList = [];
        }
      });
    },

    renderRange(t) {
      let arr = [
        { label: "最近三个月", value: "最近三个月" },
        { label: "三个月以前", value: "三个月以前" },
      ];
      return t("div", { style: { heigth: "32px" } }, [
        t(
          "el-select",
          {
            props: { value: this.currentRange },
            on: {
              input: (value) => {
                this.currentRange = value;
              },
            },
          },
          [
            arr.map((item) => {
              return t("el-option", {
                props: { value: item.value, label: item.label },
              });
            }),
          ]
        ),
      ]);
    },

    renderState(s) {
      let arr = [
        { label: "全部状态", value: "全部状态" },
        { label: "处理中", value: "处理中" },
        { label: "已完成", value: "已完成" },
      ];
      return s("div", {}, [
        s(
          "el-select",
          {
            props: {
              value: this.currentState,
            },
            on: {
              input: (value) => {
                this.currentState = value;
              },
            },
          },
          [
            arr.map((item) => {
              return s("el-option", {
                props: { value: item.value, label: item.label },
              });
            }),
          ]
        ),
      ]);
    },

    aClick(row) {
      console.log(row);
    },
  },
};
</script>
