import { BreastRow } from '../Body/BreastRow';
import { Gender } from '../Body/GenderIdentity';
import { Character } from '../Character/Character';
import { Time } from '../Utilities/Time';

// Possible text arguments in the conditional of a if statement
// First, there is an attempt to cast the argument to a Number. If that fails,
// a dictionary lookup is performed to see if the argument is in the conditionalOptions[]
// object. If that fails, we just fall back to returning 0
const conditionalOptions =
    {
        strength: (char: Character) => char.stats.str,
        toughness: (char: Character) => char.stats.tou,
        speed: (char: Character) => char.stats.spe,
        intelligence: (char: Character) => char.stats.int,
        libido: (char: Character) => char.stats.lib,
        sensitivity: (char: Character) => char.stats.sens,
        corruption: (char: Character) => char.stats.cor,
        fatigue: (char: Character) => char.stats.fatigue,
        hp: (char: Character) => char.stats.HP,
        hour: (char: Character) => Time.hour,
        days: (char: Character) => Time.day,
        tallness: (char: Character) => char.tallness,
        hairlength: (char: Character) => char.torso.neck.head.hair.length,
        femininity: (char: Character) => char.femininity,
        masculinity: (char: Character) => 100 - char.femininity,
        cocks: (char: Character) => char.torso.cocks.count,
        breastrows: (char: Character) => char.torso.chest.count,
        biggesttitsize: (char: Character) => char.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating,
        vagcapacity: (char: Character) => char.vaginalCapacity(),
        analcapacity: (char: Character) => char.analCapacity(),
        balls: (char: Character) => char.torso.balls,
        cumquantity: (char: Character) => char.cumQ(),
        milkquantity: (char: Character) => char.lactationQ(),
        hasvagina: (char: Character) => char.torso.vaginas.count > 0,
        istaur: (char: Character) => char.torso.hips.legs.isTaur(),
        isnaga: (char: Character) => char.torso.hips.legs.isNaga(),
        isgoo: (char: Character) => char.torso.hips.legs.isGoo(),
        isbiped: (char: Character) => char.torso.hips.legs.isBiped(),
        hasbreasts: (char: Character) => (char.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1),
        hasballs: (char: Character) => (char.torso.balls.quantity > 0),
        hascock: (char: Character) => char.torso.cocks.count > 0,
        isherm: (char: Character) => (char.gender === Gender.HERM),
        cumnormal: (char: Character) => (char.cumQ() <= 150),
        cummedium: (char: Character) => (char.cumQ() > 150 && char.cumQ() <= 350),
        cumhigh: (char: Character) => (char.cumQ() > 350 && char.cumQ() <= 1000),
        cumveryhigh: (char: Character) => (char.cumQ() > 1000 && char.cumQ() <= 2500),
        cumextreme: (char: Character) => (char.cumQ() > 2500),
        issquirter: (char: Character) => (char.torso.vaginas.get(0).wetness >= 4),
        ispregnant: (char: Character) => char.pregnancy.womb.isPregnant(),
        isbuttpregnant: (char: Character) => char.pregnancy.buttWomb.isPregnant(),
        hasnipplecunts: (char: Character) => char.torso.chest.find(BreastRow.FuckableNipples),
        canfly: (char: Character) => char.canFly(),
        islactating: (char: Character) => (char.lactationQ() > 0),
        true: () => true,
        false: () => false
    };
