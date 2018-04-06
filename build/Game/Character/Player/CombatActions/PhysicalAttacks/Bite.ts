import DisplayText from '../../../../../Engine/display/DisplayText';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { FaceType } from '../../../../Body/Face';
import Character from '../../../../Character/Character';
import { StatusAffectType } from '../../../../Effects/StatusAffectType';
import Player from '../../Player';
import PlayerPhysicalAction from '../PlayerPhysicalAction';

export class Bite extends PlayerPhysicalAction {
    public name: string = "Bite";
    public reasonCannotUse: string = "";
    public baseCost: number = 25;

    public isPossible(player: Player): boolean {
        return player.torso.neck.head.face.type === FaceType.SHARK_TEETH;
    }

    public canUse(player: Player, monster: Character): boolean {
        if (player.stats.fatigue + this.physicalCost(player) > 100) {
            this.reasonCannotUse = "You're too fatigued to use your shark-like jaws!";
            return false;
        }
        // Worms are special
        if (monster.desc.short === "worms") {
            this.reasonCannotUse = "There is no way those are going anywhere near your mouth!\n\n";
            return false;
        }
        return true;
    }

    public use(player: Player, monster: Character) {
        player.stats.fatiguePhysical(this.baseCost);
        // Amily!
        DisplayText().clear();
        if (monster.statusAffects.has(StatusAffectType.Concentration)) {
            DisplayText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        DisplayText("You open your mouth wide, your shark teeth extending out. Snarling with hunger, you lunge at your opponent, set to bite right into them!  ");
        if (player.statusAffects.has(StatusAffectType.Blind))
            DisplayText("In hindsight, trying to bite someone while blind was probably a bad idea... ");
        // Determine if dodged!
        if ((player.statusAffects.has(StatusAffectType.Blind) && randInt(3) !== 0) ||
            (monster.stats.spe - player.stats.spe > 0 && Math.floor(randInt(((monster.stats.spe - player.stats.spe) / 4) + 80)) > 80)) {
            if (monster.stats.spe - player.stats.spe < 8)
                DisplayText(monster.desc.capitalA + monster.desc.short + " narrowly avoids your attack!");
            if (monster.stats.spe - player.stats.spe >= 8 && monster.stats.spe - player.stats.spe < 20)
                DisplayText(monster.desc.capitalA + monster.desc.short + " dodges your attack with superior quickness!");
            if (monster.stats.spe - player.stats.spe >= 20)
                DisplayText(monster.desc.capitalA + monster.desc.short + " deftly avoids your slow attack.");
            DisplayText("\n\n");
            return;
        }
        // Determine damage - str modified by enemy toughness!
        let damage: number = Math.floor((player.stats.str + 45) - randInt(monster.stats.tou) - monster.combat.stats.defense());

        // Deal damage and update based on perks
        if (damage > 0) {
            damage *= monster.combat.stats.physicalAttackMod();
            damage = monster.combat.stats.loseHP(damage, player);
        }

        if (damage <= 0) {
            damage = 0;
            DisplayText("Your bite is deflected or blocked by " + monster.desc.a + monster.desc.short + ".");
        }
        if (damage > 0 && damage < 10) {
            DisplayText("You bite doesn't do much damage to " + monster.desc.a + monster.desc.short + "! (" + damage + ")");
        }
        if (damage >= 10 && damage < 20) {
            DisplayText("You seriously wound " + monster.desc.a + monster.desc.short + " with your bite! (" + damage + ")");
        }
        if (damage >= 20 && damage < 30) {
            DisplayText("Your bite staggers " + monster.desc.a + monster.desc.short + " with its force. (" + damage + ")");
        }
        if (damage >= 30) {
            DisplayText("Your powerful bite <b>mutilates</b> " + monster.desc.a + monster.desc.short + "! (" + damage + ")");
        }
        DisplayText("\n\n");
    }
}
