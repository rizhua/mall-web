<template src="./header.html"></template>
<style src="./header.less" lang="less" scoped></style>

<script>
export default {
    name: "Header",
    props: {
        msg: String,
        isOpen: Boolean
    },
    data() {
        return {
            catShow: true,
            model: {
                keyword: null
            }
        }
    },
    created() {
        this.catShow = this.isOpen;
    },
    methods: {
        search(e) {
            e.preventDefault();
            console.log(this.model);
            this.$http({
                method: "get",
                url: "api/user/getinfo"
            }).then(res => {
                console.log(res, '------');
            });
        },

        onMouse(s) {
            if(!this.isOpen) {
                this.catShow = s;
            }
        }
    }
}
</script>
