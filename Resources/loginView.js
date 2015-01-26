

var loginViewInit = function(){
	var initPosition = getCurrentPositionLayout();
	var loginWindow = Titanium.UI.createWindow({
		//title: '一字千金 - 設定' + initPosition.screenWidth + " " + initPosition.screenHeight,
		title: '一字千金 - 設定',
		backgroundColor:'#fff',
		fullscreen:true,
		//tabBarHidden:true
		orientationModes:[
			Ti.UI.LANDSCAPE_LEFT,
			Ti.UI.LANDSCAPE_RIGHT
		]
	});

	var loginButton = Ti.UI.createButton({
		color: '#fff',
		backgroundColor:'#6666ff',
		//backgroundSelectedColor:'#3ff',	// that is not support IOS
		// maybe use backgroundImage and backgroundSelectedImage instead
		top: initPosition.gapUnitSize * 10 + 'px',
		width: initPosition.gapUnitSize * 5.5 + 'px',
		height: initPosition.gapUnitSize * 2 + 'px',
		title:'成語',
		borderRadius: initPosition.gapUnitSize / 2 + 'px',
		font:{
			fontSize: initPosition.fontSize + 'px',
			fontFamily: 'Helvetica Neue'
		}
	});
	
	loginButton.addEventListener('click', function(){
		
	});

	loginWindow.add(loginButton);
	
	return loginWindow;	
};
