#!/bin/bash
# This script is used to stop application

cd /usr/TrackAppsBackend/build
pm2 delete all | exit 0
