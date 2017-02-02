#!/bin/sh

cordova plugin rm cordova-wheel-selector-plugin
cordova plugin add cordova-wheel-selector-plugin
#cordova plugin add --link /home/jasona/git/cordova-wheel-selector-plugin
$ANDROID_HOME/platform-tools/adb uninstall com.ionicframework.myapp417044
ionic build android
$ANDROID_HOME/platform-tools/adb install platforms/android/build/outputs/apk/android-debug.apk
$ANDROID_HOME/platform-tools/adb shell am start -n io.appium.unlock/.Unlock
$ANDROID_HOME/platform-tools/adb shell am start -n com.ionicframework.myapp417044/.MainActivity



#/home/jasona/apps/android-sdk-linux/platform-tools/adb uninstall com.ionicframework.myapp417044
#ionic build android
#/home/jasona/apps/android-sdk-linux/platform-tools/adb install platforms/android/build/outputs/apk/android-debug.apk
#/home/jasona/apps/android-sdk-linux/platform-tools/adb shell am start -n io.appium.unlock/.Unlock
#/home/jasona/apps/android-sdk-linux/platform-tools/adb shell am start -n com.ionicframework.myapp417044/.MainActivity

