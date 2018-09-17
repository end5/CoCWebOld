import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { SkinType } from '../../Body/Skin';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import { ItemDesc } from '../ItemDesc';

export class NumbRock extends Consumable {
    public constructor() {
        super(ConsumableName.NumbRock, new ItemDesc("Numb Rox", "a strange packet of candy called 'Numb Rocks'", "This packet of innocuous looking 'candy' guarantees to reduce troublesome sensations and taste delicious."), 15);
    }

    public use(character: Character) {
        DisplayText().clear();
        // Numb rocks lower lust significantly but have a chance of inducing the masturbation preventing effect from minotaur.
        DisplayText("You pop open the package of numb rocks and dump it into your waiting mouth.  The strange candy fizzes and pops, leaving the nerves on your tongue feeling a bit deadened as you swallow the sweet mess.");

        if (character.stats.lust >= 33) {
            DisplayText("\n\nThe numbness spreads through your body, bringing with it a sense of calm that seems to muffle your sexual urges.");
            character.stats.lust -= 20 + randInt(40);
        }
        if (randInt(5) === 0) {
            if (!character.statusAffects.has(StatusAffectType.Dysfunction)) {
                DisplayText("\n\nUnfortunately, the skin of ");
                if (character.torso.cocks.count > 0) {
                    DisplayText(Desc.Cock.describeMultiCockSimpleOne(character));
                    if (character.torso.vaginas.count > 0) DisplayText(" and");
                    DisplayText(" ");
                }
                if (character.torso.vaginas.count > 0) {
                    if (character.torso.cocks.count <= 0) DisplayText("your ");
                    DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " ");
                }
                if (!(character.torso.cocks.count > 0 || character.torso.vaginas.count > 0)) DisplayText(Desc.Butt.describeButthole(character.torso.butt) + " ");
                DisplayText(" numbs up too.  You give yourself a gentle touch, but are quite disturbed when you realize you can barely feel it.  You can probably still fuck something to get off, but regular masturbation is out of the question...");
                character.statusAffects.add(StatusAffectType.Dysfunction, 50 + randInt(100), 0, 0, 0);
            }
            else {
                DisplayText("\n\nSadly your groin becomes even more deadened to sensation.  You wonder how much longer you'll have to wait until you can please yourself again.");
                character.statusAffects.get(StatusAffectType.Dysfunction).value1 = 50 + randInt(100);
            }
        }
        else if (randInt(4) === 0 && character.stats.int > 15) {
            DisplayText("\n\nNumbness clouds your mind, making you feel slow witted and dull.  Maybe these candies weren't such a exceptio... fantas... good idea.");
            character.stats.int -= 1 + randInt(5);
        }
        if (!character.perks.has(PerkType.ThickSkin) && character.stats.sens < 30 && randInt(4) === 0) {
            DisplayText("Slowly, ");
            if (character.skin.type === SkinType.PLAIN) DisplayText("your skin");
            else DisplayText("the skin under your " + character.skin.desc);
            DisplayText(" begins to feel duller, almost... thicker.  You pinch yourself and find that your epidermis feels more resistant to damage, almost like natural armor!\n<b>(Thick Skin - Perk Gained!)</b>");
            character.perks.add(PerkType.ThickSkin, 0, 0, 0, 0);
        }
        DisplayText("\n\nAfter the sensations pass, your " + character.skin.desc + " feels a little less receptive to touch.");
        character.stats.sens += -3;
        if (character.stats.sens < 1) character.stats.sens = 1;
    }
}
