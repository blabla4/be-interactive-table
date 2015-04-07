var socket = io();

socket.on('card', function(param) {
  var x = param.x;
  var y = param.y;
  $('#outer_container').css('left', x + 'px');
  $('#outer_container').css('top', y-120 + 'px');
  $('#outer_container').show();
});
