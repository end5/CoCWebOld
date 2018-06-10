export class TamanisDaughters extends Goblin {
    private midRoundMadness(): void {
        let selector: number = randInt(4);
        if (selector === 0) {
            DisplayText("A slender hand reaches inside your " + player.inventory.equipment.armor.displayName + " and gives your ");
            if (player.torso.balls.quantity > 0) {
                if (randInt(2) === 0) DisplayText(player.CockDescriptor.describeMultiCockShort(player));
                else DisplayText(player.BallsDescriptor.describeBalls(true, true, player));
            }
            else DisplayText(player.CockDescriptor.describeMultiCockShort(player));
            DisplayText(" a gentle squeeze.  You twist away but your breathing gets a little heavier.\n\n");
        }
        else if (selector === 1) {
            DisplayText("A girl latches onto your " + LegDescriptor.describeLegs(player) + " and begins caressing your body lovingly, humming happily.  You quickly shake her loose but the attention makes you blush a little more.\n\n");
        }
        else if (selector === 2) {
            DisplayText("One of your daughters launches onto your back and presses her hard, pierced nipples against your neck.  She whispers in your ear, \"<i>Twist my nipples dad!</i>\"\n\n");
            DisplayText("You reach back and throw her off, but her perverted taunts still leave you feeling a little hot under the collar.\n\n");
        }
        else DisplayText("A daughter lays down in front of you and starts jilling herself on the spot.  It's impossible to not glance down and see her or hear her pleasured moans.  You step away to remove the distraction but it definitely causes some discomfort in your " + player.inventory.equipment.armor.displayName + ".\n\n");
        game.dynStats("lus", 1 + player.stats.lib / 15 + randInt(player.stats.cor / 30));
    }

    private tamaniShowsUp(): void {
        if (TamainsDaughtersScene.tamaniPresent) {
            if (randInt(4) === 0) goblinDrugAttack(); //Tamani already there - chance of potion
        }
        else if (randInt(6) === 0) {
            TamainsDaughtersScene.tamaniPresent = true;
            DisplayText("A high-pitched yet familiar voice calls out, \"<i><b>So this is where you skanks ran off to---wait a second.  Are you trying to poach Tamani's man!?</b></i>\"\n\n");
            DisplayText("You can see Tamani lurking around the rear of the goblin pack, visibly berating her daughters.  On one hand it sounds like she might help you, but knowing goblins, she'll probably forget about her anger and help them subdue you for more cum...\n\n");
            //(+5 mob strength)
            str += 5;
            //(+5 mob toughness)
            tou += 5;
            HP += 10;
            //(-20 mob lust)
            lust -= 20;
            //append combat desc
            long += " <b>Tamani lurks in the back of the crowd, curvier than her brood and watching with a mixture of amusement and irritation.  She runs a hand through her pink and black hair, waiting for an opportunity to get involved...</b>";
        }
    }

    override protected performCombatAction(): void {
        let select: number = 1;
        //mid-round madness!
        midRoundMadness();
        tamaniShowsUp();

        if (special1 != null) select++;
        if (special2 != null) select++;
        if (special3 != null) select++;
        switch (randInt(select)) {
            case 0:
                statusAffects.set(new StatusAffect("Attacks", int(Flags.list[FlagEnum.TAMANI_NUMBER_OF_DAUGHTERS] / 20))), 0, 0, 0); //Tamani's Daughters get multiattacks!
                eAttack();
                break;
            case 1:
                special1();
                break;
            case 2:
                special2();
                break;
            default:
                special3();
                break;
        }
        combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        game.forest.tamaniDaughtersScene.combatWinAgainstDaughters();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            DisplayText("\n\nYour foes seem visibly disgusted and leave, telling you to, \"<i>quit being so fucking gross...</i>\"");
            game.cleanupAfterCombat();
        } else {
            game.forest.tamaniDaughtersScene.loseToDaughters();
        }
    }

    public TamanisDaughters() {
        super(true);
        this.a = "the group of ";
        this.short = "Tamani's daughters";
        this.imageName = "tamanisdaughters";
        this.long = "A large grouping of goblin girls has gathered around you, surrounding you on all sides.  Most have varying shades of green skin, though a few have yellowish or light blue casts to their skin.  All are barely clothed, exposing as much of their flesh as possible in order to excite a potential mate.  Their hairstyles are as varied as their clothing and skin-tones, and the only things they seem to have in common are cute faces and curvy forms.  It looks like they want something from you.";
        this.plural = true;
        this.pronoun1 = "they";
        this.pronoun2 = "them";
        this.pronoun3 = "their";
        this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.TIGHT);
        this.statusAffects.add(StatusAffectType.BonusVCapacity, 40, 0, 0, 0);
        createBreastRow(Appearance.breastCupInverse("D"));
        this.torso.butt.looseness = ButtLooseness.TIGHT;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.statusAffects.add(StatusAffectType.BonusACapacity, 25, 0, 0, 0);
        this.tallness = 40;
        this.torso.hipRating = HipRating.AMPLE + 1;
        this.torso.butt.rating = ButtRating.NOTICEABLE + 1;
        this.skin.tone = "greenish gray";
        this.torso.neck.head.hair.color = "pink";
        this.torso.neck.head.hair.length = 16;
        this.baseStats.str = 55;
        this.baseStats.tou = 30;
        this.baseStats.spe = 45;
        this.baseStats.int = 50;
        initLibSensCor(70, 70, 50);
        this.weaponName = "fists";
        this.weaponVerb = "tiny punch";
        this.armorName = "leather straps";
        this.bonusHP = 50 + (int(Flags.list[FlagEnum.TAMANI_NUMBER_OF_DAUGHTERS] / 2) * 15);
        this.lust = 30;
        this.lustVuln = .65;
        this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 8 + (Math.floor(Flags.list[FlagEnum.TAMANI_NUMBER_OF_DAUGHTERS] / 20));
        this.gems = randInt(15) + 5;
        this.drop = new WeightedDrop().
            add(consumables.GOB_ALE, 5).
            addMany(1, consumables.L_DRAFT,
                consumables.PINKDYE,
                consumables.BLUEDYE,
                consumables.ORANGDY,
                consumables.PURPDYE);
        this.special1 = goblinDrugAttack;
        this.special2 = goblinTeaseAttack;
        checkMonster();
    }

}

