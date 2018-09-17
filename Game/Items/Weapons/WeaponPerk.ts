import { DisplayText } from '../../../Engine/display/DisplayText';
import { Dictionary } from '../../../Engine/Utilities/Dictionary';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffectType } from '../../Effects/CombatEffectType';
import { PerkType } from '../../Effects/PerkType';

export enum WeaponPerkType {
    Penetrate = "Penetrate",
    Aphrodisiac = "Aphrodisiac",
    CoiledWhip = "CoiledWhip",
    SuccubiWhip = "SuccubiWhip",
    Stunning = "Stunning",
    Bleeding = "Bleeding",
    Large = "Large",
    WizardsFocus = "Wizard's Focus",
    HolySword = "Holy Sword"
}
export type WeaponPerk = (self: Character, target: Character) => any;

class WeaponPerkLibrary extends Dictionary<WeaponPerk> {
    public constructor() {
        super();
        this.set(WeaponPerkType.Penetrate, Penetrate);
        this.set(WeaponPerkType.Aphrodisiac, Aphrodisiac);
        this.set(WeaponPerkType.CoiledWhip, CoiledWhip);
        this.set(WeaponPerkType.SuccubiWhip, SuccubiWhip);
        this.set(WeaponPerkType.Stunning, Stunning);
        this.set(WeaponPerkType.Bleeding, Bleeding);
        this.set(WeaponPerkType.Large, undefined);
    }
}
export const WeaponPerkLib = new WeaponPerkLibrary();

export function Penetrate(self: Character, target: Character) {
    return target.combat.stats.defense();
}

export function Aphrodisiac(self: Character, target: Character) {
    target.stats.lust += target.stats.lustVuln * (5 + self.stats.cor / 10);
    DisplayText("\n" + target.desc.capitalA + target.desc.short + " shivers as your weapon's 'poison' goes to work.");
}

export function CoiledWhip(self: Character, target: Character) {
    if (randInt(2) === 0) {
        target.stats.lust += target.stats.lustVuln * (5 + self.stats.cor / 12);
        if (!target.desc.plural)
            DisplayText("\n" + target.desc.capitalA + target.desc.short + " shivers and gets turned on from the whipping.");
        else
            DisplayText("\n" + target.desc.capitalA + target.desc.short + " shiver and get turned on from the whipping.");
    }
}

export function SuccubiWhip(self: Character, target: Character) {
    target.stats.lust += target.stats.lustVuln * (20 + self.stats.cor / 15);
    if (self.stats.cor < 90) self.stats.cor += 0.3;
    if (!target.desc.plural)
        DisplayText("\n" + target.desc.capitalA + target.desc.short + " shivers and moans involuntarily from the whip's touches.");
    else
        DisplayText("\n" + target.desc.capitalA + target.desc.short + " shiver and moan involuntarily from the whip's touches.");
    if (randInt(2) === 0) {
        DisplayText("  You get a sexual thrill from it.");
        self.stats.lust += 1;
    }
}

// Warhammer, Gauntlets
export function Stunning(self: Character, target: Character) {
    if (randInt(10) === 0 && !target.perks.has(PerkType.Resolute)) {
        DisplayText("\n" + target.desc.capitalA + target.desc.short + " reels from the brutal blow, stunned.");
        target.combat.effects.add(CombatEffectType.Stunned);
    }
}

// Hooked Gauntlets
export function Bleeding(self: Character, target: Character) {
    if (randInt(2) === 0 && target.combat.stats.defense() < 10 && !target.combat.effects.has(CombatEffectType.IzmaBleed)) {
        if (target.charType === CharacterType.LivingStatue) {
            DisplayText("Despite the rents you've torn in its stony exterior, the statue does not bleed.");
        }
        else {
            target.combat.effects.add(CombatEffectType.IzmaBleed, 3, 0, 0, 0);
            if (target.desc.plural)
                DisplayText("\n" + target.desc.capitalA + target.desc.short + " bleed profusely from the many bloody gashes your hooked gauntlets leave behind.");
            else
                DisplayText("\n" + target.desc.capitalA + target.desc.short + " bleeds profusely from the many bloody gashes your hooked gauntlets leave behind.");
        }
    }
}
