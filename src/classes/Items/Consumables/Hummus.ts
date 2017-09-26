import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";
import RaceScore from "../../RaceScore";
import { ArmType, WingType } from "../../Body/UpperBody";
import { EyeType, FaceType, TongueType } from "../../Body/Face";
import { AntennaeType, HornType, EarType } from "../../Body/Head";
import { LowerBodyType, TailType } from "../../Body/LowerBody";
import { SkinType } from "../../Body/Body";
import Cock from "../../Body/Cock";
import Vagina from "../../Body/Vagina";
import BreastRow from "../../Body/BreastRow";

export default class Hummus extends Consumable {
    public constructor() {
        super("Hummus ", "Hummus ", "a blob of cheesy-looking hummus", Hummus.DefaultValue, "This pile of hummus doesn't look that clean, and you really don't remember where you got it from.  It looks bland.  So bland that you feel blander just by looking at it.");
    }

    public use(player: Player) {
        MainScreen.text("", true);
        /*if (Game.debug) {
            MainScreen.text("You're about to eat the humus when you see it has bugs in it. Not wanting to eat bugged humus or try to debug it you throw it into the portal and find something else to eat.", false);
            player.inventory.items.destroyItems(consumables.HUMMUS_, 1);
            return;
        }*/
        MainScreen.text("You shovel the stuff into your face, not sure WHY you're eating it, but once you start, you just can't stop.  It tastes incredibly bland, and with a slight hint of cheese.", false);
        player.stats.str = 30;
        player.stats.spe = 30;
        player.stats.tou = 30;
        player.stats.int = 30;
        player.stats.sens = 20;
        player.stats.lib = 25;
        player.stats.cor = 5;
        player.stats.lust = 10;
        player.upperBody.head.hairType = 0;
        if (RaceScore.humanScore(player) > 4) {
            MainScreen.text("\n\nYou blink and the world twists around you.  You feel more like yourself than you have in a while, but exactly how isn't immediately apparent.  Maybe you should take a look at yourself?", false);
        }
        else {
            MainScreen.text("\n\nYou cry out as the world spins around you.  You're aware of your entire body sliding and slipping, changing and morphing, but in the sea of sensation you have no idea exactly what's changing.  You nearly black out, and then it's over.  Maybe you had best have a look at yourself and see what changed?", false);
        }
        player.upperBody.armType = ArmType.HUMAN;
        player.upperBody.head.face.eyeType = EyeType.HUMAN;
        player.upperBody.head.antennae = AntennaeType.NONE;
        player.upperBody.head.face.faceType = FaceType.HUMAN;
        player.lowerBody.type = LowerBodyType.HUMAN;
        player.upperBody.wingType = WingType.NONE;
        player.upperBody.wingDesc = "non-existant";
        player.lowerBody.tailType = TailType.NONE;
        player.upperBody.head.face.tongueType = TongueType.HUMAN;
        player.lowerBody.tailRecharge = 0;
        player.upperBody.head.horns = 0;
        player.upperBody.head.hornType = HornType.NONE;
        player.upperBody.head.earType = EarType.HUMAN;
        player.skinType = SkinType.PLAIN;
        player.skinDesc = "skin";
        player.skinAdj = "";
        player.upperBody.armType = ArmType.HUMAN;
        player.upperBody.head.face.tongueType = TongueType.HUMAN;
        player.upperBody.head.face.eyeType = EyeType.HUMAN;
        if (player.fertility > 15) player.fertility = 15;
        if (player.cumMultiplier > 50) player.cumMultiplier = 50;
        let virgin: boolean = false;
        //Clear cocks
        while (player.lowerBody.cockSpot.count() > 0) {
            player.lowerBody.cockSpot.remove(player, player.lowerBody.cockSpot.get(0));
            console.trace("1 cock purged.");
        }
        //Reset dongs!
        if (player.gender == 1 || player.gender == 3) {
            player.lowerBody.cockSpot.add(new Cock());
            player.lowerBody.cockSpot.get(0).cockLength = 6;
            player.lowerBody.cockSpot.get(0).cockThickness = 1;
            player.lowerBody.ballSize = 2;
            if (player.lowerBody.balls > 2) player.lowerBody.balls = 2;
        }
        //Non duders lose any nuts
        else {
            player.lowerBody.balls = 0;
            player.lowerBody.ballSize = 2;
        }
        //Clear vaginas
        while (player.lowerBody.vaginaSpot.count() > 0) {
            virgin = player.lowerBody.vaginaSpot.get(0).virgin;
            player.lowerBody.vaginaSpot.remove(player.lowerBody.vaginaSpot.get(0));
            console.trace("1 vagina purged.");
        }
        //Reset vaginal virginity to correct state
        if (player.gender >= 2) {
            player.lowerBody.vaginaSpot.add(new Vagina());
            player.lowerBody.vaginaSpot.get(0).virgin = virgin;
        }
        player.lowerBody.vaginaSpot.get(0).clitLength = .25;
        //Tighten butt!
        player.lowerBody.butt.buttRating = 2;
        player.lowerBody.hipRating = 2;
        if (player.lowerBody.butt.analLooseness > 1) player.lowerBody.butt.analLooseness = 1;
        if (player.lowerBody.butt.analWetness > 1) player.lowerBody.butt.analWetness = 1;
        //Clear breasts
        while (player.upperBody.chest.count() > 0)
            player.upperBody.chest.remove(player.upperBody.chest.get(0));
        player.upperBody.chest.add(new BreastRow());
        player.upperBody.chest.get(0).nippleLength = .25;
        //Girls and herms get bewbs back
        if (player.gender > 2) {

            player.upperBody.chest.get(0).breastRating = 2;
        }
        else player.upperBody.chest.get(0).breastRating = 0;
        player.upperBody.gills = false;
        player.statusAffects.remove("Uniball");
        player.statusAffects.remove("BlackNipples");
        player.lowerBody.vaginaSpot.get(0).vaginaType = 0;
    }
}