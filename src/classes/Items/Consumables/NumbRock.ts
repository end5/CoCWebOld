import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { SkinType } from '../../Body/Skin';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class NumbRock extends Consumable {
    public constructor() {
        super(ConsumableName.NumbRock, new ItemDesc("Numb Rox", "a strange packet of candy called 'Numb Rocks'", "This packet of innocuous looking 'candy' guarantees to reduce troublesome sensations and taste delicious."), 15);
    }

    public use(player: Player) {
        DisplayText().clear();
        // Numb rocks lower lust significantly but have a chance of inducing the masturbation preventing effect from minotaur.
        DisplayText("You pop open the package of numb rocks and dump it into your waiting mouth.  The strange candy fizzes and pops, leaving the nerves on your tongue feeling a bit deadened as you swallow the sweet mess.");

        if (player.stats.lust >= 33) {
            DisplayText("\n\nThe numbness spreads through your body, bringing with it a sense of calm that seems to muffle your sexual urges.");
            player.stats.lust -= 20 + Utils.rand(40);
        }
        if (Utils.rand(5) === 0) {
            if (!player.statusAffects.has(StatusAffectType.Dysfunction)) {
                DisplayText("\n\nUnfortunately, the skin of ");
                if (player.torso.cocks.count > 0) {
                    DisplayText(CockDescriptor.describeMultiCockSimpleOne(player));
                    if (player.torso.vaginas.count > 0) DisplayText(" and");
                    DisplayText(" ");
                }
                if (player.torso.vaginas.count > 0) {
                    if (player.torso.cocks.count <= 0) DisplayText("your ");
                    DisplayText(VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " ");
                }
                if (!(player.torso.cocks.count > 0 || player.torso.vaginas.count > 0)) DisplayText(ButtDescriptor.describeButthole(player) + " ");
                DisplayText(" numbs up too.  You give yourself a gentle touch, but are quite disturbed when you realize you can barely feel it.  You can probably still fuck something to get off, but regular masturbation is out of the question...");
                player.statusAffects.add(StatusAffectType.Dysfunction, 50 + Utils.rand(100), 0, 0, 0);
            }
            else {
                DisplayText("\n\nSadly your groin becomes even more deadened to sensation.  You wonder how much longer you'll have to wait until you can please yourself again.");
                player.statusAffects.get(StatusAffectType.Dysfunction).value1 = 50 + Utils.rand(100);
            }
        }
        else if (Utils.rand(4) === 0 && player.stats.int > 15) {
            DisplayText("\n\nNumbness clouds your mind, making you feel slow witted and dull.  Maybe these candies weren't such a exceptio... fantas... good idea.");
            player.stats.int -= 1 + Utils.rand(5);
        }
        if (!player.perks.has(PerkType.ThickSkin) && player.stats.sens < 30 && Utils.rand(4) === 0) {
            DisplayText("Slowly, ");
            if (player.skin.type === SkinType.PLAIN) DisplayText("your skin");
            else DisplayText("the skin under your " + player.skin.desc);
            DisplayText(" begins to feel duller, almost... thicker.  You pinch yourself and find that your epidermis feels more resistant to damage, almost like natural armor!\n<b>(Thick Skin - Perk Gained!)</b>");
            player.perks.add(PerkType.ThickSkin, 0, 0, 0, 0);
        }
        DisplayText("\n\nAfter the sensations pass, your " + player.skin.desc + " feels a little less receptive to touch.");
        player.stats.sens += -3;
        if (player.stats.sens < 1) player.stats.sens = 1;
    }
}
