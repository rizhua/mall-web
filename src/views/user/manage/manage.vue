<template src="./manage.html"></template>
<style src="./manage.less" lang="less" scoped></style>

<script>
export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          eval: "好评",
          date: "2016-05-02",
          name: "王小虎",
          address:
            "上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路 1518 弄",
        },
        {
          eval: "好评",
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          eval: "差评",
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          eval: "好评",
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          eval: "中评",
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      evalList: [],
      currentPage: 1,
      logLevel: "",
    };
  },
  mounted() {
    // this.getEvalList()
  },
  methods: {
    getEvalList() {
      let data = {};
      this.$http({
        method: "get",
        url: "/api/user/getEval",
        params: data,
      }).then((res) => {
        if (1000 == res.data.code) {
          this.evalList = res.data.list;
        } else {
          this.evalList = [];
        }
      });
    },

    renderFirstHeader(sel) {
      let arr = [
        { label: "全部", value: "全部" },
        { label: "好评", value: "好评" },
        { label: "中评", value: "中评" },
        { label: "差评", value: "差评" },
      ];
      return sel(
        "div",
        {
          style: {
            heigth: "32px",
          },
        },
        [
          sel(
            "el-select",
            {
              props: {
                value: this.logLevel, //文字框的内容取决于这个value，如果value不存在，会报错
              },
              on: {
                input: (value) => {
                  //随着下拉框的不同，文字框里的内容在边
                  this.logLevel = value;
                },
              },
            },
            [
              arr.map((item) => {
                return sel("el-option", {
                  props: {
                    value: item.value,
                    label: item.label,
                  },
                });
              }),
            ]
          ),
        ]
      );
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
