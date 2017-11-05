import Combat from './Combat';
import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import ButtDescriptor from '../Descriptors/ButtDescriptor';
import CockDescriptor from '../Descriptors/CockDescriptor';
import GenderDescriptor from '../Descriptors/GenderDescriptor';
import VaginaDescriptor from '../Descriptors/VaginaDescriptor';
import MainScreen from '../display/MainScreen';
import StatusAffect from '../Effects/StatusAffect';
import Flags, { FlagEnum } from '../Game/Flags';
import Utils from '../Utilities/Utils';

export default class CombatUpdate {
    public static combatStatusAffectsUpdate(playerParty: Character[], monsterParty: Character[]): void {
        //old outfit used for fetish cultists
        let oldOutfit: string = "";
        let changed: boolean = false;

        const player: Character = playerParty[0];
        const monster: Character = monsterParty[0];

        if (player.statusAffects.has("Sealed")) {
            //Countdown and remove as necessary
            if (player.statusAffects.get("Sealed").value1 > 0) {
                player.statusAffects.get("Sealed").value1--;
                if (player.statusAffects.get("Sealed").value1 <= 0) player.statusAffects.remove("Sealed");
                else MainScreen.text("<b>One of your combat abilities is currently sealed by magic!</b>\n\n");
            }
        }
        //monster.combatRoundUpdate();
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
                bleed *= player.combat.HP;
                bleed = player.combat.loseHP(bleed, null);
                MainScreen.text("<b>You gasp and wince in pain, feeling fresh blood pump from your wounds. (" + bleed + ")</b>\n\n", false);
            }
        }
        if (player.statusAffects.has("AcidSlap")) {
            let slap: number = 3 + (player.stats.maxHP() * 0.02);
            MainScreen.text("<b>Your muscles twitch in agony as the acid keeps burning you. (" + slap + ")</b>\n\n", false);
        }
        if (player.perks.has("ArousingAura") && monster.stats.lustVuln > 0 && player.stats.cor >= 70) {
            if (monster.stats.lust < 50) MainScreen.text("Your aura seeps into " + monster.desc.a + monster.desc.short + " but does not have any visible effects just yet.\n\n", false);
            else if (monster.stats.lust < 60) {
                if (!monster.desc.plural) MainScreen.text(monster.desc.capitalA + monster.desc.short + " starts to squirm a little from your unholy presence.\n\n", false);
                else MainScreen.text(monster.desc.capitalA + monster.desc.short + " start to squirm a little from your unholy presence.\n\n", false);
            }
            else if (monster.stats.lust < 75) MainScreen.text("Your arousing aura seems to be visibly affecting " + monster.desc.a + monster.desc.short + ", making " + monster.desc.objectivePronoun + " squirm uncomfortably.\n\n", false);
            else if (monster.stats.lust < 85) {
                if (!monster.desc.plural) MainScreen.text(monster.desc.capitalA + monster.desc.short + "'s skin colors red as " + monster.desc.subjectivePronoun + " inadvertantly basks in your presence.\n\n", false);
                else MainScreen.text(monster.desc.capitalA + monster.desc.short + "' skin colors red as " + monster.desc.subjectivePronoun + " inadvertantly bask in your presence.\n\n", false);
            }
            else {
                if (!monster.desc.plural) MainScreen.text("The effects of your aura are quite pronounced on " + monster.desc.a + monster.desc.short + " as " + monster.desc.subjectivePronoun + " begins to shake and steal glances at your body.\n\n", false);
                else MainScreen.text("The effects of your aura are quite pronounced on " + monster.desc.a + monster.desc.short + " as " + monster.desc.subjectivePronoun + " begin to shake and steal glances at your body.\n\n", false);
            }
            monster.stats.lust += monster.stats.lustVuln * (2 + Utils.rand(4));
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
        if (player.lowerBody.cockSpot.hasCock() && player.statusAffects.has("Luststick") && (monster.desc.short == "harpy" || monster.desc.short == "Sophie")) {
            //Chance to cleanse!
            if (player.perks.has("Medicine") && Utils.rand(100) <= 14) {
                MainScreen.text("You manage to cleanse the harpy lip-gloss from your system with your knowledge of medicine!\n\n", false);
                player.statusAffects.remove("Luststick");
            }
            else if (Utils.rand(5) == 0) {
                if (Utils.rand(2) == 0) MainScreen.text("A fantasy springs up from nowhere, dominating your thoughts for a few moments.  In it, you're lying down in a soft nest.  Gold-rimmed lips are noisily slurping around your " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + ", smearing it with her messy aphrodisiac until you're completely coated in it.  She looks up at you knowingly as the two of you get ready to breed the night away...\n\n", false);
                else MainScreen.text("An idle daydream flutters into your mind.  In it, you're fucking a harpy's asshole, clutching tightly to her wide, feathery flanks as the tight ring of her pucker massages your " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + ".  She moans and turns around to kiss you on the lips, ensuring your hardness.  Before long her feverish grunts of pleasure intensify, and you feel the egg she's birthing squeezing against you through her internal walls...\n\n", false);
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
            player.combat.loseHP(15, null);
        }
        if (player.statusAffects.has("DemonSeed")) {
            MainScreen.text("You feel something shift inside you, making you feel warm.  Finding the desire to fight this... hunk gets harder and harder.\n\n", false);
            player.stats.lust += player.statusAffects.get("DemonSeed").value1 + Math.floor(player.stats.sens / 30) + Math.floor(player.stats.lib / 30) + Math.floor(player.stats.cor / 30);
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
            if (monster.desc.plural) MainScreen.text("our " + CockDescriptor.describeMultiCockShort(player) + " dribbles pre-cum as you think about plowing " + monster.desc.a + monster.desc.short + " right here and now, fucking " + monster.desc.possessivePronoun + " " + VaginaDescriptor.describeVagina(monster, monster.lowerBody.vaginaSpot.get(0)) + "s until they're totally fertilized and pregnant.\n\n", false);
            else MainScreen.text("our " + CockDescriptor.describeMultiCockShort(player) + " dribbles pre-cum as you think about plowing " + monster.desc.a + monster.desc.short + " right here and now, fucking " + monster.desc.possessivePronoun + " " + VaginaDescriptor.describeVagina(monster, monster.lowerBody.vaginaSpot.get(0)) + " until it's totally fertilized and pregnant.\n\n", false);
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
            else player.combat.loseHP(5, null);
            MainScreen.text("You wince in pain and try to collect yourself, the naga's venom still plaguing you.\n\n", false);
            player.combat.loseHP(2, null);
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
                player.combat.loseHP(8 + Utils.rand(player.stats.maxHP() / 20), null);
            }
        }
        //Bondage straps + bondage fetish
        if (Flags.list[FlagEnum.PC_FETISH] >= 2 && player.inventory.armorSlot.equipment.displayName == "barely-decent bondage straps") {
            MainScreen.text("The feeling of the tight, leather straps holding tightly to your body while exposing so much of it turns you on a little bit more.\n\n", false);
            player.stats.lust += 2;
        }
        Combat.combatRegeneration(player);
        Combat.combatRegeneration(monster);
    }

    public static monsterCombatStatusAffectsUpdate(player: Character, monster: Character): void {
        monster = monster;
        if (monster.statusAffects.has("MilkyUrta")) {
            Game.sceneManager.urtaQuest.milkyUrtaTic();
        }
        //Countdown
        if (monster.statusAffects.has("TentacleCoolDown")) {
            monster.statusAffects.get("TentacleCoolDown").value1 -= 1;
            if (monster.statusAffects.get("TentacleCoolDown").value1 == 0) {
                monster.statusAffects.remove("TentacleCoolDown");
            }
        }
        if (monster.statusAffects.has("CoonWhip")) {
            if (monster.statusAffects.get("CoonWhip").value2 <= 0) {

                // handled elsewhere
                //monster.inventory.armorSlot.equipment.defense += monster.statusAffects.get("CoonWhip").value1;

                MainScreen.text("<b>Tail whip wears off!</b>\n\n");
                monster.statusAffects.remove("CoonWhip");
            }
            else {
                monster.statusAffects.get("CoonWhip").value2 -= 1;
                MainScreen.text("<b>Tail whip is currently reducing your foe");
                if (monster.desc.plural) MainScreen.text("s'");
                else MainScreen.text("'s");
                MainScreen.text(" armor by " + monster.statusAffects.get("CoonWhip").value1 + ".</b>\n\n")
            }
        }
        if (monster.statusAffects.has("Blind")) {
            monster.statusAffects.get("Blind").value1 -= 1;
            if (monster.statusAffects.get("Blind").value1 <= 0) {
                MainScreen.text("<b>" + monster.desc.capitalA + monster.desc.short + (monster.desc.plural ? " are" : " is") + " no longer blind!</b>\n\n", false);
                monster.statusAffects.remove("Blind");
            }
            else MainScreen.text("<b>" + monster.desc.capitalA + monster.desc.short + (monster.desc.plural ? " are" : " is") + " currently blind!</b>\n\n", false);
        }
        if (monster.statusAffects.has("Earthshield")) {
            MainScreen.text("<b>" + monster.desc.capitalA + monster.desc.short + " is protected by a shield of rocks!</b>\n\n");
        }
        if (monster.statusAffects.has("Sandstorm")) {
            //Blinded:
            if (player.statusAffects.has("Blind")) {
                MainScreen.text("<b>You blink the sand from your eyes, but you're sure that more will get you if you don't end it soon!</b>\n\n");
                player.statusAffects.remove("Blind");
            }
            else {
                if (monster.statusAffects.get("Sandstorm").value1 == 0 || monster.statusAffects.get("Sandstorm").value1 % 4 == 0) {
                    player.statusAffects.add(new StatusAffect("Blind", 0, 0, 0, 0));
                    MainScreen.text("<b>The sand is in your eyes!  You're blinded this turn!</b>\n\n");
                }
                else {
                    MainScreen.text("<b>The grainy mess cuts at any exposed flesh and gets into every crack and crevice of your armor.");
                    let hpChange: number = player.combat.loseHP(1 + Utils.rand(2), null);
                    MainScreen.text(" (" + hpChange + ")");
                    MainScreen.text("</b>\n\n");
                }
            }
            monster.statusAffects.get("Sandstorm").value1 += 1;
        }
        if (monster.statusAffects.has("Stunned")) {
            MainScreen.text("<b>" + monster.desc.capitalA + monster.desc.short + " is still stunned!</b>\n\n", false);
        }
        if (monster.statusAffects.has("Shell")) {
            if (monster.statusAffects.get("Shell").value1 >= 0) {
                MainScreen.text("<b>A wall of many hues shimmers around " + monster.desc.a + monster.desc.short + ".</b>\n\n");
                monster.statusAffects.get("Shell").value1 -= 1;
            }
            else {
                MainScreen.text("<b>The magical barrier " + monster.desc.a + monster.desc.short + " erected fades away to nothing at last.</b>\n\n");
                monster.statusAffects.remove("Shell");
            }
        }
        if (monster.statusAffects.has("IzmaBleed")) {
            //Countdown to heal
            monster.statusAffects.get("IzmaBleed").value1 -= 1;
            //Heal wounds
            if (monster.statusAffects.get("IzmaBleed").value1 <= 0) {
                MainScreen.text("The wounds you left on " + monster.desc.a + monster.desc.short + " stop bleeding so profusely.\n\n", false);
                monster.statusAffects.remove("IzmaBleed");
            }
            //Deal damage if still wounded.
            else {
                let hpLoss: number = player.combat.loseHP(monster.stats.maxHP() * (3 + Utils.rand(4)) / 100, null);
                if (monster.desc.plural) MainScreen.text(monster.desc.capitalA + monster.desc.short + " bleed profusely from the jagged wounds your weapon left behind. (" + hpLoss + ")\n\n", false);
                else MainScreen.text(monster.desc.capitalA + monster.desc.short + " bleeds profusely from the jagged wounds your weapon left behind. (" + hpLoss + ")\n\n", false);
            }
        }
        if (monster.statusAffects.has("Timer")) {
            if (monster.statusAffects.get("Timer").value1 <= 0)
                monster.statusAffects.remove("Timer");
            monster.statusAffects.get("Timer").value1 -= 1;
        }
        if (monster.statusAffects.has("LustStick")) {
            //LoT Effect Messages:
            switch (monster.statusAffects.get("LustStick").value1) {
                //First:
                case 1:
                    if (monster.desc.plural) MainScreen.text("One of " + monster.desc.a + monster.desc.short + " pants and crosses " + GenderDescriptor.mf(monster, "his", "her") + " eyes for a moment.  " + GenderDescriptor.mf(monster, "His", "Her") + " dick flexes and bulges, twitching as " + GenderDescriptor.mf(monster, "he", "she") + " loses himself in a lipstick-fueled fantasy.  When " + GenderDescriptor.mf(monster, "he", "she") + " recovers, you lick your lips and watch " + GenderDescriptor.mf(monster, "his", "her") + " blush spread.\n\n", false);
                    else MainScreen.text(monster.desc.capitalA + monster.desc.short + " pants and crosses " + monster.desc.possessivePronoun + " eyes for a moment.  " + GenderDescriptor.mf(monster, "His", "Her") + " dick flexes and bulges, twitching as " + monster.desc.subjectivePronoun + " loses " + GenderDescriptor.mf(monster, "himself", "herself") + " in a lipstick-fueled fantasy.  When " + monster.desc.subjectivePronoun + " recovers, you lick your lips and watch " + GenderDescriptor.mf(monster, "his", "her") + " blush spread.\n\n", false);
                    break;
                //Second:
                case 2:
                    if (monster.desc.plural) MainScreen.text(monster.desc.capitalA + monster.desc.short + " moan out loud, " + monster.desc.possessivePronoun + " dicks leaking and dribbling while " + monster.desc.subjectivePronoun + " struggle not to touch " + monster.desc.objectivePronoun + ".\n\n", false);
                    else MainScreen.text(monster.desc.capitalA + monster.desc.short + " moans out loud, " + monster.desc.possessivePronoun + " dick leaking and dribbling while " + monster.desc.subjectivePronoun + " struggles not to touch it.\n\n", false);
                    break;
                //Third:
                case 3:
                    if (monster.desc.plural) MainScreen.text(monster.desc.capitalA + monster.desc.short + " pump " + monster.desc.possessivePronoun + " hips futilely, air-humping non-existent partners.  Clearly your lipstick is getting to " + monster.desc.objectivePronoun + ".\n\n", false);
                    else MainScreen.text(monster.desc.capitalA + monster.desc.short + " pumps " + monster.desc.possessivePronoun + " hips futilely, air-humping a non-existent partner.  Clearly your lipstick is getting to " + monster.desc.objectivePronoun + ".\n\n", false);
                    break;
                //Fourth:
                case 4:
                    if (monster.desc.plural) MainScreen.text(monster.desc.capitalA + monster.desc.short + " close " + monster.desc.possessivePronoun + " eyes and grunt, " + monster.desc.possessivePronoun + " cocks twitching, bouncing, and leaking pre-cum.\n\n", false);
                    else MainScreen.text(monster.desc.capitalA + monster.desc.short + " closes " + monster.desc.objectivePronoun + " eyes and grunts, " + monster.desc.possessivePronoun + " cock twitching, bouncing, and leaking pre-cum.\n\n", false);
                    break;
                //Fifth and repeat:
                default:
                    if (monster.desc.plural) MainScreen.text("Drops of pre-cum roll steadily out of their dicks.  It's a marvel " + monster.desc.subjectivePronoun + " haven't given in to " + monster.desc.possessivePronoun + " lusts yet.\n\n", false);
                    else MainScreen.text("Drops of pre-cum roll steadily out of " + monster.desc.a + monster.desc.short + "'s dick.  It's a marvel " + monster.desc.subjectivePronoun + " hasn't given in to " + monster.desc.possessivePronoun + " lust yet.\n\n", false);
                    break;
            }
            monster.statusAffects.get("LustStick").value1 += 1;
            //Damage = 5 + bonus score minus
            //Reduced by lust vuln of course
            monster.stats.lust += Math.round(monster.stats.lustVuln * (5 + monster.statusAffects.get("LustStick").value2));
        }
        if (monster.statusAffects.has("PCTailTangle")) {
            //when Entwined
            MainScreen.text("You are bound tightly in the kitsune's tails.  <b>The only thing you can do is try to struggle free!</b>\n\n");
            MainScreen.text("Stimulated by the coils of fur, you find yourself growing more and more aroused...\n\n");
            player.stats.lust += 5 + player.stats.sens / 10;
        }
        if (monster.statusAffects.has("QueenBind")) {
            MainScreen.text("You're utterly restrained by the Harpy Queen's magical ropes!\n\n");
            if (Flags.list[FlagEnum.PC_FETISH] >= 2)
                player.stats.lust += 3;
        }
        if (monster.charType == CharacterType.SecretarialSuccubus || monster.charType == CharacterType.MilkySuccubus) {
            if (player.stats.lust < 45) MainScreen.text("There is something in the air around your opponent that makes you feel warm.\n\n", false);
            if (player.stats.lust >= 45 && player.stats.lust < 70) MainScreen.text("You aren't sure why but you have difficulty keeping your eyes off your opponent's lewd form.\n\n", false);
            if (player.stats.lust >= 70 && player.stats.lust < 90) MainScreen.text("You blush when you catch yourself staring at your foe's rack, watching it wobble with every step she takes.\n\n", false);
            if (player.stats.lust >= 90) MainScreen.text("You have trouble keeping your greedy hands away from your groin.  It would be so easy to just lay down and masturbate to the sight of your curvy enemy.  The succubus looks at you with a sexy, knowing expression.\n\n", false);
            player.stats.lust += 1 + Utils.rand(8);
        }
        //[LUST GAINED PER ROUND] - Omnibus
        if (monster.statusAffects.has("LustAura")) {
            if (player.stats.lust < 33) MainScreen.text("Your groin tingles warmly.  The demon's aura is starting to get to you.\n\n", false);
            if (player.stats.lust >= 33 && player.stats.lust < 66) MainScreen.text("You blush as the demon's aura seeps into you, arousing you more and more.\n\n", false);
            if (player.stats.lust >= 66) {
                MainScreen.text("You flush bright red with desire as the lust in the air worms its way inside you.  ", false);
                let randomNumber = Utils.rand(4);
                if (randomNumber == 0) MainScreen.text("You have a hard time not dropping to your knees to service her right now.\n\n", false);
                if (randomNumber == 2) MainScreen.text("The urge to bury your face in her breasts and suckle her pink nipples nearly overwhelms you.\n\n", false);
                if (randomNumber == 1) MainScreen.text("You swoon and lick your lips, tasting the scent of the demon's pussy in the air.\n\n", false);
                if (randomNumber == 3) MainScreen.text("She winks at you and licks her lips, and you can't help but imagine her tongue sliding all over your body.  You regain composure moments before throwing yourself at her.  That was close.\n\n", false);
            }
            player.stats.lust += 3 + Math.floor(player.stats.lib / 20 + player.stats.cor / 30);
        }
    }
}