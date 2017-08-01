var config = {
   entry: './app/main.js',
	
   output: {
      path:'/app',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
            test: /\.css$/,
            loader: 'style-loader!css-loader!autoprefixer-loader',
         },
         {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader',
         },
         { test: /jquery[\\\/]src[\\\/]selector\.js$/, loader: 'amd-define-factory-patcher-loader' }
       ]
   }
}

module.exports = config;