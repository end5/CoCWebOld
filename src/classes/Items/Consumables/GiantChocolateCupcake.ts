import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import BodyModifier from '../../Modifiers/BodyModifier';
import ItemDesc from '../ItemDesc';

export default class GiantChocolateCupcake extends Consumable {
    public constructor() {
        super(ConsumableName.GiantChocolateCupcake, new ItemDesc("CCupcak", "a gigantic, chocolate cupcake"), 250);
    }

    public use(character: Character) {
        DisplayText().clear();
        DisplayText("You look down at the massive chocolate cupcake and wonder just how you can possibly eat it all.  It fills the over-sized wrapper and bulges out over the top, somehow looking obscene even though it's merely a baked treat.  There is a single candle positioned atop its summit, and it bursts into flame as if by magic.  Eight red gumdrops ring the outer edge of the cupcake, illuminated by the flame.\n\n");
        DisplayText("You hesitantly take a bite.  It's sweet, as you'd expect, but there's also a slightly salty, chocolaty undercurrent of flavor.  Even knowing what the minotaur put in Maddie's mix, you find yourself grateful that this new creation doesn't seem to have any of his 'special seasonings'.  It wouldn't do to be getting drugged up while you're slowly devouring the massive, muffin-molded masterpiece. Before you know it, most of the cupcake is gone and you polish off the last chocolaty bites before licking your fingers clean.\n\n");
        DisplayText("Gods, you feel heavy!  You waddle slightly as your body begins thickening, swelling until you feel as wide as a house.  Lethargy spreads through your limbs, and you're forced to sit still a little while until you let out a lazy burp.\n\n");
        DisplayText("As you relax in your sugar-coma, you realize your muscle definition is fading away, disappearing until your " + character.skin.desc + " looks nearly as soft and spongy as Maddie's own.  You caress the soft, pudgy mass and shiver in delight, dimly wondering if this is how the cupcake-girl must feel all the time.");
        DisplayText(BodyModifier.displayModTone(character, 0, 100));
        DisplayText(BodyModifier.displayModThickness(character, 100, 100));
    }
}
