#!/usr/bin/env bash

export TAG=$(source ~/repo/.circleci/scripts/get-last-tag.sh)
echo "Last tag: ${TAG}"

export BRANCH=$CIRCLE_BRANCH
echo "Current branch: ${BRANCH}"

if [[ ${CIRCLE_BRANCH} == "develop" ]]; then
    export FULL_TAG="${TAG}-alpha";
    export NEXT="--tag next"
elif [[ ${CIRCLE_BRANCH} == "staging" ]]; then
    export FULL_TAG="${TAG}-beta";
    export NEXT="--tag next"
elif [[ ${CIRCLE_BRANCH} == "master" ]]; then
    export FULL_TAG="${TAG}";
    export NEXT=""
fi


echo "Full tag name: ${FULL_TAG}"
