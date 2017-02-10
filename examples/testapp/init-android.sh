#!/bin/sh

npm install
bower install
ionic resources android
ionic platform add android
ionic resources

echo 'Can now install and run the app...'


