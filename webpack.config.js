const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var PROD = (process.env.NODE_ENV === 'production')

module.exports = {
  entry: {
      app: './src/js/app.js', 
      // register:'./src/js/register.js',
      // news:'./src/js/news.js',
      // page:'./src/js/page.js',
      // login:'./src/js/login.js',
      // carousel:'./src/js/carousel.js',
      // isotope:'./src/js/isotope.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    //filename: 'bundle.[chunkhash].js',
    filename: "[name].entry.js"
    // publicPath: '/dist'
  },
  devtool: "source-map",
  module: {
    rules: [
        {
          test: /\.js$/,
          use: [
              {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0','stage-2']
                }
              }
          ]
        }, 
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                use: [
                  {
                    loader: "css-loader",
                    options: {
                      sourceMap: true
                    }
                  },
                 
                  {
                    loader: 'group-css-media-queries-loader'
                    
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      sourceMap: true
                    }
                  },
                   
                  {
                    loader:'sass-loader',
                    options: {
                      sourceMap: true,
                      includePaths: glob.sync(
                        path.join(__dirname, '**/node_modules/@material')
                      ).map((dir) => path.dirname(dir)),  
                    }
                  }  
                ]
            })
        },
        {
          test: /\.css$/,
          loaders: [
            "style-loader",
            "css-loader?sourceMap"
          ]
        },
      
      
        // {
        //     test: /\.html$/,
        //     use: ['html-loader']
        // },

        {
            test: /\.(ttf|eot|woff)$/,
            use: [
            {
              loader: "file-loader",
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              }
            }
            ]
        },

        {
            test: /\.(jpg|png|gif|svg)$/,
            use: [
                {
                      loader: 'file-loader',
                      options: {
                          name: '[name].[ext]',
                          outputPath: 'img/',
                          // publicPath: 'img/' 
                      }
                }
            ]
        },
        {
            test: /\.html$/,
            use: [{
              loader: 'html-loader',
              options: {
                minimize: false,
                interpolate: 'require'
              }
            }]
        }
    ]
  },
  devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: true,
        stats: "errors-only",
        open: true
    },
resolve: {
    alias: {
    //   'waypoints': 'waypoints/lib/noframework.waypoints.js',
      'masonry': 'masonry-layout',
      'isotope': 'isotope-layout'
      
      
    }
  },
  plugins: [

    
    

     
    // new webpack.ProvidePlugin({
    // $: "jquery",
    // jQuery: "jquery",
    // "window.jQuery": "jquery"
    // }),
      
    
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
      }),
        new ExtractTextPlugin({
        // filename: 'style.[chunkhash].css'
        filename: 'style.css'
      }),
      new HtmlWebpackPlugin({
        hash: true,
        name: 'index.html',
        template: './src/index.html',
        chunks: ['app'],
        filename: './index.html' 
      }),
      new CleanWebpackPlugin(['dist'])
  ]
};

  	