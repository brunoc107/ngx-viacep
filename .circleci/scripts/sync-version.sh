#!/usr/bin/env bash

echo "cd into the ~/repo/projects/ngx-viacep/ folder"
cd ~/repo/projects/ngx-viacep/

last_tag=$TAG

echo "setting the package version to $last_tag"
npm --no-git-tag-version version ${last_tag}
