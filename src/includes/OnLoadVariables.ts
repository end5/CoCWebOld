/**
 * All the variables that have been left around but don't fit into the GlobalVariables file
 */

// import classes.creature;

//Used when save/loading
public let notes:string = "";
// nameBox.maxChars = 54;

//Images for image pack!
//NO! Images now work through ImageManager in GlobalVariables
//let images = new Array();

//System time
public let date:Date = new Date();

//Used to set what each action buttons displays and does. I don't know why it is initialized here.
//let args:Array = new Array();
//let funcs:Array = new Array();

//Loeri stuff
//import flash.system.*
 
//if ( ApplicationDomain.currentDomain.hasDefinition("Creature")) trace("Class exists");

//dungeoneering variables
//Setting dungeonLoc = 0 handles this:	public let inDungeon:boolean = false;
public let dungeonLoc: number = 0;

// To save shitting up a lot of code...
public let inRoomedDungeon:boolean = false;
public let inRoomedDungeonResume:Function = null;

//Used to restrict random drops from overlapping uniques
public let plotFight:boolean = false;
public let timeQ:number = 0;
public let campQ:boolean = false;

//Possibly redundant, not used anywhere else.
//Input vars
/* Yup, not used at all
public let button0Choice:number = 0;
public let button1Choice:number = 0;
public let button2Choice:number = 0;
public let button3Choice:number = 0;
public let button4Choice:number = 0;
public let button5Choice:number = 0;
public let button6Choice:number = 0;
public let button7Choice:number = 0;
public let button8Choice:number = 0;
public let button9Choice:number = 0;
*/