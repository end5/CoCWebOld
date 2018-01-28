import { ArmType } from '../../Body/Arms';
import BreastRow from '../../Body/BreastRow';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { HornType } from '../../Body/Horns';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import { TongueType } from '../../Body/Tongue';
import Vagina from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';

export default function customTestChar(player: Player): void {
    player.stats.XP = 500000;
    player.stats.level = 20;
    player.torso.chest.add(new BreastRow());
    player.torso.vaginas.add(new Vagina());
    player.torso.chest.get(0).rating = 5;
    player.torso.chest.get(0).lactationMultiplier = 2;

    player.torso.clit.length = 0.5;
    player.fertility = 50;
    player.gender = 2;
    player.torso.hips.rating = 6;
    player.torso.butt.rating = 6;
    player.stats.str = 100;
    player.stats.tou = 100;
    player.stats.spe = 100;
    player.stats.int = 100;
    player.stats.sens = 100;
    player.stats.lib = 30;
    player.stats.cor = 71;
    kGAMECLASS.notes = "Cheater!";
    player.stats.HP = kGAMECLASS.maxHP();
    player.torso.neck.head.hair.length = 10;
    player.skin.type = SkinType.PLAIN;
    player.torso.neck.head.face.type = FaceType.HUMAN;
    player.torso.tails.add(new Tail(TailType.FOX));
    player.torso.tails.get(0).vemon = 4;
    player.torso.neck.head.face.tongue.type = TongueType.HUMAN;
    player.femininity = 90;
    player.tone = 0;
    player.thickness = 100;
    player.skin.desc = "skin";
    player.skin.tone = "pale";
    player.torso.neck.head.hair.color = "black";
    player.torso.balls.quantity = 2;
    player.cumMultiplier = 1;
    player.torso.balls.size = 3;
    player.hoursSinceCum = 0;
    player.torso.butt.looseness = 0;
    player.torso.butt.wetness = 0;
    player.torso.butt.fullness = 0;
    player.fertility = 50;
    player.stats.fatigue = 0;
    player.torso.neck.head.horns.amount = 0;
    player.torso.neck.head.horns.type = HornType.NONE;
    player.tallness = 109;
    player.torso.wings.type = WingType.DRACONIC_LARGE;
    player.torso.wings.desc = "non-existant";
    player.torso.neck.head.ears.type = EarType.HUMAN;
    player.torso.hips.legs.type = LegType.HUMAN;
    player.torso.arms.type = ArmType.HUMAN;
    player.torso.neck.head.hair.length = 69.2;
    player.torso.neck.head.hair.type = 4;
    // Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
    player.statusAffects.set(StatusAffectType.Kelt, StatusAffectFactory.create(StatusAffectType.Kelt, 100, 0, 0, 0));
    player.createKeyItem("Bow", 0, 0, 0, 0);

    player.createKeyItem("Zetaz's Map", 0, 0, 0, 0);

    inventory.createStorage();
    inventory.createStorage();
    inventory.createStorage();
    inventory.createStorage();
    inventory.createStorage();
    inventory.createStorage();
    player.createKeyItem("Camp - Chest", 0, 0, 0, 0);
    player.createKeyItem("Equipment Rack - Weapons", 0, 0, 0, 0);
    Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00254] = 1;
    player.createKeyItem("Equipment Rack - Armor", 0, 0, 0, 0);
    Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00255] = 1;

    player.statusAffects.set(StatusAffectFactory.create(StatusAffectType.KnowsWhitefire, 0, 0, 0, 0)); )

    player.perks.set(PerkType.HistoryFighter, PerkFactory.create(PerkType.HistoryFighter, 0, 0, 0, 0));
    player.perks.set(PerkType.Acclimation, PerkFactory.create(PerkType.Acclimation, 0, 0, 0, 0));
    player.perks.set(PerkType.Berzerker, PerkFactory.create(PerkType.Berzerker, 0, 0, 0, 0));
    player.perks.set(PerkType.BrutalBlows, PerkFactory.create(PerkType.BrutalBlows, 0, 0, 0, 0));
    player.perks.set(PerkType.DoubleAttack, PerkFactory.create(PerkType.DoubleAttack, 0, 0, 0, 0));
    player.perks.set(PerkType.ImmovableObject, PerkFactory.create(PerkType.ImmovableObject, 0, 0, 0, 0));
    player.perks.set(PerkType.LightningStrikes, PerkFactory.create(PerkType.LightningStrikes, 0, 0, 0, 0));
    player.perks.set(PerkType.LungingAttacks, PerkFactory.create(PerkType.LungingAttacks, 0, 0, 0, 0));
    player.perks.set(PerkType.Precision, PerkFactory.create(PerkType.Precision, 0, 0, 0, 0));
    player.perks.set(PerkType.Regeneration, PerkFactory.create(PerkType.Regeneration, 0, 0, 0, 0));
    player.perks.set(PerkType.Regeneration2, PerkFactory.create(PerkType.Regeneration2, 0, 0, 0, 0));
    player.perks.set(PerkType.Resistance, PerkFactory.create(PerkType.Resistance, 0, 0, 0, 0));
    player.perks.set(PerkType.Resolute, PerkFactory.create(PerkType.Resolute, 0, 0, 0, 0));
    player.perks.set(PerkType.SpeedyRecovery, PerkFactory.create(PerkType.SpeedyRecovery, 0, 0, 0, 0));
    player.perks.set(PerkType.Tactician, PerkFactory.create(PerkType.Tactician, 0, 0, 0, 0));
    player.perks.set(PerkType.Tank, PerkFactory.create(PerkType.Tank, 0, 0, 0, 0));
    player.perks.set(PerkType.Tank2, PerkFactory.create(PerkType.Tank2, 0, 0, 0, 0));
    player.perks.set(PerkType.ThunderousStrikes, PerkFactory.create(PerkType.ThunderousStrikes, 0, 0, 0, 0));
    player.perks.set(PerkType.WeaponMastery, PerkFactory.create(PerkType.WeaponMastery, 0, 0, 0, 0));
    player.perks.set(PerkType.WellAdjusted, PerkFactory.create(PerkType.WellAdjusted, 0, 0, 0, 0));

    player.perks.set(PerkType.SensualLover, PerkFactory.create(PerkType.SensualLover, 0, 0, 0, 0));
    player.perks.set(PerkType.SensualLover, PerkFactory.create(PerkType.SensualLover, 0, 0, 0, 0));

    Flags.list[FlagEnum.VALARIA_AT_CAMP] = 1;

    player.inventory.gems += 30000;
    DisplayText("You're something of a powerhouse, and you wager that between your odd mutations, power strong enough to threaten the village order, and talents, you're the natural choice to send through the portal.");

    player.itemSlot4.unlocked = true;
    player.itemSlot5.unlocked = true;
    player.itemSlot1.setItemAndQty(consumables.P_LBOVA, 5);
    player.itemSlot2.setItemAndQty(consumables.L_PNKEG, 1);
    player.itemSlot3.setItemAndQty(consumables.OVIELIX, 1);
    player.itemSlot4.setItemAndQty(consumables.REPTLUM, 1);

    player.statusAffects.set(StatusAffectFactory.create(StatusAffectType.TelAdre, 1, 0, 0, 0)); )
    // player.statusAffects.set(StatusAffectFactory.create(StatusAffectType.MetWhitney, 2, 0, 0, 0)));

    // Izma
    Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00238] = 1;

    // Vapula
    Flags.list[FlagEnum.VAPULA_FOLLOWER] = 1;

    // Amily
    Flags.list[FlagEnum.AMILY_FOLLOWER] = 2;

    // Jojo
    kGAMECLASS.monk = 5;

    // Bimbo Sophie
    Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00282] = 1;

    // Isabella
    Flags.list[FlagEnum.ISABELLA_FOLLOWER_ACCEPTED] = 1;

    // Latexy
    Flags.list[FlagEnum.GOO_SLAVE_RECRUITED] = 1;
    Flags.set(FlagEnum.GOO_NAME, "Latexy");
    Flags.list[FlagEnum.GOO_FLUID_AMOUNT] = 100;
    Flags.list[FlagEnum.GOO_HAPPINESS] = 100;
    Flags.list[FlagEnum.GOO_OBEDIENCE] = 100;

    // Ceraph
    Flags.list[FlagEnum.HAVE_CERAPH_PIERCING] = 1;

    // Holli
    Flags.list[FlagEnum.FUCK_FLOWER_LEVEL] = 4;

    // Milky
    Flags.set(FlagEnum.MILK_NAME, "Milky");
    Flags.list[FlagEnum.MILK_SIZE] = 2;

    // Rubi Testing
    // Flags.list[FlagEnum.RUBI_SUITCLOTHES] = 1;
    // Flags.list[FlagEnum.RUBI_FETISH_CLOTHES] = 1;
    // Flags.list[FlagEnum.RUBI_GREEN_ADVENTURER] = 1;
    // Flags.list[FlagEnum.RUBI_TUBE_TOP] = 1;
    // Flags.list[FlagEnum.RUBI_BODYSUIT] = 1;
    // Flags.list[FlagEnum.RUBI_LONGDRESS] = 1;
    // Flags.list[FlagEnum.RUBI_TIGHT_PANTS] = 1;
    // Flags.list[FlagEnum.RUBI_NURSE_CLOTHES] = 1;
    // Flags.list[FlagEnum.RUBI_SWIMWEAR] = 1;
    // Flags.list[FlagEnum.RUBI_BIMBO_MINIDRESS] = 1;
    // Flags.list[FlagEnum.RUBI_BONDAGE_STRAPS] = 1;
    // Flags.list[FlagEnum.RUBI_INQUISITORS_CORSET] = 1;
    Flags.list[FlagEnum.RUBI_AFFECTION] = 75;
    Flags.list[FlagEnum.RUBI_INTRODUCED] = 1;

    // Bazaar
    Flags.list[FlagEnum.BAZAAR_ENTERED] = 1;
}
