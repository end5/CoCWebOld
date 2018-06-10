import { BeeGirlFlags } from './BeeGirlScene';
import { DisplayText } from '../../../../Engine/display/DisplayText';
import { randInt, randomChoice } from '../../../../Engine/Utilities/SMath';
import { BreastCup, BreastRow } from '../../../Body/BreastRow';
import { ButtLooseness, ButtRating, ButtWetness } from '../../../Body/Butt';
import { AntennaeType } from '../../../Body/Head';
import { HipRating } from '../../../Body/Hips';
import { LegType } from '../../../Body/Legs';
import { Tail, TailType } from '../../../Body/Tail';
import {
    Vagina,
    VaginaLooseness,
    VaginaType,
    VaginaWetness
    } from '../../../Body/Vagina';
import { WingType } from '../../../Body/Wings';
import { Character } from '../../../Character/Character';
import { CharacterDescription } from '../../../Character/CharacterDescription';
import { CharacterType } from '../../../Character/CharacterType';
import { ActionPerform } from '../../../Combat/ActionPerform';
import { CombatAction } from '../../../Combat/Actions/CombatAction';
import { CombatContainer } from '../../../Combat/CombatContainer';
import { DefaultRespond } from '../../../Combat/Default/DefaultRespond';
import { DefeatType } from '../../../Combat/DefeatEvent';
import { EndScenes } from '../../../Combat/EndScenes';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Armor } from '../../../Items/Armors/Armor';
import { ArmorName } from '../../../Items/Armors/ArmorName';
import { Weapon } from '../../../Items/Weapons/Weapon';
import { WeaponName } from '../../../Items/Weapons/WeaponName';
import { ClickFunction, NextScreenChoices } from '../../../ScreenDisplay';
import { User } from '../../../User';
import { Scenes } from '../../Scenes';

class BeeGirlEndScenes extends EndScenes {
    public hasEscaped(enemy: Character): boolean {
        return false;
    }
    public hasDefeated(enemy: Character): boolean {
        return false;
    }
    public claimsVictory(howYouWon: DefeatType, enemy: Character): void { }
    public criesInDefeat(howYouLost: DefeatType, enemy: Character): void { }
    protected beforeEndingScene(howYouLost: DefeatType, enemy: Character): void { }
    public readonly hasVictoryScene: boolean = true;
    protected victoryScene(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (howYouWon === DefeatType.Lust && enemy.statusAffects.has(StatusAffectType.Infested)) {
            DisplayText("\n\nThe bee-girl goes white and backs away with a disgusted look on her face.\n\n");
            return { next: Scenes.camp.returnToCampUseOneHour };
        }
        else {
            return Scenes.forest.beeGirlScene.beeRapesYou(enemy);
        }
    }
    public readonly hasDefeatScene: boolean = true;
    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        DisplayText().clear();
        if (enemy.gender > 0) {
            if (howYouLost === DefeatType.HP) {
                DisplayText("You smile in satisfaction as the " + this.char.desc.short + " collapses, unable to continue fighting.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully, and you see an easy way to relieve it..\n\nWhat do you do to her?");
            }
            else {
                DisplayText("You smile in satisfaction as the " + this.char.desc.short + " spreads her legs and starts frigging her honey-soaked cunt.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully, and you see an easy way to relieve it..\n\nWhat do you do to her?");
            }
            enemy.stats.lust = 98;
            enemy.stats.lust += 1;
            const dildoRape = (enemy.inventory.keyItems.has("Deluxe Dildo") ? Scenes.forest.beeGirlScene.beeGirlsGetsDildoed : undefined);
            const milkAndHoney = (enemy.statusAffects.has(StatusAffectType.Feeder) ? Scenes.forest.beeGirlScene.milkAndHoneyAreKindaFunny : undefined);
            return {
                choices: [
                    ["Rape", Scenes.forest.beeGirlScene.rapeTheBeeGirl],
                    ["Dildo Rape", dildoRape],
                    ["B. Feed", milkAndHoney]
                ],
                persistantChoices: [["Leave", this.leaveAfterDefeating(howYouLost)]]
            };
        }
        else if (enemy.statusAffects.has(StatusAffectType.Feeder)) { // Genderless can still breastfeed
            if (howYouLost === DefeatType.HP) {
                DisplayText("You smile in satisfaction as the " + this.char.desc.short + " collapses, unable to continue fighting.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully.\n\nWhat do you do?");
            }
            else {
                DisplayText("You smile in satisfaction as the " + this.char.desc.short + " spreads her legs and starts frigging her honey-soaked cunt.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully.\n\nWhat do you do?");
            }
            return {
                choices: [["B. Feed", Scenes.forest.beeGirlScene.milkAndHoneyAreKindaFunny]],
                persistantChoices: [["Leave", this.leaveAfterDefeating(howYouLost)]]
            };
        }
    }

    private leaveAfterDefeating(howYouLost: DefeatType): ClickFunction {
        return () => {
            if (howYouLost === DefeatType.HP) {
                (User.flags.get(CharacterType.BeeGirl) as BeeGirlFlags).combatWinsWithoutRape++; // This only happens if you beat her up and then don't rape her
            }
            else {
                (User.flags.get(CharacterType.BeeGirl) as BeeGirlFlags).combatWinsWithRape++; // All wins by lust count towards the desire option, even when you leave
            }
            return { next: Scenes.camp.returnToCampUseOneHour };
        };
    }
}

class Attack implements CombatAction {
    public name: string = "Attack";
    public reasonCannotUse: string;
    public isPossible(character: Character): boolean {
        return true;
    }
    public canUse(character: Character, enemy?: Character): boolean {
        return true;
    }
    public use(character: Character, enemy?: Character): NextScreenChoices {
        // Blind dodge change
        const name = character.desc.a + character.desc.short;
        const speedDif = enemy.stats.spe - character.stats.spe;
        if (character.statusAffects.has(StatusAffectType.Blind)) {
            DisplayText(character.desc.capitalA + character.desc.short + " completely misses you with a blind sting!!");
            return;
        }
        // Determine if dodged!
        if (speedDif > 0 && Math.floor(Math.random() * (((speedDif) / 4) + 80)) > 80) {
            if (speedDif < 8) DisplayText("You narrowly avoid " + name + "'s stinger!");
            if (speedDif >= 8 && speedDif < 20) DisplayText("You dodge " + name + "'s stinger with superior quickness!");
            if (speedDif >= 20) DisplayText("You deftly avoid " + name + "'s slow attempts to sting you.");
            return;
        }
        // determine if avoided with armor.
        if (enemy.inventory.equipment.armor.defense >= 10 && randInt(4) > 0) {
            DisplayText("Despite her best efforts, " + name + "'s sting attack can't penetrate your armor.");
            return;
        }
        // Sting successful!  Paralize or lust?
        // Lust 50% of the time
        if (randInt(2) === 0) {
            DisplayText("Searing pain lances through you as " + name + " manages to sting you!  You stagger back a step and nearly trip, flushing hotly.  ");
            DisplayText("Oh no!  You've been injected with some kind of aphrodisiac.  You've got to keep focused, you can't think about... fucking... ");
            if (enemy.gender === Gender.MALE) DisplayText("or dripping honey-slicked cunts beckoning you. ");
            if (enemy.gender === Gender.FEMALE) DisplayText("planting your aching sex over her face while you lick her sweet honeypot. ");
            if (enemy.gender === Gender.HERM) DisplayText("or cocks, tits, and puffy nipples. ");
            enemy.stats.lust += 25;
            if (enemy.stats.lust > 60) {
                DisplayText(" You shake your head and struggle to stay focused,");
                if (enemy.gender === Gender.MALE || enemy.gender === Gender.HERM) DisplayText(" but it's difficult with the sensitive bulge in your groin.");
                if (enemy.gender === Gender.FEMALE) DisplayText(" but can't ignore the soaking wetness in your groin.");
                if (enemy.stats.sens > 50) DisplayText("  The sensitive nubs of your nipples rub tightly under your " + enemy.inventory.equipment.armor.displayName + ".");
            }
            else DisplayText(" You shake your head and clear the thoughts from your head, focusing on the task at hand.");
            if (!enemy.statusAffects.has(StatusAffectType.lustvenom)) enemy.statusAffects.add(StatusAffectType.lustvenom, 0, 0, 0, 0);
        }
        // Paralise the other 50%!
        else {
            DisplayText("Searing pain lances through you as " + name + " manages to sting you!  You stagger back a step and nearly trip, finding it hard to move yourself.");
            if (enemy.statusAffects.has(StatusAffectType.ParalyzeVenom)) {
                enemy.statusAffects.get(StatusAffectType.ParalyzeVenom).value1 += 2.9; // v1 - strenght penalty, v2 speed penalty
                enemy.statusAffects.get(StatusAffectType.ParalyzeVenom).value2 += 2.9;
                enemy.stats.str += -3;
                enemy.stats.spe += -3;
                DisplayText("  It's getting much harder to move, you're not sure how many more stings like that you can take!");
            }
            else {
                enemy.statusAffects.add(StatusAffectType.ParalyzeVenom, 2, 2, 0, 0);
                enemy.stats.str += -2;
                enemy.stats.spe += -2;
                DisplayText("  You've fallen prey to paralyzation venom!  Better end this quick!");
            }
        }
        return;
    }
}

class BeeGirlActions implements ActionPerform {
    public mainAction: CombatAction = new Attack();
    public approach: CombatAction;
    public recover: CombatAction;
    public squeeze: CombatAction;
    public struggle: CombatAction;
    public attack: CombatAction;
    public tease: CombatAction;
    public spells: CombatAction;
    public items: CombatAction;
    public moveAway: CombatAction;
    public climb: CombatAction;
    public release: CombatAction;
    public run: CombatAction;
    public physicalSpecials: CombatAction;
    public magicalSpecials: CombatAction;
    public wait: CombatAction;
    public fantasize: CombatAction;
    public inspect: CombatAction;
}

export class BeeGirl extends Character {
    public constructor() {
        super(CharacterType.BeeGirl);
        this.description = new CharacterDescription(this, "bee-girl", "A bee-girl buzzes around you, filling the air with intoxicatingly sweet scents and a buzz that gets inside your head.  She has a humanoid face with small antennae, black chitin on her arms and legs that looks like shiny gloves and boots, sizable breasts, and a swollen abdomen tipped with a gleaming stinger.", false, "a ");
        this.torso.vaginas.add(new Vagina(VaginaType.HUMAN, VaginaWetness.SLAVERING, VaginaLooseness.GAPING));
        this.torso.chest.add(new BreastRow(BreastCup.DD));
        this.torso.butt.looseness = ButtLooseness.STRETCHED;
        this.torso.butt.wetness = ButtWetness.NORMAL;
        this.tallness = randInt(14) + 59;
        this.torso.hips.rating = HipRating.CURVY + 3;
        this.torso.butt.rating = ButtRating.EXPANSIVE;
        this.torso.hips.legs.type = LegType.BEE;
        this.skin.tone = "yellow";
        this.torso.neck.head.hair.color = randomChoice("black", "black and yellow");
        this.torso.neck.head.hair.length = 6;
        this.baseStats.str = 30;
        this.baseStats.tou = 30;
        this.baseStats.spe = 30;
        this.baseStats.int = 20;
        this.baseStats.lib = 60;
        this.baseStats.sens = 55;
        this.baseStats.cor = 0;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("chitin-plated fist" as WeaponName, undefined, "chitin-plated fist", "armored punch", 0, 0));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("chitin" as ArmorName, undefined, "chitin", 9, 0));
        this.baseStats.lust = 20 + randInt(40);
        this.baseStats.lustVuln = 0.9;
        // this.temperment = TEMPERMENT_LOVE_GRAPPLES;
        this.baseStats.level = 4;
        this.inventory.gems = randInt(15) + 1;
        // this.combat.rewards.drop = new WeightedDrop().add(consumables.BEEHONY, 4).addMany(1, consumables.OVIELIX, consumables.W__BOOK, useables.B_CHITN, undefined);
        this.torso.neck.head.antennae = AntennaeType.BEE;
        this.torso.wings.type = WingType.BEE_LIKE_SMALL;
        this.torso.tails.add(new Tail(TailType.BEE_ABDOMEN, 100));
        this.combatContainer = new CombatContainer(this, new BeeGirlActions(), new DefaultRespond(), new BeeGirlEndScenes(this));
        this.baseStats.HP = this.stats.maxHP();
    }
}
