$(function() {
  'use strict';

  var model = {
    TOTAL_KITTENS: 5,

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
    ],

    selected: -1,

    setSelected: function(id) {
      var i;
      for (i = 0; i < model.TOTAL_KITTENS; i++) {
        if (model.kittens[i].id === id) {
          model.selected = i;
        }
      }
    },

    updateClicks: function() {
      model.kittens[model.selected].clicks++;
    }
  };

  var controller = {
    init: function() {
      var i;
      for (i = 0; i < model.TOTAL_KITTENS; i++) {
        model.kittens[i].clicks = 0;
        model.kittens[i].html = clickCounterView.init(model.kittens[i]);
        pickListView.init(model.kittens[i]);
      }

      pickListView.render();
      adminView.init();
    },

    showSelected: function(id) {
      model.setSelected(id);
      var cuteAnimal = model.kittens[model.selected];
      clickCounterView.render(cuteAnimal);
      if (adminView.buttonState === 'hide') {
        adminView.buttonState = 'show';
        adminView.render();
      }
      adminView.setValues(cuteAnimal);
    },

    updateSelected: function() {
      model.kittens[model.selected].name = adminView.fields.name.val();
      model.kittens[model.selected].imgurl = adminView.fields.imgurl.val();
      model.kittens[model.selected].clicks = adminView.fields.clicks.val();

      var cuteAnimal = model.kittens[model.selected];
      model.kittens[model.selected].html = clickCounterView.init(cuteAnimal);
      clickCounterView.render(cuteAnimal);
    },

    resetFields: function() {
      adminView.setValues(model.kittens[model.selected]);
    },

    updateClicks: function() {
      model.updateClicks();
      adminView.setValues(model.kittens[model.selected]);
      return model.kittens[model.selected].clicks;
    }
  };

  var pickListView = {
    showSelected: function() {
      var id = $('input[name="animal"]:checked').val();
      controller.showSelected(id);
    },

    init: function(cuteAnimal) {
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

    render: function() {
      $('#picklist-container input[type=radio]').on('change', pickListView.showSelected);
    }
  };

  var adminView = {
    buttonState: 'hide',
    button: $('#admin-button'),
    fieldset: $('.admin-fieldset'),
    fields: {
      name: $('.admin-fieldset #kitten-name'),
      imgurl: $('.admin-fieldset #kitten-imgurl'),
      clicks: $('.admin-fieldset #kitten-clicks')
    },

    init: function() {
      adminView.button.hide();
      adminView.fieldset.hide();
    },

    render: function() {
      $(adminView.button).show();
      $(adminView.button).on('click', function() {
        $(adminView.fieldset).toggle('fast');
      });
      $('#admin-container').on('submit', function(event) {
        controller.updateSelected();
        event.preventDefault();
      });
      $('#admin-container').on('reset', function(event) {
        controller.resetFields();
        event.preventDefault();
      });
    },

    setValues: function(cuteAnimal) {
      $(adminView.fields.name).val(cuteAnimal.name);
      $(adminView.fields.imgurl).val(cuteAnimal.sprite);
      $(adminView.fields.clicks).val(cuteAnimal.clicks);
    },
  };

  var clickCounterView = {
    init: function(cuteAnimal) {
      var $img = $('<img>').attr({
          'class': 'img-animal',
          'id': cuteAnimal.id,
          'alt': cuteAnimal.name,
          'src': cuteAnimal.sprite
        });
      var $counter = $('<span>').text(cuteAnimal.clicks).attr({
          'class': 'click-counter',
          'id': cuteAnimal.id
        });
      var $name = $('<div>').text('Clicks for ' + cuteAnimal.name + ': ').append($counter);
      var $html = $('<div>').attr('class', 'set-container').append($name, $img);
      return $html;
    },

    render: function(cuteAnimal) {
      $('.click-container').html(cuteAnimal.html);
      $('.img-animal#' + cuteAnimal.id).on('click', function() {
        var clicks = controller.updateClicks();
        $('.click-counter#' + cuteAnimal.id).text(clicks);
      });
    }
  };

  controller.init();
}());
