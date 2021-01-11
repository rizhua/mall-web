<template src="./integral.html"></template>
<style src="./integral.less" lang="less" scoped></style>

<script>
export default {
  components: {},
  data() {
    return {
      currentPage: 1,
      getIntergralList: [],
    };
  },
  mounted() {
    // this.getInterList();
  },
  methods: {
    getInterList() {
      let data = {};
      this.$http({
        method: "get",
        url: "/api/user/getEval",
        params: data,
      }).then((res) => {
        if (1000 == res.data.code) {
          this.getIntergralList = res.data.list;
        } else {
          this.getIntergralList = [];
        }
      });
    },

    handleSizeChange(newSize) {
      console.log(newSize);
      // this.getInterList();
    },
    handleCurrentChange(newnum) {
      console.log(newnum);
      // this.getInterList();
    },
  },
};
</script>
