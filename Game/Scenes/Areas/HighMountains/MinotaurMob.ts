import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { numToCardinalCapText } from "../../../Utilities/NumToText";
import { User } from "../../../User";
import { MinotaurMobFlags } from "./MinotaurMobScene";
import { FlagType } from "../../../Utilities/FlagType";
import { Cock, CockType } from "../../../Body/Cock";
import { randInt, randomChoice } from "../../../../Engine/Utilities/SMath";
import { BreastRow } from "../../../Body/BreastRow";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { StatusAffectType } from "../../../Effects/StatusAffectType";
import { HipRating } from "../../../Body/Hips";
import { LegType } from "../../../Body/Legs";
import { SkinType } from "../../../Body/Skin";
import { FaceType } from "../../../Body/Face";
import { Tail, TailType } from "../../../Body/Tail";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { Weapon } from "../../../Items/Weapons/Weapon";

/**
 * ...
 * @author ...
 */
// private precumTease() {
// 	let teased: boolean = false;
// 	let damage: number = 0;
// 	let oldLust: number = player.stats.lust;
// 	game.DisplaySprite(94);
// 	//(Big taur pre-cum tease)
// 	if (randInt(2) === 0) {
// 		teased = true;
// 		if (randInt(5) > 0) {
// 			DisplayText("The biggest lifts his loincloth, giving you a perfect view of his veiny hardness.  Pre-cum visibly bubbles from his flared tip, splattering wetly on the rocks and filling the air with his bestial musk.  He says, \"<i>See how much I need you?</i>\"\n");
// 			damage = 7 + player.stats.lib / 20;
// 		}
// 		//crit)
// 		else {
// 			DisplayText("The largest bull in the crowd flaps his cum-soaked loincloth up and wraps a massive, muscled hand around his incredible erection.  Shaking it back and forth, he flicks his bubbling pre-cum in your direction, letting it spatter noisily against the rocks around you.  A few droplets even land on your skin, fogging the air with minotaur pheromones.\n");
// 			damage = 13 + player.stats.lib / 20;
// 		}
// 	}
// 	//(Middle Taur pre-cum tease)
// 	if (randInt(2) === 0) {
// 		teased = true;
// 		if (randInt(5) > 0) {
// 			DisplayText("\"<i>Hey, slut, look at this!</i>\" taunts one of the beast-men.  He shakes his hips lewdly, spinning his thick horse-cock in wide circles and sending his potent pre flying through the air.  Droplets rain down around you, filling the air with even more of that delicious smell.\n");
// 			damage = 3 + player.stats.lib / 30;
// 		}
// 		else {
// 			DisplayText("\"<i>Mom, you may as well spread your thighs now, I got a treat for ya!</i>\" announces a well-built minotaur.  He shifts his coverings and pumps on his swollen shaft, tugging hard enough over the iron-hard erection to blast out huge blobs of pre-seed in your direction.  ");
// 			if (player.stats.spe / 5 + randInt(20) > 20) {
// 				DisplayText("You avoid most of them, the blobs splattering against the mountain and still getting a little on you.  Regardless, the air stinks of their heavy spunk.");
// 				damage = 6 + player.stats.lib / 20;
// 			}
// 			else {
// 				DisplayText("You try to avoid them, but one catches you in the face, a little getting into your mouth.  You swallow it reflexively and salivate some more, your eyes darting to look at the stained rocks around you.  Are you really considering licking it up from the ground?");
// 				damage = 15 + player.stats.lib / 20;
// 			}
// 		}
// 		DisplayText("\n");
// 	}
// 	//(Minitaur pre-cum tease)
// 	if (!teased || randInt(3) === 0) {
// 		DisplayText("The smallest of the beastmen, the minitaur, moans and begs, \"<i>Please Mom, can we please fuck you?  I... I need it so bad.</i>\"  He raises the edge of his loincloth to show exactly what he's talking about.  His member is limp but leaking.  What really catches your eyes sits behind that drizzling shaft - a pair of balls looking swollen and pent up beyond belief.  A sticky web of his leavings hangs between his genitals and his loincloth, showing you just how much he's been leaking at the thought of fucking you.  Fanning the sopping garment, he inadvertently blows a wave of his pheromones your way.\n");
// 		damage = 9 + player.stats.lib / 20;
// 	}
// 	game.dynStats("lus", damage);
// 	damage = player.stats.lust - oldLust;
// 	//UNIVERSAL pre-cum RESULT:
// 	//(Low damage taken)
// 	if (damage <= 8) {
// 		DisplayText("Though your body is tingling from the show the horny beasts are giving you, it doesn't effect you as much as it could have.");
// 		if (player.stats.lust > 99) DisplayText("  Still, you're too horny to fight any longer.");
// 	}
// 	//(Medium damage taken)
// 	else if (damage <= 14) {
// 		DisplayText("The powerful pheromones and scents hanging in the air around you make your body flush hotly.  Your " + player.Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s grow harder");
// 		if (player.stats.lust > 70) DisplayText(", though you didn't think such a thing was possible");
// 		else DisplayText(", feeling like two bullets scraping along the inside of your " + player.inventory.equipment.armor.displayName);
// 		DisplayText(", but it... it could have been worse.  You shudder as a little fantasy of letting them dribble it all over your body works through your mind.");
// 		if (player.stats.lust > 99) DisplayText("  Fuck it, they smell so good.  You want, no, NEED more.");
// 		else DisplayText("  A growing part of you wants to experience that.");
// 	}
// 	//(high damage taken)
// 	else {
// 		DisplayText("All that potent pre-ejaculate makes your cunny ");
// 		if (player.torso.vaginas.get(0).wetness <= 1) DisplayText("moisten");
// 		else if (player.torso.vaginas.get(0).wetness <= 2) DisplayText("drip");
// 		else if (player.torso.vaginas.get(0).wetness <= 3) DisplayText("drool");
// 		else DisplayText("juice itself");
// 		DisplayText(" in need.");
// 		if (player.minotaurNeed()) {
// 			DisplayText("  You need a fix so bad!");
// 			game.player.stats.lust += 5;
// 		}
// 		else {
// 			DisplayText("  You can understand firsthand just how potent and addictive that fluid is...");
// 		}
// 		if (player.torso.cocks.count > 0) DisplayText("  " + Desc.Cock.describeMultiCockSimpleOne(player, true) + " twitches and dribbles its own pre-seed, but it doesn't smell anywhere near as good!");
// 		DisplayText("  Shuddering and moaning, your body is wracked by ever-increasing arousal.  Fantasies of crawling under the beast-men's soaked legs and lapping at their drooling erections inundate your mind, your body shivering and shaking in response.  ");
// 		if (player.stats.lust <= 99) DisplayText("You pull back from the brink with a start.  It'll take more than a little drugged pre-cum to bring you down!");
// 		else DisplayText("You sigh and let your tongue loll out.  It wouldn't so bad, would it?");
// 	}
// 	combatRoundOver();
// }

// //Grope
// private minotaurGangGropeAttack() {
// 	game.DisplaySprite(94);
// 	DisplayText("Strong hands come from behind and slide under your equipment to squeeze your " + Desc.Breast.describeChest(character) + ".  The brutish fingers immediately locate and pinch at your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s, the sensitive flesh on your chest lighting up with pain and pleasure.  You arch your back in surprise, utterly stunned by the violation of your body.  After a moment you regain your senses and twist away, but the damage is already done.  You're breathing a bit quicker now");
// 	if (player.stats.lust >= 80) DisplayText(", and your pussy is absolutely soaking wet");
// 	DisplayText(".");
// 	game.dynStats("lus", (5 + player.stats.sens / 10));
// 	combatRoundOver();
// }
// //Gang Grope
// private minotaurGangGangGropeAttack() {
// 	game.DisplaySprite(94);
// 	DisplayText("Before you can react, hands reach out from multiple angles and latch onto your body.  One pair squeezes at your " + game.Desc.Butt.describeButt(player) + ", the strong grip massaging your cheeks with loving touches.  Another set of hands are sliding along your tummy, reaching down for, but not quite touching, the juicy delta below.  Palms encircle your " + player.Desc.Breast.describeChest(character) + " and caress them, gently squeezing in spite of the brutish hands holding you.  You wriggle and squirm in the collective grip of the many minotaurs for a few moments, growing more and more turned on by the treatment.  At last, you shake out of their hold and stand free, panting hard from exertion and desire.");
// 	game.dynStats("lus", (15 + player.stats.sens / 10));
// 	combatRoundOver();
// }
// //Waste  a turn
// private minotaurGangWaste() {
// 	Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00329] = 1;
// 	game.DisplaySprite(94);
// 	DisplayText("\"<i>Oh man I can't wait to go hilt-deep in that pussy... I'm going to wreck her,</i>\" promises one bull to his brother.  The other laughs and snorts, telling him how he'll have to do the deed during sloppy seconds.  It quickly escalates, and soon, every single one of the beast-men is taunting the others, bickering over how and when they'll get to have you.  While they're wasting their time, it's your chance to act!");
// 	combatRoundOver();
// }

// public doAI() {
// 	game.DisplaySprite(94);
// 	Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00329] = 0;
// 	let select: number = randInt(7);
// 	if (select <= 2) precumTease();
// 	else if (select <= 4) minotaurGangGropeAttack();
// 	else if (select === 5) minotaurGangGangGropeAttack();
// 	else minotaurGangWaste();
// }

// public defeated(hpVictory: boolean) {
// 	game.highMountains.minotaurMobScene.victoryMinotaurGang();
// }

// public won(hpVictory: boolean, pcCameWorms: boolean) {
// 	if (pcCameWorms) {
// 		DisplayText("\n\nThe minutaurs share a laugh while you cum, but their throbbing erections don't subside in the slightest.");
// 		return { next: game.endLustLoss };
// 	} else {
// 		game.highMountains.minotaurMobScene.minotaurDeFeet();
// 	}
// }

export class MinotaurMob extends Character {
    public constructor() {
        super(CharacterType.MinotaurMob);
        const minotaurTribeSize = User.flags.get<MinotaurMobFlags>(FlagType.MinotaurMob).MINOTAUR_TRIBE_SIZE;
        this.description = new CharacterDescription(this, "the ", minotaurTribeSize ? "minotaur gang" : "minotaur tribe", numToCardinalCapText(minotaurTribeSize) + " shaggy beastmen stand around you in a loose circle.  Their postures aren't exactly threatening.  If anything, they seem to be standing protectively around you, as if their presence would somehow shelter you from the rest of the mountain.  All of their features share a brotherly similarity, though there's still a fair bit of differences between your minotaur sons.  One of them is a head above the rest, a massive hulk of muscle so big he seems to dwarf the rest.  In stark contrast, a feminine minitaur keeps his distance in the rear." + (minotaurTribeSize >= 20 ? "  The tribe constantly makes hoots and cat-calls, fully expecting to be fucking you soon." : ""), true);
        this.torso.cocks.add(new Cock(randInt(13) + 24, 2 + randInt(3), CockType.HORSE));
        this.torso.balls.quantity = 2;
        this.torso.balls.size = 2 + randInt(13);
        this.cumMultiplier = 1.5;
        this.hoursSinceCum = this.torso.balls.size * 10;
        this.torso.chest.add(new BreastRow(0));
        this.torso.butt.looseness = ButtLooseness.STRETCHED;
        this.torso.butt.wetness = ButtWetness.NORMAL;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 30, 0, 0, 0);
        this.tallness = randInt(37) + 84;
        this.torso.hips.rating = HipRating.AVERAGE;
        this.torso.butt.rating = ButtRating.AVERAGE + 1;
        this.torso.hips.legs.type = LegType.HOOFED;
        this.skin.tone = "red";
        this.skin.type = SkinType.FUR;
        this.skin.desc = "shaggy fur";
        this.torso.neck.head.hair.color = randomChoice("black", "brown");
        this.torso.neck.head.hair.length = 3;
        this.torso.neck.head.face.type = FaceType.COW_MINOTAUR;
        this.baseStats.str = 65;
        this.baseStats.tou = 60;
        this.baseStats.spe = 30;
        this.baseStats.int = 20;
        this.baseStats.lib = 40;
        this.baseStats.sens = 15;
        this.baseStats.cor = 35;
        this.inventory.equipment.defaultArmorSlot.equip(new Armor("thick fur" as ArmorName, undefined, "thick fur", 0));
        this.inventory.equipment.defaultWeaponSlot.equip(new Weapon("fists" as WeaponName, undefined, "fists", "punches", 0));
        let lustVuln: number = 0.45;
        if ((minotaurTribeSize - 3) * 2 > 13) lustVuln = .3;
        else lustVuln -= (minotaurTribeSize - 3) * 0.02;
        this.baseStats.bonusHP = 340 + 50 * (minotaurTribeSize - 3);
        this.baseStats.lust = 30;
        this.baseStats.lustVuln = lustVuln;
        // this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
        let level: number = 11 + Math.round((minotaurTribeSize - 3) / 2);
        if (level > 14) level = 14;
        this.baseStats.level = level;
        this.inventory.gems = randInt(15) + 45;
        this.torso.tails.add(new Tail(TailType.COW));
        // this.special1 = game.mountain.minotaurScene.minoPheromones;
        // this.drop = NO_DROP;
    }
}
