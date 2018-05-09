﻿import { Character } from '../Character/Character';
import { Desc } from '../Descriptors/Descriptors';

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
        ass: (char: Character) => Desc.Butt.describeButt(char),
        asshole: (char: Character) => Desc.Butt.describeButthole(char.torso.butt),
        balls: (char: Character) => Desc.Balls.describeBalls(true, true, char),
        boyfriend: (char: Character) => Desc.Gender.mf(char, "boyfriend", "girlfriend"),
        butt: (char: Character) => Desc.Butt.describeButt(char),
        butthole: (char: Character) => Desc.Butt.describeButthole(char.torso.butt),
        chest: (char: Character) => Desc.Breast.describeChest(char),
        clit: (char: Character) => Desc.Vagina.describeClit(char),
        cock: (char: Character) => Desc.Cock.describeCock(char, char.torso.cocks.get(0)),
        cockhead: (char: Character) => Desc.Cock.describeCockHead(char.torso.cocks.get(0)),
        cocks: (char: Character) => Desc.Cock.describeMultiCockShort(char),
        cunt: (char: Character) => Desc.Vagina.describeVagina(char, char.torso.vaginas.get(0)),
        eachcock: (char: Character) => Desc.Cock.describeMultiCockSimpleOne(char),
        evade: (char: Character) => "[Evade]",
        face: (char: Character) => Desc.Face.describeFace(char),
        feet: (char: Character) => Desc.Leg.describeFeet(char),
        foot: (char: Character) => Desc.Leg.describeFoot(char),
        fullchest: (char: Character) => Desc.Breast.describeAllBreasts(char),
        hair: (char: Character) => Desc.Head.describeHair(char),
        hairorfur: (char: Character) => Desc.Head.hairOrFur(char),
        he: (char: Character) => char.desc.subjectivePronoun,
        // he2: (char: Character) => char2.mf("he", "she"),
        him: (char: Character) => char.desc.objectivePronoun,
        // him2: (char: Character) => char2.mf("him", "her"),
        himself: (char: Character) => Desc.Gender.mf(char, "himself", "herself"),
        herself: (char: Character) => Desc.Gender.mf(char, "himself", "herself"),
        hips: (char: Character) => Desc.Hip.describeHips(char),
        his: (char: Character) => char.desc.possessivePronoun,
        // his2: (char: Character) => char2.mf("his", "her"),
        leg: (char: Character) => Desc.Leg.describeLeg(char),
        legs: (char: Character) => Desc.Leg.describeLegs(char),
        man: (char: Character) => Desc.Gender.mf(char, "man", "woman"),
        men: (char: Character) => Desc.Gender.mf(char, "men", "women"),
        master: (char: Character) => Desc.Gender.mf(char, "master", "mistress"),
        misdirection: (char: Character) => "[Misdirection]",
        multicock: (char: Character) => Desc.Cock.describeMultiCockShort(char),
        multicockdescriptlight: (char: Character) => Desc.Cock.describeMultiCockShort(char),
        name: (char: Character) => char.desc.short,
        nipple: (char: Character) => Desc.Breast.describeNipple(char, char.torso.chest.get(0)),
        nipples: (char: Character) => Desc.Breast.describeNipple(char, char.torso.chest.get(0)) + "s",
        onecock: (char: Character) => Desc.Cock.describeMultiCockSimpleOne(char),
        pg: (char: Character) => "\n\n",
        pussy: (char: Character) => Desc.Vagina.describeVagina(char, char.torso.vaginas.get(0)),
        race: (char: Character) => Desc.Body.describeRace(char),
        sack: (char: Character) => Desc.Balls.describeSack(char),
        sheath: (char: Character) => Desc.Cock.describeCockSheath(char.torso.cocks.get(0)),
        skin: (char: Character) => Desc.Skin.skin(char),
        skinfurscales: (char: Character) => Desc.Skin.skinFurScales(char),
        // teasetext: (char: Character) => teaseText(),
        tongue: (char: Character) => Desc.Face.describeTongue(char.torso.neck.head.face.tongue.type),
        vag: (char: Character) => Desc.Vagina.describeVagina(char, char.torso.vaginas.get(0)),
        vagina: (char: Character) => Desc.Vagina.describeVagina(char, char.torso.vaginas.get(0)),
        vagorass: (char: Character) => (char.torso.vaginas.count > 0 ? Desc.Vagina.describeVagina(char, char.torso.vaginas.get(0)) : Desc.Butt.describeButthole(char.torso.butt)),
        weapon: (char: Character) => char.inventory.equipment.weapon.displayname,
        weaponname: (char: Character) => char.inventory.equipment.weapon.displayname,

        // latexyname: (char: Character) => Flags.list[FlagEnum.GOO_NAME],
        // bathgirlname: (char: Character) => Flags.list[FlagEnum.MILK_NAME],
        cockplural: (char: Character) => (char.torso.cocks.count === 1) ? "cock" : "cocks",
        dickplural: (char: Character) => (char.torso.cocks.count === 1) ? "dick" : "dicks",
        headplural: (char: Character) => (char.torso.cocks.count === 1) ? "head" : "heads",
        prickplural: (char: Character) => (char.torso.cocks.count === 1) ? "prick" : "pricks",
        boy: (char: Character) => Desc.Gender.boyGirl(char.gender),
        guy: (char: Character) => Desc.Gender.guyGirl(char.gender),
        // wings: (char: Character) => wingsDescript(),
        // tail: (char: Character) => tailDescript(),
        // onetail: (char: Character) => oneTailDescript()
    };
