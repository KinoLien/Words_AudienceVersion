
var getCurrentPositionLayout = function(orientationMode){
	var modes = appValidModes;
	
	var obj = {
		screenWidth: Ti.Platform.displayCaps.platformWidth,
		screenHeight: Ti.Platform.displayCaps.platformHeight
	};
	
	obj.shortSideWidth = Math.min(obj.screenHeight, obj.screenWidth);
	obj.longSideWidth = Math.max(obj.screenHeight, obj.screenWidth);
	
	orientationMode = orientationMode || ((obj.shortSideWidth < obj.screenHeight)? Ti.UI.PORTRAIT : Ti.UI.LANDSCAPE_LEFT);
	if(modes.indexOf(orientationMode) == -1) return undefined;
	
	obj.padding = obj.shortSideWidth / 48;
	obj.squareWidth = obj.shortSideWidth - obj.padding * 2;
	
	obj.fontSize = (obj.shortSideWidth > 480)? (obj.shortSideWidth / 450 * 28) : 28;
	obj.gapUnitSize = (obj.shortSideWidth > 480)? (obj.shortSideWidth / 450 * 30) : 30;
	
	var isPortrait = orientationMode == Ti.UI.PORTRAIT; 
	//|| orientationMode == Ti.UI.UPSIDE_PORTRAIT
	
	// in running view 
	obj.photoWidth = obj.shortSideWidth * 2 / 5;
	obj.photoHeight = obj.photoWidth / 3 * 3.5;
	obj.buttonWidth = obj.shortSideWidth / 4.5;
	obj.buttonHeight = obj.longSideWidth / 12;
	
	obj.canvasBottom = obj.padding;
	obj.canvasRight = obj.padding;
	obj.photoLeft = obj.padding;
	obj.photoTop = obj.padding;
	
	obj.submitBtnBottom = obj.padding; 
	obj.submitBtnRight = obj.squareWidth + obj.padding * 2;
	obj.clearBtnBottom = obj.submitBtnBottom;
	obj.clearBtnRight = obj.buttonWidth + obj.squareWidth + obj.padding * 3;
	
	obj.maskWidth = obj.screenWidth;
	obj.maskHeight = obj.screenHeight;
	
	
	// for idioms game
	var totalBlockWidth = 2035;
	var totalBlockHeight = 1375;
	var totalBlockColumnHeaderSize = 55;
	var totalBlockCellSize = 165;
	var highlightBorder = 7;
	obj.blockWidth = obj.shortSideWidth * (totalBlockWidth / totalBlockHeight);
	obj.blockHeight = obj.shortSideWidth;
	var totalBlockWidthScale = obj.blockWidth / totalBlockWidth;
	var totalBlockHeightScale = obj.blockWidth / totalBlockWidth;
	var highlightBorderScale = totalBlockHeight / highlightBorder;
	obj.highlightWidth = totalBlockCellSize * totalBlockWidthScale;
	obj.highlightHeight = totalBlockCellSize * totalBlockHeightScale;
	obj.highlightInitLeft = totalBlockColumnHeaderSize * totalBlockWidthScale;
	obj.highlightInitTop = totalBlockColumnHeaderSize * totalBlockHeightScale; 
	
	obj.highlightBorder = obj.blockHeight / highlightBorderScale / 2;
	
	return obj;
};

Ti.Gesture.addEventListener('orientationchange', function(e){
	// var modes = appValidModes;
	// if(modes.indexOf(e.orientation) != -1){
		// if(currentWindow) currentWindow.arrangeLayout(e.orientation);
	// }
});

