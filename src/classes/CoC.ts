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
    /*
	// Include the functions. ALL THE FUNCTIONS
//No longer needed. Added into CharCreation.as:		include "../../includes/customCharCreation.as";
		
	include "../../includes/descriptors.as";
	include "../../includes/appearance.as";

//No longer needed:		include "../../includes/InitialiseUI.as";
	include "../../includes/input.as";
	include "../../includes/OnLoadVariables.as";
	include "../../includes/startUp.as";
	include "../../includes/debug.as";
		
	include "../../includes/combat.as";
//No longer needed. This file has been chopped up and spread throughout the codebase:		include "../../includes/doEvent.as";
	include "../../includes/eventParser.as";
		

	include "../../includes/eventTest.as";
		
		
	include "../../includes/transform.as";
		
	include "../../includes/engineCore.as";

	// Lots of constants
	//include "../../includes/flagDefs.as";
	include "../../includes/appearanceDefs.as";
    */
	//Any classes that need to be made aware when the game is saved or loaded can add themselves to this array using saveAwareAdd.
	//	Once in the array they will be notified by Saves.as whenever the game needs them to write or read their data to the flags array.
	private static let _saveAwareClassList:Vector.<SaveAwareInterface> = new Vector.<SaveAwareInterface>();
	
	//Called by the saveGameObject function in Saves
    public static function saveAllAwareClasses(game: CoC): void {
        for (let sac: number = 0; sac < _saveAwareClassList.length; sac++)
            _saveAwareClassList[sac].updateBeforeSave(game);
    }

	//Called by the loadGameObject function in Saves
    public static function loadAllAwareClasses(game: CoC): void {
        for (let sac: number = 0; sac < _saveAwareClassList.length; sac++)
            _saveAwareClassList[sac].updateAfterLoad(game);
    }

    public static function saveAwareClassAdd(newEntry: SaveAwareInterface): void {
        _saveAwareClassList.push(newEntry);
    }
	
	//Any classes that need to be aware of the passage of time can add themselves to this array using timeAwareAdd.
	//	Once in the array they will be notified as each hour passes, allowing them to update actions, lactation, pregnancy, etc.
	private static _timeAwareClassList:Vector.<TimeAwareInterface> = new Vector.<TimeAwareInterface>(); //Accessed by goNext function in eventParser
	private static timeAwareLargeLastEntry:number = -1; //Used by the eventParser in calling timeAwareLarge
	private playerEvent:PlayerEvents;
		
	public static function timeAwareClassAdd(newEntry:TimeAwareInterface):void { _timeAwareClassList.push(newEntry); }
		
	private static doCamp:Function; //Set by campInitialize, should only be called by playerMenu
	private static function campInitialize(passDoCamp:Function):void { doCamp = passDoCamp; }
		
	// /
	private let _perkLib:PerkLib = new PerkLib();// to init the static
	private let _statusAffects:StatusAffects = new StatusAffects();// to init the static
	public let charCreation:CharCreation = new CharCreation();
	public let saves:Saves = new Saves(gameStateDirectGet, gameStateDirectSet);
	// Items/
	public let mutations:Mutations = new Mutations();
	public let consumables:ConsumableLib = new ConsumableLib();
	public let useables:UseableLib;
	public let weapons:WeaponLib = new WeaponLib();
	public let armors:ArmorLib = new ArmorLib();
	public let miscItems:MiscItemLib = new MiscItemLib();
	// Scenes/
	public let camp:Camp = new Camp(campInitialize);
	public let exploration:Exploration = new Exploration();
	public let followerInteractions:FollowerInteractions = new FollowerInteractions();
	public let inventory:Inventory = new Inventory(saves);
	public let masturbation:Masturbation = new Masturbation();
	// Scenes/Areas/
	public let bog:Bog = new Bog();
	public let desert:Desert = new Desert();
	public let forest:Forest = new Forest();
	public let highMountains:HighMountains = new HighMountains();
	public let lake:Lake = new Lake();
	public let mountain:Mountain = new Mountain();
	public let plains:Plains = new Plains();
	public let swamp:Swamp = new Swamp();
	// Scenes/Dungeons
	public let brigidScene:BrigidScene = new BrigidScene();
	public let d3:D3 = new D3();
	// Scenes/Explore/
	public let gargoyle:Gargoyle = new Gargoyle();
	public let lumi:Lumi = new Lumi();
	// Scenes/Monsters/
	public let goblinScene:GoblinScene = new GoblinScene();
	public let impScene:ImpScene = new ImpScene();
	public let goblinAssassinScene:GoblinAssassinScene = new GoblinAssassinScene();
	// Scenes/NPC/
	public let amilyScene:AmilyScene = new AmilyScene();
	public let anemoneScene:AnemoneScene = new AnemoneScene();
	public let arianScene:ArianScene = new ArianScene();
	public let ceraphScene:CeraphScene = new CeraphScene();
	public let ceraphFollowerScene:CeraphFollowerScene = new CeraphFollowerScene();
	public let emberScene:EmberScene = new EmberScene();
	public let exgartuan:Exgartuan = new Exgartuan();
	public let helFollower:HelFollower = new HelFollower();
	public let helScene:HelScene = new HelScene();
	public let helSpawnScene:HelSpawnScene = new HelSpawnScene();
	public let holliScene:HolliScene = new HolliScene();
	public let isabellaScene:IsabellaScene = new IsabellaScene();
	public let isabellaFollowerScene:IsabellaFollowerScene = new IsabellaFollowerScene();
	public let izmaScene:IzmaScene = new IzmaScene();
	public let jojoScene:JojoScene = new JojoScene();
	public let kihaFollower:KihaFollower = new KihaFollower();
	public let kihaScene:KihaScene = new KihaScene();
	public let latexGirl:LatexGirl = new LatexGirl();
	public let marbleScene:MarbleScene = new MarbleScene();
	public let marblePurification:MarblePurification = new MarblePurification();
	public let milkWaifu:MilkWaifu = new MilkWaifu();
	public let raphael:Raphael = new Raphael();
	public let rathazul:Rathazul = new Rathazul();
	public let sheilaScene:SheilaScene = new SheilaScene();
	public let shouldraFollower:ShouldraFollower = new ShouldraFollower();
	public let shouldraScene:ShouldraScene = new ShouldraScene();
	public let sophieBimbo:SophieBimbo = new SophieBimbo();
	public let sophieFollowerScene:SophieFollowerScene = new SophieFollowerScene();
	public let sophieScene:SophieScene = new SophieScene();
	public let urta:Urta = new Urta();
	public let urtaHeatRut:UrtaHeatRut = new UrtaHeatRut();
	public let urtaPregs:UrtaPregs = new UrtaPregs();
	public let valeria:Valeria = new Valeria();
	public let vapula:Vapula = new Vapula();
	// Scenes/Places/
	public let bazaar:Bazaar = new Bazaar();
	public let boat:Boat = new Boat();
	public let farm:Farm = new Farm();
	public let owca:Owca = new Owca();
	public let telAdre:TelAdre = new TelAdre();
	// Scenes/Quests/
	public let urtaQuest:UrtaQuest = new UrtaQuest();

	// Force updates in Pepper Flash ahuehue
	private let _updateHack:Sprite = new Sprite();

	// Other scenes

	include "../../includes/april_fools.as";

	include "../../includes/dreams.as";
	include "../../includes/dungeon2Supplimental.as";
	include "../../includes/dungeonCore.as";
//No longer needed. This file has been chopped up and spread throughout the codebase:		include "../../includes/dungeonEvents.as";
	include "../../includes/dungeonHelSupplimental.as";
	include "../../includes/dungeonSandwitch.as";
	include "../../includes/fera.as";
//Moved to Scenes/Masturbation.as		include "../../includes/masturbation.as";
	include "../../includes/pregnancy.as";
	include "../../includes/runa.as";
	include "../../includes/symGear.as";
	include "../../includes/tamaniDildo.as";
	include "../../includes/thanksgiving.as";
	include "../../includes/valentines.as";
	include "../../includes/worms.as";
	include "../../includes/xmas_bitch.as";
	include "../../includes/xmas_gats_not_an_angel.as";
	include "../../includes/xmas_jack_frost.as";
	include "../../includes/xmas_misc.as";
	
		
	/****
		This is used purely for bodges while we get things cleaned up.
		Hopefully, anything you stick to this object can be removed eventually.
		I only used it because for some reason the Flash compiler wasn't seeing
		certain functions, even though they were in the same scope as the
		function calling them.
	****/
//Looks like this dangerous little let is no longer used anywhere, huzzah.		public let semiglobalReferencer :* = {};

	public let mainView :MainView;

	public let model :GameModel;

	public let parser:Parser;

	// ALL THE VARIABLES:
	// Declare the various global variables as class variables.
	// Note that they're set up in the constructor, not here.
	public let debug:boolean;
	public let ver:string;
	public let version:string;
	public let mobile:boolean;
	public let images:ImageManager;
	public let player:Player;
	public let player2:Player;
//No longer used:		public let tempPerk:PerkClass;
	public let monster:Monster;
//No longer used:		public let itemSwapping:boolean;
	public let flags:DefaultDict;
	private let gameState: number;
//Gone, last use replaced by newRound arg for combatMenu:		public let menuLoc:number;
//No longer used:		public let itemSubMenu:boolean;
//No longer used:		public let supressGoNext:boolean = false;
	public let time :TimeModel;
	public let currentText:string;

	public let explored:boolean;
	public let foundForest:boolean;
	public let foundDesert:boolean;
	public let foundMountain:boolean;
	public let foundLake:boolean;
	public let whitney:number;
	public let monk:number;
	public let sand:number;
	public let giacomo: number;
//Replaced by flag		public let beeProgress:number;
//Now in Inventory.as		public let itemStorage:Array;
//Now in Inventory.as		public let gearStorage:Array;
	public let temp: number;
	public let args:Array;
	public let funcs:Array;
	public let oldStats:*; // I *think* this is a generic object
	public let inputManager:InputManager;

	public let monkey:ChaosMonkey;
	public let testingBlockExiting:boolean;

	public let kFLAGS_REF:*;
		
	public get inCombat():boolean { return gameState == 1; }
		
	public set inCombat(value:boolean):void { gameState = (value ? 1 : 0); }
		
	private gameStateDirectGet(): number { return gameState; }
		
	private gameStateDirectSet(value: number):void { gameState = value; }
		
	public rand(max: number): number
	{
		return Utils.rand(max);
	}

	// holidayz
	public isEaster():boolean
	{
		return plains.bunnyGirl.isItEaster();
	}

	public CoC()
	{
		// Cheatmode.
		kGAMECLASS = this;
			
		useables = new UseableLib();
			
		this.kFLAGS_REF = FlagEnum; 
		// cheat for the parser to be able to find FlagEnum
		// If you're not the parser, DON'T USE THIS

		// This is a flag used to prevent the game from exiting when running under the automated tester
		// (the chaos monkey)
		testingBlockExiting = false;
			
		// Used for stopping chaos monkey on syntax errors. Separate flag so we can make stopping optional
		CoC_Settings.haltOnErrors = false;
			
		this.parser = new Parser(this, CoC_Settings);

		this.model = new GameModel();
		this.mainView = new MainView( this.model );
		this.mainView.name = "mainView";
		this.stage.addChild( this.mainView );

		// Hooking things to MainView.
		this.mainView.onNewGameClick = charCreation.newGameGo;
		this.mainView.onAppearanceClick = appearance;
		this.mainView.onDataClick = saves.saveLoad;
		this.mainView.onLevelClick = levelUpGo;
		this.mainView.onPerksClick = displayPerks;
		this.mainView.onStatsClick = displayStats;

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


		///Used everywhere to establish what the current game state is
		// Key system variables
		//0 = normal
		//1 = in combat
		//2 = in combat in grapple
		//3 = at start or game over screen
//GameState 4 eliminated			//4 = at giacomo
//GameState 5 eliminated			//5 = getting succubi potion
//GameState 6 eliminated			//6 = at alchemist choices.
//GameState 7 eliminated			//7 = item duuuuump
//GameState 8 eliminated			//8 = worked at farm
		gameState = 0;

//Gone, last use replaced by newRound arg for combatMenu
		//Another state variable used for menu display used everywhere
		//menuLoc
		//0 - normal
		//1 - items menu - no heat statuses when leaving it in combat
		//2 - needs to add an hour after grabbing item
		//3 - In tease menu - no heat statuses when leaving it.
//MenuLoc 8 eliminated			//8 - Find Farm Pepper - 2 hours wait
//MenuLoc 9 eliminated			//9 - Armor shop
//MenuLoc 10 eliminated			//10- Tailor shop
//MenuLoc 11 eliminated			//11- Midsleep loot
//MenuLoc 12 eliminated			//12 - lumi potions
//MenuLoc 13 eliminated			//13 - lumi enhancements
//MenuLoc 14 eliminated			//14 - late night receive item
//MenuLoc 15 eliminated			//15 - Weapon shop in TelAdra
//MenuLoc 16 eliminated			//16 - Incubus Shop
//MenuLoc 17 eliminated			//17 - 4 hours wait
//MenuLoc 18 eliminated			//18 - 8 hours wait
//MenuLoc 19 eliminated			//19 - Bakery!
//MenuLoc 20 eliminated			//20 - weapon rack stuffing
//MenuLoc 21 eliminated			//21 - weapon rack taking
//MenuLoc 24 eliminated			//24 - Niamh booze
//MenuLoc 25 eliminated			//25 - Owca Shop
//MenuLoc 26 eliminated			//26 - Benoit Shop
//MenuLoc 27 eliminated			//27 - Chicken Harpy Shop
//MenuLoc 28 eliminated			//28 - Items menu
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

	public run():void
	{
		mainMenu();
		this.stop();

		_updateHack.name = "wtf";
		_updateHack.graphics.beginFill(0xFF0000, 1);
		_updateHack.graphics.drawRect(0, 0, 2, 2);
		_updateHack.graphics.endFill();

		stage.addChild(_updateHack);
		_updateHack.x = 999;
		_updateHack.y = 799;
	}

	public forceUpdate():void
	{
		_updateHack.x = 999;
		_updateHack.addEventListener(Event.ENTER_FRAME, moveHackUpdate);
	}

	public moveHackUpdate(e:Event):void
	{
		_updateHack.x -= 84;
			
		if (_updateHack.x < 0)
		{
			_updateHack.x = 0;
			_updateHack.removeEventListener(Event.ENTER_FRAME, moveHackUpdate);
		}
	}
}

