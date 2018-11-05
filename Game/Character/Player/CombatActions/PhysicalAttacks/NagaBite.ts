import { randInt } from '../../../../../Engine/Utilities/SMath';
import { FaceType } from '../../../../Body/Face';
import { Character } from '../../../../Character/Character';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { Player } from '../../Player';
import { PlayerPhysicalAction } from '../PlayerPhysicalAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class NagaBite extends PlayerPhysicalAction {
    public name: string = "Bite";
    public reasonCannotUse: string = "You just don't have the energy to bite something right now...";
    public readonly baseCost: number = 10;

    public isPossible(player: Player): boolean {
        return player.body.face.type === FaceType.SNAKE_FANGS;
    }

    public canUse(player: Player): boolean {
        return player.stats.fatigue + this.physicalCost(player) <= 100;
    }

    public use(player: Player, monster: Character): void | NextScreenChoices {
        CView.clear();
        player.stats.fatiguePhysical(this.baseCost);
        // Works similar to bee stinger, must be regenerated over time. Shares the same poison-meter
        if (randInt(player.stats.spe / 2 + 40) + 20 > monster.stats.spe / 1.5) {
            // (if monster = demons)
            if (monster.desc.short === "demons") CView.text("You look at the crowd for a moment, wondering which of their number you should bite. Your glance lands upon the leader of the group, easily spotted due to his snakeskin cloak. You quickly dart through the demon crowd as it closes in around you and lunge towards the broad form of the leader. You catch the demon off guard and sink your needle-like fangs deep into his flesh. You quickly release your venom and retreat before he, or the rest of the group manage to react.");
            // (Otherwise)
            else CView.text("You lunge at the foe headfirst, fangs bared. You manage to catch " + monster.desc.a + monster.desc.short + " off guard, your needle-like fangs penetrating deep into " + monster.desc.possessivePronoun + " body. You quickly release your venom, and retreat before " + monster.desc.subjectivePronoun + " manages to react.");
            // The following is how the enemy reacts over time to poison. It is displayed after the description paragraph,instead of lust
            monster.stats.str -= 5 + randInt(5);
            monster.stats.spe -= 5 + randInt(5);
            if (monster.stats.str < 1) monster.stats.str = 1;
            if (monster.stats.spe < 1) monster.stats.spe = 1;
            const venomEffect = monster.combat.effects.get(CombatEffectType.NagaVenom);
            if (venomEffect && venomEffect.values && venomEffect.values.duration) {
                venomEffect.values.duration += 1;
            }
            monster.combat.effects.add(CombatEffectType.NagaVenom, player, {
                duration: 1,
                str: {
                    value: {
                        flat: 5 + randInt(5)
                    }
                },
                spe: {
                    value: {
                        flat: 5 + randInt(5)
                    }
                }
            });
        }
        else {
            CView.text("You lunge headfirst, fangs bared. Your attempt fails horrendously, as " + monster.desc.a + monster.desc.short + " manages to counter your lunge, knocking your head away with enough force to make your ears ring.");
        }
        CView.text("\n\n");
    }
}
