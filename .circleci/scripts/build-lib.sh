#!/usr/bin/env bash

echo "copying the readme and license to the project folder"
cpx ~/repo/README.md ~/repo/projects/ngx-viacep/
cpx ~/repo/LICENSE ~/repo/projects/ngx-viacep/

echo "building  the lib"
npm run lib-build
