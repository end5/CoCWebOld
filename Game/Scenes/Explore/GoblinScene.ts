import { gobboAssassinRapeIntro } from './GobliAssassinScene';
import { DisplayImage } from '../../../Engine/Display/DisplayImage';
import { DisplaySprite } from '../../../Engine/Display/DisplaySprite';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { ImageName } from '../../../Engine/Display/Images/ImageName';
import { SpriteName } from '../../../Engine/Display/Images/SpriteName';
import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { CockType } from '../../Body/Cock';
import { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { PerkType } from '../../Effects/PerkType';
import { Mod } from '../../Modifiers/Modifiers';
import { Scenes } from '../Scenes';

/**
 * Created by aimozg on 03.01.14.
 */

/*Goblins
 Gender: Female
 Height: 2-4 feet
 Eye Colors:  Red, Violet, Amber, or Pink
 Hair Colors: Red, Very Light Blonde, Purple, Pink, White
 Skin Colors: Green, though in rare cases gray, blue or yellowish.
 Appendages: Their arms and legs look like a human's, although they are scaled down to fit the goblin's smaller frames.
 Appearance: Goblins are normally lithe little creatures with somewhat elfin faces.  Their ears are pointed, though their unusual (and very punk rock) haircuts can sometimes hide them.   A goblins age can usually be determined by the size of her bust and hips.  Very young goblins have relatively small chests and hips, though as they age and give birth, their endowments will grow ludicrous sizes.  It is rumored that somewhere there is a goblin Queen who has so many children that she has become immobile.

 They often dress themselves in tight fitting leather harnesses to display their chests.  A goblin's crotch will ALWAYS be exposed.  They favor piercings in multiple locations, and most have jewelry in their nipples, clit, and both pairs of lips.
 Aging: Goblins do not get 'old' like other races, and do not get lines or wrinkles.  They will not die from age alone, though should a goblin be successful enough to immobilize herself, she may die if she does not have family that keeps her fed.
 Sex Life: Goblins are ALWAYS horny and ready to copulate.  They have large juicy vulva that ache for penetration, and despite their small size can take many of the larger members out there (in moderation).  They will always seek to have sex with any willing participant, and in those rare cases where they are too small, they will be sure to take as much cum inside them as possible.  Thanks to the wide array of psychology altering chemicals in their body, goblins get off on the act of giving birth.
 Life Cycle: The life of a young goblin is likely to end in the jaws of a hellhound, impaled on a minotaur's dick, or drowned tentacle-cum.  Due to the special properties of their wombs (any pregnancy ALWAYS results in a goblin), they are considered worthless to most goblins and demons, and due to their small size, they often end up dying after an encounter with a minotaur or similar creature. Despite the high fatality rate of young goblins, those who survive beyond their first pregnancy will often live a very long time, and will dedicate themselves to birthing their broods (4+ goblins per pregnancy) and perfecting alchemical recipes they can use to 'seduce' more 'fathers'.
 History: Goblins were once the technological leaders of what is now known as the Demon-Realm.  When the demons came, they signed a treaty guaranteeing peace and freedom to the goblin people.  The peace was a lie.  That night, a team of demons tunneled into the goblins water supply and began tainting with ever increasing levels of corruption.  Over the next few days, the goblins spent less and less time working, and more and more time fucking.

 Within a week, their greatest minds were spending all their time eating pussies and developing new aphrodisiacs.  Within a month the goblins were permanently turned on by the strongest of drugs and fucking nonstop in the streets of their once-great city.  A few did not partake of the tainted water, and locked themselves inside their dwellings for as long as they dared.  Some gave in to thirst or loneliness.  Others stayed indoors until the demons walked in and easily assumed control.  They put the few sane goblins left to work building the machines that run their empire to this day.  No one has seen those few survivors since, and most goblins don't waste time thinking about them.
 Social Structure: Goblins live in groups of 100-300, typically lead by an elder female with a direct bloodline to every goblin under her.

 STANDARD GOBLIN ENCOUNTER:
 3' even height.
 Breasts would be about DD cup if she were human.
 Nice hips & well-rounded ass.
 Green skin, pink and black(mostly pink) gothy hair.
 Vagina/ass/mouth capable of taking dicks with volume up to about 36 (so 12x3 or 24x1.5, etc, etc)
 Cute face, likes to put on drugged lipstick to incapacitate her foes with after raping them.
 Carries bottles of aphrodisiacs and drugs.
 Dressed in leather straps that support her chest (in a lewd way) while leaving her pierced nipples exposed and slightly parting her ass to expose her pucker & femmy funbits.  Pierced pointed ears.
 */
// RAEP TEXT 1
export function goblinRapesPlayer(player: Character, goblin: Character) {
    DisplaySprite(SpriteName.Goblin);
    DisplayText().clear();
    if (player.perks.has(PerkType.BimboBrains) || player.perks.has(PerkType.FutaFaculties)) {
        // [Female Bimbo Loss Against Goblin]
        if (player.torso.vaginas.count > 0) {
            DisplayImage(ImageName.goblin_loss_female_bimbodildo);
            DisplayText("The goblin saunters up to you, wiggling her hips with a needy, sexual sway. She opens a small pouch, the sight of which instantly bombards your easy mind with thoughts of your lower lips being opened similarly, and pulls out a tube of lipstick, pausing to apply it to her lips. She caps off the tube and blows you a kiss with a wet smacking sound as she steps up to your trembling form. Your breath is knocked from your body as she drops all her weight onto your middle, making her ass and well-rounded tits jiggle just like yours do when you are bouncing on a cock. She reaches up to twist her nipple-studs, grinding the wetness of her crotch up and down your belly. You can't help but envy her piercings. Like, they totally turn you on!\n\n");
            DisplayText("Your body is already hot and your " + Desc.Breast.describeNipple(player, player.torso.chest.get(0)) + "s harden involuntarily in response to the tiny slut's totally understandable display of desire. Your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " leaks enough girl-juice to form a puddle beneath you, doing its best to show your fellow slut how ready you are. You 'subtly' (at least in your little mind) push your chest forward, making your " + Desc.Breast.describeNipple(player, player.torso.chest.get(0)) + "s easy targets for the goblin. She grabs hold of your breasts");
            // --[If nipplecunts]
            if (player.torso.chest.find(BreastRow.FuckableNipples)) DisplayText(", fingering your wet nipplecunts and pinching the now-puffy areolas tightly, sending uncontrollable waves of pleasure from your chest to your groin.");
            // -[If not]
            else DisplayText(" and slides her fingers up to your nipples, pinching and twisting them, torturing you with pain and pleasure.");
            DisplayText("\n\n");

            DisplayText("The goblin, almost drooling, says \"<i>Baby, we're both horny, but fingers and tongues just aren't enough for me. Lucky for you, I've got just the thing.</i>\"\n\n");

            DisplayText("For a moment, your dumb, bimbo mind struggles to think of whatever she could, like, mean by that. Oh well, you giggle airheadedly and just let it happen.\n\n");

            DisplayText("The goblin reaches into another one of her pouches and pulls out a dildo that flops about in her hand as if it were glad to be free of the pouch. Slapping you on the cheek and grinning mischeviously, she offers, \"<i>Why don't we bury one end in each of our cunts? Just open your mouth and help me get it warmed up for us, okay?</i>\"\n\n");

            DisplayText("For a moment, you blink dumbly, trying to think why for, like, one tiny second you wanted to say 'no', but then you forget about it, let the horniness flow, and naturally pop your mouth open into a perfect-lip lined 'O', shooting her a involuntarily slutty look.\n\n");

            DisplayText("She instantly plugs your sex-doll-like mouth with the bulging dildo.  It plumps up somehow, forcing your jaw open and pinning your tongue to the bottom of your mouth – this is like, so much easier than having to hold it open yourself. A trickle of fluid escapes its tip. You swallow it reflexively – oh wait, was that like cum or like what? Your little brain is confused for a moment, at least 'til the smarter slut explains it to you.\n\n");

            DisplayText("\"<i>Yummy isn't it? I made this myself. It's made of the best stuff – it reacts with fluids to puff up and fill ANY hole perfectly. Which, by the looks of you, will probably be helpful.  You look like you've taken a few in your day.</i>\" She winks, \"<i>Oh, and even better... it has a little tube inside full of aphrodisiacs that'll slowly leak out into your wet body!</i>\"\n\n");

            DisplayText("Saliva coats your lips and dribbles down onto your boobs when the goblin pulls the thick, soaked dong out of your mouth. The part that was stuffed down your throat is swollen up to nearly twice as wide as the half still in her hand. The goblin quickly corrects that, slurping the second half down into her throat, taking at least eight inches into her mouth with no sign of gagging. She's like, totally good at this! She pulls it out, watching it puff up. She blushes, turning her slightly-dimpled, green cheeks a shade of purple. The dildo slaps your twat cruelly as she drops part of it onto your mons. With a few practiced motions, she shoves it inside you, stuffing you full of artificial cock, bringing your mind back to all the times you'd fucked yourself just like this. Your easy, wandering mind is brought back to the present by a small slap on the dildo, which sends vibrations right into your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + ".\n\n");

            DisplayText("Your green slut counterpart stands up and steps over your crotch, positioning herself perpendicular to you. The warm wetness of her dripping cunt splashes your thighs when she works the free end of the double-dong into her own slick twat. Your pussy squelches against hers wetly as they meet in the middle, your " + Desc.Vagina.describeClit(player) + " pressed on by her nether lips. The goblin twists, grinding and scissoring her thighs, the hard bud of her clit rubbing against your " + Desc.Vagina.describeClit(player) + " again and again.\n\n");

            DisplayText("By now your passage feels, like, more stuffed than ever! Every motion the tiny slut makes is amplified directly into the fuck-stick plugging your drooling pussy. Judging by how wonderful it feels rubbing and twisting against your well-experienced vaginal walls, the aphrodisiac is definitely working. You moan and spread your legs wide, giving the tiny dominatrix free reign over your body in its natural position – open and ready.\n\n");

            DisplayText("She wiggles against you harder, throwing her head back and running her fingers through her purple hair, shouting out encouragement all the while, \"<i>Mmm, you like this, don't you slut? My dildo fits your slutty cunt well, doesn't it? I bet that's rare. Keep wiggling those hips – the aphrodisiac is gravity fed, and with you on the bottom you'll be blissed into unconsciousness soon. Just don't cum before me hun, I want to feel release WITH you.</i>\"\n\n");

            DisplayText("It isn't hard these days, but you lose yourself in the sweet sensations of the bloated dildo that joins your simmering groins, pleasure whisking away whatever little intelligence you have left. Rocking back and forth, scissoring relentlessly against your green mistress, you moan, drowning yourself in a sea of drug-enhanced pleasure. The goblin cries out and thrashes in sudden orgasm, twisting the fat dildo violently around inside your slut-hole. The juices of her orgasm react with the toy, stretching you to a perfect level of vaginal gape – it's sooooo rare to, like, find someone who can stretch you out! Your bodies thrash together, wracked by twin orgasms that leave you smeared with a mixture of sweat and girl-cum.\n\n");

            DisplayText("Later, the wet goblin audibly pops off the dildo. She stumbles, bow-legged, before teasing your bimbo-clit and yanking her toy free of your needy pussy. Your lips gape wider than ever, but you've gotten used to your pussy getting stretched by now...");
            Mod.Vagina.displayStretchVagina(player, player.vaginalCapacity(), true, true, false);
            DisplayText("\n\n");

            DisplayText("She plants a kiss on your lips and mutters, \"<i>Can't forget this,</i>\" as she puts her dildo away. You find yourself smiling and watching her strap-covered form jiggle pleasantly as she bounds away from you into the distance. Your eyelids drift closed and your lips go numb as her drugged lipstick begins to put you out.\n\n");

            DisplayText("Your eyes roll up into your head, leaving you looking dumber than ever. Damn, like, that was, like, totally fucking amazing!");
            player.orgasm();
            return { next: Scenes.camp.returnToCampUseOneHour };
        }
    }
    DisplayText("The goblin saunters up to you, wiggling her hips with a needy, sexual sway.  She opens a small pouch and pulls out a tube of lipstick, pausing to apply it to her lips.  She caps off the tube and blows you a kiss with a wet smacking sound as she steps up to your ");
    if (player.stats.HP < 1) DisplayText("defeated");
    else DisplayText("trembling");
    DisplayText(" form.  Your breath is knocked from your body as she drops all her weight onto your middle, making her ass and well-rounded tits jiggle enticingly.   She reaches up to twist her nipple-studs, grinding the sopping wetness of her crotch up and down your belly.\n\n");
    DisplayText("Your body grows hot, responding to the tiny fetish-slut's outrageous display of desire.  ");
    if (player.torso.cocks.count > 0) {
        DisplayImage(ImageName.goblin_loss_male_raped);
        DisplayText("The warmth spreads, growing larger ");
        if (player.torso.cocks.get(0).length <= 7) DisplayText("as your bulge begins to press between her soft ass-cheeks");
        else if (player.torso.cocks.get(0).length <= 14) DisplayText("as your bulge grows upwards between her ass-cheeks and lays against the small of her back");
        else DisplayText("as your bulge grows up her back and creeps towards her shoulders steadily");
        DisplayText(".  ");
    }
    if (player.torso.vaginas.count > 0) {
        DisplayImage(ImageName.goblin_loss_female_raped);
        if (player.torso.vaginas.get(0).wetness <= VaginaWetness.NORMAL) DisplayText("The lips of your sex engorge, becoming almost as puffy as the goblin's.  ");
        else if (player.torso.vaginas.get(0).wetness < VaginaWetness.DROOLING) DisplayText("Feminine lubricant soaks into the back of your " + player.inventory.equipment.armor.displayName + ".  ");
        else DisplayText("It rapidly forms into a puddle as your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " does its best to show just how ready you are.  ");
    }
    DisplayText("Your " + Desc.Breast.describeNipple(player, player.torso.chest.get(0)) + "s poke upwards, giving the goblin easy targets.  She grabs hold of them ");
    if (player.torso.chest.find(BreastRow.FuckableNipples)) DisplayText("slipping her thumbs inside the tender cunts and pinching against them tightly");
    else DisplayText("twisting and tweaking");
    DisplayText(", torturing you with pain and pleasure.\n\n");
    // [DICK VERSION]
    if (player.torso.cocks.count > 0 && (player.torso.vaginas.count <= 0 || randInt(2) === 0)) {
        // [TOO BIG]
        if (player.torso.cocks.get(0).area > goblin.vaginalCapacity()) {
            DisplayText("She lifts her body up high, grabbing your " + Desc.Cock.describeCock(player, player.torso.cocks.get(0)) + " with both her petite hands.  Your mind somehow makes note of the shiny black of her fingernails as she struggles to part her dripping wet womanhood around your massive member.  Though her body stretches to an absurd degree, she just can't get you inside. She pouts and drops your tool back onto you, promising you, \"<i>I'll find a way to get every ounce of your cum inside me, don't you worry.</i>\"\n\n");
            DisplayText("The little slut jumps back onto you, wrapping her arms and legs tightly around your member.  Her tongue slithers over ");
            if (player.torso.balls.quantity > 0) DisplayText("your " + Desc.Balls.describeBalls(true, true, player));
            else DisplayText("the base of your " + Desc.Cock.describeCock(player, player.torso.cocks.get(0)));
            DisplayText(" before she buries it deep into your " + Desc.Body.assholeOrPussy(player) + ".  Her thighs, breasts, and body surround you with a shroud of warm green flesh that wriggles and twists around you with feverish lust.  The lips of her still-partially stretched cunt do their best to devour your member's head when the flexible little minx curves her hips back down to grind on it.\n\n");
            DisplayText("The lewd little creature body-fucking your titanic tool is just so passionate and sensual that you can't hold the budding pressure in your loins.  You're sure you must be leaking pre-cum, but the squishing wet cunt wrapped around your cock-tip has you so slathered in fuck-juice you'd never be able to tell.  You tremble, struggling to hold back and ");
            if (player.stats.cor > 50) DisplayText("prolong your pleasure");
            else DisplayText("prevent the monstrous girl from getting what she wants");
            DisplayText(".  The goblin looks back over her shoulder, narrows her eyes, and pulls back to say, \"<i>Don't even think about holding back stud.</i>\"\n\n");
            DisplayText("She works her fingers into the void her tongue left behind, ");
            if (player.torso.vaginas.count > 0) DisplayText("caressing your " + Desc.Vagina.describeClit(player));
            else DisplayText("pressing tightly against your prostate");
            DisplayText(" as she whispers, \"<i>Go ahead, make my twat a swollen cum-dump.  I NEED you to FILL me with ALL of your cream.  Stuff me full of your fuck-juice and I promise I'll give you a dozen slutty daughters to fill with jizz every night.</i>\"\n\n");
            DisplayText("Her fingers and words have the desired effect, drawing out a tremendously pleasurable orgasm.  Your hips rock and buck against her lithe body, forcing her to cling on to your spasming form as globules of cum force their way up your massive urethra.  You can feel them explode into the tiny girl's sopping tunnel, immediately soaking into her womb.");
            if (player.cumQ() > 100) DisplayText("  Your loads keep coming, until the jism begins to backwash out of her love tunnel to soak her body and your midsection.");
            if (player.cumQ() >= 250) DisplayText("  Her belly distorts visibly as her uterus is packed full of cum, making her look heavily pregnant already.  She coos in delight at the sight of her swollen abdomen.");
            DisplayText("  Satisfied, your orgasm tapers off into tiny dribbles.  The goblin slips off you, looking a bit bowlegged, but utterly pleased.\n\n");
            DisplayText("She waves, \"<i>Thanks for the spunk hun!  It ");
            if (player.cumQ() < 100) DisplayText("wasn't much, but I'll make do");
            else if (player.cumQ() < 250) DisplayText("should be plenty to make a few new wet-behind-the-ears sluts for you to fuck");
            else DisplayText("was better than I could have dreamed.  I'm going to find you again stud");
            DisplayText("!</i>\"\n\n");
            DisplayText("She giggles again and leans over to kiss you on the lips, smearing her thick bubbly lips across your own and leaving you tasting the bubble-gum of her lipstick.  You find yourself smiling dreamily and slipping into unconsciousness... there must have been something in that lipstick!");
            return { next: Scenes.camp.returnToCampUseOneHour };
            player.orgasm();
        }
        // [DICK FITS]
        else {
            DisplayText("The goblin-girl doesn't waste time with any more foreplay, she just arches her back like a cat about to get the cream, and slides her plush ass towards your " + Desc.Cock.describeCock(player, player.torso.cocks.get(0)) + " with deliberate slowness.  Her eyes watch you with an intent expression as the slightly parted lips of her sex brush against your ");
            if (player.torso.cocks.get(0).type === CockType.HORSE) DisplayText("flare");
            else DisplayText("cock-head");
            DisplayText(", spreading around you ever-so-slowly as she sinks further and further down.  She licks her glossy lips and blows you a kiss as she violently pushes the rest of the way down, impaling herself on every inch of your length.\n\n");
            DisplayText("She arches her back further, proudly displaying the bulge your manhood has made in her tight little tummy.  She coos while fiddling with her clit, \"<i>Mmmm I'm so glad that fit.  The last mate I found was too big to stuff my greedy hole, and that's never as fun.</i>\"  She looks wistful for a moment as her hips begin grinding up and down, \"<i>He did fill me fit to burst though.  Can you do that for me?  Can you fuck me pregnant?</i>\" she asks.\n\n");
            DisplayText("You're too turned on to do anything besides groan and nod, imprisoned by desire and her tight wet pussy.  You can feel it rippling around you, squeezing and milking in rhythmic motions as if it's trying to drain you dry.  Girlish giggles erupt from the goblin when your hips start grinding back against her, bouncing her up and down and making her leather-wrapped tits jiggle for you.  Light reflects off her piercings with hypnotic intensity as they bounce to and fro.\n\n");
            DisplayText("The sultry slut pulls out a flask from somewhere behind her and uncorks it, releasing a puff of red smoke that smells of cherries.\n\n");
            DisplayText("\"<i>Drink your medicine for me stud, I need to make sure you've got a full load for me,</i>\" she orders, stretching to press the flask to your lips.  ");
            if (player.stats.cor < 50) DisplayText("You shake your head, trying to get away from the sweet-smelling drug, but she tilts it up, pouring most of it into your throat.");
            else DisplayText("You lick your lips and open your mouth, happily taking in the cherry-flavored drug.");
            DisplayText("  A sensation of dizziness flows through you, along with relaxing waves of gentle warmth that make it easy to relax and let that cute green whore take your shaft.\n\n");
            DisplayText("She reaches down to ");
            if (player.torso.balls.quantity > 0) DisplayText("cup your " + Desc.Balls.describeBalls(true, true, player) + " in one hand, squeezing gently as the drug begins to affect them");
            else DisplayText("squeeze your taint in her hand, giggling as your prostate suddenly begins to swell from the drug");
            DisplayText(". In no time your crotch is feeling tight and full.  You feel fit to burst, and you're surely dripping pre into the goblin's hungry cunt.  She pats your chest knowingly, rocking back and forth slowly and sighing contentedly.  \"<i>Feel that hun?  That's my special alchemical creation, designed to put your body into an incredibly potent rut.  In a few seconds you'll have too much jizz to hold in, and you'll have to cum for me.  Are you ready baby?  Don't hold back now, my cunt's waiting,</i>\" she coos.\n\n");
            DisplayText("Your dick obeys happily, thickening slightly as your abdominal muscles clench with the force of your orgasm.  The goblin's pupils shrink and her eyes roll back as the first torrent of cum splatters against her cervix.  She quivers when the pressure builds up and begins to fill her womb.  You clench again, this time pressing against her as the drug's effects begin wearing off.  Her belly stretches out slightly from all the cum packed inside her, but you know you aren't done.   She drools, her tongue hanging lewdly from her mouth as you pump load after load into her fertile womb, but like all good things, it does come to an end.\n\n");
            DisplayText("The goblin regains consciousness, and flops off of you, grabbing her belly and smiling blissfully, before staggering up to her feet.  She thanks you, \"<i>Mmmm, good job stud.  I'll have to let my daughters know how to find you once they're born.  I think you've got what it takes for me to start my own tribe!</i>\"  Patting your still-dripping member, the pregnant goblin leans down and gives you a wet kiss with her glossy lips.  You smile contentedly and close your eyes, barely realizing her lipstick was drugged before you pass out.");
            player.orgasm();
            return { next: Scenes.camp.returnToCampUseOneHour };
        }
        // [END MALE]
    }
    // [FEMALEZ]
    else {
        DisplayText("The goblin says, \"<i>Baby we're both horny, but fingers and tongues just aren't enough for me. Lucky for you, I've got just the thing.</i>\"\n\n");
        DisplayText("She reaches into a tiny bulging pouch on her hip and pulls out a dildo that flops about in her hand as if was glad to be free.  Slapping you on the cheek and grinning impishly, she offers, \"<i>Why don't we bury one end in each of our cunts?  Just open your mouth and help me get it warmed up for us, OK?</i>\"\n\n");
        if (player.stats.cor < 33) DisplayText("You shake your head violently, clearly indicating 'No', but when you open your mouth to vocalize your complaint, your lips are swiftly plugged with bulging sex-toy.");
        else if (player.stats.cor < 66) DisplayText("You open your mouth to stammer out your concerns, but she plugs the hole with the floppy artificial dong, turning your speech into surprised muffles.");
        else DisplayText("You lick your lips coyly then open your mouth into a welcoming 'O'.  The sex-toy slips straight into the hole, muffling the sounds of your happiness with the arrangement.");
        DisplayText("  It 'plumps' up somehow - perhaps in reaction to your spit - forcing your jaw open and pinning your tongue to the bottom of your mouth.  A trickle of fluid escapes its tip, nearly gagging you before your throat reflexively drinks it down.  What did you just swallow?\n\n");
        DisplayText("\"<i>Yummy yummy isn't it?  I made this myself.  It's made up of the best stuff – it reacts with fluids to puff up and fill ANY hole perfectly.  Even better, it has a reservoir stuffed with aphrodisiacs that'll slowly leak out.  Do you feel warm yet hun?</i>\" she asks.\n\n");
        DisplayText("You sputter a bit when she pulls the thick spit-soaked dong out of your mouth.  The part that was stuffed down your throat is swollen up nearly twice as wide as the half in her hand.  The goblin slurps the other half into her throat, taking at least eight inches into her mouth with no sign of discomfort.  She pulls it out, watching it begin to puff up and blushing, turning her slightly-dimpled cheeks purple.   The dildo slaps your twat cruelly as she drops part of it onto your mons.  With a few expert motions, she shoves it inside you, stuffing you full of artificial cock.  The goblin giggles again and slaps the outer half of the dong, making it flop about and sending vibrations directly to your core.\n\n");
        DisplayText("The green slut stands up and steps over your crotch, positioning herself at a ninety degree angle to you.   The warm wetness of her readiness splashes your thighs when she works the free end of the double-dong into her own aching twat.  She slides down its length, easily taking the remaining length up her juicy cunt.  Your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " squelches against hers wetly as they meet in the middle.  The goblin twists, grinding and scissoring her thighs, the hard bud of her clit rubbing back and forth over your " + Desc.Vagina.describeClit(player) + ".\n\n");
        if (player.torso.clit.length >= 7) DisplayText("Of course, the sheer size of your clit makes it difficult for the goblin to handle in the normal way - it keeps slipping between up her breasts.  The tiny green tart's eyes light up with a devilish idea.  She pulls out a vial of pink slime and dumps it over her breasts, pushing them around your clit and smothering them in slippery flesh.   You cry out in delight, overwhelmed by the feelings radiating from your over-sized pleasure-buzzer as it is mercilessly worked by the tiny woman.\n\n");
        DisplayText("By now your passage feels as stuffed as it ever has been, crammed totally full of the squishy expanded double-dong.  Every motion the tiny slut makes is amplified directly into the fuck-stick plugging your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + ".  Judging by how wonderful it feels rubbing and twisting against your sensitive walls, the aphrodisiac is definitely having an effect.  You moan and spread your legs wide, giving the tiny dominatrix free reign over your body.  She wiggles against you harder, throwing her head back and running her fingers through her " + goblin.torso.neck.head.hair.color + " hair, shouting out encouragement all the while, \"<i>Mmmm, you like this, don't you slut?  Doesn't my dildo just fill you up perfectly?  Keep wiggling those hips – the aphrodisiac is gravity fed, and with you on the bottom you'll be blissed into unconsciousness soon.  Just don't cum before me hun, I want to feel release with you.</i>\"\n\n");
        DisplayText("You lose yourself to the sweet sensations of the bloated dildo that joins your simmering groins.  Rocking back and forth, scissoring relentlessly against your green mistress, you moan, drowning yourself in a sea of drug-enhanced pleasure. The goblin cries out and thrashes in sudden orgasm, twisting the fat dildo violently around inside your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + ".   The juices of her orgasm react with the toy, stretching you almost painfully and pushing you past the point of no return.  Your bodies thrash together, wracked by twin orgasms that leave you smeared with a mixture of sweat and girl-cum.\n\n");
        DisplayText("Later, the wet goblin audibly pops off the dildo.  She stumbles, bow-legged, before teasing your " + Desc.Vagina.describeClit(player) + " and yanking her toy free.  Your lips ");
        if (player.torso.vaginas.get(0).looseness <= VaginaLooseness.GAPING) DisplayText("gape apart momentarily");
        else DisplayText("gape wider than ever, but only for a moment");
        DisplayText(".\n\n");
        DisplayText("She plants a kiss on your lips and mutters, \"<i>Can't forget this,</i>\" as she puts her dildo away.  You find yourself smiling and watching her strap-covered form jiggle pleasantly as she bounds away from you into the distance.  Your eyelids drift closed and your lips go numb as her drugged lipstick puts you out.  ");
        Mod.Vagina.displayStretchVagina(player, player.vaginalCapacity(), true);
        player.orgasm();
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
}

// [WIN RAEPZ]
export function gobboRapeIntro(player: Character, goblin: Character) {
    DisplaySprite(SpriteName.Goblin);
    DisplayText().clear();
    // [HP Intro]
    if (goblin.stats.HP < 1) DisplayText("The goblin falls down, smashing her tits flat on the ground and crying softly from the pain.  She looks up at you and sniffles.");
    // [Lust Intro]
    else {
        DisplayText("The goblin groans and drops onto her back.  Her legs spread wide, displaying amazing flexibility as one hand dives into her cunt and the other begins twisting her pierced nipples, one at a time.  The display manages to stir your loins.");
        player.stats.lust += 20;
    }
    gobboAssassinRapeIntro(player, goblin);
}
