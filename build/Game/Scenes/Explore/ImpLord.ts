import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { ButtLooseness, ButtRating, ButtWetness } from '../../Body/Butt';
import { Cock, CockType } from '../../Body/Cock';
import { HipRating } from '../../Body/Hips';
import { LegType } from '../../Body/Legs';
import { Character } from '../../Character/Character';
import { CharacterDescription } from '../../Character/CharacterDescription';
import { CharacterType } from '../../Character/CharacterType';

//Special Attack 1
function impFire(): void {
    DisplayText("The imp mutters something to himself. Before you have time to react the demonic creature's hand is filled with a bright red fire that he hurls at you.  The flames lick at your body leaving a painful burn on you torso, as well as an arousing heat in your groin.");
    //[-HP // +Lust(minor)]
    let damage: number = 40 + randInt(10);
    player.takeDamage(damage);
    game.dynStats("lus", 20 + player.stats.cor / 10);
    combatRoundOver();
}

//Heavy Attack
function impLordHeavyEncounter(): void {
    let damage: number = int((str + weaponAttack + 20) - randInt(player.stats.tou) - player.armorDef);
    DisplayText("The demonic creature slashes a clawed hand towards your stomach,");
    if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) DisplayText(" but you handily avoid it.");
    else if (damage <= 0) DisplayText(" but the attack proves ineffectual.");
    else {
        DisplayText("leaving a large gash. The attack leaves you slightly stunned, but you recover. ");
        damage = player.takeDamage(damage);
        DisplayText("(" + damage + ")");
    }
    combatRoundOver();
}

//Lust Attack
function impLordLustAttack(): void {
    DisplayText("Lowering his loincloth the imp reveals his inhumanly thick shaft.  He smirks and licks his lips as he gives his cock a squeeze, milking a few beads of clear pre from the tip.  You shake your head and try to ignore your growing need.");
    //[+Lust]
    game.dynStats("lus", 5 + player.stats.lib / 5 + player.stats.cor / 5);
    combatRoundOver();
}

//Lust and Light Attack
function impLordLustAttack2(): void {
    DisplayText("Reaching into his satchel the devilish creature pulls out a leather riding crop.  He quickly rushes forward, but somehow manages to get behind you.  Before you can react the imp lashes out, striking your [butt] twice with the riding crop.  The strikes leave a slight burning feeling, as well as a strange sense of arousal.");
    let damage: number = 3 + randInt(10);
    damage = player.takeDamage(damage);
    DisplayText(" (" + damage + ")");
    //[-HP(minor) // +Lust]
    game.dynStats("lus", 5 + player.stats.sens / 4 + player.stats.cor / 10);
    combatRoundOver();
}
function performCombatAction(): void {
    let choices: Array = [impFire, impLordLustAttack2, impLordLustAttack, impLordHeavyEncounter, eAttack];
    choices[randInt(choices.length)]();
}

function defeated(hpVictory: boolean): void {
    game.impScene.defeatImpLord();
}

function won(hpVictory: boolean, pcCameWorms: boolean): void {
    game.impScene.loseToAnImpLord();
}

export class ImpLord extends Character {
    public constructor() {
        super(CharacterType.ImpLord);
        this.description = new CharacterDescription(this, "imp lord", "The greater imp has an angular face, complete with curved nose and burnt red skin typical of imps.  He has no hair on his head, leaving his cold, lust-clouded, black eyes unobstructed.  Just above his long pointed ears are two curved bovine horns.  While still short, he's much taller then the average imp, being nearly four feet tall, and extremely well-muscled.  A pair of powerful wings extends out from his shoulders, however, you suspect he wouldn't be able to fly for long due to his extreme bulk.  A thick coating of fur starts at his well toned hips and works its way down his powerful legs.  His legs end in a pair of oddly jointed, demonic hooves.  His demonic figure is completed by a thin tail that has an arrowhead shaped tip.\n\nThe greater imp, like most imps wear very little clothing; only a simple loincloth and satchel hang from his waist.  You also note that the imp has two barbell piercings in his nipples. The creature doesn't seem to have any weapons, aside from his sharp black finger nails.", false, " the");
        this.torso.cocks.add(new Cock(CockType.DEMON, randInt(2) + 11, 2.5));
        this.torso.balls.quantity = 2;
        this.torso.balls.size = 1;
        this.torso.chest.add(new BreastRow(0));
        this.cumMultiplier = 3;
        this.hoursSinceCum = 20;
        this.torso.butt.looseness = ButtLooseness.STRETCHED;
        this.torso.butt.wetness = ButtWetness.NORMAL;
        this.tallness = randInt(14) + 40;
        this.torso.hips.rating = HipRating.BOYISH;
        this.torso.butt.rating = ButtRating.TIGHT;
        this.torso.hips.legs.type = LegType.HOOFED;
        this.skin.tone = "red";
        this.baseStats.str = 55;
        this.baseStats.tou = 40;
        this.baseStats.spe = 75;
        this.baseStats.int = 42;
        this.baseStats.lib = 55;
        this.baseStats.sens = 35;
        this.baseStats.cor = 100;
        this.weaponName = "fist";
        this.weaponVerb = "punch";
        this.weaponAttack = 10;
        this.armorName = "leathery skin";
        this.armorDef = 5;
        this.bonusHP = 100;
        this.baseStats.lust = 30;
        this.baseStats.lustVuln = .65;
        // this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
        this.baseStats.level = 7;
        this.gems = randInt(15) + 25;
        this.drop = new WeightedDrop().
            add(consumables.MINOBLO, 1).
            add(consumables.LABOVA_, 1).
            add(consumables.INCUBID, 6).
            add(consumables.SUCMILK, 6);
        this.wingType = WingType.IMP;
        this.special1 = lustMagicAttack;
        checkMonster();
    }
}

