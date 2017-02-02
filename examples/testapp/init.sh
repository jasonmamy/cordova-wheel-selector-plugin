#!/bin/sh

npm install
bower install
ionic resources android
ionic platform add android

echo 'Can now type: ionic serve...'


