const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
   app: [
     path.join(__dirname, './src/')
   ],
   libs: [
     'react',
     'react-dom',
     'redux',
     'react-redux',
     'redux-thunk',
     'recompose'
   ],
 },
 output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dist'),
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?modules', 'sass-loader'] }) },
      { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?modules', 'less-loader'] }) },
      { test: /\.(jpg|svg|png|ttf)$/, loader: 'file-loader?&name=images/[hash].[ext]' },
    ]
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('styles/bundle.css'),
    new webpack.optimize.CommonsChunkPlugin({ name: 'libs' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
  ]
}
