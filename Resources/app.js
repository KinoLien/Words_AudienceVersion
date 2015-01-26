// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//
// create base UI tab and root window
//

//var Canvas = require('ti.canvas');
var Canvas = require('com.wwl.canvas');

var win = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});

var label = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win.add(label);

// open tab group
win.open();
