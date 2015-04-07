var socket = io();

socket.on('card', function() {
  var x = 0;
  var y = 0;
  var position = $('#outer_container').position();
  $('#outer_container').css('transform','translate(' + (x-position.left)  + 'px, ' + (y-position.top) + 'px)');
  $('#outer_container').show();
});
