import { DisplaySprite } from '../../../../Engine/Display/DisplaySprite';
import { DisplayText } from '../../../../Engine/display/DisplayText';
import { SpriteName } from '../../../../Engine/Display/Images/SpriteName';
import { randInt } from '../../../../Engine/Utilities/SMath';
import { BreastRow } from '../../../Body/BreastRow';
import { Cock, CockType } from '../../../Body/Cock';
import { VaginaWetness } from '../../../Body/Vagina';
import { Character } from '../../../Character/Character';
import { Desc } from '../../../Descriptors/Descriptors';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { NextScreenChoices } from '../../../SceneDisplay';
import { Scenes } from '../../Scenes';

// faerie Encounter
export function encounter(character: Character): NextScreenChoices {
    DisplaySprite(SpriteName.Faerie);
    DisplayText().clear();
    DisplayText("A faerie slightly taller and thicker than your middle finger flits about the air. Her flat chest and girlish bob of hair make her look quite cute, but the solid black stockings and leather straps covering her chest show her slutty nature. Her wings are a light red, the color of aroused genitals.\n\n");
    if (character.torso.cocks.count > 0 && (character.torso.vaginas.count <= 0 || randInt(2) === 0)) {
        DisplayText("She seems to notice you getting hard at the sight of her and looks down. \"<i>Ew, man parts!</i>\" the faerie exclaims, flying away like a frightened bird.");
        if (randInt(character.stats.spe / 2) + character.statusAffects.get(StatusAffectType.FaerieFucked).value1 > 15) {
            if (character.statusAffects.get(StatusAffectType.FaerieFucked).value1 < 5) {
                DisplayText("\n\nYou make a desperate lunge for the faerie girl and grab her before she can fly away.   She wriggles and squirms in your grasp, shouting, \"<i>Let me go you meanie!</i>\"\n\n");
                DisplayText("It would be cute if she wasn't dressed up like such a slut.  You bet you could get her to help pleasure you, but she might not like it.  Or you could be a nice " + Desc.Gender.guyGirl(character.gender) + " and let her go...\n\nDo you force her to pleasure you?");
            }
            else if (character.statusAffects.get(StatusAffectType.FaerieFucked).value1 < 10) {
                DisplayText("\n\nYou snatch her out of the air fairly easily.  She seems like she's slowed down a little.   She squirms and wriggles, begging you, \"<i>Please don't cover me in cum again... I get so drunk and feel even sluttier afterwards.  I don't want to be a slut!</i>\"\n\nShe pouts, but blushes.  Do you make her get you off again?");
            }
            else if (character.statusAffects.get(StatusAffectType.FaerieFucked).value1 < 15) {
                DisplayText("\n\nYou grasp the dizzy faerie out of the air with ease, smiling as you feel the flood of wetness between her thighs moistening your hand.  She wriggles and moans, \"<i>No, not again!  I want another cum-bath so bad... but I'm losing myself to it.  It's hard to keep flowers pollinated when you're jilling off half the day and waiting for a nice hard cock to wander your way...</i>\"\n\nShe wants to get you off almost as you do.  Do you make her service you again?");
            }
            else DisplayText("\n\nYou lazily make a grab for her and easily snatch her out of the air.  Her body is sticky with a mix of desire and your last encounter.  You can feel her humping against your pinky while she begs, \"<i>Come on, let me crawl into your " + character.inventory.equipment.armor.displayName + " and wrap myself around your shaft.  I promise I'll only drink a little pre-cum this time, just enough to let me get off.  I'll be a good faerie slut, just let me get you off!</i>\"\n\nDo you let the faerie get you off?");
            character.stats.lust += character.stats.lib / 10 + 2;
            return { yes: faerieCaptureHJ, no: letFaerieGo };
        }
        character.stats.lust += character.stats.lib / 10 + 2;
        if (character.stats.lust >= 90) {
            DisplayText("\n\nYou groan miserably with frustration. Desperate for stimulation, you sink to your knees and start jacking off, the faerie's visage still fresh in your mind. You catch a fleeting glimpse of yourself tightly gripping the faerie's legs in each of your fists, dragging her toward ");
            if (character.torso.cocks.count === 1) DisplayText("your dick");
            else DisplayText("one of your dicks");
            DisplayText(", too large for her tiny frame... the depraved image overwhelms your mind's eye and you find yourself shooting all over the ground furiously.");
            character.orgasm();
        }
        else DisplayText("\n\nYou try in vain to jump and catch her, but she's too high above you and much too fast.");
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    DisplayText("The faerie slows the beating of her wings and hovers towards you. You dismiss your fearful notions, certain a small faerie is quite harmless to you.\n\n");
    DisplayText("How do you react?");
    // Shoo Away, Nothing, RAEP
    if (character.torso.vaginas.count > 0) return { choices: [["Shoo Away", "Nothing", "Rape"], [faerieShooAway, faerieDoNothing, faerieRAEP]] };
    else return { choices: [["Shoo Away", "Nothing"], [faerieShooAway, faerieDoNothing]] };
}

function faerieRAEP(character: Character): NextScreenChoices {
    DisplaySprite(SpriteName.Faerie);
    // Count secksins
    if (!character.statusAffects.has(StatusAffectType.FaerieFemFuck)) character.statusAffects.add(StatusAffectType.FaerieFemFuck, 1, 0, 0, 0);
    else character.statusAffects.get(StatusAffectType.FaerieFemFuck).value1 += 1;

    DisplayText().clear();
    DisplayText("You let the tiny faerie buzz closer to investigate, then with an explosion of movement, snatch her out of the air.  She squirms in your palm, struggling futilely in your grasp.  You poke between her legs with a finger, noting the flushed redness of the faerie's skin.  ");
    // Changes based on times fucked
    if (character.statusAffects.get(StatusAffectType.FaerieFemFuck).value1 === 1) DisplayText("She juices herself and screams, \"<i>Let me goooooooo,</i>\" trying to sound outraged instead of turned on, but the tiny girl's body gives away the lie.");
    else if (character.statusAffects.get(StatusAffectType.FaerieFemFuck).value1 <= 5) DisplayText("She juices herself and moans, \"<i>Stop teasing meeeeee,</i>\" doing her best to wriggle back against you, as if she could somehow impale herself on your digit.");
    else DisplayText("She squeals, rocking her hips back against you and moaning, \"<i>Ohhhh I love it when you do that,</i>\" grinding her incredibly small love-button on your digit.");
    // Special Taurness
    if (character.torso.hips.legs.isTaur()) {
        DisplayText("\n\nYou bop the tiny Faerie on the head to daze her briefly, then place her on a branch. You back yourself up against the tiny creature, lifting your tail so she can see your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". The scent washes toward her and you hear a high pitched giggle; evidently that was more than enough to give her quite the contact high.  You feel a strange sensation in your slit as she slides her legs inside you and wraps her arms around your " + Desc.Vagina.describeClit(character) + ".\n\n");

        // [If cock-like clit:
        if (character.torso.clit.length >= 3) {
            DisplayText("The tiny fae begins jerking your clit like a cock, squeezing her arms tightly around you and sliding in and out of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". Her motions are frenetic and unpredictable, but incredibly pleasurable.  She starts licking at your " + Desc.Vagina.describeClit(character) + " as your femcum runs down it, which only serves to make her more excited. She gets so excited that her legs start kicking wildly as she screams \"<i>Swim! Swim! Swim! Swim!</i>\" over and over again.  ");
            // [Small amount of cum:
            if (character.torso.vaginas.get(0).wetness <= VaginaWetness.WET) DisplayText("The fae giggles more and more as the fluid seeps about her and your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " ripples. She hugs your " + Desc.Vagina.describeClit(character) + " tighter and starts gently gnawing at it, such a peculiar sensation that you cum suddenly, and wetly.  Her giggles quickly become all-out laughter, and she loses her grip on your clit, sprawling to the ground into a small puddle of femcum.\n\n");
            // [Normal amount of cum:
            else if (character.torso.vaginas.get(0).wetness <= VaginaWetness.DROOLING) DisplayText("The fae giggles more and more as the fluid squirts about her and your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " ripples. She hugs your " + Desc.Vagina.describeClit(character) + " tighter and starts gently gnawing at it, such a peculiar sensation that you cum suddenly, and wetly.  Her giggles quickly become all-out laughter, and she loses her grip on your clit, sprawling to the ground into a puddle of femcum.\n\n");
            // [Huge amount of cum:
            else DisplayText("The fae giggles more and more as the fluid sprays about her and your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " ripples. She hugs your " + Desc.Vagina.describeClit(character) + " tighter and starts gently gnawing at it, such a peculiar sensation that you cum suddenly, and wetly.  Her giggles quickly become all-out laughter, and she loses her grip on your clit, sprawling to the ground into a huge puddle of femcum, her giggling frame floating on the surface as her legs kick about erratically.\n\n");
        }
        // [All other clits:
        else {
            DisplayText("The tiny fae rubs her hands around your " + Desc.Vagina.describeClit(character) + " as if entranced by it. Your body responds by pumping out more femcum, which she laps up happily.  She starts laughing maniacally and banging on your clit like a drum, periodically yelling out \"<i>CONGA!</i>\" for some reason. The strange ministrations feel incredible though, and you feel your love canal squeezing down on the faerie's tiny body.  ");
            // [Small amount of cum:
            if (character.torso.vaginas.get(0).wetness <= VaginaWetness.WET) DisplayText("You cum suddenly, and wetly. The fae giggles more and more as the fluid seeps about her and your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " ripples. Her giggles quickly become all-out laughter, and she loses her grip on your innards, sprawling to the ground into a small puddle of femcum.\n\n");
            // [Normal amount of cum:
            else if (character.torso.vaginas.get(0).wetness <= VaginaWetness.DROOLING) DisplayText("You cum suddenly, and wetly. The fae giggles more and more as the fluid squirts around her and your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " ripples. Her giggles quickly become all-out laughter, and she loses her grip on your innards, sprawling to the ground into a puddle of femcum.\n\n");
            // [Huge amount of cum:
            else DisplayText("You cum suddenly, and wetly. The fae tries desperately to hold on to your " + Desc.Vagina.describeClit(character) + " but the amount of fluid overwhelms her and she's sent spiralling to the ground into a huge puddle of your fluid, her giggling frame floating on the surface as her legs kick about erratically.\n\n");
        }
    }
    // Non-Taurs
    else {
        DisplayText("\n\nYou release the lower portion of your " + character.inventory.equipment.armor.displayName + ", revealing your aroused slit to the faerie.  ");
        if (character.statusAffects.get(StatusAffectType.FaerieFemFuck).value1 < 4) DisplayText("Her mood immediately shifts from panic to desire, and she licks her lips hungrily, locking her eyes onto your feminine folds.");
        else DisplayText("Her eyes open wide, like a junkie seeing a fix.  She licks her lips hungrily and humps the inside of your hand, ready for action.");
        DisplayText("  You release the faerie, letting the pussy-entranced fae buzz down to your sensitive nether-regions.  She lands softly, her tiny feet and hands prancing over your vulva.  You gasp in delight, ");
        if (character.torso.vaginas.get(0).wetness >= VaginaWetness.SLAVERING) DisplayText("releasing a tiny squirt");
        else if (character.torso.vaginas.get(0).wetness >= VaginaWetness.DROOLING) DisplayText("dribbling juices");
        else if (character.torso.vaginas.get(0).wetness >= VaginaWetness.WET) DisplayText("growing so slippery the faerie nearly loses her footing");
        else DisplayText("feeling yourself moistening with need");
        DisplayText(" from the tiny touches.\n\n");

        // (small) <= .50\"
        if (character.torso.clit.length <= .5) {
            DisplayText("She pulls apart your lips, revealing your tiny bud and repositioning herself to plant her feet inside you.  The flawless skin of her thighs pulls another gasp of pleasure from your lips.  They squeeze tightly around your " + Desc.Vagina.describeClit(character) + ", scissoring her gash across its sensitive surface.   You squirm, too engrossed in the rough grinding your button is receiving to worry about the faerie.   She clings to you, hanging on for dear life as your crotch nearly throws her free.  During the gyrations, she's slammed back into the " + Desc.Vagina.describeClit(character) + ", instantly penetrated by the nub with a wet 'schlick'.\n\n");
            DisplayText("Squealing and bouncing as she hangs on tightly, the faerie noisily orgasms around your clit, squirting her own fluids into your aching " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ".  The fluid tingles, and you shove your fingers in, smearing the sticky-sweet faerie-cum through your passage.   Before you can get far with it, your own orgasm goes off, squeezing your fingers and rippling around them, trying to milk your hand as if it was a dick.  Your legs go weak and wobbly, forcing you down on your " + Desc.Butt.describeButt(character) + " as the waves of pleasure flow through you, soaking the faerie in girlcum.\n\n");
        }
        // (medium) <= .1.25\"
        else if (character.torso.clit.length <= 1.25) {
            DisplayText("She watches, entranced as your " + Desc.Vagina.describeClit(character) + " hardens, poking between your lips, flushed with blood like a tiny cock.   The faerie swivels around, planting her dainty butt squarely on your snatch, sinking down a bit into the folds as she wraps her legs around the pulsating 'shaft'.   She hugs it, pressing it between her tiny breasts and licking it up and down, making you moan and squirm from unexpected stimulation of your most sensitive area.\n\n");
            DisplayText("You spread your " + Desc.Leg.describeLegs(character) + ", careful not to dislodge the faerie as she releases the " + Desc.Vagina.describeClit(character) + " and stands up, placing her dripping gash against the tip.   A quick plunge later and she's bottomed out, pressing her hips into the opening of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " her feet slipping over the outer folds as she tries to maintain her balance.   You start rocking back and forth happily, bouncing the faerie up and down.  She moans, cute and barely audible, but sexy in a way that makes your sopping fuckhole even wetter.\n\n");
            DisplayText("She orgasms on you, squirting copiously, drenching your " + Desc.Vagina.describeClit(character) + " and " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " in clear faerie-fluid.  It tingles, wicking into your button and soaking into your snatch, enhancing every sensation.  You can feel the cool forest air as it flows over your vulva, seeming to stroke you, and without any chance of holding yourself back, you plunge your fingers into your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", immediately orgasming from the penetration, not even noticing the exhausted faerie sliding off the large clit and slipping partway into your cunt.\n\n");
        }
        // (streeeetch – large) <= 4.5\"
        else if (character.torso.clit.length <= 4.5) {
            DisplayText("Entranced by the growing " + Desc.Vagina.describeClit(character) + ", the faerie caresses her body, watching your love-button swell up, not stopping until it looks too huge for her tiny frame.  She climbs in a circle around it, awestruck by the size and majesty of your cock-like button.    She looks up at you, aroused but worried, saying, \"<i>You're so... BIG.  Oh goddess, I want to feel it inside me!</i>\"\n\n");
            DisplayText("She grabs hold of its slippery surface with both hands and jumps, lifting her lower body up before gravity yanks it back down onto the tip of your " + Desc.Vagina.describeClit(character) + ".  The tip barely slips in, despite the slippery wetness of the faerie.   She screams, though in pleasure or pain you cannot be sure.  You reason that it must be pleasure, because the faerie is wiggling her hips and grabbing hold of the rest of your " + Desc.Vagina.describeClit(character) + ", straining to pull herself further down the fem-cock.  Her belly starts to distort, displaying the cylindrical bulge on her tummy, expanding and contracting slightly as each of your heart-beats works through your clit.\n\n");
            DisplayText("In time, she manages to fully impale herself, quivering in orgasm as she gets off from the vibrations your pounding heart sends through your " + Desc.Vagina.describeClit(character) + ".  Her tongue lolls out and her eyes roll back, shut down by the extreme penetration, pain, and pleasure of the act.  You feel her cum soaking into you, sliding down into your slit and making your sensitive slit tingle.  Watching her get off is all it takes to bring you to orgasm with her, and the walls of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " clamp down hungrily, contracting and gushing fluids over the faerie as she lies there, impaled on your crotch like a perverted ornament.\n\n");
        }
        // (too big) (else – hump dat shit)
        else {
            DisplayText("Entranced by your swollen " + Desc.Vagina.describeClit(character) + ", the faerie watches it slowly erect, filling with blood like a smooth over-sensitive cock.  She tentatively touches it, gasping and pulling back when it twitches in response.   With a look of awe, she turns to you and says, \"<i>There's no way I could take this beautiful monster, but I know I can make it feel good!</i>\"\n\n");
            DisplayText("She jumps onto it, making it bounce in the air as it takes her relatively insubstantial weight.  Embracing it in a full-body hug, she starts grinding on it, smearing her thick faerie juices into the clit and giggling every time you twitch from the feeling.  You squirm, sinking down from the raw sensation, your " + Desc.Leg.describeLegs(character) + " giving out underneath you.   Grabbing hold of a stump, you try to steady yourself, but the faerie humping your " + Desc.Vagina.describeClit(character) + " is interfering with your motor ability, and you slump into the forest loam, happily twitching as orgasm washes over you.\n\n");
            DisplayText("Your " + Desc.Vagina.describeClit(character) + " jumps, throwing the tiny woman off.  She slips and scrabbles across the surface of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", sliding into your soaking gash.  She's squeezed tightly, sloshed around in the wetness of your orgasm.   The faerie's eyes cross, as she grows dizzy and battered in the sizzling whirlpool that is your groin.\n\n");
        }
    }
    // [OH SHIT ITS OVER, POOR BITCH CRAWLS OUT ALL STONE ON GIRLCUM]
    // [FIRST TIME]
    if (character.statusAffects.get(StatusAffectType.FaerieFemFuck).value1 === 1) {
        DisplayText("Lying in the forest loam as you recover, you watch as the faerie stumbles out of your groin, holding her head and giggling nonstop.  She tries to put on a serious face but it's instantly overpowered by another fit of laughter, \"<i>Hehe, did you know I'd get stoned off your girlcum?  Omigod I've never been this -heheheheheh- high before!  Like I can see EVERYTHING.  Puuhleeeease don't make me do this again...</i>\"\n\n");
        DisplayText("She flies off, hungry and looking for a flower to munch on.");
    }
    // [REPEAT LOW]
    else if (character.statusAffects.get(StatusAffectType.FaerieFemFuck).value1 <= 5) {
        DisplayText("The faerie slowly drags herself out of your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", smiling broadly with her eyes dilated wide.  She slips off you, dropping to the ground and giggling, \"<i>Everything feels so soft.  Mmmm that was fun!</i>\"\n\n");
        DisplayText("The little woman spins around happily, proclaiming, \"<i>The colors are like, so bright!  Oh gosh, I'm hungry!  See you and your clit later, just don't let me fall in your snatch, it fucks me up so much.  I don't think I can handle much more or I'll be crawling between your legs every chance I get!</i>\"\n\n");
        DisplayText("She flits away, calling out, \"<i>Bye sweetie!</i>\"");
    }
    // [SLUTTIN IT UP]
    else {
        DisplayText("The faerie stumbles out of your snatch, giggling and scooping the slippery girl-goo off her body, licking it up.  She crawls up your body to your lips, giving you a cunt-flavored kiss and babbling happily, \"<i>Mmm your cunt makes me so warm and giggly!  I'm so fucking stoned!  Gawddess, I'm hungry too – I'm gonna grab some food, and then come back for another dip in your honeypot, ok?</i>\"\n\n");
        DisplayText("She flits away, a little unsteady and reeking of female sex and desire.");
    }
    character.orgasm();
    character.stats.lib += -2;
    character.stats.cor += .5;
    return { next: Scenes.camp.returnToCampUseOneHour };
}

function faerieShooAway(): NextScreenChoices {
    DisplaySprite(SpriteName.Faerie);
    DisplayText().clear();
    DisplayText("You shake your hands, shooing away the tiny faerie.  She's clearly been touched by the magics of this land and you want nothing to do with her. With a pouting look, she turns and buzzes away.");
    return { next: Scenes.camp.returnToCampUseOneHour };
}

function faerieDoNothing(character: Character): NextScreenChoices {
    DisplaySprite(SpriteName.Faerie);
    DisplayText().clear();
    if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length >= 1) {
        DisplayText("She looks you over, stopping at your upper torso and letting out a cry of glee. She lands on your chest, her exposed pussy coming to rest on your nipple. With one hand she grabs hold of you above her head and uses her other hand to guide the rapidly hardening nub between her legs. She sighs in delight as her tight confines squeeze your nipple hard, the feeling somewhere between pinching fingers and suckling lips. You gasp in delight yourself, and you notice she can exercise amazing control with her groin muscles as a rippling feeling courses through your nipple.\n\n");
        DisplayText("Your nipple starts to get sloppy and wet as if someone's tongue were around it, but it's really the faerie's love juices dribbling down, some running down your breast and some down her legs. She starts thrusting against you, and you notice her clit getting hard and pushing into your soft flesh. With a free hand you grab the area around your nipple and squeeze it harder, forcing more into her.\n\n");
        if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 1) DisplayText("A squirt of milk shoots inside her, making the faerie moan. She looks up at you with lusty, slitted eyes, squeezing her legs together to draw more from you.\n\n");
        DisplayText("Eventually you both find a rhythm and soon she's moaning loudly.  ");
        if (character.torso.vaginas.count > 0) DisplayText("With your other hand you start diddling your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", adding your own soft moans to hers.  ");
        DisplayText("A few blissful moments later, she shudders and you feel her uncontrolled spasms around your nipple.  ");
        if (character.torso.vaginas.count > 0) DisplayText("You join her shortly after.  ");
        DisplayText("The faerie goes limp and spirals to the ground, crashing gently and still twitching in the afterglow. Stepping back carefully, you leave her.");
        if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 1.5) DisplayText("\n\nA copious gout of your milk escapes her rosy folds.");
        character.orgasm();
        character.stats.lib += -2;
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    if (character.torso.clit.length >= 1.0 && character.torso.clit.length <= 4.5 && character.torso.vaginas.count > 0 && randInt(2) === 0) {
        DisplayText("A smile crosses her face and she flutters down to your crotch. She starts by scissoring you despite the size difference, driving your clit into her despite its erect state. Compared to her, it looks massive. She swings one leg over it and starts impaling herself on it. Your taut clitoris barely fits inside her, and the tight confines on your sensitive nub are enough to make you weak in the knees. Staggering to the ground, you grab hold of her frail body in your fist and thrust her roughly on your engorged button. She wails in both pain and pleasure, being crushed and stretched open at once. Her cries of pain combined with the intense stimulation on your most sensitive part bring you to a quick orgasm.\n\n");
        if (character.torso.vaginas.get(0).wetness >= VaginaWetness.DROOLING) DisplayText("You drench the poor faerie completely in your female juices, soaking her hair and body. Overwhelmed and spent, you drop her to the ground and catch your breath. She licks up what's around her face, but is too weak to do anything else but lie in the dirt.\n\n");
        else DisplayText("Shuddering, you maintain your composure and keep going, trying to ride the high for another. Eventually you look down and you can see the faerie's eyes have glazed over and rolled to the back of her head. Her cunt has started clamping down on you a lot harder, evidence of her state of near-constant orgasm. The random clenching brings you off again very quickly and you have an intense orgasm, joining your fae cohort.\n\n");
        DisplayText("Time skips a beat and you eventually come down, gently relaxing your grip and disengaging the worn out faerie from your softening female parts. The faerie regains consciousness slowly and thanks you before flying off.");
        character.orgasm();
        character.stats.lib += -1;
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    if (character.torso.clit.length > 4.5) {
        DisplayText("The faerie flies close to your ear and speaks in a volume that would be a whisper from another human, \"You've got some sexy parts girl, but you're too big for me. I hope you find someone to get you off so I can watch.\" Then she flies in front of you, cutely kisses the bridge of your nose, and flies off.");
        character.stats.lust += 5;
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    DisplayText("The faerie flies close to your nipple and sucks it gingerly.  You pant in pleasure as you feel it pucker tight in her mouth, tingling with her saliva.  She lets it pop free, swollen with arousal.  Her hand flicks it playfully, the sudden sensation fluttering through you as you close your eyes in pleasure.  You recover and find she has flown high into the trees, waving playfully as she escapes.\n\nYou frown and begin to dress yourself, flushing irritably as your nipples protrude further into your clothes than you remember.");
    character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length += .25;
    if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length > 3 || character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating <= 2) {
        DisplayText("  Thankfully it appears to be temporary.");
        character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length -= .25;
    }
    character.stats.sens += 1;
    character.stats.lust += 5;
    return { next: Scenes.camp.returnToCampUseOneHour };
}

// [No] *(let her go)
function letFaerieGo(): NextScreenChoices {
    DisplaySprite(SpriteName.Faerie);
    DisplayText().clear();
    DisplayText("You apologize and release her, letting her fly away on gossamer wings.  She thanks you, buzzing up to your lips and planting a chaste kiss on your mouth.  She zips away into the woods without a glance back...");
    return { next: Scenes.camp.returnToCampUseOneHour };
}
// [YES] *make her pleasure you
function faerieCaptureHJ(character: Character): NextScreenChoices {
    DisplaySprite(SpriteName.Faerie);
    if (character.statusAffects.has(StatusAffectType.FaerieFucked)) character.statusAffects.get(StatusAffectType.FaerieFucked).value1 += 2;
    else character.statusAffects.add(StatusAffectType.FaerieFucked, 2, 0, 0, 0);
    DisplayText().clear();
    if (character.statusAffects.get(StatusAffectType.FaerieFucked).value1 < 15) {
        DisplayText("You hold her tightly and scold her, \"<i>If you don't like hard cocks, you shouldn't be dressed up like a such a slut, flying around and teasing me like that.  You should be ashamed of yourself.  Now you've got me all worked up - so you better make it up to me and take care of my little 'problem'</i>.\"\n\n");
        DisplayText("She looks up at you and gulps before nodding silently, unwilling or unable to resist your command.   ");
    }
    DisplayText("You let her loose and she hovers in place, as if pondering her one last chance to escape.  She sighs and looks back up, blushing fiercely as she lands on your hip and gazes down at the bulge of your groin.  You can't help but laugh as she slips under your " + character.inventory.equipment.armor.displayName + ", crawling across your sensitive thigh towards your " + Desc.Cock.describeMultiCockShort(character) + ".\n\n");
    // Taurs get a special scene!
    if (character.torso.hips.legs.isTaur()) {
        DisplayText("The tiny Faerie climbs on top of your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)));
        if (character.torso.cocks.count > 0) DisplayText("largest " + Desc.Cock.nounCock(CockType.HUMAN));
        DisplayText(" and crawls about on it for a while, getting used to its shape and taking in deep lungfuls of its musky odor. She wraps herself around you and begins rubbing herself up and down your hard length. As she moves around her tiny slit leaks cum in long streaks, teasing you with a cunt you can't penetrate. Pre begins to leak steadily from your tip as the faerie continues to work her way around, moaning quietly and betraying her inner desire.\n\n");
        DisplayText("Your body begins to naturally jerk forward and backward, attempting to hump the mare that isn't there. You can feel the faerie sliding about until she clenches onto you tighter, which only serves to make you hump harder. Realizing her mistake too late, she attempts to loosen herself, but your wild bucking sends her flying forward.\n\n");
        DisplayText("She smashes onto the end of your " + Desc.Cock.describeMultiCockShort(character) + " and grasps at it. Her face crushes into your urethra as her tiny legs wrap themselves around the tip. Your wildly flailing cock starts to grow larger as your orgasm approaches, but the faerie doesn't notice as she happily drinks up your pre.\n\n");
        // [No testicles:
        if (character.torso.balls.quantity === 0) DisplayText("Your tiny globules of semen go straight into her open mouth and she sucks them down gleefully before falling with a splat onto the pre soaked ground.\n\n");
        else {
            // [Small amount of cum:
            if (character.cumQ() < 50) DisplayText("Your semen splashes straight into her face and she's quick to suck it up. She falls with a splat onto the pre soaked ground while your member drips periodic droplets of cum onto her head.\n\n");
            // [Normal amount of cum:
            else if (character.cumQ() < 200) DisplayText("Your semen washes into her face and she loses her grip on your " + Desc.Cock.describeMultiCockShort(character) + ". She falls with a splat onto the pre soaked ground and you spray her with periodic spurts of fresh cum.\n\n");
            // [Huge amount of cum:
            else DisplayText("Your semen collides with her face and she is propelled off of your cock onto the pre soaked ground. Your " + Desc.Balls.describeBalls(true, true, character) + " continue pumping out cum like a hose until she's almost swimming in it.\n\n");
        }
        character.orgasm();
        character.stats.lib += -.5;
        // Epilogue!
        if (character.statusAffects.get(StatusAffectType.FaerieFucked).value1 < 10) DisplayText("The faerie burps and giggles again before glaring up at you, accusing you with a mildly unfocused glare and asking, \"<i>Did you know we get drunk on cum?  Caushe I TRY SO HARRD not to get meshed up like </i>\"\n\n");
        else if (character.statusAffects.get(StatusAffectType.FaerieFucked).value1 < 15) DisplayText("The faerie burps and laughs drunkenly, patting the side of your " + Desc.Leg.describeLeg(character) + " and slurring, \"<i>Oh by Marae's ripe titsh!  I needed that.  Do you thhink you could catsch me again?  I love feeling your cum coating my body.</i>\"\n\n");
        else DisplayText("The faerie burps and begins openly masturbating, panting and slurring happily, \"<i>Yush I-gasp-uh feel great!  MMMmmmhm, it makesh my twat so sensitive.  I'm gonna fly home and schtuff it full, then play with my clit till I fall ashleep!</i>\"\n\n");
        if (character.statusAffects.get(StatusAffectType.FaerieFucked).value1 < 15) DisplayText("She licks her fingers and rolls around laughing, \"<i>Hehe, who caresh!  I'm happy! WHEEEEE!</i>\"\n\n");
        DisplayText("The faerie takes off, still dripping, and flying in something less than a straight line...");
    }
    // Non-taurs
    else {
        DisplayText("The faerie reaches your swollen member and ");
        if (character.torso.cocks.filter(Cock.HasKnot).length > 0) DisplayText("climbs atop your knot, wrapping her legs around the narrower shaft to hold on.  You can feel her cheeks resting atop the 'bulb' of your canine anatomy, teasing you with feminine features you're far too large to penetrate.  ");
        else if (character.torso.cocks.get(0).type === CockType.HORSE) DisplayText("climbs atop your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ", hanging onto your ring of prepuce and wrapping her legs as far around your horse-like maleness as she can.  ");
        else if (character.torso.cocks.get(0).type === CockType.DEMON) DisplayText("climbs atop your " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ", hanging on to the corrupted nubs and nodules as she threads her legs between them, squeezing you tightly as she hangs on.  You can feel her wet gash sitting atop a particularly sensitive bump, teasing you with a tiny cunt you'll never be able to penetrate.  ");
        else if (character.torso.cocks.get(0).type === CockType.TENTACLE) DisplayText("climbs onto your squirming " + Desc.Cock.describeCock(character, character.torso.cocks.get(0)) + ", wrapping her legs tightly around it as it wiggles and writhes with excitement.  Unbidden, it curls around and rubs its reddish-purple head against her face like an animal.  She gives it a gentle squeeze and licks it.  ");
        else DisplayText("climbs on to your hardness, wrapping her legs tightly around it as she secures a perch against you.   You can feel her wet gash rubbing against your sensitive skin, teasing you with a tiny cunt you'll never be able to penetrate.  ");
        DisplayText("Your internal muscles clench unconsciously, squeezing out a dollop of pre that rolls down into the faerie's hair, soaking her head and face.  You can't see her reaction, but you can feel it oozing between her body and you, lubricating her as she humps and rubs against you.  Tiny muffled moans escape your " + character.inventory.equipment.armor.displayName + ", indicating that some part of her is enjoying the task.\n\n");
        DisplayText("Though she can only stimulate a few inches of you at a time, it feels really good – better than it should, and a budding warmth on the edge of release builds inside you.  Too late you realize you should have gotten at least partially undressed.  You cum before you can do anything about it, splattering your " + character.inventory.equipment.armor.displayName + " with seed and leaving a wet patch on the crotch.  You can feel it dripping back onto you and the faerie as more spunk squirts out, soaking the tiny girl in spooge as the wet spot grows.  ");
        if (character.cumQ() > 250) {
            DisplayText("You cum uncontrollably, regretting your fertility as your body paints the inside of your " + character.inventory.equipment.armor.displayName + " with goopy whiteness.  ");
            if (character.cumQ() > 500) DisplayText("The proof of your release forms a puddle around you as your legs give out and y");
            else DisplayText("Falling backwards as your legs give out, y");
        }
        else DisplayText("Y");
        DisplayText("ou watch your wet groin squirm as the faerie finishes releasing your built-up tension and crawls out.  She's covered from head to toe in sloppy white jism, and is noisily slurping it up.\n\n");
        DisplayText("She rolls off of you, staggers, and plops down on her cute little ass next to you");
        if (character.cumQ() > 500) DisplayText(" in the cum");
        DisplayText(", giggling drunkenly.  ");
        if (character.statusAffects.get(StatusAffectType.FaerieFucked).value1 < 10) DisplayText("The faerie burps and giggles again before glaring up at you, accusing you with a mildly unfocused glare and asking, \"<i>Did you know we get drunk on cum?  Caushe I TRY SO HARRD not to get meshed up like </i>\"\n\n");
        else if (character.statusAffects.get(StatusAffectType.FaerieFucked).value1 < 15) DisplayText("The faerie burps and laughs drunkenly, patting the side of your " + Desc.Leg.describeLeg(character) + " and slurring, \"<i>Oh by Marae's ripe titsh!  I needed that.  Do you thhink you could catsch me again?  I love feeling your cum coating my body.</i>\"\n\n");
        else DisplayText("The faerie burps and begins openly masturbating, panting and slurring happily, \"<i>Yush I-gasp-uh feel great!  MMMmmmhm, it makesh my twat so sensitive.  I'm gonna fly home and schtuff it full, then play with my clit till I fall ashleep!</i>\"\n\n");
        if (character.statusAffects.get(StatusAffectType.FaerieFucked).value1 < 15) DisplayText("She licks her fingers and rolls around laughing, \"<i>Hehe, who caresh!  I'm happy! WHEEEEE!</i>\"\n\n");
        DisplayText("The faerie takes off, still dripping, and flying in something less than a straight line...");
        character.orgasm();
        character.stats.lib += -.5;
        if (!character.statusAffects.has(StatusAffectType.Jizzpants)) character.statusAffects.add(StatusAffectType.Jizzpants, 1, 0, 0, 0);
    }
    return { next: Scenes.camp.returnToCampUseOneHour };
}
