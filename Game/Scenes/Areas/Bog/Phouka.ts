import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { Cock } from "../../../Body/Cock";
import { BreastRow } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { HipRating } from "../../../Body/Hips";
import { ArmType } from "../../../Body/Arms";
import { LegType } from "../../../Body/Legs";
import { EarType } from "../../../Body/Ears";
import { Armor } from "../../../Items/Armors/Armor";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { WingType } from "../../../Body/Wings";
import { NextScreenChoices } from "../../../ScreenDisplay";
import { StatusEffectType } from "../../../Effects/StatusEffectType";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { CView } from "../../../../Engine/Display/ContentView";
import { combatMiss, combatEvade, combatFlexibility, combatMisdirect, combatDodge } from "../../../Combat/CombatUtils";
import { ItemType } from "../../../Items/ItemType";
import { EndScenes } from "../../../Combat/EndScenes";
import { DefeatType } from "../../../Combat/DefeatEvent";
import { PhoukaFlags, PhoukaForm, phoukaSexGoat, phoukaSexBunny, phoukaSexHorse, phoukaPlayerWins } from "./PhoukaScene";
import { ICombatAction } from "../../../Combat/Actions/ICombatAction";
import { CombatAbilityFlag } from "../../../Effects/CombatAbilityFlag";
import { IActionRespond } from "../../../Combat/IActionRespond";

/**
 * Created by K.Quesom 11.06.14
 */

function phoukaFightAttack(self: Character, target: Character) {
    let damage: number;
    // Only the bunny, goat and horse forms make physical attacks
    if (self.effects.has(StatusEffectType.Blind) && randInt(3) < 1) {
        CView.text(self.desc.a + self.desc.short + " completely misses you due to his blindness!\n");
    }
    else if (PhoukaFlags.FORM === PhoukaForm.BUNNY) {
        damage = Math.round((60 + 30 + 10) - randInt(target.stats.tou) - target.combat.stats.defense()); // 60 == Bunny Strength, 30 == Bunny Weapon Attack
        CView.text("The bunny morph hops towards you.  At the last second he changes direction and throws a kick toward you with his powerful hind legs.");
        if (combatDodge(self, target))
            CView.text("\nThrowing yourself out of the way, you manage to avoid the kick.  The " + self.desc.name + " hops out of reach and prepares for another attack.");
        else if (damage <= 0)
            CView.text("\nYou block his attack by moving your shoulder in close, absorbing the energy of the kick harmlessly.");
        else {
            target.combat.stats.loseHP(damage, self);
            CView.text("\nThe kick connects and leaves you reeling.");
        }
    }
    else if (PhoukaFlags.FORM === PhoukaForm.GOAT) {
        damage = Math.round((80 + 40 + 10) - randInt(target.stats.tou) - target.combat.stats.defense()); // 80 == Goat Strength, 40 == Goat Weapon Attack
        CView.text("The goat morph races toward you, head down.");
        if (combatDodge(self, target))
            CView.text("\nThrowing yourself out of the way, you manage to keep from getting skewered.");
        else if (damage <= 0)
            CView.text("\nYou manage to smack the goat morph in the side of the head.  The horns pass you by harmlessly.");
        else {
            target.combat.stats.loseHP(damage, self);
            CView.text("\nIts head and horns crash into you, leaving you winded and bruised.");
        }
    }
    else { // HORSE
        damage = Math.round((95 + 55 + 10) - randInt(target.stats.tou) - target.combat.stats.defense()); // 95 == Horse Strength, 55 == Horse Weapon Attack
        CView.text("The stallion charges you, clearly intending to trample you under its hooves.");
        if (combatDodge(self, target) || (damage <= 0))
            CView.text("\nAs the stallion passes you twist in place and manage to stay clear of its legs.");
        else {
            target.combat.stats.loseHP(damage, self);
            CView.text("\nYou get clipped by the stallion's legs and hooves as he charges. As he comes around for another pass you check over your body, amazed none of your bones are broken after that.");
        }
    }
}

function phoukaFightLustAttack(self: Character, target: Character) { // Only the faerie, bunny and horse forms make lust attacks
    if (PhoukaFlags.FORM === PhoukaForm.FAERIE)
        CView.text("The " + self.desc.name + " uses his wings to climb high up in the air above you.  Then he starts jerking his cock at you with one hand while fondling his balls with the other.  ");
    else if (PhoukaFlags.FORM === PhoukaForm.BUNNY)
        CView.text("The bunny morph leaps forward, trying to catch you off guard and grapple you.  ");
    else CView.text("The stallion rears up on his hind legs, waving his massive cock at you.  ");

    if (combatDodge(self, target)) {
        if (PhoukaFlags.FORM === PhoukaForm.BUNNY)
            CView.text("You throw yourself out of the way at the last moment and succeed in throwing the " + self.desc.name + " off balance. He staggers away, his attempted attack ruined.\n");
        else CView.text("You manage to look away in time and the " + self.desc.name + "'s lewd display has no real effect on you.\n");
    }
    else {
        if (PhoukaFlags.FORM === PhoukaForm.FAERIE)
            CView.text("A drizzle of precum rains down around you.  The sight of the " + self.desc.name + " pumping his shaft along with the smell of the salty yet sweet fluids makes you wish you could stop fighting and concentrate on pleasuring yourself.");
        else if (PhoukaFlags.FORM === PhoukaForm.BUNNY)
            CView.text("He grabs you and rubs up against your body.  For a moment you are lost in the feeling of his soft black fur.  Then you feel his cock pressing against your ribs and shove him away.");
        else CView.text("You are hypnotized by the equine cock jabbing at the air.  Then the " + self.desc.name + " charges past you and you can taste the musk in the air.");
        target.stats.lust += 15 + target.stats.lib / 10 + target.stats.cor / 5 + randInt(10);
    }
}

function phoukaFightSilence(self: Character, target: Character) { // Reuses the statusAffect Web-Silence from the spiders
    CView.text(self.desc.capitalA + self.desc.name + " scoops up some muck from the ground and rams it down over his cock.  After a few strokes he forms the lump of mud and precum into a ball and whips it at your face.  ");
    if (self.effects.has(StatusEffectType.Blind) && randInt(3) < 2)
        CView.text("Since he's blind the shot goes horribly wide, missing you entirely.");
    else if (combatMiss(self, target))
        CView.text("You lean back and let the muck ball whip pass to one side, avoiding the attack.");
    else if (combatEvade(self, target))
        CView.text("You pull back and to the side, blocking the shot with your arm. The muck splatters against it uselessly.");
    else if (combatMisdirect(self, target))
        CView.text(self.desc.capitalA + self.desc.name + " was watching you carefully before his throw.  That proves to be his undoing as your misleading movements cause him to lob the muck at the wrong time");
    else if (combatFlexibility(self, target))
        CView.text("As the ball leaves his fingers you throw yourself back, your spine bending in an inhuman way.  You feel the ball sail past, inches above your chest.");
    else {
        CView.text("The ball smacks into your face like a wet snowball.  It covers most of your nose and mouth with a layer of sticky, salty mud which makes it hard to breathe.  You'll be unable to use your magic while you're struggling for breath!\n");
        target.effects.add(StatusEffectType.WebSilence, 0, 0, 0, 0); // Probably safe to reuse the same status affect as for the spider morphs
    }
}

function phoukaTransformToBunny() {
    if (PhoukaFlags.FORM === PhoukaForm.BUNNY) return; // Already a bunny, so no change
    if (PhoukaFlags.FORM === PhoukaForm.FAERIE) {
        CView.text("The faerie suddenly drops out of the air.  A look of concentration sets in on its face and it begins to expand and warp.  You blink and see that in front of you there is now a 5 foot tall bunny morph.\n\n");
    }
    else if (PhoukaFlags.FORM === PhoukaForm.GOAT) {
        CView.text("As the goat morph charges towards you it starts to grow.  By the time it gets close it has changed completely and you now face a 5 foot tall bunny morph.\n\n");
    }
    else { // Was a horse
        CView.text("As the horse morph charges towards you it quite suddenly shrinks.  You have to adjust your defence as a 5 foot tall bunny morph is now hopping your way.\n\n");
    }
    this.long = "The " + this.desc.name + " is hopping around near you, waiting for an opening.  He has the general appearance of a bunny with coal black fur.  A large cock stands erect between his legs.  His cat-like green eyes, filled with lust, follow your every motion.";
    this.inventory.equipment.armor.value = 60;
    this.stats.spe = 90;
    PhoukaFlags.FORM = PhoukaForm.BUNNY;
}

function phoukaTransformToGoat() {
    if (PhoukaFlags.FORM === PhoukaForm.GOAT) return; // Already a goat, so no change
    if (PhoukaFlags.FORM === PhoukaForm.FAERIE) {
        CView.text("The faerie suddenly drops out of the air.  A look of concentration sets in on its face and it begins to expand and warp.  You blink and see that in front of you there is now a 4 foot tall goat morph.\n\n");
    }
    else if (PhoukaFlags.FORM === PhoukaForm.BUNNY) {
        CView.text("The bunny morph hops back from you and starts to melt and change.  You blink and see that in front of you there is now a 4 foot tall goat morph.\n\n");
    }
    else { // Was a horse
        CView.text("As the horse morph charges towards you it quite suddenly shrinks.  You have to adjust your defence as it is now a 4 foot tall goat morph.\n\n");
    }
    this.long = "The " + this.desc.name + " is charging back and forth just out of reach, waiting for an opening.  He has the general appearance of a goat with coal black fur.  He has large glossy black horns and a large cock between his legs.  His cat-like green eyes, filled with lust, follow your every motion.";
    this.inventory.equipment.armor.value = 60;
    this.stats.spe = 70;
    PhoukaFlags.FORM = PhoukaForm.GOAT;
}

function phoukaTransformToHorse() {
    if (PhoukaFlags.FORM === PhoukaForm.HORSE) return; // Already a horse, so no change
    if (PhoukaFlags.FORM === PhoukaForm.FAERIE) {
        CView.text("The faerie suddenly drops out of the air.  A look of concentration sets in on its face and it begins to grow larger and larger.  You watch amazed as the creature's form stretches.  Finally it seems unable to grow further and settles into the form of a massive stallion.\n\n");
    }
    else if (PhoukaFlags.FORM === PhoukaForm.BUNNY) {
        CView.text("The bunny morph hops back from you and starts to grow and melt.  You watch amazed as the creature's form stretches.  Finally it seems unable to grow further and settles into the form of a massive stallion.\n\n");
    }
    else { // Was a goat
        CView.text("The goat morph eyes you then seems to think better of charging again.  It backs away and starts to grow larger and larger, its features and body shape twisting and reforming.  Finally it seems unable to grow further and settles into the form of a massive stallion.\n\n");
    }
    this.long = "The " + this.desc.name + " is running in a wide circle around you, waiting for an opening.  He has the general appearance of a stallion with coal black fur.  A massive cock stands erect between his legs.  His cat-like green eyes, filled with lust, follow your every motion.";
    this.inventory.equipment.armor.value = 75;
    this.stats.spe = 55;
    PhoukaFlags.FORM = PhoukaForm.HORSE;
}

function phoukaTransformToPhouka() {
    if (PhoukaFlags.FORM === PhoukaForm.FAERIE) return; // Already a faerie, so no change
    if (PhoukaFlags.FORM === PhoukaForm.BUNNY) {
        CView.text("The bunny morph hops back from you and starts to melt and shrink.  In seconds only a tiny faerie is left floating in the air where the bunny once was.\n\n");
    }
    else if (PhoukaFlags.FORM === PhoukaForm.GOAT) {
        CView.text("The goat morph bounds away from you and starts to melt and deform.  In seconds only a tiny faerie is left floating in the air where the goat once was.\n\n");
    }
    else { // Was a horse
        CView.text("The horse morph charges past you.  You look over your shoulder and wonder where the stallion could have gone.  Then you see the tiny faerie zipping back for another attack.\n\n");
    }
    this.long = "The " + this.desc.name + " is flying around near you, waiting for an opening.  He has the general appearance of a faerie, though he is slightly larger and his skin and wings are coal black.  A large cock stands erect between his legs.  His cat-like green eyes, filled with lust, follow your every motion.";
    this.inventory.equipment.armor.value = 80;
    this.stats.spe = 80;
    PhoukaFlags.FORM = PhoukaForm.FAERIE;
}

class PhoukaAction implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MainAction;
    public name: string = 'Action';
    public reasonCannotUse: string = '';
    public actions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }
    public canUse(character: Character, target?: Character): boolean {
        return true;
    }
    public use(character: Character, target: Character): NextScreenChoices {
        const blinded: boolean = character.effects.has(StatusEffectType.Blind);
        if ((!blinded) && !target.effects.has(StatusEffectType.WebSilence) && randInt(4) === 0) {
            phoukaTransformToPhouka(); // Change to faerie form so that it can lob the ball of muck at you
            phoukaFightSilence(character, target);
        }
        else {
            let transformChance: number = randInt(9); // 2 in 3 chance of staying in current form
            if (PhoukaFlags.FORM === PhoukaForm.FAERIE) {
                if (blinded) transformChance = randInt(3); // 100% chance of change from blind phouka if not doing silence attack
                else transformChance = randInt(4); // 75% chance of change from phouka if not doing silence attack
            }
            switch (transformChance) {
                case 0: phoukaTransformToBunny(); break;
                case 1: phoukaTransformToGoat(); break;
                case 2: phoukaTransformToHorse(); break;
                default:
            }
            if (PhoukaFlags.FORM === PhoukaForm.FAERIE)
                phoukaFightLustAttack(character, target); // Can only get here if the phouka isn’t blind
            else if ((PhoukaFlags.FORM === PhoukaForm.BUNNY) && (randInt(4) !== 0) && (!blinded))
                phoukaFightLustAttack(character, target); // Bunny has a 75% chance of teasing attack, no teasing while blind
            else if ((PhoukaFlags.FORM === PhoukaForm.HORSE) && (randInt(4) === 0) && (!blinded))
                phoukaFightLustAttack(character, target); // Horse has a 25% chance of teasing attack, no teasing while blind
            else phoukaFightAttack(character, target);
        }
        return;
    }
}

class PhoukaResponds implements IActionRespond {
    public enemyTease(damage: number, self: Character, enemy: Character) {
        if (damage >= 10)
            CView.text("\n\nThe " + self.desc.name + " breaks off its attack in the face of your teasing.  Its drooling member leaves a trail of precum along the ground and you get the feeling it needs to end this fight quickly.");
        else if (damage >= 5)
            CView.text("\n\nThe " + self.desc.name + " stops its assault for a moment.  A glob of precum oozes from its cock before it shakes its head and gets ready to attack again.");
        else if (damage > 0)
            CView.text("\n\nThe " + self.desc.name + " hesitates and slows down.  You see its cock twitch and then it readies for the next attack.");
    }
}

class PhoukaEndScenes extends EndScenes {
    protected victoryScene(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        let nextScene;

        if (enemy.body.vaginas.length > 0) { // Phouka prefer vaginal if they can get it
            if (enemy.body.legs.isTaur() || randInt(2) === 0)
                nextScene = phoukaSexHorse; // And they love mating with female or herm centaurs in their horse form
            else nextScene = phoukaSexBunny;
        }
        else nextScene = phoukaSexGoat;

        if (enemy.effects.has(StatusEffectType.CameWorms)) {
            CView.text("\n\nThe " + this.char.desc.name + " looks on, amused. <i>“Kinky! But those wee things can't handle whiskey, so I’m safe from ‘em. Now be a good ");
            if (enemy.body.vaginas.length > 0)
                CView.text("lass and spread yer legs for me.”</i>\n\n");
            else CView.text("lad and spread yer asscheeks for me.”</i>\n\n");
            return { next: nextScene };
        }
        return nextScene(enemy, true, howYouWon !== DefeatType.HP);
    }

    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return phoukaPlayerWins(enemy, howYouLost === DefeatType.HP);
    }
}

export function handleAwardItemText(player: Character, itype: ItemType): NextScreenChoices {
    CView.text("  You are just about to leave when you remember that glint from the hollow of that nearby tree.");
    if (itype === undefined)
        CView.text("\n\nYou take a look and curse the " + this.desc.name + ".  Looks like it used a piece of a broken bottle to lure you in.  At least you learned more about fighting the little pests.  You gain " + this.stats.XP + " XP from your victory.");
    else CView.text("\n\nYou look inside the hollow and are pleased to find " + itype.longName + ".  You also gain " + this.stats.XP + " XP from your victory, since you learned a bit more about fighting these little pests.\n\n");
}

export function handleAwardText(player: Character): NextScreenChoices {
    // Talk about gems and XP when the player looks in the hollow of the tree instead of here
}

export function handleCombatLossText(inDungeon: boolean, gemsLost: number): number {
    if (player.inventory.gems > 1)
        CView.text("  Once free you check your gem pouch and realize the " + this.desc.name + " took " + gemsLost + " of your gems.");
    else if (player.inventory.gems === 1)
        CView.text("  Once free you check your gem pouch and realize the " + this.desc.name + " took your only gem.");
    return 1; // Only use up one hour after combat loss
}

export class Phouka extends Character {
    public constructor(phoukaName: string) {
        super(CharacterType.Phouka);
        this.description = new CharacterDescription(this, "the ", phoukaName, "The " + phoukaName + " is flying around near you, waiting for an opening.  He has the general appearance of a faerie, though he is slightly larger and his skin and wings are coal black.  A large cock stands erect between his legs.  His cat-like green eyes, filled with lust, follow your every motion.");
        this.body.cocks.add(new Cock(1, 0.5));
        this.body.balls.count = 2;
        this.body.balls.size = 1;
        this.body.cumMultiplier = 5;
        this.hoursSinceCum = 20;
        this.body.chest.add(new BreastRow(0));
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.NORMAL;

        this.body.tallness = 5;
        this.body.hips.rating = HipRating.SLENDER;
        this.body.butt.rating = ButtRating.TIGHT;
        this.body.legs.type = LegType.HUMAN;
        this.body.arms.type = ArmType.HUMAN;

        this.body.skin.tone = "black";
        this.body.hair.color = "black";
        this.body.hair.length = 1;

        this.body.ears.type = EarType.ELFIN;

        this.baseStats.str.value = 55;
        this.baseStats.tou.value = 25;
        this.baseStats.spe.value = 80;
        this.baseStats.int.value = 40;
        this.baseStats.lib.value = 75;
        this.baseStats.sens.value = 35;
        this.baseStats.cor.value = 100;

        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("claws" as WeaponName, undefined, "claws", "claw", 15));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("skin" as ArmorName, undefined, "skin", 80));

        this.baseStats.bonusHP = 300;
        this.baseStats.lust.value = 30;
        this.baseStats.lustVuln = .5;

        this.baseStats.level = 14;
        this.inventory.gems = 0;
        // this.drop = new WeightedDrop().add(consumables.BLACK_D, 20)
        //     .add(consumables.RIZZART, 10)
        //     .add(consumables.GROPLUS, 2)
        //     .add(consumables.SDELITE, 13)
        //     .add(consumables.P_WHSKY, 35)
        //     .add(null, 20);

        this.body.wings.type = WingType.GIANT_DRAGONFLY; // Maybe later, if the PC can get them, make a Faerie wing type.
        this.body.wings.desc = "small black faerie wings";
    }
}
