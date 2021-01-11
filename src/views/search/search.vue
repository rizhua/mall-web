<template src="./search.html"></template>
<style src="./search.less" lang="less"></style>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";

export default {
  data() {
    return {
      searchList: [
        [
          {
            active: false,
            title: "品牌",
            children: [
              { name: "耐克" },
              { name: "阿迪达斯" },
              { name: "李宁" },
              { name: "安踏" },
              { name: "耐克" },
              { name: "阿迪达斯" },
              { name: "李宁" },
              { name: "安踏" },
            ],
          },
          {
            active: false,
            title: "流行男鞋",
            children: [
              { name: "耐克" },
              { name: "阿迪达斯" },
              { name: "李宁" },
              { name: "李宁" },
              { name: "安踏" },
            ],
          },
          {
            active: false,
            title: "运动血鞋包",
            children: [
              { name: "耐克" },
              { name: "阿迪达斯" },
              { name: "李宁" },
              { name: "安踏" },
              { name: "耐克" },
              { name: "阿迪达斯" },
              { name: "李宁" },
              { name: "安踏" },
              { name: "耐克" },
              { name: "阿迪达斯" },
              { name: "李宁" },
              { name: "安踏" },
            ],
          },
        ],
        {
          title: "高级选项",
          type: [
            {
              name: "功能",
              children: [
                { name: "透气" },
                { name: "透气" },
                { name: "透气" },
                { name: "透气" },
              ],
            },
            {
              name: "鞋面材质",
              children: [
                { name: "透asf气" },
                { name: "透asf气" },
                { name: "透气" },
                { name: "透asf气" },
              ],
            },
            {
              name: "适用季节",
              children: [
                { name: "透气" },
                { name: "透asd气" },
                { name: "透asf气" },
                { name: "透s气" },
                { name: "透气" },
                { name: "透asd气" },
                { name: "透asf气" },
                { name: "透s气" },
              ],
            },
          ],
        },
      ],
      operActiveIndex: 0,
    };
  },
  components: {
    "rz-header": Header,
    "rz-footer": Footer,
  },
  mounted() {
    this.getSearch();
  },
  methods: {
    getSearch() {
      let data = {};
      this.$http({
        method: "get",
        url: "/api/search/list",
        data: data,
      }).then((res) => {
        console.log(res);
        if (1000 == res.data.code) {
          this.searchList = res.data.list;
        } else {
          // this.searchList = []
        }
      });
    },

    onMoreType(items) {
      items.active = !items.active;
    },

    getMoreSpec(idx, type) {
      let list = document.querySelectorAll(".spec-value");
      if (type == "enter") {
        list[idx].setAttribute("style", "display:block");
      } else if (type == "leave") {
        list[idx].setAttribute("style", "display:none");
      }
    },

    changeItem(idx) {
      this.operActiveIndex = idx;
    },
  },
};
</script>
