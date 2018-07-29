#!/usr/bin/env bash

echo "cd into the /repo/dist/ngx-viacep"
cd ~/repo/dist/ngx-viacep

echo "authenticating in the NPM registry"
echo "//registry.npmjs.org/:_authToken=$npm_token" >> ~/.npmrc

echo "publishing the lib"
npm publish ${NEXT}
