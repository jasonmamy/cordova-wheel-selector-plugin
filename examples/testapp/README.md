# Test App

Simple ionic test app to show usage of wheel selector

run the `./init.sh` after cloning.

build as usual:

```
ionic platform add android
ionic build android
```

Then can install the apk.  

The `adb_install.sh` will build and push to a device hooked to your local machine.

The `link.sh` will link to the local plugin rather than the one out on npm registry, after running that can use android studio:

Install android studio, and open it, then create a blank project, then:

`File->new->import project` and browse to the `platforms/android` directory and import from that directory (there's a gradle script in there).

This should allow for IDE auto-completion, etc.  

If you modify any file other than the `.java` file you need to uninstall the plugin and re-install it, re-run the `link.sh` script.

