#!/bin/sh

#link to the plugin rather than getting the installed on out on npm registry
cordova plugin rm cordova-wheel-selector-plugin
cordova plugin add --link ../../
