import { CoC } from './CoC';
import { kGAMECLASS } from './GlobalFlags/kGAMECLASS';
import { Utils } from './internals/Utils';
import { Monster } from './Monster';

/**
 * Quick hacky method to wrap new content in a class-based structure
 * BaseContent acts as an access wrapper around CoC, enabling children of BaseContent to interact with
 *  instances/properties of CoC in the same manner older content does with the minimal amount
 * of modification.
 * Also this means we might start being able to get IDE autocomplete shit working again! Huzzah!
 * @author Gedan
 */
export class BaseContent {
    protected getGame(): CoC {
        return kGAMECLASS;
    }

    protected cheatTime(time: number): void {
        kGAMECLASS.cheatTime(time);
    }
    protected get timeQ(): number {
        return kGAMECLASS.timeQ;
    }

    protected get camp(): Camp {
        return kGAMECLASS.camp;
    }

    protected get d3(): D3 {
        return kGAMECLASS.d3;
    }

    public goNext(time: number, defNext: boolean): boolean {
        return kGAMECLASS.goNext(time, defNext);
    }

    protected isHalloween(): boolean {
        return kGAMECLASS.isHalloween();
    }

    protected isValentine(): boolean {
        return kGAMECLASS.isValentine();
    }

    protected isHolidays(): boolean {
        return kGAMECLASS.isHolidays();
    }

    public isEaster(): boolean {
        return kGAMECLASS.isEaster();
    }

    protected isThanksgiving(): boolean {
        return kGAMECLASS.isThanksgiving();
    }

    protected get date(): Date {
        return kGAMECLASS.date;
    }

    protected get inDungeon(): boolean {
        return kGAMECLASS.inDungeon;
    }

    protected get inRoomedDungeon(): boolean {
        return kGAMECLASS.inRoomedDungeon;
    }
    protected set inRoomedDungeon(v: boolean): void {
        kGAMECLASS.inRoomedDungeon = v;
    }

    protected get inRoomedDungeonResume(): Function {
        return kGAMECLASS.inRoomedDungeonResume;
    }
    protected set inRoomedDungeonResume(v: Function): void {
        kGAMECLASS.inRoomedDungeonResume = v;
    }

    protected showStats(): void {
        kGAMECLASS.showStats();
    }

    protected statScreenRefresh(): void {
        kGAMECLASS.statScreenRefresh();
    }

    protected cleanupAfterCombat(nextFunc: Function = null): void {
        kGAMECLASS.cleanupAfterCombat(nextFunc);
    }

    protected combatRoundOver(): void {
        kGAMECLASS.combatRoundOver();
    }

    protected enemyAI(): void {
        kGAMECLASS.enemyAI();
    }

    protected spriteSelect(choice: number = 0): void {
        kGAMECLASS.spriteSelect(choice);
    }

    protected hideStats(): void {
        kGAMECLASS.hideStats();
    }
    protected hideUpDown(): void {
        kGAMECLASS.hideUpDown();
    }

    protected createCallBackFunction(func: Function, arg: *): Function {
        return kGAMECLASS.createCallBackFunction(func, arg);
    }

    protected createCallBackFunction2(func: Function, ...args): Function {
        return kGAMECLASS.createCallBackFunction2.apply(null, [func].concat(args));
    }

    protected startCombat(monster_: Monster, plotFight_: boolean = false): void {
        kGAMECLASS.startCombat(monster_, plotFight_);
    }
    protected startCombatImmediate(monster: Monster, _plotFight: boolean = false): void {
        kGAMECLASS.startCombatImmediate(monster, _plotFight);
    }

    // Needed in a few rare cases for dumping text coming from a source that can't properly escape it's brackets
    // (Mostly traceback printing, etc...)
    protected rawOutputText(output: String, purgeText: boolean = false): void {
        kGAMECLASS.rawOutputText(output, purgeText);
    }

    protected outputText(output: String, purgeText: boolean = false, parseAsMarkdown: boolean = false): void {
        kGAMECLASS.outputText(output, purgeText, parseAsMarkdown);
    }

    protected clearOutput(): void {
        kGAMECLASS.currentText = "";
        kGAMECLASS.mainView.clearOutputText();
    }

    protected doNext(eventNo: Function): void //Now typesafe
    {
        kGAMECLASS.doNext(eventNo);
    }

    protected menu(): void {
        kGAMECLASS.menu();
    }

    protected hideMenus(): void {
        kGAMECLASS.hideMenus();
    }
    protected choices(text1: String, butt1: Function,
        text2: String, butt2: Function,
        text3: String, butt3: Function,
        text4: String, butt4: Function,
        text5: String, butt5: Function,
        text6: String, butt6: Function,
        text7: String, butt7: Function,
        text8: String, butt8: Function,
        text9: String, butt9: Function,
        text0: String, butt0: Function): void { //Now typesafe
        kGAMECLASS.choices(
            text1, butt1,
            text2, butt2,
            text3, butt3,
            text4, butt4,
            text5, butt5,
            text6, butt6,
            text7, butt7,
            text8, butt8,
            text9, butt9,
            text0, butt0
        );
    }

    protected simpleChoices(text1: String, butt1: Function,
        text2: String, butt2: Function,
        text3: String, butt3: Function,
        text4: String, butt4: Function,
        text5: String, butt5: Function): void { //Now typesafe
        kGAMECLASS.simpleChoices(text1, butt1,
            text2, butt2,
            text3, butt3,
            text4, butt4,
            text5, butt5);
    }

    protected doYesNo(eventYes: Function, eventNo: Function): void { //Now typesafe
        kGAMECLASS.doYesNo(eventYes, eventNo);
    }

    protected addButton(pos: int, text: String = "", func1: Function = null, arg1: * = -9000): void {
        kGAMECLASS.addButton(pos, text, func1, arg1);
    }

    protected hasButton(arg: *): boolean {
        return kGAMECLASS.hasButton(arg);
    }

    protected sackDescript(): String {
        return Appearance.sackDescript(player);
    }

    protected cockClit(value: int = 0): String {
        return kGAMECLASS.cockClit(value);
    }

    protected sheathDesc(): String {
        return kGAMECLASS.player.sheathDescription();
    }

    protected chestDesc(): String {
        return player.chestDesc();
        //return Appearance.chestDesc(player);
    }

    protected allChestDesc(): String {
        return player.allChestDesc();
    }

    protected allBreastsDescript(): String {
        return kGAMECLASS.allBreastsDescript();
    }

    protected sMultiCockDesc(): String {
        return kGAMECLASS.player.sMultiCockDesc();
    }

    protected SMultiCockDesc(): String {
        return kGAMECLASS.player.SMultiCockDesc();
    }

    protected oMultiCockDesc(): String {
        return kGAMECLASS.player.oMultiCockDesc();
    }

    protected OMultiCockDesc(): String {
        return kGAMECLASS.player.OMultiCockDesc();
    }

    protected tongueDescript(): String {
        return kGAMECLASS.tongueDescript();
    }

    protected ballsDescriptLight(forcedSize: boolean = true): String {
        return kGAMECLASS.ballsDescriptLight(forcedSize);
    }

    protected ballDescript(): String {
        return kGAMECLASS.ballDescript();
    }

    protected ballsDescript(): String {
        return kGAMECLASS.ballsDescript();
    }

    protected simpleBallsDescript(): String {
        return kGAMECLASS.simpleBallsDescript();
    }

    protected assholeDescript(): String {
        return kGAMECLASS.assholeDescript();
    }

    protected eAssholeDescript(): String {
        return Appearance.assholeDescript(monster);
    }

    protected hipDescript(): String {
        return kGAMECLASS.hipDescript();
    }

    protected assDescript(): String {
        return kGAMECLASS.assDescript();
    }

    protected buttDescript(): String {
        return kGAMECLASS.buttDescript();
    }

    protected assholeOrPussy(): String {
        return Appearance.assholeOrPussy(player);
    }

    protected nippleDescript(rowNum: number): String {
        return kGAMECLASS.nippleDescript(rowNum);
    }

    protected cockDescript(cockNum: number = 0): String {
        return kGAMECLASS.player.cockDescript(cockNum);
    }

    protected multiCockDescript(): String {
        return kGAMECLASS.player.multiCockDescript();
    }

    protected multiCockDescriptLight(): String {
        return kGAMECLASS.player.multiCockDescriptLight();
    }

    protected breastDescript(rowNum: number): String {
        return player.breastDescript(rowNum);
    }

    protected breastSize(val: number): String {
        return Appearance.breastSize(val);
    }

    protected biggestBreastSizeDescript(): String {
        return Appearance.biggestBreastSizeDescript(player);
    }

    protected hairDescript(): String {
        return kGAMECLASS.hairDescript();
    }

    protected hairOrFur(): String {
        return kGAMECLASS.hairOrFur();
    }

    protected clitDescript(): String {
        return kGAMECLASS.clitDescript();
    }

    protected vaginaDescript(vaginaNum: number = 0): String {
        return kGAMECLASS.vaginaDescript(vaginaNum);
    }

    protected allVaginaDescript(): String {
        return kGAMECLASS.allVaginaDescript();
    }

    /**
     * Apply statmods to the player. dynStats wraps the regular stats call, but supports "named" arguments of the form:
     * 		"statname", value.
     * Exclusively supports either long or short stat names with a single call.
     * "str", "lib" "lus", "cor" etc
     * "strength, "libido", lust", "corruption"
     * Specify the stat you wish to modify and follow it with the value.
     * Separate each stat and value with a comma, and each stat/value pair, again, with a comma.
     * eg: dynStats("str", 10, "lust" -100); will add 10 to str and subtract 100 from lust
     * Also support operators could be appended with + - * /=
     * eg: dynStats("str+", 1, "tou-", 2, "spe*", 1.1, "int/", 2, "cor=", 0)
     *     will add 1 to str, subtract 2 from tou, increase spe by 10%, decrease int by 50%, and set cor to 0
     * 
     * @param	... args
     */
    protected dynStats(...args): void {
        // Bullshit to unroll the incoming array
        kGAMECLASS.dynStats.apply(null, args);
    }

    protected silly(): boolean {
        return kGAMECLASS.silly();
    }

    protected HPChange(changeNum: number, display: boolean): void {
        kGAMECLASS.HPChange(changeNum, display);
    }

    protected fatigue(mod: number, type: number = 0): void {
        kGAMECLASS.fatigue(mod, type);
    }

    protected playerMenu(): void { kGAMECLASS.playerMenu(); }

    protected get player(): Player {
        return kGAMECLASS.player;
    }

    protected set player(val: Player): void {
        kGAMECLASS.player = val;
    }

    protected get player2(): Player {
        return kGAMECLASS.player2;
    }

    protected set player2(val: Player): void {
        kGAMECLASS.player2 = val;
    }

    protected get debug(): boolean {
        return kGAMECLASS.debug;
    }

    protected set debug(val: boolean): void {
        kGAMECLASS.debug = val;
    }

    protected get ver(): String {
        return kGAMECLASS.ver;
    }

    protected set ver(val: String): void {
        kGAMECLASS.ver = val;
    }

    protected get images(): ImageManager {
        return kGAMECLASS.images;
    }

    protected set images(val: ImageManager): void {
        kGAMECLASS.images = val;
    }

    protected get monster(): Monster {
        return kGAMECLASS.monster;
    }

    protected set monster(val: Monster): void {
        kGAMECLASS.monster = val;
    }

    protected get consumables(): ConsumableLib {
        return kGAMECLASS.consumables;
    }
    protected get useables(): UseableLib {
        return kGAMECLASS.useables;
    }
    protected get weapons(): WeaponLib {
        return kGAMECLASS.weapons;
    }
    protected get armors(): ArmorLib {
        return kGAMECLASS.armors;
    }
    protected get inventory(): Inventory {
        return kGAMECLASS.inventory;
    }

    protected get time(): TimeModel {
        return kGAMECLASS.time;
    }

    protected set time(val: TimeModel): void {
        kGAMECLASS.time = val;
    }

    protected get temp(): int {
        return kGAMECLASS.temp;
    }

    protected set temp(val: int): void {
        kGAMECLASS.temp = val;
    }

    protected get args(): Array {
        return kGAMECLASS.args;
    }

    protected set args(val: Array): void {
        kGAMECLASS.args = val;
    }

    protected get funcs(): Array {
        return kGAMECLASS.funcs;
    }

    protected set funcs(val: Array): void {
        kGAMECLASS.funcs = val;
    }

    protected get mainView(): MainView {
        return kGAMECLASS.mainView;
    }

    protected set mainView(val: MainView): void {
        kGAMECLASS.mainView = val;
    }

    protected get model(): GameModel {
        return kGAMECLASS.model;
    }

    protected set model(val: GameModel): void {
        kGAMECLASS.model = val;
    }

    protected get flags(): DefaultDict {
        return kGAMECLASS.flags;
    }

    protected set flags(val: DefaultDict): void {
        kGAMECLASS.flags = val;
    }

    protected showStatDown(arg: String): void {
        kGAMECLASS.mainView.statsView.showStatDown(arg);
    }

    protected showStatUp(arg: String): void {
        kGAMECLASS.mainView.statsView.showStatUp(arg);
    }
}
