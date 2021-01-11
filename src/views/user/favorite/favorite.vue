<template src="./favorite.html"></template>
<style src="./favorite.less" lang="less" scoped></style>

<script>
export default {
  components: {},
  data() {
    return {
      currentPage: 1,
      favoriteList: [],
    };
  },
  mounted() {
    // this.getFavoriteList()
  },
  methods: {
    getFavoriteList() {
      let data = {};
      this.$http({
        method: "get",
        url: "/api/user/getEval",
        params: data,
      }).then((res) => {
        if (1000 == res.data.code) {
          this.favoriteList = res.data.list;
        } else {
          this.favoriteList = [];
        }
      });
    },

    delCard(idx) {
      console.log(idx);
    },

    handleSizeChange(newSize) {
      console.log(newSize);
      // this.getEvalList();
    },

    handleCurrentChange(newnum) {
      console.log(newnum);
      // this.getEvalList();
    },
  },
};
</script>
