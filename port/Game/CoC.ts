import { CharCreation } from './CharCreation';
import { CoC_Settings } from './CoC_Settings';
import { DefaultDict } from './DefaultDict';
import { Flags } from './Flags';
import { ImageManager } from './ImageManager';
import { InputManager } from './InputManager';
import { Utils } from './internals/Utils';
import { UseableLib } from './Items/UseableLib';
import { Monster } from './Monster';
import { PerkLib } from './PerkLib';
import { Player } from './Player';
import { PlayerEvents } from './PlayerEvents';
import { SaveAwareInterface } from './SaveAwareInterface';
import { Saves } from './Saves';
import { StatusAffects } from './StatusAffects';
import { TimeAwareInterface } from './TimeAwareInterface';
import { mainMenu } from '../../includes/startUp';
import { GameModel } from '../coc/model/GameModel';
import { TimeModel } from '../coc/model/TimeModel';

export class CoC {

    //Any classes that need to be made aware when the game is saved or loaded can add themselves to this array using saveAwareAdd.
    //	Once in the array they will be notified by Saves.as whenever the game needs them to write or read their data to the flags array.
    private static _saveAwareClassList: Array<SaveAwareInterface> = new Array<SaveAwareInterface>();

    //Called by the saveGameObject function in Saves
    public static saveAllAwareClasses(game: CoC): void { for (var sac: number = 0; sac < CoC._saveAwareClassList.length; sac++) CoC._saveAwareClassList[sac].updateBeforeSave(game); }

    //Called by the loadGameObject function in Saves
    public static loadAllAwareClasses(game: CoC): void { for (var sac: number = 0; sac < CoC._saveAwareClassList.length; sac++) CoC._saveAwareClassList[sac].updateAfterLoad(game); }

    public static saveAwareClassAdd(newEntry: SaveAwareInterface): void { CoC._saveAwareClassList.push(newEntry); }

    //Any classes that need to be aware of the passage of time can add themselves to this array using timeAwareAdd.
    //	Once in the array they will be notified as each hour passes, allowing them to update actions, lactation, pregnancy, etc.
    private static _timeAwareClassList: Array<TimeAwareInterface> = new Array<TimeAwareInterface>(); //Accessed by goNext function in eventParser
    private static timeAwareLargeLastEntry: number = -1; //Used by the eventParser in calling timeAwareLarge
    private playerEvent: PlayerEvents;

    public static timeAwareClassAdd(newEntry: TimeAwareInterface): void { _timeAwareClassList.push(newEntry); }

    private static doCamp: Function; //Set by campInitialize, should only be called by playerMenu
    private static campInitialize(passDoCamp: Function): void { doCamp = passDoCamp; }

    // /
    private _perkLib: PerkLib = new PerkLib();// to init the static
    private _statusAffects: StatusAffects = new StatusAffects();// to init the static
    public charCreation: CharCreation = new CharCreation();
    public saves: Saves = new Saves(this.gameStateDirectGet, this.gameStateDirectSet);
    // Items/
    public mutations: Mutations = new Mutations();
    public consumables: ConsumableLib = new ConsumableLib();
    public useables: UseableLib;
    public weapons: WeaponLib = new WeaponLib();
    public armors: ArmorLib = new ArmorLib();
    public miscItems: MiscItemLib = new MiscItemLib();
    // Scenes/

    public model: GameModel;

    public parser: Parser;

    // ALL THE VARIABLES:
    // Declare the various global variables as class variables.
    // Note that they're set up in the constructor, not here.
    public debug: boolean;
    public ver: string;
    public version: string;
    public mobile: boolean;
    public images: ImageManager;
    public player: Player;
    public player2: Player;
    public monster: Monster;
    public flags: DefaultDict;
    public gameState: number;
    public time: TimeModel;

    public explored: boolean;
    public foundForest: boolean;
    public foundDesert: boolean;
    public foundMountain: boolean;
    public foundLake: boolean;
    public whitney: number;
    public monk: number;
    public sand: number;
    public giacomo: number;
    public temp: number;
    public args: Array<any>;
    public funcs: Array<any>;
    public oldStats: any; // I *think* this is a generic object
    public inputManager: InputManager;

    public get inCombat(): boolean { return this.gameState == 1; }

    public set inCombat(value: boolean): void { this.gameState = (value ? 1 : 0); }

    private gameStateDirectGet(): number { return this.gameState; }

    private gameStateDirectSet(value: number): void { this.gameState = value; }

    public rand(max: number): number {
        return Utils.rand(max);
    }

    // holidayz
    public isEaster(): boolean {
        return this.plains.bunnyGirl.isItEaster();
    }

    public constructor() {
        // Cheatmode.
        setkGAMECLASS(this);

        this.useables = new UseableLib();

        this.kFLAGS_REF = kFLAGS;

        this.parser = new Parser(this, CoC_Settings);

        this.model = new GameModel();

        /**
         * System Variables
         * Debug, Version, etc
         */
        //DEBUG, used all over the place
        this.debug = false;

        //Version NUMBER
        this.ver = "0.9.4";
        this.version = this.ver + " (<b>Moar Bugfixan</b>)";

        this.images = new ImageManager(stage);
        this.inputManager = new InputManager(stage, false);

        /**
         * Player specific variables
         * The player object and variables associated with the player
         */
        //The Player object, used everywhere
        this.player = new Player();
        model.player = this.player;
        this.player2 = new Player();
        this.playerEvent = new PlayerEvents();

        //Create monster, used all over the place
        this.monster = new Monster();

        /**
         * State Variables
         * They hold all the information about item states, menu states, game states, etc
         */
        //The extreme flag state array. This needs to go. Holds information about everything, whether it be certain attacks for NPCs 
        //or state information to do with the game. 
        this.flags = new DefaultDict();
        model.flags = this.flags;


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
        this.gameState = 0;

        //Holds the date and time display in the bottom left
        this.time = new TimeModel();
        model.time = this.time;

        /**
         * Plot Variables
         * Booleans and numbers about whether you've found certain places
         */
        this.explored = false;
        this.foundForest = false;
        this.foundDesert = false;
        this.foundMountain = false;
        this.foundLake = false;
        this.whitney = 0;
        this.monk = 0;
        this.sand = 0;
        this.giacomo = 0;

        //Used to set what each action buttons displays and does.
        this.args = [];
        this.funcs = [];

        //Used for stat tracking to keep up/down arrows correct.
        this.oldStats = {};
        model.oldStats = this.oldStats;
        this.oldStats.oldStr = 0;
        this.oldStats.oldTou = 0;
        this.oldStats.oldSpe = 0;
        this.oldStats.oldInte = 0;
        this.oldStats.oldSens = 0;
        this.oldStats.oldLib = 0;
        this.oldStats.oldCor = 0;
        this.oldStats.oldHP = 0;
        this.oldStats.oldLust = 0;

        model.maxHP = maxHP;

        //Hide sprites
        mainView.hideSprite();
        //Hide up/down arrows
        mainView.statsView.hideUpDown();

        this.addFrameScript(0, this.run);
    }

    public run(): void {
        mainMenu();
        this.stop();

        this._updateHack.name = "wtf";
        this._updateHack.graphics.beginFill(0xFF0000, 1);
        this._updateHack.graphics.drawRect(0, 0, 2, 2);
        this._updateHack.graphics.endFill();

        stage.addChild(this._updateHack);
        this._updateHack.x = 999;
        this._updateHack.y = 799;
    }

    public forceUpdate(): void {
        this._updateHack.x = 999;
        this._updateHack.addEventListener(Event.ENTER_FRAME, this.moveHackUpdate);
    }

    public moveHackUpdate(e: Event): void {
        this._updateHack.x -= 84;

        if (this._updateHack.x < 0) {
            this._updateHack.x = 0;
            this._updateHack.removeEventListener(Event.ENTER_FRAME, this.moveHackUpdate);
        }
    }
}
