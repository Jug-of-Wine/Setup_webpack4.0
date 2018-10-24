const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
//获取html-webpack-plugin参数方法
const getHtmlConfig = function(name){
	return {
		template: './src/view/'+name+'.html',
  		filename: 'view/'+name+'.html',
  		inject: true,
  		hash: true,
  		chunks: ['common',name]
	}
}

//entry表示入口,output表示出口,mode表示模式一种是开发模式一种是生产模式
var config = {
	entry: {
		common: ['./src/page/common/index.js'],
		index: ['./src/page/index/index.js'],
		login: ['./src/page/login/index.js'],
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, '../dist')
	},
  //开发服务器
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    port: '8088',
    inline: true
  },
	//打包公共模块
	 optimization: {
     	splitChunks: {
       		cacheGroups: {
         	// 注意: priority属性
         	// 其次: 打包业务中公共代码
         		common: {
           			name: "common",
           			chunks: "all",//表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all
           			minChunks: 2,//表示被引用次数，默认为1
           			minSize: 1,//表示在压缩前的最小模块大小，默认为0
           			priority: 0//表示缓存的优先级
         		}
       		}
     	}
   },
   	//插件的配置
  	plugins: [
  		new ExtractTextWebpackPlugin({
  			filename: 'css/index.css'
  		}),
  		new HtmlWebpackPlugin(getHtmlConfig('index')),
  		new HtmlWebpackPlugin(getHtmlConfig('login'))
  	],
  	mode: "development",
  	//模块配置
  	module: {
  		rules: [
  			{test: /\.css$/, use: ExtractTextWebpackPlugin.extract({
  					use: [
  						{ loader: 'css-loader' }
  					]
  				})
  			},
  			{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, use: [{loader: 'url-loader?limit=100&name=resource/[name].[ext]'}] }
  		]
  	}
};

module.exports = config;