import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import Vagina from '../../Body/Vagina';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Piercing, { PiercingType } from '../../Items/Misc/Piercing';
import Player from '../../Player/Player';

export default function customAria(player: Player): void {
    DisplayText("It's really no surprise that you were sent through the portal to deal with the demons - you look enough like one as-is.  Your numerous fetish-inducing piercings, magical fox-tails, and bimbo-licious personality were all the motivation the elders needed to keep you from corrupting the village youth.");
    // 2/26/2013 8:18:21	rdolave@gmail.com	Character Creation	"female DD breasts feminity 100 butt size 5 hip size 5 body thickness 10 clit I would like her nipples pierced with Ceraphs piercing
    // (on a side note how much do you think it would cost to add bell nipple,labia and clit piercings as well as an option for belly button piercings would like to see belly button piecings with a few different options as well.  Also would love to have handcuff ear piercings.)"	Would like the bimbo brain and bimbo body perks as well as the nine tail PerkType.  demonic high heels, pink skin, obscenely long pink hair  would like her to be a kitsune with the nine tails.  pink fur.  starting equipment would like to be the succubus whip and nurse's outfit.  Also would like the xmas perk and all three Vday perks	Aria
    if (player.torso.vaginas.count <= 0) player.torso.vaginas.add(new Vagina());
    if (player.femininity < 80) player.femininity = 80;
    player.perks.add(PerkType.BimboBody, 0, 0, 0, 0);
    player.perks.add(PerkType.BimboBrains, 0, 0, 0, 0);
    for (let count = 0; count < 9; count++)
        player.torso.tails.add(new Tail(TailType.FOX));
    player.perks.add(PerkType.EnlightenedNinetails, 0, 0, 0, 0);
    player.torso.chest.get(0).rating = 5;
    player.femininity = 100;
    player.torso.hips.legs.type = LegType.DEMONIC_HIGH_HEELS;
    player.skin.tone = "pink";
    player.skin.type = SkinType.FUR;
    player.skin.desc = "fur";
    player.torso.neck.head.hair.color = "pink";
    player.torso.neck.head.hair.length = 50;
    player.torso.hips.rating = 5;
    player.torso.butt.rating = 5;
    player.thickness = 10;
    Flags.list[FlagEnum.PC_FETISH] = 2;
    player.inventory.equipment.piercings.ears.equip(new Piercing(PiercingType.Stud, "green gem-stone handcuffs", "Green gem-stone handcuffs"));
    player.inventory.equipment.piercings.nipples.get(0).equip(new Piercing(PiercingType.Stud, "seamless black nipple-studs", "Seamless black nipple-studs"));
    Flags.list[FlagEnum.PC_FETISH] = 2;
    player.inventory.equipment.piercings.clit.equip(new Piercing(PiercingType.Stud, "emerald clit-stud", "Emerald clit-stud"));
    player.inventory.equipment.piercings.labia.equip(new Piercing(PiercingType.Ring, "ruby labia-rings", "Ruby labia-rings"));
    player.perks.add(PerkType.ElvenBounty, 0, 15, 0, 0);
    player.perks.add(PerkType.PureAndLoving, 0, 0, 0, 0);
    player.perks.add(PerkType.SensualLover, 0, 0, 0, 0);
    player.perks.add(PerkType.OneTrackMind, 0, 0, 0, 0);
    player.setWeapon(weapons.SUCWHIP);
    player.setArmor(armors.NURSECL);
}
