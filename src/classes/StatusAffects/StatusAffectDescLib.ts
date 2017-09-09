import Library from "../Utilities/Library";
import StatusAffectDesc from "./StatusAffectDesc";
import PiercedCrimstonePerk from "./Perks/PiercedCrimstonePerk";
import PiercedFertitePerk from "./Perks/PiercedFertitePerk";
import PentUpPerk from "./Perks/PentUpPerk";
import SluttySeductionPerk from "./Perks/SluttySeductionPerk";
import WizardsEndurancePerk from "./Perks/WizardsEndurancePerk";
import WizardsFocusPerk from "./Perks/WizardsFocusPerk";
import SpellcastingAffinityPerk from "./Perks/SpellcastingAffinityPerk";
import ElvenBountyPerk from "./Perks/ElvenBountyPerk";
import ControlledBreathPerk from "./Perks/ControlledBreathPerk";
import CleansingPalmPerk from "./Perks/CleansingPalmPerk";
import EnlightenedPerk from "./Perks/EnlightenedPerk";

export default class StatusAffectDescLib extends Library<StatusAffectDesc> {
    public constructor() {
        super();
        this.initStatusAffects();
        this.initPerks();
    }

    public initStatusAffects() {
        this.add(new StatusAffectDesc("AllNaturalOnaholeUsed", "AllNaturalOnaholeUsed", "all-natural onahole used", "", false, true));
        this.add(new StatusAffectDesc("AteEgg", "AteEgg", "ateEgg", "", false, true));
        this.add(new StatusAffectDesc("AnemoneArousal", "AnemoneArousal", "Anemone Arousal", "", false, true));
        this.add(new StatusAffectDesc("BimboChampagne", "BimboChampagne", "Bimbo Champagne", "", false, true));
        this.add(new StatusAffectDesc("Birthed", "Birthed", "Birthed", "", false, true));
        this.add(new StatusAffectDesc("BirthedImps", "BirthedImps", "Birthed Imps", "", false, true));
        this.add(new StatusAffectDesc("BlackCatBeer", "BlackCatBeer", "Black Cat Beer", "", false, true));
        this.add(new StatusAffectDesc("BlackNipples", "BlackNipples", "Black Nipples", "", false, true));
        this.add(new StatusAffectDesc("BlowjobOn", "BlowjobOn", "BlowjobOn", "", false, true));
        this.add(new StatusAffectDesc("BoatDiscovery", "BoatDiscovery", "Boat Discovery", "", false, true));
        this.add(new StatusAffectDesc("BonusACapacity", "BonusACapacity", "Bonus aCapacity", "", false, true));
        this.add(new StatusAffectDesc("BonusVCapacity", "BonusVCapacity", "Bonus vCapacity", "", false, true));
        this.add(new StatusAffectDesc("BottledMilk", "BottledMilk", "Bottled Milk", "", false, true));
        this.add(new StatusAffectDesc("BreastsMilked", "BreastsMilked", "Breasts Milked", "", false, true));
        this.add(new StatusAffectDesc("BSwordBroken", "BSwordBroken", "BSwordBroken", "", false, true));
        this.add(new StatusAffectDesc("BuiltMilker", "BuiltMilker", "BUILT: Milker", "", false, true));
        this.add(new StatusAffectDesc("BurpChanged", "BurpChanged", "Burp Changed", "", false, true));
        this.add(new StatusAffectDesc("ButtStretched", "ButtStretched", "ButtStretched", "", false, true));
        this.add(new StatusAffectDesc("CampAnemoneTrigger", "CampAnemoneTrigger", "Camp Anemone Trigger", "", false, true));
        this.add(new StatusAffectDesc("CampMarble", "CampMarble", "Camp Marble", "", false, true));
        this.add(new StatusAffectDesc("CampRathazul", "CampRathazul", "Camp Rathazul", "", false, true));
        this.add(new StatusAffectDesc("ClaraCombatRounds", "ClaraCombatRounds", "Clara Combat Rounds", "", false, true));
        this.add(new StatusAffectDesc("ClaraFoughtInCamp", "ClaraFoughtInCamp", "Clara Fought In Camp", "", false, true));
        this.add(new StatusAffectDesc("CockPumped", "CockPumped", "Cock Pumped", "", false, true));
        this.add(new StatusAffectDesc("Contraceptives", "Contraceptives", "Contraceptives", "", false, true));
        this.add(new StatusAffectDesc("CuntStretched", "CuntStretched", "CuntStretched", "", false, true));
        this.add(new StatusAffectDesc("DefenseCanopy", "DefenseCanopy", "Defense: Canopy", "", false, true));
        this.add(new StatusAffectDesc("DeluxeOnaholeUsed", "DeluxeOnaholeUsed", "deluxe onahole used", "", false, true));
        this.add(new StatusAffectDesc("DogWarning", "DogWarning", "dog warning", "", false, true));
        this.add(new StatusAffectDesc("DragonBreathBoost", "DragonBreathBoost", "Dragon Breath Boost", "", false, true));
        this.add(new StatusAffectDesc("DragonBreathCooldown", "DragonBreathCooldown", "Dragon Breath Cooldown", "", false, true));
        this.add(new StatusAffectDesc("DungeonShutDown", "DungeonShutDown", "DungeonShutDown", "", false, true));
        this.add(new StatusAffectDesc("Dysfunction", "Dysfunction", "dysfunction", "", false, true));
        this.add(new StatusAffectDesc("Edryn", "Edryn", "Edryn", "", false, true));
        this.add(new StatusAffectDesc("Eggchest", "Eggchest", "eggchest", "", false, true));
        this.add(new StatusAffectDesc("Eggs", "Eggs", "eggs", "", false, true));
        this.add(new StatusAffectDesc("EmberFuckCooldown", "EmberFuckCooldown", "ember fuck cooldown", "", false, true));
        this.add(new StatusAffectDesc("EmberNapping", "EmberNapping", "Ember Napping", "", false, true));
        this.add(new StatusAffectDesc("EverRapedJojo", "EverRapedJojo", "Ever Raped Jojo", "", false, true));
        this.add(new StatusAffectDesc("Exgartuan", "Exgartuan", "Exgartuan", "", false, true));
        this.add(new StatusAffectDesc("ExploredDeepwoods", "ExploredDeepwoods", "exploredDeepwoods", "", false, true));
        this.add(new StatusAffectDesc("FactoryOmnibusDefeated", "FactoryOmnibusDefeated", "FactoryOmnibusDefeated", "", false, true));
        this.add(new StatusAffectDesc("FactoryOverload", "FactoryOverload", "FactoryOverload", "", false, true));
        this.add(new StatusAffectDesc("FactoryIncubusDefeated", "FactoryIncubusDefeated", "FactoryIncubusDefeated", "", false, true));
        this.add(new StatusAffectDesc("FactorySuccubusDefeated", "FactorySuccubusDefeated", "FactorySuccubusDefeated", "", false, true));
        this.add(new StatusAffectDesc("FaerieFemFuck", "FaerieFemFuck", "Faerie Fem Fuck", "", false, true));
        this.add(new StatusAffectDesc("FaerieFucked", "FaerieFucked", "Faerie Fucked", "", false, true));
        this.add(new StatusAffectDesc("FappedGenderless", "FappedGenderless", "fapped genderless", "", false, true));
        this.add(new StatusAffectDesc("Feeder", "Feeder", "Feeder", "", false, true));
        this.add(new StatusAffectDesc("Fertilized", "Fertilized", "Fertilized", "", false, true));
        this.add(new StatusAffectDesc("FetishOn", "FetishOn", "fetishON", "", false, true));
        this.add(new StatusAffectDesc("FoundFactory", "FoundFactory", "Found Factory", "", false, true));
        this.add(new StatusAffectDesc("FuckedMarble", "FuckedMarble", "FuckedMarble", "", false, true));
        this.add(new StatusAffectDesc("Goojob", "Goojob", "GOOJOB", "", false, true));
        this.add(new StatusAffectDesc("GooStuffed", "GooStuffed", "gooStuffed", "", false, true));
        this.add(new StatusAffectDesc("Groundpound", "Groundpound", "Groundpound", "", false, true));
        this.add(new StatusAffectDesc("HairdresserMeeting", "HairdresserMeeting", "hairdresser meeting", "", false, true));
        this.add(new StatusAffectDesc("Hangover", "Hangover", "Hangover", "", false, true));
        this.add(new StatusAffectDesc("Heat", "Heat", "heat", "", false, true));
        this.add(new StatusAffectDesc("HorseWarning", "HorseWarning", "horse warning", "", false, true));
        this.add(new StatusAffectDesc("ImmolationSpell", "ImmolationSpell", "Immolation Spell", "", false, true));
        this.add(new StatusAffectDesc("ImpGangBang", "ImpGangBang", "Imp GangBang", "", false, true));
        this.add(new StatusAffectDesc("IncubusBribed", "IncubusBribed", "IncubusBribed", "", false, true));
        this.add(new StatusAffectDesc("Infested", "Infested", "infested", "", false, true));
        this.add(new StatusAffectDesc("IzmaBlowing", "IzmaBlowing", "IzmaBlowing", "", false, true));
        this.add(new StatusAffectDesc("IzumisPipeSmoke", "IzumisPipeSmoke", "Izumis Pipe Smoke", "", false, true));
        this.add(new StatusAffectDesc("JerkingIzma", "JerkingIzma", "JerkingIzma", "", false, true));
        this.add(new StatusAffectDesc("Jizzpants", "Jizzpants", "Jizzpants", "", false, true));
        this.add(new StatusAffectDesc("JojoMeditationCount", "JojoMeditationCount", "Jojo Meditation Count", "", false, true));
        this.add(new StatusAffectDesc("JojoNightWatch", "JojoNightWatch", "JojoNightWatch", "", false, true));
        this.add(new StatusAffectDesc("JojoTFOffer", "JojoTFOffer", "JojoTFOffer", "", false, true));
        this.add(new StatusAffectDesc("Kelt", "Kelt", "Kelt", "", false, true));
        this.add(new StatusAffectDesc("KeltBJ", "KeltBJ", "KeltBJ", "", false, true));
        this.add(new StatusAffectDesc("KeltBadEndWarning", "KeltBadEndWarning", "Kelt Bad End Warning", "", false, true));
        this.add(new StatusAffectDesc("KeltOff", "KeltOff", "KeltOff", "", false, true));
        this.add(new StatusAffectDesc("KnowsArouse", "KnowsArouse", "Knows Arouse", "", false, true));
        this.add(new StatusAffectDesc("KnowsBlind", "KnowsBlind", "Knows Blind", "", false, true));
        this.add(new StatusAffectDesc("KnowsCharge", "KnowsCharge", "Knows Charge", "", false, true));
        this.add(new StatusAffectDesc("KnowsHeal", "KnowsHeal", "Knows Heal", "", false, true));
        this.add(new StatusAffectDesc("KnowsMight", "KnowsMight", "Knows Might", "", false, true));
        this.add(new StatusAffectDesc("KnowsWhitefire", "KnowsWhitefire", "Knows Whitefire", "", false, true));
        this.add(new StatusAffectDesc("LactationEndurance", "LactationEndurance", "Lactation Endurance", "", false, true));
        this.add(new StatusAffectDesc("LactationReduction", "LactationReduction", "Lactation Reduction", "", false, true));
        this.add(new StatusAffectDesc("LactationReduc0", "LactationReduc0", "Lactation Reduc0", "", false, true));
        this.add(new StatusAffectDesc("LactationReduc1", "LactationReduc1", "Lactation Reduc1", "", false, true));
        this.add(new StatusAffectDesc("LactationReduc2", "LactationReduc2", "Lactation Reduc2", "", false, true));
        this.add(new StatusAffectDesc("LactationReduc3", "LactationReduc3", "Lactation Reduc3", "", false, true));
        this.add(new StatusAffectDesc("LootEgg", "LootEgg", "lootEgg", "", false, true));
        this.add(new StatusAffectDesc("LostVillagerSpecial", "LostVillagerSpecial", "lostVillagerSpecial", "", false, true));
        this.add(new StatusAffectDesc("Luststick", "Luststick", "Luststick", "", false, true));
        this.add(new StatusAffectDesc("LustStickApplied", "LustStickApplied", "Lust Stick Applied", "", false, true));
        this.add(new StatusAffectDesc("LustyTongue", "LustyTongue", "LustyTongue", "", false, true));
        this.add(new StatusAffectDesc("MalonVisitedPostAddiction", "MalonVisitedPostAddiction", "Malon Visited Post Addiction", "", false, true));
        this.add(new StatusAffectDesc("MaraeComplete", "MaraeComplete", "Marae Complete", "", false, true));
        this.add(new StatusAffectDesc("MaraesLethicite", "MaraesLethicite", "Marae's Lethicite", "", false, true));
        this.add(new StatusAffectDesc("MaraesQuestStart", "MaraesQuestStart", "Marae's Quest Start", "", false, true));
        this.add(new StatusAffectDesc("Marble", "Marble", "Marble", "", false, true));
        this.add(new StatusAffectDesc("MarbleHasItem", "MarbleHasItem", "MarbleHasItem", "", false, true));
        this.add(new StatusAffectDesc("MarbleItemCooldown", "MarbleItemCooldown", "MarbleItemCooldown", "", false, true));
        this.add(new StatusAffectDesc("MarbleRapeAttempted", "MarbleRapeAttempted", "Marble Rape Attempted", "", false, true));
        this.add(new StatusAffectDesc("MarblesMilk", "MarblesMilk", "Marbles Milk", "", false, true));
        this.add(new StatusAffectDesc("MarbleSpecials", "MarbleSpecials", "MarbleSpecials", "", false, true));
        this.add(new StatusAffectDesc("MarbleWithdrawl", "MarbleWithdrawl", "MarbleWithdrawl", "", false, true));
        this.add(new StatusAffectDesc("Meditated", "Meditated", "Meditated", "", false, true));
        this.add(new StatusAffectDesc("MeanToNaga", "MeanToNaga", "MeanToNaga", "", false, true));
        this.add(new StatusAffectDesc("MeetWanderer", "MeetWanderer", "meet wanderer", "", false, true));
        this.add(new StatusAffectDesc("MetCorruptMarae", "MetCorruptMarae", "Met Corrupt Marae", "", false, true));
        this.add(new StatusAffectDesc("MetMarae", "MetMarae", "Met Marae", "", false, true));
        this.add(new StatusAffectDesc("MetRathazul", "MetRathazul", "metRathazul", "", false, true));
        this.add(new StatusAffectDesc("MetWorms", "MetWorms", "metWorms", "", false, true));
        this.add(new StatusAffectDesc("MetWhitney", "MetWhitney", "Met Whitney", "", false, true));
        this.add(new StatusAffectDesc("Milked", "Milked", "Milked", "", false, true));
        this.add(new StatusAffectDesc("MinoPlusCowgirl", "MinoPlusCowgirl", "Mino + Cowgirl", "", false, true));
        this.add(new StatusAffectDesc("Naga", "Naga", "Naga", "", false, true));
        this.add(new StatusAffectDesc("NakedOn", "NakedOn", "NakedOn", "", false, true));
        this.add(new StatusAffectDesc("NoJojo", "NoJojo", "noJojo", "", false, true));
        this.add(new StatusAffectDesc("NoMoreMarble", "NoMoreMarble", "No More Marble", "", false, true));
        this.add(new StatusAffectDesc("Oswald", "Oswald", "Oswald", "", false, true));
        this.add(new StatusAffectDesc("PlainOnaholeUsed", "PlainOnaholeUsed", "plain onahole used", "", false, true));
        this.add(new StatusAffectDesc("PhoukaWhiskeyAffect", "PhoukaWhiskeyAffect", "PhoukaWhiskeyAffect", "", false, true));
        this.add(new StatusAffectDesc("PostAkbalSubmission", "PostAkbalSubmission", "Post Akbal Submission", "", false, true));
        this.add(new StatusAffectDesc("PostAnemoneBeatdown", "PostAnemoneBeatdown", "Post Anemone Beatdown", "", false, true));
        this.add(new StatusAffectDesc("PureCampJojo", "PureCampJojo", "PureCampJojo", "", false, true));
        this.add(new StatusAffectDesc("RathazulArmor", "RathazulArmor", "RathazulArmor", "", false, true));
        this.add(new StatusAffectDesc("RepeatSuccubi", "RepeatSuccubi", "repeatSuccubi", "", false, true));
        this.add(new StatusAffectDesc("Rut", "Rut", "rut", "", false, true));
        this.add(new StatusAffectDesc("SharkGirl", "SharkGirl", "Shark-Girl", "", false, true));
        this.add(new StatusAffectDesc("ShieldingSpell", "ShieldingSpell", "Shielding Spell", "", false, true));
        this.add(new StatusAffectDesc("SlimeCraving", "SlimeCraving", "Slime Craving", "", false, true));
        this.add(new StatusAffectDesc("SlimeCravingFeed", "SlimeCravingFeed", "Slime Craving Feed", "", false, true));
        this.add(new StatusAffectDesc("SlimeCravingOutput", "SlimeCravingOutput", "Slime Craving Output", "", false, true));
        this.add(new StatusAffectDesc("SuccubiFirst", "SuccubiFirst", "SuccubiFirst", "", false, true));
        this.add(new StatusAffectDesc("SuccubiNight", "SuccubiNight", "succubiNight", "", false, true));
        this.add(new StatusAffectDesc("TakenGroPlus", "TakenGroPlus", "TakenGro+", "", false, true));
        this.add(new StatusAffectDesc("TakenLactaid", "TakenLactaid", "TakenLactaid", "", false, true));
        this.add(new StatusAffectDesc("Tamani", "Tamani", "Tamani", "", false, true));									//Used only for compatibility with old save files, otherwise no longer in use
        this.add(new StatusAffectDesc("TamaniFemaleEncounter", "TamaniFemaleEncounter", "Tamani Female Encounter", "", false, true));	//Used only for compatibility with old save files, otherwise no longer in use
        this.add(new StatusAffectDesc("TelAdre", "TelAdre", "Tel'Adre", "", false, true));
        this.add(new StatusAffectDesc("TentacleBadEndCounter", "TentacleBadEndCounter", "TentacleBadEndCounter", "", false, true));
        this.add(new StatusAffectDesc("TentacleJojo", "TentacleJojo", "Tentacle Jojo", "", false, true));
        this.add(new StatusAffectDesc("TensionReleased", "TensionReleased", "TensionReleased", "", false, true));
        this.add(new StatusAffectDesc("TF2", "TF2", "TF2", "", false, true));
        this.add(new StatusAffectDesc("TookBlessedSword", "TookBlessedSword", "Took Blessed Sword", "", false, true));
        /**
            * v1 = bonus index
            * v2 = bonus value
            * v3 = remaining time
            */
        this.add(new StatusAffectDesc("UmasMassage", "UmasMassage", "Uma's Massage", "", false, true));
        this.add(new StatusAffectDesc("Uniball", "Uniball", "Uniball", "", false, true));
        this.add(new StatusAffectDesc("UsedNaturalSelfStim", "UsedNaturalSelfStim", "used natural self-stim", "", false, true));
        this.add(new StatusAffectDesc("used_self_dash_stim", "used_self_dash_stim", "used self-stim", "", false, true));
        this.add(new StatusAffectDesc("Victoria", "Victoria", "Victoria", "", false, true));
        this.add(new StatusAffectDesc("VoluntaryDemonpack", "VoluntaryDemonpack", "Voluntary Demonpack", "", false, true));
        this.add(new StatusAffectDesc("WormOffer", "WormOffer", "WormOffer", "", false, true));
        this.add(new StatusAffectDesc("WormPlugged", "WormPlugged", "worm plugged", "", false, true));
        this.add(new StatusAffectDesc("WormsHalf", "WormsHalf", "wormsHalf", "", false, true));
        this.add(new StatusAffectDesc("WormsOff", "WormsOff", "wormsOff", "", false, true));
        this.add(new StatusAffectDesc("WormsOn", "WormsOn", "wormsOn", "", false, true));
        this.add(new StatusAffectDesc("WandererDemon", "WandererDemon", "wanderer demon", "", false, true));
        this.add(new StatusAffectDesc("WandererHuman", "WandererHuman", "wanderer human", "", false, true));
        this.add(new StatusAffectDesc("Yara", "Yara", "Yara", "", false, true));

        // monster
        this.add(new StatusAffectDesc("Attacks", "Attacks", "attacks", "", false, true));
        this.add(new StatusAffectDesc("BimboBrawl", "BimboBrawl", "bimboBrawl", "", false, true));
        this.add(new StatusAffectDesc("BowCooldown", "BowCooldown", "Bow Cooldown", "", false, true));
        this.add(new StatusAffectDesc("BowDisabled", "BowDisabled", "Bow Disabled", "", false, true));
        this.add(new StatusAffectDesc("Charged", "Charged", "Charged", "", false, true));
        this.add(new StatusAffectDesc("Climbed", "Climbed", "Climbed", "", false, true));
        this.add(new StatusAffectDesc("Concentration", "Concentration", "Concentration", "", false, true));
        this.add(new StatusAffectDesc("Constricted", "Constricted", "Constricted", "", false, true));
        this.add(new StatusAffectDesc("CoonWhip", "CoonWhip", "Coon Whip", "", false, true));
        this.add(new StatusAffectDesc("Counter", "Counter", "Counter", "", false, true));
        this.add(new StatusAffectDesc("DomFight", "DomFight", "domfight", "", false, true));
        this.add(new StatusAffectDesc("DrankMinoCum", "DrankMinoCum", "drank mino cum", "", false, true));
        this.add(new StatusAffectDesc("DrankMinoCum2", "DrankMinoCum2", "drank mino cum2", "", false, true));
        this.add(new StatusAffectDesc("Earthshield", "Earthshield", "Earthshield", "", false, true));
        this.add(new StatusAffectDesc("Fear", "Fear", "Fear", "", false, true));
        this.add(new StatusAffectDesc("GenericRunDisabled", "GenericRunDisabled", "Generic Run Disabled", "", false, true));
        this.add(new StatusAffectDesc("Gigafire", "Gigafire", "Gigafire", "", false, true));
        this.add(new StatusAffectDesc("GottaOpenGift", "GottaOpenGift", "Gotta Open Gift", "", false, true));
        this.add(new StatusAffectDesc("HolliBurning", "HolliBurning", "Holli Burning", "", false, true));
        this.add(new StatusAffectDesc("Illusion", "Illusion", "Illusion", "", false, true));
        this.add(new StatusAffectDesc("ImpSkip", "ImpSkip", "ImpSkip", "", false, true));
        this.add(new StatusAffectDesc("ImpUber", "ImpUber", "ImpUber", "", false, true));
        this.add(new StatusAffectDesc("JojoIsAssisting", "JojoIsAssisting", "Jojo Is Assisting", "", false, true));
        this.add(new StatusAffectDesc("JojoPyre", "JojoPyre", "Jojo Pyre", "", false, true));
        this.add(new StatusAffectDesc("Keen", "Keen", "keen", "", false, true));
        this.add(new StatusAffectDesc("Level", "Level", "level", "", false, true));
        this.add(new StatusAffectDesc("KitsuneFight", "KitsuneFight", "Kitsune Fight", "", false, true));
        this.add(new StatusAffectDesc("LustAura", "LustAura", "Lust Aura", "", false, true));
        this.add(new StatusAffectDesc("LustStick", "LustStick", "LustStick", "", false, true));
        this.add(new StatusAffectDesc("Milk", "Milk", "milk", "", false, true));
        this.add(new StatusAffectDesc("MilkyUrta", "MilkyUrta", "Milky Urta", "", false, true));
        this.add(new StatusAffectDesc("MinoMilk", "MinoMilk", "Mino Milk", "", false, true));
        this.add(new StatusAffectDesc("MinotaurEntangled", "MinotaurEntangled", "Minotaur Entangled", "", false, true));
        this.add(new StatusAffectDesc("MissFirstRound", "MissFirstRound", "miss first round", "", false, true));
        this.add(new StatusAffectDesc("NoLoot", "NoLoot", "No Loot", "", false, true));
        this.add(new StatusAffectDesc("PCTailTangle", "PCTailTangle", "PCTailTangle", "", false, true));
        this.add(new StatusAffectDesc("PeachLootLoss", "PeachLootLoss", "Peach Loot Loss", "", false, true));
        // @aimozg i don't know and do not fucking care if these two should be merged
        this.add(new StatusAffectDesc("PhyllaFight", "PhyllaFight", "PhyllaFight", "", false, true));
        this.add(new StatusAffectDesc("phyllafight", "phyllafight", "phyllafight", "", false, true));
        this.add(new StatusAffectDesc("Platoon", "Platoon", "platoon", "", false, true));
        this.add(new StatusAffectDesc("QueenBind", "QueenBind", "QueenBind", "", false, true));
        // @aimozg HA HA HA
        this.add(new StatusAffectDesc("Round", "Round", "Round", "", false, true));
        this.add(new StatusAffectDesc("round", "round", "round", "", false, true));
        this.add(new StatusAffectDesc("RunDisabled", "RunDisabled", "Run Disabled", "", false, true));
        this.add(new StatusAffectDesc("Shell", "Shell", "Shell", "", false, true));
        this.add(new StatusAffectDesc("SirenSong", "SirenSong", "Siren Song", "", false, true));
        this.add(new StatusAffectDesc("Spar", "Spar", "spar", "", false, true));
        this.add(new StatusAffectDesc("Sparring", "Sparring", "sparring", "", false, true));
        this.add(new StatusAffectDesc("spiderfight", "spiderfight", "spiderfight", "", false, true));
        this.add(new StatusAffectDesc("StunCooldown", "StunCooldown", "Stun Cooldown", "", false, true));
        this.add(new StatusAffectDesc("TentacleCoolDown", "TentacleCoolDown", "TentacleCoolDown", "", false, true));
        this.add(new StatusAffectDesc("Timer", "Timer", "Timer", "", false, true));
        this.add(new StatusAffectDesc("Uber", "Uber", "Uber", "", false, true));
        this.add(new StatusAffectDesc("UrtaSecondWinded", "UrtaSecondWinded", "Urta Second Winded", "", false, true));
        this.add(new StatusAffectDesc("UsedTitsmother", "UsedTitsmother", "UsedTitsmother", "", false, true));
        this.add(new StatusAffectDesc("Vala", "Vala", "vala", "", false, true));
        this.add(new StatusAffectDesc("Vapula", "Vapula", "Vapula", "", false, true));
        this.add(new StatusAffectDesc("WhipReady", "WhipReady", "Whip Ready", "", false, true));

        // combat
        this.add(new StatusAffectDesc("AcidSlap", "AcidSlap", "Acid Slap", "", false, true));
        this.add(new StatusAffectDesc("AkbalSpeed", "AkbalSpeed", "Akbal Speed", "", false, true));
        this.add(new StatusAffectDesc("AmilyVenom", "AmilyVenom", "Amily Venom", "", false, true));
        this.add(new StatusAffectDesc("AnemoneVenom", "AnemoneVenom", "Anemone Venom", "", false, true));
        this.add(new StatusAffectDesc("AttackDisabled", "AttackDisabled", "Attack Disabled", "", false, true));
        this.add(new StatusAffectDesc("BasiliskCompulsion", "BasiliskCompulsion", "Basilisk Compulsion", "", false, true));
        this.add(new StatusAffectDesc("BasiliskSlow", "BasiliskSlow", "BasiliskSlow", "", false, true));
        this.add(new StatusAffectDesc("Berzerking", "Berzerking", "Berzerking", "", false, true));
        this.add(new StatusAffectDesc("Blind", "Blind", "Blind", "", false, true));
        this.add(new StatusAffectDesc("Bound", "Bound", "Bound", "", false, true));
        this.add(new StatusAffectDesc("CalledShot", "CalledShot", "Called Shot", "", false, true));
        this.add(new StatusAffectDesc("ChargeWeapon", "ChargeWeapon", "Charge Weapon", "", false, true));
        this.add(new StatusAffectDesc("Chokeslam", "Chokeslam", "Chokeslam", "", false, true));
        this.add(new StatusAffectDesc("Confusion", "Confusion", "Confusion", "", false, true));
        this.add(new StatusAffectDesc("DemonSeed", "DemonSeed", "DemonSeed", "", false, true));
        this.add(new StatusAffectDesc("Disarmed", "Disarmed", "Disarmed", "", false, true));
        this.add(new StatusAffectDesc("DriderKiss", "DriderKiss", "Drider Kiss", "", false, true));
        this.add(new StatusAffectDesc("FirstAttack", "FirstAttack", "FirstAttack", "", false, true));
        this.add(new StatusAffectDesc("GnollSpear", "GnollSpear", "Gnoll Spear", "", false, true));
        this.add(new StatusAffectDesc("GooArmorBind", "GooArmorBind", "GooArmorBind", "", false, true));
        this.add(new StatusAffectDesc("GooArmorSilence", "GooArmorSilence", "GooArmorSilence", "", false, true));
        this.add(new StatusAffectDesc("GooBind", "GooBind", "GooBind", "", false, true));
        this.add(new StatusAffectDesc("HarpyBind", "HarpyBind", "HarpyBind", "", false, true));
        this.add(new StatusAffectDesc("HolliConstrict", "HolliConstrict", "Holli Constrict", "", false, true));
        this.add(new StatusAffectDesc("InfestAttempted", "InfestAttempted", "infestAttempted", "", false, true));
        this.add(new StatusAffectDesc("IsabellaStunned", "IsabellaStunned", "Isabella Stunned", "", false, true));
        this.add(new StatusAffectDesc("IzmaBleed", "IzmaBleed", "Izma Bleed", "", false, true));
        this.add(new StatusAffectDesc("KissOfDeath", "KissOfDeath", "Kiss of Death", "", false, true));
        this.add(new StatusAffectDesc("LustStones", "LustStones", "lust stones", "", false, true));
        this.add(new StatusAffectDesc("lustvenom", "lustvenom", "lust venom", "", false, true));
        this.add(new StatusAffectDesc("Might", "Might", "Might", "", false, true));
        this.add(new StatusAffectDesc("NagaBind", "NagaBind", "Naga Bind", "", false, true));
        this.add(new StatusAffectDesc("NagaVenom", "NagaVenom", "Naga Venom", "", false, true));
        this.add(new StatusAffectDesc("NoFlee", "NoFlee", "NoFlee", "", false, true));
        this.add(new StatusAffectDesc("ParalyzeVenom", "ParalyzeVenom", "paralyze venom", "", false, true));
        this.add(new StatusAffectDesc("PhysicalDisabled", "PhysicalDisabled", "Physical Disabled", "", false, true));
        this.add(new StatusAffectDesc("Poison", "Poison", "Poison", "", false, true));
        this.add(new StatusAffectDesc("Sandstorm", "Sandstorm", "sandstorm", "", false, true));
        this.add(new StatusAffectDesc("Sealed", "Sealed", "Sealed", "", false, true));
        this.add(new StatusAffectDesc("SheilaOil", "SheilaOil", "Sheila Oil", "", false, true));
        this.add(new StatusAffectDesc("Shielding", "Shielding", "Sheilding", "", false, true));
        this.add(new StatusAffectDesc("StoneLust", "StoneLust", "Stone Lust", "", false, true));
        this.add(new StatusAffectDesc("Stunned", "Stunned", "Stunned", "", false, true));
        this.add(new StatusAffectDesc("TailWhip", "TailWhip", "Tail Whip", "", false, true));
        this.add(new StatusAffectDesc("TemporaryHeat", "TemporaryHeat", "Temporary Heat", "", false, true));
        this.add(new StatusAffectDesc("TentacleBind", "TentacleBind", "TentacleBind", "", false, true));
        this.add(new StatusAffectDesc("ThroatPunch", "ThroatPunch", "Throat Punch", "", false, true));
        this.add(new StatusAffectDesc("Titsmother", "Titsmother", "Titsmother", "", false, true));
        this.add(new StatusAffectDesc("TwuWuv", "TwuWuv", "Twu Wuv", "", false, true));
        this.add(new StatusAffectDesc("UBERWEB", "UBERWEB", "UBERWEB", "", false, true));
        this.add(new StatusAffectDesc("Web", "Web", "Web", "", false, true));
        this.add(new StatusAffectDesc("WebSilence", "WebSilence", "Web-Silence", "", false, true));
        this.add(new StatusAffectDesc("Whispered", "Whispered", "Whispered", "", false, true));

        this.add(new StatusAffectDesc("RemovedArmor", "RemovedArmor", "Removed Armor", "", false, true));
        this.add(new StatusAffectDesc("JCLustLevel", "JCLustLevel", "JC Lust Level", "", false, true));
        this.add(new StatusAffectDesc("MirroredAttack", "MirroredAttack", "Mirrored Attack", "", false, true));
        this.add(new StatusAffectDesc("KnockedBack", "KnockedBack", "Knocked Back", "", false, true));
        this.add(new StatusAffectDesc("Tentagrappled", "Tentagrappled", "Tentagrappled", "", false, true));
        this.add(new StatusAffectDesc("TentagrappleCooldown", "TentagrappleCooldown", "Tentagrapple Cooldown", "", false, true));
        this.add(new StatusAffectDesc("ShowerDotEffect", "ShowerDotEffect", "Shower Dot Effect", "", false, true));
        this.add(new StatusAffectDesc("GardenerSapSpeed", "GardenerSapSpeed", "Sap Speed", "", false, true));
        this.add(new StatusAffectDesc("VineHealUsed", "VineHealUsed", "Vine Heal Used", "", false, true));

    }

    public initPerks() {
        this.add(new StatusAffectDesc("Brawler", "Brawler",
            "Brawling experience allows you to make two unarmed attacks in a turn.",
            "You choose the 'Brawler' perk, allowing you to make two unarmed attacks in a turn!", false, true));
        this.add(new StatusAffectDesc("Buttslut", "Buttslut", "Buttslut",
            "", false, true));
        this.add(new StatusAffectDesc("Focused", "Focused", "Focused",
            "", false, true));

        // Player creation perks
        this.add(new StatusAffectDesc("Fast", "Fast", "Fast",
            "Gains speed 25% faster.", false, true));
        this.add(new StatusAffectDesc("Lusty", "Lusty", "Lusty",
            "Gains lust 25% faster.", false, true));
        this.add(new StatusAffectDesc("Sensitive", "Sensitive", "Sensitive",
            "Gains sensitivity 25% faster.", false, true));
        this.add(new StatusAffectDesc("Smart", "Smart", "Smart",
            "Gains intelligence 25% faster.", false, true));
        this.add(new StatusAffectDesc("Strong", "Strong", "Strong",
            "Gains strength 25% faster.", false, true));
        this.add(new StatusAffectDesc("Tough", "Tough", "Tough",
            "Gains toughness 25% faster.", false, true));

        // Female creation perks
        this.add(new StatusAffectDesc("BigClit", "Big Clit", "Big Clit",
            "Allows your clit to grow larger more easily and faster.", false, true));
        this.add(new StatusAffectDesc("BigTits", "Big Tits", "Big Tits",
            "Makes your tits grow larger more easily.", false, true));
        this.add(new StatusAffectDesc("Fertile", "Fertile", "Fertile",
            "Makes you 15% more likely to become pregnant.", false, true));
        this.add(new StatusAffectDesc("WetPussy", "Wet Pussy", "Wet Pussy",
            "Keeps your pussy wet and provides a bonus to capacity.", false, true));

        // Male creation perks
        this.add(new StatusAffectDesc("BigCock", "Big Cock", "Big Cock",
            "Gains cock size 25% faster and with less limitations.", false, true));
        this.add(new StatusAffectDesc("MessyOrgasms", "Messy Orgasms", "Messy Orgasms",
            "Produces 50% more cum volume.", false, true));

        // History perks
        this.add(new StatusAffectDesc("HistoryAlchemist", "History: Alchemist", "History: Alchemist",
            "Alchemical experience makes items more reactive to your body.", false, true));
        this.add(new StatusAffectDesc("HistoryFighter", "History: Fighter", "History: Fighter",
            "A Past full of conflict increases physical damage dealt by 10%.", false, true));
        this.add(new StatusAffectDesc("HistoryHealer", "History: Healer", "History: Healer",
            "Healing experience increases HP gains by 20%.", false, true));
        this.add(new StatusAffectDesc("HistoryReligious", "History: Religious", "History: Religious",
            "Replaces masturbate with meditate when corruption less than or equal to 66.", false, true));
        this.add(new StatusAffectDesc("HistoryScholar", "History: Scholar", "History: Scholar",
            "Time spent focusing your mind makes spellcasting 20% less fatiguing.", false, true));
        this.add(new StatusAffectDesc("HistorySlacker", "History: Slacker", "History: Slacker",
            "Regenerate fatigue 20% faster.", false, true));
        this.add(new StatusAffectDesc("HistorySlut", "History: Slut", "History: Slut",
            "Sexual experience has made you more able to handle large insertions and more resistant to stretching.", false, true));
        this.add(new StatusAffectDesc("HistorySmith", "History: Smith", "History: Smith",
            "Knowledge of armor and fitting increases armor effectiveness by roughly 10%.", false, true));
        this.add(new StatusAffectDesc("HistoryWhore", "History: Whore", "History: Whore",
            "Seductive experience causes your tease attacks to be 15% more effective.", false, true));

        // Ordinary (levelup) perks
        this.add(new StatusAffectDesc("Acclimation", "Acclimation",
            "Reduces lust gain by 15%.",
            "You choose the 'Acclimation' perk, making your body 15% more resistant to lust, up to a maximum of 75%.", false, true));
        this.add(new StatusAffectDesc("Agility", "Agility",
            "Boosts armor points by a portion of your speed on light/medium armors.",
            "You choose the 'Agility' perk, increasing the effectiveness of Light/Medium armors by a portion of your speed.", false, true));
        this.add(new StatusAffectDesc("Archmage", "Archmage",
            "[if (player.stats.int>=75)" +
            "Increases base spell strength by 50%." +
            "|" +
            "<b>You are too dumb to gain benefit from this perk.</b>" +
            "]",
            "You choose the 'Archmage' perk, increasing base spell strength by 50%.", false, true));
        this.add(new StatusAffectDesc("ArousingAura", "Arousing Aura",
            "Exude a lust-inducing aura (Req's corruption of 70 or more)",
            "You choose the 'Arousing Aura' perk, causing you to radiate an aura of lust when your corruption is over 70.", false, true));
        this.add(new StatusAffectDesc("Berzerker", "Berzerker",
            "[if(player.str>=75)" +
            "Grants 'Berzerk' ability." +
            "|" +
            "<b>You aren't strong enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Berzerker' perk, which unlocks the 'Berzerk' magical ability.  Berzerking increases attack and lust resistance but reduces physical defenses.", false, true));
        this.add(new StatusAffectDesc("BrutalBlows", "Brutal Blows",
            "[if(player.str>=75)" +
            "Reduces enemy armor with each hit." +
            "|" +
            "<b>You aren't strong enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Brutal Blows' perk, which reduces enemy armor with each hit.", false, true));
        this.add(new StatusAffectDesc("Channeling", "Channeling",
            "Increases base spell strength by 50%.",
            "You choose the 'Channeling' perk, boosting the strength of your spellcasting!", false, true));
        this.add(new StatusAffectDesc("CorruptedLibido", "Corrupted Libido",
            "Reduces lust gain by 10%.",
            "You choose the 'Corrupted Libido' perk.  As a result of your body's corruption, you've become a bit harder to turn on. (Lust gain reduced by 10%!)", false, true));
        this.add(new StatusAffectDesc("DoubleAttack", "Double Attack",
            "[if (player.stats.spe<50)" +
            "<b>You're too slow to double attack!</b>" +
            "|[if(player.str<61)" +
            "Allows you to perform two melee attacks per round." +
            "|" +
            "<b>You are stronger than double attack allows.  To choose between reduced strength double-attacks and a single strong attack, access \"Dbl Options\" in the perks menu.</b>" +
            "]]",
            "You choose the 'Double Attack' perk.  This allows you to make two attacks so long as your strength is at 60 or below.  By default your effective strength will be reduced to 60 if it is too high when double attacking.  <b>You can enter the perks menu at any time to toggle options as to how you will use this perk.</b>", false, true));
        this.add(new StatusAffectDesc("Evade", "Evade",
            "Increases chances of evading enemy attacks.",
            "You choose the 'Evade' perk, allowing you to avoid enemy attacks more often!", false, true));
        this.add(new StatusAffectDesc("FertilityPlus", "Fertility+",
            "Increases fertility rating by 15 and cum volume by up to 50%.",
            "You choose the 'Fertility+' perk, making it easier to get pregnant.  It also increases your cum volume by up to 50% (if appropriate)!", false, true));
        this.add(new StatusAffectDesc("HotBlooded", "Hot Blooded",
            "Raises minimum lust by up to 20.",
            "You choose the 'Hot Blooded' perk.  As a result of your enhanced libido, your lust no longer drops below 20! (If you already have some minimum lust, it will be increased by 10)", false, true));
        this.add(new StatusAffectDesc("ImmovableObject", "Immovable Object",
            "[if(player.tou>=75)" +
            "Grants 20% physical damage reduction.</b>" +
            "|" +
            "<b>You aren't tough enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Immovable Object' perk, granting 20% physical damage reduction.</b>", false, true));
        this.add(new StatusAffectDesc("IronMan", "Iron Man",
            "Reduces the fatigue cost of physical specials by 50%.",
            "You choose the 'Iron Man' perk, reducing the fatigue cost of physical special attacks by 50%", false, true));
        this.add(new StatusAffectDesc("LightningStrikes", "Lightning Strikes",
            "[if(player.stats.spe>=60)" +
            "Increases the attack damage for non-heavy weapons.</b>" +
            "|" +
            "<b>You are too slow to benefit from this perk.</b>" +
            "]",
            "You choose the 'Lightning Strikes' perk, increasing the attack damage for non-heavy weapons.</b>", false, true));
        this.add(new StatusAffectDesc("LungingAttacks", "Lunging Attacks",
            "[if(player.stats.spe>=75)" +
            "Grants 50% armor penetration for standard attacks." +
            "|" +
            "<b>You are too slow to benefit from this perk.</b>" +
            "]",
            "You choose the 'Lunging Attacks' perk, granting 50% armor penetration for standard attacks.", false, true));
        this.add(new StatusAffectDesc("Mage", "Mage",
            "Increases base spell strength by 50%.",
            "You choose the 'Mage' perk.  You are able to focus your magical abilities even more keenly, boosting your base spell effects by 50%.", false, true));
        this.add(new StatusAffectDesc("Masochist", "Masochist",
            "Take 30% less physical damage but gain lust when damage.",
            "You choose the 'Masochist' perk, reducing the damage you take but raising your lust each time!  This perk only functions while your libido is at or above 60!", false, true));
        this.add(new StatusAffectDesc("Medicine", "Medicine",
            "Grants 15% chance per round of cleansing poisons/drugs from your body.",
            "You choose the 'Medicine' perk, giving you a chance to remove debilitating poisons automatically!", false, true));
        this.add(new StatusAffectDesc("Nymphomania", "Nymphomania",
            "Raises minimum lust by up to 30.",
            "You've chosen the 'Nymphomania' perk.  Due to the incredible amount of corruption you've been exposed to, you've begun to live in a state of minor constant arousal.  Your minimum lust will be increased by as much as 30 (If you already have minimum lust, the increase is 10-15).", false, true));
        this.add(new StatusAffectDesc("Precision", "Precision",
            "Reduces enemy armor by 10. (Req's 25+ Intelligence)",
            "You've chosen the 'Precision' perk.  Thanks to your intelligence, you're now more adept at finding and striking an enemy's weak points, reducing their damage resistance from armor by 10.  If your intelligence ever drops below 25 you'll no longer be smart enough to benefit from this perk.", false, true));
        this.add(new StatusAffectDesc("Regeneration", "Regeneration",
            "Regenerates 2% of max HP/hour and 1% of max HP/round.",
            "You choose the 'Regeneration' perk, allowing you to heal 2% of max HP every hour and 1% of max HP every round of combat!", false, true));
        this.add(new StatusAffectDesc("Regeneration2", "Regeneration 2",
            "Gain 2% of max HP per round of combat and 4% of max HP per hour out of combat.",
            "You choose the 'Regeneration 2' perk, giving you an additional 2% of max HP per turn in combat and 4% of max HP per hour.", false, true));
        this.add(new StatusAffectDesc("Resistance", "Resistance",
            "Reduces lust gain by 10%.",
            "You choose the 'Resistance' perk, reducing the rate at which your lust increases by 10%.", false, true));
        this.add(new StatusAffectDesc("Resolute", "Resolute",
            "[if(player.tou>=75)" +
            "Grants immunity to stuns and some statuses.</b>" +
            "|" +
            "<b>You aren't tough enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Resolute' perk, granting immunity to stuns and some statuses.</b>", false, true));
        this.add(new StatusAffectDesc("Runner", "Runner",
            "Increases chances of escaping combat.",
            "You choose the 'Runner' perk, increasing your chances to escape from your foes when fleeing!", false, true));
        this.add(new StatusAffectDesc("Sadist", "Sadist",
            "Deal 20% more damage, but gain lust at the same time.",
            "You choose the 'Sadist' perk, increasing damage by 20 percent but causing you to gain lust from dealing damage.", false, true));
        this.add(new StatusAffectDesc("Seduction", "Seduction",
            "Upgrades your tease attack, making it more effective.",
            "You choose the 'Seduction' perk, upgrading the 'tease' attack with a more powerful damage and a higher chance of success.", false, true));
        this.add(new StatusAffectDesc("SpeedyRecovery", "Speedy Recovery",
            "Regain fatigue 50% faster.",
            "You choose the 'Speedy Recovery' perk, boosting your fatigue recovery rate!", false, true));
        this.add(new StatusAffectDesc("Spellpower", "Spellpower",
            "Increases base spell strength by 50%.",
            "You choose the 'Spellpower' perk.  Thanks to your sizeable intellect and willpower, you are able to more effectively use magic, boosting base spell effects by 50%.", false, true));
        this.add(new StatusAffectDesc("StrongBack", "Strong Back",
            "Enables fourth item slot.",
            "You choose the 'Strong Back' perk, enabling a fourth item slot.", false, true));
        this.add(new StatusAffectDesc("StrongBack2", "Strong Back 2: Strong Harder",
            "Enables fifth item slot.",
            "You choose the 'Strong Back 2: Strong Harder' perk, enabling a fifth item slot.", false, true));
        this.add(new StatusAffectDesc("Tactician", "Tactician",
            "[if(player.stats.int>=50)" +
            "Increases critical hit chance by up to 10% (Intelligence-based)." +
            "|" +
            "<b>You are too dumb to gain benefit from this perk.</b>" +
            "]",
            "You choose the 'Tactician' perk, increasing critical hit chance by up to 10% (Intelligence-based).", false, true));
        this.add(new StatusAffectDesc("Tank", "Tank",
            "Raises max HP by 50.",
            "You choose the 'Tank' perk, giving you an additional 50 hp!", false, true));
        this.add(new StatusAffectDesc("Tank2", "Tank 2",
            "+1 extra HP per point of toughness.",
            "You choose the 'Tank 2' perk, granting an extra maximum HP for each point of toughness.", false, true));
        this.add(new StatusAffectDesc("ThunderousStrikes", "Thunderous Strikes",
            "+20% 'Attack' damage while strength is at or above 80.",
            "You choose the 'Thunderous Strikes' perk, increasing normal damage by 20% while your strength is over 80.", false, true));
        this.add(new StatusAffectDesc("WeaponMastery", "Weapon Mastery",
            "[if(player.str>60)" +
            "Doubles damage bonus of weapons classified as 'Large'." +
            "|" +
            "<b>You aren't strong enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Weapon Mastery' perk, doubling the effectiveness of large weapons.", false, true));
        this.add(new StatusAffectDesc("WellAdjusted", "Well Adjusted",
            "You gain half as much lust as time passes in Mareth.",
            "You choose the 'Well Adjusted' perk, reducing the amount of lust you naturally gain over time while in this strange land!", false, true));

        // Needlework perks
        this.add(new StatusAffectDesc("ChiReflowAttack", "Chi Reflow - Attack", "Chi Reflow - Attack",
            "Regular attacks boosted, but damage resistance decreased.", false, true));
        this.add(new StatusAffectDesc("ChiReflowDefense", "Chi Reflow - Defense", "Chi Reflow - Defense",
            "Passive damage resistance, but caps speed", false, true));
        this.add(new StatusAffectDesc("ChiReflowLust", "Chi Reflow - Lust", "Chi Reflow - Lust",
            "Lust resistance and Tease are enhanced, but Libido and Sensitivity gains increased.", false, true));
        this.add(new StatusAffectDesc("ChiReflowMagic", "Chi Reflow - Magic", "Chi Reflow - Magic",
            "Magic attacks boosted, but regular attacks are weaker.", false, true));
        this.add(new StatusAffectDesc("ChiReflowSpeed", "Chi Reflow - Speed", "Chi Reflow - Speed",
            "Speed reductions are halved but caps strength", false, true));

        // Piercing perks
        this.add(new PiercedCrimstonePerk());
        this.add(new PiercedFertitePerk());
        this.add(new StatusAffectDesc("PiercedFurrite", "Pierced: Furrite", "Pierced: Furrite",
            "Increases chances of encountering 'furry' foes.", false, true));
        this.add(new StatusAffectDesc("PiercedLethite", "Pierced: Lethite", "Pierced: Lethite",
            "Increases chances of encountering demonic foes.", false, true));

        // Cock sock perks
        this.add(new StatusAffectDesc("LustyRegeneration", "Lusty Regeneration", "Lusty Regeneration",
            "Regenerates 1% of HP per round in combat and 2% of HP per hour.", false, true));
        this.add(new StatusAffectDesc("MidasCock", "Midas Cock", "Midas Cock",
            "Increases the gems awarded from victory in battle.", false, true));
        this.add(new PentUpPerk());
        this.add(new StatusAffectDesc("PhallicPotential", "Phallic Potential", "Phallic Potential",
            "Increases the effects of penis-enlarging transformations.", false, true));
        this.add(new StatusAffectDesc("PhallicRestraint", "Phallic Restraint", "Phallic Restraint",
            "Reduces the effects of penis-enlarging transformations.", false, true));

        // Armor perks
        this.add(new StatusAffectDesc("BloodMage", "Blood Mage", "Blood Mage",
            "Spellcasting now consumes health instead of fatigue!", false, true));
        this.add(new SluttySeductionPerk());
        this.add(new WizardsEndurancePerk());

        // Weapon perks
        this.add(new WizardsFocusPerk());

        // Achievement perks
        this.add(new StatusAffectDesc("BroodMother", "Brood Mother", "Brood Mother",
            "Pregnancy moves twice as fast as a normal woman's.", false, true));
        this.add(new SpellcastingAffinityPerk());

        // Mutation perks
        this.add(new StatusAffectDesc("Androgyny", "Androgyny", "Androgyny",
            "No gender limits on facial masculinity or femininity.", false, true));
        this.add(new StatusAffectDesc("BasiliskWomb", "Basilisk Womb", "Basilisk Womb",
            "Enables your eggs to be properly fertilized into basilisks of both genders!", false, true));
        this.add(new StatusAffectDesc("BeeOvipositor", "Bee Ovipositor", "Bee Ovipositor",
            "Allows you to lay eggs through a special organ on your insect abdomen, though you need at least 10 eggs to lay.", false, true));
        this.add(new StatusAffectDesc("BimboBody", "Bimbo Body", "Bimbo Body",
            "Gives the body of a bimbo.  Tits will never stay below a 'DD' cup, libido is raised, lust resistance is raised, and upgrades tease.", false, true));
        this.add(new StatusAffectDesc("BimboBrains", "Bimbo Brains", "Bimbo Brains",
            "Now that you've drank bimbo liquer, you'll never, like, have the attention span and intelligence you once did!  But it's okay, 'cause you get to be so horny an' stuff!", false, true));
        this.add(new StatusAffectDesc("BroBody", "Bro Body", "Bro Body",
            "Grants an ubermasculine body that's sure to impress.", false, true));
        this.add(new StatusAffectDesc("BroBrains", "Bro Brains", "Bro Brains",
            "Makes thou... thin... fuck, that shit's for nerds.", false, true));
        this.add(new StatusAffectDesc("BunnyEggs", "Bunny Eggs", "Bunny Eggs",
            "Laying eggs has become a normal part of your bunny-body's routine.", false, true));
        this.add(new StatusAffectDesc("CorruptedNinetails", "Corrupted Nine-tails", "Corrupted Nine-tails",
            "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells, but your method of attaining it has corrupted the transformation, preventing you from achieving true enlightenment.", false, true));
        this.add(new StatusAffectDesc("Diapause", "Diapause", "Diapause",
            "Pregnancy does not advance normally, but develops quickly after taking in fluids.", false, true));
        this.add(new StatusAffectDesc("Dragonfire", "Dragonfire", "Dragonfire",
            "Allows access to a dragon breath attack.", false, true));
        this.add(new StatusAffectDesc("EnlightenedNinetails", "Enlightened Nine-tails", "Enlightened Nine-tails",
            "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells.", false, true));
        this.add(new StatusAffectDesc("Feeder", "Feeder", "Feeder",
            "Lactation does not decrease and gives a compulsion to breastfeed others.", false, true));
        this.add(new StatusAffectDesc("Flexibility", "Flexibility", "Flexibility",
            "Grants cat-like flexibility.  Useful for dodging and 'fun'.", false, true));
        this.add(new StatusAffectDesc("FutaFaculties", "Futa Faculties", "Futa Faculties",
            "It's super hard to think about stuff that like, isn't working out or fucking!", false, true));
        this.add(new StatusAffectDesc("FutaForm", "Futa Form", "Futa Form",
            "Ensures that your body fits the Futa look (Tits DD+, Dick 8\"+, & Pussy).  Also keeps your lusts burning bright and improves the tease skill.", false, true));
        this.add(new StatusAffectDesc("HarpyWomb", "Harpy Womb", "Harpy Womb",
            "Increases all laid eggs to large size so long as you have harpy legs and a harpy tail.", false, true));
        this.add(new StatusAffectDesc("Incorporeality", "Incorporeality", "Incorporeality",
            "Allows you to fade into a ghost-like state and temporarily possess others.", false, true));
        this.add(new StatusAffectDesc("MinotaurCumAddict", "Minotaur Cum Addict", "Minotaur Cum Addict",
            "Causes you to crave minotaur cum frequently.  You cannot shake this addiction.", false, true));
        this.add(new StatusAffectDesc("Oviposition", "Oviposition", "Oviposition",
            "Causes you to regularly lay eggs when not otherwise pregnant.", false, true));
        this.add(new StatusAffectDesc("PurityBlessing", "Purity Blessing", "Purity Blessing",
            "Reduces the rate at which your corruption, libido, and lust increase.", false, true));
        this.add(new StatusAffectDesc("SlimeCore", "Slime Core", "Slime Core",
            "Grants more control over your slimy body, allowing you to go twice as long without fluids.", false, true));
        this.add(new StatusAffectDesc("SpiderOvipositor", "Spider Ovipositor", "Spider Ovipositor",
            "Allows you to lay eggs through a special organ on your arachnid abdomen, though you need at least 10 eggs to lay.", false, true));
        this.add(new StatusAffectDesc("ThickSkin", "Thick Skin", "Thick Skin",
            "Toughens your dermis to provide 2 points of armor.", false, true));

        // Quest, Event & NPC perks
        this.add(new StatusAffectDesc("BulgeArmor", "Bulge Armor", "Bulge Armor",
            "Grants a 5 point damage bonus to dick-based tease attacks.", false, true));
        this.add(new StatusAffectDesc("Cornucopia", "Cornucopia", "Cornucopia",
            "Vaginal and Anal capacities increased by 30.", false, true));
        this.add(new ElvenBountyPerk());
        this.add(new StatusAffectDesc("FerasBoonAlpha", "Fera's Boon - Alpha", "Fera's Boon - Alpha",
            "Increases the rate your cum builds up and cum production in general.", false, true));
        this.add(new StatusAffectDesc("FerasBoonBreedingBitch", "Fera's Boon - Breeding Bitch", "Fera's Boon - Breeding Bitch",
            "Increases fertility and reduces the time it takes to birth young.", false, true));
        this.add(new StatusAffectDesc("FerasBoonMilkingTwat", "Fera's Boon - Milking Twat",
            "Keeps your pussy from ever getting too loose and increases pregnancy speed.",
            "Keeps your pussy from ever getting too loose and increases pregnancy speed.", false, true));
        this.add(new StatusAffectDesc("FerasBoonSeeder", "Fera's Boon - Seeder",
            "Increases cum output by 1,000 mLs.",
            "Increases cum output by 1,000 mLs.", false, true));
        this.add(new StatusAffectDesc("FerasBoonWideOpen", "Fera's Boon - Wide Open",
            "Keeps your pussy permanently gaped and increases pregnancy speed.",
            "Keeps your pussy permanently gaped and increases pregnancy speed.", false, true));
        this.add(new StatusAffectDesc("FireLord", "Fire Lord", "Fire Lord",
            "Akbal's blessings grant the ability to breathe burning green flames.", false, true));
        this.add(new StatusAffectDesc("Hellfire", "Hellfire", "Hellfire",
            "Grants a corrupted fire breath attack, like the hellhounds in the mountains.", false, true));
        this.add(new StatusAffectDesc("LuststickAdapted", "Luststick Adapted", "Luststick Adapted",
            "Grants immunity to the lust-increasing effects of lust-stick and allows its use.", false, true));
        this.add(new StatusAffectDesc("MagicalFertility", "Magical Fertility",
            "10% higher chance of pregnancy and increased pregnancy speed.",
            "10% higher chance of pregnancy and increased pregnancy speed.", false, true));
        this.add(new StatusAffectDesc("MagicalVirility", "Magical Virility",
            "200 mLs more cum per orgasm and enhanced virility.",
            "200 mLs more cum per orgasm and enhanced virility.", false, true));
        this.add(new StatusAffectDesc("MaraesGiftButtslut", "Marae's Gift - Buttslut", "Marae's Gift - Buttslut",
            "Makes your anus provide lubrication when aroused.", false, true));
        this.add(new StatusAffectDesc("MaraesGiftFertility", "Marae's Gift - Fertility", "Marae's Gift - Fertility",
            "Greatly increases fertility and halves base pregnancy speed.", false, true));
        this.add(new StatusAffectDesc("MaraesGiftProfractory", "Marae's Gift - Profractory", "Marae's Gift - Profractory",
            "Causes your cum to build up at 3x the normal rate.", false, true));
        this.add(new StatusAffectDesc("MaraesGiftStud", "Marae's Gift - Stud", "Marae's Gift - Stud",
            "Increases your cum production and potency greatly.", false, true));
        this.add(new StatusAffectDesc("MarbleResistant", "Marble Resistant", "Marble Resistant",
            "Provides resistance to the addictive effects of bottled LaBova milk.", false, true));
        this.add(new StatusAffectDesc("MarblesMilk", "Marble's Milk", "Marble's Milk",
            "Requires you to drink LaBova milk frequently or eventually die.  You cannot shake this addiction.", false, true));
        this.add(new StatusAffectDesc("Misdirection", "Misdirection", "Misdirection",
            "Grants additional evasion chances while wearing Raphael's red bodysuit.", false, true));
        this.add(new StatusAffectDesc("OmnibusGift", "Omnibus' Gift", "Omnibus' Gift",
            "Increases minimum lust but provides some lust resistance.", false, true));
        this.add(new StatusAffectDesc("OneTrackMind", "One Track Mind", "One Track Mind",
            "Your constant desire for sex causes your sexual organs to be able to take larger insertions and disgorge greater amounts of fluid.", false, true));
        this.add(new StatusAffectDesc("PilgrimsBounty", "Pilgrim's Bounty", "Pilgrim's Bounty",
            "Causes you to always cum as hard as if you had max lust.", false, true));
        this.add(new StatusAffectDesc("PureAndLoving", "Pure and Loving", "Pure and Loving",
            "Your caring attitude towards love and romance makes you slightly more resistant to lust and corruption.", false, true));
        this.add(new StatusAffectDesc("SensualLover", "Sensual Lover", "Sensual Lover",
            "Your sensual attitude towards love and romance makes your tease ability slightly more effective.", false, true));
        this.add(new StatusAffectDesc("Whispered", "Whispered", "Whispered",
            "Akbal's blessings grant limited telepathy that can induce fear.", false, true));

        this.add(new ControlledBreathPerk());
        this.add(new CleansingPalmPerk());
        this.add(new EnlightenedPerk());


        // Monster perks
        this.add(new StatusAffectDesc("Acid", "Acid", "Acid", "", false, true));

    }
}

