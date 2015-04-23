var socket = io();
var currentContainer = null;
var currentMenuButton = null;
var subMenuTv = null;
var subMenuLights = null;
var subMenuTemp = null;
var subMenuVideo = null;
var subMenuMonitor = null;
var lightsOn = true;
var tvOn = true;

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
    if(subMenuTemp !== null) {
      if (!subMenuTemp.is(e.target) && subMenuTemp.has(e.target).length === 0)
      {
        setTimeout(function() {
          subMenuTemp.remove();
          subMenuTemp = null;
        }, 300);
      }
    }

    if(subMenuMonitor !== null) {
      if (!subMenuMonitor.is(e.target) && subMenuMonitor.has(e.target).length === 0)
      {
        setTimeout(function() {
          subMenuMonitor.remove();
          subMenuMonitor = null;
        }, 300);
      }
    }

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
  $('<li><a href="#"><span class="temp" onclick="createSubMenuTemp()">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="lights" onclick="createSubMenuLights()">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="tv" onclick="createSubMenuTv()">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="monitor" onclick="createSubMenuMonitor()">Item</span></a></li>').appendTo(menu);

  container.PieMenu({
    'starting_angle': 0,
    'angel_difference' : 360,
    'radius': 175,
  });
}

function createSubMenuTemp() {
  if(subMenuTemp !== null) {
    return;
  }

  var container = $('<div></div>', {
    class: 'outer_container draggable tap-target'
  }).appendTo('#background');
  container.css('left', (currentContainer.position().left+175-8) + 'px');
  container.css('top', (currentContainer.position().top-8) + 'px');

  var menuButton = $('<a class="menu_button" href="#" title="Toggle"><span>Menu Toggle</span></a>').appendTo(container);
  menuButton.css('background-color', 'rgb(68,68,68)');
  menuButton.css('background-image', 'url("../images/mother.png")');
  menuButton.css('background-size', '50%');
  menuButton.css('background-repeat', 'no-repeat');
  menuButton.css('background-position-x', '50%');
  menuButton.css('background-position-y', '50%');

  setTimeout(function() {
    menuButton.trigger('click');
    deleteMenu();
  }, 100);

  var menu = $('<ul class="menu_option">').appendTo(container);
  $('<li><a href="#"><span class="cookie1" onclick="showTemp(1)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="cookie2" onclick="showTemp(2)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="cookie3" onclick="showTemp(3)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="cookie4" onclick="showTemp(4)">Item</span></a></li>').appendTo(menu);
  $(".cookie1").css("background-size","45% 70%");
  $(".cookie2").css("background-size","45% 70%");
  $(".cookie3").css("background-size","45% 70%");
  $(".cookie4").css("background-size","45% 70%");

  container.PieMenu({
    'starting_angle': 0,
    'angel_difference' : 360,
    'radius': 120,
  });

  subMenuTemp = container;
}

function showTemp(id) {

}


function createSubMenuMonitor() {
  if(subMenuMonitor !== null) {
    return;
  }

  var container = $('<div></div>', {
    class: 'outer_container draggable tap-target'
  }).appendTo('#background');
  container.css('left', (currentContainer.position().left+175-8) + 'px');
  container.css('top', (currentContainer.position().top-8) + 'px');

  var menuButton = $('<a class="menu_button" href="#" title="Toggle"><span>Menu Toggle</span></a>').appendTo(container);
  menuButton.css('background-color', 'rgb(68,68,68)');
  menuButton.css('background-image', 'url("../images/monitoring.svg")');
  menuButton.css('background-size', '60%');
  menuButton.css('background-repeat', 'no-repeat');
  menuButton.css('background-position-x', '50%');
  menuButton.css('background-position-y', '50%');
  setTimeout(function() {
    menuButton.trigger('click');
    deleteMenu();
  }, 100);

  var menu = $('<ul class="menu_option">').appendTo(container);
  $('<li><a href="#"><span class="monitor" onclick="showIcinga()">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="monitor" onclick="">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="monitor" onclick="">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="monitor" onclick="">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="monitor" onclick="">Item</span></a></li>').appendTo(menu);


  container.PieMenu({
    'starting_angle': 0,
    'angel_difference' : 360,
    'radius': 120,
  });

  subMenuMonitor = container;
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

function showIcinga() {
  getIcingaLog(divIcinga);
}

function divIcinga(data) {
    var container = $('<div></div>', {
      class: 'icingaContainer draggable'
    }).appendTo('#background');
    $('<ul></ul>').appendTo(container);
    data.forEach(function(item) {
      $('<li/>', {html: item.display_name + ' : ' + item.perfdata}).appendTo('ul');
    });
}

function getIcingaLog(callback) {
  $.get('/icinga/isen-demo-2/disk', function( response ) {
    callback(response);
  });
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
  $('<li><a href="#"><span class="power" onclick="powerTv()">Item</span></a></li>').appendTo(menu);
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
  $.get('http://10.134.15.103/api/tv/channel/' + channel);
}

function powerTv() {
  if(tvOn) {
    $.get('http://10.134.15.103/api/bravia/power/off');
    tvOn = false;
  } else {
    $.get('http://10.134.15.103/api/bravia/power/on');
    tvOn = true;
  }
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

  $('<li><a href="#"><span class="color1" onclick="setHueColor(2, this)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color2" onclick="setHueColor(2, this)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color3" onclick="setHueColor(2, this)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color4" onclick="setHueColor(2, this)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color5" onclick="setHueColor(2, this)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color5" onclick="setHueColor(1, this)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color4" onclick="setHueColor(1, this)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color3" onclick="setHueColor(1, this)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color2" onclick="setHueColor(1, this)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="color1" onclick="setHueColor(1, this)">Item</span></a></li>').appendTo(menu);
  $('<li><a href="#"><span class="power" onclick="powerLights()">Item</span></a></li>').appendTo(menu);

  container.PieMenu({
    'starting_angle': 120,
    'angel_difference' : 360,
    'radius': 120,
  });

  subMenuLights = container;
}

function setHueColor(light, that) {
  $.get('http://10.134.15.103/api/lights/color/' + light + '/' + tinycolor($(that).css("background-color")).toName());
}

function powerLights() {
  if(lightsOn) {
    $.get('http://10.134.15.103/api/lights/power/1/off');
    setTimeout(function() { $.get('http://10.134.15.103/api/lights/power/2/off'); }, 500);
    lightsOn = false;
  } else {
    $.get('http://10.134.15.103/api/lights/power/1/on');
    setTimeout(function() { $.get('http://10.134.15.103/api/lights/power/2/on'); }, 500);
    lightsOn = true;
  }
}
