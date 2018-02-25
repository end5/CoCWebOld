import { ButtLooseness, ButtWetness } from '../Body/Butt';
import { FaceType } from '../Body/Face';
import { SkinType } from '../Body/Skin';
import { TongueType } from '../Body/Tongue';
import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import CombatContainer from '../Combat/CombatContainer';
import { PerkType } from '../Effects/PerkType';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';
import Armor from '../Items/Armors/Armor';
import ArmorName from '../Items/Armors/ArmorName';
import ItemFactory from '../Items/ItemFactory';
import ItemType from '../Items/ItemType';
import Weapon from '../Items/Weapons/Weapon';
import WeaponName from '../Items/Weapons/WeaponName';
import { Utils } from '../Utilities/Utils';

export default class Player extends Character {
    public constructor() {
        super(CharacterType.Player);
        // Reset all standard stats
        this.stats.str = 15;
        this.stats.tou = 15;
        this.stats.spe = 15;
        this.stats.int = 15;
        this.stats.sens = 15;
        this.stats.lib = 15;
        this.stats.cor = 0;
        this.stats.lust = 15;

        // kGAMECLASS.notes = "No Notes Available.";
        this.stats.XP = Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP];
        this.stats.level = 1;
        this.stats.HP = this.stats.maxHP();
        this.inventory.gems = Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS];
        this.skin.type = SkinType.PLAIN;
        this.torso.neck.head.face.type = FaceType.HUMAN;
        this.torso.neck.head.face.tongue.type = TongueType.HUMAN;
        this.skin.desc = "skin";
        this.cumMultiplier = 1;
        this.hoursSinceCum = 0;
        this.torso.butt.looseness = ButtLooseness.VIRGIN;
        this.torso.butt.wetness = ButtWetness.DRY;
        this.torso.butt.fullness = 0;
        this.stats.fatigue = 0;

        // Inventory
        this.inventory.items.unlock(6);
        this.inventory.equipment.defaultWeaponSlot.equip(ItemFactory.get(ItemType.Weapon, WeaponName.Fists) as Weapon);
        this.inventory.equipment.equippedArmorSlot.equip(ItemFactory.get(ItemType.Armor, ArmorName.ComfortUndercloth) as Armor);

        // Combat
        this.combatContainer = new CombatContainer(this, new PlayerActions(), new PlayerResponses(), new PlayerEndScenes());
    }

    // Lust vulnerability
    // TODO: Kept for backwards compatibility reasons but should be phased out.
    public lustVuln: number = 1;

    // Teasing attributes
    public teaseLevel: number = 0;
    public teaseXP: number = 0;

    // Perks used to store 'queued' perk buys
    public perkPoints: number = 0;

    public minoCumAddiction(raw: number = 10): void {
        // Increment minotaur cum intake count
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00340]++;
        // Fix if variables go out of range.
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] < 0) Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] = 0;
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] < 0) Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] = 0;
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] > 120) Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] = 120;

        // Turn off withdrawal
        // if(Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] > 1) Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] = 1;
        // Reset counter
        Flags.list[FlagEnum.TIME_SINCE_LAST_CONSUMED_MINOTAUR_CUM] = 0;
        // If highly addicted, rises slower
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] >= 60) raw /= 2;
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] >= 80) raw /= 2;
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] >= 90) raw /= 2;
        // If in withdrawl, readdiction is potent!
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] === 3) raw += 10;
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] === 2) raw += 5;
        raw = Math.round(raw * 100) / 100;
        // PUT SOME CAPS ON DAT' SHIT
        if (raw > 50) raw = 50;
        if (raw < -50) raw = -50;
        Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] += raw;
        // Recheck to make sure shit didn't break
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] > 120) Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] = 120;
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] < 0) Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_TRACKER] = 0;

    }

    public minotaurAddicted(): boolean {
        return this.perks.has(PerkType.MinotaurCumAddict) || Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] >= 1;
    }
    public minotaurNeed(): boolean {
        return Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] > 1;
    }
}
