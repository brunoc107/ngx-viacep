#!/usr/bin/env bash

LIB_OUTPUT_PATH=./dist/brunoc/ngx-viacep/

echo "Copying the lib package.json"
cp projects/brunoc/ngx-viacep/package.json $LIB_OUTPUT_PATH

echo "Copying the lib README.md"
cp ./README.md $LIB_OUTPUT_PATH

echo "Copying the license"
cp ./LICENSE $LIB_OUTPUT_PATH

echo "Retrieving credentials"
if [ -z "$NODE_AUTH_TOKEN" ]; then
    echo "EMPTY_TOKEN_ERROR"
    exit 1
fi

echo "Publishing the package"
cd $LIB_OUTPUT_PATH || exit 1
npm publish
