import { DisplayText } from '../../../../Engine/display/DisplayText';
import { randInt } from '../../../../Engine/Utilities/SMath';
import { BreastRow } from '../../../Body/BreastRow';
import { ButtLooseness, ButtRating, ButtWetness } from '../../../Body/Butt';
import { Cock, CockType } from '../../../Body/Cock';
import { HipRating } from '../../../Body/Hips';
import { SkinType } from '../../../Body/Skin';
import { Tail, TailType } from '../../../Body/Tail';
import { Character } from '../../../Character/Character';
import { CharacterDescription } from '../../../Character/CharacterDescription';
import { CharacterType } from '../../../Character/CharacterType';
import { ActionPerform } from '../../../Combat/ActionPerform';
import { CombatAction } from '../../../Combat/Actions/CombatAction';
import { CombatContainer } from '../../../Combat/CombatContainer';
import { DefaultRespond } from '../../../Combat/Default/DefaultRespond';
import { DefeatType } from '../../../Combat/DefeatEvent';
import { EndScenes } from '../../../Combat/EndScenes';
import { CombatEffectType } from '../../../Effects/CombatEffectType';
import { PerkType } from '../../../Effects/PerkType';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Armor } from '../../../Items/Armors/Armor';
import { ArmorName } from '../../../Items/Armors/ArmorName';
import { Weapon } from '../../../Items/Weapons/Weapon';
import { WeaponName } from '../../../Items/Weapons/WeaponName';
import { NextScreenChoices } from '../../../ScreenDisplay';
import { Scenes } from '../../Scenes';

class Attack implements CombatAction {
    public name: string = "Attack";
    public reasonCannotUse: string;
    public isPossible(akbal: Character): boolean {
        return true;
    }
    public canUse(akbal: Character, enemy?: Character): boolean {
        return true;
    }
    public use(akbal: Character, enemy?: Character): NextScreenChoices {
        // Chances to miss:
        let damage: number = 0;
        // Blind dodge change
        if (akbal.combat.effects.has(CombatEffectType.Blind)) {
            DisplayText(akbal.desc.capitalA + akbal.desc.short + " seems to have no problem guiding his attacks towards you, despite his blindness.\n");
        }
        // Determine if dodged!
        if (enemy.stats.spe - akbal.stats.spe > 0 && randInt(((enemy.stats.spe - akbal.stats.spe) / 4) + 80) > 80) {
            if (enemy.stats.spe - akbal.stats.spe < 8)
                DisplayText("You narrowly avoid " + akbal.desc.a + akbal.desc.short + "'s " + akbal.inventory.equipment.weapon.verb + "!");
            if (enemy.stats.spe - akbal.stats.spe >= 8 && enemy.stats.spe - akbal.stats.spe < 20)
                DisplayText("You dodge " + akbal.desc.a + akbal.desc.short + "'s " + akbal.inventory.equipment.weapon.verb + " with superior quickness!");
            if (enemy.stats.spe - akbal.stats.spe >= 20)
                DisplayText("You deftly avoid " + akbal.desc.a + akbal.desc.short + "'s slow " + akbal.inventory.equipment.weapon.verb + ".");
            return;
        }
        // Determine if evaded
        if (enemy.perks.has(PerkType.Evade) && randInt(100) < 10) {
            DisplayText("Using your skills at evading attacks, you anticipate and sidestep " + akbal.desc.a + akbal.desc.short + "'s attack.");
            return;
        }
        // Determine if flexibilitied
        if (enemy.perks.has(PerkType.Flexibility) && randInt(100) < 10) {
            DisplayText("Using your cat-like agility, you twist out of the way of " + akbal.desc.a + akbal.desc.short + "'s attack.");
            return;
        }
        // Determine damage - str modified by enemy toughness!
        // *Normal Attack A -
        if (randInt(2) === 0) {
            // (medium HP damage)
            damage = Math.floor((akbal.stats.str + akbal.inventory.equipment.weapon.attack) - Math.random() * (enemy.stats.tou) - enemy.inventory.equipment.armor.defense);
            if (damage <= 0) {
                DisplayText("Akbal lunges forwards but with your toughness");
                if (enemy.inventory.equipment.armor.defense > 0)
                    DisplayText(" and " + enemy.inventory.equipment.armor.displayName + ", he fails to deal any damage.");
                else
                    DisplayText(" he fails to deal any damage.");
            }
            else {
                DisplayText("Akbal rushes at you, his claws like lightning as they leave four red-hot lines of pain across your stomach.");
                enemy.combat.stats.loseHP(damage, akbal);
            }
        }
        else { // *Normal Attack B
            // (high HP damage)
            damage = Math.floor((akbal.stats.str + 25 + akbal.inventory.equipment.weapon.attack) - Math.random() * (enemy.stats.tou) - enemy.inventory.equipment.armor.defense);
            if (damage === 0) {
                DisplayText("Akbal lunges forwards but between your toughness ");
                if (enemy.inventory.equipment.armor.defense > 0)
                    DisplayText("and " + enemy.inventory.equipment.armor.displayName + ", he fails to deal any damage.");
            }
            else {
                DisplayText("Akbal snarls as he flies towards you, snapping his ivory teeth on your arm. You scream out in pain as you throw him off.");
                enemy.combat.stats.loseHP(damage, akbal);
            }
        }
        return;
    }
}

class LustAttack implements CombatAction {
    public name: string = "Lust Attack";
    public reasonCannotUse: string;
    public isPossible(akbal: Character): boolean {
        return true;
    }
    public canUse(akbal: Character, enemy?: Character): boolean {
        return true;
    }
    public use(akbal: Character, enemy?: Character): NextScreenChoices {
        if (!enemy.combat.effects.has(CombatEffectType.Whispered)) {
            DisplayText("You hear whispering in your head. Akbal begins speaking to you as he circles you, telling all the ways he'll dominate you once he beats the fight out of you.");
            // (Lust increase)
            enemy.stats.lust += 7 + (100 - enemy.stats.int) / 10;
            enemy.combat.effects.add(CombatEffectType.Whispered, 0, 0, 0, 0);
        }
        // Continuous Lust Attack -
        else {
            DisplayText("The whispering in your head grows, many voices of undetermined sex telling you all the things the demon wishes to do to you. You can only blush.");
            // (Lust increase)
            enemy.stats.lust += 12 + (100 - enemy.stats.int) / 10;
        }
        return;
    }
}

class Special implements CombatAction {
    public name: string = "Special";
    public reasonCannotUse: string;
    public isPossible(akbal: Character): boolean {
        return true;
    }
    public canUse(akbal: Character, enemy?: Character): boolean {
        return true;
    }
    public use(akbal: Character, enemy?: Character): NextScreenChoices {
        // *Special Attack A -
        if (randInt(2) === 0 && enemy.stats.spe > 20) {
            const speedChange: number = enemy.stats.spe / 5 * -1;
            DisplayText("Akbal's eyes fill with light, and a strange sense of fear begins to paralyze your limbs.");
            // (Speed decrease)
            enemy.stats.spe += speedChange;
            if (enemy.combat.effects.has(CombatEffectType.AkbalSpeed))
                enemy.combat.effects.get(CombatEffectType.AkbalSpeed).value1 = speedChange;
            else
                enemy.combat.effects.add(CombatEffectType.AkbalSpeed, speedChange, 0, 0, 0);
        }
        // *Special Attack B -
        else {
            DisplayText("Akbal releases an ear-splitting roar, hurling a torrent of emerald green flames towards you.\n");
            // (high HP damage)
            // Determine if dodged!
            const speedDif = enemy.stats.spe - akbal.stats.spe;
            const akbalName = akbal.desc.a + akbal.desc.short;
            if (speedDif > 0 && Math.floor(Math.random() * (((speedDif) / 4) + 80)) > 80) {
                if (speedDif < 8)
                    DisplayText("You narrowly avoid " + akbalName + "'s fire!");
                if (speedDif >= 8 && speedDif < 20)
                    DisplayText("You dodge " + akbalName + "'s fire with superior quickness!");
                if (speedDif >= 20)
                    DisplayText("You deftly avoid " + akbalName + "'s slow fire-breath.");
                return;
            }
            // Determine if evaded
            if (enemy.perks.has(PerkType.Evade) && randInt(100) < 20) {
                DisplayText("Using your skills at evading attacks, you anticipate and sidestep " + akbalName + "'s fire-breath.");
                return;
            }
            // Determine if flexibilitied
            if (enemy.perks.has(PerkType.Flexibility) && randInt(100) < 10) {
                DisplayText("Using your cat-like agility, you contort your body to avoid " + akbalName + "'s fire-breath.");
                return;
            }
            DisplayText("You are burned badly by the flames! (" + enemy.combat.stats.loseHP(40, akbal) + ")");
        }
        return;
    }
}

class Heal implements CombatAction {
    public name: string = "Heal";
    public reasonCannotUse: string;
    public isPossible(akbal: Character): boolean {
        return true;
    }
    public canUse(akbal: Character, enemy?: Character): boolean {
        return true;
    }
    public use(akbal: Character, enemy?: Character): NextScreenChoices {
        if (akbal.combat.stats.HPRatio() >= 1)
            DisplayText("Akbal licks himself, ignoring you for now.");
        else
            DisplayText("Akbal licks one of his wounds, and you scowl as the injury quickly heals itself.");
        akbal.combat.stats.gainHP(30, akbal);
        akbal.stats.lust += 10;
        return;
    }
}

class AkbalActions implements ActionPerform {
    public mainAction = new Attack();
    public approach: CombatAction;
    public recover: CombatAction;
    public squeeze: CombatAction;
    public struggle: CombatAction;
    public attack: CombatAction;

    public tease = new LustAttack();
    public spells: CombatAction;
    public items: CombatAction;

    public moveAway: CombatAction;
    public climb: CombatAction;
    public release: CombatAction;
    public run: CombatAction;

    public physicalSpecials = new Special();
    public magicalSpecials = new Heal();
    public wait: CombatAction;
    public fantasize: CombatAction;
    public inspect: CombatAction;
}

class AkbalEndScenes extends EndScenes {
    public hasEscaped(enemy: Character): boolean {
        return false;
    }
    public hasDefeated(enemy: Character): boolean {
        return false;
    }

    public claimsVictory(howAkbalWon: DefeatType, enemy: Character): void { }
    public criesInDefeat(howAkbalLost: DefeatType, enemy: Character): void { }

    protected beforeEndingScene(howAkbalLost: DefeatType, enemy: Character): void { }

    public readonly hasVictoryScene = true;
    protected victoryScene(howAkbalWon: DefeatType, enemy: Character): NextScreenChoices {
        if (howAkbalWon === DefeatType.HP) {
            return Scenes.forest.akbalScene.akbalWon(enemy, true, false);
        }
        else if (howAkbalWon === DefeatType.Lust) {
            return Scenes.forest.akbalScene.akbalWon(enemy, false, enemy.statusAffects.has(StatusAffectType.Infested));
        }
    }

    public readonly hasDefeatScene = true;
    protected defeatScene(howAkbalLost: DefeatType, enemy: Character): NextScreenChoices {
        if (howAkbalLost === DefeatType.HP) {
            return Scenes.forest.akbalScene.akbalDefeated(enemy, true);
        }
        else if (howAkbalLost === DefeatType.Lust) {
            return Scenes.forest.akbalScene.akbalDefeated(enemy, false);
        }
    }
}

export class Akbal extends Character {
    public constructor() {
        super(CharacterType.Akbal);
        this.description = new CharacterDescription(this, "Akbal", "Akbal, 'God of the Terrestrial Fire', circles around you. His sleek yet muscular body is covered in tan fur, with dark spots that seem to dance around as you look upon them.  His mouth holds two ivory incisors that glint in the sparse sunlight as his lips tremble to the sound of an unending growl.  Each paw conceals lethal claws capable of shredding men and demons to ribbons.  His large and sickeningly alluring bright green eyes promise unbearable agony as you look upon them.", false, "");
        this.torso.cocks.add(new Cock(CockType.DOG, 15, 2.5));
        this.torso.balls.quantity = 2;
        this.torso.balls.size = 4;
        this.cumMultiplier = 6;
        this.hoursSinceCum = 400;
        this.torso.chest.add(new BreastRow(0));
        this.torso.chest.add(new BreastRow(0));
        this.torso.chest.add(new BreastRow(0));
        this.torso.chest.add(new BreastRow(0));
        this.torso.butt.looseness = ButtLooseness.TIGHT;
        this.torso.butt.wetness = ButtWetness.NORMAL;
        this.tallness = 4 * 12;
        this.torso.hips.rating = HipRating.SLENDER;
        this.torso.butt.rating = ButtRating.TIGHT;
        this.skin.tone = "spotted";
        this.skin.type = SkinType.FUR;
        this.torso.neck.head.hair.color = "black";
        this.torso.neck.head.hair.length = 5;
        this.torso.tails.add(new Tail(TailType.DOG));
        this.baseStats.str = 55;
        this.baseStats.tou = 53;
        this.baseStats.spe = 50;
        this.baseStats.int = 75;
        this.baseStats.lib = 50;
        this.baseStats.sens = 50;
        this.baseStats.cor = 100;
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("claws" as WeaponName, undefined, "claws", "claw-slash", 5, 0));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("shimmering pelt" as ArmorName, undefined, "shimmering pelt", 5, 0));
        this.baseStats.bonusHP = 20;
        this.baseStats.lust = 30;
        this.baseStats.lustVuln = 0.8;
        this.baseStats.level = 6;
        this.inventory.gems = 15;
        // this.combat.rewards.drop = new WeightedDrop().
        //     add(consumables.INCUBID, 6).
        //     add(consumables.W_FRUIT, 3).
        //     add(weapons.PIPE, 1);
        this.combatContainer = new CombatContainer(this, new AkbalActions(), new DefaultRespond(), new AkbalEndScenes(this));
    }
}
