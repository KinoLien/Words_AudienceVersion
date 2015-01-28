// state, default values
var appValidModes = [
	//Ti.UI.PORTRAIT,
	Ti.UI.LANDSCAPE_LEFT,
    Ti.UI.LANDSCAPE_RIGHT
];
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Ti.UI.orientation = appValidModes[0];
Ti.UI.setBackgroundColor('#000');

//var Canvas = require('ti.canvas');
var Canvas = require('com.wwl.canvas');

var canvasProtocol = {
	width: 500,
	lineWidth: 10,
	lineColor: '#ececec',
	lineCap: 'round'
};

var drawPointToCanvas = function(protocolPointArray, target, scale){
	//var scale = idiomsOriginToProtocolScale;
	//Ti.API.info("In Function: " + JSON.stringify(protocolPointArray));
	//alert(JSON.stringify(protocolPointArray));
	var step = 2;
	var pin = 0;
	for(var i = 0, len = protocolPointArray.length; i < len; i++){
		var pen = protocolPointArray[i];
		/*/
		var first = pen[0];
		target.beginPath();
		var fcx = first.x / scale;
		var fcy = first.y / scale;
		target.drawPoint(fcx, fcy);
		target.moveTo(fcx, fcy);
		for(var p = 1, pm = pen.length; p < pm; p++){
			var item = pen[p];
			var icx = item.x / scale;
			var icy = item.y / scale;
			target.lineTo(icx, icy);
			target.stroke();
			target.moveTo(icx, icy);
		}
		/*/
		//  [ [11,22,33], [22,33,33] ]
		var xList = pen[0];
		var yList = pen[1];
		var pm = Math.min(xList.length, yList.length);
		for(var p = 0; p < pm; p++){
			var fcx = xList[p] / scale;
			var fcy = yList[p] / scale;
			if(p == 0){
				setTimeout((function(c, x, y){
					return function(){
						c.beginPath();
						c.drawPoint(x, y);
						c.moveTo(x, y);
					};
				})(target, fcx, fcy), pin++ * step);
			}else{
				setTimeout((function(c, x, y){
					return function(){
						c.lineTo(x, y);
						c.stroke();
						c.moveTo(x, y);
					};
				})(target, fcx, fcy), pin++ * step);	
			}
		}
		//*/
	}
};

Ti.include('layout.js');
Ti.include('loginView.js');
Ti.include('idiomsView.js');

//var loginWindow = 
var navigationWindows = [loginViewInit()];
navigationWindows[0].open();

