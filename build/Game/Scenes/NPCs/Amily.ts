import BreastRow, { BreastCup } from '../../Body/BreastRow';
import { ButtLooseness, ButtRating, ButtWetness } from '../../Body/Butt';
import { HipRating } from '../../Body/Hips';
import { SkinType } from '../../Body/Skin';
import Vagina, { VaginaLooseness, VaginaType, VaginaWetness } from '../../Body/Vagina';
import Character from '../../Character/Character';
import Description from '../../Character/CharacterDescription';
import { CharacterType } from '../../Character/CharacterType';
import StatusAffect from '../../Effects/StatusAffect';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Armor from '../../Items/Armors/Armor';
import ArmorName from '../../Items/Armors/ArmorName';
import Weapon from '../../Items/Weapons/Weapon';
import WeaponName from '../../Items/Weapons/WeaponName';
import { Utils } from '../../Utilities/Utils';

export class Amily extends Character {
    override protected performCombatAction() {
        if (findStatusAffect(StatusAffects.Concentration) < 0 && randInt(4) === 0) amilyConcentration();
        else if (randInt(3) === 0) amilyDartGo();
        else if (randInt(2) === 0) amilyDoubleAttack();
        else amilyAttack();
    }

    //COMBAT AMILY STUFF
    //(Has regular attack)
    public amilyAttack() {
        let dodged: number = 0;
        let damage: number;
        //return to combat menu when finished
        return { next: game.playerMenu };
        //Blind dodge change
        if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
            DisplayText(capitalA + short + " completely misses you with a blind attack!\n");
            game.combatRoundOver();
            return;
        }
        //Determine if dodged!
        if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
            dodged = 1;
        }
        //Determine if evaded
        if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
            dodged = 2;
        }
        //("Misdirection"
        if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
            dodged = 3;
        }
        //Determine if cat'ed
        if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
            dodged = 4;
        }
        //Determine damage - str modified by enemy toughness!
        damage = int((str + weaponAttack) - Math.random() * (player.stats.tou + player.armorDef));
        //Dodged
        if (dodged > 0) {
            DisplayText("Amily dashes at you and swipes her knife, but you quickly sidestep the blow.");
            //Add tags for miss/evade/flexibility/etc.
            switch (dodged) {
                case 1:
                    DisplayText(" [Dodge]");
                    break;
                case 2:
                    DisplayText(" [Evade]");
                    break;
                case 3:
                    DisplayText(" [Misdirect]");
                    break;
                case 4:
                    DisplayText(" [Flexibility]");
                    break;
                default:
                    CoC_Settings.error();
                    DisplayText(" <b>[ERROR]</b>");
                    break;
            }
        }
        //Blocked
        else if (damage <= 0) {
            damage = 0;
            //Due to toughness or amor...
            if (randInt(player.armorDef + player.stats.tou) < player.armorDef) DisplayText("Your " + player.inventory.equipment.armor.displayName + " absorb and deflect every " + weaponVerb + " from " + a + short + ".");
            else DisplayText("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.");
        }
        //Got hit!
        else {
            damage = player.takeDamage(damage);
            DisplayText("Amily dashes at you and swipes her knife, cutting you (" + damage + ").");
        }
        if (damage > 0) {
            if (lustVuln > 0 && player.inventory.equipment.armor.displayName === "barely-decent bondage straps") {
                if (!plural) DisplayText("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.");
                else DisplayText("\n" + capitalA + short + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.");
                lust += 10 * lustVuln;
            }
        }
        game.statScreenRefresh();
        DisplayText("\n");
        game.combatRoundOver();
    }

    //(Special Attacks)
    //-Double Attack: Same as a normal attack, but hits twice.
    public amilyDoubleAttack() {
        let dodged: number = 0;
        let damage: number = 0;
        //return to combat menu when finished
        return { next: game.playerMenu };
        //Blind dodge change
        if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
            dodged++;
        }
        //Determine if dodged!
        if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
            dodged++;
        }
        //Determine if evaded
        if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
            dodged++;
        }
        //("Misdirection"
        if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
            dodged++;
        }
        //Determine if cat'ed
        if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
            dodged++;
        }
        //Get hit!
        if (dodged < 2) {
            //Determine damage - str modified by enemy toughness!
            damage = int((str + weaponAttack) - Math.random() * (player.stats.tou + player.armorDef));
            //Double damage if no dodge.
            if (dodged === 0) damage *= 2;
            //Blocked?
            if (damage === 0) {
                DisplayText("Amily dashes at you and slashes at you twice in the time it would take most to throw a single blow, but she can't cut deep enough to wound you!");
            }
            //NOT BLOCKED!
            else {
                damage = player.takeDamage(damage);
                if (dodged > 0) DisplayText("Amily dashes at you and quickly slashes you twice; you manage to avoid the first blow, but the second one hits home, cutting you");
                else DisplayText("Amily dashes at you and slashes at you twice in the time it would take most to throw a single blow");
                DisplayText(" (" + damage + ")!");
            }
        }
        //Dodge all!
        else DisplayText("Amily dashes at you and quickly slashes you twice, but you quickly sidestep her first blow and jump back to avoid any follow-ups.");

        game.combatRoundOver();
    }

    //-Poison Dart: Deals speed and str damage to the PC. (Not constant)
    private amilyDartGo() {
        let dodged: number = 0;
        //Blind dodge change
        if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
            DisplayText(capitalA + short + " completely misses you with a blind attack from her dartgun!\n");
            game.combatRoundOver();
            return;
        }
        //Determine if dodged!
        if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
            dodged = 1;
        }
        //Determine if evaded
        if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
            dodged = 2;
        }
        //("Misdirection"
        if (player.perks.has(PerkType.Misdirection) && randInt(100) < 15 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
            dodged = 3;
        }
        //Determine if cat'ed
        if (player.perks.has(PerkType.Flexibility) && randInt(100) < 15) {
            dodged = 4;
        }
        //Dodged
        if (dodged > 0) {
            DisplayText("Amily dashes at you and swipes her knife rather slowly. You easily dodge the attack; but it was all a feint, her other hands tries to strike at you with a poisoned dart. Luckily you manage to avoid it.");
            //Add tags for miss/evade/flexibility/etc.
            switch (dodged) {
                case 1:
                    DisplayText(" [Dodge]");
                    break;
                case 2:
                    DisplayText(" [Evade]");
                    break;
                case 3:
                    DisplayText(" [Misdirect]");
                    break;
                case 4:
                    DisplayText(" [Flexibility]");
                    break;
                default:
                    CoC_Settings.error("");
                    DisplayText(" <b>[ERROR]</b>");
                    break;
            }
        }
        //Else hit!
        else {
            DisplayText("Amily dashes at you and swipes her knife at you, surprisingly slowly.  You easily dodge the attack; but it was a feint - her other hand tries to strike at you with a poisoned dart. However, she only manages to scratch you, only causing your muscles to grow slightly numb.");
            //Set status
            if (!player.statusAffects.has(StatusAffectType.AmilyVenom)) player.statusAffects.add(StatusAffectType.AmilyVenom, 0, 0, 0, 0);
            let poison: number = 2 + randInt(5);
            while (poison > 0) {
                poison--;
                if (player.stats.str >= 2) {
                    player.stats.str--;
                    showStatDown("str");
                    // strDown.visible = true;
                    // strUp.visible = false;
                    player.statusAffects.get(StatusAffectType.AmilyVenom).value1 = 1;
                }
                if (player.stats.spe >= 2) {
                    player.stats.spe--;
                    showStatDown("spe");
                    // speDown.visible = true;
                    // speUp.visible = false;
                    player.statusAffects.get(StatusAffectType.AmilyVenom).value2 = 1;
                }
            }
            //If PC is reduced to 0 Speed and Strength, normal defeat by HP plays.
            if (player.stats.spe <= 2 && player.stats.str <= 2) {
                DisplayText("  You've become so weakened that you can't even make an attempt to defend yourself, and Amily rains blow after blow down upon your helpless form.");
                player.takeDamage(8999);
            }
        }
        game.combatRoundOver();
    }

    //Concentrate: always avoids the next attack. Can be disrupted by tease/seduce.
    private amilyConcentration() {
        DisplayText("Amily takes a deep breath and attempts to concentrate on your movements.");
        statusAffects.add(StatusAffectType.Concentration, 0, 0, 0, 0);
        game.combatRoundOver();
    }

    //(if PC uses tease/seduce after this)
    //Deals big lust increase, despite her resistance.
    public teased(lustDelta: number) {
        if (statusAffects.has(StatusAffectType.Concentration)) {
            DisplayText("Amily flushes hotly; her concentration only makes her pay more attention to your parts!");
            lustDelta += 25 + lustDelta;
            statusAffects.remove("Concentration");
            applyTease(lustDelta);
        } else {
            super.teased(lustDelta);
        }
    }

    public defeated(hpVictory: boolean) {
        game.amilyScene.conquerThatMouseBitch();
    }

    public constructor() {
        super(CharacterType.Amily);
        this.description = new Description(this, "Amily", "You are currently fighting Amily. The mouse-morph is dressed in rags and glares at you in rage, knife in hand. She keeps herself close to the ground, ensuring she can quickly close the distance between you two or run away.", false, "");
        this.torso.vaginas.add(new Vagina(VaginaType.HUMAN, VaginaWetness.NORMAL, VaginaLooseness.NORMAL, false));
        this.statusAffects.add(StatusAffectType.BonusVCapacity, 48, 0, 0, 0);
        this.torso.chest.add(new BreastRow(BreastCup.C));
        this.torso.butt.looseness = ButtLooseness.VIRGIN;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.tallness = 4 * 12;
        this.torso.hips.rating = HipRating.AMPLE;
        this.torso.butt.rating = ButtRating.TIGHT;
        this.skin.tone = "tawny";
        this.skin.type = SkinType.FUR;
        this.torso.neck.head.hair.color = "brown";
        this.torso.neck.head.hair.length = 5;
        this.baseStats.str = 30;
        this.baseStats.tou = 30;
        this.baseStats.spe = 85;
        this.baseStats.int = 60;
        this.baseStats.lib = 45;
        this.baseStats.sens = 45;
        this.baseStats.cor = 10;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("knife" as WeaponName, undefined, "knife", "slash", 6, 0));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("rags" as ArmorName, undefined, "rags", 1, 0));
        this.baseStats.bonusHP = 20;
        this.baseStats.lust = 20;
        this.baseStats.lustVuln = .85;
        this.baseStats.level = 4;
        this.inventory.gems = 2 + randInt(5);
    }
}
