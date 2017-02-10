#!/bin/sh

npm install
bower install
ionic resources android
ionic platform add android
ionic resources

echo 'Can now type: ionic serve...'


