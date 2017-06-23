#!/bin/sh

npm install
bower install
ionic cordova resources android
ionic cordova platform add android
ionic cordova resources

echo 'Can now install and run the app...'


