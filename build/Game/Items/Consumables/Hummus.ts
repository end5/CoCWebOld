import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../../Engine/display/DisplayText';
import { ArmType } from '../../Body/Arms';
import BreastRow from '../../Body/BreastRow';
import Cock from '../../Body/Cock';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { AntennaeType } from '../../Body/Head';
import { HornType } from '../../Body/Horns';
import { LegType } from '../../Body/Legs';
import RaceScore from '../../Body/RaceScore';
import { SkinType } from '../../Body/Skin';
import { TongueType } from '../../Body/Tongue';
import Vagina, { VaginaType } from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import Character from '../../Character/Character';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import ItemDesc from '../ItemDesc';

export default class Hummus extends Consumable {
    public constructor() {
        super(ConsumableName.Hummus, new ItemDesc("Hummus ", "a blob of cheesy-looking hummus", "This pile of hummus doesn't look that clean, and you really don't remember where you got it from.  It looks bland.  So bland that you feel blander just by looking at it."));
    }

    public use(character: Character) {
        DisplayText().clear();
        /*if (Game.debug) {
            DisplayText("You're about to eat the humus when you see it has bugs in it. Not wanting to eat bugged humus or try to debug it you throw it into the portal and find something else to eat.");
            character.inventory.items.destroyItems(consumables.HUMMUS_, 1);
            return;
        }*/
        DisplayText("You shovel the stuff into your face, not sure WHY you're eating it, but once you start, you just can't stop.  It tastes incredibly bland, and with a slight hint of cheese.");
        character.stats.str = 30;
        character.stats.spe = 30;
        character.stats.tou = 30;
        character.stats.int = 30;
        character.stats.sens = 20;
        character.stats.lib = 25;
        character.stats.cor = 5;
        character.stats.lust = 10;
        character.torso.neck.head.hair.type = 0;
        if (RaceScore.humanScore(character) > 4) {
            DisplayText("\n\nYou blink and the world twists around you.  You feel more like yourself than you have in a while, but exactly how isn't immediately apparent.  Maybe you should take a look at yourself?");
        }
        else {
            DisplayText("\n\nYou cry out as the world spins around you.  You're aware of your entire body sliding and slipping, changing and morphing, but in the sea of sensation you have no idea exactly what's changing.  You nearly black out, and then it's over.  Maybe you had best have a look at yourself and see what changed?");
        }
        character.torso.arms.type = ArmType.HUMAN;
        character.torso.neck.head.face.eyes.type = EyeType.HUMAN;
        character.torso.neck.head.face.tongue.type = TongueType.HUMAN;
        character.torso.neck.head.face.type = FaceType.HUMAN;
        character.torso.neck.head.horns.amount = 0;
        character.torso.neck.head.horns.type = HornType.NONE;
        character.torso.neck.head.antennae = AntennaeType.NONE;
        character.torso.hips.legs.type = LegType.HUMAN;
        character.torso.wings.type = WingType.NONE;
        character.torso.wings.desc = "non-existant";
        character.torso.tails.clear();
        character.skin.type = SkinType.PLAIN;
        character.skin.desc = "skin";
        character.skin.adj = "";
        if (character.fertility > 15) character.fertility = 15;
        if (character.cumMultiplier > 50) character.cumMultiplier = 50;
        // Clear cocks
        character.torso.cocks.clear();
        // Reset dongs!
        if (character.gender === 1 || character.gender === 3) {
            character.torso.cocks.add(new Cock(6, 1));
            character.torso.balls.size = 2;
            if (character.torso.balls.quantity > 2) character.torso.balls.quantity = 2;
        }
        // Non duders lose any nuts
        else {
            character.torso.balls.quantity = 0;
            character.torso.balls.size = 2;
        }
        // Clear vaginas
        let virgin: boolean = false;
        for (const vagina of character.torso.vaginas) {
            if (vagina.virgin) {
                virgin = true;
                break;
            }
        }
        character.torso.vaginas.clear();
        // Reset vaginal virginity to correct state
        if (character.gender >= 2) {
            const newVagina = new Vagina();
            newVagina.virgin = virgin;
            newVagina.type = VaginaType.HUMAN;
            character.torso.vaginas.add(newVagina);
        }
        character.torso.clit.length = .25;
        // Tighten butt!
        character.torso.butt.rating = 2;
        character.torso.hips.rating = 2;
        if (character.torso.butt.looseness > 1) character.torso.butt.looseness = 1;
        if (character.torso.butt.wetness > 1) character.torso.butt.wetness = 1;
        // Clear breasts
        character.torso.chest.clear();
        const newBreastRow = new BreastRow();
        newBreastRow.nipples.length = .25;
        character.torso.chest.add(newBreastRow);
        // Girls and herms get bewbs back
        if (character.gender > 2) {
            character.torso.chest.get(0).rating = 2;
        }
        else character.torso.chest.get(0).rating = 0;
        character.torso.neck.gills = false;
        character.statusAffects.remove(StatusAffectType.Uniball);
        character.statusAffects.remove(StatusAffectType.BlackNipples);
    }
}
