var webpack = require('webpack'),
    path = require('path'),
	CopyWebpackPlugin = require('copy-webpack-plugin');
 
module.exports = {
    plugins: [
	    new webpack.LoaderOptionsPlugin({
           	debug: true
         }),
	     new CopyWebpackPlugin([{ 
		     from: 'app/*.html', flatten: true }
	        ], {})
	    
    ],
    entry: {
        main: './app/main.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
	  test: /\.es6.js$/,
	  loader: "babel-loader"
	}]
    }
};
