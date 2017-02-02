# cordova-wheel-selector-plugin
Native wheel selector for Cordova (Android/iOS).

Can use in Cordova or Ionic (v1) frameworks, calls native API's so no clunky javascript used

# Installation

TBD: push to npm registry or something so can have a nicer install


# Usage

## The options that can be set

```
var config = {
    title: "The title",
    items:[
        //how many items to display, see examples below
        //the order of the items dictates the order they are displayed in the UI
        //also the result has an index which refers to the ordering (see examples below)
    ],
    positiveButtonText: "Yes",
    negativeButtonText: "No",
    theme: "light | dark",  //lighter or darker theme
    wrapWheelText: true | false, //wrap the wheel for infinite scroll
    
    //advanced usage:
    displayKey: "description" //so can send in different json TBD: have example for this
    
};

```

# Examples and Screenshots
## Sample Data

Create your data (or get it from a server API call):

```js
var data = {
    numbers: [ 
        {description: "1"},
        {description: "2"},
        {description: "3"},
        {description: "4"},
        {description: "5"},
        {description: "6"},
        {description: "7"},
        {description: "8"},
        {description: "9"},
        {description: "10"}
    ],
    fruits: [
        {description: "Apple"},
        {description: "Orange"},
        {description: "Pear"},
        {description: "Banana"},
        {description: "Grapefruit"},
        {description: "Tangerine"}
    ],
    measurements: [
        {description: "Teaspoon"},
        {description: "Tablespoon"},
        {description: "Cup(s)"},
        {description: "Quart(s)"},
        {description: "Packages (7 oz)"},
        {description: "Packages (12 oz)"}
    ],
    planets: [
        {description: "Venus"},
        {description: "Jupiter"},
        {description: "Earth"},
        {description: "Pluto"},
        {description: "Neptune"}
    ]
};



//config here... (see config for each screenshot below to get desired results)
var config = {...};



//do something useful with the result:

window.SelectorCordovaPlugin.showSelector(config, function(result) {
    console.log("result: " + JSON.stringify(result) );
}, function() {
    console.log('Canceled');
});


```

## Single items, white theme
Using config:

```
var config = {
    title: "How Many Fruit?",
    items:[
        [data.numbers],
        [data.fruit]
    ],
    positiveButtonText: "Done",
    negativeButtonText: "Cancel"
};

```
Produces: 

![Fruits](examples/images/single_items.png)

Results:


## 2 items white theme
Using config:

```
var config = {
    title: "Select a quantity",
    items:[
        [data.numbers]
    ],
    positiveButtonText: "Done",
    negativeButtonText: "Cancel"
};

```
Produces: 

![Fruits](examples/images/fruit.png)


### Results:
```
window.SelectorCordovaPlugin.showSelector(config, function(result) {
    console.log("result: " + JSON.stringify(result) );
    console.log('User chose number: ' + result[0].description + ' at array index: ' + result[0].index);
    console.log('User chose fruit: ' + result[1].description + ' at array index: ' + result[1].index);
}, function() {
    console.log('Canceled');
});

```
### Ouputs:

```
"result: [{"index":2,"description":"3"},{"index":1,"description":"Orange"}]"
"User chose number: 3 at array index: 2"
"User chose fruit: Orange at array index: 1"

```



## 2 items dark theme
Using config:

```
var config = {
    title: "Select a quantity",
    items:[
        [data.numbers],
        [data.measurements]
    ],
    theme: "dark",
    positiveButtonText: "Done",
    negativeButtonText: "Cancel"
};

```
Produces: 

![Measurements](examples/images/quantity_dark_theme.png)



## Many items dark theme, with 'wheel wrapping'
Using config:

```
var config = {
    title: "Select something",
    items:[
        [data.numbers],
        [data.fruits],
        [data.measurements],
        [data.planets]
    ],
    wrapWheelText: true,
    positiveButtonText: "Cool",
    negativeButtonText: "No way!"
};

```
Produces: 

![Measurements](examples/images/multiple_items.png)


## More complicated usage

In some cases (i.e. retrieving data from a server API call), you may get back differing JSON, in that case you can specify which *key* to display in the selector using the *displayKey* in the config, for example if we wish to display the *text* fields in the corresponding JSON from the following data set: 

```
var data = {
    numbers:[
        //intentional blanks - show up in ui as blanks
        {id: "", text: "", value: ""},
        {id: "id1", text: "1", value: "one"},
        {id: "id2", text: "2", value:"two"},
        {id: "id3", text: "3", value:"three"},
        {id: "id4", text: "4", value:"four"},
        {id: "id5", text: "5", value:"five"},
        {id: "id6", text: "6", value:"six"},
        {id: "id7", text: "7", value:"seven"},
        {id: "id8", text: "8", value:"eight"},
        {id: "id9", text: "9", value:"nine"},
        {id: "id10", text: "10", value:"ten"}
    ],
    measurements:[
        //intentional blanks - show up in ui as blanks
        {id: "", text: "", value: ""},
        {id: "id-17", text: "Teaspoon", value:"1tsp"},
        {id: "id-23", text: "Tablespoon", value:"1tbsp"},
        {id: "id-88", text: "Cup(s)", value:"1cup"},
        {id: "id-54", text: "Quart(s)", value:"1quart"},
        {id: "id-32", text: "Package (7 oz)", value:"7ozPckg"},
        {id: "id-58", text: "Package (12 oz)", value:"12ozPckg"}
    ]
};

```

We would use the config, specifying the `displayKey` field to use `text` (if no `displayKey` is defined, the default is `description`):

```
var config = {
    title: "Select quantity",
    items:[
        [data.numbers],
        [data.measurements]
    ],
    wrapWheelText: true,
    positiveButtonText: "Done",
    negativeButtonText: "Cancel",
    displayKey: "text"
};


```
Which produces: 

![Measurements](examples/images/quantity_complex.png)



And the corresponding results, you can use the index to retrieve any other values in the original JSON:

```
window.SelectorCordovaPlugin.showSelector(config, function(result) {
    console.log("result: " + JSON.stringify(result) );
    console.log('User chose number: ' + result[0].text + ' at array index: ' + result[0].index + 
                ' which has value: ' + data.numbers[result[0].index].value + ' and id: ' + data.numbers[result[0].index].id);
    console.log('User chose measurement: ' + result[1].text + ' at array index: ' + result[1].index +
                ' which has value: ' + data.measurements[result[1].index].value + ' and id: ' + data.measurements[result[1].index].id);
}, function() {
    console.log('Canceled');
});

```

Which outputs:

```
"result: [{"index":4,"text":"4"},{"index":4,"text":"Quart(s)"}]"
"User chose number: 4 at array index: 4 which has value: four and id: id4"
"User chose measurement: Quart(s) at array index: 4 which has value: 1quart and id: id-54"
```

Note, in the `result` return value, there is `index` which is the index in the original JSON to the item the user selected (this allows for *reverse-lookups*).    



















# TODO
* implement ios portion
* implement normal web browser portion so can run locally in desktop browser
* add more error handling on weird cases