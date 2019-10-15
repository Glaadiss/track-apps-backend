#!/bin/bash

# This script is executed after the source is copied to the instances
cd /usr/TrackAppsBackend
npm install
tsc
cp .env ./build/
cp ./src/ecosystem.config.js ./build/
cp ./src/loaderio-42aec3808fa962bded32404843aa30fc ./build/
cd /usr/TrackAppsBackend/build
