import BreastRow from '../../Body/BreastRow';
import { EarType } from '../../Body/Ears';
import Tail, { TailType } from '../../Body/Tail';
import Vagina, { VaginaWetness } from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';

export default function customMara(player: Player): void {
    // #226096893686530
    // For the custom PC Profile can you make a Bimbo Bunny girl (no bunny feet) (named Mara) dont really care about clothes i can get what i want pretty quickly and I change from time to time.
    DisplayText("You're a bunny-girl with bimbo-tier curves, jiggly and soft, a curvy, wet girl with a bit of a flirty past.");
    player.gender = 2;
    player.stats.spe += 3;
    player.stats.int += 2;
    player.torso.clit.length = .5;
    player.tone = 30;
    player.fertility = 10;
    player.torso.neck.head.hair.length = 15;
    player.torso.chest.add(new BreastRow());
    player.torso.vaginas.add(new Vagina());
    player.tallness = 67;
    player.torso.chest.get(0).rating = 7;
    player.torso.vaginas.get(0).wetness = VaginaWetness.SLICK;
    player.torso.vaginas.get(0).virgin = false;
    player.tone = 20;
    player.torso.hips.rating = 12;
    player.torso.butt.rating = 12;
    player.femininity = 100;
    player.thickness = 33;
    player.perks.add(PerkType.HistorySlut, 0, 0, 0, 0);
    player.perks.add(PerkType.BimboBody, 0, 0, 0, 0);
    player.perks.add(PerkType.BimboBrains, 0, 0, 0, 0);
    player.perks.add(PerkType.BigTits, 1.5, 0, 0, 0);
    player.torso.neck.head.ears.type = EarType.BUNNY;
    player.torso.tails.add(new Tail(TailType.BUNNY));
    player.skin.tone = "tan";
    player.torso.neck.head.hair.color = "platinum blonde";
    player.teaseLevel = 3;
}
