import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { ButtLooseness, ButtRating, ButtWetness } from '../../Body/Butt';
import { Cock, CockType } from '../../Body/Cock';
import { HipRating } from '../../Body/Hips';
import { VaginaWetness } from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import { Character } from '../../Character/Character';
import { CharacterDescription } from '../../Character/CharacterDescription';
import { CharacterType } from '../../Character/CharacterType';
import { ActionPerform } from '../../Combat/ActionPerform';
import { CombatAction } from '../../Combat/Actions/CombatAction';
import { CombatContainer } from '../../Combat/CombatContainer';
import { DefaultRespond } from '../../Combat/Default/DefaultRespond';
import { DefeatType } from '../../Combat/DefeatEvent';
import { EndScenes } from '../../Combat/EndScenes';
import { Desc } from '../../Descriptors/Descriptors';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import { Armor } from '../../Items/Armors/Armor';
import { ArmorName } from '../../Items/Armors/ArmorName';
import { Weapon } from '../../Items/Weapons/Weapon';
import { WeaponName } from '../../Items/Weapons/WeaponName';
import { NextScreenChoices } from '../../ScreenDisplay';
import { WeightedDrop } from '../../Utilities/Drops/WeightedDrop';
import { Scenes } from '../Scenes';

class Attack implements CombatAction {
    public name: string = "Attack";
    public reasonCannotUse: string;
    public isPossible(imp: Character): boolean {
        return true;
    }
    public canUse(imp: Character, enemy?: Character): boolean {
        return true;
    }
    public use(imp: Character, enemy?: Character): NextScreenChoices {
        DisplayText("You see " + imp.desc.a + imp.desc.short + " make sudden arcane gestures at you!\n\n");
        enemy.stats.lust += enemy.stats.lib / 10 + enemy.stats.cor / 10 + 10;
        if (enemy.stats.lust < 30) DisplayText("You feel strangely warm.  ");
        if (enemy.stats.lust >= 30 && enemy.stats.lust < 60) DisplayText("Blood rushes to your groin as a surge of arousal hits you, making your knees weak.  ");
        if (enemy.stats.lust >= 60) DisplayText("Images of yourself fellating and fucking the imp assault your mind, unnaturally arousing you.  ");
        if (enemy.torso.cocks.count > 0) {
            if (enemy.stats.lust >= 60)
                DisplayText("You feel your " + Desc.Cock.describeMultiCockShort(enemy) + " dribble pre-cum.");
            else if (enemy.stats.lust >= 30 && enemy.torso.cocks.count === 1)
                DisplayText("Your " + Desc.Cock.describeCock(enemy, enemy.torso.cocks.get(0)) + " hardens, distracting you further.");
            else if (enemy.stats.lust >= 30 && enemy.torso.cocks.count > 1)
                DisplayText("Your " + Desc.Cock.describeMultiCockShort(enemy) + " harden uncomfortably.");
            if (enemy.torso.vaginas.count > 0) DisplayText("  ");
        }
        if (enemy.stats.lust >= 60 && enemy.torso.vaginas.count > 0) {
            switch (enemy.torso.vaginas.get(0).wetness) {
                case VaginaWetness.NORMAL: {
                    DisplayText("Your " + Desc.Vagina.describeAllVagina(enemy) + " dampen" + (enemy.torso.vaginas.count > 1 ? "" : "s") + " perceptibly.");
                    break;
                }
                case VaginaWetness.WET: {
                    DisplayText("Your crotch becomes sticky with girl-lust.");
                    break;
                }
                case VaginaWetness.SLICK: {
                    DisplayText("Your " + Desc.Vagina.describeAllVagina(enemy) + " become" + (enemy.torso.vaginas.count > 1 ? "" : "s") + " sloppy and wet.");
                    break;
                }
                case VaginaWetness.DROOLING: {
                    DisplayText("Thick runners of girl-lube stream down the insides of your thighs.");
                    break;
                }
                case VaginaWetness.SLAVERING: {
                    DisplayText("Your " + Desc.Vagina.describeAllVagina(enemy) + " instantly soak" + (enemy.torso.vaginas.count > 1 ? "" : "s") + " your groin.");
                }
                default: // Dry vaginas are unaffected
            }
        }
        DisplayText("\n");
        return;
    }
}

class ImpActions implements ActionPerform {
    public mainAction = new Attack();
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

class ImpEndScenes extends EndScenes {
    public hasEscaped(enemy: Character): boolean {
        return false;
    }
    public hasDefeated(enemy: Character): boolean {
        return false;
    }

    public claimsVictory(howWon: DefeatType, enemy: Character) { }
    public criesInDefeat(howLost: DefeatType, enemy: Character) { }
    protected beforeEndingScene(howAkbalLost: DefeatType, enemy: Character) { }

    public readonly hasVictoryScene = true;
    protected victoryScene(howWon: DefeatType, enemy: Character): NextScreenChoices {
        if (this.char.statusAffects.has(StatusAffectType.KitsuneFight)) {
            return Scenes.forest.kitsuneScene.loseKitsuneImpFight();
        }
        else if (pcCameWorms) {
            DisplayText("\n\nThe imp grins at your already corrupted state...");
            enemy.stats.lust = 100;
            return { next: Scenes.impScene.impRapesYou };
        }
        else {
            return Scenes.impScene.impRapesYou();
        }
    }

    public readonly hasDefeatScene = true;
    public defeatScene(howLost: DefeatType, enemy: Character): NextScreenChoices {
        if (this.char.statusAffects.has(StatusAffectType.KitsuneFight)) {
            return Scenes.forest.kitsuneScene.winKitsuneImpFight(enemy);
        }
        else {
            return Scenes.impScene.impVictory();
        }
    }
}

export class Imp extends Character {
    public constructor() {
        super(CharacterType.Imp);
        this.description = new CharacterDescription(this, "imp", "An imp is short, only a few feet tall.  An unkempt mane of shaggy black hair hangs from his head, parted by two short curved horns.  His eyes are solid black, save for tiny red irises which glow with evil intent.  His skin is bright red, and unencumbered by clothing or armor, save for a small loincloth at his belt.  His feet are covered by tiny wooden sandals, and his hands tipped with sharp claws.  A pair of tiny but functional wings occasionally flap from his back.", false, "the");
        this.torso.cocks.add(new Cock(CockType.DEMON, randInt(2) + 11, 2.5));
        this.torso.balls.quantity = 2;
        this.torso.balls.size = 1;
        this.torso.chest.add(new BreastRow(0));
        this.torso.butt.looseness = ButtLooseness.STRETCHED;
        this.torso.butt.wetness = ButtWetness.NORMAL;
        this.tallness = randInt(24) + 25;
        this.torso.hips.rating = HipRating.BOYISH;
        this.torso.butt.rating = ButtRating.TIGHT;
        this.skin.tone = "red";
        this.torso.neck.head.hair.color = "black";
        this.torso.neck.head.hair.length = 5;
        this.torso.wings.type = WingType.IMP;
        this.baseStats.str = 20;
        this.baseStats.tou = 10;
        this.baseStats.spe = 25;
        this.baseStats.int = 12;
        this.baseStats.lib = 45;
        this.baseStats.sens = 45;
        this.baseStats.cor = 100;
        this.baseStats.lust = 40;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("claws" as WeaponName, undefined, "claws", "claw-slash", 5, 0));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("leathery skin" as ArmorName, undefined, "leathery skin", 5, 0));
        // this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
        this.baseStats.level = 1;
        this.inventory.gems = randInt(5) + 5;
        // this.combat.rewards.drop = new WeightedDrop().
        //     add(consumables.SUCMILK, 3).
        //     add(consumables.INCUBID, 3).
        //     add(consumables.IMPFOOD, 4);
        this.combatContainer = new CombatContainer(this, new ImpActions(), new DefaultRespond(), new ImpEndScenes(this));
    }
}
