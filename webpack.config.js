// Import needed plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

// Require needed packages
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
} 
else if(process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
}

// Export the Webpack configuration
module.exports = (env) => {
    // Check we are running webpack in production mode
    const isProduction = env === 'production';

    // Setup ExtractText plugin
    const CSSExtract = new ExtractTextPlugin('styles.css');

    // Return configuration settings we want to export
    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    // Rules for .js files
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                }, 
                {
                    // Rules for .css/.scss files
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }
            ]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        // Use source map depending on whether building for production or development
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};