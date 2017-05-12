import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { WheelSelectorItem } from '@ionic-native/wheel-selector';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [WheelSelector]
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

  public selected = '';

  constructor(public navCtrl: NavController, public selector: WheelSelector) {
  }

  simpleFruit() {
    this.selector.show({
      title: "How Much?",
      items: [
        this.simpledata.numbers, this.simpledata.fruits
      ],
      positiveButtonText: "Ok",
      negativeButtonText: "Nope",
      wrapWheelText: true,
    }).then(
      result => {
        this.selected = 'Selected: ' + result[0].description + ' ' + result[1].description;
      },
      err => console.log('Error occurred while getting result: ' + JSON.stringify(err))
      );
  }

  selectNumber() {
    this.selector.show({
      title: "How Many?",
      items: [
        this.simpledata.numbers
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
        this.simpledata.numbers,
        this.simpledata.measurements,
        this.simpledata.fruits
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
        this.simpledata.numbers,
        this.simpledata.measurements,
        this.simpledata.fruits,
        this.simpledata.planets
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
        this.simpledata.numbers,
        this.simpledata.measurements
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
      title: "Default selected values should be: 3 Grapefruit",
      items: [
        this.simpledata.numbers,
        this.simpledata.fruits
      ],
      wrapWheelText: true,
      defaultItems: [
        this.simpledata.numbers[2],
        this.simpledata.fruits[4]
      ]
    }).then(
      result => {
        this.selected = 'Selected: ' + result[0].description + ' ' + result[1].description;
      },
      err => console.log('Error occurred while getting result: ', err)
      );
  }
}
