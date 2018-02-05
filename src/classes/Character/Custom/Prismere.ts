import BreastRow from '../../Body/BreastRow';
import Tail, { TailType } from '../../Body/Tail';
import Vagina from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';

export default function customPrismere(player: Player): void {
    // Specific Character	Female, virgin, high fertility, tight with standard wetness and clit.
    player.torso.vaginas.add(new Vagina());
    player.torso.clit.length = 0.25;
    player.fertility = 4;
    player.stats.spe += 20;
    DisplayText("You're more of a scout than a fighter, but you still feel confident you can handle your responsibilities as champion.  After all, what's to worry about when you can outrun everything you encounter?  You have olive skin, deep red hair, and a demonic tail and wings to blend in with the locals.");
    // Perk is speed, she was a scout, and it'd be neat (if possible) to give her something akin to the Runner perk. She might not start out very strong or tough, but at least she's fast.
    player.perks.add(PerkType.Fast, 0.25, 0, 0, 0);
    player.perks.add(PerkType.Runner, 0, 0, 0, 0);
    // In the human world, Prismere began as a scout, helping patrol areas with portals to make sure demonspawn and corruption didn't reach the human homeland. She's gotten herself into a few tight spots because of it, but she's hard to keep pinned down. She has a fiance back in her village whom she fully intends to get back to, so her libido isn't especially high.
    // As of the time the PC takes her on, she has some signs of demonic taint, so Corruption might start at 5 to 10 points."	"Breasts at E, height at 5'0, a curvy build with a more narrow waist and substantial hips and butt. Skin is olive, like a mocha, hair is long and wildly wavy, a deep red, and eyes are a stormy blue. Muscles are barely visible; what muscle she has is the lean build of a runner, not a fighter. Nipples aren't especially long, but more soft.
    player.stats.cor = 5;
    player.torso.chest.add(new BreastRow());
    player.torso.chest.get(0).rating = 7;
    player.tallness = 60;
    player.torso.hips.rating = 8;
    player.torso.butt.rating = 8;
    player.thickness = 25;
    player.tone = 40;
    player.skin.tone = "olive";
    player.torso.neck.head.hair.length = 30;
    player.torso.neck.head.hair.color = "deep red";
    player.femininity = 90;
    // She has a demonic tail and small demonic wings thanks to some encounters early on with succubus milk (that stuff is delicious!) but is otherwise still human.
    player.torso.wings.type = WingType.BAT_LIKE_LARGE;
    player.torso.wings.desc = "large, bat-like";
    player.torso.tails.add(new Tail(TailType.DEMONIC));
    // I feel really weird talking about all this, so if there's anything you need to change or can't do, or if I totally misinterpreted this, just shoot me an email! jordie.wierenga@gmail.com . Thanks in advance... I'm a big fan. "	Prismere
}
