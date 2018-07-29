#!/usr/bin/env bash

echo "//registry.npmjs.org/:_authToken=$npm_token" > ~/repo/.npmrc

echo $npm_token
