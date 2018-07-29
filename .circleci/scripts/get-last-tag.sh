#!/usr/bin/env bash

echo $(git tag | sort -V | egrep ^[0-9]+\.[0-9]+\.[0-9]+$ | tail -1)
