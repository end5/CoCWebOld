import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { CombatManager } from '../../Combat/CombatManager';
import { Desc } from '../../Descriptors/Descriptors';
import { NextScreenChoices } from '../../ScreenDisplay';
import { Scenes } from '../Scenes';

// IMP LORD
export function impLordEncounter(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("A large corrupted imp crosses your path. He flashes a cruel smile your way.  No way around it, you ready your " + character.inventory.equipment.weapon.displayname + " for the fight.");
    return CombatManager.beginBattle(character, undefined, [new ImpLord()]);
}

// Rewards
// +20 XP
// +7-15 Gems
// Common Drops: Imp Food & Incubus Draft
// Rare Drops: LaBova & Minotaur Blood
export function defeatImpLord(character: Character, imp: Character): NextScreenChoices {
    DisplayText().clear();
    if (imp.stats.HP < 1) {
        DisplayText("The greater imp falls to the ground panting and growling in anger.  He quickly submits however, the thoroughness of his defeat obvious.  You walk towards the imp who gives one last defiant snarl before slipping into unconsciousness.");
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    else {
        DisplayText("The muscular imp groans in pained arousal, his loincloth being pushed to the side by his thick, powerful dick.  Grabbing the useless clothing, he rips it from his body, discarding it.  The imp's eyes lock on his cock as he becomes completely ignorant of your presence.  His now insatiable lust has completely clouded his judgment.  Wrapping both of his hands around his pulsing member he begins to masturbate furiously, attempting to relieve the pressure you've caused.");
        // Leave // Rape]
        menu();
        if (character.stats.lust >= 33) MainScreen.addButton(0, "Sex", sexAnImpLord);
        MainScreen.addButton(9, "Leave", cleanupAfterCombat);
    }
}
export function loseToAnImpLord(character: Character): NextScreenChoices {
    DisplayText().clear();
    if (character.torso.vaginas.count > 0 && (character.gender === Gender.FEMALE || randInt(2) === 0)) getRapedAsAGirl();
    else if (character.torso.cocks.count > 0) loseToImpLord();
    else {
        DisplayText("Taking a look at your defeated form, the imp lord snarls, \"<i>Useless,</i>\" before kicking you in the head, knocking you out cold.");
        character.takeDamage(9999);
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
}

// Rape
function sexAnImpLord(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("You grin evilly and walk towards the defeated corrupted creature.  He doesn't take notice of you even though you're only inches away from him.  You remove your [armor] slowly, enjoying the show the imp is giving you.  But soon it's time for you to have fun too.");
    // (No line break)
    // if(character doesn't have centaur legs)
    if (!character.torso.hips.legs.isTaur()) DisplayText("  You grab his hands, removing them from his " + imp.cockDescriptShort(0) + ". This gets his attention immediately, and you grin widely, pinning him to the ground.");
    else DisplayText("  You place one of your front hooves on his chest, knocking him onto his back.  He attempts to get back up, but you apply more pressure to his thick, manly chest, until he gasps.  The imp gets the idea quickly and stops masturbating, all of his focus now on you.");

    menu();
    // Continues in, Male Anal, Female Vaginal, or Breastfeed
    MainScreen.addButton(9, "Leave", cleanupAfterCombat);
    if (character.stats.lust >= 33) {
        if (character.torso.cocks.count > 0 && character.torso.cocks.filter(Cock.CockThatFits(imp.analCapacity())).length >= 0) MainScreen.addButton(0, "FuckHisAss", impLordBumPlug);
        if (character.torso.cocks.count > 0) MainScreen.addButton(1, "Get Blown", getBlownByAnImpLord);
        if (character.torso.vaginas.count > 0) MainScreen.addButton(2, "Ride Cock", femaleVagRape);
        if (character.perks.has(PerkType.Feeder)) MainScreen.addButton(3, "Breastfeed", feederBreastfeedRape);
    }
}

// MALE ANAL
function impLordBumPlug(character: Character, imp: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText(images.showImage("implord-win-male-fuck"));
    let x: number = character.torso.cocks.filter(Cock.CockThatFits(imp.analCapacity());
    if (x < 0) x = character.torso.cocks.sort(Cock.SmallestCockArea)[0];
    DisplayText("You grab the muscular creature by one of his long pointed ears, pulling him to his feet. He protests slightly, and gives a slightly defiant snarl of discomfort.  Lucky for him you're in a forgiving mood and ignore his whining.");
    // (No line break)
    if (character.tallness < 72) {
        DisplayText("  You give a powerful shove and push the imp to his knees.");
    }
    DisplayText("  You pull the imp's head towards your [hips], forcing his lips against the base of your " + Desc.Cock.describeCock(character, x) + ".  The imp quickly gets the idea and begins to lick and suckle at your " + character.cockHead(x) + " expertly.");

    DisplayText("\n\nYou pet the top of his smooth head encouragingly, his tongue quickly soaking your length in saliva.  With little encouragement, the imp begins to take your " + Desc.Cock.describeCock(character, x) + " into his mouth, focusing on milking the head of its delicious precum.  You soon remember what you'd intended to do with the little cock slut, and push him away from your length.  You could swear the imp whimpered in response to this, which makes you grin.");

    DisplayText("\n\nYou spin your finger around, signaling the imp to turn around.  His eyes widen in response, clearly understanding what you have intended.  He nervously obeys, spinning around and even crouching forward. The invitation looks incredibly tempting, his hole looks fairly well used but your arousal keeps you from complaining.");

    DisplayText("\n\nYou drape your " + Desc.Cock.describeCock(character, x) + " between the imp's butt cheeks.  Teasingly you begin thrusting between the muscular cleft of his ass, much to the creature's dismay.  The greater imp whines submissively, desperate for you to enter him.  His " + imp.cockDescriptShort(0) + " drools as you tease his ass, creating a small puddle of pre between his hooves.  The poor creature becomes so desperate that he reaches back and spreads his muscular cheeks with his hands.  You catch a small glimpse of his now gaping hole as your cock continues to slide between his cheeks.  You tease him with one last empty thrust, before grabbing his shoulders and forcing your " + Desc.Cock.describeCock(character, x) + " deep inside the poor creature.");

    DisplayText("\n\nThe imp loses control immediately and nearly collapses from the massive orgasm.  His large, corruption-bloated balls clench up, and semen floods out of his " + imp.cockDescriptShort(0) + " like a fountain.  The hot demon seed puddles around his feet, soaking the ground in his thick boy-goo.");

    DisplayText("\n\nHis orgasm also cause his anus to tighten and spasm around your " + Desc.Cock.describeCock(character, x) + ", as if he was milking you of your seed.  Unable to resist, you start plunging yourself rapidly in and out of the spasming hole.");
    // (No line break)
    if (character.torso.balls.quantity > 0) {
        DisplayText("  You feel the slapping of your [balls] against the imp's, a sensation that only spurs you on, causing you to slam into him over and over wildly.");
    }
    if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1 && character.lactationQ() >= 200) {
        DisplayText("  You give a desperate groan, and grab one of your [chest] roughly.  You pinch and massage your ");
        if (character.torso.chest.averageNipplesPerBreast() > 1) DisplayText("[nipples]");
        else DisplayText("[nipple]");
        DisplayText(", making you moan in ecstasy and leak milk, quickly soaking your chest.");
    }
    // if(character has Fertility perk && character.torso.balls.quantity >= 4)
    if (character.torso.balls.quantity >= 4) {
        DisplayText("\n\nAs much as you would love to continue the pleasure you can't last any longer.  You howl in intense pleasure and cum.  Your [balls] tighten against your body, and empty their contents. Your " + Desc.Cock.describeCock(character, x) + " pulses and spasms, releasing wave and wave of semen into the greater imp's belly.  The pleasure is intense, and almost painful as your cum.");
        // if(character is a herm)
        if (character.gender === Gender.HERM) DisplayText("\n\nAs your " + Desc.Cock.describeCock(character, x) + " erupts, your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " tenses up tightly, spasming, desperate to be filled.  After a moment your girl juice begins to soak your inner thighs.  Your legs begin to tremble from the intensity of it all, and you question if you'll be able to make it back to your camp after this.");

        DisplayText("\n\nThe imp howls as his ass is flooded with cum.  His stomach begins to expand from the sheer amount of fluid you pump into him, and the sensation of being over filled causes the poor creature to cum a second time, spilling more semen into the already massive puddle.  His " + imp.cockDescriptShort(0) + " pumps wave after wave of corrupt seed onto the ground, soaking his hooves even further.");

        DisplayText("\n\nYou're sure you must have blacked out at some point as you feel the last of your seed force its way out of your " + Desc.Cock.describeCock(character, x) + " and into the imp's demon belly.  You wobble slightly and lean down, grabbing the ragged remains of the imp's loincloth.  Weakly you pull out of the demon's hole, and quickly stuff the cloth in its place as a makeshift plug.");

        DisplayText("\n\nThe imp collapses face first into his thick cum puddle before rolling over.  Now soaked in his own cum the imp gently rubs his bulging belly, feeling your seed slosh around inside him.  He gives a contented sigh and passes out in his puddle of cum.");
    }
    else {
        DisplayText("\n\nSlamming your [hips] into the imp's muscular ass a few more times is all it takes you send you over the edge. Thinking quickly, you pull out completely.  Smashing your hips together one last time, you hot dog your " + Desc.Cock.describeCock(character, x) + " between the two muscular mounds.  You let out a howl of pleasure as you spill your seed across the imp's backside.  The orgasm is so intense that several ropes of semen land across the imp's bald skull.");

        DisplayText("\n\nAt the end of your orgasm, the poor creature is coated with your seed, marking him as the slut he is.  You release the exhausted imp and he falls forward into the puddle of his own semen.  The imp doesn't seem finished however, his " + imp.cockDescriptShort(0) + " is still hard, throbbing and drooling pre like a faucet.  The poor thing begins to jerk himself off feverishly, using his earlier spilled cum as a lubricant.  You consider staying for another round, but decide against it when your [legs] begin to wobble from exhaustion.");
    }
    DisplayText("\n\nYou stumble slightly as you gather up your [armor], and begin to get dressed.");
    character.orgasm();
    character.stats.cor += 1;
    return { next: Scenes.camp.returnToCampUseOneHour };
}

// MALE BLOW
function getBlownByAnImpLord(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText(images.showImage("implord-win-male-bj"));
    DisplayText("You lay your [cock biggest] along the demon's muscular chest.  Thrusting experimentally, your [cock biggest] leaves a thick trail of precum across the imp's cheek.  You begin to moan as you continue your casual thrusting across the imp's body.  The defeated creature squirms under you in protest, oblivious to the fact that the squirming is only increasing your stimulation.  It doesn't take you long to coat the imp's face and part of his chest in your thick precum.  Casually stepping back, you look at the imp from top to bottom, and back again.  You can't help but chuckle at what you see.");

    DisplayText("\n\nYour scent has overwhelmed the imp, his thick red dick is painfully hard and dripping, while he pants like a dog.  No longer being pinned down seems to have improved his mood however as he gets to his knees and crawls back towards your [cock biggest].  The imp sits between your [feet] and looks up at you nervously.");

    DisplayText("\n\nYou let yourself stare at the imp coldly for several long moments before smirking and giving a nod of approval.  Approval that the imp is more than happy to have. He places both his clawed hands around your [cock biggest] and pulls your [cockHead biggest] into his mouth, expertly suckling the tip.  His hands work up and down your length, rubbing and massaging all the right places. You moan happily as the demon works his magic.");

    // [pg]
    DisplayText("\n\n");
    // if(cock thickness < 7)
    if (character.torso.cocks.list[character.torso.cocks.sort(Cock.LargestCockArea)[0]].cockThickness < 7) {
        DisplayText("The imp begins to swallow more and more of your length, taking several inches before pulling back.  He twists his head and tongue worships your [cock biggest] with his mouth.  His tight mouth tightens more and relaxes as he swallows more of your precum.");
        if (character.torso.balls.quantity > 0) DisplayText("  His hands move down towards your [balls].");
        DisplayText("\n\n");
        // if(balls > 0)
        if (character.torso.balls.quantity > 0) {
            DisplayText("The demon gropes and massages your [sack] roughly, forcing a large squirt of precum to shoot down his throat.  He swallows the treat happily and continues his cruel groping of your [balls].  His hands work wonders of your [sack], milking your [balls] in a way you didn't know possible.  It's clear he's done this many times before and is an expert of pleasuring males.  You chuckle between your moans, you definitely made a good choice with this one.\n\n");
        }
        // else if(balls === 0)
        else DisplayText("The demon seems to be searching for your testicles, but when he doesn't find anything, he moves his hand a bit further.\n\n");

        // if(hasVagina)
        if (character.torso.vaginas.count > 0) DisplayText("A pair of fat red fingers slip into your [vagina] making you gasp in surprise, and clench your walls around the intruders.  After a moment, you relax as those clawed fingers scratch and rub your walls in a way you didn't know possible.  You groan loudly as you draw closer and closer to orgasm.");
        else DisplayText("Two fat red fingers force their way into your [asshole] making you yelp in surprise.  The surprise turns quickly to pleasure as those fingers dance along your insides, massaging places you didn't know you had.  You might have been annoyed at the imp for the advancements if it hadn't felt so good.  You can't help but pant in ecstasy while those clawed fingers gently scratch at your prostate, drawing you closer and closer to orgasm.");
    }
    // else if(cock thickness >= 7)
    else {
        DisplayText("Though you're far too thick to fit any further into the imp's mouth, it doesn't stop him from trying.  The crimson demon works your length in every way he can.  His hands rub up and down your length.  You admire the effort as the little demon tries to fit more of your [cockHead biggest] into his mouth.  It soon becomes clear to the imp however, that that's not possible.  He pulls back off your length, his hands still rubbing up and down your shaft.  He looks at your cock slit, and presses his lips to it, forcing his tongue into your leaking urethra.  You yelp in surprise as the wet muscle makes its way shockingly deep into your [cock biggest].  His muscular hands work your length furiously while his tongue abuses your insides.  It doesn't take a lot of that treatment to have you teetering on the edge of orgasm.");
    }

    DisplayText("\n\nThe little demon continues to work your length for a few moments before you reach your limit. You howl in ecstasy, thrusting forward into the imp's tight mouth.");

    // if(cumNormal or cumMedium)
    if (character.cumQ() < 500) DisplayText("  You cum hard, easily filling the imp's hot mouth.  He swallows your load just as easily, grinning as he suckles your [cockHead biggest] happily.  He suckles for a few minutes, getting the last few drops of seed before letting your [cock biggest] drop from his mouth with a soft pop.");
    // if(cumHigh)
    else if (character.cumQ() < 1000) DisplayText("  You cum painfully hard, filling the demon's mouth beyond what it can hold.  Surprisingly the imp manages to swallow almost all of your spunk anyways, only allowing a little bit of his meal to dribble past his lips.  He pulls back and gives your [cock biggest] a few last licks, cleaning up any left over seed.");
    // if(cumVeryHigh or cumExtreme)
    else DisplayText("  Cum floods out of your urethra like a faucet, quickly filling the imp's tight mouth regardless of how fast he tries to swallow.  You step back, your length popping out of the demon's mouth.  The imp acts quickly, shutting his eyes and opening his mouth wide, as your seed splatters his face, chest and tongue.  Your [cock biggest] spasms from the powerful orgasm, quickly coating the imp in your hot spunk.  It takes several minutes for your orgasm to end, you manage to look at the cum soaked imp as he begins wiping your cum up with his hands.  His muscular hands don't stay cum soaked for long as he begins suckling each finger and licking his palms.");

    DisplayText("\n\nYou gather your things and put your [armor] back on before turning to leave.  You chance one last glance back at the defeated imp. You notice him laying down on his back, his hands working his own still hard length furiously.  You head back for camp and allow the imp to enjoy the afterglow of his meal.");
    character.orgasm();
    character.stats.cor += 1;
    return { next: Scenes.camp.returnToCampUseOneHour };
}

// FEMALE VAGINAL
function femaleVagRape(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText(images.showImage("implord-win-female-fuck"));
    DisplayText("With little ceremony you grab the imp's " + imp.cockDescriptShort(0) + " and begin to jerk your hand up and down roughly.  The little muscular beast begins to whine loudly, in protest to the rough and likely painful mistreatment of his " + imp.cockDescriptShort(0) + ".  In spite of the protests, the rough treatment goes over well, as the creature begins to leak hot demon pre across your hand, which you smear across the shaft as a natural hot lube.");
    DisplayText("\n\nLicking your lips, you squat above the little demon, positioning your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " above the thick log of meat.  You stay still for a moment, and question if this was a good idea.  The demon was so thick you hadn't even been able to fit your hand around his shaft.  There was little chance you'd get out of this without some rather rough stretching, but the scent of the demon's arousal, and your corrupt lust spur you onwards.");

    DisplayText("\n\nYou lower yourself, slowly, watching as the head of the demon's " + imp.cockDescriptShort(0) + " begins to spread your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  You begin to pant as you're stretched wide; you can hardly believe you can take him.  It takes you several minutes of steady, shallow, downward thrusts before the imp is completely hilted inside of your body.  You sit still for a moment to adjust to the intense sensation. The muscular creature doesn't seem to mind, as his tongue is hanging slightly out of the side of his mouth, panting like a dog.");
    character.displayStretchVagina(imp.torso.cocks.get(0).area, true, true, false);

    DisplayText("\n\nAs you adjust, you get a devilish idea.  Both your hands gently begin to massage the imp's muscular abs and chest; before taking each of his fertite-pierced nipples between your fingers.  You pinch and tug upwards, roughly playing with his sensitive nipples.  The imp instinctively bucks his hips, slamming into you roughly, making you yelp and clench your [vagina] around his " + imp.cockDescriptShort(0) + ".");

    DisplayText("\n\nIt takes a moment, but the pleasure of that begins to wash over you in a heavenly wave.  You continue to roughly tease the imp's nipples, causing him to buck upwards into your waiting womb instinctively.  Neither of you complain as the sensation is incredibly intense, and well worth the slight bit of discomfort.");

    if (character.torso.cocks.count === 1) {
        if (character.torso.cocks.get(0).length < 8) {
            DisplayText("\n\nThe intense stimulation causes your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " to begin leaking pre across the imp's stomach.  You remove one hand from the imp's nipples to pay attention to your aching " + Desc.Cock.nounCock(CockType.HUMAN) + ".  As you begin jerking yourself off, more and more pre puddles on the imp's abs.  Your pre begins to pool in and overflow from the imp's tight belly button.");
        }
        else if (character.torso.cocks.get(0).length <= 16) {
            DisplayText("\n\nThe intense stimulation causes your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " to begin leaking pre across the imp's chest.  You remove one hand from the imp's nipples to pay attention to your aching " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ".  As you begin jerking yourself off, more and more pre drips across the imp's aching nipples, your pre a warm relief for the tender abused teats.  The warmth of your juice across his chest makes the little demon moan and buck harder into your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".");
        }
        else {
            DisplayText("\n\nAs your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " is pounded relentlessly, your rock hard " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " slaps the imp in the face, each time leaving another trail of pre in its wake.  The imp's arousal only intensifies from this, and he's soon lapping and suckling at your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ", expertly trying to get you off.");
            DisplayText("\n\nIt's not long before the imp's face is soaked in your pre, and thanks to the imp's oral ministrations your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " is now leaking pre continually. It's only a matter of time before you blow now.");
        }
    }
    else if (character.torso.cocks.count > 1) {
        DisplayText("\n\nAs you continue your cruel torture of the imp's now bruised nipples, he reaches up both of his hands and takes hold of your " + Desc.Cock.describeMultiCockShort(character) + ".  The imp feverishly masturbates your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " and " + Desc.Cock.describeCock(character, 1) + " as he thrusts into your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  The intense stretching of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " by the " + imp.cockDescriptShort(0) + " sends waves of pleasure coursing through you, straight into your " + Desc.Cock.describeMultiCockShort(character) + ", which are now leaking precum profusely onto the imp's muscular body.");
    }
    DisplayText("\n\nYou give one final rough tug on the imp's nipples, and that's all he can handle.  His cock spasms inside your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " and erupts, sending wave after wave of hot, demon cum into your womb. His tainted testes spasm in their taut sack, continuing to pour their contents into you, until your belly is swollen and full of the hot seed.  You gasp in pleasure, unable to fight the pleasure of being filled so thoroughly.  Your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " spasms, and you clench around the " + imp.cockDescriptShort(0) + " inside of you, as your girl juices begin to flow out of you with your earth shattering orgasm.");

    if (character.torso.cocks.count === 1) {
        DisplayText("\n\nWith your orgasm, your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " erupts, sending waves of boy goo across the imp's already drenched body.  The imp mewls as your seed spills across his masculine body, marking him as the bitch he is.  He leans forward and takes your cock into his mouth, suckling what's left of your orgasm out of you.  The imp drinks down all the cum he can. His mouth feels so hot, you don't really want it to end, but soon the orgasm settles down and you come back to reality from your lust induced euphoria.");

        DisplayText("\n\nThe imp gives you a lewd smirk and licks his lips of your boy cum.  You chuckle and give the imp a light smack on his cum soaked chest.");
    }
    else if (character.torso.cocks.count > 1) {
        DisplayText("\n\nAs you ride out your orgasm the crafty imp pulls your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " and " + Desc.Cock.describeCock(character, 1) + " towards his mouth. Locking his lips around the tips of your two cocks, he suckles down every last drop of your jizz they offer.  You begin to mewl and whine in desperation as your orgasm seems to last an eternity.  The imp's skilled tongue and cock manage to work all of your favorite and most sensitive spots, sending you into complete euphoria.  Once your orgasm begins to settle the imp pulls back allowing the last few strings of semen to splatter across his face.");
    }
    DisplayText("\n\nAfter a few moments of recovery, you slowly lift yourself off the imp.  Cum rushes out of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " and you clamp your muscles down as best as you can to keep the warm substance inside of you.  You give your swollen, cum-filled belly a motherly rub, before gathering your [armor].");
    character.orgasm();
    character.stats.cor += 1;
    character.slimeFeed();
    return { next: Scenes.camp.returnToCampUseOneHour };
}

// FEEDER BREASTFEED RAPE
export function feederBreastfeedRape(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText(images.showImage("implord-win-female-breastfeed"));
    DisplayText("Standing over the fallen creature you lean forward and grab him by the horns, forcing his face against your [chest].  He protests wildly for a few moments, until you tire of this game.  Pushing him back to the ground, you step on his chest, keeping him pinned.  You start massaging your [nipple] and quickly feel your corrupt milk building up.  Timing things just right, you pinch your [nipple] one last time, causing a small eruption of milk to shoot out, just as you give the imp a swift kick to the gut.");

    DisplayText("\n\nThe kick knocks the wind out of the little demon, causing him to gasp.  His mouth opens just long enough and wide enough for the corrupt milk to go straight down his throat.  The reaction is almost instant; his eyes go wide with horror and disgust, but quickly change to awe and desire.  The poor thing tries to get up from under you but can't escape.");

    if (character.tallness > 48 && character.tallness < 60 && character.torso.hips.legs.type !== LegType.CENTAUR) {
        DisplayText("\n\nYou allow the creature to stand, and lay back on the ground, patting your [chest] gently.  The aroused greater imp takes the hint, and crawls on top of you.  He quickly takes a [nipple] into his hungry waiting mouth.  He suckles gently, expertly milking you of your corrupt milk.  He's so good at it, you suspect he's done this several times before.  After a few minutes, he moves over to your next breast.  As he does you can feel his still rock hard, " + imp.cockDescriptShort(0) + " poking at your nether regions.");

        DisplayText("\n\nYou grin, getting a wicked idea likely due to the pleasurable haze breastfeeding has given you.  You wrap your lower body around the imp's toned hips.  He looks up questioningly, unsure of your intentions.  You simply smirk and nod at him. The little demon's eyes lit up like Christmas, and he immediately thrusts his " + imp.cockDescriptShort(0) + " into your [asshole] with no hesitation.  The sudden stretching would've been painful; luckily the breastfeeding euphoria numbed much of the pain.");
        character.displayStretchButt(imp.torso.cocks.get(0).area, true, true, false);

        DisplayText("\n\nThe imp wildly thrusts in and out of you, while simultaneously suckling your [nipple].  He uses both his hands to simultaneously massage your [chest], as well as keep himself steady.  He's making the massage a little rougher than you'd have liked, but you really can't complain about all the stimulation.  It's truly like nothing you've experienced before.");

        // if(character has a penis)
        if (character.torso.cocks.count > 0) {
            DisplayText("  [EachCock] twitches violently from the stimulation of your [asshole].  Pre-cum begins to dribble out of your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ".  You can't help but pant desperately as the warm pleasurable sensation of arousal fills your whole being.");
        }
        if (character.torso.vaginas.count > 0) {
            DisplayText("  The intense stimulation of your [chest] is causing your [vagina] to become wet with girl juice... so much so that your femcum has started to seep down your taint towards your ass.  It's probably a good thing, as it's now become a lubricant for the greater imp's " + imp.cockDescriptShort(0) + ".");
        }

        DisplayText("\n\nAs the little demon suckles your second breast dry, you notice he's picked up the pace significantly.  You know what that means, and gently pull his head towards your [chest].  Cradling and petting his head, you clench your [asshole] encouragingly.  It only takes a few more thrusts for the imp to cum.  He floods your insides with his hot boy cream, and moans into your [chest].");

        DisplayText("\n\nAfter riding out his orgasm, the imp flops backwards onto the ground, his cock now semi-hard and coated in his juices.  He gives his slightly bloated belly a gentle, content rub.  You chuckle at him as he falls asleep contentedly.");

        DisplayText("\n\nYou pick yourself up, gather up your equipment and put your [armorName] back on.");
        character.stats.lust += 50;
        character.stats.cor += 1;
    }
    else {
        DisplayText("\n\nYou lean down, and allow the imp to stand back up.  He immediately throws himself against your breast, and begins to suckle on the closest [nipple].  You give a gentle moan and bask in the sensation of nursing the imp's insatiable hunger.  You notice the imp's member slowly shifting to a semi-hard state, and chuckle, gently patting his bald head encouragingly.");

        DisplayText("\n\nAs the milk-flow from your first breast slows, the imp moves to the second, continuing to suckle gently.  You feel two clawed hands reach up and begin massaging your chest, trying to stimulate more milk flow.  You decide to help, and begin massaging yourself as well.  The added stimulation seems to work, and the imp can hardly keep up with the flow, as some of the corrupt milk begins dribbling from the corner of his mouth.");

        DisplayText("\n\nYou notice the imp's once muscular belly has developed into a small round bulge, as if a layer of baby fat had formed over those toned muscles.");

        if (character.torso.chest.count === 1) DisplayText("\n\nAs your second breast's milk flow begins to slow, the imp curls up against you contently.  You cradle him for a moment, before laying the creature down, where he burps and falls asleep.  You chuckle at how cute these creatures are when they're passive.");
        else {
            DisplayText("\n\nYou chuckle at the still very hungry imp, and begin massaging your second row of " + Desc.Breast.describeBreastRow(character.torso.chest.get(1)) + ", occasionally pinching your " + Desc.Breast.describeNipple(1) + "s, drawing a few beads of milk from them.  The imp makes short work of your first row of breasts and has moved towards your second.");
            DisplayText("\n\n\"<i>So eager to please, aren't you?</i>\" you say teasingly, though not expecting an answer from the imp's nipple filled mouth.  As you suspected, the imp is far too busy feeding to answer. You debate punishing him for his rudeness.  However, the pleasure of nursing is far too enjoyable to interrupt unnecessarily.");
            DisplayText("\n\nThe imp's belly has swollen much larger; his chest is also developing a thin layer of fat.  You wonder how much more the little beast will feed, as he moves to your fourth breast.");
            DisplayText("\n\nYou moan softly as the imp continues his work, although you do notice that he's starting to have trouble keeping up with your flow, as a fair amount of your milk has ended up on your chest and the ground, rather than the imp's belly.  Giving him a small swat on his bald head, you point to the milk on the ground, which causes him to whimper in apology.");
            DisplayText("\n\nNodding your acceptance, he continues his work much more carefully.  He's taking his time again instead of just sucking wildly.  You reach down curiously, and tug on the imp's " + imp.cockDescriptShort(0) + " but find that it's shrinking.  As you hold it, it shrinks more and more. You wonder what will happen to him if he continues to nurse.");
            // if(character has only 2 rows of breasts)
            if (character.torso.chest.count === 2) {
                DisplayText("\n\nUnfortunately it looks like you won't find out, as the last of your " + Desc.Breast.describeBreastRow(character.torso.chest.get(1)) + " runs dry.  The imp wobbles and falls over, clearly not used to the added weight.  Now that you get a good look at him, you see some very serious changes.  He's got a very full belly, his chest has a pair of soft male breasts, and his cock and balls have shrunk significantly.  It's a damn shame you ran out of milk for the creature.  It would've interesting to see what happened if he'd continued.");
                DisplayText("\n\nThe imp on the other hand looks a little sick to the stomach now, and flops backwards, passing out completely.  You look at him for a moment and decide he'll be fine.");
            }
            else {
                DisplayText("\n\nYou begin massaging your lowest row of breasts, fascinated by the idea of what will become of the imp when he milks you of all your corrupt milk.  You feel the fluid flow begin, and the imp moves on to your " + Desc.Breast.describeBreastRow(character.torso.chest.get(2)) + ".  He nurses passionately at your " + Desc.Breast.describeNipple(2) + ", slurping down every drop of your milk.");
                DisplayText("\n\nBefore you can even fully begin to enjoy the rest of the milking, it's over.  The imp takes one last, long gulp and falls backwards onto the ground.  You watch, fascinated as the imp groans loudly in discomfort. His belly gurgles and visibly shifts as if his belly was full of large worms wiggling around.  \"<i>Weird.</i>\" The imp begins to desperately claw at his testicles as they shrink so far that they vanish back inside of him.  The apparent itching sensation he's experiencing doesn't seem to stop however, as he begins clawing out small patches of fur, until he reveals a new, moist virgin cunt.");
                DisplayText("\n\nThe imp quickly penetrates his new orifice with two clawed fingers, gasping in the foreign ecstasy.  As he plays with his new tool, his former cock vanishes inside of his body, just as his testicles did.  The imp is crying out in the new found pleasure, and it seems like he's enjoying his new form.");

                DisplayText("\n\nThe gurgling of his stomach seems to have ceased, and his former muscular torso and abs are revealed again.  However his nipples are now drooling an excessive amount of milk.  The imp now appears to be a cunt-boy of some sort.  You feel yourself grow flush with arousal as the imp experiences his final changes.  Mooing loudly, the greater imp's new clit quickly begins to expand, growing larger and fuller the more he fingers his virgin fuck hole.");

                DisplayText("\n\nIt takes several minutes, but the imp reaches his orgasm. His clit is as large as an average cock (and appears to have stopped growing).  He's taken to using one hand to stroke off his clit like a cock, while his other hand fingers his new delicate pussy.  He moos loudly as his new fuck hole leaks its girl goo all over the ground and his hand.");

                DisplayText("\n\nThe imp weakly smiles at you one last time as he passes out, clearly very happy with how the events unfolded.  You're very pleased with the event as well.  Picking yourself up, you gather your equipment and put your [armor] back on.");
            }
        }
        character.stats.cor += 1;
    }
    // You've now been milked, reset the timer for that
    character.addStatusValue(StatusAffects.Feeder, 1, 1);
    character.changeStatusValue(StatusAffects.Feeder, 2, 0);
    Mod.Breast.boostLactation(character, 0.1);
    return { next: Scenes.camp.returnToCampUseOneHour };
}

// MALE LOSE
function loseToImpLord(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText(images.showImage("implord-loss-male"));
    DisplayText("Unable to control your lust you fall to the ground, remove your " + character.inventory.equipment.armor.displayName + " and begin masturbating furiously.  The powerful imp saunters over to you smirking evilly as he towers over your fallen form. You look up at him nervously.  He grabs your chin with one of his clawed hands, while the other digs through his satchel.  He pulls out a vial filled with glowing green liquid, and pops the cork stopper off with his thumb. Before you can react, the demon forces open your mouth and pours the liquid in.  Instinct reacts faster than logic and you swallow the substance as it's poured down your throat.");
    DisplayText("\n\nYou cough and splutter, grabbing your gut, as a hot pain fills your stomach.  The imp laughs as you roll around in agony for several long moments, before the burning turns to an arousing warmth that spreads to your [hips] and [asshole].  Groaning, you feel your cheeks flush with arousal, and your eyes glaze over once more with insatiable lust.");
    if (character.torso.cocks.count === 1) {
        DisplayText("\n\nYou feel your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + " grow harder than usual and throb.  You go to stroke yourself but it's far too sensitive. Any stroking you can do is far too little stimulation and anything else is too painful to withstand.  You whimper and curse in desperation.  Your lust clouded mind can only think of one solution; you bend over and reveal your [asshole] to the grinning imp.  The humiliation keeps you from looking back to see the imp's reaction, but you can tell by his chuckle that this is exactly what he wanted.");
    }
    else if (character.torso.cocks.count > 1) {
        DisplayText("\n\nYou feel your " + Desc.Cock.describeMultiCockShort(character) + " grow harder than usual and throb.  You go to stroke yourself but they are far too sensitive. Any stroking you can do is far too little stimulation and anything else is to painful too withstand.  You whimper and curse in desperation.  Your lust clouded mind can only think of one solution; you bend over and reveal your " + Desc.Butt.describeButthole(character.torso.butt) + " to the grinning imp.  The humiliation keeps you from looking back to see the imp's reaction, but you can tell by his chuckle that this is exactly what he wanted.");
    }
    DisplayText("\n\nThe imp gets behind you; his corrupt presence makes the air feel heavy and hard to breathe.  You notice his satchel and loincloth get carelessly tossed to the ground.  Chancing a glance back, you look in aroused horror at the " + imp.cockDescriptShort(0) + " between the imp's legs as well as his matching cum-filled balls.  Two clawed, red hands spread your [butt] revealing your [asshole].  Mercifully, the demon decides you'll need some form of lubrication and relaxation before he continues.  He leans forward and presses his tongue between your [butt] and begins lapping at your [asshole] viciously.  You can't help but mewl from the merciless attack on your tender rectum.");

    // if(character has a vagina)
    if (character.torso.vaginas.count > 0) {
        DisplayText("\n\nThe imp takes a moment to pleasure your [vagina], forcing his tongue and two clawed fingers inside.  The claws scratch and tease painfully at your inner walls.  You mewl and cry out from the stimulation, as the imp's tongue moves from your [vagina] to your [clit].  You cry out in desperation as the powerful demon attacks your [clit] with his tongue.");
    }
    else if (character.torso.balls.quantity > 0 && character.torso.cocks.count > 0) {
        DisplayText("\n\nThe imp moves away from your [asshole], and begins to focus on your [balls].  He pulls one into his hand, and squeezes it cruelly while he licks and bites at your [sack].  He gives a painfully tight squeeze to the orb in his hand, which makes you cry out in painful ecstasy.  A single bead of precum gets forced out of your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ".");
    }

    DisplayText("\n\nThe imp finally backs off from his brutal attack on your sensitive backside.  Whatever was in that vial has made your body incredibly sensitive... each caress feels like an orgasm, and each scratch feels like a stab wound.  You hope that's the only effect of the green liquid, but don't get much chance to ponder it as you feel the muscular demon press the head of his " + imp.cockDescriptShort(0) + " against your [asshole].");

    DisplayText("\n\nYou whimper in fear as you look back towards the devilish imp behind you.  He simply grins at you in response as he thrusts forward.  You yell out in pain as the " + imp.cockDescriptShort(0) + " forces its way into your [asshole].  You try to struggle away, but the imp gives you a very rough slap on the ass.  He then roughly grabs your [hips], making sure to dig his claws in just enough to deter you from struggling.");
    character.displayStretchButt(imp.torso.cocks.get(0).area, true, true, false);

    DisplayText("\n\nThough the entry was rough, the imp's thrusts are incredibly gentle.  He carefully thrusts in and out of your [asshole], and even begins licking and delicately kissing your back.  The horrible stretching of your [asshole] is still incredibly painful, but made tolerable by the contrasting caresses.  You quickly lose track of time as the pain and pleasure spark across your overly sensitive body.  The imp continues to be oddly affectionate now that you've fully submitted to his will.  He even releases his painful, clawed grip on your [hips].");

    DisplayText("\n\nAfter longer than you'd have hoped for, the painful stretching sensation begins to disappear; and the pleasurable sensation of the imp's " + imp.cockDescriptShort(0) + " thrusting in and out of your [asshole] becomes entirely pleasurable.  The way his " + imp.cockDescriptShort(0) + " fills every inch of your ass, and rubs all your most sensitive spots.  The weird sensation his warm, demonic pre-cum coats your insides.  You find your lust-blinded mind has become lost in the sensations - so lost that you don't even notice the imp increasing his pace.");

    DisplayText("\n\nWithin moments the beast is wildly thrusting in and out of your [asshole].  Pre-cum is pumping out of his " + imp.cockDescriptShort(0) + " like a faucet. The hot demon pre begins to spill back out of your abused [asshole], coating your [hips], and dripping to the ground beneath.  The imp gives you a few more rough thrusts before cumming hard into your [asshole].  The little demon's " + imp.cockDescriptShort(0) + " spasms as he continues to roughly thrust and pump you full of his burning hot demon seed.");

    if (character.torso.cocks.count > 0) {
        DisplayText("\n\nThe hot seed filling your belly wakes you from your lust induced daydream and you howl in discomfort.  Your belly begins to swell with the thick seed, coating every inch of your insides with the burning, arousing sensation.  This pushes you over the edge and you orgasm.  ");
        if (character.torso.balls.quantity > 0) DisplayText("Your [balls] clench up against your body, desperate to finally expel their contents.  ");
        DisplayText("Your seed spills across the ground, mixing with the copious amount of demon pre that had sloshed to the ground earlier.  You howl loudly in pleasure, as you're finally given release.");
    }

    DisplayText("\n\nThe imp pulls out, but is quick to stuff a soft unknown object into your [asshole] to plug all of his delicious, corrupt seed inside of you.  You stay in position, though you're wobbling slightly from the intense experience.  The short, muscular demon looks down at you, and you look up at him concerned.  He chuckles, \"<i>Don't worry my bitch, that thing will dissolve on its own in a day or so,</i>\" the demon assures you.  He grips his " + imp.cockDescriptShort(0) + ", which is soaked with his own juices, and holds it out towards you.");

    DisplayText("\n\nYou take the hint and nervously lick the cock clean.  You can taste the corruption, and it sends sparks through your mind.  You almost wish it didn't have to end, but soon the imp is satisfied with your cleaning job, gathers his things and turns to leave you to recover from your ordeal.  Within minutes of him leaving you pass out, collapsing to the ground.  You lay there, in a puddle of sexual fluids for a long time before you wake up.  After gathering your equipment, you begin to make your way back to camp.  Hopefully that green stuff's effects will have worn off once you get back.");
    character.orgasm();
    character.stats.sens += 2;
    character.stats.cor += 1;
    character.slimeFeed();
    return { next: Scenes.camp.returnToCampUseOneHour };
}

// FEMALE LOSE
function getRapedAsAGirl(character: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText(images.showImage("implord-loss-female"));
    DisplayText("You collapse from exhaustion, your [vagina] beginning to soak your [armor].  You groan loudly, desperately trying to continue the fight, or flee, but the exhaustion is too much.  You close your eyes for a moment, but hearing a loud thud near your face causes you to painfully open your eyes.  You see a large bestial hoof near your face, while the other hoof is used to roll you onto your back.");

    DisplayText("\n\nYou try to move, but before you can even begin to squirm a hoof presses hard between your " + Desc.Breast.describeBreastRow(character.torso.chest.get(0)) + ".  You gasp as the air is temporarily knocked out of your lungs.  The demon chuckles at your last feeble attempt to free yourself.  He holds his " + imp.cockDescriptShort(0) + " stroking it lewdly, a cruel smirk stretching across his face.  You watch as several beads of pre begin to drip from his tip onto your stomach.");

    DisplayText("\n\nThe imp steps between your legs, gently kicking them apart, until the wet spot on your [armor] is painfully obvious.  He chuckles, and leans down, ripping your [armor] off.  He casually tosses it to the side, and leans towards your [vagina].");

    // if(Player has balls)
    if (character.torso.balls.quantity > 0) {
        DisplayText("\n\nThe imp pulls your [balls] up, revealing your [vagina].  Unceremoniously, he presses his lips towards your crotch forcing his tongue into your [vagina], making you gasp in pleasure.  He gives your [balls] a rough squeeze, making your [vagina] even wetter than it was.  The imp moans in delight, licking up all your girl juices.");
    }
    else {
        DisplayText("\n\nThe imp roughly forces his tongue into your [vagina] making you gasp in pleasure.  Your [vagina] clenches around the demonic tongue, squirting some of your girl juices around the wet flesh as it delves deeper into you.  You writhe and squirm trying to fight against the forced pleasure.");
    }

    DisplayText("\n\nYou mewl pitifully as the imp removes his tongue. He smirks at your [vagina] and kneels");
    if (character.torso.hips.legs.isBiped()) DisplayText(" between your legs");
    else DisplayText(" before you");
    DisplayText(", draping his " + imp.cockDescriptShort(0) + " across your wet crotch.  You groan, and unintentionally thrust against the magnificent tool between your legs.  The imp chuckles evilly as you coat his " + imp.cockDescriptShort(0) + " in your girl juice, but he doesn't wait long before he slowly presses his head down against your [vagina].  His head slowly spreads your lips; the pleasure is unmistakable, and forces a loud moan from your lips.");

    DisplayText("\n\nWith a soft pop, the " + imp.cockDescriptShort(0) + " pops into your [vagina], and both of you moan in unison, the demon beginning to thrust wildly into you.  His hips pumps back and forth into you.  The loud slapping sound of flesh on flesh echoes around you, drowning out the grunts of the vicious demon above you.");
    character.displayStretchVagina(imp.torso.cocks.get(0).area, true, true, false);

    DisplayText("\n\nYou mewl softly as you're viciously fucked by the beast above you.  It doesn't take long before your [vagina] clenches tightly around the " + imp.cockDescriptShort(0) + " as you orgasm.  You scream in pleasure as your inner walls begin to milk the imp's " + imp.cockDescriptShort(0) + " of its seed.  The imp quickly succumbs and cums, his swollen balls tightening up against his crotch.  The hot jizz continues to pump into you for what feels like several painfully long minutes, until your belly bulges slightly, and your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " begins to leak the white demonic fluid.");

    DisplayText("\n\nThe imp pulls out, and gives himself a few final strokes, sending one last shot of cum across your face.  You blush in embarrassment and wipe the sticky seed from your nose and lips.  Standing up, the imp presses a hoof down hard on your distended stomach, making you gasp loudly as the demon's thick cum is forced back out of your [vagina], pooling between your legs. The imp gives a satisfied smirk and flies off, leaving you to clean up.");

    DisplayText("\n\nYou stand up weakly after several moments, and gather your [armor].  It takes you a while to get dressed in your defeated state, but you manage to crawl back towards your camp.  Your [vagina] is still leaking some of the demonic cum, but you try not to worry about it as you arrive, collapsing almost immediately.");
    character.orgasm();
    character.stats.cor += 1;
    character.slimeFeed();
    return { next: Scenes.camp.returnToCampUseOneHour };
}
