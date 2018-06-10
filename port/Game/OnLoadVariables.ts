/**
 * All the variables that have been left around but don't fit into the GlobalVariables file
 */

// import classes.creature;

//Used when save/loading
export var notes: string = "";
// nameBox.maxChars = 54;

//Images for image pack!
//NO! Images now work through ImageManager in GlobalVariables
//var images = new Array();

//System time
export var date:Date = new Date();

//Used to set what each action buttons displays and does. I don't know why it is initialized here.
//var args: Array<any> = new Array();
//var funcs: Array<any> = new Array();

//Loeri stuff
//import flash.system.*
 
//if ( ApplicationDomain.currentDomain.hasDefinition("Creature")) trace("Class exists");

//dungeoneering variables
//Setting dungeonLoc = 0 handles this:	export var inDungeon: boolean = false;
export var dungeonLoc: number = 0;

// To save shitting up a lot of code...
export var inRoomedDungeon: boolean = false;
export var inRoomedDungeonResume:Function = null;

//Used to restrict random drops from overlapping uniques
export var plotFight: boolean = false;
export var timeQ: number = 0;
export var campQ: boolean = false;

//Possibly redundant, not used anywhere else.
//Input vars
/* Yup, not used at all
export var button0Choice: number = 0;
export var button1Choice: number = 0;
export var button2Choice: number = 0;
export var button3Choice: number = 0;
export var button4Choice: number = 0;
export var button5Choice: number = 0;
export var button6Choice: number = 0;
export var button7Choice: number = 0;
export var button8Choice: number = 0;
export var button9Choice: number = 0;
*/