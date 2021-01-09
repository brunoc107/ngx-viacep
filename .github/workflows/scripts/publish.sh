#!/usr/bin/env bash

echo "Updating the version"
node sync-version.js

echo "Copying the lib package.json"
cp projects/ngx-viacep/package.json ./dist/ngx-viacep/

echo "Copying the lib README.md"
cp ./README.md ./dist/ngx-viacep/

echo "Copying the license"
cp ./LICENSE ./dist/ngx-viacep/

echo "Retrieving credentials"
if [ -z "$NODE_AUTH_TOKEN" ]; then
    echo "EMPTY_TOKEN_ERROR"
    exit 1
fi

echo "Publishing the package"
cd ./dist/ngx-viacep/ || exit 1
npm publish
