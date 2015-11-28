$(function () {
  'use strict';

  var model = {
    /**
     * The number of kittens to display
     * @constant
     * @type {number}
     * @default
     */
    TOTAL_KITTENS: 5,

    /**
     * Array of cute kittens
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
     *     clicks: 0,
     *     imgSrc: 'http://ww3.hdnux.com/photos/31/24/44/6637850/3/920x920.jpg'
     *   }, {
     *     sprite: 'img/doctorwho.jpg',
     *     id: 'kitten-doctorwho',
     *     name: 'The Doctor',
     *     imgSrc: 'http://i1.wp.com/imagizer.imageshack.us/v2/1024x768q90/845/0cw8f.jpg?resize=693%2C460'
     *   }
     * ];
     */
    kittens: [{
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
    ]
  };

  var controller = {
    init: function () {
      var i;
      for (i = 0; i < model.TOTAL_KITTENS; i++) {
        model.kittens[i].clicks = 0;
        model.kittens[i].html = clickCounterView.init(model.kittens[i]);
        pickListView.init(model.kittens[i]);
      }

      pickListView.render();
    },

    updateClicks: function (id) {
      var i;
      for (i = 0; i < model.TOTAL_KITTENS; i++) {
        if (model.kittens[i].id === id) {
          return ++model.kittens[i].clicks;
        }
      }
      return 0;
    },

    showSelected: function (id) {
      var cuteAnimal = $.grep(model.kittens, function (e) {
          return e.id === id;
        })[0];
      clickCounterView.render(cuteAnimal);
    }
  };

  var pickListView = {
    showSelected: function () {
      var id = $('input[name="animal"]:checked').val();
      controller.showSelected(id);
    },

    init: function (cuteAnimal) {
      var $input = $('<input>').attr({
          'type': 'radio',
          'name': 'animal',
          'value': cuteAnimal.id,
          'id': cuteAnimal.id
        });
      var $label = $('<label>').attr('for', cuteAnimal.id).text(cuteAnimal.name);
      var $br = $('<br>');
      $('#picklist-container').append($input, $label, $br);
    },
    
    render: function () {
      $('#picklist-container input[type=radio]').on('change', pickListView.showSelected);
    }
  };

  var clickCounterView = {
    init: function (cuteAnimal) {
      var $img = $('<img>').attr({
          'class': 'img-animal',
          'id': cuteAnimal.id,
          'alt': cuteAnimal.name,
          'src': cuteAnimal.sprite
        });
      var $counter = $('<span>').text(0).attr({
          'class': 'click-counter',
          'id': cuteAnimal.id
        });
      var $name = $('<div>').text('Clicks for ' + cuteAnimal.name + ': ').append($counter);
      var $html = $('<div>').attr('class', 'set-container').append($name, $img);
      return $html;
    },

    render: function (cuteAnimal) {
      $('.click-container').html(cuteAnimal.html);
      $('.img-animal#' + cuteAnimal.id).on('click', function () {
        var clicks = controller.updateClicks(cuteAnimal.id);
        $('.click-counter#' + cuteAnimal.id).text(clicks);
      });

    }
  };

  controller.init();
}());
