import { FaceType } from '../../../Body/Face';
import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import Player from '../../../Player/Player';
import Utils from '../../../Utilities/Utils';
import PlayerPhysicalAction from '../Player/PlayerPhysicalAction';

export default class Bite extends PlayerPhysicalAction {
    public isPossible(player: Player): boolean {
        return player.upperBody.head.face.faceType == FaceType.SHARK_TEETH;
    }

    public baseCost: number = 25;
    private reason: string;
    public canUse(player: Player, monster: Character): boolean {
        if (player.stats.fatigue + this.physicalCost(player) > 100) {
            this.reason = "You're too fatigued to use your shark-like jaws!";
            return false;
        }
        //Worms are special
        if (monster.desc.short == "worms") {
            this.reason = "There is no way those are going anywhere near your mouth!\n\n";
            return false;
        }
        return true;
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Character) {
        player.stats.fatiguePhysical(this.baseCost);
        //Amily!
        DisplayText.clear();
        if (monster.statusAffects.has("Concentration")) {
            DisplayText.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        DisplayText.text("You open your mouth wide, your shark teeth extending out. Snarling with hunger, you lunge at your opponent, set to bite right into them!  ");
        if (player.statusAffects.has("Blind"))
            DisplayText.text("In hindsight, trying to bite someone while blind was probably a bad idea... ");
        //Determine if dodged!
        if ((player.statusAffects.has("Blind") && Utils.rand(3) != 0) ||
            (monster.stats.spe - player.stats.spe > 0 && Math.floor(Utils.rand(((monster.stats.spe - player.stats.spe) / 4) + 80)) > 80)) {
            if (monster.stats.spe - player.stats.spe < 8)
                DisplayText.text(monster.desc.capitalA + monster.desc.short + " narrowly avoids your attack!");
            if (monster.stats.spe - player.stats.spe >= 8 && monster.stats.spe - player.stats.spe < 20)
                DisplayText.text(monster.desc.capitalA + monster.desc.short + " dodges your attack with superior quickness!");
            if (monster.stats.spe - player.stats.spe >= 20)
                DisplayText.text(monster.desc.capitalA + monster.desc.short + " deftly avoids your slow attack.");
            DisplayText.text("\n\n");
            return;
        }
        //Determine damage - str modified by enemy toughness!
        let damage: number = Math.floor((player.stats.str + 45) - Utils.rand(monster.stats.tou) - monster.defense());

        //Deal damage and update based on perks
        if (damage > 0) {
            damage *= monster.physicalAttackMod();
            damage = monster.combat.loseHP(damage, player);
        }

        if (damage <= 0) {
            damage = 0;
            DisplayText.text("Your bite is deflected or blocked by " + monster.desc.a + monster.desc.short + ".");
        }
        if (damage > 0 && damage < 10) {
            DisplayText.text("You bite doesn't do much damage to " + monster.desc.a + monster.desc.short + "! (" + damage + ")");
        }
        if (damage >= 10 && damage < 20) {
            DisplayText.text("You seriously wound " + monster.desc.a + monster.desc.short + " with your bite! (" + damage + ")");
        }
        if (damage >= 20 && damage < 30) {
            DisplayText.text("Your bite staggers " + monster.desc.a + monster.desc.short + " with its force. (" + damage + ")");
        }
        if (damage >= 30) {
            DisplayText.text("Your powerful bite <b>mutilates</b> " + monster.desc.a + monster.desc.short + "! (" + damage + ")");
        }
        DisplayText.text("\n\n");
    }
}
