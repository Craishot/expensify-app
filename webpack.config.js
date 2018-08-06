// Import needed plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Require needed packages
const path = require('path');

// Export the Webpack configuration
module.exports = (env) => {
    // Check we are running webpack in production mode
    const isProduction = env === 'production';

    // Setup ExtractText plugin
    const CSSExtract = new ExtractTextPlugin('styles.css');

    // Return cofiguration settings we want to export
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
            CSSExtract
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