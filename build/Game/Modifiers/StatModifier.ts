import DisplayText from '../../Engine/display/DisplayText';
import Character from '../Character/Character';

export function displayCharacterHPChange(character: Character, changeAmount: number) {
    if (changeAmount > 0 && character.stats.HP === character.stats.maxHP()) {
        DisplayText("You're as healthy as you can be.\n");
        return;
    }

    const oldHP = character.stats.HP;
    character.stats.HP += changeAmount;
    const diff = character.stats.HP - oldHP;

    if (diff > 0) {
        if (character.stats.HP === character.stats.maxHP())
            DisplayText("Your HP maxes out at " + character.stats.maxHP() + ".\n");
        else
            DisplayText("You gain " + diff + " HP.\n");
    }
    // Negative HP
    else if (diff < 0) {
        if (character.stats.HP === 0)
            DisplayText("You take " + diff + " damage, dropping your HP to 0.\n");
        else
            DisplayText("You take " + diff + " damage.\n");
    }
}
