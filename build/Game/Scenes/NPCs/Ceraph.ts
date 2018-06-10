export class Ceraph extends Monster {

    //[IN COMBAT SPECIALS]
    //[SPECIAL 1] – Ubercharge!
    private ceraphSpecial1(): void {
        game.DisplaySprite(7);
        if (findStatusAffect(StatusAffects.Uber) < 0) {
            if (randInt(2) === 0) {
                DisplayText("Ceraph winks and says, \"<i>Have you ever cum without being touched? You will.</i>\"\n\n");
            }
            else {
                DisplayText("Ceraph titters, \"<i>Let me show you the true power of an Omnibus.</i>\"\n\n");
            }
            DisplayText("Despite her sultry tease, you can tell she's starting to build up to something big...");
            statusAffects.add(StatusAffectType.Uber, 0, 0, 0, 0);
        }
        else {
            //(Next Round)
            if (statusAffects.get(StatusAffectType.Uber).value1 === 0) {
                statusAffects.get(StatusAffectType.Uber).value1 = 1;
                if (randInt(2) === 0) DisplayText("The demonic hermaphrodite begins forging demonic symbols in the air before her, each glowing brilliant pink before they blur away in a haze.");
                else DisplayText("The demonette makes obscene motions with her hands, as if masturbating an imaginary cock or vagina while her hands are wreathed in pink flames.");
                DisplayText("  <b>She's about to unleash something huge!</b>");
                if (player.stats.int > 50) DisplayText("  You should probably wait so you'll have a chance to avoid whatever's coming.");
            }
            //FIRE!
            else {
                statusAffects.remove("Uber");
                //(Avoid!)
                if (Flags.list[FlagEnum.IN_COMBAT_USE_PLAYER_WAITED_FLAG] === 1) {
                    DisplayText("She throws her hands out, palms facing you, and a rush of pink flame washes towards you.  Thanks to your decision to wait, it's easy to avoid the onrushing flames and her attack.\n\n");
                    DisplayText("Ceraph sighs and asks, \"<i>Why would you move?  It would make you feel soooo good!</i>\"");
                }
                //(AUTO-LOSE)
                else {
                    DisplayText("She throws her hands out, palms facing you, and a rush of pink flame washes towards you.  Too busy with your own attack to effectively dodge, you're hit full on by the pink fire.  Incredibly, it doesn't burn.  The fire actually seems to flow inside you, disappearing into your skin.  You stumble, confused for a second, but then it hits you.  Every inch of your body is buzzing with pleasure, practically squirming and convulsing with sexual delight.  You collapse, twitching and heaving, feeling the constant sensation of sexual release running from your head to your " + LowerBodyDescriptor.describeFeet(player) + ".  Too horny and pleasured to resist, you lie down and tremble, occasionally rubbing yourself to enhance the bliss.");
                    game.player.stats.lust += 1500;
                }
            }
        }
        combatRoundOver();
    }
    //[SPECIAL] – Whip Binding
    private ceraphSpecial2(): void {
        if (!player.statusAffects.has(StatusAffectType.Bound)) {
            DisplayText("Ceraph snaps her whip at you, lightning fast.  Unable to avoid the blinding speed of her attack, you find yourself wrapped from head to toe in the strong leather of her whip.  Remarkably, the fire dies out everywhere the whip touches you, leaving you bound but unharmed.");
            //If player has l2 piercing
            if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
                DisplayText("  Gods this turns you on!");
                game.player.stats.lust += 5;
            }
            player.statusAffects.set(new StatusAffect("Bound", 2 + randInt(5))), 0, 0, 0);
        }
        //[SPECIAL WHILE PC RESTRAINED]
        else {
            if (randInt(2) === 0) {
                DisplayText("Ceraph cuddles up against you, embracing you tenderly.  Her more-than-ample bosom crushes against your flank, and her demonic prick grinds and rubs against your " + player.skinDesc + ", smearing it with her juices.  Her hands slide over your bound form, sneaking underneath your " + player.inventory.equipment.armor.displayName + " to caress you more intimately while you're at her mercy.");
                game.dynStats("lus", 9 + player.stats.sens / 10);
            }
            //[SPECIAL 2 WHILE PC RESTRAINED]
            else {
                DisplayText("Ceraph blows hot kisses in your ear and slides and rubs against you as she slips over to embrace your front.  She holds up a finger, licks it, and wiggles it back and forth.  It begins to glow pink, dimly at first and then with increasing luminosity.  Once it's reached a brilliant intensity, the sparkling digit is roughly inserted into your mouth.  You can feel the dark magic soaking into your body just like water soaks into a sponge.  ");
                if (player.stats.lust < 33) DisplayText("It makes you feel warm and flushed.");
                else if (player.stats.lust < 60) DisplayText("It gets inside you and turns you on, stoking the flames of your desire.");
                else if (player.stats.lust < 80) DisplayText("It makes you very horny, and you begin to wonder if it's worth resisting.");
                else DisplayText("It makes you ache and tremble with need, practically begging for another touch.");
                game.dynStats("lus", 5 + player.stats.cor / 10 + player.stats.lib / 20);
            }
        }
        combatRoundOver();
    }

    //(Struggle)
    public ceraphBindingStruggle(): void {
        DisplayText().clear();
        DisplayText("You wriggle in the tight binding, trying your best to escape.  ");
        if (player.statusAffects.get(StatusAffectType.Bound).value1 - 1 <= 0) {
            DisplayText("With a mighty twist and stretch, the whip gives and uncurls from you all at once.  You've regained your freedom");
            if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
                DisplayText(", though you miss the tight leathery embrace");
            }
            DisplayText("!");
            player.statusAffects.remove("Bound");
            combatRoundOver();
            return;
        }
        else {
            DisplayText("Despite your frantic struggling, all you manage to do is chafe against her impressively taut leather whip.");
            if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
                DisplayText("  You get nice and hot from being so effectively restrained, maybe you should just accept it?");
            }
            player.statusAffects.get(StatusAffectType.Bound).value1 = -1;
            //Strong characters break free faster
            if (player.stats.str > 65 && randInt(player.stats.str) > 45) {
                DisplayText("  Though you didn't break free, it seems like your mighty struggles loosened the whip slightly...");
                player.statusAffects.get(StatusAffectType.Bound).value1 = -1;
            }
        }
        DisplayText("\n\n");
        doAI();
    }

    //(Wait)
    public ceraphBoundWait(): void {
        DisplayText().clear();
        DisplayText("Why bother resisting?  The feeling of the leather wrapped tightly around you, digging into your " + player.skinDesc + ", is intoxicating.");
        if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
            DisplayText("  You squirm inside the bindings as you get more and more turned on, hoping that Ceraph will strip away your armor and force you to parade around as her bound, naked pet.");
            game.player.stats.lust += 5;
        }
        game.dynStats("lus", player.stats.lib / 20 + 5 + randInt(5));
        DisplayText("\n\n");
        doAI();
    }


    //[Double-Attack]
    private ceraphSpecial3(): void {
        //[Mini-cum] – takes place of double-attack if very horny
        if (lust >= 75) {
            DisplayText("Ceraph spreads her legs and buries three fingers in her sopping twat, her thumb vigorously rubbing against the base of her bumpy prick.  Her other hand wraps around the meaty pole and begins jerking it rapidly.  In one practiced movement she stops jerking long enough to wrap the whip around her nodule-studded demon-cock, using it like a cockring.  The organ swells thanks to the forced blood-flow, and after a few more seconds of intense masturbation, the demoness cums hard.  Her cunny squirts all over her hand, dripping clear feminine drool down her thighs.  Ceraph's masculine endowment pulses and twitches, blasting out two big squirts of jizm before it slows to a trickle.\n");
            DisplayText("Letting out a throaty sigh, the demon unties her self-induced binding and gives you a wink.  Did you really just stand there and watch the whole thing?  Amazingly Ceraph actually seems stronger after such a crude display...");
            //(+10 str/toughness, 1 level, and 10 xp reward.)
            XP += 10;
            level += 1;
            str += 10;
            tou += 10;
            HP += 20;
            lust = 33;
            game.player.stats.lust += 3;
            DisplayText("\n");
            combatRoundOver();
            return;
        }
        let damage: number = 0;
        DisplayText("The demoness weaves her whip in the air until you can practically hear it slithering like a snake, cutting the air as it weaves back and forth, still magically alight with flames.  In a blink she lashes out twice in quick succession!\n");
        //First hit!
        return { next: game.playerMenu };
        //Blind dodge change
        if (statusAffects.has(StatusAffectType.Blind) && randInt(10) != 9) {
            DisplayText(capitalA + short + " completely misses you with a blind attack!");
        }
        //Determine if dodged!
        else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
            if (player.stats.spe - spe < 8) DisplayText("You narrowly avoid " + a + short + "'s " + weaponVerb + "!");
            if (player.stats.spe - spe >= 8 && player.stats.spe - spe < 20) DisplayText("You dodge " + a + short + "'s " + weaponVerb + " with superior quickness!");
            if (player.stats.spe - spe >= 20) DisplayText("You deftly avoid " + a + short + "'s slow " + weaponVerb + ".");
        }
        //Determine if evaded
        else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
            DisplayText("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.");
        }
        else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 15 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
            DisplayText("With Raphael's teachings and the easy movement afforded by your bodysuit, you easily anticipate and sidestep " + a + short + "'s attack.");
        }
        //Determine damage - str modified by enemy toughness!
        else {
            damage = int((str + weaponAttack) - Math.random() * (player.stats.tou + player.armorDef));
            if (damage > 0) {
                damage = player.takeDamage(damage);
            }
            if (damage <= 0) {
                damage = 0;
                //Due to toughness or amor...
                if (randInt(player.armorDef + player.stats.tou) < player.armorDef) DisplayText("Your " + player.inventory.equipment.armor.displayName + " absorb and deflect every " + weaponVerb + " from " + a + short + ".");
                else DisplayText("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.");
            }
            if (damage > 0 && damage < 6) {
                DisplayText("You are struck a glancing blow by " + a + short + "! (" + damage + ")");
            }
            if (damage > 5 && damage < 11) {
                DisplayText(capitalA + short + " wounds you! (" + damage + ")");
            }
            if (damage > 10 && damage < 21) {
                DisplayText(capitalA + short + " staggers you with the force of " + pronoun3 + " " + weaponVerb + "! (" + damage + ")");
            }
            if (damage > 20) {
                DisplayText(capitalA + short + " <b>mutilates</b> you with " + pronoun3 + " powerful " + weaponVerb + "! (" + damage + ")");
            }
        }
        game.statScreenRefresh();
        DisplayText("\n");
        //SECOND ATTACK HERE------
        //Blind dodge change
        if (statusAffects.has(StatusAffectType.Blind) && randInt(10) != 9) {
            DisplayText(capitalA + short + " completely misses you with a blind attack!");
        }
        //Determine if dodged!
        else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
            if (player.stats.spe - spe < 8) DisplayText("You narrowly avoid " + a + short + "'s " + weaponVerb + "!");
            if (player.stats.spe - spe >= 8 && player.stats.spe - spe < 20) DisplayText("You dodge " + a + short + "'s " + weaponVerb + " with superior quickness!");
            if (player.stats.spe - spe >= 20) DisplayText("You deftly avoid " + a + short + "'s slow " + weaponVerb + ".");
        }
        //Determine if evaded
        else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
            DisplayText("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.");
        }
        else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 15 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
            DisplayText("With Raphael's teachings and the easy movement afforded by your bodysuit, you easily anticipate and sidestep " + a + short + "'s attack.");
        }
        else {
            //Determine damage - str modified by enemy toughness!
            damage = int((str + weaponAttack) - Math.random() * (player.stats.tou + player.armorDef));
            if (damage > 0) {
                damage = player.takeDamage(damage);
            }
            if (damage <= 0) {
                damage = 0;
                //Due to toughness or amor...
                if (randInt(player.armorDef + player.stats.tou) < player.armorDef) DisplayText("Your " + player.inventory.equipment.armor.displayName + " absorb and deflect every " + weaponVerb + " from " + a + short + ".");
                else DisplayText("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.");
            }
            if (damage > 0 && damage < 6) {
                DisplayText("You are struck a glancing blow by " + a + short + "! (" + damage + ")");
            }
            if (damage > 5 && damage < 11) {
                DisplayText(capitalA + short + " wounds you! (" + damage + ")");
            }
            if (damage > 10 && damage < 21) {
                DisplayText(capitalA + short + " staggers you with the force of " + pronoun3 + " " + weaponVerb + "! (" + damage + ")");
            }
            if (damage > 20) {
                DisplayText(capitalA + short + " <b>mutilates</b> you with " + pronoun3 + " powerful " + weaponVerb + "! (" + damage + ")");
            }

        }
        game.statScreenRefresh();
        DisplayText("\n");
        combatRoundOver();
    }

    override protected performCombatAction(): void {
        let choice: number = randInt(4);
        if (player.statusAffects.has(StatusAffectType.Bound)) {
            ceraphSpecial2();
            return;
        }
        if (statusAffects.has(StatusAffectType.Uber)) {
            ceraphSpecial1();
            return;
        }
        switch (choice) {
            case 0:
                eAttack();
                break;
            case 1:
                ceraphSpecial1();
                break;
            case 2:
                ceraphSpecial2();
                break;
            case 3:
                ceraphSpecial3();
                break;
        }
    }


    public defeated(hpVictory: boolean): void {
        game.ceraphScene.winRapeChoices();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            DisplayText("\n\nYour foe doesn't seem disgusted enough to leave...");
            return { next: game.endLustLoss };
        } else {
            game.ceraphScene.loseFUCKME();
        }
    }

    public Ceraph() {
        trace("Ceraph Constructor!");
        this.a = "";
        this.short = "Ceraph";
        this.imageName = "ceraph";
        this.long = "Ceraph the Omnibus is totally nude and reveling in it.  Her large yet perky breasts jiggle heavily against her chest as she moves.  The flawless purple skin of her twin mounds glistens with a thin sheen of sweat, inviting you to touch and rub your fingers along their slippery surface.  Her eyes are solid black, but convey a mix of amusement and desire, in spite of their alien appearance.  The demon's crotch is a combination of both genders – a drooling cunt topped with a thick demonic shaft, sprouting from where a clit should be.";
        // this.plural = false;
        this.createCock(10, 2, CockType.DEMON);
        this.createVagina(false, VaginaWetness.SLAVERING, VaginaLooseness.GAPING);
        this.statusAffects.add(StatusAffectType.BonusVCapacity, 20, 0, 0, 0));
        createBreastRow(Appearance.breastCupInverse("E"));
        this.torso.butt.looseness = ButtLooseness.STRETCHED;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 15, 0, 0, 0));
        this.tallness = 5 * 12 + 6;
        this.torso.hips.rating = HipRating.CURVY;
        this.torso.butt.rating = ButtRating.NOTICEABLE;
        this.torso.hips.legs.type = LegType.DEMONIC_HIGH_HEELS;
        this.skin.tone = "purple";
        this.torso.neck.head.hair.color = "black";
        this.torso.neck.head.hair.length = 20;
        this.baseStats.str = 65;
        this.baseStats.tou = 40;
        this.baseStats.spe = 80;
        this.baseStats.int = 80;
        this.baseStats.lib = 75;
        this.baseStats.sens = 15;
        this.baseStats.cor = 100;
        this.weaponName = "flaming whip";
        this.weaponVerb = "flame-whip";
        this.weaponAttack = 15;
        this.armorName = "demon-skin";
        this.bonusHP = 200;
        this.lust = 30;
        this.lustVuln = 0.75;
        this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 9;
        this.gems = randInt(5) + 38;
        this.drop = NO_DROP;
        this.special1 = ceraphSpecial1;
        this.special2 = ceraphSpecial2;
        this.special3 = ceraphSpecial3;
    }
}
