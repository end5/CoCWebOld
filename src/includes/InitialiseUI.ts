/**
 * Initialises the "action" buttons at the bottom of the main screen
 *
 * gButtons is an array that holds the 10 buttons along the bottom of the screen
 * 
 * This whole file is pretty much obviated by coc.view.MainView. ~amygdala
 */

// const NUM_OF_BUTTONS: number = 10; //Total number of buttons in the bottom section of the screen.

// let gButtons:Array = new Array();
//No longer used, choices now calls addButton:	public let buttonEvents:Array = new Array();

// gButtons[0] = new buttonBackground0();
// gButtons[1] = new buttonBackground1();
// gButtons[2] = new buttonBackground2();
// gButtons[3] = new buttonBackground3();
// gButtons[4] = new buttonBackground4();
// gButtons[5] = new buttonBackground5();
// gButtons[6] = new buttonBackground6();
// gButtons[7] = new buttonBackground7();
// gButtons[8] = new buttonBackground8();
// gButtons[9] = new buttonBackground9();

//Add the MouseClick event listeners and add the buttons to the stage
// for (let loopCnt: number = 0; loopCnt < NUM_OF_BUTTONS; loopCnt++)
// {
// 	gButtons[loopCnt].addEventListener(MouseEvent.CLICK, buttonEvent);
// 	this.addChild(gButtons[loopCnt]);
// }

//Positioning the buttons
// let index: number = 0;
// let xOffset: number = 200; //Absolute offsets, here to stay?
// let yOffset: number = 668;
// let buttonWidth: number = 160;
// let rowSeparation: number = 52;
// while (index < NUM_OF_BUTTONS)
// {
// 	//Row 1, 5 buttons
// 	if (index < 5)
// 	{
// 		gButtons[index].x = xOffset + index * buttonWidth;
// 		gButtons[index].y = yOffset;
// 	}
// 	//Row 2, also 5 buttons
// 	else
// 	{
// 		gButtons[index].x = xOffset + (index - 5) * buttonWidth;
// 		gButtons[index].y = yOffset+rowSeparation;
// 	}
// 	this.setChildIndex(gButtons[index], 4); //4 is a magic number here, unless someone knows the significance? 
// 	gButtons[index].width = 150; //The button symbols are actually 135 wide
// 	gButtons[index].height = 40; //and 38 high. Not sure why the difference here.
// 	trace("BUTTON #: " + index + " X: " + gButtons[index].x + " Y: " + gButtons[index].y);
// 	index++;
// }
