import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { ArmType } from '../../Body/Arms';
import BreastRow from '../../Body/BreastRow';
import Cock from '../../Body/Cock';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { AntennaeType } from '../../Body/Head';
import { HornType } from '../../Body/Horns';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import { TongueType } from '../../Body/Tongue';
import Vagina, { VaginaType } from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import DisplayText from '../../display/DisplayText';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
import RaceScore from '../../RaceScore';
import ItemDesc from '../ItemDesc';

export default class Hummus extends Consumable {
    public constructor() {
        super(ConsumableName.Hummus, new ItemDesc("Hummus ", "a blob of cheesy-looking hummus", "This pile of hummus doesn't look that clean, and you really don't remember where you got it from.  It looks bland.  So bland that you feel blander just by looking at it."));
    }

    public use(player: Player) {
        DisplayText().clear();
        /*if (Game.debug) {
            DisplayText("You're about to eat the humus when you see it has bugs in it. Not wanting to eat bugged humus or try to debug it you throw it into the portal and find something else to eat.");
            player.inventory.items.destroyItems(consumables.HUMMUS_, 1);
            return;
        }*/
        DisplayText("You shovel the stuff into your face, not sure WHY you're eating it, but once you start, you just can't stop.  It tastes incredibly bland, and with a slight hint of cheese.");
        player.stats.str = 30;
        player.stats.spe = 30;
        player.stats.tou = 30;
        player.stats.int = 30;
        player.stats.sens = 20;
        player.stats.lib = 25;
        player.stats.cor = 5;
        player.stats.lust = 10;
        player.torso.neck.head.hair.type = 0;
        if (RaceScore.humanScore(player) > 4) {
            DisplayText("\n\nYou blink and the world twists around you.  You feel more like yourself than you have in a while, but exactly how isn't immediately apparent.  Maybe you should take a look at yourself?");
        }
        else {
            DisplayText("\n\nYou cry out as the world spins around you.  You're aware of your entire body sliding and slipping, changing and morphing, but in the sea of sensation you have no idea exactly what's changing.  You nearly black out, and then it's over.  Maybe you had best have a look at yourself and see what changed?");
        }
        player.torso.arms.type = ArmType.HUMAN;
        player.torso.neck.head.face.eyes.type = EyeType.HUMAN;
        player.torso.neck.head.face.tongue.type = TongueType.HUMAN;
        player.torso.neck.head.face.type = FaceType.HUMAN;
        player.torso.neck.head.horns.amount = 0;
        player.torso.neck.head.horns.type = HornType.NONE;
        player.torso.neck.head.antennae = AntennaeType.NONE;
        player.torso.hips.legs.type = LegType.HUMAN;
        player.torso.wings.type = WingType.NONE;
        player.torso.wings.desc = "non-existant";
        player.torso.tails.clear();
        player.skin.type = SkinType.PLAIN;
        player.skin.desc = "skin";
        player.skin.adj = "";
        if (player.fertility > 15) player.fertility = 15;
        if (player.cumMultiplier > 50) player.cumMultiplier = 50;
        // Clear cocks
        player.torso.cocks.clear();
        // Reset dongs!
        if (player.gender === 1 || player.gender === 3) {
            player.torso.cocks.add(new Cock(6, 1));
            player.torso.balls.size = 2;
            if (player.torso.balls.quantity > 2) player.torso.balls.quantity = 2;
        }
        // Non duders lose any nuts
        else {
            player.torso.balls.quantity = 0;
            player.torso.balls.size = 2;
        }
        // Clear vaginas
        let virgin: boolean = false;
        for (const vagina of player.torso.vaginas) {
            if (vagina.virgin) {
                virgin = true;
                break;
            }
        }
        player.torso.vaginas.clear();
        // Reset vaginal virginity to correct state
        if (player.gender >= 2) {
            const newVagina = new Vagina();
            newVagina.virgin = virgin;
            newVagina.type = VaginaType.HUMAN;
            player.torso.vaginas.add(newVagina);
        }
        player.torso.clit.length = .25;
        // Tighten butt!
        player.torso.butt.rating = 2;
        player.torso.hips.rating = 2;
        if (player.torso.butt.looseness > 1) player.torso.butt.looseness = 1;
        if (player.torso.butt.wetness > 1) player.torso.butt.wetness = 1;
        // Clear breasts
        player.torso.chest.clear();
        const newBreastRow = new BreastRow();
        newBreastRow.nipples.length = .25;
        player.torso.chest.add(newBreastRow);
        // Girls and herms get bewbs back
        if (player.gender > 2) {
            player.torso.chest.get(0).rating = 2;
        }
        else player.torso.chest.get(0).rating = 0;
        player.torso.neck.gills = false;
        player.statusAffects.remove(StatusAffectType.Uniball);
        player.statusAffects.remove(StatusAffectType.BlackNipples);
    }
}
