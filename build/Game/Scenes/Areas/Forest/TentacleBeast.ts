import { DisplayText } from '../../../../Engine/display/DisplayText';
import { randInt } from '../../../../Engine/Utilities/SMath';
import { ButtLooseness, ButtRating, ButtWetness } from '../../../Body/Butt';
import { Gender } from '../../../Body/GenderIdentity';
import { HipRating } from '../../../Body/Hips';
import { SkinType } from '../../../Body/Skin';
import { Character } from '../../../Character/Character';
import { CharacterDescription } from '../../../Character/CharacterDescription';
import { CombatAction } from '../../../Combat/Actions/CombatAction';
import { DefeatType } from '../../../Combat/DefeatEvent';
import { EndScenes } from '../../../Combat/EndScenes';
import { PerkType } from '../../../Effects/PerkType';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import { NextScreenChoices } from '../../../ScreenDisplay';
import { Scenes } from '../../Scenes';

class Attack implements CombatAction {
    public name: string = "Attack";
    public reasonCannotUse: string;

    public isPossible(tentaclebeast: Character): boolean {
        return true;
    }

    public canUse(tentaclebeast: Character, enemy?: Character): boolean {
        return true;
    }

    public use(tentaclebeast: Character, enemy?: Character): NextScreenChoices {
        DisplayText("The shambling horror throws its tentacles at you with a murderous force.\n");
        let damage: number = Math.floor((tentaclebeast.stats.str + tentaclebeast.inventory.equipment.weapon.attack) - Math.random() * (enemy.stats.tou) - enemy.inventory.equipment.armor.defense);
        if (damage < 0) damage = 0;
        // Miss
        if (damage === 0 || (enemy.stats.spe - tentaclebeast.stats.spe > 0 && Math.floor(Math.random() * (((enemy.stats.spe - tentaclebeast.stats.spe) / 4) + 80)) > 80)) {
            DisplayText("However, you quickly evade the clumsy efforts of the abomination to strike you.");
        }
        // Hit
        else {
            damage = enemy.combat.stats.loseHP(damage, tentaclebeast);
            DisplayText("The tentacles crash upon your body mercilessly for " + damage + " damage.");
        }
    }
}

class Entwine implements CombatAction {
    public name: string = "Entwine";
    public reasonCannotUse: string;

    public isPossible(tentaclebeast: Character): boolean {
        return true;
    }

    public canUse(tentaclebeast: Character, enemy?: Character): boolean {
        return true;
    }

    public use(tentaclebeast: Character, enemy?: Character): NextScreenChoices {
        DisplayText("The beast lunges its tentacles at you from all directions in an attempt to immobilize you.\n");
        // Not Trapped yet
        if (!enemy.statusAffects.has(StatusAffectType.TentacleBind)) {
            // Success
            if (Math.floor(Math.random() * (((enemy.stats.spe) / 2))) > 15 || (enemy.perks.has(PerkType.Evade) && Math.floor(Math.random() * (((enemy.stats.spe) / 2))) > 15)) {
                DisplayText("In an impressive display of gymnastics, you dodge, duck, dip, dive, and roll away from the shower of grab-happy arms trying to hold you. Your instincts tell you that this was a GOOD thing.\n");
            }
            // Fail
            else {
                DisplayText("While you attempt to avoid the onslaught of pseudopods, one catches you around your " + LegDescriptor.describeFoot(enemy) + " and drags you to the ground. You attempt to reach for it to pull it off only to have all of the other tentacles grab you in various places and immobilize you in the air. You are trapped and helpless!!!\n\n");
                // Male/Herm Version:
                if (enemy.torso.cocks.count > 0) DisplayText("The creature, having immobilized you, coils a long tendril about your penis. You shudder as the creature begins stroking your cock like a maid at a dairy farm in an attempt to provoke a response from you. Unable to resist, your " + Desc.Cock.describeCock(enemy, enemy.torso.cocks.get(0)) + " easily becomes erect, signaling to the creature that you are responsive to harsher stimulation.\n");
                // Female Version:
                else if (enemy.torso.vaginas.count > 0) DisplayText("The creature quickly positions a long tentacle with a single sucker over your clitoris. You feel the power of the suction on you, and your body quickly heats up.  Your clit engorges, prompting the beast to latch the sucker onto your " + Desc.Vagina.describeClit(enemy) + ".\n");
                // Genderless
                else DisplayText("The creature quickly positions a long tentacle against your " + Desc.Butt.describeButthole(enemy.torso.butt) + ". It circles your pucker with slow, delicate strokes that bring unexpected warmth to your body.\n");
                // game.dynStats("lus", (8 + enemy.stats.sens / 20));
                enemy.stats.lust += (8 + enemy.stats.sens / 20);
                enemy.statusAffects.add(StatusAffectType.TentacleBind, 0, 0, 0, 0);
            }
        }
    }
}

class TentacleBeastEndScenes extends EndScenes {
    public hasEscaped(enemy: Character): boolean { return false; }
    public hasDefeated(enemy: Character): boolean { return false; }
    public claimsVictory(howYouWon: DefeatType, enemy: Character) { }
    public criesInDefeat(howYouLost: DefeatType, enemy: Character) { }
    protected beforeEndingScene(howEnemyWon: DefeatType, enemy: Character) { }

    public hasVictoryScene: boolean = true;
    protected victoryScene(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (howYouWon === DefeatType.HP) {
            DisplayText("Overcome by your wounds, you turn to make a last desperate attempt to run...\n\n");
            if (enemy.statusAffects.has(StatusAffectType.PhyllaFight)) {
                enemy.statusAffects.remove(StatusAffectType.PhyllaFight);
                DisplayText("...and make it into the nearby tunnel.  ");
                return Scenes.desert.antsScene.phyllaTentaclePCLoss();
            }
            else
                return Scenes.forest.tentacleBeastScene.tentacleLossRape();
        }
        else {
            DisplayText("You give up on fighting, too aroused to resist any longer.  Shrugging, you walk into the writhing mass...\n\n");
            if (enemy.statusAffects.has(StatusAffectType.PhyllaFight)) {
                enemy.statusAffects.remove(StatusAffectType.PhyllaFight);
                DisplayText("...but an insistent voice rouses you from your stupor.  You manage to run into a nearby tunnel.  ");
                return Scenes.desert.antsScene.phyllaTentaclePCLoss();
            }
            else
                return { next: Scenes.forest.tentacleBeastScene.tentacleLossRape };
        }
    }

    public hasDefeatScene: boolean = true;
    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        if (howYouLost === DefeatType.HP) {
            DisplayText().clear();
            DisplayText("The creature lets out an ear-piercing screech as it collapses upon itself. Its green coloring quickly fades to brown as the life drains from it, leaving you victorious.");
        } else {
            DisplayText("The tentacle beast's mass begins quivering and sighing, the tentacles wrapping around each other and feverishly caressing each other.  It seems the beast has given up on fighting.");
        }
        if (this.char.statusAffects.has(StatusAffectType.PhyllaFight)) {
            this.char.statusAffects.remove(StatusAffectType.PhyllaFight);
            return Scenes.desert.antsScene.phyllaTentacleDefeat();
        }
        else {
            if (howYouLost !== DefeatType.HP && enemy.gender > 0) {
                DisplayText().clear();
                DisplayText("  Perhaps you could use it to sate yourself?");
                return { yes: Scenes.forest.tentacleBeastScene.tentacleVictoryRape, no: Scenes.camp.returnToCampUseOneHour };
            }
            else {
                return { next: Scenes.camp.returnToCampUseOneHour };
            }
        }
    }
}

export class TentacleBeast extends Character {
    public performCombatAction() {
        // tentacle beasts have special AI
        if (randInt(2) === 0 || this.statusAffects.has(StatusAffectType.TentacleCoolDown))
            special1();
        else special2();
    }

    public TentacleBeast() {
        this.description = new CharacterDescription(this, "tentacle beast", "You see the massive, shambling form of the tentacle beast before you.  Appearing as a large shrub, it shifts its bulbous mass and reveals a collection of thorny tendrils and cephalopodic limbs.", false, "the ");
        this.torso.cocks.add(new Cock(40, 1.5));
        this.createCock(60, 1.5);
        this.createCock(50, 1.5);
        this.createCock(20, 1.5);
        this.balls = 0;
        this.ballSize = 0;
        this.cumMultiplier = 3;
        // this.hoursSinceCum = 0;
        this.gender = Gender.NONE;
        this.pronoun1 = "it";
        this.pronoun2 = "it";
        this.pronoun3 = "its";
        this.createBreastRow(0, 0);
        this.torso.butt.looseness = ButtLooseness.TIGHT;
        this.torso.butt.wetness = ButtWetness.SLIME_DROOLING;
        this.tallness = randInt(9) + 70;
        this.torso.hips.rating = HipRating.BOYISH;
        this.torso.butt.rating = ButtRating.BUTTLESS;
        this.skin.tone = "green";
        this.skin.type = SkinType.PLAIN;
        this.skin.desc = "bark";
        this.torso.neck.head.hair.color = "green";
        this.torso.neck.head.hair.length = 1;
        this.baseStats.str = 58;
        this.baseStats.tou = 25;
        this.baseStats.spe = 45;
        this.baseStats.int = 45;
        this.baseStats.lib = 90;
        this.baseStats.sens = 20;
        this.baseStats.cor = 100;
        this.weaponName = "whip-tendril";
        this.weaponVerb = "thorny tendril";
        this.weaponAttack = 1;
        this.armorName = "rubbery skin";
        this.armorDef = 1;
        this.bonusHP = 350;
        this.lust = 10;
        this.lustVuln = 0.8;
        this.temperment = TEMPERMENT_LOVE_GRAPPLES;
        this.level = 6;
        this.gems = randInt(15) + 5;
        this.drop = new WeightedDrop(null, 1);
        this.special1 = tentaclePhysicalAttack;
        this.special2 = tentacleEntwine;
        this.special3 = tentaclePhysicalAttack;
        this.tailType = TailType.DEMONIC;
    }
}
