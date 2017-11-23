import Character from '../Character/Character';
import Flags, { FlagEnum } from '../Game/Flags';
import Utils from '../Utilities/Utils';

export default class CombatUtils {
    public static combatMiss(character: Character, monster: Character): boolean {
        return character.stats.spe - monster.stats.spe > 0 && Utils.rand(((character.stats.spe - monster.stats.spe) / 4) + 80) > 80;

    }

    public static combatEvade(character: Character, monster: Character): boolean {
        return monster.desc.short != "Kiha" && character.perks.has(PerkType.Evade) && Utils.rand(100) < 10;

    }

    public static combatFlexibility(character: Character, monster: Character): boolean {
        return character.perks.has(PerkType.Flexibility) && Utils.rand(100) < 6;

    }

    public static combatMisdirect(character: Character, monster: Character): boolean {
        return character.perks.has(PerkType.Misdirection) && Utils.rand(100) < 10 && character.inventory.armorSlot.equipment.displayName == "red, high-society bodysuit";
    }

    public static combatRegeneration(character: Character): void {
        let healingPercent: number = 0;
        if (character.perks.has(PerkType.Regeneration)) healingPercent += 1;
        if (character.perks.has(PerkType.Regeneration2)) healingPercent += 2;
        if (character.inventory.armorSlot.equipment.displayName == "skimpy nurse's outfit") healingPercent += 2;
        if (character.inventory.armorSlot.equipment.displayName == "goo armor") healingPercent += 2;
        if (character.perks.has(PerkType.LustyRegeneration)) healingPercent += 1;
        if (healingPercent > 5) healingPercent = 5;
        character.stats.HP += (Math.round(character.stats.maxHP() * healingPercent / 100));
    }

    public static fatigueRecovery(character: Character): void {
        character.stats.fatigue--;
        if (character.perks.has(PerkType.EnlightenedNinetails) || character.perks.has(PerkType.CorruptedNinetails))
            character.stats.fatigue -= (1 + Utils.rand(3));
    }


    public packAttack(player: Character, monster: Character): void {
        //Determine if dodged!
        if (player.stats.spe - monster.stats.spe > 0 && Utils.rand(((player.stats.spe - monster.stats.spe) / 4) + 80) > 80) {
            DisplayText.text("You duck, weave, and dodge.  Despite their best efforts, the throng of demons only hit the air and each other.");
        }
        //Determine if evaded
        else if (player.perks.has(PerkType.Evade) && Utils.rand(100) < 10) {
            DisplayText.text("Using your skills at evading attacks, you anticipate and sidestep " + monster.desc.a+ monster.desc.short + "' attacks.");
        }
        //("Misdirection"
        else if (player.perks.has(PerkType.Misdirection) && Utils.rand(100) < 15 && player.inventory.armorSlot.equipment.displayName == "red, high-society bodysuit") {
            DisplayText.text("Using Raphael's teachings, you anticipate and sidestep " + monster.desc.a+ monster.desc.short + "' attacks.");
        }
        //Determine if cat'ed
        else if (player.perks.has(PerkType.Flexibility) && Utils.rand(100) < 6) {
            DisplayText.text("With your incredible flexibility, you squeeze out of the way of " + monster.desc.a+ monster.desc.short + "' attacks.");
        }
        else {
            let temp = Math.floor((monster.stats.str + monster.weaponAttack()) - Utils.rand(player.stats.tou) - player.defense()); //Determine damage - str modified by enemy toughness!
            if (temp <= 0) {
                temp = 0;
                if (!monster.desc.plural)
                    DisplayText.text("You deflect and block every " + monster.inventory.weaponSlot.equipment.displayname + " " + monster.desc.a+ monster.desc.short + " throw at you.");
                else DisplayText.text("You deflect " + monster.desc.a+ monster.desc.short + " " + monster.weaponVerb + ".");
            }
            else {
                temp = takeDamage(temp);
                if (temp <= 5)
                    DisplayText.text("You are struck a glancing blow by " + monster.desc.a+ monster.desc.short + "! (" + temp + ")");
                else if (temp <= 10)
                    DisplayText.text(monster.desc.capitalA + monster.desc.short + " wound you! (" + temp + ")");
                else if (temp <= 20)
                    DisplayText.text(monster.desc.capitalA + monster.desc.short + " stagger you with the force of " + monster.desc.possessivePronoun + " " + monster.weaponVerb + "s! (" + temp + ")");
                else DisplayText.text(monster.desc.capitalA + monster.desc.short + " <b>mutilates</b> you with powerful fists and " + monster.weaponVerb + "s! (" + temp + ")");
            }
            DisplayText.text("\n");
        }
    }

    public display(): void {
        if (!monster.checkCalled) {
            DisplayText.text("<B>/!\\BUG! Monster.checkMonster() is not called! Calling it now...</B>\n");
            monster.checkMonster();
        }
        if (monster.checkError != "") {
            DisplayText.text("<B>/!\\BUG! Monster is not correctly initialized! <u>" +
                monster.checkError + "</u></b>\n");
        }
        let percent: string = "";
        let math: number = monster.stats.HPRatio();
        percent = "(<b>" + String(int(math * 1000) / 10) + "% HP</b>)";

        //trace("trying to show monster image!");
        if (monster.imageName != "") {
            let monsterName: string = "monster-" + monster.imageName;
            //trace("Monster name = ", monsterName);
            DisplayText.text(images.showImage(monsterName));
        }
        //	if(gameState == 2) DisplayText.text("<b>You are grappling with:\n</b>");
        //	else
        DisplayText.text("<b>You are fighting ");
        DisplayText.text(monster.desc.a+ monster.desc.short + ":</b> (Level: " + monster.level + ")\n");
        if (player.statusAffects.has(StatusAffectType.Blind)) DisplayText.text("It's impossible to see anything!\n");
        else {
            DisplayText.text(monster.desc.long + "\n");
            //Bonus sand trap stuff
            if (monster.statusAffects.has(StatusAffectType.Level)) {
                temp = monster.statusAffects.get(StatusAffectType.Level).value1;
                //[(new PG for PC height levels)PC level 4: 
                DisplayText.text("\n");
                if (temp == 4) DisplayText.text("You are right at the edge of its pit.  If you can just manage to keep your footing here, you'll be safe.");
                else if (temp == 3) DisplayText.text("The sand sinking beneath your feet has carried you almost halfway into the creature's pit.");
                else DisplayText.text("The dunes tower above you and the hissing of sand fills your ears.  <b>The leering sandtrap is almost on top of you!</b>");
                //no new PG)
                DisplayText.text("  You could try attacking it with your " + player.weaponName + ", but that will carry you straight to the bottom.  Alternately, you could try to tease it or hit it at range, or wait and maintain your footing until you can clamber up higher.");
                DisplayText.text("\n");
            }
            if (monster.desc.plural) {
                if (math >= 1) DisplayText.text("You see " + monster.desc.subjectivePronoun + " are in perfect health.");
                else if (math > .75) DisplayText.text("You see " + monster.desc.subjectivePronoun + " aren't very hurt.");
                else if (math > .5) DisplayText.text("You see " + monster.desc.subjectivePronoun + " are slightly wounded.");
                else if (math > .25) DisplayText.text("You see " + monster.desc.subjectivePronoun + " are seriously hurt.");
                else DisplayText.text("You see " + monster.desc.subjectivePronoun + " are unsteady and close to death.");
            }
            else {
                if (math >= 1) DisplayText.text("You see " + monster.desc.subjectivePronoun + " is in perfect health.");
                else if (math > .75) DisplayText.text("You see " + monster.desc.subjectivePronoun + " isn't very hurt.");
                else if (math > .5) DisplayText.text("You see " + monster.desc.subjectivePronoun + " is slightly wounded.");
                else if (math > .25) DisplayText.text("You see " + monster.desc.subjectivePronoun + " is seriously hurt.");
                else DisplayText.text("You see " + monster.desc.subjectivePronoun + " is unsteady and close to death.");
            }
            DisplayText.text("  " + percent + "\n");
            showMonsterLust();
        }
        if (debug) {
            DisplayText.text("\n----------------------------\n");
            DisplayText.text(monster.generateDebugDescription());
        }
    }
    
    public showMonsterLust(): void {
        //Entrapped
        if (monster.statusAffects.has(StatusAffectType.Constricted)) {
            DisplayText.text(monster.desc.capitalA + monster.desc.short + " is currently wrapped up in your tail-coils!  ");
        }
        //Venom stuff!
        if (monster.statusAffects.has(StatusAffectType.NagaVenom)) {
            if (monster.desc.plural) {
                if (monster.statusAffects.get(StatusAffectType.NagaVenom).value1 <= 1) {
                    DisplayText.text("You notice " + monster.desc.subjectivePronoun + " are beginning to show signs of weakening, but there still appears to be plenty of fight left in " + monster.desc.objectivePronoun + ".  ");
                }
                else {
                    DisplayText.text("You notice " + monster.desc.subjectivePronoun + " are obviously affected by your venom, " + monster.desc.possessivePronoun + " movements become unsure, and " + monster.desc.possessivePronoun + " balance begins to fade. Sweat begins to roll on " + monster.desc.possessivePronoun + " skin. You wager " + monster.desc.subjectivePronoun + " are probably beginning to regret provoking you.  ");
                }
            }
            //Not plural
            else {
                if (monster.statusAffects.get(StatusAffectType.NagaVenom).value1 <= 1) {
                    DisplayText.text("You notice " + monster.desc.subjectivePronoun + " is beginning to show signs of weakening, but there still appears to be plenty of fight left in " + monster.desc.objectivePronoun + ".  ");
                }
                else {
                    DisplayText.text("You notice " + monster.desc.subjectivePronoun + " is obviously affected by your venom, " + monster.desc.possessivePronoun + " movements become unsure, and " + monster.desc.possessivePronoun + " balance begins to fade. Sweat is beginning to roll on " + monster.desc.possessivePronoun + " skin. You wager " + monster.desc.subjectivePronoun + " is probably beginning to regret provoking you.  ");
                }
            }

            monster.stats.spe -= monster.statusAffects.get(StatusAffectType.NagaVenom).value1;
            monster.str -= monster.statusAffects.get(StatusAffectType.NagaVenom).value1;
            if (monster.stats.spe < 1) monster.stats.spe = 1;
            if (monster.str < 1) monster.str = 1;
        }
        if (monster.desc.short == "harpy") {
            //(Enemy slightly aroused) 
            if (monster.stats.lust >= 45 && monster.stats.lust < 70) DisplayText.text("The harpy's actions are becoming more and more erratic as she runs her mad-looking eyes over your body, her chest jiggling, clearly aroused.  ");
            //(Enemy moderately aroused) 
            if (monster.stats.lust >= 70 && monster.stats.lust < 90) DisplayText.text("She stops flapping quite so frantically and instead gently sways from side to side, showing her soft, feathery body to you, even twirling and raising her tail feathers, giving you a glimpse of her plush pussy, glistening with fluids.");
            //(Enemy dangerously aroused) 
            if (monster.stats.lust >= 90) DisplayText.text("You can see her thighs coated with clear fluids, the feathers matted and sticky as she struggles to contain her lust.");
        }
        else if (monster instanceof Clara) {
            //Clara is becoming aroused
            if (monster.stats.lust <= 40) { }
            else if (monster.stats.lust <= 65) DisplayText.text("The anger in her motions is weakening.");
            //Clara is somewhat aroused
            else if (monster.stats.lust <= 75) DisplayText.text("Clara seems to be becoming more aroused than angry now.");
            //Clara is very aroused
            else if (monster.stats.lust <= 85) DisplayText.text("Clara is breathing heavily now, the signs of her arousal becoming quite visible now.");
            //Clara is about to give in
            else DisplayText.text("It looks like Clara is on the verge of having her anger overwhelmed by her lusts.");
        }
        //{Bonus Lust Descripts}
        else if (monster.desc.short == "Minerva") {
            if (monster.stats.lust < 40) { }
            //(40)
            else if (monster.stats.lust < 60) DisplayText.text("Letting out a groan Minerva shakes her head, focusing on the fight at hand.  The bulge in her short is getting larger, but the siren ignores her growing hard-on and continues fighting.  ");
            //(60) 
            else if (monster.stats.lust < 80) DisplayText.text("Tentacles are squirming out from the crotch of her shorts as the throbbing bulge grows bigger and bigger, becoming harder and harder... for Minerva to ignore.  A damp spot has formed just below the bulge.  ");
            //(80)
            else DisplayText.text("She's holding onto her weapon for support as her face is flushed and pain-stricken.  Her tiny, short shorts are painfully holding back her quaking bulge, making the back of the fabric act like a thong as they ride up her ass and struggle against her cock.  Her cock-tentacles are lashing out in every direction.  The dampness has grown and is leaking down her leg.");
        }
        else if (monster.desc.short == "Cum Witch") {
            //{Bonus Lust Desc (40+)}
            if (monster.stats.lust < 40) { }
            else if (monster.stats.lust < 50) DisplayText.text("Her nipples are hard, and poke two visible tents into the robe draped across her mountainous melons.  ");
            //{Bonus Lust Desc (50-75)}
            else if (monster.stats.lust < 75) DisplayText.text("Wobbling dangerously, you can see her semi-hard shaft rustling the fabric as she moves, evidence of her growing needs.  ");
            //{75+}
            if (monster.stats.lust >= 75) DisplayText.text("Swelling obscenely, the Cum Witch's thick cock stands out hard and proud, its bulbous tip rustling through the folds of her fabric as she moves and leaving dark smears in its wake.  ");
            //(85+}
            if (monster.stats.lust >= 85) DisplayText.text("Every time she takes a step, those dark patches seem to double in size.  ");
            //{93+}
            if (monster.stats.lust >= 93) DisplayText.text("There's no doubt about it, the Cum Witch is dripping with pre-cum and so close to caving in.  Hell, the lower half of her robes are slowly becoming a seed-stained mess.  ");
            //{Bonus Lust Desc (60+)}
            if (monster.stats.lust >= 70) DisplayText.text("She keeps licking her lips whenever she has a moment, and she seems to be breathing awfully hard.  ");
        }
        else if (monster.desc.short == "Kelt") {
            //Kelt Lust Levels
            //(sub 50)
            if (monster.stats.lust < 50) DisplayText.text("Kelt actually seems to be turned off for once in his miserable life.  His maleness is fairly flaccid and droopy.  ");
            //(sub 60)
            else if (monster.stats.lust < 60) DisplayText.text("Kelt's gotten a little stiff down below, but he still seems focused on taking you down.  ");
            //(sub 70)
            else if (monster.stats.lust < 70) DisplayText.text("Kelt's member has grown to its full size and even flared a little at the tip.  It bobs and sways with every movement he makes, reminding him how aroused you get him.  ");
            //(sub 80)
            else if (monster.stats.lust < 80) DisplayText.text("Kelt is unabashedly aroused at this point.  His skin is flushed, his manhood is erect, and a thin bead of pre has begun to bead underneath.  ");
            //(sub 90)
            else if (monster.stats.lust < 90) DisplayText.text("Kelt seems to be having trouble focusing.  He keeps pausing and flexing his muscles, slapping his cock against his belly and moaning when it smears his pre-cum over his equine underside.  ");
            //(sub 100) 
            else DisplayText.text("There can be no doubt that you're having quite the effect on Kelt.  He keeps fidgeting, dripping pre-cum everywhere as he tries to keep up the facade of fighting you.  His maleness is continually twitching and bobbing, dripping messily.  He's so close to giving in...");
        }
        else if (monster.desc.short == "green slime") {
            if (monster.stats.lust >= 45 && monster.stats.lust < 65) DisplayText.text("A lump begins to form at the base of the figure's torso, where its crotch would be.  ");
            if (monster.stats.lust >= 65 && monster.stats.lust < 85) DisplayText.text("A distinct lump pulses at the base of the slime's torso, as if something inside the creature were trying to escape.  ");
            if (monster.stats.lust >= 85 && monster.stats.lust < 93) DisplayText.text("A long, thick pillar like a small arm protrudes from the base of the slime's torso.  ");
            if (monster.stats.lust >= 93) DisplayText.text("A long, thick pillar like a small arm protrudes from the base of the slime's torso.  Its entire body pulses, and it is clearly beginning to lose its cohesion.  ");
        }
        else if (monster.desc.short == "Sirius, a naga hypnotist") {
            if (monster.stats.lust < 40) { }
            else if (monster.stats.lust >= 40) DisplayText.text("You can see the tip of his reptilian member poking out of its protective slit. ");
            else if (monster.stats.lust >= 60) DisplayText.text("His cock is now completely exposed and half-erect, yet somehow he still stays focused on your eyes and his face is inexpressive.  ");
            else DisplayText.text("His cock is throbbing hard, you don't think it will take much longer for him to pop.   Yet his face still looks inexpressive... despite the beads of sweat forming on his brow.  ");

        }
        else if (monster.desc.short == "kitsune") {
            //Kitsune Lust states:
            //Low
            if (monster.stats.lust > 30 && monster.stats.lust < 50) DisplayText.text("The kitsune's face is slightly flushed.  She fans herself with her hand, watching you closely.");
            //Med
            else if (monster.stats.lust > 30 && monster.stats.lust < 75) DisplayText.text("The kitsune's cheeks are bright pink, and you can see her rubbing her thighs together and squirming with lust.");
            //High
            else if (monster.stats.lust > 30) {
                //High (redhead only)
                if (monster.hairColor == "red") DisplayText.text("The kitsune is openly aroused, unable to hide the obvious bulge in her robes as she seems to be struggling not to stroke it right here and now.");
                else DisplayText.text("The kitsune is openly aroused, licking her lips frequently and desperately trying to hide the trail of fluids dripping down her leg.");
            }
        }
        else if (monster.desc.short == "demons") {
            if (monster.stats.lust > 30 && monster.stats.lust < 60) DisplayText.text("The demons lessen somewhat in the intensity of their attack, and some even eye up your assets as they strike at you.");
            if (monster.stats.lust >= 60 && monster.stats.lust < 80) DisplayText.text("The demons are obviously steering clear from damaging anything you might use to fuck and they're starting to leave their hands on you just a little longer after each blow. Some are starting to cop quick feels with their other hands and you can smell the demonic lust of a dozen bodies on the air.");
            if (monster.stats.lust >= 80) DisplayText.text(" The demons are less and less willing to hit you and more and more willing to just stroke their hands sensuously over you. The smell of demonic lust is thick on the air and part of the group just stands there stroking themselves openly.");
        }
        else {
            if (monster.desc.plural) {
                if (monster.stats.lust > 50 && monster.stats.lust < 60) DisplayText.text(monster.desc.capitalA + monster.desc.short + "' skin remains flushed with the beginnings of arousal.  ");
                if (monster.stats.lust >= 60 && monster.stats.lust < 70) DisplayText.text(monster.desc.capitalA + monster.desc.short + "' eyes constantly dart over your most sexual parts, betraying " + monster.desc.possessivePronoun + " lust.  ");
                if (monster.cocks.length > 0) {
                    if (monster.stats.lust >= 70 && monster.stats.lust < 85) DisplayText.text(monster.desc.capitalA + monster.desc.short + " are having trouble moving due to the rigid protrusion in " + monster.desc.possessivePronoun + " groins.  ");
                    if (monster.stats.lust >= 85) DisplayText.text(monster.desc.capitalA + monster.desc.short + " are panting and softly whining, each movement seeming to make " + monster.desc.possessivePronoun + " bulges more pronounced.  You don't think " + monster.desc.subjectivePronoun + " can hold out much longer.  ");
                }
                if (monster.vaginas.length > 0) {
                    if (monster.stats.lust >= 70 && monster.stats.lust < 85) DisplayText.text(monster.desc.capitalA + monster.desc.short + " are obviously turned on, you can smell " + monster.desc.possessivePronoun + " arousal in the air.  ");
                    if (monster.stats.lust >= 85) DisplayText.text(monster.desc.capitalA + monster.desc.short + "' " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "s are practically soaked with their lustful secretions.  ");
                }
            }
            else {
                if (monster.stats.lust > 50 && monster.stats.lust < 60) DisplayText.text(monster.desc.capitalA + monster.desc.short + "'s skin remains flushed with the beginnings of arousal.  ");
                if (monster.stats.lust >= 60 && monster.stats.lust < 70) DisplayText.text(monster.desc.capitalA + monster.desc.short + "'s eyes constantly dart over your most sexual parts, betraying " + monster.desc.possessivePronoun + " lust.  ");
                if (monster.cocks.length > 0) {
                    if (monster.stats.lust >= 70 && monster.stats.lust < 85) DisplayText.text(monster.desc.capitalA + monster.desc.short + " is having trouble moving due to the rigid protrusion in " + monster.desc.possessivePronoun + " groin.  ");
                    if (monster.stats.lust >= 85) DisplayText.text(monster.desc.capitalA + monster.desc.short + " is panting and softly whining, each movement seeming to make " + monster.desc.possessivePronoun + " bulge more pronounced.  You don't think " + monster.desc.subjectivePronoun + " can hold out much longer.  ");
                }
                if (monster.vaginas.length > 0) {
                    if (monster.stats.lust >= 70 && monster.stats.lust < 85) DisplayText.text(monster.desc.capitalA + monster.desc.short + " is obviously turned on, you can smell " + monster.desc.possessivePronoun + " arousal in the air.  ");
                    if (monster.stats.lust >= 85) DisplayText.text(monster.desc.capitalA + monster.desc.short + "'s " + monster.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " is practically soaked with her lustful secretions.  ");
                }
            }
        }
    }

    // Just text should force the function to purely emit the test text to the output display, and not have any other side effects
    public teaseXP(XP: number = 0): void {
        while (XP > 0) {
            XP--;
            player.teaseXP++;
            //Level dat shit up!
            if (player.teaseLevel < 5 && player.teaseXP >= 10 + (player.teaseLevel + 1) * 5 * (player.teaseLevel + 1)) {
                DisplayText.text("\n<b>Tease skill leveled up to " + (player.teaseLevel + 1) + "!</b>");
                player.teaseLevel++;
                player.teaseXP = 0;
            }
        }
    }

    //VICTORY OR DEATH?


    public runAway(callHook: boolean = true): void {
        if (callHook && monster.onPcRunAttempt != null) {
            monster.onPcRunAttempt();
            return;
        }
        DisplayText.text("", true);
        if (inCombat && player.statusAffects.has(StatusAffectType.Sealed) && player.statusAffects.get(StatusAffectType.Sealed).value2 == 4) {
            DisplayText.clear();
            DisplayText.text("You try to run, but you just can't seem to escape.  <b>Your ability to run was sealed, and now you've wasted a chance to attack!</b>\n\n");
            enemyAI();
            return;
        }
        //Rut doesnt let you run from dicks.
        if (player.inRut && monster.totalCocks() > 0) {
            DisplayText.text("The thought of another male in your area competing for all the pussy infuriates you!  No way will you run!", true);
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            menu();
            DisplayText.addButton(0, "Next", combatMenu);
            return;
        }
        if (monster.statusAffects.has(StatusAffectType.Level) && player.canFly()) {
            DisplayText.clear();
            DisplayText.text("You flex the muscles in your back and, shaking clear of the sand, burst into the air!  Wasting no time you fly free of the sandtrap and its treacherous pit.  \"One day your wings will fall off, little ant,\" the snarling voice of the thwarted androgyne carries up to you as you make your escape.  \"And I will be waiting for you when they do!\"");
            inCombat = false;
            clearStatuses(false);
            doNext(camp.returnToCampUseOneHour);
            return;
        }
        if (monster.statusAffects.has(StatusAffectType.GenericRunDisabled) || urtaQuest.isUrta()) {
            DisplayText.text("You can't escape from this fight!");
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            menu();
            DisplayText.addButton(0, "Next", combatMenu);
            return;
        }
        if (monster.statusAffects.has(StatusAffectType.Level) && monster.statusAffects.get(StatusAffectType.Level).value1 < 4) {
            DisplayText.text("You're too deeply mired to escape!  You'll have to <b>climb</b> some first!");
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            menu();
            DisplayText.addButton(0, "Next", combatMenu);
            return;
        }
        if (monster.statusAffects.has(StatusAffectType.RunDisabled)) {
            DisplayText.text("You'd like to run, but you can't scale the walls of the pit with so many demonic hands pulling you down!");
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            menu();
            DisplayText.addButton(0, "Next", combatMenu);
            return;
        }
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00329] == 1 && (monster.desc.short == "minotaur gang" || monster.desc.short == "minotaur tribe")) {
            Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00329] = 0;
            //(Free run away) 
            DisplayText.text("You slink away while the pack of brutes is arguing.  Once they finish that argument, they'll be sorely disappointed!", true);
            inCombat = false;
            clearStatuses(false);
            doNext(camp.returnToCampUseOneHour);
            return;
        }
        else if (monster.desc.short == "minotaur tribe" && monster.stats.HPRatio() >= 0.75) {
            DisplayText.text("There's too many of them surrounding you to run!", true);
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            menu();
            DisplayText.addButton(0, "Next", combatMenu);
            return;
        }
        if (inDungeon || inRoomedDungeon) {
            DisplayText.text("You're trapped in your foe's home turf - there is nowhere to run!\n\n", true);
            enemyAI();
            return;
        }
        //Attempt texts!
        if (monster.desc.short == "Ember") {
            DisplayText.text("You take off");
            if (!player.canFly()) DisplayText.text(" running");
            else DisplayText.text(", flapping as hard as you can");
            DisplayText.text(", and Ember, caught up in the moment, gives chase.  ");
        }
        else if (player.canFly()) DisplayText.text("Gritting your teeth with effort, you beat your wings quickly and lift off!  ");
        //Nonflying PCs
        else {
            //Stuck!
            if (player.statusAffects.has(StatusAffectType.NoFlee)) {
                if (monster.desc.short == "goblin") DisplayText.text("You try to flee but get stuck in the sticky white goop surrounding you.\n\n", true);
                else DisplayText.text("You put all your skills at running to work and make a supreme effort to escape, but are unable to get away!\n\n", true);
                enemyAI();
                return;
            }
            //Nonstuck!
            else DisplayText.text("You turn tail and attempt to flee!  ");
        }

        //Calculations
        let escapeMod: number = 20 + monster.level * 3;
        if (debug) escapeMod -= 300;
        if (player.canFly()) escapeMod -= 20;
        if (player.lowerBody.tailType == TailType.RACCOON && player.upperBody.head.earType == EarType.RACCOON && player.perks.has(PerkType.Runner)) escapeMod -= 25;

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
        if (monster.desc.short == "anemone") {
            //Autosuccess - less than 60 lust
            if (player.stats.lust < 60) {
                DisplayText.text("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
                inCombat = false;
                clearStatuses(false);
                doNext(camp.returnToCampUseOneHour);
                return;
            }
            //Speed dependent
            else {
                //Success
                if (player.stats.spe > rand(monster.stats.spe + escapeMod)) {
                    inCombat = false;
                    clearStatuses(false);
                    DisplayText.text("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
                    doNext(camp.returnToCampUseOneHour);
                    return;
                }
                //Run failed:
                else {
                    DisplayText.text("You try to shake off the fog and run but the anemone slinks over to you and her tentacles wrap around your waist.  <i>\"Stay?\"</i> she asks, pressing her small breasts into you as a tentacle slides inside your " + player.inventory.armorSlot.equipment.displayName + " and down to your nethers.  The combined stimulation of the rubbing and the tingling venom causes your knees to buckle, hampering your resolve and ending your escape attempt.");
                    //(gain lust, temp lose spd/str)
                    (monster as Anemone).applyVenom((4 + player.stats.sens / 20));
                    combatRoundOver();
                    return;
                }
            }
        }
        //Ember is SPUCIAL
        if (monster.desc.short == "Ember") {
            //GET AWAY
            if (player.stats.spe > rand(monster.stats.spe + escapeMod) || (player.perks.has(PerkType.Runner) && rand(100) < 50)) {
                if (player.perks.has(PerkType.Runner)) DisplayText.text("Using your skill at running, y");
                else DisplayText.text("Y");
                DisplayText.text("ou easily outpace the dragon, who begins hurling imprecations at you.  \"What the hell, [name], you weenie; are you so scared that you can't even stick out your punishment?\"");
                DisplayText.text("\n\nNot to be outdone, you call back, \"Sucks to you!  If even the mighty Last Ember of Hope can't catch me, why do I need to train?  Later, little bird!\"");
                inCombat = false;
                clearStatuses(false);
                doNext(camp.returnToCampUseOneHour);
            }
            //Fail: 
            else {
                DisplayText.text("Despite some impressive jinking, " + emberScene.emberMF("he", "she") + " catches you, tackling you to the ground.\n\n");
                enemyAI();
            }
            return;
        }
        //SUCCESSFUL FLEE
        if (player.stats.spe > rand(monster.stats.spe + escapeMod)) {
            //Fliers flee!
            if (player.canFly()) DisplayText.text(monster.desc.capitalA + monster.desc.short + " can't catch you.");
            //sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
            else if (player.lowerBody.tailType == TailType.RACCOON && player.upperBody.head.earType == EarType.RACCOON && player.perks.has(PerkType.Runner)) {
                DisplayText.text("Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " + monster.desc.subjectivePronoun + " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air!  You leave " + monster.desc.objectivePronoun + " behind with your clumsy, jerky, short-range flight.");
            }
            //Non-fliers flee
            else DisplayText.text(monster.desc.capitalA + monster.desc.short + " rapidly disappears into the shifting landscape behind you.");
            if (monster.desc.short == "Izma") {
                DisplayText.text("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.");
            }
            inCombat = false;
            clearStatuses(false);
            doNext(camp.returnToCampUseOneHour);
            return;
        }
        //Runner perk chance
        else if (player.perks.has(PerkType.Runner) && rand(100) < 50) {
            inCombat = false;
            DisplayText.text("Thanks to your talent for running, you manage to escape.");
            if (monster.desc.short == "Izma") {
                DisplayText.text("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.");
            }
            clearStatuses(false);
            doNext(camp.returnToCampUseOneHour);
            return;
        }
        //FAIL FLEE
        else {
            if (monster.desc.short == "Holli") {
                (monster as Holli).escapeFailWithHolli();
                return;
            }
            //Flyers get special failure message.
            if (player.canFly()) {
                if (monster.desc.plural) DisplayText.text(monster.desc.capitalA + monster.desc.short + " manage to grab your " + LowerBodyDescriptor.describeLegs(player) + " and drag you back to the ground before you can fly away!");
                else DisplayText.text(monster.desc.capitalA + monster.desc.short + " manages to grab your " + LowerBodyDescriptor.describeLegs(player) + " and drag you back to the ground before you can fly away!");
            }
            //fail
            else if (player.lowerBody.tailType == TailType.RACCOON && player.upperBody.head.earType == EarType.RACCOON && player.perks.has(PerkType.Runner)) DisplayText.text("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!");
            //Nonflyer messages
            else {
                //Huge balls messages
                if (player.lowerBody.balls > 0 && player.lowerBody.ballSize >= 24) {
                    if (player.lowerBody.ballSize < 48) DisplayText.text("With your " + BallsDescriptor.describeBalls(true, true, player) + " swinging ponderously beneath you, getting away is far harder than it should be.  ");
                    else DisplayText.text("With your " + BallsDescriptor.describeBalls(true, true, player) + " dragging along the ground, getting away is far harder than it should be.  ");
                }
                //FATASS BODY MESSAGES
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 35 || player.lowerBody.butt.buttRating >= 20 || player.lowerBody.hipRating >= 20) {
                    //FOR PLAYERS WITH GIANT BREASTS
                    if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 35 && player.upperBody.chest.BreastRatingLargest[0].breastRating < 66) {
                        if (player.lowerBody.hipRating >= 20) {
                            DisplayText.text("Your " + LowerBodyDescriptor.describeHips(player) + " forces your gait to lurch slightly side to side, which causes the fat of your " + player.skinTone + " ");
                            if (player.lowerBody.butt.buttRating >= 20) DisplayText.text(ButtDescriptor.describeButt(player) + " and ");
                            DisplayText.text(BreastDescriptor.describeChest(player) + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.");
                        }
                        else if (player.lowerBody.butt.buttRating >= 20) DisplayText.text("Your " + player.skinTone + ButtDescriptor.describeButt(player) + " and " + BreastDescriptor.describeChest(player) + " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.");
                        else DisplayText.text("Your " + BreastDescriptor.describeChest(player) + " jiggle and wobble side to side like the " + player.skinTone + " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.");
                    }
                    //FOR PLAYERS WITH MASSIVE BREASTS
                    else if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 66) {
                        if (player.lowerBody.hipRating >= 20) {
                            DisplayText.text("Your " + BreastDescriptor.describeChest(player) + " nearly drag along the ground while your " + LowerBodyDescriptor.describeHips(player) + " swing side to side ");
                            if (player.lowerBody.butt.buttRating >= 20) DisplayText.text("causing the fat of your " + player.skinTone + ButtDescriptor.describeButt(player) + " to wobble heavily, ");
                            DisplayText.text("forcing your body off balance and preventing you from moving quick enough to get escape.");
                        }
                        else if (player.lowerBody.butt.buttRating >= 20) DisplayText.text("Your " + BreastDescriptor.describeChest(player) + " nearly drag along the ground while the fat of your " + player.skinTone + ButtDescriptor.describeButt(player) + " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.");
                        else DisplayText.text("Your " + BreastDescriptor.describeChest(player) + " nearly drag along the ground, preventing you from moving quick enough to get escape.");
                    }
                    //FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
                    else if (player.lowerBody.hipRating >= 20) {
                        DisplayText.text("Your " + LowerBodyDescriptor.describeHips(player) + " swing heavily from side to side ");
                        if (player.lowerBody.butt.buttRating >= 20) DisplayText.text("causing your " + player.skinTone + ButtDescriptor.describeButt(player) + " to wobble obscenely ");
                        DisplayText.text("and forcing your body into an awkward gait that slows you down, preventing you from escaping.");
                    }
                    //JUST DA BOOTAH
                    else if (player.lowerBody.butt.buttRating >= 20) DisplayText.text("Your " + player.skinTone + ButtDescriptor.describeButt(player) + " wobbles so heavily that you're unable to move quick enough to escape.");
                }
                //NORMAL RUN FAIL MESSAGES
                else if (monster.desc.plural) DisplayText.text(monster.desc.capitalA + monster.desc.short + " stay hot on your heels, denying you a chance at escape!");
                else DisplayText.text(monster.desc.capitalA + monster.desc.short + " stays hot on your heels, denying you a chance at escape!");
            }
        }
        DisplayText.text("\n\n");
        enemyAI();
    }

    public magicalSpecials(): void {
        if (inCombat && player.statusAffects.has(StatusAffectType.Sealed) && player.statusAffects.get(StatusAffectType.Sealed).value2 == 6) {
            DisplayText.clear();
            DisplayText.text("You try to ready a special ability, but wind up stumbling dizzily instead.  <b>Your ability to use magical special attacks was sealed, and now you've wasted a chance to attack!</b>\n\n");
            enemyAI();
            return;
        }
        //Pass false to combatMenu instead:	menuLoc = 3;
        menu();

        //Berserk
        if (player.perks.has(PerkType.Berzerker)) {
            DisplayText.addButton(0, "Berzerk", berzerk);
        }
        if (player.perks.has(PerkType.Dragonfire)) {
            DisplayText.addButton(1, "DragonFire", dragonBreath);
        }
        if (player.perks.has(PerkType.FireLord)) {
            DisplayText.addButton(2, "Fire Breath", fireballuuuuu);
        }
        if (player.perks.has(PerkType.Hellfire)) {
            DisplayText.addButton(3, "Hellfire", hellFire);
        }
        //Possess ability.
        if (player.perks.has(PerkType.Incorporeality)) {
            DisplayText.addButton(4, "Possess", possess);
        }
        if (player.perks.has(PerkType.Whispered)) {
            DisplayText.addButton(5, "Whisper", superWhisperAttack);
        }
        if (player.perks.has(PerkType.CorruptedNinetails)) {
            DisplayText.addButton(6, "C.FoxFire", corruptedFoxFire);
            DisplayText.addButton(7, "Terror", kitsuneTerror);
        }
        if (player.perks.has(PerkType.EnlightenedNinetails)) {
            DisplayText.addButton(6, "FoxFire", foxFire);
            DisplayText.addButton(7, "Illusion", kitsuneIllusion);
        }
        if (player.statusAffects.has(StatusAffectType.ShieldingSpell)) DisplayText.addButton(8, "Shielding", shieldingSpell);
        if (player.statusAffects.has(StatusAffectType.ImmolationSpell)) DisplayText.addButton(8, "Immolation", immolationSpell);
        DisplayText.addButton(9, "Back", combatMenu);
    }

    public physicalSpecials(): void {
        if (urtaQuest.isUrta()) {
            urtaQuest.urtaSpecials();
            return;
        }
        //Pass false to combatMenu instead:	menuLoc = 3;
        if (inCombat && player.statusAffects.has(StatusAffectType.Sealed) && player.statusAffects.get(StatusAffectType.Sealed).value2 == 5) {
            DisplayText.clear();
            DisplayText.text("You try to ready a special attack, but wind up stumbling dizzily instead.  <b>Your ability to use physical special attacks was sealed, and now you've wasted a chance to attack!</b>\n\n");
            enemyAI();
            return;
        }
        menu();
        if (player.upperBody.head.hairType == 4) {
            DisplayText.addButton(0, "AnemoneSting", anemoneSting);
        }
        //Bitez
        if (player.upperBody.head.face.faceType == FaceType.SHARK_TEETH) {
            DisplayText.addButton(1, "Bite", bite);
        }
        else if (player.upperBody.head.face.faceType == FaceType.SNAKE_FANGS) {
            DisplayText.addButton(1, "Bite", nagaBiteAttack);
        }
        else if (player.upperBody.head.face.faceType == FaceType.SPIDER_FANGS) {
            DisplayText.addButton(1, "Bite", spiderBiteAttack);
        }
        //Bow attack
        if (player.hasKeyItem("Bow") >= 0) {
            DisplayText.addButton(2, "Bow", fireBow);
        }
        //Constrict
        if (player.lowerBody == LowerBodyType.NAGA) {
            DisplayText.addButton(3, "Constrict", desert.nagaScene.nagaPlayerConstrict);
        }
        //Kick attackuuuu
        else if (player.lowerBody.isTaur() || player.lowerBody == LowerBodyType.HOOFED || player.lowerBody == LowerBodyType.BUNNY || player.lowerBody == LowerBodyType.KANGAROO) {
            DisplayText.addButton(3, "Kick", kick);
        }
        //Gore if mino horns
        if (player.upperBody.head.hornType == HornType.COW_MINOTAUR && player.upperBody.head.horns >= 6) {
            DisplayText.addButton(4, "Gore", goreAttack);
        }
        //Infest if infested
        if (player.statusAffects.has(StatusAffectType.Infested) && player.statusAffects.get(StatusAffectType.Infested).value1 == 5 && player.lowerBody.cockSpot.hasCock()) {
            DisplayText.addButton(5, "Infest", playerInfest);
        }
        //Kiss supercedes bite.
        if (player.statusAffects.has(StatusAffectType.LustStickApplied)) {
            DisplayText.addButton(6, "Kiss", kissAttack);
        }
        switch (player.lowerBody.tailType) {
            case TailType.BEE_ABDOMEN:
                DisplayText.addButton(7, "Sting", playerStinger);
                break;
            case TailType.SPIDER_ABDOMEN:
                DisplayText.addButton(7, "Web", PCWebAttack);
                break;
            case TailType.SHARK:
            case TailType.LIZARD:
            case TailType.KANGAROO:
            case TailType.DRACONIC:
            case TailType.RACCOON:
                DisplayText.addButton(7, "Tail Whip", tailWhipAttack);
            default:
        }

        DisplayText.addButton(9, "Back", combatMenu);
    }
}
