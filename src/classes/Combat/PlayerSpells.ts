import SpecialAction from './SpecialAction';
import ButtDescriptor from '../Descriptors/ButtDescriptor';
import CockDescriptor from '../Descriptors/CockDescriptor';
import VaginaDescriptor from '../Descriptors/VaginaDescriptor';
import MainScreen from '../display/MainScreen';
import Perk from '../Effects/Perk';
import StatusAffect from '../Effects/StatusAffect';
import Flags, { FlagEnum } from '../Game/Flags';
import Monster from '../Monster';
import Player from '../Player';
import Utils from '../Utilities/Utils';

export function spellMod(player: Player): number {
    let mod: number = 1;
    if (player.perks.has("Archmage") && player.stats.int >= 75) mod += .5;
    if (player.perks.has("Channeling") && player.stats.int >= 60) mod += .5;
    if (player.perks.has("Mage") && player.stats.int >= 50) mod += .5;
    if (player.perks.has("Spellpower") && player.stats.int >= 50) mod += .5;
    if (player.perks.has("WizardsFocus")) {
        mod += player.perks.get("WizardsFocus").value1;
    }
    if (player.perks.has("ChiReflowMagic")) mod += UmasShop.NEEDLEWORK_MAGIC_SPELL_MULTI;
    return mod;
}

export class SpellArouse implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.perks.has("BloodMage") && player.stats.fatigue + player.spellCost(15) <= 100;
    }

    public reasonCannotUse(): string {
        return "You are too tired to cast this spell.";
    }

    public use(player: Player, monster: Monster) {
        fatigue(15, 1);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            return;
        }
        MainScreen.text("You make a series of arcane gestures, drawing on your own lust to inflict it upon your foe!\n", true);
        //Worms be immune
        if (monster.short == "worms") {
            MainScreen.text("The worms appear to be unaffected by your magic!", false);
            MainScreen.text("\n\n", false);
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            return;
        }
        if (monster.lustVuln == 0) {
            MainScreen.text("It has no effect!  Your foe clearly does not experience lust in the same way as you.\n\n", false);
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            return;
        }
        monster.stats.lust += monster.lustVuln * (player.stats.int / 5 * spellMod() + Utils.rand(monster.lib - monster.inte * 2 + monster.cor) / 5);
        if (monster.stats.lust < 30) 
            MainScreen.text(monster.capitalA + monster.short + " squirms as the magic affects " + monster.pronoun2 + ".  ", false);
        if (monster.stats.lust >= 30 && monster.stats.lust < 60) {
            if (monster.plural) MainScreen.text(monster.capitalA + monster.short + " stagger, suddenly weak and having trouble focusing on staying upright.  ", false);
            else MainScreen.text(monster.capitalA + monster.short + " staggers, suddenly weak and having trouble focusing on staying upright.  ", false);
        }
        if (monster.stats.lust >= 60) {
            MainScreen.text(monster.capitalA + monster.short + "'");
            if (!monster.plural) MainScreen.text("s");
            MainScreen.text(" eyes glaze over with desire for a moment.  ", false);
        }
        if (monster.lowerBody.cockSpot.count() > 0) {
            if (monster.stats.lust >= 60 && monster.lowerBody.cockSpot.count() > 0)
                MainScreen.text("You see " + monster.pronoun3 + " " + CockDescriptor.describeMultiCockShort(player) + " dribble pre-cum.  ", false);
            if (monster.stats.lust >= 30 && monster.stats.lust < 60 && monster.lowerBody.cockSpot.count() == 1)
                MainScreen.text(monster.capitalA + monster.short + "'s " + CockDescriptor.describeCockShort(0) + " hardens, distracting " + monster.pronoun2 + " further.  ", false);
            if (monster.stats.lust >= 30 && monster.stats.lust < 60 && monster.lowerBody.cockSpot.count() > 1)
                MainScreen.text("You see " + monster.pronoun3 + " " + CockDescriptor.describeMultiCockShort(player) + " harden uncomfortably.  ", false);
        }
        if (monster.vaginas.length > 0) {
            if (monster.plural) {
                if (monster.stats.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.NORMAL)
                MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s dampen perceptibly.  ", false);
                if (monster.stats.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.WET)
                MainScreen.text(monster.capitalA + monster.short + "'s crotches become sticky with girl-lust.  ", false);
                if (monster.stats.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.SLICK)
                MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s become sloppy and wet.  ", false);
                if (monster.stats.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.DROOLING)
                MainScreen.text("Thick runners of girl-lube stream down the insides of " + monster.a + monster.short + "'s thighs.  ", false);
                if (monster.stats.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.SLAVERING)
                MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s instantly soak " + monster.pronoun2 + " groin.  ", false);
            }
            else {
                if (monster.stats.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.NORMAL)
                MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " dampens perceptibly.  ", false);
                if (monster.stats.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.WET)
                MainScreen.text(monster.capitalA + monster.short + "'s crotch becomes sticky with girl-lust.  ", false);
                if (monster.stats.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.SLICK)
                MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " becomes sloppy and wet.  ", false);
                if (monster.stats.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.DROOLING)
                MainScreen.text("Thick runners of girl-lube stream down the insides of " + monster.a + monster.short + "'s thighs.  ", false);
                if (monster.stats.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.SLAVERING)
                MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " instantly soaks her groin.  ", false);
            }
        }
        MainScreen.text("\n\n", false);
        Flags.list[FlagEnum.SPELLS_CAST]++;
        spellPerkUnlock();
    }
}

export class SpellHeal implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.perks.has("BloodMage") && player.stats.fatigue + player.spellCost(20) <= 100;
    }

    public reasonCannotUse(): string {
        return "You are too tired to cast this spell.";
    }

    public use(player: Player, monster: Monster) {
        fatigue(20, 1);
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
            let temp = Math.floor((player.stats.int / (2 + Utils.rand(3)) * spellMod()) * (player.stats.maxHP() / 150));
            if (player.inventory.armor.displayName == "skimpy nurse's outfit") temp *= 1.2;
            MainScreen.text("You flush with success as your wounds begin to knit (+" + temp + ").", false);
            HPChange(temp, false);
        }
        MainScreen.text("\n\n", false);
        Flags.list[FlagEnum.SPELLS_CAST]++;
        spellPerkUnlock();
    }
}

export class SpellMight implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.perks.has("BloodMage") && player.stats.fatigue + player.spellCost(25) <= 100;
    }

    public reasonCannotUse(): string {
        return "You are too tired to cast this spell.";
    }

    public use(player: Player, monster: Monster) {
        fatigue(25, 1);
        MainScreen.text("You flush, drawing on your body's desires to empower your muscles and toughen you up.\n\n", true);
        //25% backfire!
        if (Utils.rand(4) == 0) {
            MainScreen.text("An errant sexual thought crosses your mind, and you lose control of the spell!  Your ", false);
            if (player.gender == 0) MainScreen.text(ButtDescriptor.describeButthole(player) + " tingles with a desire to be filled as your libido spins out of control.", false);
            if (player.gender == 1) {
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text(CockDescriptor.describeCock(player, 0) + " twitches obscenely and drips with pre-cum as your libido spins out of control.", false);
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
            let temp = 5 * spellMod();
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
        Flags.list[FlagEnum.SPELLS_CAST]++;
        spellPerkUnlock(player);
    }
}

export class SpellChargeWeapon implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.perks.has("BloodMage") && player.stats.fatigue + player.spellCost(15) <= 100;
    }

    public reasonCannotUse(): string {
        return "You are too tired to cast this spell.";
    }

    public use(player: Player, monster: Monster) {
        fatigue(15, 1);
        MainScreen.text("You utter words of power, summoning an electrical charge around your " + player.inventory.weapon.displayname + ".  It crackles loudly, ensuring you'll do more damage with it for the rest of the fight.\n\n", true);
        player.statusAffects.add(new StatusAffect("ChargeWeapon", 10 * spellMod(), 0, 0, 0));
        Flags.list[FlagEnum.SPELLS_CAST]++;
        spellPerkUnlock(player);
    }
}

export class SpellBlind implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.perks.has("BloodMage") && player.stats.fatigue + player.spellCost(20) <= 100;
    }

    public reasonCannotUse(): string {
        return "You are too tired to cast this spell.";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        fatigue(20, 1);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock(player);
            return;
        }
        if (monster instanceof JeanClaude) {
            MainScreen.text("Jean-Claude howls, reeling backwards before turning back to you, rage clenching his dragon-like face and enflaming his eyes. Your spell seemed to cause him physical pain, but did nothing to blind his lidless sight.");

            MainScreen.text("\n\n“<i>You think your hedge magic will work on me, intrus?</i>” he snarls. “<i>Here- let me show you how it’s really done.</i>” The light of anger in his eyes intensifies, burning a retina-frying white as it demands you stare into it...");

            if (Utils.rand(player.stats.spe) >= 50 || Utils.rand(player.stats.int) >= 50) {
                MainScreen.text("\n\nThe light sears into your eyes, but with the discipline of conscious effort you escape the hypnotic pull before it can mesmerize you, before Jean-Claude can blind you.");

                MainScreen.text("\n\n“<i>You fight dirty,</i>” the monster snaps. He sounds genuinely outraged. “<i>I was told the interloper was a dangerous warrior, not a little [boy] who accepts duels of honour and then throws sand into his opponent’s eyes. Look into my eyes, little [boy]. Fair is fair.</i>”");

                monster.stats.HP -= Math.floor(10 + (player.stats.int / 3 + Utils.rand(player.stats.int / 2)) * spellMod());
            }
            else {
                MainScreen.text("\n\nThe light sears into your eyes and mind as you stare into it. It’s so powerful, so infinite, so exquisitely painful that you wonder why you’d ever want to look at anything else, at anything at- with a mighty effort, you tear yourself away from it, gasping. All you can see is the afterimages, blaring white and yellow across your vision. You swipe around you blindly as you hear Jean-Claude bark with laughter, trying to keep the monster at arm’s length.");

                MainScreen.text("\n\n“<i>The taste of your own medicine, it is not so nice, eh? I will show you much nicer things in there in time intrus, don’t worry. Once you have learnt your place.</i>”");

                player.statusAffects.add(new StatusAffect("Blind", Utils.rand(4) + 1, 0, 0, 0));
            }

            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock(player);
            return;
        }
        MainScreen.text("You glare at " + monster.a + monster.short + " and point at " + monster.pronoun2 + ".  A bright flash erupts before " + monster.pronoun2 + "!\n", true);
        if (monster instanceof LivingStatue) {
            // noop
        }
        else if (Utils.rand(3) != 0) {
            MainScreen.text(" <b>" + monster.capitalA + monster.short + " ", false);
            if (monster.plural && monster.short != "imp horde") MainScreen.text("are blinded!</b>", false);
            else MainScreen.text("is blinded!</b>", false);
            monster.statusAffects.add(new StatusAffect("Blind", 5 * spellMod())), 0, 0, 0);
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
        Flags.list[FlagEnum.SPELLS_CAST]++;
        spellPerkUnlock(player);
    }
}

export class SpellWhitefire implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.perks.has("BloodMage") && player.stats.fatigue + player.spellCost(30) <= 100;
    }

    public reasonCannotUse(): string {
        return "You are too tired to cast this spell.";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(30, 1);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            return;
        }
        if (monster instanceof Doppleganger) {
            (monster as Doppleganger).handleSpellResistance("whitefire");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock(player);
            return;
        }
        MainScreen.text("You narrow your eyes, focusing your mind with deadly intent.  You snap your fingers and " + monster.a + monster.short + " is enveloped in a flash of white flames!\n", true);
        let temp = Math.floor(10 + (player.stats.int / 3 + Utils.rand(player.stats.int / 2)) * spellMod());
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
        Flags.list[FlagEnum.SPELLS_CAST]++;
        spellPerkUnlock(player);
        monster.stats.HP -= temp;
    }
}

export class SpellCleansingPalm implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.perks.has("BloodMage") && player.stats.fatigue + player.spellCost(30) <= 100;
    }

    public reasonCannotUse(): string {
        return "You are too tired to cast this spell.";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.clearText();
        fatigue(30, 1);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock(player);

            return;
        }

        if (monster.short == "Jojo") {
            // Not a completely corrupted monkmouse
            if (Game.monk < 2) {
                MainScreen.text("You thrust your palm forward, sending a blast of pure energy towards Jojo. At the last second he sends a blast of his own against yours canceling it out\n\n");
                Flags.list[FlagEnum.SPELLS_CAST]++;
                spellPerkUnlock(player);

                return;
            }
        }

        if (monster instanceof LivingStatue) {
            MainScreen.text("You thrust your palm forward, causing a blast of pure energy to slam against the giant stone statue- to no effect!");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock(player);

            return;
        }

        let corruptionMulti: number = (monster.stats.cor - 20) / 25;
        if (corruptionMulti > 1.5) corruptionMulti = 1.5;

        let temp = Math.floor((player.stats.int / 4 + Utils.rand(player.stats.int / 3)) * (spellMod() * corruptionMulti));

        if (temp > 0) {
            MainScreen.text("You thrust your palm forward, causing a blast of pure energy to slam against " + monster.a + monster.short + ", tossing");
            if ((monster as Monster).plural == true) MainScreen.text(" them");
            else MainScreen.text((monster as Monster).mfn(" him", " her", " it"));
            MainScreen.text(" back a few feet.\n\n");

            MainScreen.text(monster.capitalA + monster.short + " takes " + temp + " damage.\n\n");
        }
        else {
            temp = 0;
            MainScreen.text("You thrust your palm forward, causing a blast of pure energy to slam against " + monster.a + monster.short + ", which they ignore. It is probably best you don’t use this technique against the pure.\n\n");
        }

        Flags.list[FlagEnum.SPELLS_CAST]++;
        spellPerkUnlock(player);
        monster.stats.HP -= temp;
    }
}

export function spellPerkUnlock(player: Player): void {
    if (Flags.list[FlagEnum.SPELLS_CAST] >= 5 && !player.perks.has("SpellcastingAffinity")) {
        MainScreen.text("<b>You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!</b>\n\n");
        player.perks.add(new Perk("SpellcastingAffinity", 20, 0, 0, 0));
    }
    if (Flags.list[FlagEnum.SPELLS_CAST] >= 15 && player.perks.get("SpellcastingAffinity").value1 < 35) {
        MainScreen.text("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b>\n\n");
        player.perks.get("SpellcastingAffinity").value1 = 35;
    }
    if (Flags.list[FlagEnum.SPELLS_CAST] >= 45 && player.perks.get("SpellcastingAffinity").value1 < 50) {
        MainScreen.text("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b>\n\n");
        player.perks.get("SpellcastingAffinity").value1 = 50;
    }
}
