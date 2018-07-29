#!/usr/bin/env bash

cd ~/repo/dist/ngx-viacep

echo "//registry.npmjs.org/:_authToken=$npm_token" >> ~/.npmrc

npm publish
