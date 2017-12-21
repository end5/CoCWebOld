import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { SkinType } from '../../Body/Creature';
import { LowerBodyType } from '../../Body/LowerBody';
import { WingType } from '../../Body/UpperBody';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import StatusAffect from '../../Effects/StatusAffect';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import BodyModifier from '../../Modifiers/BodyModifier';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class WetCloth extends Consumable {
    public constructor() {
        super(ConsumableName.WetCloth, new ItemDesc("WetClth", "a wet cloth dripping with slippery slime", "Dripping with a viscous slime, you've no doubt rubbing this cloth on your body would have some kind of strange effect."));
    }

    public use(player: Player) {
        DisplayText.clear();
        DisplayText.text("You take the wet cloth in hand and rub it over your body, smearing the strange slime over your " + player.skinDesc + " slowly.");
        //Stat changes
        //libido up to 80
        if (player.stats.lib < 80) {
            player.stats.lib += .5 + (90 - player.stats.lib) / 10;
            player.stats.lust += player.stats.lib / 2;
            DisplayText.text("\n\nBlushing and feeling horny, you make sure to rub it over your chest and erect nipples, letting the strange slimy fluid soak into you.");
        }
        //sensitivity moves towards 50
        if (player.stats.sens < 50) {
            DisplayText.text("\n\nThe slippery slime soaks into your " + player.skinDesc + ", making it tingle with warmth, sensitive to every touch.");
            player.stats.sens += 1;
        }
        else if (player.stats.sens > 50) {
            DisplayText.text("\n\nThe slippery slime numbs your " + player.skinDesc + " slightly, leaving behind only gentle warmth.");
            player.stats.sens += -1;
        }
        /*Calculate goopiness
         let goopiness:number = 0;
         if(player.skinType == SkinType.GOO) goopiness+=2;
         if(player.hair.indexOf("gooey") != -1) goopiness++;
         if(player.lowerBody.vaginaSpot.hasVagina()) {
         if(player.vaginalCapacity() >= 9000) goopiness++;
         }*/
        //Cosmetic changes based on 'goopyness'
        //Remove wings
        if (player.upperBody.wingType > WingType.NONE) {
            if (player.upperBody.wingType == WingType.SHARK_FIN) DisplayText.text("\n\nYou sigh, feeling a hot wet tingling down your back.  It tickles slightly as you feel your fin slowly turn to sludge, dripping to the ground as your body becomes more goo-like.");
            else DisplayText.text("\n\nYou sigh, feeling a hot wet tingling down your back.  It tickles slightly as you feel your wings slowly turn to sludge, dripping to the ground as your body becomes more goo-like.");
            player.upperBody.wingType = WingType.NONE;
            return;
        }
        //Goopy hair
        if (player.upperBody.head.hairType != 3) {
            player.upperBody.head.hairType = 3;
            //if bald
            if (player.upperBody.head.hairLength <= 0) {
                DisplayText.text("\n\nYour head buzzes pleasantly, feeling suddenly hot and wet.  You instinctively reach up to feel the source of your wetness, and discover you've grown some kind of gooey hair.  From time to time it drips, running down your back to the crack of your " + ButtDescriptor.describeButt(player) + ".");
                player.upperBody.head.hairLength = 5;
            }
            else {
                //if hair isnt rubbery or latexy
                if (player.upperBody.head.hairColor.indexOf("rubbery") == -1 && player.upperBody.head.hairColor.indexOf("latex-textured") == -1) {
                    DisplayText.text("\n\nYour head buzzes pleasantly, feeling suddenly hot and wet.  You instinctively reach up to feel the source of your wetness, and discover your hair has become a slippery, gooey mess.  From time to time it drips, running down your back to the crack of your " + ButtDescriptor.describeButt(player) + ".");
                }
                //Latexy stuff
                else {
                    DisplayText.text("\n\nYour oddly inorganic hair shifts, becoming partly molten as rivulets of liquid material roll down your back.  How strange.");
                }
            }
            if (player.upperBody.head.hairColor != "green" && player.upperBody.head.hairColor != "purple" && player.upperBody.head.hairColor != "blue" && player.upperBody.head.hairColor != "cerulean" && player.upperBody.head.hairColor != "emerald") {
                DisplayText.text("  Stranger still, the hue of your semi-liquid hair changes to ");
                let blah: number = Utils.rand(10);
                if (blah <= 2) player.upperBody.head.hairColor = "green";
                else if (blah <= 4) player.upperBody.head.hairColor = "purple";
                else if (blah <= 6) player.upperBody.head.hairColor = "blue";
                else if (blah <= 8) player.upperBody.head.hairColor = "cerulean";
                else player.upperBody.head.hairColor = "emerald";
                DisplayText.text(player.upperBody.head.hairColor + ".");
            }
            player.stats.lust += 10;
            return;
        }
        //1.Goopy skin
        if (player.upperBody.head.hairType == 3 && (player.skinDesc != "skin" || player.skinAdj != "slimy")) {
            if (player.skinType == SkinType.PLAIN) DisplayText.text("\n\nYou sigh, feeling your " + player.inventory.armorSlot.equipment.displayName + " sink into you as your skin becomes less solid, gooey even.  You realize your entire body has become semi-solid and partly liquid!");
            else if (player.skinType == SkinType.FUR) DisplayText.text("\n\nYou sigh, suddenly feeling your fur become hot and wet.  You look down as your " + player.inventory.armorSlot.equipment.displayName + " sinks partway into you.  With a start you realize your fur has melted away, melding into the slime-like coating that now serves as your skin.  You've become partly liquid and incredibly gooey!");
            else if (player.skinType == SkinType.SCALES) DisplayText.text("\n\nYou sigh, feeling slippery wetness over your scales.  You reach to scratch it and come away with a slippery wet coating.  Your scales have transformed into a slimy goop!  Looking closer, you realize your entire body has become far more liquid in nature, and is semi-solid.  Your " + player.inventory.armorSlot.equipment.displayName + " has even sunk partway into you.");
            else if (player.skinType > SkinType.GOO) DisplayText.text("\n\nYou sigh, feeling your " + player.inventory.armorSlot.equipment.displayName + " sink into you as your " + player.skinDesc + " becomes less solid, gooey even.  You realize your entire body has become semi-solid and partly liquid!");
            player.skinType = SkinType.GOO;
            player.skinDesc = "skin";
            player.skinAdj = "slimy";
            if (player.skinTone != "green" && player.skinTone != "purple" && player.skinTone != "blue" && player.skinTone != "cerulean" && player.skinTone != "emerald") {
                DisplayText.text("  Stranger still, your skintone changes to ");
                let blaht: number = Utils.rand(10);
                if (blaht <= 2) player.skinTone = "green";
                else if (blaht <= 4) player.skinTone = "purple";
                else if (blaht <= 6) player.skinTone = "blue";
                else if (blaht <= 8) player.skinTone = "cerulean";
                else player.skinTone = "emerald";
                DisplayText.text(player.skinTone + "!");
            }
            return;
        }
        ////1a.Make alterations to dick/vaginal/nippular descriptors to match
        //DONE EXCEPT FOR TITS & MULTIDICKS (UNFINISHED KINDA)
        //2.Goo legs
        if (player.skinAdj == "slimy" && player.skinDesc == "skin" && player.lowerBody.type != LowerBodyType.GOO) {
            DisplayText.text("\n\nYour viewpoint rapidly drops as everything below your " + ButtDescriptor.describeButt(player) + " and groin melts together into an amorphous blob.  Thankfully, you discover you can still roll about on your new slimey undercarriage, but it's still a whole new level of strange.");
            player.tallness -= 3 + Utils.rand(2);
            if (player.tallness < 36) {
                player.tallness = 36;
                DisplayText.text("  The goo firms up and you return to your previous height.  It would truly be hard to get any shorter than you already are!");
            }
            player.lowerBody.type = LowerBodyType.GOO;
            return;
        }
        //3a. Grow vagina if none
        if (!player.lowerBody.vaginaSpot.hasVagina()) {
            DisplayText.text("\n\nA wet warmth spreads through your slimey groin as a narrow gash appears on the surface of your groin.  <b>You have grown a vagina.</b>");
            const newVagina: Vagina = new Vagina();
            newVagina.vaginalWetness = VaginaWetness.DROOLING;
            newVagina.vaginalLooseness = VaginaLooseness.GAPING;
            newVagina.clitLength = .4;
            player.lowerBody.vaginaSpot.add(newVagina);
            player.updateGender();
            return;

        }
        //3b.Infinite Vagina
        if (player.vaginalCapacity() < 9000) {
            if (!player.statusAffects.has(StatusAffectType.BonusVCapacity)) player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.BonusVCapacity, 9000, 0, 0, 0));
            else player.statusAffects.get(StatusAffectType.BonusVCapacity).value1 = 9000;
            DisplayText.text("\n\nYour " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + "'s internal walls feel a tingly wave of strange tightness.  Experimentally, you slip a few fingers, then your hand, then most of your forearm inside yourself.  <b>It seems you're now able to accommodate just about ANYTHING inside your sex.</b>");
            return;
        }
        else if (player.tallness < 100 && Utils.rand(3) <= 1) {
            DisplayText.text("\n\nYour gel-like body swells up from the intake of additional slime.  If you had to guess, you'd bet you were about two inches taller.");
            player.tallness += 2;
            player.stats.str += 1;
            player.stats.tou += 1;
        }
        //Big slime girl
        else {
            if (!player.statusAffects.has(StatusAffectType.SlimeCraving)) {
                DisplayText.text("\n\nYou feel a growing gnawing in your gut.  You feel... hungry, but not for food.  No, you need something wet and goopy pumped into you.  You NEED it.  You can feel it in your bones.  <b>If you don't feed that need... you'll get weaker and maybe die.</b>");
                player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.SlimeCraving, 0, 0, 0, 1))); //Value four indicates this tracks strength and speed separately
            }
            else {
                DisplayText.text("\n\nYou feel full for a moment, but you know it's just a temporary respite from your constant need to be 'injected' with fluid.");
                player.statusAffects.get(StatusAffectType.SlimeCraving).value1 = 0;
            }
        }
        if (Utils.rand(2) == 0) DisplayText.text(BodyModifier.displayModFem(player, 85, 3));
        if (Utils.rand(2) == 0) DisplayText.text(BodyModifier.displayModThickness(player, 20, 3));
        if (Utils.rand(2) == 0) DisplayText.text(BodyModifier.displayModTone(player, 15, 5));
    }
}