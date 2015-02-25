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
var createLoadingScreen = function(initPosition) {
	var scope = this;
	scope.isControlsCreated = false;
	scope.view1 = null;
	scope.view2 = null;
	scope.indicator = null;
	
	scope.view1 = Ti.UI.createView({
		height:'100%',
		width:'100%',
		backgroundColor:'#000',
		opacity:0.6,
		visible:false
	});
	scope.view1.hide();
	scope.add(scope.view1);

	scope.view2 = Ti.UI.createView({
		height:'100%',
		width:'100%',
		visible:false
	});
	scope.view2.hide();
	scope.add(scope.view2);

	scope.indicator = Titanium.UI.createActivityIndicator({
		style:Ti.UI.ActivityIndicatorStyle.DARK,
		font:{
			fontFamily:'Arial',
			fontSize: initPosition.fontSize * 0.8 + 'px',
			fontWeight:'bold'
		},
		color:'#fff',
		message:'Loading...',
		height:'100%',
		width:'auto',
		visible:false
	});
	scope.view2.add(scope.indicator);

	scope.isControlsCreated = true;

	scope.loadingShow = function(message){
		//createControls();

		if (message) {this.indicator.message = message;}
		else {this.indicator.message = 'Loading...';}

		this.view1.show();
		this.view2.show();
		this.indicator.show();
	};

	scope.loadingHide = function(){
		//createControls();

		this.view1.hide();
		this.view2.hide();
		this.indicator.hide();
	};
};

var fbLoginCallbackList = [];
var fbLogoutCallbackList = [];
var fbCancelCallbackList = [];

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
	var step = 3;
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

var FB = require('facebook');
FB.appid = '634509316654648';	// normal
//FB.appid = '643669369071976';	// test
FB.permissions = ['publish_actions']; // Permissions your app needs
FB.forceDialogAuth = false;

FB.addEventListener('login', function(e){
	if (e.success) {
        alert('已登入');
        for(var i= 0, len = fbLoginCallbackList.length; i < len; i++){
        	fbLoginCallbackList[i](e);
        }
    }else if(e.cancelled){
    	for(var i= 0, len = fbCancelCallbackList.length; i < len; i++){
        	fbCancelCallbackList[i](e);
        }
    }else{
    	alert(JSON.stringify(e));
    }
});

FB.addEventListener('logout', function(e){
	alert('已登出');
	for(var i= 0, len = fbLogoutCallbackList.length; i < len; i++){
    	fbLogoutCallbackList[i](e);
    }
});

FB.checkAndLogin = function(maskView){
	maskView.loadingShow();
	FB.requestWithGraphPath('me', {}, 'GET', function(e){
		// for test
		if (!e.success) {
	        if (e.error) {
	        	var errorSplit = e.error.split(':');
	        	var mainErrorMessage = "";
	        	if(errorSplit.length) mainErrorMessage = errorSplit[0];
	        	var reg = new RegExp("Unable to resolve host");
	        	var tokenReg = new RegExp("An active access token must be used to query information about the current user");
	        	if(reg.test(mainErrorMessage)){
	        		alert("Login Fail! \n無法連結FB。請檢查網路狀態！");	
	        		maskView.loadingHide();
	        	}else if(tokenReg.test(mainErrorMessage)){
	        		FB.authorize();
	        	}else{
	        		alert("Login Fail! \n"+mainErrorMessage);
	        		maskView.loadingHide();
	        	}
	        } else {
	            alert("Unkown result");
	            maskView.loadingHide();
	        }
	    }
	});
};
FB.checkAndLogout = function(maskView){
	maskView.loadingShow();
	FB.requestWithGraphPath('me', {}, 'GET', function(e){
		// for test
		if(e.success){
			//*/
			FB.logout();
			/*/
			FB.requestWithGraphPath('me/permissions', {}, 'GET', function(per_event){
			    if (per_event.success) {
			    	var res = JSON.parse(per_event.result);
			    	var pers = res.data;
			    	for(var i = 0, len = pers.length; i < len; i++){
			    		//var name = pers[i].permission;
			    		//alert(pers[i].permission);
			    		setTimeout((function(name){
			    			return function(){
				    			FB.requestWithGraphPath('me/permissions/'+name, {}, 'DELETE', function(event){
					    			if (event.success) {
					    			}else{
					    			}
					    		});		
			    			};
			    		})(pers[i].permission), i * 300);
			    	}
			    	
			    	setTimeout(function(){
			    		FB.logout();
			    	}, i * 300);
			    } else {
			        if (e.error) {
			        	var errorSplit = e.error.split(':');
			        	var mainErrorMessage = e.error;
			        	if(errorSplit.length) mainErrorMessage = errorSplit[0];
			            alert(mainErrorMessage);
			        } else {
			            alert("Unkown result");
			        }
			    }
			});
			//*/
		}else{
			if (e.error) {
	        	var errorSplit = e.error.split(':');
	        	var mainErrorMessage = "";
	        	if(errorSplit.length) mainErrorMessage = errorSplit[0];
	        	var reg = new RegExp("Unable to resolve host");
	        	if(reg.test(mainErrorMessage)){
	        		alert("Logout Fail! \n無法連結FB。請檢查網路狀態！");	
	        	}else{
	        		alert("Logout Fail! \n"+mainErrorMessage);
	        	}
	        } else {
	            alert("Unkown result");
	        }
	        maskView.loadingHide();
		}
	});
};
//var loginWindow = 
var navigationWindows = [loginViewInit()];
navigationWindows[0].open();
//createLoadingScreen.call(navigationWindows[0]);

