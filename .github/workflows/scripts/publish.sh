#!/usr/bin/env bash

echo "Retrieving credentials"
if [ -z "$NPM_AUTH_TOKEN" ]; then
    echo "EMPTY_TOKEN_ERROR"
    exit 1
fi
echo _auth=$NPM_AUTH_TOKEN >> ./dist/ngx-viacep/.npmrc

echo "Publishing the package"
cd ./dist/ngx-viacep/
npm publish 