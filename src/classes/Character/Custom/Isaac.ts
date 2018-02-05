import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import Tail, { TailType } from '../../Body/Tail';
import { TongueType } from '../../Body/Tongue';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Piercing, { PiercingType } from '../../Items/Misc/Piercing';
import Player from '../../Player/Player';

export default function customIsaac(player: Player): void {
    DisplayText("Born of a disgraced priestess, Isaac was raised alone until she was taken by illness.  He worked a number of odd jobs until he was eventually chosen as champion.");
    // - gift: fast
    player.stats.spe += 5;
    player.tone += 10;
    player.perks.add(PerkType.Fast, 0.25, 0, 0, 0);
    // - history: religion
    player.perks.add(PerkType.HistoryReligious, 0, 0, 0, 0);
    // (and if possible)
    // - history: fighter
    player.perks.add(PerkType.HistoryFighter, 0, 0, 0, 0);
    // - history: smith
    player.perks.add(PerkType.HistorySmith, 0, 0, 0, 0);
    // in my ar, Issac was born to a disgraced priestess (she was raped by marauders) and raised by her alone until she died from an illness and was pretty much left to fend for and earn a living for himself (hence the fighter and smith background's too) until, years later he was chosen as 'champion'~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // sex - male
    player.gender = 1;
    player.torso.balls.quantity = 2;
    // - a pair of apple sized balls each measuring three inches across
    player.torso.balls.size = 3;
    // anatomy - twin dicks
    // the first, a vulpine dick (12 in. long, 2.8 in. thick with a knot roughly 4.5 in. at full size) with a Fertite jacob's ladder piercing
    // and the second, a barbed feline dick (10 in. long and 2.5 in thick) with an Emerald jacob's ladder
    // heh, ribbed for their pleasure ;d lol
    player.torso.cocks.add(new Cock());
    player.torso.cocks.add(new Cock());
    player.torso.cocks.get(0).length = 12;
    player.torso.cocks.get(0).thickness = 2.8;
    player.torso.cocks.get(0).type = CockType.DOG;
    player.torso.cocks.get(0).knotMultiplier = 1.8;
    player.torso.cocks.get(1).length = 10;
    player.torso.cocks.get(1).thickness = 2.5;
    player.torso.cocks.get(1).type = CockType.TENTACLE;
    player.inventory.equipment.piercings.cocks.get(0).equip(new Piercing(PiercingType.Ladder, "fertite cock-jacob's ladder", "Fertite cock-jacob's ladder"))
    player.perks.add(PerkType.PiercedFertite, 5, 0, 0, 0);
    // - and one tight asshole
    player.torso.butt.looseness = 0;
    // - kitsune
    // - moderately long white hair (9 inches)
    player.torso.neck.head.hair.length = 9;
    player.torso.neck.head.hair.color = "silver-white";
    // - human face
    // - fox ears
    player.torso.neck.head.ears.type = EarType.FOX;
    // - olive complexion
    player.skin.tone = "olive";
    // - demon tongue (oral fetish ;d)
    player.torso.neck.head.face.tongue.type = TongueType.DEMONIC;
    // - 5 foot 9 inch tall
    player.tallness = 69;
    // - average build
    player.thickness = 50;
    // - body thickness of  around 50
    player.tone = 70;
    // - 'tone of about 70
    // - two flat breasts each supporting one 0.2-inch nipple
    player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length = 0.2;
    player.torso.chest.add(new BreastRow());
    // - three fox tails
    player.torso.tails.add(new Tail(TailType.FOX));
    player.torso.tails.get(0).vemon = 3;
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // equipment;
    // - katana (don't suppose you could rename the katana 'Zon'ith' could you? ~.^)
    // Items: Katana, Leather Armor
    player.setWeapon(weapons.KATANA);
    // - robes
    player.setArmor(armors.M_ROBES);
}
