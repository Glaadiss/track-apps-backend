#!/bin/bash

# This script is executed after the source is copied to the instances
cd /usr/TrackAppsBackend
npm install
tsc
cp .env ./build/
cp ./src/ecosystem.config.js ./build/
cd /usr/TrackAppsBackend/build
