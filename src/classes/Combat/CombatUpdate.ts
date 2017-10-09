import Character from '../Character';

export default class CombatUpdate {
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
    public doDamage(character: Character, damage: number, apply: boolean = true): number {
        if (character.perks.has("Sadist")) {
            damage *= 1.2;
            character.stats.lust += 3;
        }

        // Uma's Massage Bonuses
        if (character.statusAffects.has("UmasMassage")) {
            if (character.statusAffects.get("UmasMassage").value1 == UmasShop.MASSAGE_POWER) {
                damage *= character.statusAffects.get("UmasMassage").value2;
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
    public fatigueRecovery(): void {
        fatigue(-1);
        if (player.perks.has("EnlightenedNinetails") || player.perks.has("CorruptedNinetails")) fatigue(-(1 + rand(3)));
    }
    public enemyAI(): void {
        monster.doAI();
    }
    private combatStatusesUpdate(player: Player, monster: Monster): void {
        //old outfit used for fetish cultists
        let oldOutfit: string = "";
        let changed: boolean = false;

        if (player.statusAffects.has("Sealed")) {
            //Countdown and remove as necessary
            if (player.statusAffects.get("Sealed").value1 > 0) {
                player.statusAffects.get("Sealed").value1--;
                if (player.statusAffects.get("Sealed").value1 <= 0) player.statusAffects.remove("Sealed");
                else MainScreen.text("<b>One of your combat abilities is currently sealed by magic!</b>\n\n");
            }
        }
        monster.combatRoundUpdate();
        //[Silence warning]
        if (player.statusAffects.has("ThroatPunch")) {
            player.statusAffects.get("ThroatPunch").value1--;
            if (player.statusAffects.get("ThroatPunch").value1 >= 0) MainScreen.text("Thanks to Isabella's wind-pipe crushing hit, you're having trouble breathing and are <b>unable to cast spells as a consequence.</b>\n\n", false);
            else {
                MainScreen.text("Your wind-pipe recovers from Isabella's brutal hit.  You'll be able to focus to cast spells again!\n\n", false);
                player.statusAffects.remove("ThroatPunch");
            }
        }
        if (player.statusAffects.has("GooArmorSilence")) {
            if (player.statusAffects.get("GooArmorSilence").value1 >= 2 || Utils.rand(20) + 1 + player.stats.str / 10 >= 15) {
                //if passing str check, output at beginning of turn
                MainScreen.text("<b>The sticky slop covering your mouth pulls away reluctantly, taking more force than you would expect, but you've managed to free your mouth enough to speak!</b>\n\n");
                player.statusAffects.remove("GooArmorSilence");
            }
            else {
                MainScreen.text("<b>Your mouth is obstructed by sticky goo!  You are silenced!</b>\n\n", false);
                player.statusAffects.get("GooArmorSilence").value1++;
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
            player.stats.lust += player.statusAffects.get("LustStones").value1 + 4;
        }
        if (player.statusAffects.has("WebSilence")) {
            if (player.statusAffects.get("WebSilence").value1 >= 2 || Utils.rand(20) + 1 + player.stats.str / 10 >= 15) {
                MainScreen.text("You rip off the webbing that covers your mouth with a cry of pain, finally able to breathe normally again!  Now you can cast spells!\n\n", false);
                player.statusAffects.remove("WebSilence");
            }
            else {
                MainScreen.text("<b>Your mouth and nose are obstructed by sticky webbing, making it difficult to breathe and impossible to focus on casting spells.  You try to pull it off, but it just won't work!</b>\n\n", false);
                player.statusAffects.get("WebSilence").value1++;
            }
        }
        if (player.statusAffects.has("HolliConstrict")) {
            MainScreen.text("<b>You're tangled up in Holli's verdant limbs!  All you can do is try to struggle free...</b>\n\n");
        }
        if (player.statusAffects.has("UBERWEB"))
            MainScreen.text("<b>You're pinned under a pile of webbing!  You should probably struggle out of it and get back in the fight!</b>\n\n", false);
        if (player.statusAffects.has("Blind") && !monster.statusAffects.has("Sandstorm")) {
            if (player.statusAffects.has("SheilaOil")) {
                if (player.statusAffects.get("Blind").value1 <= 0) {
                    MainScreen.text("<b>You finish wiping the demon's tainted oils away from your eyes; though the smell lingers, you can at least see.  Sheila actually seems happy to once again be under your gaze.</b>\n\n", false);
                    player.statusAffects.remove("Blind");
                }
                else {
                    MainScreen.text("<b>You scrub at the oily secretion with the back of your hand and wipe some of it away, but only smear the remainder out more thinly.  You can hear the demon giggling at your discomfort.</b>\n\n", false);
                    player.statusAffects.get("Blind").value1--;
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
                    player.statusAffects.get("Blind").value1--;
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
                let bleed: number = (2 + Utils.rand(4)) / 100;
                bleed *= player.stats.HP;
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
            monster.lust += monster.lustVuln * (2 + Utils.rand(4));
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
            if (player.perks.has("Medicine") && Utils.rand(100) <= 14) {
                MainScreen.text("You manage to cleanse the harpy lip-gloss from your system with your knowledge of medicine!\n\n", false);
                player.statusAffects.remove("Luststick");
            }
            else if (Utils.rand(5) == 0) {
                if (Utils.rand(2) == 0) MainScreen.text("A fantasy springs up from nowhere, dominating your thoughts for a few moments.  In it, you're lying down in a soft nest.  Gold-rimmed lips are noisily slurping around your " + CockDescriptor.describeCock(player, 0) + ", smearing it with her messy aphrodisiac until you're completely coated in it.  She looks up at you knowingly as the two of you get ready to breed the night away...\n\n", false);
                else MainScreen.text("An idle daydream flutters into your mind.  In it, you're fucking a harpy's asshole, clutching tightly to her wide, feathery flanks as the tight ring of her pucker massages your " + CockDescriptor.describeCock(player, 0) + ".  She moans and turns around to kiss you on the lips, ensuring your hardness.  Before long her feverish grunts of pleasure intensify, and you feel the egg she's birthing squeezing against you through her internal walls...\n\n", false);
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
            player.stats.lust += 7 + player.stats.sens / 10;
        }
        if (player.statusAffects.has("KissOfDeath")) {
            //Effect 
            MainScreen.text("Your lips burn with an unexpected flash of heat.  They sting and burn with unholy energies as a puff of ectoplasmic gas escapes your lips.  That puff must be a part of your soul!  It darts through the air to the succubus, who slurps it down like a delicious snack.  You feel feverishly hot and exhausted...\n\n", false);
            player.stats.lust += 5;
            takeDamage(15);
        }
        if (player.statusAffects.has("DemonSeed")) {
            MainScreen.text("You feel something shift inside you, making you feel warm.  Finding the desire to fight this... hunk gets harder and harder.\n\n", false);
            player.stats.lust += player.statusAffects.get("DemonSeed").value1 + Math.floor(player.stats.sens / 30) + Math.floor(player.stats.lib / 30) + Math.floor(player.stats.cor / 30));
        }
        if (player.inHeat && player.lowerBody.vaginaSpot.count() > 0 && monster.lowerBody.cockSpot.count() > 0) {
            player.stats.lust += (Utils.rand(player.stats.lib / 5) + 3 + Utils.rand(5));
            MainScreen.text("Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " clenches with an instinctual desire to be touched and filled.  ", false);
            MainScreen.text("If you don't end this quickly you'll give in to your heat.\n\n", false);
        }
        if (player.inRut && player.lowerBody.cockSpot.count() > 0 && monster.lowerBody.vaginaSpot.hasVagina()) {
            player.stats.lust += (Utils.rand(player.stats.lib / 5) + 3 + Utils.rand(5));
            if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("Each of y", false);
            else MainScreen.text("Y", false);
            // No monster plural
            //if (monster.plural) MainScreen.text("our " + CockDescriptor.describeMultiCockShort(player) + " dribbles pre-cum as you think about plowing " + monster.a + monster.short + " right here and now, fucking " + monster.pronoun3 + " " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s until they're totally fertilized and pregnant.\n\n", false);
            //else
            MainScreen.text("our " + CockDescriptor.describeMultiCockShort(player) + " dribbles pre-cum as you think about plowing " + monster.a + monster.short + " right here and now, fucking " + monster.pronoun3 + " " + VaginaDescriptor.describeVagina(monster, monster.lowerBody.vaginaSpot.get(0)) + " until it's totally fertilized and pregnant.\n\n", false);
        }
        if (player.statusAffects.has("NagaVenom")) {
            //Chance to cleanse!
            if (player.perks.has("Medicine") && Utils.rand(100) <= 14) {
                MainScreen.text("You manage to cleanse the naga venom from your system with your knowledge of medicine!\n\n", false);
                player.stats.spe += player.statusAffects.get("NagaVenom").value1;
                //mainView.statsView.showStatUp('spe');
                // speUp.visible = true;
                // speDown.visible = false;
                player.statusAffects.remove("NagaVenom");
            }
            else if (player.stats.spe > 3) {
                player.statusAffects.get("NagaVenom").value1 += 2;
                //stats(0,0,-2,0,0,0,0,0);
                player.stats.spe -= 2;
            }
            else takeDamage(5);
            MainScreen.text("You wince in pain and try to collect yourself, the naga's venom still plaguing you.\n\n", false);
            takeDamage(2);
        }
        else if (player.statusAffects.has("TemporaryHeat")) {
            //Chance to cleanse!
            if (player.perks.has("Medicine") && Utils.rand(100) <= 14) {
                MainScreen.text("You manage to cleanse the heat and rut drug from your system with your knowledge of medicine!\n\n", false);
                player.statusAffects.remove("TemporaryHeat");
            }
            else {
                player.stats.lust += (player.stats.lib / 12 + 5 + Utils.rand(5));
                if (player.lowerBody.vaginaSpot.hasVagina()) {
                    MainScreen.text("Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " clenches with an instinctual desire to be touched and filled.  ", false);
                }
                else if (player.lowerBody.cockSpot.count() > 0) {
                    MainScreen.text("Your " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " pulses and twitches, overwhelmed with the desire to breed.  ", false);
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
            if (player.perks.has("Medicine") && Utils.rand(100) <= 14) {
                MainScreen.text("You manage to cleanse the poison from your system with your knowledge of medicine!\n\n", false);
                player.statusAffects.remove("Poison");
            }
            else {
                MainScreen.text("The poison continues to work on your body, wracking you with pain!\n\n", false);
                takeDamage(8 + Utils.rand(maxHP() / 20));
            }
        }
        //Bondage straps + bondage fetish
        if (Flags.list[FlagEnum.PC_FETISH] >= 2 && player.inventory.armor.displayName == "barely-decent bondage straps") {
            MainScreen.text("The feeling of the tight, leather straps holding tightly to your body while exposing so much of it turns you on a little bit more.\n\n", false);
            player.stats.lust += 2;
        }
        regeneration(true);
    }

}