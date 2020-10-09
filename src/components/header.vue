<template>
<header>
    <div class="container">
        <div class="user-auth">
            <span>日抓商城欢迎您！</span>
            <router-link to="/">登录</router-link>
            <router-link to="/">免费注册</router-link>
        </div>
        <ul class="user-info">
            <li>购物车<sup>0</sup></li>
            <li>每日签到</li>
            <li>个人中心</li>
            <li>客户服务</li>
        </ul>
    </div>

    <!-- <h1>{{msg}}</h1> -->
</header>
</template>

<style lang="less" scoped>
header {
    border-bottom: 1px solid #ddd;
}
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 1200px;
    height: 36px;
}

.user-auth {
    a {
        margin-left: 1rem;
    }
}

.user-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding-left: 0;
    list-style-type: none;

    li {
        margin-left: 24px;
    }
}
</style>

<script>
export default {
    name: "Header",
    props: {
        msg: String
    }
}
</script>
