	// BREAKING ALL THE RULES.
import FlagEnum from "./GlobalFlags/FlagEnum";
import kGAMECLASS from "./GlobalFlags/kGAMECLASS";
	import classes.Scenes.Dungeons.D3.D3;

	import classes.CoC_Settings;

	import classes.AssClass;
	import classes.BreastRowClass;
	import classes.Items.*;
	import classes.PerkLib;

	import classes.Player;
	import classes.Cock;
	import classes.Creature;
	import classes.ItemSlotClass;
	import classes.PerkClass;
	import classes.StatusAffectClass;
	import classes.VaginaClass;
	import classes.ImageManager;
	import classes.internals.Utils;


	// This line not necessary, but added because I'm pedantic like that.
	import classes.InputManager;

	import classes.Parser.Parser;

	import classes.Scenes.*;
	import classes.Scenes.Areas.*;
	import classes.Scenes.Areas.Desert.*
	import classes.Scenes.Areas.Forest.*
	import classes.Scenes.Areas.HighMountains.*
	import classes.Scenes.Areas.Mountain.*
	import classes.Scenes.Areas.Swamp.*
	import classes.Scenes.Dungeons.DeepCave.*;
	import classes.Scenes.Dungeons.DesertCave.*;
	import classes.Scenes.Dungeons.Factory.*;
	import classes.Scenes.Dungeons.HelDungeon.*;
	import classes.Scenes.Explore.*;
	import classes.Scenes.Monsters.*;
	import classes.Scenes.NPCs.*;
	import classes.Scenes.Places.*;
	import classes.Scenes.Places.TelAdre.*;
	import classes.Scenes.Quests.*;
	import coc.view.MainView;

	import coc.model.GameModel;
	import coc.model.TimeModel;

	/****
		classes.CoC: The Document class of Corruption of the Champions.
	****/
		

export default class CoC
{
	//Any classes that need to be aware of the passage of time can add themselves to this array using timeAwareAdd.
	//	Once in the array they will be notified as each hour passes, allowing them to update actions, lactation, pregnancy, etc.
	private static _timeAwareClassList:Vector.<TimeAwareInterface> = new Vector.<TimeAwareInterface>(); //Accessed by goNext function in eventParser
	private static timeAwareLargeLastEntry:number = -1; //Used by the eventParser in calling timeAwareLarge
	private playerEvent:PlayerEvents;
		
	public static function timeAwareClassAdd(newEntry:TimeAwareInterface):void { _timeAwareClassList.push(newEntry); }
		
	private static doCamp:Function; //Set by campInitialize, should only be called by playerMenu
	private static function campInitialize(passDoCamp:Function):void { doCamp = passDoCamp; }
		
	// /
	public let charCreation:CharCreation = new CharCreation();
	public let saves:Saves = new Saves(gameStateDirectGet, gameStateDirectSet);


		
	private let gameState: number;
	public let time :TimeModel;
	public let currentText:string;

	public get inCombat():boolean { return gameState == 1; }
		
	public set inCombat(value:boolean):void { gameState = (value ? 1 : 0); }
		
	private gameStateDirectGet(): number { return gameState; }
		
	private gameStateDirectSet(value: number):void { gameState = value; }
		

	// holidayz
	public isEaster():boolean
	{
		return plains.bunnyGirl.isItEaster();
	}

	public CoC()
	{
		this.parser = new Parser(this, CoC_Settings);

		this.model = new GameModel();
		this.mainView = new MainView( this.model );
		this.mainView.name = "mainView";
		this.stage.addChild( this.mainView );


		// Set up all the messy global stuff:
			
		// ******************************************************************************************

		let mainView :MainView = this.mainView;
		let model :GameModel = this.model;
			

		/**
			* Global Variables used across the whole game. I hope to whittle it down slowly.
			*/

		/**
			* System Variables
			* Debug, Version, etc
			*/
		//{ region SystemVariables

		//DEBUG, used all over the place
		debug = false;
		//model.debug = debug; // TODO: Set on model?

		//Version NUMBER
		ver = "0.9.4";
		version = ver + " (<b>Moar Bugfixan</b>)";

		//Indicates if building for mobile?
		mobile = false;
		model.mobile = mobile;

		this.images = new ImageManager(stage);
		this.inputManager = new InputManager(stage, false);
		include "../../includes/ControlBindings.as";

		this.monkey = new ChaosMonkey(this);

		//} endregion

		/**
			* Player specific variables
			* The player object and variables associated with the player
			*/
		//{ region PlayerVariables

		//The Player object, used everywhere
		player = new Player();
		model.player = player;
		player2 = new Player();
		playerEvent = new PlayerEvents();

		//Used in perk selection, mainly eventParser, input and engineCore
		//tempPerk = null;

		//Create monster, used all over the place
		monster = new Monster();
		//} endregion

		/**
			* State Variables
			* They hold all the information about item states, menu states, game states, etc
			*/
		//{ region StateVariables

		//User all over the place whenever items come up
//No longer used:			itemSwapping = false;

		//The extreme flag state array. This needs to go. Holds information about everything, whether it be certain attacks for NPCs 
		//or state information to do with the game. 
		flags = new DefaultDict();
		model.flags = flags;


//Gone, last use replaced by newRound arg for combatMenu
		//Another state variable used for menu display used everywhere
		//menuLoc
		//0 - normal
		//1 - items menu - no heat statuses when leaving it in combat
		//2 - needs to add an hour after grabbing item
		//3 - In tease menu - no heat statuses when leaving it.
//			menuLoc = 0;

		//State variable used to indicate whether inside an item submenu
		//The item sub menu
//			itemSubMenu = false;
		//} endregion 

		/**
			* Display Variables
			* Variables that hold display information like number of days and all the current displayed text
			*/
		//{ region DisplayVariables

		//Holds the date and time display in the bottom left
		time = new TimeModel();
		model.time = time;

		//The string holds all the "story" text, mainly used in engineCore
		currentText = "";
		//}endregion 

		/**
			* Item variables
			* Holds all the information about items in your inventory and stashes away
			*/
		//{region ItemVariables

		/**
			* Plot Variables
			* Booleans and numbers about whether you've found certain places
			*/
		//{ region PlotVariables

		//Plot variables
		explored = false;
		foundForest = false;
		foundDesert = false;
		foundMountain = false;
		foundLake = false;
		whitney = 0;
		monk = 0;
		sand = 0;
		giacomo = 0;
//Replaced by flag			beeProgress = 0;

//			itemStorage = [];
//			gearStorage = [];
		//}endregion


		// These are toggled between by the [home] key.
		mainView.textBGWhite.visible = false;
		mainView.textBGTan.visible = false;

		// *************************************************************************************

		// import flash.events.MouseEvent;

		//const DOUBLE_ATTACK_STYLE: number = 867;
		//const SPELLS_CAST: number = 868;

		//Fenoxo loves his temps
		temp = 0;

		//Used to set what each action buttons displays and does.
		args = [];
		funcs = [];

		//Used for stat tracking to keep up/down arrows correct.
		oldStats = {};
		model.oldStats = oldStats;
		oldStats.oldStr  = 0;
		oldStats.oldTou  = 0;
		oldStats.oldSpe  = 0;
		oldStats.oldInte = 0;
		oldStats.oldSens = 0;
		oldStats.oldLib  = 0;
		oldStats.oldCor  = 0;
		oldStats.oldHP   = 0;
		oldStats.oldLust = 0;

		model.maxHP = maxHP;

		// ******************************************************************************************

		mainView.aCb.dataProvider = new DataProvider([{label:"TEMP",perk:new PerkClass(PerkLib.Acclimation)}]);
		mainView.aCb.addEventListener(Event.CHANGE, changeHandler); 
			 
		//mainView._getButtonToolTipText = getButtonToolTipText;


		//Register the classes we need to be able to serialize and reconstitute so
		// they'll get reconstituted into the correct class when deserialized
		registerClassAlias("AssClass", AssClass);
		registerClassAlias("Character", Character);
		registerClassAlias("Cock", Cock);
		registerClassAlias("CockType", CockType);
		registerClassAlias("Enum", Enum);
		registerClassAlias("Creature", Creature);
		registerClassAlias("ItemSlotClass", ItemSlotClass);
		registerClassAlias("KeyItemClass", KeyItemClass);
		registerClassAlias("Monster", Monster);
		registerClassAlias("Player", Player);
		registerClassAlias("StatusAffectClass", StatusAffectClass);
		registerClassAlias("VaginaClass", VaginaClass);
		//registerClassAlias("Enum", Enum);

		//Hide sprites
		mainView.hideSprite();
		//Hide up/down arrows
		mainView.statsView.hideUpDown();

		this.addFrameScript( 0, this.run );
	}

}

