var TOTAL_KITTENS = 2;

var clicks = 0;

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

$('#img-kitten').click(function(e) {
  clicks++;
  $("#click-counter").text(clicks);
});
