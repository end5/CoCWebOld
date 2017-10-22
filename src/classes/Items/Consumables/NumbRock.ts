import Consumable from './Consumable';
import { SkinType } from '../../Body/Creature';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import MainScreen from '../../display/MainScreen';
import Perk from '../../Effects/Perk';
import StatusAffect from '../../Effects/StatusAffect';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class NumbRock extends Consumable {
    public constructor() {
        super("NumbRox", "Numb Rox", "a strange packet of candy called 'Numb Rocks'", 15, "This packet of innocuous looking 'candy' guarantees to reduce troublesome sensations and taste delicious.");
    }

    public use(player: Player) {
        MainScreen.text("", true);
        //Numb rocks lower lust significantly but have a chance of inducing the masturbation preventing effect from minotaur.
        MainScreen.text("You pop open the package of numb rocks and dump it into your waiting mouth.  The strange candy fizzes and pops, leaving the nerves on your tongue feeling a bit deadened as you swallow the sweet mess.", false);

        if (player.stats.lust >= 33) {
            MainScreen.text("\n\nThe numbness spreads through your body, bringing with it a sense of calm that seems to muffle your sexual urges.", false);
            player.stats.lust -= 20 + Utils.rand(40);
        }
        if (Utils.rand(5) == 0) {
            if (!player.statusAffects.has("Dys")) {
                MainScreen.text("\n\nUnfortunately, the skin of ", false);
                if (player.lowerBody.cockSpot.count() > 0) {
                    MainScreen.text(CockDescriptor.describeMultiCockSimpleOne(player), false);
                    if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and", false);
                    MainScreen.text(" ", false);
                }
                if (player.lowerBody.vaginaSpot.hasVagina()) {
                    if (!player.lowerBody.cockSpot.hasCock()) MainScreen.text("your ");
                    MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " ", false);
                }
                if (!(player.lowerBody.cockSpot.hasCock() || player.lowerBody.vaginaSpot.hasVagina())) MainScreen.text(ButtDescriptor.describeButthole(player) + " ", false);
                MainScreen.text(" numbs up too.  You give yourself a gentle touch, but are quite disturbed when you realize you can barely feel it.  You can probably still fuck something to get off, but regular masturbation is out of the question...", false);
                player.statusAffects.add(new StatusAffect("Dys", 50 + Utils.rand(100), 0, 0, 0));
            }
            else {
                MainScreen.text("\n\nSadly your groin becomes even more deadened to sensation.  You wonder how much longer you'll have to wait until you can please yourself again.", false);
                player.statusAffects.get("Dys").value1 = 50 + Utils.rand(100);
            }
        }
        else if (Utils.rand(4) == 0 && player.stats.int > 15) {
            MainScreen.text("\n\nNumbness clouds your mind, making you feel slow witted and dull.  Maybe these candies weren't such a exceptio... fantas... good idea.", false);
            player.stats.int -= 1 + Utils.rand(5);
        }
        if (!player.perks.has("ThickSkin") && player.stats.sens < 30 && Utils.rand(4) == 0) {
            MainScreen.text("Slowly, ", false);
            if (player.skinType == SkinType.PLAIN) MainScreen.text("your skin", false);
            else MainScreen.text("the skin under your " + player.skinDesc, false);
            MainScreen.text(" begins to feel duller, almost... thicker.  You pinch yourself and find that your epidermis feels more resistant to damage, almost like natural armor!\n<b>(Thick Skin - Perk Gained!)</b>", false);
            player.perks.add(new Perk("ThickSkin", 0, 0, 0, 0));
        }
        MainScreen.text("\n\nAfter the sensations pass, your " + player.skinDesc + " feels a little less receptive to touch.", false);
        player.stats.sens += -3;
        if (player.stats.sens < 1) player.stats.sens = 1;
    }
}