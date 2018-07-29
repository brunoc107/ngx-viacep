#!/usr/bin/env bash

cd ~/repo/projects/ngx-viacep

echo $CIRCLE_TAG

npm version $CIRLCE_TAG
