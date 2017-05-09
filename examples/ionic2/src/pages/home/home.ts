import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JasboPlugin } from '@ionic-native/jasbo-plugin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [JasboPlugin]
})
export class HomePage {

  simpledata = {
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
    ]
  }

  complex = {
    numbers: [
      //intentional blanks - show up in ui as blanks
      { id: "", text: "", value: "" },
      { id: "id1", text: "1", value: "one" },
      { id: "id2", text: "2", value: "two" },
      { id: "id3", text: "3", value: "three" },
      { id: "id4", text: "4", value: "four" },
      { id: "id5", text: "5", value: "five" },
      { id: "id6", text: "6", value: "six" },
      { id: "id7", text: "7", value: "seven" },
      { id: "id8", text: "8", value: "eight" },
      { id: "id9", text: "9", value: "nine" },
      { id: "id10", text: "10", value: "ten" }
    ],
    measurements: [
      //intentional blanks - show up in ui as blanks
      { id: "", text: "", value: "" },
      { id: "id-17", text: "Teaspoon", value: "1tsp" },
      { id: "id-23", text: "Tablespoon", value: "1tbsp" },
      { id: "id-88", text: "Cup(s)", value: "1cup" },
      { id: "id-54", text: "Quart(s)", value: "1quart" },
      { id: "id-32", text: "Package (7 oz)", value: "7ozPckg" },
      { id: "id-58", text: "Package (12 oz)", value: "12ozPckg" }
    ]
  }

  public selected = '';

  constructor(public navCtrl: NavController, public selector: JasboPlugin) {
  }

  simpleFruit() {
    this.selector.show({
      title: "How Much?",
      items: [
        [this.simpledata.numbers],
        [this.simpledata.fruits]
      ],
      positiveButtonText: "Ok",
      negativeButtonText: "Nope",
      wrapWheelText: true,
    }).then(
      result => {
        this.selected = 'Selected: ' + result[0].description + ' ' + result[1].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }

  selectNumber() {
    this.selector.show({
      title: "How Many?",
      items: [
        [this.simpledata.numbers]
      ],
    }).then(
      result => {
        this.selected = 'Selected: ' + result[0].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }

  selectFruitQuantity() {
    this.selector.show({
      title: "How Many?",
      items: [
        [this.simpledata.numbers],
        [this.simpledata.measurements],
        [this.simpledata.fruits]
      ],
    }).then(
      result => {
        this.selected = 'Selected: ' + result[0].description + ' ' + result[1].description + ' ' + result[2].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }

  selectFruitQuantityFromPlanet() {
    this.selector.show({
      title: "How Many?",
      items: [
        [this.simpledata.numbers],
        [this.simpledata.measurements],
        [this.simpledata.fruits],
        [this.simpledata.planets]
      ],
      wrapWheelText: true
    }).then(
      result => {
        this.selected = 'Selected: ' + result[0].description + ' ' + result[1].description + ' ' + result[2].description + ' ' + result[3].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }
  selectQuanity() {
    this.selector.show({
      title: "How Many?",
      items: [
        [this.simpledata.numbers],
        [this.simpledata.measurements]
      ],
      wrapWheelText: true
    }).then(
      result => {
        this.selected = 'Selected: ' + result[0].description + ' ' + result[1].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );

  }
  selectWithDefaultValues() {
    this.selector.show({
      title: "Default selected values should be: 3 Pear",
      items: [
        [this.simpledata.numbers],
        [this.simpledata.fruits]
      ],
      wrapWheelText: true,
      defaultItems: ["3", "Pear"]
    }).then(
      result => {
        this.selected = 'Selected: ' + result[0].description + ' ' + result[1].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }

  selectDefaultValuesDoNotExist() {
    this.selector.show({
      title: "Default selected values should be: 1 Apple",
      items: [
        [this.simpledata.numbers],
        [this.simpledata.fruits]
      ],
      defaultItems: ["71", "Figs"] //these don't exist, so default to 1st item(s)
    }).then(
      result => {
        this.selected = 'Selected: ' + result[0].description + ' ' + result[1].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }
}
