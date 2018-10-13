import { randInt } from '../../../../../Engine/Utilities/SMath';
import { fatigueRecovery } from '../../../../Combat/CombatUtils';
import { CombatEffectFactory } from '../../../../Effects/CombatEffectFactory';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { PerkType } from '../../../../Effects/PerkType';
import { NextScreenChoices } from '../../../../ScreenDisplay';
import { ICombatAction } from '../../../../Combat/Actions/ICombatAction';
import { Character } from '../../../Character';
import { CView } from '../../../../../Engine/Display/ContentView';
import { PlayerFlags } from '../../PlayerFlags';
import { CombatAbilityFlag } from '../../../../Effects/CombatAbilityFlag';

export class Attack implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MainAction;
    public name: string = "Attack";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target?: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): void | NextScreenChoices {
        if (!character.combat.effects.has(CombatEffectType.FirstAttack)) {
            CView.clear();
            fatigueRecovery(character);
        }

        if (!missNoAttack(character)) {
            if (character.perks.has(PerkType.DoubleAttack) && character.stats.spe >= 50 && PlayerFlags.DOUBLE_ATTACK_STYLE < 2) {
                if (character.combat.effects.has(CombatEffectType.FirstAttack))
                    character.combat.effects.remove(CombatEffectType.FirstAttack);
                else {
                    // Always!
                    if (PlayerFlags.DOUBLE_ATTACK_STYLE === 0)
                        character.combat.effects.set(CombatEffectType.FirstAttack, CombatEffectFactory.create(CombatEffectType.FirstAttack, 0, 0, 0, 0));
                    // Alternate!
                    else if (character.stats.str < 61 && PlayerFlags.DOUBLE_ATTACK_STYLE === 1)
                        character.combat.effects.set(CombatEffectType.FirstAttack, CombatEffectFactory.create(CombatEffectType.FirstAttack, 0, 0, 0, 0));
                }
            }

            if (!missUsedAttack(character, target)) {
                const crit = canCrit(character);
                let damage = determineDamage(character, target, crit);
                if (character.perks.has(PerkType.HistoryFighter))
                    damage *= 1.1;
                target.combat.respond.attacked(damage, crit, target, character);
            }

            if (character.combat.effects.has(CombatEffectType.FirstAttack)) {
                this.use(character, target);
                return;
            }
            else
                CView.text("\n");
        }
    }
}

function missNoAttack(character: Character): boolean {
    if (character.combat.effects.has(CombatEffectType.Sealed) && character.combat.effects.get(CombatEffectType.Sealed).value2 === 0) {
        CView.text("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  The kitsune's seals have made normal attack impossible!  Maybe you could try something else?\n\n");
        return true;
    }
    if (PlayerFlags.FETISH >= 3) {
        CView.text("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  Ceraph's piercings have made normal attack impossible!  Maybe you could try something else?\n\n");
        return true;
    }
    return false;
}

function missUsedAttack(character: Character, enemy: Character): boolean {
    if (character.combat.effects.has(CombatEffectType.Blind)) {
        CView.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ");
        return true;
    }
    return false;
}

function canCrit(character: Character): boolean {
    return randInt(100) <= 4 || (character.perks.has(PerkType.Tactician) && character.stats.int >= 50 && (character.stats.int - 50) / 5 > randInt(100));
}

function determineDamage(character: Character, enemy: Character, crit: boolean): number {
    let damage: number = 0;
    // Double Attack Hybrid Reductions
    if (
        character.perks.has(PerkType.DoubleAttack) &&
        character.stats.spe >= 50 &&
        character.stats.str > 61 &&
        PlayerFlags.DOUBLE_ATTACK_STYLE === 0
    ) {
        damage = 60.5;
    }
    else
        damage = character.stats.str;

    // Weapon addition!
    damage += character.inventory.equipment.weapon.attack;

    // Bonus sand trap damage!
    if (enemy.combat.effects.has(CombatEffectType.Level)) damage = Math.round(damage * 1.75);

    // Determine if critical hit!
    if (crit) {
        damage *= 1.75;
    }

    // Thunderous Strikes
    if (character.perks.has(PerkType.ThunderousStrikes) && character.stats.str >= 80)
        damage *= 1.2;

    // if (character.perks.has(PerkType.ChiReflowMagic)) damage *= UmasShop.NEEDLEWORK_MAGIC_REGULAR_MULTI;
    // if (character.perks.has(PerkType.ChiReflowAttack)) damage *= UmasShop.NEEDLEWORK_ATTACK_REGULAR_MULTI;

    damage = Math.round(damage);
    return damage;
}

function applyDamage(use: (char, mons) => void, character: Character, enemy: Character, damage: number, crit: boolean): void {
    // ANEMONE SHIT
    // if (enemy.desc.short === "anemone") {
    //     // hit successful:
    //     // special event, block (no more than 10-20% of turns, also fails if PC has >75 corruption):
    //     if (randInt(10) <= 1) {
    //         CView.text("Seeing your " + character.inventory.equipment.weapon.displayname + " raised, the anemone looks down at the water, angles her eyes up at you, and puts out a trembling lip.  ");
    //         if (character.stats.cor < 75) {
    //             CView.text("You stare into her hangdog expression and lose most of the killing intensity you had summoned up for your attack, stopping a few feet short of hitting her.\n");
    //             damage = 0;
    //             // Kick back to main if no damage occured!
    //             if (enemy.stats.HP > 0 && enemy.stats.lust < 100) {
    //                 if (character.combat.effects.has(CombatEffectType.FirstAttack)) {
    //                     use(character, enemy);
    //                     return;
    //                 }
    //             }
    //             return;
    //         }
    //         else
    //             CView.text("Though you lose a bit of steam to the display, the drive for dominance still motivates you to follow through on your swing.");
    //     }
    // }

    // Have to put it before doDamage, because doDamage applies the change, as well as status effects and shit.
    // if (monster.charType === CharacterType.Doppleganger) {
    //     if (!monster.combat.effects.has(CombatEffectType.Stunned)) {
    //         if (damage > 0 && character.perks.has(PerkType.HistoryFighter))
    //             damage *= 1.1;
    //         if (damage > 0)
    //             damage = monster.combat.stats.loseHP(damage, character);

    //         (monster as Doppleganger).mirrorAttack(damage);
    //         return;
    //     }

    //     // Stunning the doppleganger should now "buy" you another round.
    // }

    if (damage <= 0) {
        damage = 0;
        CView.text("Your attacks are deflected or blocked by " + enemy.desc.a + enemy.desc.short + ".");
    }
    else {
        if (character.perks.has(PerkType.HistoryFighter))
            damage *= 1.1;
        enemy.combat.respond.attacked(damage, crit, enemy, character);
    }

    // if (damage > 0) {
    //     // Lust raised by anemone contact!
    //     // if (monster.desc.short === "anemone") {
    //     //     CView.text("\nThough you managed to hit the anemone, several of the tentacles surrounding her body sent home jolts of venom when your swing brushed past them.");
    //     //     // (gain lust, temp lose str/spd)
    //     //     (monster as Anemone).applyVenom(1 + randInt(2));
    //     // }

    // if (enemy.charType === CharacterType.JeanClaude && !character.combat.effects.has(CombatEffectType.FirstAttack)) {
    //     if (enemy.stats.HP < 1 || enemy.stats.lust > 99) {
    //         // noop
    //     }
    //     if (character.stats.lust <= 30) {
    //         CView.text("\n\nJean-Claude doesn’t even budge when you wade into him with your [weapon].");

    //         CView.text("\n\n“<i>Why are you attacking me, slave?</i>” he says. The basilisk rex sounds genuinely confused. His eyes pulse with hot, yellow light, reaching into you as he opens his arms, staring around as if begging the crowd for an explanation. “<i>You seem lost, unable to understand, lashing out at those who take care of you. Don’t you know who you are? Where you are?</i>” That compulsion in his eyes, that never-ending heat, it’s... it’s changing things. You need to finish this as fast as you can.");
    //     }
    //     else if (character.stats.lust <= 50) {
    //         CView.text("\n\nAgain your [weapon] thumps into Jean-Claude. Again it feels wrong. Again it sends an aching chime through you, that you are doing something that revolts your nature.");

    //         CView.text("\n\n“<i>Why are you fighting your master, slave?</i>” he says. He is bigger than he was before. Or maybe you are smaller. “<i>You are confused. Put your weapon down- you are no warrior, you only hurt yourself when you flail around with it. You have forgotten what you were trained to be. Put it down, and let me help you.</i>” He’s right. It does hurt. Your body murmurs that it would feel so much better to open up and bask in the golden eyes fully, let it move you and penetrate you as it may. You grit your teeth and grip your [weapon] harder, but you can’t stop the warmth the hypnotic compulsion is building within you.");
    //     }
    //     else if (character.stats.lust <= 80) {
    //         CView.text("\n\n“<i>Do you think I will be angry at you?</i>” growls Jean-Claude lowly. Your senses feel intensified, his wild, musky scent rich in your nose. It’s hard to concentrate... or rather it’s hard not to concentrate on the sweat which runs down his hard, defined frame, the thickness of his bulging cocks, the assured movement of his powerful legs and tail, and the glow, that tantalizing, golden glow, which pulls you in and pushes so much delicious thought and sensation into your head…  “<i>I am not angry. You will have to be punished, yes, but you know that is only right, that in the end you will accept and enjoy being corrected. Come now, slave. You only increase the size of the punishment with this silliness.</i>”");
    //     }
    //     else {
    //         CView.text("\n\nYou can’t... there is a reason why you keep raising your weapon against your master, but what was it? It can’t be that you think you can defeat such a powerful, godly alpha male as him. And it would feel so much better to supplicate yourself before the glow, lose yourself in it forever, serve it with your horny slut body, the only thing someone as low and helpless as you could possibly offer him. Master’s mouth is moving but you can no longer tell where his voice ends and the one in your head begins... only there is a reason you cling to like you cling onto your [weapon], whatever it is, however stupid and distant it now seems, a reason to keep fighting...");
    //     }
    //     character.stats.lust += 25;
    // }

    CView.text("\n");
    // Kick back to main if no damage occured!
    if (enemy.stats.HP >= 1 && enemy.stats.lust <= 99) {
        if (character.combat.effects.has(CombatEffectType.FirstAttack)) {
            use(character, enemy);
            return;
        }
        CView.text("\n");
    }
}
