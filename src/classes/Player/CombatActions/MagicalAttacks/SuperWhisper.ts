import Character from '../../../Character/Character';
import { CharacterType } from '../../../Character/CharacterType';
import DisplayText from '../../../display/DisplayText';
import { PerkType } from '../../../Effects/PerkType';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { Utils } from '../../../Utilities/Utils';
import PlayerSpellAction from '../PlayerSpellAction';

export class SuperWhisperAttack extends PlayerSpellAction {
    public name: string = "Whisper";
    public readonly baseCost: number = 10;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.Whispered);
    }

    public canUse(character: Character): boolean {
        if (!character.perks.has(PerkType.BloodMage) && character.stats.fatigue + this.spellCost(character) > 100) {
            this.reasonCannotUse = "You are too tired to use this ability.";
            return false;
        }
        if (character.statusAffects.has(StatusAffectType.ThroatPunch) || character.statusAffects.has(StatusAffectType.WebSilence)) {
            this.reasonCannotUse = "You cannot focus to use this ability while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public use(character: Character, monster: Character) {
        DisplayText().clear();
        if (monster.desc.short === "pod" || monster.stats.int === 0) {
            DisplayText("You reach for the enemy's mind, but cannot find anything.  You frantically search around, but there is no consciousness as you know it in the room.\n\n");
            character.stats.fatigue++;
            return;
        }
        if (monster.charType === CharacterType.LivingStatue) {
            DisplayText("There is nothing inside the golem to whisper to.");
            character.stats.fatigue++;
            return;
        }
        character.stats.fatigueMagic(this.baseCost);
        if (monster.statusAffects.has(StatusAffectType.Shell)) {
            DisplayText("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.perks.has(PerkType.Focused)) {
            if (!monster.desc.plural)
                DisplayText(monster.desc.capitalA + monster.desc.short + " is too focused for your whispers to influence!\n\n");
            return;
        }
        // Enemy too strong or multiplesI think you
        if (character.stats.int < monster.stats.int || monster.desc.plural) {
            DisplayText("You reach for your enemy's mind, but can't break through.\n");
            character.stats.fatigue += 10;
            return;
        }
        // [Failure]
        if (Utils.rand(10) === 0) {
            DisplayText("As you reach for your enemy's mind, you are distracted and the chorus of voices screams out all at once within your mind. You're forced to hastily silence the voices to protect yourself.");
            character.stats.fatigue += 10;
            return;
        }
        DisplayText("You reach for your enemy's mind, watching as its sudden fear petrifies your foe.\n\n");
        monster.statusAffects.add(StatusAffectType.Fear, 1, 0, 0, 0);
    }
}
