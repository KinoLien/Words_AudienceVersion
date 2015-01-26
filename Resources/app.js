// state, default values
var appValidModes = [
	Ti.UI.LANDSCAPE_LEFT,
    Ti.UI.LANDSCAPE_RIGHT
];
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.orientation = appValidModes[0];
Ti.UI.setBackgroundColor('#000');

//var Canvas = require('ti.canvas');
var Canvas = require('com.wwl.canvas');

Ti.include('layout.js');
Ti.include('loginView.js');

//var loginWindow = 
var firstWindow = loginViewInit();
firstWindow.open();
