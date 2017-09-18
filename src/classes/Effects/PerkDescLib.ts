import Library from "../Utilities/Library";
import PerkDesc from "./PerkDesc";
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

export default class PerkDescLib extends Library<PerkDesc>{

    public constructor() {
        super();
        this.add(new PerkDesc("Brawler", "Brawler",
            "Brawling experience allows you to make two unarmed attacks in a turn.",
            "You choose the 'Brawler' perk, allowing you to make two unarmed attacks in a turn!", false, true));
        this.add(new PerkDesc("Buttslut", "Buttslut", "Buttslut",
            "", false, true));
        this.add(new PerkDesc("Focused", "Focused", "Focused",
            "", false, true));

        // Player creation perks
        this.add(new PerkDesc("Fast", "Fast", "Fast",
            "Gains speed 25% faster.", false, true));
        this.add(new PerkDesc("Lusty", "Lusty", "Lusty",
            "Gains lust 25% faster.", false, true));
        this.add(new PerkDesc("Sensitive", "Sensitive", "Sensitive",
            "Gains sensitivity 25% faster.", false, true));
        this.add(new PerkDesc("Smart", "Smart", "Smart",
            "Gains intelligence 25% faster.", false, true));
        this.add(new PerkDesc("Strong", "Strong", "Strong",
            "Gains strength 25% faster.", false, true));
        this.add(new PerkDesc("Tough", "Tough", "Tough",
            "Gains toughness 25% faster.", false, true));

        // Female creation perks
        this.add(new PerkDesc("BigClit", "Big Clit", "Big Clit",
            "Allows your clit to grow larger more easily and faster.", false, true));
        this.add(new PerkDesc("BigTits", "Big Tits", "Big Tits",
            "Makes your tits grow larger more easily.", false, true));
        this.add(new PerkDesc("Fertile", "Fertile", "Fertile",
            "Makes you 15% more likely to become pregnant.", false, true));
        this.add(new PerkDesc("WetPussy", "Wet Pussy", "Wet Pussy",
            "Keeps your pussy wet and provides a bonus to capacity.", false, true));

        // Male creation perks
        this.add(new PerkDesc("BigCock", "Big Cock", "Big Cock",
            "Gains cock size 25% faster and with less limitations.", false, true));
        this.add(new PerkDesc("MessyOrgasms", "Messy Orgasms", "Messy Orgasms",
            "Produces 50% more cum volume.", false, true));

        // History perks
        this.add(new PerkDesc("HistoryAlchemist", "History: Alchemist", "History: Alchemist",
            "Alchemical experience makes items more reactive to your body.", false, true));
        this.add(new PerkDesc("HistoryFighter", "History: Fighter", "History: Fighter",
            "A Past full of conflict increases physical damage dealt by 10%.", false, true));
        this.add(new PerkDesc("HistoryHealer", "History: Healer", "History: Healer",
            "Healing experience increases HP gains by 20%.", false, true));
        this.add(new PerkDesc("HistoryReligious", "History: Religious", "History: Religious",
            "Replaces masturbate with meditate when corruption less than or equal to 66.", false, true));
        this.add(new PerkDesc("HistoryScholar", "History: Scholar", "History: Scholar",
            "Time spent focusing your mind makes spellcasting 20% less fatiguing.", false, true));
        this.add(new PerkDesc("HistorySlacker", "History: Slacker", "History: Slacker",
            "Regenerate fatigue 20% faster.", false, true));
        this.add(new PerkDesc("HistorySlut", "History: Slut", "History: Slut",
            "Sexual experience has made you more able to handle large insertions and more resistant to stretching.", false, true));
        this.add(new PerkDesc("HistorySmith", "History: Smith", "History: Smith",
            "Knowledge of armor and fitting increases armor effectiveness by roughly 10%.", false, true));
        this.add(new PerkDesc("HistoryWhore", "History: Whore", "History: Whore",
            "Seductive experience causes your tease attacks to be 15% more effective.", false, true));

        // Ordinary (levelup) perks
        this.add(new PerkDesc("Acclimation", "Acclimation",
            "Reduces lust gain by 15%.",
            "You choose the 'Acclimation' perk, making your body 15% more resistant to lust, up to a maximum of 75%.", false, true));
        this.add(new PerkDesc("Agility", "Agility",
            "Boosts armor points by a portion of your speed on light/medium armors.",
            "You choose the 'Agility' perk, increasing the effectiveness of Light/Medium armors by a portion of your speed.", false, true));
        this.add(new PerkDesc("Archmage", "Archmage",
            "[if (player.stats.int>=75)" +
            "Increases base spell strength by 50%." +
            "|" +
            "<b>You are too dumb to gain benefit from this perk.</b>" +
            "]",
            "You choose the 'Archmage' perk, increasing base spell strength by 50%.", false, true));
        this.add(new PerkDesc("ArousingAura", "Arousing Aura",
            "Exude a lust-inducing aura (Req's corruption of 70 or more)",
            "You choose the 'Arousing Aura' perk, causing you to radiate an aura of lust when your corruption is over 70.", false, true));
        this.add(new PerkDesc("Berzerker", "Berzerker",
            "[if(player.str>=75)" +
            "Grants 'Berzerk' ability." +
            "|" +
            "<b>You aren't strong enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Berzerker' perk, which unlocks the 'Berzerk' magical ability.  Berzerking increases attack and lust resistance but reduces physical defenses.", false, true));
        this.add(new PerkDesc("BrutalBlows", "Brutal Blows",
            "[if(player.str>=75)" +
            "Reduces enemy armor with each hit." +
            "|" +
            "<b>You aren't strong enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Brutal Blows' perk, which reduces enemy armor with each hit.", false, true));
        this.add(new PerkDesc("Channeling", "Channeling",
            "Increases base spell strength by 50%.",
            "You choose the 'Channeling' perk, boosting the strength of your spellcasting!", false, true));
        this.add(new PerkDesc("CorruptedLibido", "Corrupted Libido",
            "Reduces lust gain by 10%.",
            "You choose the 'Corrupted Libido' perk.  As a result of your body's corruption, you've become a bit harder to turn on. (Lust gain reduced by 10%!)", false, true));
        this.add(new PerkDesc("DoubleAttack", "Double Attack",
            "[if (player.stats.spe<50)" +
            "<b>You're too slow to double attack!</b>" +
            "|[if(player.str<61)" +
            "Allows you to perform two melee attacks per round." +
            "|" +
            "<b>You are stronger than double attack allows.  To choose between reduced strength double-attacks and a single strong attack, access \"Dbl Options\" in the perks menu.</b>" +
            "]]",
            "You choose the 'Double Attack' perk.  This allows you to make two attacks so long as your strength is at 60 or below.  By default your effective strength will be reduced to 60 if it is too high when double attacking.  <b>You can enter the perks menu at any time to toggle options as to how you will use this perk.</b>", false, true));
        this.add(new PerkDesc("Evade", "Evade",
            "Increases chances of evading enemy attacks.",
            "You choose the 'Evade' perk, allowing you to avoid enemy attacks more often!", false, true));
        this.add(new PerkDesc("FertilityPlus", "Fertility+",
            "Increases fertility rating by 15 and cum volume by up to 50%.",
            "You choose the 'Fertility+' perk, making it easier to get pregnant.  It also increases your cum volume by up to 50% (if appropriate)!", false, true));
        this.add(new PerkDesc("HotBlooded", "Hot Blooded",
            "Raises minimum lust by up to 20.",
            "You choose the 'Hot Blooded' perk.  As a result of your enhanced libido, your lust no longer drops below 20! (If you already have some minimum lust, it will be increased by 10)", false, true));
        this.add(new PerkDesc("ImmovableObject", "Immovable Object",
            "[if(player.tou>=75)" +
            "Grants 20% physical damage reduction.</b>" +
            "|" +
            "<b>You aren't tough enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Immovable Object' perk, granting 20% physical damage reduction.</b>", false, true));
        this.add(new PerkDesc("IronMan", "Iron Man",
            "Reduces the fatigue cost of physical specials by 50%.",
            "You choose the 'Iron Man' perk, reducing the fatigue cost of physical special attacks by 50%", false, true));
        this.add(new PerkDesc("LightningStrikes", "Lightning Strikes",
            "[if(player.stats.spe>=60)" +
            "Increases the attack damage for non-heavy weapons.</b>" +
            "|" +
            "<b>You are too slow to benefit from this perk.</b>" +
            "]",
            "You choose the 'Lightning Strikes' perk, increasing the attack damage for non-heavy weapons.</b>", false, true));
        this.add(new PerkDesc("LungingAttacks", "Lunging Attacks",
            "[if(player.stats.spe>=75)" +
            "Grants 50% armor penetration for standard attacks." +
            "|" +
            "<b>You are too slow to benefit from this perk.</b>" +
            "]",
            "You choose the 'Lunging Attacks' perk, granting 50% armor penetration for standard attacks.", false, true));
        this.add(new PerkDesc("Mage", "Mage",
            "Increases base spell strength by 50%.",
            "You choose the 'Mage' perk.  You are able to focus your magical abilities even more keenly, boosting your base spell effects by 50%.", false, true));
        this.add(new PerkDesc("Masochist", "Masochist",
            "Take 30% less physical damage but gain lust when damage.",
            "You choose the 'Masochist' perk, reducing the damage you take but raising your lust each time!  This perk only functions while your libido is at or above 60!", false, true));
        this.add(new PerkDesc("Medicine", "Medicine",
            "Grants 15% chance per round of cleansing poisons/drugs from your body.",
            "You choose the 'Medicine' perk, giving you a chance to remove debilitating poisons automatically!", false, true));
        this.add(new PerkDesc("Nymphomania", "Nymphomania",
            "Raises minimum lust by up to 30.",
            "You've chosen the 'Nymphomania' perk.  Due to the incredible amount of corruption you've been exposed to, you've begun to live in a state of minor constant arousal.  Your minimum lust will be increased by as much as 30 (If you already have minimum lust, the increase is 10-15).", false, true));
        this.add(new PerkDesc("Precision", "Precision",
            "Reduces enemy armor by 10. (Req's 25+ Intelligence)",
            "You've chosen the 'Precision' perk.  Thanks to your intelligence, you're now more adept at finding and striking an enemy's weak points, reducing their damage resistance from armor by 10.  If your intelligence ever drops below 25 you'll no longer be smart enough to benefit from this perk.", false, true));
        this.add(new PerkDesc("Regeneration", "Regeneration",
            "Regenerates 2% of max HP/hour and 1% of max HP/round.",
            "You choose the 'Regeneration' perk, allowing you to heal 2% of max HP every hour and 1% of max HP every round of combat!", false, true));
        this.add(new PerkDesc("Regeneration2", "Regeneration 2",
            "Gain 2% of max HP per round of combat and 4% of max HP per hour out of combat.",
            "You choose the 'Regeneration 2' perk, giving you an additional 2% of max HP per turn in combat and 4% of max HP per hour.", false, true));
        this.add(new PerkDesc("Resistance", "Resistance",
            "Reduces lust gain by 10%.",
            "You choose the 'Resistance' perk, reducing the rate at which your lust increases by 10%.", false, true));
        this.add(new PerkDesc("Resolute", "Resolute",
            "[if(player.tou>=75)" +
            "Grants immunity to stuns and some statuses.</b>" +
            "|" +
            "<b>You aren't tough enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Resolute' perk, granting immunity to stuns and some statuses.</b>", false, true));
        this.add(new PerkDesc("Runner", "Runner",
            "Increases chances of escaping combat.",
            "You choose the 'Runner' perk, increasing your chances to escape from your foes when fleeing!", false, true));
        this.add(new PerkDesc("Sadist", "Sadist",
            "Deal 20% more damage, but gain lust at the same time.",
            "You choose the 'Sadist' perk, increasing damage by 20 percent but causing you to gain lust from dealing damage.", false, true));
        this.add(new PerkDesc("Seduction", "Seduction",
            "Upgrades your tease attack, making it more effective.",
            "You choose the 'Seduction' perk, upgrading the 'tease' attack with a more powerful damage and a higher chance of success.", false, true));
        this.add(new PerkDesc("SpeedyRecovery", "Speedy Recovery",
            "Regain fatigue 50% faster.",
            "You choose the 'Speedy Recovery' perk, boosting your fatigue recovery rate!", false, true));
        this.add(new PerkDesc("Spellpower", "Spellpower",
            "Increases base spell strength by 50%.",
            "You choose the 'Spellpower' perk.  Thanks to your sizeable intellect and willpower, you are able to more effectively use magic, boosting base spell effects by 50%.", false, true));
        this.add(new PerkDesc("StrongBack", "Strong Back",
            "Enables fourth item slot.",
            "You choose the 'Strong Back' perk, enabling a fourth item slot.", false, true));
        this.add(new PerkDesc("StrongBack2", "Strong Back 2: Strong Harder",
            "Enables fifth item slot.",
            "You choose the 'Strong Back 2: Strong Harder' perk, enabling a fifth item slot.", false, true));
        this.add(new PerkDesc("Tactician", "Tactician",
            "[if(player.stats.int>=50)" +
            "Increases critical hit chance by up to 10% (Intelligence-based)." +
            "|" +
            "<b>You are too dumb to gain benefit from this perk.</b>" +
            "]",
            "You choose the 'Tactician' perk, increasing critical hit chance by up to 10% (Intelligence-based).", false, true));
        this.add(new PerkDesc("Tank", "Tank",
            "Raises max HP by 50.",
            "You choose the 'Tank' perk, giving you an additional 50 hp!", false, true));
        this.add(new PerkDesc("Tank2", "Tank 2",
            "+1 extra HP per point of toughness.",
            "You choose the 'Tank 2' perk, granting an extra maximum HP for each point of toughness.", false, true));
        this.add(new PerkDesc("ThunderousStrikes", "Thunderous Strikes",
            "+20% 'Attack' damage while strength is at or above 80.",
            "You choose the 'Thunderous Strikes' perk, increasing normal damage by 20% while your strength is over 80.", false, true));
        this.add(new PerkDesc("WeaponMastery", "Weapon Mastery",
            "[if(player.str>60)" +
            "Doubles damage bonus of weapons classified as 'Large'." +
            "|" +
            "<b>You aren't strong enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Weapon Mastery' perk, doubling the effectiveness of large weapons.", false, true));
        this.add(new PerkDesc("WellAdjusted", "Well Adjusted",
            "You gain half as much lust as time passes in Mareth.",
            "You choose the 'Well Adjusted' perk, reducing the amount of lust you naturally gain over time while in this strange land!", false, true));

        // Needlework perks
        this.add(new PerkDesc("ChiReflowAttack", "Chi Reflow - Attack", "Chi Reflow - Attack",
            "Regular attacks boosted, but damage resistance decreased.", false, true));
        this.add(new PerkDesc("ChiReflowDefense", "Chi Reflow - Defense", "Chi Reflow - Defense",
            "Passive damage resistance, but caps speed", false, true));
        this.add(new PerkDesc("ChiReflowLust", "Chi Reflow - Lust", "Chi Reflow - Lust",
            "Lust resistance and Tease are enhanced, but Libido and Sensitivity gains increased.", false, true));
        this.add(new PerkDesc("ChiReflowMagic", "Chi Reflow - Magic", "Chi Reflow - Magic",
            "Magic attacks boosted, but regular attacks are weaker.", false, true));
        this.add(new PerkDesc("ChiReflowSpeed", "Chi Reflow - Speed", "Chi Reflow - Speed",
            "Speed reductions are halved but caps strength", false, true));

        // Piercing perks
        this.add(new PiercedCrimstonePerk());
        this.add(new PiercedFertitePerk());
        this.add(new PerkDesc("PiercedFurrite", "Pierced: Furrite", "Pierced: Furrite",
            "Increases chances of encountering 'furry' foes.", false, true));
        this.add(new PerkDesc("PiercedLethite", "Pierced: Lethite", "Pierced: Lethite",
            "Increases chances of encountering demonic foes.", false, true));

        // Cock sock perks
        this.add(new PerkDesc("LustyRegeneration", "Lusty Regeneration", "Lusty Regeneration",
            "Regenerates 1% of HP per round in combat and 2% of HP per hour.", false, true));
        this.add(new PerkDesc("MidasCock", "Midas Cock", "Midas Cock",
            "Increases the gems awarded from victory in battle.", false, true));
        this.add(new PentUpPerk());
        this.add(new PerkDesc("PhallicPotential", "Phallic Potential", "Phallic Potential",
            "Increases the effects of penis-enlarging transformations.", false, true));
        this.add(new PerkDesc("PhallicRestraint", "Phallic Restraint", "Phallic Restraint",
            "Reduces the effects of penis-enlarging transformations.", false, true));

        // Armor perks
        this.add(new PerkDesc("BloodMage", "Blood Mage", "Blood Mage",
            "Spellcasting now consumes health instead of fatigue!", false, true));
        this.add(new SluttySeductionPerk());
        this.add(new WizardsEndurancePerk());

        // Weapon perks
        this.add(new WizardsFocusPerk());

        // Achievement perks
        this.add(new PerkDesc("BroodMother", "Brood Mother", "Brood Mother",
            "Pregnancy moves twice as fast as a normal woman's.", false, true));
        this.add(new SpellcastingAffinityPerk());

        // Mutation perks
        this.add(new PerkDesc("Androgyny", "Androgyny", "Androgyny",
            "No gender limits on facial masculinity or femininity.", false, true));
        this.add(new PerkDesc("BasiliskWomb", "Basilisk Womb", "Basilisk Womb",
            "Enables your eggs to be properly fertilized into basilisks of both genders!", false, true));
        this.add(new PerkDesc("BeeOvipositor", "Bee Ovipositor", "Bee Ovipositor",
            "Allows you to lay eggs through a special organ on your insect abdomen, though you need at least 10 eggs to lay.", false, true));
        this.add(new PerkDesc("BimboBody", "Bimbo Body", "Bimbo Body",
            "Gives the body of a bimbo.  Tits will never stay below a 'DD' cup, libido is raised, lust resistance is raised, and upgrades tease.", false, true));
        this.add(new PerkDesc("BimboBrains", "Bimbo Brains", "Bimbo Brains",
            "Now that you've drank bimbo liquer, you'll never, like, have the attention span and intelligence you once did!  But it's okay, 'cause you get to be so horny an' stuff!", false, true));
        this.add(new PerkDesc("BroBody", "Bro Body", "Bro Body",
            "Grants an ubermasculine body that's sure to impress.", false, true));
        this.add(new PerkDesc("BroBrains", "Bro Brains", "Bro Brains",
            "Makes thou... thin... fuck, that shit's for nerds.", false, true));
        this.add(new PerkDesc("BunnyEggs", "Bunny Eggs", "Bunny Eggs",
            "Laying eggs has become a normal part of your bunny-body's routine.", false, true));
        this.add(new PerkDesc("CorruptedNinetails", "Corrupted Nine-tails", "Corrupted Nine-tails",
            "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells, but your method of attaining it has corrupted the transformation, preventing you from achieving true enlightenment.", false, true));
        this.add(new PerkDesc("Diapause", "Diapause", "Diapause",
            "Pregnancy does not advance normally, but develops quickly after taking in fluids.", false, true));
        this.add(new PerkDesc("Dragonfire", "Dragonfire", "Dragonfire",
            "Allows access to a dragon breath attack.", false, true));
        this.add(new PerkDesc("EnlightenedNinetails", "Enlightened Nine-tails", "Enlightened Nine-tails",
            "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells.", false, true));
        this.add(new PerkDesc("Feeder", "Feeder", "Feeder",
            "Lactation does not decrease and gives a compulsion to breastfeed others.", false, true));
        this.add(new PerkDesc("Flexibility", "Flexibility", "Flexibility",
            "Grants cat-like flexibility.  Useful for dodging and 'fun'.", false, true));
        this.add(new PerkDesc("FutaFaculties", "Futa Faculties", "Futa Faculties",
            "It's super hard to think about stuff that like, isn't working out or fucking!", false, true));
        this.add(new PerkDesc("FutaForm", "Futa Form", "Futa Form",
            "Ensures that your body fits the Futa look (Tits DD+, Dick 8\"+, & Pussy).  Also keeps your lusts burning bright and improves the tease skill.", false, true));
        this.add(new PerkDesc("HarpyWomb", "Harpy Womb", "Harpy Womb",
            "Increases all laid eggs to large size so long as you have harpy legs and a harpy tail.", false, true));
        this.add(new PerkDesc("Incorporeality", "Incorporeality", "Incorporeality",
            "Allows you to fade into a ghost-like state and temporarily possess others.", false, true));
        this.add(new PerkDesc("MinotaurCumAddict", "Minotaur Cum Addict", "Minotaur Cum Addict",
            "Causes you to crave minotaur cum frequently.  You cannot shake this addiction.", false, true));
        this.add(new PerkDesc("Oviposition", "Oviposition", "Oviposition",
            "Causes you to regularly lay eggs when not otherwise pregnant.", false, true));
        this.add(new PerkDesc("PurityBlessing", "Purity Blessing", "Purity Blessing",
            "Reduces the rate at which your corruption, libido, and lust increase.", false, true));
        this.add(new PerkDesc("SlimeCore", "Slime Core", "Slime Core",
            "Grants more control over your slimy body, allowing you to go twice as long without fluids.", false, true));
        this.add(new PerkDesc("SpiderOvipositor", "Spider Ovipositor", "Spider Ovipositor",
            "Allows you to lay eggs through a special organ on your arachnid abdomen, though you need at least 10 eggs to lay.", false, true));
        this.add(new PerkDesc("ThickSkin", "Thick Skin", "Thick Skin",
            "Toughens your dermis to provide 2 points of armor.", false, true));

        // Quest, Event & NPC perks
        this.add(new PerkDesc("BulgeArmor", "Bulge Armor", "Bulge Armor",
            "Grants a 5 point damage bonus to dick-based tease attacks.", false, true));
        this.add(new PerkDesc("Cornucopia", "Cornucopia", "Cornucopia",
            "Vaginal and Anal capacities increased by 30.", false, true));
        this.add(new ElvenBountyPerk());
        this.add(new PerkDesc("FerasBoonAlpha", "Fera's Boon - Alpha", "Fera's Boon - Alpha",
            "Increases the rate your cum builds up and cum production in general.", false, true));
        this.add(new PerkDesc("FerasBoonBreedingBitch", "Fera's Boon - Breeding Bitch", "Fera's Boon - Breeding Bitch",
            "Increases fertility and reduces the time it takes to birth young.", false, true));
        this.add(new PerkDesc("FerasBoonMilkingTwat", "Fera's Boon - Milking Twat",
            "Keeps your pussy from ever getting too loose and increases pregnancy speed.",
            "Keeps your pussy from ever getting too loose and increases pregnancy speed.", false, true));
        this.add(new PerkDesc("FerasBoonSeeder", "Fera's Boon - Seeder",
            "Increases cum output by 1,000 mLs.",
            "Increases cum output by 1,000 mLs.", false, true));
        this.add(new PerkDesc("FerasBoonWideOpen", "Fera's Boon - Wide Open",
            "Keeps your pussy permanently gaped and increases pregnancy speed.",
            "Keeps your pussy permanently gaped and increases pregnancy speed.", false, true));
        this.add(new PerkDesc("FireLord", "Fire Lord", "Fire Lord",
            "Akbal's blessings grant the ability to breathe burning green flames.", false, true));
        this.add(new PerkDesc("Hellfire", "Hellfire", "Hellfire",
            "Grants a corrupted fire breath attack, like the hellhounds in the mountains.", false, true));
        this.add(new PerkDesc("LuststickAdapted", "Luststick Adapted", "Luststick Adapted",
            "Grants immunity to the lust-increasing effects of lust-stick and allows its use.", false, true));
        this.add(new PerkDesc("MagicalFertility", "Magical Fertility",
            "10% higher chance of pregnancy and increased pregnancy speed.",
            "10% higher chance of pregnancy and increased pregnancy speed.", false, true));
        this.add(new PerkDesc("MagicalVirility", "Magical Virility",
            "200 mLs more cum per orgasm and enhanced virility.",
            "200 mLs more cum per orgasm and enhanced virility.", false, true));
        this.add(new PerkDesc("MaraesGiftButtslut", "Marae's Gift - Buttslut", "Marae's Gift - Buttslut",
            "Makes your anus provide lubrication when aroused.", false, true));
        this.add(new PerkDesc("MaraesGiftFertility", "Marae's Gift - Fertility", "Marae's Gift - Fertility",
            "Greatly increases fertility and halves base pregnancy speed.", false, true));
        this.add(new PerkDesc("MaraesGiftProfractory", "Marae's Gift - Profractory", "Marae's Gift - Profractory",
            "Causes your cum to build up at 3x the normal rate.", false, true));
        this.add(new PerkDesc("MaraesGiftStud", "Marae's Gift - Stud", "Marae's Gift - Stud",
            "Increases your cum production and potency greatly.", false, true));
        this.add(new PerkDesc("MarbleResistant", "Marble Resistant", "Marble Resistant",
            "Provides resistance to the addictive effects of bottled LaBova milk.", false, true));
        this.add(new PerkDesc("MarblesMilk", "Marble's Milk", "Marble's Milk",
            "Requires you to drink LaBova milk frequently or eventually die.  You cannot shake this addiction.", false, true));
        this.add(new PerkDesc("Misdirection", "Misdirection", "Misdirection",
            "Grants additional evasion chances while wearing Raphael's red bodysuit.", false, true));
        this.add(new PerkDesc("OmnibusGift", "Omnibus' Gift", "Omnibus' Gift",
            "Increases minimum lust but provides some lust resistance.", false, true));
        this.add(new PerkDesc("OneTrackMind", "One Track Mind", "One Track Mind",
            "Your constant desire for sex causes your sexual organs to be able to take larger insertions and disgorge greater amounts of fluid.", false, true));
        this.add(new PerkDesc("PilgrimsBounty", "Pilgrim's Bounty", "Pilgrim's Bounty",
            "Causes you to always cum as hard as if you had max lust.", false, true));
        this.add(new PerkDesc("PureAndLoving", "Pure and Loving", "Pure and Loving",
            "Your caring attitude towards love and romance makes you slightly more resistant to lust and corruption.", false, true));
        this.add(new PerkDesc("SensualLover", "Sensual Lover", "Sensual Lover",
            "Your sensual attitude towards love and romance makes your tease ability slightly more effective.", false, true));
        this.add(new PerkDesc("Whispered", "Whispered", "Whispered",
            "Akbal's blessings grant limited telepathy that can induce fear.", false, true));

        this.add(new ControlledBreathPerk());
        this.add(new CleansingPalmPerk());
        this.add(new EnlightenedPerk());


        // Monster perks
        this.add(new PerkDesc("Acid", "Acid", "Acid", "", false, true));

    }
}