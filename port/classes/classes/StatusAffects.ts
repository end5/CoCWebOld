import { CombatStatusAffect } from './StatusAffects/CombatStatusAffect';
import { StatusAffectType } from './StatusAffectType';

/**
 * IMPORTANT NOTE:
 * You can rename the constants BUT NOT the string ids (they are stored in saves).
 */

/**
* Creates non-combat status affect
*/
function mk(id: string): StatusAffectType {
    return new StatusAffectType(id);
}

/**
 * Creates combat status affect
 */
function mk2(id: string): CombatStatusAffect {
    return new CombatStatusAffect(id);
}

export class StatusAffects {
    // Non-combat player perks
    public static AllNaturalOnaholeUsed: StatusAffectType = mk("all-natural onahole used");
    public static AteEgg: StatusAffectType = mk("ateEgg");
    public static AnemoneArousal: StatusAffectType = mk("Anemone Arousal");
    public static BimboChampagne: StatusAffectType = mk("Bimbo Champagne");
    public static Birthed: StatusAffectType = mk("Birthed");
    public static BirthedImps: StatusAffectType = mk("Birthed Imps");
    public static BlackCatBeer: StatusAffectType = mk("Black Cat Beer");
    public static BlackNipples: StatusAffectType = mk("Black Nipples");
    public static BlowjobOn: StatusAffectType = mk("BlowjobOn");
    public static BoatDiscovery: StatusAffectType = mk("Boat Discovery");
    public static BonusACapacity: StatusAffectType = mk("Bonus aCapacity");
    public static BonusVCapacity: StatusAffectType = mk("Bonus vCapacity");
    public static BottledMilk: StatusAffectType = mk("Bottled Milk");
    public static BreastsMilked: StatusAffectType = mk("Breasts Milked");
    public static BSwordBroken: StatusAffectType = mk("BSwordBroken");
    public static BuiltMilker: StatusAffectType = mk("BUILT: Milker");
    public static BurpChanged: StatusAffectType = mk("Burp Changed");
    public static ButtStretched: StatusAffectType = mk("ButtStretched");
    public static CampAnemoneTrigger: StatusAffectType = mk("Camp Anemone Trigger");
    public static CampMarble: StatusAffectType = mk("Camp Marble");
    public static CampRathazul: StatusAffectType = mk("Camp Rathazul");
    public static ClaraCombatRounds: StatusAffectType = mk("Clara Combat Rounds");
    public static ClaraFoughtInCamp: StatusAffectType = mk("Clara Fought In Camp");
    public static CockPumped: StatusAffectType = mk("Cock Pumped");
    public static Contraceptives: StatusAffectType = mk("Contraceptives");
    public static CuntStretched: StatusAffectType = mk("CuntStretched");
    public static DefenseCanopy: StatusAffectType = mk("Defense: Canopy");
    public static DeluxeOnaholeUsed: StatusAffectType = mk("deluxe onahole used");
    public static DogWarning: StatusAffectType = mk("dog warning");
    public static DragonBreathBoost: StatusAffectType = mk("Dragon Breath Boost");
    public static DragonBreathCooldown: StatusAffectType = mk("Dragon Breath Cooldown");
    public static DungeonShutDown: StatusAffectType = mk("DungeonShutDown");
    public static Dysfunction: StatusAffectType = mk("dysfunction");
    public static Edryn: StatusAffectType = mk("Edryn");
    public static Eggchest: StatusAffectType = mk("eggchest");
    public static Eggs: StatusAffectType = mk("eggs");
    public static EmberFuckCooldown: StatusAffectType = mk("ember fuck cooldown");
    public static EmberNapping: StatusAffectType = mk("Ember Napping");
    public static EverRapedJojo: StatusAffectType = mk("Ever Raped Jojo");
    public static Exgartuan: StatusAffectType = mk("Exgartuan");
    public static ExploredDeepwoods: StatusAffectType = mk("exploredDeepwoods");
    public static FactoryOmnibusDefeated: StatusAffectType = mk("FactoryOmnibusDefeated");
    public static FactoryOverload: StatusAffectType = mk("FactoryOverload");
    public static FactoryIncubusDefeated: StatusAffectType = mk("FactoryIncubusDefeated");
    public static FactorySuccubusDefeated: StatusAffectType = mk("FactorySuccubusDefeated");
    public static FaerieFemFuck: StatusAffectType = mk("Faerie Fem Fuck");
    public static FaerieFucked: StatusAffectType = mk("Faerie Fucked");
    public static FappedGenderless: StatusAffectType = mk("fapped genderless");
    public static Feeder: StatusAffectType = mk("Feeder");
    public static Fertilized: StatusAffectType = mk("Fertilized");
    public static FetishOn: StatusAffectType = mk("fetishON");
    public static FoundFactory: StatusAffectType = mk("Found Factory");
    public static FuckedMarble: StatusAffectType = mk("FuckedMarble");
    public static Goojob: StatusAffectType = mk("GOOJOB");
    public static GooStuffed: StatusAffectType = mk("gooStuffed");
    public static Groundpound: StatusAffectType = mk("Groundpound");
    public static HairdresserMeeting: StatusAffectType = mk("hairdresser meeting");
    public static Hangover: StatusAffectType = mk("Hangover");
    public static Heat: StatusAffectType = mk("heat");
    public static HorseWarning: StatusAffectType = mk("horse warning");
    public static ImmolationSpell: StatusAffectType = mk("Immolation Spell");
    public static ImpGangBang: StatusAffectType = mk("Imp GangBang");
    public static IncubusBribed: StatusAffectType = mk("IncubusBribed");
    public static Infested: StatusAffectType = mk("infested");
    public static IzmaBlowing: StatusAffectType = mk("IzmaBlowing");
    public static IzumisPipeSmoke: StatusAffectType = mk("Izumis Pipe Smoke");
    public static JerkingIzma: StatusAffectType = mk("JerkingIzma");
    public static Jizzpants: StatusAffectType = mk("Jizzpants");
    public static JojoMeditationCount: StatusAffectType = mk("Jojo Meditation Count");
    public static JojoNightWatch: StatusAffectType = mk("JojoNightWatch");
    public static JojoTFOffer: StatusAffectType = mk("JojoTFOffer");
    public static Kelt: StatusAffectType = mk("Kelt");
    public static KeltBJ: StatusAffectType = mk("KeltBJ");
    public static KeltBadEndWarning: StatusAffectType = mk("Kelt Bad End Warning");
    public static KeltOff: StatusAffectType = mk("KeltOff");
    public static KnowsArouse: StatusAffectType = mk("Knows Arouse");
    public static KnowsBlind: StatusAffectType = mk("Knows Blind");
    public static KnowsCharge: StatusAffectType = mk("Knows Charge");
    public static KnowsHeal: StatusAffectType = mk("Knows Heal");
    public static KnowsMight: StatusAffectType = mk("Knows Might");
    public static KnowsWhitefire: StatusAffectType = mk("Knows Whitefire");
    public static LactationEndurance: StatusAffectType = mk("Lactation Endurance");
    public static LactationReduction: StatusAffectType = mk("Lactation Reduction");
    public static LactationReduc0: StatusAffectType = mk("Lactation Reduc0");
    public static LactationReduc1: StatusAffectType = mk("Lactation Reduc1");
    public static LactationReduc2: StatusAffectType = mk("Lactation Reduc2");
    public static LactationReduc3: StatusAffectType = mk("Lactation Reduc3");
    public static LootEgg: StatusAffectType = mk("lootEgg");
    public static LostVillagerSpecial: StatusAffectType = mk("lostVillagerSpecial");
    public static Luststick: StatusAffectType = mk("Luststick");
    public static LustStickApplied: StatusAffectType = mk("Lust Stick Applied");
    public static LustyTongue: StatusAffectType = mk("LustyTongue");
    public static MalonVisitedPostAddiction: StatusAffectType = mk("Malon Visited Post Addiction");
    public static MaraeComplete: StatusAffectType = mk("Marae Complete");
    public static MaraesLethicite: StatusAffectType = mk("Marae's Lethicite");
    public static MaraesQuestStart: StatusAffectType = mk("Marae's Quest Start");
    public static Marble: StatusAffectType = mk("Marble");
    public static MarbleHasItem: StatusAffectType = mk("MarbleHasItem");
    public static MarbleItemCooldown: StatusAffectType = mk("MarbleItemCooldown");
    public static MarbleRapeAttempted: StatusAffectType = mk("Marble Rape Attempted");
    public static MarblesMilk: StatusAffectType = mk("Marbles Milk");
    public static MarbleSpecials: StatusAffectType = mk("MarbleSpecials");
    public static MarbleWithdrawl: StatusAffectType = mk("MarbleWithdrawl");
    public static Meditated: StatusAffectType = mk("Meditated");
    public static MeanToNaga: StatusAffectType = mk("MeanToNaga");
    public static MeetWanderer: StatusAffectType = mk("meet wanderer");
    public static MetCorruptMarae: StatusAffectType = mk("Met Corrupt Marae");
    public static MetMarae: StatusAffectType = mk("Met Marae");
    public static MetRathazul: StatusAffectType = mk("metRathazul");
    public static MetWorms: StatusAffectType = mk("metWorms");
    public static MetWhitney: StatusAffectType = mk("Met Whitney");
    public static Milked: StatusAffectType = mk("Milked");
    public static MinoPlusCowgirl: StatusAffectType = mk("Mino + Cowgirl");
    public static Naga: StatusAffectType = mk("Naga");
    public static NakedOn: StatusAffectType = mk("NakedOn");
    public static NoJojo: StatusAffectType = mk("noJojo");
    public static NoMoreMarble: StatusAffectType = mk("No More Marble");
    public static Oswald: StatusAffectType = mk("Oswald");
    public static PlainOnaholeUsed: StatusAffectType = mk("plain onahole used");
    public static PhoukaWhiskeyAffect: StatusAffectType = mk("PhoukaWhiskeyAffect");
    public static PostAkbalSubmission: StatusAffectType = mk("Post Akbal Submission");
    public static PostAnemoneBeatdown: StatusAffectType = mk("Post Anemone Beatdown");
    public static PureCampJojo: StatusAffectType = mk("PureCampJojo");
    public static RathazulArmor: StatusAffectType = mk("RathazulArmor");
    public static RepeatSuccubi: StatusAffectType = mk("repeatSuccubi");
    public static Rut: StatusAffectType = mk("rut");
    public static SharkGirl: StatusAffectType = mk("Shark-Girl");
    public static ShieldingSpell: StatusAffectType = mk("Shielding Spell");
    public static SlimeCraving: StatusAffectType = mk("Slime Craving");
    public static SlimeCravingFeed: StatusAffectType = mk("Slime Craving Feed");
    public static SlimeCravingOutput: StatusAffectType = mk("Slime Craving Output");
    public static SuccubiFirst: StatusAffectType = mk("SuccubiFirst");
    public static SuccubiNight: StatusAffectType = mk("succubiNight");
    public static TakenGroPlus: StatusAffectType = mk("TakenGro+");
    public static TakenLactaid: StatusAffectType = mk("TakenLactaid");
    public static Tamani: StatusAffectType = mk("Tamani");									//Used only for compatibility with old save files, otherwise no longer in use
    public static TamaniFemaleEncounter: StatusAffectType = mk("Tamani Female Encounter");	//Used only for compatibility with old save files, otherwise no longer in use
    public static TelAdre: StatusAffectType = mk("Tel'Adre");
    public static TentacleBadEndCounter: StatusAffectType = mk("TentacleBadEndCounter");
    public static TentacleJojo: StatusAffectType = mk("Tentacle Jojo");
    public static TensionReleased: StatusAffectType = mk("TensionReleased");
    public static TF2: StatusAffectType = mk("TF2");
    public static TookBlessedSword: StatusAffectType = mk("Took Blessed Sword");
    /**
     * v1 = bonus index
     * v2 = bonus value
     * v3 = remaining time
     */
    public static UmasMassage: StatusAffectType = mk("Uma's Massage");
    public static Uniball: StatusAffectType = mk("Uniball");
    public static UsedNaturalSelfStim: StatusAffectType = mk("used natural self-stim");
    public static used_self_dash_stim: StatusAffectType = mk("used self-stim");
    public static Victoria: StatusAffectType = mk("Victoria");
    public static VoluntaryDemonpack: StatusAffectType = mk("Voluntary Demonpack");
    public static WormOffer: StatusAffectType = mk("WormOffer");
    public static WormPlugged: StatusAffectType = mk("worm plugged");
    public static WormsHalf: StatusAffectType = mk("wormsHalf");
    public static WormsOff: StatusAffectType = mk("wormsOff");
    public static WormsOn: StatusAffectType = mk("wormsOn");
    public static WandererDemon: StatusAffectType = mk("wanderer demon");
    public static WandererHuman: StatusAffectType = mk("wanderer human");
    public static Yara: StatusAffectType = mk("Yara");

    // monster
    public static Attacks: StatusAffectType = mk("attacks");
    public static BimboBrawl: StatusAffectType = mk("bimboBrawl");
    public static BowCooldown: StatusAffectType = mk("Bow Cooldown");
    public static BowDisabled: StatusAffectType = mk("Bow Disabled");
    public static Charged: StatusAffectType = mk("Charged");
    public static Climbed: StatusAffectType = mk("Climbed");
    public static Concentration: StatusAffectType = mk("Concentration");
    public static Constricted: StatusAffectType = mk("Constricted");
    public static CoonWhip: StatusAffectType = mk("Coon Whip");
    public static Counter: StatusAffectType = mk("Counter");
    public static DomFight: StatusAffectType = mk("domfight");
    public static DrankMinoCum: StatusAffectType = mk("drank mino cum");
    public static DrankMinoCum2: StatusAffectType = mk("drank mino cum2")
    public static Earthshield: StatusAffectType = mk("Earthshield");
    public static Fear: StatusAffectType = mk("Fear");
    public static GenericRunDisabled: StatusAffectType = mk("Generic Run Disabled");
    public static Gigafire: StatusAffectType = mk("Gigafire");
    public static GottaOpenGift: StatusAffectType = mk("Gotta Open Gift");
    public static HolliBurning: StatusAffectType = mk("Holli Burning");
    public static Illusion: StatusAffectType = mk("Illusion");
    public static ImpSkip: StatusAffectType = mk("ImpSkip");
    public static ImpUber: StatusAffectType = mk("ImpUber");
    public static JojoIsAssisting: StatusAffectType = mk("Jojo Is Assisting");
    public static JojoPyre: StatusAffectType = mk("Jojo Pyre");
    public static Keen: StatusAffectType = mk("keen");
    public static Level: StatusAffectType = mk("level");
    public static KitsuneFight: StatusAffectType = mk("Kitsune Fight");
    public static LustAura: StatusAffectType = mk("Lust Aura");
    public static LustStick: StatusAffectType = mk("LustStick");
    public static Milk: StatusAffectType = mk("milk");
    public static MilkyUrta: StatusAffectType = mk("Milky Urta");
    public static MinoMilk: StatusAffectType = mk("Mino Milk");
    public static MinotaurEntangled: StatusAffectType = mk("Minotaur Entangled");
    public static MissFirstRound: StatusAffectType = mk("miss first round");
    public static NoLoot: StatusAffectType = mk("No Loot");
    public static PCTailTangle: StatusAffectType = mk("PCTailTangle");
    public static PeachLootLoss: StatusAffectType = mk("Peach Loot Loss");
    // @aimozg i don't know and do not fucking care if these two should be merged
    public static PhyllaFight: StatusAffectType = mk("PhyllaFight");
    public static phyllafight: StatusAffectType = mk("phyllafight");
    public static Platoon: StatusAffectType = mk("platoon");
    public static QueenBind: StatusAffectType = mk("QueenBind");
    // @aimozg HA HA HA
    public static Round: StatusAffectType = mk("Round");
    public static round: StatusAffectType = mk("round");
    public static RunDisabled: StatusAffectType = mk("Run Disabled");
    public static Shell: StatusAffectType = mk("Shell");
    public static SirenSong: StatusAffectType = mk("Siren Song");
    public static Spar: StatusAffectType = mk("spar");
    public static Sparring: StatusAffectType = mk("sparring");
    public static spiderfight: StatusAffectType = mk("spiderfight");
    public static StunCooldown: StatusAffectType = mk("Stun Cooldown");
    public static TentacleCoolDown: StatusAffectType = mk("TentacleCoolDown");
    public static Timer: StatusAffectType = mk("Timer");
    public static Uber: StatusAffectType = mk("Uber");
    public static UrtaSecondWinded: StatusAffectType = mk("Urta Second Winded");
    public static UsedTitsmother: StatusAffectType = mk("UsedTitsmother");
    public static Vala: StatusAffectType = mk("vala");
    public static Vapula: StatusAffectType = mk("Vapula");
    public static WhipReady: StatusAffectType = mk("Whip Ready");

    // combat
    public static AcidSlap: CombatStatusAffect = mk2("Acid Slap");
    public static AkbalSpeed: CombatStatusAffect = mk2("Akbal Speed");
    public static AmilyVenom: CombatStatusAffect = mk2("Amily Venom");
    public static AnemoneVenom: CombatStatusAffect = mk2("Anemone Venom");
    public static AttackDisabled: CombatStatusAffect = mk2("Attack Disabled");
    public static BasiliskCompulsion: CombatStatusAffect = mk2("Basilisk Compulsion");
    public static BasiliskSlow: CombatStatusAffect = mk2("BasiliskSlow");
    public static Berzerking: CombatStatusAffect = mk2("Berzerking");
    public static Blind: CombatStatusAffect = mk2("Blind");
    public static Bound: CombatStatusAffect = mk2("Bound");
    public static CalledShot: CombatStatusAffect = mk2("Called Shot");
    public static ChargeWeapon: CombatStatusAffect = mk2("Charge Weapon");
    public static Chokeslam: CombatStatusAffect = mk2("Chokeslam");
    public static Confusion: CombatStatusAffect = mk2("Confusion");
    public static DemonSeed: CombatStatusAffect = mk2("DemonSeed");
    public static Disarmed: CombatStatusAffect = mk2("Disarmed");
    public static DriderKiss: CombatStatusAffect = mk2("Drider Kiss");
    public static FirstAttack: CombatStatusAffect = mk2("FirstAttack");
    public static GnollSpear: CombatStatusAffect = mk2("Gnoll Spear");
    public static GooArmorBind: CombatStatusAffect = mk2("GooArmorBind");
    public static GooArmorSilence: CombatStatusAffect = mk2("GooArmorSilence");
    public static GooBind: CombatStatusAffect = mk2("GooBind");
    public static HarpyBind: CombatStatusAffect = mk2("HarpyBind");
    public static HolliConstrict: CombatStatusAffect = mk2("Holli Constrict");
    public static InfestAttempted: CombatStatusAffect = mk2("infestAttempted");
    public static IsabellaStunned: CombatStatusAffect = mk2("Isabella Stunned");
    public static IzmaBleed: CombatStatusAffect = mk2("Izma Bleed");
    public static KissOfDeath: CombatStatusAffect = mk2("Kiss of Death");
    public static LustStones: CombatStatusAffect = mk2("lust stones");
    public static lustvenom: CombatStatusAffect = mk2("lust venom");
    public static Might: CombatStatusAffect = mk2("Might");
    public static NagaBind: CombatStatusAffect = mk2("Naga Bind");
    public static NagaVenom: CombatStatusAffect = mk2("Naga Venom");
    public static NoFlee: CombatStatusAffect = mk2("NoFlee");
    public static ParalyzeVenom: CombatStatusAffect = mk2("paralyze venom");
    public static PhysicalDisabled: CombatStatusAffect = mk2("Physical Disabled");
    public static Poison: CombatStatusAffect = mk2("Poison");
    public static Sandstorm: CombatStatusAffect = mk2("sandstorm");
    public static Sealed: CombatStatusAffect = mk2("Sealed");
    public static SheilaOil: CombatStatusAffect = mk2("Sheila Oil");
    public static Shielding: CombatStatusAffect = mk2("Sheilding");
    public static StoneLust: CombatStatusAffect = mk2("Stone Lust");
    public static Stunned: CombatStatusAffect = mk2("Stunned");
    public static TailWhip: CombatStatusAffect = mk2("Tail Whip");
    public static TemporaryHeat: CombatStatusAffect = mk2("Temporary Heat");
    public static TentacleBind: CombatStatusAffect = mk2("TentacleBind");
    public static ThroatPunch: CombatStatusAffect = mk2("Throat Punch");
    public static Titsmother: CombatStatusAffect = mk2("Titsmother");
    public static TwuWuv: CombatStatusAffect = mk2("Twu Wuv");
    public static UBERWEB: CombatStatusAffect = mk2("UBERWEB");
    public static Web: CombatStatusAffect = mk2("Web");
    public static WebSilence: CombatStatusAffect = mk2("Web-Silence");
    public static Whispered: CombatStatusAffect = mk2("Whispered");

    public static RemovedArmor: CombatStatusAffect = mk2("Removed Armor");
    public static JCLustLevel: CombatStatusAffect = mk2("JC Lust Level");
    public static MirroredAttack: CombatStatusAffect = mk2("Mirrored Attack");
    public static KnockedBack: CombatStatusAffect = mk2("Knocked Back");
    public static Tentagrappled: CombatStatusAffect = mk2("Tentagrappled");
    public static TentagrappleCooldown: CombatStatusAffect = mk2("Tentagrapple Cooldown");
    public static ShowerDotEffect: CombatStatusAffect = mk2("Shower Dot Effect");
    public static GardenerSapSpeed: CombatStatusAffect = mk2("Sap Speed");
    public static VineHealUsed: CombatStatusAffect = mk2("Vine Heal Used");

}
