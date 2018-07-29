#!/usr/bin/env bash

echo "cd into the ~/repo/projects/ngx-viacep/ folder"
cd ~/repo/projects/ngx-viacep/

echo "setting the package version to $FULL_TAG"
npm --no-git-tag-version version ${FULL_TAG}
