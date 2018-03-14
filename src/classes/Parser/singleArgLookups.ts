import Character from '../Character/Character';
import BallsDescriptor from '../Descriptors/BallsDescriptor';
import BodyDescriptor from '../Descriptors/BodyDescriptor';
import BreastDescriptor from '../Descriptors/BreastDescriptor';
import ButtDescriptor from '../Descriptors/ButtDescriptor';
import CockDescriptor from '../Descriptors/CockDescriptor';
import FaceDescriptor from '../Descriptors/FaceDescriptor';
import GenderDescriptor from '../Descriptors/GenderDescriptor';
import HeadDescriptor from '../Descriptors/HeadDescriptor';
import HipDescriptor from '../Descriptors/HipDescriptor';
import LegDescriptor from '../Descriptors/LegDescriptor';
import SkinDescriptor from '../Descriptors/SkinDescriptor';
import VaginaDescriptor from '../Descriptors/VaginaDescriptor';
import Game from '../Game/Game';

// Lookup dictionary for converting any single argument brackets into it's corresponding string
// basically [armor] results in the "[armor]" segment of the string being replaced with the
// results of the corresponding anonymous function, in this case: function():* {return player.inventory.armorSlot.equipment.displayName;}
// tags not present in the singleArgConverters object return an error message.
//

const singleArgConverters =
    {
        agility: (char: Character) => "[Agility]",
        armor: (char: Character) => char.inventory.equipment.armor.displayName,
        armorname: (char: Character) => char.inventory.equipment.armor.displayName,
        ass: (char: Character) => ButtDescriptor.describeButt(char),
        asshole: (char: Character) => ButtDescriptor.describeButthole(char.torso.butt),
        balls: (char: Character) => BallsDescriptor.describeBalls(true, true, char),
        boyfriend: (char: Character) => GenderDescriptor.mf(char, "boyfriend", "girlfriend"),
        butt: (char: Character) => ButtDescriptor.describeButt(char),
        butthole: (char: Character) => ButtDescriptor.describeButthole(char.torso.butt),
        chest: (char: Character) => BreastDescriptor.describeChest(char),
        clit: (char: Character) => VaginaDescriptor.describeClit(char),
        cock: (char: Character) => CockDescriptor.describeCock(char, char.torso.cocks.get(0)),
        cockhead: (char: Character) => CockDescriptor.describeCockHead(char.torso.cocks.get(0)),
        cocks: (char: Character) => CockDescriptor.describeMultiCockShort(char),
        cunt: (char: Character) => VaginaDescriptor.describeVagina(char, char.torso.vaginas.get(0)),
        eachcock: (char: Character) => CockDescriptor.describeMultiCockSimpleOne(char),
        evade: (char: Character) => "[Evade]",
        face: (char: Character) => FaceDescriptor.describeFace(char),
        feet: (char: Character) => LegDescriptor.describeFeet(char),
        foot: (char: Character) => LegDescriptor.describeFoot(char),
        fullchest: (char: Character) => BreastDescriptor.describeAllBreasts(char),
        hair: (char: Character) => HeadDescriptor.describeHair(char),
        hairorfur: (char: Character) => HeadDescriptor.hairOrFur(char),
        he: (char: Character) => char.desc.subjectivePronoun,
        // he2: (char: Character) => char2.mf("he", "she"),
        him: (char: Character) => char.desc.objectivePronoun,
        // him2: (char: Character) => char2.mf("him", "her"),
        himself: (char: Character) => GenderDescriptor.mf(char, "himself", "herself"),
        herself: (char: Character) => GenderDescriptor.mf(char, "himself", "herself"),
        hips: (char: Character) => HipDescriptor.describeHips(char),
        his: (char: Character) => char.desc.possessivePronoun,
        // his2: (char: Character) => char2.mf("his", "her"),
        leg: (char: Character) => LegDescriptor.describeLeg(char),
        legs: (char: Character) => LegDescriptor.describeLegs(char),
        man: (char: Character) => GenderDescriptor.mf(char, "man", "woman"),
        men: (char: Character) => GenderDescriptor.mf(char, "men", "women"),
        master: (char: Character) => GenderDescriptor.mf(char, "master", "mistress"),
        misdirection: (char: Character) => "[Misdirection]",
        multicock: (char: Character) => CockDescriptor.describeMultiCockShort(char),
        multicockdescriptlight: (char: Character) => CockDescriptor.describeMultiCockShort(char),
        name: (char: Character) => char.desc.short,
        nipple: (char: Character) => BreastDescriptor.describeNipple(char, char.torso.chest.get(0)),
        nipples: (char: Character) => BreastDescriptor.describeNipple(char, char.torso.chest.get(0)) + "s",
        onecock: (char: Character) => CockDescriptor.describeMultiCockSimpleOne(char),
        pg: (char: Character) => "\n\n",
        pussy: (char: Character) => VaginaDescriptor.describeVagina(char, char.torso.vaginas.get(0)),
        race: (char: Character) => BodyDescriptor.describeRace(char),
        sack: (char: Character) => BallsDescriptor.describeSack(char),
        sheath: (char: Character) => CockDescriptor.describeCockSheath(char.torso.cocks.get(0)),
        skin: (char: Character) => SkinDescriptor.skin(char),
        skinfurscales: (char: Character) => SkinDescriptor.skinFurScales(char),
        // teasetext: (char: Character) => teaseText(),
        tongue: (char: Character) => FaceDescriptor.describeTongue(char.torso.neck.head.face.tongue.type),
        vag: (char: Character) => VaginaDescriptor.describeVagina(char, char.torso.vaginas.get(0)),
        vagina: (char: Character) => VaginaDescriptor.describeVagina(char, char.torso.vaginas.get(0)),
        vagorass: (char: Character) => (char.torso.vaginas.count > 0 ? VaginaDescriptor.describeVagina(char, char.torso.vaginas.get(0)) : ButtDescriptor.describeButthole(char.torso.butt)),
        weapon: (char: Character) => char.inventory.equipment.weapon.displayname,
        weaponname: (char: Character) => char.inventory.equipment.weapon.displayname,

        // latexyname: (char: Character) => Flags.list[FlagEnum.GOO_NAME],
        // bathgirlname: (char: Character) => Flags.list[FlagEnum.MILK_NAME],
        cockplural: (char: Character) => (char.torso.cocks.count === 1) ? "cock" : "cocks",
        dickplural: (char: Character) => (char.torso.cocks.count === 1) ? "dick" : "dicks",
        headplural: (char: Character) => (char.torso.cocks.count === 1) ? "head" : "heads",
        prickplural: (char: Character) => (char.torso.cocks.count === 1) ? "prick" : "pricks",
        boy: (char: Character) => GenderDescriptor.boyGirl(char.gender),
        guy: (char: Character) => GenderDescriptor.guyGirl(char.gender),
        // wings: (char: Character) => wingsDescript(),
        // tail: (char: Character) => tailDescript(),
        // onetail: (char: Character) => oneTailDescript()
    };
