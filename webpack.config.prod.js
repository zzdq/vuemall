var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const path = require('path')

//打包之前，删除dist目录
var CleanWebpackPlugin = require('clean-webpack-plugin')

//抽离css
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // entry: './src/main.js', //打包的入口文件
    entry:{//当我们需要把第三方包单独抽取出去的时候，那就是多入口
        'axios':['axios'], //属性名称代表的是 打包出来，放在js文件夹下面的文件名称，值是代表第三方包
        'jquery':['jquery'],
        'moment':['moment'],
        'v-distpicker':['v-distpicker'],
        'vue-lazyload':['vue-lazyload'],
        'quanjiatong':['vue','vue-router','vuex'],
        'bundle':'./src/main.js' //别忘记了我们自己的源代码也要打包进入bundle.js
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js' //name就是上一步写的属性名称
    },
    module: {//配置loader
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                // use: [
                //     { loader: "style-loader" },
                //     { loader: "css-loader" }
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader:"css-loader",
                        options: {
                            minimize: true //压缩抽离出去的css
                        }
                    }
                })
            },
            {
                test: /\.(ttf|eot|svg|woff|jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2000,//这个4000代表阀值，这个阀值，在公司中根据需要进行设置
                            name:'statics/[name]-[hash:5].[ext]'//代表把抽离出去的图片、字体文件从bundle.js中抽离出去之后，放在dist目录下面的statics中
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,  //排除node_modules
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.vue', '.js', '.json', '*']
    },
    plugins: [//插件中的内容都是new出来的
        //打包之前，删除dist目录，写在其它插件前面
        new CleanWebpackPlugin('dist'),

        //生成index.html
        new HtmlWebpackPlugin({
            template: './template.html', //参照文件的路径
            filename: 'index.html',//最后发布到node服务器上面的名称
            minify:{
                removeComments:true,//压缩注释
                minifyJS:true,//压缩js
                minifyCSS:true,//压缩css
                collapseWhitespace:true,//去除空格
            }
        }),

        //全局导入jquery
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),

        //压缩相关，设置当前环境为生产环境，到时候会自动导入xxx.min.js
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false, //去掉警告
              drop_debugger: true,
              drop_console: true //去除console.log
            },
            comments: false //去掉版权信息等注释
        }),
        //把抽离出来的样式文件，放在dist目录下面的css目录下的styles.css中
        new ExtractTextPlugin("css/styles.css"),

        //抽离第三方包的，这里不要写bundle.js
        new webpack.optimize.CommonsChunkPlugin({
            name: ['jquery', 'moment','quanjiatong','axios','v-distpicker','vue-lazyload'],
            // filename: "vendor.js"
            // (给 chunk 一个不同的名字)

            minChunks: Infinity,
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
        }),
    ]
}