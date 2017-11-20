import Consumable from './Consumable';
import { SkinType } from '../../Body/Creature';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class NumbRock extends Consumable {
    public constructor() {
        super("NumbRox", new ItemDesc("Numb Rox", "a strange packet of candy called 'Numb Rocks'", "This packet of innocuous looking 'candy' guarantees to reduce troublesome sensations and taste delicious."), 15);
    }

    public use(player: Player) {
        DisplayText.clear();
        //Numb rocks lower lust significantly but have a chance of inducing the masturbation preventing effect from minotaur.
        DisplayText.text("You pop open the package of numb rocks and dump it into your waiting mouth.  The strange candy fizzes and pops, leaving the nerves on your tongue feeling a bit deadened as you swallow the sweet mess.");

        if (player.stats.lust >= 33) {
            DisplayText.text("\n\nThe numbness spreads through your body, bringing with it a sense of calm that seems to muffle your sexual urges.");
            player.stats.lust -= 20 + Utils.rand(40);
        }
        if (Utils.rand(5) == 0) {
            if (!player.statusAffects.has(StatusAffectType.Dys)) {
                DisplayText.text("\n\nUnfortunately, the skin of ");
                if (player.lowerBody.cockSpot.count() > 0) {
                    DisplayText.text(CockDescriptor.describeMultiCockSimpleOne(player));
                    if (player.lowerBody.vaginaSpot.hasVagina()) DisplayText.text(" and");
                    DisplayText.text(" ");
                }
                if (player.lowerBody.vaginaSpot.hasVagina()) {
                    if (!player.lowerBody.cockSpot.hasCock()) DisplayText.text("your ");
                    DisplayText.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " ");
                }
                if (!(player.lowerBody.cockSpot.hasCock() || player.lowerBody.vaginaSpot.hasVagina())) DisplayText.text(ButtDescriptor.describeButthole(player) + " ");
                DisplayText.text(" numbs up too.  You give yourself a gentle touch, but are quite disturbed when you realize you can barely feel it.  You can probably still fuck something to get off, but regular masturbation is out of the question...");
                player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Dys, 50 + Utils.rand(100), 0, 0, 0));
            }
            else {
                DisplayText.text("\n\nSadly your groin becomes even more deadened to sensation.  You wonder how much longer you'll have to wait until you can please yourself again.");
                player.statusAffects.get(StatusAffectType.Dys).value1 = 50 + Utils.rand(100);
            }
        }
        else if (Utils.rand(4) == 0 && player.stats.int > 15) {
            DisplayText.text("\n\nNumbness clouds your mind, making you feel slow witted and dull.  Maybe these candies weren't such a exceptio... fantas... good idea.");
            player.stats.int -= 1 + Utils.rand(5);
        }
        if (!player.perks.has(PerkType.ThickSkin) && player.stats.sens < 30 && Utils.rand(4) == 0) {
            DisplayText.text("Slowly, ");
            if (player.skinType == SkinType.PLAIN) DisplayText.text("your skin");
            else DisplayText.text("the skin under your " + player.skinDesc);
            DisplayText.text(" begins to feel duller, almost... thicker.  You pinch yourself and find that your epidermis feels more resistant to damage, almost like natural armor!\n<b>(Thick Skin - Perk Gained!)</b>");
            player.perks.add(PerkFactory.create(PerkType.ThickSkin, 0, 0, 0, 0));
        }
        DisplayText.text("\n\nAfter the sensations pass, your " + player.skinDesc + " feels a little less receptive to touch.");
        player.stats.sens += -3;
        if (player.stats.sens < 1) player.stats.sens = 1;
    }
}