#!/usr/bin/env bash

echo "cd into the ~/repo/projects/ngx-viacep/ folder"
cd ~/repo/projects/ngx-viacep/
pwd

echo "setting the package version to $CIRCLE_TAG"
npm version $CIRLCE_TAG
