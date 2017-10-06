import SpecialAction from './SpecialAction';
import { LowerBodyType, TailType } from '../Body/LowerBody';
import GenderDescriptor from '../Descriptors/GenderDescriptor';
import MainScreen from '../display/MainScreen';
import Perk from '../Effects/Perk';
import StatusAffect from '../Effects/StatusAffect';
import Flags, { FlagEnum } from '../Game/Flags';
import Monster from '../Monster';
import Player from '../Player';
import Utils from '../Utilities/Utils';
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

    public use(player: Player, monster: Monster) {
        MainScreen.clearText()
        MainScreen.text("You roar and unleash your savage fury, forgetting about defense in order to destroy your foe!\n\n", true);
        player.statusAffects.add(new StatusAffect("Berzerking", 0, 0, 0, 0));
    }
}

export class DragonBreath implements SpecialAction {
    private reason: string;
    public canUse(player: Player): boolean {
        if (!player.perks.has("BloodMage") && player.fatigue + spellCost(20) > 100) {
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

    public use(player: Player, monster: Monster) {
        MainScreen.clearText();
        if (!player.perks.has("BloodMage") && player.stats.fatigue + spellCost(20) > 100) {
            MainScreen.text("You are too tired to breathe fire.", true);
            return;
        }
        //Not Ready Yet:
        if (player.statusAffects.has("DragonBreathCooldown")) {
            MainScreen.text("You try to tap into the power within you, but your burning throat reminds you that you're not yet ready to unleash it again...");
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        player.fatigue(20, 1);
        player.statusAffects.add(new StatusAffect("DragonBreathCooldown", 0, 0, 0, 0));
        let damage: number = Math.floor(player.stats.level * 8 + 25 + Utils.rand(10));
        if (player.statusAffects.has("DragonBreathBoost")) {
            player.statusAffects.remove("DragonBreathBoost");
            damage *= 1.5;
        }
        //Shell
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            return;
        }
        if (monster instanceof LivingStatue) {
            MainScreen.text("The fire courses by the stone skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            return;
        }
        MainScreen.text("Tapping into the power deep within you, you let loose a bellowing roar at your enemy, so forceful that even the environs crumble around " + monster.pronoun2 + ".  " + monster.capitalA + monster.short + " does " + monster.pronoun3 + " best to avoid it, but the wave of force is too fast.");
        if (monster.statusAffects.has("Sandstorm")) {
            MainScreen.text("  <b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>");
            damage = Math.round(0.2 * damage);
        }
        //Miss: 
        if ((player.statusAffects.has("Blind") && Utils.rand(2) == 0) || (monster.stats.spe - player.stats.spe > 0 && Math.floor(Math.random() * (((monster.stats.spe - player.stats.spe) / 4) + 80)) > 80)) {
            MainScreen.text("  Despite the heavy impact caused by your roar, " + monster.a + monster.short + " manages to take it at an angle and remain on " + monster.pronoun3 + " feet and focuses on you, ready to keep fighting.");
        }
        //Special enemy avoidances
        else if (monster.short == "Vala") {
            MainScreen.text("Vala beats her wings with surprising strength, blowing the fireball back at you! ", false);
            if (player.perks.has("Evade") && Utils.rand(2) == 0) {
                MainScreen.text("You dive out of the way and evade it!", false);
            }
            else if (player.perks.has("Flexibility") && Utils.rand(4) == 0) {
                MainScreen.text("You use your flexibility to barely fold your body out of the way!", false);
            }
            else {
                damage = takeDamage(damage);
                MainScreen.text("Your own fire smacks into your face! (" + damage + ")", false);
            }
            MainScreen.text("\n\n", false);
        }
        //Goos burn
        else if (monster.short == "goo-girl") {
            MainScreen.text(" Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer. ", false);
            if (!monster.perks.has("Acid"))
                monster.perks.add(new Perk("Acid", 0, 0, 0, 0));
            damage = Math.round(damage * 1.5);
            damage = doDamage(damage);
            monster.statusAffects.add(new StatusAffect("Stunned", 0, 0, 0, 0));
            MainScreen.text("(" + damage + ")\n\n", false);
        }
        else {
            if (!monster.perks.has("Resolute")) {
                MainScreen.text("  " + monster.capitalA + monster.short + " reels as your wave of force slams into " + monster.pronoun2 + " like a ton of rock!  The impact sends " + monster.pronoun2 + " crashing to the ground, too dazed to strike back.");
                monster.statusAffects.add(new StatusAffect("Stunned", 1, 0, 0, 0));
            }
            else {
                MainScreen.text("  " + monster.capitalA + monster.short + " reels as your wave of force slams into " + monster.pronoun2 + " like a ton of rock!  The impact sends " + monster.pronoun2 + " staggering back, but <b>" + monster.pronoun1 + " ");
                if (!monster.plural) MainScreen.text("is ");
                else MainScreen.text("are");
                MainScreen.text("too resolute to be stunned by your attack.</b>");
            }
            damage = doDamage(damage);
            MainScreen.text(" (" + damage + ")");
        }
        MainScreen.text("\n\n");
        if (monster.short == "Holli" && !monster.statusAffects.has("HolliBurning"))
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

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        player.changeFatigue(20);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            return;
        }
        if (monster instanceof LivingStatue) {
            MainScreen.text("The fire courses by the stone skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            return;
        }
        //[Failure]
        //(high damage to self, +20 fatigue)
        if (Utils.rand(5) == 0 || player.statusAffects.has("WebSilence")) {
            if (player.statusAffects.has("WebSilence")) MainScreen.text("You reach for the terrestrial fire, but as you ready to release a torrent of flame, it backs up in your throat, blocked by the webbing across your mouth.  It causes you to cry out as the sudden, heated force explodes in your own throat.\n\n", false);
            else if (player.statusAffects.has("GooArmorSilence")) MainScreen.text("You reach for the terrestrial fire but as you ready the torrent, it erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.  The slime covering your mouth bubbles and pops, boiling away where the escaping flame opens small rents in it.  That wasn't as effective as you'd hoped, but you can at least speak now.");
            else MainScreen.text("You reach for the terrestrial fire, but as you ready to release a torrent of flame, the fire inside erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.\n\n", false);
            player.changeFatigue(10);
            player.takeDamage(10 + Utils.rand(20));
            return;
        }
        if (monster instanceof Doppleganger) {
            <Doppleganger>monster.handleSpellResistance("fireball");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            return;
        }
        let damage: number;
        damage = Math.floor(player.stats.level * 10 + 45 + Utils.rand(10));
        if (player.statusAffects.has("GooArmorSilence")) {
            MainScreen.text("<b>A growl rumbles from deep within as you charge the terrestrial fire, and you force it from your chest and into the slime.  The goop bubbles and steams as it evaporates, drawing a curious look from your foe, who pauses in her onslaught to lean in and watch.  While the tension around your mouth lessens and your opponent forgets herself more and more, you bide your time.  When you can finally work your jaw enough to open your mouth, you expel the lion's - or jaguar's? share of the flame, inflating an enormous bubble of fire and evaporated slime that thins and finally pops to release a superheated cloud.  The armored girl screams and recoils as she's enveloped, flailing her arms.</b> ", false);
            player.statusAffects.remove("GooArmorSilence");
            damage += 25;
        }
        else MainScreen.text("A growl rumbles deep with your chest as you charge the terrestrial fire.  When you can hold it no longer, you release an ear splitting roar and hurl a giant green conflagration at your enemy. ", false);

        if (monster.short == "Isabella") {
            MainScreen.text("Isabella shoulders her shield into the path of the emerald flames.  They burst over the wall of steel, splitting around the impenetrable obstruction and washing out harmlessly to the sides.\n\n", false);
            if (isabellaFollowerScene.isabellaAccent()) MainScreen.text("\"<i>Is zat all you've got?  It'll take more than a flashy magic trick to beat Izabella!</i>\" taunts the cow-girl.\n\n", false);
            else MainScreen.text("\"<i>Is that all you've got?  It'll take more than a flashy magic trick to beat Isabella!</i>\" taunts the cow-girl.\n\n", false);
            return;
        }
        else if (monster.short == "Vala") {
            MainScreen.text("Vala beats her wings with surprising strength, blowing the fireball back at you! ", false);
            if (player.perks.has("Evade") && Utils.rand(2) == 0) {
                MainScreen.text("You dive out of the way and evade it!", false);
            }
            else if (player.perks.has("Flexibility") && Utils.rand(4) == 0) {
                MainScreen.text("You use your flexibility to barely fold your body out of the way!", false);
            }
            else {
                MainScreen.text("Your own fire smacks into your face! (" + damage + ")", false);
                player.takeDamage(damage);
            }
            MainScreen.text("\n\n", false);
        }
        else {
            //Using fire attacks on the goo]
            if (monster.short == "goo-girl") {
                MainScreen.text(" Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer. ", false);
                if (!monster.perks.has("Acid"))
                    monster.perks.add(new Perk("Acid", 0, 0, 0, 0));
                damage = Math.round(damage * 1.5);
            }
            if (monster.statusAffects.has("Sandstorm")) {
                MainScreen.text("<b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>  ");
                damage = Math.round(0.2 * damage);
            }
            MainScreen.text("(" + damage + ")\n\n", false);
            monster.HP -= damage;
            if (monster.short == "Holli" && !monster.statusAffects.has("HolliBurning"))
                <Holli>monster.lightHolliOnFireMagically();
        }
    }
}

export class HellFire implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.perks.has("BloodMage") && player.stats.fatigue + spellCost(20) <= 100;
    }

    public reasonCannotUse(): string {
        return "You are too tired to breathe fire.\n";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        fatigue(20, 1);
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            return;
        }
        if (monster instanceof LivingStatue) {
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
        if (monster.short == "Isabella") {
            MainScreen.text("  Isabella shoulders her shield into the path of the crimson flames.  They burst over the wall of steel, splitting around the impenetrable obstruction and washing out harmlessly to the sides.\n\n", false);
            if (isabellaFollowerScene.isabellaAccent()) MainScreen.text("\"<i>Is zat all you've got?  It'll take more than a flashy magic trick to beat Izabella!</i>\" taunts the cow-girl.\n\n", false);
            else MainScreen.text("\"<i>Is that all you've got?  It'll take more than a flashy magic trick to beat Isabella!</i>\" taunts the cow-girl.\n\n", false);

            return;
        }
        else if (monster.short == "Vala") {
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
                MainScreen.text("(" + damage + ")\n", false);
                monster.stats.HP -= damage;
            }
            else {
                if (monster.lustVuln > 0) {
                    MainScreen.text("  Your foe cries out in surprise and then gives a sensual moan as the flames of your passion surround them and fill their body with unnatural lust.\n", false);
                    monster.stats.lust += monster.lustVuln * damage / 6;
                }
                else {
                    MainScreen.text("  The corrupted fire doesn't seem to have affect on " + monster.a + monster.short + "!\n", false);
                }
            }
        }
        MainScreen.text("\n", false);
        if (monster.short == "Holli" && !monster.statusAffects.has("HolliBurning"))
            <Holli>monster.lightHolliOnFireMagically();
    }
}

export class Possess implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.perks.has("BloodMage") && player.stats.fatigue + spellCost(20) <= 100;
    }

    public reasonCannotUse(): string {
        return "You are too tired to breathe fire.\n";
    }

    public use(player: Player, monster: Monster) {
        outputText("", true);
        if (monster.short == "plain girl" || monster.findPerk(PerkLib.Incorporeality) >= 0) {
            outputText("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself toward the opponent's frame.  Sadly, it was doomed to fail, as you bounce right off your foe's ghostly form.", false);
        }
        else if (monster instanceof LivingStatue) {
            outputText("There is nothing to possess inside the golem.");
        }
        //Sample possession text (>79 int, perhaps?):
        else if ((!monster.hasCock() && !monster.hasVagina()) || monster.lustVuln == 0 || monster.inte == 0 || monster.inte > 100) {
            outputText("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into the opponent's frame.  Unfortunately, it seems ", false);
            if (monster.inte > 100) outputText("they were FAR more mentally prepared than anything you can handle, and you're summarily thrown out of their body before you're even able to have fun with them.  Darn, you muse.\n\n", false);
            else outputText("they have a body that's incompatible with any kind of possession.\n\n", false);
        }
        //Success!
        else if (player.inte >= (monster.inte - 10) + rand(21)) {
            outputText("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into your opponent's frame. Before they can regain the initiative, you take control of one of their arms, vigorously masturbating for several seconds before you're finally thrown out. Recorporealizing, you notice your enemy's blush, and know your efforts were somewhat successful.\n\n", false);
            var damage: Number = Math.round(player.inte / 5) + rand(player.level) + player.level;
            monster.lust += monster.lustVuln * damage;
        }
        //Fail
        else {
            outputText("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into the opponent's frame. Unfortunately, it seems they were more mentally prepared than you hoped, and you're summarily thrown out of their body before you're even able to have fun with them. Darn, you muse. Gotta get smarter.\n\n", false);
        }
    }
}

export class SuperWhisperAttack implements SpecialAction {
    private reason: string;
    public canUse(player: Player): boolean {
        if (!player.perks.has("BloodMage") && player.stats.fatigue + spellCost(10) > 100) {
            this.reason = "You are too tired to focus this ability.";
            return false;
        }
        if (player.statusAffects.has("ThroatPunch") || player.statusAffects.has("WebSilence")) {
            this.reason = "You cannot focus to reach the enemy's mind while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public reasonCannotUse(): string {
        return this.reason;
    }

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        if (monster.short == "pod" || monster.stats.int == 0) {
            MainScreen.text("You reach for the enemy's mind, but cannot find anything.  You frantically search around, but there is no consciousness as you know it in the room.\n\n", true);
            changeFatigue(1);
            return;
        }
        if (monster instanceof LivingStatue) {
            MainScreen.text("There is nothing inside the golem to whisper to.");
            changeFatigue(1);
            return;
        }
        fatigue(10, 1);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.perks.has("Focused")) {
            if (!monster.plural) MainScreen.text(monster.capitalA + monster.short + " is too focused for your whispers to influence!\n\n");
            return;
        }
        //Enemy too strong or multiplesI think you 
        if (player.stats.int < monster.stats.int || monster.plural) {
            MainScreen.text("You reach for your enemy's mind, but can't break through.\n", false);
            changeFatigue(10);
            return;
        }
        //[Failure] 
        if (Utils.rand(10) == 0) {
            MainScreen.text("As you reach for your enemy's mind, you are distracted and the chorus of voices screams out all at once within your mind. You're forced to hastily silence the voices to protect yourself.", false);
            changeFatigue(10);
            return;
        }
        MainScreen.text("You reach for your enemy's mind, watching as its sudden fear petrifies your foe.\n\n", false);
        monster.statusAffects.add(new StatusAffect("Fear", 1, 0, 0, 0));
    }
}

export class KissAttack implements SpecialAction {
    public canUse(player: Player): boolean {
        return !player.statusAffects.has("Blind");
    }

    public reasonCannotUse(): string {
        return "There's no way you'd be able to find their lips while you're blind!";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        let attack: number = Utils.rand(6);
        switch (attack) {
            case 1:
                //Attack text 1:
                MainScreen.text("You hop up to " + monster.a + monster.short + " and attempt to plant a kiss on " + monster.pronoun3 + ".", false);
                break;
            //Attack text 2:
            case 2:
                MainScreen.text("You saunter up and dart forward, puckering your golden lips into a perfect kiss.", false);
                break;
            //Attack text 3: 
            case 3:
                MainScreen.text("Swaying sensually, you wiggle up to " + monster.a + monster.short + " and attempt to plant a nice wet kiss on " + monster.pronoun2 + ".", false);
                break;
            //Attack text 4:
            case 4:
                MainScreen.text("Lunging forward, you fly through the air at " + monster.a + monster.short + " with your lips puckered and ready to smear drugs all over " + monster.pronoun2 + ".", false);
                break;
            //Attack text 5:
            case 5:
                MainScreen.text("You lean over, your lips swollen with lust, wet with your wanting slobber as you close in on " + monster.a + monster.short + ".", false);
                break;
            //Attack text 6:
            default:
                MainScreen.text("Pursing your drug-laced lips, you close on " + monster.a + monster.short + " and try to plant a nice, wet kiss on " + monster.pronoun2 + ".", false);
                break;
        }
        //Dodged!
        if (monster.stats.spe - player.stats.spe > 0 && Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80) {
            attack = Utils.rand(3);
            switch (attack) {
                //Dodge 1:
                case 1:
                    if (monster.plural) MainScreen.text("  " + monster.capitalA + monster.short + " sees it coming and moves out of the way in the nick of time!\n\n", false);
                    break;
                //Dodge 2:
                case 2:
                    if (monster.plural) MainScreen.text("  Unfortunately, you're too slow, and " + monster.a + monster.short + " slips out of the way before you can lay a wet one on one of them.\n\n", false);
                    else MainScreen.text("  Unfortunately, you're too slow, and " + monster.a + monster.short + " slips out of the way before you can lay a wet one on " + monster.pronoun2 + ".\n\n", false);
                    break;
                //Dodge 3:
                default:
                    if (monster.plural) MainScreen.text("  Sadly, " + monster.a + monster.short + " moves aside, denying you the chance to give one of them a smooch.\n\n", false);
                    else MainScreen.text("  Sadly, " + monster.a + monster.short + " moves aside, denying you the chance to give " + monster.pronoun2 + " a smooch.\n\n", false);
                    break;
            }
            return;
        }
        //Success but no effect:
        if (monster.lustVuln <= 0 || !monster.hasCock()) {
            if (monster.plural) MainScreen.text("  Mouth presses against mouth, and you allow your tongue to stick out to taste the saliva of one of their number, making sure to give them a big dose.  Pulling back, you look at " + monster.a + monster.short + " and immediately regret wasting the time on the kiss.  It had no effect!\n\n", false);
            else MainScreen.text("  Mouth presses against mouth, and you allow your tongue to stick to taste " + monster.pronoun3 + "'s saliva as you make sure to give them a big dose.  Pulling back, you look at " + monster.a + monster.short + " and immediately regret wasting the time on the kiss.  It had no effect!\n\n", false);
            return;
        }
        attack = Utils.rand(4);
        let damage: number = 0;
        switch (attack) {
            //Success 1:
            case 1:
                if (monster.plural) MainScreen.text("  Success!  A spit-soaked kiss lands right on one of their mouths.  The victim quickly melts into your embrace, allowing you to give them a nice, heavy dose of sloppy oral aphrodisiacs.\n\n", false);
                else MainScreen.text("  Success!  A spit-soaked kiss lands right on " + monster.a + monster.short + "'s mouth.  " + GenderDescriptor.mf(monster, "He", "She") + " quickly melts into your embrace, allowing you to give them a nice, heavy dose of sloppy oral aphrodisiacs.\n\n", false);
                damage = 15;
                break;
            //Success 2:
            case 2:
                if (monster.plural) MainScreen.text("  Gold-gilt lips press into one of their mouths, the victim's lips melding with yours.  You take your time with your suddenly cooperative captive and make sure to cover every bit of their mouth with your lipstick before you let them go.\n\n", false);
                else MainScreen.text("  Gold-gilt lips press into " + monster.a + monster.short + ", " + monster.pronoun3 + " mouth melding with yours.  You take your time with your suddenly cooperative captive and make sure to cover every inch of " + monster.pronoun3 + " with your lipstick before you let " + monster.pronoun2 + " go.\n\n", false);
                damage = 20;
                break;
            //CRITICAL SUCCESS (3)
            case 3:
                if (monster.plural) MainScreen.text("  You slip past " + monster.a + monster.short + "'s guard and press your lips against one of them.  " + GenderDescriptor.mf(monster, "He", "She") + " melts against you, " + GenderDescriptor.mf(monster, "his", "her") + " tongue sliding into your mouth as " + GenderDescriptor.mf(monster, "he", "she") + " quickly succumbs to the fiery, cock-swelling kiss.  It goes on for quite some time.  Once you're sure you've given a full dose to " + GenderDescriptor.mf(monster, "his", "her") + " mouth, you break back and observe your handwork.  One of " + monster.a + monster.short + " is still standing there, licking " + GenderDescriptor.mf(monster, "his", "her") + " his lips while " + GenderDescriptor.mf(monster, "his", "her") + " dick is standing out, iron hard.  You feel a little daring and give the swollen meat another moist peck, glossing the tip in gold.  There's no way " + GenderDescriptor.mf(monster, "he", "she") + " will go soft now.  Though you didn't drug the rest, they're probably a little 'heated up' from the show.\n\n", false);
                else MainScreen.text("  You slip past " + monster.a + monster.short + "'s guard and press your lips against " + monster.pronoun3 + ".  " + GenderDescriptor.mf(monster, "He", "She") + " melts against you, " + monster.pronoun3 + " tongue sliding into your mouth as " + monster.pronoun1 + " quickly succumbs to the fiery, cock-swelling kiss.  It goes on for quite some time.  Once you're sure you've given a full dose to " + monster.pronoun3 + " mouth, you break back and observe your handwork.  " + monster.capitalA + monster.short + " is still standing there, licking " + monster.pronoun3 + " lips while " + monster.pronoun3 + " dick is standing out, iron hard.  You feel a little daring and give the swollen meat another moist peck, glossing the tip in gold.  There's no way " + monster.pronoun1 + " will go soft now.\n\n", false);
                damage = 30;
                break;
            //Success 4:
            default:
                MainScreen.text("  With great effort, you slip through an opening and compress their lips against your own, lust seeping through the oral embrace along with a heavy dose of drugs.\n\n", false);
                damage = 12;
                break;
        }
        //Add status if not already drugged
        if (!monster.statusAffects.has("LustStick"))
            monster.statusAffects.add(new StatusAffect("LustStick", 0, 0, 0, 0));
        //Else add bonus to round damage
        else monster.statusAffects.get("LustStick").value2 = Math.round(damage / 10);
        //Deal damage
        monster.stats.lust += Math.round(monster.lustVuln * damage);
        //Sets up for end of combat, and if not, goes to AI.
    }
}

export class CorruptedFoxFire implements SpecialAction {
    public canUse(player: Player): boolean {
        return !player.statusAffects.has("Berzerking");
    }

    public reasonCannotUse(): string {
        return "You're already pretty goddamn mad!";
    }

    public use(player: Player, monster: Monster) {
        clearOutput();
        if (player.findPerk(PerkLib.BloodMage) < 0 && player.fatigue + spellCost(35) > 100) {
            outputText("You are too tired to use this ability.", true);
            doNext(magicalSpecials);
            return;
        }
        if (player.findStatusAffect(StatusAffects.ThroatPunch) >= 0 || player.findStatusAffect(StatusAffects.WebSilence) >= 0) {
            outputText("You cannot focus to use this ability while you're having so much difficult breathing.", true);
            doNext(magicalSpecials);
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(35, 1);
        //Deals direct damage and lust regardless of enemy defenses.  Especially effective against non-corrupted targets.
        outputText("Holding out your palm, you conjure corrupted purple flame that dances across your fingertips.  You launch it at " + monster.a + monster.short + " with a ferocious throw, and it bursts on impact, showering dazzling lavender sparks everywhere.");

        var dmg: int = int(10 + (player.inte / 3 + rand(player.inte / 2)) * spellMod());
        if (monster.cor >= 66) dmg = Math.round(dmg * .66);
        else if (monster.cor >= 50) dmg = Math.round(dmg * .8);
        //High damage to goes.
        if (monster.short == "goo-girl") temp = Math.round(temp * 1.5);
        //Using fire attacks on the goo]
        if (monster.short == "goo-girl") {
            outputText("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer.", false);
            if (monster.findPerk(PerkLib.Acid) < 0) monster.createPerk(PerkLib.Acid, 0, 0, 0, 0);
        }
        dmg = doDamage(dmg);
        outputText("  (" + dmg + ")\n\n", false);
        statScreenRefresh();
        if (monster.HP < 1) doNext(endHpVictory);
        else enemyAI();
    }
}

export class KitsuneTerror implements SpecialAction {
    public canUse(player: Player): boolean {
        return !player.statusAffects.has("Berzerking");
    }

    public reasonCannotUse(): string {
        return "You're already pretty goddamn mad!";
    }

    public use(player: Player, monster: Monster) {
        clearOutput();
        //Fatigue Cost: 25
        if (player.findPerk(PerkLib.BloodMage) < 0 && player.fatigue + spellCost(20) > 100) {
            outputText("You are too tired to use this ability.", true);
            doNext(magicalSpecials);
            return;
        }
        if (monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            outputText("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            enemyAI();
            return;
        }
        if (player.findStatusAffect(StatusAffects.ThroatPunch) >= 0 || player.findStatusAffect(StatusAffects.WebSilence) >= 0) {
            outputText("You cannot focus to reach the enemy's mind while you're having so much difficult breathing.", true);
            doNext(magicalSpecials);
            return;
        }
        if (monster.short == "pod" || monster.inte == 0) {
            outputText("You reach for the enemy's mind, but cannot find anything.  You frantically search around, but there is no consciousness as you know it in the room.\n\n", true);
            changeFatigue(1);
            enemyAI();
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(20, 1);
        //Inflicts fear and reduces enemy SPD.
        outputText("The world goes dark, an inky shadow blanketing everything in sight as you fill " + monster.a + monster.short + "'s mind with visions of otherworldly terror that defy description.");
        //(succeed)
        if (player.inte / 10 + rand(20) + 1 > monster.inte / 10 + 10) {
            outputText("  They cower in horror as they succumb to your illusion, believing themselves beset by eldritch horrors beyond their wildest nightmares.\n\n");
            monster.createStatusAffect(StatusAffects.Fear, 1, 0, 0, 0);
            monster.spe -= 5;
            if (monster.spe < 1) monster.spe = 1;
        }
        else outputText("  The dark fog recedes as quickly as it rolled in as they push back your illusions, resisting your hypnotic influence.\n\n");
        enemyAI();
    }
}

export class FoxFire implements SpecialAction {
    public canUse(player: Player): boolean {
        return !player.statusAffects.has("Berzerking");
    }

    public reasonCannotUse(): string {
        return "You're already pretty goddamn mad!";
    }

    public use(player: Player, monster: Monster) {
        clearOutput();
        if (player.findPerk(PerkLib.BloodMage) < 0 && player.fatigue + spellCost(35) > 100) {
            outputText("You are too tired to use this ability.", true);
            doNext(magicalSpecials);
            return;
        }
        if (player.findStatusAffect(StatusAffects.ThroatPunch) >= 0 || player.findStatusAffect(StatusAffects.WebSilence) >= 0) {
            outputText("You cannot focus to use this ability while you're having so much difficult breathing.", true);
            doNext(magicalSpecials);
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(35, 1);
        if (monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            outputText("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            enemyAI();
            return;
        }
        //Deals direct damage and lust regardless of enemy defenses.  Especially effective against corrupted targets.
        outputText("Holding out your palm, you conjure an ethereal blue flame that dances across your fingertips.  You launch it at " + monster.a + monster.short + " with a ferocious throw, and it bursts on impact, showering dazzling azure sparks everywhere.");
        var dmg: int = int(10 + (player.inte / 3 + rand(player.inte / 2)) * spellMod());
        if (monster.cor < 33) dmg = Math.round(dmg * .66);
        else if (monster.cor < 50) dmg = Math.round(dmg * .8);
        //High damage to goes.
        if (monster.short == "goo-girl") temp = Math.round(temp * 1.5);
        //Using fire attacks on the goo]
        if (monster.short == "goo-girl") {
            outputText("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer.", false);
            if (monster.findPerk(PerkLib.Acid) < 0) monster.createPerk(PerkLib.Acid, 0, 0, 0, 0);
        }
        dmg = doDamage(dmg);
        outputText("  (" + dmg + ")\n\n", false);
        statScreenRefresh();
        if (monster.HP < 1) doNext(endHpVictory);
        else enemyAI();
    }
}

export class KitsuneIllusion implements SpecialAction {
    public canUse(player: Player): boolean {
        return !player.statusAffects.has("Berzerking");
    }

    public reasonCannotUse(): string {
        return "You're already pretty goddamn mad!";
    }

    public use(player: Player, monster: Monster) {
        clearOutput();
        //Fatigue Cost: 25
        if (player.findPerk(PerkLib.BloodMage) < 0 && player.fatigue + spellCost(25) > 100) {
            outputText("You are too tired to use this ability.", true);
            doNext(magicalSpecials);
            return;
        }
        if (player.findStatusAffect(StatusAffects.ThroatPunch) >= 0 || player.findStatusAffect(StatusAffects.WebSilence) >= 0) {
            outputText("You cannot focus to use this ability while you're having so much difficult breathing.", true);
            doNext(magicalSpecials);
            return;
        }
        if (monster.short == "pod" || monster.inte == 0) {
            outputText("In the tight confines of this pod, there's no use making such an attack!\n\n", true);
            changeFatigue(1);
            enemyAI();
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(25, 1);
        if (monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            outputText("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            enemyAI();
            return;
        }
        //Decrease enemy speed and increase their susceptibility to lust attacks if already 110% or more
        outputText("The world begins to twist and distort around you as reality bends to your will, " + monster.a + monster.short + "'s mind blanketed in the thick fog of your illusions.");
        //Check for success rate. Maximum 100% with over 90 Intelligence difference between PC and monster.
        if (player.inte / 10 + rand(20) > monster.inte / 10 + 9) {
            //Reduce speed down to -20. Um, are there many monsters with 110% lust vulnerability?
            outputText("  They stumble humorously to and fro, unable to keep pace with the shifting illusions that cloud their perceptions.\n\n");
            if (monster.spe >= 0) monster.spe -= 20;
            if (monster.lustVuln >= 1.1) monster.lustVuln += .1;
        }
        else outputText("  Like the snapping of a rubber band, reality falls back into its rightful place as they resist your illusory conjurations.\n\n");
        enemyAI();
    }
}

export class ImmolationSpell implements SpecialAction {
    public canUse(player: Player): boolean {
        return !player.statusAffects.has("Berzerking");
    }

    public reasonCannotUse(): string {
        return "You're already pretty goddamn mad!";
    }

    public use(player: Player, monster: Monster) {
        clearOutput();
        outputText("You gather energy in your Talisman and unleash the spell contained within.  A wave of burning flames gathers around " + monster.a + monster.short + ", slowly burning " + monster.pronoun2 + ".");
        var temp: int = int(75 + (player.inte / 3 + rand(player.inte / 2)) * spellMod());
        temp = doDamage(temp);
        outputText(" (" + temp + ")\n\n");
        player.removeStatusAffect(StatusAffects.ImmolationSpell);
        arianScene.clearTalisman();
        enemyAI();
    }
}

export class ShieldingSpell implements SpecialAction {
    public canUse(player: Player): boolean {
        return !player.statusAffects.has("Berzerking");
    }

    public reasonCannotUse(): string {
        return "You're already pretty goddamn mad!";
    }

    public use(player: Player, monster: Monster) {
        clearOutput();
        outputText("You gather energy in your Talisman and unleash the spell contained within.  A barrier of light engulfs you, before turning completely transparent.  Your defense has been increased.\n\n");
        player.createStatusAffect(StatusAffects.Shielding, 0, 0, 0, 0);
        player.removeStatusAffect(StatusAffects.ShieldingSpell);
        arianScene.clearTalisman();
        enemyAI();
    }
}

