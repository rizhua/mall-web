module.exports = {
    devServer: {
        // 设置代理
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8000", // 访问数据的计算机域名
                ws: false, // 是否启用websockets
                changOrigin: true //开启代理
            }
        }
    }
}