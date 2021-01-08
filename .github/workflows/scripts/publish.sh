#!/usr/bin/env bash

echo "Copying the lib package.json"
cp projects/ngx-viacep/package.json ./dist/ngx-viacep/

echo "Copying the lib README.md"
cp ./README.md ./dist/ngx-viacep/

echo "Copying the license"
cp ./LICENSE ./dist/ngx-viacep/

echo "Retrieving credentials"
if [ -z "$NPM_AUTH_TOKEN" ]; then
    echo "EMPTY_TOKEN_ERROR"
    exit 1
fi
echo _auth=$NPM_AUTH_TOKEN >> ./dist/ngx-viacep/.npmrc

cat ./dist/ngx-viacep/.npmrc

echo "Publishing the package"
cd ./dist/ngx-viacep/
npm publish 