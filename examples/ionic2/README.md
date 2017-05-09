# Ionic 2 Wheel Selector Example

This is still in the works, once it's pushed into the @ionic-native core project, there will be no need to build

## Building

In the future once the WheelSelector is pushed into the ionic-native project, these build steps will become obsolete.

Clone the ionic-native project:

`git clone https://github.com/driftyco/ionic-native.git`

copy the wheel selector wrapper into the above cloned plugins directory:

`cp -R ./ionic-native/wheel-selector ~/native_cloned_dir/src/@ionic-native/plugins`

Build the plugins above:

`cd ~/native_cloned_dir`

`npm run build`

The plugin can now be 'installed' to your Ionic2 project:

`cp ~/native_cloned_dir/dist/@ionic-native/wheel-selector/ ./node_modules/@ionic-native`


## Usage
Then can use like:
```
import { WheelSelector } from '@ionic-native/wheel-selector';

@Component({
  selector: 'xxx',
  templateUrl: 'xxx',
  providers: [WheelSelector]
})

constructor(... public selector: WheelSelector)

  simpleExample() {

    let jsonData = {
      numbers: [
        { description: "1" },
        { description: "2" },
        { description: "3" }
      ],
      fruits: [
        { description: "Apple" },
        { description: "Banana" },
        { description: "Tangerine" }
      ],
    };

    this.selector.show({
      title: "Select some Fruit",
      items: [
        [jsonData.numbers],
        [jsonData.fruits]
      ],
    }).then(
      result => {
        console.log('Selected: ' + result[0].description + ' at index: ' + result[0].index
          + ' and ' + result[1].description + ' at index: ' + result[1].index);
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }
```

That's it, it should work assuming no errors.
