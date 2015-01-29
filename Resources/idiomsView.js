
var isDrawing = false;

var idiomsCurrentRow = 1; 
var idiomsCurrentCol = 1;

var idiomsShortCanvasArray = [];
var idiomsCanvasPointArray = [];

var idiomsShortToProtocolScale = 1;
var idiomsOriginToProtocolScale = 1;
var idiomsOriginToShortScale = 1;

var clearIdiomsInfo = function(){
	isDrawing = false;
	
	idiomsCurrentRow = 1;
	idiomsCurrentCol = 1;
	idiomsShortCanvasArray = null;
	idiomsCanvasPointArray = null;
	
	idiomsShortToProtocolScale = 1;
	idiomsOriginToProtocolScale = 1;
	idiomsOriginToShortScale = 1;
};

var arrowsViewInit = function(initPosition, blockControl){
	//var squareSize = Ti.Platform.displayCaps.dpi;
	var squareSize = initPosition.shortSideWidth * 5 / 13;	
	
	var view = Ti.UI.createView({
		width: squareSize + 'px',
		height: squareSize + 'px',
		//opacity:0.4,
		left:0, bottom:0
	});
	
	var xBlockMin = 1;
	var yBlockMin = 1;
	var xBlocks = 12;
	var yBlocks = 8;
	
	var arrowWidth = squareSize / 3;
	var arrowPadding = squareSize / 16; 
	
	var upArrow = Ti.UI.createImageView({
		image: "arrow-up.png",
		width: arrowWidth + 'px',
		height: arrowWidth + 'px',
		top: arrowPadding + 'px',
		opacity:0.4
	});
	
	var downArrow = Ti.UI.createImageView({
		image: "arrow-down.png",
		width: arrowWidth + 'px',
		height: arrowWidth + 'px',
		bottom: arrowPadding + 'px',
		opacity:0.4
	});
	
	var leftArrow = Ti.UI.createImageView({
		image: "arrow-left.png",
		width: arrowWidth + 'px',
		height: arrowWidth + 'px',
		left: arrowPadding + 'px',
		opacity:0.4
	});
	
	var rightArrow = Ti.UI.createImageView({
		image: "arrow-right.png",
		width: arrowWidth + 'px',
		height: arrowWidth + 'px',
		right: arrowPadding + 'px',
		opacity:0.4
	});
	
	var sourceOpacityBack = function(e){
		e.source.setOpacity(0.4);
	};
	
	upArrow.addEventListener('touchstart', function(e){
		upArrow.setOpacity(0.8);
		if(idiomsCurrentRow > yBlockMin){
			idiomsCurrentRow--;
			blockControl.moveTo(idiomsCurrentRow - 1, idiomsCurrentCol - 1);
			//idiomsTriggerMoveBlock();
		}
		
	});
	upArrow.addEventListener('touchend', sourceOpacityBack);
	upArrow.addEventListener('touchcancel', sourceOpacityBack);
	
	downArrow.addEventListener('touchstart', function(e){
		downArrow.setOpacity(0.8);
		if(idiomsCurrentRow < yBlocks){
			idiomsCurrentRow++;
			blockControl.moveTo(idiomsCurrentRow - 1, idiomsCurrentCol - 1);
			//idiomsTriggerMoveBlock();
		}
	});
	downArrow.addEventListener('touchend', sourceOpacityBack);
	downArrow.addEventListener('touchcancel', sourceOpacityBack);
	
	leftArrow.addEventListener('touchstart', function(e){
		leftArrow.setOpacity(0.8);
		if(idiomsCurrentCol > xBlockMin){
			idiomsCurrentCol--;
			blockControl.moveTo(idiomsCurrentRow - 1, idiomsCurrentCol - 1);
			//idiomsTriggerMoveBlock();
		}
	});
	leftArrow.addEventListener('touchend', sourceOpacityBack);
	leftArrow.addEventListener('touchcancel', sourceOpacityBack);
	
	rightArrow.addEventListener('touchstart', function(e){	
		rightArrow.setOpacity(0.8);
		if(idiomsCurrentCol < xBlocks){
			idiomsCurrentCol++;
			blockControl.moveTo(idiomsCurrentRow - 1, idiomsCurrentCol - 1);
			//idiomsTriggerMoveBlock();
		}
	});
	rightArrow.addEventListener('touchend', sourceOpacityBack);
	rightArrow.addEventListener('touchcancel', sourceOpacityBack);
	
	view.add(upArrow);
	view.add(downArrow);
	view.add(leftArrow);
	view.add(rightArrow);
	
	return view;
};

var selectViewInit = function(initPosition){
	//var squareSize = Ti.Platform.displayCaps.dpi;
	var squareSize = initPosition.shortSideWidth * 5 / 13;
	
	var canvasWidth = squareSize / 3;
	var canvasHeight = squareSize / 3;
	
	var imageView = Ti.UI.createImageView({
		image: "EnterButton.png",
		width: canvasWidth + 'px',
		height: canvasHeight + 'px',
		right: squareSize / 10 + 'px',
		bottom: squareSize / 10 + 'px',
		opacity:0.4
	});
	
	return imageView;
	
};

var endViewInit = function(initPosition){
	//var squareSize = Ti.Platform.displayCaps.dpi;
	var squareSize = initPosition.shortSideWidth * 5 / 13;
	
	var canvasWidth = squareSize / 3;
	var canvasHeight = squareSize / 3;
	//*/
	var imageView = Ti.UI.createImageView({
		image: "Confirm.png",
		width: canvasWidth + 'px',
		height: canvasHeight + 'px',
		top: squareSize / 10 + 'px',
		right: squareSize / 10 + 'px',
		opacity:0.4
	});
	
	return imageView;
	/*/
	var canvasCircleColor = '#dddddd';
	var canvasColor = '#aaaaaa'; 
	var canvasLine = squareSize / 60;
	var canvasBoundUnit = canvasLine / 2;  
	
	var endCanvas = Canvas.createCanvasView({
		width: canvasWidth + 'px',
		height: canvasHeight + 'px',
		right: squareSize / 10 + 'px',
		//bottom: squareSize * 3 / 5 + 'px',
		top: squareSize / 10 + 'px',
		opacity:0.4
	});
	
	endCanvas.addEventListener('load', function(e){
		endCanvas.beginPath();
		endCanvas.lineWidth = canvasLine;
		endCanvas.lineCap = 'round';
		endCanvas.strokeStyle = canvasColor;
		
		endCanvas.drawRect(canvasLine / 2, canvasLine / 2, canvasWidth - canvasLine, canvasHeight - canvasLine);
		endCanvas.stroke();
		
	});
	
	return endCanvas;
	//*/
};

var onCanvasLoad = function(e){
	var protocol = canvasProtocol;
	var v = e.source;
	v.lineWidth = protocol.lineWidth / idiomsOriginToProtocolScale;
	v.strokeStyle = protocol.lineColor;
	v.lineCap = protocol.lineCap;
	v.prestamp = 0;
	//alert('canvas loaded');
	// idiomsCanvasPointArray
}; 

var onCanvasTouchStart = function(e){
	isDrawing = true;
	//idiomsDirtyList[idiomsCurrentRow + '-' + idiomsCurrentCol] = true;
	var obj = e.source;
	var stamp = (new Date()).getTime();
	obj.beginPath();
	obj.drawPoint(e.x, e.y);
	// if(socketObj && stamp - obj.prestamp >= stampFilter){
		// obj.prestamp = stamp;
		// socketObj.trigger(
			// IDIOMS_EVENT + "." + TOUCH_DOWN_EVENT,
			// {
				// user_id: socketUser, 
				// x: e.x * idiomsOriginToProtocolScale, 
				// y: e.y * idiomsOriginToProtocolScale,
				// block:{
					// row: idiomsCurrentRow,
					// column: idiomsCurrentCol
				// },
				// stamp: stamp
			// }
		// );
	// }
	obj.moveTo(e.x, e.y);
	//*/
	obj.pointCache = [
		[e.x * idiomsOriginToProtocolScale],
		[e.y * idiomsOriginToProtocolScale]
	];
	/*/
	var pointCache = idiomsCanvasPointArray[idiomsCurrentRow - 1][idiomsCurrentCol - 1];
	pointCache.push([
		{
			x: e.x * idiomsOriginToProtocolScale, 
			y: e.y * idiomsOriginToProtocolScale
		}
	]);
	//*/
	var innerShortCanvas = idiomsShortCanvasArray[idiomsCurrentRow - 1][idiomsCurrentCol - 1];
	if(innerShortCanvas){
		innerShortCanvas.strokeStyle = "#ececec";
		innerShortCanvas.beginPath();
		innerShortCanvas.drawPoint(e.x * idiomsOriginToShortScale, e.y * idiomsOriginToShortScale);
		innerShortCanvas.moveTo(e.x * idiomsOriginToShortScale, e.y * idiomsOriginToShortScale);
	}
};


var onCanvasTouchMove = function(e){
	if(isDrawing){
		var obj = e.source;
		var stamp = (new Date()).getTime();
		obj.lineTo(e.x, e.y);
		obj.moveTo(e.x, e.y);
		obj.stroke();
		// if(socketObj && stamp - obj.prestamp >= stampFilter){
			// obj.prestamp = stamp;
			// socketObj.trigger(
				// IDIOMS_EVENT + "." + TOUCH_MOVE_EVENT,
				// {
					// user_id: socketUser,
					// x: e.x * idiomsOriginToProtocolScale,
					// y: e.y * idiomsOriginToProtocolScale,
					// block:{
						// row: idiomsCurrentRow,
						// column: idiomsCurrentCol
					// },
					// stamp: stamp
				// }
			// );
		// }
		//*/
		obj.pointCache = obj.pointCache || [ [], [] ];
		obj.pointCache[0].push(e.x * idiomsOriginToProtocolScale);
		obj.pointCache[1].push(e.y * idiomsOriginToProtocolScale);
		/*/
		var pointCache = idiomsCanvasPointArray[idiomsCurrentRow - 1][idiomsCurrentCol - 1];
		pointCache[pointCache.length - 1].push({
			x: e.x * idiomsOriginToProtocolScale, 
			y: e.y * idiomsOriginToProtocolScale
		});
		/*/
		var innerShortCanvas = idiomsShortCanvasArray[idiomsCurrentRow - 1][idiomsCurrentCol - 1];
		if(innerShortCanvas){
			innerShortCanvas.strokeStyle = "#ececec";
			innerShortCanvas.lineTo(e.x * idiomsOriginToShortScale, e.y * idiomsOriginToShortScale);
			innerShortCanvas.moveTo(e.x * idiomsOriginToShortScale, e.y * idiomsOriginToShortScale);
			innerShortCanvas.stroke();
		}
	}
};


var onCanvasTouchCancel = function(e){ isDrawing = false;
	var pc = e.source.pointCache;
	if(pc && pc.length > 0){
		idiomsCanvasPointArray[idiomsCurrentRow - 1][idiomsCurrentCol - 1].push(pc.slice(0));
		e.source.pointCache = null;
	}
};

var idiomsPrepareCanvasView = function(initPosition, img){
	var res = Canvas.createCanvasView({
		opacity: 0.9,
		backgroundImage: img || 'block-508.png' || 'block-524.png',
		width: initPosition.squareWidth + 'px',
		height: initPosition.squareWidth + 'px',
		bottom: initPosition.canvasBottom + 'px'
	});
	
	res.addEventListener('load', onCanvasLoad);
	res.addEventListener('touchstart', onCanvasTouchStart);
	res.addEventListener('touchmove', onCanvasTouchMove);
	res.addEventListener('touchend', onCanvasTouchCancel);
	res.addEventListener('touchcancel', onCanvasTouchCancel);
	
	return res;
};

var idiomsPrepareShortCanvasView = function(canvasInfo){
	var res = Canvas.createCanvasView({
		backgroundColor:'#3c3c3c',
		width: canvasInfo.width + 'px',
		height: canvasInfo.height + 'px',
		left: canvasInfo.left + 'px',
		top: canvasInfo.top + 'px'
	});
	
	res.rowIndex = canvasInfo.rowIndex;
	res.colIndex = canvasInfo.colIndex;
	
	res.addEventListener('load', function(e){
		var v = e.source;
		v.lineWidth = canvasProtocol.lineWidth / idiomsShortToProtocolScale * 1.5;
		v.lineCap = canvasProtocol.lineCap;
	});
	
	res.addEventListener('singletap', (function(view, block){
		return function(e){
			var canvas = e.source;
			var row = canvas.rowIndex;
			var col = canvas.colIndex;
			idiomsCurrentRow = row + 1;
			idiomsCurrentCol = col + 1;
			block.moveTo(row, col);
			//var isOccupied = idiomsOccupyArray[row][col];
			//if(isOccupied) alert("這格已經不能寫囉！"); 
			
			var points = idiomsCanvasPointArray[row][col];
			if(points.length > 0){
				var last = view.children.length - 1;
				drawPointToCanvas(points, view.children[last], idiomsOriginToProtocolScale);
			}
			view.show();
			//idiomsTriggerMoveBlock();
			//idiomsTriggerDeviceAction('start');
			
		};
	})(canvasInfo.relatedView, canvasInfo.blockView));
	
	return res;
};

// ************* check at this **************

var idiomsPrepareDrawingView = function(initPosition){
	var idiomsCanvasSize = initPosition.shortSideWidth;
	
	var clearBtnWidth = initPosition.gapUnitSize * 3;
	var drawingViewWidth = idiomsCanvasSize + clearBtnWidth + initPosition.padding;
	
	var buttonRight = (initPosition.longSideWidth - idiomsCanvasSize) / 2 - initPosition.padding - clearBtnWidth;
	
	var idiomsDrawingView = Ti.UI.createView({
		width: initPosition.longSideWidth + 'px',
		height: initPosition.shortSideWidth + 'px',
		visible:false
	});
	
	var maskView = Ti.UI.createView({
		width: initPosition.longSideWidth + 'px',
		height: initPosition.shortSideWidth + 'px',
		backgroundColor:'#222',
		opacity:0.5
	});
	
	var idiomsConfirmButton = Ti.UI.createButton({
		color: '#ececec',
		//backgroundColor:'#22ee22',
		//backgroundColor:'#000',
		//backgroundSelectedColor:'#3ff',	// that is not support IOS
		// maybe use backgroundImage and backgroundSelectedImage instead
		bottom: initPosition.gapUnitSize * 2 + initPosition.padding * 2 + 'px',
		right: buttonRight + 'px',
		width: clearBtnWidth + 'px',
		height: initPosition.gapUnitSize * 2 + 'px',
		title:'確定',
		borderRadius: initPosition.gapUnitSize / 4,
		borderColor: '#ececec',
		borderWidth:  initPosition.gapUnitSize / 8 + 'px',
		font:{
			fontSize: initPosition.fontSize + 'px',
			fontFamily: 'Helvetica Neue'
		}
	}); 
	
	var idiomsClearButton = Ti.UI.createButton({
		color: '#ececec',
		//backgroundColor:'#ee2222',
		//backgroundColor:'#000',
		//backgroundSelectedColor:'#3ff',	// that is not support IOS
		// maybe use backgroundImage and backgroundSelectedImage instead
		bottom: initPosition.padding + 'px',
		right: buttonRight + 'px',
		width: clearBtnWidth + 'px',
		height: initPosition.gapUnitSize * 2 + 'px',
		title:'清除',
		borderRadius: initPosition.gapUnitSize / 4,
		borderColor: '#ececec',
		borderWidth:  initPosition.gapUnitSize / 8 + 'px',
		font:{
			fontSize: initPosition.fontSize + 'px',
			fontFamily: 'Helvetica Neue'
		}
	});
	
	var idiomsCancelButton = Ti.UI.createButton({
		color: '#ffffff',
		backgroundColor:'#000',
		//backgroundSelectedColor:'#3ff',	// that is not support IOS
		// maybe use backgroundImage and backgroundSelectedImage instead
		top: initPosition.padding + 'px',
		right: buttonRight + 'px',
		width: initPosition.gapUnitSize * 1.5 + 'px',
		height: initPosition.gapUnitSize * 1.5 + 'px',
		title:'X',
		borderRadius: initPosition.gapUnitSize * 1.5 / 2,
		font:{
			fontSize: initPosition.fontSize + 'px',
			fontFamily: 'Helvetica Neue',
			fontWeight: 'bold'
		}
	});
	
	var cview = idiomsPrepareCanvasView(initPosition);
	
	maskView.addEventListener('singletap', function(e){
		idiomsDrawingView.hide();
		//var cview = idiomsCanvasPointArray[idiomsCurrentRow - 1][idiomsCurrentCol - 1];
		//idiomsTriggerDeviceAction('stop');
		cview.clear();
	});
	
	idiomsCancelButton.addEventListener('singletap', function(e){
		idiomsDrawingView.hide();
		//var cview = idiomsCanvasPointArray[idiomsCurrentRow - 1][idiomsCurrentCol - 1];
		//idiomsTriggerDeviceAction('stop');
		cview.clear();
	});
	
	idiomsConfirmButton.addEventListener('singletap', function(e){
		idiomsDrawingView.hide();
		//var cview = idiomsCanvasPointArray[idiomsCurrentRow - 1][idiomsCurrentCol - 1];
		//idiomsTriggerDeviceAction('stop');
		// if(socketObj && idiomsDirtyList[idiomsCurrentRow + '-' + idiomsCurrentCol] === true){
			// socketObj.trigger(
				// IDIOMS_EVENT + "." + SUBMIT_EVENT,
				// triggerObj.combine({
					// block:{
						// row: idiomsCurrentRow,
						// column: idiomsCurrentCol
					// }
				// })
			// );
		// }
		cview.clear();
	});
	
	idiomsClearButton.addEventListener('singletap', function(e){
		var rowIndex = idiomsCurrentRow - 1;
		var colIndex = idiomsCurrentCol - 1;
		
		//idiomsDirtyList[idiomsCurrentRow + '-' + idiomsCurrentCol] = false;
		idiomsCanvasPointArray[rowIndex][colIndex] = [];
		
		cview.clear();
		var shortCanvas = idiomsShortCanvasArray[rowIndex][colIndex];
		shortCanvas.clear();
		// if(socketObj){
			// socketObj.trigger(
				// IDIOMS_EVENT + "." + CLEAR_EVENT,
				// triggerObj.combine({ 
					// block:{
						// row: idiomsCurrentRow,
						// column: idiomsCurrentCol
					// },
					// stamp: (new Date()).getTime() 
				// })
			// );
		// }
	});
	
	idiomsDrawingView.add(maskView);
	//idiomsDrawingView.add(idiomsCancelButton);
	idiomsDrawingView.add(idiomsConfirmButton);
	idiomsDrawingView.add(idiomsClearButton);
	idiomsDrawingView.add(cview);
	//idiomsDrawingView.add(idiomsCanvasPointArray[idiomsCurrentRow - 1][idiomsCurrentCol - 1]);
	
	return idiomsDrawingView;
};


var idiomsViewInit = function(meta){
	meta = meta || {};
	var initPosition = getCurrentPositionLayout();
	var idiomsWindow = Titanium.UI.createWindow({
		//title: '一字千金 - Drawing',
		navBarHidden:true,
		backgroundColor:'#000',
		fullscreen:true,
		orientationModes:[
			Ti.UI.LANDSCAPE_LEFT,
			Ti.UI.LANDSCAPE_RIGHT
			//Ti.UI.PORTRAIT
		]
		//tabBarHidden:true
	});
	
	var drawingView = idiomsPrepareDrawingView(initPosition);
	
	/* Create Background Image */
	var backgroundView = Ti.UI.createView({
		backgroundImage: "idioms_totalBlocks.png",
		//right: 0 + 'px',
		top: 0 + 'px',
		//width: 'auto',
		//height: '100%'
		//height: initPosition.backgroundHeight + 'px',
		width: initPosition.blockWidth + 'px',
		height: initPosition.blockHeight + 'px'
		//height: 300 + 'px'
		//image:'http://' + socketRootHost + "/uploads/",
		
		//backgroundColor: "#f5f5f5"
		//borderWidth: 2,
		//borderColor: "#ff0000"
	});
	
	var highlightView = Ti.UI.createImageView({
		image: "idioms_highlight.png",
		//right: 0 + 'px',
		top: initPosition.highlightInitTop + 'px',
		left: initPosition.highlightInitLeft + 'px',
		//width: 'auto',
		//height: '100%'
		//height: initPosition.backgroundHeight + 'px',
		width: initPosition.highlightWidth + 'px',
		height: initPosition.highlightHeight + 'px',
		opacity:0.7,
		moveTo:(function(top, left, w){
			return function(row, col){
				var scope = this;
				scope.setLeft(col * w + left + 'px');
				scope.setTop(row * w + top + 'px');
			};
		})(initPosition.highlightInitTop, initPosition.highlightInitLeft, initPosition.highlightWidth)
	});
	
	// var highlightView2 = Ti.UI.createImageView({
		// image: "idioms_highlight2.png",
		// //right: 0 + 'px',
		// top: initPosition.highlightInitTop + 'px',
		// left: initPosition.highlightInitLeft + 'px',
		// //width: 'auto',
		// //height: '100%'
		// //height: initPosition.backgroundHeight + 'px',
		// width: initPosition.highlightWidth + 'px',
		// height: initPosition.highlightHeight + 'px',
		// opacity:0.7,
		// moveTo:(function(top, left, w){
			// return function(row, col){
				// var scope = this;
				// scope.setLeft(col * w + left + 'px');
				// scope.setTop(row * w + top + 'px');
			// };
		// })(initPosition.highlightInitTop, initPosition.highlightInitLeft, initPosition.highlightWidth)
	// });
	
	backgroundView.add(highlightView);
	//backgroundView.add(highlightView2);
	
	var idiomsMaskView = Titanium.UI.createView({
		backgroundColor:'#e0e0e0',
		opacity:0.7,
		visible:false,
		width: initPosition.longSideWidth + 'px',
		height: initPosition.shortSideWidth + 'px',
		left:0, top:0
	});
	var idiomsMaskLabel = Titanium.UI.createLabel({
		color:'#000',
		text: '連線中',
		statusText: '連線中',
		//textAlign:'center',
		font:{
			fontSize: initPosition.fontSize + 'px',
			fontFamily: 'Helvetica Neue'
		}
	});
	idiomsMaskView.add(idiomsMaskLabel);
	idiomsMaskView.label = idiomsMaskLabel;
	idiomsWindow.maskView = idiomsMaskView;
	
	idiomsShortToProtocolScale = canvasProtocol.width / (initPosition.highlightWidth - initPosition.shortCanvasSplit * 2);
	idiomsOriginToProtocolScale = canvasProtocol.width / initPosition.squareWidth;
	idiomsOriginToShortScale = (initPosition.highlightWidth - initPosition.shortCanvasSplit * 2) / initPosition.squareWidth;
	
	var xBlockMin = 1;
	var yBlockMin = 1;
	var xBlocks = 12;
	var yBlocks = 8;
	
	//if(!idiomsOccupyArray) idiomsOccupyArray = [];
	//if(!idiomsDirtyList) idiomsDirtyList = {};
	if(!idiomsShortCanvasArray) idiomsShortCanvasArray = [];
	if(!idiomsCanvasPointArray) idiomsCanvasPointArray = [];
	for(var row = 0; row < yBlocks; row++){
		//var oSingleRow = [];
		var scSingleRow = [];
		var cSingleRow = [];
		for(var col = 0; col < xBlocks; col++){
			//oSingleRow.push(false);
			var shortCanvas = idiomsPrepareShortCanvasView({
				width: initPosition.highlightWidth - initPosition.shortCanvasSplit * 2,
				height: initPosition.highlightHeight - initPosition.shortCanvasSplit * 2,
				left: initPosition.highlightWidth * col + initPosition.highlightInitLeft + initPosition.shortCanvasSplit,
				top: initPosition.highlightHeight * row + initPosition.highlightInitTop + initPosition.shortCanvasSplit,
				relatedView: drawingView,
				rowIndex: row,
				colIndex: col,
				blockView: highlightView
			}); 
			scSingleRow.push(shortCanvas);
			backgroundView.add(shortCanvas);
			
			cSingleRow.push([]);
			//var bigCanvas = idiomsPrepareCanvasView(initPosition);
			//cSingleRow.push(bigCanvas);
			//drawingView.add(bigCanvas);
		}
		//idiomsOccupyArray.push(oSingleRow);
		idiomsShortCanvasArray.push(scSingleRow);
		idiomsCanvasPointArray.push(cSingleRow);
	}
	
	
	// var textLabelView = Titanium.UI.createLabel({
		// color:'#000',
		// text: (testMode)? '測試模式':waitForServer,
		// bottom:0,
		// //textAlign:'center',
		// font:{
			// fontSize: initPosition.fontSize + 'px',
			// fontFamily: 'Helvetica Neue'
		// }
	// });
// 	
	// var userNumberLabel = Titanium.UI.createLabel({
		// color:'#000',
		// text: socketUser.toString(),
		// textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
// 		
  		// backgroundColor: '#eee',
//   		
		// left: initPosition.photoLeft + 'px',
		// top: initPosition.photoTop + 'px',
		// width: initPosition.numberWidth + 'px',
		// height: initPosition.numberHeight + 'px',
// 		
		// //textAlign:'center',
		// font:{
			// fontSize: initPosition.fontSize + 'px',
			// fontFamily: 'Helvetica Neue'
		// }
	// });
// 	
	
	idiomsWindow.addEventListener('androidback', function(e){
		// close socket
		e.cancelBubble = true;
		// if(testMode){
			// //clearInterval(runningWindow.countdownInterval);
			// clearConnectionInfo();
		// }else{
		var dialog = Ti.UI.createAlertDialog({
		    cancel: 1,
		    buttonNames: ['是', '否'],
		    message: '不想寫了嗎？',
		    title: '離開'
		});
		dialog.addEventListener('click', (function(preEvent){
			return function(e){
			    if (e.index !== e.source.cancel){
			    	//clearInterval(runningWindow.countdownInterval);
			    	clearIdiomsInfo();
			    	navigationWindows.pop().close();
			    }
			};
		})(e));
		dialog.show();
		// }
	});
	
	var squareSize = Ti.Platform.displayCaps.dpi;
	//var arrows = arrowsViewInit(initPosition, highlightView);
	//var select = selectViewInit(initPosition);
	// var idiomsSecondView = secondViewInit(initPosition);
	// idiomsSecondView.visible = meta.hasSecond !== false;
	// idiomsWindow.countDownLabel = idiomsSecondView;
	
	//var end = endViewInit(initPosition);
	
	/*
	arrows.addEventListener('touchend', function(e){
		arrows.setOpacity(0.4);
	});
	arrows.addEventListener('touchcancel', function(e){
		arrows.setOpacity(0.4);
	});
	arrows.addEventListener('touchstart', function(e){
		arrows.setOpacity(0.8);
		var x = e.x,
			y = e.y,
			leftBound = squareSize * 4.5 / 13,
			rightBound = squareSize * 8.5 / 13,
			topBound = leftBound,
			bottomBound = rightBound;
		
		var currentLeft = parseFloat(highlightView.getLeft());
		var currentTop = parseFloat(highlightView.getTop());
		var xStep = initPosition.highlightWidth;
		var yStep = initPosition.highlightHeight;
		var xDiff, yDiff;
		
		if(x <= leftBound){
			// left region
			if(idiomsCurrentCol > xBlockMin){
				idiomsCurrentCol--;
				highlightView.setLeft((currentLeft - xStep) + 'px');
			}
		}else if(x > leftBound && x < rightBound){
			// center region
		}else{
			// right region
			if(idiomsCurrentCol < xBlocks){
				idiomsCurrentCol++;
				highlightView.setLeft((currentLeft + xStep) + 'px');
			}
		}
		
		if(y <= topBound){
			// top region
			if(idiomsCurrentRow > yBlockMin){
				idiomsCurrentRow--;
				highlightView.setTop((currentTop - yStep) + 'px');
			}
		}else if(y > topBound && y < bottomBound){
			// middle region
		}else{
			// bottom region
			if(idiomsCurrentRow < yBlocks){
				idiomsCurrentRow++;
				highlightView.setTop((currentTop + yStep) + 'px');
			}
		}
		
		if(socketObj){
			socketObj.trigger(
				IDIOMS_EVENT + "." + MOVE_BLOCK_EVENT,
				triggerObj.combine({ 
					block:{
						row: idiomsCurrentRow,
						column: idiomsCurrentCol
					} 
				})
			);
		}
	});
	*/
	
	/*
	select.addEventListener('touchend', function(e){
		select.setOpacity(0.4);
		
		var isOccupied = idiomsOccupyArray[idiomsCurrentRow - 1][idiomsCurrentCol - 1];
		if(isOccupied) alert("這格已經不能寫囉！"); 
		if((testMode || (canWrite && !isOccupied)) && select.validTouch){
			select.validTouch = false;
			var points = idiomsCanvasPointArray[idiomsCurrentRow - 1][idiomsCurrentCol - 1];
			if(points.length > 0){
				var last = drawingView.children.length - 1;
				drawPointToCanvas(points, drawingView.children[last]);
			}
			drawingView.show();
			if(socketObj){
				socketObj.trigger(
					ACTION_EVENT,
					triggerObj.combine({ 
						block:{
							row: idiomsCurrentRow,
							column: idiomsCurrentCol
						},
						stamp: (new Date()).getTime(),
						action: "device_start" 
					})
				);
			}
		}
	});
	select.addEventListener('touchcancel', function(e){
		select.setOpacity(0.4);
		select.validTouch = false;
	});
	select.addEventListener('touchstart', function(e){
		if(testMode || canWrite){
			 select.validTouch = true;
			 select.setOpacity(0.8);
		}
	});
	*/
	
	/*
	end.addEventListener('touchend', function(e){
		end.setOpacity(0.4);
		if((testMode || canWrite) && end.validTouch){
			var blocks = [];
			for(var x in idiomsDirtyList){
				if(idiomsDirtyList[x]){
					var rowAndCol = x.split('-');
					if(rowAndCol.length == 2){
						blocks.push({
							row: rowAndCol[0],
							column: rowAndCol[1]
						});
					}
				}
			}
			
			if(testMode){
				alert("Send Blocks: " + JSON.stringify(blocks));
			}
			
			if(socketObj){
				socketObj.trigger(
					IDIOMS_EVENT + "." + END_ROUND_EVENT,
					triggerObj.combine({ 
						blocks:blocks
					})
				);
			}
		}
	});
	end.addEventListener('touchcancel', function(e){
		end.setOpacity(0.4);
		end.validTouch = false;
	});
	end.addEventListener('touchstart', function(e){
		end.setOpacity(0.8);
		if(testMode || canWrite){
			 end.validTouch = true;
		}
	});
	*/
	
	idiomsWindow.add(backgroundView);
	//idiomsWindow.add(textLabelView);
	//idiomsWindow.add(userNumberLabel);
	//idiomsWindow.add(arrows);
	//idiomsWindow.add(select);
	//idiomsWindow.add(idiomsSecondView);
	//idiomsWindow.add(end);
	idiomsWindow.add(drawingView);
	idiomsWindow.add(idiomsMaskView);
	
	idiomsWindow.arrangeLayout = function(){
		//alert("arrange");
	};
	
	idiomsWindow.refreshAll = function(){
		var self = this;
		//idiomsTriggerDeviceAction('stop');
		isDrawing = false;
		//canWrite = false;
		//idiomsDirtyList = {};
		//self.countDownLabel.reloadCountDownSecond();
		//self.children[5].hide();
		drawingView.hide();
		idiomsCurrentRow = 1; 
		idiomsCurrentCol = 1;
		//self.children[0].children[0].moveTo(0, 0);
		//self.children[0].children[1].moveTo(0, 0);
		highlightView.moveTo(0, 0);
		//highlightView2.moveTo(0, 0);
		//self.children[1].text = waitForServer;
		//self.children[1].show();
		// textLabelView.text = waitForServer;
		// textLabelView.show();
		
		var xBlocks = 12;
		var yBlocks = 8;
		for(var row = 0; row < yBlocks; row++){
			for(var col = 0; col < xBlocks; col++){
				//idiomsOccupyArray[row][col] = false;
				idiomsShortCanvasArray[row][col].clear();
				idiomsCanvasPointArray[row][col] = [];
			}
		}
		
		// if(socketObj){
			// socketObj.trigger(DEVICE_READY_EVENT, triggerObj);
		// }
		idiomsMaskView.hide();
	};
	
	return idiomsWindow;
};
