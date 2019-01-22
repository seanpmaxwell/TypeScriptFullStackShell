/**
 * Build code for production.
 *
 * created by Sean Maxwell Jan 21, 2018
 */

const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    mode: 'production',
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    entry: {
        app: ['./src/DemoServer.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, './src/DemoServer.js'),
                    path.resolve(__dirname, './src/controllers/')
                ],
                exclude: /\.test.js$/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "demo.bundle.js"
    },
    externals: [
        nodeExternals()
    ]
};
