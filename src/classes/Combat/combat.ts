﻿export default class Combat {


    public packAttack(): void {
        //Determine if dodged!
        if (player.stats.spe - monster.spe > 0 && int(Math.random() * (((player.stats.spe - monster.spe) / 4) + 80)) > 80) {
            MainScreen.text("You duck, weave, and dodge.  Despite their best efforts, the throng of demons only hit the air and each other.");
        }
        //Determine if evaded
        else if (player.perks.has("Evade") && rand(100) < 10) {
            MainScreen.text("Using your skills at evading attacks, you anticipate and sidestep " + monster.a + monster.short + "' attacks.");
        }
        //("Misdirection"
        else if (player.perks.has("Misdirection") && rand(100) < 15 && player.inventory.armor.displayName == "red, high-society bodysuit") {
            MainScreen.text("Using Raphael's teachings, you anticipate and sidestep " + monster.a + monster.short + "' attacks.");
        }
        //Determine if cat'ed
        else if (player.perks.has("Flexibility") && rand(100) < 6) {
            MainScreen.text("With your incredible flexibility, you squeeze out of the way of " + monster.a + monster.short + "' attacks.");
        }
        else {
            temp = int((monster.str + monster.weaponAttack) - rand(player.stats.tou) - player.armorDef); //Determine damage - str modified by enemy toughness!
            if (temp <= 0) {
                temp = 0;
                if (!monster.plural)
                    MainScreen.text("You deflect and block every " + monster.weaponVerb + " " + monster.a + monster.short + " throw at you.");
                else MainScreen.text("You deflect " + monster.a + monster.short + " " + monster.weaponVerb + ".");
            }
            else {
                temp = takeDamage(temp);
                if (temp <= 5)
                    MainScreen.text("You are struck a glancing blow by " + monster.a + monster.short + "! (" + temp + ")");
                else if (temp <= 10)
                    MainScreen.text(monster.capitalA + monster.short + " wound you! (" + temp + ")");
                else if (temp <= 20)
                    MainScreen.text(monster.capitalA + monster.short + " stagger you with the force of " + monster.pronoun3 + " " + monster.weaponVerb + "s! (" + temp + ")");
                else MainScreen.text(monster.capitalA + monster.short + " <b>mutilates</b> you with powerful fists and " + monster.weaponVerb + "s! (" + temp + ")");
            }
            statScreenRefresh();
            MainScreen.text("\n");
        }
        combatRoundOver();
    }

    public lustAttack(): void {
        if (player.stats.lust < 35) {
            MainScreen.text("The " + monster.short + " press in close against you and although they fail to hit you with an attack, the sensation of their skin rubbing against yours feels highly erotic.");
        }
        else if (player.stats.lust < 65) {
            MainScreen.text("The push of the " + monster.short + "' sweaty, seductive bodies sliding over yours is deliciously arousing and you feel your ");
            if (player.lowerBody.cockSpot.count() > 0)
                MainScreen.text(player.CockDescriptor.describeMultiCockShort(player) + " hardening ");
            else if (player.lowerBody.vaginaSpot.count() > 0) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " get wetter ");
            MainScreen.text("in response to all the friction.");
        }
        else {
            MainScreen.text("As the " + monster.short + " mill around you, their bodies rub constantly over yours, and it becomes harder and harder to keep your thoughts on the fight or resist reaching out to touch a well lubricated cock or pussy as it slips past.  You keep subconsciously moving your ");
            if (player.gender == 1) MainScreen.text(player.CockDescriptor.describeMultiCockShort(player) + " towards the nearest inviting hole.");
            if (player.gender == 2) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " towards the nearest swinging cock.");
            if (player.gender == 3) MainScreen.text("aching cock and thirsty pussy towards the nearest thing willing to fuck it.");
            if (player.gender == 0) MainScreen.text("groin, before remember there is nothing there to caress.");
        }
        dynStats("lus", 10 + player.stats.sens / 10);
        combatRoundOver();
    }

    private wait(): void {
        //Gain fatigue if not fighting sand tarps
        if (monster.findStatusAffect(StatusAffects.Level) < 0) fatigue(-5);
        Flags.list[FlagEnum.IN_COMBAT_USE_PLAYER_WAITED_FLAG] = 1;
        if (monster.statusAffects.has("PCTailTangle")) {
            (monster as Kitsune).kitsuneWait();
        }
        else if (monster.statusAffects.has("Level")) {
            (monster as SandTrap).sandTrapWait();
        }
        else if (monster.statusAffects.has("MinotaurEntangled")) {
            MainScreen.clearText();
            MainScreen.text("You sigh and relax in the chains, eying the well-endowed minotaur as you await whatever rough treatment he desires to give.  His musky, utterly male scent wafts your way on the wind, and you feel droplets of your lust dripping down your thighs.  You lick your lips as you watch the pre-cum drip from his balls, eager to get down there and worship them.  Why did you ever try to struggle against this fate?\n\n");
            dynStats("lus", 30 + rand(5), "resisted", false);
            enemyAI();
        }
        else if (player.statusAffects.has("Whispered")) {
            MainScreen.clearText();
            MainScreen.text("You shake off the mental compulsions and ready yourself to fight!\n\n");
            player.statusAffects.remove("Whispered");
            enemyAI();
        }
        else if (player.statusAffects.has("HarpyBind")) {
            MainScreen.clearText();
            temp = 80 + rand(40);
            temp = takeDamage(temp);
            MainScreen.text("The brood continues to hammer away at your defenseless self. (" + temp + ")");
            combatRoundOver();
        }
        else if (monster.statusAffects.has("QueenBind")) {
            ropeStruggles(true);
        }
        else if (player.statusAffects.has("GooBind")) {
            MainScreen.clearText();
            MainScreen.text("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours.");
            temp = takeDamage(.35 * maxHP());
            MainScreen.text(" (" + temp + ")");
            combatRoundOver();
        }
        else if (player.statusAffects.has("GooArmorBind")) {
            MainScreen.clearText();
            MainScreen.text("Suddenly, the goo-girl leaks half-way out of her heavy armor and lunges at you. You attempt to dodge her attack, but she doesn't try and hit you - instead, she wraps around you, pinning your arms to your chest. More and more goo latches onto you - you'll have to fight to get out of this.");
            player.statusAffects.get("GooArmorBind").value1 = 1;
            if (player.statusAffects.get("GooArmorBind").value1 >= 5) {
                if (monster.statusAffects.has("Spar"))
                    valeria.pcWinsValeriaSparDefeat();
                else gooArmorBeatsUpPC();
                return;
            }
            combatRoundOver();
        }
        else if (player.statusAffects.has("NagaBind")) {
            MainScreen.clearText();
            MainScreen.text("The naga's grip on you tightens as you relax into the stimulating pressure.");
            dynStats("lus", player.stats.sens / 5 + 5);
            takeDamage(5 + rand(5));
            combatRoundOver();
        }
        else if (player.statusAffects.has("HolliConstrict")) {
            (monster as Holli).waitForHolliConstrict(true);
        }
        else if (player.statusAffects.has("TentacleBind")) {
            MainScreen.clearText();
            if (player.lowerBody.cockSpot.count() > 0)
                MainScreen.text("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
            else if (player.lowerBody.vaginaSpot.hasVagina())
                MainScreen.text("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing!");
            else MainScreen.text("The creature continues probing at your asshole and has now latched " + num2Text(player.upperBody.chest.countNipples()) + " more suckers onto your nipples, amplifying your growing lust.  You must escape or you will become a mere toy to this thing!");
            dynStats("lus", (8 + player.stats.sens / 10));
            combatRoundOver();
        }
        else if (player.statusAffects.has("IsabellaStunned")) {
            MainScreen.clearText();
            MainScreen.text("You wobble about for some time but manage to recover. Isabella capitalizes on your wasted time to act again.\n\n");
            player.statusAffects.remove("IsabellaStunned");
            enemyAI();
        }
        else if (player.statusAffects.has("Stunned")) {
            MainScreen.clearText();
            MainScreen.text("You wobble about, stunned for a moment.  After shaking your head, you clear the stars from your vision, but by then you've squandered your chance to act.\n\n");
            player.statusAffects.remove("Stunned");
            enemyAI();
        }
        else if (player.statusAffects.has("Confusion")) {
            MainScreen.clearText();
            MainScreen.text("You shake your head and file your memories in the past, where they belong.  It's time to fight!\n\n");
            player.statusAffects.remove("Confusion");
            enemyAI();
        }
        else if (monster instanceof Doppleganger) {
            MainScreen.clearText();
            MainScreen.text("You decide not to take any action this round.\n\n");
            (monster as Doppleganger).handlePlayerWait();
            enemyAI();
        }
        else {
            MainScreen.clearText();
            MainScreen.text("You decide not to take any action this round.\n\n");
            enemyAI();
        }
    }

    private struggle(): void {
        if (monster.statusAffects.has("MinotaurEntangled")) {
            MainScreen.clearText();
            if (player.stats.str / 9 + rand(20) + 1 >= 15) {
                MainScreen.text("Utilizing every ounce of your strength and cunning, you squirm wildly, shrugging through weak spots in the chain's grip to free yourself!  Success!");
                monster.statusAffects.remove("MinotaurEntangled");
                MainScreen.text("\n\n\"<i>No!  You fool!  You let her get away!  Hurry up and finish her up!  I need my serving!</i>\"  The succubus spits out angrily.\n\n");
                combatRoundOver();
            }
            //Struggle Free Fail*
            else {
                MainScreen.text("You wiggle and struggle with all your might, but the chains remain stubbornly tight, binding you in place.  Damnit!  You can't lose like this!\n\n");
                enemyAI();
            }
        }
        else if (monster.statusAffects.has("PCTailTangle")) {
            (monster as Kitsune).kitsuneStruggle();
        }
        else if (player.statusAffects.has("HolliConstrict")) {
            (monster as Holli).struggleOutOfHolli();
        }
        else if (monster.statusAffects.has("QueenBind")) {
            ropeStruggles();
        }
        else if (player.statusAffects.has("GooBind")) {
            MainScreen.clearText();
            //[Struggle](successful) :
            if (rand(3) == 0 || rand(80) < player.stats.str) {
                MainScreen.text("You claw your fingers wildly within the slime and manage to brush against her heart-shaped nucleus. The girl silently gasps and loses cohesion, allowing you to pull yourself free while she attempts to solidify.");
                player.statusAffects.remove("GooBind");
            }
            //Failed struggle
            else {
                MainScreen.text("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours.");
                temp = takeDamage(.15 * maxHP());
                MainScreen.text(" (" + temp + ")", false);
            }
            combatRoundOver();
        }
        else if (player.statusAffects.has("HarpyBind")) {
            harpyHordeGangBangStruggle();
        }
        else if (player.statusAffects.has("GooArmorBind")) {
            struggleAtGooBind();
        }
        else if (player.statusAffects.has("UBERWEB")) {
            MainScreen.clearText();
            MainScreen.text("You claw your way out of the webbing while Kiha does her best to handle the spiders single-handedly!\n\n");
            player.statusAffects.remove("UBERWEB");
            enemyAI();
        }
        else if (player.statusAffects.has("NagaBind")) {
            MainScreen.clearText();
            if (rand(3) == 0 || rand(80) < player.stats.str / 1.5) {
                MainScreen.text("You wriggle and squirm violently, tearing yourself out from within the naga's coils.");
                player.statusAffects.remove("NagaBind");
            }
            else {
                MainScreen.text("The naga's grip on you tightens as you struggle to break free from the stimulating pressure.");
                dynStats("lus", player.stats.sens / 10 + 2);
                takeDamage(7 + rand(5));
            }
            combatRoundOver();
        }
        else {
            MainScreen.clearText();
            MainScreen.text("You struggle with all of your might to free yourself from the tentacles before the creature can fulfill whatever unholy desire it has for you.\n");
            //33% chance to break free + up to 50% chance for strength
            if (rand(3) == 0 || rand(80) < player.stats.str / 2) {
                MainScreen.text("As the creature attempts to adjust your position in its grip, you free one of your " + LowerBodyDescriptor.describeLegs(player) + " and hit the beast in its beak, causing it to let out an inhuman cry and drop you to the ground smartly.\n\n");
                player.statusAffects.remove("TentacleBind");
                monster.statusAffects.add(new StatusAffect("TentacleCoolDown", 3, 0, 0, 0)));
                enemyAI();
            }
            //Fail to break free
            else {
                MainScreen.text("Despite trying to escape, the creature only tightens its grip, making it difficult to breathe.\n\n");
                takeDamage(5);
                if (player.lowerBody.cockSpot.count() > 0)
                    MainScreen.text("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
                else if (player.lowerBody.vaginaSpot.hasVagina())
                    MainScreen.text("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing!");
                else MainScreen.text("The creature continues probing at your asshole and has now latched " + num2Text(player.upperBody.chest.countNipples()) + " more suckers onto your nipples, amplifying your growing lust.  You must escape or you will become a mere toy to this thing!");
                dynStats("lus", (3 + player.stats.sens / 10 + player.stats.lib / 20));
                combatRoundOver();
            }
        }
    }

    private fireBow(): void {
        MainScreen.clearText();
        if (player.fatigue + physicalCost(25) > 100) {
            MainScreen.text("You're too fatigued to fire the bow!");
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        if (monster.statusAffects.has("BowDisabled")) {
            MainScreen.text("You can't use your bow right now!");
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        fatigue(25, 2);
        //Keep logic sane if this attack brings victory
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            enemyAI();
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
            player.changeStatusValue(StatusAffects.Kelt, 1, 100);
        }
        if (monster.statusAffects.has("Sandstorm") && rand(10) > 1) {
            MainScreen.text("Your shot is blown off target by the tornado of sand and wind.  Damn!\n\n");
            enemyAI();
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
            enemyAI();
            return;
        }
        //worms are immune
        if (monster.short == "worms") {
            MainScreen.text("The arrow slips between the worms, sticking into the ground.\n\n");
            enemyAI();
            return;
        }
        //Vala miss chance!
        if (monster.short == "Vala" && rand(10) < 7) {
            MainScreen.text("Vala flaps her wings and twists her body. Between the sudden gust of wind and her shifting of position, the arrow goes wide.\n\n");
            enemyAI();
            return;
        }
        //Blind miss chance
        if (player.statusAffects.has("Blind")) {
            MainScreen.text("The arrow hits something, but blind as you are, you don't have a chance in hell of hitting anything with a bow.\n\n");
            enemyAI();
            return;
        }
        //Miss chance 10% based on speed + 10% based on int + 20% based on skill
        if (monster.short != "pod" && player.stats.spe / 10 + player.stats.int / 10 + player.statusAffects.get("Kelt").value1 / 5 + 60 < rand(101)) {
            MainScreen.text("The arrow goes wide, disappearing behind your foe.\n\n");
            enemyAI();
            return;
        }
        //Hit!  Damage calc! 20 +
        let damage: number = 0;
        damage = int((20 + player.stats.str / 3 + player.statusAffects.get("Kelt").value1 / 1.2) + player.stats.spe / 3 - rand(monster.tou) - monster.armorDef);
        if (damage < 0) damage = 0;
        if (damage == 0) {
            if (monster.inte > 0)
                MainScreen.text(monster.capitalA + monster.short + " shrugs as the arrow bounces off them harmlessly.\n\n");
            else MainScreen.text("The arrow bounces harmlessly off " + monster.a + monster.short + ".\n\n");
            enemyAI();
            return;
        }
        if (monster.short == "pod")
            MainScreen.text("The arrow lodges deep into the pod's fleshy wall");
        else if (monster.plural)
            MainScreen.text(monster.capitalA + monster.short + " look down at the arrow that now protrudes from one of " + monster.pronoun3 + " bodies");
        else MainScreen.text(monster.capitalA + monster.short + " looks down at the arrow that now protrudes from " + monster.pronoun3 + " body");
        if (player.perks.has("HistoryFighter")) damage *= 1.1;
        damage = doDamage(damage);
        monster.lust -= 20;
        if (monster.lust < 0) monster.lust = 0;
        if (monster.HP <= 0) {
            if (monster.short == "pod")
                MainScreen.text(". (" + String(damage) + ")\n\n");
            else if (monster.plural)
                MainScreen.text(" and stagger, collapsing onto each other from the wounds you've inflicted on " + monster.pronoun2 + ".  (" + String(damage) + ")\n\n");
            else MainScreen.text(" and staggers, collapsing from the wounds you've inflicted on " + monster.pronoun2 + ".  (" + String(damage) + ")\n\n");
            doNext(endHpVictory);
            return;
        }
        else MainScreen.text(".  It's clearly very painful. (" + String(damage) + ")\n\n");
        enemyAI();
    }

    private fireBreathMenu(): void {
        MainScreen.clearText();
        MainScreen.text("Which of your special fire-breath attacks would you like to use?");
        simpleChoices("Akbal's", fireballuuuuu, "Hellfire", hellFire, "Dragonfire", dragonBreath, "", null, "Back", playerMenu);
    }

    private debugInspect(): void {
        MainScreen.text(monster.generateDebugDescription());
        doNext(playerMenu);
    }

    //Fantasize
    public fantasize(): void {
        let temp2: number = 0;
        doNext(combatMenu);
        MainScreen.text("", true);
        if (player.inventory.armor.displayName == "goo armor") {
            MainScreen.text("As you fantasize, you feel Valeria rubbing her gooey body all across your sensitive skin");
            if (player.gender > 0) MainScreen.text(" and genitals");
            MainScreen.text(", arousing you even further.\n");
            temp2 = 25 + rand(player.stats.lib / 8 + player.stats.cor / 8)
        }
        else if (player.lowerBody.balls > 0 && player.lowerBody.ballSize >= 10 && rand(2) == 0) {
            MainScreen.text("You daydream about fucking " + monster.a + monster.short + ", feeling your balls swell with seed as you prepare to fuck " + monster.pronoun2 + " full of cum.\n", false);
            temp2 = 5 + rand(player.stats.lib / 8 + player.stats.cor / 8);
            MainScreen.text("You aren't sure if it's just the fantasy, but your " + BallsDescriptor.describeBalls(true, true, player) + " do feel fuller than before...\n", false);
            player.hoursSinceCum += 50;
        }
        else if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 6 && rand(2) == 0) {
            MainScreen.text("You fantasize about grabbing " + monster.a + monster.short + " and shoving " + monster.pronoun2 + " in between your jiggling mammaries, nearly suffocating " + monster.pronoun2 + " as you have your way.\n", false);
            temp2 = 5 + rand(player.stats.lib / 8 + player.stats.cor / 8)
        }
        else if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 6 && rand(2) == 0) {
            MainScreen.text("You fantasize about grabbing " + monster.a + monster.short + " and forcing " + monster.pronoun2 + " against a " + BreastDescriptor.describeNipple(0) + ", and feeling your milk let down.  The desire to forcefeed SOMETHING makes your nipples hard and moist with milk.\n", false);
            temp2 = 5 + rand(player.stats.lib / 8 + player.stats.cor / 8)
        }
        else {
            MainScreen.text("You fill your mind with perverted thoughts about " + monster.a + monster.short + ", picturing " + monster.pronoun2 + " in all kinds of perverse situations with you.\n", true);
            temp2 = 10 + rand(player.stats.lib / 5 + player.stats.cor / 8);
        }
        if (temp2 >= 20) MainScreen.text("The fantasy is so vivid and pleasurable you wish it was happening now.  You wonder if " + monster.a + monster.short + " can tell what you were thinking.\n\n", false);
        else MainScreen.text("\n", false);
        player.stats.lust += temp2;
        player.stats.resisted += false;
        if (player.stats.lust > 99) {
            if (monster.short == "pod") {
                MainScreen.text("<b>You nearly orgasm, but the terror of the situation reasserts itself, muting your body's need for release.  If you don't escape soon, you have no doubt you'll be too fucked up to ever try again!</b>\n\n", false);
                player.stats.lust = 99;
                player.stats.lust += -25;
            }
            else {
                doNext(endLustLoss);
                return;
            }
        }
        enemyAI();
    }
    //Mouf Attack
    // (Similar to the bow attack, high damage but it raises your fatigue).
    public bite(): void {
        if (player.fatigue + physicalCost(25) > 100) {
            MainScreen.text("You're too fatigued to use your shark-like jaws!", true);
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        //Worms are special
        if (monster.short == "worms") {
            MainScreen.text("There is no way those are going anywhere near your mouth!\n\n", true);
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        fatigue(25, 2);
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            enemyAI();
            return;
        }
        MainScreen.text("You open your mouth wide, your shark teeth extending out. Snarling with hunger, you lunge at your opponent, set to bite right into them!  ", true);
        if (player.statusAffects.has("Blind")) MainScreen.text("In hindsight, trying to bite someone while blind was probably a bad idea... ", false);
        let damage: number = 0;
        //Determine if dodged!
        if ((player.statusAffects.has("Blind") && rand(3) != 0) || (monster.spe - player.stats.spe > 0 && int(Math.random() * (((monster.spe - player.stats.spe) / 4) + 80)) > 80)) {
            if (monster.spe - player.stats.spe < 8) MainScreen.text(monster.capitalA + monster.short + " narrowly avoids your attack!", false);
            if (monster.spe - player.stats.spe >= 8 && monster.spe - player.stats.spe < 20) MainScreen.text(monster.capitalA + monster.short + " dodges your attack with superior quickness!", false);
            if (monster.spe - player.stats.spe >= 20) MainScreen.text(monster.capitalA + monster.short + " deftly avoids your slow attack.", false);
            MainScreen.text("\n\n", false);
            enemyAI();
            return;
        }
        //Determine damage - str modified by enemy toughness!
        damage = int((player.stats.str + 45) - rand(monster.tou) - monster.armorDef);

        //Deal damage and update based on perks
        if (damage > 0) {
            if (player.perks.has("HistoryFighter")) damage *= 1.1;
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
        //Kick back to main if no damage occured!
        if (monster.HP > 0 && monster.lust < 100) {
            enemyAI();
        }
        else {
            if (monster.HP <= 0) doNext(endHpVictory);
            else doNext(endLustVictory);
        }
    }

    public fatigueRecovery(): void {
        fatigue(-1);
        if (player.perks.has("EnlightenedNinetails") || player.perks.has("CorruptedNinetails")) fatigue(-(1 + rand(3)));
    }

    //ATTACK
    public attack(): void {
        if (!player.statusAffects.has("FirstAttack")) {
            MainScreen.text("", true);
            fatigueRecovery();
        }
        if (player.statusAffects.has("Sealed") && player.statusAffects.get("Sealed").value2 == 0) {
            MainScreen.text("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  The kitsune's seals have made normal attack impossible!  Maybe you could try something else?\n\n", false);
            enemyAI();
            return;
        }
        if (Flags.list[FlagEnum.PC_FETISH] >= 3 && !urtaQuest.isUrta()) {
            MainScreen.text("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  Ceraph's piercings have made normal attack impossible!  Maybe you could try something else?\n\n", false);
            enemyAI();
            return;
        }
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            enemyAI();
            return;
        }
        if (monster.statusAffects.has("Level") && !player.statusAffects.has("FirstAttack")) {
            MainScreen.text("It's all or nothing!  With a bellowing cry you charge down the treacherous slope and smite the sandtrap as hard as you can!  ");
            (monster as SandTrap).trapLevel(-4);
        }
        if (player.perks.has("DoubleAttack") && player.stats.spe >= 50 && Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] < 2) {
            if (player.statusAffects.has("FirstAttack")) player.statusAffects.remove("FirstAttack");
            else {
                //Always!
                if (Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] == 0) player.statusAffects.add(new StatusAffect("FirstAttack", 0, 0, 0, 0)));
			//Alternate!
			else if (player.stats.str < 61 && Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] == 1) player.statusAffects.add(new StatusAffect("FirstAttack", 0, 0, 0, 0)));
            }
        }
        //"Brawler perk". Urta only. Thanks to Fenoxo for pointing this out... Even though that should have been obvious :<
        //Urta has fists and the Brawler perk. Don't check for that because Urta can't drop her fists or lose the perk!
        else if (urtaQuest.isUrta()) {
            if (player.statusAffects.has("FirstAttack")) {
                player.statusAffects.remove("FirstAttack");
            }
            else {
                player.statusAffects.add(new StatusAffect("FirstAttack", 0, 0, 0, 0)));
                MainScreen.text("Utilizing your skills as a bareknuckle brawler, you make two attacks!\n");
            }
        }
        //Blind
        if (player.statusAffects.has("Blind")) {
            MainScreen.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ", false);
        }
        if (monster instanceof Basilisk) {
            //basilisk counter attack (block attack, significant speed loss): 
            if (player.stats.int / 5 + rand(20) < 25) {
                MainScreen.text("Holding the basilisk in your peripheral vision, you charge forward to strike it.  Before the moment of impact, the reptile shifts its posture, dodging and flowing backward skillfully with your movements, trying to make eye contact with you. You find yourself staring directly into the basilisk's face!  Quickly you snap your eyes shut and recoil backwards, swinging madly at the lizard to force it back, but the damage has been done; you can see the terrible grey eyes behind your closed lids, and you feel a great weight settle on your bones as it becomes harder to move.", false);
                Basilisk.basiliskSpeed(player, 20);
                player.statusAffects.remove("FirstAttack");
                combatRoundOver();
                return;
            }
            //Counter attack fails: (random chance if PC int > 50 spd > 60; PC takes small physical damage but no block or spd penalty)
            else {
                MainScreen.text("Holding the basilisk in your peripheral vision, you charge forward to strike it.  Before the moment of impact, the reptile shifts its posture, dodging and flowing backward skillfully with your movements, trying to make eye contact with you. You twist unexpectedly, bringing your " + player.weaponName + " up at an oblique angle; the basilisk doesn't anticipate this attack!  ", false);
            }
        }
        //Worms are special
        if (monster.short == "worms") {
            //50% chance of hit (int boost)
            if (rand(100) + player.stats.int / 3 >= 50) {
                temp = int(player.stats.str / 5 - rand(5));
                if (temp == 0) temp = 1;
                MainScreen.text("You strike at the amalgamation, crushing countless worms into goo, dealing " + temp + " damage.\n\n", false);
                monster.HP -= temp;
                if (monster.HP <= 0) {
                    doNext(endHpVictory);
                    return;
                }
            }
            //Fail
            else {
                MainScreen.text("You attempt to crush the worms with your reprisal, only to have the collective move its individual members, creating a void at the point of impact, leaving you to attack only empty air.\n\n", false);
            }
            if (player.statusAffects.has("FirstAttack")) {
                attack();
                return;
            }
            enemyAI();
            return;
        }

        let damage: number = 0;
        //Determine if dodged!
        if ((player.statusAffects.has("Blind") && rand(2) == 0) || (monster.spe - player.stats.spe > 0 && int(Math.random() * (((monster.spe - player.stats.spe) / 4) + 80)) > 80)) {
            //Akbal dodges special education
            if (monster.short == "Akbal") MainScreen.text("Akbal moves like lightning, weaving in and out of your furious strikes with the speed and grace befitting his jaguar body.\n", false);
            else if (monster.short == "plain girl") MainScreen.text("You wait patiently for your opponent to drop her guard. She ducks in and throws a right cross, which you roll away from before smacking your " + player.weaponName + " against her side. Astonishingly, the attack appears to phase right through her, not affecting her in the slightest. You glance down to your " + player.weaponName + " as if betrayed.\n", false);
            else if (monster.short == "kitsune") {
                //Player Miss:
                MainScreen.text("You swing your [weapon] ferociously, confident that you can strike a crushing blow.  To your surprise, you stumble awkwardly as the attack passes straight through her - a mirage!  You curse as you hear a giggle behind you, turning to face her once again.\n\n");
            }
            else {
                if (monster.spe - player.stats.spe < 8) MainScreen.text(monster.capitalA + monster.short + " narrowly avoids your attack!", false);
                if (monster.spe - player.stats.spe >= 8 && monster.spe - player.stats.spe < 20) MainScreen.text(monster.capitalA + monster.short + " dodges your attack with superior quickness!", false);
                if (monster.spe - player.stats.spe >= 20) MainScreen.text(monster.capitalA + monster.short + " deftly avoids your slow attack.", false);
                MainScreen.text("\n", false);
                if (player.statusAffects.has("FirstAttack")) {
                    attack();
                    return;
                }
                else MainScreen.text("\n", false);
            }
            enemyAI();
            return;
        }
        //BLOCKED ATTACK:
        if (monster.statusAffects.has("Earthshield") && rand(4) == 0) {
            MainScreen.text("Your strike is deflected by the wall of sand, dirt, and rock!  Damn!\n");
            if (player.statusAffects.has("FirstAttack")) {
                attack();
                return;
            }
            else MainScreen.text("\n", false);
            enemyAI();
            return;
        }
        //Determine damage
        /*Determine damage - str modified by enemy toughness!
        if(player.hasPerk("Double Attack") >= 0 && player.stats.str <= 60) {
            if(player.weaponName == "deadly spear") damage = int((player.stats.str + player.weaponAttack) - Math.random()*(monster.tou));
            else if(player.weaponName == "jeweled rapier") damage = int((player.stats.str + player.weaponAttack) - Math.random()*(monster.tou));
            else if(player.weaponName == "katana") damage = int((player.stats.str + player.weaponAttack) - Math.random()*(monster.tou + monster.armorDef - 5));
            else damage = int((player.stats.str + player.weaponAttack) - Math.random()*(monster.tou + monster.armorDef));
        }*/
        //BASIC DAMAGE STUFF
        //Double Attack Hybrid Reductions
        if (player.perks.has("DoubleAttack") && player.stats.spe >= 50 && player.stats.str > 61 && Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] == 0) {
            damage = 60.5;
        }
        else damage = player.stats.str;
        //Weapon addition!
        damage += player.weaponAttack;
        //Bonus sand trap damage!
        if (monster.statusAffects.has("Level")) damage = Math.round(damage * 1.75);
        //Determine if critical hit!
        let crit: boolean = false;
        if (rand(100) <= 4 || (player.perks.has("Tactician") && player.stats.int >= 50 && (player.stats.int - 50) / 5 > rand(100))) {
            crit = true;
            damage *= 1.75;
        }
        //Start figuring enemy damage resistance
        let reduction: number = rand(monster.tou);
        //Add in enemy armor if needed
        if (player.weaponName != "jeweled rapier" && player.weaponName != "deadly spear") {
            reduction += monster.armorDef;
            //Remove half armor for lunging strikes
            if (player.perks.has("LungingAttacks"))
                reduction -= monster.armorDef / 2;
        }
        //Take 5 off enemy armor for katana
        if (player.weaponName == "katana") {
            //Knock off 5
            if (monster.armorDef >= 5) reduction -= 5;
            //Less than 5 armor?  TAKE IT ALL!
            else reduction -= monster.armorDef;
        }
        //Apply AND DONE!
        damage -= reduction;
        //Damage post processing!
        //Thunderous Strikes
        if (player.perks.has("ThunderousStrikes") && player.stats.str >= 80)
            damage *= 1.2;

        if (player.perks.has("ChiReflowMagic")) damage *= UmasShop.NEEDLEWORK_MAGIC_REGULAR_MULTI;
        if (player.perks.has("ChiReflowAttack")) damage *= UmasShop.NEEDLEWORK_ATTACK_REGULAR_MULTI;

        //One final round
        damage = Math.round(damage);

        //ANEMONE SHIT
        if (monster.short == "anemone") {
            //hit successful:
            //special event, block (no more than 10-20% of turns, also fails if PC has >75 corruption):
            if (rand(10) <= 1) {
                MainScreen.text("Seeing your " + player.weaponName + " raised, the anemone looks down at the water, angles her eyes up at you, and puts out a trembling lip.  ", false);
                if (player.stats.cor < 75) {
                    MainScreen.text("You stare into her hangdog expression and lose most of the killing intensity you had summoned up for your attack, stopping a few feet short of hitting her.\n", false);
                    damage = 0;
                    //Kick back to main if no damage occured!
                    if (monster.HP > 0 && monster.lust < 100) {
                        if (player.statusAffects.has("FirstAttack")) {
                            attack();
                            return;
                        }
                        enemyAI();
                    }
                    else {
                        if (monster.HP <= 0) doNext(endHpVictory);
                        else doNext(endLustVictory);
                    }
                    return;
                }
                else MainScreen.text("Though you lose a bit of steam to the display, the drive for dominance still motivates you to follow through on your swing.", false);
            }
        }

        // Have to put it before doDamage, because doDamage applies the change, as well as status effects and shit.
        if (monster instanceof Doppleganger) {
            if (monster.findStatusAffect(StatusAffects.Stunned) < 0) {
                if (damage > 0 && player.perks.has("HistoryFighter")) damage *= 1.1;
                if (damage > 0) damage = doDamage(damage, false);

                (monster as Doppleganger).mirrorAttack(damage);
                return;
            }

            // Stunning the doppleganger should now "buy" you another round.
        }

        if (damage > 0) {
            if (player.perks.has("HistoryFighter")) damage *= 1.1;
            damage = doDamage(damage);
        }

        if (damage <= 0) {
            damage = 0;
            MainScreen.text("Your attacks are deflected or blocked by " + monster.a + monster.short + ".", false);
        }
        else {
            MainScreen.text("You hit " + monster.a + monster.short + "! (" + damage + ")", false);
            if (crit) MainScreen.text(" <b>*CRIT*</b>");
        }
        if (player.perks.has("BrutalBlows") && player.stats.str > 75) {
            if (monster.armorDef > 0) MainScreen.text("\nYour hits are so brutal that you damage " + monster.a + monster.short + "'s defenses!");
            if (monster.armorDef - 10 > 0) monster.armorDef -= 10;
            else monster.armorDef = 0;
        }
        if (damage > 0) {
            //Lust raised by anemone contact!
            if (monster.short == "anemone") {
                MainScreen.text("\nThough you managed to hit the anemone, several of the tentacles surrounding her body sent home jolts of venom when your swing brushed past them.", false);
                //(gain lust, temp lose str/spd)
                (monster as Anemone).applyVenom((1 + rand(2)));
            }

            //Lust raising weapon bonuses
            if (monster.lustVuln > 0) {
                if (player.weaponPerk == "Aphrodisiac Weapon") {
                    monster.lust += monster.lustVuln * (5 + player.stats.cor / 10);
                    MainScreen.text("\n" + monster.capitalA + monster.short + " shivers as your weapon's 'poison' goes to work.", false);
                }
                if (player.weaponName == "coiled whip" && rand(2) == 0) {
                    monster.lust += monster.lustVuln * (5 + player.stats.cor / 12);
                    if (!monster.plural) MainScreen.text("\n" + monster.capitalA + monster.short + " shivers and gets turned on from the whipping.", false);
                    else MainScreen.text("\n" + monster.capitalA + monster.short + " shiver and get turned on from the whipping.", false);
                }
                if (player.weaponName == "succubi whip") {
                    monster.lust += monster.lustVuln * (20 + player.stats.cor / 15);
                    if (player.stats.cor < 90) player.stats.cor += .3;
                    if (!monster.plural) MainScreen.text("\n" + monster.capitalA + monster.short + " shivers and moans involuntarily from the whip's touches.", false);
                    else MainScreen.text("\n" + monster.capitalA + monster.short + " shiver and moan involuntarily from the whip's touches.", false);
                    if (rand(2) == 0) {
                        MainScreen.text("  You get a sexual thrill from it.", false);
                        player.stats.lust += 1;
                    }
                }
            }
            //Weapon Procs!
            if (player.weaponName == "huge warhammer" || player.weaponName == "spiked gauntlet" || player.weaponName == "hooked gauntlets") {
                //10% chance
                if (rand(10) == 0 && monster.findPerk(PerkLib.Resolute) < 0) {
                    MainScreen.text("\n" + monster.capitalA + monster.short + " reels from the brutal blow, stunned.", false);
                    monster.statusAffects.add(new StatusAffect("Stunned", 0, 0, 0, 0)));
                }
                //50% Bleed chance
                if (player.weaponName == "hooked gauntlets" && rand(2) == 0 && monster.armorDef < 10 && monster.findStatusAffect(StatusAffects.IzmaBleed) < 0) {
                    if (monster instanceof LivingStatue) {
                        MainScreen.text("Despite the rents you've torn in its stony exterior, the statue does not bleed.");
                    }
                    else {
                        monster.statusAffects.add(new StatusAffect("IzmaBleed", 3, 0, 0, 0)));
                        if (monster.plural) MainScreen.text("\n" + monster.capitalA + monster.short + " bleed profusely from the many bloody gashes your hooked gauntlets leave behind.", false);
                        else MainScreen.text("\n" + monster.capitalA + monster.short + " bleeds profusely from the many bloody gashes your hooked gauntlets leave behind.", false);
                    }
                }
            }

        }

        if (monster instanceof JeanClaude && !player.statusAffects.has("FirstAttack")) {
            if (monster.HP < 1 || monster.lust > 99) {
                // noop
            }
            if (player.stats.lust <= 30) {
                MainScreen.text("\n\nJean-Claude doesn’t even budge when you wade into him with your [weapon].");

                MainScreen.text("\n\n“<i>Why are you attacking me, slave?</i>” he says. The basilisk rex sounds genuinely confused. His eyes pulse with hot, yellow light, reaching into you as he opens his arms, staring around as if begging the crowd for an explanation. “<i>You seem lost, unable to understand, lashing out at those who take care of you. Don’t you know who you are? Where you are?</i>” That compulsion in his eyes, that never-ending heat, it’s... it’s changing things. You need to finish this as fast as you can.");
            }
            else if (player.stats.lust <= 50) {
                MainScreen.text("\n\nAgain your [weapon] thumps into Jean-Claude. Again it feels wrong. Again it sends an aching chime through you, that you are doing something that revolts your nature.");

                MainScreen.text("\n\n“<i>Why are you fighting your master, slave?</i>” he says. He is bigger than he was before. Or maybe you are smaller. “<i>You are confused. Put your weapon down- you are no warrior, you only hurt yourself when you flail around with it. You have forgotten what you were trained to be. Put it down, and let me help you.</i>” He’s right. It does hurt. Your body murmurs that it would feel so much better to open up and bask in the golden eyes fully, let it move you and penetrate you as it may. You grit your teeth and grip your [weapon] harder, but you can’t stop the warmth the hypnotic compulsion is building within you.");
            }
            else if (player.stats.lust <= 80) {
                MainScreen.text("\n\n“<i>Do you think I will be angry at you?</i>” growls Jean-Claude lowly. Your senses feel intensified, his wild, musky scent rich in your nose. It’s hard to concentrate... or rather it’s hard not to concentrate on the sweat which runs down his hard, defined frame, the thickness of his bulging cocks, the assured movement of his powerful legs and tail, and the glow, that tantalizing, golden glow, which pulls you in and pushes so much delicious thought and sensation into your head…  “<i>I am not angry. You will have to be punished, yes, but you know that is only right, that in the end you will accept and enjoy being corrected. Come now, slave. You only increase the size of the punishment with this silliness.</i>”");
            }
            else {
                MainScreen.text("\n\nYou can’t... there is a reason why you keep raising your weapon against your master, but what was it? It can’t be that you think you can defeat such a powerful, godly alpha male as him. And it would feel so much better to supplicate yourself before the glow, lose yourself in it forever, serve it with your horny slut body, the only thing someone as low and helpless as you could possibly offer him. Master’s mouth is moving but you can no longer tell where his voice ends and the one in your head begins... only there is a reason you cling to like you cling onto your [weapon], whatever it is, however stupid and distant it now seems, a reason to keep fighting...");
            }

            player.stats.lust += 25;
        }

        MainScreen.text("\n", false);
        //Kick back to main if no damage occured!
        if (monster.HP >= 1 && monster.lust <= 99) {
            if (player.statusAffects.has("FirstAttack")) {
                attack();
                return;
            }
            MainScreen.text("\n", false);
            enemyAI();
        }
        else {
            if (monster.HP <= 0) doNext(endHpVictory);
            else doNext(endLustVictory);
        }
    }
    //Gore Attack - uses 15 fatigue!
    public goreAttack(): void {
        MainScreen.clearText();
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        if (monster.short == "worms") {
            MainScreen.text("Taking advantage of your new natural weapons, you quickly charge at the freak of nature. Sensing impending danger, the creature willingly drops its cohesion, causing the mass of worms to fall to the ground with a sick, wet 'thud', leaving your horns to stab only at air.\n\n");
            enemyAI();
            return;
        }
        if (player.fatigue + physicalCost(15) > 100) {
            MainScreen.text("You're too fatigued to use a charge attack!");
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        fatigue(15, 2);
        let damage: number = 0;
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            enemyAI();
            return;
        }
        //Bigger horns = better success chance.
        //Small horns - 60% hit
        if (player.upperBody.head.horns >= 6 && player.upperBody.head.horns < 12) {
            temp = 60;
        }
        //bigger horns - 75% hit
        if (player.upperBody.head.horns >= 12 && player.upperBody.head.horns < 20) {
            temp = 75;
        }
        //huge horns - 90% hit
        if (player.upperBody.head.horns >= 20) {
            temp = 80;
        }
        //Vala dodgy bitch!
        if (monster.short == "Vala") {
            temp = 20;
        }
        //Account for monster speed - up to -50%.
        temp -= monster.spe / 2;
        //Account for player.stats.speed - up to +50%
        temp += player.stats.spe / 2;
        //Hit & calculation
        if (temp >= rand(100)) {
            let horns: number = player.upperBody.head.horns;
            if (player.upperBody.head.horns > 40) player.upperBody.head.horns = 40;
            //normal
            if (rand(4) > 0) {
                MainScreen.text("You lower your head and charge, skewering " + monster.a + monster.short + " on one of your bullhorns!  ");
                //As normal attack + horn length bonus
                damage = int(player.stats.str + horns * 2 - rand(monster.tou) - monster.armorDef);
            }
            //CRIT
            else {
                //doubles horn bonus damage
                damage = int(player.stats.str + horns * 4 - rand(monster.tou) - monster.armorDef);
                MainScreen.text("You lower your head and charge, slamming into " + monster.a + monster.short + " and burying both your horns into " + monster.pronoun2 + "!  ");
            }
            //Bonus damage for rut!
            if (player.inRut && monster.cockTotal() > 0) {
                MainScreen.text("The fury of your rut lent you strength, increasing the damage!  ");
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
                if (player.perks.has("HistoryFighter")) damage *= 1.1;
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
        //Victory ORRRRR enemy turn.
        if (monster.HP > 0 && monster.lust < 100) enemyAI();
        else {
            if (monster.HP <= 0) doNext(endHpVictory);
            if (monster.lust >= 100) doNext(endLustVictory);
        }
    }
    //Player sting attack
    public playerStinger(): void {
        MainScreen.clearText();
        //Keep logic sane if this attack brings victory
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        if (player.lowerBody.tailVenom < 33) {
            MainScreen.text("You do not have enough venom to sting right now!");
            doNext(physicalSpecials);
            return;
        }
        //Worms are immune!
        if (monster.short == "worms") {
            MainScreen.text("Taking advantage of your new natural weapons, you quickly thrust your stinger at the freak of nature. Sensing impending danger, the creature willingly drops its cohesion, causing the mass of worms to fall to the ground with a sick, wet 'thud', leaving you to stab only at air.\n\n");
            enemyAI();
            return;
        }
        //Determine if dodged!
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            enemyAI();
            return;
        }
        if (monster.spe - player.stats.spe > 0 && int(Math.random() * (((monster.spe - player.stats.spe) / 4) + 80)) > 80) {
            if (monster.spe - player.stats.spe < 8) MainScreen.text(monster.capitalA + monster.short + " narrowly avoids your stinger!\n\n");
            if (monster.spe - player.stats.spe >= 8 && monster.spe - player.stats.spe < 20) MainScreen.text(monster.capitalA + monster.short + " dodges your stinger with superior quickness!\n\n");
            if (monster.spe - player.stats.spe >= 20) MainScreen.text(monster.capitalA + monster.short + " deftly avoids your slow attempts to sting " + monster.pronoun2 + ".\n\n");
            enemyAI();
            return;
        }
        //determine if avoided with armor.
        if (monster.armorDef - player.level >= 10 && rand(4) > 0) {
            MainScreen.text("Despite your best efforts, your sting attack can't penetrate " + monster.a + monster.short + "'s defenses.\n\n");
            enemyAI();
            return;
        }
        //Sting successful!
        MainScreen.text("Searing pain lances through " + monster.a + monster.short + " as you manage to sting " + monster.pronoun2 + "!  ");
        if (monster.plural) MainScreen.text("You watch as " + monster.pronoun1 + " stagger back a step and nearly trip, flushing hotly.");
        else MainScreen.text("You watch as " + monster.pronoun1 + " staggers back a step and nearly trips, flushing hotly.");
        //Tabulate damage!
        let damage: number = 35 + rand(player.stats.lib / 10);
        //Level adds more damage up to a point (level 20)
        if (player.level < 10) damage += player.level * 3;
        else if (player.level < 20) damage += 30 + (player.level - 10) * 2;
        else damage += 50;
        monster.lust += monster.lustVuln * damage;
        if (monster.findStatusAffect(StatusAffects.lustvenom) < 0) monster.statusAffects.add(new StatusAffect("lustvenom", 0, 0, 0, 0)));
        /* IT used to paralyze 50% of the time, this is no longer the case!
        Paralise the other 50%!
        else {
            MainScreen.text("Searing pain lances through " + monster.a + monster.short + " as you manage to sting " + monster.pronoun2 + "!  ", false);
            if(monster.short == "demons") MainScreen.text("You watch as " + monster.pronoun1 + " stagger back a step and nearly trip, finding it hard to move as " + monster.pronoun1 + " are afflicted with your paralytic venom.  ", false);
            else MainScreen.text("You watch as " + monster.pronoun1 + " staggers back a step and nearly trips, finding it hard to move as " + monster.pronoun1 + " is afflicted with your paralytic venom.  ", false);
            if(monster.short == "demons") MainScreen.text("It appears that " + monster.a + monster.short + " are weaker and slower.", false);
            else MainScreen.text("It appears that " + monster.a + monster.short + " is weaker and slower.", false);
            monster.str -= (5+rand(player.stats.lib/5))
            monster.spe -= (5+rand(player.stats.lib/5))
            if(monster.str < 1) monster.str = 1;
            if(monster.spe < 1) monster.spe = 1;
        }*/
        //New line before monster attack
        MainScreen.text("\n\n");
        //Use tail mp
        player.lowerBody.tailVenom -= 25;
        //Kick back to main if no damage occured!
        if (monster.HP > 0 && monster.lust < 100) enemyAI();
        else doNext(endLustVictory);
    }

    public combatMiss(): boolean {
        return player.stats.spe - monster.spe > 0 && int(Math.random() * (((player.stats.spe - monster.spe) / 4) + 80)) > 80;

    }
    public combatEvade(): boolean {
        return monster.short != "Kiha" && player.perks.has("Evade") && rand(100) < 10;

    }
    public combatFlexibility(): boolean {
        return player.perks.has("Flexibility") && rand(100) < 6;

    }
    public combatMisdirect(): boolean {
        return player.perks.has("Misdirection") && rand(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit";
    }

    //DEAL DAMAGE
    public doDamage(damage: number, apply: boolean = true): number {
        if (player.perks.has("Sadist")) {
            damage *= 1.2;
            player.stats.lust += 3;
        }
        if (monster.HP - damage <= 0) {
            /* No monsters use this perk, so it's been removed for now
            if(monster.findPerk(PerkLib.LastStrike) >= 0) doNext(monster.perk(monster.findPerk(PerkLib.LastStrike)).value1);
            else doNext(endHpVictory);
            */
            doNext(endHpVictory);
        }

        // Uma's Massage Bonuses
        let statIndex: number = player.findStatusAffect(StatusAffects.UmasMassage);
        if (statIndex >= 0) {
            if (player.statusAffect(statIndex).value1 == UmasShop.MASSAGE_POWER) {
                damage *= player.statusAffect(statIndex).value2;
            }
        }

        damage = Math.round(damage);

        if (damage < 0) damage = 1;
        if (apply) monster.HP -= damage;
        //Isabella gets mad
        if (monster.short == "Isabella") {
            Flags.list[FlagEnum.ISABELLA_AFFECTION]--;
            //Keep in bounds
            if (Flags.list[FlagEnum.ISABELLA_AFFECTION] < 0) Flags.list[FlagEnum.ISABELLA_AFFECTION] = 0;
        }
        //Interrupt gigaflare if necessary.
        if (monster.statusAffects.has("Gigafire")) monster.addStatusValue(StatusAffects.Gigafire, 1, damage);
        //Keep shit in bounds.
        if (monster.HP < 0) monster.HP = 0;
        return damage;
    }

    public takeDamage(damage: number): number {
        return player.takeDamage(damage);
    }
    //ENEMYAI!
    public enemyAI(): void {
        monster.doAI();
    }
    public finishCombat(): void {
        let hpVictory: boolean = monster.HP < 1;
        if (hpVictory) {
            MainScreen.text("You defeat " + monster.a + monster.short + ".\n", true);
        } else {
            MainScreen.text("You smile as " + monster.a + monster.short + " collapses and begins masturbating feverishly.", true);
        }
        awardPlayer();
    }
    public dropItem(monster: Monster): void {
        if (monster.statusAffects.has("NoLoot")) {
            return;
        }
        let itype: ItemType = monster.dropLoot();
        if (monster.short == "tit-fucked Minotaur") {
            itype = consumables.MINOCUM;
        }
        if (monster instanceof Minotaur) {
            if (monster.weaponName == "axe") {
                if (rand(2) == 0) {
                    //50% breakage!
                    if (rand(2) == 0) {
                        itype = weapons.L__AXE;
                        if (player.tallness < 78) {
                            MainScreen.text("\nYou find a large axe on the minotaur, but it is too big for a person of your stature to comfortably carry.  ", false);
                            if (rand(2) == 0) itype = null;
                            else itype = consumables.SDELITE;
                        }
                        //Not too tall, dont rob of axe!
                        else plotFight = true;
                    }
                    else MainScreen.text("\nThe minotaur's axe appears to have been broken during the fight, rendering it useless.  ", false);
                }
                else itype = consumables.MINOBLO;
            }
        }
        if (monster instanceof BeeGirl) {
            //force honey drop if milked
            if (Flags.list[FlagEnum.FORCE_BEE_TO_PRODUCE_HONEY] == 1) {
                if (rand(2) == 0) itype = consumables.BEEHONY;
                else itype = consumables.PURHONY;
                Flags.list[FlagEnum.FORCE_BEE_TO_PRODUCE_HONEY] = 0;
            }
        }
        if (monster instanceof Jojo && monk > 4) {
            if (rand(2) == 0) itype = consumables.INCUBID;
            else {
                if (rand(2) == 0) itype = consumables.B__BOOK;
                else itype = consumables.SUCMILK;
            }
        }
        if (monster instanceof Harpy || monster instanceof Sophie) {
            if (rand(10) == 0) itype = armors.W_ROBES;
            else if (rand(3) == 0 && player.perks.has("LuststickAdapted")) itype = consumables.LUSTSTK;
            else itype = consumables.GLDSEED;
        }
        //Chance of armor if at level 1 pierce fetish
        if (!plotFight && !(monster instanceof Ember) && !(monster instanceof Kiha) && !(monster instanceof Hel) && !(monster instanceof Isabella)
            && Flags.list[FlagEnum.PC_FETISH] == 1 && rand(10) == 0 && !player.inventory.items.has(armors.SEDUCTA, 1) && !ceraphFollowerScene.ceraphIsFollower()) {
            itype = armors.SEDUCTA;
        }

        if (!plotFight && rand(200) == 0 && player.level >= 7) itype = consumables.BROBREW;
        if (!plotFight && rand(200) == 0 && player.level >= 7) itype = consumables.BIMBOLQ;
        //Chance of eggs if Easter!
        if (!plotFight && rand(6) == 0 && isEaster()) {
            temp = rand(13);
            if (temp == 0) itype = consumables.BROWNEG;
            if (temp == 1) itype = consumables.L_BRNEG;
            if (temp == 2) itype = consumables.PURPLEG;
            if (temp == 3) itype = consumables.L_PRPEG;
            if (temp == 4) itype = consumables.BLUEEGG;
            if (temp == 5) itype = consumables.L_BLUEG;
            if (temp == 6) itype = consumables.PINKEGG;
            if (temp == 7) itype = consumables.NPNKEGG;
            if (temp == 8) itype = consumables.L_PNKEG;
            if (temp == 9) itype = consumables.L_WHTEG;
            if (temp == 10) itype = consumables.WHITEEG;
            if (temp == 11) itype = consumables.BLACKEG;
            if (temp == 12) itype = consumables.L_BLKEG;
        }
        //Bonus loot overrides others
        if (Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID] != "") {
            itype = ItemType.lookupItem(Flags.list[FlagEnum.BONUS_ITEM_AFTER_COMBAT_ID]);
        }
        monster.handleAwardItemText(itype); //Each monster can now override the default award text
        if (itype != null) {
            if (inDungeon)
                inventory.takeItem(itype, playerMenu);
            else inventory.takeItem(itype, camp.returnToCampUseOneHour);
        }
    }
    public awardPlayer(): void {
        if (player.countCockSocks("gilded") > 0) {
            //trace( "awardPlayer found MidasCock. Gems bumped from: " + monster.gems );

            let bonusGems: number = monster.gems * 0.15 + 5 * player.countCockSocks("gilded"); // int so AS rounds to whole numbers
            monster.gems += bonusGems;
            //trace( "to: " + monster.gems )
        }
        monster.handleAwardText(); //Each monster can now override the default award text
        if (!inDungeon && !inRoomedDungeon)
            doNext(camp.returnToCampUseOneHour);
        else doNext(playerMenu);
        dropItem(monster);
        inCombat = false;
        player.stats.gems += monster.gems;
        player.XP += monster.XP;
    }

    //Clear statuses
    public clearStatuses(visibility: boolean): void {
        player.clearStatuses(visibility);
    }
    //Update combat status effects
    private combatStatusesUpdate(): void {
        //old outfit used for fetish cultists
        let oldOutfit: string = "";
        let changed: boolean = false;
        //Reset menuloc
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        hideUpDown();
        if (player.statusAffects.has("Sealed")) {
            //Countdown and remove as necessary
            if (player.statusAffects.get("Sealed").value1 > 0) {
                player.addStatusValue(StatusAffects.Sealed, 1, -1);
                if (player.statusAffects.get("Sealed").value1 <= 0) player.statusAffects.remove("Sealed");
                else MainScreen.text("<b>One of your combat abilities is currently sealed by magic!</b>\n\n");
            }
        }
        monster.combatRoundUpdate();
        //[Silence warning]
        if (player.statusAffects.has("ThroatPunch")) {
            player.addStatusValue(StatusAffects.ThroatPunch, 1, -1);
            if (player.statusAffects.get("ThroatPunch").value1 >= 0) MainScreen.text("Thanks to Isabella's wind-pipe crushing hit, you're having trouble breathing and are <b>unable to cast spells as a consequence.</b>\n\n", false);
            else {
                MainScreen.text("Your wind-pipe recovers from Isabella's brutal hit.  You'll be able to focus to cast spells again!\n\n", false);
                player.statusAffects.remove("ThroatPunch");
            }
        }
        if (player.statusAffects.has("GooArmorSilence")) {
            if (player.statusAffects.get("GooArmorSilence").value1 >= 2 || rand(20) + 1 + player.stats.str / 10 >= 15) {
                //if passing str check, output at beginning of turn
                MainScreen.text("<b>The sticky slop covering your mouth pulls away reluctantly, taking more force than you would expect, but you've managed to free your mouth enough to speak!</b>\n\n");
                player.statusAffects.remove("GooArmorSilence");
            }
            else {
                MainScreen.text("<b>Your mouth is obstructed by sticky goo!  You are silenced!</b>\n\n", false);
                player.addStatusValue(StatusAffects.GooArmorSilence, 1, 1);
            }
        }
        if (player.statusAffects.has("LustStones")) {
            //[When witches activate the stones for goo bodies]
            if (player.lowerBody.isGoo()) {
                MainScreen.text("<b>The stones start vibrating again, making your liquid body ripple with pleasure.  The witches snicker at the odd sight you are right now.\n\n</b>");
            }
            //[When witches activate the stones for solid bodies]
            else {
                MainScreen.text("<b>The smooth stones start vibrating again, sending another wave of teasing bliss throughout your body.  The witches snicker at you as you try to withstand their attack.\n\n</b>");
            }
            dynStats("lus", player.statusAffects.get("LustStones").value1 + 4);
        }
        if (player.statusAffects.has("WebSilence")) {
            if (player.statusAffects.get("WebSilence").value1 >= 2 || rand(20) + 1 + player.stats.str / 10 >= 15) {
                MainScreen.text("You rip off the webbing that covers your mouth with a cry of pain, finally able to breathe normally again!  Now you can cast spells!\n\n", false);
                player.statusAffects.remove("WebSilence");
            }
            else {
                MainScreen.text("<b>Your mouth and nose are obstructed by sticky webbing, making it difficult to breathe and impossible to focus on casting spells.  You try to pull it off, but it just won't work!</b>\n\n", false);
                player.addStatusValue(StatusAffects.WebSilence, 1, 1);
            }
        }
        if (player.statusAffects.has("HolliConstrict")) {
            MainScreen.text("<b>You're tangled up in Holli's verdant limbs!  All you can do is try to struggle free...</b>\n\n");
        }
        if (player.statusAffects.has("UBERWEB"))
            MainScreen.text("<b>You're pinned under a pile of webbing!  You should probably struggle out of it and get back in the fight!</b>\n\n", false);
        if (player.statusAffects.has("Blind") && monster.findStatusAffect(StatusAffects.Sandstorm) < 0) {
            if (player.statusAffects.has("SheilaOil")) {
                if (player.statusAffects.get("Blind").value1 <= 0) {
                    MainScreen.text("<b>You finish wiping the demon's tainted oils away from your eyes; though the smell lingers, you can at least see.  Sheila actually seems happy to once again be under your gaze.</b>\n\n", false);
                    player.statusAffects.remove("Blind");
                }
                else {
                    MainScreen.text("<b>You scrub at the oily secretion with the back of your hand and wipe some of it away, but only smear the remainder out more thinly.  You can hear the demon giggling at your discomfort.</b>\n\n", false);
                    player.addStatusValue(StatusAffects.Blind, 1, -1);
                }
            }
            else {
                //Remove blind if countdown to 0
                if (player.statusAffects.get("Blind").value1 == 0) {
                    player.statusAffects.remove("Blind");
                    //Alert PC that blind is gone if no more stacks are there.
                    if (!player.statusAffects.has("Blind")) {
                        MainScreen.text("<b>Your eyes have cleared and you are no longer blind!</b>\n\n", false);
                    }
                    else MainScreen.text("<b>You are blind, and many physical attacks will miss much more often.</b>\n\n", false);
                }
                else {
                    player.addStatusValue(StatusAffects.Blind, 1, -1);
                    MainScreen.text("<b>You are blind, and many physical attacks will miss much more often.</b>\n\n", false);
                }
            }
        }
        //Basilisk compulsion
        if (player.statusAffects.has("BasiliskCompulsion")) {
            Basilisk.basiliskSpeed(player, 15);
            //Continuing effect text: 
            MainScreen.text("<b>You still feel the spell of those grey eyes, making your movements slow and difficult, the remembered words tempting you to look into its eyes again. You need to finish this fight as fast as your heavy limbs will allow.</b>\n\n", false);
        }
        if (player.statusAffects.has("IzmaBleed")) {
            if (player.statusAffects.get("IzmaBleed").value1 <= 0) {
                player.statusAffects.remove("IzmaBleed");
                MainScreen.text("<b>You sigh with relief; your bleeding has slowed considerably.</b>\n\n", false);
            }
            //Bleed effect:
            else {
                let bleed: number = (2 + rand(4)) / 100;
                bleed *= player.HP;
                bleed = takeDamage(bleed);
                MainScreen.text("<b>You gasp and wince in pain, feeling fresh blood pump from your wounds. (" + bleed + ")</b>\n\n", false);
            }
        }
        if (player.statusAffects.has("AcidSlap")) {
            let slap: number = 3 + (maxHP() * 0.02);
            MainScreen.text("<b>Your muscles twitch in agony as the acid keeps burning you. (" + slap + ")</b>\n\n", false);
        }
        if (player.perks.has("ArousingAura") && monster.lustVuln > 0 && player.stats.cor >= 70) {
            if (monster.lust < 50) MainScreen.text("Your aura seeps into " + monster.a + monster.short + " but does not have any visible effects just yet.\n\n", false);
            else if (monster.lust < 60) {
                if (!monster.plural) MainScreen.text(monster.capitalA + monster.short + " starts to squirm a little from your unholy presence.\n\n", false);
                else MainScreen.text(monster.capitalA + monster.short + " start to squirm a little from your unholy presence.\n\n", false);
            }
            else if (monster.lust < 75) MainScreen.text("Your arousing aura seems to be visibly affecting " + monster.a + monster.short + ", making " + monster.pronoun2 + " squirm uncomfortably.\n\n", false);
            else if (monster.lust < 85) {
                if (!monster.plural) MainScreen.text(monster.capitalA + monster.short + "'s skin colors red as " + monster.pronoun1 + " inadvertantly basks in your presence.\n\n", false);
                else MainScreen.text(monster.capitalA + monster.short + "' skin colors red as " + monster.pronoun1 + " inadvertantly bask in your presence.\n\n", false);
            }
            else {
                if (!monster.plural) MainScreen.text("The effects of your aura are quite pronounced on " + monster.a + monster.short + " as " + monster.pronoun1 + " begins to shake and steal glances at your body.\n\n", false);
                else MainScreen.text("The effects of your aura are quite pronounced on " + monster.a + monster.short + " as " + monster.pronoun1 + " begin to shake and steal glances at your body.\n\n", false);
            }
            monster.lust += monster.lustVuln * (2 + rand(4));
        }
        if (player.statusAffects.has("Bound") && Flags.list[FlagEnum.PC_FETISH] >= 2) {
            MainScreen.text("The feel of tight leather completely immobilizing you turns you on more and more.  Would it be so bad to just wait and let her play with you like this?\n\n", false);
            player.stats.lust += 3;
        }
        if (player.statusAffects.has("GooArmorBind")) {
            if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
                MainScreen.text("The feel of the all-encapsulating goo immobilizing your helpless body turns you on more and more.  Maybe you should just wait for it to completely immobilize you and have you at its mercy.\n\n");
                player.stats.lust += 3;
            }
            else MainScreen.text("You're utterly immobilized by the goo flowing around you.  You'll have to struggle free!\n\n");
        }
        if (player.statusAffects.has("HarpyBind")) {
            if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
                MainScreen.text("The harpies are holding you down and restraining you, making the struggle all the sweeter!\n\n");
                player.stats.lust += 3;
            }
            else MainScreen.text("You're restrained by the harpies so that they can beat on you with impunity.  You'll need to struggle to break free!\n\n");
        }
        if (player.statusAffects.has("NagaBind") && Flags.list[FlagEnum.PC_FETISH] >= 2) {
            MainScreen.text("Coiled tightly by the naga and utterly immobilized, you can't help but become aroused thanks to your bondage fetish.\n\n", false);
            player.stats.lust += 5;
        }
        if (player.statusAffects.has("TentacleBind")) {
            MainScreen.text("You are firmly trapped in the tentacle's coils.  <b>The only thing you can try to do is struggle free!</b>\n\n", false);
            if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
                MainScreen.text("Wrapped tightly in the tentacles, you find it hard to resist becoming more and more aroused...\n\n", false);
                player.stats.lust += 3;
            }
        }
        if (player.statusAffects.has("DriderKiss")) {
            //(VENOM OVER TIME: WEAK)
            if (player.statusAffects.get("DriderKiss").value1 == 0) {
                MainScreen.text("Your heart hammers a little faster as a vision of the drider's nude, exotic body on top of you assails you.  It'll only get worse if she kisses you again...\n\n", false);
                player.stats.lust += 8;
            }
            //(VENOM OVER TIME: MEDIUM)
            else if (player.statusAffects.get("DriderKiss").value1 == 1) {
                MainScreen.text("You shudder and moan, nearly touching yourself as your ", false);
                if (player.gender > 0) MainScreen.text("loins tingle and leak, hungry for the drider's every touch.", false);
                else MainScreen.text("asshole tingles and twitches, aching to be penetrated.", false);
                MainScreen.text("  Gods, her venom is getting you so hot.  You've got to end this quickly!\n\n", false);
                player.stats.lust += 15;
            }
            //(VENOM OVER TIME: MAX)
            else {
                MainScreen.text("You have to keep pulling your hands away from your crotch - it's too tempting to masturbate here on the spot and beg the drider for more of her sloppy kisses.  Every second that passes, your arousal grows higher.  If you don't end this fast, you don't think you'll be able to resist much longer.  You're too turned on... too horny... too weak-willed to resist much longer...\n\n", false);
                player.stats.lust += 25;
            }
        }
        //Harpy lip gloss
        if (player.lowerBody.cockSpot.hasCock() && player.statusAffects.has("Luststick") && (monster.short == "harpy" || monster.short == "Sophie")) {
            //Chance to cleanse!
            if (player.perks.has("Medicine") && rand(100) <= 14) {
                MainScreen.text("You manage to cleanse the harpy lip-gloss from your system with your knowledge of medicine!\n\n", false);
                player.statusAffects.remove("Luststick");
            }
            else if (rand(5) == 0) {
                if (rand(2) == 0) MainScreen.text("A fantasy springs up from nowhere, dominating your thoughts for a few moments.  In it, you're lying down in a soft nest.  Gold-rimmed lips are noisily slurping around your " + player.CockDescriptor.describeCock(player, 0) + ", smearing it with her messy aphrodisiac until you're completely coated in it.  She looks up at you knowingly as the two of you get ready to breed the night away...\n\n", false);
                else MainScreen.text("An idle daydream flutters into your mind.  In it, you're fucking a harpy's asshole, clutching tightly to her wide, feathery flanks as the tight ring of her pucker massages your " + player.CockDescriptor.describeCock(player, 0) + ".  She moans and turns around to kiss you on the lips, ensuring your hardness.  Before long her feverish grunts of pleasure intensify, and you feel the egg she's birthing squeezing against you through her internal walls...\n\n", false);
                player.stats.lust += 20;
            }
        }
        if (player.statusAffects.has("StoneLust")) {
            if (player.lowerBody.vaginaSpot.count() > 0) {
                if (player.stats.lust < 40) MainScreen.text("You squirm as the smooth stone orb vibrates within you.\n\n", false);
                if (player.stats.lust >= 40 && player.stats.lust < 70) MainScreen.text("You involuntarily clench around the magical stone in your twat, in response to the constant erotic vibrations.\n\n", false);
                if (player.stats.lust >= 70 && player.stats.lust < 85) MainScreen.text("You stagger in surprise as a particularly pleasant burst of vibrations erupt from the smooth stone sphere in your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".\n\n", false);
                if (player.stats.lust >= 85) MainScreen.text("The magical orb inside of you is making it VERY difficult to keep your focus on combat, white-hot lust suffusing your body with each new motion.\n\n", false);
            }
            else {
                MainScreen.text("The orb continues vibrating in your ass, doing its best to arouse you.\n\n", false);
            }
            dynStats("lus", 7 + int(player.stats.sens) / 10);
        }
        if (player.statusAffects.has("KissOfDeath")) {
            //Effect 
            MainScreen.text("Your lips burn with an unexpected flash of heat.  They sting and burn with unholy energies as a puff of ectoplasmic gas escapes your lips.  That puff must be a part of your soul!  It darts through the air to the succubus, who slurps it down like a delicious snack.  You feel feverishly hot and exhausted...\n\n", false);
            player.stats.lust += 5;
            takeDamage(15);
        }
        if (player.statusAffects.has("DemonSeed")) {
            MainScreen.text("You feel something shift inside you, making you feel warm.  Finding the desire to fight this... hunk gets harder and harder.\n\n", false);
            dynStats("lus", (player.statusAffects.get("DemonSeed").value1 + int(player.stats.sens / 30) + int(player.stats.lib / 30) + int(player.stats.cor / 30)));
        }
        if (player.inHeat && player.lowerBody.vaginaSpot.count() > 0 && monster.totalCocks() > 0) {
            dynStats("lus", (rand(player.stats.lib / 5) + 3 + rand(5)));
            MainScreen.text("Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " clenches with an instinctual desire to be touched and filled.  ", false);
            MainScreen.text("If you don't end this quickly you'll give in to your heat.\n\n", false);
        }
        if (player.inRut && player.lowerBody.cockSpot.count() > 0 && monster.hasVagina()) {
            dynStats("lus", (rand(player.stats.lib / 5) + 3 + rand(5)));
            if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("Each of y", false);
            else MainScreen.text("Y", false);
            if (monster.plural) MainScreen.text("our " + player.CockDescriptor.describeMultiCockShort(player) + " dribbles pre-cum as you think about plowing " + monster.a + monster.short + " right here and now, fucking " + monster.pronoun3 + " " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s until they're totally fertilized and pregnant.\n\n", false);
            else MainScreen.text("our " + player.CockDescriptor.describeMultiCockShort(player) + " dribbles pre-cum as you think about plowing " + monster.a + monster.short + " right here and now, fucking " + monster.pronoun3 + " " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " until it's totally fertilized and pregnant.\n\n", false);
        }
        if (player.statusAffects.has("NagaVenom")) {
            //Chance to cleanse!
            if (player.perks.has("Medicine") && rand(100) <= 14) {
                MainScreen.text("You manage to cleanse the naga venom from your system with your knowledge of medicine!\n\n", false);
                player.stats.spe += player.statusAffects.get("NagaVenom").value1;
                mainView.statsView.showStatUp('spe');
                // speUp.visible = true;
                // speDown.visible = false;
                player.statusAffects.remove("NagaVenom");
            }
            else if (player.stats.spe > 3) {
                player.addStatusValue(StatusAffects.NagaVenom, 1, 2);
                //stats(0,0,-2,0,0,0,0,0);
                player.stats.spe -= 2;
            }
            else takeDamage(5);
            MainScreen.text("You wince in pain and try to collect yourself, the naga's venom still plaguing you.\n\n", false);
            takeDamage(2);
        }
        else if (player.statusAffects.has("TemporaryHeat")) {
            //Chance to cleanse!
            if (player.perks.has("Medicine") && rand(100) <= 14) {
                MainScreen.text("You manage to cleanse the heat and rut drug from your system with your knowledge of medicine!\n\n", false);
                player.statusAffects.remove("TemporaryHeat");
            }
            else {
                dynStats("lus", (player.stats.lib / 12 + 5 + rand(5)));
                if (player.lowerBody.vaginaSpot.hasVagina()) {
                    MainScreen.text("Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " clenches with an instinctual desire to be touched and filled.  ", false);
                }
                else if (player.lowerBody.cockSpot.count() > 0) {
                    MainScreen.text("Your " + player.CockDescriptor.describeCock(player, 0) + " pulses and twitches, overwhelmed with the desire to breed.  ", false);
                }
                if (player.gender == 0) {
                    MainScreen.text("You feel a tingle in your " + ButtDescriptor.describeButthole(player) + ", and the need to touch and fill it nearly overwhelms you.  ", false);
                }
                MainScreen.text("If you don't finish this soon you'll give in to this potent drug!\n\n", false);
            }
        }
        //Poison
        if (player.statusAffects.has("Poison")) {
            //Chance to cleanse!
            if (player.perks.has("Medicine") && rand(100) <= 14) {
                MainScreen.text("You manage to cleanse the poison from your system with your knowledge of medicine!\n\n", false);
                player.statusAffects.remove("Poison");
            }
            else {
                MainScreen.text("The poison continues to work on your body, wracking you with pain!\n\n", false);
                takeDamage(8 + rand(maxHP() / 20));
            }
        }
        //Bondage straps + bondage fetish
        if (Flags.list[FlagEnum.PC_FETISH] >= 2 && player.inventory.armor.displayName == "barely-decent bondage straps") {
            MainScreen.text("The feeling of the tight, leather straps holding tightly to your body while exposing so much of it turns you on a little bit more.\n\n", false);
            player.stats.lust += 2;
        }
        regeneration(true);
        if (player.stats.lust >= 100) doNext(endLustLoss);
        if (player.HP <= 0) doNext(endHpLoss);
    }

    public regeneration(combat: boolean = true): void {
        let healingPercent: number = 0;
        if (combat) {
            //Regeneration
            healingPercent = 0;
            if (player.perks.has("Regeneration")) healingPercent += 1;
            if (player.perks.has("Regeneration2")) healingPercent += 2;
            if (player.inventory.armor.displayName == "skimpy nurse's outfit") healingPercent += 2;
            if (player.inventory.armor.displayName == "goo armor") healingPercent += 2;
            if (player.perks.has("LustyRegeneration")) healingPercent += 1;
            if (healingPercent > 5) healingPercent = 5;
            HPChange(Math.round(maxHP() * healingPercent / 100), false);
        }
        else {
            //Regeneration
            healingPercent = 0;
            if (player.perks.has("Regeneration")) healingPercent += 2;
            if (player.perks.has("Regeneration2")) healingPercent += 4;
            if (player.inventory.armor.displayName == "skimpy nurse's outfit") healingPercent += 2;
            if (player.inventory.armor.displayName == "goo armor") healingPercent += 3;
            if (player.perks.has("LustyRegeneration")) healingPercent += 2;
            if (healingPercent > 10) healingPercent = 10;
            HPChange(Math.round(maxHP() * healingPercent / 100), false);
        }
    }
    public startCombat(monster_: Monster, plotFight_: boolean = false): void {
        plotFight = plotFight_;
        mainView.hideMenuButton(MainView.MENU_DATA);
        mainView.hideMenuButton(MainView.MENU_APPEARANCE);
        mainView.hideMenuButton(MainView.MENU_LEVEL);
        mainView.hideMenuButton(MainView.MENU_PERKS);
        //Flag the game as being "in combat"
        inCombat = true;
        monster = monster_;
        if (monster.short == "Ember") {
            monster.pronoun1 = emberScene.emberMF("he", "she");
            monster.pronoun2 = emberScene.emberMF("him", "her");
            monster.pronoun3 = emberScene.emberMF("his", "her");
        }
        //Reduce enemy def if player has precision!
        if (player.perks.has("Precision") && player.stats.int >= 25) {
            if (monster.armorDef <= 10) monster.armorDef = 0;
            else monster.armorDef -= 10;
        }
        doNext(playerMenu);
    }
    public startCombatImmediate(monster: Monster, _plotFight: boolean): void {
        startCombat(monster, _plotFight);
    }
    public display(): void {
        if (!monster.checkCalled) {
            MainScreen.text("<B>/!\\BUG! Monster.checkMonster() is not called! Calling it now...</B>\n");
            monster.checkMonster();
        }
        if (monster.checkError != "") {
            MainScreen.text("<B>/!\\BUG! Monster is not correctly initialized! <u>" +
                monster.checkError + "</u></b>\n");
        }
        let percent: string = "";
        let math: number = monster.HPRatio();
        percent = "(<b>" + String(int(math * 1000) / 10) + "% HP</b>)";

        //trace("trying to show monster image!");
        if (monster.imageName != "") {
            let monsterName: string = "monster-" + monster.imageName;
            //trace("Monster name = ", monsterName);
            MainScreen.text(images.showImage(monsterName), false, false);
        }
        //	if(gameState == 2) MainScreen.text("<b>You are grappling with:\n</b>", false);
        //	else
        MainScreen.text("<b>You are fighting ", false);
        MainScreen.text(monster.a + monster.short + ":</b> (Level: " + monster.level + ")\n");
        if (player.statusAffects.has("Blind")) MainScreen.text("It's impossible to see anything!\n");
        else {
            MainScreen.text(monster.long + "\n", false);
            //Bonus sand trap stuff
            if (monster.statusAffects.has("Level")) {
                temp = monster.statusAffects.get("Level").value1;
                //[(new PG for PC height levels)PC level 4: 
                MainScreen.text("\n");
                if (temp == 4) MainScreen.text("You are right at the edge of its pit.  If you can just manage to keep your footing here, you'll be safe.");
                else if (temp == 3) MainScreen.text("The sand sinking beneath your feet has carried you almost halfway into the creature's pit.");
                else MainScreen.text("The dunes tower above you and the hissing of sand fills your ears.  <b>The leering sandtrap is almost on top of you!</b>");
                //no new PG)
                MainScreen.text("  You could try attacking it with your " + player.weaponName + ", but that will carry you straight to the bottom.  Alternately, you could try to tease it or hit it at range, or wait and maintain your footing until you can clamber up higher.");
                MainScreen.text("\n");
            }
            if (monster.plural) {
                if (math >= 1) MainScreen.text("You see " + monster.pronoun1 + " are in perfect health.", false);
                else if (math > .75) MainScreen.text("You see " + monster.pronoun1 + " aren't very hurt.", false);
                else if (math > .5) MainScreen.text("You see " + monster.pronoun1 + " are slightly wounded.", false);
                else if (math > .25) MainScreen.text("You see " + monster.pronoun1 + " are seriously hurt.", false);
                else MainScreen.text("You see " + monster.pronoun1 + " are unsteady and close to death.", false);
            }
            else {
                if (math >= 1) MainScreen.text("You see " + monster.pronoun1 + " is in perfect health.", false);
                else if (math > .75) MainScreen.text("You see " + monster.pronoun1 + " isn't very hurt.", false);
                else if (math > .5) MainScreen.text("You see " + monster.pronoun1 + " is slightly wounded.", false);
                else if (math > .25) MainScreen.text("You see " + monster.pronoun1 + " is seriously hurt.", false);
                else MainScreen.text("You see " + monster.pronoun1 + " is unsteady and close to death.", false);
            }
            MainScreen.text("  " + percent + "\n", false);
            showMonsterLust();
        }
        if (debug) {
            MainScreen.text("\n----------------------------\n");
            MainScreen.text(monster.generateDebugDescription(), false);
        }
    }
    public showMonsterLust(): void {
        //Entrapped
        if (monster.statusAffects.has("Constricted")) {
            MainScreen.text(monster.capitalA + monster.short + " is currently wrapped up in your tail-coils!  ", false);
        }
        //Venom stuff!
        if (monster.statusAffects.has("NagaVenom")) {
            if (monster.plural) {
                if (monster.statusAffects.get("NagaVenom").value1 <= 1) {
                    MainScreen.text("You notice " + monster.pronoun1 + " are beginning to show signs of weakening, but there still appears to be plenty of fight left in " + monster.pronoun2 + ".  ", false);
                }
                else {
                    MainScreen.text("You notice " + monster.pronoun1 + " are obviously affected by your venom, " + monster.pronoun3 + " movements become unsure, and " + monster.pronoun3 + " balance begins to fade. Sweat begins to roll on " + monster.pronoun3 + " skin. You wager " + monster.pronoun1 + " are probably beginning to regret provoking you.  ", false);
                }
            }
            //Not plural
            else {
                if (monster.statusAffects.get("NagaVenom").value1 <= 1) {
                    MainScreen.text("You notice " + monster.pronoun1 + " is beginning to show signs of weakening, but there still appears to be plenty of fight left in " + monster.pronoun2 + ".  ", false);
                }
                else {
                    MainScreen.text("You notice " + monster.pronoun1 + " is obviously affected by your venom, " + monster.pronoun3 + " movements become unsure, and " + monster.pronoun3 + " balance begins to fade. Sweat is beginning to roll on " + monster.pronoun3 + " skin. You wager " + monster.pronoun1 + " is probably beginning to regret provoking you.  ", false);
                }
            }

            monster.spe -= monster.statusAffects.get("NagaVenom").value1;
            monster.str -= monster.statusAffects.get("NagaVenom").value1;
            if (monster.spe < 1) monster.spe = 1;
            if (monster.str < 1) monster.str = 1;
        }
        if (monster.short == "harpy") {
            //(Enemy slightly aroused) 
            if (monster.lust >= 45 && monster.lust < 70) MainScreen.text("The harpy's actions are becoming more and more erratic as she runs her mad-looking eyes over your body, her chest jiggling, clearly aroused.  ", false);
            //(Enemy moderately aroused) 
            if (monster.lust >= 70 && monster.lust < 90) MainScreen.text("She stops flapping quite so frantically and instead gently sways from side to side, showing her soft, feathery body to you, even twirling and raising her tail feathers, giving you a glimpse of her plush pussy, glistening with fluids.", false);
            //(Enemy dangerously aroused) 
            if (monster.lust >= 90) MainScreen.text("You can see her thighs coated with clear fluids, the feathers matted and sticky as she struggles to contain her lust.", false);
        }
        else if (monster instanceof Clara) {
            //Clara is becoming aroused
            if (monster.lust <= 40) { }
            else if (monster.lust <= 65) MainScreen.text("The anger in her motions is weakening.");
            //Clara is somewhat aroused
            else if (monster.lust <= 75) MainScreen.text("Clara seems to be becoming more aroused than angry now.");
            //Clara is very aroused
            else if (monster.lust <= 85) MainScreen.text("Clara is breathing heavily now, the signs of her arousal becoming quite visible now.");
            //Clara is about to give in
            else MainScreen.text("It looks like Clara is on the verge of having her anger overwhelmed by her lusts.");
        }
        //{Bonus Lust Descripts}
        else if (monster.short == "Minerva") {
            if (monster.lust < 40) { }
            //(40)
            else if (monster.lust < 60) MainScreen.text("Letting out a groan Minerva shakes her head, focusing on the fight at hand.  The bulge in her short is getting larger, but the siren ignores her growing hard-on and continues fighting.  ");
            //(60) 
            else if (monster.lust < 80) MainScreen.text("Tentacles are squirming out from the crotch of her shorts as the throbbing bulge grows bigger and bigger, becoming harder and harder... for Minerva to ignore.  A damp spot has formed just below the bulge.  ");
            //(80)
            else MainScreen.text("She's holding onto her weapon for support as her face is flushed and pain-stricken.  Her tiny, short shorts are painfully holding back her quaking bulge, making the back of the fabric act like a thong as they ride up her ass and struggle against her cock.  Her cock-tentacles are lashing out in every direction.  The dampness has grown and is leaking down her leg.");
        }
        else if (monster.short == "Cum Witch") {
            //{Bonus Lust Desc (40+)}
            if (monster.lust < 40) { }
            else if (monster.lust < 50) MainScreen.text("Her nipples are hard, and poke two visible tents into the robe draped across her mountainous melons.  ");
            //{Bonus Lust Desc (50-75)}
            else if (monster.lust < 75) MainScreen.text("Wobbling dangerously, you can see her semi-hard shaft rustling the fabric as she moves, evidence of her growing needs.  ");
            //{75+}
            if (monster.lust >= 75) MainScreen.text("Swelling obscenely, the Cum Witch's thick cock stands out hard and proud, its bulbous tip rustling through the folds of her fabric as she moves and leaving dark smears in its wake.  ");
            //(85+}
            if (monster.lust >= 85) MainScreen.text("Every time she takes a step, those dark patches seem to double in size.  ");
            //{93+}
            if (monster.lust >= 93) MainScreen.text("There's no doubt about it, the Cum Witch is dripping with pre-cum and so close to caving in.  Hell, the lower half of her robes are slowly becoming a seed-stained mess.  ");
            //{Bonus Lust Desc (60+)}
            if (monster.lust >= 70) MainScreen.text("She keeps licking her lips whenever she has a moment, and she seems to be breathing awfully hard.  ");
        }
        else if (monster.short == "Kelt") {
            //Kelt Lust Levels
            //(sub 50)
            if (monster.lust < 50) MainScreen.text("Kelt actually seems to be turned off for once in his miserable life.  His maleness is fairly flaccid and droopy.  ");
            //(sub 60)
            else if (monster.lust < 60) MainScreen.text("Kelt's gotten a little stiff down below, but he still seems focused on taking you down.  ");
            //(sub 70)
            else if (monster.lust < 70) MainScreen.text("Kelt's member has grown to its full size and even flared a little at the tip.  It bobs and sways with every movement he makes, reminding him how aroused you get him.  ");
            //(sub 80)
            else if (monster.lust < 80) MainScreen.text("Kelt is unabashedly aroused at this point.  His skin is flushed, his manhood is erect, and a thin bead of pre has begun to bead underneath.  ");
            //(sub 90)
            else if (monster.lust < 90) MainScreen.text("Kelt seems to be having trouble focusing.  He keeps pausing and flexing his muscles, slapping his cock against his belly and moaning when it smears his pre-cum over his equine underside.  ");
            //(sub 100) 
            else MainScreen.text("There can be no doubt that you're having quite the effect on Kelt.  He keeps fidgeting, dripping pre-cum everywhere as he tries to keep up the facade of fighting you.  His maleness is continually twitching and bobbing, dripping messily.  He's so close to giving in...");
        }
        else if (monster.short == "green slime") {
            if (monster.lust >= 45 && monster.lust < 65) MainScreen.text("A lump begins to form at the base of the figure's torso, where its crotch would be.  ", false);
            if (monster.lust >= 65 && monster.lust < 85) MainScreen.text("A distinct lump pulses at the base of the slime's torso, as if something inside the creature were trying to escape.  ", false);
            if (monster.lust >= 85 && monster.lust < 93) MainScreen.text("A long, thick pillar like a small arm protrudes from the base of the slime's torso.  ", false);
            if (monster.lust >= 93) MainScreen.text("A long, thick pillar like a small arm protrudes from the base of the slime's torso.  Its entire body pulses, and it is clearly beginning to lose its cohesion.  ", false);
        }
        else if (monster.short == "Sirius, a naga hypnotist") {
            if (monster.lust < 40) { }
            else if (monster.lust >= 40) MainScreen.text("You can see the tip of his reptilian member poking out of its protective slit. ");
            else if (monster.lust >= 60) MainScreen.text("His cock is now completely exposed and half-erect, yet somehow he still stays focused on your eyes and his face is inexpressive.  ");
            else MainScreen.text("His cock is throbbing hard, you don't think it will take much longer for him to pop.   Yet his face still looks inexpressive... despite the beads of sweat forming on his brow.  ");

        }
        else if (monster.short == "kitsune") {
            //Kitsune Lust states:
            //Low
            if (monster.lust > 30 && monster.lust < 50) MainScreen.text("The kitsune's face is slightly flushed.  She fans herself with her hand, watching you closely.");
            //Med
            else if (monster.lust > 30 && monster.lust < 75) MainScreen.text("The kitsune's cheeks are bright pink, and you can see her rubbing her thighs together and squirming with lust.");
            //High
            else if (monster.lust > 30) {
                //High (redhead only)
                if (monster.hairColor == "red") MainScreen.text("The kitsune is openly aroused, unable to hide the obvious bulge in her robes as she seems to be struggling not to stroke it right here and now.");
                else MainScreen.text("The kitsune is openly aroused, licking her lips frequently and desperately trying to hide the trail of fluids dripping down her leg.");
            }
        }
        else if (monster.short == "demons") {
            if (monster.lust > 30 && monster.lust < 60) MainScreen.text("The demons lessen somewhat in the intensity of their attack, and some even eye up your assets as they strike at you.", false);
            if (monster.lust >= 60 && monster.lust < 80) MainScreen.text("The demons are obviously steering clear from damaging anything you might use to fuck and they're starting to leave their hands on you just a little longer after each blow. Some are starting to cop quick feels with their other hands and you can smell the demonic lust of a dozen bodies on the air.", false);
            if (monster.lust >= 80) MainScreen.text(" The demons are less and less willing to hit you and more and more willing to just stroke their hands sensuously over you. The smell of demonic lust is thick on the air and part of the group just stands there stroking themselves openly.", false);
        }
        else {
            if (monster.plural) {
                if (monster.lust > 50 && monster.lust < 60) MainScreen.text(monster.capitalA + monster.short + "' skin remains flushed with the beginnings of arousal.  ", false);
                if (monster.lust >= 60 && monster.lust < 70) MainScreen.text(monster.capitalA + monster.short + "' eyes constantly dart over your most sexual parts, betraying " + monster.pronoun3 + " lust.  ", false);
                if (monster.cocks.length > 0) {
                    if (monster.lust >= 70 && monster.lust < 85) MainScreen.text(monster.capitalA + monster.short + " are having trouble moving due to the rigid protrusion in " + monster.pronoun3 + " groins.  ", false);
                    if (monster.lust >= 85) MainScreen.text(monster.capitalA + monster.short + " are panting and softly whining, each movement seeming to make " + monster.pronoun3 + " bulges more pronounced.  You don't think " + monster.pronoun1 + " can hold out much longer.  ", false);
                }
                if (monster.vaginas.length > 0) {
                    if (monster.lust >= 70 && monster.lust < 85) MainScreen.text(monster.capitalA + monster.short + " are obviously turned on, you can smell " + monster.pronoun3 + " arousal in the air.  ", false);
                    if (monster.lust >= 85) MainScreen.text(monster.capitalA + monster.short + "' " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s are practically soaked with their lustful secretions.  ", false);
                }
            }
            else {
                if (monster.lust > 50 && monster.lust < 60) MainScreen.text(monster.capitalA + monster.short + "'s skin remains flushed with the beginnings of arousal.  ", false);
                if (monster.lust >= 60 && monster.lust < 70) MainScreen.text(monster.capitalA + monster.short + "'s eyes constantly dart over your most sexual parts, betraying " + monster.pronoun3 + " lust.  ", false);
                if (monster.cocks.length > 0) {
                    if (monster.lust >= 70 && monster.lust < 85) MainScreen.text(monster.capitalA + monster.short + " is having trouble moving due to the rigid protrusion in " + monster.pronoun3 + " groin.  ", false);
                    if (monster.lust >= 85) MainScreen.text(monster.capitalA + monster.short + " is panting and softly whining, each movement seeming to make " + monster.pronoun3 + " bulge more pronounced.  You don't think " + monster.pronoun1 + " can hold out much longer.  ", false);
                }
                if (monster.vaginas.length > 0) {
                    if (monster.lust >= 70 && monster.lust < 85) MainScreen.text(monster.capitalA + monster.short + " is obviously turned on, you can smell " + monster.pronoun3 + " arousal in the air.  ", false);
                    if (monster.lust >= 85) MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " is practically soaked with her lustful secretions.  ", false);
                }
            }
        }
    }

    // This is a bullshit work around to get the parser to do what I want without having to fuck around in it's code.
    public teaseText(): string {
        tease(true);
        return "";
    }

    // Just text should force the function to purely emit the test text to the output display, and not have any other side effects
    public tease(justText: boolean = false): void {
        if (!justText) MainScreen.text("", true);
        //You cant tease a blind guy!
        if (monster.statusAffects.has("Blind")) {
            MainScreen.text("You do your best to tease " + monster.a + monster.short + " with your body.  It doesn't work - you blinded " + monster.pronoun2 + ", remember?\n\n", true);
            return;
        }
        if (player.statusAffects.has("Sealed") && player.statusAffects.get("Sealed").value2 == 1) {
            MainScreen.text("You do your best to tease " + monster.a + monster.short + " with your body.  Your artless twirls have no effect, as <b>your ability to tease is sealed.</b>\n\n", true);
            return;
        }
        if (monster.short == "Sirius, a naga hypnotist") {
            MainScreen.text("He is too focused on your eyes to pay any attention to your teasing moves, <b>looks like you'll have to beat him up.</b>\n\n");
            return;
        }
        fatigueRecovery();
        let damage: number;
        let chance: number;
        let bimbo: boolean = false;
        let bro: boolean = false;
        let futa: boolean = false;
        let choices: Array = [];
        let select: number;
        //Tags used for bonus damage and chance later on
        let breasts: boolean = false;
        let penis: boolean = false;
        let balls: boolean = false;
        let vagina: boolean = false;
        let anus: boolean = false;
        let ass: boolean = false;
        //If auto = true, set up bonuses using above flags
        let auto: boolean = true;
        //==============================
        //Determine basic success chance.
        //==============================
        chance = 60;
        //5% chance for each tease level.
        chance += player.teaseLevel * 5;
        //10% for seduction perk
        if (player.perks.has("Seduction")) chance += 10;
        //10% for sexy armor types
        if (player.perks.has("SluttySeduction")) chance += 10;
        //10% for bimbo shits
        if (player.perks.has("BimboBody")) {
            chance += 10;
            bimbo = true;
        }
        if (player.perks.has("BroBody")) {
            chance += 10;
            bro = true;
        }
        if (player.perks.has("FutaForm")) {
            chance += 10;
            futa = true;
        }
        //2 & 2 for seductive valentines!
        if (player.perks.has("SensualLover")) {
            chance += 2;
        }
        if (player.perks.has("ChiReflowLust")) chance += UmasShop.NEEDLEWORK_LUST_TEASE_MULTI;
        //==============================
        //Determine basic damage.
        //==============================
        damage = 6 + rand(3);
        if (player.perks.has("SensualLover")) {
            damage += 2;
        }
        if (player.perks.has("Seduction")) damage += 5;
        //+ slutty armor bonus
        if (player.perks.has("SluttySeduction")) damage += player.perkv1(PerkLib.SluttySeduction);
        //10% for bimbo shits
        if (bimbo || bro || futa) {
            damage += 5;
            bimbo = true;
        }
        damage += player.level;
        damage += player.teaseLevel * 2;
        //==============================
        //TEASE SELECT CHOICES
        //==BASICS========
        //0 butt shake
        //1 breast jiggle
        //2 pussy flash
        //3 cock flash
        //==BIMBO STUFF===
        //4 butt shake
        //5 breast jiggle
        //6 pussy flash
        //7 special Adjatha-crafted bend over bimbo times
        //==BRO STUFF=====
        //8 Pec Dance
        //9 Heroic Pose
        //10 Bulgy groin thrust
        //11 Show off dick
        //==EXTRAS========
        //12 Cat flexibility.
        //13 Pregnant
        //14 Brood Mother
        //15 Nipplecunts
        //16 Anal gape
        //17 Bee abdomen tease
        //18 DOG TEASE
        //19 Maximum Femininity:
        //20 Maximum MAN:
        //21 Perfect Androgyny:
        //22 SPOIDAH SILK
        //23 RUT
        //24 Poledance - req's staff! - Req's gender!  Req's TITS!
        //25 Tall Tease! - Reqs 2+ feet & PC Cunt!
        //26 SMART PEEPS! 70+ int, arouse spell!
        //27 - FEEDER
        //28 FEMALE TEACHER COSTUME TEASE
        //29 Male Teacher Outfit Tease
        //30 Naga Fetish Clothes
        //31 Centaur harness clothes
        //32 Genderless servant clothes
        //33 Crotch Revealing Clothes (herm only?)
        //34 Maid Costume (female only):
        //35 Servant Boy Clothes (male only)
        //36 Bondage Patient Clothes 
        //37 Kitsune Tease
        //38 Kitsune Tease
        //39 Kitsune Tease
        //40 Kitsune Tease
        //41 Kitsune Gendered Tease
        //42 Urta teases
        //43 Cowgirl teases
        //44 Bikini Mail Tease
        //==============================
        //BUILD UP LIST OF TEASE CHOICES!
        //==============================
        //Futas!
        if ((futa || bimbo) && player.gender == 3) {
            //Once chance of butt.
            choices[choices.length] = 4;
            //Big butts get more butt
            if (player.lowerBody.butt.buttRating >= 7) choices[choices.length] = 4;
            if (player.lowerBody.butt.buttRating >= 10) choices[choices.length] = 4;
            if (player.lowerBody.butt.buttRating >= 14) choices[choices.length] = 4;
            if (player.lowerBody.butt.buttRating >= 20) choices[choices.length] = 4;
            if (player.lowerBody.butt.buttRating >= 25) choices[choices.length] = 4;
            //Breast jiggle!
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 2) choices[choices.length] = 5;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 4) choices[choices.length] = 5;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 8) choices[choices.length] = 5;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 15) choices[choices.length] = 5;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 30) choices[choices.length] = 5;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 50) choices[choices.length] = 5;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 75) choices[choices.length] = 5;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 100) choices[choices.length] = 5;
            //Pussy Flash!
            if (player.lowerBody.vaginaSpot.hasVagina()) {
                choices[choices.length] = 2;
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 3) choices[choices.length] = 6;
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 5) choices[choices.length] = 6;
                if (player.vaginalCapacity() >= 30) choices[choices.length] = 6;
                if (player.vaginalCapacity() >= 60) choices[choices.length] = 6;
                if (player.vaginalCapacity() >= 75) choices[choices.length] = 6;
            }
            //Adj special!
            if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.butt.buttRating >= 8 && player.lowerBody.hipRating >= 6 && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 4) {
                choices[choices.length] = 7;
                choices[choices.length] = 7;
                choices[choices.length] = 7;
                choices[choices.length] = 7;
            }
            //Cock flash!
            if (futa && player.lowerBody.cockSpot.hasCock()) {
                choices[choices.length] = 10;
                choices[choices.length] = 11;
                if (player.lowerBody.cockSpot.count() > 1) choices[choices.length] = 10;
                if (player.lowerBody.cockSpot.count() >= 2) choices[choices.length] = 11;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 10) choices[choices.length] = 10;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 25) choices[choices.length] = 11;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 50) choices[choices.length] = 11;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 75) choices[choices.length] = 10;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 100) choices[choices.length] = 11;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 300) choices[choices.length] = 10;
            }
        }
        else if (bro) {
            //8 Pec Dance
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 1 && player.tone >= 60) {
                choices[choices.length] = 8;
                if (player.tone >= 70) choices[choices.length] = 8;
                if (player.tone >= 80) choices[choices.length] = 8;
                if (player.tone >= 90) choices[choices.length] = 8;
                if (player.tone == 100) choices[choices.length] = 8;
            }
            //9 Heroic Pose
            if (player.tone >= 60 && player.stats.str >= 50) {
                choices[choices.length] = 9;
                if (player.tone >= 80) choices[choices.length] = 9;
                if (player.stats.str >= 70) choices[choices.length] = 9;
                if (player.tone >= 90) choices[choices.length] = 9;
                if (player.stats.str >= 80) choices[choices.length] = 9;
            }
            //Cock flash!
            if (player.lowerBody.cockSpot.hasCock()) {
                choices[choices.length] = 10;
                choices[choices.length] = 11;
                if (player.lowerBody.cockSpot.count() > 1) choices[choices.length] = 10;
                if (player.lowerBody.cockSpot.count() >= 2) choices[choices.length] = 11;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 10) choices[choices.length] = 10;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 25) choices[choices.length] = 11;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 50) choices[choices.length] = 11;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 75) choices[choices.length] = 10;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 100) choices[choices.length] = 11;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 300) choices[choices.length] = 10;
            }
        }
        //VANILLA FOLKS
        else {
            //Once chance of butt.
            choices[choices.length] = 0;
            //Big butts get more butt
            if (player.lowerBody.butt.buttRating >= 7) choices[choices.length] = 0;
            if (player.lowerBody.butt.buttRating >= 10) choices[choices.length] = 0;
            if (player.lowerBody.butt.buttRating >= 14) choices[choices.length] = 0;
            if (player.lowerBody.butt.buttRating >= 20) choices[choices.length] = 0;
            if (player.lowerBody.butt.buttRating >= 25) choices[choices.length] = 0;
            //Breast jiggle!
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 2) choices[choices.length] = 1;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 4) choices[choices.length] = 1;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 8) choices[choices.length] = 1;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 15) choices[choices.length] = 1;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 30) choices[choices.length] = 1;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 50) choices[choices.length] = 1;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 75) choices[choices.length] = 1;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 100) choices[choices.length] = 1;
            //Pussy Flash!
            if (player.lowerBody.vaginaSpot.hasVagina()) {
                choices[choices.length] = 2;
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 3) choices[choices.length] = 2;
                if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 5) choices[choices.length] = 2;
                if (player.vaginalCapacity() >= 30) choices[choices.length] = 2;
                if (player.vaginalCapacity() >= 60) choices[choices.length] = 2;
                if (player.vaginalCapacity() >= 75) choices[choices.length] = 2;
            }
            //Cock flash!
            if (player.lowerBody.cockSpot.hasCock()) {
                choices[choices.length] = 3;
                if (player.lowerBody.cockSpot.count() > 1) choices[choices.length] = 3;
                if (player.lowerBody.cockSpot.count() >= 2) choices[choices.length] = 3;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 10) choices[choices.length] = 3;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 25) choices[choices.length] = 3;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 50) choices[choices.length] = 3;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 75) choices[choices.length] = 3;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 100) choices[choices.length] = 3;
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 300) choices[choices.length] = 3;
            }
        }
        //==EXTRAS========
        //12 Cat flexibility.
        if (player.perks.has("Flexibility") && player.isBiped() && player.lowerBody.vaginaSpot.hasVagina()) {
            choices[choices.length] = 12;
            choices[choices.length] = 12;
            if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 3) choices[choices.length] = 12;
            if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 5) choices[choices.length] = 12;
            if (player.vaginalCapacity() >= 30) choices[choices.length] = 12;
        }
        //13 Pregnant
        if (player.pregnancyIncubation <= 216 && player.pregnancyIncubation > 0) {
            choices[choices.length] = 13;
            if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 1) choices[choices.length] = 13;
            if (player.pregnancyIncubation <= 180) choices[choices.length] = 13;
            if (player.pregnancyIncubation <= 120) choices[choices.length] = 13;
            if (player.pregnancyIncubation <= 100) choices[choices.length] = 13;
            if (player.pregnancyIncubation <= 50) choices[choices.length] = 13;
            if (player.pregnancyIncubation <= 24) choices[choices.length] = 13;
            if (player.pregnancyIncubation <= 24) choices[choices.length] = 13;
            if (player.pregnancyIncubation <= 24) choices[choices.length] = 13;
            if (player.pregnancyIncubation <= 24) choices[choices.length] = 13;
        }
        //14 Brood Mother
        if (monster.hasCock() && player.lowerBody.vaginaSpot.hasVagina() && player.perks.has("BroodMother") && (player.pregnancyIncubation <= 0 || player.pregnancyIncubation > 216)) {
            choices[choices.length] = 14;
            choices[choices.length] = 14;
            choices[choices.length] = 14;
            if (player.inHeat) choices[choices.length] = 14;
            if (player.inHeat) choices[choices.length] = 14;
            if (player.inHeat) choices[choices.length] = 14;
            if (player.inHeat) choices[choices.length] = 14;
            if (player.inHeat) choices[choices.length] = 14;
            if (player.inHeat) choices[choices.length] = 14;
            if (player.inHeat) choices[choices.length] = 14;
        }
        //15 Nipplecunts
        if (player.upperBody.chest.hasFuckableNipples()) {
            choices[choices.length] = 15;
            choices[choices.length] = 15;
            if (player.lowerBody.vaginaSpot.hasVagina()) choices[choices.length] = 15;
            if (player.lowerBody.vaginaSpot.hasVagina()) choices[choices.length] = 15;
            if (player.lowerBody.vaginaSpot.hasVagina()) choices[choices.length] = 15;
            if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 3) choices[choices.length] = 15;
            if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 5) choices[choices.length] = 15;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 3) choices[choices.length] = 15;
            if (player.upperBody.chest.BreastRatingLargest[0].nippleLength >= 3) choices[choices.length] = 15;
        }
        //16 Anal gape
        if (player.lowerBody.butt.analLooseness >= 4) {
            choices[choices.length] = 16;
            if (player.lowerBody.butt.analLooseness >= 5) choices[choices.length] = 16;
        }
        //17 Bee abdomen tease
        if (player.lowerBody.tailType == TailType.BEE_ABDOMEN) {
            choices[choices.length] = 17;
            choices[choices.length] = 17;
        }
        //18 DOG TEASE
        if (player.dogScore() >= 4 && player.lowerBody.vaginaSpot.hasVagina() && player.isBiped()) {
            choices[choices.length] = 18;
            choices[choices.length] = 18;
        }
        //19 Maximum Femininity:
        if (player.femininity >= 100) {
            choices[choices.length] = 19;
            choices[choices.length] = 19;
            choices[choices.length] = 19;
        }
        //20 Maximum MAN:
        if (player.femininity <= 0) {
            choices[choices.length] = 20;
            choices[choices.length] = 20;
            choices[choices.length] = 20;
        }
        //21 Perfect Androgyny:
        if (player.femininity == 50) {
            choices[choices.length] = 21;
            choices[choices.length] = 21;
            choices[choices.length] = 21;
        }
        //22 SPOIDAH SILK
        if (player.lowerBody.tailType == TailType.SPIDER_ABDOMEN) {
            choices[choices.length] = 22;
            choices[choices.length] = 22;
            choices[choices.length] = 22;
            if (RaceScore.spiderScore(player) >= 4) {
                choices[choices.length] = 22;
                choices[choices.length] = 22;
                choices[choices.length] = 22;
            }
        }
        //23 RUT
        if (player.inRut && monster.hasVagina() && player.lowerBody.cockSpot.hasCock()) {
            choices[choices.length] = 23;
            choices[choices.length] = 23;
            choices[choices.length] = 23;
            choices[choices.length] = 23;
            choices[choices.length] = 23;
        }
        //24 Poledance - req's staff! - Req's gender!  Req's TITS!
        if (player.weaponName == "wizard's staff" && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1 && player.gender > 0) {
            choices[choices.length] = 24;
            choices[choices.length] = 24;
            choices[choices.length] = 24;
            choices[choices.length] = 24;
            choices[choices.length] = 24;
        }
        //25 Tall Tease! - Reqs 2+ feet & PC Cunt!
        if (player.tallness - monster.tallness >= 24 && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 4) {
            choices[choices.length] = 25;
            choices[choices.length] = 25;
            choices[choices.length] = 25;
            choices[choices.length] = 25;
            choices[choices.length] = 25;
        }
        //26 SMART PEEPS! 70+ int, arouse spell!
        if (player.stats.int >= 70 && player.statusAffects.has("KnowsArouse")) {
            choices[choices.length] = 26;
            choices[choices.length] = 26;
            choices[choices.length] = 26;
        }
        //27 FEEDER
        if (player.perks.has("Feeder") && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 4) {
            choices[choices.length] = 27;
            choices[choices.length] = 27;
            choices[choices.length] = 27;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 10) choices[choices.length] = 27;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 15) choices[choices.length] = 27;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 25) choices[choices.length] = 27;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 40) choices[choices.length] = 27;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 60) choices[choices.length] = 27;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 80) choices[choices.length] = 27;
        }
        //28 FEMALE TEACHER COSTUME TEASE
        if (player.inventory.armor.displayName == "backless female teacher's clothes" && player.gender == 2) {
            choices[choices.length] = 28;
            choices[choices.length] = 28;
            choices[choices.length] = 28;
            choices[choices.length] = 28;
        }
        //29 Male Teacher Outfit Tease
        if (player.inventory.armor.displayName == "formal vest, tie, and crotchless pants" && player.gender == 1) {
            choices[choices.length] = 29;
            choices[choices.length] = 29;
            choices[choices.length] = 29;
            choices[choices.length] = 29;
        }
        //30 Naga Fetish Clothes
        if (player.inventory.armor.displayName == "headdress, necklaces, and many body-chains") {
            choices[choices.length] = 30;
            choices[choices.length] = 30;
            choices[choices.length] = 30;
            choices[choices.length] = 30;
        }
        //31 Centaur harness clothes
        if (player.inventory.armor.displayName == "bridle bit and saddle set") {
            choices[choices.length] = 31;
            choices[choices.length] = 31;
            choices[choices.length] = 31;
            choices[choices.length] = 31;
        }
        //32 Genderless servant clothes
        if (player.inventory.armor.displayName == "servant's clothes" && player.gender == 0) {
            choices[choices.length] = 32;
            choices[choices.length] = 32;
            choices[choices.length] = 32;
            choices[choices.length] = 32;
        }
        //33 Crotch Revealing Clothes (herm only?)
        if (player.inventory.armor.displayName == "crotch-revealing clothes" && player.gender == 3) {
            choices[choices.length] = 33;
            choices[choices.length] = 33;
            choices[choices.length] = 33;
            choices[choices.length] = 33;
        }
        //34 Maid Costume (female only):
        if (player.inventory.armor.displayName == "maid's clothes" && player.lowerBody.vaginaSpot.hasVagina()) {
            choices[choices.length] = 34;
            choices[choices.length] = 34;
            choices[choices.length] = 34;
            choices[choices.length] = 34;
        }
        //35 Servant Boy Clothes (male only)
        if (player.inventory.armor.displayName == "cute servant's clothes" && player.lowerBody.cockSpot.hasCock()) {
            choices[choices.length] = 35;
            choices[choices.length] = 35;
            choices[choices.length] = 35;
            choices[choices.length] = 35;
        }
        //36 Bondage Patient Clothes 
        if (player.inventory.armor.displayName == "bondage patient clothes") {
            choices[choices.length] = 36;
            choices[choices.length] = 36;
            choices[choices.length] = 36;
            choices[choices.length] = 36;
        }
        //37 Kitsune Tease
        //38 Kitsune Tease
        //39 Kitsune Tease
        //40 Kitsune Tease
        if (player.kitsuneScore() >= 2 && player.lowerBody.tailType == TailType.FOX) {
            choices[choices.length] = 37;
            choices[choices.length] = 37;
            choices[choices.length] = 37;
            choices[choices.length] = 37;
            choices[choices.length] = 38;
            choices[choices.length] = 38;
            choices[choices.length] = 38;
            choices[choices.length] = 38;
            choices[choices.length] = 39;
            choices[choices.length] = 39;
            choices[choices.length] = 39;
            choices[choices.length] = 39;
            choices[choices.length] = 40;
            choices[choices.length] = 40;
            choices[choices.length] = 40;
            choices[choices.length] = 40;
        }
        //41 Kitsune Gendered Tease
        if (player.kitsuneScore() >= 2 && player.lowerBody.tailType == TailType.FOX) {
            choices[choices.length] = 41;
            choices[choices.length] = 41;
            choices[choices.length] = 41;
            choices[choices.length] = 41;
        }
        //42 Urta teases!
        if (urtaQuest.isUrta()) {
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
        }
        //43 - special mino + cowgirls
        if (player.lowerBody.vaginaSpot.hasVagina() && player.lactationQ() >= 500 && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 6 && player.cowScore() >= 3 && player.lowerBody.tailType == TailType.COW) {
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
        }
        //44 - Bikini Mail Teases!
        if (player.lowerBody.vaginaSpot.hasVagina() && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 4 && player.inventory.armor.displayName == "lusty maiden's armor") {
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
        }
        //=======================================================
        //    CHOOSE YOUR TEASE AND DISPLAY IT!
        //=======================================================
        select = choices[rand(choices.length)];
        if (monster.short.indexOf("minotaur") != -1) {
            if (player.lowerBody.vaginaSpot.hasVagina() && player.lactationQ() >= 500 && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 6 && player.cowScore() >= 3 && player.lowerBody.tailType == TailType.COW)
                select = 43;
        }
        //Lets do zis!
        switch (select) {
            //0 butt shake
            case 0:
                //Display
                MainScreen.text("You slap your " + ButtDescriptor.describeButt(player), false);
                if (player.lowerBody.butt.buttRating >= 10 && player.tone < 60) MainScreen.text(", making it jiggle delightfully.", false);
                else MainScreen.text(".", false);
                //Mod success
                ass = true;
                break;
            //1 BREAST JIGGLIN'
            case 1:
                //Single breast row
                if (player.upperBody.chest.count() == 1) {
                    //50+ breastsize% success rate
                    MainScreen.text("Your lift your top, exposing your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " to " + monster.a + monster.short + ".  You shake them from side to side enticingly.", false);
                    if (player.stats.lust >= 50) MainScreen.text("  Your " + BreastDescriptor.describeNipple(0) + "s seem to demand " + monster.pronoun3 + " attention.", false);
                }
                //Multirow
                if (player.upperBody.chest.count() > 1) {
                    //50 + 10% per breastRow + breastSize%
                    MainScreen.text("You lift your top, freeing your rows of " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " to jiggle freely.  You shake them from side to side enticingly", false);
                    if (player.stats.lust >= 50) MainScreen.text(", your " + BreastDescriptor.describeNipple(0) + "s painfully visible.", false);
                    else MainScreen.text(".", false);
                    chance++;
                }
                breasts = true;
                break;
            //2 PUSSAH FLASHIN'
            case 2:
                if (player.lowerBody.isTaur()) {
                    MainScreen.text("You gallop toward your unsuspecting enemy, dodging their defenses and knocking them to the ground.  Before they can recover, you slam your massive centaur ass down upon them, stopping just short of using crushing force to pin them underneath you.  In this position, your opponent's face is buried right in your girthy horsecunt.  You grind your cunt into " + monster.pronoun3 + " face for a moment before standing.  When you do, you're gratified to see your enemy covered in your lubricant and smelling powerfully of horsecunt.", false);
                    chance += 2;
                    damage += 4;
                }
                else {
                    MainScreen.text("You open your " + player.inventory.armor.displayName + ", revealing your ", false);
                    if (player.lowerBody.cockSpot.count() > 0) {
                        chance++;
                        damage++;
                        if (player.lowerBody.cockSpot.count() == 1) MainScreen.text(player.CockDescriptor.describeCock(player, 0), false);
                        if (player.lowerBody.cockSpot.count() > 1) MainScreen.text(player.CockDescriptor.describeMultiCockShort(player), false);
                        MainScreen.text(" and ", false);
                        if (player.perks.has("BulgeArmor")) {
                            damage += 5;
                        }
                        penis = true;
                    }
                    MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)), false);
                    MainScreen.text(".", false);
                }
                vagina = true;
                break;
            //3 cock flash
            case 3:
                if (player.lowerBody.isTaur() && player.lowerBody.cockSpot.countType(CockType.HORSE) > 0) {
                    MainScreen.text("You let out a bestial whinny and stomp your hooves at your enemy.  They prepare for an attack, but instead you kick your front hooves off the ground, revealing the hefty horsecock hanging beneath your belly.  You let it flop around, quickly getting rigid and to its full erect length.  You buck your hips as if you were fucking a mare in heat, letting your opponent know just what's in store for them if they surrender to pleasure...", false);
                    if (player.perks.has("BulgeArmor")) damage += 5;
                }
                else {
                    MainScreen.text("You open your " + player.inventory.armor.displayName + ", revealing your ", false);
                    if (player.lowerBody.cockSpot.count() == 1) MainScreen.text(player.CockDescriptor.describeCock(player, 0), false);
                    if (player.lowerBody.cockSpot.count() > 1) MainScreen.text(player.CockDescriptor.describeMultiCockShort(player), false);
                    if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and ", false);
                    //Bulgy bonus!
                    if (player.perks.has("BulgeArmor")) {
                        damage += 5;
                        chance++;
                    }
                    if (player.lowerBody.vaginaSpot.count() > 0) {
                        MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)), false);
                        vagina = true;
                    }
                    MainScreen.text(".", false);
                }
                penis = true;
                break;
            //BIMBO
            //4 butt shake
            case 4:
                MainScreen.text("You turn away and bounce your " + ButtDescriptor.describeButt(player) + " up and down hypnotically", false);
                //Big butts = extra text + higher success
                if (player.lowerBody.butt.buttRating >= 10) {
                    MainScreen.text(", making it jiggle delightfully.  " + monster.capitalA + monster.short + " even gets a few glimpses of the " + ButtDescriptor.describeButthole(player) + " between your cheeks.", false);
                    chance += 3;
                }
                //Small butts = less damage, still high success
                else {
                    MainScreen.text(", letting " + monster.a + monster.short + " get a good look at your " + ButtDescriptor.describeButthole(player) + " and " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".", false);
                    chance += 1;
                    vagina = true;
                }
                ass = true;
                anus = true;
                break;
            //5 breast jiggle
            case 5:
                MainScreen.text("You lean forward, letting the well-rounded curves of your " + BreastDescriptor.describeAllBreasts(player) + " show to " + monster.a + monster.short + ".", false);
                MainScreen.text("  You cup them in your palms and lewdly bounce them, putting on a show and giggling the entire time.  An inch at a time, your " + player.inventory.armor.displayName + " starts to come down, dropping tantalizingly slowly until your " + BreastDescriptor.describeNipple(0) + "s pop free.", false);
                if (player.stats.lust >= 50) {
                    if (player.upperBody.chest.hasFuckableNipples()) {
                        chance++;
                        MainScreen.text("  Clear slime leaks from them, making it quite clear that they're more than just nipples.", false);
                    }
                    else MainScreen.text("  Your hard nipples seem to demand " + monster.pronoun3 + " attention.", false);
                    chance += 1;
                    damage += 2;
                }
                //Damage boosts!
                breasts = true;
                break;
            //6 pussy flash
            case 6:
                if (player.perks.has("BimboBrains") || player.perks.has("FutaFaculties")) {
                    MainScreen.text("You coyly open your " + player.inventory.armor.displayName + " and giggle, \"<i>Is this, like, what you wanted to see?</i>\"  ", false);
                }
                else {
                    MainScreen.text("You coyly open your " + player.inventory.armor.displayName + " and purr, \"<i>Does the thought of a hot, ", false);
                    if (futa) MainScreen.text("futanari ", false);
                    else if (player.perks.has("BimboBody")) MainScreen.text("bimbo ", false);
                    else MainScreen.text("sexy ");
                    MainScreen.text("body turn you on?</i>\"  ", false);
                }
                if (monster.plural) MainScreen.text(monster.capitalA + monster.short + "' gazes are riveted on your groin as you run your fingers up and down your folds seductively.", false);
                else MainScreen.text(monster.capitalA + monster.short + "'s gaze is riveted on your groin as you run your fingers up and down your folds seductively.", false);
                if (player.lowerBody.vaginaSpot.get(0).clitLength > 3) MainScreen.text("  You smile as your " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + " swells out from the folds and stands proudly, begging to be touched.", false);
                else MainScreen.text("  You smile and pull apart your lower-lips to expose your " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + ", giving the perfect view.", false);
                if (player.lowerBody.cockSpot.count() > 0) MainScreen.text("  Meanwhile, " + player.CockDescriptor.describeMultiCockSimpleOne(player) + " bobs back and forth with your gyrating hips, adding to the display.", false);
                //BONUSES!
                if (player.lowerBody.cockSpot.hasCock()) {
                    if (player.perks.has("BulgeArmor")) damage += 5;
                    penis = true;
                }
                vagina = true;
                break;
            //7 special Adjatha-crafted bend over bimbo times
            case 7:
                MainScreen.text("The glinting of light catches your eye and you whip around to inspect the glittering object, turning your back on " + monster.a + monster.short + ".  Locking your knees, you bend waaaaay over, " + chestDesc() + " swinging in the open air while your " + ButtDescriptor.describeButt(player) + " juts out at the " + monster.a + monster.short + ".  Your plump cheeks and " + LowerBodyDescriptor.describeHips(player) + " form a jiggling heart-shape as you eagerly rub your thighs together.\n\n", false);
                MainScreen.text("The clear, warm fluid of your happy excitement trickles down from your loins, polishing your " + player.skin() + " to a glossy, inviting shine.  Retrieving the useless, though shiny, bauble, you hold your pose for just a moment longer, a sly little smile playing across your lips as you wiggle your cheeks one more time before straightening up and turning back around.", false);
                vagina = true;
                chance++;
                damage += 2;
                break;
            //==BRO STUFF=====
            //8 Pec Dance
            case 8:
                MainScreen.text("You place your hands on your hips and flex repeatedly, skillfully making your pecs alternatively bounce in a muscular dance.  ", false);
                if (player.perks.has("BroBrains")) MainScreen.text("Damn, " + monster.a + monster.short + " has got to love this!", false);
                else MainScreen.text(monster.capitalA + monster.short + " will probably enjoy the show, but you feel a bit silly doing this.", false);
                chance += (player.tone - 75) / 5;
                damage += (player.tone - 70) / 5;
                auto = false;
                break;
            //9 Heroic Pose
            case 9:
                MainScreen.text("You lift your arms and flex your incredibly muscular arms while flashing your most disarming smile.  ", false);
                if (player.perks.has("BroBrains")) MainScreen.text(monster.capitalA + monster.short + " can't resist such a heroic pose!", false);
                else MainScreen.text("At least the physical changes to your body are proving useful!", false);
                chance += (player.tone - 75) / 5;
                damage += (player.tone - 70) / 5;
                auto = false;
                break;
            //10 Bulgy groin thrust
            case 10:
                MainScreen.text("You lean back and pump your hips at " + monster.a + monster.short + " in an incredibly vulgar display.  The bulging, barely-contained outline of your " + player.CockDescriptor.describeCock(player, 0) + " presses hard into your gear.  ", false);
                if (player.perks.has("BroBrains")) MainScreen.text("No way could " + monster.pronoun1 + " resist your huge cock!", false);
                else MainScreen.text("This is so crude, but at the same time, you know it'll likely be effective.", false);
                MainScreen.text("  You go on like that, humping the air for your foe", false);
                MainScreen.text("'s", false);
                MainScreen.text(" benefit, trying to entice them with your man-meat.", false);
                if (player.perks.has("BulgeArmor")) damage += 5;
                penis = true;
                break;
            //11 Show off dick
            case 11:
                if (silly() && rand(2) == 0) MainScreen.text("You strike a herculean pose and flex, whispering, \"<i>Do you even lift?</i>\" to " + monster.a + monster.short + ".", false);
                else {
                    MainScreen.text("You open your " + player.inventory.armor.displayName + " just enough to let your " + player.CockDescriptor.describeCock(player, 0) + " and " + BallsDescriptor.describeBalls(true, true, player) + " dangle free.  A shiny rope of pre-cum dangles from your cock, showing that your reproductive system is every bit as fit as the rest of you.  ", false);
                    if (player.perks.has("BroBrains")) MainScreen.text("Bitches love a cum-leaking cock.", false);
                    else MainScreen.text("You've got to admit, you look pretty good down there.", false);
                }
                if (player.perks.has("BulgeArmor")) damage += 5;
                penis = true;
                break;
            //==EXTRAS========
            //12 Cat flexibility.
            case 12:
                //CAT TEASE MOTHERFUCK (requires flexibility and legs [maybe can't do it with armor?])
                MainScreen.text("Reaching down, you grab an ankle and pull it backwards, looping it up and over to touch the foot to your " + HeadDescriptor.describeHair(player) + ".  You bring the leg out to the side, showing off your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " through your " + player.inventory.armor.displayName + ".  The combination of the lack of discomfort on your face and the ease of which you're able to pose shows " + monster.a + monster.short + " how good of a time they're in for with you.", false);
                vagina = true;
                if (player.thickness < 33) chance++;
                else if (player.thickness >= 66) chance--;
                damage += (player.thickness - 50) / 10;
                break;
            //13 Pregnant
            case 13:
                //PREG
                MainScreen.text("You lean back, feigning a swoon while pressing a hand on the small of your back.  The pose juts your huge, pregnant belly forward and makes the shiny spherical stomach look even bigger.  With a teasing groan, you rub the protruding tummy gently, biting your lip gently as you stare at " + monster.a + monster.short + " through heavily lidded eyes.  \"<i>All of this estrogen is making me frisky,</i>\" you moan, stroking hand gradually shifting to the southern hemisphere of your big baby-bump.", false);
                //if lactating] 
                if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 1) {
                    MainScreen.text("  Your other hand moves to expose your " + chestDesc() + ", cupping and squeezing a stream of milk to leak down the front of your " + player.inventory.armor.displayName + ".  \"<i>Help a mommy out.</i>\"\n\n", false);
                    chance += 2;
                    damage += 4;
                }
                if (player.pregnancyIncubation < 100) {
                    chance++;
                    damage += 2;
                }
                if (player.pregnancyIncubation < 50) {
                    chance++;
                    damage += 2;
                }
                break;
            //14 Brood Mother
            case 14:
                if (rand(2) == 0) MainScreen.text("You tear open your " + player.inventory.armor.displayName + " and slip a few fingers into your well-used birth canal, giving your opponent a good look at what they're missing.  \"<i>C'mon stud,</i>\" you say, voice dripping with lust and desire, \"<i>Come to mama " + player.short + " and fuck my pussy 'til your baby batter just POURS out.  I want your children inside of me, I want your spawn crawling out of this cunt and begging for my milk.  Come on, FUCK ME PREGNANT!</i>\"", false);
                else MainScreen.text("You wiggle your " + LowerBodyDescriptor.describeHips(player) + " at your enemy, giving them a long, tantalizing look at the hips that have passed so very many offspring.  \"<i>Oh, like what you see, bad boy?  Well why don't you just come on over and stuff that cock inside me?  Give me your seed, and I'll give you suuuuch beautiful offspring.  Oh?  Does that turn you on?  It does!  Come on, just let loose and fuck me full of your babies!</i>\"", false);
                chance += 2;
                damage += 4;
                if (player.inHeat) {
                    chance += 2;
                    damage += 4;
                }
                vagina = true;
                break;
            //15 Nipplecunts
            case 15:
                //Req's tits & Pussy
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 1 && player.lowerBody.vaginaSpot.hasVagina() && rand(2) == 0) {
                    MainScreen.text("Closing your eyes, you lean forward and slip a hand under your " + player.inventory.armor.displayName + ".  You let out the slightest of gasps as your fingers find your drooling honeypot, warm tips poking, one after another between your engorged lips.  When you withdraw your hand, your fingers have been soaked in the dripping passion of your cunny, translucent beads rolling down to wet your palm.  With your other hand, you pull down the top of your " + player.inventory.armor.displayName + " and bare your " + chestDesc() + " to " + monster.a + monster.short + ".\n\n", false);
                    MainScreen.text("Drawing your lust-slick hand to your " + BreastDescriptor.describeNipple(0) + "s, the yielding flesh of your cunt-like nipples parts before the teasing digits.  Using your own girl cum as added lubrication, you pump your fingers in and out of your nipples, moaning as you add progressively more digits until only your thumb remains to stroke the inflamed flesh of your over-stimulated chest.  Your throat releases the faintest squeak of your near-orgasmic delight and you pant, withdrawing your hands and readjusting your armor.\n\n", false);
                    MainScreen.text("Despite how quiet you were, it's clear that every lewd, desperate noise you made was heard by " + monster.a + monster.short + ".", false);
                    chance += 2;
                    damage += 4;
                }
                else if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 1 && rand(2) == 0) {
                    MainScreen.text("You yank off the top of your " + player.inventory.armor.displayName + ", revealing your " + chestDesc() + " and the gaping nipplecunts on each.  With a lusty smirk, you slip a pair of fingers into the nipples of your " + chestDesc() + ", pulling the nipplecunt lips wide, revealing the lengthy, tight passage within.  You fingerfuck your nipplecunts, giving your enemy a good show before pulling your armor back on, leaving the tantalizing image of your gaping titpussies to linger in your foe's mind.", false);
                    chance += 1;
                    damage += 2;
                }
                else MainScreen.text("You remove the front of your " + player.inventory.armor.displayName + " exposing your " + chestDesc() + ".  Using both of your hands, you thrust two fingers into your nipple cunts, milky girl cum soaking your hands and fingers.  \"<i>Wouldn't you like to try out these holes too?</i>\"", false);
                breasts = true;
                break;
            //16 Anal gape
            case 16:
                MainScreen.text("You quickly strip out of your " + player.inventory.armor.displayName + " and turn around, giving your " + ButtDescriptor.describeButt(player) + " a hard slap and showing your enemy the real prize: your " + ButtDescriptor.describeButthole(player) + ".  With a smirk, you easily plunge your hand inside, burying yourself up to the wrist inside your anus.  You give yourself a quick fisting, watching the enemy over your shoulder while you moan lustily, sure to give them a good show.  You withdraw your hand and give your ass another sexy spank before readying for combat again.", false);
                anus = true;
                ass = true;
                break;
            //17 Bee abdomen tease
            case 17:
                MainScreen.text("You swing around, shedding the " + player.inventory.armor.displayName + " around your waist to expose your " + ButtDescriptor.describeButt(player) + " to " + monster.a + monster.short + ".  Taking up your oversized bee abdomen in both hands, you heft the thing and wave it about teasingly.  Drops of venom drip to and fro, a few coming dangerously close to " + monster.pronoun2 + ".  \"<i>Maybe if you behave well enough, I'll even drop a few eggs into your belly,</i>\" you say softly, dropping the abdomen back to dangle above your butt and redressing.", false);
                ass = true;
                chance += .5;
                damage += .5;
                break;
            //18 DOG TEASE
            case 18:
                MainScreen.text("You sit down like a dog, your [legs] are spread apart, showing your ", false);
                if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("parted cunt-lips", false);
                else MainScreen.text("puckered asshole, hanging, erect maleness,", false);
                MainScreen.text(" and your hands on the ground in front of you.  You pant heavily with your tongue out and promise, \"<i>I'll be a good little bitch for you</i>.\"", false);
                vagina = true;
                chance += 1;
                damage += 2;
                break;
            //19 MAX FEM TEASE - SYMPHONIE
            case 19:
                MainScreen.text("You make sure to capture your foe's attention, then slowly and methodically allow your tongue to slide along your lush, full lips.  The glistening moisture that remains on their plump beauty speaks of deep lust and deeper throats.  Batting your long lashes a few times, you pucker them into a playful blown kiss, punctuating the act with a small moan. Your gorgeous feminine features hint at exciting, passionate moments together, able to excite others with just your face alone.", false);
                chance += 2;
                damage += 4;
                break;
            //20 MAX MASC TEASE
            case 20:
                MainScreen.text("As your foe regards you, you recognize their attention is fixated on your upper body.  Thrusting your strong jaw forward you show off your chiseled chin, handsome features marking you as a flawless specimen.  Rolling your broad shoulders, you nod your head at your enemy.  The strong, commanding presence you give off could melt the heart of an icy nun.  Your perfect masculinity speaks to your confidence, allowing you to excite others with just your face alone.", false);
                chance += 2;
                damage += 4;
                break;
            //21 MAX ADROGYN
            case 21:
                MainScreen.text("You reach up and run your hands down your delicate, androgynous features.  With the power of a man but the delicacy of a woman, looking into your eyes invites an air of enticing mystery.  You blow a brief kiss to your enemy while at the same time radiating a sexually exciting confidence.  No one could identify your gender by looking at your features, and the burning curiosity they encourage could excite others with just your face alone.", false);
                damage -= 3;
                break;
            //22 SPOIDAH SILK
            case 22:
                MainScreen.text("Reaching back, you milk some wet silk from your spider-y abdomen and present it to " + monster.a + monster.short + ", molding the sticky substance as " + monster.pronoun1 + " looks on curiously.  Within moments, you hold up a silken heart scuplture, and with a wink, you toss it at " + monster.pronoun2 + ". It sticks to " + monster.pronoun3 + " body, the sensation causing " + monster.pronoun2 + " to hastily slap the heart off.  " + monster.mf("He", "She") + " returns " + monster.pronoun3 + " gaze to you to find you turned around, " + ButtDescriptor.describeButt(player) + " bared and abdomen bouncing lazily.  \"<i>I wonder what would happen if I webbed up your hole after I dropped some eggs inside?</i>\" you hiss mischievously.  " + monster.mf("He", "She") + " gulps.", false);
                ass = true;
                break;
            //23 RUT TEASE
            case 23:
                if (player.lowerBody.cockSpot.countType(CockType.HORSE) > 0 && player.longestHorseCockLength() >= 12) {
                    MainScreen.text("You whip out your massive horsecock, and are immediately surrounded by a massive, heady musk.  Your enemy swoons, nearly falling to her knees under your oderous assault.  Grinning, you grab her shoulders and force her to her knees.  Before she can defend herself, you slam your horsecock onto her head, running it up and down on her face, her nose acting like a sexy bump in an onahole.  You fuck her face -- literally -- for a moment before throwing her back and sheathing your cock.", false);
                }
                else {
                    MainScreen.text("Panting with your unstoppable lust for the delicious, impregnable cunt before you, you yank off your " + player.inventory.armor.displayName + " with strength born of your inhuman rut, and quickly wave your fully erect cock at your enemy.  She flashes with lust, quickly feeling the heady effect of your man-musk.  You rush up, taking advantage of her aroused state and grab her shoulders.  ", false);
                    MainScreen.text("Before she can react, you push her down until she's level with your cock, and start to spin it in a circle, slapping her right in the face with your musky man-meat.  Her eyes swim, trying to follow your meatspin as you swat her in the face with your cock!  Satisfied, you release her and prepare to fight!", false);
                }
                penis = true;
                break;
            //24 STAFF POLEDANCE
            case 24:
                MainScreen.text("You run your tongue across your lips as you plant your staff into the ground.  Before your enemy can react, you spin onto the long, wooden shaft, using it like an impromptu pole.  You lean back against the planted staff, giving your enemy a good look at your body.  You stretch backwards like a cat, nearly touching your fingertips to the ground beneath you, now holding onto the staff with only one leg.  You pull yourself upright and give your " + ButtDescriptor.describeButt(player) + " a little slap and your " + chestDesc() + " a wiggle before pulling open your " + player.inventory.armor.displayName + " and sliding the pole between your tits.  You drop down to a low crouch, only just covering your genitals with your hand as you shake your " + ButtDescriptor.describeButt(player) + " playfully.  You give the enemy a little smirk as you slip your " + player.inventory.armor.displayName + " back on and pick up your staff.", false);
                ass = true;
                breasts = true;
                break;
            //TALL WOMAN TEASE
            case 25:
                MainScreen.text("You move close to your enemy, handily stepping over " + monster.pronoun3 + " defensive strike before leaning right down in " + monster.pronoun3 + " face, giving " + monster.pronoun2 + " a good long view at your cleavage.  \"<i>Hey, there, little " + monster.mf("guy", "girl") + ",</i>\" you smile.  Before " + monster.pronoun1 + " can react, you grab " + monster.pronoun2 + " and smoosh " + monster.pronoun3 + " face into your " + player.BreastDescriptor.describeAllBreasts(player) + ", nearly choking " + monster.pronoun2 + " in the canyon of your cleavage.  " + monster.mf("He", "She") + " struggles for a moment.  You give " + monster.pronoun2 + " a little kiss on the head and step back, ready for combat.", false);
                breasts = true;
                chance += 2;
                damage += 4;
                break;
            //Magic Tease
            case 26:
                MainScreen.text("Seeing a lull in the battle, you plant your " + player.weaponName + " on the ground and let your magic flow through you.  You summon a trickle of magic into a thick, slowly growing black ball of lust.  You wave the ball in front of you, making a little dance and striptease out of the affair as you slowly saturate the area with latent sexual magics.", false);
                chance++;
                damage += 2;
                break;
            //Feeder
            case 27:
                MainScreen.text("You present your swollen breasts full of milk to " + monster.a + monster.short + " and say \"<i>Wouldn't you just love to lie back in my arms and enjoy what I have to offer you?</i>\"", false);
                breasts = true;
                chance++;
                damage++;
                break;
            //28 FEMALE TEACHER COSTUME TEASE
            case 28:
                MainScreen.text("You turn to the side and give " + monster.a + monster.short + " a full view of your body.  You ask them if they're in need of a private lesson in lovemaking after class.", false);
                ass = true;
                break;
            //29 Male Teacher Outfit Tease
            case 29:
                MainScreen.text("You play with the strings on your outfit a bit and ask " + monster.a + monster.short + " just how much do they want to see their teacher pull them off?", false);
                chance++;
                damage += 3;
                break;
            //30 Naga Fetish Clothes
            case 30:
                MainScreen.text("You sway your body back and forth, and do an erotic dance for " + monster.a + monster.short + ".", false);
                chance += 2;
                damage += 4;
                break;
            //31 Centaur harness clothes
            case 31:
                MainScreen.text("You rear back, and declare that, \"<i>This horse is ready to ride, all night long!</i>\"", false);
                chance += 2;
                damage += 4;
                break;
            //32 Genderless servant clothes
            case 32:
                MainScreen.text("You turn your back to your foe, and flip up your butt flap for a moment.   Your " + ButtDescriptor.describeButt(player) + " really is all you have to offer downstairs.", false);
                ass = true;
                chance++;
                damage += 2;
                break;
            //33 Crotch Revealing Clothes (herm only?)
            case 33:
                MainScreen.text("You do a series of poses to accentuate what you've got on display with your crotch revealing clothes, while asking if your " + player.mf("master", "mistress") + " is looking to sample what is on display.", false);
                chance += 2;
                damage += 4;
                break;
            //34 Maid Costume (female only)
            case 34:
                MainScreen.text("You give a rather explicit curtsey towards " + monster.a + monster.short + " and ask them if your " + player.mf("master", "mistress") + " is interested in other services today.", false);
                chance++;
                damage += 2;
                breasts = true;
                break;
            //35 Servant Boy Clothes (male only)
            case 35:
                MainScreen.text("You brush aside your crotch flap for a moment, then ask " + monster.a + monster.short + " if, " + player.mf("Master", "Mistress") + " would like you to use your " + player.CockDescriptor.describeMultiCockShort(player) + " on them?", false);
                penis = true;
                chance++;
                damage += 2;
                break;
            //36 Bondage Patient Clothes (done):
            case 36:
                MainScreen.text("You pull back one of the straps on your bondage cloths and let it snap back.  \"<i>I need some medical care, feeling up for it?</i>\" you tease.", false);
                damage += 2;
                chance++;
                break;
            default:
                MainScreen.text("You shimmy and shake sensually. (An error occurred.)", false);
                break;
            case 37:
                MainScreen.text("You purse your lips coyly, narrowing your eyes mischievously and beckoning to " + monster.a + monster.short + " with a burning come-hither glare.  Sauntering forward, you pop your hip to the side and strike a coquettish pose, running " + ((player.lowerBody.tailVenom > 1) ? "one of your tails" : "your tail") + " up and down " + monster.pronoun3 + " body sensually.");
                chance += 6;
                damage += 3;
                break;
            case 38:
                MainScreen.text("You wet your lips, narrowing your eyes into a smoldering, hungry gaze.  Licking the tip of your index finger, you trail it slowly and sensually down the front of your " + player.inventory.armor.displayName + ", following the line of your " + chestDesc() + " teasingly.  You hook your thumbs into your top and shimmy it downward at an agonizingly slow pace.  The very instant that your [nipples] pop free, your tail crosses in front, obscuring " + monster.a + monster.short + "'s view.");
                breasts = true;
                chance++;
                damage++;
                break;
            case 39:
                MainScreen.text("Leaning forward, you bow down low, raising a hand up to your lips and blowing " + monster.a + monster.short + " a kiss.  You stand straight, wiggling your " + LowerBodyDescriptor.describeHips(player) + " back and forth seductively while trailing your fingers down your front slowly, pouting demurely.  The tip of ");
                if (player.lowerBody.tailVenom == 1) MainScreen.text("your");
                else MainScreen.text("a");
                MainScreen.text(" bushy tail curls up around your " + LowerBodyDescriptor.describeLeg(player) + ", uncoiling with a whipping motion that makes an audible crack in the air.");
                ass = true;
                chance++;
                damage += 1;
                break;
            case 40:
                MainScreen.text("Turning around, you stare demurely over your shoulder at " + monster.a + monster.short + ", batting your eyelashes amorously.");
                if (player.lowerBody.tailVenom == 1) MainScreen.text("  Your tail twists and whips about, sliding around your " + LowerBodyDescriptor.describeHips(player) + " in a slow arc and framing your rear nicely as you slowly lift your " + player.inventory.armor.displayName + ".");
                else MainScreen.text("  Your tails fan out, twisting and whipping sensually, sliding up and down your " + LowerBodyDescriptor.describeLegs(player) + " and framing your rear nicely as you slowly lift your " + player.inventory.armor.displayName + ".");
                MainScreen.text("  As your [butt] comes into view, you brush your tail" + ((player.lowerBody.tailVenom > 1) ? "s" : "") + " across it, partially obscuring the view in a tantalizingly teasing display.");
                ass = true;
                anus = true;
                chance++;
                damage += 2;
                break;
            case 41:
                MainScreen.text("Smirking coyly, you sway from side to side, running your tongue along your upper teeth seductively.  You hook your thumbs into your " + player.inventory.armor.displayName + " and pull them away to partially reveal ");
                if (player.lowerBody.cockSpot.count() > 0) MainScreen.text(player.CockDescriptor.describeMultiCockSimpleOne(player));
                if (player.gender == 3) MainScreen.text(" and ");
                if (player.gender >= 2) MainScreen.text("your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)));
                MainScreen.text(".  Your bushy tail" + ((player.lowerBody.tailVenom > 1) ? "s" : "") + " cross" + ((player.lowerBody.tailVenom > 1) ? "" : "es") + " in front, wrapping around your genitals and obscuring the view teasingly.");
                vagina = true;
                penis = true;
                damage += 2;
                chance++;
                break;
            case 42:
                //Tease #1:
                if (rand(2) == 0) {
                    MainScreen.text("You lift your skirt and flash your king-sized stallionhood, already unsheathing itself and drooling pre, at your opponent.  \"<i>Come on, then; I got plenty of girlcock for you if that's what you want!</i>\" you cry.");
                    penis = true;
                    damage += 3;
                    chance--;
                }
                //Tease #2:
                else {
                    MainScreen.text("You turn partially around and then bend over, swaying your tail from side to side in your most flirtatious manner and wiggling your hips seductively, your skirt fluttering with the motions.  \"<i>Come on then, what are you waiting for?  This is a fine piece of ass here,</i>\" you grin, spanking yourself with an audible slap.");
                    ass = true;
                    chance += 2;
                    damage += 3;
                }
                break;
            case 43:
                let cows: number = rand(7);
                if (cows == 0) {
                    MainScreen.text("You tuck your hands under your chin and use your arms to squeeze your massive, heavy breasts together.  Milk squirts from your erect nipples, filling the air with a rich, sweet scent.");
                    breasts = true;
                    chance += 2;
                    damage++;
                }
                else if (cows == 1) {
                    MainScreen.text("Moaning, you bend forward, your full breasts nearly touching the ground as you sway your [hips] from side to side.  Looking up from under heavily-lidded eyes, you part your lips and lick them, letting out a low, lustful \"<i>Mooooo...</i>\"");
                    breasts = true;
                    chance += 2;
                    damage += 2;
                }
                else if (cows == 2) {
                    MainScreen.text("You tuck a finger to your lips, blinking innocently, then flick your tail, wafting the scent of your ");
                    if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 3) MainScreen.text("dripping ");
                    MainScreen.text("sex through the air.");
                    vagina = true;
                    chance++;
                    damage++;
                }
                else if (cows == 3) {
                    MainScreen.text("You heft your breasts, fingers splayed across your [nipples] as you SQUEEZE.  Milk runs in rivulets over your hands and down the massive curves of your breasts, soaking your front with sweet, sticky milk.");
                    breasts = true;
                    chance += 3;
                    damage++;
                }
                else if (cows == 4) {
                    MainScreen.text("You lift a massive breast to your mouth, suckling loudly at yourself, finally letting go of your nipple with a POP and a loud, satisfied gasp, milk running down your chin.");
                    breasts = true;
                    chance++;
                    damage += 3;
                }
                else if (cows == 5) {
                    MainScreen.text("You crouch low, letting your breasts dangle in front of you.  Each hand caresses one in turn as you slowly milk yourself onto your thighs, splashing white, creamy milk over your hips and sex.");
                    vagina = true;
                    breasts = true;
                    chance++;
                }
                else {
                    MainScreen.text("You lift a breast to your mouth, taking a deep draught of your own milk, then tilt your head back.  With a low moan, you let it run down your front, winding a path between your breasts until it drips sweetly from your crotch.");
                    vagina = true;
                    breasts = true;
                    damage += 2;
                }
                if (monster.short.indexOf("minotaur") != -1) {
                    damage += 6;
                    chance += 3;
                }
                break;
            //lusty maiden's armor teases
            case 44:
                let maiden: number = rand(5);
                damage += 5;
                chance += 3;
                if (maiden == 0) {
                    MainScreen.text("Confidently sauntering forward, you thrust your chest out with your back arched in order to enhance your [chest].  You slowly begin to shake your torso back and forth, slapping your chain-clad breasts against each other again and again.  One of your hands finds its way to one of the pillowy expanses and grabs hold, fingers sinking into the soft tit through the fine, mail covering.  You stop your shaking to trace a finger down through the exposed center of your cleavage, asking, \"<i>Don't you just want to snuggle inside?</i>\"");
                    breasts = true;
                }
                else if (maiden == 1) {
                    MainScreen.text("You skip up to " + monster.a + monster.short + " and spin around to rub your barely-covered butt up against " + monster.pronoun2 + ".  Before " + monster.pronoun1 + " can react, you're slowly bouncing your [butt] up and down against " + monster.pronoun3 + " groin.  When " + monster.pronoun1 + " reaches down, you grab " + monster.pronoun3 + " hand and press it up, under your skirt, right against the steamy seal on your sex.  The simmering heat of your overwhelming lust burns hot enough for " + monster.pronoun2 + " to feel even through the contoured leather, and you let " + monster.pronoun2 + " trace the inside of your [leg] for a moment before moving away, laughing playfully.");
                    ass = true;
                    vagina = true;
                }
                else if (maiden == 2) {
                    MainScreen.text("You flip up the barely-modest chain you call a skirt and expose your g-string to " + monster.a + monster.short + ".  Slowly swaying your [hips], you press a finger down on the creased crotch plate and exaggerate a lascivious moan into a throaty purr of enticing, sexual bliss.  Your eyes meet " + monster.pronoun3 + ", and you throatily whisper, \"<i>");
                    if (player.hasVirginVagina()) MainScreen.text("Think you can handle a virgin's infinite lust?");
                    else MainScreen.text("Think you have what it takes to satisfy this perfect pussy?");
                    MainScreen.text("</i>\"");
                    vagina = true;
                    damage += 3;
                }
                else if (maiden == 3) {
                    MainScreen.text("You seductively wiggle your way up to " + monster.a + monster.short + ", and before " + monster.pronoun1 + " can react to your salacious advance, you snap a [leg] up in what would be a vicious kick, if you weren't simply raising it to rest your [foot] on " + monster.pronoun3 + " shoulder.  With your thighs so perfectly spready, your skirt is lifted, and " + monster.a + monster.short + " is given a perfect view of your thong-enhanced cameltoe and the moisture that beads at the edges of your not-so-modest covering.");
                    vagina = true;
                }
                else {
                    MainScreen.text("Bending over, you lift your [butt] high in the air.  Most of your barely-covered tush is exposed, but the hem of your chainmail skirt still protects some of your anal modesty.  That doesn't last long.  You start shaking your [butt] up, down, back, and forth to an unheard rhythm, flipping the pointless covering out of the way so that " + monster.a + monster.short + " can gaze upon your curvy behind in it all its splendid detail.  A part of you hopes that " + monster.pronoun1 + " takes in the intricate filigree on the back of your thong, though to " + monster.pronoun2 + " it looks like a bunch of glittering arrows on an alabaster background, all pointing squarely at your [asshole].");
                    ass = true;
                    chance += 2;
                }
                break;
        }
        //===========================
        //BUILD BONUSES IF APPLICABLE
        //===========================	
        let bonusChance: number = 0;
        let bonusDamage: number = 0;
        if (auto) {
            //TIT BONUSES
            if (breasts) {
                if (player.upperBody.chest.count() > 1) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.count() > 2) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.count() > 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 2) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 3) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 7) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 12) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 25) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 50) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.upperBody.chest.hasFuckableNipples()) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (player.upperBody.chest.averageNipplesPerBreast() > 1) {
                    bonusChance++;
                    bonusDamage += 2;
                }
            }
            //PUSSY BONUSES
            if (vagina) {
                if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 2) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 3) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 5) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.vaginaSpot.get(0).clitLength > 1.5) {
                    bonusChance += .5;
                    bonusDamage++;
                }
                if (player.lowerBody.vaginaSpot.get(0).clitLength > 3.5) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.vaginaSpot.get(0).clitLength > 7) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.vaginaSpot.get(0).clitLength > 12) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.vaginalCapacity() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.vaginalCapacity() >= 70) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.vaginalCapacity() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.vaginalCapacity() >= 200) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
            }
            //Penis bonuses!
            if (penis) {
                if (player.lowerBody.cockSpot.count() > 1) {
                    bonusChance += 1;
                    bonusDamage += 2;
                }
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 15) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 60) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.cumQ() >= 50) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.cumQ() >= 150) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.cumQ() >= 300) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.cumQ() >= 1000) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (balls > 0) {
                    if (player.lowerBody.balls > 2) {
                        bonusChance += 1;
                        bonusDamage += 2;
                    }
                    if (player.lowerBody.ballSize > 3) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                    if (player.lowerBody.ballSize > 7) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                    if (player.lowerBody.ballSize > 12) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                }
                if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() < 8) {
                    bonusChance--;
                    bonusDamage -= 2;
                    if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() < 5) {
                        bonusChance--;
                        bonusDamage -= 2;
                    }
                }
            }
            if (ass) {
                if (player.lowerBody.butt.buttRating >= 6) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.butt.buttRating >= 10) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.butt.buttRating >= 13) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.butt.buttRating >= 16) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.butt.buttRating >= 20) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.hipRating >= 6) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.hipRating >= 10) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.hipRating >= 13) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.hipRating >= 16) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.hipRating >= 20) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
            }
            if (anus) {
                if (player.lowerBody.butt.analLooseness == 0) {
                    bonusChance += 1.5;
                    bonusDamage += 3;
                }
                if (player.lowerBody.butt.analWetness > 0) {
                    bonusChance += 1;
                    bonusDamage += 2;
                }
                if (player.analCapacity() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.analCapacity() >= 70) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.analCapacity() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.analCapacity() >= 200) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.butt.analLooseness == 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (player.lowerBody.butt.analLooseness == 5) {
                    bonusChance += 1.5;
                    bonusDamage += 3;
                }
            }
            //Trim it down!
            if (bonusChance > 5) bonusChance = 5;
            if (bonusDamage > 10) bonusDamage = 10;
        }
        //Land the hit!
        if (rand(100) <= chance + rand(bonusChance)) {
            //NERF TEASE DAMAGE
            damage *= .7;
            bonusDamage *= .7;
            if (player.perks.has("HistoryWhore")) {
                damage *= 1.15;
                bonusDamage *= 1.15;
            }
            if (player.perks.has("ChiReflowLust")) damage *= UmasShop.NEEDLEWORK_LUST_TEASE_DAMAGE_MULTI;
            if (monster.plural) damage *= 1.3;
            damage = (damage + rand(bonusDamage)) * monster.lustVuln;

            if (monster instanceof JeanClaude) (monster as JeanClaude).handleTease(damage, true);
            else if (monster instanceof Doppleganger && monster.findStatusAffect(StatusAffects.Stunned) < 0) (monster as Doppleganger).mirrorTease(damage, true);
            else if (!justText) monster.teased(damage);

            if (Flags.list[FlagEnum.PC_FETISH] >= 1 && !urtaQuest.isUrta()) {
                if (player.stats.lust < 75) MainScreen.text("\nFlaunting your body in such a way gets you a little hot and bothered.", false);
                else MainScreen.text("\nIf you keep exposing yourself you're going to get too horny to fight back.  This exhibitionism fetish makes it hard to resist just stripping naked and giving up.", false);
                if (!justText) dynStats("lus", 2 + rand(3));
            }

            // Similar to fetish check, only add XP if the player IS the player...
            if (!justText && !urtaQuest.isUrta()) teaseXP(1);
        }
        //Nuttin honey
        else {
            if (!justText && !urtaQuest.isUrta()) teaseXP(5);

            if (monster instanceof JeanClaude) (monster as JeanClaude).handleTease(0, false);
            else if (monster instanceof Doppleganger) (monster as Doppleganger).mirrorTease(0, false);
            else if (!justText) MainScreen.text("\n" + monster.capitalA + monster.short + " seems unimpressed.", false);
        }
        MainScreen.text("\n\n", false);
    }

    public teaseXP(XP: number = 0): void {
        while (XP > 0) {
            XP--;
            player.teaseXP++;
            //Level dat shit up!
            if (player.teaseLevel < 5 && player.teaseXP >= 10 + (player.teaseLevel + 1) * 5 * (player.teaseLevel + 1)) {
                MainScreen.text("\n<b>Tease skill leveled up to " + (player.teaseLevel + 1) + "!</b>", false);
                player.teaseLevel++;
                player.teaseXP = 0;
            }
        }
    }

    //VICTORY OR DEATH?
    public combatRoundOver(): boolean { //Called after the monster's action
        statScreenRefresh();
        if (!inCombat) return false;
        if (monster.HP < 1) {
            doNext(endHpVictory);
            return true;
        }
        if (monster.lust > 99) {
            doNext(endLustVictory);
            return true;
        }
        if (monster.statusAffects.has("Level")) {
            if ((monster as SandTrap).trapLevel() <= 1) {
                desert.sandTrapScene.sandtrapmentLoss();
                return true;
            }
        }
        if (monster.short == "basilisk" && player.stats.spe <= 1) {
            doNext(endHpLoss);
            return true;
        }
        if (player.HP < 1) {
            doNext(endHpLoss);
            return true;
        }
        if (player.stats.lust > 99) {
            doNext(endLustLoss);
            return true;
        }
        doNext(playerMenu); //This takes us back to the combatMenu and a new combat round
        return false;
    }

    public hasSpells(): boolean {
        return player.hasSpells();
    }
    public spellCount(): number {
        return player.stats.spellCount();
    }

    public magicMenu(): void {
        //Pass false to combatMenu instead:	menuLoc = 3;
        if (inCombat && player.statusAffects.has("Sealed") && player.statusAffects.get("Sealed").value2 == 2) {
            MainScreen.clearText();
            MainScreen.text("You reach for your magic, but you just can't manage the focus necessary.  <b>Your ability to use magic was sealed, and now you've wasted a chance to attack!</b>\n\n");
            enemyAI();
            return;
        }
        menu();
        MainScreen.clearText();
        MainScreen.text("What spell will you use?\n\n");
        //WHITE SHITZ
        let whiteLustCap: number = 75;
        if (player.perks.has("Enlightened") && player.stats.cor < 10) whiteLustCap += 10;

        if (player.stats.lust >= whiteLustCap)
            MainScreen.text("You are far too aroused to focus on white magic.\n\n");
        else {
            if (player.statusAffects.has("KnowsCharge")) {
                if (!player.statusAffects.has("ChargeWeapon"))
                    MainScreen.addButton(0, "Charge W.", spellChargeWeapon);
                else MainScreen.text("<b>Charge weapon is already active and cannot be cast again.</b>\n\n");
            }
            if (player.statusAffects.has("KnowsBlind")) {
                if (monster.findStatusAffect(StatusAffects.Blind) < 0)
                    MainScreen.addButton(1, "Blind", spellBlind);
                else MainScreen.text("<b>" + monster.capitalA + monster.short + " is already affected by blind.</b>\n\n");
            }
            if (player.statusAffects.has("KnowsWhitefire")) MainScreen.addButton(2, "Whitefire", spellWhitefire);
        }
        //BLACK MAGICSKS
        if (player.stats.lust < 50)
            MainScreen.text("You aren't turned on enough to use any black magics.\n\n");
        else {
            if (player.statusAffects.has("KnowsArouse")) MainScreen.addButton(5, "Arouse", spellArouse);
            if (player.statusAffects.has("KnowsHeal")) MainScreen.addButton(6, "Heal", spellHeal);
            if (player.statusAffects.has("KnowsMight")) {
                if (!player.statusAffects.has("Might"))
                    MainScreen.addButton(7, "Might", spellMight);
                else MainScreen.text("<b>You are already under the effects of Might and cannot cast it again.</b>\n\n");
            }
        }
        // JOJO ABILITIES -- kind makes sense to stuff it in here along side the white magic shit (also because it can't fit into M. Specials :|
        if (player.perks.has("CleansingPalm") && player.stats.cor < 10) {
            MainScreen.addButton(3, "C.Palm", spellCleansingPalm);
        }
        MainScreen.addButton(9, "Back", combatMenu, false);
    }

    public spellMod(): number {
        let mod: number = 1;
        if (player.perks.has("Archmage") && player.stats.int >= 75) mod += .5;
        if (player.perks.has("Channeling") && player.stats.int >= 60) mod += .5;
        if (player.perks.has("Mage") && player.stats.int >= 50) mod += .5;
        if (player.perks.has("Spellpower") && player.stats.int >= 50) mod += .5;
        if (player.perks.has("WizardsFocus")) {
            mod += player.perkv1(PerkLib.WizardsFocus);
        }
        if (player.perks.has("ChiReflowMagic")) mod += UmasShop.NEEDLEWORK_MAGIC_SPELL_MULTI;
        return mod;
    }
    public spellArouse(): void {
        if (!player.perks.has("BloodMage") && player.fatigue + spellCost(15) > 100) {
            MainScreen.text("You are too tired to cast this spell.", true);
            doNext(magicMenu);
            return;
        }
        doNext(combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(15, 1);
        statScreenRefresh();
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            enemyAI();
            return;
        }
        MainScreen.text("You make a series of arcane gestures, drawing on your own lust to inflict it upon your foe!\n", true);
        //Worms be immune
        if (monster.short == "worms") {
            MainScreen.text("The worms appear to be unaffected by your magic!", false);
            MainScreen.text("\n\n", false);
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            doNext(playerMenu);
            if (monster.lust >= 100) doNext(endLustVictory);
            else enemyAI();
            return;
        }
        if (monster.lustVuln == 0) {
            MainScreen.text("It has no effect!  Your foe clearly does not experience lust in the same way as you.\n\n", false);
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            enemyAI();
            return;
        }
        monster.lust += monster.lustVuln * (player.stats.int / 5 * spellMod() + rand(monster.lib - monster.inte * 2 + monster.cor) / 5);
        if (monster.lust < 30) MainScreen.text(monster.capitalA + monster.short + " squirms as the magic affects " + monster.pronoun2 + ".  ", false);
        if (monster.lust >= 30 && monster.lust < 60) {
            if (monster.plural) MainScreen.text(monster.capitalA + monster.short + " stagger, suddenly weak and having trouble focusing on staying upright.  ", false);
            else MainScreen.text(monster.capitalA + monster.short + " staggers, suddenly weak and having trouble focusing on staying upright.  ", false);
        }
        if (monster.lust >= 60) {
            MainScreen.text(monster.capitalA + monster.short + "'");
            if (!monster.plural) MainScreen.text("s");
            MainScreen.text(" eyes glaze over with desire for a moment.  ", false);
        }
        if (monster.cocks.length > 0) {
            if (monster.lust >= 60 && monster.cocks.length > 0) MainScreen.text("You see " + monster.pronoun3 + " " + monster.CockDescriptor.describeMultiCockShort(player) + " dribble pre-cum.  ", false);
            if (monster.lust >= 30 && monster.lust < 60 && monster.cocks.length == 1) MainScreen.text(monster.capitalA + monster.short + "'s " + monster.cockDescriptShort(0) + " hardens, distracting " + monster.pronoun2 + " further.  ", false);
            if (monster.lust >= 30 && monster.lust < 60 && monster.cocks.length > 1) MainScreen.text("You see " + monster.pronoun3 + " " + monster.CockDescriptor.describeMultiCockShort(player) + " harden uncomfortably.  ", false);
        }
        if (monster.vaginas.length > 0) {
            if (monster.plural) {
                if (monster.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.NORMAL) MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s dampen perceptibly.  ", false);
                if (monster.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.WET) MainScreen.text(monster.capitalA + monster.short + "'s crotches become sticky with girl-lust.  ", false);
                if (monster.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.SLICK) MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s become sloppy and wet.  ", false);
                if (monster.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.DROOLING) MainScreen.text("Thick runners of girl-lube stream down the insides of " + monster.a + monster.short + "'s thighs.  ", false);
                if (monster.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.SLAVERING) MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s instantly soak " + monster.pronoun2 + " groin.  ", false);
            }
            else {
                if (monster.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.NORMAL) MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " dampens perceptibly.  ", false);
                if (monster.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.WET) MainScreen.text(monster.capitalA + monster.short + "'s crotch becomes sticky with girl-lust.  ", false);
                if (monster.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.SLICK) MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " becomes sloppy and wet.  ", false);
                if (monster.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.DROOLING) MainScreen.text("Thick runners of girl-lube stream down the insides of " + monster.a + monster.short + "'s thighs.  ", false);
                if (monster.lust >= 60 && monster.vaginas[0].vaginalWetness == VaginaWetness.SLAVERING) MainScreen.text(monster.capitalA + monster.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " instantly soaks her groin.  ", false);
            }
        }
        MainScreen.text("\n\n", false);
        doNext(playerMenu);
        Flags.list[FlagEnum.SPELLS_CAST]++;
        spellPerkUnlock();
        if (monster.lust >= 100) doNext(endLustVictory);
        else enemyAI();
        return;
    }
    public spellHeal(): void {
        if (!player.perks.has("BloodMage") && player.fatigue + spellCost(20) > 100) {
            MainScreen.text("You are too tired to cast this spell.", true);
            doNext(magicMenu);
            return;
        }
        doNext(combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(20, 1);
        MainScreen.text("You focus on your body and its desire to end pain, trying to draw on your arousal without enhancing it.\n", true);
        //25% backfire!
        if (rand(4) == 0) {
            MainScreen.text("An errant sexual thought crosses your mind, and you lose control of the spell!  Your ", false);
            if (player.gender == 0) MainScreen.text(ButtDescriptor.describeButthole(player) + " tingles with a desire to be filled as your libido spins out of control.", false);
            if (player.gender == 1) {
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text(player.CockDescriptor.describeCock(player, 0) + " twitches obscenely and drips with pre-cum as your libido spins out of control.", false);
                else MainScreen.text(player.CockDescriptor.describeMultiCockShort(player) + " twitch obscenely and drip with pre-cum as your libido spins out of control.", false);
            }
            if (player.gender == 2) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " becomes puffy, hot, and ready to be touched as the magic diverts into it.", false);
            if (player.gender == 3) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " and " + player.CockDescriptor.describeMultiCockShort(player) + " overfill with blood, becoming puffy and incredibly sensitive as the magic focuses on them.", false);
            player.stats.lib += .25;
            player.stats.lust += 15;
        }
        else {
            temp = int((player.stats.int / (2 + rand(3)) * spellMod()) * (maxHP() / 150));
            if (player.inventory.armor.displayName == "skimpy nurse's outfit") temp *= 1.2;
            MainScreen.text("You flush with success as your wounds begin to knit (+" + temp + ").", false);
            HPChange(temp, false);
        }
        MainScreen.text("\n\n", false);
        statScreenRefresh();
        Flags.list[FlagEnum.SPELLS_CAST]++;
        spellPerkUnlock();
        if (player.stats.lust >= 100) doNext(endLustLoss);
        else enemyAI();
        return;
    }

    //(25) Might – increases strength/toughness by 5 * spellMod, up to a 
    //maximum of 15, allows it to exceed the maximum.  Chance of backfiring 
    //and increasing lust by 15.
    public spellMight(): void {
        if (!player.perks.has("BloodMage") && player.fatigue + spellCost(25) > 100) {
            MainScreen.text("You are too tired to cast this spell.", true);
            doNext(magicMenu);
            return;
        }
        doNext(combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(25, 1);
        let tempStr: number = 0;
        let tempTou: number = 0;
        MainScreen.text("You flush, drawing on your body's desires to empower your muscles and toughen you up.\n\n", true);
        //25% backfire!
        if (rand(4) == 0) {
            MainScreen.text("An errant sexual thought crosses your mind, and you lose control of the spell!  Your ", false);
            if (player.gender == 0) MainScreen.text(ButtDescriptor.describeButthole(player) + " tingles with a desire to be filled as your libido spins out of control.", false);
            if (player.gender == 1) {
                if (player.lowerBody.cockSpot.count() == 1) MainScreen.text(player.CockDescriptor.describeCock(player, 0) + " twitches obscenely and drips with pre-cum as your libido spins out of control.", false);
                else MainScreen.text(player.CockDescriptor.describeMultiCockShort(player) + " twitch obscenely and drip with pre-cum as your libido spins out of control.", false);
            }
            if (player.gender == 2) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " becomes puffy, hot, and ready to be touched as the magic diverts into it.", false);
            if (player.gender == 3) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " and " + player.CockDescriptor.describeMultiCockShort(player) + " overfill with blood, becoming puffy and incredibly sensitive as the magic focuses on them.", false);
            player.stats.lib += .25;
            player.stats.lust += 15;
        }
        else {
            MainScreen.text("The rush of success and power flows through your body.  You feel like you can do anything!", false);
            player.statusAffects.add(new StatusAffect("Might", 0, 0, 0, 0)));
            temp = 5 * spellMod();
            tempStr = temp;
            tempTou = temp;
            if (player.stats.str + temp > 100) tempStr = 100 - player.stats.str;
            if (player.stats.tou + temp > 100) tempTou = 100 - player.stats.tou;
            player.changeStatusValue(StatusAffects.Might, 1, tempStr);
            player.changeStatusValue(StatusAffects.Might, 2, tempTou);
            if (player.stats.str < 100) {
                mainView.statsView.showStatUp('str');
                // strUp.visible = true;
                // strDown.visible = false;
                mainView.statsView.showStatUp('tou');
                // touUp.visible = true;
                // touDown.visible = false;
            }
            player.stats.str += player.statusAffects.get("Might").value1;
            player.stats.tou += player.statusAffects.get("Might").value2;
        }
        MainScreen.text("\n\n", false);
        statScreenRefresh();
        Flags.list[FlagEnum.SPELLS_CAST]++;
        spellPerkUnlock();
        if (player.stats.lust >= 100) doNext(endLustLoss);
        else enemyAI();
        return;
    }

    //(15) Charge Weapon – boosts your weapon attack value by 10 * SpellMod till the end of combat.
    public spellChargeWeapon(): void {
        if (!player.perks.has("BloodMage") && player.fatigue + spellCost(15) > 100) {
            MainScreen.text("You are too tired to cast this spell.", true);
            doNext(magicMenu);
            return;
        }
        doNext(combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(15, 1);
        MainScreen.text("You utter words of power, summoning an electrical charge around your " + player.weaponName + ".  It crackles loudly, ensuring you'll do more damage with it for the rest of the fight.\n\n", true);
        player.statusAffects.add(new StatusAffect("ChargeWeapon", 10 * spellMod())), 0, 0, 0);
        statScreenRefresh();
        Flags.list[FlagEnum.SPELLS_CAST]++;
        spellPerkUnlock();
        enemyAI();
    }
    //(20) Blind – reduces your opponent's accuracy, giving an additional 50% miss chance to physical attacks.
    public spellBlind(): void {
        MainScreen.text("", true);
        if (!player.perks.has("BloodMage") && player.fatigue + spellCost(20) > 100) {
            MainScreen.text("You are too tired to cast this spell.", true);
            doNext(magicMenu);
            return;
        }
        doNext(combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(20, 1);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            enemyAI();
            return;
        }
        if (monster instanceof JeanClaude) {
            MainScreen.text("Jean-Claude howls, reeling backwards before turning back to you, rage clenching his dragon-like face and enflaming his eyes. Your spell seemed to cause him physical pain, but did nothing to blind his lidless sight.");

            MainScreen.text("\n\n“<i>You think your hedge magic will work on me, intrus?</i>” he snarls. “<i>Here- let me show you how it’s really done.</i>” The light of anger in his eyes intensifies, burning a retina-frying white as it demands you stare into it...");

            if (rand(player.stats.spe) >= 50 || rand(player.stats.int) >= 50) {
                MainScreen.text("\n\nThe light sears into your eyes, but with the discipline of conscious effort you escape the hypnotic pull before it can mesmerize you, before Jean-Claude can blind you.");

                MainScreen.text("\n\n“<i>You fight dirty,</i>” the monster snaps. He sounds genuinely outraged. “<i>I was told the interloper was a dangerous warrior, not a little [boy] who accepts duels of honour and then throws sand into his opponent’s eyes. Look into my eyes, little [boy]. Fair is fair.</i>”");

                monster.HP -= int(10 + (player.stats.int / 3 + rand(player.stats.int / 2)) * spellMod());
            }
            else {
                MainScreen.text("\n\nThe light sears into your eyes and mind as you stare into it. It’s so powerful, so infinite, so exquisitely painful that you wonder why you’d ever want to look at anything else, at anything at- with a mighty effort, you tear yourself away from it, gasping. All you can see is the afterimages, blaring white and yellow across your vision. You swipe around you blindly as you hear Jean-Claude bark with laughter, trying to keep the monster at arm’s length.");

                MainScreen.text("\n\n“<i>The taste of your own medicine, it is not so nice, eh? I will show you much nicer things in there in time intrus, don’t worry. Once you have learnt your place.</i>”");

                player.statusAffects.add(new StatusAffect("Blind", rand(4))) + 1, 0, 0, 0);
            }

            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            if (monster.HP < 1) doNext(endHpVictory);
            else enemyAI();
            return;
        }
        MainScreen.text("You glare at " + monster.a + monster.short + " and point at " + monster.pronoun2 + ".  A bright flash erupts before " + monster.pronoun2 + "!\n", true);
        if (monster instanceof LivingStatue) {
            // noop
        }
        else if (rand(3) != 0) {
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
        spellPerkUnlock();
        statScreenRefresh();
        enemyAI();
    }
    //(30) Whitefire – burns the enemy for 10 + int/3 + rand(int/2) * spellMod.
    public spellWhitefire(): void {
        MainScreen.text("", true);
        if (!player.perks.has("BloodMage") && player.fatigue + spellCost(30) > 100) {
            MainScreen.text("You are too tired to cast this spell.", true);
            doNext(magicMenu);
            return;
        }
        doNext(combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(30, 1);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            enemyAI();
            return;
        }
        if (monster instanceof Doppleganger) {
            (monster as Doppleganger).handleSpellResistance("whitefire");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            return;
        }
        MainScreen.text("You narrow your eyes, focusing your mind with deadly intent.  You snap your fingers and " + monster.a + monster.short + " is enveloped in a flash of white flames!\n", true);
        temp = int(10 + (player.stats.int / 3 + rand(player.stats.int / 2)) * spellMod());
        //High damage to goes.
        if (monster.short == "goo-girl") temp = Math.round(temp * 1.5);
        MainScreen.text(monster.capitalA + monster.short + " takes " + temp + " damage.", false);
        //Using fire attacks on the goo]
        if (monster.short == "goo-girl") {
            MainScreen.text("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer.", false);
            if (monster.findPerk(PerkLib.Acid) < 0) monster.createPerk(PerkLib.Acid, 0, 0, 0, 0);
        }
        MainScreen.text("\n\n", false);
        Flags.list[FlagEnum.SPELLS_CAST]++;
        spellPerkUnlock();
        monster.HP -= temp;
        statScreenRefresh();
        if (monster.HP < 1) doNext(endHpVictory);
        else enemyAI();
    }

    public spellCleansingPalm(): void {
        MainScreen.clearText();
        if (!player.perks.has("BloodMage") && player.fatigue + spellCost(30) > 100) {
            MainScreen.text("You are too tired to cast this spell.", true);
            doNext(magicMenu);
            return;
        }
        doNext(combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(30, 1);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            enemyAI();
            return;
        }

        if (monster.short == "Jojo") {
            // Not a completely corrupted monkmouse
            if (kGAMECLASS.monk < 2) {
                MainScreen.text("You thrust your palm forward, sending a blast of pure energy towards Jojo. At the last second he sends a blast of his own against yours canceling it out\n\n");
                Flags.list[FlagEnum.SPELLS_CAST]++;
                spellPerkUnlock();
                enemyAI();
                return;
            }
        }

        if (monster instanceof LivingStatue) {
            MainScreen.text("You thrust your palm forward, causing a blast of pure energy to slam against the giant stone statue- to no effect!");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            enemyAI();
            return;
        }

        let corruptionMulti: number = (monster.cor - 20) / 25;
        if (corruptionMulti > 1.5) corruptionMulti = 1.5;

        temp = int((player.stats.int / 4 + rand(player.stats.int / 3)) * (spellMod() * corruptionMulti));

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
        spellPerkUnlock();
        monster.HP -= temp;
        statScreenRefresh();
        if (monster.HP < 1) doNext(endHpVictory);
        else enemyAI();
    }

    public spellPerkUnlock(): void {
        if (Flags.list[FlagEnum.SPELLS_CAST] >= 5 && !player.perks.has("SpellcastingAffinity")) {
            MainScreen.text("<b>You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!</b>\n\n");
            player.perks.add(new Perk("SpellcastingAffinity", 20, 0, 0, 0));
        }
        if (Flags.list[FlagEnum.SPELLS_CAST] >= 15 && player.perkv1(PerkLib.SpellcastingAffinity) < 35) {
            MainScreen.text("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b>\n\n");
            player.setPerkValue(PerkLib.SpellcastingAffinity, 1, 35);
        }
        if (Flags.list[FlagEnum.SPELLS_CAST] >= 45 && player.perkv1(PerkLib.SpellcastingAffinity) < 50) {
            MainScreen.text("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b>\n\n");
            player.setPerkValue(PerkLib.SpellcastingAffinity, 1, 50);
        }
    }

    //player gains hellfire perk.  
    //Hellfire deals physical damage to completely pure foes, 
    //lust damage to completely corrupt foes, and a mix for those in between.  Its power is based on the PC's corruption and level.  Appearance is slightly changed to mention that the PC's eyes and mouth occasionally show flicks of fire from within them, text could possibly vary based on corruption.
    public hellFire(): void {
        MainScreen.text("", true);
        if (!player.perks.has("BloodMage") && player.fatigue + spellCost(20) > 100) {
            MainScreen.text("You are too tired to breathe fire.\n", true);
            doNext(combatMenu);
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(20, 1);
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            enemyAI();
            return;
        }
        if (monster instanceof LivingStatue) {
            MainScreen.text("The fire courses over the stone behemoths skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            enemyAI();
            return;
        }
        let damage: number = (player.level * 8 + rand(10) + player.stats.cor / 5);
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
            enemyAI();
            return;
        }
        else if (monster.short == "Vala") {
            MainScreen.text("  Vala beats her wings with surprising strength, blowing the fireball back at you!  ", false);
            if (player.perks.has("Evade") && rand(2) == 0) {
                MainScreen.text("You dive out of the way and evade it!", false);
            }
            else if (player.perks.has("Flexibility") && rand(4) == 0) {
                MainScreen.text("You use your flexibility to barely fold your body out of the way!", false);
            }
            else {
                damage = int(damage / 6);
                MainScreen.text("Your own fire smacks into your face, arousing you!", false);
                dynStats("lus", damage);
            }
            MainScreen.text("\n", false);
        }
        else {
            if (monster.inte < 10) {
                MainScreen.text("  Your foe lets out a shriek as their form is engulfed in the blistering flames.", false);
                damage = int(damage);
                MainScreen.text("(" + damage + ")\n", false);
                monster.HP -= damage;
            }
            else {
                if (monster.lustVuln > 0) {
                    MainScreen.text("  Your foe cries out in surprise and then gives a sensual moan as the flames of your passion surround them and fill their body with unnatural lust.\n", false);
                    monster.lust += monster.lustVuln * damage / 6;
                }
                else {
                    MainScreen.text("  The corrupted fire doesn't seem to have affect on " + monster.a + monster.short + "!\n", false);
                }
            }
        }
        MainScreen.text("\n", false);
        if (monster.short == "Holli" && monster.findStatusAffect(StatusAffects.HolliBurning) < 0) (monster as Holli).lightHolliOnFireMagically();
        if (monster.HP < 1) {
            doNext(endHpVictory);
        }
        else if (monster.lust >= 99) {
            doNext(endLustVictory);
        }
        else enemyAI();
    }

    public kick(): void {
        MainScreen.text("", true);
        if (player.fatigue + physicalCost(15) > 100) {
            MainScreen.text("You're too fatigued to use a charge attack!", true);
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        fatigue(15, 2);
        //Variant start messages!
        if (player.lowerBody == LowerBodyType.KANGAROO) {
            //(tail)
            if (player.lowerBody.tailType == TailType.KANGAROO) MainScreen.text("You balance on your flexible kangaroo-tail, pulling both legs up before slamming them forward simultaneously in a brutal kick.  ", false);
            //(no tail) 
            else MainScreen.text("You balance on one leg and cock your powerful, kangaroo-like leg before you slam it forward in a kick.  ", false);
        }
        //(bunbun kick) 
        else if (player.lowerBody == LowerBodyType.BUNNY) MainScreen.text("You leap straight into the air and lash out with both your furred feet simultaneously, slamming forward in a strong kick.  ", false);
        //(centaur kick)
        else if (player.lowerBody == LowerBodyType.CENTAUR) MainScreen.text("You lurch up onto your backlegs, lifting your forelegs from the ground a split-second before you lash them out in a vicious kick.  ", false);
        //(bipedal hoof-kick) 
        else if (player.lowerBody == LowerBodyType.HOOFED) MainScreen.text("You twist and lurch as you raise a leg and slam your hoof forward in a kick.  ", false);

        if (Flags.list[FlagEnum.PC_FETISH] >= 3) {
            MainScreen.text("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  Ceraph's piercings have made normal attack impossible!  Maybe you could try something else?\n\n", false);
            enemyAI();
            return;
        }
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            enemyAI();
            return;
        }
        //Blind
        if (player.statusAffects.has("Blind")) {
            MainScreen.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ", false);
        }
        //Worms are special
        if (monster.short == "worms") {
            //50% chance of hit (int boost)
            if (rand(100) + player.stats.int / 3 >= 50) {
                temp = int(player.stats.str / 5 - rand(5));
                if (temp == 0) temp = 1;
                MainScreen.text("You strike at the amalgamation, crushing countless worms into goo, dealing " + temp + " damage.\n\n", false);
                monster.HP -= temp;
                if (monster.HP <= 0) {
                    doNext(endHpVictory);
                    return;
                }
            }
            //Fail
            else {
                MainScreen.text("You attempt to crush the worms with your reprisal, only to have the collective move its individual members, creating a void at the point of impact, leaving you to attack only empty air.\n\n", false);
            }
            enemyAI();
            return;
        }
        let damage: number;
        //Determine if dodged!
        if ((player.statusAffects.has("Blind") && rand(2) == 0) || (monster.spe - player.stats.spe > 0 && int(Math.random() * (((monster.spe - player.stats.spe) / 4) + 80)) > 80)) {
            //Akbal dodges special education
            if (monster.short == "Akbal") MainScreen.text("Akbal moves like lightning, weaving in and out of your furious attack with the speed and grace befitting his jaguar body.\n", false);
            else {
                MainScreen.text(monster.capitalA + monster.short + " manage", false);
                if (!monster.plural) MainScreen.text("s", false);
                MainScreen.text(" to dodge your kick!", false);
                MainScreen.text("\n\n", false);
            }
            enemyAI();
            return;
        }
        //Determine damage
        //Base:
        damage = player.stats.str;
        //Leg bonus
        //Bunny - 20, Kangaroo - 35, 1 hoof = 30, 2 hooves = 40
        if (player.lowerBody == LowerBodyType.CENTAUR) damage += 40;
        else if (player.lowerBody == LowerBodyType.HOOFED) damage += 30;
        else if (player.lowerBody == LowerBodyType.BUNNY) damage += 20;
        else if (player.lowerBody == LowerBodyType.KANGAROO) damage += 35;
        //Start figuring enemy damage resistance
        let reduction: number = rand(monster.tou);
        //Add in enemy armor if needed
        reduction += monster.armorDef;
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
                (monster as Anemone).applyVenom((1 + rand(2)));
            }
        }
        MainScreen.text("\n\n", false);
        if (monster.HP < 1 || monster.lust > 99) combatRoundOver();
        else enemyAI();
    }

    public PCWebAttack(): void {
        MainScreen.text("", true);
        //Keep logic sane if this attack brings victory
        if (player.lowerBody.tailVenom < 33) {
            MainScreen.text("You do not have enough webbing to shoot right now!", true);
            doNext(physicalSpecials);
            return;
        }
        player.lowerBody.tailVenom -= 33;
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            enemyAI();
            return;
        }
        //Blind
        if (player.statusAffects.has("Blind")) {
            MainScreen.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ", false);
        }
        else MainScreen.text("Turning and clenching muscles that no human should have, you expel a spray of sticky webs at " + monster.a + monster.short + "!  ", false);
        //Determine if dodged!
        if ((player.statusAffects.has("Blind") && rand(2) == 0) || (monster.spe - player.stats.spe > 0 && int(Math.random() * (((monster.spe - player.stats.spe) / 4) + 80)) > 80)) {
            MainScreen.text("You miss " + monster.a + monster.short + " completely - ", false);
            if (monster.plural) MainScreen.text("they", false);
            else MainScreen.text(monster.mf("he", "she") + " moved out of the way!\n\n", false);
            enemyAI();
            return;
        }
        //Over-webbed
        if (monster.spe < 1) {
            if (!monster.plural) MainScreen.text(monster.capitalA + monster.short + " is completely covered in webbing, but you hose " + monster.mf("him", "her") + " down again anyway.", false);
            else MainScreen.text(monster.capitalA + monster.short + " are completely covered in webbing, but you hose them down again anyway.", false);
        }
        //LAND A HIT!
        else {
            if (!monster.plural) MainScreen.text("The adhesive strands cover " + monster.a + monster.short + " with restrictive webbing, greatly slowing " + monster.mf("him", "her") + ".", false);
            else MainScreen.text("The adhesive strands cover " + monster.a + monster.short + " with restrictive webbing, greatly slowing " + monster.mf("him", "her") + ".", false);
            monster.spe -= 45;
            if (monster.spe < 0) monster.spe = 0;
        }
        MainScreen.text("\n\n", false);
        if (monster.HP < 1 || monster.lust > 99) combatRoundOver();
        else enemyAI();
    }
    public nagaBiteAttack(): void {
        MainScreen.text("", true);
        //FATIIIIGUE
        if (player.fatigue + physicalCost(10) > 100) {
            MainScreen.text("You just don't have the energy to bite something right now...", true);
            //Pass false to combatMenu instead:		menuLoc = 1;
            //		doNext(combatMenu);
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        fatigue(10, 2);
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            enemyAI();
            return;
        }
        if (monster instanceof LivingStatue) {
            MainScreen.text("Your fangs can't even penetrate the giant's flesh.");
            enemyAI();
            return;
        }
        //Works similar to bee stinger, must be regenerated over time. Shares the same poison-meter
        if (rand(player.stats.spe / 2 + 40) + 20 > monster.spe / 1.5) {
            //(if monster = demons)
            if (monster.short == "demons") MainScreen.text("You look at the crowd for a moment, wondering which of their number you should bite. Your glance lands upon the leader of the group, easily spotted due to his snakeskin cloak. You quickly dart through the demon crowd as it closes in around you and lunge towards the broad form of the leader. You catch the demon off guard and sink your needle-like fangs deep into his flesh. You quickly release your venom and retreat before he, or the rest of the group manage to react.", false);
            //(Otherwise) 
            else MainScreen.text("You lunge at the foe headfirst, fangs bared. You manage to catch " + monster.a + monster.short + " off guard, your needle-like fangs penetrating deep into " + monster.pronoun3 + " body. You quickly release your venom, and retreat before " + monster.pronoun1 + " manages to react.", false);
            //The following is how the enemy reacts over time to poison. It is displayed after the description paragraph,instead of lust
            monster.str -= 5 + rand(5);
            monster.spe -= 5 + rand(5);
            if (monster.str < 1) monster.str = 1;
            if (monster.spe < 1) monster.spe = 1;
            if (monster.statusAffects.has("NagaVenom")) {
                monster.addStatusValue(StatusAffects.NagaVenom, 1, 1);
            }
            else monster.statusAffects.add(new StatusAffect("NagaVenom", 1, 0, 0, 0)));
        }
        else {
            MainScreen.text("You lunge headfirst, fangs bared. Your attempt fails horrendously, as " + monster.a + monster.short + " manages to counter your lunge, knocking your head away with enough force to make your ears ring.", false);
        }
        MainScreen.text("\n\n", false);
        if (monster.HP < 1 || monster.lust > 99) combatRoundOver();
        else enemyAI();
    }
    public spiderBiteAttack(): void {
        MainScreen.text("", true);
        //FATIIIIGUE
        if (player.fatigue + physicalCost(10) > 100) {
            MainScreen.text("You just don't have the energy to bite something right now...", true);
            //Pass false to combatMenu instead:		menuLoc = 1;
            //		doNext(combatMenu);
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        fatigue(10, 2);
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            enemyAI();
            return;
        }
        if (monster instanceof LivingStatue) {
            MainScreen.text("Your fangs can't even penetrate the giant's flesh.");
            enemyAI();
            return;
        }
        //Works similar to bee stinger, must be regenerated over time. Shares the same poison-meter
        if (rand(player.stats.spe / 2 + 40) + 20 > monster.spe / 1.5) {
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
                else MainScreen.text("  " + monster.mf("He", "She") + " flushes hotly and " + monster.mf("touches his suddenly-stiff member, moaning lewdly for a moment.", "touches a suddenly stiff nipple, moaning lewdly.  You can smell her arousal in the air."), false);
                monster.lust += 25 * monster.lustVuln;
                if (rand(5) == 0) monster.lust += 25 * monster.lustVuln;
            }
        }
        else {
            MainScreen.text("You lunge headfirst, fangs bared. Your attempt fails horrendously, as " + monster.a + monster.short + " manages to counter your lunge, pushing you back out of range.", false);
        }
        MainScreen.text("\n\n", false);
        if (monster.HP < 1 || monster.lust > 99) combatRoundOver();
        else enemyAI();
    }

    //New Abilities and Items
    //[Abilities]
    //Whisper 
    public superWhisperAttack(): void {
        MainScreen.text("", true);
        if (!player.perks.has("BloodMage") && player.fatigue + spellCost(10) > 100) {
            MainScreen.text("You are too tired to focus this ability.", true);
            doNext(combatMenu);
            return;
        }
        if (player.statusAffects.has("ThroatPunch") || player.statusAffects.has("WebSilence")) {
            MainScreen.text("You cannot focus to reach the enemy's mind while you're having so much difficult breathing.", true);
            doNext(combatMenu);
            return;
        }
        if (monster.short == "pod" || monster.inte == 0) {
            MainScreen.text("You reach for the enemy's mind, but cannot find anything.  You frantically search around, but there is no consciousness as you know it in the room.\n\n", true);
            changeFatigue(1);
            enemyAI();
            return;
        }
        if (monster instanceof LivingStatue) {
            MainScreen.text("There is nothing inside the golem to whisper to.");
            changeFatigue(1);
            enemyAI();
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(10, 1);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            enemyAI();
            return;
        }
        if (monster.findPerk(PerkLib.Focused) >= 0) {
            if (!monster.plural) MainScreen.text(monster.capitalA + monster.short + " is too focused for your whispers to influence!\n\n");
            enemyAI();
            return;
        }
        //Enemy too strong or multiplesI think you 
        if (player.stats.int < monster.inte || monster.plural) {
            MainScreen.text("You reach for your enemy's mind, but can't break through.\n", false);
            changeFatigue(10);
            enemyAI();
            return;
        }
        //[Failure] 
        if (rand(10) == 0) {
            MainScreen.text("As you reach for your enemy's mind, you are distracted and the chorus of voices screams out all at once within your mind. You're forced to hastily silence the voices to protect yourself.", false);
            changeFatigue(10);
            enemyAI();
            return;
        }
        MainScreen.text("You reach for your enemy's mind, watching as its sudden fear petrifies your foe.\n\n", false);
        monster.statusAffects.add(new StatusAffect("Fear", 1, 0, 0, 0)));
        enemyAI();
    }

    //Attack used:
    //This attack has a cooldown and is more dramatic when used by the PC, it should be some sort of last ditch attack for emergencies. Don't count on using this whenever you want.
    //once a day or something
    //Effect of attack: Damages and stuns the enemy for the turn you used this attack on, plus 2 more turns. High chance of success.
    public dragonBreath(): void {
        MainScreen.clearText();
        if (!player.perks.has("BloodMage") && player.fatigue + spellCost(20) > 100) {
            MainScreen.text("You are too tired to breathe fire.", true);
            doNext(combatMenu);
            return;
        }
        //Not Ready Yet:
        if (player.statusAffects.has("DragonBreathCooldown")) {
            MainScreen.text("You try to tap into the power within you, but your burning throat reminds you that you're not yet ready to unleash it again...");
            doNext(combatMenu);
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        fatigue(20, 1);
        player.statusAffects.add(new StatusAffect("DragonBreathCooldown", 0, 0, 0, 0)));
        let damage: number = int(player.level * 8 + 25 + rand(10));
        if (player.statusAffects.has("DragonBreathBoost")) {
            player.statusAffects.remove("DragonBreathBoost");
            damage *= 1.5;
        }
        //Shell
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            enemyAI();
            return;
        }
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            enemyAI();
            return;
        }
        if (monster instanceof LivingStatue) {
            MainScreen.text("The fire courses by the stone skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            enemyAI();
            return;
        }
        MainScreen.text("Tapping into the power deep within you, you let loose a bellowing roar at your enemy, so forceful that even the environs crumble around " + monster.pronoun2 + ".  " + monster.capitalA + monster.short + " does " + monster.pronoun3 + " best to avoid it, but the wave of force is too fast.");
        if (monster.statusAffects.has("Sandstorm")) {
            MainScreen.text("  <b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>");
            damage = Math.round(0.2 * damage);
        }
        //Miss: 
        if ((player.statusAffects.has("Blind") && rand(2) == 0) || (monster.spe - player.stats.spe > 0 && int(Math.random() * (((monster.spe - player.stats.spe) / 4) + 80)) > 80)) {
            MainScreen.text("  Despite the heavy impact caused by your roar, " + monster.a + monster.short + " manages to take it at an angle and remain on " + monster.pronoun3 + " feet and focuses on you, ready to keep fighting.");
        }
        //Special enemy avoidances
        else if (monster.short == "Vala") {
            MainScreen.text("Vala beats her wings with surprising strength, blowing the fireball back at you! ", false);
            if (player.perks.has("Evade") && rand(2) == 0) {
                MainScreen.text("You dive out of the way and evade it!", false);
            }
            else if (player.perks.has("Flexibility") && rand(4) == 0) {
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
            if (monster.findPerk(PerkLib.Acid) < 0) monster.createPerk(PerkLib.Acid, 0, 0, 0, 0);
            damage = Math.round(damage * 1.5);
            damage = doDamage(damage);
            monster.statusAffects.add(new StatusAffect("Stunned", 0, 0, 0, 0)));
            MainScreen.text("(" + damage + ")\n\n", false);
        }
        else {
            if (monster.findPerk(PerkLib.Resolute) < 0) {
                MainScreen.text("  " + monster.capitalA + monster.short + " reels as your wave of force slams into " + monster.pronoun2 + " like a ton of rock!  The impact sends " + monster.pronoun2 + " crashing to the ground, too dazed to strike back.");
                monster.statusAffects.add(new StatusAffect("Stunned", 1, 0, 0, 0)));
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
        if (monster.short == "Holli" && monster.findStatusAffect(StatusAffects.HolliBurning) < 0) (monster as Holli).lightHolliOnFireMagically();
        combatRoundOver();
    }

    //* Terrestrial Fire
    public fireballuuuuu(): void {
        MainScreen.text("", true);
        if (player.fatigue + 20 > 100) {
            MainScreen.text("You are too tired to breathe fire.", true);
            doNext(combatMenu);
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        changeFatigue(20);
        if (monster.statusAffects.has("Shell")) {
            MainScreen.text("As soon as your magic touches the multicolored shell around " + monster.a + monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            enemyAI();
            return;
        }
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            enemyAI();
            return;
        }
        if (monster instanceof LivingStatue) {
            MainScreen.text("The fire courses by the stone skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            enemyAI();
            return;
        }
        //[Failure]
        //(high damage to self, +20 fatigue)
        if (rand(5) == 0 || player.statusAffects.has("WebSilence")) {
            if (player.statusAffects.has("WebSilence")) MainScreen.text("You reach for the terrestrial fire, but as you ready to release a torrent of flame, it backs up in your throat, blocked by the webbing across your mouth.  It causes you to cry out as the sudden, heated force explodes in your own throat.\n\n", false);
            else if (player.statusAffects.has("GooArmorSilence")) MainScreen.text("You reach for the terrestrial fire but as you ready the torrent, it erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.  The slime covering your mouth bubbles and pops, boiling away where the escaping flame opens small rents in it.  That wasn't as effective as you'd hoped, but you can at least speak now.");
            else MainScreen.text("You reach for the terrestrial fire, but as you ready to release a torrent of flame, the fire inside erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.\n\n", false);
            changeFatigue(10);
            takeDamage(10 + rand(20));
            enemyAI();
            return;
        }
        if (monster instanceof Doppleganger) {
            (monster as Doppleganger).handleSpellResistance("fireball");
            Flags.list[FlagEnum.SPELLS_CAST]++;
            spellPerkUnlock();
            return;
        }
        let damage: number;
        damage = int(player.level * 10 + 45 + rand(10));
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
            enemyAI();
            return;
        }
        else if (monster.short == "Vala") {
            MainScreen.text("Vala beats her wings with surprising strength, blowing the fireball back at you! ", false);
            if (player.perks.has("Evade") && rand(2) == 0) {
                MainScreen.text("You dive out of the way and evade it!", false);
            }
            else if (player.perks.has("Flexibility") && rand(4) == 0) {
                MainScreen.text("You use your flexibility to barely fold your body out of the way!", false);
            }
            else {
                MainScreen.text("Your own fire smacks into your face! (" + damage + ")", false);
                takeDamage(damage);
            }
            MainScreen.text("\n\n", false);
        }
        else {
            //Using fire attacks on the goo]
            if (monster.short == "goo-girl") {
                MainScreen.text(" Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + monster.skinTone + " skin has lost some of its shimmer. ", false);
                if (monster.findPerk(PerkLib.Acid) < 0) monster.createPerk(PerkLib.Acid, 0, 0, 0, 0);
                damage = Math.round(damage * 1.5);
            }
            if (monster.statusAffects.has("Sandstorm")) {
                MainScreen.text("<b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>  ");
                damage = Math.round(0.2 * damage);
            }
            MainScreen.text("(" + damage + ")\n\n", false);
            monster.HP -= damage;
            if (monster.short == "Holli" && monster.findStatusAffect(StatusAffects.HolliBurning) < 0) (monster as Holli).lightHolliOnFireMagically();
        }
        if (monster.HP < 1) {
            doNext(endHpVictory);
        }
        else enemyAI();
    }

    public kissAttack(): void {
        if (player.statusAffects.has("Blind")) {
            MainScreen.text("There's no way you'd be able to find their lips while you're blind!", true);
            //Pass false to combatMenu instead:		menuLoc = 3;
            doNext(physicalSpecials);
            return;
        }
        MainScreen.text("", true);
        let attack: number = rand(6);
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
        if (monster.spe - player.stats.spe > 0 && rand(((monster.spe - player.stats.spe) / 4) + 80) > 80) {
            attack = rand(3);
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
            enemyAI();
            return;
        }
        //Success but no effect:
        if (monster.lustVuln <= 0 || !monster.hasCock()) {
            if (monster.plural) MainScreen.text("  Mouth presses against mouth, and you allow your tongue to stick out to taste the saliva of one of their number, making sure to give them a big dose.  Pulling back, you look at " + monster.a + monster.short + " and immediately regret wasting the time on the kiss.  It had no effect!\n\n", false);
            else MainScreen.text("  Mouth presses against mouth, and you allow your tongue to stick to taste " + monster.pronoun3 + "'s saliva as you make sure to give them a big dose.  Pulling back, you look at " + monster.a + monster.short + " and immediately regret wasting the time on the kiss.  It had no effect!\n\n", false);
            enemyAI();
            return;
        }
        attack = rand(4);
        let damage: number = 0;
        switch (attack) {
            //Success 1:
            case 1:
                if (monster.plural) MainScreen.text("  Success!  A spit-soaked kiss lands right on one of their mouths.  The victim quickly melts into your embrace, allowing you to give them a nice, heavy dose of sloppy oral aphrodisiacs.\n\n", false);
                else MainScreen.text("  Success!  A spit-soaked kiss lands right on " + monster.a + monster.short + "'s mouth.  " + monster.mf("He", "She") + " quickly melts into your embrace, allowing you to give them a nice, heavy dose of sloppy oral aphrodisiacs.\n\n", false);
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
                if (monster.plural) MainScreen.text("  You slip past " + monster.a + monster.short + "'s guard and press your lips against one of them.  " + monster.mf("He", "She") + " melts against you, " + monster.mf("his", "her") + " tongue sliding into your mouth as " + monster.mf("he", "she") + " quickly succumbs to the fiery, cock-swelling kiss.  It goes on for quite some time.  Once you're sure you've given a full dose to " + monster.mf("his", "her") + " mouth, you break back and observe your handwork.  One of " + monster.a + monster.short + " is still standing there, licking " + monster.mf("his", "her") + " his lips while " + monster.mf("his", "her") + " dick is standing out, iron hard.  You feel a little daring and give the swollen meat another moist peck, glossing the tip in gold.  There's no way " + monster.mf("he", "she") + " will go soft now.  Though you didn't drug the rest, they're probably a little 'heated up' from the show.\n\n", false);
                else MainScreen.text("  You slip past " + monster.a + monster.short + "'s guard and press your lips against " + monster.pronoun3 + ".  " + monster.mf("He", "She") + " melts against you, " + monster.pronoun3 + " tongue sliding into your mouth as " + monster.pronoun1 + " quickly succumbs to the fiery, cock-swelling kiss.  It goes on for quite some time.  Once you're sure you've given a full dose to " + monster.pronoun3 + " mouth, you break back and observe your handwork.  " + monster.capitalA + monster.short + " is still standing there, licking " + monster.pronoun3 + " lips while " + monster.pronoun3 + " dick is standing out, iron hard.  You feel a little daring and give the swollen meat another moist peck, glossing the tip in gold.  There's no way " + monster.pronoun1 + " will go soft now.\n\n", false);
                damage = 30;
                break;
            //Success 4:
            default:
                MainScreen.text("  With great effort, you slip through an opening and compress their lips against your own, lust seeping through the oral embrace along with a heavy dose of drugs.\n\n", false);
                damage = 12;
                break;
        }
        //Add status if not already drugged
        if (monster.findStatusAffect(StatusAffects.LustStick) < 0) monster.statusAffects.add(new StatusAffect("LustStick", 0, 0, 0, 0));
        //Else add bonus to round damage
        else monster.addStatusValue(StatusAffects.LustStick, 2, Math.round(damage / 10));
        //Deal damage
        monster.lust += Math.round(monster.lustVuln * damage);
        //Sets up for end of combat, and if not, goes to AI.
        if (!combatRoundOver()) enemyAI();
    }

    public runAway(callHook: boolean = true): void {
        if (callHook && monster.onPcRunAttempt != null) {
            monster.onPcRunAttempt();
            return;
        }
        MainScreen.text("", true);
        if (inCombat && player.statusAffects.has("Sealed") && player.statusAffects.get("Sealed").value2 == 4) {
            MainScreen.clearText();
            MainScreen.text("You try to run, but you just can't seem to escape.  <b>Your ability to run was sealed, and now you've wasted a chance to attack!</b>\n\n");
            enemyAI();
            return;
        }
        //Rut doesnt let you run from dicks.
        if (player.inRut && monster.totalCocks() > 0) {
            MainScreen.text("The thought of another male in your area competing for all the pussy infuriates you!  No way will you run!", true);
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        if (monster.statusAffects.has("Level") && player.canFly()) {
            MainScreen.clearText();
            MainScreen.text("You flex the muscles in your back and, shaking clear of the sand, burst into the air!  Wasting no time you fly free of the sandtrap and its treacherous pit.  \"One day your wings will fall off, little ant,\" the snarling voice of the thwarted androgyne carries up to you as you make your escape.  \"And I will be waiting for you when they do!\"");
            inCombat = false;
            clearStatuses(false);
            doNext(camp.returnToCampUseOneHour);
            return;
        }
        if (monster.statusAffects.has("GenericRunDisabled") || urtaQuest.isUrta()) {
            MainScreen.text("You can't escape from this fight!");
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        if (monster.statusAffects.has("Level") && monster.statusAffects.get("Level").value1 < 4) {
            MainScreen.text("You're too deeply mired to escape!  You'll have to <b>climb</b> some first!");
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        if (monster.statusAffects.has("RunDisabled")) {
            MainScreen.text("You'd like to run, but you can't scale the walls of the pit with so many demonic hands pulling you down!");
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00329] == 1 && (monster.short == "minotaur gang" || monster.short == "minotaur tribe")) {
            Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00329] = 0;
            //(Free run away) 
            MainScreen.text("You slink away while the pack of brutes is arguing.  Once they finish that argument, they'll be sorely disappointed!", true);
            inCombat = false;
            clearStatuses(false);
            doNext(camp.returnToCampUseOneHour);
            return;
        }
        else if (monster.short == "minotaur tribe" && monster.HPRatio() >= 0.75) {
            MainScreen.text("There's too many of them surrounding you to run!", true);
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            menu();
            MainScreen.addButton(0, "Next", combatMenu, false);
            return;
        }
        if (inDungeon || inRoomedDungeon) {
            MainScreen.text("You're trapped in your foe's home turf - there is nowhere to run!\n\n", true);
            enemyAI();
            return;
        }
        //Attempt texts!
        if (monster.short == "Ember") {
            MainScreen.text("You take off");
            if (!player.canFly()) MainScreen.text(" running");
            else MainScreen.text(", flapping as hard as you can");
            MainScreen.text(", and Ember, caught up in the moment, gives chase.  ");
        }
        else if (player.canFly()) MainScreen.text("Gritting your teeth with effort, you beat your wings quickly and lift off!  ", false);
        //Nonflying PCs
        else {
            //Stuck!
            if (player.statusAffects.has("NoFlee")) {
                if (monster.short == "goblin") MainScreen.text("You try to flee but get stuck in the sticky white goop surrounding you.\n\n", true);
                else MainScreen.text("You put all your skills at running to work and make a supreme effort to escape, but are unable to get away!\n\n", true);
                enemyAI();
                return;
            }
            //Nonstuck!
            else MainScreen.text("You turn tail and attempt to flee!  ", false);
        }

        //Calculations
        let escapeMod: number = 20 + monster.level * 3;
        if (debug) escapeMod -= 300;
        if (player.canFly()) escapeMod -= 20;
        if (player.lowerBody.tailType == TailType.RACCOON && player.upperBody.head.earType == EarType.RACCOON && player.perks.has("Runner")) escapeMod -= 25;

        //Big tits doesn't matter as much if ya can fly!
        else {
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 35) escapeMod += 5;
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 66) escapeMod += 10;
            if (player.lowerBody.hipRating >= 20) escapeMod += 5;
            if (player.lowerBody.butt.buttRating >= 20) escapeMod += 5;
            if (player.lowerBody.ballSize >= 24 && player.lowerBody.balls > 0) escapeMod += 5;
            if (player.lowerBody.ballSize >= 48 && player.lowerBody.balls > 0) escapeMod += 10;
            if (player.lowerBody.ballSize >= 120 && player.lowerBody.balls > 0) escapeMod += 10;
        }
        //ANEMONE OVERRULES NORMAL RUN
        if (monster.short == "anemone") {
            //Autosuccess - less than 60 lust
            if (player.stats.lust < 60) {
                MainScreen.text("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
                inCombat = false;
                clearStatuses(false);
                doNext(camp.returnToCampUseOneHour);
                return;
            }
            //Speed dependent
            else {
                //Success
                if (player.stats.spe > rand(monster.spe + escapeMod)) {
                    inCombat = false;
                    clearStatuses(false);
                    MainScreen.text("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
                    doNext(camp.returnToCampUseOneHour);
                    return;
                }
                //Run failed:
                else {
                    MainScreen.text("You try to shake off the fog and run but the anemone slinks over to you and her tentacles wrap around your waist.  <i>\"Stay?\"</i> she asks, pressing her small breasts into you as a tentacle slides inside your " + player.inventory.armor.displayName + " and down to your nethers.  The combined stimulation of the rubbing and the tingling venom causes your knees to buckle, hampering your resolve and ending your escape attempt.", false);
                    //(gain lust, temp lose spd/str)
                    (monster as Anemone).applyVenom((4 + player.stats.sens / 20));
                    combatRoundOver();
                    return;
                }
            }
        }
        //Ember is SPUCIAL
        if (monster.short == "Ember") {
            //GET AWAY
            if (player.stats.spe > rand(monster.spe + escapeMod) || (player.perks.has("Runner") && rand(100) < 50)) {
                if (player.perks.has("Runner")) MainScreen.text("Using your skill at running, y");
                else MainScreen.text("Y");
                MainScreen.text("ou easily outpace the dragon, who begins hurling imprecations at you.  \"What the hell, [name], you weenie; are you so scared that you can't even stick out your punishment?\"");
                MainScreen.text("\n\nNot to be outdone, you call back, \"Sucks to you!  If even the mighty Last Ember of Hope can't catch me, why do I need to train?  Later, little bird!\"");
                inCombat = false;
                clearStatuses(false);
                doNext(camp.returnToCampUseOneHour);
            }
            //Fail: 
            else {
                MainScreen.text("Despite some impressive jinking, " + emberScene.emberMF("he", "she") + " catches you, tackling you to the ground.\n\n");
                enemyAI();
            }
            return;
        }
        //SUCCESSFUL FLEE
        if (player.stats.spe > rand(monster.spe + escapeMod)) {
            //Fliers flee!
            if (player.canFly()) MainScreen.text(monster.capitalA + monster.short + " can't catch you.", false);
            //sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
            else if (player.lowerBody.tailType == TailType.RACCOON && player.upperBody.head.earType == EarType.RACCOON && player.perks.has("Runner")) {
                MainScreen.text("Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " + monster.pronoun1 + " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air!  You leave " + monster.pronoun2 + " behind with your clumsy, jerky, short-range flight.");
            }
            //Non-fliers flee
            else MainScreen.text(monster.capitalA + monster.short + " rapidly disappears into the shifting landscape behind you.", false);
            if (monster.short == "Izma") {
                MainScreen.text("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.", false);
            }
            inCombat = false;
            clearStatuses(false);
            doNext(camp.returnToCampUseOneHour);
            return;
        }
        //Runner perk chance
        else if (player.perks.has("Runner") && rand(100) < 50) {
            inCombat = false;
            MainScreen.text("Thanks to your talent for running, you manage to escape.", false);
            if (monster.short == "Izma") {
                MainScreen.text("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.", false);
            }
            clearStatuses(false);
            doNext(camp.returnToCampUseOneHour);
            return;
        }
        //FAIL FLEE
        else {
            if (monster.short == "Holli") {
                (monster as Holli).escapeFailWithHolli();
                return;
            }
            //Flyers get special failure message.
            if (player.canFly()) {
                if (monster.plural) MainScreen.text(monster.capitalA + monster.short + " manage to grab your " + LowerBodyDescriptor.describeLegs(player) + " and drag you back to the ground before you can fly away!", false);
                else MainScreen.text(monster.capitalA + monster.short + " manages to grab your " + LowerBodyDescriptor.describeLegs(player) + " and drag you back to the ground before you can fly away!", false);
            }
            //fail
            else if (player.lowerBody.tailType == TailType.RACCOON && player.upperBody.head.earType == EarType.RACCOON && player.perks.has("Runner")) MainScreen.text("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!");
            //Nonflyer messages
            else {
                //Huge balls messages
                if (player.lowerBody.balls > 0 && player.lowerBody.ballSize >= 24) {
                    if (player.lowerBody.ballSize < 48) MainScreen.text("With your " + BallsDescriptor.describeBalls(true, true, player) + " swinging ponderously beneath you, getting away is far harder than it should be.  ", false);
                    else MainScreen.text("With your " + BallsDescriptor.describeBalls(true, true, player) + " dragging along the ground, getting away is far harder than it should be.  ", false);
                }
                //FATASS BODY MESSAGES
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 35 || player.lowerBody.butt.buttRating >= 20 || player.lowerBody.hipRating >= 20) {
                    //FOR PLAYERS WITH GIANT BREASTS
                    if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 35 && player.upperBody.chest.BreastRatingLargest[0].breastRating < 66) {
                        if (player.lowerBody.hipRating >= 20) {
                            MainScreen.text("Your " + LowerBodyDescriptor.describeHips(player) + " forces your gait to lurch slightly side to side, which causes the fat of your " + player.skinTone + " ", false);
                            if (player.lowerBody.butt.buttRating >= 20) MainScreen.text(ButtDescriptor.describeButt(player) + " and ", false);
                            MainScreen.text(chestDesc() + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.", false);
                        }
                        else if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("Your " + player.skinTone + ButtDescriptor.describeButt(player) + " and " + chestDesc() + " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.", false);
                        else MainScreen.text("Your " + chestDesc() + " jiggle and wobble side to side like the " + player.skinTone + " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.", false);
                    }
                    //FOR PLAYERS WITH MASSIVE BREASTS
                    else if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 66) {
                        if (player.lowerBody.hipRating >= 20) {
                            MainScreen.text("Your " + chestDesc() + " nearly drag along the ground while your " + LowerBodyDescriptor.describeHips(player) + " swing side to side ", false);
                            if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("causing the fat of your " + player.skinTone + ButtDescriptor.describeButt(player) + " to wobble heavily, ", false);
                            MainScreen.text("forcing your body off balance and preventing you from moving quick enough to get escape.", false);
                        }
                        else if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("Your " + chestDesc() + " nearly drag along the ground while the fat of your " + player.skinTone + ButtDescriptor.describeButt(player) + " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.", false);
                        else MainScreen.text("Your " + chestDesc() + " nearly drag along the ground, preventing you from moving quick enough to get escape.", false);
                    }
                    //FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
                    else if (player.lowerBody.hipRating >= 20) {
                        MainScreen.text("Your " + LowerBodyDescriptor.describeHips(player) + " swing heavily from side to side ", false);
                        if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("causing your " + player.skinTone + ButtDescriptor.describeButt(player) + " to wobble obscenely ", false);
                        MainScreen.text("and forcing your body into an awkward gait that slows you down, preventing you from escaping.", false);
                    }
                    //JUST DA BOOTAH
                    else if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("Your " + player.skinTone + ButtDescriptor.describeButt(player) + " wobbles so heavily that you're unable to move quick enough to escape.", false);
                }
                //NORMAL RUN FAIL MESSAGES
                else if (monster.plural) MainScreen.text(monster.capitalA + monster.short + " stay hot on your heels, denying you a chance at escape!", false);
                else MainScreen.text(monster.capitalA + monster.short + " stays hot on your heels, denying you a chance at escape!", false);
            }
        }
        MainScreen.text("\n\n", false);
        enemyAI();
    }

    public magicalSpecials(): void {
        if (inCombat && player.statusAffects.has("Sealed") && player.statusAffects.get("Sealed").value2 == 6) {
            MainScreen.clearText();
            MainScreen.text("You try to ready a special ability, but wind up stumbling dizzily instead.  <b>Your ability to use magical special attacks was sealed, and now you've wasted a chance to attack!</b>\n\n");
            enemyAI();
            return;
        }
        //Pass false to combatMenu instead:	menuLoc = 3;
        menu();

        //Berserk
        if (player.perks.has("Berzerker")) {
            MainScreen.addButton(0, "Berzerk", berzerk);
        }
        if (player.perks.has("Dragonfire")) {
            MainScreen.addButton(1, "DragonFire", dragonBreath);
        }
        if (player.perks.has("FireLord")) {
            MainScreen.addButton(2, "Fire Breath", fireballuuuuu);
        }
        if (player.perks.has("Hellfire")) {
            MainScreen.addButton(3, "Hellfire", hellFire);
        }
        //Possess ability.
        if (player.perks.has("Incorporeality")) {
            MainScreen.addButton(4, "Possess", possess);
        }
        if (player.perks.has("Whispered")) {
            MainScreen.addButton(5, "Whisper", superWhisperAttack);
        }
        if (player.perks.has("CorruptedNinetails")) {
            MainScreen.addButton(6, "C.FoxFire", corruptedFoxFire);
            MainScreen.addButton(7, "Terror", kitsuneTerror);
        }
        if (player.perks.has("EnlightenedNinetails")) {
            MainScreen.addButton(6, "FoxFire", foxFire);
            MainScreen.addButton(7, "Illusion", kitsuneIllusion);
        }
        if (player.statusAffects.has("ShieldingSpell")) MainScreen.addButton(8, "Shielding", shieldingSpell);
        if (player.statusAffects.has("ImmolationSpell")) MainScreen.addButton(8, "Immolation", immolationSpell);
        MainScreen.addButton(9, "Back", combatMenu, false);
    }

    public physicalSpecials(): void {
        if (urtaQuest.isUrta()) {
            urtaQuest.urtaSpecials();
            return;
        }
        //Pass false to combatMenu instead:	menuLoc = 3;
        if (inCombat && player.statusAffects.has("Sealed") && player.statusAffects.get("Sealed").value2 == 5) {
            MainScreen.clearText();
            MainScreen.text("You try to ready a special attack, but wind up stumbling dizzily instead.  <b>Your ability to use physical special attacks was sealed, and now you've wasted a chance to attack!</b>\n\n");
            enemyAI();
            return;
        }
        menu();
        if (player.upperBody.head.hairType == 4) {
            MainScreen.addButton(0, "AnemoneSting", anemoneSting);
        }
        //Bitez
        if (player.upperBody.head.face.faceType == FaceType.SHARK_TEETH) {
            MainScreen.addButton(1, "Bite", bite);
        }
        else if (player.upperBody.head.face.faceType == FaceType.SNAKE_FANGS) {
            MainScreen.addButton(1, "Bite", nagaBiteAttack);
        }
        else if (player.upperBody.head.face.faceType == FaceType.SPIDER_FANGS) {
            MainScreen.addButton(1, "Bite", spiderBiteAttack);
        }
        //Bow attack
        if (player.hasKeyItem("Bow") >= 0) {
            MainScreen.addButton(2, "Bow", fireBow);
        }
        //Constrict
        if (player.lowerBody == LowerBodyType.NAGA) {
            MainScreen.addButton(3, "Constrict", desert.nagaScene.nagaPlayerConstrict);
        }
        //Kick attackuuuu
        else if (player.lowerBody.isTaur() || player.lowerBody == LowerBodyType.HOOFED || player.lowerBody == LowerBodyType.BUNNY || player.lowerBody == LowerBodyType.KANGAROO) {
            MainScreen.addButton(3, "Kick", kick);
        }
        //Gore if mino horns
        if (player.upperBody.head.hornType == HornType.COW_MINOTAUR && player.upperBody.head.horns >= 6) {
            MainScreen.addButton(4, "Gore", goreAttack);
        }
        //Infest if infested
        if (player.statusAffects.has("Infested") && player.statusAffects.get("Infested").value1 == 5 && player.lowerBody.cockSpot.hasCock()) {
            MainScreen.addButton(5, "Infest", playerInfest);
        }
        //Kiss supercedes bite.
        if (player.statusAffects.has("LustStickApplied")) {
            MainScreen.addButton(6, "Kiss", kissAttack);
        }
        switch (player.lowerBody.tailType) {
            case TailType.BEE_ABDOMEN:
                MainScreen.addButton(7, "Sting", playerStinger);
                break;
            case TailType.SPIDER_ABDOMEN:
                MainScreen.addButton(7, "Web", PCWebAttack);
                break;
            case TailType.SHARK:
            case TailType.LIZARD:
            case TailType.KANGAROO:
            case TailType.DRACONIC:
            case TailType.RACCOON:
                MainScreen.addButton(7, "Tail Whip", tailWhipAttack);
            default:
        }

        MainScreen.addButton(9, "Back", combatMenu, false);
    }


}
