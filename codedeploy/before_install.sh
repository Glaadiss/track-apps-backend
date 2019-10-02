  
#!/bin/bash

# This script is executed before copying the source

yum -y update

curl --silent --location https://rpm.nodesource.com/setup_12.x | bash -
yum -y install nodejs


export app_root=/usr/TrackAppsBackend
if [ -d "$app_root" ];then
    rm -rf /usr/TrackAppsBackend
    mkdir -p /usr/TrackAppsBackend
else
    mkdir -p /usr/TrackAppsBackend
fi