﻿public executeButtonClick(button: number = 0):void {
	mainView.clickButton( button );
}

//DROPDOWN BOX STUFF
// import fl.controls.ComboBox; 
// import fl.data.DataProvider; 
// import flash.net.navigateToURL; 

//Change handler is only used for selecting perks. Moved to engineCore with the other perk selection code


 /*HOLY SHIT THIS HOW TO DO URL LINKS!
public changeHandler(event:Event):void { 
    let request:URLRequest = new URLRequest(); 
    request.url = ComboBox(event.target).selectedItem.data; 
    navigateToURL(request); 
    mainView.aCb.selectedIndex = -1; 
}*/

public displayControls():void
{
	mainView.hideAllMenuButtons();
	inputManager.DisplayBindingPane();
	
	choices("Reset Ctrls", resetControls,
			"Clear Ctrls", clearControls,
			"Null", null,
			"Null", null,
			"Null", null,
			"Null", null,
			"Null", null,
			"Null", null,
			"Null", null,
			"Back", hideControls);
}

public hideControls():void
{
	inputManager.HideBindingPane();
	
	settingsScreen();
}

public resetControls():void
{
	inputManager.HideBindingPane();
	
	Render.text("Are you sure you want to reset all of the currently bound controls to their defaults?", true);
	
	doYesNo(resetControlsYes, displayControls);
}

public resetControlsYes():void
{
	inputManager.ResetToDefaults();
	
	Render.text("Controls have been reset to defaults!\n\n", true);
	
	doNext(displayControls);
}

public clearControls():void
{
	inputManager.HideBindingPane();
	
	Render.text("Are you sure you want to clear all of the currently bound controls?", true);
	
	doYesNo(clearControlsYes, displayControls);
}

public clearControlsYes():void
{
	inputManager.ClearAllBinds();
	
	Render.text("Controls have been cleared!", true);
	
	doNext(displayControls);
}