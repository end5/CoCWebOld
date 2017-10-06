import SpecialAction from './SpecialAction';
import { HairType } from '../Body/Head';
import { LowerBodyType, TailType } from '../Body/LowerBody';
import GenderDescriptor from '../Descriptors/GenderDescriptor';
import MainScreen from '../display/MainScreen';
import StatusAffect from '../Effects/StatusAffect';
import Flags, { FlagEnum } from '../Game/Flags';
import Monster from '../Monster';
import Player from '../Player';
import Utils from '../Utilities/Utils';

/*
"AnemoneSting"
	anemoneSting
"Bite"
	bite
"Bite"
	nagaBiteAttack
"Bite"
	spiderBiteAttack
"Bow"
	fireBow
"Constrict"
	desert.nagaScene.nagaPlayerConstrict
"Kick"
	kick
"Gore"
	goreAttack
"Infest"
	worms.playerInfest
"Kiss"
	kissAttack
"Sting"
	playerStinger
"Web"
	PCWebAttack
"Tail Whip"
	tailWhipAttack
*/
export class AnemoneSting implements SpecialAction {
    public canUse(player: Player): boolean {
        return true;
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Monster) {
        outputText("", true);
        //-sting with hair (combines both bee-sting effects, but weaker than either one separately):
        //Fail!
        //25% base fail chance
        //Increased by 1% for every point over PC's speed
        //Decreased by 1% for every inch of hair the PC has
        var prob: Number = 70;
        if (monster.spe > player.spe) prob -= monster.spe - player.spe;
        prob += player.hairLength;
        if (prob <= rand(101)) {
            //-miss a sting
            if (monster.plural) outputText("You rush " + monster.a + monster.short + ", whipping your hair around to catch them with your tentacles, but " + monster.pronoun1 + " easily dodge.  Oy, you hope you didn't just give yourself whiplash.", false);
            else outputText("You rush " + monster.a + monster.short + ", whipping your hair around to catch it with your tentacles, but " + monster.pronoun1 + " easily dodges.  Oy, you hope you didn't just give yourself whiplash.", false);
        }
        //Success!
        else {
            outputText("You rush " + monster.a + monster.short + ", whipping your hair around like a genie", false);
            outputText(", and manage to land a few swipes with your tentacles.  ", false);
            if (monster.plural) outputText("As the venom infiltrates " + monster.pronoun3 + " bodies, " + monster.pronoun1 + " twitch and begin to move more slowly, hampered half by paralysis and half by arousal.", false);
            else outputText("As the venom infiltrates " + monster.pronoun3 + " body, " + monster.pronoun1 + " twitches and begins to move more slowly, hampered half by paralysis and half by arousal.", false);
            //(decrease speed/str, increase lust)
            //-venom capacity determined by hair length, 2-3 stings per level of length
            //Each sting does 5-10 lust damage and 2.5-5 speed damage
            var damage: Number = 0;
            temp = 1 + rand(2);
            if (player.hairLength >= 12) temp += 1 + rand(2);
            if (player.hairLength >= 24) temp += 1 + rand(2);
            if (player.hairLength >= 36) temp += 1;
            while (temp > 0) {
                temp--;
                damage += 5 + rand(6);
            }
            damage += player.level * 1.5;
            monster.spe -= damage / 2;
            damage = monster.lustVuln * damage;
            monster.lust += damage;
            //Clean up down to 1 decimal point
            damage = Math.round(damage * 10) / 10;
            outputText(" (" + damage + ")", false);
        }
        //New lines and moving on!
        outputText("\n\n", false);
    }
}

export class Bite implements SpecialAction {
    public canUse(player: Player): boolean {
        return true;
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Monster) {
        if (player.fatigue + physicalCost(25) > 100) {
            outputText("You're too fatigued to use your shark-like jaws!", true);
            menu();
            addButton(0, "Next", combatMenu, false);
            return;
        }
        //Worms are special
        if (monster.short == "worms") {
            outputText("There is no way those are going anywhere near your mouth!\n\n", true);
            menu();
            addButton(0, "Next", combatMenu, false);
            return;
        }
        fatigue(25, 2);
        //Amily!
        if (monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            enemyAI();
            return;
        }
        outputText("You open your mouth wide, your shark teeth extending out. Snarling with hunger, you lunge at your opponent, set to bite right into them!  ", true);
        if (player.findStatusAffect(StatusAffects.Blind) >= 0) outputText("In hindsight, trying to bite someone while blind was probably a bad idea... ", false);
        var damage: Number = 0;
        //Determine if dodged!
        if ((player.findStatusAffect(StatusAffects.Blind) >= 0 && rand(3) != 0) || (monster.spe - player.spe > 0 && int(Math.random() * (((monster.spe - player.spe) / 4) + 80)) > 80)) {
            if (monster.spe - player.spe < 8) outputText(monster.capitalA + monster.short + " narrowly avoids your attack!", false);
            if (monster.spe - player.spe >= 8 && monster.spe - player.spe < 20) outputText(monster.capitalA + monster.short + " dodges your attack with superior quickness!", false);
            if (monster.spe - player.spe >= 20) outputText(monster.capitalA + monster.short + " deftly avoids your slow attack.", false);
            outputText("\n\n", false);
            enemyAI();
            return;
        }
        //Determine damage - str modified by enemy toughness!
        damage = int((player.str + 45) - rand(monster.tou) - monster.armorDef);

        //Deal damage and update based on perks
        if (damage > 0) {
            if (player.findPerk(PerkLib.HistoryFighter) >= 0) damage *= 1.1;
            damage = doDamage(damage);
        }

        if (damage <= 0) {
            damage = 0;
            outputText("Your bite is deflected or blocked by " + monster.a + monster.short + ".", false);
        }
        if (damage > 0 && damage < 10) {
            outputText("You bite doesn't do much damage to " + monster.a + monster.short + "! (" + damage + ")", false);
        }
        if (damage >= 10 && damage < 20) {
            outputText("You seriously wound " + monster.a + monster.short + " with your bite! (" + damage + ")", false);
        }
        if (damage >= 20 && damage < 30) {
            outputText("Your bite staggers " + monster.a + monster.short + " with its force. (" + damage + ")", false);
        }
        if (damage >= 30) {
            outputText("Your powerful bite <b>mutilates</b> " + monster.a + monster.short + "! (" + damage + ")", false);
        }
        outputText("\n\n", false);
    }
}

export class NagaBiteAttack implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.stats.fatigue + physicalCost(10) <= 100;
    }

    public reasonCannotUse(): string {
        return "You just don't have the energy to bite something right now...";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        fatigue(10, 2);
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            return;
        }
        if (monster instanceof LivingStatue) {
            MainScreen.text("Your fangs can't even penetrate the giant's flesh.");
            return;
        }
        //Works similar to bee stinger, must be regenerated over time. Shares the same poison-meter
        if (Utils.rand(player.stats.spe / 2 + 40) + 20 > monster.stats.spe / 1.5) {
            //(if monster = demons)
            if (monster.short == "demons") MainScreen.text("You look at the crowd for a moment, wondering which of their number you should bite. Your glance lands upon the leader of the group, easily spotted due to his snakeskin cloak. You quickly dart through the demon crowd as it closes in around you and lunge towards the broad form of the leader. You catch the demon off guard and sink your needle-like fangs deep into his flesh. You quickly release your venom and retreat before he, or the rest of the group manage to react.", false);
            //(Otherwise) 
            else MainScreen.text("You lunge at the foe headfirst, fangs bared. You manage to catch " + monster.a + monster.short + " off guard, your needle-like fangs penetrating deep into " + monster.pronoun3 + " body. You quickly release your venom, and retreat before " + monster.pronoun1 + " manages to react.", false);
            //The following is how the enemy reacts over time to poison. It is displayed after the description paragraph,instead of lust
            monster.stats.str -= 5 + Utils.rand(5);
            monster.stats.spe -= 5 + Utils.rand(5);
            if (monster.stats.str < 1) monster.stats.str = 1;
            if (monster.stats.spe < 1) monster.stats.spe = 1;
            if (monster.statusAffects.has("NagaVenom")) {
                monster.statusAffects.get("NagaVenom").value1 += 1;
            }
            else monster.statusAffects.add(new StatusAffect("NagaVenom", 1, 0, 0, 0));
        }
        else {
            MainScreen.text("You lunge headfirst, fangs bared. Your attempt fails horrendously, as " + monster.a + monster.short + " manages to counter your lunge, knocking your head away with enough force to make your ears ring.", false);
        }
        MainScreen.text("\n\n", false);
    }
}

export class SpiderBiteAttack implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.stats.fatigue + physicalCost(10) <= 100;
    }

    public reasonCannotUse(): string {
        return "You just don't have the energy to bite something right now...";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        fatigue(10, 2);
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            return;
        }
        if (monster instanceof LivingStatue) {
            MainScreen.text("Your fangs can't even penetrate the giant's flesh.");
            return;
        }
        //Works similar to bee stinger, must be regenerated over time. Shares the same poison-meter
        if (Utils.rand(player.stats.spe / 2 + 40) + 20 > monster.stats.spe / 1.5) {
            //(if monster = demons)
            if (monster.short == "demons") MainScreen.text("You look at the crowd for a moment, wondering which of their number you should bite. Your glance lands upon the leader of the group, easily spotted due to his snakeskin cloak. You quickly dart through the demon crowd as it closes in around you and lunge towards the broad form of the leader. You catch the demon off guard and sink your needle-like fangs deep into his flesh. You quickly release your venom and retreat before he, or the rest of the group manage to react.", false);
            //(Otherwise) 
            else {
                if (!monster.plural) MainScreen.text("You lunge at the foe headfirst, fangs bared. You manage to catch " + monster.a + monster.short + " off guard, your needle-like fangs penetrating deep into " + monster.pronoun3 + " body. You quickly release your venom, and retreat before " + monster.a + monster.pronoun1 + " manages to react.", false);
                else MainScreen.text("You lunge at the foes headfirst, fangs bared. You manage to catch one of " + monster.a + monster.short + " off guard, your needle-like fangs penetrating deep into " + monster.pronoun3 + " body. You quickly release your venom, and retreat before " + monster.a + monster.pronoun1 + " manage to react.", false);
            }
            //React
            if (monster.lustVuln == 0) MainScreen.text("  Your aphrodisiac toxin has no effect!", false);
            else {
                if (monster.plural) MainScreen.text("  The one you bit flushes hotly, though the entire group seems to become more aroused in sympathy to their now-lusty compatriot.", false);
                else MainScreen.text("  " + GenderDescriptor.mf(monster, "He", "She") + " flushes hotly and " + GenderDescriptor.mf(monster, "touches his suddenly-stiff member, moaning lewdly for a moment.", "touches a suddenly stiff nipple, moaning lewdly.  You can smell her arousal in the air."), false);
                monster.stats.lust += 25 * monster.lustVuln;
                if (Utils.rand(5) == 0) monster.stats.lust += 25 * monster.lustVuln;
            }
        }
        else {
            MainScreen.text("You lunge headfirst, fangs bared. Your attempt fails horrendously, as " + monster.a + monster.short + " manages to counter your lunge, pushing you back out of range.", false);
        }
        MainScreen.text("\n\n", false);
    }
}

export class FireBow implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.stats.fatigue + physicalCost(10) <= 100;
    }

    public reasonCannotUse(): string {
        return "You just don't have the energy to bite something right now...";
    }

    public use(player: Player, monster: Monster) {
        clearOutput();
        if (player.fatigue + physicalCost(25) > 100) {
            outputText("You're too fatigued to fire the bow!");
            menu();
            addButton(0, "Next", combatMenu, false);
            return;
        }
        if (monster.findStatusAffect(StatusAffects.BowDisabled) >= 0) {
            outputText("You can't use your bow right now!");
            menu();
            addButton(0, "Next", combatMenu, false);
            return;
        }
        fatigue(25, 2);
        //Keep logic sane if this attack brings victory
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        //Amily!
        if (monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            enemyAI();
            return;
        }
        //Prep messages vary by skill.
        if (player.statusAffectv1(StatusAffects.Kelt) < 30) {
            outputText("Fumbling a bit, you nock an arrow and fire!\n");
        }
        else if (player.statusAffectv1(StatusAffects.Kelt) < 50) {
            outputText("You pull an arrow and fire it at " + monster.a + monster.short + "!\n");
        }
        else if (player.statusAffectv1(StatusAffects.Kelt) < 80) {
            outputText("With one smooth motion you draw, nock, and fire your deadly arrow at your opponent!\n");
        }
        else if (player.statusAffectv1(StatusAffects.Kelt) <= 99) {
            outputText("In the blink of an eye you draw and fire your bow directly at " + monster.a + monster.short + ".\n");
        }
        else {
            outputText("You casually fire an arrow at " + monster.a + monster.short + " with supreme skill.\n");
            //Keep it from going over 100
            player.changeStatusValue(StatusAffects.Kelt, 1, 100);
        }
        if (monster.findStatusAffect(StatusAffects.Sandstorm) >= 0 && rand(10) > 1) {
            outputText("Your shot is blown off target by the tornado of sand and wind.  Damn!\n\n");
            enemyAI();
            return;
        }
        //[Bow Response]
        if (monster.short == "Isabella") {
            if (monster.findStatusAffect(StatusAffects.Blind) >= 0)
                outputText("Isabella hears the shot and turns her shield towards it, completely blocking it with her wall of steel.\n\n");
            else outputText("You arrow thunks into Isabella's shield, completely blocked by the wall of steel.\n\n");
            if (isabellaFollowerScene.isabellaAccent())
                outputText("\"<i>You remind me of ze horse-people.  They cannot deal vith mein shield either!</i>\" cheers Isabella.\n\n");
            else outputText("\"<i>You remind me of the horse-people.  They cannot deal with my shield either!</i>\" cheers Isabella.\n\n");
            enemyAI();
            return;
        }
        //worms are immune
        if (monster.short == "worms") {
            outputText("The arrow slips between the worms, sticking into the ground.\n\n");
            enemyAI();
            return;
        }
        //Vala miss chance!
        if (monster.short == "Vala" && rand(10) < 7) {
            outputText("Vala flaps her wings and twists her body. Between the sudden gust of wind and her shifting of position, the arrow goes wide.\n\n");
            enemyAI();
            return;
        }
        //Blind miss chance
        if (player.findStatusAffect(StatusAffects.Blind) >= 0) {
            outputText("The arrow hits something, but blind as you are, you don't have a chance in hell of hitting anything with a bow.\n\n");
            enemyAI();
            return;
        }
        //Miss chance 10% based on speed + 10% based on int + 20% based on skill
        if (monster.short != "pod" && player.spe / 10 + player.inte / 10 + player.statusAffectv1(StatusAffects.Kelt) / 5 + 60 < rand(101)) {
            outputText("The arrow goes wide, disappearing behind your foe.\n\n");
            enemyAI();
            return;
        }
        //Hit!  Damage calc! 20 +
        var damage: Number = 0;
        damage = int((20 + player.str / 3 + player.statusAffectv1(StatusAffects.Kelt) / 1.2) + player.spe / 3 - rand(monster.tou) - monster.armorDef);
        if (damage < 0) damage = 0;
        if (damage == 0) {
            if (monster.inte > 0)
                outputText(monster.capitalA + monster.short + " shrugs as the arrow bounces off them harmlessly.\n\n");
            else outputText("The arrow bounces harmlessly off " + monster.a + monster.short + ".\n\n");
            enemyAI();
            return;
        }
        if (monster.short == "pod")
            outputText("The arrow lodges deep into the pod's fleshy wall");
        else if (monster.plural)
            outputText(monster.capitalA + monster.short + " look down at the arrow that now protrudes from one of " + monster.pronoun3 + " bodies");
        else outputText(monster.capitalA + monster.short + " looks down at the arrow that now protrudes from " + monster.pronoun3 + " body");
        if (player.findPerk(PerkLib.HistoryFighter) >= 0) damage *= 1.1;
        damage = doDamage(damage);
        monster.lust -= 20;
        if (monster.lust < 0) monster.lust = 0;
        if (monster.HP <= 0) {
            if (monster.short == "pod")
                outputText(". (" + String(damage) + ")\n\n");
            else if (monster.plural)
                outputText(" and stagger, collapsing onto each other from the wounds you've inflicted on " + monster.pronoun2 + ".  (" + String(damage) + ")\n\n");
            else outputText(" and staggers, collapsing from the wounds you've inflicted on " + monster.pronoun2 + ".  (" + String(damage) + ")\n\n");
            doNext(endHpVictory);
            return;
        }
        else outputText(".  It's clearly very painful. (" + String(damage) + ")\n\n");
        enemyAI();
    }
}

export class Kick implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.stats.fatigue + physicalCost(15) <= 100;
    }

    public reasonCannotUse(): string {
        return "You're too fatigued to use a charge attack!";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        fatigue(15, 2);
        //Variant start messages!
        if (player.lowerBody.type == LowerBodyType.KANGAROO) {
            //(tail)
            if (player.lowerBody.tailType == TailType.KANGAROO) MainScreen.text("You balance on your flexible kangaroo-tail, pulling both legs up before slamming them forward simultaneously in a brutal kick.  ", false);
            //(no tail) 
            else MainScreen.text("You balance on one leg and cock your powerful, kangaroo-like leg before you slam it forward in a kick.  ", false);
        }
        //(bunbun kick) 
        else if (player.lowerBody.type == LowerBodyType.BUNNY) MainScreen.text("You leap straight into the air and lash out with both your furred feet simultaneously, slamming forward in a strong kick.  ", false);
        //(centaur kick)
        else if (player.lowerBody.type == LowerBodyType.CENTAUR) MainScreen.text("You lurch up onto your backlegs, lifting your forelegs from the ground a split-second before you lash them out in a vicious kick.  ", false);
        //(bipedal hoof-kick) 
        else if (player.lowerBody.type == LowerBodyType.HOOFED) MainScreen.text("You twist and lurch as you raise a leg and slam your hoof forward in a kick.  ", false);

        if (Flags.list[FlagEnum.PC_FETISH] >= 3) {
            MainScreen.text("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  Ceraph's piercings have made normal attack impossible!  Maybe you could try something else?\n\n", false);

            return;
        }
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);

            return;
        }
        //Blind
        if (player.statusAffects.has("Blind")) {
            MainScreen.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ", false);
        }
        //Worms are special
        if (monster.short == "worms") {
            //50% chance of hit (int boost)
            if (Utils.rand(100) + player.stats.int / 3 >= 50) {
                let temp = Math.floor(player.stats.str / 5 - Utils.rand(5));
                if (temp == 0) temp = 1;
                MainScreen.text("You strike at the amalgamation, crushing countless worms into goo, dealing " + temp + " damage.\n\n", false);
                monster.stats.HP -= temp;
            }
            //Fail
            else {
                MainScreen.text("You attempt to crush the worms with your reprisal, only to have the collective move its individual members, creating a void at the point of impact, leaving you to attack only empty air.\n\n", false);
            }

            return;
        }
        let damage: number;
        //Determine if dodged!
        if ((player.statusAffects.has("Blind") && Utils.rand(2) == 0) || (monster.stats.spe - player.stats.spe > 0 && Math.floor(Math.random() * (((monster.stats.spe - player.stats.spe) / 4) + 80)) > 80)) {
            //Akbal dodges special education
            if (monster.short == "Akbal") MainScreen.text("Akbal moves like lightning, weaving in and out of your furious attack with the speed and grace befitting his jaguar body.\n", false);
            else {
                MainScreen.text(monster.capitalA + monster.short + " manage", false);
                if (!monster.plural) MainScreen.text("s", false);
                MainScreen.text(" to dodge your kick!", false);
                MainScreen.text("\n\n", false);
            }

            return;
        }
        //Determine damage
        //Base:
        damage = player.stats.str;
        //Leg bonus
        //Bunny - 20, Kangaroo - 35, 1 hoof = 30, 2 hooves = 40
        if (player.lowerBody.type == LowerBodyType.CENTAUR) damage += 40;
        else if (player.lowerBody.type == LowerBodyType.HOOFED) damage += 30;
        else if (player.lowerBody.type == LowerBodyType.BUNNY) damage += 20;
        else if (player.lowerBody.type == LowerBodyType.KANGAROO) damage += 35;
        //Start figuring enemy damage resistance
        let reduction: number = Utils.rand(monster.stats.tou);
        //Add in enemy armor if needed
        reduction += monster.inventory.armor.defense;
        //Apply AND DONE!
        damage -= reduction;
        //Damage post processing!
        if (player.perks.has("HistoryFighter")) damage *= 1.1;
        //(None yet!)
        if (damage > 0) damage = doDamage(damage);

        //BLOCKED
        if (damage <= 0) {
            damage = 0;
            MainScreen.text(monster.capitalA + monster.short, false);
            if (monster.plural) MainScreen.text("'", false);
            else MainScreen.text("s", false);
            MainScreen.text(" defenses are too tough for your kick to penetrate!", false);
        }
        //LAND A HIT!
        else {
            MainScreen.text(monster.capitalA + monster.short, false);
            if (!monster.plural) MainScreen.text(" reels from the damaging impact! (" + damage + ")", false);
            else MainScreen.text(" reel from the damaging impact! (" + damage + ")", false);
        }
        if (damage > 0) {
            //Lust raised by anemone contact!
            if (monster.short == "anemone") {
                MainScreen.text("\nThough you managed to hit the anemone, several of the tentacles surrounding her body sent home jolts of venom when your swing brushed past them.", false);
                //(gain lust, temp lose str/spd)
                (monster as Anemone).applyVenom((1 + Utils.rand(2)));
            }
        }
        MainScreen.text("\n\n", false);
    }
}

export class Gore implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.stats.fatigue + physicalCost(15) <= 100;
    }

    public reasonCannotUse(): string {
        return "You're too fatigued to use a charge attack!";
    }

    public use(player: Player, monster: Monster) {
        clearOutput();
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        if (monster.short == "worms") {
            outputText("Taking advantage of your new natural weapons, you quickly charge at the freak of nature. Sensing impending danger, the creature willingly drops its cohesion, causing the mass of worms to fall to the ground with a sick, wet 'thud', leaving your horns to stab only at air.\n\n");
            enemyAI();
            return;
        }
        if (player.fatigue + physicalCost(15) > 100) {
            outputText("You're too fatigued to use a charge attack!");
            menu();
            addButton(0, "Next", combatMenu, false);
            return;
        }
        fatigue(15, 2);
        var damage: Number = 0;
        //Amily!
        if (monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            enemyAI();
            return;
        }
        //Bigger horns = better success chance.
        //Small horns - 60% hit
        if (player.horns >= 6 && player.horns < 12) {
            temp = 60;
        }
        //bigger horns - 75% hit
        if (player.horns >= 12 && player.horns < 20) {
            temp = 75;
        }
        //huge horns - 90% hit
        if (player.horns >= 20) {
            temp = 80;
        }
        //Vala dodgy bitch!
        if (monster.short == "Vala") {
            temp = 20;
        }
        //Account for monster speed - up to -50%.
        temp -= monster.spe / 2;
        //Account for player speed - up to +50%
        temp += player.spe / 2;
        //Hit & calculation
        if (temp >= rand(100)) {
            var horns: Number = player.horns;
            if (player.horns > 40) player.horns = 40;
            //normal
            if (rand(4) > 0) {
                outputText("You lower your head and charge, skewering " + monster.a + monster.short + " on one of your bullhorns!  ");
                //As normal attack + horn length bonus
                damage = int(player.str + horns * 2 - rand(monster.tou) - monster.armorDef);
            }
            //CRIT
            else {
                //doubles horn bonus damage
                damage = int(player.str + horns * 4 - rand(monster.tou) - monster.armorDef);
                outputText("You lower your head and charge, slamming into " + monster.a + monster.short + " and burying both your horns into " + monster.pronoun2 + "!  ");
            }
            //Bonus damage for rut!
            if (player.inRut && monster.cockTotal() > 0) {
                outputText("The fury of your rut lent you strength, increasing the damage!  ");
                damage += 5;
            }
            //Bonus per level damage
            damage += player.level * 2;
            //Reduced by armor
            damage -= monster.armorDef;
            if (damage < 0) damage = 5;
            //CAP 'DAT SHIT
            if (damage > player.level * 10 + 100) damage = player.level * 10 + 100;
            if (damage > 0) {
                if (player.findPerk(PerkLib.HistoryFighter) >= 0) damage *= 1.1;
                damage = doDamage(damage);
            }
            //Different horn damage messages
            if (damage < 20) outputText("You pull yourself free, dealing " + damage + " damage.");
            if (damage >= 20 && damage < 40) outputText("You struggle to pull your horns free, dealing " + damage + " damage.");
            if (damage >= 40) outputText("With great difficulty you rip your horns free, dealing " + damage + " damage.");
        }
        //Miss
        else {
            //Special vala changes
            if (monster.short == "Vala") {
                outputText("You lower your head and charge Vala, but she just flutters up higher, grabs hold of your horns as you close the distance, and smears her juicy, fragrant cunt against your nose.  The sensual smell and her excited moans stun you for a second, allowing her to continue to use you as a masturbation aid, but she quickly tires of such foreplay and flutters back with a wink.\n\n");
                dynStats("lus", 5);
            }
            else outputText("You lower your head and charge " + monster.a + monster.short + ", only to be sidestepped at the last moment!");
        }
        //New line before monster attack
        outputText("\n\n");
        //Victory ORRRRR enemy turn.
        if (monster.HP > 0 && monster.lust < 100) enemyAI();
        else {
            if (monster.HP <= 0) doNext(endHpVictory);
            if (monster.lust >= 100) doNext(endLustVictory);
        }
    }
}

export class Kiss implements SpecialAction {
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

export class Sting implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.stats.fatigue + physicalCost(15) <= 100;
    }

    public reasonCannotUse(): string {
        return "You're too fatigued to use a charge attack!";
    }

    public use(player: Player, monster: Monster) {
        clearOutput();
        //Keep logic sane if this attack brings victory
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        if (player.tailVenom < 33) {
            outputText("You do not have enough venom to sting right now!");
            doNext(physicalSpecials);
            return;
        }
        //Worms are immune!
        if (monster.short == "worms") {
            outputText("Taking advantage of your new natural weapons, you quickly thrust your stinger at the freak of nature. Sensing impending danger, the creature willingly drops its cohesion, causing the mass of worms to fall to the ground with a sick, wet 'thud', leaving you to stab only at air.\n\n");
            enemyAI();
            return;
        }
        //Determine if dodged!
        //Amily!
        if (monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            enemyAI();
            return;
        }
        if (monster.spe - player.spe > 0 && int(Math.random() * (((monster.spe - player.spe) / 4) + 80)) > 80) {
            if (monster.spe - player.spe < 8) outputText(monster.capitalA + monster.short + " narrowly avoids your stinger!\n\n");
            if (monster.spe - player.spe >= 8 && monster.spe - player.spe < 20) outputText(monster.capitalA + monster.short + " dodges your stinger with superior quickness!\n\n");
            if (monster.spe - player.spe >= 20) outputText(monster.capitalA + monster.short + " deftly avoids your slow attempts to sting " + monster.pronoun2 + ".\n\n");
            enemyAI();
            return;
        }
        //determine if avoided with armor.
        if (monster.armorDef - player.level >= 10 && rand(4) > 0) {
            outputText("Despite your best efforts, your sting attack can't penetrate " + monster.a + monster.short + "'s defenses.\n\n");
            enemyAI();
            return;
        }
        //Sting successful!
        outputText("Searing pain lances through " + monster.a + monster.short + " as you manage to sting " + monster.pronoun2 + "!  ");
        if (monster.plural) outputText("You watch as " + monster.pronoun1 + " stagger back a step and nearly trip, flushing hotly.");
        else outputText("You watch as " + monster.pronoun1 + " staggers back a step and nearly trips, flushing hotly.");
        //Tabulate damage!
        var damage: Number = 35 + rand(player.lib / 10);
        //Level adds more damage up to a point (level 20)
        if (player.level < 10) damage += player.level * 3;
        else if (player.level < 20) damage += 30 + (player.level - 10) * 2;
        else damage += 50;
        monster.lust += monster.lustVuln * damage;
        if (monster.findStatusAffect(StatusAffects.lustvenom) < 0) monster.createStatusAffect(StatusAffects.lustvenom, 0, 0, 0, 0);
        /* IT used to paralyze 50% of the time, this is no longer the case!
        Paralise the other 50%!
        else {
            outputText("Searing pain lances through " + monster.a + monster.short + " as you manage to sting " + monster.pronoun2 + "!  ", false);
            if(monster.short == "demons") outputText("You watch as " + monster.pronoun1 + " stagger back a step and nearly trip, finding it hard to move as " + monster.pronoun1 + " are afflicted with your paralytic venom.  ", false);
            else outputText("You watch as " + monster.pronoun1 + " staggers back a step and nearly trips, finding it hard to move as " + monster.pronoun1 + " is afflicted with your paralytic venom.  ", false);
            if(monster.short == "demons") outputText("It appears that " + monster.a + monster.short + " are weaker and slower.", false);
            else outputText("It appears that " + monster.a + monster.short + " is weaker and slower.", false);
            monster.str -= (5+rand(player.lib/5))
            monster.spe -= (5+rand(player.lib/5))
            if(monster.str < 1) monster.str = 1;
            if(monster.spe < 1) monster.spe = 1;
        }*/
        //New line before monster attack
        outputText("\n\n");
        //Use tail mp
        player.tailVenom -= 25;
        //Kick back to main if no damage occured!
        if (monster.HP > 0 && monster.lust < 100) enemyAI();
        else doNext(endLustVictory);
    }
}

export class Web implements SpecialAction {
    public canUse(player: Player): boolean {
        return player.lowerBody.tailVenom >= 33;
    }

    public reasonCannotUse(): string {
        return "You do not have enough webbing to shoot right now!";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        player.lowerBody.tailVenom -= 33;
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);

            return;
        }
        //Blind
        if (player.statusAffects.has("Blind")) {
            MainScreen.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ", false);
        }
        else MainScreen.text("Turning and clenching muscles that no human should have, you expel a spray of sticky webs at " + monster.a + monster.short + "!  ", false);
        //Determine if dodged!
        if ((player.statusAffects.has("Blind") && Utils.rand(2) == 0) || (monster.stats.spe - player.stats.spe > 0 && Math.floor(Math.random() * (((monster.stats.spe - player.stats.spe) / 4) + 80)) > 80)) {
            MainScreen.text("You miss " + monster.a + monster.short + " completely - ", false);
            if (monster.plural) MainScreen.text("they", false);
            else MainScreen.text(GenderDescriptor.mf(monster, "he", "she") + " moved out of the way!\n\n", false);

            return;
        }
        //Over-webbed
        if (monster.stats.spe < 1) {
            if (!monster.plural) MainScreen.text(monster.capitalA + monster.short + " is completely covered in webbing, but you hose " + GenderDescriptor.mf(monster, "him", "her") + " down again anyway.", false);
            else MainScreen.text(monster.capitalA + monster.short + " are completely covered in webbing, but you hose them down again anyway.", false);
        }
        //LAND A HIT!
        else {
            if (!monster.plural) MainScreen.text("The adhesive strands cover " + monster.a + monster.short + " with restrictive webbing, greatly slowing " + GenderDescriptor.mf(monster, "him", "her") + ".", false);
            else MainScreen.text("The adhesive strands cover " + monster.a + monster.short + " with restrictive webbing, greatly slowing " + GenderDescriptor.mf(monster, "him", "her") + ".", false);
            monster.stats.spe -= 45;
            if (monster.stats.spe < 0) monster.stats.spe = 0;
        }
        MainScreen.text("\n\n", false);
    }
}

export class TailWhip implements SpecialAction {
    public canUse(player: Player): boolean {
        return !player.statusAffects.has("Berzerking");
    }

    public reasonCannotUse(): string {
        return "You're already pretty goddamn mad!";
    }

    public use(player: Player, monster: Monster) {
        clearOutput();
        //miss
        if ((player.findStatusAffect(StatusAffects.Blind) >= 0 && rand(2) == 0) || (monster.spe - player.spe > 0 && int(Math.random() * (((monster.spe - player.spe) / 4) + 80)) > 80)) {
            outputText("Twirling like a top, you swing your tail, but connect with only empty air.");
        }
        else {
            if (!monster.plural) outputText("Twirling like a top, you bat your opponent with your tail.  For a moment, " + monster.pronoun1 + " looks disbelieving, as if " + monster.pronoun3 + " world turned upside down, but " + monster.pronoun1 + " soon becomes irate and redoubles " + monster.pronoun3 + " offense, leaving large holes in " + monster.pronoun3 + " guard.  If you're going to take advantage, it had better be right away; " + monster.pronoun1 + "'ll probably cool off very quickly.");
            else outputText("Twirling like a top, you bat your opponent with your tail.  For a moment, " + monster.pronoun1 + " look disbelieving, as if " + monster.pronoun3 + " world turned upside down, but " + monster.pronoun1 + " soon become irate and redouble " + monster.pronoun3 + " offense, leaving large holes in " + monster.pronoun3 + " guard.  If you're going to take advantage, it had better be right away; " + monster.pronoun1 + "'ll probably cool off very quickly.");
            if (monster.findStatusAffect(StatusAffects.CoonWhip) < 0) monster.createStatusAffect(StatusAffects.CoonWhip, 0, 0, 0, 0);
            temp = Math.round(monster.armorDef * .75);
            while (temp > 0 && monster.armorDef >= 1) {
                monster.armorDef--;
                monster.addStatusValue(StatusAffects.CoonWhip, 1, 1);
                temp--;
            }
            monster.addStatusValue(StatusAffects.CoonWhip, 2, 2);
            if (player.tailType == TAIL_TYPE_RACCOON) monster.addStatusValue(StatusAffects.CoonWhip, 2, 2);
        }
        outputText("\n\n");
        enemyAI();
    }
}

