module.exports = {
    devServer: {
        // 设置代理
        proxy: {
            "/api": {
                target: "https://dev-s.haxima.cn", // 访问数据的计算机域名
                ws: false, // 是否启用websockets
                changOrigin: true //开启代理
            }
        }
    }
}