import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import BallsDescriptor from '../../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../../Descriptors/BreastDescriptor';
import DisplayText from '../../../display/DisplayText';
import MainScreen from '../../../display/MainScreen';
import { CombatAbilityFlag } from '../../../Effects/CombatAbilityFlag';
import Utils from '../../../Utilities/Utils';

export default class Fantasize implements CombatAction {
    public name: string = "Fantasize";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.Fantasize ? true : false;
    }

    public canUse(character: Character, monster: Character): boolean {
        return true;
    }

    public use(character: Character, monster: Character) {
        let lustChange: number = 0;
        DisplayText.clear();
        if (character.inventory.armorSlot.equipment.displayName == "goo armor") {
            DisplayText.text("As you fantasize, you feel Valeria rubbing her gooey body all across your sensitive skin");
            if (character.gender > 0) DisplayText.text(" and genitals");
            DisplayText.text(", arousing you even further.\n");
            lustChange = 25 + Utils.rand(character.stats.lib / 8 + character.stats.cor / 8)
        }
        else if (character.lowerBody.balls > 0 && character.lowerBody.ballSize >= 10 && Utils.rand(2) == 0) {
            DisplayText.text("You daydream about fucking " + monster.desc.a + monster.desc.short + ", feeling your balls swell with seed as you prepare to fuck " + monster.desc.objectivePronoun + " full of cum.\n");
            lustChange = 5 + Utils.rand(character.stats.lib / 8 + character.stats.cor / 8);
            DisplayText.text("You aren't sure if it's just the fantasy, but your " + BallsDescriptor.describeBalls(true, true, character) + " do feel fuller than before...\n");
            character.hoursSinceCum += 50;
        }
        else if (character.upperBody.chest.BreastRatingLargest[0].breastRating >= 6 && Utils.rand(2) == 0) {
            DisplayText.text("You fantasize about grabbing " + monster.desc.a + monster.desc.short + " and shoving " + monster.desc.objectivePronoun + " in between your jiggling mammaries, nearly suffocating " + monster.desc.objectivePronoun + " as you have your way.\n");
            lustChange = 5 + Utils.rand(character.stats.lib / 8 + character.stats.cor / 8)
        }
        else if (character.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 6 && Utils.rand(2) == 0) {
            DisplayText.text("You fantasize about grabbing " + monster.desc.a + monster.desc.short + " and forcing " + monster.desc.objectivePronoun + " against a " + BreastDescriptor.describeNipple(character, character.upperBody.chest.get(0)) + ", and feeling your milk let down.  The desire to forcefeed SOMETHING makes your nipples hard and moist with milk.\n");
            lustChange = 5 + Utils.rand(character.stats.lib / 8 + character.stats.cor / 8)
        }
        else {
            DisplayText.clear();
            DisplayText.text("You fill your mind with perverted thoughts about " + monster.desc.a + monster.desc.short + ", picturing " + monster.desc.objectivePronoun + " in all kinds of perverse situations with you.\n");
            lustChange = 10 + Utils.rand(character.stats.lib / 5 + character.stats.cor / 8);
        }
        if (lustChange >= 20) DisplayText.text("The fantasy is so vivid and pleasurable you wish it was happening now.  You wonder if " + monster.desc.a + monster.desc.short + " can tell what you were thinking.\n\n");
        else DisplayText.text("\n");
        character.stats.lustNoResist += lustChange;
        if (character.stats.lust > 99) {
            if (monster.desc.short == "pod") {
                DisplayText.text("<b>You nearly orgasm, but the terror of the situation reasserts itself, muting your body's need for release.  If you don't escape soon, you have no doubt you'll be too fucked up to ever try again!</b>\n\n");
                character.stats.lust = 99;
                character.stats.lust += -25;
            }
            else {
                MainScreen.doNext(endLustLoss);
                return;
            }
        }
        MainScreen.doNext(combatMenu);
    }
}