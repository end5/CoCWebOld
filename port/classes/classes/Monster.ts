﻿import { Creature } from './Creature';

/**
 * ...
 * @author Yoffy, Fake-Name, aimozg
 */
export class Monster extends Creature {

    protected get player(): Player {
        return game.player;
    }
    protected outputText(text: string, clear: boolean = false): void {
        game.outputText(text, clear);
    }
    protected combatRoundOver(): void {
        game.combatRoundOver();
    }
    protected cleanupAfterCombat(): void {
        game.cleanupAfterCombat();
    }
    protected static showStatDown(a: string): void {
        kGAMECLASS.mainView.statsView.showStatDown(a);
    }
    protected statScreenRefresh(): void {
        game.statScreenRefresh();
    }
    protected doNext(eventNo:): void { //Now typesafe
        game.doNext(eventNo);
    }
    protected combatMiss(): boolean {
        return game.combatMiss();
    }
    protected combatEvade(): boolean {
        return game.combatEvade();
    }
    protected combatFlexibility(): boolean {
        return game.combatFlexibility();
    }
    protected combatMisdirect(): boolean {
        return game.combatMisdirect();
    }
    protected get consumables(): ConsumableLib {
        return game.consumables;
    }
    protected get useables(): UseableLib {
        return game.useables;
    }
    protected get weapons(): WeaponLib {
        return game.weapons;
    }
    protected get armors(): ArmorLib {
        return game.armors;
    }
    //For enemies
    public bonusHP: number = 0;
    private _long: string = "<b>You have encountered an unitialized  Please report this as a bug</b>.";
    public get long(): string {
        return _long;
    }
    public set long(value: string): void {
        initsCalled.long = true;
        _long = value;
    }


    //Is a creature a 'plural' encounter - mob, etc.
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
     * 2 - random
     * 3 - love grapples
    */
    public temperment: number = TEMPERMENT_AVOID_GRAPPLES;

    //Used for special attacks.
    public special1: = null;
    public special2: = null;
    public special3: = null;

    //he
    public pronoun1: string = "";
    public get Pronoun1(): string {
        if (pronoun1 == "") return "";
        return pronoun1.substr(0, 1).toUpperCase() + pronoun1.substr(1);
    }
    //him
    public pronoun2: string = "";
    public get Pronoun2(): string {
        if (pronoun2 == "") return "";
        return pronoun2.substr(0, 1).toUpperCase() + pronoun2.substr(1);
    }
    //3: Possessive his
    public pronoun3: string = "";
    public get Pronoun3(): string {
        if (pronoun3 == "") return "";
        return pronoun3.substr(0, 1).toUpperCase() + pronoun3.substr(1);
    }

    private _drop: RandomDrop = new ChainedDrop();
    public get drop(): RandomDrop { return _drop; }
    public set drop(value: RandomDrop): void {
        _drop = value;
        initedDrop = true;
    }

    public eMaxHP(): number {
        return this.tou * 2 + 50 + this.bonusHP;
    }

    public addHP(hp: number): void {
        this.HP += hp;
        if (this.HP < 0) this.HP = 0;
        else if (this.HP > eMaxHP()) this.HP = eMaxHP();
    }

    /**
     * @return HP/eMaxHP()
     */
    public HPRatio(): number {
        return HP / eMaxHP();
    }

    /**
     * @return damage not reduced by player stats
     */
    public eBaseDamage(): number {
        return str + weaponAttack;
    }

    /**
     * @return randomized damage reduced by player stats
     */
    public calcDamage(): number {
        return player.reduceDamage(eBaseDamage());
    }

    protected totalXP(playerLevel: number = -1): number {
        if (playerLevel == -1) playerLevel = game.player.level;
        //
        // 1) Nerf xp gains by 20% per level after first two level difference
        // 2) No bonuses for underlevel!
        // 3) Super high level folks (over 10 levels) only get 1 xp!
        var difference: number = playerLevel - this.level;
        if (difference <= 2) difference = 0;
        else difference -= 2;
        if (difference > 4) difference = 4;
        difference = (5 - difference) * 20.0 / 100.0;
        if (playerLevel - this.level > 10) return 1;
        return Math.round(this.additionalXP + (this.baseXP() + this.bonusXP()) * difference);
    }
    protected baseXP(): number {
        return [200, 10, 20, 30, 40, 50, 55, 60, 66, 75,//0-9
            83, 85, 92, 100, 107, 115, 118, 121, 128, 135,//10-19
            145][Math.round(level)] || 200;
    }
    protected bonusXP(): number {
        return rand([200, 10, 20, 30, 40, 50, 55, 58, 66, 75,
            83, 85, 85, 86, 92, 94, 96, 98, 99, 101,
            107][Math.round(this.level)] || 130);
    }

    public Monster() {
        // trace("Generic Monster Constructor!");
        this.gender = GENDER_NONE;

        //// INSTRUCTIONS
        //// Copy-paste remaining code to the new monster constructor
        //// Uncomment and replace placeholder values with your own
        //// See existing monsters for examples

        // super(mainClassPtr);

        //// INIITIALIZERS
        //// If you want to skip something that is REQUIRED, you shoud set corresponding
        //// this.initedXXX property to true, e.g. this.initedGenitals = true;

        //// 1. Names and plural/singular
        ///*REQUIRED*/ this.a = "a";
        ///*REQUIRED*/ this.short = "short";
        ///*OPTIONAL*/ // this.imageName = "imageName"; // default ""
        ///*REQUIRED*/ this.long = "long";
        ///*OPTIONAL*/ //this.plural = true|false; // default false

        //// 2. Gender, genitals, and pronouns (also see "note for 2." below)
        //// 2.1. Male
        ///*REQUIRED*/ this.createCock(length,thickness,type); // defaults 5.5,1,human; could be called multiple times
        ///*OPTIONAL*/ //this.balls = numberOfBalls; // default 0
        ///*OPTIONAL*/ //this.ballSize = ; // default 0. should be set if balls>0
        ///*OPTIONAL*/ //this.cumMultiplier = ; // default 1
        ///*OPTIONAL*/ //this.hoursSinceCum = ; // default 0
        //// 2.2. Female
        ///*REQUIRED*/ this.createVagina(virgin=true|false,VAGINA_WETNESS_,VAGINA_LOOSENESS_); // default true,normal,tight
        ///*OPTIONAL*/ //this.createStatusAffect(StatusAffects.BonusVCapacity, bonus, 0, 0, 0);
        //// 2.3. Hermaphrodite
        //// Just create cocks and vaginas. Last call determines pronouns.
        //// 2.4. Genderless
        ///*REQUIRED*/ initGenderless(); // this s removes genitals!

        //// Note for 2.: during initialization pronouns are set in:
        //// * createCock: he/him/his
        //// * createVagina: she/her/her
        //// * initGenderless: it/it/its
        //// If plural=true, they are replaced with: they/them/their
        //// If you want to customize pronouns:
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
        ///*OPTIONAL*/ //this.ass.analLooseness = ANAL_LOOSENESS_; // default TIGHT
        ///*OPTIONAL*/ //this.ass.analWetness = ANAL_WETNESS_; // default DRY
        ///*OPTIONAL*/ //this.createStatusAffect(StatusAffects.BonusACapacity, bonus, 0, 0, 0);
        //// 5. Body
        ///*REQUIRED*/ this.tallness = ;
        ///*OPTIONAL*/ //this.hipRating = HIP_RATING_; // default boyish
        ///*OPTIONAL*/ //this.buttRating = BUTT_RATING_; // default buttless
        ///*OPTIONAL*/ //this.lowerBody = LOWER_BODY_; //default human
        ///*OPTIONAL*/ //this.armType = ARM_TYPE_; // default human

        //// 6. Skin
        ///*OPTIONAL*/ //this.skinTone = "skinTone"; // default "albino"
        ///*OPTIONAL*/ //this.skinType = SKIN_TYPE_; // default PLAIN
        ///*OPTIONAL*/ //this.skinDesc = "skinDesc"; // default "skin" if this.skinType is not set, else Appearance.DEFAULT_SKIN_DESCS[skinType]
        ///*OPTIONAL*/ //this.skinAdj = "skinAdj"; // default ""

        //// 7. Hair
        ///*OPTIONAL*/ //this.hairColor = ; // default "no"
        ///*OPTIONAL*/ //this.hairLength = ; // default 0
        ///*OPTIONAL*/ //this.hairType = HAIR_; // default NORMAL

        //// 8. Face
        ///*OPTIONAL*/ //this.faceType = FACE_; // default HUMAN
        ///*OPTIONAL*/ //this.earType = EARS_; // default HUMAN
        ///*OPTIONAL*/ //this.tongueType = TONGUE_; // default HUMAN
        ///*OPTIONAL*/ //this.eyeType = EYES_; // default HUMAN

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
        //// Values are either combat event numbers (5000+) or  references
        ///*OPTIONAL*/ //this.special1 = ; //default 0
        ///*OPTIONAL*/ //this.special2 = ; //default 0
        ///*OPTIONAL*/ //this.special3 = ; //default 0

        //// 16. Tail
        ///*OPTIONAL*/ //this.tailType = TAIL_TYPE_; // default NONE
        ///*OPTIONAL*/ //this.tailVenom = ; // default 0
        ///*OPTIONAL*/ //this.tailRecharge = ; // default 5

        //// 17. Horns
        ///*OPTIONAL*/ //this.hornType = HORNS_; // default NONE
        ///*OPTIONAL*/ //this.horns = numberOfHorns; // default 0

        //// 18. Wings
        ///*OPTIONAL*/ //this.wingType = WING_TYPE_; // default NONE
        ///*OPTIONAL*/ //this.wingDesc = ; // default Appearance.DEFAULT_WING_DESCS[wingType]

        //// 19. Antennae
        ///*OPTIONAL*/ //this.antennae = ANTENNAE_; // default NONE

        //// REQUIRED !!!
        //// In debug mode will throw an error for uninitialized monster
        //checkMonster();
    }

    private _checkCalled: boolean = false;
    public get checkCalled(): boolean { return _checkCalled; }
    public checkError: string = "";
    public initsCalled: Object = {
        a: false,
        short: false,
        long: false,
        genitals: false,
        breasts: false,
        tallness: false,
        str_tou_spe_inte: false,
        lib_sens_cor: false,
        drop: false
    };
    // MONSTER INITIALIZATION HELPER S
    protected set initedGenitals(value: boolean): void {
        initsCalled.genitals = value;
    }
    protected set initedBreasts(value: boolean): void {
        initsCalled.breasts = value;
    }
    protected set initedDrop(value: boolean): void {
        initsCalled.drop = value;
    }
    protected set initedStrTouSpeInte(value: boolean): void {
        initsCalled.str_tou_spe_inte = value;
    }
    protected set initedLibSensCor(value: boolean): void {
        initsCalled.lib_sens_cor = value;
    }
    protected const NO_DROP: WeightedDrop = new WeightedDrop();

    public isFullyInit(): boolean {
        for each(var phase: Object in initsCalled) {
            if (phase is Boolean && phase == false) return false;
        }
        return true;
    }
    public missingInits(): string {
        var result: string = "";
        for (var phase: string in initsCalled) {
            if (initsCalled[phase] is Boolean && initsCalled[phase] == false) {
                if (result == "") result = phase;
                else result += ", " + phase;
            }
        }
        return result;
    }

    override public set a(value: string): void {
        initsCalled.a = true;
        super.a = value;
    }

    override public set short(value: string): void {
        initsCalled.short = true;
        super.short = value;
    }

    override public createCock(clength: number = 5.5, cthickness: number = 1, ctype: CockTypesEnum = null): boolean {
        initedGenitals = true;
        if (!_checkCalled) {
            if (plural) {
                this.pronoun1 = "they";
                this.pronoun2 = "them";
                this.pronoun3 = "their";
            } else {
                this.pronoun1 = "he";
                this.pronoun2 = "him";
                this.pronoun3 = "his";
            }
        }
        var result: boolean = super.createCock(clength, cthickness, ctype);
        this.genderCheck();
        return result;
    }

    override public createVagina(virgin: boolean = true, vaginalWetness: number = 1, vaginalLooseness: number = 0): boolean {
        initedGenitals = true;
        if (!_checkCalled) {
            if (plural) {
                this.pronoun1 = "they";
                this.pronoun2 = "them";
                this.pronoun3 = "their";
            } else {
                this.pronoun1 = "she";
                this.pronoun2 = "her";
                this.pronoun3 = "her";
            }
        }
        var result: boolean = super.createVagina(virgin, vaginalWetness, vaginalLooseness);
        this.genderCheck();
        return result;
    }

    protected initGenderless(): void {
        this.cocks = [];
        this.vaginas = [];
        initedGenitals = true;
        if (plural) {
            this.pronoun1 = "they";
            this.pronoun2 = "them";
            this.pronoun3 = "their";
        } else {
            this.pronoun1 = "it";
            this.pronoun2 = "it";
            this.pronoun3 = "its";
        }
        this.genderCheck();
    }

    override public createBreastRow(size: number = 0, nipplesPerBreast: number = 1): boolean {
        initedBreasts = true;
        return super.createBreastRow(size, nipplesPerBreast);
    }

    override public set tallness(value: number): void {
        initsCalled.tallness = true;
        super.tallness = value;
    }

    override public set skinType(value: number): void {
        if (!_checkCalled) { this.skinDesc = Appearance.DEFAULT_SKIN_DESCS[value]; }
        super.skinType = value;
    }

    protected initStrTouSpeInte(str: number, tou: number, spe: number, inte: number): void {
        this.str = str;
        this.tou = tou;
        this.spe = spe;
        this.inte = inte;
        initedStrTouSpeInte = true;
    }

    protected initLibSensCor(lib: number, sens: number, cor: number): void {
        this.lib = lib;
        this.sens = sens;
        this.cor = cor;
        initedLibSensCor = true;
    }


    override public set wingType(value: number): void {
        if (!_checkCalled) this.wingDesc = Appearance.DEFAULT_WING_DESCS[value];
        super.wingType = value;
    }

    override public validate(): string {
        var error: string = "";
        // 1. Required fields must be set
        if (!isFullyInit()) {
            error += "Missing phases: " + missingInits() + ". ";
        }
        this.HP = eMaxHP();
        this.XP = totalXP();
        error += super.validate();
        error += Utils.validateNonNegativeNumberFields(this, "Monster.validate", [
            "lustVuln", "temperment"
        ]);
        return error;
    }

    public checkMonster(): boolean {
        _checkCalled = true;
        checkError = validate();
        if (checkError.length > 0) CoC_Settings.error("Monster not initialized:" + checkError);
        return checkError.length == 0;
    }

    /**
     * try to hit, apply damage
     * @return damage
     */
    public eOneAttack(): number {
        //Determine damage - str modified by enemy toughness!
        var damage: number = calcDamage();
        if (damage > 0) damage = player.takeDamage(damage);
        return damage;
    }

    /**
     * return true if we land a hit
     */
    protected attackSucceeded(): boolean {
        var attack: boolean = true;
        //Blind dodge change
        if (findStatusAffect(StatusAffects.Blind) >= 0) {
            attack &&= handleBlind();
        }
        attack &&= !playerDodged();
        return attack;
    }

    public eAttack(): void {
        var attacks: number = statusAffectv1(StatusAffects.Attacks);
        if (attacks == 0) attacks = 1;
        while (attacks > 0) {
            if (attackSucceeded()) {
                var damage: number = eOneAttack();
                outputAttack(damage);
                postAttack(damage);
                game.statScreenRefresh();
                outputText("\n", false);
            }
            if (statusAffectv1(StatusAffects.Attacks) >= 0) {
                addStatusValue(StatusAffects.Attacks, 1, -1);
            }
            attacks--;
        }
        removeStatusAffect(StatusAffects.Attacks);
        //			if (!game.combatRoundOver()) game.doNext(1);
        game.combatRoundOver(); //The doNext here was not required
    }

    /**
     * Called no matter of success of the attack
     * @param damage damage received by player
     */
    protected postAttack(damage: number): void {
        if (damage > 0) {
            if (lustVuln > 0 && player.armorName == "barely-decent bondage straps") {
                if (!plural) outputText("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.", false);
                else outputText("\n" + capitalA + short + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.", false);
                lust += 5 * lustVuln;
            }
        }
    }

    public outputAttack(damage: number): void {
        if (damage <= 0) {
            //Due to toughness or amor...
            if (rand(player.armorDef + player.tou) < player.armorDef) outputText("You absorb and deflect every " + weaponVerb + " with your " + player.armorName + ".", false);
            else {
                if (plural) outputText("You deflect and block every " + weaponVerb + " " + a + short + " throw at you.", false);
                else outputText("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.", false);
            }
        }
        else if (damage < 6) outputText("You are struck a glancing blow by " + a + short + "! (" + damage + ")", false);
        else if (damage < 11) {
            outputText(capitalA + short + " wound");
            if (!plural) outputText("s");
            outputText(" you! (" + damage + ")", false);
        }
        else if (damage < 21) {
            outputText(capitalA + short + " stagger");
            if (!plural) outputText("s");
            outputText(" you with the force of " + pronoun3 + " " + weaponVerb + "! (" + damage + ")", false);
        }
        else if (damage > 20) {
            outputText(capitalA + short + " <b>mutilate", false);
            if (!plural) outputText("s", false);
            outputText("</b> you with " + pronoun3 + " powerful " + weaponVerb + "! (" + damage + ")", false);
        }
    }

    /**
     * @return true if continue with attack
     */
    protected handleBlind(): boolean {
        if (rand(3) < 2) {
            if (weaponVerb == "tongue-slap") outputText(capitalA + short + " completely misses you with a thrust from " + pronoun3 + " tongue!\n", false);
            else outputText(capitalA + short + " completely misses you with a blind attack!\n", false);
            return false;
        }
        return true;
    }

    /**
     * print something about how we miss the player
     */
    protected outputPlayerDodged(dodge: number): void {
        if (dodge == 1) outputText("You narrowly avoid " + a + short + "'s " + weaponVerb + "!\n", false);
        else if (dodge == 2) outputText("You dodge " + a + short + "'s " + weaponVerb + " with superior quickness!\n", false);
        else {
            outputText("You deftly avoid " + a + short);
            if (plural) outputText("'");
            else outputText("'s");
            outputText(" slow " + weaponVerb + ".\n", false);
        }
    }

    private playerDodged(): boolean {
        //Determine if dodged!
        var dodge: number = player.speedDodge(this);
        if (dodge > 0) {
            outputPlayerDodged(dodge);
            return true;
        }
        //Determine if evaded
        if (!(this is Kiha) && player.findPerk(PerkLib.Evade) >= 0 && rand(100) < 10) {
            outputText("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'");
            if (!plural) outputText("s");
            outputText(" attack.\n", false);
            return true;
        }
        //("Misdirection"
        if (player.findPerk(PerkLib.Misdirection) >= 0 && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
            outputText("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' attacks.\n", false);
            return true;
        }
        //Determine if cat'ed
        if (player.findPerk(PerkLib.Flexibility) >= 0 && rand(100) < 6) {
            outputText("With your incredible flexibility, you squeeze out of the way of " + a + short + "", false);
            if (plural) outputText("' attacks.\n", false);
            else outputText("'s attack.\n", false);
            return true;
        }
        return false;
    }

    public doAI(): void {
        if (findStatusAffect(StatusAffects.Stunned) >= 0) {
            if (!handleStun()) return;
        }
        if (findStatusAffect(StatusAffects.Fear) >= 0) {
            if (!handleFear()) return;
        }
        //Exgartuan gets to do stuff!
        if (game.player.findStatusAffect(StatusAffects.Exgartuan) >= 0 && game.player.statusAffectv2(StatusAffects.Exgartuan) == 0 && rand(3) == 0) {
            if (game.exgartuan.exgartuanCombatUpdate()) game.outputText("\n\n", false);
        }
        if (findStatusAffect(StatusAffects.Constricted) >= 0) {
            if (!handleConstricted()) return;
        }
        //If grappling... TODO implement grappling
        //			if (game.gameState == 2) {
        //				game.gameState = 1;
        //temperment - used for determining grapple behaviors
        //0 - avoid grapples/break grapple
        //1 - lust determines > 50 grapple
        //2 - random
        //3 - love grapples
        /*
         //		if(temperment == 0) eGrappleRetreat();
         if (temperment == 1) {
         //			if(lust < 50) eGrappleRetreat();
         mainClassPtr.doNext(3);
         return;
         }
         mainClassPtr.outputText("Lust Placeholder!!", false);
         mainClassPtr.doNext(3);
         return;*/
        //			}
        performCombatAction();
    }

    /**
     * Called if monster is constricted. Should return true if constriction is ignored and need to proceed with ai
     */
    protected handleConstricted(): boolean {
        //Enemy struggles -
        game.outputText("Your prey pushes at your tail, twisting and writhing in an effort to escape from your tail's tight bonds.", false);
        if (statusAffectv1(StatusAffects.Constricted) <= 0) {
            game.outputText("  " + capitalA + short + " proves to be too much for your tail to handle, breaking free of your tightly bound coils.", false);
            removeStatusAffect(StatusAffects.Constricted);
        }
        addStatusValue(StatusAffects.Constricted, 1, -1);
        game.combatRoundOver();
        return false;
    }

    /**
     * Called if monster is under fear. Should return true if fear ignored and need to proceed with ai
     */
    protected handleFear(): boolean {
        if (statusAffectv1(StatusAffects.Fear) == 0) {
            if (plural) {
                removeStatusAffect(StatusAffects.Fear);
                game.outputText("Your foes shake free of their fear and ready themselves for battle.", false);
            }
            else {
                removeStatusAffect(StatusAffects.Fear);
                game.outputText("Your foe shakes free of its fear and readies itself for battle.", false);
            }
        }
        else {
            addStatusValue(StatusAffects.Fear, 1, -1);
            if (plural) game.outputText(capitalA + short + " are too busy shivering with fear to fight.", false);
            else game.outputText(capitalA + short + " is too busy shivering with fear to fight.", false);
        }
        game.combatRoundOver();
        return false;
    }

    /**
     * Called if monster is stunned. Should return true if stun is ignored and need to proceed with ai.
     */
    protected handleStun(): boolean {
        if (plural) game.outputText("Your foes are too dazed from your last hit to strike back!", false);
        else game.outputText("Your foe is too dazed from your last hit to strike back!", false);
        if (statusAffectv1(StatusAffects.Stunned) <= 0) removeStatusAffect(StatusAffects.Stunned);
        else addStatusValue(StatusAffects.Stunned, 1, -1);
        game.combatRoundOver();
        return false;
    }

    /**
     * This method is called after all stun/fear/constricted checks.
     * Default: Equal chance to do physical or special (if any) attack
     */
    protected performCombatAction(): void {
        var actions: Array = [eAttack, special1, special2, special3].filter(
            (special:, idx: number, array: Array): boolean {
                return special != null;
            }
        );
        var rando: number = Math.floor(Math.random() * (actions.length));
        var action: = actions[rando];
        action();
    }

    /**
     * All branches of this method and all subsequent scenes should end either with
     * 'cleanupAfterCombat', 'awardPlayer' or 'finishCombat'. The latter also displays
     * default message like "you defeat %s" or "%s falls and starts masturbating"
     */
    public defeated(hpVictory: boolean): void {
        game.finishCombat();
    }

    /**
     * All branches of this method and all subsequent scenes should end with
     * 'cleanupAfterCombat'.
     */
    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (hpVictory) {
            player.HP = 1;
            outputText("Your wounds are too great to bear, and you fall unconscious.", true);
        } else {
            outputText("Your desire reaches uncontrollable levels, and you end up openly masturbating.\n\nThe lust and pleasure cause you to black out for hours on end.", true);
            player.lust = 0;
        }
        game.inCombat = false;
        game.clearStatuses(false);
        var temp: number = rand(10) + 1;
        if (temp > player.gems) temp = player.gems;
        outputText("\n\nYou'll probably wake up in eight hours or so, missing " + temp + " gems.", false);
        player.gems -= temp;
        game.doNext(game.camp.returnToCampUseEightHours);
    }

    /**
     * (hpVictory) to call INSTEAD of default defeated(). Call it or finishCombat() manually
     */
    public onDefeated: = null;
    /**
     * (hpVictory,pcCameWorms) to call INSTEAD of default won(). Call it or finishCombat() manually
     */
    public onWon: = null;
    /**
     * () to call INSTEAD of common run attempt. Call runAway(false) to perform default run attempt
     */
    public onPcRunAttempt: = null;

    /**
     *  method to handle hooks before calling overriden method
     */
    public defeated_(hpVictory: boolean): void {
        if (onDefeated != null) onDefeated(hpVictory);
        else defeated(hpVictory);
    }

    /**
     *  method to handle hooks before calling overriden method
     */
    public won_(hpVictory: boolean, pcCameWorms: boolean): void {
        if (onWon != null) onWon(hpVictory, pcCameWorms);
        else won(hpVictory, pcCameWorms);
    }

    /**
     * Display tease reaction message. Then call applyTease() to increase lust.
     * @param lustDelta value to be added to lust (already modified by lustVuln etc)
     */
    public teased(lustDelta: number): void {
        outputDefaultTeaseReaction(lustDelta);
        if (lustDelta > 0) {
            //Imp mob uber interrupt!
            if (findStatusAffect(StatusAffects.ImpUber) >= 0) { // TODO move to proper class
                outputText("\nThe imps in the back stumble over their spell, their loincloths tenting obviously as your display interrupts their casting.  One of them spontaneously orgasms, having managed to have his spell backfire.  He falls over, weakly twitching as a growing puddle of whiteness surrounds his defeated form.", false);
                //(-5% of max enemy HP)
                HP -= bonusHP * .05;
                lust -= 15;
                removeStatusAffect(StatusAffects.ImpUber);
                createStatusAffect(StatusAffects.ImpSkip, 0, 0, 0, 0);
            }
        }
        applyTease(lustDelta);
    }

    protected outputDefaultTeaseReaction(lustDelta: number): void {
        if (plural) {
            if (lustDelta == 0) outputText("\n\n" + capitalA + short + " seem unimpressed.", false);
            if (lustDelta > 0 && lustDelta < 4) outputText("\n" + capitalA + short + " look intrigued by what " + pronoun1 + " see.", false);
            if (lustDelta >= 4 && lustDelta < 10) outputText("\n" + capitalA + short + " definitely seem to be enjoying the show.", false);
            if (lustDelta >= 10 && lustDelta < 15) outputText("\n" + capitalA + short + " openly stroke " + pronoun2 + "selves as " + pronoun1 + " watch you.", false);
            if (lustDelta >= 15 && lustDelta < 20) outputText("\n" + capitalA + short + " flush hotly with desire, " + pronoun3 + " eyes filled with longing.", false);
            if (lustDelta >= 20) outputText("\n" + capitalA + short + " lick " + pronoun3 + " lips in anticipation, " + pronoun3 + " hands idly stroking " + pronoun3 + " bodies.", false);
        }
        else {
            if (lustDelta == 0) outputText("\n" + capitalA + short + " seems unimpressed.", false);
            if (lustDelta > 0 && lustDelta < 4) {
                if (plural) outputText("\n" + capitalA + short + " looks intrigued by what " + pronoun1 + " see.", false);
                else outputText("\n" + capitalA + short + " looks intrigued by what " + pronoun1 + " sees.", false);
            }
            if (lustDelta >= 4 && lustDelta < 10) outputText("\n" + capitalA + short + " definitely seems to be enjoying the show.", false);
            if (lustDelta >= 10 && lustDelta < 15) {
                if (plural) outputText("\n" + capitalA + short + " openly strokes " + pronoun2 + "selves as " + pronoun1 + " watch you.", false);
                else outputText("\n" + capitalA + short + " openly strokes " + pronoun2 + "self as " + pronoun1 + " watches you.", false);
            }
            if (lustDelta >= 15 && lustDelta < 20) {
                if (plural) outputText("\n" + capitalA + short + " flush hotly with desire, " + pronoun3 + " eyes filling with longing.", false);
                else outputText("\n" + capitalA + short + " flushes hotly with desire, " + pronoun3 + " eyes filled with longing.", false);
            }
            if (lustDelta >= 20) {
                if (plural) outputText("\n" + capitalA + short + " licks " + pronoun3 + " lips in anticipation, " + pronoun3 + " hands idly stroking " + pronoun3 + " own bodies.", false);
                else outputText("\n" + capitalA + short + " licks " + pronoun3 + " lips in anticipation, " + pronoun3 + " hands idly stroking " + pronoun3 + " own body.", false);
            }
        }
    }

    protected applyTease(lustDelta: number): void {
        lust += lustDelta;
        lustDelta = Math.round(lustDelta * 10) / 10;
        outputText(" (" + lustDelta + ")", false);
    }

    public generateDebugDescription(): string {
        var result: string;
        var be: string = plural ? "are" : "is";
        var have: string = plural ? "have" : "has";
        var Heis: string = Pronoun1 + " " + be + " ";
        var Hehas: string = Pronoun1 + " " + have + " ";
        result = "You are inspecting " + a + short + " (imageName='" + imageName + "', class='" + getQualifiedClassName(this) + "'). You are fighting " + pronoun2 + ".\n\n";
        result += Heis + (Appearance.DEFAULT_GENDER_NAMES[gender] || ("gender#" + gender)) +
            " with " + Appearance.numberOfThings(cocks.length, "cock") +
            ", " + Appearance.numberOfThings(vaginas.length, "vagina") +
            " and " + Appearance.numberOfThings(breastRows.length, "breast row") + ".\n\n";
        // APPEARANCE
        result += Heis + Appearance.inchesAndFeetsAndInches(tallness) + " tall with " +
            Appearance.describeByScale(hipRating, Appearance.DEFAULT_HIP_RATING_SCALES, "thinner than", "wider than") + " hips and " +
            Appearance.describeByScale(buttRating, Appearance.DEFAULT_BUTT_RATING_SCALES, "thinner than", "wider than") + " butt.\n";
        result += Pronoun3 + " lower body is " + (Appearance.DEFAULT_LOWER_BODY_NAMES[lowerBody] || ("lowerBody#" + lowerBody));
        result += ", " + pronoun3 + " arms are " + (Appearance.DEFAULT_ARM_NAMES[armType] || ("armType#" + armType));
        result += ", " + pronoun1 + " " + have + " " + skinTone + " " + skinAdj + " " + skinDesc + " (type " + (Appearance.DEFAULT_SKIN_NAMES[skinType] || ("skinType#" + skinType)) + ").\n";
        result += Hehas;
        if (hairLength > 0) {
            result += hairColor + " " + Appearance.inchesAndFeetsAndInches(hairLength) + " long " + (Appearance.DEFAULT_HAIR_NAMES[hairType] || ("hairType#" + hairType)) + " hair.\n";
        } else {
            result += "no hair.\n";
        }
        result += Hehas
            + (Appearance.DEFAULT_FACE_NAMES[faceType] || ("faceType#" + faceType)) + " face, "
            + (Appearance.DEFAULT_EARS_NAMES[earType] || ("earType#" + earType)) + " ears, "
            + (Appearance.DEFAULT_TONGUE_NAMES[tongueType] || ("tongueType#" + tongueType)) + " tongue and "
            + (Appearance.DEFAULT_EYES_NAMES[eyeType] || ("eyeType#" + eyeType)) + " eyes.\n";
        result += Hehas;
        if (tailType == TAIL_TYPE_NONE) result += "no tail, ";
        else result += (Appearance.DEFAULT_TAIL_NAMES[tailType] || ("tailType#" + tailType)) + " tail with venom=" + tailVenom + " and recharge=" + tailRecharge + ", ";
        if (hornType == HORNS_NONE) result += "no horns, ";
        else result += horns + " " + (Appearance.DEFAULT_HORNS_NAMES[hornType] || ("hornType#" + hornType)) + " horns, ";
        if (wingType == WING_TYPE_NONE) result += "no wings, ";
        else result += wingDesc + " wings (type " + (Appearance.DEFAULT_WING_NAMES[wingType] || ("wingType#" + wingType)) + "), ";
        if (antennae == ANTENNAE_NONE) result += "no antennae.\n\n";
        else result += (Appearance.DEFAULT_ANTENNAE_NAMES[antennae] || ("antennaeType#" + antennae)) + " antennae.\n\n";

        // GENITALS AND BREASTS
        for (var i: number = 0; i < cocks.length; i++) {
            var cock: Cock = (cocks[i] as Cock);
            result += Pronoun3 + (i > 0 ? (" #" + (i + 1)) : "") + " " + cock.cockType.toString().toLowerCase() + " cock is ";
            result += Appearance.inchesAndFeetsAndInches(cock.cockLength) + " long and " + cock.cockThickness + "\" thick";
            if (cock.isPierced) result += ", pierced with " + cock.pLongDesc;
            if (cock.knotMultiplier != 1) result += ", with knot of size " + cock.knotMultiplier;
            result += ".\n";
        }
        if (balls > 0 || ballSize > 0) result += Hehas + Appearance.numberOfThings(balls, "ball") + " of size " + ballSize + ".\n";
        if (cumMultiplier != 1 || cocks.length > 0) result += Pronoun1 + " " + have + " cum multiplier " + cumMultiplier + ". ";
        if (hoursSinceCum > 0 || cocks.length > 0) result += "It were " + hoursSinceCum + " hours since " + pronoun1 + " came.\n\n";
        for (i = 0; i < vaginas.length; i++) {
            var vagina: VaginaClass = (vaginas[i] as VaginaClass);
            result += Pronoun3 + (i > 0 ? (" #" + (i + 1)) : "") + " " + (Appearance.DEFAULT_VAGINA_TYPE_NAMES[vagina.type] || ("vaginaType#" + vagina.type)) + (vagina.virgin ? " " : " non-") + "virgin vagina is ";
            result += Appearance.describeByScale(vagina.vaginalLooseness, Appearance.DEFAULT_VAGINA_LOOSENESS_SCALES, "tighter than", "looser than");
            result += ", " + Appearance.describeByScale(vagina.vaginalWetness, Appearance.DEFAULT_VAGINA_WETNESS_SCALES, "drier than", "wetter than");
            if (vagina.labiaPierced) result += ". Labia are pierced with " + vagina.labiaPLong;
            if (vagina.clitPierced) result += ". Clit is pierced with " + vagina.clitPLong;
            if (statusAffectv1(StatusAffects.BonusVCapacity) > 0) {
                result += "; vaginal capacity is increased by " + statusAffectv1(StatusAffects.BonusVCapacity);
            }
            result += ".\n";
        }
        if (breastRows.length > 0) {
            var nipple: string = nippleLength + "\" ";
            if (nipplesPierced) nipple += "pierced by " + nipplesPLong;
            for (i = 0; i < breastRows.length; i++) {
                var row: BreastRowClass = (breastRows[i] as BreastRowClass);
                result += Pronoun3 + (i > 0 ? (" #" + (i + 1)) : "") + " breast row has " + row.breasts;
                result += " " + row.breastRating.toFixed(2) + "-size (" + Appearance.breastCup(row.breastRating) + ") breasts with ";
                result += Appearance.numberOfThings(row.nipplesPerBreast, nipple + (row.fuckable ? "fuckable nipple" : "unfuckable nipple")) + " on each.\n";
            }
        }
        result += Pronoun3 + " ass is " + Appearance.describeByScale(ass.analLooseness, Appearance.DEFAULT_ANAL_LOOSENESS_SCALES, "tighter than", "looser than") + ", " + Appearance.describeByScale(ass.analWetness, Appearance.DEFAULT_ANAL_WETNESS_SCALES, "drier than", "wetter than");
        if (statusAffectv1(StatusAffects.BonusACapacity) > 0) {
            result += "; anal capacity is increased by " + statusAffectv1(StatusAffects.BonusACapacity);
        }
        result += ".\n\n";

        // COMBAT AND OTHER STATS
        result += Hehas + "str=" + str + ", tou=" + tou + ", spe=" + spe + ", inte=" + inte + ", lib=" + lib + ", sens=" + sens + ", cor=" + cor + ".\n";
        result += Pronoun1 + " can " + weaponVerb + " you with  " + weaponPerk + " " + weaponName + " (attack " + weaponAttack + ", value " + weaponValue + ").\n";
        result += Pronoun1 + " is guarded with " + armorPerk + " " + armorName + " (defense " + armorDef + ", value " + armorValue + ").\n";
        result += Hehas + HP + "/" + eMaxHP() + " HP, " + lust + "/100 lust, " + fatigue + "/100 fatigue. " + Pronoun3 + " bonus HP=" + bonusHP + ", and lust vulnerability=" + lustVuln + ".\n";
        result += Heis + "level " + level + " and " + have + " " + gems + " gems. You will be awarded " + XP + " XP.\n";

        var numSpec: number = (special1 != null ? 1 : 0) + (special2 != null ? 1 : 0) + (special3 != null ? 1 : 0);
        if (numSpec > 0) {
            result += Hehas + numSpec + " special attack" + (numSpec > 1 ? "s" : "") + ".\n";
        }
        else {
            result += Hehas + "no special attacks.\n";
        }

        return result;
    }

    protected clearOutput(): void {
        game.clearOutput();
    }

    public dropLoot(): ItemType {
        return _drop.roll() as ItemType;
    }

    public combatRoundUpdate(): void {
        if (findStatusAffect(StatusAffects.MilkyUrta) >= 0) {
            game.urtaQuest.milkyUrtaTic();
        }
        //Countdown
        if (findStatusAffect(StatusAffects.TentacleCoolDown) >= 0) {
            addStatusValue(StatusAffects.TentacleCoolDown, 1, -1);
            if (statusAffect(findStatusAffect(StatusAffects.TentacleCoolDown)).value1 == 0) {
                removeStatusAffect(StatusAffects.TentacleCoolDown);
            }
        }
        if (findStatusAffect(StatusAffects.CoonWhip) >= 0) {
            if (statusAffectv2(StatusAffects.CoonWhip) <= 0) {
                armorDef += statusAffectv1(StatusAffects.CoonWhip);
                outputText("<b>Tail whip wears off!</b>\n\n");
                removeStatusAffect(StatusAffects.CoonWhip);
            }
            else {
                addStatusValue(StatusAffects.CoonWhip, 2, -1);
                outputText("<b>Tail whip is currently reducing your foe");
                if (plural) outputText("s'");
                else outputText("'s");
                outputText(" armor by " + statusAffectv1(StatusAffects.CoonWhip) + ".</b>\n\n")
            }
        }
        if (findStatusAffect(StatusAffects.Blind) >= 0) {
            addStatusValue(StatusAffects.Blind, 1, -1);
            if (statusAffectv1(StatusAffects.Blind) <= 0) {
                outputText("<b>" + capitalA + short + (plural ? " are" : " is") + " no longer blind!</b>\n\n", false);
                removeStatusAffect(StatusAffects.Blind);
            }
            else outputText("<b>" + capitalA + short + (plural ? " are" : " is") + " currently blind!</b>\n\n", false);
        }
        if (findStatusAffect(StatusAffects.Earthshield) >= 0) {
            outputText("<b>" + capitalA + short + " is protected by a shield of rocks!</b>\n\n");
        }
        if (findStatusAffect(StatusAffects.Sandstorm) >= 0) {
            //Blinded:
            if (player.findStatusAffect(StatusAffects.Blind) >= 0) {
                outputText("<b>You blink the sand from your eyes, but you're sure that more will get you if you don't end it soon!</b>\n\n");
                player.removeStatusAffect(StatusAffects.Blind);
            }
            else {
                if (statusAffectv1(StatusAffects.Sandstorm) == 0 || statusAffectv1(StatusAffects.Sandstorm) % 4 == 0) {
                    player.createStatusAffect(StatusAffects.Blind, 0, 0, 0, 0);
                    outputText("<b>The sand is in your eyes!  You're blinded this turn!</b>\n\n");
                }
                else {
                    outputText("<b>The grainy mess cuts at any exposed flesh and gets into every crack and crevice of your armor.");
                    var temp: number = player.takeDamage(1 + rand(2));
                    outputText(" (" + temp + ")");
                    outputText("</b>\n\n");
                }
            }
            addStatusValue(StatusAffects.Sandstorm, 1, 1);
        }
        if (findStatusAffect(StatusAffects.Stunned) >= 0) {
            outputText("<b>" + capitalA + short + " is still stunned!</b>\n\n", false);
        }
        if (findStatusAffect(StatusAffects.Shell) >= 0) {
            if (statusAffectv1(StatusAffects.Shell) >= 0) {
                outputText("<b>A wall of many hues shimmers around " + a + short + ".</b>\n\n");
                addStatusValue(StatusAffects.Shell, 1, -1);
            }
            else {
                outputText("<b>The magical barrier " + a + short + " erected fades away to nothing at last.</b>\n\n");
                removeStatusAffect(StatusAffects.Shell);
            }
        }
        if (findStatusAffect(StatusAffects.IzmaBleed) >= 0) {
            //Countdown to heal
            addStatusValue(StatusAffects.IzmaBleed, 1, -1);
            //Heal wounds
            if (statusAffectv1(StatusAffects.IzmaBleed) <= 0) {
                outputText("The wounds you left on " + a + short + " stop bleeding so profusely.\n\n", false);
                removeStatusAffect(StatusAffects.IzmaBleed);
            }
            //Deal damage if still wounded.
            else {
                var store: number = eMaxHP() * (3 + rand(4)) / 100;
                store = game.doDamage(store);
                if (plural) outputText(capitalA + short + " bleed profusely from the jagged wounds your weapon left behind. (" + store + ")\n\n", false);
                else outputText(capitalA + short + " bleeds profusely from the jagged wounds your weapon left behind. (" + store + ")\n\n", false);
            }
        }
        if (findStatusAffect(StatusAffects.Timer) >= 0) {
            if (statusAffectv1(StatusAffects.Timer) <= 0)
                removeStatusAffect(StatusAffects.Timer);
            addStatusValue(StatusAffects.Timer, 1, -1);
        }
        if (findStatusAffect(StatusAffects.LustStick) >= 0) {
            //LoT Effect Messages:
            switch (statusAffectv1(StatusAffects.LustStick)) {
                //First:
                case 1:
                    if (plural) outputText("One of " + a + short + " pants and crosses " + mf("his", "her") + " eyes for a moment.  " + mf("His", "Her") + " dick flexes and bulges, twitching as " + mf("he", "she") + " loses himself in a lipstick-fueled fantasy.  When " + mf("he", "she") + " recovers, you lick your lips and watch " + mf("his", "her") + " blush spread.\n\n", false);
                    else outputText(capitalA + short + " pants and crosses " + pronoun3 + " eyes for a moment.  " + mf("His", "Her") + " dick flexes and bulges, twitching as " + pronoun1 + " loses " + mf("himself", "herself") + " in a lipstick-fueled fantasy.  When " + pronoun1 + " recovers, you lick your lips and watch " + mf("his", "her") + " blush spread.\n\n", false);
                    break;
                //Second:
                case 2:
                    if (plural) outputText(capitalA + short + " moan out loud, " + pronoun3 + " dicks leaking and dribbling while " + pronoun1 + " struggle not to touch " + pronoun2 + ".\n\n", false);
                    else outputText(capitalA + short + " moans out loud, " + pronoun3 + " dick leaking and dribbling while " + pronoun1 + " struggles not to touch it.\n\n", false);
                    break;
                //Third:
                case 3:
                    if (plural) outputText(capitalA + short + " pump " + pronoun3 + " hips futilely, air-humping non-existent partners.  Clearly your lipstick is getting to " + pronoun2 + ".\n\n", false);
                    else outputText(capitalA + short + " pumps " + pronoun3 + " hips futilely, air-humping a non-existent partner.  Clearly your lipstick is getting to " + pronoun2 + ".\n\n", false);
                    break;
                //Fourth:
                case 4:
                    if (plural) outputText(capitalA + short + " close " + pronoun3 + " eyes and grunt, " + pronoun3 + " cocks twitching, bouncing, and leaking pre-cum.\n\n", false);
                    else outputText(capitalA + short + " closes " + pronoun2 + " eyes and grunts, " + pronoun3 + " cock twitching, bouncing, and leaking pre-cum.\n\n", false);
                    break;
                //Fifth and repeat:
                default:
                    if (plural) outputText("Drops of pre-cum roll steadily out of their dicks.  It's a marvel " + pronoun1 + " haven't given in to " + pronoun3 + " lusts yet.\n\n", false);
                    else outputText("Drops of pre-cum roll steadily out of " + a + short + "'s dick.  It's a marvel " + pronoun1 + " hasn't given in to " + pronoun3 + " lust yet.\n\n", false);
                    break;
            }
            addStatusValue(StatusAffects.LustStick, 1, 1);
            //Damage = 5 + bonus score minus
            //Reduced by lust vuln of course
            lust += Math.round(lustVuln * (5 + statusAffectv2(StatusAffects.LustStick)));
        }
        if (findStatusAffect(StatusAffects.PCTailTangle) >= 0) {
            //when Entwined
            outputText("You are bound tightly in the kitsune's tails.  <b>The only thing you can do is try to struggle free!</b>\n\n");
            outputText("Stimulated by the coils of fur, you find yourself growing more and more aroused...\n\n");
            game.dynStats("lus", 5 + player.sens / 10);
        }
        if (findStatusAffect(StatusAffects.QueenBind) >= 0) {
            outputText("You're utterly restrained by the Harpy Queen's magical ropes!\n\n");
            if (flags[kFLAGS.PC_FETISH] >= 2) game.dynStats("lus", 3);
        }
        if (this is SecretarialSuccubus || this is MilkySuccubus) {
            if (player.lust < 45) outputText("There is something in the air around your opponent that makes you feel warm.\n\n", false);
            if (player.lust >= 45 && player.lust < 70) outputText("You aren't sure why but you have difficulty keeping your eyes off your opponent's lewd form.\n\n", false);
            if (player.lust >= 70 && player.lust < 90) outputText("You blush when you catch yourself staring at your foe's rack, watching it wobble with every step she takes.\n\n", false);
            if (player.lust >= 90) outputText("You have trouble keeping your greedy hands away from your groin.  It would be so easy to just lay down and masturbate to the sight of your curvy enemy.  The succubus looks at you with a sexy, knowing expression.\n\n", false);
            game.dynStats("lus", 1 + rand(8));
        }
        //[LUST GAINED PER ROUND] - Omnibus
        if (findStatusAffect(StatusAffects.LustAura) >= 0) {
            if (player.lust < 33) outputText("Your groin tingles warmly.  The demon's aura is starting to get to you.\n\n", false);
            if (player.lust >= 33 && player.lust < 66) outputText("You blush as the demon's aura seeps into you, arousing you more and more.\n\n", false);
            if (player.lust >= 66) {
                outputText("You flush bright red with desire as the lust in the air worms its way inside you.  ", false);
                temp = rand(4);
                if (temp == 0) outputText("You have a hard time not dropping to your knees to service her right now.\n\n", false);
                if (temp == 2) outputText("The urge to bury your face in her breasts and suckle her pink nipples nearly overwhelms you.\n\n", false);
                if (temp == 1) outputText("You swoon and lick your lips, tasting the scent of the demon's pussy in the air.\n\n", false);
                if (temp == 3) outputText("She winks at you and licks her lips, and you can't help but imagine her tongue sliding all over your body.  You regain composure moments before throwing yourself at her.  That was close.\n\n", false);
            }
            game.dynStats("lus", (3 + Math.floor(player.lib / 20 + player.cor / 30)));
        }
    }

    public handleAwardItemText(itype: ItemType): void { //New , override this  in child classes if you want a monster to output special item drop text
        if (itype != null) outputText("\nThere is " + itype.longName + " on your defeated opponent.  ");
    }

    public handleAwardText(): void { //New , override this  in child classes if you want a monster to output special gem and XP text
        //This  doesn’t add the gems or XP to the player, it just provides the output text
        if (this.gems == 1) outputText("\n\nYou snag a single gem and " + this.XP + " XP as you walk away from your victory.");
        else if (this.gems > 1) outputText("\n\nYou grab " + this.gems + " gems and " + this.XP + " XP from your victory.");
        else if (this.gems == 0) outputText("\n\nYou gain " + this.XP + " XP from the battle.");
    }

    public handleCombatLossText(inDungeon: boolean, gemsLost: number): number { //New , override this  in child classes if you want a monster to output special text after the player loses in combat
        //This  doesn’t take the gems away from the player, it just provides the output text
        if (!inDungeon) {
            outputText("\n\nYou'll probably come to your senses in eight hours or so");
            if (player.gems > 1)
                outputText(", missing " + gemsLost + " gems.");
            else if (player.gems == 1)
                outputText(", missing your only gem.");
            else outputText(".");
        }
        else {
            outputText("\n\nSomehow you came out of that alive");
            if (player.gems > 1)
                outputText(", but after checking your gem pouch, you realize you're missing " + gemsLost + " gems.");
            else if (player.gems == 1)
                outputText(", but after checking your gem pouch, you realize you're missing your only gem.");
            else outputText(".");
        }
        return 8; //This allows different monsters to delay the player by different amounts of time after a combat loss. Normal loss causes an eight hour blackout
    }

}
}