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
        $(".motherContainer").remove();
        setTimeout(function() {
          subMenuTemp.remove();
          subMenuTemp = null;
        }, 300);
      }
    }

    if(subMenuMonitor !== null) {
      if (!subMenuMonitor.is(e.target) && subMenuMonitor.has(e.target).length === 0)
      {
        $(".icingaContainer").remove();
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
  switch(id) {
    case 1:
      divMother("known cranberry");
      break;
    case 2:
      divMother("purple turon");
      break;
    case 3:
      divMother("double passion");
      break;
    case 4:
      divMother("double anooshaboor");
      break;
  }
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

function divMother(cookie) {
  var container = $('<div></div>', {
    class: 'motherContainer draggable'
  }).appendTo('#background');
  $('<div></div>', {
    class: 'graph',
    id: cookie
  }).appendTo(container);
  getTemp(cookie, drawGraph);
}

function getTemp(cookie, callback) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				callback(cookie, JSON.parse(xmlhttp.responseText).data);
			}
		};
		xmlhttp.open("GET", "http://10.134.15.1:4041/data/temperature/" + cookie, true);
		xmlhttp.send();
	};

function drawGraph(cookie, dataTemp) {
		console.log(cookie);
    console.log(dataTemp);
    console.log($("#" + cookie));
		$("[ id = '" + cookie + "']").highcharts({
			chart: {
				type: 'spline'
			},
			title: {
				text: 'Variation of temperature'
			},
			subtitle: {
				text: 'Cookie: ' + cookie
			},
			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: {
					month: '%e. %b. %Y',
					year: '%b'
				},
				title: {
					text: 'Date'
				}
			},
			yAxis: {
				title: {
					text: 'Temperature (°C)'
				},
				min: 0
			},
			tooltip: {
				headerFormat: '<b>{point.x:%e. %b. %Y}</b><br>',
				pointFormat: '{point.y:.2f} °C'
			},
			plotOptions: {
				spline: {
					marker: {
						enabled: true
					}
				}
			},
			legend: {
				enabled: false
			},
			series: [{
				name: 'Temperature',
				data: (function() {
						var value= [];
						dataTemp.forEach(function(item) {
							value.push({x: new Date(item.date), y: item.value});
						});
						return value;
					}())
			}]
		});
	};

  Highcharts.theme = {
  		 colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
  				"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
  		 chart: {
  				backgroundColor: {
  					 linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
  					 stops: [
  							[0, '#2a2a2b'],
  							[1, '#3e3e40']
  					 ]
  				},
  				style: {
  					 fontFamily: "'Unica One', sans-serif"
  				},
  				plotBorderColor: '#606063'
  		 },
  		 title: {
  				style: {
  					 color: '#E0E0E3',
  					 textTransform: 'uppercase',
  					 fontSize: '20px'
  				}
  		 },
  		 subtitle: {
  				style: {
  					 color: '#E0E0E3',
  					 textTransform: 'uppercase'
  				}
  		 },
  		 xAxis: {
  				gridLineColor: '#707073',
  				labels: {
  					 style: {
  							color: '#E0E0E3'
  					 }
  				},
  				lineColor: '#707073',
  				minorGridLineColor: '#505053',
  				tickColor: '#707073',
  				title: {
  					 style: {
  							color: '#A0A0A3'

  					 }
  				}
  		 },
  		 yAxis: {
  				gridLineColor: '#707073',
  				labels: {
  					 style: {
  							color: '#E0E0E3'
  					 }
  				},
  				lineColor: '#707073',
  				minorGridLineColor: '#505053',
  				tickColor: '#707073',
  				tickWidth: 1,
  				title: {
  					 style: {
  							color: '#A0A0A3'
  					 }
  				}
  		 },
  		 tooltip: {
  				backgroundColor: 'rgba(0, 0, 0, 0.85)',
  				style: {
  					 color: '#F0F0F0'
  				}
  		 },
  		 plotOptions: {
  				series: {
  					 dataLabels: {
  							color: '#B0B0B3'
  					 },
  					 marker: {
  							lineColor: '#333'
  					 }
  				},
  				boxplot: {
  					 fillColor: '#505053'
  				},
  				candlestick: {
  					 lineColor: 'white'
  				},
  				errorbar: {
  					 color: 'white'
  				}
  		 },
  		 legend: {
  				itemStyle: {
  					 color: '#E0E0E3'
  				},
  				itemHoverStyle: {
  					 color: '#FFF'
  				},
  				itemHiddenStyle: {
  					 color: '#606063'
  				}
  		 },
  		 credits: {
  				style: {
  					 color: '#666'
  				}
  		 },
  		 labels: {
  				style: {
  					 color: '#707073'
  				}
  		 },
  		 drilldown: {
  				activeAxisLabelStyle: {
  					 color: '#F0F0F3'
  				},
  				activeDataLabelStyle: {
  					 color: '#F0F0F3'
  				}
  		 },
  		 navigation: {
  				buttonOptions: {
  					 symbolStroke: '#DDDDDD',
  					 theme: {
  							fill: '#505053'
  					 }
  				}
  		 },
  		 rangeSelector: {
  				buttonTheme: {
  					 fill: '#505053',
  					 stroke: '#000000',
  					 style: {
  							color: '#CCC'
  					 },
  					 states: {
  							hover: {
  								 fill: '#707073',
  								 stroke: '#000000',
  								 style: {
  										color: 'white'
  								 }
  							},
  							select: {
  								 fill: '#000003',
  								 stroke: '#000000',
  								 style: {
  										color: 'white'
  								 }
  							}
  					 }
  				},
  				inputBoxBorderColor: '#505053',
  				inputStyle: {
  					 backgroundColor: '#333',
  					 color: 'silver'
  				},
  				labelStyle: {
  					 color: 'silver'
  				}
  		 },
  		 navigator: {
  				handles: {
  					 backgroundColor: '#666',
  					 borderColor: '#AAA'
  				},
  				outlineColor: '#CCC',
  				maskFill: 'rgba(255,255,255,0.1)',
  				series: {
  					 color: '#7798BF',
  					 lineColor: '#A6C7ED'
  				},
  				xAxis: {
  					 gridLineColor: '#505053'
  				}
  		 },
  		 scrollbar: {
  				barBackgroundColor: '#808083',
  				barBorderColor: '#808083',
  				buttonArrowColor: '#CCC',
  				buttonBackgroundColor: '#606063',
  				buttonBorderColor: '#606063',
  				rifleColor: '#FFF',
  				trackBackgroundColor: '#404043',
  				trackBorderColor: '#404043'
  		 },
  		 legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  		 background2: '#505053',
  		 dataLabelsColor: '#B0B0B3',
  		 textColor: '#C0C0C0',
  		 contrastTextColor: '#F0F0F3',
  		 maskColor: 'rgba(255,255,255,0.3)'
  	};
  	Highcharts.setOptions(Highcharts.theme);

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
