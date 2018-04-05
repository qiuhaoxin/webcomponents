const path=require('path');
const webpack=require('webpack');
const nodeExternals=require("webpack-node-externals");
const HtmlWebpackPlugin=require('html-webpack-plugin');

const target=process.env.TARGER||"umd";
const componentDemo=process.env.COMP || 'tab'
const fileloader={
   loader:'file-loader',
   options:{name:'static/[name].[ext]'},
};

let config={
   entry:'./src/index',
   output:{
     path:path.resolve(__dirname,"dist"),
     filename:'[name].js',
     libraryTarget:'umd',
     library:'wise_webcomponents',
   },
   devtool:'source-map',
   plugins:[
      new webpack.EnvironmentPlugin({NODE_ENV:'development'}),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
         compress:{
            warnings:false,
         },
         mangle:false,
         beautify:true,
         comments:true
      })
   ],
   resolve:{
      extensions:['.js','.jsx','.less']
   },
   module:{
   	  rules:[{
   	  	test:/\.(jsx)$/,
   	  	loader:'babel-loader',
         exclude:path.resolve(__dirname,"node_modules")
   	  },{
          test:/\.js$/,
          loader:'babel-loader',
          exclude:path.resolve(__dirname,"node_modules")
        },
        {
          test:/\.(less)/,
          loader:'style-loader!css-loader!less-loader',
        },{
         test:/\.css$/,
         loader:'css-loader'
        }]
   }
}
switch(target){
   case "umd":
     config.externals=[
       nodeExternals({
         whitelist:[/\.(?!(?:jsx)|json)$/i],
       })
     ];
     config.entry="./index";
     config.module.rules.push({
        test:/\.(jpe?g|png|ico|git|svg)/,
        use:[fileloader],
        exclude:path.resolve(__dirname,'node_modules')
     })
   break;
   case "development":
      console.log("development");
      config.devtool="eval";
      config.module.rules.push({
         test:/\.(jpe?g|png|git|ico|svg)$/,
         use:[fileloader],
         exclude:path.join(__dirname,'node_modules')
      })
      config.entry=['react-hot-loader/patch','./demo/carouset/index'];
      config.plugins=[
         new HtmlWebpackPlugin({
            inject:true,
            template:`./demo/${componentDemo}/index.html`//'./demo/carouset/index.html'
         }),
         new webpack.EnvironmentPlugin({NODE_ENV:'development'}),
         new webpack.NoEmitOnErrorsPlugin()
      ];
      config.output={
         path:path.join(__dirname,'build'),
         filename:'static/[name].js'
      };
      config.devServer={
         contentBase:path.join(__dirname,'build'),
         port:process.env.PORT || 3003,
         host:'0.0.0.0',
         disableHostCheck:true,
         stats:'minimal'
      }
   break;
   case "demo":
     config.module.rules.push({
        test:/\.(jpe?g|png|gif|ico|svg)$/,
        use:[fileloader],
        exclude:path.join(__dirname,'node_modules')
     })
     config.entry=path.resolve(__dirname,"demo/carouset/index");
     config.output={
         path:path.join(__dirname,build),
         filename:'static/[name].js',
     },
     config.plugins=[
        new HtmlWebpackPlugin({
           inject:true,
           template:'./demo/carouset/index.html',
        }),
        new webpack.EnvironmentPlugin({NODE_ENV:'production'}),
        new webpack.optimize.UglifyJsPlugin({
           compress:{
            warnings:false
           }
        })
     ]
   break;
   case "production":

   break;
}
module.exports=config;