

var loginViewInit = function(){
	var initPosition = getCurrentPositionLayout();
	var loginWindow = Titanium.UI.createWindow({
		//title: '一字千金 - 設定' + initPosition.screenWidth + " " + initPosition.screenHeight,
		//title: '一字千金 - 設定',
		backgroundColor:'#000',
		navBarHidden:true,
		fullscreen:true,
		orientationModes:[
			//Ti.UI.PORTRAIT,
			Ti.UI.LANDSCAPE_LEFT,
			Ti.UI.LANDSCAPE_RIGHT
		]
	});

	var loginButton = Ti.UI.createButton({
		color: '#ececec',
		backgroundColor:'#000',
		//backgroundSelectedColor:'#3ff',	// that is not support IOS
		// maybe use backgroundImage and backgroundSelectedImage instead
		top: initPosition.gapUnitSize * 10 + 'px',
		width: initPosition.gapUnitSize * 10 + 'px',
		height: initPosition.gapUnitSize * 2 + 'px',
		title:'使用 Facebook 登入',
		borderRadius: initPosition.gapUnitSize / 3,
		borderColor: '#ececec',
		borderWidth:  initPosition.gapUnitSize / 6 + 'px',
		font:{
			fontSize: initPosition.fontSize + 'px',
			fontFamily: 'Helvetica Neue'
		}
	});
	
	loginButton.addEventListener('click', function(){
		var idiomsWindow = idiomsViewInit();
		navigationWindows.push(idiomsWindow);
		idiomsWindow.addEventListener('open', function(e){
			//currentWindow.arrangeLayout(Ti.UI.LANDSCAPE_LEFT);
		});
		idiomsWindow.open();
	});

	loginWindow.add(loginButton);
	
	return loginWindow;	
};
