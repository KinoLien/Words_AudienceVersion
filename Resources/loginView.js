
var currentGameId = null;

var testPermissionInfo = function(){
	FB.requestWithGraphPath('me/permissions', {}, 'GET', function(e){
	    if (e.success) {
	    	var res = JSON.parse(e.result);
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
};

var loginViewInit = function(){
	var initPosition = getCurrentPositionLayout();
	var loginWindow = Titanium.UI.createWindow({
		//title: '一字千金 - 設定' + initPosition.screenWidth + " " + initPosition.screenHeight,
		//title: '一字千金 - 設定',
		backgroundColor:'#000',
		//backgroundImage: 'loginBack.png',
		exitOnClose:true,
		navBarHidden:true,
		fullscreen:true,
		orientationModes:[
			//Ti.UI.PORTRAIT,
			Ti.UI.LANDSCAPE_LEFT,
			Ti.UI.LANDSCAPE_RIGHT
		]
	});
	
	var loginBackView = Ti.UI.createImageView({
		image: "loginBack.png",
		left: 0 + 'px',
		top: 0 + 'px',
		//width: initPosition.backgroundWidth + 'px',
		//height: initPosition.backgroundHeight + 'px',
		height: '100%'
		//image:'http://' + socketRootHost + "/uploads/",
		
		//backgroundColor: "#f5f5f5"
		//borderWidth: 2,
		//borderColor: "#ff0000"
	});

	var startButton = Ti.UI.createButton({
		color: '#ececec',
		backgroundColor:'#000',
		opacity:0.7,
		//backgroundSelectedColor:'#3ff',	// that is not support IOS
		// maybe use backgroundImage and backgroundSelectedImage instead
		bottom: initPosition.gapUnitSize * 3 + 'px',
		right: initPosition.gapUnitSize * 1.2 + 'px',
		width: initPosition.gapUnitSize * 6 + 'px',
		height: initPosition.gapUnitSize * 2.5 + 'px',
		title:'直接進入',
		borderRadius: initPosition.gapUnitSize / 8,
		borderColor: '#ececec',
		borderWidth:  initPosition.gapUnitSize / 8 + 'px',
		font:{
			fontSize: initPosition.fontSize * 1.2 + 'px',
			fontFamily: 'Helvetica Neue'
		}
	});

	var loginButton = Ti.UI.createButton({
		color: '#ececec',
		backgroundColor:'#384d92',
		//backgroundSelectedColor:'#3ff',	// that is not support IOS
		// maybe use backgroundImage and backgroundSelectedImage instead
		bottom: initPosition.gapUnitSize + 'px',
		right: initPosition.gapUnitSize * 2 + 'px',
		width: initPosition.gapUnitSize * 4 + 'px',
		height: initPosition.gapUnitSize * 1.2 + 'px',
		title: (FB.loggedIn)? ' FB 登出 ' : '使用 FB 登入',
		borderRadius: initPosition.gapUnitSize / 4,
		borderColor: '#ececec',
		borderWidth:  initPosition.gapUnitSize / 12 + 'px',
		font:{
			fontSize: initPosition.fontSize * 0.6 + 'px',
			fontFamily: 'Helvetica Neue'
		}
	});
	
	startButton.addEventListener('click', function(){
		//*/
		loginWindow.loadingShow();
		var idiomsWindow = idiomsViewInit();
		idiomsWindow.addEventListener('open', function(e){
			loginWindow.loadingHide();
		});
		if(FB.loggedIn){
			FB.requestWithGraphPath('1027783900583168/feed', {limit: 50}, 'GET', function(e){
			    if (e.success) {
			    	var res = JSON.parse(e.result);
			    	var dataList = res.data;
			    	//var reg = new RegExp("\\[([^\\s]+)\\]");
			    	var reg = new RegExp("([1-8]{1}):(([1-9]{1})|(1[0-2]{1})|([a-lA-L]{1})):[^\\s\\[\\]]+","g");
			    	for(var i = 0, len = dataList.length; i < len; i++){
			    		var data = dataList[i];
			    		var str = data.message;
						if(reg.test(str)){
							var matches = str.match(reg);
							//var splits = matches[1].split(':');
							for(var it = 0, blen = matches.length; it < blen; it++){
								var splits = matches[it].split(':');
								idiomsWindow.putWord(splits[0], splits[1], splits[2]);
							}
							currentGameId = data.id;
							break;
							// if(splits.length == 3){
								// idiomsWindow.putWord(splits[0], splits[1], splits[2]);
								// currentGameId = data.id;
								// break;
							// }
						}	
			    	}
			    	if(i == len){
			    		alert("找不到題目，將直接進入書寫畫面。");
			    	}
			    } else {
			        if (e.error) {
			        	var errorSplit = e.error.split(':');
			        	var mainErrorMessage = "";
			        	if(errorSplit.length) mainErrorMessage = errorSplit[0];
			        	var reg = new RegExp("Unable to resolve host");
			        	if(reg.test(mainErrorMessage)){
			        		alert("無法連結FB。請檢查網路狀態！");	
			        	}else{
			        		alert("Get Question Fail \n"+mainErrorMessage);	
			        	}
			        } else {
			            alert("Unkown result");
			        }
			    }
			    navigationWindows.push(idiomsWindow);
				idiomsWindow.open();
			});
		}else{
			//alert("請先 使用FB登入 ");
			navigationWindows.push(idiomsWindow);
			idiomsWindow.open();
		}
		/*/
		
		loginWindow.loadingShow();
		var idiomsWindow = idiomsViewInit();
		idiomsWindow.addEventListener('open', function(e){
			loginWindow.loadingHide();
			navigationWindows.push(idiomsWindow);
			// idiomsWindow.activity.addEventListener("resume", function(e) {
		        // idiomsWindow.doRecoverDrawing();
		    // });
		    var str = "sfweksdfliwef [3:d:中] sdfsdfs";
			var reg = new RegExp("\\[([^\\s]+)\\]");
			if(reg.test(str)){
				var matches = str.match(reg);
				var splits = matches[1].split(':');
				if(splits.length == 3){
					idiomsWindow.putWord(splits[0], splits[1], splits[2]);	
				}
			}
		});
		idiomsWindow.open();
		
		//*/
	});
	
	loginButton.addEventListener('click', function(e){
		if(FB.loggedIn){
			// to loggout
			e.cancelBubble = true;
			var dialog = Ti.UI.createAlertDialog({
			    cancel: 1,
			    buttonNames: ['是', '否'],
			    message: '確定要登出？',
			    title: '登出FB'
			});
			dialog.addEventListener('click', function(e){
			    if (e.index !== e.source.cancel){
			    	//loginWindow.loadingShow();
			    	FB.checkAndLogout(loginWindow);
			    }
			});
			dialog.show();
		}else{
			FB.checkAndLogin(loginWindow);
		}
	});
	
	fbLoginCallbackList.push((function(button, win){
		return function(e){
			button.setTitle(' FB 登出 ');
			win.loadingHide();
			//testPermissionInfo();
		};
	})(loginButton, loginWindow));
	fbLogoutCallbackList.push((function(button, win){
		return function(e){
			button.setTitle("使用 FB 登入");
			win.loadingHide();
		};
	})(loginButton, loginWindow));
	fbCancelCallbackList.push((function(win){
		return function(e){
			win.loadingHide();
		};
	})(loginWindow));

	loginWindow.add(loginBackView);
	loginWindow.add(loginButton);
	loginWindow.add(startButton);
	
	createLoadingScreen.call(loginWindow, initPosition);
	
	// loginWindow.addEventListener('androidback', function(e){
		// e.cancelBubble = true;
	// });
	
	// it's work
	// loginWindow.addEventListener('open', function(e){
		// loginWindow.activity.addEventListener("resume", function() {
	        // //Ti.App.fireEvent('resume')
	        // alert('on resume');
	    // });
	// });
	
	return loginWindow;	
};
