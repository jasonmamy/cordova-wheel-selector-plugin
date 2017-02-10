#!/bin/sh

npm install
bower install
ionic resources ios 
ionic platform add ios
ionic resources

echo 'Can now install and run the app...'


