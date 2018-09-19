import { CombatAction } from "../../../../Combat/Actions/CombatAction";
import { Character } from "../../../Character";
import { CombatAbilityFlag } from "../../../../Effects/CombatAbilityFlag";
import { DisplayText } from "../../../../../Engine/display/DisplayText";
import { Gender } from "../../../../Body/GenderIdentity";
import { StatusEffectType } from "../../../../Effects/StatusEffectType";
import { PerkType } from "../../../../Effects/PerkType";
import { randInt } from "../../../../../Engine/Utilities/SMath";
import { Desc } from "../../../../Descriptors/Descriptors";
import { NextScreenChoices } from "../../../../ScreenDisplay";

export class NagaTease implements CombatAction {
    public name: string = "NagaTease";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return character.combat.effects.combatAbilityFlag & CombatAbilityFlag.Tease ? true : false;
    }
    public canUse(character: Character, target?: Character): boolean {
        return target.statusAffects.has(StatusEffectType.Constricted);
    }

    public use(character: Character, target: Character): NextScreenChoices {
        DisplayText().clear();
        // (if poisoned)
        if (target.statusAffects.has(StatusEffectType.NagaVenom)) {
            DisplayText("You attempt to stimulate " + target.desc.a + target.desc.short + " by rubbing " + target.desc.possessivePronoun + " nether regions, but " + target.desc.possessivePronoun + " seems too affected by your poison to react.\n\n");
        }
        else if (target.gender === Gender.NONE) {
            DisplayText("You look over " + target.desc.a + target.desc.short + ", but can't figure out how to tease such an unusual foe.\n\n");
        }
        // (Otherwise)
        else {
            kGAMECLASS.fatigueRecovery();
            let damage: number = 0;
            let chance: number = 0;
            let bimbo: boolean = false;
            let bro: boolean = false;
            let futa: boolean = false;
            // ==============================
            // Determine basic success chance.
            // ==============================
            chance = 60;
            // 5% chance for each tease level.
            chance += character.stats.teaseLevel * 5;
            // 10% for seduction perk
            if (character.perks.has(PerkType.Seduction)) chance += 10;
            // 10% for sexy armor types
            if (character.perks.has(PerkType.SluttySeduction)) chance += 10;
            // 10% for bimbo shits
            if (character.perks.has(PerkType.BimboBody)) {
                chance += 10;
                bimbo = true;
            }
            if (character.perks.has(PerkType.BroBody)) {
                chance += 10;
                bro = true;
            }
            if (character.perks.has(PerkType.FutaForm)) {
                chance += 10;
                futa = true;
            }
            // 2 & 2 for seductive valentines!
            if (character.perks.has(PerkType.SensualLover)) {
                chance += 2;
            }
            // ==============================
            // Determine basic damage.
            // ==============================
            damage = 6 + randInt(3);
            if (character.perks.has(PerkType.SensualLover)) {
                damage += 2;
            }
            if (character.perks.has(PerkType.Seduction)) damage += 5;
            // + slutty armor bonus
            if (character.perks.has(PerkType.SluttySeduction)) damage += character.perks.get(PerkType.SluttySeduction).value1;
            // 10% for bimbo shits
            if (bimbo || bro || futa) {
                damage += 5;
                bimbo = true;
            }
            damage += character.stats.level;
            damage += character.stats.teaseLevel * 2;
            damage += randInt(7);
            chance += 2;
            // Specific cases for slimes and demons, as the normal ones would make no sense
            if (target.desc.short === "demons") {
                DisplayText("As you stimulate one of their brethren, the other demons can't help but to feel more aroused by this sight, all wishing to touch and feel the contact of your smooth, scaly body.");
            }
            else if (target.desc.short === "slime") {
                DisplayText("You attempt to stimulate the slime despite its lack of any sex organs. Somehow, it works!");
            }
            // Normal cases for other monsters
            else {
                if (target.gender === Gender.MALE) {
                    DisplayText("Your nimble tail begins to gently stroke his " + describeCockShort(target.body.cocks.get(0)) + ", and you can see it on his face as he tries to hold back the fact that it feels good.");
                }
                if (target.gender === Gender.FEMALE) {
                    DisplayText("Your nimble tail manages to work its way between her legs, grinding your tail's scaly skin against her clit. She appears to enjoy it, but it is obvious she is trying to hide it from you.");
                }
                if (target.gender === Gender.HERM) {
                    DisplayText("Your nimble tail manages to work its way between " + target.desc.possessivePronoun + " legs, gaining access to both sets of genitals. As your rough, scaly skin rubs past " + target.desc.possessivePronoun + " clit, your tail gently begins to stroke " + target.desc.possessivePronoun + " cock. The repressed expression on " + target.desc.possessivePronoun + " face betrays " + target.desc.possessivePronoun + " own enjoyment of this kind of treatment.");
                }
            }
            // Land the hit!
            if (randInt(100) <= chance) {
                // NERF TEASE DAMAGE
                damage *= .9;
                if (character.perks.has(PerkType.HistoryWhore)) {
                    damage *= 1.15;
                }
                target.teased(damage);
                kGAMECLASS.teaseXP(1);
            }
            // Nuttin honey
            else {
                kGAMECLASS.teaseXP(5);
                DisplayText("\n" + target.desc.capitalA + target.desc.short + " seems unimpressed.");
            }
            DisplayText("\n\n");
            // OLD
            // monster.lust += 5 + randInt(15);
            if (target.stats.lust > 99) {
                return { next: kGAMECLASS.endLustVictory };
            }
        }
        return;
    }
}
