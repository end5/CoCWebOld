export class Tamani extends Goblin {

    override protected goblinTeaseAttack() {
        if (Flags.list[FlagEnum.TAMANI_TIMES_HYPNOTISED] > 0) {
            tamaniHypnoTease();
            return;
        }
        super.goblinTeaseAttack();
    }

    // New Tease option:
    public tamaniHypnoTease() {
        let selector: number = randInt(3);
        // Choose 1 of 3 variations
        if (selector === 0) DisplayText("Tamani smiles and shifts her leather straps, pulling one into the puffy gash that is her vagina.  She groans out loud, sliding the studded leather band into her outer lips and sawing it along her clit.  Her whole body blushes as she pulls it free, running a fingertip up the now wet strip of leather, \"<i>Mmm, can't you see how much my pussy needs a man inside it?  Be a good husband and fuck Tamani full!  You know you want to.</i>\"\n\n");
        if (selector === 1) DisplayText("Tamani saunters up to you, sliding her fingers down to each side of her pussy and spreading them.  Your eyes are drawn to her honeyed tunnel, unable to look away she gets closer.  She whispers, \"<i>Your cock knows what it needs.  Just be a good husband and obey your dick, it KNOWS how badly you need mistress's pussy.</i>\"\n\n");
        if (selector === 2) DisplayText("Tamani turns around and bends down, pressing her hands into the dirt as she kicks her legs apart.  Your stare open-mouthed at her bouncy ass-cheeks and the tantalizingly wet entrance of her slit.  She smirks and offers, \"<i>You've cum so many times inside me, why resist when you can give in and feel that pleasure again today?  Come on husband, don't make Tamani beg...</i>\"\n\n");

        // REACTIONS
        // LOW HYPNO VALUE:
        if (Flags.list[FlagEnum.TAMANI_TIMES_HYPNOTISED] < 5) {
            selector = randInt(3);
            if (selector === 0) DisplayText("You reluctantly pull your stare away from the heavenly entrance between her legs.  There's an urge to walk over to her and plunge yourself inside her over and over, but you dismiss it.");
            if (selector === 1) DisplayText("You find it hard to pull your gaze from her inviting twat, but you manage.  You shake your head, clearing away thoughts of fertilizing your wife.  Her rhetoric must be getting to you.");
            if (selector === 2) DisplayText("No matter the case, her actions shifted a fair bit of your blood-flow to your groin.");
        }
        // MEDIUM HYPNO VALUE:
        else if (Flags.list[FlagEnum.TAMANI_TIMES_HYPNOTISED] < 10) {
            selector = randInt(2);
            if (selector === 0) {
                DisplayText("With effort you manage to wrench your eyes away from the inviting folds of Tamani's vagina.  ");
                if (player.torso.cocks.count > 1) DisplayText("Each of y");
                else DisplayText("Y");
                DisplayText("our " + Desc.Cock.describeMultiCockShort(player));
                if (player.stats.lust > 80) DisplayText(" drips pre-cum");
                else if (player.stats.lust > 40) DisplayText(" grows harder");
                else DisplayText(" hardens");
                DisplayText(" from the sexual sight, and you feel a compulsion to rush to your wife and take her on the spot.  Obviously she's not really your wife, but after so many fuckings it kind of makes sense to think of her that way.");
                if (player.stats.lust < 70) DisplayText("  Still, you don't want to fuck her right now!");
            }
            else {
                DisplayText("Struggling, you pull your eyes back into your head and away from Tamani's gorgeous slit.  You shudder, feeling ");
                if (player.totalCocks() > 1) DisplayText("each of ");
                DisplayText("your " + player.Desc.Cock.describeMultiCockShort(player));
                if (player.stats.lust <= 41) DisplayText(" thicken perceptibly");
                else if (player.stats.lust <= 81) DisplayText(" twitch eagerly");
                else DisplayText("drip pre-cum");
                DisplayText(", responding to the overly sensual goblin's body.  You start to approach her, but stop yourself, realizing you were about to pick up your wife and fuck her on the spot.  You know she's not really your wife, but you have a hard time thinking of her as anything else, save for maybe your mistress.");
                if (player.stats.lust < 70) DisplayText("  Regardless, you're resolute in your desire not to fuck her right now!");
            }
        }
        // HIGH HYPNO VALUE
        else {
            selector = randInt(2);
            if (selector === 0) {
                DisplayText("You barely manage to step yourself from lunging forward to bury your mouth between your mistress's legs.  Hard and trembling between your legs, ");
                if (player.torso.cocks.count > 1) DisplayText("each of ");
                DisplayText("your " + player.Desc.Cock.describeMultiCockShort(player) + " aches with need.  You battle with the compulsion to kneel before your short, stacked mistress and perform your duties as her breeder husband.");
            }
            else {
                DisplayText("You wrench your gaze from the juicy mound before you with great difficulty.  The desire to submit to your wife and fuck her on the spot rages through your body, melting your resistance into liquid lust and pooling it in your groin.  ");
                if (player.torso.cocks.count > 1) DisplayText("Each of y");
                else DisplayText("Y");
                DisplayText("our " + player.Desc.Cock.describeMultiCockShort(player) + " pulses and dribbles pre-cum, aching to do its duty and fire load after load into Tamani's perfect pussy.");
            }
        }
        game.dynStats("lus", (randInt(player.stats.lib / 5) + 3 + (Flags.list[FlagEnum.TAMANI_TIMES_HYPNOTISED])));
        combatRoundOver();
    }

    public defeated(hpVictory: boolean) {
        if (hpVictory) {
            DisplayText("Tamani is defeated!", true);
        } else {
            DisplayText("Tamani gives up on defeating you and starts masturbating!", true);
        }
        if (player.stats.lust >= 33 && player.torso.cocks.count > 0) {
            DisplayText("  You could fuck her, but if that's the case why did you bother fighting her?\n\nWhat do you do to her?");
            let temp;
            let temp2;
            if (player.torso.cocks.count > 0 && player.cockThatFits(analCapacity()) >= 0) temp = game.forest.tamaniScene.tamaniAnalShits;
            // NOT PREGGERS
            if (!game.forest.tamaniScene.pregnancy.isPregnant && player.canOvipositSpider()) {
                temp2 = game.forest.tamaniScene.tamaniBeaten;
            }
            game.simpleChoices("Fuck", game.forest.tamaniScene.tamaniSexWon, "Buttfuck", temp, "", null, "Lay Eggs", temp2, "Leave", game.cleanupAfterCombat);
        }
        else game.return { next: Scenes.camp.returnToCampUseOneHour };
    }

    public won(hpVictory: boolean, pcCameWorms: boolean) {
        if (hpVictory) {
            if (player.torso.cocks.count > 0) {
                if (randInt(2) === 0) game.forest.tamaniScene.tamaniSexLost();
                else game.forest.tamaniScene.tamaniSexLetHer();
            } else {
                DisplayText("Tamani sighs as you begin to lose conscious, \"<i>You dummy, why'd you get rid of the fun parts?</i>\"", true);
                game.return { next: Scenes.camp.returnToCampUseOneHour };
            }
        } else {
            if (player.torso.cocks.count > 0) {
                // hypnoslut loss scene
                if (game.Flags.list[FlagEnum.TAMANI_TIMES_HYPNOTISED] > 19 && randInt(2) === 0) {
                    game.forest.tamaniScene.getRapedByTamaniYouHypnoSlut();
                } else if (randInt(2) === 0) game.forest.tamaniScene.tamaniSexLost();
                else game.forest.tamaniScene.tamaniSexLetHer();
            } else {
                DisplayText("You give into your lusts and masturbate, but Tamani doesn't seem to care.  She kicks and punches you over and over, screaming, \"<i>You dummy, why'd you get rid of the fun parts?</i>\"", true);
                game.takeDamage(10000);
                game.return { next: Scenes.camp.returnToCampUseOneHour };
            }
        }
    }

    public Tamani() {
        super(false);
        this.a = "";
        this.short = "Tamani";
        this.imageName = "tamani";
        this.long = "She keeps her arms folded across her " + game.forest.tamaniScene.tamaniChest() + " and glares at you.  The little thing is only about four feet tall, with pink and black dyed hair cut into a cute little 'do.  The greenish-gray skin of her breasts bulges out around her arms, supported by a few leather straps, amplifying her cleavage.  Her cunt lips are pierced multiple times, inflamed, and slightly parted.  There really isn't any clothing on her to hide them, just more of the ever-present straps wrapping around her thighs.";
        // this.plural = false;
        this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.NORMAL);
        this.statusAffects.add(StatusAffectType.BonusVCapacity, 55, 0, 0, 0);
        createBreastRow(Appearance.breastCupInverse("E"));
        this.torso.butt.looseness = ButtLooseness.TIGHT;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 40, 0, 0, 0);
        this.tallness = 40;
        this.torso.hipRating = HipRating.AMPLE + 2;
        this.torso.butt.rating = ButtRating.LARGE;
        this.skin.tone = "greenish gray";
        this.torso.neck.head.hair.color = "pink and black";
        this.torso.neck.head.hair.length = 16;
        this.baseStats.str = 32;
        this.baseStats.tou = 43;
        this.baseStats.spe = 55;
        this.baseStats.int = 62;
        this.baseStats.lib = 65;
this.baseStats.sens = 65;
this.baseStats.cor = 50;
        this.weaponName = "fists";
        this.weaponVerb = "tiny punch";
        this.armorName = "leather straps";
        this.bonusHP = 40;
        this.lust = 40;
        this.lustVuln = 0.9;
        this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 4;
        this.gems = randInt(25) + 5;
        this.drop = new WeightedDrop().add(consumables.GOB_ALE, 4)
            .addMany(1,
                consumables.L_DRAFT,
                consumables.PINKDYE,
                consumables.BLUEDYE,
                consumables.ORANGDY,
                consumables.PURPDYE,
                consumables.INCUBID,
                consumables.REDUCTO,
                consumables.L_BLUEG,
                null);
        this.special1 = goblinDrugAttack;
        this.special2 = goblinTeaseAttack;
        checkMonster();
    }

}
