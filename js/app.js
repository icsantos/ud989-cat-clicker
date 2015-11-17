/**
 * The number of kittens to display
 * @constant
 * @type {number}
 * @default
 */
var TOTAL_KITTENS = 2;

/**
 * The container for displaying the cute animal
 * @type {jQuery}
 */
var $main = $('main');

// --------------------------------------------------
// CuteAnimal superclass
// --------------------------------------------------
/**
 * @constructor
 * @classdesc A superclass of the cute animals we will use in the app.
 * @param {kittens} obj - An object containing the image sprite URL, width and height.
 * @property {string} sprite - The URL of the image sprite.
 * @property {string} id - The id of the cute animal.
 * @property {string} name - The name of the cute animal.
 * @property {number} clicks - The number of clicks received by the cute animal.
 */
 var CuteAnimal = function (obj) {
  'use strict';
  this.sprite = obj.sprite;
  this.id = obj.id;
  this.name = obj.name;
  this.clicks = 0;
  this.render();
  this.addEventHandler();
};

/**
 * Draw the cute animal on the screen.
 */
CuteAnimal.prototype.render = function () {
  'use strict';
  var $img = $('<img>').attr({
    'class': 'img-animal',
    'id': this.id,
    'alt': this.name,
    'src': this.sprite
  });
  var $name = $('<span>').text('Clicks for ' + this.name + ': ');
  var $counter = $('<span>').text(0).attr({
    'class': 'click-counter',
    'id': this.id
  });
  var $div = $('<div>').attr('class', 'set-container').append($img, $name, $counter);
  $main.append($div);
};

/**
 * Add event handler for the cute animal.
 */
CuteAnimal.prototype.addEventHandler = function () {
  var self = this;
  $('.img-animal#' + this.id).click(function() {
    self.clicks++;
    $('.click-counter#' + this.id).text(self.clicks);
  });
};

// --------------------------------------------------
// Kitten class
// --------------------------------------------------
/**
 * Array of objects that will be used to instantiate a cute kitten
 * @typedef {object} kittens
 * @type {Object[]}
 * @property {string} sprite - The URL of the image sprite.
 * @property {string} id - The id of the cute animal.
 * @property {string} name - The name of the cute animal.
 * @property {number} clicks - The number of clicks received by the cute animal.
 * @example
 * var kittens = [
 *   {
 *     sprite: 'img/princessleia.jpg',
 *     id: 'kitten-princessleia',
 *     name: 'Princess Leia',
 *     imgSrc: 'http://ww3.hdnux.com/photos/31/24/44/6637850/3/920x920.jpg'
 *   }, {
 *     sprite: 'img/doctorwho.jpg',
 *     id: 'kitten-doctorwho',
 *     name: 'The Doctor',
 *     imgSrc: 'http://i1.wp.com/imagizer.imageshack.us/v2/1024x768q90/845/0cw8f.jpg?resize=693%2C460'
 *   }
 * ];
 */
var kittens = [
  {
    sprite: 'img/princessleia.jpg',
    id: 'kitten-princessleia',
    name: 'Princess Leia',
    imgSrc: 'http://ww3.hdnux.com/photos/31/24/44/6637850/3/920x920.jpg'
  }, {
    sprite: 'img/doctorwho.jpg',
    id: 'kitten-doctorwho',
    name: 'The Doctor',
    imgSrc: 'http://i1.wp.com/imagizer.imageshack.us/v2/1024x768q90/845/0cw8f.jpg?resize=693%2C460'
  }, {
    sprite: 'img/gandalf.jpg',
    id: 'kitten-gandalf',
    name: 'Gandalf',
    imgSrc: 'http://i0.wp.com/imagizer.imageshack.us/v2/1024x768q90/837/fjr7.jpg?resize=344%2C519'
  }, {
    sprite: 'img/daenerys.jpg',
    id: 'kitten-daenerys',
    name: 'Daenerys',
    imgSrc: 'http://ww4.hdnux.com/photos/31/24/44/6637839/3/1024x1024.jpg'
  }, {
    sprite: 'img/kermit.jpg',
    id: 'kitten-kermit',
    name: 'Kermit',
    imgSrc: 'http://i728.photobucket.com/albums/ww287/popcornkids/KittenFrogHat.jpg'
  }
];

/**
 * @constructor
 * @extends CuteAnimal
 */
var Kitten = function (obj) {
  'use strict';
  CuteAnimal.call(this, obj);
};
Kitten.prototype = Object.create(CuteAnimal.prototype); // subclass prototype delegation
Kitten.prototype.constructor = Kitten; // reset constructor from CuteAnimal to Kitten

// --------------------------------------------------
// Instantiate objects
// --------------------------------------------------
/**
 * Array of instances of the Kitten class
 * @type {Kitten[]}
 */
var cats = [], i;
for (i = 0; i < TOTAL_KITTENS; i++) {
  cats.push(new Kitten(kittens[i]));
}
