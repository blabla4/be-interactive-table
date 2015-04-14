var socket = io();
var currentContainer = null;
var currentMenuButton = null;
var subMenuTv = null;
var subMenuLights = null;
var subMenuVideo = null;

socket.on('card', function(param) {
  var x = param.x;
  var y = param.y;
  $('#outer_container').css('left', x + 'px');
  $('#outer_container').css('top', y-120 + 'px');
  $('#outer_container').show();
});

window.onload = function() {
  $(document).mouseup(function (e)
  {
    if(subMenuTv !== null) {
      if (!subMenuTv.is(e.target) && subMenuTv.has(e.target).length === 0)
      {
        setTimeout(function() {
          subMenuTv.remove();
          subMenuTv = null;
        }, 300);
      }
    }

    if(subMenuLights !== null) {
      if (!subMenuLights.is(e.target) && subMenuLights.has(e.target).length === 0)
      {
        setTimeout(function() {
          subMenuLights.remove();
          subMenuLights = null;
        }, 300);
      }
    }

    if(subMenuVideo !== null) {
      if (!subMenuVideo.is(e.target) && subMenuVideo.has(e.target).length === 0)
      {
        $(".videoContainer").remove();
        setTimeout(function() {
          subMenuVideo.remove();
          subMenuVideo = null;
        }, 300);
      }
    }

    var container = currentContainer;
    if(container !== null) {
      if (!container.is(e.target) && container.has(e.target).length === 0)
      {
        if(container.hasClass('active')) {
          currentMenuButton.trigger('click');
        }
        setTimeout(function() {
          currentContainer.remove();
          currentContainer = null;
        }, 300);
      }
    } else {
      createMenu(e.clientX, e.clientY);
      setTimeout(function() {
        currentMenuButton.trigger('click');
      }, 300);
    }
  });
};

function deleteMenu() {
  if(currentContainer.hasClass('active')) {
    currentMenuButton.trigger('click');
  }
  setTimeout(function() {
    currentContainer.remove();
    currentContainer = null;
  }, 300);
}

function createMenu(x, y) {
  var container = $('<div></div>', {
    id:'outer_container',
    class: 'outer_container draggable tap-target'
  }).appendTo('#background');
  container.css('left', (x-36) + 'px');
  container.css('top', (y+36) + 'px');
  currentContainer = container;

  var menuButton = $('<a class="menu_button" href="#" title="Toggle"><span>Menu Toggle</span></a>').appendTo(container);
  currentMenuButton = menuButton;

  var menu = $('<ul class="menu_option">').appendTo(container);
  $('<li><a href="#"><span class="camera" onclick="createSubMenuVideo()">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="temp">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="lights" onclick="createSubMenuLights()">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="tv" onclick="createSubMenuTv()">Item</span></a></li>').appendTo(menu);

  container.PieMenu({
    'starting_angle': 0,
    'angel_difference' : 360,
    'radius': 175,
  });
}

function createSubMenuVideo() {
  if(subMenuVideo !== null) {
    return;
  }

  var container = $('<div></div>', {
    class: 'outer_container draggable tap-target'
  }).appendTo('#background');
  container.css('left', (currentContainer.position().left+175-8) + 'px');
  container.css('top', (currentContainer.position().top-8) + 'px');

  var menuButton = $('<a class="menu_button" href="#" title="Toggle"><span>Menu Toggle</span></a>').appendTo(container);
  menuButton.css('background-color', 'rgb(68,68,68)');
  menuButton.css('background-image', 'url("../images/camera.svg")');
  menuButton.css('background-size', '60%');
  menuButton.css('background-repeat', 'no-repeat');
  menuButton.css('background-position-x', '50%');
  menuButton.css('background-position-y', '50%');
  setTimeout(function() {
    menuButton.trigger('click');
    deleteMenu();
  }, 100);

  var menu = $('<ul class="menu_option">').appendTo(container);
  $('<li><a href="#"><span class="camera" onclick="showCamera(1)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="camera1" onclick="showCamera(2)">Item</span></a></li>').appendTo(menu);


  container.PieMenu({
    'starting_angle': 0,
    'angel_difference' : 360,
    'radius': 120,
  });

  subMenuVideo = container;
}

function showCamera(id) {
  if(id == 1) {
    var container = $('<div></div>', {
      class: 'videoContainer draggable'
    }).appendTo('#background');
    $('<img></img>', {
      src: 'http://cs.isen.fr/camera/mjpg/video.mjpg'
    }).appendTo(container);
  } else {
    var container2 = $('<div></div>', {
      class: 'videoContainer draggable'
    }).appendTo('#background');
    $('<img></img>', {
      src: 'http://cs.isen.fr/camera2/mjpg/video.mjpg'
    }).appendTo(container2);
  }
}

function createSubMenuTv() {
  if(subMenuTv !== null) {
    return;
  }

  var container = $('<div></div>', {
    class: 'outer_container draggable tap-target'
  }).appendTo('#background');
  container.css('left', (currentContainer.position().left-8) + 'px');
  container.css('top', (currentContainer.position().top+175-8) + 'px');

  var menuButton = $('<a class="menu_button" href="#" title="Toggle"><span>Menu Toggle</span></a>').appendTo(container);
  menuButton.css('background-color', 'rgb(68,68,68)');
  menuButton.css('background-image', 'url("../images/tv.svg")');
  menuButton.css('background-size', '60%');
  menuButton.css('background-repeat', 'no-repeat');
  menuButton.css('background-position-x', '50%');
  menuButton.css('background-position-y', '50%');
  setTimeout(function() {
    menuButton.trigger('click');
    deleteMenu();
  }, 100);

  var menu = $('<ul class="menu_option">').appendTo(container);
  $('<li><a href="#"><span class="tf1" onclick="swapChannel(1)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="f2" onclick="swapChannel(2)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="m6" onclick="swapChannel(6)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="arte" onclick="swapChannel(7)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="d8" onclick="swapChannel(8)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="w9" onclick="swapChannel(9)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="bfm" onclick="swapChannel(15)">Item</span></a></li>').appendTo(menu);

  container.PieMenu({
    'starting_angle': 0,
    'angel_difference' : 360,
    'radius': 120,
  });

  subMenuTv = container;
}

function swapChannel(channel) {
  $.get('http://10.134.15.103/api/tv/channels/' + channel);
}

function createSubMenuLights() {
  if(subMenuLights !== null) {
    return;
  }

  var container = $('<div></div>', {
    class: 'outer_container draggable tap-target'
  }).appendTo('#background');
  container.css('left', (currentContainer.position().left-175-8) + 'px');
  container.css('top', (currentContainer.position().top-8) + 'px');

  var menuButton = $('<a class="menu_button" href="#" title="Toggle"><span>Menu Toggle</span></a>').appendTo(container);
  menuButton.css('background-color', 'rgb(68,68,68)');
  menuButton.css('background-image', 'url("../images/lights.svg")');
  menuButton.css('background-size', '60%');
  menuButton.css('background-repeat', 'no-repeat');
  menuButton.css('background-position-x', '50%');
  menuButton.css('background-position-y', '50%');
  setTimeout(function() {
    menuButton.trigger('click');
    deleteMenu();
  }, 100);

  var menu = $('<ul class="menu_option">').appendTo(container);
  $('<li><a href="#"><span class="color1">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color2">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="power">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color3">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color1">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color2">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color3">Item</span></a></li>').appendTo(menu);

  container.PieMenu({
    'starting_angle': 0,
    'angel_difference' : 360,
    'radius': 120,
  });

  subMenuLights = container;
}
