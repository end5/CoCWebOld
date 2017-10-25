import SpecialAction from './SpecialAction';
import SpellAction from './SpellAction';
import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import MainScreen from '../../display/MainScreen';
import Perk from '../../Effects/Perk';
import StatusAffect from '../../Effects/StatusAffect';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

/*
"Berzerker"
    berzerk
"Dragonfire"
    dragonBreath
"FireLord"
    fireballuuuuu
"Hellfire"
    hellFire
"Incorporeality"
    possess
"Whispered"
    superWhisperAttack
"CorruptedNinetails"
    corruptedFoxFire
    kitsuneTerror
"EnlightenedNinetails"
    foxFire
    kitsuneIllusion
"ShieldingSpell"
    shieldingSpell
"ImmolationSpell"
    immolationSpell
*/

export class Berserk implements SpecialAction {
    public canUse(player: Player): boolean {
        return !player.statusAffects.has("Berzerking");
    }

    public reasonCannotUse(): string {
        return "You're already pretty goddamn mad!";
    }

    public use(player: Player, monster: Character) {
        MainScreen.clearText()
        MainScreen.text("You roar and unleash your savage fury, forgetting about defense in order to destroy your foe!\n\n", true);
        player.statusAffects.add(new StatusAffect("Berzerking", 0, 0, 0, 0));
    }
}

export class DragonBreath extends SpellAction {
    private reason: string;
    public readonly baseCost: number = 20;
    public canUse(player: Player): boolean {
        if (!player.perks.has("BloodMage") && player.stats.fatigue + this.spellCost(player) > 100) {
            this.reason = "You are too tired to breathe fire.";
            return false;
        }
        //Not Ready Yet:
        if (player.statusAffects.has("DragonBreathCooldown")) {
            this.reason = "You try to tap into the power within you, but your burning throat reminds you that you're not yet ready to unleash it again...";
            return false;
        }
        return true;
    }

    public reasonCannotUse(): string {
        return this.reason;
    }

    public use(player: Player, monster: Character) {
        MainScreen.clearText();
        player.stats.fatigueMagic(this.baseCost);
        player.statusAffects.add(new StatusAffect("DragonBreathCooldown", 0, 0, 0, 0));
        let damage: number = Math.floor(player.stats.level * 8 + 25 + Utils.rand(10));
        if (player.statusAffects.has("DragonBreathBoost")) {
            player.statusAffects.remove("DragonBreathBoost");
            damage *= 1.5;
        }
        //Shell
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.desc.a+ monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            return;
        }
        if (monster.charType == CharacterType.LivingStatue) {
            MainScreen.text("The fire courses by the stone skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            return;
        }
        MainScreen.text("Tapping into the power deep within you, you let loose a bellowing roar at your enemy, so forceful that even the environs crumble around " + monster.desc.objectivePronoun + ".  " + monster.desc.capitalA + monster.desc.short + " does " + monster.desc.possessivePronoun + " best to avoid it, but the wave of force is too fast.");
        if (monster.statusAffects.has("Sandstorm")) {
            MainScreen.text("  <b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>");
            damage = Math.round(0.2 * damage);
        }
        //Miss: 
        if ((player.statusAffects.has("Blind") && Utils.rand(2) == 0) || (monster.stats.spe - player.stats.spe > 0 && Math.floor(Math.random() * (((monster.stats.spe - player.stats.spe) / 4) + 80)) > 80)) {
            MainScreen.text("  Despite the heavy impact caused by your roar, " + monster.desc.a+ monster.desc.short + " manages to take it at an angle and remain on " + monster.desc.possessivePronoun + " feet and focuses on you, ready to keep fighting.");
        }
        //Special enemy avoidances
        else if (monster.desc.short == "Vala") {
            MainScreen.text("Vala beats her wings with surprising strength, blowing the fireball back at you! ", false);
            if (player.perks.has("Evade") && Utils.rand(2) == 0) {
                MainScreen.text("You dive out of the way and evade it!", false);
            }
            else if (player.perks.has("Flexibility") && Utils.rand(4) == 0) {
                MainScreen.text("You use your flexibility to barely fold your body out of the way!", false);
            }
            else {
                damage = player.combat.loseHP(damage, monster);
                MainScreen.text("Your own fire smacks into your face! (" + damage + ")", false);
            }
            MainScreen.text("\n\n", false);
        }
        //Goos burn
        else if (monster.desc.short == "goo-girl") {
            MainScreen.text(" Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer. ", false);
            if (!monster.perks.has("Acid"))
                monster.perks.add(new Perk("Acid", 0, 0, 0, 0));
            damage = Math.round(damage * 1.5);
            damage = monster.combat.loseHP(damage, player);
            monster.statusAffects.add(new StatusAffect("Stunned", 0, 0, 0, 0));
            MainScreen.text("(" + damage + ")\n\n", false);
        }
        else {
            if (!monster.perks.has("Resolute")) {
                MainScreen.text("  " + monster.desc.capitalA + monster.desc.short + " reels as your wave of force slams into " + monster.desc.objectivePronoun + " like a ton of rock!  The impact sends " + monster.desc.objectivePronoun + " crashing to the ground, too dazed to strike back.");
                monster.statusAffects.add(new StatusAffect("Stunned", 1, 0, 0, 0));
            }
            else {
                MainScreen.text("  " + monster.desc.capitalA + monster.desc.short + " reels as your wave of force slams into " + monster.desc.objectivePronoun + " like a ton of rock!  The impact sends " + monster.desc.objectivePronoun + " staggering back, but <b>" + monster.desc.subjectivePronoun + " ");
                if (!monster.desc.plural) MainScreen.text("is ");
                else MainScreen.text("are");
                MainScreen.text("too resolute to be stunned by your attack.</b>");
            }
            damage = monster.combat.loseHP(damage, player);
            MainScreen.text(" (" + damage + ")");
        }
        MainScreen.text("\n\n");
        if (monster.desc.short == "Holli" && !monster.statusAffects.has("HolliBurning"))
            <Holli>monster.lightHolliOnFireMagically();
    }
}

export class Fireball implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.stats.fatigue + 20 <= 100;
    }

    public reasonCannotUse(): string {
        return "You are too tired to breathe fire.";
    }

    public use(player: Player, monster: Character) {
        MainScreen.text("", true);
        player.stats.fatigue += 20;
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.desc.a+ monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            return;
        }
        if (monster.charType == CharacterType.LivingStatue) {
            MainScreen.text("The fire courses by the stone skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            return;
        }
        //[Failure]
        //(high damage to self, +20 fatigue)
        if (Utils.rand(5) == 0 || player.statusAffects.has("WebSilence")) {
            if (player.statusAffects.has("WebSilence")) MainScreen.text("You reach for the terrestrial fire, but as you ready to release a torrent of flame, it backs up in your throat, blocked by the webbing across your mouth.  It causes you to cry out as the sudden, heated force explodes in your own throat.\n\n", false);
            else if (player.statusAffects.has("GooArmorSilence")) MainScreen.text("You reach for the terrestrial fire but as you ready the torrent, it erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.  The slime covering your mouth bubbles and pops, boiling away where the escaping flame opens small rents in it.  That wasn't as effective as you'd hoped, but you can at least speak now.");
            else MainScreen.text("You reach for the terrestrial fire, but as you ready to release a torrent of flame, the fire inside erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.\n\n", false);
            player.stats.fatigue += 10;
            player.combat.loseHP(10 + Utils.rand(20), player);
            return;
        }
        // Player doesn't gain from this spell so why should the doppleganger gain for the player
        /*if (monster instanceof Doppleganger) {
            <Doppleganger>monster.handleSpellResistance("fireball");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock(player);
            return;
        }*/
        let damage: number;
        damage = Math.floor(player.stats.level * 10 + 45 + Utils.rand(10));
        if (player.statusAffects.has("GooArmorSilence")) {
            MainScreen.text("<b>A growl rumbles from deep within as you charge the terrestrial fire, and you force it from your chest and into the slime.  The goop bubbles and steams as it evaporates, drawing a curious look from your foe, who pauses in her onslaught to lean in and watch.  While the tension around your mouth lessens and your opponent forgets herself more and more, you bide your time.  When you can finally work your jaw enough to open your mouth, you expel the lion's - or jaguar's? share of the flame, inflating an enormous bubble of fire and evaporated slime that thins and finally pops to release a superheated cloud.  The armored girl screams and recoils as she's enveloped, flailing her arms.</b> ", false);
            player.statusAffects.remove("GooArmorSilence");
            damage += 25;
        }
        else MainScreen.text("A growl rumbles deep with your chest as you charge the terrestrial fire.  When you can hold it no longer, you release an ear splitting roar and hurl a giant green conflagration at your enemy. ", false);

        if (monster.desc.short == "Isabella") {
            MainScreen.text("Isabella shoulders her shield into the path of the emerald flames.  They burst over the wall of steel, splitting around the impenetrable obstruction and washing out harmlessly to the sides.\n\n", false);
            if (isabellaFollowerScene.isabellaAccent()) MainScreen.text("\"<i>Is zat all you've got?  It'll take more than a flashy magic trick to beat Izabella!</i>\" taunts the cow-girl.\n\n", false);
            else MainScreen.text("\"<i>Is that all you've got?  It'll take more than a flashy magic trick to beat Isabella!</i>\" taunts the cow-girl.\n\n", false);
            return;
        }
        else if (monster.desc.short == "Vala") {
            MainScreen.text("Vala beats her wings with surprising strength, blowing the fireball back at you! ", false);
            if (player.perks.has("Evade") && Utils.rand(2) == 0) {
                MainScreen.text("You dive out of the way and evade it!", false);
            }
            else if (player.perks.has("Flexibility") && Utils.rand(4) == 0) {
                MainScreen.text("You use your flexibility to barely fold your body out of the way!", false);
            }
            else {
                MainScreen.text("Your own fire smacks into your face! (" + damage + ")", false);
                player.combat.loseHP(damage, player);
            }
            MainScreen.text("\n\n", false);
        }
        else {
            //Using fire attacks on the goo]
            if (monster.desc.short == "goo-girl") {
                MainScreen.text(" Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer. ", false);
                if (!monster.perks.has("Acid"))
                    monster.perks.add(new Perk("Acid", 0, 0, 0, 0));
                damage = Math.round(damage * 1.5);
            }
            if (monster.statusAffects.has("Sandstorm")) {
                MainScreen.text("<b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>  ");
                damage = Math.round(0.2 * damage);
            }
            damage = monster.combat.loseHP(damage, player);
            MainScreen.text("(" + damage + ")\n\n", false);
            if (monster.desc.short == "Holli" && !monster.statusAffects.has("HolliBurning"))
                <Holli>monster.lightHolliOnFireMagically();
        }
    }
}

export class Hellfire extends SpellAction {
    public readonly baseCost: number = 20;
    public reasonCannotUse(): string {
        return "You are too tired to breathe fire.\n";
    }

    public use(player: Player, monster: Character) {
        MainScreen.text("", true);
        player.stats.fatigueMagic(this.baseCost);
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            return;
        }
        if (monster.charType == CharacterType.LivingStatue) {
            MainScreen.text("The fire courses over the stone behemoths skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            return;
        }
        let damage: number = (player.stats.level * 8 + Utils.rand(10) + player.stats.cor / 5);
        if (!player.statusAffects.has("GooArmorSilence")) MainScreen.text("You take in a deep breath and unleash a wave of corrupt red flames from deep within.", false);

        if (player.statusAffects.has("WebSilence")) {
            MainScreen.text("  <b>The fire burns through the webs blocking your mouth!</b>", false);
            player.statusAffects.remove("WebSilence");
        }
        if (player.statusAffects.has("GooArmorSilence")) {
            MainScreen.text("  <b>A growl rumbles from deep within as you charge the terrestrial fire, and you force it from your chest and into the slime.  The goop bubbles and steams as it evaporates, drawing a curious look from your foe, who pauses in her onslaught to lean in and watch.  While the tension around your mouth lessens and your opponent forgets herself more and more, you bide your time.  When you can finally work your jaw enough to open your mouth, you expel the lion's - or jaguar's? share of the flame, inflating an enormous bubble of fire and evaporated slime that thins and finally pops to release a superheated cloud.  The armored girl screams and recoils as she's enveloped, flailing her arms.</b>", false);
            player.statusAffects.remove("GooArmorSilence");
            damage += 25;
        }
        if (monster.desc.short == "Isabella") {
            MainScreen.text("  Isabella shoulders her shield into the path of the crimson flames.  They burst over the wall of steel, splitting around the impenetrable obstruction and washing out harmlessly to the sides.\n\n", false);
            if (isabellaFollowerScene.isabellaAccent()) MainScreen.text("\"<i>Is zat all you've got?  It'll take more than a flashy magic trick to beat Izabella!</i>\" taunts the cow-girl.\n\n", false);
            else MainScreen.text("\"<i>Is that all you've got?  It'll take more than a flashy magic trick to beat Isabella!</i>\" taunts the cow-girl.\n\n", false);

            return;
        }
        else if (monster.desc.short == "Vala") {
            MainScreen.text("  Vala beats her wings with surprising strength, blowing the fireball back at you!  ", false);
            if (player.perks.has("Evade") && Utils.rand(2) == 0) {
                MainScreen.text("You dive out of the way and evade it!", false);
            }
            else if (player.perks.has("Flexibility") && Utils.rand(4) == 0) {
                MainScreen.text("You use your flexibility to barely fold your body out of the way!", false);
            }
            else {
                damage = Math.floor(damage / 6);
                MainScreen.text("Your own fire smacks into your face, arousing you!", false);
                player.stats.lust += damage;
            }
            MainScreen.text("\n", false);
        }
        else {
            if (monster.stats.int < 10) {
                MainScreen.text("  Your foe lets out a shriek as their form is engulfed in the blistering flames.", false);
                damage = Math.floor(damage);
                damage = monster.combat.loseHP(damage, player);
                MainScreen.text("(" + damage + ")\n", false);
            }
            else {
                if (monster.stats.lustVuln > 0) {
                    MainScreen.text("  Your foe cries out in surprise and then gives a sensual moan as the flames of your passion surround them and fill their body with unnatural lust.\n", false);
                    monster.stats.lust += monster.stats.lustVuln * damage / 6;
                }
                else {
                    MainScreen.text("  The corrupted fire doesn't seem to have affect on " + monster.desc.a+ monster.desc.short + "!\n", false);
                }
            }
        }
        MainScreen.text("\n", false);
        if (monster.desc.short == "Holli" && !monster.statusAffects.has("HolliBurning"))
            <Holli>monster.lightHolliOnFireMagically();
    }
}

export class Possess implements SpecialAction {
    public canUse(player: Player): boolean {
        return true;
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Character) {
        MainScreen.text("", true);
        if (monster.desc.short == "plain girl" || monster.perks.has("Incorporeality")) {
            MainScreen.text("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself toward the opponent's frame.  Sadly, it was doomed to fail, as you bounce right off your foe's ghostly form.", false);
        }
        else if (monster.charType == CharacterType.LivingStatue) {
            MainScreen.text("There is nothing to possess inside the golem.");
        }
        //Sample possession text (>79 int, perhaps?):
        else if ((!monster.lowerBody.cockSpot.hasCock() && !monster.lowerBody.vaginaSpot.hasVagina()) || monster.stats.lustVuln == 0 || monster.stats.int == 0 || monster.stats.int > 100) {
            MainScreen.text("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into the opponent's frame.  Unfortunately, it seems ", false);
            if (monster.stats.int > 100)
                MainScreen.text("they were FAR more mentally prepared than anything you can handle, and you're summarily thrown out of their body before you're even able to have fun with them.  Darn, you muse.\n\n", false);
            else
                MainScreen.text("they have a body that's incompatible with any kind of possession.\n\n", false);
        }
        //Success!
        else if (player.stats.int >= (monster.stats.int - 10) + Utils.rand(21)) {
            MainScreen.text("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into your opponent's frame. Before they can regain the initiative, you take control of one of their arms, vigorously masturbating for several seconds before you're finally thrown out. Recorporealizing, you notice your enemy's blush, and know your efforts were somewhat successful.\n\n", false);
            let damage: number = Math.round(player.stats.int / 5) + Utils.rand(player.stats.level) + player.stats.level;
            monster.stats.lust += monster.stats.lustVuln * damage;
        }
        //Fail
        else {
            MainScreen.text("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into the opponent's frame. Unfortunately, it seems they were more mentally prepared than you hoped, and you're summarily thrown out of their body before you're even able to have fun with them. Darn, you muse. Gotta get smarter.\n\n", false);
        }
    }
}

export class SuperWhisperAttack extends SpellAction {
    public readonly baseCost: number = 10;
    private reason: string;
    public canUse(player: Player): boolean {
        if (!player.perks.has("BloodMage") && player.stats.fatigue + this.spellCost(player) > 100) {
            this.reason = "You are too tired to use this ability.";
            return false;
        }
        if (player.statusAffects.has("ThroatPunch") || player.statusAffects.has("WebSilence")) {
            this.reason = "You cannot focus to use this ability while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public reasonCannotUse(): string {
        return this.reason;
    }

    public use(player: Player, monster: Character) {
        MainScreen.text("", true);
        if (monster.desc.short == "pod" || monster.stats.int == 0) {
            MainScreen.text("You reach for the enemy's mind, but cannot find anything.  You frantically search around, but there is no consciousness as you know it in the room.\n\n", true);
            player.stats.fatigue++;
            return;
        }
        if (monster.charType == CharacterType.LivingStatue) {
            MainScreen.text("There is nothing inside the golem to whisper to.");
            player.stats.fatigue++;
            return;
        }
        player.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.desc.a+ monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.perks.has("Focused")) {
            if (!monster.desc.plural) 
                MainScreen.text(monster.desc.capitalA + monster.desc.short + " is too focused for your whispers to influence!\n\n");
            return;
        }
        //Enemy too strong or multiplesI think you 
        if (player.stats.int < monster.stats.int || monster.desc.plural) {
            MainScreen.text("You reach for your enemy's mind, but can't break through.\n", false);
            player.stats.fatigue += 10;
            return;
        }
        //[Failure] 
        if (Utils.rand(10) == 0) {
            MainScreen.text("As you reach for your enemy's mind, you are distracted and the chorus of voices screams out all at once within your mind. You're forced to hastily silence the voices to protect yourself.", false);
            player.stats.fatigue += 10;
            return;
        }
        MainScreen.text("You reach for your enemy's mind, watching as its sudden fear petrifies your foe.\n\n", false);
        monster.statusAffects.add(new StatusAffect("Fear", 1, 0, 0, 0));
    }
}

export class CorruptedFoxFire extends SpellAction {
    public readonly baseCost: number = 35;
    private reason: string;
    public canUse(player: Player): boolean {
        if (!player.perks.has("BloodMage") && player.stats.fatigue + this.spellCost(player) > 100) {
            this.reason = "You are too tired to use this ability.";
            return false;
        }
        if (player.statusAffects.has("ThroatPunch") || player.statusAffects.has("WebSilence")) {
            this.reason = "You cannot focus to use this ability while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public reasonCannotUse(): string {
        return this.reason;
    }

    public use(player: Player, monster: Character) {
        MainScreen.clearText();
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        player.stats.fatigueMagic(this.baseCost);
        //Deals direct damage and lust regardless of enemy defenses.  Especially effective against non-corrupted targets.
        MainScreen.text("Holding out your palm, you conjure corrupted purple flame that dances across your fingertips.  You launch it at " + monster.desc.a+ monster.desc.short + " with a ferocious throw, and it bursts on impact, showering dazzling lavender sparks everywhere.");

        let damage: number = Math.floor(10 + (player.stats.int / 3 + Utils.rand(player.stats.int / 2)) * player.spellMod());
        if (monster.stats.cor >= 66) damage = Math.round(damage * .66);
        else if (monster.stats.cor >= 50) damage = Math.round(damage * .8);
        //High damage to goes.
        if (monster.desc.short == "goo-girl") damage = Math.round(damage * 1.5);
        //Using fire attacks on the goo]
        if (monster.desc.short == "goo-girl") {
            MainScreen.text("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer.", false);
            if (!monster.perks.has("Acid"))
                monster.perks.add(new Perk("Acid", 0, 0, 0, 0));
        }
        damage = monster.combat.loseHP(damage, player);
        MainScreen.text("  (" + damage + ")\n\n", false);
    }
}

export class KitsuneTerror extends SpellAction {
    public readonly baseCost: number = 20;
    private reason: string;
    public canUse(player: Player): boolean {
        if (!player.perks.has("BloodMage") && player.stats.fatigue + this.spellCost(player) > 100) {
            this.reason = "You are too tired to use this ability.";
            return false;
        }
        if (player.statusAffects.has("ThroatPunch") || player.statusAffects.has("WebSilence")) {
            this.reason = "You cannot focus to use this ability while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public reasonCannotUse(): string {
        return this.reason;
    }

    public use(player: Player, monster: Character) {
        MainScreen.clearText();
        //Fatigue Cost: 25
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.desc.a+ monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.desc.short == "pod" || monster.stats.int == 0) {
            MainScreen.text("You reach for the enemy's mind, but cannot find anything.  You frantically search around, but there is no consciousness as you know it in the room.\n\n", true);
            player.stats.fatigue++;
            return;
        }
        player.stats.fatigueMagic(this.baseCost);
        //Inflicts fear and reduces enemy SPD.
        MainScreen.text("The world goes dark, an inky shadow blanketing everything in sight as you fill " + monster.desc.a+ monster.desc.short + "'s mind with visions of otherworldly terror that defy description.");
        //(succeed)
        if (player.stats.int / 10 + Utils.rand(20) + 1 > monster.stats.int / 10 + 10) {
            MainScreen.text("  They cower in horror as they succumb to your illusion, believing themselves beset by eldritch horrors beyond their wildest nightmares.\n\n");
            monster.statusAffects.add(new StatusAffect("Fear", 1, 0, 0, 0));
            monster.stats.spe -= 5;
            if (monster.stats.spe < 1)
                monster.stats.spe = 1;
        }
        else
            MainScreen.text("  The dark fog recedes as quickly as it rolled in as they push back your illusions, resisting your hypnotic influence.\n\n");
    }
}

export class FoxFire extends SpellAction {
    public readonly baseCost: number = 35;
    private reason: string;
    public canUse(player: Player): boolean {
        if (!player.perks.has("BloodMage") && player.stats.fatigue + this.spellCost(player) > 100) {
            this.reason = "You are too tired to use this ability.";
            return false;
        }
        if (player.statusAffects.has("ThroatPunch") || player.statusAffects.has("WebSilence")) {
            this.reason = "You cannot focus to use this ability while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public reasonCannotUse(): string {
        return this.reason;
    }

    public use(player: Player, monster: Character) {
        MainScreen.clearText();
        player.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.desc.a+ monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        //Deals direct damage and lust regardless of enemy defenses.  Especially effective against corrupted targets.
        MainScreen.text("Holding out your palm, you conjure an ethereal blue flame that dances across your fingertips.  You launch it at " + monster.desc.a+ monster.desc.short + " with a ferocious throw, and it bursts on impact, showering dazzling azure sparks everywhere.");
        let damage: number = Math.floor(10 + (player.stats.int / 3 + Utils.rand(player.stats.int / 2)) * player.spellMod());
        if (monster.stats.cor < 33) damage = Math.round(damage * .66);
        else if (monster.stats.cor < 50) damage = Math.round(damage * .8);
        //High damage to goes.
        if (monster.desc.short == "goo-girl") damage = Math.round(damage * 1.5);
        //Using fire attacks on the goo
        if (monster.desc.short == "goo-girl") {
            MainScreen.text("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer.", false);
            if (!monster.perks.has("Acid"))
                monster.perks.add(new Perk("Acid", 0, 0, 0, 0));
        }
        damage = monster.combat.loseHP(damage, player);
        MainScreen.text("  (" + damage + ")\n\n", false);
    }
}

export class KitsuneIllusion extends SpellAction {
    public readonly baseCost: number = 25;
    private reason: string;
    public canUse(player: Player): boolean {
        if (!player.perks.has("BloodMage") && player.stats.fatigue + this.spellCost(player) > 100) {
            this.reason = "You are too tired to use this ability.";
            return false;
        }
        if (player.statusAffects.has("ThroatPunch") || player.statusAffects.has("WebSilence")) {
            this.reason = "You cannot focus to use this ability while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public reasonCannotUse(): string {
        return this.reason;
    }

    public use(player: Player, monster: Character) {
        MainScreen.clearText();
        if (monster.desc.short == "pod" || monster.stats.int == 0) {
            MainScreen.text("In the tight confines of this pod, there's no use making such an attack!\n\n", true);
            player.stats.fatigue++;
            return;
        }

        player.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.desc.a+ monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        //Decrease enemy speed and increase their susceptibility to lust attacks if already 110% or more
        MainScreen.text("The world begins to twist and distort around you as reality bends to your will, " + monster.desc.a+ monster.desc.short + "'s mind blanketed in the thick fog of your illusions.");
        //Check for success rate. Maximum 100% with over 90 Intelligence difference between PC and monster.
        if (player.stats.int / 10 + Utils.rand(20) > monster.stats.int / 10 + 9) {
            //Reduce speed down to -20. Um, are there many monsters with 110% lust vulnerability?
            MainScreen.text("  They stumble humorously to and fro, unable to keep pace with the shifting illusions that cloud their perceptions.\n\n");
            if (monster.stats.spe >= 0) monster.stats.spe -= 20;
            if (monster.stats.lustVuln >= 1.1) monster.stats.lustVuln += .1;
        }
        else
            MainScreen.text("  Like the snapping of a rubber band, reality falls back into its rightful place as they resist your illusory conjurations.\n\n");
    }
}

export class ImmolationSpell implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.statusAffects.has("ImmolationSpell");
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Character) {
        MainScreen.clearText();
        MainScreen.text("You gather energy in your Talisman and unleash the spell contained within.  A wave of burning flames gathers around " + monster.desc.a+ monster.desc.short + ", slowly burning " + monster.desc.objectivePronoun + ".");
        let damage: number = Math.floor(75 + (player.stats.int / 3 + Utils.rand(player.stats.int / 2)) * spellMod(player));
        damage = monster.combat.loseHP(damage, player);
        MainScreen.text(" (" + damage + ")\n\n");
        player.statusAffects.remove("ImmolationSpell");
        arianScene.clearTalisman();
    }
}

export class ShieldingSpell implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.statusAffects.has("ShieldingSpell");
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Character) {
        MainScreen.clearText();
        MainScreen.text("You gather energy in your Talisman and unleash the spell contained within.  A barrier of light engulfs you, before turning completely transparent.  Your defense has been increased.\n\n");
        player.statusAffects.add(new StatusAffect("Shielding", 0, 0, 0, 0));
        player.statusAffects.remove("ShieldingSpell");
        arianScene.clearTalisman();
    }
}

