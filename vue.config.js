// 暴露出去
module.exports = {
    // 在vue中修改webpack的配置  配置之后,webpack不会去node_modules打包对应的库,忽略打包编译
    configureWebpack: {
        // plugins: [
        //     // new MyAwesomeWebpackPlugin()
        // ]
        // 把原本需要些在webpack.config.js中的配置代码,写在这里,会自动合并
        externals:{
            // 使用cdn 需要在public里的index引入相关资源
            'jquery': '$',
            'axios':'axios'
        }        
    }
}