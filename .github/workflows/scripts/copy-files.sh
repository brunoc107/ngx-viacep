#!/usr/bin/env bash

echo "Copying the lib package.json"
cp projects/ngx-viacep/package.json ./dist/ngx-viacep/

echo "Copying the lib README.md"
cp ./README.md ./dist/ngx-viacep/

echo "Copying the license"
cp ./LICENSE ./dist/ngx-viacep/