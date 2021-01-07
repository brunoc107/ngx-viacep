#!/usr/bin/env bash

echo $(git tag | sort -V | tail -1)
