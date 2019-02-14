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
        app: ['./temp/start.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, './temp/')
                ],
                exclude: [
                    path.resolve(__dirname, './temp/public/')
                ]
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
