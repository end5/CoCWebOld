import { DisplayImage } from '../../../Engine/Display/DisplayImage';
import { DisplaySprite } from '../../../Engine/Display/DisplaySprite';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { ImageName } from '../../../Engine/Display/Images/ImageName';
import { SpriteName } from '../../../Engine/Display/Images/SpriteName';
import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { Cock, CockType } from '../../Body/Cock';
import { Gender } from '../../Body/GenderIdentity';
import { LegType } from '../../Body/Legs';
import { IncubationTime, Pregnancy, PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import { VaginaLooseness } from '../../Body/Vagina';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import { ArmorName } from '../../Items/Armors/ArmorName';
import { Menus } from '../../Menus/Menus';
import { Mod } from '../../Modifiers/Modifiers';
import { ClickFunction, NextScreenChoices } from '../../ScreenDisplay';
import { User } from '../../User';
import { ImpGang } from '../Camp/ImpGang';
import { lustyMaidenPaizuri } from '../Items/LustyMaidensArmor';
import { Scenes } from '../Scenes';

export function impVictory(character: Character, imp: Character): NextScreenChoices {
    DisplayText().clear();
    const canFeed: boolean = (character.statusAffects.has(StatusAffectType.Feeder));
    const canBikiniTits: boolean = character.torso.vaginas.count > 0 &&
        character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 4 &&
        character.inventory.equipment.armor.name === ArmorName.LustyMaidensArmor;
    DisplayText("You smile in satisfaction as " + imp.desc.a + imp.desc.short + " collapses and begins masturbating feverishly.");
    if (canFeed) {
        if (character.stats.lust >= 33)
            DisplayText("  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing, but it might be more fun to force it to guzzle your breast-milk.\n\nWhat do you do?");
        else DisplayText("  You're not really turned on enough to rape it, but it might be fun to force it to guzzle your breast-milk.\n\nDo you breastfeed it?");
    }
    else if (character.stats.lust >= 33 || canBikiniTits || character.canOvipositBee()) {
        DisplayText("  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing...\n\nDo you rape him?");
    }
    else {
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    const choices = [].fill(["", undefined], 0, 5);
    if (character.stats.lust > 33) {
        let maleRape: ClickFunction;
        if (character.torso.cocks.count > 0) {
            if (character.torso.cocks.filter(Cock.CockThatFits(imp.analCapacity())))
                DisplayText("\n\n<b>You're too big to rape an imp with " + Desc.Cock.describeMultiCockSimpleEach(character) + ".</b>");
            else maleRape = (char) => (character.torso.hips.legs.isTaur() ? centaurOnImpStart(character, imp) : rapeImpWithDick(character, imp));
        }
        if (character.torso.vaginas.count > 0) {
            if (character.torso.hips.legs.isTaur()) {
                maleRape = (char) => centaurOnImpStart(character, imp);
                choices[1] = ["Group Vaginal", centaurGirlOnImps];
            }
            else {
                choices[1] = ["Female Rape", rapeImpWithPussy];
            }
        }
        else if (maleRape && character.torso.chest.find(BreastRow.FuckableNipples) && !canFeed && !canBikiniTits && !character.canOvipositBee()) {
            return { next: Scenes.camp.returnToCampUseOneHour }; // Only happens when there's no way to fuck the imp
        }
        choices[0] = [character.torso.hips.legs.isTaur() ? "Centaur Rape" : "Male Rape", maleRape];
        if (character.torso.chest.find(BreastRow.FuckableNipples)) {
            choices[2] = ["NippleFuck", noogaisNippleRape];
        }
    }
    if (canFeed) choices[3] = ["Breastfeed", areImpsLactoseIntolerant];
    if (canBikiniTits) choices[4] = ["B.Titfuck", lustyMaidenPaizuri];
    if (character.canOvipositBee()) choices[8] = ["Oviposit", putBeeEggsInAnImpYouMonster];
    return { choices, persistantChoices: [["Leave", Scenes.camp.returnToCampUseOneHour]] };
}

function rapeImpWithDick(character: Character, imp: Character): NextScreenChoices {
    const cocksThatFit = character.torso.cocks.filter(Cock.CockThatFits(imp.analCapacity()));
    const cockThatFits = cocksThatFit.length > 0 ? cocksThatFit[0] : character.torso.cocks.get(0);
    // Single cock
    DisplayImage(ImageName.imp_win_male_fuck);
    if (character.torso.cocks.count === 1) {
        DisplayText().clear();
        DisplayText("With a demonic smile you grab the insensible imp and lift him from the ground by his neck.  The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.");
        if (character.torso.hips.legs.type !== LegType.CENTAUR) {
            DisplayText("  You casually unclasp your " + character.inventory.equipment.armor.displayName + " and reveal your " + Desc.Cock.describeCock(character, cockThatFits) + ", ");
            if (character.torso.chest.count > 0 && character.torso.chest.get(0).rating > 2) DisplayText("smashing him against your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " while you jerk hard on your " + Desc.Cock.describeCock(character, cockThatFits) + ", bringing it to a full, throbbing erection.");
            else DisplayText("stroking it to full hardness languidly.");
        }
        DisplayText("\n\nWith no foreplay, you press your " + Desc.Cock.describeCock(character, cockThatFits) + " against his tight little pucker and ram it in to the hilt.  The imp's eyes bulge in surprise even as a thick stream of pre leaks from his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + ".  You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.");
        if (character.torso.cocks.get(0).type === CockType.CAT) DisplayText("  The tiny creature's claws dig into your sides at the feeling of soft, hooked barbs stroking his sensitive insides.");
        if (character.torso.cocks.get(0).length >= 7 && character.torso.cocks.get(0).length <= 12) DisplayText("  Each thrust obviously distorts the imp's abdomen.  It amazes you that it doesn't seem to be hurting him.");
        if (character.torso.cocks.get(0).length > 12) DisplayText("  Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest.  Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.");
        DisplayText("\n\nThe tight confines of the imp's ass prove too much for you, and you feel your orgasm build.");
        if (character.torso.balls.quantity === 0 && character.torso.vaginas.count > 0) DisplayText("  The cum seems to boil out from inside you as your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " soaks itself.  With delicious slowness you fire rope after rope of cum deep into the imp's rectum.");
        if (character.torso.balls.quantity === 0 && character.torso.vaginas.count === 0) DisplayText("  The cum seems to boil out from inside you, flowing up your " + Desc.Cock.describeCock(character, cockThatFits) + ".  With delicious slowness, you fire rope after rope of cum deep into the imp's rectum.");
        if (character.cumQ() >= 14 && character.cumQ() <= 30) DisplayText("  Your orgasm drags on and on, until your slick jism is dripping out around your " + Desc.Cock.describeCock(character, cockThatFits) + ".");
        if (character.cumQ() > 30 && character.cumQ() <= 100) DisplayText("  Your orgasm seems to last forever, jizz dripping out of the imp's asshole around your " + Desc.Cock.describeCock(character, cockThatFits) + " as you plunder him relentlessly.");
        if (character.cumQ() > 100) DisplayText("  Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last.  The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your " + Desc.Cock.describeCock(character, cockThatFits) + " with each thrust.");
        DisplayText("\n\nSatisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.   You drop the imp hard and he passes out, dripping mixed fluids that seem to be absorbed by the dry earth as fast as they leak out.");
    }
    // Multicock
    if (character.torso.cocks.count >= 2) {
        DisplayText().clear();
        DisplayText("With a demonic smile you grab the insensible imp and lift him from the ground by his neck.  The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.");
        if (character.torso.hips.legs.type !== LegType.CENTAUR) {
            DisplayText("  You casually unclasp your " + character.inventory.equipment.armor.displayName + " and reveal your " + Desc.Cock.describeMultiCockShort(character) + ", ");
            if (character.torso.chest.count > 0 && character.torso.chest.get(0).rating > 2) DisplayText("smashing him against your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " while you jerk hard on one of your " + Desc.Cock.describeCock(character, cockThatFits) + "s, bringing it to a full, throbbing erection.");
            else DisplayText("stroking one of your members to full hardness languidly.");
        }
        DisplayText("\n\nWith no foreplay, you press a " + Desc.Cock.describeCock(character, cockThatFits) + " against his tight little pucker and ram it in to the hilt.  The imp's eyes bulge in surprise even as a thick stream of pre leaks from his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + ".  You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.");
        if (character.torso.cocks.get(0).length >= 7 && character.torso.cocks.get(0).length <= 12) DisplayText("  Each thrust obviously distorts the imp's abdomen.  It amazes you that it doesn't seem to be hurting him.");
        if (character.torso.cocks.get(0).length > 12 && character.torso.cocks.get(0).length <= 18) DisplayText("  Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest.  Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.");
        DisplayText("\n\nThe tight confines of the imp's ass prove too much for you, and you feel your orgasm build.");
        if (character.torso.balls.quantity > 0) DisplayText("The cum seems to boil in your balls, sending heat spreading through your " + Desc.Cock.describeCock(character, cockThatFits) + " as your muscles clench reflexively, propelling hot spurts of jism deep into the imp's rectum.  Your other equipment pulses and dripples steady streams of its own cum.");
        if (character.torso.balls.quantity === 0 && character.torso.vaginas.count > 0) DisplayText("The cum seems to boil out from inside you as your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " soaks itself.  With delicious slowness you fire rope after rope of cum deep into the imp's rectum.  Your other equipment drizzles small streams of jizz in sympathy.");
        if (character.torso.balls.quantity === 0 && character.torso.vaginas.count === 0) DisplayText("The cum seems to boil out from inside you, flowing up your " + Desc.Cock.describeCock(character, cockThatFits) + ".  With delicious slowness, you fire rope after rope of cum deep into the imp's rectum.  Your other equipment drizzles small streams of jizz in sympathy.");
        if (character.cumQ() >= 14 && character.cumQ() <= 30) DisplayText("  Your orgasm drags on and on, until your slick jism is dripping out around your " + Desc.Cock.describeCock(character, cockThatFits) + ".");
        if (character.cumQ() > 30 && character.cumQ() <= 100) DisplayText("  Your orgasm seems to last forever, jizz dripping out of the imp's asshole around your " + Desc.Cock.describeCock(character, cockThatFits) + " as you plunder him relentlessly.");
        if (character.cumQ() > 100) DisplayText("  Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last.  The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your " + Desc.Cock.describeCock(character, cockThatFits) + " with each thrust.");
        DisplayText("\n\nSatisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.   You drop the imp hard and he passes out, dripping mixed fluids that seem to be absorbed by the dry earth as fast as they leak out.");
    }
    character.orgasm();
    character.stats.cor += 1;
    return { next: Scenes.camp.returnToCampUseOneHour };
}

function rapeImpWithPussy(character: Character, imp: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayImage(ImageName.imp_win_female_fuck);
    character.slimeFeed();
    DisplayText("You shed your " + character.inventory.equipment.armor.displayName + " without a thought and approach the masturbating imp, looming over him menacingly.  Your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " moistens in anticipation as you gaze down upon his splendid rod. With no hesitation, you lower yourself until your lips are spread wide by his demon-head, the hot pre-cum tingling deliciously.");
    // Too small!
    if (character.vaginalCapacity() < imp.torso.cocks.get(0).area) {
        DisplayText("  You frown as you push against him, but his demonic tool is too large for your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  With a sigh, you shift position and begin grinding your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " against his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + ", coating it with fluids of your gender.  Your clit tingles wonderfully as it bumps against every vein on his thick appendage.");
        if (character.torso.chest.count > 0 && character.torso.chest.get(0).rating > 1) {
            DisplayText("  You happily tug and pinch on your erect nipples, adding to your pleasure and nearly driving yourself to orgasm.");
        }
        DisplayText("\n\nYou lose track of time as you languidly pump against the imp's " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + ".  At long last you feel your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " ripple and quiver.  Your " + Desc.Leg.describeLegs(character) + " give out as you lose your muscle control and collapse against the small demon.  You gasp as his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " erupts against you, splattering your chest with hot demonic cum that rapidly soaks into your skin.  You giggle as you rise up from the exhausted imp, feeling totally satisfied.");
    }
    // Big enough!
    else {
        DisplayText("  You sink down his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " slowly, delighting in the gradual penetration and the tingling feeling of his dripping hot pre-cum.  At last you bottom out on his balls.");

        Mod.Vagina.displayStretchVagina(character, imp.torso.cocks.get(0).area, true);
        DisplayText("  Your lust and desire spurs you into movement, driving you to bounce yourself up and down on the " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + ".  His exquisite member pushes you to the very height of pleasure, your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " clenching tightly of its own accord each time you bottom out.  The tensing of the little demon's hips is the only warning you get before he cums inside you, hot demonic jizz pouring into your womb.  Your " + Desc.Leg.describeLegs(character) + " give out, pushing him deeper as he finishes filling you.");
        DisplayText("\n\nThe two of you lay there a moment while you recover, at last separating as you rise up off his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + ".  Spunk drips down your legs, quickly wicking into your skin and disappearing.");
        // Taking it internal is more corruptive!
        character.stats.cor += 1;
        // Preggers chance!
        character.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.IMP, IncubationTime.IMP));
        Mod.Vagina.displayStretchVagina(character, imp.torso.cocks.get(0).area, true, true, false);
    }
    character.orgasm();
    character.stats.cor += 1;
    return { next: Scenes.camp.returnToCampUseOneHour };
}

function sprocketImp(character: Character): NextScreenChoices {
    character.slimeFeed();
    DisplayText().clear();
    DisplayText("You fall to your knees, lost in thoughts of what you want the imp to do to you.  Your body burns with desire, ready for the anal assault to come.  At least that's what you think.  You reach a hand out to the imp, wanting to pull him to you, to make him take you the way you need to be taken.  But he doesn't, not this time.\n\n");
    // New PG
    DisplayText("Much to your surprise, the imp flutters upward on his small leathery wings and rushes toward you.  ");
    if (character.torso.neck.head.hair.length > 0) DisplayText("His claws dig into your hair ");
    else DisplayText("His claws dig into your wrists ");
    DisplayText("and you find yourself dragged upward with him, soaring over the tops of the trees.  The cool rush of air does nothing to abate your arousal.  If anything, the cold shock only makes your body more aware of its own need.  After just a few seconds that feel like an eternity to your lust-filled being, the imp hurls you down into a tree.  You flail as you fall, barely catching yourself on the upper branches.  Your hands and " + Desc.Leg.describeLegs(character) + " are tangled in the smooth wooden spiderweb below you, your mind torn between desire for the imp above and fear of the fall below.  You can see from the gleam in the horned creature's red eyes that he has you right where he wants you.\n\n");
    // New PG
    DisplayText("The imp pulls the loincloth from his waist, revealing his red throbbing cock.  It is certainly large, even though it stands smaller than your own erection.  He tosses the cloth aside, and you see him fluttering down toward you just before the rough fabric lands on your face.  His clawed fingers grasp ");
    // Variable cocktext
    if (character.torso.cocks.get(0).type === CockType.HUMAN || character.torso.cocks.get(0).type === CockType.DEMON || character.torso.cocks.get(0).type > 4) DisplayText("your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ", rubbing the tip of his prick against your own, ");
    else if (character.torso.cocks.find(Cock.HasKnot)) DisplayText("your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ", rubbing the tip of his prick against your point, ");
    else if (character.torso.cocks.get(0).type === CockType.HORSE) DisplayText("your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ", rubbing the tip of his prick against your flared head, ");
    else if (character.torso.cocks.get(0).type === CockType.TENTACLE) DisplayText("your huge green dick, rubbing the tip of his prick against your purplish cock-head, ");
    DisplayText("smearing your pre-cum together.  You wonder if he is planning on just jerking both of you off as you shake the cloth from your face.  He flashes you an evil smile, making your eyes widen in terror as you realize what he is planning. Before you can even think to make a move to stop him, the imp ");
    if (character.torso.cocks.get(0).type === CockType.HUMAN || character.torso.cocks.get(0).type === CockType.DEMON || character.torso.cocks.get(0).type > 4) DisplayText("shoves his shaft deeply into the slit in the head of your dick.  ");
    else if (character.torso.cocks.find(Cock.HasKnot)) DisplayText("finds the hole in the pointed head of your cock and plunges his shaft deeply into it, literally fucking your urethra.  ");
    else if (character.torso.cocks.get(0).type === CockType.HORSE) DisplayText("seats his dick in the flared head of your prick, and then pushes farther. His shaft plunges into yours, filling your cock more than any cum load ever could.  ");
    else if (character.torso.cocks.get(0).type === CockType.TENTACLE) DisplayText("shoves his dick deeply into the slit in the head of your vine-like cock.  ");
    // New PG
    DisplayText("\n\n");
    DisplayText("He grips your cock tightly as he fucks you, treating you like a ");
    // Differing cocksleeve texts
    if (character.skin.desc === "fur") DisplayText("furry cock-sleeve");
    else {
        if (character.skin.tone === "purple" || character.skin.tone === "blue" || character.skin.tone === "shiny black") DisplayText("demonic cock-sleeve");
        else DisplayText("human cock-sleeve");
    }
    // Bonus boob shake or period if no boobs.
    if (character.torso.chest.count > 0 && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) DisplayText(", fucking you so hard that your " + Desc.Breast.describeAllBreasts(character) + " bounce with each thrust.  ");
    else DisplayText(".  ");
    DisplayText("It briefly crosses your mind that this should be painful, but something about either his lubrication or yours makes it comfortable enough to have you writhing in pleasure.  ");
    DisplayText("He thrusts roughly into you for several minutes, your hips bucking upward to meet him, ");
    if (character.torso.cocks.count === 2) DisplayText("your other cock finding pleasure in rubbing against his body ");
    if (character.torso.cocks.count > 2) DisplayText("your other cocks finding pleasure in rubbing against his body ");
    // Cum
    DisplayText("while copious amounts of sweat runs off of both your exposed forms, before he shivers and sinks deeply into you.  He cums hard, the heat of his demon seed burning your loins. His orgasm lasts longer than you think possible, forcing your own climax. Your seed mixes within your body, becoming more than you can handle and spilling out from your urethra around his intruding member.  ");
    // Extra cum-texts
    if (character.torso.cocks.count === 2) DisplayText("Your other cock cums at the same time, liberally splattering your spunk up his back.  ");
    if (character.torso.cocks.count > 2) DisplayText("The rest of your " + Desc.Cock.describeMultiCockShort(character) + " twitch and release their seed at the same time, creating a shower of spunk that rains down on both you and the imp, coating both of your bodies.  ");
    if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1) DisplayText("At the same time, milk bursts from your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s, splattering him in the face.  You feel a sick sort of triumph as you get him back for cumming inside you.  ");
    // Vagoooz
    if (character.torso.vaginas.count > 0) DisplayText("Your pussy quivers, contracting furiously as your orgasm hits you - like it's trying to milk a phantom dick dry.  ");
    // new PG
    DisplayText("Satisfied, his dick slides from you and he flies away as mixed seed continues to spill from your abused body. Your limbs grow weak, and you fall from the tree with a hard thud before losing consciousness.  ");
    // Take some damage
    character.stats.HP -= 10;
    return { next: Scenes.camp.returnToCampUseOneHour };
}

function centaurGirlOnImps(character: Character, imp: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("You stand over the thoroughly defeated demon and get an amusing idea. The tiny creatures are far from a threat, but their features seem like they might be useful. You pick the imp up and place him in a tree with explicit orders to him to stay, much to his confusion. Once you're sure he won't move, you wolf whistle and wait.\n\n");
    DisplayText("A goblin appears from the underbrush behind you, but a swift kick sends her flying; she's not what you're after. You're soon rewarded with a trio of imps, who fly up to you, cocks at the ready.  Grabbing the defeated imp by the head, you explain your need to the group and waft a bit of your scent over to them with your tail. They confer among themselves only briefly, clear on the decision, as you toss their weaker fellow underneath them. The larger of the three, evidently the leader, smiles lewdly at you and agrees to your 'demands'.\n\n");
    // [Female:
    if (character.torso.vaginas.count > 0) {
        DisplayText("The imps approach you, their various genitalia glistening in the sun and drawing your attention. Their cocks swing lewdly with every flap of their wings, but you turn around, wanting their ministrations to be a surprise.\n\n");

        DisplayText("Hands slide over you, stroking and patting your equine form. The roving fingers find their way to your rear quickly, and begin teasing around your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " and " + Desc.Butt.describeButthole(character.torso.butt) + ". They probe around but don't penetrate and you stamp your hoof in frustration. There's a chuckle from behind you and all but a handful of the hands disappear.\n\n");

        DisplayText("A slightly larger hand smacks your " + Desc.Butt.describeButt(character) + " then slides up and pops a thick finger inside. Your " + Desc.Butt.describeButthole(character.torso.butt) + " tries to suck it in deeper, but loses the opportunity as it's extracted before doing anything. Instead, the hand returns to your flank and slides slowly forward to your torso.\n\n");

        DisplayText("The 'head' imp comes around into your vision, hovering in front of you and letting you get a good look at his long member. He pulls on it, extracting a large bead of pre onto his other hand. Opening your mouth, he wipes the salty substance onto your tongue. You swallow it happily and feel your mouth watering and your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " pumping out fluid.\n\n");

        DisplayText("The leader looks past you and gives a signal to someone you can't see, but you don't have time to turn as a huge dog cock is slipped into your slavering cunt and an even larger spined prick is inserted into your " + Desc.Butt.describeButthole(character.torso.butt) + ". They begin pumping into you hard, and you whinny in satisfaction while the demon before you watches, jerking on himself.");
        Mod.Vagina.displayStretchVagina(character, imp.torso.cocks.get(0).area, true, true, false);
        Mod.Butt.displayStretchButt(character, imp.torso.cocks.get(0).area, true, true, false);
        DisplayText("\n\n");

        DisplayText("He disappears behind you and gives you a slap on the haunches, yelling, \"<i>Giddyup!</i>\" and laughing heartily. Whether he expected you to or not, you decide to go for it and push off the ground with your forelegs, kicking them about in the air and feeling the demons aboard you scrabble to stay attached, before setting off at as fast a run as you can. You tear about in the dirt, clumps of mud and weeds flung behind you.\n\n");

        DisplayText("At the edge of the clearing is the leader, laughing as he watches you and still jerking himself. As if realizing that there's a better option available, he grabs the defeated imp and inserts himself into him, using him like a living cock sleeve who appears to not mind the position and cries out repeatedly as his ass is abused.\n\n");

        DisplayText("Your unexpected running momentarily paused the cocks inside you as their owners groped for holds on your " + Desc.Hip.describeHips(character) + " and " + Desc.Butt.describeButt(character) + ". With their positions relatively well established, they begin pounding at you again, causing you to nearly stumble in pleasure.\n\n");

        DisplayText("Managing to steady yourself, you run faster, feeling the frenetic cocks inside you explode. The hot spunk sprays about inside and you scream in ecstasy.");
        // [Has breasts:
        if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 1) DisplayText("  Your hands reflexively grab your " + Desc.Breast.describeChest(character) + " and mash them about.");
        DisplayText("\n\n");

        DisplayText("The owner of the dog-cock in your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " manages to insert his knot as his balls empty inside you, but the cat-cock's body has no such luck and his grip on you falters. He slides out of your " + Desc.Butt.describeButthole(character.torso.butt) + " but manages to grasp the fur of your back and straddle you, all while his cock continues to spray you down with jism.\n\n");

        // [Has breasts:
        if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 1) {
            DisplayText("He slides up to your torso and grasps your wildly flailing " + Desc.Breast.describeAllBreasts(character) + ", massaging them harshly. His ministrations are surprisingly crude, and you wonder how many times he's attempted to pleasure a woman.");
            // [Has fuckable nipples:
            if (character.torso.chest.find(BreastRow.FuckableNipples)) DisplayText("  His fingers slide inside your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s and start spreading and squishing them. Your femcum leaks out over his hands and soon your front is slick and shiny.");
            // All other nipples:
            else DisplayText("  His fingers grope and grab at your nipples, stretching them uncomfortably. Before you can complain he seems to realize his mistake and releases them.");
            // [Is lactating normally:
            if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1 && character.lactationQ() < 50) DisplayText("  Milk dribbles and squirts from you as his desperate squishing continues, forming small puddles on the ground.");
            else if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1) DisplayText("  Milk sprays from you as his desperate squishing continues, creating massive puddles of milk that you splash through as you continue moving.");
            DisplayText("\n\n");
        }

        DisplayText("You stop running, spraying dirt in a massive fan and sending the imp on your back flying into a tree, where he crumples to the ground unceremoniously. The doggy-dicked imp collapses out of you and is sprayed down with your orgasm, coating him in femcum and his own semen.\n\n");

        DisplayText("You trot over to the leader, still using the nearly unconscious imp as a cock sleeve, and pull the abused creature off of him. He looks shocked as you grab his cock and squeeze his balls, causing him to orgasm hard and spray you down in white hot seed. He collapses onto the ground, spent, as you wipe yourself down as best you can.");

        DisplayText("  Collecting your things, you give the assorted bodies one last look and stumble back to camp.");
        character.orgasm();
        character.stats.cor += 1;
    }
    return { next: Scenes.camp.returnToCampUseOneHour };
}

function centaurOnImpStart(character: Character, imp: Character): NextScreenChoices {
    DisplayText().clear();
    // Event: Centaur-Imp: Player Raping
    DisplayText("As the imp collapses in front of you, ");
    if (imp.stats.HP === 0) DisplayText("panting in exhaustion");
    else DisplayText("masturbating furiously");
    DisplayText(", you advance toward the poor creature.  The demon's eyes run over your powerful equine muscles as you tower above it.  It is difficult to hide your smile as you look at the tiny creature's engorged cock and the perpetual lust filling its beady eyes.");
    // OPTIONAL THOUGHTS
    // [if previously gave birth to imps and Cor >50] A part of you wonders idly if this is one the offspring that you added to this world
    // [corruption is under 80] but the you quickly banish the thought. [corruption is over 80]  and the thought fills you with excitement. ))
    // << Cor <50 >>
    if (character.stats.cor < 50) DisplayText("  You lick your lips slightly as you begin to approach the small figure.");
    else DisplayText("You lick your lips obscenely as you approach the small figure.\n\n");
    // [Even chance of any of the following happening if the character has the correct equipment, distribute chances between what equipment is available]
    const cocksThatFit = character.torso.cocks.filter(Cock.CockThatFits(imp.analCapacity()));
    if (cocksThatFit.length >= 0 && character.torso.vaginas.count <= 0) return centaurOnImpMale(character, imp);
    else if (character.torso.vaginas.count > 0 && cocksThatFit.length < 0) return centaurOnImpFemale(character, imp);
    else {
        DisplayText("Do you focus on your maleness or girl-parts?");
        return { choices: [["Male", () => centaurOnImpMale(character, imp, true)], ["Female", () => centaurOnImpFemale(character, imp, true)]] };
    }
}

// Player has a cock}}
function centaurOnImpMale(character: Character, imp: Character, vape: boolean = false): NextScreenChoices {
    const cocksThatFit = character.torso.cocks.filter(Cock.CockThatFits(imp.analCapacity()));
    const cockThatFits = cocksThatFit.length > 0 ? cocksThatFit[0] : character.torso.cocks.get(0);
    if (vape) DisplayText().clear();
    DisplayText("As your shadow falls over the imp, it looks between your " + Desc.Leg.describeLegs(character) + " with a hint of fear.  ");
    if (cockThatFits.area <= 15) {
        DisplayText("Relief washes over it followed by intense lust as is throws itself onto a mossy rock and eagerly presents its " + Desc.Butt.describeButthole(character.torso.butt) + ".   The sound of your hooves moving on either side of its body seems to send the creature into a frenzy as it begins humping the air while small mewling sounds escape its lips.  ");
        // <<Cor <50>>
        if (character.stats.cor < 50) DisplayText("You slowly rub your " + Desc.Cock.describeCock(character, cockThatFits) + " between the creature's cheeks, letting your pre-cum oil the small hole, before slowly beginning the insertion.  Before you can get half-way the creatures drives its self back against you, impaling its " + Desc.Butt.describeButthole(character.torso.butt) + " around your " + Desc.Cock.describeCock(character, cockThatFits) + " and making inhuman sounds of ecstasy. The " + Desc.Butt.describeButthole(character.torso.butt) + " relaxes around your " + Desc.Cock.describeCock(character, cockThatFits) + ", taking it all in while its practiced muscles grip and jerk you off internally.\n\n");
        // <<Cor 50+>>
        else DisplayText("You position your " + Desc.Cock.describeCock(character, cockThatFits) + " against its dry anus and drive yourself inside of it using your powerful equine legs.  The creatures gives a loud shriek as its insides are forced open, and you feel the raw tightness trying to resist your intrusion.  Giving the creature no chance to relax you begin pistoning into it, grinning as the sounds of pain give way to grunts and yelps of pleasure. You cannot last long in the creature's hole, and soon spurts of cum begin shooting out and filling its bowels.\n\n");
        // <<GoTo I1>>
        centaurOnImpResults(character, imp, 1);
        // <<End>>
        character.orgasm();
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    else {
        // <<Cock: large, Cor <50>>
        if (character.stats.cor < 50) {
            DisplayText("The imp's eyes widen and you see its apprehension as it attempts to turn and flee.  You make soothing sounds as you approach the skittish creature, while easily keeping pace with it.  Seeing little chance for escape, the creature turns toward you again and carefully begins making its way between your " + Desc.Leg.describeLegs(character) + ", eyes wide in supplication.  Your smile seems to relax it, and lust fills its eyes again as it slowly starts massaging your " + Desc.Cock.describeCock(character, cockThatFits) + ".  Getting more and more confident, the creature is soon using both of its hands on your " + Desc.Cock.describeCock(character, cockThatFits) + ", and its wet and serpentine tongue is moving all over the length of your erection.  There is little chance of your " + Desc.Cock.describeCock(character, cockThatFits) + " fitting into its small mouth, but it does its best to pleasure you as it goes more and more wild.  ");
            // <<Thick large>>
            if (character.torso.cocks.get(0).thickness > 3) {
                DisplayText("It is not long before you feel its tongue slipping into your urethra, and cum rushes from your ");
                if (character.torso.balls.quantity > 0) DisplayText(Desc.Balls.describeBalls(true, true, character));
                else DisplayText("prostate");
                DisplayText(" as you feel the foreign invader wiggling inside.  ");
                // <</Thick>>
            }
            DisplayText("You cannot take the attention for long before your hooves are scraping at the ground and jets of sperm shoot out of your " + Desc.Cock.describeCock(character, cockThatFits) + " and down its waiting throat.\n\n");
            // <<GoTo I2>>
            centaurOnImpResults(character, imp, 2);
            // <<End>>
            character.orgasm();
            return { next: Scenes.camp.returnToCampUseOneHour };
        }
        // <<Cock: large, Cor 50+>>
        else {
            DisplayText("The imp's eyes widen and you see apprehension as it tries to turn around and get away.  It does not make it far before you run it down, knocking it over with your muscled flank.  Before it can try to run again you pin it down and position your " + Desc.Cock.describeCock(character, cockThatFits) + " against its " + Desc.Butt.describeButthole(character.torso.butt) + ".  It feels far too small to handle your girth but a push of your powerful legs gets you in with the first inches.  The imp squeals out in pain and you wince slightly in the vice-like grip.  Gritting your teeth you push in the remaining length, the sounds of pain only serving to drive you forward all the harder.  Soon your " + Desc.Cock.describeCock(character, cockThatFits) + " is moving in and out with more ease, though the imp's tender asshole is distending abnormally to accommodate the invading member.  As much as you long to extend your pleasure, the sensation and the unnatural sounds of the penetration prove too much for you to last long.\n\n");
            // <<GoTo I1>>
            centaurOnImpResults(character, imp, 1);
            // <<End>>
            character.orgasm();
            return { next: Scenes.camp.returnToCampUseOneHour };
        }
    }
    // Tentacledicks!
    // {{Player has 1+ very long (smallest 2+ feet) tentacle cocks}}
    if (character.torso.cocks.count > 1 && character.torso.cocks.sort(Cock.LargestCockArea).length >= 24) {
        DisplayText("As your shadow falls over it, it looks with a hint of fear between your legs, and then its eyes widen in a mixture of apprehension and lust.  Before you can even more the little creatures scrambles forward between your hooves and wraps its hands around your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.LargestCockArea)[0]) + ".  Its tongue begins to trail all along the length of it as its small hands stroke it intensely.\n\n");
        // << Cor <50>>
        if (character.stats.cor < 50) {
            DisplayText("You slowly undulate your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.LargestCockArea)[0]) + " against the creature's mouth, delighting in its eager tongue.  ");
            // <<GoTo I3 then return>>
            centaurOnImpResults(character, imp, 3);
            DisplayText("The sounds beneath you quickly take on a more intense note and you feel massive amounts of cum splashing liberally over your hooves, belly, and " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.LargestCockArea)[0]) + ".  The hot sensation sends you over the edge as you begin spilling yourself into the creature's eager mouth.\n\n");
            // <<GoTo I2>>
            centaurOnImpResults(character, imp, 2);
            // <<End>>
            character.orgasm();
            return { next: Scenes.camp.returnToCampUseOneHour };
        }
        // << 1 or 2 cocks, Cor 50+>>
        else if (character.torso.cocks.count === 2) {
            DisplayText("With an evil smile you wait for your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.SmallestCockArea)[0]) + " to be at its lips before you slide it forward into its waiting mouth.  Giving it little more than a moment to catch its breath you slide your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.SmallestCockArea)[0]) + " further and down the creature's throat.  Though you cannot see the obscene bulge it is making in the creature's mouth-pussy you delight in the intense tightness beneath you.  The throat muscles are massaging your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.SmallestCockArea)[0]) + " as the imp desperately scrambles for air, pulling at the tentacles you have forced into it.  It cannot even begin to close its jaw as you thrust deeper and deeper, as you try to intensify the sensations.\n\n");
            DisplayText("As the imp is focused on the tentacles cutting off its air, you position your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.LargestCockArea)[0]) + " against its " + Desc.Butt.describeButthole(character.torso.butt) + ".  Pausing only for a second for the pleasure of anticipation, you shove yourself deep inside the imp's " + Desc.Butt.describeButthole(character.torso.butt) + ", only making it a few inches before having to pull back and try again.  The creature's throat seems to be working overtime now as it tries to divide its attention between the two invaders.  Each thrust of your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.SmallestCockArea)[0]) + " makes it a little bit deeper inside of the creature, and you wonder passionately if you can get the two to meet in the middle.\n\n");
            DisplayText("It is not long before you begin to feel the creature's struggles slowing down.  ");
            // <<Cor <80 >>
            if (character.stats.cor < 80) {
                DisplayText("Feeling merciful you extract yourself from the creature, flipping it unto a nearby rock as it begins to regain consciousness.  Before it realizes what you are doing your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.LargestCockArea)[0]) + " is prodding at its " + Desc.Butt.describeButthole(character.torso.butt) + ", then sliding quickly between its cheeks.  The amount of slobber over you is more than enough lubricant.  You groan in pleasure as it gives a slight squeal, then proceed to finish yourself off in the once-tight orifice.\n\n");
                // <<Goto I1>>
                centaurOnImpResults(character, imp, 1);
                character.orgasm();
                return { next: Scenes.camp.returnToCampUseOneHour };
            }
            // <<Cor 80+>>
            else {
                DisplayText("You groan in pleasure and slide your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.LargestCockArea)[0]) + " even deeper down the creature's throat, until you can feel its head against your ");
                // <<if balls>>
                if (character.torso.balls.quantity > 0) DisplayText(Desc.Balls.describeBalls(true, true, character) + ".\n\n");
                else DisplayText("groin.\n\n");
                // <<GoTo I3 then return>>
                centaurOnImpResults(character, imp, 3);
                DisplayText("A guttural moan escapes your mouth as you realize the creature has completely passed out underneath you.  ");
                if (character.torso.chest.find(BreastRow.FuckableNipples)) DisplayText("Shoving your fingers deep into your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s");
                else DisplayText("With a fierce tug on your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s");
                DisplayText("you begin to cum deep and directly into the imp's stomach and " + Desc.Butt.describeButthole(character.torso.butt) + ".  ");
                // <<cum multiplier: lots>>
                if (character.cumQ() > 250) DisplayText("Beneath you the creature's belly is distending more and more, and you can feel some of the overflowing cum filling back out until it is pouring out of the creature's unconscious mouth and overstretched ass, forming a spermy pool beneath it.");
                DisplayText("With on last grunt you begin extracting the tentacles back out, almost cumming again from the tightness around them.  You give your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.SmallestCockArea)[0]) + " one last shake over the creature's face before trotting away satisfied and already thinking about the next creature you might abuse.");
                character.orgasm();
                return { next: Scenes.camp.returnToCampUseOneHour };
            }
        }
        // << 3+ cocks, Cor 80+>>
        else {
            DisplayText("With an evil smile you wait for the creature's mouth to touch one of your tentacles before the other two snake their way down and wrap themselves around the imp's thighs.  With a tug the creatures is pulled off of it's feet and upside down, its eyes widening in a mixture of fear and debased lust as it sees your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.LargestCockArea)[0]) + " undulating in front of it.  You slowly move the tentacle up as your other cocks forcefully tug its legs apart, and then playfully begin sliding yourself over the imp's small cheeks.\n\n");
            // <<Cor 80+, has given birth to an imp>>Part of you wonders idly if this is one of the creatures that you spawned, and that left its spermy surprise on you after it came out of the womb<</Cor>>
            DisplayText("Licking your lips in anticipation you begin pushing your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.LargestCockArea)[0]) + " into the imp's " + Desc.Butt.describeButthole(character.torso.butt) + " while listening to the mewling sounds coming from beneath you.  You take your time as you push in, seeing no need to rush yourself as you feel the creature gaping more and more.  Once you bottom out you reach down and grab the creature's arms, securing it firmly against your belly as you break into a trot.  The sensation of the imp's " + Desc.Butt.describeButthole(character.torso.butt) + " bouncing around your " + Desc.Cock.describeCock(character, character.torso.cocks.sort(Cock.LargestCockArea)[0]) + " is intense and you ride harder until you know you are close to the bring.  Quickly you slow down and drape the creature over a nearby boulder, using your hands and tentacles to pin it to the harsh surface, and then your mighty legs push you forward even deeper into the creature's bowels.  The shriek should be audible pretty far in this area, and you groan in debased pleasure thinking it might draw someone else for you to rape or be raped by.  Grunting slightly you begin pushing into the imp even harder just to generate more loud sex-noise.  ");
            // <<Breasts>>
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 0) {
                DisplayText("One of your hands releases it and begins playing with your " + Desc.Breast.describeAllBreasts(character));
                // <<nips have pussies>>
                if (character.torso.chest.find(BreastRow.FuckableNipples)) DisplayText(" and fingering your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s");
                DisplayText(" as you drool slightly in absolute pleasure.  ");
            }
            DisplayText("When the creature's noises lessen and all you can hear is the sloppy sounds of its ass being fucked you push yourself in a single mighty heave, grinding the creature into the rock and eliciting one last scream that pushes you over.\n\n");
            // <<GoTo I1>>
            centaurOnImpResults(character, imp, 1);
            // <<End>>
            character.orgasm();
            return { next: Scenes.camp.returnToCampUseOneHour };
        }
    }
    character.orgasm();
    return { next: Scenes.camp.returnToCampUseOneHour };
}
// CUNTS
function centaurOnImpFemale(character: Character, imp: Character, vape: boolean = false): NextScreenChoices {
    if (vape) DisplayText().clear();
    // PREGGERS CHANCE HERE - unfinished
    // {{Player has a cunt}}
    character.slimeFeed();
    character.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.IMP, IncubationTime.IMP));
    DisplayText("As the imp lays beaten its hands stroke its " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " as its eyes look over you in the hope that you might abuse it in some manner.  You lick your lips as you stare at the large member and you turn around to display your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  ");
    // Not gaping?
    if (character.torso.vaginas.get(0).looseness <= VaginaLooseness.GAPING) {
        // Penetration for non-gape cases
        DisplayText("With a lascivious grin the imp hops forward, gripping your flanks as it drives its member forward into your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  ");
        // <<If Pussy Virgin>>
        if (character.torso.vaginas.get(0).virgin) {
            DisplayText("You cry out as your virginal pussy is torn open by the massive member and the creature cries out in pleasure as it realizes what it has taken from you.  ");
            // [Lose Virginity] <</Virgin>>
        }
        // Not virgin fucking flavors
        else {
            if (character.vaginalCapacity() < imp.torso.cocks.get(0).area) DisplayText("It groans in delight at your incredible tightness and shoves itself forward even harder.  ");
            // [Increase size as needed]
            // <<At Dicksize>>
            if (character.vaginalCapacity() >= imp.torso.cocks.get(0).area && character.vaginalCapacity() <= imp.torso.cocks.get(0).area * 1.25) DisplayText("It makes a pleased sound as it slides deeply into your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  ");
            // <<Bigger than dicksize>>
            if (character.vaginalCapacity() >= imp.torso.cocks.get(0).area * 1.25) DisplayText("Its dick slides easily and slopping noises start sounding from your backside.  Part of you wishes that its large member was larger still, as your mind drifts to some of the monstrous cocks that have penetrated you in the past.  ");
        }
        // Ride around with him till he cums and falls off
        DisplayText("When the creature completely bottoms out inside of you, you begin trotting forward with a wicked grin.  The creature's hands grasp your flanks desperately, and its " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " bounces inside your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", adding to your sensation.  The movement is causing the imp to push himself even harder against you as it tries to not fall off, and it is all you can do to keep an eye on where you are going.  Soon you can feel the imp's sperm filling your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " and overflowing even as your cunt-muscles try to milk it of all of its seed. Unsatisfied you begin to speed up as you use its " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " to bring about your own orgasm.  The small creature is unable to let go without hurting itself.  It hangs on desperately while you increase the pace and begin making short jumps to force it deeper into you.  The feeling of sperm dripping out and over your " + Desc.Vagina.describeClit(character) + " pushes you over and cry out in intense pleasure.  When you finally slow down and clear your head the imp is nowhere to be seen.  Trotting back along the trail of sperm you left behind you find only its small satchel.");
        Mod.Vagina.displayStretchVagina(character, imp.torso.cocks.get(0).area, true, true, false);
        // END OF NON GAPE CASE
    }
    // <<Gaping>>
    else {
        DisplayText("With a lascivious grin the imp hops forward, gripping your flanks as it drives its member forward into your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  While you might have considered him large before you came to this place, the sensation is now merely pleasant, and you can't help but groan in slight disappointment.  ");
        // <<Cor 50+>>
        if (character.stats.cor >= 50) DisplayText("You take comfort in knowing that at least there is a cock inside of you, and that soon it will be filling you with its seed.  Perhaps it might even impregnate you!  ");
        DisplayText("The imp seems to have shared your initial annoyance, and suddenly you feel strange and harsh objects prodding your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " near where you are being penetrated.  Suddenly you feel yourself being forced open even wider, and you feel almost as if you are getting kicked inside of your pussy.  A second object touches near where the first had entered and you quickly brace yourself against a nearby tree.  The second jolt is even harder, feeling as if your cervix is getting stomped.  You howl out in pain as your pussy is virtually torn open, the imp using your tail to leverage not only his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " but also his legs inside your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  ");
        // <<Cor <80>>
        if (character.stats.cor < 80) DisplayText("Tears pour out of your eyes and you are sure you must be bleeding slightly, ");
        // <<Cor <50>>
        if (character.stats.cor < 50) DisplayText("and you hang on to the tree, afraid of the pain from even the slightest movement.  ");
        // <<Cor 50+>>
        else DisplayText("and you hang on to the tree, grunting like a rutting animal as you delight in the intense pain.  ");
        // <<Cor 80+>>
        if (character.stats.cor >= 80) DisplayText("You howl out in pain and pleasure, bucking and hoping to intensify the sensation, hurling enticements and insults at the imp like a slut.  ");
        // <<Cor 50+, Breasts>>
        if (character.stats.cor >= 50 && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 2) {
            DisplayText("You release the tree as you begin playing with your " + Desc.Breast.describeAllBreasts(character));
            // <<w/ nip-pussies>>
            if (character.torso.chest.find(BreastRow.FuckableNipples)) DisplayText(" and shoving your fingers into your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ".  ");
            else DisplayText(".  ");
            // <</Breasts>>
        }
        DisplayText("The imp is pushing deeper and deeper and in moments you cry out again as you feel first its hooves and then its " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " tearing open your cervix and bottoming out in your womb.  ");
        // <<Asshole large+>>
        if (character.analCapacity() >= 35) {
            DisplayText("When the imp realizes it cannot go any further you feel its hands against your asshole, and your eyes go wide in realization of what it is planning on doing.  Lubed up by your now drooling juices, the fist pushes hard into your " + Desc.Butt.describeButthole(character.torso.butt) + ", shoving past your ring-muscles.  ");
            // <<Assole <gaping, Cor <80>>
            if (character.torso.butt.looseness < 4 && character.stats.cor < 80) DisplayText("Your howl of pain leaves your throat raw.  ");
            else DisplayText("Your howl of perverse pleasure leaves your throat raw.  ");
        }
        DisplayText("\n\nIt is a relief when you feel the creature's sperm filling your womb and lubricating your raw cervix, your own body is wrecked by an intense orgasm while it breeds you.  You pass out, waking up to find that the imp has slipped out of you and is lying unconscious and coated completely in a mixture of your juices and his own. After looking for anything you might be able to take away from him you limp away, you ");
        if (character.stats.cor < 80) DisplayText("promise to yourself that you will not do that again.");
        else DisplayText("find your cunt juices already dripping down your legs in anticipation of doing this again.");
    }
    character.orgasm();
    return { next: Scenes.camp.returnToCampUseOneHour };
}

function centaurOnImpResults(character: Character, imp: Character, iNum: number) {
    const cocksThatFit = character.torso.cocks.filter(Cock.CockThatFits(imp.analCapacity()));
    const cockThatFits = cocksThatFit.length > 0 ? cocksThatFit[0] : character.torso.cocks.get(0);
    // {{ GoTo results }}
    // <<I1>>
    if (iNum === 1) {
        // <<cum multiplier: lots>>
        if (character.cumQ() >= 250) {
            // <<no knot>>
            if (cockThatFits.type !== CockType.DOG) DisplayText("Soon the amount is overflowing from the abused " + Desc.Butt.describeButthole(character.torso.butt) + ", dripping between you with no sign of stopping as you continue thrusting yourself into the imp.  ");
            // <<knot>>
            else DisplayText("Soon the abused " + Desc.Butt.describeButthole(character.torso.butt) + " is full to the brim, though your knot keeps any from escaping while more and more pumps in.  Soon the creature's belly is distending and the imp is gasping wordlessly. ");
            DisplayText("When your " + Desc.Cock.describeCock(character, cockThatFits) + " finally emerges a torrent of cum follows out of the distended hole and covering the back of the creature's legs.  ");
            // <<I1_1>>
            // <<2 cocks>>
            if (character.torso.cocks.count === 2) DisplayText("Your other cock drenches the imp's back with its own secretions that immediately start dripping down its sides.  ");
            // <<3+ cocks>>
            if (character.torso.cocks.count > 2) DisplayText("Your other cocks release their cum all over the creature's back and sides, leaving it a glazed mess.  ");
            // <</I1_1>>
            DisplayText("You leave him panting and lapping at a pool of your semen.");
        }// <</multiplier>>
        // <<cum multiplier: little-normal>>
        else {
            DisplayText("With a last thrust into the cum receptacle you begin slowing down, even as its own " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " spills its seed over the ground.  ");
            // <<I1_1>>
            // <<2 cocks>>
            if (character.torso.cocks.count === 2) DisplayText("Your other cock drenches the imp's back with its own secretions that immediately start dripping down its sides.  ");
            // <<3+ cocks>>
            if (character.torso.cocks.count > 2) DisplayText("Your other cocks release their cum all over the creature's back and sides, leaving it a glazed mess.  ");
            // <</I1_1>>
            DisplayText("You leave him panting and draped over the mossy boulder in a pool of your joint cum.");
        }
    }
    if (iNum === 2) {
        // <<cum multiplier: lots>>
        if (character.cumQ() >= 250) {
            DisplayText("The imp's eyes widen in at the amount pouring in, and gobs of sperm begin overflowing down its chin.  ");
            // <<(lots cont.)  cum multiplier: excessive>>
            if (character.cumQ() >= 500) DisplayText("No matter how fast it is swallowing it does not seem to be enough, and soon its belly is distended and its skin is covered in a thick coating of cum.  ");
            // <</multiplier>>
        }
        DisplayText("Sated you trot away and leave the creature licking its lips and fingers, its eyes following you with lustful cunning.");
        // <</I2>>
    }
    // <<I3>>
    if (iNum === 3) {
        // <<Has Breasts>>
        if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 2) {
            DisplayText("As the sensations intensify you reach up and begin massaging your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " and playing with your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s.  ");
            // <<(breasts cont.) nips have pussies>>
            if (character.torso.chest.find(BreastRow.FuckableNipples)) {
                // <<nip-pussies and milk>>
                if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1) DisplayText("Milk streams out from your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s as if they had been recently filled with dripping cum.  ");
                else DisplayText("Your fingers slide faster and faster into your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s even as the imp begins to stroke itself under you.  ");
            }
            // No pussies
            else {
                // <<else no pussies, has milk>>
                if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 0) {
                    // <<little milk>>
                    if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier <= 1) DisplayText("Beads of milk begin to drip down your chest and occasionally spurt outward.  ");
                    // <<else>>
                    else DisplayText("Milk pours out of your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + " and streams down your body.  ");
                }// <</milk>>
            }
        }// <</Breasts>>
    }
}

function areImpsLactoseIntolerant(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("You advance on the masturbating imp, baring your " + Desc.Breast.describeAllBreasts(character) + " and swinging them from side to side. The little creature watches them, mesmerized as he masturbates his foot-long erection.\n\n");

    DisplayText("You sit down in front of the little creature and grab ahold of his hair. The imp squeals slightly in pain before his cries are silenced with a " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ".  It fills his mouth as he yields, defeated. At once he starts to drink down as much of your milk as he can.\n\n");

    DisplayText("After a moment, he takes one of his hands off his large member and puts it against your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " to steady himself as he continues to nurse. You give a pleased sigh and simply bask in the sensations of pleasure that being nursed gives you.  You ruffle the little imp's hair affectionately. \"<i>These creatures are so much nicer to be around when they just take their minds off their cocks,</i>\" you think as you see his other hand relax and stop rubbing his swollen, demonic member.\n\n");

    DisplayText("You feel the imp's mighty gulps start to slow down until he lets out a sigh of relief. While imps may be small, they're very hungry creatures. Your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + " slips out of the imp's mouth, and you gently lay it down on the ground. It gives a few gentle burps before dozing off; you can see that the imp's erection has retracted, and its belly has expanded significantly. You smile to yourself and, feeling fully satisfied, you stand up.");
    // set lust to 0, increase sensitivity slightly
    character.stats.lib += .2;
    character.stats.lust += -50;
    character.milked();
    return { next: Scenes.camp.returnToCampUseOneHour };
}

export function impGangabangaEXPLOSIONS(character: Character): NextScreenChoices {
    character.slimeFeed();
    DisplaySprite(SpriteName.Imp);
    // Set imp imp values
    // Clear arrays in preparation
    const imp = new ImpGang();
    DisplayText("\n");
    DisplayText("<b>You sleep uneasily. A small sound near the edge of your camp breaks into your rest and you awaken suddenly to find yourself surrounded by " + imp.desc.a + "</b>!\n\n");
    // CENTAUR
    if (character.torso.hips.legs.type === LegType.CENTAUR) {
        if (randInt(2) === 0 && (character.torso.cocks.count === 0 || character.gender === Gender.HERM)) {
            // (First encounter)
            if (!character.statusAffects.has(StatusAffectType.ImpGangBang)) {
                DisplayText("The imps stand anywhere from two to four feet tall, with scrawny builds and tiny demonic wings. Their red and orange skin is dirty, and their dark hair looks greasy. Some are naked, but most are dressed in ragged loincloths that do little to hide their groins. They all have a " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " as long and thick as a man's arm, far oversized for their bodies. Watching an imp trip over its " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " would be funny, if you weren't surrounded by a horde of leering imps closing in from all sides...\n\n");
                character.statusAffects.add(StatusAffectType.ImpGangBang, 0, 0, 0, 0);
                DisplayText("The imps leap forward just as you start to ready your " + character.inventory.equipment.weapon.displayname + ", one sweaty imp clinging to your arm");
                // (If the character has a weapon)
                if (character.inventory.equipment.weapon.displayname !== "fists") DisplayText(" while another kicks your weapon out of reach");
                DisplayText(".  The " + imp.desc.short + " surges forward and grapples you. Imps grope your body and hump their " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " against your horse legs, smearing their sweat and pre-cum into your " + character.skin.desc + ". The rest of the " + imp.desc.short + ", a dozen or more imps, all leer at you and laugh as they slap and pinch your body. The imps have sharp claws, tiny sharp teeth, and short horns on their heads. They scratch, claw, and bite at you with all of these weapons as they try to pull you down to the ground. One bold imp leaps forward and grabs your ");
                // (If the character has a cock)"
                if (character.torso.cocks.count > 0) DisplayText(Desc.Cock.describeCock(character, character.torso.cocks.get(0)));
                // (If the character has breasts)
                else DisplayText(Desc.Breast.describeNipple(character, character.torso.chest.get(0)));
                DisplayText(", twisting and pinching hard enough to make you yelp in pain. An imp leaps up and mounts you, grabbing your " + Desc.Head.describeHair(character) + " like reins. The long flesh of his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " rubs against the small of your back. The " + imp.desc.short + " stinks of sweat and pre-cum, its moist grip and obscene smirk leaves you with no doubt as to what they will do to you if you lose this fight.\n\n");
            }
            DisplayText("The horde drags you to your knees, grappling your legs and crawling over your horse-body to pin you down. You try to buck them off but there are too many to fight. The imps drag your arms behind your back, wrapping them around your rider. Another imp whips off his loincloth to reveal his pre-cum drooling " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " and tosses the cloth to the imps holding your arms. They quickly tie your arms back with the sweat-damp loincloth.  ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 1) DisplayText("Having your arms tied behind your back forces your chest out, making your " + Desc.Breast.describeAllBreasts(character) + " stand out. They bounce as you struggle.  ");
            DisplayText("The " + imp.desc.short + " stroke themselves and rub their hands over your outstretched chest, smearing their pre-cum into your skin. The imp riding you bounces up and down, rubbing his sweaty " + Desc.Balls.describeBalls(true, true, imp) + " against your " + character.skin.desc + " while he yanks your hair.  ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("Your face flushes with humiliation. Your imp rider twists your " + Desc.Head.describeHair(character) + " hard and you whimper in pain. Imps rub their cocks along your " + Desc.Hip.describeHips(character) + " while others stroke themselves and jeer at your helplessness.  ");
            // (High Corruption)
            else DisplayText(imp.capitalA + " swarms over your body, some stroking themselves as they watch you squirm while others rub their cocks over your flanks. Your imp rider twists your hair, pulling your head back, and you moan in pleasure at the rough handling. Your " + character.skin.desc + " tingles as you start to flush with desire.  ");
            DisplayText("You yelp in shock as you feel a sharp slap on your ass. You look back to see an imp pulling your tail up. He grins at you and slaps your " + Desc.Hip.describeHips(character) + " again. He yanks your tail and slaps your ass one last time, then dives down to plant his face in your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". His inhumanly nimble tongue teases the folds of your pussy and flicks at your " + Desc.Vagina.describeClit(character) + ".  ");
            // (If the character has balls)
            if (character.torso.balls.quantity > 0) DisplayText("The tongue slides over your " + Desc.Balls.describeSack(character) + ", coating it with warm drool.  ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You shake your hips, trying to escape the demonic tongue. The imp grips your " + Desc.Hip.describeHips(character) + " and pulls his face further into your cunt, sliding his nimble tongue over your lips. You grit your teeth, trying to ignore the warmth spreading from your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".");
            // (High Corruption)
            else DisplayText("You let out a shuddering sigh as the heat from your cunt spreads into the rest of your body. Your " + Desc.Hip.describeHips(character) + " tremble as the tongue slides over the folds of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". The imp grips your flanks harder and dives his nimble tongue into your fuck-hole.");
            DisplayText("\n\n");

            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 1) {
                DisplayText("Hands slide over your " + Desc.Breast.describeAllBreasts(character) + ", dragging your attention back to the front of the mob. Two imps grope your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + ", mauling your flesh as they drag your tits around your chest. They lick your tit-flesh, slowly working their way up towards your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ". The imp rider drops your hair and reaches around you, shoving his cock against your back as he squeezes your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + ". Finally the imps reach your nipples, their tongues wrapping around and pulling at the tingling flesh.  ");
                // (Low Corruption)
                if (character.stats.cor < 50) DisplayText("You can't escape the tongues lapping and pulling at your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ", matching the one in your cunt. You shake your head to deny the pleasure, but your breathing comes faster and faster as lust invades your body.");
                // (High Corruption)
                else DisplayText("The tongues squeezing and tugging your nipples match the tongue working your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", flooding your body with lust. You moan and arch your back, offering your tits to the imps. You can hear your pulse pounding in your ears as you pant with desire.");
                DisplayText("  Suddenly you feel tiny needle-sharp teeth pierce your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ". You scream as venom pumps into your tits, red-hot poison that makes your " + Desc.Breast.describeAllBreasts(character) + " feel as though they were being stung by bees. You moan in pain as your breasts start to swell, the imps continuing to pump demon-taint into them.\n\n");
                // Grow tits!
                Mod.Breast.growSmallestBreastRow(character, 2, character.torso.chest.count, false);
                // character.growTits(2, character.torso.chest.count, false, 1);
                Mod.Breast.boostLactation(character, .3);
            }
            DisplayText("Dimly through your haze of lust and pain you see a large imp step forward from the mob. Four feet tall and broader and stronger looking than any imp you've seen before, with a face as much bull as imp, this new imp has mottled grey skin, broad purple demon wings, two curving bull-horns on his head, and a " + Desc.Cock.nounCock(CockType.HORSE) + " big enough to choke a minotaur. The mushroom-like head of it bobs just below his mouth, and his snake-tongue darts out to flick a bit of pre-cum off the head and onto your face. You shudder as the hot fluid stings the sensitive skin of your lips. His " + Desc.Balls.describeBalls(true, true, imp) + " are each the size of your fist and slick with sweat. He slaps his sweaty cock-head against your cheek, nearly scalding you with the heat.  ");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("You yelp and twist your head to escape the heat.  ");
            // (End low corruption)
            DisplayText("He slowly rubs his shaft over your cheeks and along your lips, each ridge of his demonically-hot " + Desc.Cock.nounCock(CockType.HORSE) + " tugging at your lips. The hot pre-cum dribbles over your sensitive flesh and the musk makes your sinuses tingle. The big imp sneers as you whimper, and whips his bull-shaft back to slap your face. The other imps watch and stroke themselves as their master cock-whips you.\n\n");

            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) DisplayText("The big imp grabs one of your painfully distended breasts in each hand, mauling and bouncing the flesh as if weighing them. You gasp in pain as your " + Desc.Breast.describeAllBreasts(character) + " swell further at his touch. ");
            DisplayText("Hot pre-cum dribbles through your lips and onto your tongue. The steaming salty goo is almost too hot to stand, and you stick your tongue out to cool it. The imps jerk their cocks harder as you pant, tongue hanging out of your mouth. The master imp steps back and looks you up and down, admiring his handiwork. His snake-tongue darts out to an incredible length and wraps itself around your tongue. He licks his pre-cum from you, then forces his tongue into your mouth. The master imp's tongue curves back into your mouth, pressing the glob of pre-cum into your throat. ");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("It's either swallow or have that demon-tongue forced all the way down your throat. Against your will you gulp back the glob.");
            // (High Corruption)
            else DisplayText("You swallow the glob of pre-cum eagerly, trying to suck the demon's tongue into your throat.");
            DisplayText("\n\n");

            DisplayText("The big imp walks around you, casting his gaze over your pinned body.  ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) DisplayText("The other imps reclaim your aching breasts, sucking your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + " and mauling your " + Desc.Breast.describeAllBreasts(character) + " so hard their fingers disappear into your swelling flesh. ");
            DisplayText("The imp rubs his hands over your sides and flanks, his " + Desc.Cock.nounCock(CockType.HORSE) + " bobbing as he walks. The other imps watch their master as he moves around you. Only the imp sucking your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " doesn't notice, his tongue thrusting deeply into your folds. The big imp grabs him by the neck and easily tosses him aside, his tongue dragging through your cunt as he's pulled away from you. The master imp takes position behind you and grabs his " + Desc.Cock.nounCock(CockType.HORSE) + ", bringing the mushroom-head of it down to your pussy. You shake, knowing what's coming next. The other imps watch and stroke themselves as their master readies his hips to push into you.\n\n");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("You scream for help");
            // (High corruption)
            else DisplayText("You moan with lust");
            DisplayText(" as the inhumanly hot cock-head stretches your pussy lips, your cries vanishing into the dark skies above. Your rider grabs your hair to pull your head back, and you cry out as his master pushes his corrupted cock into you.  ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 1) DisplayText("The imps working your breasts suck harder, kneading your tit-flesh as though trying to milk you. ");
            DisplayText("You squirm and twist against the imps holding you down as the hot " + Desc.Cock.nounCock(CockType.HORSE) + " almost burns your sensitive cunt. You can smell the sweat steaming off his shaft, and your pussy-fluids start to steam as well as he forces his cock-head into your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". His huge cock-head bulges your groin, and you moan");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText(" in helpless terror as you feel the bulge work up from the base of your groin towards your stomach. You let out a shuddering moan of pain as inch after inch of monstrous " + Desc.Cock.nounCock(CockType.HORSE) + " stretches your belly");
            // (High corruption)
            else DisplayText(", panting in lust as the monstrous " + Desc.Cock.nounCock(CockType.HORSE) + " pushes your flesh aside to make room for itself");
            DisplayText(". ");
            // (This is a good place for the virginity-loss message, if needed)
            Mod.Vagina.displayStretchVagina(character, imp.torso.cocks.get(1).area, true);
            DisplayText("You can feel every ridge and pulsing vein of his cock pulling on the lining of your stretched cunt. You tremble helplessly around the huge shaft, fully impaled on the imp's mutated bull-cock.\n\n");

            DisplayText("Every pulse of his heart makes his cock twitch, making you shake in time to the shaft pulsing in your cunt. The imps jeer at you, masturbating over your shaking body. The big imp flexes his thighs, and his cock-head throbs deep in your belly. The other imps laugh as you ");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("whimper, spasming as the hot shaft presses against new areas");
            // (High corruption)
            else DisplayText("moan in pleasure, rotating your hips around this incredible cock");
            DisplayText(" in your stuffed " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". The big imp sneers and flexes his cock again, watching ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 2) DisplayText("your " + Desc.Breast.describeAllBreasts(character) + " roll on your chest as you squirm");
            // (If the character doesn't have breasts)
            else DisplayText("your eyes roll back as you squirm");
            DisplayText(".\n\n");

            DisplayText("Finally the big imp pulls back his " + Desc.Cock.nounCock(CockType.HORSE) + ", each ridge pulling on your pussy flesh as he slides out. You yelp and buck as the mushroom-head catches on your folds. ");
            // (If the character has a cock)
            if (character.torso.cocks.count > 0) DisplayText("Your " + Desc.Cock.describeMultiCockShort(character) + " bounces as the bulge passes over it.  ");
            DisplayText("You moan as the mushroom-head reaches the entrance of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", your stretched pussy-flesh slowly returning to normal. The master imp pushes forward again, reclaiming your pussy for his monstrous cock. ");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("You try to buck your " + Desc.Hip.describeHips(character) + ", fighting to break free as the bulge of his cock-head works its way high up into your belly. You're held down by too many imps. You can only writhe around the hot shaft stretching out your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". The big imp grunts as his cock-head pops past your cervix, and you moan and shake in pain.  ");
            // (High corruption)
            else DisplayText("You moan in ecstasy as the hot " + Desc.Cock.nounCock(CockType.HORSE) + " pushes deep into your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", turning every inch of your pussy into a pleasure-sheath for the big imp. You know you're nothing but a fuck-toy for this corrupt creature, just a wet pussy for him to fill with cum, and the thought almost makes you orgasm as he forces his huge cock-head past your cervix.  ");
            DisplayText("Finally the corrupt cock bottoms out against your womb. The imp pulls back again, and starts to fuck you slowly.\n\n");

            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 2) DisplayText("The slow fucking shakes your breasts, and the imps sucking at your nipples cling tightly to your monstrously swollen " + Desc.Breast.describeAllBreasts(character) + ". Your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " have grown three cup sizes since the imps pumped their venom into you. An ache starts deep in the base of your tits and works its way to your sore " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ". Your already bloated nipples swell as the imps suckle and you gasp as the first rush of milk spills into their mouths. Your rider reaches around and starts to milk your udders, moving his hands between your " + Desc.Breast.describeAllBreasts(character) + " and forcing out more milk for his gangmates.\n\n");

            DisplayText("The big imp grinds his hips as he thrusts and pulls, rubbing his cock-ridges against every part of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". While sliding his mutated " + Desc.Cock.nounCock(CockType.HORSE) + " in and out of you, the imp rubs his hands along your mound, pulling it open or forcing it tight as he takes you. Your pussy juices steam off his cock as he pumps, and hot pre-cum dribbles down your crack and ");
            // (If the character has a cock)
            if (character.torso.cocks.count > 0) DisplayText("over your " + Desc.Cock.describeMultiCockShort(character) + " where it ");
            DisplayText("drips onto the ground. ");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("The pain as this huge cock stretches you is overwhelming, but every thrust rubs more corrupt pre-cum into your pussy walls. You start to pant as the imp rapes you, using your body for his own pleasure. You tremble as the heat of his pre-cum soaks through your body. The huge shaft forces your " + Desc.Vagina.describeClit(character) + " out, and the steaming fluids splashing on it make it tingle almost painfully. Your whimpers and moans of pain start to take on a different tone, and the master imp starts to fuck you faster.");
            // (High corruption)
            else DisplayText("Pain and pleasure blend into one as the huge " + Desc.Cock.nounCock(CockType.HORSE) + " stretches you, rubbing pre-cum into your steaming pussy. You moan as the big imp fucks you, turning you into a mindless fuck-puppet. Your " + Desc.Vagina.describeClit(character) + " swells painfully as hot juices splash over it. Your shaking body only adds to the master imp's pleasure.");
            DisplayText("\n\n");

            DisplayText("The other imps continue to jerk-off over you as the big imp impales you again and again on his shaft. Their pre-cum starts to splatter down on your body, and they pant as they watch your orgasm build. ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 1) DisplayText("Imps gulp milk from your bloated " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + ". As one imp drinks his fill and staggers away with a sloshing belly, another steps up to pump your milk-spewing udders.  ");
            // (If the character has a dick)
            if (character.torso.cocks.count > 0) DisplayText("Your " + Desc.Cock.describeMultiCockShort(character) + " swell painfully as the rough fucking pumps blood into your groin.  ");
            DisplayText("The big imp's snake tongue flicks out and slides around your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", pulling at your pussy lips. He moves his tongue back and forth along the sides of your steaming cunt, alternating between stretching and flicking the lips. ");
            // (If the character has a dick)
            if (character.torso.cocks.count > 0) DisplayText("He draws his tongue back and wraps it around your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ", sliding its length along your shaft and flicking his tongue over your cock-head.  ");
            DisplayText("You gasp in time to the big imp's thrusts, whimpering when his cock or tongue hit a sensitive point. ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You're being raped by a demon, milked like a cow, and you're about to cum hard. This corrupted land has left its mark on you.");
            // (High corruption)
            else DisplayText("This corrupted land has left its mark on you. You could never have taken a cock this big before you arrived here.");
            DisplayText(" You moan as you rise towards your orgasm.\n\n");

            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3) DisplayText("Your udders shake back and forth under your chest in time to the rough fucking. You arch your back to press your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + " into eager mouths, moaning as your rider milks your distended " + Desc.Breast.describeAllBreasts(character) + ". ");
            // (Low Corruption).
            if (character.stats.cor < 50) DisplayText("Some part of you can still feel shame, and you whine and clench your teeth as the urge to <i>moo</i> rises in you.");
            // (High corruption)
            else DisplayText("You moan shamelessly as you're fucked and milked, and the moans turn to long <i>mooos</i> of ecstasy.");
            DisplayText("\n\n");

            DisplayText("The master imp pounds into you as hard as he can, driving his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(1)) + " deeper into your cunt. His grunts come closer and closer together. Your rider grinds his cock into your back, rubbing his cock-head in your hair. He nips at your neck and shoulder as he pants. The master imp pounds into you and you can feel his " + Desc.Balls.describeBalls(true, true, imp) + " swell as they slap against you. Through the haze of your approaching orgasm you realize what's about to happen. Those oversized balls are about to pump more cum into you than any normal man could ever produce. They're going to pump demonic cum right into your womb. ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You scream as the base of his " + Desc.Cock.nounCock(CockType.HORSE) + " bloats with corrupted jism, the thick bulge stretching your pussy even more as it pumps along the imp's shaft. The bulge swells your belly and you can feel it move through your stretched cunt towards your womb. Another thick bulge forms at the base of the master imp's cock and you thrash wildly, yelling in protest. \"<i>NOO - O - O - OOOOHhh!</i>\" The hot cum floods into your womb and you reach your own orgasm, shaking as your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " clamps down on his cock and milks it of waves of cum. Another orgasm hits on the heels of the first one, and you buck as more demon-cum floods your womb. Gasping for air, you continue to come as your belly swells. Even as he pumps more corrupt cum into you the big imp keeps raping you, forcing you to another peak before you've come down from the last one.");
            // (High corruption)
            else DisplayText("The thought of all that demon-jism in your womb pushes you over the edge. You cum hard, bucking your hips against the " + Desc.Cock.nounCock(CockType.HORSE) + " pumping hot cum into your belly. Your eyes roll back in your head and you scream out in ecstasy as thick jets of cum fill your pussy. The imp keeps thrusting into his fuck-toy even as he fills your womb with his cum, forcing you to another peak before you've come down from the last one. The big imp is your master now.");
            DisplayText("  You nearly black out as the orgasm blasts through you,  shrieking yourself hoarse as the orgasm wracks your body, eyes rolling back in your head as your womb swells.\n\n");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) DisplayText("As orgasms wrack your body your breasts pump out even more milk, too much for the imps below to handle. Milk pours down your chest in great streams, soaking the imps and splashing onto the ground below you. The milk gushing through your tender " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + " pushes you to another orgasm. You shake your tits as you cum, mooing in mindless pleasure, spraying jets of milk everywhere. Your rider cums, soaking your " + Desc.Head.describeHair(character) + " with jets of imp-jism that run down your scalp and over your cheeks. ");
            // (High corruption)
            if (character.stats.cor >= 50) DisplayText("You lap eagerly at the salty cum, licking up and drinking as much as you can.");
            DisplayText("\n\n");
            DisplayText("Imp-jism rains down on your helpless spasming body. The imps spew cum into your hair, across your back and " + Desc.Hip.describeHips(character) + ", over your face");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) DisplayText(", and bouncing " + Desc.Breast.describeAllBreasts(character));
            DisplayText(". The " + imp.desc.short + " is no longer holding you down. They masturbate over you as you claw at the ground with your hands, hooves scraping the earth as you clamp your thighs tight around the big imp. Another pulse of demonic cum hits your womb. You push back against your master, forcing as much of his cock into you as possible. Arching your back, your eyes roll back in your head and you moo as your womb stretches painfully, a final orgasm crashing through your cum-bloated body. You spasm around the cock that impales you, thrashing as ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) DisplayText("milk spurts from your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + " and ");
            DisplayText("steaming fluids spew from your over-filled pussy. Unconsciousness follows closely on the heels of this last orgasm, your mind shutting down even as your body still shudders.\n\n");
            DisplayText("You wake up later, body still twitching as tiny orgasms spark in your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". It's still dark out. You lie on your side in a pool of cooling cum, milk, and pussy juice. Your body is covered in long ropes of drying imp-cum, and your hair is plastered to the ground. There's no sign of the horde of imps or their big master. Your skin is stretched and shiny over your still milk-bloated tits. Your belly is as tight and distended as a mare on the verge of giving birth. It quivers as the flesh of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " spasms. Over the swollen curve of your belly you can see steam rising from between your legs. You start to slip back into unconsciousness. ");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("Your last coherent thought is to find a way to better hide your camp, so this never happens again.");
            // (High corruption)
            else DisplayText("Your last coherent thought is to find a way to make your own mutated master imp, maybe even a stable full of them...");
            character.orgasm();
            character.stats.lib += 2;
            character.stats.cor += 3;
            character.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.IMP, IncubationTime.IMP - 14)); // Bigger imp means faster pregnancy
        }
        // Scene number 2 - male possible.
        else {
            // Scene 2 (Centaur, vaginal)
            if (character.statusAffects.has(StatusAffectType.ImpGangBang)) {
                // (Subsequent encounters - Low Corruption)
                if (character.stats.cor < 50) DisplayText("You can't tell if this is the same " + imp.desc.short + " as last time or not. You're not racist, but all imps look alike to you. " + imp.capitalA + " surges forward, grabbing at your legs and arms and running their hands over your body. You struggle, but there are just too many to fight. The result is the same as last time...\n\n");
                // (Subsequent encounters - High Corruption)
                else DisplayText("It's about time they showed up. It's not like there's a lot to do in these rocks, and you were getting bored. You grab an imp dick in either hand and spread your legs as other imps grope your thighs...\n\n");
            }
            DisplayText("The imp mob tackles you, grabbing at your arms as you ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("swing your " + character.inventory.equipment.weapon.displayname + " wildly, determined not to let them take you");
            // (High Corruption)
            else DisplayText("twist and struggle in their grips, determined to make them work for their fun");
            DisplayText("! You kick back and feel your hooves smash into an imp's chest, sending him flying. But the " + imp.desc.short + " has your legs and more imps grab your arms. The pack drags you thrashing and bucking over to an old log lying on the ground.\n\n");

            DisplayText("Your human torso is dragged down to the log by " + imp.desc.a + " while two more leap onto your back. The " + imp.desc.short + " makes short work of your " + character.inventory.equipment.armor.displayName + ", unbuckling straps and stripping you quickly. ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) DisplayText("Your unbound " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " bounce out over the weathered log. ");
            DisplayText("The imps spread your arms wide, forcing your chest out, and tie them to the log with sweaty loincloths. Your " + Desc.Hip.describeHips(character) + " are stuck high in the air. Imps rub their sweaty cocks and " + Desc.Balls.describeBalls(true, true, imp) + " over your legs and grope your crotch. The two imps riding your back start stroking and licking each other. ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("Your face flushes with humiliation as they turn their attentions on each other, each working their hands and tongue over the other's dick. How dare these demons use you as a bed to sate their lusts?!");
            // (High Corruption)
            else DisplayText("Your face flushes with anger as they turn their attentions on each other, each working their hands and tongue over the other's dick. You worked hard for this magnificent body, and now they're not using it?!");
            DisplayText("\n\n");

            DisplayText("An imp quickly climbs up your body, planting his feet on your shoulders and grabbing your " + Desc.Head.describeHair(character) + " with one hand for support. He rubs his " + Desc.Balls.describeBalls(true, true, imp) + " over your mouth, smearing your lips with musky sweat, while he pries at your jaw with his other hand. ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) DisplayText("An imp mounts the log and slaps his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " between your " + Desc.Breast.describeAllBreasts(character) + ", squeezing them tight over his cock as he rubs back and forth. He mauls your breasts cruelly, squeezing his fingers deep into your soft flesh.  ");
            // (If the character has a SINGLE cock)
            if (character.torso.cocks.count === 1) DisplayText("An imp ducks under your body and grabs your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ". His nimble tongue flicks over your cock-head while he pricks the shaft with his tiny claws.  ");
            // (If the character has a MULTI cock)
            if (character.torso.cocks.count > 1) DisplayText("Two imps duck under your body and seize your " + Desc.Cock.describeMultiCockShort(character) + ", licking the tips with their inhumanly flexible tongues while they stroke the shafts.  ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You fight to free your hind legs and buck the imps off your back, while sweaty hands slide over your crotch. You whine through clenched teeth as sharp claws jab at your sensitive flesh.\n\n");
            // (High Corruption)
            else DisplayText("You writhe in the grasp of the imps, reveling in the sensations as tiny claws and teeth nip at your sensitive crotch. You lick salty musk off the swollen balls dangling above your mouth.\n\n");
            DisplayText("\n\n");

            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) DisplayText("The imp fucking your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " handles your soft flesh roughly, pressing and pulling your tits into a fuck-canal for his demon cock. Other imps slap your " + Desc.Breast.describeAllBreasts(character) + " and laugh as you cry out.  ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You whimper as your mistreated flesh stings with dozens of pin-prick scratches and bites, and the " + imp.desc.short + " slaps your chest and flanks. The abuse falls on you from all sides, leaving you with no escape. The imp on your shoulders pries your jaws open, and you gag on his " + Desc.Balls.describeBalls(true, true, imp) + ".");
            // (High Corruption)
            else DisplayText("You suckle eagerly at the musky balls in your mouth. Abuse falls on you from all sides, imps leaving tiny marks on your skin as they nip and scratch at you. You whimper in delight as tiny hands slap your chest and flanks.");
            DisplayText("\n\n");

            DisplayText("With a loud sucking sound, the imp pulls his balls out of your mouth. Spit and ball-sweat drip over your cheeks as he repositions himself, bending almost completely over on your shoulders to rub his cock-head against your lips. You nearly choke as pre-cum dribbles into your mouth and runs down the back of your throat. The " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " blocks most of your vision, but in the corners of your eyes you see the master of this imp horde step forward. Four feet tall and broader and stronger than any imp in the pack, with a face as much dog as imp, this new imp has black fur, broad red demon wings, two long demon-horns on his head, and a " + Desc.Cock.nounCock(CockType.DOG) + " big enough to choke a minotaur. He leers at your helpless body and grabs ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) DisplayText("one of your sore " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " in his calloused hand, brutally pressing his fingers into your flesh");
            // (If the character doesn't have breasts)
            else DisplayText("your tail and yanks, brutally pulling on it");
            DisplayText(" until you shriek. The imp riding your shoulders plunges his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " into your mouth, pounding at the top of your throat.\n\n");

            DisplayText("The master imp walks back to your hips, lightly dragging his sharp claws over your flanks. He kicks another imp out of the way and takes position behind your " + Desc.Hip.describeHips(character) + ". He pulls his monstrously long " + Desc.Cock.nounCock(CockType.DOG) + " down and rubs the tip over your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(".  ");
            // (If the character has a cock)
            if (character.torso.cocks.count > 0) DisplayText("Pre-cum drips from the broad tip of it, dripping down to the base of your " + Desc.Cock.describeMultiCockShort(character) + ".  ");
            DisplayText("The big imp's hot pre-cum stings your flesh. The imps licking your crotch lap up the hot fluid, cooling you with their saliva. The big imp sneers as you whimper, and presses the head of his " + Desc.Cock.nounCock(CockType.DOG) + " against your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(". ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You try to pull away from the hot cock-head rubbing against your hole, but the " + imp.desc.short + " holds you tight.");
            // (High Corruption)
            else DisplayText("The scent of musk steaming off the" + Desc.Cock.nounCock(CockType.DOG) + " drives you wild, and you push back to try and capture the cock-tip.");
            DisplayText("\n\n");

            DisplayText("The pointed tip of the master imp's " + Desc.Cock.nounCock(CockType.DOG) + " plunges into your hole, splitting your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(" wide open. You moan around the cock fucking your throat as the corrupted wolf-cock pushes deeper into your hole. The painfully hot shaft claims inch after inch of your flesh, forcing its way deeper into you than any normal human could bear. Bound to the log you can only shake in agony as the big imp's thick dog-knot hits your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(".");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) DisplayText("  The imp fucking your aching " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " paints your tits with a massive load of cum. He falls off the log and another imp jumps up to take his place.");
            DisplayText("\n\n");

            DisplayText("The big imp fucks you roughly, clenching your " + Desc.Hip.describeHips(character) + " in his clawed hands as he hammers his " + Desc.Cock.nounCock(CockType.DOG) + " into you. The head of his mutated shaft pounds ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText("the entrance of your womb");
            // (If the character doesn't have a vagina)
            else DisplayText("depths of your bowels");
            DisplayText(" as the knot slams against your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(". Each hard thrust pounds you against the log, and you grunt in time to the shaft pistoning in your hole.\n\n");

            DisplayText("The master imp fucks you for what seems like hours, beating his dog-knot against your sore ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(" and slapping your ass every few thrusts to remind you who is in charge. Imp after imp stretches your throat with their cocks and your belly with demon-seed as the pack rapes your face. ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) DisplayText("The rough fucking shakes your cum-stained breasts, and the imp fucking your " + Desc.Breast.describeAllBreasts(character) + " clings tightly to your red and swollen tit flesh. Your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " burn with agony as the " + imp.desc.short + " slaps your tits like drums.  ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You're being raped again by demons, impaled on cocks like a roast pig on a spit, and you can feel your lust rising. This corrupted land has left its mark on you.");
            // (High corruption)
            else DisplayText("This corrupted land has left its mark on you. You could never have taken a cock this big before you arrived here.");
            DisplayText("\n\n");

            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You gurgle helplessly as the cock raping your throat pours thick wads of");
            // (High Corruption)
            else DisplayText("You eagerly chug thick wads of cum from the cock stretching your throat, working your throat to force more");
            DisplayText(" cum into your swelling belly. The imp slams his cock as deep into your throat as it will go, slapping his " + Desc.Balls.describeBalls(true, true, imp) + " against your face. He cums for an impossibly long time, streams of jism pouring into you. You can feel your stomach stretching, but you're more worried about breathing. The edge of your vision starts to go red and your chest heaves as you fight for air. Finally the imp draws his cock out of your throat, spraying his last gobs of cum over your face as you gasp in huge lungfuls of air. The sudden rush of oxygen pushes you over the edge and you cum hard. Your hands clench at the air and your eyes roll back in your head as you twist around the demonic " + Desc.Cock.nounCock(CockType.DOG) + " pounding into you. You shriek as your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(" spasms on the steaming pole that impales it. Another imp shoves his cock in your mouth as you scream, throat convulsing around his cock-head.");
            // (If the character has a cock)
            if (character.torso.cocks.count > 0) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " shoots cum across the ground and into the waiting mouths of the imps licking your crotch.");
            DisplayText("\n\n");

            DisplayText("Another imp-cock spasms in your throat as its owner rams deep into you. He floods your already swollen stomach with inhuman amounts of cum. Again you feel yourself about to black out as the demon pumps jism into you. He pulls out and again you orgasm as you wheeze for air. Another imp forces his cock down your throat as you moan and gasp. Your body shakes in pleasure on the big imp's " + Desc.Cock.nounCock(CockType.DOG) + ".  Tightening his grip on your " + Desc.Hip.describeHips(character) + " the master imp howls and slams his shaft into your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(". His unnaturally huge knot stretches the entrance of your hole, and he hammers into you again. ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You howl around the imp-cock stretching your throat. The bloated knot opens your hole far beyond anything you've endured before. Your violent thrashing throws the imps off your back and you buck uselessly, thrashing as the swollen " + Desc.Cock.nounCock(CockType.DOG) + " plunges deeper into you.");
            // (High corruption)
            else DisplayText("The master imp's bloated knot stretches your entrance and plunges into your hole with a loud <i>pop</i>. Another orgasm hits you as the " + Desc.Cock.nounCock(CockType.DOG) + " rams even deeper into you. You howl around the imp-cock stretching your throat, bucking as your orgasm shakes you. Your violent thrashing throws the imps off your back and slams your hips against the big imp, pushing him further into your hole.");
            DisplayText("  The big imp howls again as he cums, each wave of steaming demon-cum stretching his knot and shaft even more. His cum-pumping " + Desc.Cock.nounCock(CockType.DOG) + " is bottomed out deep in your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText("womb");
            // (If the character doesn't have a vagina)
            else DisplayText("guts");
            DisplayText(" and he pumps more jism into you than his balls could possibly hold. Your belly stretches with every blast of cum and you shriek around yet another cock in your throat.\n\n");

            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 2) DisplayText("The imp riding your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " cums, his load lost in the flood of jism dripping off your abused fuck-udders. ");
            DisplayText("Your master isn't done with you yet, churning his " + Desc.Cock.nounCock(CockType.DOG) + " knot in your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(" as he continues to cum. You're pumped full of demon-cum from both ends as one imp shoots his load in your throat and another steps up to take his place. You shake and tremble in your own endless orgasm as the pleasure in your stretched hole blends with the pain of your swollen belly. Your fingers claw at the log as the master imp shifts his massive knot within your monstrously stretched ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(". Your legs give out as you feel more pulses of demon-cum work their way up his shaft and into your already-huge belly.\n\n");

            DisplayText("You pass out as another tidal wave of corrupted jism spews into your hole, another load of imp-cum pours down your throat, to meet somewhere in the middle...\n\n");

            DisplayText("You wake up later, still trembling with small orgasms. Cum burbles in your mouth as you breathe, and your " + Desc.Head.describeHair(character) + " is soaked with jism. You haven't moved since you passed out. Your arms are still tied to the log, ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) DisplayText("your bruised and throbbing tits pressed against the rough wood, ");
            DisplayText("and your body rests in a cooling pool of cum. You couldn't move even if your " + Desc.Leg.describeLegs(character) + " felt stronger. Your hideously bloated belly weighs you down, quivering with every orgasmic twitch that passes through you. The skin of your distended belly is drum-tight and shiny. As you slip back into unconsciousness, one last thought flits across your mind. ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("How long can you last in this corrupted land, when your body can be so horribly twisted by the sick pleasures of its denizens?");
            // (High corruption)
            else DisplayText("Why bother with your silly quest, when you've only scratched the surface of the pleasures this land offers you?\n");
            character.orgasm();
            character.stats.lib += 2;
            character.stats.cor += 3;
            character.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.IMP, IncubationTime.IMP - 14)); // Bigger imp means faster pregnancy
            // Stretch!
            if (character.torso.vaginas.count > 0) {
                if (Mod.Vagina.displayStretchVagina(character, imp.torso.cocks.get(2).area, true)) DisplayText("\n");
            }
            else {
                if (Mod.Butt.displayStretchButt(character, imp.torso.cocks.get(2).area, true)) DisplayText("\n");
            }
        }
    }
    // NOT CENTAUR
    else {
        if (randInt(2) === 0 && (character.torso.cocks.count === 0 || character.gender === Gender.HERM)) {
            // (First encounter)
            if (!character.statusAffects.has(StatusAffectType.ImpGangBang)) {
                DisplayText("The imps stand anywhere from two to four feet tall, with scrawny builds and tiny demonic wings. Their red and orange skin is dirty, and their dark hair looks greasy. Some are naked, but most are dressed in ragged loincloths that do little to hide their groins. They all have a " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " as long and thick as a man's arm, far oversized for their bodies. Watching an imp trip over its " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " would be funny, if you weren't surrounded by a horde of leering imps closing in from all sides...\n\n");
                character.statusAffects.add(StatusAffectType.ImpGangBang, 0, 0, 0, 0);
            }
            DisplayText("The imps leap forward just as you start to ready your " + character.inventory.equipment.weapon.displayname + ", one sweaty imp clinging to your arm");
            if (character.inventory.equipment.weapon.displayname !== "fists") DisplayText(" while another kicks your weapon out of reach");
            DisplayText(". The " + imp.desc.short + " surges forward and grapples you. Imps grope your body and hump their " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " against your legs, smearing their sweat and pre-cum into your " + character.skin.desc + ". The rest of the " + imp.desc.short + ", a dozen or more imps, all leer at you and laugh as they slap and pinch your body. The imps have sharp claws, tiny sharp teeth, and short horns on their heads. They scratch, claw, and bite at you with all of these weapons as they try to pull you down to the ground. One bold imp leaps forward and grabs your ");
            // (If the character has a cock)
            if (character.torso.cocks.count > 0) DisplayText(Desc.Cock.describeCock(character, character.torso.cocks.get(0)));
            else DisplayText(Desc.Breast.describeNipple(character, character.torso.chest.get(0)));
            DisplayText(", twisting and pinching hard enough to make you yelp in pain. The " + imp.desc.short + " stinks of sweat and pre-cum, and their moist grips and obscene smirks leave you with no doubts about what they will do to you if you lose this fight.\n\n");
            // (Bipedal, vaginal)
            DisplayText("The " + imp.capitalA + " overwhelms you, dragging you to the ground with sheer numbers. There are at least two imps on each limb, holding you spread-eagled on the cold ground while other imps stroke your body. ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) DisplayText("Imps surround your chest, slapping their " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + "s on your " + Desc.Breast.describeAllBreasts(character) + " and rubbing their slippery pre-cum into your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ".  ");
            DisplayText("Others stand over your head, their cocks bobbing inches from your face as they jack off. A thick musk wafts off their cocks, and the smell of it makes your sinuses tingle. Two more imps take position between your legs, sliding their cocks along your thighs while stroking your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " and flicking your " + Desc.Vagina.describeClit(character) + ".");
            // (If the character has a cock)
            if (character.torso.cocks.count > 0) DisplayText("An imp rubs his hand across his cock-head, smearing it with his pre-cum. He rubs his hand over your " + Desc.Cock.describeMultiCockShort(character) + ", making your cock-skin tingle as his fluid soaks into you.");
            DisplayText("\n\n");
            DisplayText("The " + imp.desc.short + " snickers lewdly as your nipples harden and your pussy moistens. One of the imps between your legs slides his shaft along your pussy lips, teasing your " + Desc.Vagina.describeClit(character) + " with the tip of his cock.  ");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("You renew your struggles, trying to break free of your captors. They only laugh and bear down harder on you.  ");
            // (High corruption)
            else DisplayText("You buck your hips, trying to capture his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " with your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  ");
            DisplayText("Before he can thrust into you, the imp is shoved aside by the biggest imp you've ever seen.\n\n");

            DisplayText("Four feet tall and broader and healthier looking than any imp you've seen before, with a face as much bull as imp, this new imp has mottled grey skin, broad purple demon wings, two curving bull-horns on his head, and a " + Desc.Cock.nounCock(CockType.HORSE) + " big enough to choke a minotaur. The mushroom-like head of it bobs just below his mouth, and his snake-tongue darts out to flick a bit of pre-cum off the head and onto your groin. You shudder as the hot fluid stings the sensitive skin of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character has a dick)
            if (character.torso.cocks.count > 0) DisplayText(" and " + Desc.Cock.describeMultiCockShort(character));
            DisplayText(". His " + Desc.Balls.describeBalls(true, true, imp) + " are each the size of your fist and slick with sweat. He slaps his sweaty balls against your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " nearly scalding you with the heat.  ");
            // (Low corruption)
            if (character.stats.cor < 33) DisplayText("You yelp and buck your hips to escape the heat.  ");
            DisplayText("He grabs your hips and slowly drags his shaft down your pussy, each ridge of his demonically-hot " + Desc.Cock.nounCock(CockType.HORSE) + " hitting your clit and pulling at your lips. Finally the broad horse-like head of his shaft catches on your " + Desc.Vagina.describeClit(character) + ", and the hot pre-cum dribbles over your sensitive flesh. The big imp sneers as you whimper, and drags his cock-head down to the opening of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". The other imps watch and stroke themselves as their master pulls his hips back to push into you.\n\n");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("You scream for help");
            // (High corruption)
            if (character.stats.cor >= 50) DisplayText("You moan with lust");
            DisplayText(" as the inhumanly hot cock-head stretches your pussy lips, your cries vanishing into the dark skies above. Two imps grab your hair and pull your head up, forcing you to watch as their master pushes his corrupted cock into you. Other imps spread your [legs] even wider, leaving you helpless as the big imp slides his swollen meat into your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". You squirm and twist against the imps holding you down as the hot flesh almost burns your sensitive cunt. You can smell the hot sweat steaming off his shaft, and your pussy-fluids start to steam as well as he forces his cock-head into your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". His huge cock-head bulges your groin, and you watch ");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("in helpless terror as the bulge inches up from the base of your groin towards your stomach. You let out a shuddering moan of pain as inch after inch of monstrous " + Desc.Cock.nounCock(CockType.HORSE) + " stretches your belly");
            // (High corruption)
            else DisplayText("panting in lust as the monstrous " + Desc.Cock.nounCock(CockType.HORSE) + " pushes your flesh aside to make room for itself");
            DisplayText(". ");
            // (This is a good place for the virginity-loss message, if needed)
            Mod.Vagina.displayStretchVagina(character, imp.torso.cocks.get(1).area, true);
            DisplayText("\n\n");
            DisplayText("You can feel every ridge and pulsing vein of his cock pulling on the lining of your stretched cunt. You tremble helplessly around the huge shaft, fully impaled on the imp's mutated bull-cock.\n\n");
            DisplayText("Every pulse of his heart makes his cock twitch, making you shake in time to the shaft pulsing in your cunt. The imps jeer at you, masturbating over your shaking body. The big imp flexes his thighs, and the bulge of his cock-head bounces high in your belly. The other imps laugh as you ");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("whimper, spasming as the hot shaft presses against new areas");
            // High corruption)
            else DisplayText("moan in pleasure, rotating your hips around this incredible cock");
            DisplayText(" in your stuffed " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". The big imp sneers and bounces his cock again, watching ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 3) DisplayText("your " + Desc.Breast.describeAllBreasts(character) + " roll on your chest as you squirm");
            // (If the character doesn't have breasts)
            else DisplayText("your eyes roll back as you squirm");
            DisplayText(".  ");
            // (If the character has a cock)
            if (character.torso.cocks.count > 0) DisplayText("Your " + Desc.Cock.describeMultiCockShort(character) + " slaps against your distended belly as you shake.");
            DisplayText("\n\n");
            DisplayText("Finally the big imp pulls back his " + Desc.Cock.nounCock(CockType.HORSE) + ", each ridge pulling on your pussy flesh as he slides out. An imp reaches out and slaps the bulge as it withdraws, making you yelp and buck.  ");
            // (If the character has a cock)
            if (character.torso.cocks.count > 0) DisplayText("Your " + Desc.Cock.describeMultiCockShort(character) + " bounces as the bulge passes under it.  ");
            DisplayText("You moan as the mushroom-head reaches the entrance of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", your stretched pussy-flesh slowly returning to normal. The master imp pushes forward again, reclaiming your pussy for his monstrous cock. ");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("You try to pull your hips back, fighting to break free as the bulge of his cock-head works its way high up into your belly. You're held down by too many imps. You can only writhe around the hot shaft stretching out your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". Your head is held steady by two imps, you can't even look away as their master rapes you. The big imp grunts as his cock-head pops past your cervix, and you moan and shake in pain.");
            // (High corruption)
            else DisplayText("You moan in ecstasy as the hot " + Desc.Cock.nounCock(CockType.HORSE) + " pushes deep into your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", turning every inch of your pussy into a pleasure-sheath for the big imp. You know you're nothing but a fuck-toy for this corrupt creature, just a wet pussy for him to fill with cum, and the thought almost makes you orgasm as he forces his huge cock-head past your cervix.");
            DisplayText("Finally the corrupt cock bottoms out against your womb. The imp pulls back again, and starts to fuck you slowly.\n\n");

            DisplayText("The big imp grinds his hips as he thrusts and pulls, rubbing his cock-ridges against every part of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  While sliding his mutated " + Desc.Cock.nounCock(CockType.HORSE) + " in and out of you the imp rubs his hands along your mound, pulling it open or forcing it tight as he takes you. Your pussy juices steam off his cock as he pumps, and hot pre-cum dribbles down your crack to your " + Desc.Butt.describeButthole(character.torso.butt) + ". ");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("The pain as this huge cock stretches you is overwhelming, but every thrust rubs more corrupted pre-cum into your pussy walls. You start to pant as the imp rapes you, using your body for his own pleasure. Your nipples swell as the heat of his pre-cum soaks through your body. The huge shaft forces your " + Desc.Vagina.describeClit(character) + " out, and the steaming fluids splashing on it make it tingle almost painfully. Your whimpers and moans of pain start to take on a different tone, and the master imp starts to fuck you faster.");
            // (High corruption)
            else DisplayText("Pain and pleasure blend into one as the huge " + Desc.Cock.nounCock(CockType.HORSE) + " stretches you, rubbing pre-cum into steaming pussy. You moan as the big imp fucks you, turning you into a mindless fuck-puppet. Your " + Desc.Vagina.describeClit(character) + " swells painfully as hot juices splash over it. Your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + " tingle almost painfully as the heat of his pre-cum spreads through your body.");
            DisplayText("\n\n");
            DisplayText("The other imps continue to jerk-off over you as the big imp impales you again and again on his shaft. Their pre-cum starts to splatter down on your body, and they pant as they watch you build towards your orgasm.  ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 3) DisplayText("Your " + Desc.Breast.describeAllBreasts(character) + " bounce and jiggle back and forth as the master imp roughly fucks you.  ");
            // (If the character has a dick)
            if (character.torso.cocks.count > 0) DisplayText("Your " + Desc.Cock.describeMultiCockShort(character) + " swell painfully as the rough fucking pumps blood into your groin.  ");
            DisplayText("The big imp's snake tongue lashes out to incredible length and wraps around one of your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s, pulling at it and stretching the flesh under it. He moves his tongue back and forth between your nipples, alternating between stretching and flicking them. ");
            // (If the character has a dick)
            if (character.torso.cocks.count > 0) DisplayText("He draws his tongue back and wraps it around your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ", sliding its length along your shaft and flicking his tongue over your cock-head.");
            // (If the character doesn't have a dick)
            else DisplayText("His tongue flicks down to your " + Desc.Vagina.describeClit(character) + ", the split ends of it teasing your clit.");
            DisplayText("  You gasp in time to the big imp's thrusts, whimpering when his cock or tongue hit a sensitive point.  ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You're being raped by a demon, forced to take an inhuman cock, and you're about to cum hard. This corrupted land has left its mark on you.");
            // (High corruption)
            else DisplayText("This corrupted land has left its mark on you. You could never have taken a cock this big before you arrived here.");
            DisplayText("  You moan as you rise towards your orgasm.\n\n");

            DisplayText("The master imp pounds at you as hard as he can, driving his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(1)) + " deeper into you. His grunts come closer and closer together. Your head still held up, you watch as the imps around you start to cum. They spray your body with thick globs of cum, splattering it across your belly");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 3) DisplayText(" and " + Desc.Breast.describeAllBreasts(character));
            DisplayText(". The master imp pounds into you and you can see his " + Desc.Balls.describeBalls(true, true, imp) + " swell. Through the haze of your approaching orgasm you realize what's about to happen. Those oversized balls are about to pump more cum into you than any normal man could ever produce. They're going to pump demonic cum right into your womb.  ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You scream as the base of his " + Desc.Cock.nounCock(CockType.HORSE) + " bloats with corrupted jism, the thick bulge stretching your pussy even more as it pumps along the imp's shaft. The bulge swells your belly and you watch as it moves towards your womb. Another thick bulge forms at the base of the master imp's cock and you thrash wildly, yelling in protest. \"<i>NOO - O - O - OOOOHhh!</i>\" The hot cum floods into your womb and you hit your own orgasm, shaking as your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " clamps down on his cock and milks it of waves of cum. Another orgasm hits on the heels of the first one, and you buck as more demon-cum floods your womb. Gasping for air, you continue to come as your belly swells. Even as he pumps more corrupt cum into you the big imp keeps raping you, forcing you to another peak before you've come down from the last one.");
            // (High corruption)
            else DisplayText("The thought of all that demon-jism in your womb pushes you over the edge. You cum hard, bucking your hips against the " + Desc.Cock.nounCock(CockType.HORSE) + " pumping hot cum into your belly. Your eyes roll back in your head and you scream out your ecstasy as thick jets of cum fill your pussy. The imp keeps thrusting into his fuck-toy even as he fills your womb with his cum, forcing you to another peak before you've come down from the last one. The big imp is your master now.");
            DisplayText("  You nearly black out as the orgasm blasts through you,  arching your back off the ground as the orgasm wracks your body, eyes rolling back in your head as your womb swells.\n\n");

            DisplayText("Imp-jism rains down on your helpless spasming body. The imps spew cum into your hair, across your swollen belly, over your face");
            // (If the character has a cock)
            if (character.torso.cocks.count > 0) DisplayText(", and cum-dripping " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)));
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 3) DisplayText(", and bouncing " + Desc.Breast.describeAllBreasts(character));
            DisplayText(". The " + imp.desc.short + " is no longer holding you down. They masturbate over you as you claw at the ground with your hands, toes curling as you clamp your thighs tight around the big imp. Another pulse of demonic cum hits your womb. You wrap your legs around your master, forcing as much of his cock into you as possible. Arching your back, your eyes roll back in your head and you shriek as your womb stretches painfully, a final orgasm crashing through your cum-bloated body. You spasm around the cock that impales you, thrashing against the ground as ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 3 && character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 1) DisplayText("milk spurts from your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + " and ");
            DisplayText("steaming fluids spew from your over-filled pussy. Unconsciousness follows close on the heels of this last orgasm, your mind shutting down even as your body still shudders.\n\n");
            DisplayText("You wake up later, body still twitching as tiny orgasms spark in your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". It's still dark out. You lie in a pool of cooling cum and pussy juice. Your body is covered in long ropes of drying imp-cum, and your hair is plastered to the ground. There's no sign of the horde of imps or their big master. Your belly is as tight and distended as a woman on the verge of giving birth. It quivers as the flesh of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " spasms. Over the swollen curve of your belly you can see steam rising from between your legs. You start to slip back into unconsciousness. ");
            // (Low corruption)
            if (character.stats.cor < 50) DisplayText("Your last coherent thought is to find a way to better hide your camp, so this never happens again.");
            // (High corruption)
            else DisplayText("Your last coherent thought is to find a way to make your own mutated master imp, one you can keep as a fuck-toy...");
            character.orgasm();
            character.stats.lib += 2;
            character.stats.cor += 3;
            character.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.IMP, IncubationTime.IMP - 14)); // Bigger imp means faster pregnancy
        }
        else {
            // Imp Scene 2 (Bipedal, vaginal)
            // Tag-team
            // Include milking alt text in separate blocks.
            // Work cock and multicock alt text directly into main text blocks.
            if (character.statusAffects.has(StatusAffectType.ImpGangBang)) {
                // (Subsequent encounters - Low Corruption)
                if (character.stats.cor < 50) DisplayText("You can't tell if this is the same " + imp.desc.short + " as last time or not - all imps look alike to you.  The " + imp.capitalA + " surges forward, grabbing at your " + Desc.Leg.describeLegs(character) + " and arms and running their hands over your body. You struggle, but there are just too many to fight. The result is the same as last time...\n\n");
                // (Subsequent encounters - High Corruption)
                else DisplayText("It's about time they showed up. It's not like there's a lot to do in these rocks, and you were getting bored. You grab an imp dick in either hand and spread your legs as other imps grope your thighs...\n\n");
            }
            DisplayText("The " + imp.capitalA + " swarms over you, dragging you to the ground as ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("you punch and kick wildly, determined not to let them take you");
            // (High Corruption)
            else DisplayText("you twist and struggle in their grips, determined to make them work for their fun");
            DisplayText("! They pull you down over a fallen log, ass resting above your head. Two imps sit on your arms, their gonads rubbing against your biceps, and rub their hands over your shoulders and chest. Others stretch your ");
            if (character.torso.hips.legs.isNaga()) DisplayText("coils out, twisting them around a log to hold you still.\n\n");
            else DisplayText(Desc.Leg.describeLegs(character) + " wide apart, holding them against the log.\n\n");

            DisplayText("The " + imp.desc.short + " makes short work of your " + character.inventory.equipment.armor.displayName + ", unbuckling straps and stripping you quickly. ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) DisplayText("An imp mounts your chest and slaps his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " between your " + Desc.Breast.describeAllBreasts(character) + ", squeezing them tight over his cock as he rubs back and forth.  ");
            // (If the character has a SINGLE cock)
            if (character.torso.cocks.count === 1) DisplayText("Your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " is seized by an imp, who licks the tip with his inhumanly nimble tongue while he strokes the shaft.  ");
            // (If the character has a MULTI cock)
            if (character.torso.cocks.count > 1) DisplayText("Two imps seize your " + Desc.Cock.describeMultiCockShort(character) + ", licking the tips with their inhumanly nimble tongues while they stroke the shafts.  ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You fight to free your arms and shake the imp off your chest while tiny hands slide over your face. They tug at your lips and try to pry your jaws open");
            // High Corruption)
            else DisplayText("You writhe in the grasp of the imps, reveling in the sensations of being spread open and completely at the mercy of these demons. Tiny hands slide over your face and you lick and suck at the fingers");
            DisplayText(".\n\n");

            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) {
                DisplayText("Hands slide over your " + Desc.Breast.describeAllBreasts(character) + ", pinching and pulling at your nipples. The imp riding your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " licks your tit-flesh, slowly working his tongue up towards your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ". Finally the imp's tongue reaches your nipple, wrapping around and pulling at the tingling flesh. ");
                // (Low Corruption)
                if (character.stats.cor < 50) DisplayText("You can't escape the tongue lapping and pulling at your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ". You shake your head to deny the pleasure, but your breathing comes faster and faster as lust invades your body.");
                // (High Corruption)
                else DisplayText("The tongue squeezing and tugging your nipple floods your body with lust. You moan and arch your back, offering your tits to the imp riding your chest. You can hear your pulse pounding in your ears as you pant in desire.");
                DisplayText("  Suddenly you feel tiny needle-sharp teeth pierce your nipple. You scream as venom pumps into your tits, red-hot poison that makes your " + Desc.Breast.describeAllBreasts(character) + " feel as though they were being stung by bees. You moan in pain as your breasts start to swell, the imp rider biting into your other nipple to pump demon-taint into it.");
                if (character.torso.chest.find(BreastRow.FuckableNipples)) DisplayText("With the imp's taint seeping into your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ", each one's cunt-like shape begins swelling. The fuckable orifices engorge into larger and fatter looking labia, becoming fuller cunts each with an engorged clitoral nub the size of a golf ball. Their color deepens as the skin of your nipple-cunts becomes tighter and smoother.  The imp giggles and continues nibbling the newly swollen sensitive flesh, injecting further doses of venom.");
                DisplayText("\n\n");
                // Grow tits!
                Mod.Breast.growSmallestBreastRow(character, 2, character.torso.chest.count, false);
                // character.growTits(2, character.torso.chest.count, false, 1);
                Mod.Breast.boostLactation(character, .5);
            }
            DisplayText("The master of this " + imp.desc.short + " steps up ");
            if (character.torso.hips.legs.isNaga()) DisplayText("alongside your taut tail");
            else DisplayText("between your " + Desc.Leg.describeLegs(character));
            DisplayText(", leering down at your trapped body. Four feet tall and broader and stronger than any imp in the pack, with a face as much dog as imp, this new imp has grey fur, broad black demon wings, two long demon-horns on his head, and a " + Desc.Cock.nounCock(CockType.DOG) + " big enough to choke a minotaur. Pre-cum drips from the broad tip of it, dripping down onto your ");
            // (If the character has a cock)
            if (character.torso.cocks.count > 0) DisplayText(Desc.Cock.describeMultiCockShort(character));
            // (If the character doesn't have a cock)
            else DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            DisplayText(".  ");
            DisplayText("The heat stings your flesh. The imps licking your groin lap up the hot fluid, cooling you with their saliva. The big imp sneers as you whimper, and drags the head of his " + Desc.Cock.nounCock(CockType.DOG) + " down to your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(".  He thrusts brutally, shoving the head of his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(2)) + " into your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)" +
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(". ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You screech in agony as the big imp forces his mutated wolf-cock into your hole, brutally shoving thick inch after inch of painfully hot " + Desc.Cock.nounCock(CockType.DOG) + " deeper into you than anything should ever go.  ");
            // (High Corruption)
            else DisplayText("The master imp's painfully hot " + Desc.Cock.nounCock(CockType.DOG) + " stretches your hole wider than it ever should be, and you moan in perverse ecstasy.  ");
            DisplayText("His huge dick-knot bumps against the entrance of your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(".\n\n");

            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) DisplayText("The big imp reaches past your tit-rider and grabs one of your painfully distended breasts in each hand, mauling and bouncing the flesh as if weighing them. You gasp in pain as your " + Desc.Breast.describeAllBreasts(character) + " swell further at his touch.  ");
            DisplayText("Your mouth gapes open and an imp takes the chance to stuff it full of cock.  ");
            DisplayText("The master imp grabs your hips and starts to fuck you hard, pistoning his steaming cock in and out of your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(". ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 1) DisplayText("The rough fucking shakes your breasts, and the imp sucking your nipples clings tightly to your monstrously swollen " + Desc.Breast.describeAllBreasts(character) + ". Your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " have grown three cup sizes since the imp pumped his venom into you.  ");
            DisplayText("The imp fucking your face grabs your " + Desc.Head.describeHair(character) + " and jaw, forcing your head back so he can ram his cock into your throat. The obscene bulge sliding in your throat matches the bulge in your belly. The smaller imp pulls back just enough to let you gasp for air, then thrusts into your throat again. The big imp pounds the knot of his " + Desc.Cock.nounCock(CockType.DOG) + " against your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(", not caring that he's stretching you beyond normal human endurance. ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You're being raped again by demons, impaled on cocks like a roast pig on a spit, and you can feel your lust rising.  This corrupted land has left its mark on you.");
            // (High corruption)
            else DisplayText("This corrupted land has left its mark on you. You could never have taken a cock this big before you arrived here.");
            DisplayText("\n\n");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) DisplayText("An ache starts deep in the base of your tits and works its way to your sore " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ". Your already bloated nipples swell as your rider suckles and you gasp as the first rush of milk spills into his mouth. Your rider milks your udders, moving his hands between your " + Desc.Breast.describeAllBreasts(character) + " and forcing out more milk than he could ever drink. Other imps lick the milk from the shiny skin of your swollen breasts.\n\n");

            DisplayText("The smaller imp slams his cock as deep into your throat as it will go, slapping his " + Desc.Balls.describeBalls(true, true, imp) + " against your face. He cums, balls twitching as they pump spunk down your throat. You can feel your stomach stretching, but you're more worried about breathing. The imp cums for an impossibly long time, streams of jism pouring into you. The edge of your vision starts to go red and your chest heaves as you fight for air. Finally the imp draws his cock out of your throat, spraying his last gobs of cum over your face as you gasp in huge lungfuls of air. The sudden rush of oxygen pushes you over the edge and you cum hard. Your body arches and your eyes roll back in your head as you twist around the demonic " + Desc.Cock.nounCock(CockType.DOG) + " pounding into you. You shriek as your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(" spasms on the steaming pole that impales it. Another imp shoves his cock in your mouth as you scream, throat convulsing around his cock-head.");
            // (If the character has a cock)
            if (character.torso.cocks.count > 0) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " shoots cum across your belly and into the waiting mouths of the imps licking your crotch.");
            DisplayText("\n\n");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) {
                DisplayText("Imps lick milk from your bloated " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " as your rider milks you.  As one imp drinks his fill, staggering away with a sloshing belly, another steps up to guzzle from your milk-spewing udders.\n\n");
                // Additional nipplefucking scene by Xodin
                if (character.torso.chest.find(BreastRow.FuckableNipples)) {
                    DisplayText("The imp rider grabs the fat folds of one of your nipplecunt's 'labia' and grins mischeviously. He rubs his obscene erection all over the milk stained surface of your nipple-cunt's clit and begins to press the head of his bulbous imp cock into the swollen orifice against the flow of milk. You know no woman in your village could have handled an aroused cock this big, and yet now this imp on your " + Desc.Breast.describeAllBreasts(character) + " is about to ram just such an erection into one of your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s. He tugs and pulls and pulls again on your nipple-cunt's sensitive labia, forcing his cock to push into the flesh of your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + ". Your taut flesh burns with his venom already, and is now violated by the presence of his demonic flesh rod.  ");
                    // [START BREAST SIZE SPECIFIC TEXT]
                    // [IF breastSize <= DD]
                    if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating <= 5) DisplayText("You feel the bulbous head of his cock squeeze further and deeper until it pushes up against your ribs.");
                    // [ELSE IF breastSize > DD]
                    else DisplayText("You feel the unnaturally large erection spear the fat filled depths of your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " until at last the imp has shoved himself in to his hilt. He smiles at the sensation of having his manhood completely engulfed in your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + ".");
                    // [END BREAST SIZE SPECIFIC TEXT]
                    DisplayText("  Back and forth he begins fucking your tit as if it were a regular pussy, and it occurs to you that such a description isn't far from the truth. You gasp in pleasure as a strange kind of minor orgasm ripples through your tit and the taut skin of your mammary feels tighter as the " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " momentarily spasms around the imp's manhood. The horny little demon slaps your nipplecunt's clit in gleeful victory and jumps to the next breast to repeat his lewd fucking on a fresh hole.");
                    DisplayText("\n\n");
                }

            }
            DisplayText("The imp-cock in your throat spasms and its owner rams as deep into you as he can get. He floods your already swollen stomach with inhuman amounts of cum. Again you feel yourself about to black out as the demon pumps jism into you. He pulls out and again you orgasm as you wheeze for air. Another imp forces his cock down your throat as you moan and gasp. Your body shakes in pleasure on the big imp's " + Desc.Cock.nounCock(CockType.DOG) + ".  Tightening his grip on your " + Desc.Hip.describeHips(character) + " the master imp howls and slams his shaft into your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(". His unnaturally huge knot stretches the entrance of your hole, and he hammers into you again. ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("You howl around the imp-cock stretching your throat. The bloated knot opens your hole far beyond anything you've endured before. Your violent thrashing throws the imps off your " + Desc.Leg.describeLegs(character) + " and you kick uselessly, thrashing and bucking as the swollen " + Desc.Cock.nounCock(CockType.DOG) + " plunges deeper into you.");
            // (High corruption)
            else DisplayText("The master imp's bloated knot stretches your entrance and plunges into your hole with a loud <i>pop</i>. Another orgasm hits you as the " + Desc.Cock.nounCock(CockType.DOG) + " rams even deeper into you. You howl around the imp-cock stretching your throat, thrashing and bucking as your orgasm shakes you. Your violent thrashing throws the imps off your legs and you wrap your legs around the big imp, pulling him further into your hole.");
            DisplayText(" The big imp howls again as he cums, each wave of steaming demon-cum stretching his knot and shaft even more. His cum-pumping " + Desc.Cock.nounCock(CockType.DOG) + " is bottomed out deep in your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText("womb");
            // (If the character doesn't have a vagina)
            else DisplayText("guts");
            DisplayText(" and he pumps more jism into you than his balls could possibly hold. Your belly stretches with every blast of cum and you shriek around yet another cock in your throat.\n\n");

            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) DisplayText("The imp riding your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " finally cums, painting your distended fuck-udders with his massive load.  ");
            DisplayText("Your master isn't done with you yet, churning his " + Desc.Cock.nounCock(CockType.DOG) + " knot in your ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(" as he continues to cum. You're pumped full of demon-cum from both ends as one imp shoots his load in your throat and another steps up to take his place. You shake and tremble in your own endless orgasm as the pleasure in your stretched hole blends with the pain of your swollen belly. Your " + Desc.Leg.describeLegs(character) + " thrash as the master imp shifts his massive knot within your monstrously stretched ");
            // (If the character has a vagina)
            if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
            // (If the character doesn't have a vagina)
            else DisplayText(Desc.Butt.describeButthole(character.torso.butt));
            DisplayText(". Your toes curl as you feel more pulses of demon-cum work their way up his shaft and into your already-huge belly.\n\n");

            DisplayText("You pass out as another load of imp-cum pours down your throat, another tidal wave of corrupted jism spews into your hole, to meet somewhere in the middle...\n\n");
            DisplayText("You wake up later, still trembling with small orgasms. Cum burbles in your mouth as you breathe. You haven't moved since you passed out. Your hips are still propped up over the log, and you rest in a cooling pool of cum, your " + Desc.Head.describeHair(character) + " plastered to the ground with drying jism. You couldn't move even if your " + Desc.Leg.describeLegs(character) + " felt stronger. Your hideously bloated belly weighs you down, ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) DisplayText("and your milk-filled udders are still swollen with imp-venom, ");
            DisplayText("quivering with every orgasmic twitch that passes through you. The skin of your distended belly ");
            // (If the character has breasts)
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3) DisplayText("and massive tits ");
            DisplayText("is drum-tight and shiny, and your belly-button has popped out into an outie. As you slip back into unconsciousness, one last thought flits across your mind. ");
            // (Low Corruption)
            if (character.stats.cor < 50) DisplayText("How long can you last in this corrupted land, when your body can be so horribly twisted for the sick pleasures of its denizens?\n\n");
            // (High corruption)
            else DisplayText("Why bother with your silly quest, when you've only scratched the surface of the pleasures this land offers you?\n\n");
            character.orgasm();
            character.stats.lib += 2;
            character.stats.cor += 3;
            character.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.IMP, IncubationTime.IMP - 14)); // Bigger imp means faster pregnancy
            // Stretch!
            if (character.torso.vaginas.count > 0) {
                if (Mod.Vagina.displayStretchVagina(character, imp.torso.cocks.get(2).area, true)) DisplayText("\n");
            }
            else {
                if (Mod.Butt.displayStretchButt(character, imp.torso.cocks.get(2).area, true)) DisplayText("\n");
            }
        }
    }
    return { next: Menus.Player };
}

export function impRapesYou(character: Character, imp: Character): NextScreenChoices {
    DisplayText().clear();
    if ((character.perks.has(PerkType.BimboBrains) || character.perks.has(PerkType.FutaFaculties)) && !character.torso.hips.legs.isTaur() && character.torso.vaginas.count > 0) {
        DisplayImage(ImageName.imp_loss_female_fuck);
        DisplayText("You sink to the ground, assuming a position that feels all too natural to you now, leaning forward to let your " + Desc.Breast.describeAllBreasts(character) + " hang down slightly. The imp looks you up and down, wickedly eyeing your ready, slightly open lips. He drops his loin-cloth to reveal a hardening cock. Your eyes bulge as it grows larger... and larger... and larger! The imp's cock finally bulges to a full twelve inches... and it's moving closer. You struggle to think... but you just can't! You want that in your mouth, like, so bad!\n\n");
        DisplayText("Your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " drips in anticipation, and you find yourself involuntarily moving your knees farther apart to prepare yourself to be filled. He smiles and presses his cock against your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", pushing you back to get a better angle. You try to make words, but your brain can only think of so much at once! Right now, it's thinking of cock, which, naturally, makes you open your mouth and let out a slutty moan.\n\n");

        DisplayText("The imp pushes into you violently, ramming his cock in to the hilt, leaving you gasping in pain and surprise. He leaves it in your slutty pussy, giving you a second to... oh who is he kidding... he can tell by your air-headed look that you've done nothing but take cocks your whole life. He fucks you hard, slapping your " + Desc.Butt.describeButt(character) + " to remind you who is in charge. You can't help but think about, like, how you just love it when a man takes charge. Less thinking!");
        Mod.Vagina.displayStretchVagina(character, 12, true, true, false);
        DisplayText("\n\n");

        DisplayText("The rough fucking becomes more and more pleasurable as time goes on. You moan air-headedly with each thrust, hips squeezing around the demon-cock- loving the feeling of his fullness. Before long you can't help but cum all over him, your vagina locking around his cock like a vice, muscles rippling, milking him for his cum. The imp's prick explodes inside you, pumping huge loads of hot demon-seed inside you with each eruption. You swoon, feeling it fill your womb and distend your belly as the imp's orgasm fills you with insane amounts of cum.\n\n");

        DisplayText("With a sigh, he pulls his dick free, and you flop down, cum leaking out onto the ground from your well-fucked hole. If you could, like, focus at all, you'd totally be worrying about being, like, pregnant or whatever. But you lose consciousness.");
        character.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.IMP, IncubationTime.IMP - 14)); // Bigger imp means faster pregnancy

        character.orgasm();
        character.stats.lib += 1;
        character.stats.sens += 1;
        character.stats.cor += 1;
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    // Lust loss
    if (character.stats.lust >= 100) {
        // 50% chance of sprocket rape for super-thick people.
        if (character.torso.cocks.count >= 1 && randInt(2) === 0) {
            if (character.torso.cocks.get(0).thickness >= 4) {
                return sprocketImp(character);
            }
        }
        // Female or Futa
        if (character.gender === Gender.FEMALE || character.gender === Gender.HERM) {
            character.slimeFeed();
            DisplayImage(ImageName.imp_loss_female_fuck);
            DisplayText("You sink to the ground, too overcome by lust and desire to fight.  The imp smiles, a wicked look glinting in his eyes.  He drops his loincloth to reveal a hardening cock.  Your eyes bulge a bit as it grows...and grows...and grows!  That imp has a twelve inch cock..and he's walking towards you.   Your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " practically juices itself in anticipation, and you find yourself spreading your " + Desc.Leg.describeLegs(character) + " in preparation.");
            DisplayText("\n\nHe smiles and presses his cock against your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  Your lust-driven mind is speechless, leaving you panting and moaning like a whore.");
            // If too big, only partly penetrate.
            if (character.vaginalCapacity() < imp.torso.cocks.get(0).area) {
                if (character.torso.vaginas.get(0).virgin) {
                    DisplayText("  He plunges in hard, breaking your hymen and stealing your virginity.  A look of surprise crosses his face, chased away by ecstasy.  If you had a rational bit left in your mind, you'd notice he looks... stronger somehow, but you're too horny to care.");
                    character.torso.vaginas.get(0).virgin = false;
                }
                else {
                    DisplayText("  He pushes against your tight little pussy, struggling to penetrate you.");
                }
                DisplayText("  His cock only sinks a few inches in, but he begins fucking you hard, each time claiming a bit more of your pussy for his demonic tool.  You feel a painful stretching as he gets half of it inside you, ruining your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " for most humans.  He fucks you like this for what seems like forever, never getting much further. ");
                Mod.Vagina.displayStretchVagina(character, imp.torso.cocks.get(0).area, true);
            }
            else {
                DisplayText("  He plunges in violently, ramming his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " in to the hilt, leaving you gasping in pain and surprise.  He leaves it there, giving you a second to get used to him, and then begins fucking you hard, slapping your ass every few thrusts to remind you who is in charge.");
                Mod.Vagina.displayStretchVagina(character, 12, true, true, false);
            }
            if (character.gender === Gender.HERM) DisplayText("\n\nThe rough fucking becomes more and more pleasurable as time passes, until you cannot help but stroke your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " along with each plunge he takes in your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  You feel yourself clench around him as your sexual organs release, erupting spurts of cum and milking the demon's cock like your life depended on it.");
            if (character.gender === Gender.FEMALE) DisplayText("\n\nThe rough fucking becomes more and more pleasurable as time passes.  You moan loudly and lewdly with each thrust, hips squeezing around the demon-cock, relishing the feeling of fullness.  Before long you cannot help but cum all over him, " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " locking around his cock like a vice, muscles rippling, milking him for his cum.");
            DisplayText("  The imp's " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " explodes inside you, pumping huge loads of hot demon-seed inside you with each eruption.  You swoon, feeling it fill your womb and distend your belly as the imp's orgasm fills you with an unnatural quantity of corrupted semen.\n\nWith a sigh, he pulls his dick free, and you flop back on your back, cum surging out onto the ground from your well-fucked hole.  ");
            if (character.pregnancy.womb.isPregnant()) {
                DisplayText("You wonder what this will do to whatever is growing in your womb...  ");
            }
            else {
                if (character.statusAffects.has(StatusAffectType.Heat)) DisplayText("You find yourself hoping you're pregnant as you swiftly lose consciousness.");
                else if (!character.pregnancy.womb.isPregnant()) {
                    if (character.stats.cor > 75) DisplayText("With an appreciative moan, you bury your fingers in its slimy warmth, hoping you are pregnant with some fiendish offspring, and lose consciousness.");
                    else DisplayText("You hope you don't become pregnant, but promptly lose consciousness before you can contemplate the prospect any further.");
                }
            }
            character.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.IMP, IncubationTime.IMP - 14)); // Bigger imp means faster pregnancy
            character.stats.lib += 1;
            character.stats.sens += 1;
            character.stats.lust += 1;
            character.stats.cor += 1;
            character.orgasm();
        }
        // Male or genderless
        if (character.gender === Gender.NONE || character.gender === Gender.MALE) {
            // Alternate male-only case
            if (character.gender === Gender.MALE && randInt(2) === 0) {
                DisplayImage(ImageName.imp_loss_male_fuck);
                DisplayText().clear();
                DisplayText("Your eyes glaze over with lust as the imp's dark magic destroys your will to continue fighting. You sink to your ");
                if (character.torso.hips.legs.type === LegType.CENTAUR) DisplayText("hocks and knees, your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " hurting from the massive blood pressure caused by your unbridled lust. He approaches you and stops about two feet in front of you, watching with delight your helpless state");
                else DisplayText("knees, pull out your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " and begin mindlessly stroking yourself as the imp approaches you, a wicked grin on his face. Your mind races with thoughts and images of sucking the imp's cock. He approaches you and stops about two feet in front of you, watching with delight as you succumb to your own lust");
                DisplayText(". Your eyes glance down to his waist and see a massive bulge form under his loincloth, the sight of which causes your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " to twitch and begin leaking pre-cum.\n\n");
                DisplayText("The imp drops his loincloth, revealing his huge 12-inch penis, and then forcefully grabs your head and pulls you down on to his hard throbbing demon dick. He shoves his cock past your lips and deep down your throat in one slow, forceful push. You can barely accommodate his huge cock, and yet your lust makes you hunger for more. You cough and gag while the imp proceeds to fuck your mouth hard, slapping his hot balls against your chin, disregarding your need to breathe.  ");
                if (character.torso.hips.legs.type === LegType.CENTAUR) DisplayText("Dropping down to the ground, your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " trembles against your body to the rhythm of the imp's thrusts, leaving your underbelly smeared with its own pre-cum.\n\n");
                else DisplayText("On all fours now, your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " bounces up and down against you to the rhythm of the imp's thrusts, leaving your belly smeared in your own pre-cum.\n\n");
                if (character.torso.balls.size >= 5) DisplayText("Your huge " + Desc.Balls.describeBalls(true, true, character) + " swing heavily against you as well, responding to the force of the imp's thrusts, slapping your own ass and driving your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " even stiffer with lust, the pre-cum pulsing out of your cock in time with the slapping.\n\n");
                DisplayText("You begin to feel light-headed from lack of air just as the imp grips your head firmly and begins making rapid, shallow thrusts down your throat, nearing his orgasm. Suddenly he clenches tight, his claws digging into your head and thrusts down your throat as far as he can, holding his massive cock deep in your stomach. Your eyes go wide as you feel the imp's balls on your chin spasm violently.  His cock pulses in your mouth as the thick demon cum is pumped violently down your throat. It feels like an eternity as the imp continues to fill your guts with his hot cum, his orgasm lasting far longer than any human's. He slowly withdraws his still-pumping cock from you, coating your throat and then mouth with an almost continual spray of his unnaturally hot and sticky demon seed. The imp pulls out of your mouth just in time to splatter your face with his cum before his orgasm stops, coating your lips, nose, eyes, and hair with his incredibly thick and sticky cum.\n\n");
                DisplayText("You fall to the ground gasping, exhausted and unable to move, the demon cum on your face and inside you still burning with intense heat and corruption. You lose consciousness, your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " still firmly erect, your lust not sated.");
                character.stats.lust += 20;
                character.stats.cor += 2;
                character.slimeFeed();
            }
            else {
                character.slimeFeed();
                DisplayText("You sink to the ground, too overcome by lust and desire to fight.  The imp smiles and circles you, dropping his loincloth as he goes.  You are roughly shoved to the ground, your backside slapped hard.  You're too horny to do anything but moan from the pain ");
                if (character.torso.hips.legs.type !== LegType.CENTAUR) DisplayText("as you are disrobed");
                DisplayText(".  As the imp presses a large bulk against your backside, you realize he has a massive penis!\n\nThe imp pushes his " + Desc.Cock.describeCockShort(imp.torso.cocks.get(0)) + " into your ass and fucks you hard, with little regard to your pleasure.  After a rough fucking, he cums, stuffing your ass full of hot demon cum.  His orgasm lasts far longer than any human's, leaving your belly slightly distended.");
                Mod.Butt.displayStretchButt(character, imp.torso.cocks.get(0).area, true, true, false);
                character.stats.lib += 1;
                character.stats.sens += 1;
                character.stats.lust += 1;
                character.stats.cor += 1;
                if (character.stats.sens > 40) {
                    DisplayText("  You manage to orgasm from the feeling of being filled by hot cum.");
                    if (character.gender === Gender.MALE) DisplayText("  You jizz all over the ground in front of you, spraying cum in huge squirts in time with the demon's thrusts.");

                    character.orgasm();
                    character.stats.cor += 1;
                }
                DisplayText("\n\nYou drop to the ground when he's done with you, cum spilling from your abused ass all over the ground, too exhausted to move.  Consciousness fades.  ");
            }
        }
    }
    // HP or insta-loss
    else {
        DisplayText("\n<b>You fall, defeated by the imp!</b>\nThe last thing you see before losing consciousness is the creature undoing its crude loincloth to reveal a rather disproportionately-sized member.");
    }
    return { next: Scenes.camp.returnToCampUseOneHour };
}

// noogai McNipple-holes
function noogaisNippleRape(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("You slowly walk over to the masturbating imp, your " + Desc.Hip.describeHips(character) + " and " + Desc.Butt.describeButt(character) + " swaying suggestively with every step.\n\n");

    DisplayText("Shedding your clothes you push the imp to the ground and straddle him, keeping his hands away from his twitching pecker while you quickly tie him up with his own loincloth.  The lust-addled demon utterly incapacitated, you start to use both of your hands to toy freely with your slimy nipple-holes, as well as your ");
    if (character.torso.cocks.count > 0) DisplayText(Desc.Cock.describeCock(character, character.torso.cocks.get(0)));
    if (character.torso.cocks.count > 0 && character.torso.vaginas.count > 0) DisplayText(" and ");
    if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)));
    else if (character.gender === Gender.NONE) DisplayText(Desc.Butt.describeButthole(character.torso.butt));
    DisplayText(".\n\n");

    DisplayText("You gently insert a single digit into one of your nipple-cunts, ");
    if (character.lactationQ() >= 1000) DisplayText("unleashing a torrent of thick, creamy milk and ");
    // (if regular milky;
    else if (character.lactationQ() >= 50 && character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1) DisplayText("releasing a steady trickle of warm milk and ");
    DisplayText("lust-induced sex juice onto the imp's lap; your other hand instinctively moves down to stroke your ");
    // ((if male/herm;
    if (character.torso.cocks.count > 0) {
        DisplayText("rock-hard cock");
        if (character.torso.vaginas.count > 0) DisplayText(" and ");
    }
    if (character.torso.vaginas.count > 0) DisplayText("dripping wet pussy");
    if (character.gender === Gender.NONE) DisplayText(Desc.Butt.describeButthole(character.torso.butt));
    DisplayText(", teasing him with a lewd moan as your head rolls back in sexual ecstasy.");
    if (User.settings.silly()) DisplayText("  The imp is sickened, but curious.");
    DisplayText("\n\n");

    DisplayText("You continue finger-fucking your nipple, becoming more and more aroused as the imp gets harder and harder from watching the exotic display before him.  You soon tire of watching the imp squirm beneath you, desperate for sexual relief; you slowly move your hand away from your groin, reaching down towards his crotch, and start to toy with his apple-sized balls, fondling and squeezing them roughly.  You casually slip a second finger into your wet nipple-hole, stretch it out teasingly, and hold the gaping orifice in front of the imp's face, giving him a good view of the inside of your freakish, wet nipple-cunt.\n\n");

    // (If corrupt:
    if (character.stats.cor >= 66) {
        DisplayText("\"<i>Mmm, wouldn't you just love to stick your fat cock into this sopping wet hole, and cum deep inside my " + Desc.Breast.describeChest(character) + "?</i>\"  You whisper huskily into his ear, sliding your fingers away from his balls and up along the underside of his aching dick, teasing every inch of it until you reach his swollen head and start rubbing your finger around his glans in small circles.  The imp is panting heavily, his eyes firmly locked on your ");
        // (if normal)
        if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier < 1) DisplayText("wet");
        // (if lactating)
        else DisplayText("milky");
        DisplayText(", bucking his hips upwards in desperation.\n\n");
    }
    DisplayText("Deciding that the poor bastard has suffered enough, you guide your stretched " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + " down to his quivering member and hold it over the tip for a moment.  The imp groans in frustration, feeling the heat of your slutty juices dripping down onto his aching rod and overfull testes, making him even more desperate to drive deep into your waiting breast.  Without warning, you forcefully shove your breast onto his swollen fuckstick, ");
    if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating <= 4) DisplayText("bottoming out halfway on his immense dick.");
    else DisplayText("only stopping when the flesh of your immense mammary bumps into his quaking ballsack.");
    DisplayText("\n\n");

    DisplayText("You shudder in ecstasy as you rise off of his drenched girth; your nipple-hole is slick with arousal, making it easier for you to slide back down until ");
    // ((if breast size below D)
    if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating <= 4) DisplayText("you feel his swollen cock bottom out, your petite breast unable to swallow any more of his throbbing maleness");
    // ((over D)
    else DisplayText("his swollen cock and desperately filled balls are entirely engulfed in tit-flesh");
    DisplayText(".  Eventually the imp starts timing his thrusts with your movements, and soon the two of you are working in a steady rhythm - thrust, retract, thrust, retract.  Minutes go by as the rhythm slowly builds towards a crescendo, with the only sounds being the lewd schlicking noise of your breast servicing the imp's rod, and the odd moan escaping your lips.  While one hand is furiously jilling off your vacant nipple-slit, the other one is furiously");
    // [(if male)
    if (character.torso.cocks.count > 0) DisplayText(" pumping your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)));
    // (if female)
    else if (character.torso.vaginas.count > 0) DisplayText(" fingering your hungry baby tunnel");
    else DisplayText(" fingering your tingling anus");
    DisplayText(".\n\n");

    DisplayText("Eventually the rhythm becomes more sporadic as you and the imp approach climax; your tongue rolls out of your open mouth and your toes curl as you feel the imp spasm violently inside you, letting an endless stream of his searing spunk pour directly into your " + Desc.Breast.describeChest(character) + ".  The intense heat pushes you over the edge and ");
    // (if dick)
    if (character.torso.cocks.count > 0) {
        DisplayText("a ");
        // [(cum production < 500ml)
        if (character.cumQ() < 500) DisplayText("jet ");
        // (cum production 500-1000ml)
        else if (character.cumQ() < 1000) DisplayText("geyser ");
        // (cum production > 1000ml)
        else DisplayText("volcano ");
        DisplayText("of cum sprays from your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " and splatters over both you and the hapless imp");
        if (character.torso.vaginas.count > 0) DisplayText(", while ");
    }
    if (character.torso.vaginas.count > 0) {
        DisplayText("your pussy juices spurt out as your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " twitches in orgasm");
    }
    if (character.gender === Gender.NONE) DisplayText("your asshole clenches tight on your finger");
    DisplayText(".\n\n");

    DisplayText("You collapse heavily on top of the imp, once again impaling your breast on his still-erect cock.  You lie like this for a few moments until you notice that the imp has dozed off, exhausted by the whole ordeal.  You stand up woozily as a mixture of ");
    // (if lactating)
    if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1 && character.lactationQ() < 40) DisplayText("milk, ");
    DisplayText("fem-spunk and hot demon cum leaks out from your gaping nipple-cunt.\n\n");

    // (if corruption > 60)
    if (character.stats.cor > 60) DisplayText("You thrust your digits into your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + " once more, scooping out as much imp jizz as you can reach.  You happily drink up the thick goo, savoring the cloying taste before quickly getting dressed and leaving the imp to slumber.");
    // (continue to non-corrupt text)
    // (if not)
    else DisplayText("You quickly get dressed and leave the imp to his slumbering, his hands still tied together by his loincloth.");
    // Gain xp and gems here
    character.orgasm();
    character.stats.sens += -3;
    character.stats.cor += 1;
    return { next: Scenes.camp.returnToCampUseOneHour };
}

function putBeeEggsInAnImpYouMonster(character: Character): NextScreenChoices {
    DisplayText().clear();
    // IMP EGGS
    // (functions for bipedal bee morphs.  At time of writing, unsure as to whether bee abdomen worked for centaur/naga/goo forms)
    DisplayText(ImageName.imp_egg);
    DisplayText("You glance down at the masturbating imp, feeling a twitch in your swollen, insectile abdomen.  As the red-skinned homunculus writhes on the ground, beating his meat, you smile, feeling a globule of sweet nectar oozing out of your ovipositor.");

    DisplayText("\n\nHe’s too busy humping the air and stroking himself to notice you hooking the tip of one of your [feet] under him.  You kick up one of your [legs], flipping the fapping imp over.  He gasps as he lands face-down on the ground, startled enough to stop jerking his tool.");
    DisplayText("\n\nYou grin, straddling his surprisingly perky ass, resting your [hips] on his small, round cheeks.  With your arms pinning down his shoulders, he can’t stroke himself, and he whimpers at the restraint.");

    DisplayText("\n\n\"<i>Wait - what’s going on?</i>\" he gasps.");

    DisplayText("\n\nYou deign not to answer him, lost in the unique sensation of your abdomen curling behind you.  You toss your head back, luxuriating in the pleasure of your black ovipositor emerging against smooth, glossy skin of the imp’s ass.");

    DisplayText("\n\n\"<i>No, nooooooo...</i>\" whimpers the imp as you bite your lip, pushing the tip of your organ into his surprisingly pliant hole.");

    DisplayText("\n\nYou and the imp shudder in tandem as your sweet honey smears between his cheeks, oozing down his crack as you squeeze your throbbing ovipositor further and further into him.  Buried deep in his bowels, you feel the first of your eggs push through your rubbery organ, stretching out your tube along with his asshole.");

    DisplayText("\n\nAs you lay your first egg inside the imp, he gurgles, face-down against the ground, and you feel him tighten around your ovipositor.  The imp wriggles beneath your body and by the slowly-spreading pool of steaming cum; you guess that he just climaxed.");

    DisplayText("\n\nThe imp pants, trying to catch his breath as you twitch your abdomen, adjusting your ovipositor inside him.  Before he can recover, you push another egg down your tube, implanting it deep in the imp alongside the first egg.");

    DisplayText("\n\n\"<i>Suh-stop...</i>\" groans the imp even as you push a third egg into his tiny body.  But you’re beyond stopping.  Egg after egg, you fill his twitching body.  The pool of cum grows, and it oozes around your ");
    if (character.torso.hips.legs.isGoo()) DisplayText("rippled goo edges");
    else if (character.torso.hips.legs.isNaga()) DisplayText("trembling coils");
    else DisplayText("straddling knees");
    DisplayText(" as you turn the imp into your own, function incubator.");

    DisplayText("\n\nAfter a handful of eggs, you grunt, realizing that you’ve run out of room inside the imp.  Tilting your head to one side, you consider that the imp is face-down, and that his stomach might need more room to stretch.  You rise halfway up and flip him over beneath you, careful to leave your ovipositor still buried inside him.");

    DisplayText("\n\nThe imp’s eyes are almost completely rolled back in his head, his flat chest smothered with his own spunk.  His breathing is ragged, and his hard, massive cock is slathered with thick, white cum.  His belly already bulges slightly with your eggs and his small hands move to clutch at his stomach, giving him the look of a debased, pregnant mother.");

    DisplayText("\n\nThat realization is enough to stimulate your ovipositor again.  With a groan, you plant your hands on the ground to either side of his head, on your knees as your ovipositor pumps another egg into the imp’s bowels.  The imp shudders as his belly swells, filling with your brood.");

    DisplayText("\n\n\"<i>More... more!</i>\" moans the imp beneath you.  You oblige, and ");
    if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) {
        DisplayText("his tiny claws grab your ");
        if (character.torso.chest.count > 1) DisplayText("first row of ");
        DisplayText(Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + ", squeezing your tits as you fuck him full.");
        if (character.lactationQ() >= 500) DisplayText("  Rivulets of your milk run down his forearms as he inexpertly milks you.");
    }
    // [If cock:
    else if (character.torso.cocks.count > 0) DisplayText("the rise of his swollen belly soon presses against [oneCock] and the rhythm of your thrusts strokes his shiny red stomach against your sensitive organ.");
    else if (character.torso.vaginas.count > 0) DisplayText("the imp’s tiny, clawed feet scrabble against you as he flails in pleasure.  By mistake, one slips between the lips of your pussy, small toes wriggling against your inner walls, and you instinctively push down against the small limb, fucking yourself with his foot.");
    else DisplayText("you feel a firm pressure at your [asshole] as the tip of the imp’s lashing tail prods frantically against you, manically shoving in and out of your [asshole].");

    DisplayText("\n\nYou groan, climaxing against the imp, just as he lets out another gout of hot seed from his cum-smeared dick.  He spatters your front, his spunk mingling with your fluids, shuddering as he takes the last of your eggs inside him, his belly swollen to the size of a beach ball.");

    DisplayText("\n\nYou pant heavily, and with a messy squelching, you pull yourself out of the imp, pushing yourself up from your crouched position.  A gush of honey pours from the imp’s ass, cutting off quickly as an egg rolls into place from the inside, stopping up your imp-cubator.");

    DisplayText("\n\nYou hear a strange noise from the imp, one that sounds strangely like a giggle.  You glance down at him, instinctively evaluating him as a bearer of your eggs.  The imp is still panting, looking up at you from under his messy, black hair.  With a flushed, submissive expression and swollen, pregnant belly, the imp seems almost... cute?  He cradles his massive, egg-filled belly, caressing it, then looks back to you, blushing.");

    DisplayText("\n\nYou blink then stand up.  You shake your head as you walk away, chalking the odd thoughts up to your egg-laying instincts.  Some of these mutations have some weird effects, after all...");
    character.orgasm();
    character.stats.sens += -1;
    character.pregnancy.ovipositor.dumpEggs();
    return { next: Scenes.camp.returnToCampUseOneHour };
}
