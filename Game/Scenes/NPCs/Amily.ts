import { NextScreenChoices } from "../../ScreenDisplay";
import { Character } from "../../Character/Character";
import { StatusEffectType } from "../../Effects/StatusEffectType";
import { randInt } from "../../../Engine/Utilities/SMath";
import { campMenu } from "../../Menus/InGame/PlayerMenu";
import { CView } from "../../../Engine/Display/ContentView";
import { PerkType } from "../../Effects/PerkType";
import { CharacterType } from "../../Character/CharacterType";
import { Vagina, VaginaWetness, VaginaLooseness } from "../../Body/Vagina";
import { BreastRow } from "../../Body/BreastRow";
import { breastCupInverse } from "../../Descriptors/BreastDescriptor";
import { ButtLooseness, ButtWetness, ButtRating } from "../../Body/Butt";
import { HipRating } from "../../Body/Hips";
import { SkinType } from "../../Body/Skin";
import { Weapon } from "../../Items/Weapons/Weapon";
import { WeaponName } from "../../Items/Weapons/WeaponName";
import { Armor } from "../../Items/Armors/Armor";
import { CharacterDescription } from "../../Character/CharacterDescription";
import { ArmorName } from "../../Items/Armors/ArmorName";
import { ICombatAction } from "../../Combat/Actions/ICombatAction";
import { CombatAbilityFlag } from "../../Effects/CombatAbilityFlag";
import { IActionRespond } from "../../Combat/IActionRespond";
import { EndScenes } from "../../Combat/EndScenes";
import { DefeatType } from "../../Combat/DefeatEvent";
import { conquerThatMouseBitch } from "./AmilyScene";
import { CombatContainer } from "../../Combat/CombatContainer";
import { playerHuntScore } from "../Areas/Forest/ErlKingScene";

// COMBAT AMILY STUFF
// (Has regular attack)
export function amilyAttack(player: Character, amily: Character): void {
    let dodged: number = 0;
    let damage: number;
    // Blind dodge change
    if (amily.effects.has(StatusEffectType.Blind) && randInt(3) < 2) {
        CView.text(amily.desc.capitalA + amily.desc.short + " completely misses you with a blind attack!\n");
        return;
    }
    // Determine if dodged!
    if (player.stats.spe - amily.stats.spe > 0 && Math.floor(Math.random() * (((player.stats.spe - amily.stats.spe) / 4) + 80)) > 80) {
        dodged = 1;
    }
    // Determine if evaded
    if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
        dodged = 2;
    }
    // ("Misdirection"
    if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
        dodged = 3;
    }
    // Determine if cat'ed
    if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
        dodged = 4;
    }
    // Determine damage - str modified by enemy toughness!
    damage = Math.floor((amily.stats.str + amily.combat.stats.weaponAttack()) - Math.random() * (player.stats.tou + player.combat.stats.defense()));
    // Dodged
    if (dodged > 0) {
        CView.text("Amily dashes at you and swipes her knife, but you quickly sidestep the blow.");
        // Add tags for miss/evade/flexibility/etc.
        switch (dodged) {
            case 1:
                CView.text(" [Dodge]");
                break;
            case 2:
                CView.text(" [Evade]");
                break;
            case 3:
                CView.text(" [Misdirect]");
                break;
            case 4:
                CView.text(" [Flexibility]");
                break;
            default:
                CView.text(" <b>[ERROR]</b>");
                break;
        }
    }
    // Blocked
    else if (damage <= 0) {
        damage = 0;
        // Due to toughness or amor...
        if (randInt(player.combat.stats.defense() + player.stats.tou) < player.combat.stats.defense()) CView.text("Your " + player.inventory.equipment.armor.displayName + " absorb and deflect every " + amily.inventory.equipment.weapon.verb + " from " + amily.desc.a + amily.desc.short + ".");
        else CView.text("You deflect and block every " + amily.inventory.equipment.weapon.verb + " " + amily.desc.a + amily.desc.short + " throws at you.");
    }
    // Got hit!
    else {
        damage = player.combat.stats.loseHP(damage, amily);
        CView.text("Amily dashes at you and swipes her knife, cutting you (" + damage + ").");
    }
    if (damage > 0) {
        if (amily.stats.lustVuln > 0 && player.inventory.equipment.armor.displayName === "barely-decent bondage straps") {
            if (!amily.desc.plural) CView.text("\n" + amily.desc.capitalA + amily.desc.short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.");
            else CView.text("\n" + amily.desc.capitalA + amily.desc.short + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.");
            amily.stats.lust += 10 * amily.stats.lustVuln;
        }
    }

    CView.text("\n");
}

// (Special Attacks)
// -Double Attack: Same as a normal attack, but hits twice.
export function amilyDoubleAttack(player: Character, amily: Character): void {
    let dodged: number = 0;
    let damage: number = 0;
    // return to combat menu when finished
    // return { next: campMenu };
    // Blind dodge change
    if (amily.effects.has(StatusEffectType.Blind) && randInt(3) < 2) {
        dodged++;
    }
    // Determine if dodged!
    if (player.stats.spe - player.stats.spe > 0 && Math.floor(Math.random() * (((player.stats.spe - amily.stats.spe) / 4) + 80)) > 80) {
        dodged++;
    }
    // Determine if evaded
    if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
        dodged++;
    }
    // ("Misdirection"
    if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
        dodged++;
    }
    // Determine if cat'ed
    if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
        dodged++;
    }
    // Get hit!
    if (dodged < 2) {
        // Determine damage - str modified by enemy toughness!
        damage = Math.floor((amily.stats.str + amily.combat.stats.weaponAttack()) - Math.random() * (player.stats.tou + player.combat.stats.defense()));
        // Double damage if no dodge.
        if (dodged === 0) damage *= 2;
        // Blocked?
        if (damage === 0) {
            CView.text("Amily dashes at you and slashes at you twice in the time it would take most to throw a single blow, but she can't cut deep enough to wound you!");
        }
        // NOT BLOCKED!
        else {
            damage = player.combat.stats.loseHP(damage, amily);
            if (dodged > 0) CView.text("Amily dashes at you and quickly slashes you twice; you manage to avoid the first blow, but the second one hits home, cutting you");
            else CView.text("Amily dashes at you and slashes at you twice in the time it would take most to throw a single blow");
            CView.text(" (" + damage + ")!");
        }
    }
    // Dodge all!
    else CView.text("Amily dashes at you and quickly slashes you twice, but you quickly sidestep her first blow and jump back to avoid any follow-ups.");
}

// -Poison Dart: Deals speed and str damage to the PC. (Not constant)
function amilyDartGo(player: Character, amily: Character): void {
    let dodged: number = 0;
    // Blind dodge change
    if (amily.effects.has(StatusEffectType.Blind) && randInt(3) < 2) {
        CView.text(amily.desc.capitalA + amily.desc.short + " completely misses you with a blind attack from her dartgun!\n");
        return;
    }

    // Determine if dodged!
    if (player.stats.spe - amily.stats.spe > 0 && Math.floor(Math.random() * (((player.stats.spe - amily.stats.spe) / 4) + 80)) > 80) {
        dodged = 1;
    }
    // Determine if evaded
    if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
        dodged = 2;
    }
    // ("Misdirection"
    if (player.perks.has(PerkType.Misdirection) && randInt(100) < 15 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
        dodged = 3;
    }
    // Determine if cat'ed
    if (player.perks.has(PerkType.Flexibility) && randInt(100) < 15) {
        dodged = 4;
    }
    // Dodged
    if (dodged > 0) {
        CView.text("Amily dashes at you and swipes her knife rather slowly. You easily dodge the attack; but it was all a feint, her other hands tries to strike at you with a poisoned dart. Luckily you manage to avoid it.");
        // Add tags for miss/evade/flexibility/etc.
        switch (dodged) {
            case 1:
                CView.text(" [Dodge]");
                break;
            case 2:
                CView.text(" [Evade]");
                break;
            case 3:
                CView.text(" [Misdirect]");
                break;
            case 4:
                CView.text(" [Flexibility]");
                break;
            default:
                CView.text(" <b>[ERROR]</b>");
                break;
        }
    }
    // Else hit!
    else {
        CView.text("Amily dashes at you and swipes her knife at you, surprisingly slowly.  You easily dodge the attack; but it was a feint - her other hand tries to strike at you with a poisoned dart. However, she only manages to scratch you, only causing your muscles to grow slightly numb.");
        // Set status
        if (!player.effects.has(StatusEffectType.AmilyVenom)) player.effects.add(StatusEffectType.AmilyVenom, 0, 0, 0, 0);
        let poison: number = 2 + randInt(5);
        while (poison > 0) {
            poison--;
            if (player.stats.str >= 2) {
                player.stats.str--;
                player.effects.get(StatusEffectType.AmilyVenom).value1 += 1;
            }
            if (player.stats.spe >= 2) {
                player.stats.spe--;
                player.effects.get(StatusEffectType.AmilyVenom).value2 += 1;
            }
        }
        // If PC is reduced to 0 Speed and Strength, normal defeat by HP plays.
        if (player.stats.spe <= 2 && player.stats.str <= 2) {
            CView.text("  You've become so weakened that you can't even make an attempt to defend yourself, and Amily rains blow after blow down upon your helpless form.");
            player.combat.stats.loseHP(8999, amily);
        }
    }
}

// Concentrate: always avoids the next attack. Can be disrupted by tease/seduce.
function amilyConcentration(player: Character, amily: Character) {
    CView.text("Amily takes a deep breath and attempts to concentrate on your movements.");
    amily.effects.add(StatusEffectType.Concentration, 0, 0, 0, 0);
}

class AmilyAction implements ICombatAction {
    public name: string = 'Main Action';
    public flags: CombatAbilityFlag = CombatAbilityFlag.MainAction;
    public reasonCannotUse: string = '';
    public actions: ICombatAction[] = [];
    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        if (!character.effects.has(StatusEffectType.Concentration) && randInt(4) === 0) return amilyConcentration(target, character);
        else if (randInt(3) === 0) return amilyDartGo(target, character);
        else if (randInt(2) === 0) return amilyDoubleAttack(target, character);
        else return amilyAttack(target, character);
    }
}

class AmilyRespond implements IActionRespond {
    public enemyTease(damage: number, self: Character, enemy: Character) {
        if (self.effects.has(StatusEffectType.Concentration)) {
            CView.text("Amily flushes hotly; her concentration only makes her pay more attention to your parts!");
            // lustDelta += 25 + lustDelta;
            self.stats.lust += 25;
            self.effects.remove(StatusEffectType.Concentration);
        }
    }
}

class AmilyEndScenes extends EndScenes {
    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return conquerThatMouseBitch(enemy, this.char);
    }
}

export class Amily extends Character {
    public constructor() {
        super(CharacterType.Amily);
        this.description = new CharacterDescription(this, "", "Amily", "You are currently fighting Amily. The mouse-morph is dressed in rags and glares at you in rage, knife in hand. She keeps herself close to the ground, ensuring she can quickly close the distance between you two or run away.");
        // this.plural = false;
        this.body.vaginas.add(new Vagina(VaginaWetness.NORMAL, VaginaLooseness.NORMAL, false));
        this.effects.add(StatusEffectType.BonusVCapacity, 48, 0, 0, 0);
        this.body.chest.add(new BreastRow(breastCupInverse("C")));
        this.body.butt.looseness = ButtLooseness.VIRGIN;
        this.body.butt.wetness = ButtWetness.DRY;
        this.body.tallness = 4 * 12;
        this.body.hips.rating = HipRating.AMPLE;
        this.body.butt.rating = ButtRating.TIGHT;
        this.body.skin.tone = "tawny";
        this.body.skin.type = SkinType.FUR;
        // this.body.skin.desc = DEFAULT_SKIN_DESCS[SkinType.FUR];
        this.body.hair.color = "brown";
        this.body.hair.length = 5;
        this.baseStats.str.value = 30;
        this.baseStats.tou.value = 30;
        this.baseStats.spe.value = 85;
        this.baseStats.int.value = 60;
        this.baseStats.lib.value = 45;
        this.baseStats.sens.value = 45;
        this.baseStats.cor.value = 10;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("knife" as WeaponName, undefined, "knife", "slash", 6));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("rags" as ArmorName, undefined, "rags", 1));
        this.baseStats.bonusHP = 20;
        this.stats.lust = 20;
        this.stats.lustVuln = .85;
        this.stats.level = 4;
        this.inventory.gems = 2 + randInt(5);
        // this.drop = NO_DROP;
        this.combatContainer = new CombatContainer(this, new AmilyAction(), new AmilyRespond(), new AmilyEndScenes(this));
    }
}
