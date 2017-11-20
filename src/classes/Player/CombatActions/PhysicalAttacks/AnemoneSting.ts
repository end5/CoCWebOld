import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import Utils from '../../../Utilities/Utils';
import Player from '../../Player';
import PlayerCombatAction from '../PlayerCombatAction';

export class AnemoneSting implements PlayerCombatAction {
    public isPossible(player: Player): boolean {
        return player.upperBody.head.hairType == 4;
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        //-sting with hair (combines both bee-sting effects, but weaker than either one separately):
        //Fail!
        //25% base fail chance
        //Increased by 1% for every point over PC's speed
        //Decreased by 1% for every inch of hair the PC has
        const hairLength: number = player.upperBody.head.hairLength;
        let prob: number = 70;
        if (monster.stats.spe > player.stats.spe)
            prob -= monster.stats.spe - player.stats.spe;
        prob += hairLength;
        if (prob <= Utils.rand(101)) {
            //-miss a sting
            if (monster.desc.plural) DisplayText.text("You rush " + monster.desc.a + monster.desc.short + ", whipping your hair around to catch them with your tentacles, but " + monster.desc.subjectivePronoun + " easily dodge.  Oy, you hope you didn't just give yourself whiplash.");
            else
                DisplayText.text("You rush " + monster.desc.a + monster.desc.short + ", whipping your hair around to catch it with your tentacles, but " + monster.desc.subjectivePronoun + " easily dodges.  Oy, you hope you didn't just give yourself whiplash.");
        }
        //Success!
        else {
            DisplayText.text("You rush " + monster.desc.a + monster.desc.short + ", whipping your hair around like a genie");
            DisplayText.text(", and manage to land a few swipes with your tentacles.  ");
            if (monster.desc.plural) DisplayText.text("As the venom infiltrates " + monster.desc.possessivePronoun + " bodies, " + monster.desc.subjectivePronoun + " twitch and begin to move more slowly, hampered half by paralysis and half by arousal.");
            else
                DisplayText.text("As the venom infiltrates " + monster.desc.possessivePronoun + " body, " + monster.desc.subjectivePronoun + " twitches and begins to move more slowly, hampered half by paralysis and half by arousal.");
            //(decrease speed/str, increase lust)
            //-venom capacity determined by hair length, 2-3 stings per level of length
            //Each sting does 5-10 lust damage and 2.5-5 speed damage
            let damage: number = 0;
            let damageMultiplier: number = 1 + Utils.rand(2);
            if (hairLength >= 12) damageMultiplier += 1 + Utils.rand(2);
            if (hairLength >= 24) damageMultiplier += 1 + Utils.rand(2);
            if (hairLength >= 36) damageMultiplier += 1;
            while (damageMultiplier > 0) {
                damageMultiplier--;
                damage += 5 + Utils.rand(6);
            }
            damage += player.stats.level * 1.5;
            monster.stats.spe -= damage / 2;
            damage = monster.stats.lustVuln * damage;
            monster.stats.lust += damage;
            //Clean up down to 1 decimal point
            damage = Math.round(damage * 10) / 10;
            DisplayText.text(" (" + damage + ")");
        }
        //New lines and moving on!
        DisplayText.text("\n\n");
    }
}
