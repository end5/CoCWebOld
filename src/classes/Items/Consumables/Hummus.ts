import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class Hummus extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.text("", true);
        if (debug) {
            MainScreen.text("You're about to eat the humus when you see it has bugs in it. Not wanting to eat bugged humus or try to debug it you throw it into the portal and find something else to eat.", false);
            player.destroyItems(consumables.HUMMUS_, 1);
            return;
        }
        MainScreen.text("You shovel the stuff into your face, not sure WHY you're eating it, but once you start, you just can't stop.  It tastes incredibly bland, and with a slight hint of cheese.", false);
        player.str = 30;
        player.stats.spe = 30;
        player.tou = 30;
        player.stats.int = 30;
        player.stats.sens = 20;
        player.stats.lib = 25;
        player.stats.cor = 5;
        player.lust = 10;
        player.upperBody.head.hairType = 0;
        if (player.humanScore() > 4) {
            MainScreen.text("\n\nYou blink and the world twists around you.  You feel more like yourself than you have in a while, but exactly how isn't immediately apparent.  Maybe you should take a look at yourself?", false);
        }
        else {
            MainScreen.text("\n\nYou cry out as the world spins around you.  You're aware of your entire body sliding and slipping, changing and morphing, but in the sea of sensation you have no idea exactly what's changing.  You nearly black out, and then it's over.  Maybe you had best have a look at yourself and see what changed?", false);
        }
        player.armType = ARM.HUMAN;
        player.eyeType = EYES.HUMAN;
        player.antennae = ANTENNAE.NONE;
        player.faceType = FACE.HUMAN;
        player.lowerBody = LOWER_BODY.HUMAN;
        player.upperBody.wingType = WING.NONE;
        player.upperBody.wingDesc = "non-existant";
        player.tailType = TAIL.NONE;
        player.tongueType = TONUGE.HUMAN;
        player.lowerBody.tailRecharge = 0;
        player.horns = 0;
        player.hornType = HORNS.NONE;
        player.upperBody.head.earType = EARS.HUMAN;
        player.skinType = SKIN.PLAIN;
        player.skinDesc = "skin";
        player.skinAdj = "";
        player.armType = ARM.HUMAN;
        player.tongueType = TONUGE.HUMAN;
        player.eyeType = EYES.HUMAN;
        if (player.fertility > 15) player.fertility = 15;
        if (player.cumMultiplier > 50) player.cumMultiplier = 50;
        let virgin: boolean = false;
        //Clear cocks
        while (player.lowerBody.cockSpot.count() > 0) {
            player.lowerBody.cockSpot.remove(0, 1);
            trace("1 cock purged.");
        }
        //Reset dongs!
        if (player.gender == 1 || player.gender == 3) {
            player.lowerBody.cockSpot.add(new Cock());
            player.lowerBody.cockSpot.list[0].cockLength = 6;
            player.lowerBody.cockSpot.list[0].cockThickness = 1;
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
            virgin = player.vaginas[0].virgin;
            player.removeVagina(0, 1);
            trace("1 vagina purged.");
        }
        //Reset vaginal virginity to correct state
        if (player.gender >= 2) {
            player.createVagina();
            player.vaginas[0].virgin = virgin;
        }
        player.lowerBody.vaginaSpot.list[0].clitLength = .25;
        //Tighten butt!
        player.lowerBody.butt.buttRating = 2;
        player.lowerBody.hipRating = 2;
        if (player.ass.analLooseness > 1) player.ass.analLooseness = 1;
        if (player.ass.analWetness > 1) player.ass.analWetness = 1;
        //Clear breasts
        player.breastRows = [];
        player.createBreastRow();
        player.upperBody.chest.BreastRatingLargest[0].nippleLength = .25;
        //Girls and herms get bewbs back
        if (player.gender > 2) {

            player.upperBody.chest.list[0].breastRating = 2;
        }
        else player.upperBody.chest.list[0].breastRating = 0;
        player.upperBody.gills = false;
        player.statusAffects.remove("Uniball");
        player.statusAffects.remove("BlackNipples");
        player.vaginaType(0);
    }
}