import flash.text.TextFormat;
// // import flash.events.MouseEvent;
// 
// //const DOUBLE_ATTACK_STYLE: number = 867;
// //const SPELLS_CAST: number = 868;
// 
// //Fenoxo loves his temps
// let temp: number = 0;
// 
// //Used to set what each action buttons displays and does.
// let args:Array = new Array();
// let funcs:Array = new Array();
// 
// //Used for stat tracking to keep up/down arrows correct.
// let oldStats = {};
// model.oldStats = oldStats;
// oldStats.oldStr  = 0;
// oldStats.oldTou  = 0;
// oldStats.oldSpe  = 0;
// oldStats.oldInte = 0;
// oldStats.oldSens = 0;
// oldStats.oldLib  = 0;
// oldStats.oldCor  = 0;
// oldStats.oldHP   = 0;
// oldStats.oldLust = 0;
// 
// model.maxHP = maxHP;

public function maxHP():number {
	return player.maxHP();
}

public function silly():boolean {
	return flags[FlagEnum.SILLY_MODE_ENABLE_FLAG] == 1;

}

/* Replaced by Utils.formatStringArray, which does almost the same thing in one function
public function clearList():void {
	list = [];
}
public let list:Array = [];
public function addToList(arg:*):void {
	list[list.length] = arg;
}
public function outputList():string {
	let stuff:string = "";
	for(let x: number = 0; x < list.length; x++) {
		stuff += list[x];
		if(list.length == 2 && x == 1) {
			stuff += " and ";
		}
		else if(x < list.length-2) {
			stuff += ", ";
		}
		else if(x < list.length-1) {
			stuff += ", and ";
		}
	}
	list = [];
	return stuff;        
}
*/

public function HPChange(changeNum:number, display:boolean):void
{
	if(changeNum == 0) return;
	if(changeNum > 0) {
		//Increase by 20%!
		if(player.perks.has("HistoryHealer")) changeNum *= 1.2;
		if(player.HP + int(changeNum) > maxHP()) {
			if(player.HP >= maxHP()) {
				if(display) outputText("You're as healthy as you can be.\n", false);
				return;
			}
			if(display) outputText("Your HP maxes out at " + maxHP() + ".\n", false);
			player.HP = maxHP();
		}
		else
		{
			if(display) outputText("You gain " + int(changeNum) + " HP.\n", false);
			player.HP += int(changeNum);
			mainView.statsView.showStatUp( 'hp' );
			// hpUp.visible = true;
		}
	}
	//Negative HP
	else
	{
		if(player.HP + changeNum <= 0) {
			if(display) outputText("You take " + int(changeNum*-1) + " damage, dropping your HP to 0.\n", false);
			player.HP = 0;
		}
		else {
			if(display) outputText("You take " + int(changeNum*-1) + " damage.\n", false);
			player.HP += changeNum;
		}
	}
	statScreenRefresh();
}
		
public function clone(source:Object):* {
	let copier:ByteArray = new ByteArray();
	copier.writeObject(source);
	copier.position = 0;
	return(copier.readObject());
}

/* Was only used in two places at the start of the game
public function speech(output:string, speaker:string):void {
	let speech:string = "";
	speech = speaker + " says, \"<i>" + output + "</i>\"\n";
	outputText(speech, false);
}
*/
	
public function clearOutput():void {
	forceUpdate();
	currentText = "";
	mainView.clearOutputText();
	if(gameState != 3) mainView.hideMenuButton( MainView.MENU_DATA );
	mainView.hideMenuButton( MainView.MENU_APPEARANCE );
	mainView.hideMenuButton( MainView.MENU_LEVEL );
	mainView.hideMenuButton( MainView.MENU_PERKS );
	mainView.hideMenuButton( MainView.MENU_STATS );
}

public function rawOutputText(output:string, purgeText:boolean = false):void
{
	
	//OUTPUT!
	if(purgeText) {
		//if(!debug) mainText.htmlText = output;
		//trace("Purging and writing Text", output);
		clearOutput();
		currentText = output;
		mainView.setOutputText( output );
		// mainText.htmlText = output;
	}
	else
	{
		//trace("Adding Text");
		currentText += output;
		mainView.appendOutputText( output );
		// mainText.htmlText += output;
	}
	// trace(getCurrentStackTrace())
	// scrollBar.update();

}

public function outputText(output:string, 
						purgeText:boolean = false, 
						parseAsMarkdown:boolean = false):void
{
	// we have to purge the output text BEFORE calling parseText, because if there are scene commands in 
	// the parsed text, parseText() will write directly to the output


	// This is cleaup in case someone hits the Data or new-game button when the event-test window is shown. 
	// It's needed since those buttons are available even when in the event-tester
	mainView.hideTestInputPanel();

	if (purgeText)
	{
		clearOutput();
	}

	output = this.parser.recursiveParser(output, parseAsMarkdown);

	//OUTPUT!
	if(purgeText) {
		//if(!debug) mainText.htmlText = output;
		currentText = output;
	}
	else {
		currentText += output;
		//if(!debug) mainText.htmlText = currentText;
	}
	if(debug) 
	{
		mainView.setOutputText( currentText );
	}

}

public function flushOutputTextToGUI():void
{
	let fmt:TextFormat;
	if (flags[FlagEnum.CUSTOM_FONT_SIZE] != 0)
	{
		fmt = mainView.mainText.getTextFormat();
		fmt.size = flags[FlagEnum.CUSTOM_FONT_SIZE];
	}
	
	mainView.setOutputText( currentText );
	
	if (flags[FlagEnum.CUSTOM_FONT_SIZE] != 0)
	{
		mainView.mainText.setTextFormat(fmt);
	}
}

public function displayPerks(e:MouseEvent = null):void {
	let temp: number = 0;
	outputText("", true);
	while(temp < player.perks.length) {
		outputText("<b>" + player.perk(temp).perkName + "</b> - " + player.perk(temp).perkDesc + "\n", false);
		temp++;
	}
	menu();
	if(player.perkPoints > 0) {
		outputText("\n<b>You have " + num2Text(player.perkPoints) + " perk point", false);
		if(player.perkPoints > 1) outputText("s", false);
		outputText(" to spend.</b>", false);
		addButton(1, "Perk Up", perkBuyMenu);
	}
	if(player.perks.has("DoubleAttack")) {
		outputText("\n<b>You can adjust your double attack settings.</b>");
		addButton(2,"Dbl Options",doubleAttackOptions);
	}
	addButton(0, "Next", playerMenu);
}

public function doubleAttackOptions():void {
	clearOutput();
	menu();
	if(flags[FlagEnum.DOUBLE_ATTACK_STYLE] == 0) {
		outputText("You will currently always double attack in combat.  If your strength exceeds sixty, your double-attacks will be done at sixty strength in order to double-attack.");
		outputText("\n\nYou can change it to double attack until sixty strength and then dynamicly switch to single attacks.");
		outputText("\nYou can change it to always single attack.");
		addButton(1,"Dynamic",doubleAttackDynamic);
		addButton(2,"Single",doubleAttackOff);
	}
	else if(flags[FlagEnum.DOUBLE_ATTACK_STYLE] == 1) {
		outputText("You will currently double attack until your strength exceeds sixty, and then single attack.");
		outputText("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
		outputText("\nYou can change it to always single attack.");
		addButton(0,"All Double",doubleAttackForce);
		addButton(2,"Single",doubleAttackOff);
	}
	else {
		outputText("You will always single attack your foes in combat.");
		outputText("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
		outputText("\nYou can change it to double attack until sixty strength and then switch to single attacks.");
		addButton(0,"All Double",doubleAttackForce);
		addButton(1,"Dynamic",doubleAttackDynamic);
	}
	let e:MouseEvent;
	addButton(4, "Back", displayPerks);
}

public function doubleAttackForce():void {
	flags[FlagEnum.DOUBLE_ATTACK_STYLE] = 0;
	doubleAttackOptions();
}
public function doubleAttackDynamic():void {
	flags[FlagEnum.DOUBLE_ATTACK_STYLE] = 1;
	doubleAttackOptions();
}
public function doubleAttackOff():void {
	flags[FlagEnum.DOUBLE_ATTACK_STYLE] = 2;
	doubleAttackOptions();
}

public function levelUpGo(e:MouseEvent = null):void {
	clearOutput();
	hideMenus();
	mainView.hideMenuButton( MainView.MENU_NEW_MAIN );
	//Level up
	if (player.XP >= (player.level) * 100) {
		player.level++;
		player.perkPoints++;
		outputText("<b>You are now level " + player.level + "!</b>\n\nYou may now apply +5 to one attribute.  Which will you choose?");
		player.XP -= (player.level - 1) * 100;
		menu();
		addButton(0, "Strength", levelUpStatStrength);
		addButton(1, "Toughness", levelUpStatToughness);
		addButton(2, "Speed", levelUpStatSpeed);
		addButton(3, "Intelligence", levelUpStatIntelligence);
	}
	//Spend perk points
	else if (player.perkPoints > 0) {
		perkBuyMenu();
	}
	else {
		outputText("<b>ERROR.  LEVEL UP PUSHED WHEN PC CANNOT LEVEL OR GAIN PERKS.  PLEASE REPORT THE STEPS TO REPRODUCE THIS BUG TO FENOXO@GMAIL.COM OR THE FENOXO.COM BUG REPORT FORUM.</b>");
		doNext(playerMenu);
	}
}

private function levelUpStatStrength():void {
	dynStats("str", 5); //Gain +5 Str due to level
	clearOutput();
	outputText("Your muscles feel significantly stronger from your time adventuring.");
	doNext(perkBuyMenu);
}

private function levelUpStatToughness():void {
	dynStats("tou", 5); //Gain +5 Toughness due to level
	trace("HP: " + player.HP + " MAX HP: " + maxHP());
	statScreenRefresh();
	clearOutput();
	outputText("You feel tougher from all the fights you have endured.");
	doNext(perkBuyMenu);
}

private function levelUpStatSpeed():void {
	dynStats("spe", 5); //Gain +5 speed due to level
	clearOutput();
	outputText("Your time in combat has driven you to move faster.");
	doNext(perkBuyMenu);
}

private function levelUpStatIntelligence():void {
	dynStats("int", 5); //Gain +5 Intelligence due to level
	clearOutput();
	outputText("Your time spent fighting the creatures of this realm has sharpened your wit.");
	doNext(perkBuyMenu);
}

private function perkBuyMenu():void {
	clearOutput();
	let perkList:Array = buildPerkList();
	
	if (perkList.length == 0) {
		outputText("<b>You do not qualify for any perks at present.  </b>In case you qualify for any in the future, you will keep your " + num2Text(player.perkPoints) + " perk point");
		if(player.perkPoints > 1) outputText("s");
		outputText(".");
		doNext(playerMenu);
		return;
	}
	if (testingBlockExiting) {
		menu();
		addButton(0, "Next", perkSelect, perkList[rand(perkList.length)].perk);
	}
	else {
		outputText("Please select a perk from the drop-down list, then click 'Okay'.  You can press 'Skip' to save your perk point for later.\n\n");
		mainView.aCb.x = 210;
		mainView.aCb.y = 112;
		
		if (mainView.aCb.parent == null) {
			mainView.addChild(mainView.aCb);
			mainView.aCb.visible = true;
		}
		
		mainView.hideMenuButton( MainView.MENU_NEW_MAIN );
		menu();
		addButton(1, "Skip", perkSkip);
	}
}

private function perkSelect(selected:PerkClass):void {
	stage.focus = null;
	if (mainView.aCb.parent != null) {
		mainView.removeChild(mainView.aCb);
		applyPerk(selected);
	}
}

private function perkSkip():void {
	stage.focus = null;
	if (mainView.aCb.parent != null) {
		mainView.removeChild(mainView.aCb);
		playerMenu();
	}
}

private function changeHandler(event:Event):void {
 	//Store perk name for later addition
	clearOutput();
 	let selected:PerkClass = ComboBox(event.target).selectedItem.perk;
	mainView.aCb.move(210, 85);
	outputText("You have selected the following perk:\n\n");
	outputText("<b>" + selected.perkName + ":</b> " + selected.perkLongDesc + "\n\nIf you would like to select this perk, click <b>Okay</b>.  Otherwise, select a new perk, or press <b>Skip</b> to make a decision later.");
	menu();
	addButton(0, "Okay", perkSelect, selected);
	addButton(1, "Skip", perkSkip);
}

public function buildPerkList():Array {
	let perkList:Array = [];
	function _add(p:PerkClass):void{
		perkList.push({label: p.perkName,perk:p});
	}
	//STRENGTH PERKS
	if(player.str >= 25) {
		_add(new PerkClass(PerkLib.StrongBack));
	}
	if(player.perks.has("StrongBack") && player.str >= 50) {
		_add(new PerkClass(PerkLib.StrongBack2));
	}
	//Tier 1 Strength Perks
	if(player.level >= 6) {
		//Thunderous Strikes - +20% basic attack damage while str > 80.
		if(player.str >= 80) {
			_add(new PerkClass(PerkLib.ThunderousStrikes));
		}
		//Weapon Mastery - Doubles weapon damage bonus of 'large' type weapons. (Minotaur Axe, M. Hammer, etc)
		if(player.str > 60) {
			_add(new PerkClass(PerkLib.WeaponMastery));
		}
		if(player.str >= 75)
			_add(new PerkClass(PerkLib.BrutalBlows));
	}
	//Tier 2 Strength Perks
	if(player.level >= 12) {
		if(player.str >= 75)
			_add(new PerkClass(PerkLib.Berzerker));
	}
	//slot 2 - toughness perk 1
	if(!player.perks.has("Tank") && player.tou >= 25) {
		_add(new PerkClass(PerkLib.Tank));
	}
	//slot 2 - regeneration perk
	if(player.perks.has("Tank") && player.tou >= 50) {
		_add(new PerkClass(PerkLib.Regeneration));
	}
	//Tier 1 Toughness Perks
		if(player.level >= 6) {
		if(player.perks.has("Tank") && player.tou >= 60) {
			_add(new PerkClass(PerkLib.Tank2));
		}
		if(player.perks.has("Regeneration") && player.tou >= 70) {
			_add(new PerkClass(PerkLib.Regeneration2));
		}
		if(player.tou >= 75) {
			_add(new PerkClass(PerkLib.ImmovableObject));
		}
	}
	//Tier 2 Toughness Perks
	if(player.level >= 12) {
		if(player.tou >= 75) {
			_add(new PerkClass(PerkLib.Resolute));
		}
		if(player.tou >= 60) {
			_add(new PerkClass(PerkLib.IronMan));
		}
	}
	//slot 3 - speed perk
	if(player.stats.spe >= 25) {
			_add(new PerkClass(PerkLib.Evade));
	}
	//slot 3 - run perk
	if(player.stats.spe >= 25) {
			_add(new PerkClass(PerkLib.Runner));
	}
	//slot 3 - Double Attack perk
	if(player.perks.has("Evade") && player.perks.has("Runner") && player.stats.spe >= 50) {
			_add(new PerkClass(PerkLib.DoubleAttack));
	}
	//Tier 1 Speed Perks
	if(player.level >= 6) {
		//Speedy Recovery - Regain Fatigue 50% faster speed.
		if(player.perks.has("Evade") && player.stats.spe >= 60) {
			_add(new PerkClass(PerkLib.SpeedyRecovery));
		}
		//Agility - A small portion of your speed is applied to your defense rating when wearing light armors.
		if(player.stats.spe > 75 && player.perks.has("Runner") && (player.armorPerk == "Light" || player.armorPerk == "Medium")) {
			_add(new PerkClass(PerkLib.Agility));
		}
		if(player.stats.spe >= 60) {
			_add(new PerkClass(PerkLib.LightningStrikes));
		}
	}
	//Tier 2 Speed Perks
	if(player.level >= 12) {
		if(player.stats.spe >= 75) {
			_add(new PerkClass(PerkLib.LungingAttacks));
		}
	}
	//Slot 4 - precision - -10 enemy toughness for damage calc
	if(player.stats.int >= 25) {
			_add(new PerkClass(PerkLib.Precision));
	}
	//Spellpower - boosts spell power
	if(player.stats.int >= 50) {
			_add(new PerkClass(PerkLib.Spellpower));
	}
	if(player.perks.has("Spellpower") && player.stats.int >= 50) {
			_add(new PerkClass(PerkLib.Mage));
	}
	//Tier 1 Intelligence Perks
	if(player.level >= 6) {
		if(player.stats.int >= 50)
			_add(new PerkClass(PerkLib.Tactician));
		if(spellCount() > 0 && player.perks.has("Spellpower") && player.perks.has("Mage") && player.stats.int >= 60) {
			_add(new PerkClass(PerkLib.Channeling));
		}
		if(player.stats.int >= 60) {
			_add(new PerkClass(PerkLib.Medicine));
		}
	}
	//Tier 2 Intelligence perks
	if(player.level >= 12) {
		if(player.perks.has("Mage") && player.stats.int >= 75) {
			_add(new PerkClass(PerkLib.Archmage));
		}
	}
	//LIBIDO PERKZ
	//slot 5 - libido perks
	//Slot 5 - Fertile+ increases cum production and fertility (+15%)
	if(player.stats.lib >= 25) {
			_add(new PerkClass(PerkLib.FertilityPlus,15,1.75,0,0));
	}
	//Slot 5 - minimum libido
	if(player.stats.lib >= 50) {
			_add(new PerkClass(PerkLib.HotBlooded,20,0,0,0));
	}
	//Tier 1 Libido Perks
	if(player.level >= 6) {
		//Slot 5 - minimum libido
		if(player.stats.lib >= 60) {
			_add(new PerkClass(PerkLib.WellAdjusted));
		}
		//Slot 5 - minimum libido
		if(player.stats.lib >= 60 && player.stats.cor >= 50) {
			_add(new PerkClass(PerkLib.Masochist));
		}
	}
	//Corruption Perks - slot 7
	//Slot 7 - Corrupted Libido - lust raises 10% slower.
	if(player.stats.cor >= 25) {
			_add(new PerkClass(PerkLib.CorruptedLibido,20,0,0,0));
	}
	//Slot 7 - Seduction (Must have seduced Jojo
	if(!player.perks.has("Seduction") && player.stats.cor >= 50 && monk >= 5) {
			_add(new PerkClass(PerkLib.Seduction));
	}
	//Slot 7 - Nymphomania
	else if(player.perks.has("CorruptedLibido") && player.stats.cor >= 75) {
			_add(new PerkClass(PerkLib.Nymphomania));
	}
	//Slot 7 - UNFINISHED :3
	if(minLust() >= 20 && player.perks.has("CorruptedLibido") && player.stats.cor >= 50) {
			_add(new PerkClass(PerkLib.Acclimation));
	}
	//Tier 1 Corruption Perks - acclimation over-rides
	if(player.level >= 6)
	{
		if(player.stats.cor >= 60 && player.perks.has("CorruptedLibido")) {
			_add(new PerkClass(PerkLib.Sadist));
		}
		if(player.perks.has("CorruptedLibido") && player.stats.cor >= 70) {
			_add(new PerkClass(PerkLib.ArousingAura));
		}
	}
	//Tier 1 Misc Perks
	if(player.level >= 6) {
		_add(new PerkClass(PerkLib.Resistance));
	}
	// FILTER PERKS
	perkList = perkList.filter(
			function(perk:*,idx: number,array:Array):boolean{
				return player.findPerk(perk.perk.ptype) < 0;
			});
	mainView.aCb.dataProvider = new DataProvider(perkList);
	return perkList;
}

public function applyPerk(perk:PerkClass):void {
	clearOutput();
	player.perkPoints--;
	//Apply perk here.
	outputText("<b>" + perk.perkName + "</b> gained!");
	player.createPerk(perk.ptype, perk.value1, perk.value2, perk.value3, perk.value4);
	if (perk.ptype == PerkLib.StrongBack2) player.itemSlot5.unlocked = true;
	if (perk.ptype == PerkLib.StrongBack) player.itemSlot4.unlocked = true;
	if (perk.ptype == PerkLib.Tank2) {
		HPChange(player.tou, false);
		statScreenRefresh();
	}
	doNext(playerMenu);
}

public function buttonText(buttonName:string):string {
	let matches :*,
		buttonIndex : number;

	if( buttonName is String ) {
		if( /^buttons\[[0-9]\]/.test( buttonName ) ) {
			matches = /^buttons\[([0-9])\]/.exec( buttonName );
			buttonIndex = parseInt( matches[ 1 ], 10 );
		}
		else if( /^b[0-9]Text$/.test( buttonName ) ) {
			matches = /^b([0-9])Text$/.exec( buttonName );
			buttonIndex = parseInt( matches[ 1 ], 10 );

			buttonIndex = buttonIndex === 0 ? 9 : buttonIndex - 1;
		}
	}

	return (mainView.getButtonText( buttonIndex ) || "NULL");
}


// Returns a string or undefined.
public function getButtonToolTipText( buttonText :string ) :string
{
	let toolTipText :string;

	buttonText = buttonText || '';

	//Items
	//if (/^....... x\d+$/.test(buttonText)){
	//	buttonText = buttonText.substring(0,7);
	//}
	
	// Fuck your regex
	if (buttonText.indexOf(" x") != -1)
	{
		buttonText = buttonText.split(" x")[0];
	}
	
	let itype:ItemType = ItemType.lookupItem(buttonText);
	if (itype != null) toolTipText = itype.description;
	itype = ItemType.lookupItemByShort(buttonText);
	if (itype != null) toolTipText = itype.description;
	if(buttonText.indexOf("Tail Whip") != -1) {
		toolTipText = "Whip your foe with your tail to enrage them and lower their defense!";
	}
	if(buttonText.indexOf("Dual Belt") != -1) {
		toolTipText = "This is a strange masturbation device, meant to work every available avenue of stimulation.";
	}
	if(buttonText.indexOf("C. Pole") != -1) {
		toolTipText = "This 'centaur pole' as it's called appears to be a sex-toy designed for females of the equine persuasion.  Oddly, it's been sculpted to look like a giant imp, with an even bigger horse-cock.";
	}
	if(buttonText.indexOf("Fake Mare") != -1) {
		toolTipText = "This fake mare is made of metal and wood, but the anatomically correct vagina looks as soft and wet as any female centaur's.";
	}
	//Combat
	//COMBAT
	//combat
	//wombat
	if (buttonText == "Attack") {
		if (!inCombat) toolTipText = "";
		else toolTipText = "Attempt to attack the enemy with your " + player.weaponName + ".  Damage done is determined by your strength and weapon.";
	}
	if(buttonText == "Kiss") {                        
		toolTipText = "Attempt to kiss your foe on the lips with drugged lipstick.  It has no effect on those without a penis.";
	}
	if(buttonText == "Tease") {
		if (!inCombat) toolTipText = "";
		else toolTipText = "Attempt to make an enemy more aroused by striking a seductive pose and exposing parts of your body.";
	}
	if(buttonText == "Kick") {                        
		toolTipText = "Attempt to kick an enemy using your powerful lower body.";
	}
	if(buttonText == "Combo") {                        
		toolTipText = "Make a three-hit combo.  Each attack has an extra 33% chance to miss, unless the target is blind. (25 Fatigue)";
	}
	if(buttonText == "Vault") {                        
		toolTipText = "Make a vaulting attack for an extra 25% damage.  Automatically crits stunned foes.  (20 Fatigue)";
	}
	if(buttonText == "Sidewinder") {                        
		toolTipText = "An attack that hits for reduced damage but has a high chance of stunning. (10 Fatigue)";
	}
	if(buttonText == "Dirt Kick") {                        
		toolTipText = "Attempt to blind your foe with a spray of kicked dirt. (5 Fatigue)";
	}
	if(buttonText == "Metabolize") {                        
		toolTipText = "Convert 10% of your maximum HP into fatigue.";
	}
	if(buttonText == "SecondWind") {                        
		toolTipText = "Regain 50% of your HP, 50 fatigue, and reduce lust by 50 once per fight.";
	}
	if(buttonText.indexOf("AnemoneSting") != -1) {                        
		toolTipText = "Attempt to strike an opponent with the stinging tentacles growing from your scalp.  Reduces enemy speed and increases enemy lust.";
	}
	if(buttonText.indexOf("P. Specials") != -1) {                        
		toolTipText = "Physical special attack menu.";
	}
	if(buttonText.indexOf("M. Specials") != -1) {                        
		toolTipText = "Mental and supernatural special attack menu.";
	}
	if(buttonText == "Berzerk") {                        
		toolTipText = "Throw yourself into a rage!  Greatly increases the strength of your weapon and increases lust resistance, but your armor defense is reduced to zero!";
	}
	if(buttonText.indexOf("Possess") != -1) {                        
		toolTipText = "Attempt to temporarily possess a foe and force them to raise their own lusts.";
	}
	if(buttonText.indexOf("Constrict") != -1) {                        
		toolTipText = "Attempt to bind an enemy in your long snake-tail.";
	}
	if(buttonText.indexOf("Gore") != -1) {                        
		toolTipText = "Lower your head and charge your opponent, attempting to gore them on your horns.  This attack is stronger and easier to land with large horns.";
	}
	if(buttonText.indexOf("Fantasize") != -1) {                        
		toolTipText = "Fantasize about your opponent in a sexual way.  It's probably a pretty bad idea to do this unless you want to end up getting raped.";
	}
	if(buttonText.indexOf("Charge W.") != -1) {                        
		toolTipText = "The Charge Weapon spell will surround your weapon in electrical energy, causing it to do even more damage.  The effect lasts for the entire combat.  (Fatigue Cost: " + spellCost(15) + ")";
	}
	if(buttonText.indexOf("Blind") != -1) {                        
		toolTipText = "Blind is a fairly self-explanatory spell.  It will create a bright flash just in front of the victim's eyes, blinding them for a time.  However if they blink it will be wasted.  (Fatigue Cost: " + spellCost(20) + ")";
	}
	if(buttonText.indexOf("Whitefire") != -1) {                        
		toolTipText = "Whitefire is a potent fire based attack that will burn your foe with flickering white flames, ignoring their physical toughness and most armors.  (Fatigue Cost: " + spellCost(30) + ")";
	}
	if(buttonText.indexOf("Aroused") != -1) {
	}
	if(buttonText.indexOf("Arouse") != -1) {                        
		if (!inCombat) toolTipText = "";
		else toolTipText = "The arouse spell draws on your own inner lust in order to enflame the enemy's passions.  (Fatigue Cost: " + spellCost(15) + ")";
	}
	if(buttonText == "Heal") {                        
		toolTipText = "Heal will attempt to use black magic to close your wounds and restore your body, however like all black magic used on yourself, it has a chance of backfiring and greatly arousing you.  (Fatigue Cost: " + spellCost(20) + ")";
	}
	if(buttonText.indexOf("Might") != -1) {                        
		toolTipText = "The Might spell draws upon your lust and uses it to fuel a temporary increase in muscle size and power.  It does carry the risk of backfiring and raising lust, like all black magic used on oneself.  (Fatigue Cost: " + spellCost(25) + ")";
	}
	//Wait
	if(buttonText.indexOf("Wait") != -1 && inCombat) {                        
		toolTipText = "Take no action for this round.  Why would you do this?  This is a terrible idea.";
	}
	//Sting
	if(buttonText.length == 5 && buttonText.indexOf("Sting") != -1) {                        
		toolTipText = "Attempt to use your venomous bee stinger on an enemy.  Be aware it takes quite a while for your venom to build up, so depending on your abdomen's refractory period, you may have to wait quite a while between stings.  Venom: " + Math.floor(player.lowerBody.tailVenom) + "/100";
	}
	//Web
	if(buttonText.indexOf("Web") != -1) {                        
		toolTipText = "Attempt to use your abdomen to spray sticky webs at an enemy and greatly slow them down.  Be aware it takes a while for your webbing to build up.  Web Amount: " + Math.floor(player.lowerBody.tailVenom) + "/100";
	}
	if(buttonText.indexOf("Infest") != -1) {
		toolTipText = "The infest attack allows you to cum at will, launching a stream of semen and worms at your opponent in order to infest them.  Unless your foe is very aroused they are likely to simply avoid it.  Only works on males or herms.";
	}
	if(buttonText.indexOf("Spells") != -1) {                        
		toolTipText = "Opens your spells menu, where you can cast any spells you have learned.  Beware, casting spells increases your fatigue, and if you become exhausted you will be easier to defeat.";
	}
	if(buttonText.indexOf("Defend") != -1) {                        
		toolTipText = "Selecting defend will reduce the damage you take by 66 percent, but will not affect any lust incurred by your enemy's actions.";
	}
	if(buttonText == "Run") {                        
		toolTipText = "Choosing to run will let you try to escape from your enemy. However, it will be hard to escape enemies that are faster than you and if you fail, your enemy will get a free attack.";
	}
	if(buttonText.indexOf("Inventory") != -1) {                
		toolTipText = "The inventory allows you to use an item.  Be careful as this leaves you open to a counterattack when in combat.";
	}
	if(buttonText.indexOf("AutoSav") != -1) {                
		toolTipText = "When autosave is on the game will automatically save your character each night at midnight to the last slot it was saved in.";
		if(buttonText.indexOf("ON") != -1) toolTipText += " Autosave is currently enabled.  Your game will be saved at midnight.";
		if(buttonText.indexOf("OFF") != -1) toolTipText += " Autosave is currently off.  Your game will NOT be saved.";
	}
	if(buttonText.indexOf("Retrieve") != -1) {                
		toolTipText = "Retrieve allows you to take an item from one of the reserve stacks in your camp's additional storage.";
	}
	if(buttonText.indexOf("Storage") != -1) {                
		toolTipText = "Storage will allow you to dump a stack of items from your inventory into your storage chest.";
	}
	if(buttonText.indexOf("Sand Facial") != -1) {                
		toolTipText = "The goblins promise this facial will give you a rough, handsome look thanks to their special, timeless sands.";
	}
	if(buttonText.indexOf("Mud Facial") != -1) {                
		toolTipText = "This facial is supposed to enhance the softness of your face and enhance its femininity greatly.";
	}
	//Masturbation Toys
	if(buttonText == "Masturbate") {
		toolTipText = "Selecting this option will make you attempt to manually masturbate in order to relieve your lust buildup.";
	}
	if(buttonText == "Meditate") {
		toolTipText = "Selecting this option will make you attempt to meditate in order to reduce lust and corruption.";
	}
	if(buttonText.indexOf("AN Stim-Belt") != -1) {
		toolTipText = "This is an all-natural self-stimulation belt.  The methods used to create such a pleasure device are unknown.  It seems to be organic in nature.";
	}
	if(buttonText.indexOf("Stim-Belt") != -1) {
		toolTipText = "This is a self-stimulation belt.  Commonly referred to as stim-belts, these are clockwork devices designed to pleasure the female anatomy.";
	}
	if(buttonText.indexOf("AN Onahole") != -1) {
		toolTipText = "An all-natural onahole, this device looks more like a bulbous creature than a sex-toy.  Nevertheless, the slick orifice it presents looks very inviting.";
	}
	if(buttonText.indexOf("D Onahole") != -1) {
		toolTipText = "This is a deluxe onahole, made of exceptional materials and with the finest craftsmanship in order to bring its user to the height of pleasure.";
	}
	if(buttonText.indexOf("Onahole") != -1) {
		toolTipText = "This is what is called an 'onahole'.  This device is a simple textured sleeve designed to fit around the male anatomy in a pleasurable way.";
	}
	if(buttonText == "Jojo") {
		if(monk >= 5) toolTipText = "Call your corrupted pet into camp in order to relieve your desires in a variety of sexual positions?  He's ever so willing after your last encounter with him.";
		else toolTipText = "Go find Jojo around the edges of your camp and meditate with him or talk about watch duty.";
	}
	if(buttonText == "Marble") {
		toolTipText = "Go to Marble the cowgirl for talk and companionship.";
	}
	//Books
	if(buttonText.indexOf("Dangerous Plants") != -1) {
		toolTipText = "This is a book titled 'Dangerous Plants'.  As explained by the title, this tome is filled with information on all manner of dangerous plants from this realm.";
	}
	if(buttonText.indexOf("Traveler's Guide") != -1) {
		toolTipText = "This traveler's guide is more of a pamphlet than an actual book, but it still contains some useful information on avoiding local pitfalls.";
	}
	if(buttonText.indexOf("Yoga Guide") != -1) {
		toolTipText = "This leather-bound book is titled 'Yoga for Non-Humanoids.' It contains numerous illustrations of centaurs, nagas and various other oddly-shaped beings in a variety of poses.";
	}
	if(buttonText.indexOf("Hentai Comic") != -1) {
		toolTipText = "This oddly drawn comic book is filled with images of fornication, sex, and overly large eyeballs.";
	}
	//CAMP STUFF
	if(buttonText.indexOf("Followers") != -1) {
		toolTipText = "Check up on any followers or companions who are joining you in or around your camp.  You'll probably just end up sleeping with them.";
	}
	//Marble
	if(buttonText.indexOf("Marble (Sex)") != -1) {
		toolTipText = "Get with Marble for a quick cuddle and some sex.";
	}
	//Rathazul
	if(buttonText.indexOf("Rathazul") != -1) {
		toolTipText = "Visit with Rathazul to see what alchemical supplies and services he has available at the moment.";
	}
	//Title screen
	if(buttonText.indexOf("Toggle Debug") != -1) {                        
		toolTipText = "Turn on debug mode.  Debug mode is intended for testing purposes but can be thought of as a cheat mode.  Items are infinite and combat is easy to escape from.  Weirdness and bugs are to be expected.";
	}
	if(buttonText.indexOf("Credits") != -1) {                        
		toolTipText = "See a list of all the cool people who have contributed to content for this game!";
	}
	if(buttonText.indexOf("Instructions") != -1) {                        
		toolTipText = "How to play.  Starting tips.  And hotkeys for easy left-handed play...";
	}
	if(buttonText.indexOf("Settings") != -1) {                        
		toolTipText = "Configure game settings and enable cheats.";
	}
	if(buttonText.indexOf("ASPLODE") != -1) {                        
		toolTipText = "MAKE SHIT ASPLODE";
	}
	return toolTipText;
}


// Hah, finally a place where a dictionary is actually required!
import flash.utils.Dictionary;
private let funcLookups:Dictionary = null;


private function buildFuncLookupDict(object:*=null,prefix:string=""):void
{
	import flash.utils.*;
	trace("Building function <-> function name mapping table for "+((object==null)?"CoC.":prefix));
	// get all methods contained
	if (object == null) object = this;
	let typeDesc:XML = describeType(object);
	//trace("TypeDesc - ", typeDesc)

	for each (let node:XML in typeDesc..method) 
	{
		// return the method name if the thisObject of f (t) 
		// has a property by that name 
		// that is not null (null = doesn't exist) and 
		// is strictly equal to the function we search the name of
		//trace("this[node.@name] = ", this[node.@name], " node.@name = ", node.@name)
		if (object[node.@name] != null)
			this.funcLookups[object[node.@name]] = prefix+node.@name;
	}
	for each (node in typeDesc..variable)
	{
		if (node.@type.toString().indexOf("classes.Scenes.") == 0 ||
				node.metadata.@name.contains("Scene")){
			if (object[node.@name]!=null){
				buildFuncLookupDict(object[node.@name],node.@name+".");
			}
		}
	}
}

public function getFunctionName(f:Function):string
{
	// trace("Getting function name")
	// get the object that contains the function (this of f)
	//let t:Object = flash.sampler.getSavedThis(f); 
	if (this.funcLookups == null)
	{
		trace("Rebuilding lookup object");
		this.funcLookups = new Dictionary();
		this.buildFuncLookupDict();
	}


	if (f in this.funcLookups)
		return(this.funcLookups[f]);
	
	// if we arrive here, we haven't found anything... 
	// maybe the function is declared in the private namespace?
	return null;
}


private function logFunctionInfo(func:Function, arg:* = null):void
{
	let logStr:string = "";
	if (arg is Function)
	{
		logStr += "Calling = " + getFunctionName(func) + " Param = " +  getFunctionName(arg);
	}
	else
	{
		logStr += "Calling = " + getFunctionName(func) + " Param = " +  arg;
	}
	CoC_Settings.appendButtonEvent(logStr);
	trace(logStr)
}


// returns a function that takes no arguments, and executes function `func` with argument `arg`
public function createCallBackFunction(func:Function, arg:*):Function
{
	if (func == null) {
		CoC_Settings.error("createCallBackFunction(null," + arg + ")");
	}
	if( arg == -9000 || arg == null )
	{
/*		if (func == eventParser){
			CoC_Settings.error("createCallBackFunction(eventParser,"+arg+")");
		} */
		return function ():*
		{ 
			if (CoC_Settings.haltOnErrors) 
				logFunctionInfo(func, arg);
			return func(); 
		};
	}
	else
	{
		return function ():*
		{ 
			if (CoC_Settings.haltOnErrors) 
				logFunctionInfo(func, arg);
			return func( arg ); 
		};
	}
}
public function createCallBackFunction2(func:Function,...args):Function
{
	if (func == null){
		CoC_Settings.error("createCallBackFunction(null,"+args+")");
	}
	return function():*
	{
		if (CoC_Settings.haltOnErrors) logFunctionInfo(func,args);
		return func.apply(null,args);
	}
}


public function addButton(pos: number, text:string = "", func1:Function = null, arg1:* = -9000):void {
	if (func1 == null) return;
	let callback: Function;
	let toolTipText: String;
/* Let the mainView decide if index is valid
	if(pos > 9) {
		trace("INVALID BUTTON");
		return;
	}
*/
	callback = createCallBackFunction(func1, arg1);
	

	toolTipText = getButtonToolTipText( text );
	mainView.showBottomButton( pos, text, callback, toolTipText );
	//mainView.setOutputText( currentText );
	flushOutputTextToGUI();
}

public function hasButton(arg:*):boolean {
	if( arg is String )
		return mainView.hasButton( arg as String );
	else
		return false;
}

public function removeButton(arg:*):void {
	function _removeButtonAction( index : number ):void	// Uh... should this function be empty?
	{
		// funcs[ index ] = null;
		// args[ index ] = -9000;
	}

	let buttonToRemove: number = 0;
	if(arg is String) {
		buttonToRemove = mainView.indexOfButtonWithLabel( arg as String );
	}
	if(arg is Number) {
		if(arg < 0 || arg > 9) return;
		buttonToRemove = Math.round(arg);
	}
	
	// _removeButtonAction( buttonToRemove );
	mainView.hideBottomButton( buttonToRemove );
}

public function menu():void { //The newer, simpler menu - blanks all buttons so addButton can be used
	mainView.hideBottomButton(0);
	mainView.hideBottomButton(1);
	mainView.hideBottomButton(2);
	mainView.hideBottomButton(3);
	mainView.hideBottomButton(4);
	mainView.hideBottomButton(5);
	mainView.hideBottomButton(6);
	mainView.hideBottomButton(7);
	mainView.hideBottomButton(8);
	mainView.hideBottomButton(9);
	flushOutputTextToGUI();
}

/*
// AFICT, menu() isn't called with arguments ANYWHERE in the codebase.
// WHRYYYYYYY
public function menu(text1:string = "", func1:Function = null, arg1:number = -9000, 
					text2:string = null, func2:Function = null, arg2:number = -9000, 
					text3:string = null, func3:Function = null, arg3:number = -9000, 
					text4:string = null, func4:Function = null, arg4:number = -9000, 
					text5:string = null, func5:Function = null, arg5:number = -9000, 
					text6:string = null, func6:Function = null, arg6:number = -9000, 
					text7:string = null, func7:Function = null, arg7:number = -9000, 
					text8:string = null, func8:Function = null, arg8:number = -9000, 
					text9:string = null, func9:Function = null, arg9:number = -9000, 
					text0:string = null, func0:Function = null, arg0:number = -9000):void 
{
	
	function _conditionallyShowButton( index : number, label :string, func :Function, arg :number ) :void
	{
		let callback :Function, toolTipText :string;

		

		
		if( func != null )
		{
			callback = createCallBackFunction(func1, arg1);

			toolTipText = getButtonToolTipText( label );
			// This is a kind of messy hack because I want to log the button events, so I can do better debugging.
			// therefore, we wrap the callback function in a shim function that does event-logging, and
			// *then* calls the relevant callback.

			
			mainView.showBottomButton( index, label, callback, toolTipText );
			
		}
		else
		{
			mainView.hideBottomButton( index );
		}
	}

	//Clear funcs & args
	// funcs = new Array();
	// args = new Array();
	
	_conditionallyShowButton( 0, text1, func1, arg1 );
	_conditionallyShowButton( 1, text2, func2, arg2 );
	_conditionallyShowButton( 2, text3, func3, arg3 );
	_conditionallyShowButton( 3, text4, func4, arg4 );
	_conditionallyShowButton( 4, text5, func5, arg5 );
	_conditionallyShowButton( 5, text6, func6, arg6 );
	_conditionallyShowButton( 6, text7, func7, arg7 );
	_conditionallyShowButton( 7, text8, func8, arg8 );
	_conditionallyShowButton( 8, text9, func9, arg9 );
	_conditionallyShowButton( 9, text0, func0, arg0 );

	//mainView.setOutputText( currentText );
	flushOutputTextToGUI();
}
*/

public function choices(text1:string, butt1:Function,
						text2:string, butt2:Function,
						text3:string, butt3:Function,
						text4:string, butt4:Function,
						text5:string, butt5:Function,
						text6:string, butt6:Function,
						text7:string, butt7:Function,
						text8:string, butt8:Function,
						text9:string, butt9:Function,
						text0:string, butt0:Function):void { //New typesafe version
							
	menu();	
	addButton(0, text1, butt1);
	addButton(1, text2, butt2);
	addButton(2, text3, butt3);
	addButton(3, text4, butt4);
	addButton(4, text5, butt5);
	addButton(5, text6, butt6);
	addButton(6, text7, butt7);
	addButton(7, text8, butt8);
	addButton(8, text9, butt9);
	addButton(9, text0, butt0);
/*
	let callback :Function;
	let toolTipText :string;

	let textLabels :Array;
	let j : number;

	textLabels = [
		text1,
		text2,
		text3,
		text4,
		text5,
		text6,
		text7,
		text8,
		text9,
		text0
	];

	//Transfer event code to storage
	buttonEvents[0] = butt1;
	buttonEvents[1] = butt2;
	buttonEvents[2] = butt3;
	buttonEvents[3] = butt4;
	buttonEvents[4] = butt5;
	buttonEvents[5] = butt6;
	buttonEvents[6] = butt7;
	buttonEvents[7] = butt8;
	buttonEvents[8] = butt9;
	buttonEvents[9] = butt0;

	let tmpJ: number;

	// iterate over the button options, and only enable the ones which have a corresponding event number

	for (tmpJ = 0; tmpJ < 10; tmpJ += 1)
	{
		if(buttonEvents[tmpJ] == -9000 || buttonEvents[tmpJ] == 0 || buttonEvents[tmpJ] == null) {
			mainView.hideBottomButton( tmpJ );
		}
		else {
			if (buttonEvents[tmpJ] is Number) {
				callback = createCallBackFunction(eventParser, buttonEvents[tmpJ] );
			} else {
				callback = createCallBackFunction(buttonEvents[tmpJ], null);
			}
			toolTipText = getButtonToolTipText( textLabels[ tmpJ ] );

			mainView.showBottomButton( tmpJ, textLabels[ tmpJ ], callback, toolTipText );
		}

	}

	// funcs = new Array();
	// args = new Array();
	//mainView.setOutputText( currentText );
	flushOutputTextToGUI();
*/
}

/****
	This function is made for multipage menus of unpredictable length,
	say a collection of items or places or people that can change
	depending on certain events, past choices, the time of day, or whatever.

	This is not the best for general menu use.  Use choices() for that.

	This is a bit confusing, so here's usage instructions.
	Pay attention to all the braces.

	This is made to be used with an array that you create before calling it,
	so that you can push as many items on to that array as you like
	before passing that array off to this function.

	So you can do something like this:
		let itemsInStorage :Array = new Array();

		// The extra square braces are important.
		itemsInStorage.push( [ "Doohicky", useDoohickyFunc ] );
		itemsInStorage.push( [ "Whatsit", useWhatsitFunc ] );
		itemsInStorage.push( [ "BagOfDicks", eatBagOfDicks ] );
		...

		// see notes about cancelFunc
		multipageChoices( cancelFunc, itemsInStorage );

	cancelfunc is a function (A button event function, specifically)
	that exits the menu.  Provide this if you want a Back button to appear
	in the bottom right.

	If you do not need a cancel function, perhaps because some or all
	of the choices will exit the menu, then you can
	pass null or 0 for the cancelFunction.

		// This menu shows no Back button.
		multipageChoices( null, itemsInStorage );

	You can call it directly if you want, but that's ridiculous.
		multipageChoices( justGoToCamp, [
			[ "Do this", doThisEvent ],
			[ "Do that", doThatEvent ],
			[ "Do something", doSomethingEvent ],
			[ "Fap", goFapEvent ],
			[ "Rape Jojo", jojoRape ],
			// ... more items here...
			[ "What", goWhat ],
			[ "Margle", gurgleFluidsInMouthEvent ] // no comma on last item.
		]);
****/
public function multipageChoices( cancelFunction :*, menuItems :Array ) :void {
	const itemsPerPage : number = 8;

	let currentPageIndex : number;
	let pageCount : number;

	function getPageOfItems( pageIndex : number ) :Array {
		let startItemIndex: number = pageIndex * itemsPerPage;

		return menuItems.slice( startItemIndex, startItemIndex + itemsPerPage );
	}

	function flatten( pageItems :Array ) :Array {
		let i: number, l: number;
		let flattenedItems:Array = [];

		for( i = 0, l = pageItems.length; i < l; ++i ) {
			flattenedItems = flattenedItems.concat( pageItems[ i ] );
		}

		return flattenedItems;
	}

	function showNextPage() :void {
		showPage( (currentPageIndex + 1) % pageCount );
	}

	function showPage( pageIndex : number ) :void {
		let currentPageItems :Array; // holds the current page of items.

		if( pageIndex < 0 )
			pageIndex = 0;
		if( pageIndex >= pageCount )
			pageIndex = pageCount - 1;

		currentPageIndex = pageIndex;
		currentPageItems = getPageOfItems( pageIndex );

		// I did it this way so as to use only one actual menu setting function.
		// I figured it was safer until the menu functions stabilize.

		// insert page functions.
		// First pad out the items so it's always in a predictable state.
		while( currentPageItems.length < 8 ) {
			currentPageItems.push( [ "", 0 ] );
		}

		// Insert next button.
		currentPageItems.splice( 4, 0, [
			"See page " +
				String( ((currentPageIndex + 1) % pageCount) + 1 ) + // A compelling argument for 1-indexing?
				'/' +
				String( pageCount ),
			pageCount > 1 ? showNextPage : 0
			// "Next Page", pageCount > 1 ? showNextPage : 0
			]);

		// Cancel/Back button always appears in bottom right, like in the inventory.
		currentPageItems.push([
			"Back", cancelFunction || 0
			]);

		choices.apply( null, flatten( currentPageItems ) );
	}

	pageCount = Math.ceil( menuItems.length / itemsPerPage );

	if( typeof cancelFunction != 'function' )
		cancelFunction = 0;

	showPage( 0 );
}

// simpleChoices and doYesNo are convenience functions. They shouldn't re-implement code from choices()
public function simpleChoices(text1:string, butt1:Function, 
						text2:string, butt2:Function, 
						text3:string, butt3:Function, 
						text4:string, butt4:Function, 
						text5:string, butt5:Function):void { //New typesafe version

	//trace("SimpleChoices");
/*	choices(text1,butt1,
			text2,butt2,
			text3,butt3,
			text4,butt4,
			text5,butt5,
			"",0,
			"",0,
			"",0,
			"",0,
			"",0);*/
	menu();
	addButton(0, text1, butt1);
	addButton(1, text2, butt2);
	addButton(2, text3, butt3);
	addButton(3, text4, butt4);
	addButton(4, text5, butt5);
}

public function doYesNo(eventYes:Function, eventNo:Function):void { //New typesafe version
	menu();
	addButton(0, "Yes", eventYes);
	addButton(1, "No", eventNo);
/*
	//Make buttons 1-2 visible and hide the rest.

	//trace("doYesNo");
	choices("Yes",eventYes,
			"No",eventNo,
			"",0,
			"",0,
			"",0,
			"",0,
			"",0,
			"",0,
			"",0,
			"",0);

}
*/
}

public function doNext(event:Function):void { //Now typesafe
	//Prevent new events in combat from automatically overwriting a game over. 
	if (mainView.getButtonText(0).indexOf("Game Over") != -1) {
		trace("Do next setup cancelled by game over");
		return;
	}
	
	//trace("DoNext have item:", eventNo);
	//choices("Next", event, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0); 
	menu();
	addButton(0, "Next", event);
}

/* Was never called
public function doNextClear(eventNo:*):void 
{
	outputText("", true, true);
	//trace("DoNext Clearing display");
	//trace("DoNext have item:", eventNo);
	choices("Next", eventNo, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0);
}
*/

public function invertGo():void{ 
	mainView.invert();
}

//Used to update the display of statistics
public function statScreenRefresh():void {
	mainView.statsView.show(); // show() method refreshes.
}

public function showStats():void {
	mainView.statsView.show();
}

public function hideStats():void {
	mainView.statsView.hide();
}

public function hideMenus():void {
	mainView.hideAllMenuButtons();
}

//Hide the up/down indicators
public function hideUpDown():void {
	mainView.statsView.hideUpDown();

	//Clear storage values so up/down arrows can be properly displayed
	oldStats.oldStr = 0;
	oldStats.oldTou = 0;
	oldStats.oldSpe = 0;
	oldStats.oldInte = 0;
	oldStats.oldLib = 0;
	oldStats.oldSens = 0;
	oldStats.oldLust = 0;
	oldStats.oldCor = 0;        
}

public function physicalCost(mod:number):number {
	let costPercent:number = 100;
	if(player.perks.has("IronMan")) costPercent -= 50;
	mod *= costPercent/100;
	return mod;
}

public function spellCost(mod:number):number {
	//Addiditive mods
	let costPercent:number = 100;
	if(player.perks.has("SpellcastingAffinity")) costPercent -= player.perkv1(PerkLib.SpellcastingAffinity);
	if(player.perks.has("WizardsEndurance")) costPercent -= player.perkv1(PerkLib.WizardsEndurance);
	
	//Limiting it and multiplicative mods
	if(player.perks.has("BloodMage") && costPercent < 50) costPercent = 50;
	
	mod *= costPercent/100;
	
	if(player.perks.has("HistoryScholar")) {
		if(mod > 2) mod *= .8;
	}
	if(player.perks.has("BloodMage") && mod < 5) mod = 5;
	else if(mod < 2) mod = 2;
	
	mod = Math.round(mod * 100)/100;
	return mod;
}

//Modify fatigue
//types:
//        0 - normal
//        1 - magic
public function fatigue(mod:number,type:number  = 0):void {
	//Spell reductions
	if(type == 1) {
		mod = spellCost(mod);
		
		//Blood mages use HP for spells
		if(player.perks.has("BloodMage")) {
			takeDamage(mod);
			statScreenRefresh();
			return;
		}                
	}
	//Physical special reductions
	if(type == 2) {
		mod = physicalCost(mod);
	}
	if(player.fatigue >= 100 && mod > 0) return;
	if(player.fatigue <= 0 && mod < 0) return;
	//Fatigue restoration buffs!
	if (mod < 0) {
		let multi:number = 1;
		
		if (player.perks.has("HistorySlacker")) multi += 0.2;
		if (player.perks.has("ControlledBreath") && player.stats.cor < 30) multi += 0.1;
		
		mod *= multi;
	}
	player.fatigue += mod;
	if(mod > 0) {
		mainView.statsView.showStatUp( 'fatigue' );
		// fatigueUp.visible = true;
		// fatigueDown.visible = false;
	}
	if(mod < 0) {
		mainView.statsView.showStatDown( 'fatigue' );
		// fatigueDown.visible = true;
		// fatigueUp.visible = false;
	}
	if(player.fatigue > 100) player.fatigue = 100;
	if(player.fatigue < 0) player.fatigue = 0;
	statScreenRefresh();
}
//function changeFatigue
public function changeFatigue(changeF:number):void {
	fatigue(changeF);
}
public function minLust():number {
	return player.minLust();
}

public function displayStats(e:MouseEvent = null):void
{
	spriteSelect(-1);
	outputText("", true);
	
	// Begin Combat Stats
	let combatStats:string = "";
	if (player.hasKeyItem("Bow") >= 0)
		combatStats += "<b>Bow Skill:</b> " + Math.round(player.statusAffects.get("Kelt").value1) + "\n";
		
	combatStats += "<b>Lust Resistance:</b> " + (100 - Math.round(lustPercent())) + "% (Higher is better.)\n";
	
	combatStats += "<b>Spell Effect Multiplier:</b> " + (100 * spellMod()) + "%\n";
	
	combatStats += "<b>Spell Cost:</b> " + spellCost(100) + "%\n";
	
	if (flags[FlagEnum.RAPHAEL_RAPIER_TRANING] > 0)
		combatStats += "<b>Rapier Skill (Out of 4):</b> " + flags[FlagEnum.RAPHAEL_RAPIER_TRANING] + "\n";
	
	combatStats += "<b>Tease Skill (Out of 5):</b>  " + player.teaseLevel + "\n";
	
	if (combatStats != "")
		outputText("<b><u>Combat Stats</u></b>\n" + combatStats, false);
	// End Combat Stats
	
	// Begin Children Stats
	let childStats:string = "";
	
	if (player.statusAffects.get("Birthed").value1 > 0)
		childStats += "<b>Times Given Birth:</b> " + player.statusAffects.get("Birthed").value1 + "\n";
		
	if (flags[FlagEnum.AMILY_MET] > 0)
		childStats += "<b>Litters With Amily:</b> " + (flags[FlagEnum.AMILY_BIRTH_TOTAL] + flags[FlagEnum.PC_TIMES_BIRTHED_AMILYKIDS]) + "\n";
		
	if (flags[FlagEnum.BENOIT_EGGS] > 0)
		childStats += "<b>Benoit Eggs Laid:</b> " + flags[FlagEnum.BENOIT_EGGS] + "\n";
		
	if (flags[FlagEnum.COTTON_KID_COUNT] > 0)
		childStats += "<b>Children With Cotton:</b> " + flags[FlagEnum.COTTON_KID_COUNT] + "\n";
	
	if (flags[FlagEnum.EDRYN_NUMBER_OF_KIDS] > 0)
		childStats += "<b>Children With Edryn:</b> " + flags[FlagEnum.EDRYN_NUMBER_OF_KIDS] + "\n";
		
	if (flags[FlagEnum.EMBER_CHILDREN_MALES] > 0)
		childStats += "<b>Ember Offspring (Males):</b> " + flags[FlagEnum.EMBER_CHILDREN_MALES] + "\n";
	if (flags[FlagEnum.EMBER_CHILDREN_FEMALES] > 0)
		childStats += "<b>Ember Offspring (Females):</b> " + flags[FlagEnum.EMBER_CHILDREN_FEMALES] + "\n";
	if (flags[FlagEnum.EMBER_CHILDREN_HERMS] > 0)
		childStats += "<b>Ember Offspring (Herms):</b> " + flags[FlagEnum.EMBER_CHILDREN_HERMS] + "\n";
			
	if (flags[FlagEnum.EMBER_EGGS] > 0)
		childStats += "<b>Ember Eggs Produced:</b> " + flags[FlagEnum.EMBER_EGGS] + "\n";
		
	if (flags[FlagEnum.IZMA_CHILDREN_SHARKGIRLS] > 0)
		childStats += "<b>Children With Izma (Sharkgirls):</b> " + flags[FlagEnum.IZMA_CHILDREN_SHARKGIRLS] + "\n";
		
	if (flags[FlagEnum.IZMA_CHILDREN_TIGERSHARKS] > 0)
		childStats += "<b>Children With Izma (Tigersharks):</b> " + flags[FlagEnum.IZMA_CHILDREN_TIGERSHARKS] + "\n";
		
	if (flags[FlagEnum.KELLY_KIDS_MALE] > 0)
		childStats += "<b>Children With Kelly (Males):</b> " + flags[FlagEnum.KELLY_KIDS_MALE] + "\n";
		
	if (flags[FlagEnum.KELLY_KIDS] - flags[FlagEnum.KELLY_KIDS_MALE] > 0)
		childStats += "<b>Children With Kelly (Females):</b> " + (flags[FlagEnum.KELLY_KIDS] - flags[FlagEnum.KELLY_KIDS_MALE]) + "\n";
		
	if (mountain.salon.lynnetteApproval() != 0)
		childStats += "<b>Lynnette Children:</b> " + flags[FlagEnum.LYNNETTE_BABY_COUNT] + "\n";
		
	if (flags[FlagEnum.MARBLE_KIDS] > 0)
		childStats += "<b>Children With Marble:</b> " + flags[FlagEnum.MARBLE_KIDS] + "\n";
		
	if (flags[FlagEnum.ANT_KIDS] > 0)
		childStats += "<b>Ant Children With Phylla:</b> " + flags[FlagEnum.ANT_KIDS] + "\n";
		
	if (flags[FlagEnum.PHYLLA_DRIDER_BABIES_COUNT] > 0)
		childStats += "<b>Drider Children With Phylla:</b> " + flags[FlagEnum.PHYLLA_DRIDER_BABIES_COUNT] + "\n";
		
	if (flags[FlagEnum.SHEILA_JOEYS] > 0)
		childStats += "<b>Children With Sheila (Joeys):</b> " + flags[FlagEnum.SHEILA_JOEYS] + "\n";
		
	if (flags[FlagEnum.SHEILA_IMPS] > 0)
		childStats += "<b>Children With Sheila (Imps):</b> " + flags[FlagEnum.SHEILA_IMPS] + "\n";
		
	if (flags[FlagEnum.SOPHIE_ADULT_KID_COUNT] > 0 || flags[FlagEnum.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 0) 
	{
		childStats += "<b>Children With Sophie:</b> ";
		let sophie: number = 0;
		if (flags[FlagEnum.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 0) sophie++;
		sophie += flags[FlagEnum.SOPHIE_ADULT_KID_COUNT];
		if (flags[FlagEnum.SOPHIE_CAMP_EGG_COUNTDOWN] > 0) sophie++;
		childStats += sophie + "\n";
	}
	
	if (flags[FlagEnum.SOPHIE_EGGS_LAID] > 0)
		childStats += "<b>Eggs Fertilized For Sophie:</b> " + (flags[FlagEnum.SOPHIE_EGGS_LAID] + sophie) + "\n";
		
	if (flags[FlagEnum.TAMANI_NUMBER_OF_DAUGHTERS] > 0)
		childStats += "<b>Children With Tamani:</b> " + flags[FlagEnum.TAMANI_NUMBER_OF_DAUGHTERS] + " (after all forms of natural selection)\n";
		
	if (urtaPregs.urtaKids() > 0)
		childStats += "<b>Children With Urta:</b> " + urtaPregs.urtaKids() + "\n";
		
	//Mino sons
	if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00326] > 0)
		childStats += "<b>Number of Adult Minotaur Offspring:</b> " + flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00326] + "\n";
	
	if (childStats != "")
		outputText("\n<b><u>Children</u></b>\n" + childStats, false);
	// End Children Stats

	// Begin Body Stats
	let bodyStats:string = "";
	
	bodyStats += "<b>Anal Capacity:</b> " + Math.round(player.analCapacity()) + "\n";
	bodyStats += "<b>Anal Looseness:</b> " + Math.round(player.ass.analLooseness) + "\n";
	
	bodyStats += "<b>Fertility (Base) Rating:</b> " + Math.round(player.fertility) + "\n";
	bodyStats += "<b>Fertility (With Bonuses) Rating:</b> " + Math.round(player.totalFertility()) + "\n";
	
	if (player.cumQ() > 0)
		bodyStats += "<b>Cum Production:</b> " + Math.round(player.cumQ()) + "mL\n";
	if (player.lactationQ() > 0)
		bodyStats += "<b>Milk Production:</b> " + Math.round(player.lactationQ()) + "mL\n";
	
	if (player.statusAffects.has("Feeder")) {
		bodyStats += "<b>Hours Since Last Time Breastfed Someone:</b>  " + player.statusAffects.get("Feeder").value2;
		if (player.statusAffects.get("Feeder").value2 >= 72)
			bodyStats += " (Too long! Sensitivity Increasing!)";
		
		bodyStats += "\n";
	}
	
	bodyStats += "<b>Pregnancy Speed Multiplier:</b> ";
	let preg:number = 1;
	if (player.perks.has("Diapause"))
		bodyStats += "? (Variable due to Diapause)\n";
	else {
		if (player.perks.has("MaraesGiftFertility")) preg++;
		if (player.perks.has("BroodMother")) preg++;
		if (player.perks.has("FerasBoonBreedingBitch")) preg++;
		if (player.perks.has("MagicalFertility")) preg++;
		if (player.perks.has("FerasBoonWideOpen") || player.perks.has("FerasBoonMilkingTwat")) preg++;
		bodyStats += preg + "\n";
	}
	
	if (player.lowerBody.cockSpot.count() > 0) {
		bodyStats += "<b>Total Cocks:</b> " + player.lowerBody.cockSpot.count() + "\n";

		let totalCockLength:number = 0;
		let totalCockGirth:number = 0;
		
		for (let i:number = 0; i < player.lowerBody.cockSpot.count(); i++) {
				totalCockLength += player.lowerBody.cockSpot.list[i].cockLength;
				totalCockGirth += player.lowerBody.cockSpot.list[i].cockThickness
		}
				
		bodyStats += "<b>Total Cock Length:</b> " + Math.round(totalCockLength) + " inches\n";
		bodyStats += "<b>Total Cock Girth:</b> " + Math.round(totalCockGirth) + " inches\n";
		
	}
	
	if (player.lowerBody.vaginaSpot.count() > 0)
		bodyStats += "<b>Vaginal Capacity:</b> " + Math.round(player.vaginalCapacity()) + "\n" + "<b>Vaginal Looseness:</b> " + Math.round(player.looseness()) + "\n";

	if (player.perks.has("SpiderOvipositor") || player.perks.has("BeeOvipositor"))
		bodyStats += "<b>Ovipositor Total Egg Count: " + player.eggs() + "\nOvipositor Fertilized Egg Count: " + player.fertilizedEggs() + "</b>\n";
		
	if (player.statusAffects.has("SlimeCraving")) {
		if (player.statusAffects.get("SlimeCraving").value1 >= 18)
			bodyStats += "<b>Slime Craving:</b> Active! You are currently losing strength and speed.  You should find fluids.\n";
		else {
			if (player.perks.has("SlimeCore"))
				bodyStats += "<b>Slime Stored:</b> " + ((17 - player.statusAffects.get("SlimeCraving").value1) * 2) + " hours until you start losing strength.\n";
			else
				bodyStats += "<b>Slime Stored:</b> " + (17 - player.statusAffects.get("SlimeCraving").value1) + " hours until you start losing strength.\n";
		}
	}
	
	if (bodyStats != "")
		outputText("\n<b><u>Body Stats</u></b>\n" + bodyStats, false);
	// End Body Stats

	// Begin Misc Stats
	let miscStats:string = "";

	if (flags[FlagEnum.EGGS_BOUGHT] > 0)
		miscStats += "<b>Eggs Traded For:</b> " + flags[FlagEnum.EGGS_BOUGHT] + "\n";
		
	if (flags[FlagEnum.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] > 0)
		miscStats += "<b>Times Had Fun with Feline Flexibility:</b> " + flags[FlagEnum.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] + "\n";
	
	if (flags[FlagEnum.FAP_ARENA_SESSIONS] > 0)
		miscStats += "<b>Times Circle Jerked in the Arena:</b> " + flags[FlagEnum.FAP_ARENA_SESSIONS] + "\n<b>Victories in the Arena:</b> " + flags[FlagEnum.FAP_ARENA_VICTORIES] + "\n";
	
	if (flags[FlagEnum.SPELLS_CAST] > 0)
		miscStats += "<b>Spells Cast:</b> " + flags[FlagEnum.SPELLS_CAST] + "\n";
		
	if (miscStats != "")
		outputText("\n<b><u>Miscellaneous Stats</u></b>\n" + miscStats);
	// End Misc Stats
	
	// Begin Addition Stats
	let addictStats:string = "";
	//Marble Milk Addition
	if (player.statusAffects.get("$1").value3 > 0) {
		addictStats += "<b>Marble Milk:</b> ";
		if (!player.perks.has("MarbleResistant") && !player.perks.has("MarblesMilk"))
			addictStats += Math.round(player.statusAffects.get("Marble").value2) + "%\n";
		else if (player.perks.has("MarbleResistant"))
			addictStats += "0%\n";
		else
			addictStats += "100%\n";
	}
	
	// Mino Cum Addiction
	if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00340] > 0 || flags[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] > 0 || player.perks.has("MinotaurCumAddict")) {
		if (!player.perks.has("MinotaurCumAddict"))
		addictStats += "<b>Minotaur Cum:</b> " + Math.round(flags[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] * 10)/10 + "%\n";
		else
			addictStats += "<b>Minotaur Cum:</b> 100+%\n";
	}
	
	if (addictStats != "")
		outputText("\n<b><u>Addictions</u></b>\n" + addictStats, false);
	// End Addition Stats
	
	// Begin Interpersonal Stats
	let interpersonStats:string = "";
	
	if (flags[FlagEnum.ARIAN_PARK] > 0)
		interpersonStats += "<b>Arian's Health:</b> " + Math.round(arianScene.arianHealth()) + "\n";
		
	if (flags[FlagEnum.ARIAN_VIRGIN] > 0)
		interpersonStats += "<b>Arian Sex Counter:</b> " + Math.round(flags[FlagEnum.ARIAN_VIRGIN]) + "\n";
	
	if (bazaar.benoit.benoitAffection() > 0)
		interpersonStats += "<b>" + bazaar.benoit.benoitMF("Benoit", "Benoite") + " Affection:</b> " + Math.round(bazaar.benoit.benoitAffection()) + "%\n";
	
	if (flags[FlagEnum.BROOKE_MET] > 0)
		interpersonStats += "<b>Brooke Affection:</b> " + Math.round(telAdre.brooke.brookeAffection()) + "\n";
		
	if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00218] + flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00219] + flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00220] > 0)
		interpersonStats += "<b>Body Parts Taken By Ceraph:</b> " + (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00218] + flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00219] + flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00220]) + "\n";
		
	if (emberScene.emberAffection() > 0)
		interpersonStats += "<b>Ember Affection:</b> " + Math.round(emberScene.emberAffection()) + "%\n";
	
	if (helFollower.helAffection() > 0)
		interpersonStats += "<b>Helia Affection:</b> " + Math.round(helFollower.helAffection()) + "%\n";
	if (helFollower.helAffection() >= 100)
		interpersonStats += "<b>Helia Bonus Points:</b> " + Math.round(flags[FlagEnum.HEL_BONUS_POINTS]) + "\n";
	
	if (flags[FlagEnum.ISABELLA_AFFECTION] > 0) {
		interpersonStats += "<b>Isabella Affection:</b> ";
		
		if (!isabellaFollowerScene.isabellaFollower())
			interpersonStats += Math.round(flags[FlagEnum.ISABELLA_AFFECTION]) + "%\n", false;
		else
			interpersonStats += "100%\n";
	}
	
	if (flags[FlagEnum.KATHERINE_UNLOCKED] >= 4) {
		interpersonStats += "<b>Katherine Submissiveness:</b> " + telAdre.katherine.submissiveness() + "\n";
	}

	if (player.statusAffects.has("Kelt") && flags[FlagEnum.KELT_BREAK_LEVEL] == 0) {
		if (player.statusAffects.get("Kelt").value2 >= 130)
			interpersonStats += "<b>Submissiveness To Kelt:</b> " + 100 + "%\n";
		else
			interpersonStats += "<b>Submissiveness To Kelt:</b> " + Math.round(player.statusAffects.get("Kelt").value2/130*100) + "%\n";
	}
	
	if (flags[FlagEnum.ANEMONE_KID] > 0)
		interpersonStats += "<b>Kid A's Confidence:</b> " + anemoneScene.kidAXP() + "%\n";

	if (flags[FlagEnum.KIHA_AFFECTION_LEVEL] == 2) {
		if (kihaFollower.followerKiha())
			interpersonStats += "<b>Kiha Affection:</b> " + 100 + "%\n";
		else
			interpersonStats += "<b>Kiha Affection:</b> " + Math.round(flags[FlagEnum.KIHA_AFFECTION]) + "%\n";
	}
	//Lottie stuff
	if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00281] > 0)
		interpersonStats += "<b>Lottie's Encouragement:</b> " + telAdre.lottie.lottieMorale() + " (higher is better)\n" + "<b>Lottie's Figure:</b> " + telAdre.lottie.lottieTone() + " (higher is better)\n";
	
	if (mountain.salon.lynnetteApproval() != 0)
		interpersonStats += "<b>Lynnette's Approval:</b> " + mountain.salon.lynnetteApproval() + "\n";
		
	if (flags[FlagEnum.OWCAS_ATTITUDE] > 0)
		interpersonStats += "<b>Owca's Attitude:</b> " + flags[FlagEnum.OWCAS_ATTITUDE] + "\n";
		
	if (telAdre.rubi.rubiAffection() > 0)
		interpersonStats += "<b>Rubi's Affection:</b> " + Math.round(telAdre.rubi.rubiAffection()) + "%\n" + "<b>Rubi's Orifice Capacity:</b> " + Math.round(telAdre.rubi.rubiCapacity()) + "%\n";

	if (flags[FlagEnum.SHEILA_XP] != 0) {
		interpersonStats += "<b>Sheila's Corruption:</b> " + sheilaScene.sheilaCorruption();
		if (sheilaScene.sheilaCorruption() > 100)
			interpersonStats += " (Yes, it can go above 100)";
		interpersonStats += "\n";
	}
	
	if (flags[FlagEnum.URTA_COMFORTABLE_WITH_OWN_BODY] != 0) {
		if (urta.urtaLove())
			interpersonStats += "<b>Urta Status:</b> Lover\n";
		else if (flags[FlagEnum.URTA_COMFORTABLE_WITH_OWN_BODY] == -1)
			interpersonStats += "<b>Urta Status:</b> Ashamed\n";
		else if (flags[FlagEnum.URTA_PC_AFFECTION_COUNTER] < 30)
			interpersonStats += "<b>Urta's Affection:</b> " + Math.round(flags[FlagEnum.URTA_PC_AFFECTION_COUNTER] * 3.3333) + "%\n";
		else
			interpersonStats += "<b>Urta Status:</b> Ready To Confess Love\n";
	}
	
	if (interpersonStats != "")
		outputText("\n<b><u>Interpersonal Stats</u></b>\n" + interpersonStats, false);
	// End Interpersonal Stats
	
	// Begin Ongoing Stat Effects
	let statEffects:string = "";
	
	if (player.inHeat)
		statEffects += "Heat - " + Math.round(player.statusAffects.get("$1").value3) + " hours remaining\n";
		
	if (player.inRut)
		statEffects += "Rut - " + Math.round(player.statusAffects.get("$1").value3) + " hours remaining\n";
		
	if (player.statusAffects.get("Luststick").value1 > 0)
		statEffects += "Luststick - " + Math.round(player.statusAffects.get("Luststick").value1) + " hours remaining\n";
		
	if (player.statusAffects.get("BlackCatBeer").value1 > 0)
		statEffects += "Black Cat Beer - " + player.statusAffects.get("BlackCatBeer").value1 + " hours remaining (Lust resistance 20% lower, physical resistance 25% higher.)\n";
	
	if (statEffects != "")
		outputText("\n<b><u>Ongoing Status Effects</u></b>\n" + statEffects, false);
	// End Ongoing Stat Effects
	
	doNext(playerMenu);
}

public function lustPercent():number {
	let lust:number = 100;
	//2.5% lust resistance per level - max 75.
	if(player.level < 21) lust -= (player.level - 1) * 3;
	else lust = 40;
	
	//++++++++++++++++++++++++++++++++++++++++++++++++++
	//ADDITIVE REDUCTIONS
	//THESE ARE FLAT BONUSES WITH LITTLE TO NO DOWNSIDE
	//TOTAL IS LIMITED TO 75%!
	//++++++++++++++++++++++++++++++++++++++++++++++++++
	//Corrupted Libido reduces lust gain by 10%!
	if(player.perks.has("CorruptedLibido")) lust -= 10;
	//Acclimation reduces by 15%
	if(player.perks.has("Acclimation")) lust -= 15;
	//Purity blessing reduces lust gain
	if(player.perks.has("PurityBlessing")) lust -= 5;
	//Resistance = 10%
	if(player.perks.has("Resistance")) lust -= 10;
	if (player.perks.has("ChiReflowLust")) lust -= UmasShop.NEEDLEWORK_LUST_LUST_RESIST;
	
	if(lust < 25) lust = 25;
	if(player.statusAffects.get("BlackCatBeer").value1 > 0) {
		if(lust >= 80) lust = 100;
		else lust += 20;
	}
	lust += Math.round(player.perkv1(PerkLib.PentUp)/2);
	//++++++++++++++++++++++++++++++++++++++++++++++++++
	//MULTIPLICATIVE REDUCTIONS
	//THESE PERKS ALSO RAISE MINIMUM LUST OR HAVE OTHER
	//DRAWBACKS TO JUSTIFY IT.
	//++++++++++++++++++++++++++++++++++++++++++++++++++
	//Bimbo body slows lust gains!
	if((player.statusAffects.has("BimboChampagne") || player.perks.has("BimboBody")) && lust > 0) lust *= .75;
	if(player.perks.has("BroBody") && lust > 0) lust *= .75;
	if(player.perks.has("FutaForm") && lust > 0) lust *= .75;
	//Omnibus' Gift reduces lust gain by 15%
	if(player.perks.has("OmnibusGift")) lust *= .85;
	//Luststick reduces lust gain by 10% to match increased min lust
	if(player.perks.has("LuststickAdapted")) lust *= 0.9;
	if(player.statusAffects.has("Berzerking")) lust *= .6;
	if (player.perks.has("PureAndLoving")) lust *= 0.95;
	
	// Lust mods from Uma's content -- Given the short duration and the gem cost, I think them being multiplicative is justified.
	// Changing them to an additive bonus should be pretty simple (check the static values in UmasShop.as)
	let statIndex: number = player.findStatusAffect(StatusAffects.UmasMassage);
	if (statIndex >= 0)
	{
		if (player.statusAffect(statIndex).value1 == UmasShop.MASSAGE_RELIEF || player.statusAffect(statIndex).value1 == UmasShop.MASSAGE_LUST)
		{
			lust *= player.statusAffect(statIndex).value2;
		}
	}
	
	lust = Math.round(lust);
	return lust;
}

// returns OLD OP VAL
public function applyOperator(old:number, op:string, val:number):number {
	switch(op) {
		case "=":
			return val;
		case "+":
			return old + val;
		case "-":
			return old - val;
		case "*":
			return old * val;
		case "/":
			return old / val;
		default:
			trace("applyOperator(" + old + ",'" + op + "'," + val + ") unknown op");
			return old;
	}
}

public function testDynStatsEvent():void {
	outputText("Old: "+player.str+" "+player.tou+" "+player.stats.spe+" "+player.stats.int+" "+player.stats.lib+" "+player.stats.sens+" "+player.lust+"\n",true);
	dynStats("tou", 1, "spe+", 2, "int-", 3, "lib*", 2, "sen=", 25,"lust/",2);
	outputText("Mod: 0 1 +2 -3 *2 =25 /2\n");
	outputText("New: "+player.str+" "+player.tou+" "+player.stats.spe+" "+player.stats.int+" "+player.stats.lib+" "+player.stats.sens+" "+player.lust+"\n");
	doNext(playerMenu);
}

/**
 * Modify stats.
 *
 * Arguments should come in pairs nameOp:string, value:number/Boolean <br/>
 * where nameOp is ( stat_name + [operator] ) and value is operator argument<br/>
 * valid operators are "=" (set), "+", "-", "*", "/", add is default.<br/>
 * valid stat_names are "str", "tou", "spe", "int", "lib", "sen", "lus", "cor" or their full names; also "resisted"/"res" (apply lust resistance, default true) and "noBimbo"/"bim" (do not apply bimbo int gain reduction, default false)
 */
public function dynStats(... args):void
{
	// Check num of args, we should have a multiple of 2
	if ((args.length % 2) != 0)
	{
		trace("dynStats aborted. Keys->Arguments could not be matched");
		return;
	}
	
	let argNamesFull:Array 	= 	["strength", "toughness", "speed", "intellect", "libido", "sensitivity", "lust", "corruption", "resisted", "noBimbo"]; // In case somebody uses full arg names etc
	let argNamesShort:Array = 	["str", 	"tou", 	"spe", 	"int", 	"lib", 	"sen", 	"lus", 	"cor", 	"res", 	"bim"]; // Arg names
	let argVals:Array = 		[0, 		0,	 	0, 		0, 		0, 		0, 		0, 		0, 		true, 	false]; // Default arg values
	let argOps:Array = 			["+",	"+",    "+",    "+",    "+",    "+",    "+",    "+",    "=",    "="];   // Default operators
	
	for (let i: number = 0; i < args.length; i += 2)
	{
		if (typeof(args[i]) == "string")
		{
			// Make sure the next arg has the POSSIBILITY of being correct
			if ((typeof(args[i + 1]) != "number") && (typeof(args[i + 1]) != "boolean"))
			{
				trace("dynStats aborted. Next argument after argName is invalid! arg is type " + typeof(args[i + 1]));
				continue;
			}
			
			let argIndex: number = -1;
			
			// Figure out which array to search
			let argsi:string = (args[i] as String);
			if (argsi == "lust") argsi = "lus";
			if (argsi == "sens") argsi = "sen";
			if (argsi.length <= 4) // Short
			{
				argIndex = argNamesShort.indexOf(argsi.slice(0, 3));
				if (argsi.length == 4 && argIndex != -1) argOps[argIndex] = argsi.charAt(3);
			}
			else // Full
			{
				if ("+-*/=".indexOf(argsi.charAt(argsi.length - 1)) != -1) {
					argIndex = argNamesFull.indexOf(argsi.slice(0, argsi.length - 1));
					if (argIndex != -1) argOps[argIndex] = argsi.charAt(argsi.length - 1);
				} else {
					argIndex = argNamesFull.indexOf(argsi);
				}
			}
			
			if (argIndex == -1) // Shit fucked up, welp
			{
				trace("Couldn't find the arg name " + argsi + " in the index arrays. Welp!");
				continue;
			}
			else // Stuff the value into our "values" array
			{
				argVals[argIndex] = args[i + 1];
			}
		}
		else
		{
			trace("dynStats aborted. Expected a key and got SHIT");
			return;
		}
	}
	// Got this far, we have values to statsify
	let newStr:number = applyOperator(player.str, argOps[0], argVals[0]);
	let newTou:number = applyOperator(player.tou, argOps[1], argVals[1]);
	let newSpe:number = applyOperator(player.stats.spe, argOps[2], argVals[2]);
	let newInte:number = applyOperator(player.stats.int, argOps[3], argVals[3]);
	let newLib:number = applyOperator(player.stats.lib, argOps[4], argVals[4]);
	let newSens:number = applyOperator(player.stats.sens, argOps[5], argVals[5]);
	let newLust:number = applyOperator(player.lust, argOps[6], argVals[6]);
	let newCor:number = applyOperator(player.stats.cor, argOps[7], argVals[7]);
	// Because lots of checks and mods are made in the stats(), calculate deltas and pass them. However, this means that the '=' operator could be resisted
	// In future (as I believe) stats() should be replaced with dynStats(), and checks and mods should be made here
	stats(newStr - player.str,
		  newTou - player.tou,
		  newSpe - player.stats.spe,
		  newInte - player.stats.int,
		  newLib - player.stats.lib,
		  newSens - player.stats.sens,
		  newLust - player.lust,
		  newCor - player.stats.cor,
		  argVals[8],argVals[9]);
	
}

public function stats(stre:number, toug:number, spee:number, intel:number, libi:number, sens:number, lust2:number, corr:number, resisted:boolean = true, noBimbo:boolean = false):void
{
	//Easy mode cuts lust gains!
	if (flags[FlagEnum.EASY_MODE_ENABLE_FLAG] == 1 && lust2 > 0 && resisted) lust2 /= 2;
	
	//Set original values to begin tracking for up/down values if
	//they aren't set yet.
	//These are reset when up/down arrows are hidden with 
	//hideUpDown();
	//Just check str because they are either all 0 or real values
	if(oldStats.oldStr == 0) {
		oldStats.oldStr = player.str;
		oldStats.oldTou = player.tou;
		oldStats.oldSpe = player.stats.spe;
		oldStats.oldInte = player.stats.int;
		oldStats.oldLib = player.stats.lib;
		oldStats.oldSens = player.stats.sens;
		oldStats.oldLust = player.lust;
		oldStats.oldCor = player.stats.cor;
	}
	//MOD CHANGES FOR PERKS
	//Bimbos learn slower
	if(!noBimbo)
	{
		if(player.perks.has("FutaFaculties") || player.perks.has("BimboBrains")  || player.perks.has("BroBrains")) {
			if(intel > 0) intel /= 2;
			if(intel < 0) intel *= 2;
		}
		if(player.perks.has("FutaForm") || player.perks.has("BimboBody")  || player.perks.has("BroBody")) {
			if(libi > 0) libi *= 2;
			if(libi < 0) libi /= 2;
		}
	}
	
	// Uma's Perkshit
	if (player.findPerk(PerkLib.ChiReflowSpeed)>=0 && spee < 0) spee *= UmasShop.NEEDLEWORK_SPEED_SPEED_MULTI;
	if (player.findPerk(PerkLib.ChiReflowLust)>=0 && libi > 0) libi *= UmasShop.NEEDLEWORK_LUST_LIBSENSE_MULTI;
	if (player.findPerk(PerkLib.ChiReflowLust)>=0 && sens > 0) sens *= UmasShop.NEEDLEWORK_LUST_LIBSENSE_MULTI;
	
	//lust resistance
	if(lust2 > 0 && resisted) lust2 *= lustPercent()/100;
	if(libi > 0 && player.perks.has("PurityBlessing")) libi *= 0.75;
	if(corr > 0 && player.perks.has("PurityBlessing")) corr *= 0.5;
	if(corr > 0 && player.perks.has("PureAndLoving")) corr *= 0.75;
	//Change original stats
	player.str+=stre;
	player.tou+=toug;
	player.stats.spe+=spee;
	player.stats.int+=intel;
	player.stats.lib += libi;
	
	if(player.stats.sens > 50 && sens > 0) sens/=2;
	if(player.stats.sens > 75 && sens > 0) sens/=2;
	if(player.stats.sens > 90 && sens > 0) sens/=2;
	if(player.stats.sens > 50 && sens < 0) sens*=2;
	if(player.stats.sens > 75 && sens < 0) sens*=2;
	if(player.stats.sens > 90 && sens < 0) sens*=2;
	
	player.stats.sens+=sens;
	player.lust+=lust2;
	player.stats.cor += corr;
	
	//Bonus gain for perks!
	if(player.perks.has("Strong") && stre >= 0) player.str+=stre*player.perk(player.findPerk(PerkLib.Strong)).value1;
	if(player.perks.has("Tough") && toug >= 0) player.tou+=toug*player.perk(player.findPerk(PerkLib.Tough)).value1;
	if(player.perks.has("Fast") && spee >= 0) player.stats.spe+=spee*player.perk(player.findPerk(PerkLib.Fast)).value1;
	if(player.perks.has("Smart") && intel >= 0) player.stats.int+=intel*player.perk(player.findPerk(PerkLib.Smart)).value1;
	if(player.perks.has("Lusty") && libi >= 0) player.stats.lib+=libi*player.perk(player.findPerk(PerkLib.Lusty)).value1;
	if (player.perks.has("Sensitive") && sens >= 0) player.stats.sens += sens * player.perk(player.findPerk(PerkLib.Sensitive)).value1;

	// Uma's Str Cap from Perks
	if (player.perks.has("ChiReflowSpeed"))
	{
		if (player.str > UmasShop.NEEDLEWORK_SPEED_STRENGTH_CAP)
		{
			player.str = UmasShop.NEEDLEWORK_SPEED_STRENGTH_CAP;
		}
	}
	if (player.perks.has("ChiReflowDefense"))
	{
		if (player.stats.spe > UmasShop.NEEDLEWORK_DEFENSE_SPEED_CAP)
		{
			player.stats.spe = UmasShop.NEEDLEWORK_DEFENSE_SPEED_CAP;
		}
	}
	
	//Keep stats in bounds
	if(player.stats.cor < 0) player.stats.cor = 0;
	if(player.stats.cor > 100) player.stats.cor= 100;
	if(player.str > 100) player.str = 100;
	if(player.str < 1) player.str = 1;
	if(player.tou > 100) player.tou = 100;
	if(player.tou < 1) player.tou = 1;
	if(player.stats.spe > 100) player.stats.spe = 100;
	if(player.stats.spe < 1) player.stats.spe = 1;
	if(player.stats.int > 100) player.stats.int= 100;
	if(player.stats.int < 1) player.stats.int = 1;
	if(player.stats.lib > 100) player.stats.lib = 100;
	//Minimum libido = 15.
	if(player.stats.lib < 50 && player.armorName == "lusty maiden's armor") player.stats.lib = 50;
	else if(player.stats.lib < 15 && player.gender > 0) player.stats.lib = 15;
	else if(player.stats.lib < 10 && player.gender == 0) player.stats.lib = 10;
	if (player.stats.lib < minLust() * 2 / 3) player.stats.lib = minLust() * 2 / 3;
	
	//Minimum sensitivity.
	if(player.stats.sens > 100) player.stats.sens = 100;
	if(player.stats.sens < 10) player.stats.sens = 10;
	
	//Add HP for toughness change.
	HPChange(toug*2, false);
	//Reduce hp if over max
	if(player.HP > maxHP()) player.HP = maxHP();
	
	//Combat bounds
	if(player.lust > 99) player.lust = 100;
	//if(player.lust < player.stats.lib) {
	//        player.lust=player.stats.lib;
	//
	//Update to minimum lust if lust falls below it.
	if(player.lust < minLust()) player.lust = minLust();
	//worms raise min lust!
	if(player.statusAffects.has("Infested")) {
		if(player.lust < 50) player.lust = 50;
	}
	if(player.lust > 100) player.lust = 100;
	if(player.lust < 0) player.lust = 0;

	//Refresh the stat pane with updated values
	mainView.statsView.showUpDown();
	statScreenRefresh();
}
public function range(min:number, max:number, round:boolean = false):number 
{
	let num:number = (min + Math.random() * (max - min));

	if (round) return Math.round(num);
	return num;
}

public function cuntChangeOld(cIndex:number, vIndex:number, display:boolean):void {
	//Virginity check
	if(player.vaginas[vIndex].virgin) {
		if(display) outputText("\nYour " + vaginaDescript(vIndex) + " loses its virginity!", false);
		player.vaginas[vIndex].virgin = false;
	}        
	//If cock is bigger than unmodified vagina can hold - 100% stretch!
	if(player.vaginas[vIndex].capacity() <= monster.cocks[cIndex].cArea()) {
		if(player.vaginas[vIndex] < 5) {
			trace("CUNT STRETCHED: By cock larger than it's total capacity.");
			if(display) {
				if(player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS.GAPING_WIDE) outputText("<b>Your " + vaginaDescript(0) + " is stretched even further, capable of taking even the largest of demons and beasts.</b>  ", false);
				if(player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS.GAPING) outputText("<b>Your " + vaginaDescript(0) + " painfully stretches, gaping wide-open.</b>  ", false);
				if(player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS.LOOSE) outputText("<b>Your " + vaginaDescript(0) + " is now very loose.</b>  ", false);
				if(player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS.NORMAL) outputText("<b>Your " + vaginaDescript(0) + " is now loose.</b>  ", false);
				if(player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS.TIGHT) outputText("<b>Your " + vaginaDescript(0) + " loses its virgin-like tightness.</b>  ", false);
			}
			player.vaginas[vIndex].vaginalLooseness++;
		}
	}
	//If cock is within 75% of max, streeeeetch 33% of the time
	if(player.vaginas[vIndex].capacity() * .75 <= monster.cocks[cIndex].cArea()) {
		if(player.vaginas[vIndex] < 5) {
			trace("CUNT STRETCHED: By cock @ 75% of capacity.");
			if(display) {
				if(player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS.GAPING_WIDE) outputText("<b>Your " + vaginaDescript(0) + " is stretched even further, capable of taking even the largest of demons and beasts.</b>  ", false);
				if(player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS.GAPING) outputText("<b>Your " + vaginaDescript(0) + " painfully stretches, gaping wide-open.</b>  ", false);
				if(player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS.LOOSE) outputText("<b>Your " + vaginaDescript(0) + " is now very loose.</b>  ", false);
				if(player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS.NORMAL) outputText("<b>Your " + vaginaDescript(0) + " is now loose.</b>  ", false);
				if(player.vaginas[vIndex].vaginalLooseness == VAGINA_LOOSENESS.TIGHT) outputText("<b>Your " + vaginaDescript(0) + " loses its virgin-like tightness.</b>  ", false);
			}
			player.vaginas[vIndex].vaginalLooseness++;
		}
	}
}

public function spriteSelect(choice:number = 0):void {
	if (flags[FlagEnum.SHOW_SPRITES_FLAG] == 0)
	{
		mainView.selectSprite( choice );
	}
	else
	{
		if (choice >= 0)
		{
			trace ("hiding sprite because flags");
			mainView.selectSprite( -1 );
		}
	}
}