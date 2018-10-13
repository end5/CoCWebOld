import { randInt } from '../../../../../Engine/Utilities/SMath';
import { BreastRow } from '../../../../Body/BreastRow';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Character } from '../../../Character';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { CView } from '../../../../../Engine/Display/ContentView';
import { describeBalls } from '../../../../Descriptors/BallsDescriptor';
import { describeNipple } from '../../../../Descriptors/BreastDescriptor';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class Fantasize implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.Fantasize;
    public name: string = "Fantasize";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        let lustChange: number = 0;
        CView.clear();
        if (character.inventory.equipment.armor.displayName === "goo armor") {
            CView.text("As you fantasize, you feel Valeria rubbing her gooey body all across your sensitive skin");
            if (character.gender > 0) CView.text(" and genitals");
            CView.text(", arousing you even further.\n");
            lustChange = 25 + randInt(character.stats.lib / 8 + character.stats.cor / 8);
        }
        else if (character.body.balls.count > 0 && character.body.balls.size >= 10 && randInt(2) === 0) {
            CView.text("You daydream about fucking " + target.desc.a + target.desc.short + ", feeling your balls swell with seed as you prepare to fuck " + target.desc.objectivePronoun + " full of cum.\n");
            lustChange = 5 + randInt(character.stats.lib / 8 + character.stats.cor / 8);
            CView.text("You aren't sure if it's just the fantasy, but your " + describeBalls(true, true, character) + " do feel fuller than before...\n");
            character.hoursSinceCum += 50;
        }
        else if (character.body.chest.sort(BreastRow.Largest)[0].rating >= 6 && randInt(2) === 0) {
            CView.text("You fantasize about grabbing " + target.desc.a + target.desc.short + " and shoving " + target.desc.objectivePronoun + " in between your jiggling mammaries, nearly suffocating " + target.desc.objectivePronoun + " as you have your way.\n");
            lustChange = 5 + randInt(character.stats.lib / 8 + character.stats.cor / 8);
        }
        else if (character.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier >= 6 && randInt(2) === 0) {
            CView.text("You fantasize about grabbing " + target.desc.a + target.desc.short + " and forcing " + target.desc.objectivePronoun + " against a " + describeNipple(character, character.body.chest.get(0)) + ", and feeling your milk let down.  The desire to forcefeed SOMETHING makes your nipples hard and moist with milk.\n");
            lustChange = 5 + randInt(character.stats.lib / 8 + character.stats.cor / 8);
        }
        else {
            CView.clear();
            CView.text("You fill your mind with perverted thoughts about " + target.desc.a + target.desc.short + ", picturing " + target.desc.objectivePronoun + " in all kinds of perverse situations with you.\n");
            lustChange = 10 + randInt(character.stats.lib / 5 + character.stats.cor / 8);
        }
        if (lustChange >= 20) CView.text("The fantasy is so vivid and pleasurable you wish it was happening now.  You wonder if " + target.desc.a + target.desc.short + " can tell what you were thinking.\n\n");
        else CView.text("\n");
        character.stats.lustNoResist += lustChange;
        if (character.stats.lust > 99) {
            if (target.desc.short === "pod") {
                CView.text("<b>You nearly orgasm, but the terror of the situation reasserts itself, muting your body's need for release.  If you don't escape soon, you have no doubt you'll be too fucked up to ever try again!</b>\n\n");
                character.stats.lust = 99;
                character.stats.lust += -25;
            }
        }
    }
}
