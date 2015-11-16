var clicks = 0;

$('#img-kitten').click(function(e) {
  clicks++;
  $("#click-counter").text(clicks);
});
