import { DisplayText } from '../../../../../Engine/display/DisplayText';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { LegType } from '../../../../Body/Legs';
import { Character } from '../../../../Character/Character';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Player } from '../../Player';
import { PlayerPhysicalAction } from '../PlayerPhysicalAction';

export class Constrict extends PlayerPhysicalAction {
    public name: string = "Constrict";
    public readonly baseCost: number = 10;

    public isPossible(player: Player): boolean {
        return player.body.legs.type === LegType.NAGA;
    }

    public canUse(player: Player, monster: Character): boolean {
        if (player.stats.fatigue + this.physicalCost(player) <= 100) {
            this.reasonCannotUse = "You just don't have the energy to wrap yourself so tightly around someone right now...";
            return false;
        }
        // Cannot be used on plural enemies
        if (monster.desc.plural) {
            this.reasonCannotUse = "You launch yourself at " + monster.desc.a + monster.desc.short + ", but with multiple enemies, wrapping one up would leave you completely open to attack.  You hastily slither backwards before you expose yourself to danger.";
            return false;
        }
        if (monster.desc.short === "pod") {
            this.reasonCannotUse = "You can't constrict something you're trapped inside of!";
            return false;
        }
        return true;
    }

    public use(player: Player, monster: Character): NextScreenChoices {
        // Amily!
        DisplayText().clear();
        if (monster.statusAffects.has(StatusEffectType.Concentration)) {
            DisplayText("Amily easily glides around your attack thanks to her complete concentration on your movements.");
            return;
        }
        // WRAP IT UPPP
        if (randInt(player.stats.spe + 40) > monster.stats.spe) {
            if (monster.desc.short === "demons") {
                DisplayText("You look at the crowd for a moment, wondering which of their number you should wrap up. Your glance lands upon a random demon amongst the crowd. You quickly slither through the demon crowd as it closes in around you and launch yourself towards your chosen prey. You grab him out of the sea of monsters, wrap your long snake tail around his form and squeeze tightly, grinning as you hear his roars of pleasure turn to cries of distress.");
            }
            // (Otherwise)
            else {
                DisplayText("You launch yourself at " + monster.desc.a + monster.desc.short + " and wrap yourself around " + monster.desc.objectivePronoun + ". You squeeze " + monster.desc.objectivePronoun + " tightly and hear " + monster.desc.objectivePronoun + " cry out in pain.");
            }
            monster.statusAffects.add(StatusEffectType.Constricted, 1 + randInt(4), 0, 0, 0);
        }
        // Failure
        else {
            // Failure (-10 HPs) -
            DisplayText("You launch yourself at your opponent and attempt to wrap yourself around " + monster.desc.objectivePronoun + ". Before you can even get close enough, " + monster.desc.a + monster.desc.short + " jumps out of the way, causing you to fall flat on your face. You quickly pick yourself up and jump back.");
            player.combat.stats.loseHP(5, undefined);
        }
        return;
    }
}
