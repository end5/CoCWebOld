import Character from '../../Character/Character';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import MainScreen from '../../display/MainScreen';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class PlayerFantasize {
    public use(player: Player, monster: Character) {

        let lustChange: number = 0;
        MainScreen.text("", true);
        if (player.inventory.armorSlot.equipment.displayName == "goo armor") {
            MainScreen.text("As you fantasize, you feel Valeria rubbing her gooey body all across your sensitive skin");
            if (player.gender > 0) MainScreen.text(" and genitals");
            MainScreen.text(", arousing you even further.\n");
            lustChange = 25 + Utils.rand(player.stats.lib / 8 + player.stats.cor / 8)
        }
        else if (player.lowerBody.balls > 0 && player.lowerBody.ballSize >= 10 && Utils.rand(2) == 0) {
            MainScreen.text("You daydream about fucking " + monster.desc.a + monster.desc.short + ", feeling your balls swell with seed as you prepare to fuck " + monster.desc.objectivePronoun + " full of cum.\n", false);
            lustChange = 5 + Utils.rand(player.stats.lib / 8 + player.stats.cor / 8);
            MainScreen.text("You aren't sure if it's just the fantasy, but your " + BallsDescriptor.describeBalls(true, true, player) + " do feel fuller than before...\n", false);
            player.hoursSinceCum += 50;
        }
        else if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 6 && Utils.rand(2) == 0) {
            MainScreen.text("You fantasize about grabbing " + monster.desc.a + monster.desc.short + " and shoving " + monster.desc.objectivePronoun + " in between your jiggling mammaries, nearly suffocating " + monster.desc.objectivePronoun + " as you have your way.\n", false);
            lustChange = 5 + Utils.rand(player.stats.lib / 8 + player.stats.cor / 8)
        }
        else if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 6 && Utils.rand(2) == 0) {
            MainScreen.text("You fantasize about grabbing " + monster.desc.a + monster.desc.short + " and forcing " + monster.desc.objectivePronoun + " against a " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + ", and feeling your milk let down.  The desire to forcefeed SOMETHING makes your nipples hard and moist with milk.\n", false);
            lustChange = 5 + Utils.rand(player.stats.lib / 8 + player.stats.cor / 8)
        }
        else {
            MainScreen.text("You fill your mind with perverted thoughts about " + monster.desc.a + monster.desc.short + ", picturing " + monster.desc.objectivePronoun + " in all kinds of perverse situations with you.\n", true);
            lustChange = 10 + Utils.rand(player.stats.lib / 5 + player.stats.cor / 8);
        }
        if (lustChange >= 20) MainScreen.text("The fantasy is so vivid and pleasurable you wish it was happening now.  You wonder if " + monster.desc.a + monster.desc.short + " can tell what you were thinking.\n\n", false);
        else MainScreen.text("\n", false);
        player.stats.lustNoResist += lustChange;
        if (player.stats.lust > 99) {
            if (monster.desc.short == "pod") {
                MainScreen.text("<b>You nearly orgasm, but the terror of the situation reasserts itself, muting your body's need for release.  If you don't escape soon, you have no doubt you'll be too fucked up to ever try again!</b>\n\n", false);
                player.stats.lust = 99;
                player.stats.lust += -25;
            }
            else {
                MainScreen.doNext(endLustLoss);
                return;
            }
        }
        MainScreen.doNext(combatMenu);
    }
}