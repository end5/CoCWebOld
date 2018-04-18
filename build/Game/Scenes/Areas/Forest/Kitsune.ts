import { KitsuneFlags } from './KitsuneScene';
import DisplayText from '../../../../Engine/display/DisplayText';
import { randInt } from '../../../../Engine/Utilities/SMath';
import BreastRow, { BreastCup } from '../../../Body/BreastRow';
import { ButtLooseness, ButtRating, ButtWetness } from '../../../Body/Butt';
import Cock, { CockType } from '../../../Body/Cock';
import { HipRating } from '../../../Body/Hips';
import Tail, { TailType } from '../../../Body/Tail';
import Vagina, { VaginaLooseness, VaginaType, VaginaWetness } from '../../../Body/Vagina';
import Character from '../../../Character/Character';
import Description from '../../../Character/CharacterDescription';
import { CharacterType } from '../../../Character/CharacterType';
import ActionPerform from '../../../Combat/ActionPerform';
import CombatAction from '../../../Combat/Actions/CombatAction';
import CombatContainer from '../../../Combat/CombatContainer';
import DefaultRespond from '../../../Combat/Default/DefaultRespond';
import { DefeatType } from '../../../Combat/DefeatEvent';
import EndScenes from '../../../Combat/EndScenes';
import * as LegDescriptor from '../../../Descriptors/LegDescriptor';
import { CombatEffectType } from '../../../Effects/CombatEffectType';
import { PerkType } from '../../../Effects/PerkType';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Armor from '../../../Items/Armors/Armor';
import ArmorName from '../../../Items/Armors/ArmorName';
import Weapon from '../../../Items/Weapons/Weapon';
import WeaponName from '../../../Items/Weapons/WeaponName';
import User from '../../../User';
import Scenes from '../../Scenes';

class Entwine implements CombatAction {
    public name: string;
    public reasonCannotUse: string;
    public isPossible(kitsune: Character): boolean {
        return true;
    }
    public canUse(kitsune: Character, enemy?: Character): boolean {
        return !kitsune.combat.effects.has(CombatEffectType.PCTailTangle);
    }
    public use(kitsune: Character, enemy?: Character) {
        DisplayText("The kitsune closes in on you with a mischievous glint in her eyes.  You raise your guard, keeping your eyes trained on her to ensure that she doesn't try to pull anything.  Suddenly, you feel something coiling around your " + LegDescriptor.describeLeg(enemy) + ", and let out a yelp as you are suddenly lifted into the air, entangled in the kitsune's tails!");
        DisplayText("\n\nYour limbs are bound tightly while coils of delightfully soft fur caress you on all sides.  You can do little besides struggle against your furry bonds as the constant writhing of her tails sends shudders flying up and down your spine.");
        kitsune.combat.effects.add(CombatEffectType.PCTailTangle, 0, 0, 0, 0);
        enemy.stats.lust += 10 + enemy.stats.sens / 8;
    }
}

class Struggle implements CombatAction {
    public name: string;
    public reasonCannotUse: string;
    public isPossible(kitsune: Character): boolean {
        return true;
    }
    public canUse(kitsune: Character, enemy?: Character): boolean {
        return true;
    }
    public use(kitsune: Character, enemy?: Character) {
        DisplayText().clear();
        // Struggle:
        DisplayText("You struggle against the kitsune's tails with all your might, desperately trying to free yourself before she has her way with you.");
        // Success
        if (randInt(20) + enemy.stats.str / 20 + kitsune.combat.effects.get(CombatEffectType.PCTailTangle).value1 >= 12) {
            DisplayText("  Summoning up reserves of strength you didn't know you had, you wrench yourself free of her tails, pushing her away.\n\n");
            kitsune.combat.effects.remove(CombatEffectType.PCTailTangle);
        }
        // Failure - +5-10 LUST
        else {
            DisplayText("  Despite your valiant efforts, your wriggling only serves to get you deeper entangled in the fluffy tails, eliciting an amused giggle from the kitsune.");
            DisplayText("\n\nShe licks her lips, running her hands along you wherever she can find exposed flesh.  Her fingertips leave small trails of dazzling blue that make you flush with lust - you must escape her grasp soon or else you will be like putty in her hands!");
            enemy.stats.lust += 5 + enemy.stats.sens / 10;
            kitsune.combat.effects.get(CombatEffectType.PCTailTangle).value1 = 3;
        }
    }
}

class Wait implements CombatAction {
    public name: string;
    public reasonCannotUse: string;
    public isPossible(kitsune: Character): boolean {
        return true;
    }
    public canUse(kitsune: Character, enemy?: Character): boolean {
        return true;
    }
    public use(kitsune: Character, enemy?: Character) {
        DisplayText().clear();
        DisplayText("Happily, you slump deeper into the fluffy tails, eliciting an amused giggle from the kitsune.");
        if (User.settings.silly()) DisplayText("  You're so glad you got to touch fluffy tail.");
        DisplayText("\n\nShe licks her lips, running her hands along you wherever she can find exposed flesh.  Her fingertips leave small trails of dazzling blue that make you flush with lust - you must escape her grasp soon or else you will be like putty in her hands!");
        enemy.stats.lust += 5 + enemy.stats.sens / 10;
    }
}

// Fox Fire: - Low piercing damage, +10-15 LUST
class FoxFire implements CombatAction {
    public name: string;
    public reasonCannotUse: string;
    public isPossible(kitsune: Character): boolean {
        return true;
    }
    public canUse(kitsune: Character, enemy?: Character): boolean {
        return true;
    }
    public use(kitsune: Character, enemy?: Character) {
        DisplayText("The kitsune makes a small circle in the air with her fingers, conjuring up a pale blue flame into her palm with the sound of flint striking against steel.  Pursing her lips, she blows it toward you with a kiss.");
        DisplayText("\n\nThe flames burn furiously, but leave you with an incredibly pleasant tingling sensation all over your body.  Your skin flushes with excitement, and you can feel blood rushing to your extremities, making you shudder with pleasure.");
        let damage: number = 5 + randInt(20);
        damage = enemy.combat.stats.loseHP(damage, kitsune);
        DisplayText(" (" + damage + ")");
        enemy.stats.lust += 15 + enemy.stats.sens / 10;
    }
}

// Illusion: - Raises enemy evasion, but can be resisted.
// Factors affecting resist: INT (1% per point, max 70%), "Whispered" perk (20% flat bonus), "Religious" background and < 20 corruption (20% bonus at 0, losing 1% per point of corruption.)
class Illusion implements CombatAction {
    public name: string;
    public reasonCannotUse: string;
    public isPossible(kitsune: Character): boolean {
        return true;
    }
    public canUse(kitsune: Character, enemy?: Character): boolean {
        return !kitsune.combat.effects.has(CombatEffectType.Illusion);
    }
    public use(kitsune: Character, enemy?: Character) {
        DisplayText("You struggle to keep your eyes on the kitsune, ghostly laughter echoing all around you as you turn to and fro, trying to track her movements.  It almost seems like the edges of reality are blurring around her, severely distorting your perceptions and making it hard to follow her.  It's going to be much harder to hit her if she keeps this up!");
        // Resist: - successfully resisting deals small health & lust damage to kitsune
        let resist: number = 0;
        if (enemy.stats.int < 30) resist = Math.round(enemy.stats.int);
        else resist = 30;
        if (enemy.perks.has(PerkType.Whispered)) resist += 20;
        if (enemy.perks.has(PerkType.HistoryReligious) && enemy.stats.cor < 20) resist += 20 - enemy.stats.cor;
        if (randInt(100) < resist) {
            DisplayText("\n\nThe kitsune seems to melt away before your eyes for a moment, as though the edges of reality are blurring around her.  You tighten your focus, keeping your eyes trained on her, and she suddenly reels in pain, clutching her forehead as she is thrust back into view.  She lets out a frustrated huff of disappointment, realizing that you have resisted her illusions.");
        }
        else {
            kitsune.combat.effects.add(CombatEffectType.Illusion, 0, 0, 0, 0);
            enemy.stats.spe += 20;
        }
    }
}

// Seal: - cancels and disables whatever command the player uses this round. Lasts 3 rounds, cannot seal more than one command at a time.
// PCs with "Religious" background and < 20 corruption have up to 20% resistance to sealing at 0 corruption, losing 1% per corruption.
class Seal implements CombatAction {
    public name: string;
    public reasonCannotUse: string;
    public isPossible(kitsune: Character): boolean {
        return true;
    }
    public canUse(kitsune: Character, enemy?: Character): boolean {
        return !enemy.combat.effects.has(CombatEffectType.Sealed);
    }
    public use(kitsune: Character, enemy?: Character) {
        let resist: number = 0;
        if (enemy.stats.int < 30) resist = Math.round(enemy.stats.int);
        else resist = 30;
        if (enemy.perks.has(PerkType.Whispered)) resist += 20;
        if (enemy.perks.has(PerkType.HistoryReligious) && enemy.stats.cor < 20) resist += 20 - enemy.stats.cor;
        const select: number = randInt(7);
        // Attack:
        if (select === 0) {
            DisplayText("The kitsune playfully darts around you, grinning coyly.  She somehow slips in under your reach, and before you can react, draws a small circle on your chest with her fingertip.  As you move to strike again, the flaming runic symbol she left on you glows brightly, and your movements are halted mid-swing.");
            DisplayText("\n\n\"<i>Naughty naughty, you should be careful with that.</i>\"");

            DisplayText("\n\nDespite your best efforts, every time you attempt to attack her, your muscles recoil involuntarily and prevent you from going through with it.  <b>The kitsune's spell has sealed your attack!</b>  You'll have to wait for it to wear off before you can use your basic attacks.");
            enemy.combat.effects.add(CombatEffectType.Sealed, 4, 0, 0, 0);
        }
        else if (select === 1) {
            // Tease:
            DisplayText("You are taken by surprise when the kitsune appears in front of you out of nowhere, trailing a fingertip down your chest.  She draws a small circle, leaving behind a glowing, sparking rune made of flames.  You suddenly find that all your knowledge of seduction and titillation escapes you.  <b>The kitsune's spell has sealed your ability to tease!</b>  Seems you won't be getting anyone hot and bothered until it wears off.");
            enemy.combat.effects.add(CombatEffectType.Sealed, 4, 1, 0, 0);
        }
        // Spells:
        else if (select === 2) {
            DisplayText("\"<i>Oh silly, trying to beat me at my own game are you?</i>\"  the kitsune says with a smirk, surprising you as she appears right in front of you.  She traces a small circle around your mouth, and you find yourself stricken mute!  You try to remember the arcane gestures to cast your spell and find that you've forgotten them too.  <b>The kitsune's spell has sealed your magic!</b>  You won't be able to cast any spells until it wears off.");
            enemy.combat.effects.add(CombatEffectType.Sealed, 4, 2, 0, 0);
        }
        // Items:
        else if (select === 3) {
            DisplayText("\"<i>Tsk tsk, using items?  That's cheating!</i>\"  the kitsune says as she appears right in front of you, taking you off guard.  Her finger traces a small circle on your pouch, leaving behind a glowing rune made of crackling flames.  No matter how hard you try, you can't seem to pry it open.  <b>The kitsune's spell has sealed your item pouch!</b>  Looks like you won't be using any items until the spell wears off.");
            enemy.combat.effects.add(CombatEffectType.Sealed, 4, 3, 0, 0);
        }
        // Run:
        else if (select === 4) {
            DisplayText("\"<i>Tsk tsk, leaving so soon?</i>\"  the kitsune says, popping up in front of you suddenly as you attempt to make your escape.  Before you can react, she draws a small circle on your chest with her fingertip, leaving behind a glowing rune made of crackling blue flames.  You try to run the other way, but your " + LegDescriptor.describeLegs(enemy) + " won't budge!\n\n\"<i>Sorry baby, you'll just have to stay and play~.</i>\" she says in a singsong tone, appearing in front of you again.  <b>The kitsune's spell prevents your escape!</b>  You'll have to tough it out until the spell wears off.");
            enemy.combat.effects.add(CombatEffectType.Sealed, 4, 4, 0, 0);
        }
        // P.Special:
        else if (select === 5) {
            DisplayText("You jump with surprise as the kitsune appears in front of you, grinning coyly.  As she draws a small circle on your forehead with her fingertip, you find that you suddenly can't remember how to use any of your physical skills!");
            DisplayText("\n\n\"<i>Oh no darling, </i>I'm<i> the one with all the tricks here.</i>\"");
            DisplayText("\n\n<b>The kitsune's spell has sealed your physical skills!</b>  You won't be able to use any of them until the spell wears off.");
            enemy.combat.effects.add(CombatEffectType.Sealed, 4, 5, 0, 0);
        }
        // M.Special:
        else {
            DisplayText("You jump with surprise as the kitsune appears in front of you, grinning coyly.  As she draws a small circle on your forehead with her fingertip, you find that you suddenly can't remember how to use any of your magical skills!");
            DisplayText("\n\n\"<i>Oh no darling, </i>I'm<i> the one with all the tricks here.</i>\"");
            DisplayText("\n\n<b>The kitsune's spell has sealed your magical skills!</b>  You won't be able to use any of them until the spell wears off.");
            enemy.combat.effects.add(CombatEffectType.Sealed, 4, 6, 0, 0);
        }
        if (resist >= randInt(100)) {
            DisplayText("\n\nUpon your touch, the seal dissipates, and you are free of the kitsune's magic!  She pouts in disappointment, looking thoroughly irritated, but quickly resumes her coy trickster facade.");
            enemy.combat.effects.remove(CombatEffectType.Sealed);
        }
    }
}

class Tease implements CombatAction {
    public name: string;
    public reasonCannotUse: string;
    public isPossible(kitsune: Character): boolean {
        return true;
    }
    public canUse(kitsune: Character, enemy?: Character): boolean {
        return true;
    }
    public use(kitsune: Character, enemy?: Character) {
        let select: number = randInt(3);
        if (kitsune.torso.neck.head.hair.color === "red" && randInt(2) === 0) select = 3;
        if (select === 0) DisplayText("You rub your eyes, suddenly seeing triple as you find yourself in the midst of a crowd of kitsune doppelgangers.  They run their hands all over you, teasing and doting on you as their tails caress every inch of your body.  Taken by surprise, you forget to fight back until they have already dispersed, blending back into a single fox-woman.");
        else if (select === 1) DisplayText("Bending forward, the kitsune runs her hands down over her breasts, jiggling them enticingly and squeezing them together.  Hooking a finger in her robes, she slides it down, tugging them aside until her nipples are just barely covered, and with a teasing smirk, pulls them back up, leaving you wanting.");
        else if (select === 2) DisplayText("Turning her back to you, the kitsune fans out her tails, peering back as she lifts the hem of her robe to expose her plump hindquarters.  Her tails continually shift and twist, blocking your view, but it only serves to make you want it even <i>more</i>, licking your lips in anticipation.");
        // Redhead only:
        else DisplayText("The kitsune sways her hips enticingly as she appears in front of you abruptly, rubbing up against your side.  Her teasing caresses make you shiver with arousal, and you can feel something thick and warm pressing against your [hips].  She gives you a wry grin as she breaks away from you, sporting an obvious tent in her robes.  \"<i>Just you wait...</i>\"");
        enemy.stats.lust += 5 + enemy.stats.sens / 7;
    }
}

class MainAction implements CombatAction {
    public name: string;
    public reasonCannotUse: string;
    public isPossible(kitsune: Character): boolean {
        return true;
    }
    public canUse(kitsune: Character, enemy?: Character): boolean {
        return true;
    }
    public use(kitsune: Character, enemy?: Character) {
        const foxFire = new FoxFire();
        const entwine = new Entwine();
        const seal = new Seal();
        const illusion = new Illusion();
        const tease = new Tease();
        const moves = [foxFire.use, foxFire.use, tease.use, tease.use];
        if (seal.canUse(kitsune, enemy)) moves.push(seal.use);
        if (seal.canUse(kitsune, enemy)) moves.push(seal.use);
        if (entwine.canUse(kitsune, enemy)) moves.push(entwine.use);
        if (illusion.canUse(kitsune, enemy)) moves.push(illusion.use);
        moves[randInt(moves.length)](kitsune, enemy);
    }
}

class KistuneActions implements ActionPerform {
    public mainAction = new MainAction();
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

class KitsuneEndScenes extends EndScenes {
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
    protected victoryScene(howYouWon: DefeatType, enemy: Character): void {
        if (howYouWon === DefeatType.Lust && enemy.statusAffects.has(StatusAffectType.Infested)) {
            DisplayText("\n\nThe kitsune recoils before running off, no longer interested in you...");
        }
        else {
            Scenes.forest.kitsuneScene.loseToKitsunes(this.char, enemy);
        }
    }
    public readonly hasDefeatScene: boolean = true;
    protected defeatScene(howYouLost: DefeatType, enemy: Character): void {
        Scenes.forest.kitsuneScene.defeatTheKitsunes(enemy);
    }
}

export default class Kitsune extends Character {
    public constructor(hairColor: string) {
        super(CharacterType.Kitsune);
        const kitsuneData = User.flags.get(CharacterType.Kitsune) as KitsuneFlags;
        if (randInt(3) !== 2) kitsuneData.redheadIsFuta = 1;
        const hairDesc = {
            blonde: "long flaxen",
            black: "lustrous, ass-length black",
            red: "unkempt, shoulder-length reddish"
        }[hairColor];
        this.description = new Description(this, "kitsune", "A kitsune stands in front of you, about five and a half feet tall.  She has a head of " + hairDesc +
            " hair.  She appears mostly human, except for a pair of large, furry ears poking through her hair and six luxurious silky tails swaying in the air behind her.  Her robes are revealing but comfortable-looking, hugging her voluptuous curves and exposing large swaths of tattooed skin.  A layer of ornate tattoos covers patches of her exposed flesh, accentuating her feminine curves nicely, and each movement brings a pleasant jiggle from her plump backside and large breasts.", false, "a ");
        if (hairColor === "red" && kitsuneData.redheadIsFuta === 1) {
            this.torso.cocks.add(new Cock(randInt(13) + 14, 1.5 + randInt(20) / 2, CockType.HUMAN));
            this.torso.balls.quantity = 2;
            this.torso.balls.size = 2 + randInt(13);
            this.cumMultiplier = 1.5;
            this.hoursSinceCum = this.torso.balls.size * 10;
        }
        this.torso.vaginas.add(new Vagina(VaginaType.HUMAN, VaginaWetness.SLICK, VaginaLooseness.NORMAL, false));
        this.statusAffects.add(StatusAffectType.BonusVCapacity, 20, 0, 0, 0);
        this.torso.chest.add(new BreastRow(BreastCup.D));
        this.torso.butt.looseness = ButtLooseness.TIGHT;
        this.torso.butt.wetness = ButtWetness.NORMAL;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 20, 0, 0, 0);
        this.tallness = randInt(24) + 60;
        this.torso.hips.rating = HipRating.AMPLE;
        this.torso.butt.rating = ButtRating.AVERAGE + 1;
        this.skin.tone = "pale";
        this.torso.neck.head.hair.color = hairColor;
        this.torso.neck.head.hair.length = 13 + randInt(20);
        this.baseStats.str = 35;
        this.baseStats.tou = 45;
        this.baseStats.spe = 90;
        this.baseStats.int = 95;
        this.baseStats.lib = 60;
        this.baseStats.sens = 65;
        this.baseStats.cor = 45;
        this.baseStats.HP = this.stats.maxHP();
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("claws" as WeaponName, undefined, "claws", "punch", 0, 0));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("skin" as ArmorName, undefined, "skin", 0, 0));
        this.baseStats.bonusHP = 120;
        this.baseStats.lust = 20;
        this.baseStats.lustVuln = 0.9;
        // this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
        this.baseStats.level = 6;
        this.inventory.gems = randInt(10) + 10;
        // this.drop = new WeightedDrop(consumables.FOXJEWL, 1);
        this.torso.tails.add(new Tail(TailType.FOX));
        this.combatContainer = new CombatContainer(this, new KistuneActions(), new DefaultRespond(), new KitsuneEndScenes(this));
    }
}
