import { PhysicalAction } from './PhysicalAction';
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
        MainScreen.text("", true);
        //-sting with hair (combines both bee-sting effects, but weaker than either one separately):
        //Fail!
        //25% base fail chance
        //Increased by 1% for every point over PC's speed
        //Decreased by 1% for every inch of hair the PC has
        const hairLength: number = player.upperBody.head.hairLength;
        let prob: number = 70;
        if (monster.stats.spe > player.stats.spe)
            prob -= monster.stats.spe - player.stats.spe;
        prob += hairLength;
        if (prob <= Utils.rand(101)) {
            //-miss a sting
            // No plural monster
            //if (monster.plural) MainScreen.text("You rush " + monster.a + monster.short + ", whipping your hair around to catch them with your tentacles, but " + monster.pronoun1 + " easily dodge.  Oy, you hope you didn't just give yourself whiplash.", false);
            //else
            MainScreen.text("You rush " + monster.a + monster.short + ", whipping your hair around to catch it with your tentacles, but " + monster.pronoun1 + " easily dodges.  Oy, you hope you didn't just give yourself whiplash.", false);
        }
        //Success!
        else {
            MainScreen.text("You rush " + monster.a + monster.short + ", whipping your hair around like a genie", false);
            MainScreen.text(", and manage to land a few swipes with your tentacles.  ", false);
            // No plural monster
            //if (monster.plural) MainScreen.text("As the venom infiltrates " + monster.pronoun3 + " bodies, " + monster.pronoun1 + " twitch and begin to move more slowly, hampered half by paralysis and half by arousal.", false);
            //else
            MainScreen.text("As the venom infiltrates " + monster.pronoun3 + " body, " + monster.pronoun1 + " twitches and begins to move more slowly, hampered half by paralysis and half by arousal.", false);
            //(decrease speed/str, increase lust)
            //-venom capacity determined by hair length, 2-3 stings per level of length
            //Each sting does 5-10 lust damage and 2.5-5 speed damage
            let damage: number = 0;
            let damageMultiplier: number = 1 + Utils.rand(2);
            if (hairLength >= 12) damageMultiplier += 1 + Utils.rand(2);
            if (hairLength >= 24) damageMultiplier += 1 + Utils.rand(2);
            if (hairLength >= 36) damageMultiplier += 1;
            while (damageMultiplier > 0) {
                damageMultiplier--;
                damage += 5 + Utils.rand(6);
            }
            damage += player.stats.level * 1.5;
            monster.stats.spe -= damage / 2;
            damage = monster.lustVuln * damage;
            monster.stats.lust += damage;
            //Clean up down to 1 decimal point
            damage = Math.round(damage * 10) / 10;
            MainScreen.text(" (" + damage + ")", false);
        }
        //New lines and moving on!
        MainScreen.text("\n\n", false);
    }
}

export class Bite extends PhysicalAction {
    public baseCost: number = 25;
    private reason: string;
    public canUse(player: Player, monster: Monster): boolean {
        if (player.stats.fatigue + this.physicalCost(player) > 100) {
            this.reason = "You're too fatigued to use your shark-like jaws!";
            return false;
        }
        //Worms are special
        if (monster.short == "worms") {
            this.reason = "There is no way those are going anywhere near your mouth!\n\n";
            return false;
        }
        return true;
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Monster) {
        player.stats.fatiguePhysical(this.baseCost);
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            return;
        }
        MainScreen.text("You open your mouth wide, your shark teeth extending out. Snarling with hunger, you lunge at your opponent, set to bite right into them!  ", true);
        if (player.statusAffects.has("Blind"))
            MainScreen.text("In hindsight, trying to bite someone while blind was probably a bad idea... ", false);
        //Determine if dodged!
        if ((player.statusAffects.has("Blind") && Utils.rand(3) != 0) ||
            (monster.stats.spe - player.stats.spe > 0 && Math.floor(Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80)) > 80)) {
            if (monster.stats.spe - player.stats.spe < 8)
                MainScreen.text(monster.capitalA + monster.short + " narrowly avoids your attack!", false);
            if (monster.stats.spe - player.stats.spe >= 8 && monster.stats.spe - player.stats.spe < 20)
                MainScreen.text(monster.capitalA + monster.short + " dodges your attack with superior quickness!", false);
            if (monster.stats.spe - player.stats.spe >= 20)
                MainScreen.text(monster.capitalA + monster.short + " deftly avoids your slow attack.", false);
            MainScreen.text("\n\n", false);
            return;
        }
        //Determine damage - str modified by enemy toughness!
        let damage: number = Math.floor((player.stats.str + 45) - Utils.rand(monster.stats.tou) - monster.armorDefense());

        //Deal damage and update based on perks
        if (damage > 0) {
            if (player.perks.has("HistoryFighter"))
                damage *= 1.1;
            damage = doDamage(damage);
        }

        if (damage <= 0) {
            damage = 0;
            MainScreen.text("Your bite is deflected or blocked by " + monster.a + monster.short + ".", false);
        }
        if (damage > 0 && damage < 10) {
            MainScreen.text("You bite doesn't do much damage to " + monster.a + monster.short + "! (" + damage + ")", false);
        }
        if (damage >= 10 && damage < 20) {
            MainScreen.text("You seriously wound " + monster.a + monster.short + " with your bite! (" + damage + ")", false);
        }
        if (damage >= 20 && damage < 30) {
            MainScreen.text("Your bite staggers " + monster.a + monster.short + " with its force. (" + damage + ")", false);
        }
        if (damage >= 30) {
            MainScreen.text("Your powerful bite <b>mutilates</b> " + monster.a + monster.short + "! (" + damage + ")", false);
        }
        MainScreen.text("\n\n", false);
    }
}

export class NagaBiteAttack extends PhysicalAction {
    public readonly baseCost: number = 10;
    public canUse(player: Player): boolean {
        return player.stats.fatigue + this.physicalCost(player) <= 100;
    }

    public reasonCannotUse(): string {
        return "You just don't have the energy to bite something right now...";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        player.stats.fatiguePhysical(this.baseCost);
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

export class SpiderBiteAttack extends PhysicalAction {
    public readonly baseCost: number = 10;
    public canUse(player: Player): boolean {
        return player.stats.fatigue + this.physicalCost(player) <= 100;
    }

    public reasonCannotUse(): string {
        return "You just don't have the energy to bite something right now...";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        player.stats.fatiguePhysical(this.baseCost);
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
                // No monster plural
                //if (!monster.plural)
                MainScreen.text("You lunge at the foe headfirst, fangs bared. You manage to catch " + monster.a + monster.short + " off guard, your needle-like fangs penetrating deep into " + monster.pronoun3 + " body. You quickly release your venom, and retreat before " + monster.a + monster.pronoun1 + " manages to react.", false);
                //else MainScreen.text("You lunge at the foes headfirst, fangs bared. You manage to catch one of " + monster.a + monster.short + " off guard, your needle-like fangs penetrating deep into " + monster.pronoun3 + " body. You quickly release your venom, and retreat before " + monster.a + monster.pronoun1 + " manage to react.", false);
            }
            //React
            if (monster.lustVuln == 0) MainScreen.text("  Your aphrodisiac toxin has no effect!", false);
            else {
                // No monster plural
                //if (monster.plural) MainScreen.text("  The one you bit flushes hotly, though the entire group seems to become more aroused in sympathy to their now-lusty compatriot.", false);
                //else
                MainScreen.text("  " + GenderDescriptor.mf(monster, "He", "She") + " flushes hotly and " + GenderDescriptor.mf(monster, "touches his suddenly-stiff member, moaning lewdly for a moment.", "touches a suddenly stiff nipple, moaning lewdly.  You can smell her arousal in the air."), false);
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

export class FireBow extends PhysicalAction {
    public readonly baseCost: number = 25;
    private reason: string;
    public canUse(player: Player, monster: Monster): boolean {
        if (player.stats.fatigue + this.physicalCost(player) > 100) {
            this.reason = "You're too fatigued to fire the bow!";
            return false;
        }
        // ??????????????????????????????????????????????????????????????
        // ??????????????????????????????????????????????????????????????
        // ??????????????????????????????????????????????????????????????
        // ??????????????????????????????????????????????????????????????
        // wat VVVVVVVVVVVVVVVV
        if (monster.statusAffects.has("BowDisabled")) {
            this.reason = "You can't use your bow right now!";
            return false;
        }
        return true;
    }

    public reasonCannotUse(): string {
        return this.reason;
    }

    public use(player: Player, monster: Monster) {
        MainScreen.clearText();
        player.stats.fatiguePhysical(this.baseCost);
        //Keep logic sane if this attack brings victory
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        //Prep messages vary by skill.
        if (player.statusAffects.get("Kelt").value1 < 30) {
            MainScreen.text("Fumbling a bit, you nock an arrow and fire!\n");
        }
        else if (player.statusAffects.get("Kelt").value1 < 50) {
            MainScreen.text("You pull an arrow and fire it at " + monster.a + monster.short + "!\n");
        }
        else if (player.statusAffects.get("Kelt").value1 < 80) {
            MainScreen.text("With one smooth motion you draw, nock, and fire your deadly arrow at your opponent!\n");
        }
        else if (player.statusAffects.get("Kelt").value1 <= 99) {
            MainScreen.text("In the blink of an eye you draw and fire your bow directly at " + monster.a + monster.short + ".\n");
        }
        else {
            MainScreen.text("You casually fire an arrow at " + monster.a + monster.short + " with supreme skill.\n");
            //Keep it from going over 100
            player.statusAffects.get("Kelt").value1 = 100;
        }
        if (monster.statusAffects.has("Sandstorm") && Utils.rand(10) > 1) {
            MainScreen.text("Your shot is blown off target by the tornado of sand and wind.  Damn!\n\n");
            return;
        }
        //[Bow Response]
        if (monster.short == "Isabella") {
            if (monster.statusAffects.has("Blind"))
                MainScreen.text("Isabella hears the shot and turns her shield towards it, completely blocking it with her wall of steel.\n\n");
            else MainScreen.text("You arrow thunks into Isabella's shield, completely blocked by the wall of steel.\n\n");
            if (isabellaFollowerScene.isabellaAccent())
                MainScreen.text("\"<i>You remind me of ze horse-people.  They cannot deal vith mein shield either!</i>\" cheers Isabella.\n\n");
            else MainScreen.text("\"<i>You remind me of the horse-people.  They cannot deal with my shield either!</i>\" cheers Isabella.\n\n");
            return;
        }
        //worms are immune
        if (monster.short == "worms") {
            MainScreen.text("The arrow slips between the worms, sticking into the ground.\n\n");
            return;
        }
        //Vala miss chance!
        if (monster.short == "Vala" && Utils.rand(10) < 7) {
            MainScreen.text("Vala flaps her wings and twists her body. Between the sudden gust of wind and her shifting of position, the arrow goes wide.\n\n");
            return;
        }
        //Blind miss chance
        if (player.statusAffects.has("Blind")) {
            MainScreen.text("The arrow hits something, but blind as you are, you don't have a chance in hell of hitting anything with a bow.\n\n");
            return;
        }
        //Miss chance 10% based on speed + 10% based on int + 20% based on skill
        if (monster.short != "pod" && player.stats.spe / 10 + player.stats.int / 10 + player.statusAffects.get("Kelt").value1 / 5 + 60 < Utils.rand(101)) {
            MainScreen.text("The arrow goes wide, disappearing behind your foe.\n\n");
            return;
        }
        //Hit!  Damage calc! 20 +
        let damage: number = Math.floor((20 + player.stats.str / 3 + player.statusAffects.get("Kelt").value1 / 1.2) + player.stats.spe / 3 - Utils.rand(monster.stats.tou) - monster.armorDefense());
        if (damage < 0) damage = 0;
        if (damage == 0) {
            if (monster.stats.int > 0)
                MainScreen.text(monster.capitalA + monster.short + " shrugs as the arrow bounces off them harmlessly.\n\n");
            else
                MainScreen.text("The arrow bounces harmlessly off " + monster.a + monster.short + ".\n\n");
            return;
        }
        if (monster.short == "pod")
            MainScreen.text("The arrow lodges deep into the pod's fleshy wall");
        // No monster plural
        //else if (monster.plural)
        //    MainScreen.text(monster.capitalA + monster.short + " look down at the arrow that now protrudes from one of " + monster.pronoun3 + " bodies");
        else MainScreen.text(monster.capitalA + monster.short + " looks down at the arrow that now protrudes from " + monster.pronoun3 + " body");
        if (player.perks.has("HistoryFighter")) damage *= 1.1;
        damage = doDamage(damage);
        monster.stats.lust -= 20;
        if (monster.stats.lust < 0) monster.stats.lust = 0;
        if (monster.stats.HP <= 0) {
            if (monster.short == "pod")
                MainScreen.text(". (" + String(damage) + ")\n\n");
            // No monster plural
            //else if (monster.plural)
            //    MainScreen.text(" and stagger, collapsing onto each other from the wounds you've inflicted on " + monster.pronoun2 + ".  (" + String(damage) + ")\n\n");
            else MainScreen.text(" and staggers, collapsing from the wounds you've inflicted on " + monster.pronoun2 + ".  (" + String(damage) + ")\n\n");
            return;
        }
        else MainScreen.text(".  It's clearly very painful. (" + String(damage) + ")\n\n");
    }
}

export class Kick extends PhysicalAction {
    public readonly baseCost: number = 15;
    public canUse(player: Player): boolean {
        return player.stats.fatigue + this.physicalCost(player) <= 100;
    }

    public reasonCannotUse(): string {
        return "You're too fatigued to use a charge attack!";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.text("", true);
        player.stats.fatiguePhysical(this.baseCost);
        //Variant start messages!
        if (player.lowerBody.type == LowerBodyType.KANGAROO) {
            //(tail)
            if (player.lowerBody.tailType == TailType.KANGAROO)
                MainScreen.text("You balance on your flexible kangaroo-tail, pulling both legs up before slamming them forward simultaneously in a brutal kick.  ", false);
            //(no tail) 
            else
                MainScreen.text("You balance on one leg and cock your powerful, kangaroo-like leg before you slam it forward in a kick.  ", false);
        }
        //(bunbun kick) 
        else if (player.lowerBody.type == LowerBodyType.BUNNY)
            MainScreen.text("You leap straight into the air and lash out with both your furred feet simultaneously, slamming forward in a strong kick.  ", false);
        //(centaur kick)
        else if (player.lowerBody.type == LowerBodyType.CENTAUR)
            MainScreen.text("You lurch up onto your backlegs, lifting your forelegs from the ground a split-second before you lash them out in a vicious kick.  ", false);
        //(bipedal hoof-kick) 
        else if (player.lowerBody.type == LowerBodyType.HOOFED)
            MainScreen.text("You twist and lurch as you raise a leg and slam your hoof forward in a kick.  ", false);

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
                if (temp == 0)
                    temp = 1;
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
        if ((player.statusAffects.has("Blind") && Utils.rand(2) == 0) ||
            (monster.stats.spe - player.stats.spe > 0 && Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80)) {
            //Akbal dodges special education
            if (monster.short == "Akbal") MainScreen.text("Akbal moves like lightning, weaving in and out of your furious attack with the speed and grace befitting his jaguar body.\n", false);
            else {
                MainScreen.text(monster.capitalA + monster.short + " manage", false);
                // No monster plural
                //if (!monster.plural)
                MainScreen.text("s", false);
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
            // No monster plural
            //if (monster.plural) MainScreen.text("'", false);
            //else
            MainScreen.text("s", false);
            MainScreen.text(" defenses are too tough for your kick to penetrate!", false);
        }
        //LAND A HIT!
        else {
            MainScreen.text(monster.capitalA + monster.short, false);
            // No monster plural
            //if (!monster.plural)
            MainScreen.text(" reels from the damaging impact! (" + damage + ")", false);
            //else MainScreen.text(" reel from the damaging impact! (" + damage + ")", false);
        }
        if (damage > 0) {
            //Lust raised by anemone contact!
            if (monster.short == "anemone") {
                MainScreen.text("\nThough you managed to hit the anemone, several of the tentacles surrounding her body sent home jolts of venom when your swing brushed past them.", false);
                //(gain lust, temp lose str/spd)
                <Anemone>monster.applyVenom((1 + Utils.rand(2)));
            }
        }
        MainScreen.text("\n\n", false);
    }
}

export class Gore extends PhysicalAction {
    public readonly baseCost: number = 15;
    public canUse(player: Player): boolean {
        return player.stats.fatigue + this.physicalCost(player) <= 100;
    }

    public reasonCannotUse(): string {
        return "You're too fatigued to use a charge attack!";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.clearText();
        if (monster.short == "worms") {
            MainScreen.text("Taking advantage of your new natural weapons, you quickly charge at the freak of nature. Sensing impending danger, the creature willingly drops its cohesion, causing the mass of worms to fall to the ground with a sick, wet 'thud', leaving your horns to stab only at air.\n\n");
            return;
        }
        player.stats.fatiguePhysical(this.baseCost);
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        //Bigger horns = better success chance.
        //Small horns - 60% hit
        let hitChance: number = 0;
        if (player.upperBody.head.horns >= 6 && player.upperBody.head.horns < 12) {
            hitChance = 60;
        }
        //bigger horns - 75% hit
        if (player.upperBody.head.horns >= 12 && player.upperBody.head.horns < 20) {
            hitChance = 75;
        }
        //huge horns - 90% hit
        if (player.upperBody.head.horns >= 20) {
            hitChance = 80;
        }
        //Vala dodgy bitch!
        if (monster.short == "Vala") {
            hitChance = 20;
        }
        //Account for monster speed - up to -50%.
        hitChance -= monster.stats.spe / 2;
        //Account for player speed - up to +50%
        hitChance += player.stats.spe / 2;
        //Hit & calculation
        if (hitChance >= Utils.rand(100)) {
            let horns: number = player.upperBody.head.horns;
            let damage: number = 0;
            if (horns > 40) horns = 40;
            //normal
            if (Utils.rand(4) > 0) {
                MainScreen.text("You lower your head and charge, skewering " + monster.a + monster.short + " on one of your bullhorns!  ");
                //As normal attack + horn length bonus
                damage = Math.floor(player.stats.str + horns * 2 - Utils.rand(monster.stats.tou) - monster.armorDefense());
            }
            //CRIT
            else {
                //doubles horn bonus damage
                damage = Math.floor(player.stats.str + horns * 4 - Utils.rand(monster.stats.tou) - monster.armorDefense());
                MainScreen.text("You lower your head and charge, slamming into " + monster.a + monster.short + " and burying both your horns into " + monster.pronoun2 + "!  ");
            }
            //Bonus damage for rut!
            if (player.inRut && monster.lowerBody.cockSpot.count() > 0) {
                MainScreen.text("The fury of your rut lent you strength, increasing the damage!  ");
                damage += 5;
            }
            //Bonus per level damage
            damage += player.stats.level * 2;
            //Reduced by armor
            damage -= monster.armorDefense();
            if (damage < 0) damage = 5;
            //CAP 'DAT SHIT
            if (damage > player.stats.level * 10 + 100) damage = player.stats.level * 10 + 100;
            if (damage > 0) {
                if (player.perks.has("HistoryFighter"))
                    damage *= 1.1;
                damage = doDamage(damage);
            }
            //Different horn damage messages
            if (damage < 20) MainScreen.text("You pull yourself free, dealing " + damage + " damage.");
            if (damage >= 20 && damage < 40) MainScreen.text("You struggle to pull your horns free, dealing " + damage + " damage.");
            if (damage >= 40) MainScreen.text("With great difficulty you rip your horns free, dealing " + damage + " damage.");
        }
        //Miss
        else {
            //Special vala changes
            if (monster.short == "Vala") {
                MainScreen.text("You lower your head and charge Vala, but she just flutters up higher, grabs hold of your horns as you close the distance, and smears her juicy, fragrant cunt against your nose.  The sensual smell and her excited moans stun you for a second, allowing her to continue to use you as a masturbation aid, but she quickly tires of such foreplay and flutters back with a wink.\n\n");
                player.stats.lust += 5;
            }
            else MainScreen.text("You lower your head and charge " + monster.a + monster.short + ", only to be sidestepped at the last moment!");
        }
        //New line before monster attack
        MainScreen.text("\n\n");
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
        switch (Utils.rand(6)) {
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
            switch (Utils.rand(3)) {
                //Dodge 1:
                case 1:
                    // No monster plural
                    //if (monster.plural)
                    MainScreen.text("  " + monster.capitalA + monster.short + " sees it coming and moves out of the way in the nick of time!\n\n", false);
                    break;
                //Dodge 2:
                case 2:
                    // No monster plural
                    //if (monster.plural) MainScreen.text("  Unfortunately, you're too slow, and " + monster.a + monster.short + " slips out of the way before you can lay a wet one on one of them.\n\n", false);
                    //else
                    MainScreen.text("  Unfortunately, you're too slow, and " + monster.a + monster.short + " slips out of the way before you can lay a wet one on " + monster.pronoun2 + ".\n\n", false);
                    break;
                //Dodge 3:
                default:
                    // No monster plural
                    //if (monster.plural) MainScreen.text("  Sadly, " + monster.a + monster.short + " moves aside, denying you the chance to give one of them a smooch.\n\n", false);
                    //else
                    MainScreen.text("  Sadly, " + monster.a + monster.short + " moves aside, denying you the chance to give " + monster.pronoun2 + " a smooch.\n\n", false);
                    break;
            }
            return;
        }
        //Success but no effect:
        if (monster.lustVuln <= 0 || !monster.lowerBody.cockSpot.hasCock()) {
            // No monster plural
            //if (monster.plural) MainScreen.text("  Mouth presses against mouth, and you allow your tongue to stick out to taste the saliva of one of their number, making sure to give them a big dose.  Pulling back, you look at " + monster.a + monster.short + " and immediately regret wasting the time on the kiss.  It had no effect!\n\n", false);
            //else
            MainScreen.text("  Mouth presses against mouth, and you allow your tongue to stick to taste " + monster.pronoun3 + "'s saliva as you make sure to give them a big dose.  Pulling back, you look at " + monster.a + monster.short + " and immediately regret wasting the time on the kiss.  It had no effect!\n\n", false);
            return;
        }
        let damage: number = 0;
        switch (Utils.rand(4)) {
            //Success 1:
            case 1:
                // No monster plural
                //if (monster.plural) MainScreen.text("  Success!  A spit-soaked kiss lands right on one of their mouths.  The victim quickly melts into your embrace, allowing you to give them a nice, heavy dose of sloppy oral aphrodisiacs.\n\n", false);
                //else
                MainScreen.text("  Success!  A spit-soaked kiss lands right on " + monster.a + monster.short + "'s mouth.  " + GenderDescriptor.mf(monster, "He", "She") + " quickly melts into your embrace, allowing you to give them a nice, heavy dose of sloppy oral aphrodisiacs.\n\n", false);
                damage = 15;
                break;
            //Success 2:
            case 2:
                // No monster plural
                //if (monster.plural) MainScreen.text("  Gold-gilt lips press into one of their mouths, the victim's lips melding with yours.  You take your time with your suddenly cooperative captive and make sure to cover every bit of their mouth with your lipstick before you let them go.\n\n", false);
                //else
                MainScreen.text("  Gold-gilt lips press into " + monster.a + monster.short + ", " + monster.pronoun3 + " mouth melding with yours.  You take your time with your suddenly cooperative captive and make sure to cover every inch of " + monster.pronoun3 + " with your lipstick before you let " + monster.pronoun2 + " go.\n\n", false);
                damage = 20;
                break;
            //CRITICAL SUCCESS (3)
            case 3:
                // No monster plural
                //if (monster.plural) MainScreen.text("  You slip past " + monster.a + monster.short + "'s guard and press your lips against one of them.  " + GenderDescriptor.mf(monster, "He", "She") + " melts against you, " + GenderDescriptor.mf(monster, "his", "her") + " tongue sliding into your mouth as " + GenderDescriptor.mf(monster, "he", "she") + " quickly succumbs to the fiery, cock-swelling kiss.  It goes on for quite some time.  Once you're sure you've given a full dose to " + GenderDescriptor.mf(monster, "his", "her") + " mouth, you break back and observe your handwork.  One of " + monster.a + monster.short + " is still standing there, licking " + GenderDescriptor.mf(monster, "his", "her") + " his lips while " + GenderDescriptor.mf(monster, "his", "her") + " dick is standing out, iron hard.  You feel a little daring and give the swollen meat another moist peck, glossing the tip in gold.  There's no way " + GenderDescriptor.mf(monster, "he", "she") + " will go soft now.  Though you didn't drug the rest, they're probably a little 'heated up' from the show.\n\n", false);
                //else
                MainScreen.text("  You slip past " + monster.a + monster.short + "'s guard and press your lips against " + monster.pronoun3 + ".  " + GenderDescriptor.mf(monster, "He", "She") + " melts against you, " + monster.pronoun3 + " tongue sliding into your mouth as " + monster.pronoun1 + " quickly succumbs to the fiery, cock-swelling kiss.  It goes on for quite some time.  Once you're sure you've given a full dose to " + monster.pronoun3 + " mouth, you break back and observe your handwork.  " + monster.capitalA + monster.short + " is still standing there, licking " + monster.pronoun3 + " lips while " + monster.pronoun3 + " dick is standing out, iron hard.  You feel a little daring and give the swollen meat another moist peck, glossing the tip in gold.  There's no way " + monster.pronoun1 + " will go soft now.\n\n", false);
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
        return player.lowerBody.tailVenom >= 33;
    }

    public reasonCannotUse(): string {
        return "You do not have enough venom to sting right now!";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.clearText();
        //Worms are immune!
        if (monster.short == "worms") {
            MainScreen.text("Taking advantage of your new natural weapons, you quickly thrust your stinger at the freak of nature. Sensing impending danger, the creature willingly drops its cohesion, causing the mass of worms to fall to the ground with a sick, wet 'thud', leaving you to stab only at air.\n\n");
            return;
        }
        //Determine if dodged!
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        if (monster.stats.spe - player.stats.spe > 0 && Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80) {
            if (monster.stats.spe - player.stats.spe < 8)
                MainScreen.text(monster.capitalA + monster.short + " narrowly avoids your stinger!\n\n");
            if (monster.stats.spe - player.stats.spe >= 8 && monster.stats.spe - player.stats.spe < 20)
                MainScreen.text(monster.capitalA + monster.short + " dodges your stinger with superior quickness!\n\n");
            if (monster.stats.spe - player.stats.spe >= 20)
                MainScreen.text(monster.capitalA + monster.short + " deftly avoids your slow attempts to sting " + monster.pronoun2 + ".\n\n");
            return;
        }
        //determine if avoided with armor.
        if (monster.armorDefense() - player.stats.level >= 10 && Utils.rand(4) > 0) {
            MainScreen.text("Despite your best efforts, your sting attack can't penetrate " + monster.a + monster.short + "'s defenses.\n\n");
            return;
        }
        //Sting successful!
        MainScreen.text("Searing pain lances through " + monster.a + monster.short + " as you manage to sting " + monster.pronoun2 + "!  ");
        // No monster plural
        //if (monster.plural) MainScreen.text("You watch as " + monster.pronoun1 + " stagger back a step and nearly trip, flushing hotly.");
        //else
        MainScreen.text("You watch as " + monster.pronoun1 + " staggers back a step and nearly trips, flushing hotly.");
        //Tabulate damage!
        let damage: number = 35 + Utils.rand(player.stats.lib / 10);
        //Level adds more damage up to a point (level 20)
        if (player.stats.level < 10) damage += player.stats.level * 3;
        else if (player.stats.level < 20) damage += 30 + (player.stats.level - 10) * 2;
        else damage += 50;
        monster.stats.lust += monster.lustVuln * damage;
        if (!monster.statusAffects.has("lustvenom"))
            monster.statusAffects.add(new StatusAffect("lustvenom", 0, 0, 0, 0));
        /* IT used to paralyze 50% of the time, this is no longer the case!
        Paralise the other 50%!
        else {
            MainScreen.text("Searing pain lances through " + monster.a + monster.short + " as you manage to sting " + monster.pronoun2 + "!  ", false);
            if(monster.short == "demons") MainScreen.text("You watch as " + monster.pronoun1 + " stagger back a step and nearly trip, finding it hard to move as " + monster.pronoun1 + " are afflicted with your paralytic venom.  ", false);
            else MainScreen.text("You watch as " + monster.pronoun1 + " staggers back a step and nearly trips, finding it hard to move as " + monster.pronoun1 + " is afflicted with your paralytic venom.  ", false);
            if(monster.short == "demons") MainScreen.text("It appears that " + monster.a + monster.short + " are weaker and slower.", false);
            else MainScreen.text("It appears that " + monster.a + monster.short + " is weaker and slower.", false);
            monster.str -= (5+rand(player.lib/5))
            monster.stats.spe -= (5+rand(player.lib/5))
            if(monster.str < 1) monster.str = 1;
            if(monster.stats.spe < 1) monster.stats.spe = 1;
        }*/
        //New line before monster attack
        MainScreen.text("\n\n");
        //Use tail mp
        player.lowerBody.tailVenom -= 25;
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
        if ((player.statusAffects.has("Blind") && Utils.rand(2) == 0) ||
            (monster.stats.spe - player.stats.spe > 0 && Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80)) {
            MainScreen.text("You miss " + monster.a + monster.short + " completely - ", false);
            // No monster plural
            //if (monster.plural) MainScreen.text("they", false);
            //else
            MainScreen.text(GenderDescriptor.mf(monster, "he", "she") + " moved out of the way!\n\n", false);
            return;
        }
        //Over-webbed
        if (monster.stats.spe < 1) {
            // No monster plural
            //if (!monster.plural)
            MainScreen.text(monster.capitalA + monster.short + " is completely covered in webbing, but you hose " + GenderDescriptor.mf(monster, "him", "her") + " down again anyway.", false);
            //else MainScreen.text(monster.capitalA + monster.short + " are completely covered in webbing, but you hose them down again anyway.", false);
        }
        //LAND A HIT!
        else {
            // No monster plural
            //if (!monster.plural)
            MainScreen.text("The adhesive strands cover " + monster.a + monster.short + " with restrictive webbing, greatly slowing " + GenderDescriptor.mf(monster, "him", "her") + ".", false);
            //else MainScreen.text("The adhesive strands cover " + monster.a + monster.short + " with restrictive webbing, greatly slowing " + GenderDescriptor.mf(monster, "him", "her") + ".", false);
            monster.stats.spe -= 45;
            if (monster.stats.spe < 0) monster.stats.spe = 0;
        }
        MainScreen.text("\n\n", false);
    }
}

export class TailWhip implements SpecialAction {
    public canUse(player: Player): boolean {
        return true;
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Monster) {
        MainScreen.clearText();
        //miss
        if ((player.statusAffects.has("Blind") && Utils.rand(2) == 0) ||
            (monster.stats.spe - player.stats.spe > 0 && Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80)) {
            MainScreen.text("Twirling like a top, you swing your tail, but connect with only empty air.");
        }
        else {
            // No monster plural
            //if (!monster.plural)
            MainScreen.text("Twirling like a top, you bat your opponent with your tail.  For a moment, " + monster.pronoun1 + " looks disbelieving, as if " + monster.pronoun3 + " world turned upside down, but " + monster.pronoun1 + " soon becomes irate and redoubles " + monster.pronoun3 + " offense, leaving large holes in " + monster.pronoun3 + " guard.  If you're going to take advantage, it had better be right away; " + monster.pronoun1 + "'ll probably cool off very quickly.");
            //else MainScreen.text("Twirling like a top, you bat your opponent with your tail.  For a moment, " + monster.pronoun1 + " look disbelieving, as if " + monster.pronoun3 + " world turned upside down, but " + monster.pronoun1 + " soon become irate and redouble " + monster.pronoun3 + " offense, leaving large holes in " + monster.pronoun3 + " guard.  If you're going to take advantage, it had better be right away; " + monster.pronoun1 + "'ll probably cool off very quickly.");
            if (!monster.statusAffects.has("CoonWhip"))
                monster.statusAffects.add(new StatusAffect("CoonWhip", 0, 0, 0, 0));
            let armorDefLossCounter: number = Math.round(monster.armorDefense() * .75);
            while (armorDefLossCounter > 0 && monster.armorDefense() >= 1) {
                //
                // wat
                // VVVVVVVVVVVVVVVVVVVVV
                // monster.armorDefense()--;
                monster.statusAffects.get("CoonWhip").value1 += 1;
                armorDefLossCounter--;
            }
            monster.statusAffects.get("CoonWhip").value2 += 2;
            if (player.lowerBody.tailType == TailType.RACCOON)
                monster.statusAffects.get("CoonWhip").value2 += 2;
        }
        MainScreen.text("\n\n");
    }
}

