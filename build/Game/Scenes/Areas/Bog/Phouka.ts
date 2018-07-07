import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { Cock, CockType } from "../../../Body/Cock";
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

/**
 * Created by K.Quesom 11.06.14
 */
// protected phoukaFightAttack() {
//     let damage: number;
//     //Only the bunny, goat and horse forms make physical attacks
//     if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 1) {
//         DisplayText(capitalA + short + " completely misses you due to his blindness!\n");
//     }
//     else if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_BUNNY) {
//         damage = Math.round((60 + 30 + 10) - randInt(player.stats.tou) - player.armorDef); //60 === Bunny Strength, 30 === Bunny Weapon Attack
//         DisplayText("The bunny morph hops towards you.  At the last second he changes direction and throws a kick toward you with his powerful hind legs.");
//         if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect())
//             DisplayText("\nThrowing yourself out of the way, you manage to avoid the kick.  The " + this.short + " hops out of reach and prepares for another attack.");
//         else if (damage <= 0)
//             DisplayText("\nYou block his attack by moving your shoulder in close, absorbing the energy of the kick harmlessly.");
//         else {
//             player.takeDamage(damage);
//             DisplayText("\nThe kick connects and leaves you reeling.");
//         }
//     }
//     else if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_GOAT) {
//         damage = Math.round((80 + 40 + 10) - randInt(player.stats.tou) - player.armorDef); //80 === Goat Strength, 40 === Goat Weapon Attack
//         DisplayText("The goat morph races toward you, head down.");
//         if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect())
//             DisplayText("\nThrowing yourself out of the way, you manage to keep from getting skewered.");
//         else if (damage <= 0)
//             DisplayText("\nYou manage to smack the goat morph in the side of the head.  The horns pass you by harmlessly.");
//         else {
//             player.takeDamage(damage);
//             DisplayText("\nIts head and horns crash into you, leaving you winded and bruised.");
//         }
//     }
//     else { //HORSE
//         damage = Math.round((95 + 55 + 10) - randInt(player.stats.tou) - player.armorDef); //95 === Horse Strength, 55 === Horse Weapon Attack
//         DisplayText("The stallion charges you, clearly intending to trample you under its hooves.");
//         if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect() || (damage <= 0))
//             DisplayText("\nAs the stallion passes you twist in place and manage to stay clear of its legs.");
//         else {
//             player.takeDamage(damage);
//             DisplayText("\nYou get clipped by the stallion's legs and hooves as he charges. As he comes around for another pass you check over your body, amazed none of your bones are broken after that.");
//         }
//     }
//     combatRoundOver();
// }

// protected phoukaFightLustAttack() { //Only the faerie, bunny and horse forms make lust attacks
//     if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_FAERIE)
//         DisplayText("The " + this.short + " uses his wings to climb high up in the air above you.  Then he starts jerking his cock at you with one hand while fondling his balls with the other.  ");
//     else if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_BUNNY)
//         DisplayText("The bunny morph leaps forward, trying to catch you off guard and grapple you.  ");
//     else DisplayText("The stallion rears up on his hind legs, waving his massive cock at you.  ");

//     if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
//         if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_BUNNY)
//             DisplayText("You throw yourself out of the way at the last moment and succeed in throwing the " + this.short + " off balance. He staggers away, his attempted attack ruined.\n");
//         else DisplayText("You manage to look away in time and the " + this.short + "'s lewd display has no real effect on you.\n");
//     }
//     else {
//         if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_FAERIE)
//             DisplayText("A drizzle of precum rains down around you.  The sight of the " + this.short + " pumping his shaft along with the smell of the salty yet sweet fluids makes you wish you could stop fighting and concentrate on pleasuring yourself.");
//         else if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_BUNNY)
//             DisplayText("He grabs you and rubs up against your body.  For a moment you are lost in the feeling of his soft black fur.  Then you feel his cock pressing against your ribs and shove him away.");
//         else DisplayText("You are hypnotized by the equine cock jabbing at the air.  Then the " + this.short + " charges past you and you can taste the musk in the air.");
//         game.dynStats("lus", 15 + player.stats.lib / 10 + player.stats.cor / 5 + randInt(10));
//     }
//     combatRoundOver();
// }

// protected phoukaFightSilence() { //Reuses the statusAffect Web-Silence from the spiders
//     DisplayText(this.capitalA + this.short + " scoops up some muck from the ground and rams it down over his cock.  After a few strokes he forms the lump of mud and precum into a ball and whips it at your face.  ");
//     if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2)
//         DisplayText("Since he's blind the shot goes horribly wide, missing you entirely.");
//     else if (combatMiss())
//         DisplayText("You lean back and let the muck ball whip pass to one side, avoiding the attack.");
//     else if (combatEvade())
//         DisplayText("You pull back and to the side, blocking the shot with your arm. The muck splatters against it uselessly.");
//     else if (combatMisdirect())
//         DisplayText(this.capitalA + this.short + " was watching you carefully before his throw.  That proves to be his undoing as your misleading movements cause him to lob the muck at the wrong time");
//     else if (combatFlexibility())
//         DisplayText("As the ball leaves his fingers you throw yourself back, your spine bending in an inhuman way.  You feel the ball sail past, inches above your chest.");
//     else {
//         DisplayText("The ball smacks into your face like a wet snowball.  It covers most of your nose and mouth with a layer of sticky, salty mud which makes it hard to breathe.  You'll be unable to use your magic while you're struggling for breath!\n");
//         player.statusAffects.add(StatusAffectType.WebSilence, 0, 0, 0, 0); //Probably safe to reuse the same status affect as for the spider morphs
//     }
//     combatRoundOver();
// }

// override protected performCombatAction() {
//     let blinded: boolean = statusAffects.has(StatusAffectType.Blind);
//     if ((!blinded) && !player.statusAffects.has(StatusAffectType.WebSilence) && randInt(4) === 0) {
//         phoukaTransformToPhouka(); //Change to faerie form so that it can lob the ball of muck at you
//         phoukaFightSilence();
//     }
//     else {
//         let transformChance: number = randInt(9); //2 in 3 chance of staying in current form
//         if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_FAERIE) {
//             if (blinded) transformChance = randInt(3); //100% chance of change from blind phouka if not doing silence attack
//             else transformChance = randInt(4); //75% chance of change from phouka if not doing silence attack
//         }
//         switch (transformChance) {
//             case 0: phoukaTransformToBunny(); break;
//             case 1: phoukaTransformToGoat(); break;
//             case 2: phoukaTransformToHorse();
//             default:
//         }
//         if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_FAERIE)
//             phoukaFightLustAttack(); //Can only get here if the phouka isn’t blind
//         else if ((PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_BUNNY) && (randInt(4) != 0) && (!blinded))
//             phoukaFightLustAttack(); //Bunny has a 75% chance of teasing attack, no teasing while blind
//         else if ((PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_HORSE) && (randInt(4) === 0) && (!blinded))
//             phoukaFightLustAttack(); //Horse has a 25% chance of teasing attack, no teasing while blind
//         else phoukaFightAttack();
//     }
// }

// public teased(lustDelta: number) {
//     if (lustDelta >= 10)
//         DisplayText("\n\nThe " + this.short + " breaks off its attack in the face of your teasing.  Its drooling member leaves a trail of precum along the ground and you get the feeling it needs to end this fight quickly.");
//     else if (lustDelta >= 5)
//         DisplayText("\n\nThe " + this.short + " stops its assault for a moment.  A glob of precum oozes from its cock before it shakes its head and gets ready to attack again.");
//     else if (lustDelta > 0)
//         DisplayText("\n\nThe " + this.short + " hesitates and slows down.  You see its cock twitch and then it readies for the next attack.");
//     applyTease(lustDelta);
// }

// public defeated(hpVictory: boolean) {
//     game.bog.phoukaScene.phoukaPlayerWins(hpVictory);
// }

// public won(hpVictory: boolean, pcCameWorms: boolean) {
//     if (pcCameWorms) {
//         DisplayText("\n\nThe " + this.short + " looks on, amused. <i>“Kinky! But those wee things can't handle whiskey, so I’m safe from ‘em. Now be a good ");
//         if (player.torso.vaginas.count > 0)
//             DisplayText("lass and spread yer legs for me.”</i>\n\n");
//         else DisplayText("lad and spread yer asscheeks for me.”</i>\n\n");
//         return { next: game.endLustLoss };
//     }
//     else {
//         if (player.torso.vaginas.count > 0) { //Phouka prefer vaginal if they can get it
//             if (player.torso.hips.legs.isTaur() || randInt(2) === 0)
//                 game.bog.phoukaScene.phoukaSexHorse(true, !hpVictory); //And they love mating with female or herm centaurs in their horse form
//             else game.bog.phoukaScene.phoukaSexBunny(true, !hpVictory);
//         }
//         else game.bog.phoukaScene.phoukaSexGoat(true, !hpVictory);
//     }
// }

// protected phoukaTransformToBunny() {
//     if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_BUNNY) return; //Already a bunny, so no change
//     if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_FAERIE) {
//         DisplayText("The faerie suddenly drops out of the air.  A look of concentration sets in on its face and it begins to expand and warp.  You blink and see that in front of you there is now a 5 foot tall bunny morph.\n\n");
//     }
//     else if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_GOAT) {
//         DisplayText("As the goat morph charges towards you it starts to grow.  By the time it gets close it has changed completely and you now face a 5 foot tall bunny morph.\n\n");
//     }
//     else { //Was a horse
//         DisplayText("As the horse morph charges towards you it quite suddenly shrinks.  You have to adjust your defence as a 5 foot tall bunny morph is now hopping your way.\n\n");
//     }
//     this.long = "The " + this.short + " is hopping around near you, waiting for an opening.  He has the general appearance of a bunny with coal black fur.  A large cock stands erect between his legs.  His cat-like green eyes, filled with lust, follow your every motion.";
//     this.armorValue = 60;
//     this.spe = 90;
//     PhoukaScene.phoukaForm = PhoukaScene.PHOUKA_FORM_BUNNY;
// }

// protected phoukaTransformToGoat() {
//     if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_GOAT) return; //Already a goat, so no change
//     if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_FAERIE) {
//         DisplayText("The faerie suddenly drops out of the air.  A look of concentration sets in on its face and it begins to expand and warp.  You blink and see that in front of you there is now a 4 foot tall goat morph.\n\n");
//     }
//     else if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_BUNNY) {
//         DisplayText("The bunny morph hops back from you and starts to melt and change.  You blink and see that in front of you there is now a 4 foot tall goat morph.\n\n");
//     }
//     else { //Was a horse
//         DisplayText("As the horse morph charges towards you it quite suddenly shrinks.  You have to adjust your defence as it is now a 4 foot tall goat morph.\n\n");
//     }
//     this.long = "The " + this.short + " is charging back and forth just out of reach, waiting for an opening.  He has the general appearance of a goat with coal black fur.  He has large glossy black horns and a large cock between his legs.  His cat-like green eyes, filled with lust, follow your every motion.";
//     this.armorValue = 60;
//     this.spe = 70;
//     PhoukaScene.phoukaForm = PhoukaScene.PHOUKA_FORM_GOAT;
// }

// protected phoukaTransformToHorse() {
//     if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_HORSE) return; //Already a horse, so no change
//     if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_FAERIE) {
//         DisplayText("The faerie suddenly drops out of the air.  A look of concentration sets in on its face and it begins to grow larger and larger.  You watch amazed as the creature's form stretches.  Finally it seems unable to grow further and settles into the form of a massive stallion.\n\n");
//     }
//     else if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_BUNNY) {
//         DisplayText("The bunny morph hops back from you and starts to grow and melt.  You watch amazed as the creature's form stretches.  Finally it seems unable to grow further and settles into the form of a massive stallion.\n\n");
//     }
//     else { //Was a goat
//         DisplayText("The goat morph eyes you then seems to think better of charging again.  It backs away and starts to grow larger and larger, its features and body shape twisting and reforming.  Finally it seems unable to grow further and settles into the form of a massive stallion.\n\n");
//     }
//     this.long = "The " + this.short + " is running in a wide circle around you, waiting for an opening.  He has the general appearance of a stallion with coal black fur.  A massive cock stands erect between his legs.  His cat-like green eyes, filled with lust, follow your every motion.";
//     this.armorValue = 75;
//     this.spe = 55;
//     PhoukaScene.phoukaForm = PhoukaScene.PHOUKA_FORM_HORSE;
// }

// protected phoukaTransformToPhouka() {
//     if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_FAERIE) return; //Already a faerie, so no change
//     if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_BUNNY) {
//         DisplayText("The bunny morph hops back from you and starts to melt and shrink.  In seconds only a tiny faerie is left floating in the air where the bunny once was.\n\n");
//     }
//     else if (PhoukaScene.phoukaForm === PhoukaScene.PHOUKA_FORM_GOAT) {
//         DisplayText("The goat morph bounds away from you and starts to melt and deform.  In seconds only a tiny faerie is left floating in the air where the goat once was.\n\n");
//     }
//     else { //Was a horse
//         DisplayText("The horse morph charges past you.  You look over your shoulder and wonder where the stallion could have gone.  Then you see the tiny faerie zipping back for another attack.\n\n");
//     }
//     this.long = "The " + this.short + " is flying around near you, waiting for an opening.  He has the general appearance of a faerie, though he is slightly larger and his skin and wings are coal black.  A large cock stands erect between his legs.  His cat-like green eyes, filled with lust, follow your every motion.";
//     this.armorValue = 80;
//     this.spe = 80;
//     PhoukaScene.phoukaForm = PhoukaScene.PHOUKA_FORM_FAERIE;
// }

// public handleAwardItemText(itype: ItemType) {
//     DisplayText("  You are just about to leave when you remember that glint from the hollow of that nearby tree.");
//     if (itype === null)
//         DisplayText("\n\nYou take a look and curse the " + this.short + ".  Looks like it used a piece of a broken bottle to lure you in.  At least you learned more about fighting the little pests.  You gain " + this.XP + " XP from your victory.");
//     else DisplayText("\n\nYou look inside the hollow and are pleased to find " + itype.longName + ".  You also gain " + this.XP + " XP from your victory, since you learned a bit more about fighting these little pests.\n\n");
// }

// public handleAwardText() {
//     //Talk about gems and XP when the player looks in the hollow of the tree instead of here
// }

// public handleCombatLossText(inDungeon: boolean, gemsLost: number): number {
//     if (player.inventory.gems > 1)
//         DisplayText("  Once free you check your gem pouch and realize the " + this.short + " took " + gemsLost + " of your gems.");
//     else if (player.inventory.gems === 1)
//         DisplayText("  Once free you check your gem pouch and realize the " + this.short + " took your only gem.");
//     return 1; //Only use up one hour after combat loss
// }

export class Phouka extends Character {
    public constructor(phoukaName: string) {
        super(CharacterType.Phouka);
        this.description = new CharacterDescription(this, "the ", phoukaName, "The " + phoukaName + " is flying around near you, waiting for an opening.  He has the general appearance of a faerie, though he is slightly larger and his skin and wings are coal black.  A large cock stands erect between his legs.  His cat-like green eyes, filled with lust, follow your every motion.");
        this.torso.cocks.add(new Cock(1, 0.5));
        this.torso.balls.quantity = 2;
        this.torso.balls.size = 1;
        this.cumMultiplier = 5;
        this.hoursSinceCum = 20;
        this.torso.chest.add(new BreastRow(0));
        this.torso.butt.looseness = ButtLooseness.TIGHT;
        this.torso.butt.wetness = ButtWetness.NORMAL;

        this.tallness = 5;
        this.torso.hips.rating = HipRating.SLENDER;
        this.torso.butt.rating = ButtRating.TIGHT;
        this.torso.hips.legs.type = LegType.HUMAN;
        this.torso.arms.type = ArmType.HUMAN;

        this.skin.tone = "black";
        this.torso.neck.head.hair.color = "black";
        this.torso.neck.head.hair.length = 1;

        this.torso.neck.head.ears.type = EarType.ELFIN;

        this.baseStats.str = 55;
        this.baseStats.tou = 25;
        this.baseStats.spe = 80;
        this.baseStats.int = 40;
        this.baseStats.lib = 75;
        this.baseStats.sens = 35;
        this.baseStats.cor = 100;

        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("claws" as WeaponName, undefined, "claws", "claw", 15));
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("skin" as ArmorName, undefined, "skin", 80));

        this.baseStats.bonusHP = 300;
        this.baseStats.lust = 30;
        this.baseStats.lustVuln = .5;

        this.baseStats.level = 14;
        this.inventory.gems = 0;
        // this.drop = new WeightedDrop().add(consumables.BLACK_D, 20)
        //     .add(consumables.RIZZART, 10)
        //     .add(consumables.GROPLUS, 2)
        //     .add(consumables.SDELITE, 13)
        //     .add(consumables.P_WHSKY, 35)
        //     .add(null, 20);

        this.torso.wings.type = WingType.GIANT_DRAGONFLY; // Maybe later, if the PC can get them, make a Faerie wing type.
        this.torso.wings.desc = "small black faerie wings";
    }
}
