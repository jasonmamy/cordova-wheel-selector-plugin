import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [WheelSelector]
})
export class HomePage {

  jsonData = {
    numbers: [
      { description: "1" },
      { description: "2" },
      { description: "3" },
      { description: "4" },
      { description: "5" },
      { description: "6" },
      { description: "7" },
      { description: "8" },
      { description: "9" },
      { description: "10" }
    ],
    fruits: [
      { description: "Apple" },
      { description: "Orange" },
      { description: "Pear" },
      { description: "Banana" },
      { description: "Grapefruit" },
      { description: "Tangerine" }
    ],
    measurements: [
      { description: "Teaspoon" },
      { description: "Tablespoon" },
      { description: "Cup(s)" },
      { description: "Quart(s)" },
      { description: "Packages (7 oz)" },
      { description: "Packages (12 oz)" }
    ],
    planets: [
      { description: "Venus" },
      { description: "Jupiter" },
      { description: "Earth" },
      { description: "Pluto" },
      { description: "Neptune" }
    ],
    firstNames: [
      { name: "Fred", id: '1' },
      { name: "Jane", id: '2' },
      { name: "Bob", id: '3' },
      { name: "Earl", id: '4' },
      { name: "Eunice", id: '5' }
    ],
    lastNames: [
      { name: "Johnson", id: '100' },
      { name: "Doe", id: '101' },
      { name: "Kinishiwa", id: '102' },
      { name: "Gordon", id: '103' },
      { name: "Smith", id: '104' }
    ],
    uuids: [
      { id: "f70432b8-db2a-4cc3-a3a1-1e06c09cf814" },
      { id: "435e01f1-77c1-4154-9a2f-531b64297db2" },
      { id: "652b4ff5-c8a0-480e-bfd1-abb47c983914" },
      { id: "8ef9abe3-0968-4265-a6b2-dec270a85920" },
      { id: "c064fcb5-49e6-4976-bc60-c2eeda601f4b" }
    ],
  }

  selected: string;

  constructor(public navCtrl: NavController, public selector: WheelSelector) {
  }

  //more complex as overrides which key to display
  //then retrieve properties from original data
  selectNames() {
    this.selector.show({
      title: "Who?",
      items: [
        this.jsonData.firstNames, this.jsonData.lastNames
      ],
      displayKey: 'name',
      defaultItems: [
        this.jsonData.firstNames[2],
        this.jsonData.lastNames[3]
      ]
    }).then(
      result => {
        this.selected = result[0].name + ' (id= ' + this.jsonData.firstNames[result[0].index].id + '), ' +
          result[1].name + ' (id=' + this.jsonData.lastNames[result[1].index].id + ')';
      },
      err => console.log('Error occurred while getting result: ' + JSON.stringify(err))
      );
  }

  selectUuids() {
    this.selector.show({
      title: "Select a UUID",
      items: [
        this.jsonData.uuids
      ],
      displayKey: 'id'
    }).then(
      result => {
        this.selected = result[0].id;
      },
      err => console.log('Error occurred while getting result: ' + JSON.stringify(err))
      );
  }

  simpleFruit() {
    this.selector.show({
      title: "How Much?",
      items: [
        this.jsonData.numbers, this.jsonData.fruits
      ],
      positiveButtonText: "Ok",
      negativeButtonText: "Nope",
      wrapWheelText: true,
    }).then(
      result => {
        this.selected = result[0].description + ' ' + result[1].description;
      },
      err => console.log('Error occurred while getting result: ' + JSON.stringify(err))
      );
  }

  selectNumber() {
    this.selector.show({
      title: "How Many?",
      items: [
        this.jsonData.numbers
      ],
    }).then(
      result => {
        console.log('*******result:' + JSON.stringify(result));
        this.selected = result[0].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }

  selectFruitQuantity() {
    this.selector.show({
      title: "How Many?",
      items: [
        this.jsonData.numbers,
        this.jsonData.measurements,
        this.jsonData.fruits
      ],
    }).then(
      result => {
        this.selected = result[0].description + ' ' + result[1].description + ' ' + result[2].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }

  selectFruitQuantityFromPlanet() {
    this.selector.show({
      title: "How Many?",
      items: [
        this.jsonData.numbers,
        this.jsonData.measurements,
        this.jsonData.fruits,
        this.jsonData.planets
      ],
      wrapWheelText: true
    }).then(
      result => {
        console.log('*******result:' + JSON.stringify(result));

        this.selected = result[0].description + ' ' + result[1].description + ' ' + result[2].description + ' ' + result[3].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }
  selectQuanity() {
    this.selector.show({
      title: "How Many?",
      items: [
        this.jsonData.numbers,
        this.jsonData.measurements
      ],
      wrapWheelText: true
    }).then(
      result => {
        this.selected = result[0].description + ' ' + result[1].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }

  selectWithDefaultValues() {

    this.selector.show({
      title: "Default selected values should be: 3 Grapefruit",
      items: [
        this.jsonData.numbers,
        this.jsonData.fruits
      ],
      wrapWheelText: true,
      defaultItems: [
        this.jsonData.numbers[2],
        this.jsonData.fruits[4]
      ]
    }).then(
      result => {
        this.selected = result[0].description + ' ' + result[1].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }
}
