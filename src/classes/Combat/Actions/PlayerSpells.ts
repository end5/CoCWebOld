import LearnedSpellAction from './LearnedSpellAction';
import { spellMod } from './SpellAction';
import Vagina, { VaginaWetness } from '../Body/Vagina';
import ButtDescriptor from '../Descriptors/ButtDescriptor';
import CockDescriptor from '../Descriptors/CockDescriptor';
import GenderDescriptor from '../Descriptors/GenderDescriptor';
import VaginaDescriptor from '../Descriptors/VaginaDescriptor';
import MainScreen from '../display/MainScreen';
import Perk from '../Effects/Perk';
import StatusAffect from '../Effects/StatusAffect';
import Flags, { FlagEnum } from '../Game/Flags';
import Monster from '../Monster';
import Player from '../Player';
import Utils from '../Utilities/Utils';

export class SpellArouse extends LearnedSpellAction {
    public readonly baseCost: number = 15;
    public castSpell(player: Player, monster: Monster) {
        player.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        MainScreen.text("You make a series of arcane gestures, drawing on your own lust to inflict it upon your foe!\n", true);
        //Worms be immune
        if (monster.short == "worms") {
            MainScreen.text("The worms appear to be unaffected by your magic!", false);
            MainScreen.text("\n\n", false);
            return;
        }
        if (monster.stats.lustVuln == 0) {
            MainScreen.text("It has no effect!  Your foe clearly does not experience lust in the same way as you.\n\n", false);
            return;
        }
        monster.stats.lust += monster.stats.lustVuln * (player.stats.int / 5 * spellMod(player) + Utils.rand(monster.stats.lib - monster.stats.int * 2 + monster.stats.cor) / 5);
        if (monster.stats.lust < 30)
            MainScreen.text(monster.capitalA + monster.short + " squirms as the magic affects " + monster.pronoun2 + ".  ", false);
        if (monster.stats.lust >= 30 && monster.stats.lust < 60) {
            // Removed because monster is no longer plural
            //if (monster.plural) MainScreen.text(monster.capitalA + monster.short + " stagger, suddenly weak and having trouble focusing on staying upright.  ", false);
            //else
            MainScreen.text(monster.capitalA + monster.short + " staggers, suddenly weak and having trouble focusing on staying upright.  ", false);
        }
        if (monster.stats.lust >= 60) {
            MainScreen.text(monster.capitalA + monster.short + "'");
            // Removed because monster is no longer plural
            //if (!monster.plural) MainScreen.text("s");
            MainScreen.text(" eyes glaze over with desire for a moment.  ", false);
        }
        if (monster.lowerBody.cockSpot.count() > 0) {
            if (monster.stats.lust >= 60 && monster.lowerBody.cockSpot.count() > 0)
                MainScreen.text("You see " + monster.pronoun3 + " " + CockDescriptor.describeMultiCockShort(player) + " dribble pre-cum.  ", false);
            if (monster.stats.lust >= 30 && monster.stats.lust < 60 && monster.lowerBody.cockSpot.count() == 1)
                MainScreen.text(monster.capitalA + monster.short + "'s " + CockDescriptor.describeCockShort(player.lowerBody.cockSpot.get(0)) + " hardens, distracting " + monster.pronoun2 + " further.  ", false);
            if (monster.stats.lust >= 30 && monster.stats.lust < 60 && monster.lowerBody.cockSpot.count() > 1)
                MainScreen.text("You see " + monster.pronoun3 + " " + CockDescriptor.describeMultiCockShort(player) + " harden uncomfortably.  ", false);
        }
        if (monster.lowerBody.vaginaSpot.count() > 0) {
            const firstVagina: Vagina = player.lowerBody.vaginaSpot.get(0);
            // Removed because monster is no longer plural
            /*if (monster.plural) {
                if (monster.stats.lust >= 60 && firstVagina.vaginalWetness == VaginaWetness.NORMAL)
                    MainScreen.text(monster.capitalA + monster.short + "'s " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s dampen perceptibly.  ", false);
                if (monster.stats.lust >= 60 && firstVagina.vaginalWetness == VaginaWetness.WET)
                    MainScreen.text(monster.capitalA + monster.short + "'s crotches become sticky with girl-lust.  ", false);
                if (monster.stats.lust >= 60 && firstVagina.vaginalWetness == VaginaWetness.SLICK)
                    MainScreen.text(monster.capitalA + monster.short + "'s " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s become sloppy and wet.  ", false);
                if (monster.stats.lust >= 60 && firstVagina.vaginalWetness == VaginaWetness.DROOLING)
                    MainScreen.text("Thick runners of girl-lube stream down the insides of " + monster.a + monster.short + "'s thighs.  ", false);
                if (monster.stats.lust >= 60 && firstVagina.vaginalWetness == VaginaWetness.SLAVERING)
                    MainScreen.text(monster.capitalA + monster.short + "'s " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s instantly soak " + monster.pronoun2 + " groin.  ", false);
            }
            else */{
                if (monster.stats.lust >= 60 && firstVagina.vaginalWetness == VaginaWetness.NORMAL)
                    MainScreen.text(monster.capitalA + monster.short + "'s " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " dampens perceptibly.  ", false);
                if (monster.stats.lust >= 60 && firstVagina.vaginalWetness == VaginaWetness.WET)
                    MainScreen.text(monster.capitalA + monster.short + "'s crotch becomes sticky with girl-lust.  ", false);
                if (monster.stats.lust >= 60 && firstVagina.vaginalWetness == VaginaWetness.SLICK)
                    MainScreen.text(monster.capitalA + monster.short + "'s " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " becomes sloppy and wet.  ", false);
                if (monster.stats.lust >= 60 && firstVagina.vaginalWetness == VaginaWetness.DROOLING)
                    MainScreen.text("Thick runners of girl-lube stream down the insides of " + monster.a + monster.short + "'s thighs.  ", false);
                if (monster.stats.lust >= 60 && firstVagina.vaginalWetness == VaginaWetness.SLAVERING)
                    MainScreen.text(monster.capitalA + monster.short + "'s " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " instantly soaks her groin.  ", false);
            }
        }
        MainScreen.text("\n\n", false);
    }
}

export class SpellHeal extends LearnedSpellAction {
    public readonly baseCost: number = 20;
    public castSpell(player: Player, monster: Monster) {
        player.stats.fatigueMagic(this.baseCost);
        MainScreen.text("You focus on your body and its desire to end pain, trying to draw on your arousal without enhancing it.\n", true);
        //25% backfire!
        if (Utils.rand(4) == 0) {
            MainScreen.text("An errant sexual thought crosses your mind, and you lose control of the spell!  Your ", false);
            if (player.gender == 0) MainScreen.text(ButtDescriptor.describeButthole(player) + " tingles with a desire to be filled as your libido spins out of control.", false);
            if (player.gender == 1) {
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text(CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " twitches obscenely and drips with pre-cum as your libido spins out of control.", false);
                else MainScreen.text(CockDescriptor.describeMultiCockShort(player) + " twitch obscenely and drip with pre-cum as your libido spins out of control.", false);
            }
            if (player.gender == 2) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " becomes puffy, hot, and ready to be touched as the magic diverts into it.", false);
            if (player.gender == 3) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " and " + CockDescriptor.describeMultiCockShort(player) + " overfill with blood, becoming puffy and incredibly sensitive as the magic focuses on them.", false);
            player.stats.lib += .25;
            player.stats.lust += 15;
        }
        else {
            let hpGain = Math.floor((player.stats.int / (2 + Utils.rand(3)) * spellMod(player)) * (player.stats.maxHP() / 150));
            if (player.inventory.armor.displayName == "skimpy nurse's outfit")
                hpGain *= 1.2;
            MainScreen.text("You flush with success as your wounds begin to knit (+" + hpGain + ").", false);
            player.stats.HPChange(hpGain);
        }
        MainScreen.text("\n\n", false);
    }
}

export class SpellMight extends LearnedSpellAction {
    public readonly baseCost: number = 25;
    public castSpell(player: Player, monster: Monster) {
        player.stats.fatigueMagic(this.baseCost);
        MainScreen.text("You flush, drawing on your body's desires to empower your muscles and toughen you up.\n\n", true);
        //25% backfire!
        if (Utils.rand(4) == 0) {
            MainScreen.text("An errant sexual thought crosses your mind, and you lose control of the spell!  Your ", false);
            if (player.gender == 0) MainScreen.text(ButtDescriptor.describeButthole(player) + " tingles with a desire to be filled as your libido spins out of control.", false);
            if (player.gender == 1) {
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text(CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " twitches obscenely and drips with pre-cum as your libido spins out of control.", false);
                else MainScreen.text(CockDescriptor.describeMultiCockShort(player) + " twitch obscenely and drip with pre-cum as your libido spins out of control.", false);
            }
            if (player.gender == 2) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " becomes puffy, hot, and ready to be touched as the magic diverts into it.", false);
            if (player.gender == 3) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " and " + CockDescriptor.describeMultiCockShort(player) + " overfill with blood, becoming puffy and incredibly sensitive as the magic focuses on them.", false);
            player.stats.lib += .25;
            player.stats.lust += 15;
        }
        else {
            MainScreen.text("The rush of success and power flows through your body.  You feel like you can do anything!", false);
            player.statusAffects.add(new StatusAffect("Might", 0, 0, 0, 0));
            let temp = 5 * spellMod(player);
            let tempStr = temp;
            let tempTou = temp;
            if (player.stats.str + temp > 100) tempStr = 100 - player.stats.str;
            if (player.stats.tou + temp > 100) tempTou = 100 - player.stats.tou;
            player.statusAffects.get("Might").value1 = tempStr;
            player.statusAffects.get("Might").value2 = tempTou;
            player.stats.str += player.statusAffects.get("Might").value1;
            player.stats.tou += player.statusAffects.get("Might").value2;
        }
        MainScreen.text("\n\n", false);
    }
}

export class SpellChargeWeapon extends LearnedSpellAction {
    public readonly baseCost: number = 15;
    public castSpell(player: Player, monster: Monster) {
        player.stats.fatigueMagic(this.baseCost);
        MainScreen.text("You utter words of power, summoning an electrical charge around your " + player.inventory.weapon.displayname + ".  It crackles loudly, ensuring you'll do more damage with it for the rest of the fight.\n\n", true);
        player.statusAffects.add(new StatusAffect("ChargeWeapon", 10 * spellMod(player), 0, 0, 0));
    }
}

export class SpellBlind extends LearnedSpellAction {
    public readonly baseCost: number = 20;
    public castSpell(player: Player, monster: Monster) {
        MainScreen.text("", true);
        player.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.type == MonsterType.JeanClaude) {
            MainScreen.text("Jean-Claude howls, reeling backwards before turning back to you, rage clenching his dragon-like face and enflaming his eyes. Your spell seemed to cause him physical pain, but did nothing to blind his lidless sight.");

            MainScreen.text("\n\n“<i>You think your hedge magic will work on me, intrus?</i>” he snarls. “<i>Here- let me show you how it’s really done.</i>” The light of anger in his eyes intensifies, burning a retina-frying white as it demands you stare into it...");

            if (Utils.rand(player.stats.spe) >= 50 || Utils.rand(player.stats.int) >= 50) {
                MainScreen.text("\n\nThe light sears into your eyes, but with the discipline of conscious effort you escape the hypnotic pull before it can mesmerize you, before Jean-Claude can blind you.");

                MainScreen.text("\n\n“<i>You fight dirty,</i>” the monster snaps. He sounds genuinely outraged. “<i>I was told the interloper was a dangerous warrior, not a little [boy] who accepts duels of honour and then throws sand into his opponent’s eyes. Look into my eyes, little [boy]. Fair is fair.</i>”");

                monster.stats.HP -= Math.floor(10 + (player.stats.int / 3 + Utils.rand(player.stats.int / 2)) * spellMod(player));
            }
            else {
                MainScreen.text("\n\nThe light sears into your eyes and mind as you stare into it. It’s so powerful, so infinite, so exquisitely painful that you wonder why you’d ever want to look at anything else, at anything at- with a mighty effort, you tear yourself away from it, gasping. All you can see is the afterimages, blaring white and yellow across your vision. You swipe around you blindly as you hear Jean-Claude bark with laughter, trying to keep the monster at arm’s length.");

                MainScreen.text("\n\n“<i>The taste of your own medicine, it is not so nice, eh? I will show you much nicer things in there in time intrus, don’t worry. Once you have learnt your place.</i>”");

                player.statusAffects.add(new StatusAffect("Blind", Utils.rand(4) + 1, 0, 0, 0));
            }
            return;
        }
        MainScreen.text("You glare at " + monster.a + monster.short + " and point at " + monster.pronoun2 + ".  A bright flash erupts before " + monster.pronoun2 + "!\n", true);
        if (monster.type == MonsterType.LivingStatue) {
            // noop
        }
        else if (Utils.rand(3) != 0) {
            MainScreen.text(" <b>" + monster.capitalA + monster.short + " ", false);
            // Removed because monster is no longer plural
            //if (monster.plural && monster.short != "imp horde") MainScreen.text("are blinded!</b>", false);
            //else
            MainScreen.text("is blinded!</b>", false);
            monster.statusAffects.add(new StatusAffect("Blind", 5 * spellMod(player))), 0, 0, 0);
            if (monster.short == "Isabella")
                if (isabellaFollowerScene.isabellaAccent()) MainScreen.text("\n\n\"<i>Nein! I cannot see!</i>\" cries Isabella.", false);
                else MainScreen.text("\n\n\"<i>No! I cannot see!</i>\" cries Isabella.", false);
            if (monster.short == "Kiha") MainScreen.text("\n\n\"<i>You think blindness will slow me down?  Attacks like that are only effective on those who don't know how to see with their other senses!</i>\" Kiha cries defiantly.", false);
            if (monster.short == "plain girl") {
                MainScreen.text("  Remarkably, it seems as if your spell has had no effect on her, and you nearly get clipped by a roundhouse as you stand, confused. The girl flashes a radiant smile at you, and the battle continues.", false);
                monster.statusAffects.remove("Blind");
            }
        }
        else MainScreen.text(monster.capitalA + monster.short + " blinked!", false);
        MainScreen.text("\n\n", false);
    }
}

export class SpellWhitefire extends LearnedSpellAction {
    public readonly baseCost: number = 30;
    public castSpell(player: Player, monster: Monster) {
        MainScreen.text("", true);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        player.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.type == MonsterType.Doppleganger) {
            <Doppleganger>monster.handleSpellResistance("whitefire");
            return;
        }
        MainScreen.text("You narrow your eyes, focusing your mind with deadly intent.  You snap your fingers and " + monster.a + monster.short + " is enveloped in a flash of white flames!\n", true);
        let temp = Math.floor(10 + (player.stats.int / 3 + Utils.rand(player.stats.int / 2)) * spellMod(player));
        //High damage to goes.
        if (monster.short == "goo-girl")
            temp = Math.round(temp * 1.5);
        MainScreen.text(monster.capitalA + monster.short + " takes " + temp + " damage.", false);
        //Using fire attacks on the goo]
        if (monster.short == "goo-girl") {
            MainScreen.text("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer.", false);
            if (!monster.perks.has("Acid"))
                monster.perks.add(new Perk("Acid", 0, 0, 0, 0));
        }
        MainScreen.text("\n\n", false);
        monster.stats.HP -= temp;
    }
}

export class SpellCleansingPalm extends LearnedSpellAction {
    public readonly baseCost: number = 30;
    public castSpell(player: Player, monster: Monster) {
        MainScreen.clearText();
        player.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }

        if (monster.short == "Jojo") {
            // Not a completely corrupted monkmouse
            if (Game.monk < 2) {
                MainScreen.text("You thrust your palm forward, sending a blast of pure energy towards Jojo. At the last second he sends a blast of his own against yours canceling it out\n\n");
                return;
            }
        }

        if (monster.type == MonsterType.LivingStatue) {
            MainScreen.text("You thrust your palm forward, causing a blast of pure energy to slam against the giant stone statue- to no effect!");
            return;
        }

        let corruptionMulti: number = (monster.stats.cor - 20) / 25;
        if (corruptionMulti > 1.5) corruptionMulti = 1.5;

        let damage = Math.floor((player.stats.int / 4 + Utils.rand(player.stats.int / 3)) * (spellMod(player) * corruptionMulti));

        if (damage > 0) {
            MainScreen.text("You thrust your palm forward, causing a blast of pure energy to slam against " + monster.a + monster.short + ", tossing");
            // Removed because monster is no longer plural
            //if ((monster as Monster).plural == true) MainScreen.text(" them");
            //else
            MainScreen.text(GenderDescriptor.mfn(monster.gender, " him", " her", " it"));
            MainScreen.text(" back a few feet.\n\n");

            MainScreen.text(monster.capitalA + monster.short + " takes " + damage + " damage.\n\n");
        }
        else {
            damage = 0;
            MainScreen.text("You thrust your palm forward, causing a blast of pure energy to slam against " + monster.a + monster.short + ", which they ignore. It is probably best you don’t use this technique against the pure.\n\n");
        }
        monster.stats.HP -= damage;
    }
}

