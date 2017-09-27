import Creature from "./Creature";
import { ChainedDrop } from "./Utilities/ChainedDrop";
import Player from "./Player";
import MainScreen from "./display/MainScreen";
import Game from "./Game/Game";
import Utils from "./Utilities/Utils";
import StatusAffect from "./Effects/StatusAffect";
import Flags, { FlagEnum } from "./Game/Flags";
import Item from "./Items/Item";
import GenderDescriptor from "./Descriptors/GenderDescriptor";

export enum MonsterType {

}

export default class Monster extends Creature {
    public readonly type: MonsterType;

    //For enemies
    public bonusHP: number = 0;

    //Is a creature a 'this.plural' encounter - mob, etc.
    public plural: boolean = false;
    public imageName: string = "";

    //Lust vulnerability
    public lustVuln: number = 1;

    public static TEMPERMENT_AVOID_GRAPPLES: number = 0;
    public static TEMPERMENT_LUSTY_GRAPPLES: number = 1;
    public static TEMPERMENT_RANDOM_GRAPPLES: number = 2;
    public static TEMPERMENT_LOVE_GRAPPLES: number = 3;
    /**
     * temperment - used for determining grapple behaviors
     * 0 - avoid grapples/break grapple
     * 1 - lust determines > 50 grapple
     * 2 - Utils.random
     * 3 - love grapples
    */
    public temperment: number = Monster.TEMPERMENT_AVOID_GRAPPLES;

    //Used for special attacks.
    public special1: Function = null;
    public special2: Function = null;
    public special3: Function = null;

    //he
    public pronoun1: string = "";
    public get Pronoun1(): string {
        if (this.pronoun1 == "") return "";
        return this.pronoun1.substr(0, 1).toUpperCase() + this.pronoun1.substr(1);
    }
    //him
    public pronoun2: string = "";
    public get Pronoun2(): string {
        if (this.pronoun2 == "") return "";
        return this.pronoun2.substr(0, 1).toUpperCase() + this.pronoun2.substr(1);
    }
    //3: Possessive his
    public pronoun3: string = "";
    public get Pronoun3(): string {
        if (this.pronoun3 == "") return "";
        return this.pronoun3.substr(0, 1).toUpperCase() + this.pronoun3.substr(1);
    }

    private _drop: ChainedDrop = new ChainedDrop();
    public get drop(): ChainedDrop { return this._drop; }
    public set drop(value: ChainedDrop): void {
        this._drop = value;
    }

    public eMaxHP(): number {
        return this.stats.tou * 2 + 50 + this.bonusHP;
    }

    public addHP(hp: number): void {
        this.stats.HP += hp;
        if (this.stats.HP < 0) this.stats.HP = 0;
        else if (this.stats.HP > this.eMaxHP()) this.stats.HP = this.eMaxHP();
    }

    /**
     * @return HP/eMaxHP()
     */
    public HPRatio(): number {
        return this.stats.HP / this.eMaxHP();
    }

    /**
     * @return damage not reduced by player stats
     */
    public eBaseDamage(): number {
        return this.stats.str + this.inventory.weapon.attack;
    }

    /**
     * @return Utils.randomized damage reduced by player stats
     */
    public calcDamage(player: Player): number {
        return player.reduceDamage(this.eBaseDamage());
    }

    protected totalXP(player: Player, playerLevel: number = -1): number {
        if (playerLevel == -1) playerLevel = player.stats.level;
        //
        // 1) Nerf xp gains by 20% per level after first two level difference
        // 2) No bonuses for underlevel!
        // 3) Super high level folks (over 10 levels) only get 1 xp!
        let difference: number = playerLevel - this.stats.level;
        if (difference <= 2) difference = 0;
        else difference -= 2;
        if (difference > 4) difference = 4;
        difference = (5 - difference) * 20.0 / 100.0;
        if (playerLevel - this.stats.level > 10) return 1;
        return Math.round(this.stats.additionalXP + (this.baseXP() + this.bonusXP()) * difference);
    }
    protected baseXP(): number {
        return [200, 10, 20, 30, 40, 50, 55, 60, 66, 75,//0-9
            83, 85, 92, 100, 107, 115, 118, 121, 128, 135,//10-19
            145][Math.round(this.stats.level)] || 200;
    }
    protected bonusXP(): number {
        return Utils.rand([200, 10, 20, 30, 40, 50, 55, 58, 66, 75,
            83, 85, 85, 86, 92, 94, 96, 98, 99, 101,
            107][Math.round(this.stats.level)] || 130);
    }

    public constructor(monsterType: MonsterType) {
        super();
        this.type = monsterType;
        // trace("Generic Monster Constructor!");

        //// INSTRUCTIONS
        //// Copy-paste remaining code to the new monster ructor
        //// Uncomment and replace placeholder values with your own
        //// See existing monsters for examples

        // super(mainClassPtr);

        //// INIITIALIZERS
        //// If you want to skip something that is REQUIRED, you shoud set corresponding
        //// this.initedXXX property to true, e.g. this.initedGenitals = true;

        //// 1. Names and this.plural/singular
        ///*REQUIRED*/ this.a = "a";
        ///*REQUIRED*/ this.short = "this.short";
        ///*OPTIONAL*/ // this.imageName = "imageName"; // default ""
        ///*REQUIRED*/ this.long = "long";
        ///*OPTIONAL*/ //this.plural = true|false; // default false

        //// 2. Gender, genitals, and this.pronouns (also see "note for 2." below)
        //// 2.1. Male
        ///*REQUIRED*/ this.createCock(length,thickness,type); // defaults 5.5,1,human; could be called multiple times
        ///*OPTIONAL*/ //this.balls = numberOfBalls; // default 0
        ///*OPTIONAL*/ //this.ballSize = ; // default 0. should be set if balls>0
        ///*OPTIONAL*/ //this.cumMultiplier = ; // default 1
        ///*OPTIONAL*/ //this.hoursSinceCum = ; // default 0
        //// 2.2. Female
        ///*REQUIRED*/ this.createVagina(virgin=true|false,VAGINA_WETNESS.,VAGINA_LOOSENESS.); // default true,normal,tight
        ///*OPTIONAL*/ //this.statusAffects.add(new StatusAffect("BonusVCapacity", bonus, 0, 0, 0)));
        //// 2.3. Hermaphrodite
        //// Just create cocks and vaginas. Last call determines this.pronouns.
        //// 2.4. Genderless
        ///*REQUIRED*/ initGenderless(); // this functions removes genitals!

        //// Note for 2.: during initialization this.pronouns are set in:
        //// * createCock: he/him/his
        //// * createVagina: she/her/her
        //// * initGenderless: it/it/its
        //// If this.plural=true, they are replaced with: they/them/their
        //// If you want to customize this.pronouns:
        ///*OPTIONAL*/ //this.pronoun1 = "he";
        ///*OPTIONAL*/ //this.pronoun2 = "him";
        ///*OPTIONAL*/ //this.pronoun3 = "his";
        //// Another note for 2.: gender is automatically calculated in createCock,
        //// createVagina, initGenderless. If you want to change it, set this.gender
        //// after these method calls.

        //// 3. Breasts
        ///*REQUIRED*/ this.createBreastRow(size,nipplesPerBreast); // default 0,1
        //// Repeat for multiple breast rows
        //// You can call just `this.createBreastRow();` for flat breasts
        //// Note useful method: this.createBreastRow(Appearance.breastCupInverse("C")); // "C" -> 3

        //// 4. Ass
        ///*OPTIONAL*/ //this.ass.analLooseness = ANAL_LOOSENESS.; // default TIGHT
        ///*OPTIONAL*/ //this.ass.analWetness = ANAL_WETNESS.; // default DRY
        ///*OPTIONAL*/ //this.statusAffects.add(new StatusAffect("BonusACapacity", bonus, 0, 0, 0)));
        //// 5. Body
        ///*REQUIRED*/ this.tallness = ;
        ///*OPTIONAL*/ //this.hipRating = HIP_RATING.; // default boyish
        ///*OPTIONAL*/ //this.buttRating = BUTT_RATING.; // default buttless
        ///*OPTIONAL*/ //this.lowerBody = LOWER_BODY.; //default human
        ///*OPTIONAL*/ //this.armType = ARM.; // default human

        //// 6. Skin
        ///*OPTIONAL*/ //this.skinTone = "skinTone"; // default "albino"
        ///*OPTIONAL*/ //this.skinType = SKIN.; // default PLAIN
        ///*OPTIONAL*/ //this.skinDesc = "skinDesc"; // default "skin" if this.skinType is not set, else Appearance.DEFAULT_SKIN.DESCS[skinType]
        ///*OPTIONAL*/ //this.skinAdj = "skinAdj"; // default ""

        //// 7. Hair
        ///*OPTIONAL*/ //this.hairColor = ; // default "no"
        ///*OPTIONAL*/ //this.hairLength = ; // default 0
        ///*OPTIONAL*/ //this.hairType = HAIR.; // default NORMAL

        //// 8. Face
        ///*OPTIONAL*/ //this.faceType = FACE.; // default HUMAN
        ///*OPTIONAL*/ //this.earType = EARS.; // default HUMAN
        ///*OPTIONAL*/ //this.tongueType = TONGUE_; // default HUMAN
        ///*OPTIONAL*/ //this.eyeType = EYES.; // default HUMAN

        //// 9. Primary stats.
        ///*REQUIRED*/ initStrTouSpeInte(,,,);
        ///*REQUIRED*/ initLibSensCor(,,);

        //// 10. Weapon
        ///*REQUIRED*/ this.weaponName = "weaponName";
        ///*REQUIRED*/ this.weaponVerb = "weaponVerb";
        ///*OPTIONAL*/ //this.weaponAttack = ; // default 0
        ///*OPTIONAL*/ //this.weaponPerk = "weaponPerk"; // default ""
        ///*OPTIONAL*/ //this.weaponValue = ; // default 0

        //// 11. Armor
        ///*REQUIRED*/ this.armorName = "armorName";
        ///*OPTIONAL*/ //this.armorDef = ; // default 0
        ///*OPTIONAL*/ //this.armorPerk = "armorPerk"; // default ""
        ///*OPTIONAL*/ //this.armorValue = ; // default 0

        //// 12. Combat
        ///*OPTIONAL*/ //this.bonusHP = ; // default 0
        ///*OPTIONAL*/ //this.lust = ; // default 0
        ///*OPTIONAL*/ //this.lustVuln = ; // default 1
        ///*OPTIONAL*/ //this.temperment = TEMPERMENT; // default AVOID_GRAPPLES
        ///*OPTIONAL*/ //this.fatigue = ; // default 0

        //// 13. Level
        ///*REQUIRED*/ this.level = ;
        ///*REQUIRED*/ this.gems = ;
        ///*OPTIONAL*/ //this.additionalXP = ; // default 0

        //// 14. Drop
        //// 14.1. No drop
        ///*REQUIRED*/ this.drop = NO_DROP;
        //// 14.2. Fixed drop
        ///*REQUIRED*/ this.drop = new WeightedDrop(dropItemType);
        //// 14.3. Random weighted drop
        ///*REQUIRED*/ this.drop = new WeightedDrop()...
        //// Append with calls like:
        //// .add(itemType,itemWeight)
        //// .addMany(itemWeight,itemType1,itemType2,...)
        //// Example:
        //// this.drop = new WeightedDrop()
        //// 		.add(A,2)
        //// 		.add(B,10)
        //// 		.add(C,1)
        //// 	will drop B 10 times more often than C, and 5 times more often than A.
        //// 	To be precise, \forall add(A_i,w_i): P(A_i)=w_i/\sum_j w_j
        //// 14.4. Random chained check drop
        ///*REQUIRED*/ this.drop = new ChainedDrop(optional defaultDrop)...
        //// Append with calls like:
        //// .add(itemType,chance)
        //// .elseDrop(defaultDropItem)
        ////
        //// Example 1:
        //// init14ChainedDrop(A)
        //// 		.add(B,0.01)
        //// 		.add(C,0.5)
        //// 	will FIRST check B vs 0.01 chance,
        //// 	if it fails, C vs 0.5 chance,
        //// 	else A
        ////
        //// 	Example 2:
        //// 	init14ChainedDrop()
        //// 		.add(B,0.01)
        //// 		.add(C,0.5)
        //// 		.elseDrop(A)
        //// 	for same result

        //// 15. Special attacks. No need to set them if the monster has custom AI.
        //// Values are either combat event numbers (5000+) or function references
        ///*OPTIONAL*/ //this.special1 = ; //default 0
        ///*OPTIONAL*/ //this.special2 = ; //default 0
        ///*OPTIONAL*/ //this.special3 = ; //default 0

        //// 16. Tail
        ///*OPTIONAL*/ //this.tailType = TAIL.; // default NONE
        ///*OPTIONAL*/ //this.tailVenom = ; // default 0
        ///*OPTIONAL*/ //this.tailRecharge = ; // default 5

        //// 17. Horns
        ///*OPTIONAL*/ //this.hornType = HORNS.; // default NONE
        ///*OPTIONAL*/ //this.horns = numberOfHorns; // default 0

        //// 18. Wings
        ///*OPTIONAL*/ //this.wingType = WING.; // default NONE
        ///*OPTIONAL*/ //this.wingDesc = ; // default Appearance.DEFAULT_WING_DESCS[wingType]

        //// 19. Antennae
        ///*OPTIONAL*/ //this.antennae = ANTENNAE.; // default NONE

        //// REQUIRED !!!
        //// In debug mode will throw an error for uninitialized monster
        //checkMonster();
    }

    /**
     * try to hit, apply damage
     * @return damage
     */
    public eOneAttack(player: Player): number {
        //Determine damage - str modified by enemy toughness!
        let damage: number = this.calcDamage(player);
        if (damage > 0) damage = player.takeDamage(damage);
        return damage;
    }

    /**
     * return true if we land a hit
     */
    protected attackSucceeded(player: Player): boolean {
        let attack: boolean = true;
        //Blind dodge change
        if (this.statusAffects.has("Blind")) {
            attack = attack && this.handleBlind();
        }
        attack = attack && !this.playerDodged(player);
        return attack;
    }

    public eAttack(player: Player): void {
        let attacks: number = this.statusAffects.get("Attacks").value1;
        if (attacks == 0) attacks = 1;
        while (attacks > 0) {
            if (this.attackSucceeded(player)) {
                let damage: number = this.eOneAttack(player);
                this.outputAttack(player, damage);
                this.postAttack(player, damage);
                MainScreen.statScreenRefresh();
                MainScreen.text("\n", false);
            }
            if (this.statusAffects.get("Attacks").value1 >= 0) {
                this.statusAffects.get("Attacks").value1 = -1;
            }
            attacks--;
        }
        this.statusAffects.remove("Attacks");
        //			if (!game.combatRoundOver()) game.doNext(1);
        Game.combatRoundOver(); //The doNext here was not required
    }

    /**
     * Called no matter of success of the attack
     * @param damage damage received by player
     */
    protected postAttack(player: Player, damage: number): void {
        if (damage > 0) {
            if (this.lustVuln > 0 && player.inventory.armor.displayName == "barely-decent bondage straps") {
                if (!this.plural) MainScreen.text("\n" + this.capitalA + this.short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.", false);
                else MainScreen.text("\n" + this.capitalA + this.short + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.", false);
                this.stats.lust += 5 * this.lustVuln;
            }
        }
    }

    public outputAttack(player: Player, damage: number): void {
        if (damage <= 0) {
            //Due to toughness or amor...
            if (Utils.rand(player.inventory.armor.defense + player.stats.tou) < player.inventory.armor.defense)
                MainScreen.text("You absorb and deflect every " + this.inventory.weapon.verb + " with your " + player.inventory.armor.displayName + ".", false);
            else {
                if (this.plural) MainScreen.text("You deflect and block every " + this.inventory.weapon.verb + " " + this.a + this.short + " throw at you.", false);
                else MainScreen.text("You deflect and block every " + this.inventory.weapon.verb + " " + this.a + this.short + " throws at you.", false);
            }
        }
        else if (damage < 6) MainScreen.text("You are struck a glancing blow by " + this.a + this.short + "! (" + damage + ")", false);
        else if (damage < 11) {
            MainScreen.text(this.capitalA + this.short + " wound");
            if (!this.plural) MainScreen.text("s");
            MainScreen.text(" you! (" + damage + ")", false);
        }
        else if (damage < 21) {
            MainScreen.text(this.capitalA + this.short + " stagger");
            if (!this.plural) MainScreen.text("s");
            MainScreen.text(" you with the force of " + this.pronoun3 + " " + this.inventory.weapon.verb + "! (" + damage + ")", false);
        }
        else if (damage > 20) {
            MainScreen.text(this.capitalA + this.short + " <b>mutilate", false);
            if (!this.plural) MainScreen.text("s", false);
            MainScreen.text("</b> you with " + this.pronoun3 + " powerful " + this.inventory.weapon.verb + "! (" + damage + ")", false);
        }
    }

    /**
     * @return true if continue with attack
     */
    protected handleBlind(): boolean {
        if (Utils.rand(3) < 2) {
            if (weaponVerb == "tongue-slap") MainScreen.text(this.capitalA + this.short + " completely misses you with a thrust from " + this.pronoun3 + " tongue!\n", false);
            else MainScreen.text(this.capitalA + this.short + " completely misses you with a blind attack!\n", false);
            return false;
        }
        return true;
    }

    /**
     * print something about how we miss the player
     */
    protected outputPlayerDodged(dodge: number): void {
        if (dodge == 1) MainScreen.text("You narrowly avoid " + this.a + this.short + "'s " + weaponVerb + "!\n", false);
        else if (dodge == 2) MainScreen.text("You dodge " + this.a + this.short + "'s " + weaponVerb + " with superior quickness!\n", false);
        else {
            MainScreen.text("You deftly avoid " + this.a + this.short);
            if (this.plural) MainScreen.text("'");
            else MainScreen.text("'s");
            MainScreen.text(" slow " + weaponVerb + ".\n", false);
        }
    }

    private playerDodged(player: Player): boolean {
        //Determine if dodged!
        let dodge: number = player.stats.speedDodge(this);
        if (dodge > 0) {
            outputPlayerDodged(dodge);
            return true;
        }
        //Determine if evaded
        if (!(this instanceof Kiha) && player.perks.has("Evade") && Utils.rand(100) < 10) {
            MainScreen.text("Using your skills at evading attacks, you anticipate and sidestep " + this.a + this.short + "'");
            if (!this.plural) MainScreen.text("s");
            MainScreen.text(" attack.\n", false);
            return true;
        }
        //("Misdirection"
        if (player.perks.has("Misdirection") && Utils.rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
            MainScreen.text("Using Raphael's teachings, you anticipate and sidestep " + this.a + this.short + "' attacks.\n", false);
            return true;
        }
        //Determine if cat'ed
        if (player.perks.has("Flexibility") && Utils.rand(100) < 6) {
            MainScreen.text("With your incredible flexibility, you squeeze out of the way of " + this.a + this.short + "", false);
            if (this.plural) MainScreen.text("' attacks.\n", false);
            else MainScreen.text("'s attack.\n", false);
            return true;
        }
        return false;
    }

    public doAI(player: Player): void {
        if (this.statusAffects.has("Stunned")) {
            if (!this.handleStun()) return;
        }
        if (this.statusAffects.has("Fear")) {
            if (!this.handleFear()) return;
        }
        //Exgartuan gets to do stuff!
        if (player.statusAffects.has("Exgartuan") && player.statusAffects.get("Exgartuan").value2 == 0 && Utils.rand(3) == 0) {
            if (Game.exgartuan.exgartuanCombatUpdate()) MainScreen.text("\n\n", false);
        }
        if (this.statusAffects.has("Constricted")) {
            if (!this.handleConstricted()) return;
        }
        //If grappling... TODO implement grappling
        //			if (game.gameState == 2) {
        //				game.gameState = 1;
        //temperment - used for determining grapple behaviors
        //0 - avoid grapples/break grapple
        //1 - lust determines > 50 grapple
        //2 - Utils.random
        //3 - love grapples
        /*
         //		if(temperment == 0) eGrappleRetreat();
         if (temperment == 1) {
         //			if(lust < 50) eGrappleRetreat();
         mainClassPtr.doNext(3);
         return;
         }
         mainClassPtr.MainScreen.text("Lust Placeholder!!", false);
         mainClassPtr.doNext(3);
         return;*/
        //			}
        this.performCombatAction();
    }

    /**
     * Called if monster is ricted. Should return true if riction is ignored and need to proceed with ai
     */
    protected handleConstricted(): boolean {
        //Enemy struggles -
        MainScreen.text("Your prey pushes at your tail, twisting and writhing in an effort to escape from your tail's tight bonds.", false);
        if (this.statusAffects.get("Constricted").value1 <= 0) {
            MainScreen.text("  " + this.capitalA + this.short + " proves to be too much for your tail to handle, breaking free of your tightly bound coils.", false);
            this.statusAffects.remove("Constricted");
        }
        this.statusAffects.get("Constricted").value1 = -1;
        Game.combatRoundOver();
        return false;
    }

    /**
     * Called if monster is under fear. Should return true if fear ignored and need to proceed with ai
     */
    protected handleFear(): boolean {
        if (this.statusAffects.get("Fear").value1 == 0) {
            if (this.plural) {
                this.statusAffects.remove("Fear");
                MainScreen.text("Your foes shake free of their fear and ready themselves for battle.", false);
            }
            else {
                this.statusAffects.remove("Fear");
                MainScreen.text("Your foe shakes free of its fear and readies itself for battle.", false);
            }
        }
        else {
            this.statusAffects.get("Fear").value1 = -1;
            if (this.plural) MainScreen.text(this.capitalA + this.short + " are too busy shivering with fear to fight.", false);
            else MainScreen.text(this.capitalA + this.short + " is too busy shivering with fear to fight.", false);
        }
        Game.combatRoundOver();
        return false;
    }

    /**
     * Called if monster is stunned. Should return true if stun is ignored and need to proceed with ai.
     */
    protected handleStun(): boolean {
        if (this.plural) MainScreen.text("Your foes are too dazed from your last hit to strike back!", false);
        else MainScreen.text("Your foe is too dazed from your last hit to strike back!", false);
        if (this.statusAffects.get("Stunned").value1 <= 0) this.statusAffects.remove("Stunned");
        else this.statusAffects.get("Stunned").value1 = -1;
        Game.combatRoundOver();
        return false;
    }

    /**
     * This method is called after all stun/fear/ricted checks.
     * Default: Equal chance to do physical or special (if any) attack
     */
    protected performCombatAction(): void {
        let actions: Function[] = [this.eAttack, this.special1, this.special2, this.special3].filter(
            function (special: Function, idx: number, array: Function[]): boolean {
                return special != null;
            }
        );
        let randomNumber: number = Math.floor(Math.random() * (actions.length));
        actions[randomNumber]();
    }

    /**
     * All branches of this method and all subsequent scenes should end either with
     * 'cleanupAfterCombat', 'awardPlayer' or 'finishCombat'. The latter also displays
     * default message like "you defeat %s" or "%s falls and starts masturbating"
     */
    public defeated(hpVictory: boolean): void {
        Game.finishCombat();
    }

    /**
     * All branches of this method and all subsequent scenes should end with
     * 'cleanupAfterCombat'.
     */
    public won(player: Player, hpVictory: boolean, pcCameWorms: boolean): void {
        if (hpVictory) {
            player.stats.HP = 1;
            MainScreen.text("Your wounds are too great to bear, and you fall unconscious.", true);
        } else {
            MainScreen.text("Your desire reaches uncontrollable levels, and you end up openly masturbating.\n\nThe lust and pleasure cause you to black out for hours on end.", true);
            player.stats.lust = 0;
        }
        Game.inCombat = false;
        Game.clearStatuses(false);
        let temp: number = Utils.rand(10) + 1;
        if (temp > player.stats.gems) temp = player.stats.gems;
        MainScreen.text("\n\nYou'll probably wake up in eight hours or so, missing " + temp + " gems.", false);
        player.stats.gems -= temp;
        MainScreen.doNext(Game.camp.returnToCampUseEightHours);
    }

    /**
     * Function(hpVictory) to call INSTEAD of default defeated(). Call it or finishCombat() manually
     */
    public onDefeated: Function = null;
    /**
     * Function(hpVictory,pcCameWorms) to call INSTEAD of default won(). Call it or finishCombat() manually
     */
    public onWon: Function = null;
    /**
     * Function() to call INSTEAD of common run attempt. Call runAway(false) to perform default run attempt
     */
    public onPcRunAttempt: Function = null;

    /**
     * Final method to handle hooks before calling overriden method
     */
    export defeated_(hpVictory: boolean): void {
        if (this.onDefeated != null) this.onDefeated(hpVictory);
        else this.defeated(hpVictory);
    }

    /**
     * Final method to handle hooks before calling overriden method
     */
    export won_(player: Player, hpVictory: boolean, pcCameWorms: boolean): void {
        if (this.onWon != null) this.onWon(hpVictory, pcCameWorms);
        else this.won(player, hpVictory, pcCameWorms);
    }

    /**
     * Display tease reaction message. Then call applyTease() to increase lust.
     * @param lustDelta value to be added to lust (already modified by lustVuln etc)
     */
    public teased(lustDelta: number): void {
        this.outputDefaultTeaseReaction(lustDelta);
        if (lustDelta > 0) {
            //Imp mob uber interrupt!
            if (this.statusAffects.has("ImpUber")) { // TODO move to proper class
                MainScreen.text("\nThe imps in the back stumble over their spell, their loincloths tenting obviously as your display interrupts their casting.  One of them spontaneously orgasms, having managed to have his spell backfire.  He falls over, weakly twitching as a growing puddle of whiteness surrounds his defeated form.", false);
                //(-5% of max enemy HP)
                this.stats.HP -= this.bonusHP * .05;
                this.stats.lust -= 15;
                this.statusAffects.remove("ImpUber");
                this.statusAffects.add(new StatusAffect("ImpSkip", 0, 0, 0, 0)));
            }
        }
        this.applyTease(lustDelta);
    }

    protected outputDefaultTeaseReaction(lustDelta: number): void {
        if (this.plural) {
            if (lustDelta == 0) MainScreen.text("\n\n" + this.capitalA + this.short + " seem unimpressed.", false);
            if (lustDelta > 0 && lustDelta < 4) MainScreen.text("\n" + this.capitalA + this.short + " look intrigued by what " + this.pronoun1 + " see.", false);
            if (lustDelta >= 4 && lustDelta < 10) MainScreen.text("\n" + this.capitalA + this.short + " definitely seem to be enjoying the show.", false);
            if (lustDelta >= 10 && lustDelta < 15) MainScreen.text("\n" + this.capitalA + this.short + " openly stroke " + this.pronoun2 + "selves as " + this.pronoun1 + " watch you.", false);
            if (lustDelta >= 15 && lustDelta < 20) MainScreen.text("\n" + this.capitalA + this.short + " flush hotly with desire, " + this.pronoun3 + " eyes filled with longing.", false);
            if (lustDelta >= 20) MainScreen.text("\n" + this.capitalA + this.short + " lick " + this.pronoun3 + " lips in anticipation, " + this.pronoun3 + " hands idly stroking " + this.pronoun3 + " bodies.", false);
        }
        else {
            if (lustDelta == 0) MainScreen.text("\n" + this.capitalA + this.short + " seems unimpressed.", false);
            if (lustDelta > 0 && lustDelta < 4) {
                if (this.plural) MainScreen.text("\n" + this.capitalA + this.short + " looks intrigued by what " + this.pronoun1 + " see.", false);
                else MainScreen.text("\n" + this.capitalA + this.short + " looks intrigued by what " + this.pronoun1 + " sees.", false);
            }
            if (lustDelta >= 4 && lustDelta < 10) MainScreen.text("\n" + this.capitalA + this.short + " definitely seems to be enjoying the show.", false);
            if (lustDelta >= 10 && lustDelta < 15) {
                if (this.plural) MainScreen.text("\n" + this.capitalA + this.short + " openly strokes " + this.pronoun2 + "selves as " + this.pronoun1 + " watch you.", false);
                else MainScreen.text("\n" + this.capitalA + this.short + " openly strokes " + this.pronoun2 + "self as " + this.pronoun1 + " watches you.", false);
            }
            if (lustDelta >= 15 && lustDelta < 20) {
                if (this.plural) MainScreen.text("\n" + this.capitalA + this.short + " flush hotly with desire, " + this.pronoun3 + " eyes filling with longing.", false);
                else MainScreen.text("\n" + this.capitalA + this.short + " flushes hotly with desire, " + this.pronoun3 + " eyes filled with longing.", false);
            }
            if (lustDelta >= 20) {
                if (this.plural) MainScreen.text("\n" + this.capitalA + this.short + " licks " + this.pronoun3 + " lips in anticipation, " + this.pronoun3 + " hands idly stroking " + this.pronoun3 + " own bodies.", false);
                else MainScreen.text("\n" + this.capitalA + this.short + " licks " + this.pronoun3 + " lips in anticipation, " + this.pronoun3 + " hands idly stroking " + this.pronoun3 + " own body.", false);
            }
        }
    }

    protected applyTease(lustDelta: number): void {
        this.stats.lust += lustDelta;
        lustDelta = Math.round(lustDelta * 10) / 10;
        MainScreen.text(" (" + lustDelta + ")", false);
    }
    /*
    public generateDebugDescription(): string {
        let result: string;
        let be: string = this.plural ? "are" : "is";
        let have: string = this.plural ? "have" : "has";
        let Heis: string = Pronoun1 + " " + be + " ";
        let Hehas: string = Pronoun1 + " " + have + " ";
        result = "You are inspecting " + this.a + this.short + " (imageName='" + imageName + "', class='" + getQualifiedClassName(this) + "'). You are fighting " + this.pronoun2 + ".\n\n";
        result += Heis + (Appearance.DEFAULT_GENDER.NAMES[gender] || ("gender#" + gender)) +
            " with " + Appearance.numberOfThings(cocks.length, "cock") +
            ", " + Appearance.numberOfThings(vaginas.length, "vagina") +
            " and " + Appearance.numberOfThings(breastRows.length, "breast row") + ".\n\n";
        // APPEARANCE
        result += Heis + Appearance.inchesAndFeetsAndInches(tallness) + " tall with " +
            Appearance.describeByScale(hipRating, Appearance.DEFAULT_HIP_RATING.SCALES, "thinner than", "wider than") + " hips and " +
            Appearance.describeByScale(buttRating, Appearance.DEFAULT_BUTT_RATING.SCALES, "thinner than", "wider than") + " butt.\n";
        result += Pronoun3 + " lower body is " + (Appearance.DEFAULT_LOWER_BODY.NAMES[lowerBody] || ("lowerBody#" + lowerBody));
        result += ", " + this.pronoun3 + " arms are " + (Appearance.DEFAULT_ARM_NAMES[armType] || ("armType#" + armType));
        result += ", " + this.pronoun1 + " " + have + " " + skinTone + " " + skinAdj + " " + skinDesc + " (type " + (Appearance.DEFAULT_SKIN.NAMES[skinType] || ("skinType#" + skinType)) + ").\n";
        result += Hehas;
        if (hairLength > 0) {
            result += hairColor + " " + Appearance.inchesAndFeetsAndInches(hairLength) + " long " + (Appearance.DEFAULT_HAIR.NAMES[hairType] || ("hairType#" + hairType)) + " hair.\n";
        } else {
            result += "no hair.\n";
        }
        result += Hehas
            + (Appearance.DEFAULT_FACE.NAMES[faceType] || ("faceType#" + faceType)) + " face, "
            + (Appearance.DEFAULT_EARS.NAMES[earType] || ("earType#" + earType)) + " ears, "
            + (Appearance.DEFAULT_TONGUE_NAMES[tongueType] || ("tongueType#" + tongueType)) + " tongue and "
            + (Appearance.DEFAULT_EYES.NAMES[eyeType] || ("eyeType#" + eyeType)) + " eyes.\n";
        result += Hehas;
        if (tailType == TAIL.NONE) result += "no tail, ";
        else result += (Appearance.DEFAULT_TAIL_NAMES[tailType] || ("tailType#" + tailType)) + " tail with venom=" + tailVenom + " and recharge=" + tailRecharge + ", ";
        if (hornType == HORNS.NONE) result += "no horns, ";
        else result += horns + " " + (Appearance.DEFAULT_HORNS.NAMES[hornType] || ("hornType#" + hornType)) + " horns, ";
        if (wingType == WING.NONE) result += "no wings, ";
        else result += wingDesc + " wings (type " + (Appearance.DEFAULT_WING_NAMES[wingType] || ("wingType#" + wingType)) + "), ";
        if (antennae == ANTENNAE.NONE) result += "no antennae.\n\n";
        else result += (Appearance.DEFAULT_ANTENNAE.NAMES[antennae] || ("antennaeType#" + antennae)) + " antennae.\n\n";

        // GENITALS AND BREASTS
        for (let i: number = 0; i < cocks.length; i++) {
            let cock: Cock = (cocks[i] as Cock);
            result += Pronoun3 + (i > 0 ? (" #" + (i + 1)) : "") + " " + cock.cockType.toString().toLowerCase() + " cock is ";
            result += Appearance.inchesAndFeetsAndInches(cock.cockLength) + " long and " + cock.cockThickness + "\" thick";
            if (cock.isPierced) result += ", pierced with " + cock.pLongDesc;
            if (cock.knotMultiplier != 1) result += ", with knot of size " + cock.knotMultiplier;
            result += ".\n";
        }
        if (balls > 0 || ballSize > 0) result += Hehas + Appearance.numberOfThings(balls, "ball") + " of size " + ballSize + ".\n";
        if (cumMultiplier != 1 || cocks.length > 0) result += Pronoun1 + " " + have + " cum multiplier " + cumMultiplier + ". ";
        if (hoursSinceCum > 0 || cocks.length > 0) result += "It were " + hoursSinceCum + " hours since " + this.pronoun1 + " came.\n\n";
        for (i = 0; i < vaginas.length; i++) {
            let vagina: VaginaClass = (vaginas[i] as VaginaClass);
            result += Pronoun3 + (i > 0 ? (" #" + (i + 1)) : "") + " " + (Appearance.DEFAULT_VAGINA.NAMES[vagina.type] || ("vaginaType#" + vagina.type)) + (vagina.virgin ? " " : " non-") + "virgin vagina is ";
            result += Appearance.describeByScale(vagina.vaginalLooseness, Appearance.DEFAULT_VAGINA_LOOSENESS.SCALES, "tighter than", "looser than");
            result += ", " + Appearance.describeByScale(vagina.vaginalWetness, Appearance.DEFAULT_VAGINA_WETNESS.SCALES, "drier than", "wetter than");
            if (vagina.labiaPierced) result += ". Labia are pierced with " + vagina.labiaPLong;
            if (vagina.clitPierced) result += ". Clit is pierced with " + vagina.clitPLong;
            if (this.statusAffects.get("BonusVCapacity").value1 > 0) {
                result += "; vaginal capacity is increased by " + this.statusAffects.get("BonusVCapacity").value1;
            }
            result += ".\n";
        }
        if (breastRows.length > 0) {
            let nipple: string = nippleLength + "\" ";
            if (nipplesPierced) nipple += "pierced by " + nipplesPLong;
            for (i = 0; i < breastRows.length; i++) {
                let row: BreastRowClass = (breastRows[i] as BreastRowClass);
                result += Pronoun3 + (i > 0 ? (" #" + (i + 1)) : "") + " breast row has " + row.breasts;
                result += " " + row.breastRating.toFixed(2) + "-size (" + Appearance.breastCup(row.breastRating) + ") breasts with ";
                result += Appearance.numberOfThings(row.nipplesPerBreast, nipple + (row.fuckable ? "fuckable nipple" : "unfuckable nipple")) + " on each.\n";
            }
        }
        result += Pronoun3 + " ass is " + Appearance.describeByScale(ass.analLooseness, Appearance.DEFAULT_ANAL_LOOSENESS.SCALES, "tighter than", "looser than") + ", " + Appearance.describeByScale(ass.analWetness, Appearance.DEFAULT_ANAL_WETNESS.SCALES, "drier than", "wetter than");
        if (this.statusAffects.get("BonusACapacity").value1 > 0) {
            result += "; anal capacity is increased by " + this.statusAffects.get("BonusACapacity").value1;
        }
        result += ".\n\n";

        // COMBAT AND OTHER STATS
        result += Hehas + "str=" + str + ", tou=" + tou + ", spe=" + spe + ", inte=" + inte + ", lib=" + lib + ", sens=" + sens + ", cor=" + cor + ".\n";
        result += Pronoun1 + " can " + weaponVerb + " you with  " + weaponPerk + " " + weaponName + " (attack " + weaponAttack + ", value " + weaponValue + ").\n";
        result += Pronoun1 + " is guarded with " + armorPerk + " " + armorName + " (defense " + armorDef + ", value " + armorValue + ").\n";
        result += Hehas + HP + "/" + eMaxHP() + " HP, " + lust + "/100 lust, " + fatigue + "/100 fatigue. " + Pronoun3 + " bonus HP=" + bonusHP + ", and lust vulnerability=" + lustVuln + ".\n";
        result += Heis + "level " + level + " and " + have + " " + gems + " gems. You will be awarded " + XP + " XP.\n";

        let numSpec: number = (special1 != null ? 1 : 0) + (special2 != null ? 1 : 0) + (special3 != null ? 1 : 0);
        if (numSpec > 0) {
            result += Hehas + numSpec + " special attack" + (numSpec > 1 ? "s" : "") + ".\n";
        }
        else {
            result += Hehas + "no special attacks.\n";
        }

        return result;
    }
    */

    public dropLoot(): Item {
        return this._drop.roll() as Item;
    }

    public combatRoundUpdate(player: Player): void {
        if (this.statusAffects.has("MilkyUrta")) {
            Game.sceneManager.urtaQuest.milkyUrtaTic();
        }
        //Countdown
        if (this.statusAffects.has("TentacleCoolDown")) {
            this.statusAffects.get("TentacleCoolDown").value1 -= 1;
            if (this.statusAffects.get("TentacleCoolDown").value1 == 0) {
                this.statusAffects.remove("TentacleCoolDown");
            }
        }
        if (this.statusAffects.has("CoonWhip")) {
            if (this.statusAffects.get("CoonWhip").value2 <= 0) {


                // the heck is this. you cant modify defense on an armor item


                this.inventory.armor.defense += this.statusAffects.get("CoonWhip").value1;


                //


                MainScreen.text("<b>Tail whip wears off!</b>\n\n");
                this.statusAffects.remove("CoonWhip");
            }
            else {
                this.statusAffects.get("CoonWhip").value2 -= 1;
                MainScreen.text("<b>Tail whip is currently reducing your foe");
                if (this.plural) MainScreen.text("s'");
                else MainScreen.text("'s");
                MainScreen.text(" armor by " + this.statusAffects.get("CoonWhip").value1 + ".</b>\n\n")
            }
        }
        if (this.statusAffects.has("Blind")) {
            this.statusAffects.get("Blind").value1 -= 1;
            if (this.statusAffects.get("Blind").value1 <= 0) {
                MainScreen.text("<b>" + this.capitalA + this.short + (this.plural ? " are" : " is") + " no longer blind!</b>\n\n", false);
                this.statusAffects.remove("Blind");
            }
            else MainScreen.text("<b>" + this.capitalA + this.short + (this.plural ? " are" : " is") + " currently blind!</b>\n\n", false);
        }
        if (this.statusAffects.has("Earthshield")) {
            MainScreen.text("<b>" + this.capitalA + this.short + " is protected by a shield of rocks!</b>\n\n");
        }
        if (this.statusAffects.has("Sandstorm")) {
            //Blinded:
            if (player.statusAffects.has("Blind")) {
                MainScreen.text("<b>You blink the sand from your eyes, but you're sure that more will get you if you don't end it soon!</b>\n\n");
                player.statusAffects.remove("Blind");
            }
            else {
                if (this.statusAffects.get("Sandstorm").value1 == 0 || this.statusAffects.get("Sandstorm").value1 % 4 == 0) {
                    player.statusAffects.add(new StatusAffect("Blind", 0, 0, 0, 0)));
                    MainScreen.text("<b>The sand is in your eyes!  You're blinded this turn!</b>\n\n");
                }
                else {
                    MainScreen.text("<b>The grainy mess cuts at any exposed flesh and gets into every crack and crevice of your armor.");
                    let temp: number = player.takeDamage(1 + Utils.rand(2));
                    MainScreen.text(" (" + temp + ")");
                    MainScreen.text("</b>\n\n");
                }
            }
            this.statusAffects.get("Sandstorm").value1 += 1;
        }
        if (this.statusAffects.has("Stunned")) {
            MainScreen.text("<b>" + this.capitalA + this.short + " is still stunned!</b>\n\n", false);
        }
        if (this.statusAffects.has("Shell")) {
            if (this.statusAffects.get("Shell").value1 >= 0) {
                MainScreen.text("<b>A wall of many hues shimmers around " + this.a + this.short + ".</b>\n\n");
                this.statusAffects.get("Shell").value1 -= 1;
            }
            else {
                MainScreen.text("<b>The magical barrier " + this.a + this.short + " erected fades away to nothing at last.</b>\n\n");
                this.statusAffects.remove("Shell");
            }
        }
        if (this.statusAffects.has("IzmaBleed")) {
            //Countdown to heal
            this.statusAffects.get("IzmaBleed").value1 -= 1;
            //Heal wounds
            if (this.statusAffects.get("IzmaBleed").value1 <= 0) {
                MainScreen.text("The wounds you left on " + this.a + this.short + " stop bleeding so profusely.\n\n", false);
                this.statusAffects.remove("IzmaBleed");
            }
            //Deal damage if still wounded.
            else {
                let store: number = this.eMaxHP() * (3 + Utils.rand(4)) / 100;
                store = Game.doDamage(store);
                if (this.plural) MainScreen.text(this.capitalA + this.short + " bleed profusely from the jagged wounds your weapon left behind. (" + store + ")\n\n", false);
                else MainScreen.text(this.capitalA + this.short + " bleeds profusely from the jagged wounds your weapon left behind. (" + store + ")\n\n", false);
            }
        }
        if (this.statusAffects.has("Timer")) {
            if (this.statusAffects.get("Timer").value1 <= 0)
                this.statusAffects.remove("Timer");
            this.statusAffects.get("Timer").value1 -= 1;
        }
        if (this.statusAffects.has("LustStick")) {
            //LoT Effect Messages:
            switch (this.statusAffects.get("LustStick").value1) {
                //First:
                case 1:
                    if (this.plural) MainScreen.text("One of " + this.a + this.short + " pants and crosses " + GenderDescriptor.mf(this, "his", "her") + " eyes for a moment.  " + GenderDescriptor.mf(this, "His", "Her") + " dick flexes and bulges, twitching as " + GenderDescriptor.mf(this, "he", "she") + " loses himself in a lipstick-fueled fantasy.  When " + GenderDescriptor.mf(this, "he", "she") + " recovers, you lick your lips and watch " + GenderDescriptor.mf(this, "his", "her") + " blush spread.\n\n", false);
                    else MainScreen.text(this.capitalA + this.short + " pants and crosses " + this.pronoun3 + " eyes for a moment.  " + GenderDescriptor.mf(this, "His", "Her") + " dick flexes and bulges, twitching as " + this.pronoun1 + " loses " + GenderDescriptor.mf(this, "himself", "herself") + " in a lipstick-fueled fantasy.  When " + this.pronoun1 + " recovers, you lick your lips and watch " + GenderDescriptor.mf(this, "his", "her") + " blush spread.\n\n", false);
                    break;
                //Second:
                case 2:
                    if (this.plural) MainScreen.text(this.capitalA + this.short + " moan out loud, " + this.pronoun3 + " dicks leaking and dribbling while " + this.pronoun1 + " struggle not to touch " + this.pronoun2 + ".\n\n", false);
                    else MainScreen.text(this.capitalA + this.short + " moans out loud, " + this.pronoun3 + " dick leaking and dribbling while " + this.pronoun1 + " struggles not to touch it.\n\n", false);
                    break;
                //Third:
                case 3:
                    if (this.plural) MainScreen.text(this.capitalA + this.short + " pump " + this.pronoun3 + " hips futilely, air-humping non-existent partners.  Clearly your lipstick is getting to " + this.pronoun2 + ".\n\n", false);
                    else MainScreen.text(this.capitalA + this.short + " pumps " + this.pronoun3 + " hips futilely, air-humping a non-existent partner.  Clearly your lipstick is getting to " + this.pronoun2 + ".\n\n", false);
                    break;
                //Fourth:
                case 4:
                    if (this.plural) MainScreen.text(this.capitalA + this.short + " close " + this.pronoun3 + " eyes and grunt, " + this.pronoun3 + " cocks twitching, bouncing, and leaking pre-cum.\n\n", false);
                    else MainScreen.text(this.capitalA + this.short + " closes " + this.pronoun2 + " eyes and grunts, " + this.pronoun3 + " cock twitching, bouncing, and leaking pre-cum.\n\n", false);
                    break;
                //Fifth and repeat:
                default:
                    if (this.plural) MainScreen.text("Drops of pre-cum roll steadily out of their dicks.  It's a marvel " + this.pronoun1 + " haven't given in to " + this.pronoun3 + " lusts yet.\n\n", false);
                    else MainScreen.text("Drops of pre-cum roll steadily out of " + this.a + this.short + "'s dick.  It's a marvel " + this.pronoun1 + " hasn't given in to " + this.pronoun3 + " lust yet.\n\n", false);
                    break;
            }
            this.statusAffects.get("LustStick").value1 += 1;
            //Damage = 5 + bonus score minus
            //Reduced by lust vuln of course
            this.stats.lust += Math.round(this.lustVuln * (5 + this.statusAffects.get("LustStick").value2));
        }
        if (this.statusAffects.has("PCTailTangle")) {
            //when Entwined
            MainScreen.text("You are bound tightly in the kitsune's tails.  <b>The only thing you can do is try to struggle free!</b>\n\n");
            MainScreen.text("Stimulated by the coils of fur, you find yourself growing more and more aroused...\n\n");
            player.stats.lust += 5 + player.stats.sens / 10;
        }
        if (this.statusAffects.has("QueenBind")) {
            MainScreen.text("You're utterly restrained by the Harpy Queen's magical ropes!\n\n");
            if (Flags.get(FlagEnum.PC_FETISH) >= 2)
                player.stats.lust += 3;
        }
        if (this instanceof SecretarialSuccubus || this instanceof MilkySuccubus) {
            if (player.stats.lust < 45) MainScreen.text("There is something in the air around your opponent that makes you feel warm.\n\n", false);
            if (player.stats.lust >= 45 && player.stats.lust < 70) MainScreen.text("You aren't sure why but you have difficulty keeping your eyes off your opponent's lewd form.\n\n", false);
            if (player.stats.lust >= 70 && player.stats.lust < 90) MainScreen.text("You blush when you catch yourself staring at your foe's rack, watching it wobble with every step she takes.\n\n", false);
            if (player.stats.lust >= 90) MainScreen.text("You have trouble keeping your greedy hands away from your groin.  It would be so easy to just lay down and masturbate to the sight of your curvy enemy.  The succubus looks at you with a sexy, knowing expression.\n\n", false);
            player.stats.lust += 1 + Utils.rand(8);
        }
        //[LUST GAINED PER ROUND] - Omnibus
        if (this.statusAffects.has("LustAura")) {
            if (player.stats.lust < 33) MainScreen.text("Your groin tingles warmly.  The demon's aura is starting to get to you.\n\n", false);
            if (player.stats.lust >= 33 && player.stats.lust < 66) MainScreen.text("You blush as the demon's aura seeps into you, arousing you more and more.\n\n", false);
            if (player.stats.lust >= 66) {
                MainScreen.text("You flush bright red with desire as the lust in the air worms its way inside you.  ", false);
                let randomNumber = Utils.rand(4);
                if (randomNumber == 0) MainScreen.text("You have a hard time not dropping to your knees to service her right now.\n\n", false);
                if (randomNumber == 2) MainScreen.text("The urge to bury your face in her breasts and suckle her pink nipples nearly overwhelms you.\n\n", false);
                if (randomNumber == 1) MainScreen.text("You swoon and lick your lips, tasting the scent of the demon's pussy in the air.\n\n", false);
                if (randomNumber == 3) MainScreen.text("She winks at you and licks her lips, and you can't help but imagine her tongue sliding all over your body.  You regain composure moments before throwing yourself at her.  That was close.\n\n", false);
            }
            player.stats.lust += 3 + Math.floor(player.stats.lib / 20 + player.stats.cor / 30);
        }
    }

    public handleAwardItemText(item: Item): void { //New Function, override this function in child classes if you want a monster to output special item drop text
        if (item != null) MainScreen.text("\nThere is " + item.longName + " on your defeated opponent.  ");
    }

    public handleAwardText(): void { //New Function, override this function in child classes if you want a monster to output special gem and XP text
        //This function doesn’t add the gems or XP to the player, it just provides the output text
        if (this.stats.gems == 1) MainScreen.text("\n\nYou snag a single gem and " + this.stats.XP + " XP as you walk away from your victory.");
        else if (this.stats.gems > 1) MainScreen.text("\n\nYou grab " + this.stats.gems + " gems and " + this.stats.XP + " XP from your victory.");
        else if (this.stats.gems == 0) MainScreen.text("\n\nYou gain " + this.stats.XP + " XP from the battle.");
    }

    public handleCombatLossText(player: Player, inDungeon: boolean, gemsLost: number): number { //New Function, override this function in child classes if you want a monster to output special text after the player loses in combat
        //This function doesn’t take the gems away from the player, it just provides the output text
        if (!inDungeon) {
            MainScreen.text("\n\nYou'll probably come to your senses in eight hours or so");
            if (player.stats.gems > 1)
                MainScreen.text(", missing " + gemsLost + " gems.");
            else if (player.stats.gems == 1)
                MainScreen.text(", missing your only gem.");
            else MainScreen.text(".");
        }
        else {
            MainScreen.text("\n\nSomehow you came out of that alive");
            if (player.stats.gems > 1)
                MainScreen.text(", but after checking your gem pouch, you realize you're missing " + gemsLost + " gems.");
            else if (player.stats.gems == 1)
                MainScreen.text(", but after checking your gem pouch, you realize you're missing your only gem.");
            else MainScreen.text(".");
        }
        return 8; //This allows different monsters to delay the player by different amounts of time after a combat loss. Normal loss causes an eight hour blackout
    }

}
}