#!/usr/bin/env bash

## Bundle Express and React files

# Remove existing production folder
rm -rf ./build/

# Bundle Express code
tsc && webpack --config ./util/webpack-back.config.js

# Create the directory for React
mkdir -p ./build/public/react/

# Navigate to the react directory
cd ./src/public/react/dashboard

# Build React code
npm run build

# Rename the folder
mv build dashboard

# Move the contains to the build/ dir
mv dashboard ../../../../build/public/react/