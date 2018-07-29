#!/usr/bin/env bash

export TAG=$(source ./get-last-tag.sh)
echo "Last tag: ${TAG}"

export BRANCH=$CIRCLE_BRANCH
echo "Current branch: ${BRANCH}"

if [[ ${CIRCLE_BRANCH} == "develop" ]]; then
    export FULL_TAG="${TAG}-alpha";
elif [[ ${CIRCLE_BRANCH} == "staging" ]]; then
    export FULL_TAG="${TAG}-beta";
elif [[ ${CIRCLE_BRANCH} == "master" ]]; then
    export FULL_TAG="${TAG}";
fi


echo "Full tag name: ${FULL_TAG}"
