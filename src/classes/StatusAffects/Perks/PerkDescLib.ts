import PerkDesc from "./PerkDesc"
import CleansingPalmPerk from "./CleansingPalmPerk"
import ControlledBreathPerk from "./ControlledBreathPerk"
import ElvenBountyPerk from "./ElvenBountyPerk"
import EnlightenedPerk from "./EnlightenedPerk"
import PentUpPerk from "./PentUpPerk"
import PiercedCrimstonePerk from "./PiercedCrimstonePerk"
import PiercedFertitePerk from "./PiercedFertitePerk"
import SluttySeductionPerk from "./SluttySeductionPerk"
import SpellcastingAffinityPerk from "./SpellcastingAffinityPerk"
import WizardsEndurancePerk from "./WizardsEndurancePerk"
import WizardsFocusPerk from "./WizardsFocusPerk"
import Library from "../Utilities/Library";

export default class PerkLib extends Library<PerkDesc>{
    public constructor() {
        super();
        this.add(new PerkDesc("Brawler", "Brawler",
            "Brawling experience allows you to make two unarmed attacks in a turn.",
            "You choose the 'Brawler' perk, allowing you to make two unarmed attacks in a turn!"));
        this.add(new PerkDesc("Buttslut", "Buttslut", ""));
        this.add(new PerkDesc("Focused", "Focused", ""));

        // Player creation perks
        this.add(new PerkDesc("Fast", "Fast", "Gains speed 25% faster."));
        this.add(new PerkDesc("Lusty", "Lusty", "Gains lust 25% faster."));
        this.add(new PerkDesc("Sensitive", "Sensitive", "Gains sensitivity 25% faster."));
        this.add(new PerkDesc("Smart", "Smart", "Gains intelligence 25% faster."));
        this.add(new PerkDesc("Strong", "Strong", "Gains strength 25% faster."));
        this.add(new PerkDesc("Tough", "Tough", "Gains toughness 25% faster."));

        // Female creation perks
        this.add(new PerkDesc("Big Clit", "Big Clit",
            "Allows your clit to grow larger more easily and faster."));
        this.add(new PerkDesc("Big Tits", "Big Tits",
            "Makes your tits grow larger more easily."));
        this.add(new PerkDesc("Fertile", "Fertile",
            "Makes you 15% more likely to become pregnant."));
        this.add(new PerkDesc("Wet Pussy", "Wet Pussy",
            "Keeps your pussy wet and provides a bonus to capacity."));

        // Male creation perks
        this.add(new PerkDesc("Big Cock", "Big Cock",
            "Gains cock size 25% faster and with less limitations."));
        this.add(new PerkDesc("Messy Orgasms", "Messy Orgasms",
            "Produces 50% more cum volume."));

        // History perks
        this.add(new PerkDesc("History: Alchemist", "History: Alchemist",
            "Alchemical experience makes items more reactive to your body."));
        this.add(new PerkDesc("History: Fighter", "History: Fighter",
            "A Past full of conflict increases physical damage dealt by 10%."));
        this.add(new PerkDesc("History: Healer", "History: Healer",
            "Healing experience increases HP gains by 20%."));
        this.add(new PerkDesc("History: Religious", "History: Religious",
            "Replaces masturbate with meditate when corruption less than or equal to 66."));
        this.add(new PerkDesc("History: Scholar", "History: Scholar",
            "Time spent focusing your mind makes spellcasting 20% less fatiguing."));
        this.add(new PerkDesc("History: Slacker", "History: Slacker",
            "Regenerate fatigue 20% faster."));
        this.add(new PerkDesc("History: Slut", "History: Slut",
            "Sexual experience has made you more able to handle large insertions and more resistant to stretching."));
        this.add(new PerkDesc("History: Smith", "History: Smith",
            "Knowledge of armor and fitting increases armor effectiveness by roughly 10%."));
        this.add(new PerkDesc("History: Whore", "History: Whore",
            "Seductive experience causes your tease attacks to be 15% more effective."));

        // Ordinary (levelup) perks
        this.add(new PerkDesc("Acclimation", "Acclimation",
            "Reduces lust gain by 15%.",
            "You choose the 'Acclimation' perk, making your body 15% more resistant to lust, up to a maximum of 75%."));
        this.add(new PerkDesc("Agility", "Agility",
            "Boosts armor points by a portion of your speed on light/medium armors.",
            "You choose the 'Agility' perk, increasing the effectiveness of Light/Medium armors by a portion of your speed."));
        this.add(new PerkDesc("Archmage", "Archmage",
            "[if (player.stats.int>=75)" +
            "Increases base spell strength by 50%." +
            "|" +
            "<b>You are too dumb to gain benefit from this perk.</b>" +
            "]",
            "You choose the 'Archmage' perk, increasing base spell strength by 50%."));
        this.add(new PerkDesc("Arousing Aura", "Arousing Aura",
            "Exude a lust-inducing aura (Req's corruption of 70 or more)",
            "You choose the 'Arousing Aura' perk, causing you to radiate an aura of lust when your corruption is over 70."));
        this.add(new PerkDesc("Berzerker", "Berzerker",
            "[if(player.str>=75)" +
            "Grants 'Berzerk' ability." +
            "|" +
            "<b>You aren't strong enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Berzerker' perk, which unlocks the 'Berzerk' magical ability.  Berzerking increases attack and lust resistance but reduces physical defenses."));
        this.add(new PerkDesc("Brutal Blows", "Brutal Blows",
            "[if(player.str>=75)" +
            "Reduces enemy armor with each hit." +
            "|" +
            "<b>You aren't strong enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Brutal Blows' perk, which reduces enemy armor with each hit."));
        this.add(new PerkDesc("Channeling", "Channeling",
            "Increases base spell strength by 50%.",
            "You choose the 'Channeling' perk, boosting the strength of your spellcasting!"));
        this.add(new PerkDesc("Corrupted Libido", "Corrupted Libido",
            "Reduces lust gain by 10%.",
            "You choose the 'Corrupted Libido' perk.  As a result of your body's corruption, you've become a bit harder to turn on. (Lust gain reduced by 10%!)"));
        this.add(new PerkDesc("Double Attack", "Double Attack",
            "[if (player.stats.spe<50)" +
            "<b>You're too slow to double attack!</b>" +
            "|[if(player.str<61)" +
            "Allows you to perform two melee attacks per round." +
            "|" +
            "<b>You are stronger than double attack allows.  To choose between reduced strength double-attacks and a single strong attack, access \"Dbl Options\" in the perks menu.</b>" +
            "]]",
            "You choose the 'Double Attack' perk.  This allows you to make two attacks so long as your strength is at 60 or below.  By default your effective strength will be reduced to 60 if it is too high when double attacking.  <b>You can enter the perks menu at any time to toggle options as to how you will use this perk.</b>"));
        this.add(new PerkDesc("Evade", "Evade",
            "Increases chances of evading enemy attacks.",
            "You choose the 'Evade' perk, allowing you to avoid enemy attacks more often!"));
        this.add(new PerkDesc("Fertility+", "Fertility+",
            "Increases fertility rating by 15 and cum volume by up to 50%.",
            "You choose the 'Fertility+' perk, making it easier to get pregnant.  It also increases your cum volume by up to 50% (if appropriate)!"));
        this.add(new PerkDesc("Hot Blooded", "Hot Blooded",
            "Raises minimum lust by up to 20.",
            "You choose the 'Hot Blooded' perk.  As a result of your enhanced libido, your lust no longer drops below 20! (If you already have some minimum lust, it will be increased by 10)"));
        this.add(new PerkDesc("Immovable Object", "Immovable Object",
            "[if(player.tou>=75)" +
            "Grants 20% physical damage reduction.</b>" +
            "|" +
            "<b>You aren't tough enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Immovable Object' perk, granting 20% physical damage reduction.</b>"));
        this.add(new PerkDesc("Iron Man", "Iron Man",
            "Reduces the fatigue cost of physical specials by 50%.",
            "You choose the 'Iron Man' perk, reducing the fatigue cost of physical special attacks by 50%"));
        this.add(new PerkDesc("Lightning Strikes", "Lightning Strikes",
            "[if(player.stats.spe>=60)" +
            "Increases the attack damage for non-heavy weapons.</b>" +
            "|" +
            "<b>You are too slow to benefit from this perk.</b>" +
            "]",
            "You choose the 'Lightning Strikes' perk, increasing the attack damage for non-heavy weapons.</b>"));
        this.add(new PerkDesc("Lunging Attacks", "Lunging Attacks",
            "[if(player.stats.spe>=75)" +
            "Grants 50% armor penetration for standard attacks." +
            "|" +
            "<b>You are too slow to benefit from this perk.</b>" +
            "]",
            "You choose the 'Lunging Attacks' perk, granting 50% armor penetration for standard attacks."));
        this.add(new PerkDesc("Mage", "Mage",
            "Increases base spell strength by 50%.",
            "You choose the 'Mage' perk.  You are able to focus your magical abilities even more keenly, boosting your base spell effects by 50%."));
        this.add(new PerkDesc("Masochist", "Masochist",
            "Take 30% less physical damage but gain lust when damage.",
            "You choose the 'Masochist' perk, reducing the damage you take but raising your lust each time!  This perk only functions while your libido is at or above 60!"));
        this.add(new PerkDesc("Medicine", "Medicine",
            "Grants 15% chance per round of cleansing poisons/drugs from your body.",
            "You choose the 'Medicine' perk, giving you a chance to remove debilitating poisons automatically!"));
        this.add(new PerkDesc("Nymphomania", "Nymphomania",
            "Raises minimum lust by up to 30.",
            "You've chosen the 'Nymphomania' perk.  Due to the incredible amount of corruption you've been exposed to, you've begun to live in a state of minor constant arousal.  Your minimum lust will be increased by as much as 30 (If you already have minimum lust, the increase is 10-15)."));
        this.add(new PerkDesc("Precision", "Precision",
            "Reduces enemy armor by 10. (Req's 25+ Intelligence)",
            "You've chosen the 'Precision' perk.  Thanks to your intelligence, you're now more adept at finding and striking an enemy's weak points, reducing their damage resistance from armor by 10.  If your intelligence ever drops below 25 you'll no longer be smart enough to benefit from this perk."));
        this.add(new PerkDesc("Regeneration", "Regeneration",
            "Regenerates 2% of max HP/hour and 1% of max HP/round.",
            "You choose the 'Regeneration' perk, allowing you to heal 2% of max HP every hour and 1% of max HP every round of combat!"));
        this.add(new PerkDesc("Regeneration 2", "Regeneration 2",
            "Gain 2% of max HP per round of combat and 4% of max HP per hour out of combat.",
            "You choose the 'Regeneration 2' perk, giving you an additional 2% of max HP per turn in combat and 4% of max HP per hour."));
        this.add(new PerkDesc("Resistance", "Resistance",
            "Reduces lust gain by 10%.",
            "You choose the 'Resistance' perk, reducing the rate at which your lust increases by 10%."));
        this.add(new PerkDesc("Resolute", "Resolute",
            "[if(player.tou>=75)" +
            "Grants immunity to stuns and some statuses.</b>" +
            "|" +
            "<b>You aren't tough enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Resolute' perk, granting immunity to stuns and some statuses.</b>"));
        this.add(new PerkDesc("Runner", "Runner",
            "Increases chances of escaping combat.",
            "You choose the 'Runner' perk, increasing your chances to escape from your foes when fleeing!"));
        this.add(new PerkDesc("Sadist", "Sadist",
            "Deal 20% more damage, but gain lust at the same time.",
            "You choose the 'Sadist' perk, increasing damage by 20 percent but causing you to gain lust from dealing damage."));
        this.add(new PerkDesc("Seduction", "Seduction",
            "Upgrades your tease attack, making it more effective.",
            "You choose the 'Seduction' perk, upgrading the 'tease' attack with a more powerful damage and a higher chance of success."));
        this.add(new PerkDesc("Speedy Recovery", "Speedy Recovery",
            "Regain fatigue 50% faster.",
            "You choose the 'Speedy Recovery' perk, boosting your fatigue recovery rate!"));
        this.add(new PerkDesc("Spellpower", "Spellpower",
            "Increases base spell strength by 50%.",
            "You choose the 'Spellpower' perk.  Thanks to your sizeable intellect and willpower, you are able to more effectively use magic, boosting base spell effects by 50%."));
        this.add(new PerkDesc("Strong Back", "Strong Back",
            "Enables fourth item slot.",
            "You choose the 'Strong Back' perk, enabling a fourth item slot."));
        this.add(new PerkDesc("Strong Back 2: Strong Harder", "Strong Back 2: Strong Harder",
            "Enables fifth item slot.",
            "You choose the 'Strong Back 2: Strong Harder' perk, enabling a fifth item slot."));
        this.add(new PerkDesc("Tactician", "Tactician",
            "[if(player.stats.int>=50)" +
            "Increases critical hit chance by up to 10% (Intelligence-based)." +
            "|" +
            "<b>You are too dumb to gain benefit from this perk.</b>" +
            "]",
            "You choose the 'Tactician' perk, increasing critical hit chance by up to 10% (Intelligence-based)."));
        this.add(new PerkDesc("Tank", "Tank",
            "Raises max HP by 50.",
            "You choose the 'Tank' perk, giving you an additional 50 hp!"));
        this.add(new PerkDesc("Tank 2", "Tank 2",
            "+1 extra HP per point of toughness.",
            "You choose the 'Tank 2' perk, granting an extra maximum HP for each point of toughness."));
        this.add(new PerkDesc("Thunderous Strikes", "Thunderous Strikes",
            "+20% 'Attack' damage while strength is at or above 80.",
            "You choose the 'Thunderous Strikes' perk, increasing normal damage by 20% while your strength is over 80."));
        this.add(new PerkDesc("Weapon Mastery", "Weapon Mastery",
            "[if(player.str>60)" +
            "Doubles damage bonus of weapons classified as 'Large'." +
            "|" +
            "<b>You aren't strong enough to benefit from this anymore.</b>" +
            "]",
            "You choose the 'Weapon Mastery' perk, doubling the effectiveness of large weapons."));
        this.add(new PerkDesc("Well Adjusted", "Well Adjusted",
            "You gain half as much lust as time passes in Mareth.",
            "You choose the 'Well Adjusted' perk, reducing the amount of lust you naturally gain over time while in this strange land!"));

        // Needlework perks
        this.add(new PerkDesc("Chi Reflow - Attack", "Chi Reflow - Attack",
            "Regular attacks boosted, but damage resistance decreased."));
        this.add(new PerkDesc("Chi Reflow - Defense", "Chi Reflow - Defense",
            "Passive damage resistance, but caps speed"));
        this.add(new PerkDesc("Chi Reflow - Lust", "Chi Reflow - Lust",
            "Lust resistance and Tease are enhanced, but Libido and Sensitivity gains increased."));
        this.add(new PerkDesc("Chi Reflow - Magic", "Chi Reflow - Magic",
            "Magic attacks boosted, but regular attacks are weaker."));
        this.add(new PerkDesc("Chi Reflow - Speed", "Chi Reflow - Speed",
            "Speed reductions are halved but caps strength"));

        // Piercing perks
        this.add(new PiercedCrimstonePerk());
        this.add(new PiercedFertitePerk());
        this.add(new PerkDesc("Pierced: Furrite", "Pierced: Furrite",
            "Increases chances of encountering 'furry' foes."));
        this.add(new PerkDesc("Pierced: Lethite", "Pierced: Lethite",
            "Increases chances of encountering demonic foes."));

        // Cock sock perks
        this.add(new PerkDesc("Lusty Regeneration", "Lusty Regeneration",
            "Regenerates 1% of HP per round in combat and 2% of HP per hour."));
        this.add(new PerkDesc("Midas Cock", "Midas Cock",
            "Increases the gems awarded from victory in battle."));
        this.add(new PentUpPerk());
        this.add(new PerkDesc("Phallic Potential", "Phallic Potential",
            "Increases the effects of penis-enlarging transformations."));
        this.add(new PerkDesc("Phallic Restraint", "Phallic Restraint",
            "Reduces the effects of penis-enlarging transformations."));

        // Armor perks
        this.add(new PerkDesc("Blood Mage", "Blood Mage",
            "Spellcasting now consumes health instead of fatigue!"));
        this.add(new SluttySeductionPerk());
        this.add(new WizardsEndurancePerk());

        // Weapon perks
        this.add(new WizardsFocusPerk());

        // Achievement perks
        this.add(new PerkDesc("Brood Mother", "Brood Mother",
            "Pregnancy moves twice as fast as a normal woman's."));
        this.add(new SpellcastingAffinityPerk());

        // Mutation perks
        this.add(new PerkDesc("Androgyny", "Androgyny",
            "No gender limits on facial masculinity or femininity."));
        this.add(new PerkDesc("Basilisk Womb", "Basilisk Womb",
            "Enables your eggs to be properly fertilized into basilisks of both genders!"));
        this.add(new PerkDesc("Bee Ovipositor", "Bee Ovipositor",
            "Allows you to lay eggs through a special organ on your insect abdomen, though you need at least 10 eggs to lay."));
        this.add(new PerkDesc("Bimbo Body", "Bimbo Body",
            "Gives the body of a bimbo.  Tits will never stay below a 'DD' cup, libido is raised, lust resistance is raised, and upgrades tease."));
        this.add(new PerkDesc("Bimbo Brains", "Bimbo Brains",
            "Now that you've drank bimbo liquer, you'll never, like, have the attention span and intelligence you once did!  But it's okay, 'cause you get to be so horny an' stuff!"));
        this.add(new PerkDesc("Bro Body", "Bro Body",
            "Grants an ubermasculine body that's sure to impress."));
        this.add(new PerkDesc("Bro Brains", "Bro Brains",
            "Makes thou... thin... fuck, that shit's for nerds."));
        this.add(new PerkDesc("Bunny Eggs", "Bunny Eggs",
            "Laying eggs has become a normal part of your bunny-body's routine."));
        this.add(new PerkDesc("Corrupted Nine-tails", "Corrupted Nine-tails",
            "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells, but your method of attaining it has corrupted the transformation, preventing you from achieving true enlightenment."));
        this.add(new PerkDesc("Diapause", "Diapause",
            "Pregnancy does not advance normally, but develops quickly after taking in fluids."));
        this.add(new PerkDesc("Dragonfire", "Dragonfire",
            "Allows access to a dragon breath attack."));
        this.add(new PerkDesc("Enlightened Nine-tails", "Enlightened Nine-tails",
            "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells."));
        this.add(new PerkDesc("Feeder", "Feeder",
            "Lactation does not decrease and gives a compulsion to breastfeed others."));
        this.add(new PerkDesc("Flexibility", "Flexibility",
            "Grants cat-like flexibility.  Useful for dodging and 'fun'."));
        this.add(new PerkDesc("Futa Faculties", "Futa Faculties",
            "It's super hard to think about stuff that like, isn't working out or fucking!"));
        this.add(new PerkDesc("Futa Form", "Futa Form",
            "Ensures that your body fits the Futa look (Tits DD+, Dick 8\"+, & Pussy).  Also keeps your lusts burning bright and improves the tease skill."));
        this.add(new PerkDesc("Harpy Womb", "Harpy Womb",
            "Increases all laid eggs to large size so long as you have harpy legs and a harpy tail."));
        this.add(new PerkDesc("Incorporeality", "Incorporeality",
            "Allows you to fade into a ghost-like state and temporarily possess others."));
        this.add(new PerkDesc("Minotaur Cum Addict", "Minotaur Cum Addict",
            "Causes you to crave minotaur cum frequently.  You cannot shake this addiction."));
        this.add(new PerkDesc("Oviposition", "Oviposition",
            "Causes you to regularly lay eggs when not otherwise pregnant."));
        this.add(new PerkDesc("Purity Blessing", "Purity Blessing",
            "Reduces the rate at which your corruption, libido, and lust increase."));
        this.add(new PerkDesc("Slime Core", "Slime Core",
            "Grants more control over your slimy body, allowing you to go twice as long without fluids."));
        this.add(new PerkDesc("Spider Ovipositor", "Spider Ovipositor",
            "Allows you to lay eggs through a special organ on your arachnid abdomen, though you need at least 10 eggs to lay."));
        this.add(new PerkDesc("Thick Skin", "Thick Skin",
            "Toughens your dermis to provide 2 points of armor."));

        // Quest, Event & NPC perks
        this.add(new PerkDesc("Bulge Armor", "Bulge Armor",
            "Grants a 5 point damage bonus to dick-based tease attacks."));
        this.add(new PerkDesc("Cornucopia", "Cornucopia",
            "Vaginal and Anal capacities increased by 30."));
        this.add(new ElvenBountyPerk());
        this.add(new PerkDesc("Fera's Boon - Alpha", "Fera's Boon - Alpha",
            "Increases the rate your cum builds up and cum production in general."));
        this.add(new PerkDesc("Fera's Boon - Breeding Bitch", "Fera's Boon - Breeding Bitch",
            "Increases fertility and reduces the time it takes to birth young."));
        this.add(new PerkDesc("Fera's Boon - Milking Twat", "Fera's Boon - Milking Twat",
            "Keeps your pussy from ever getting too loose and increases pregnancy speed.",
            "Keeps your pussy from ever getting too loose and increases pregnancy speed."));
        this.add(new PerkDesc("Fera's Boon - Seeder", "Fera's Boon - Seeder",
            "Increases cum output by 1,000 mLs.",
            "Increases cum output by 1,000 mLs."));
        this.add(new PerkDesc("Fera's Boon - Wide Open", "Fera's Boon - Wide Open",
            "Keeps your pussy permanently gaped and increases pregnancy speed.",
            "Keeps your pussy permanently gaped and increases pregnancy speed."));
        this.add(new PerkDesc("Fire Lord", "Fire Lord",
            "Akbal's blessings grant the ability to breathe burning green flames."));
        this.add(new PerkDesc("Hellfire", "Hellfire",
            "Grants a corrupted fire breath attack, like the hellhounds in the mountains."));
        this.add(new PerkDesc("Luststick Adapted", "Luststick Adapted",
            "Grants immunity to the lust-increasing effects of lust-stick and allows its use."));
        this.add(new PerkDesc("Magical Fertility", "Magical Fertility",
            "10% higher chance of pregnancy and increased pregnancy speed.",
            "10% higher chance of pregnancy and increased pregnancy speed."));
        this.add(new PerkDesc("Magical Virility", "Magical Virility",
            "200 mLs more cum per orgasm and enhanced virility.",
            "200 mLs more cum per orgasm and enhanced virility."));
        this.add(new PerkDesc("Marae's Gift - Buttslut", "Marae's Gift - Buttslut",
            "Makes your anus provide lubrication when aroused."));
        this.add(new PerkDesc("Marae's Gift - Fertility", "Marae's Gift - Fertility",
            "Greatly increases fertility and halves base pregnancy speed."));
        this.add(new PerkDesc("Marae's Gift - Profractory", "Marae's Gift - Profractory",
            "Causes your cum to build up at 3x the normal rate."));
        this.add(new PerkDesc("Marae's Gift - Stud", "Marae's Gift - Stud",
            "Increases your cum production and potency greatly."));
        this.add(new PerkDesc("Marble Resistant", "Marble Resistant",
            "Provides resistance to the addictive effects of bottled LaBova milk."));
        this.add(new PerkDesc("Marble's Milk", "Marble's Milk",
            "Requires you to drink LaBova milk frequently or eventually die.  You cannot shake this addiction."));
        this.add(new PerkDesc("Misdirection", "Misdirection",
            "Grants additional evasion chances while wearing Raphael's red bodysuit."));
        this.add(new PerkDesc("Omnibus' Gift", "Omnibus' Gift",
            "Increases minimum lust but provides some lust resistance."));
        this.add(new PerkDesc("One Track Mind", "One Track Mind",
            "Your constant desire for sex causes your sexual organs to be able to take larger insertions and disgorge greater amounts of fluid."));
        this.add(new PerkDesc("Pilgrim's Bounty", "Pilgrim's Bounty",
            "Causes you to always cum as hard as if you had max lust."));
        this.add(new PerkDesc("Pure and Loving", "Pure and Loving",
            "Your caring attitude towards love and romance makes you slightly more resistant to lust and corruption."));
        this.add(new PerkDesc("Sensual Lover", "Sensual Lover",
            "Your sensual attitude towards love and romance makes your tease ability slightly more effective."));
        this.add(new PerkDesc("Whispered", "Whispered",
            "Akbal's blessings grant limited telepathy that can induce fear."));

        this.add(new ControlledBreathPerk());
        this.add(new CleansingPalmPerk());
        this.add(new EnlightenedPerk());

        // Monster
        this.add(new PerkDesc("Acid", "Acid", ""));
    }

    /*
    // UNSORTED perks TODO these are mostly incorrect perks: tested but never created
    public static Brawler: PerkDesc = new PerkDesc("Brawler", "Brawler",
        "Brawling experience allows you to make two unarmed attacks in a turn.",
        "You choose the 'Brawler' perk, allowing you to make two unarmed attacks in a turn!");
    public static Buttslut: PerkDesc = new PerkDesc("Buttslut", "Buttslut",
        "");
    public static Focused: PerkDesc = new PerkDesc("Focused", "Focused",
        "");

    // Player creation perks
    public static Fast: PerkDesc = new PerkDesc("Fast", "Fast",
        "Gains speed 25% faster.");
    public static Lusty: PerkDesc = new PerkDesc("Lusty", "Lusty",
        "Gains lust 25% faster.");
    public static Sensitive: PerkDesc = new PerkDesc("Sensitive", "Sensitive",
        "Gains sensitivity 25% faster.");
    public static Smart: PerkDesc = new PerkDesc("Smart", "Smart",
        "Gains intelligence 25% faster.");
    public static Strong: PerkDesc = new PerkDesc("Strong", "Strong",
        "Gains strength 25% faster.");
    public static Tough: PerkDesc = new PerkDesc("Tough", "Tough",
        "Gains toughness 25% faster.");

    // Female creation perks
    public static BigClit: PerkDesc = new PerkDesc("Big Clit", "Big Clit",
        "Allows your clit to grow larger more easily and faster.");
    public static BigTits: PerkDesc = new PerkDesc("Big Tits", "Big Tits",
        "Makes your tits grow larger more easily.");
    public static Fertile: PerkDesc = new PerkDesc("Fertile", "Fertile",
        "Makes you 15% more likely to become pregnant.");
    public static WetPussy: PerkDesc = new PerkDesc("Wet Pussy", "Wet Pussy",
        "Keeps your pussy wet and provides a bonus to capacity.");

    // Male creation perks
    public static BigCock: PerkDesc = new PerkDesc("Big Cock", "Big Cock",
        "Gains cock size 25% faster and with less limitations.");
    public static MessyOrgasms: PerkDesc = new PerkDesc("Messy Orgasms", "Messy Orgasms",
        "Produces 50% more cum volume.");

    // History perks
    public static HistoryAlchemist: PerkDesc = new PerkDesc("History: Alchemist", "History: Alchemist",
        "Alchemical experience makes items more reactive to your body.");
    public static HistoryFighter: PerkDesc = new PerkDesc("History: Fighter", "History: Fighter",
        "A Past full of conflict increases physical damage dealt by 10%.");
    public static HistoryHealer: PerkDesc = new PerkDesc("History: Healer", "History: Healer",
        "Healing experience increases HP gains by 20%.");
    public static HistoryReligious: PerkDesc = new PerkDesc("History: Religious", "History: Religious",
        "Replaces masturbate with meditate when corruption less than or equal to 66.");
    public static HistoryScholar: PerkDesc = new PerkDesc("History: Scholar", "History: Scholar",
        "Time spent focusing your mind makes spellcasting 20% less fatiguing.");
    public static HistorySlacker: PerkDesc = new PerkDesc("History: Slacker", "History: Slacker",
        "Regenerate fatigue 20% faster.");
    public static HistorySlut: PerkDesc = new PerkDesc("History: Slut", "History: Slut",
        "Sexual experience has made you more able to handle large insertions and more resistant to stretching.");
    public static HistorySmith: PerkDesc = new PerkDesc("History: Smith", "History: Smith",
        "Knowledge of armor and fitting increases armor effectiveness by roughly 10%.");
    public static HistoryWhore: PerkDesc = new PerkDesc("History: Whore", "History: Whore",
        "Seductive experience causes your tease attacks to be 15% more effective.");

    // Ordinary (levelup) perks
    public static Acclimation: PerkDesc = new PerkDesc("Acclimation", "Acclimation",
        "Reduces lust gain by 15%.",
        "You choose the 'Acclimation' perk, making your body 15% more resistant to lust, up to a maximum of 75%.");
    public static Agility: PerkDesc = new PerkDesc("Agility", "Agility",
        "Boosts armor points by a portion of your speed on light/medium armors.",
        "You choose the 'Agility' perk, increasing the effectiveness of Light/Medium armors by a portion of your speed.");
    public static Archmage: PerkDesc = new PerkDesc("Archmage", "Archmage",
        "[if (player.stats.int>=75)" +
        "Increases base spell strength by 50%." +
        "|" +
        "<b>You are too dumb to gain benefit from this perk.</b>" +
        "]",
        "You choose the 'Archmage' perk, increasing base spell strength by 50%.");
    public static ArousingAura: PerkDesc = new PerkDesc("Arousing Aura", "Arousing Aura",
        "Exude a lust-inducing aura (Req's corruption of 70 or more)",
        "You choose the 'Arousing Aura' perk, causing you to radiate an aura of lust when your corruption is over 70.");
    public static Berzerker: PerkDesc = new PerkDesc("Berzerker", "Berzerker",
        "[if(player.str>=75)" +
        "Grants 'Berzerk' ability." +
        "|" +
        "<b>You aren't strong enough to benefit from this anymore.</b>" +
        "]",
        "You choose the 'Berzerker' perk, which unlocks the 'Berzerk' magical ability.  Berzerking increases attack and lust resistance but reduces physical defenses.");
    public static BrutalBlows: PerkDesc = new PerkDesc("Brutal Blows", "Brutal Blows",
        "[if(player.str>=75)" +
        "Reduces enemy armor with each hit." +
        "|" +
        "<b>You aren't strong enough to benefit from this anymore.</b>" +
        "]",
        "You choose the 'Brutal Blows' perk, which reduces enemy armor with each hit.");
    public static Channeling: PerkDesc = new PerkDesc("Channeling", "Channeling",
        "Increases base spell strength by 50%.",
        "You choose the 'Channeling' perk, boosting the strength of your spellcasting!");
    public static CorruptedLibido: PerkDesc = new PerkDesc("Corrupted Libido", "Corrupted Libido",
        "Reduces lust gain by 10%.",
        "You choose the 'Corrupted Libido' perk.  As a result of your body's corruption, you've become a bit harder to turn on. (Lust gain reduced by 10%!)");
    public static DoubleAttack: PerkDesc = new PerkDesc("Double Attack", "Double Attack",
        "[if (player.stats.spe<50)" +
        "<b>You're too slow to double attack!</b>" +
        "|[if(player.str<61)" +
        "Allows you to perform two melee attacks per round." +
        "|" +
        "<b>You are stronger than double attack allows.  To choose between reduced strength double-attacks and a single strong attack, access \"Dbl Options\" in the perks menu.</b>" +
        "]]",
        "You choose the 'Double Attack' perk.  This allows you to make two attacks so long as your strength is at 60 or below.  By default your effective strength will be reduced to 60 if it is too high when double attacking.  <b>You can enter the perks menu at any time to toggle options as to how you will use this perk.</b>");
    public static Evade: PerkDesc = new PerkDesc("Evade", "Evade",
        "Increases chances of evading enemy attacks.",
        "You choose the 'Evade' perk, allowing you to avoid enemy attacks more often!");
    public static FertilityPlus: PerkDesc = new PerkDesc("Fertility+", "Fertility+",
        "Increases fertility rating by 15 and cum volume by up to 50%.",
        "You choose the 'Fertility+' perk, making it easier to get pregnant.  It also increases your cum volume by up to 50% (if appropriate)!");
    public static HotBlooded: PerkDesc = new PerkDesc("Hot Blooded", "Hot Blooded",
        "Raises minimum lust by up to 20.",
        "You choose the 'Hot Blooded' perk.  As a result of your enhanced libido, your lust no longer drops below 20! (If you already have some minimum lust, it will be increased by 10)");
    public static ImmovableObject: PerkDesc = new PerkDesc("Immovable Object", "Immovable Object",
        "[if(player.tou>=75)" +
        "Grants 20% physical damage reduction.</b>" +
        "|" +
        "<b>You aren't tough enough to benefit from this anymore.</b>" +
        "]",
        "You choose the 'Immovable Object' perk, granting 20% physical damage reduction.</b>");
    public static IronMan: PerkDesc = new PerkDesc("Iron Man", "Iron Man",
        "Reduces the fatigue cost of physical specials by 50%.",
        "You choose the 'Iron Man' perk, reducing the fatigue cost of physical special attacks by 50%");
    public static LightningStrikes: PerkDesc = new PerkDesc("Lightning Strikes", "Lightning Strikes",
        "[if(player.stats.spe>=60)" +
        "Increases the attack damage for non-heavy weapons.</b>" +
        "|" +
        "<b>You are too slow to benefit from this perk.</b>" +
        "]",
        "You choose the 'Lightning Strikes' perk, increasing the attack damage for non-heavy weapons.</b>");
    public static LungingAttacks: PerkDesc = new PerkDesc("Lunging Attacks", "Lunging Attacks",
        "[if(player.stats.spe>=75)" +
        "Grants 50% armor penetration for standard attacks." +
        "|" +
        "<b>You are too slow to benefit from this perk.</b>" +
        "]",
        "You choose the 'Lunging Attacks' perk, granting 50% armor penetration for standard attacks.");
    public static Mage: PerkDesc = new PerkDesc("Mage", "Mage",
        "Increases base spell strength by 50%.",
        "You choose the 'Mage' perk.  You are able to focus your magical abilities even more keenly, boosting your base spell effects by 50%.");
    public static Masochist: PerkDesc = new PerkDesc("Masochist", "Masochist",
        "Take 30% less physical damage but gain lust when damage.",
        "You choose the 'Masochist' perk, reducing the damage you take but raising your lust each time!  This perk only functions while your libido is at or above 60!");
    public static Medicine: PerkDesc = new PerkDesc("Medicine", "Medicine",
        "Grants 15% chance per round of cleansing poisons/drugs from your body.",
        "You choose the 'Medicine' perk, giving you a chance to remove debilitating poisons automatically!");
    public static Nymphomania: PerkDesc = new PerkDesc("Nymphomania", "Nymphomania",
        "Raises minimum lust by up to 30.",
        "You've chosen the 'Nymphomania' perk.  Due to the incredible amount of corruption you've been exposed to, you've begun to live in a state of minor constant arousal.  Your minimum lust will be increased by as much as 30 (If you already have minimum lust, the increase is 10-15).");
    public static Precision: PerkDesc = new PerkDesc("Precision", "Precision",
        "Reduces enemy armor by 10. (Req's 25+ Intelligence)",
        "You've chosen the 'Precision' perk.  Thanks to your intelligence, you're now more adept at finding and striking an enemy's weak points, reducing their damage resistance from armor by 10.  If your intelligence ever drops below 25 you'll no longer be smart enough to benefit from this perk.");
    public static Regeneration: PerkDesc = new PerkDesc("Regeneration", "Regeneration",
        "Regenerates 2% of max HP/hour and 1% of max HP/round.",
        "You choose the 'Regeneration' perk, allowing you to heal 2% of max HP every hour and 1% of max HP every round of combat!");
    public static Regeneration2: PerkDesc = new PerkDesc("Regeneration 2", "Regeneration 2",
        "Gain 2% of max HP per round of combat and 4% of max HP per hour out of combat.",
        "You choose the 'Regeneration 2' perk, giving you an additional 2% of max HP per turn in combat and 4% of max HP per hour.");
    public static Resistance: PerkDesc = new PerkDesc("Resistance", "Resistance",
        "Reduces lust gain by 10%.",
        "You choose the 'Resistance' perk, reducing the rate at which your lust increases by 10%.");
    public static Resolute: PerkDesc = new PerkDesc("Resolute", "Resolute",
        "[if(player.tou>=75)" +
        "Grants immunity to stuns and some statuses.</b>" +
        "|" +
        "<b>You aren't tough enough to benefit from this anymore.</b>" +
        "]",
        "You choose the 'Resolute' perk, granting immunity to stuns and some statuses.</b>");
    public static Runner: PerkDesc = new PerkDesc("Runner", "Runner",
        "Increases chances of escaping combat.",
        "You choose the 'Runner' perk, increasing your chances to escape from your foes when fleeing!");
    public static Sadist: PerkDesc = new PerkDesc("Sadist", "Sadist",
        "Deal 20% more damage, but gain lust at the same time.",
        "You choose the 'Sadist' perk, increasing damage by 20 percent but causing you to gain lust from dealing damage.");
    public static Seduction: PerkDesc = new PerkDesc("Seduction", "Seduction",
        "Upgrades your tease attack, making it more effective.",
        "You choose the 'Seduction' perk, upgrading the 'tease' attack with a more powerful damage and a higher chance of success.");
    public static SpeedyRecovery: PerkDesc = new PerkDesc("Speedy Recovery", "Speedy Recovery",
        "Regain fatigue 50% faster.",
        "You choose the 'Speedy Recovery' perk, boosting your fatigue recovery rate!");
    public static Spellpower: PerkDesc = new PerkDesc("Spellpower", "Spellpower",
        "Increases base spell strength by 50%.",
        "You choose the 'Spellpower' perk.  Thanks to your sizeable intellect and willpower, you are able to more effectively use magic, boosting base spell effects by 50%.");
    public static StrongBack: PerkDesc = new PerkDesc("Strong Back", "Strong Back",
        "Enables fourth item slot.",
        "You choose the 'Strong Back' perk, enabling a fourth item slot.");
    public static StrongBack2: PerkDesc = new PerkDesc("Strong Back 2: Strong Harder", "Strong Back 2: Strong Harder",
        "Enables fifth item slot.",
        "You choose the 'Strong Back 2: Strong Harder' perk, enabling a fifth item slot.");
    public static Tactician: PerkDesc = new PerkDesc("Tactician", "Tactician",
        "[if(player.stats.int>=50)" +
        "Increases critical hit chance by up to 10% (Intelligence-based)." +
        "|" +
        "<b>You are too dumb to gain benefit from this perk.</b>" +
        "]",
        "You choose the 'Tactician' perk, increasing critical hit chance by up to 10% (Intelligence-based).");
    public static Tank: PerkDesc = new PerkDesc("Tank", "Tank",
        "Raises max HP by 50.",
        "You choose the 'Tank' perk, giving you an additional 50 hp!");
    public static Tank2: PerkDesc = new PerkDesc("Tank 2", "Tank 2",
        "+1 extra HP per point of toughness.",
        "You choose the 'Tank 2' perk, granting an extra maximum HP for each point of toughness.");
    public static ThunderousStrikes: PerkDesc = new PerkDesc("Thunderous Strikes", "Thunderous Strikes",
        "+20% 'Attack' damage while strength is at or above 80.",
        "You choose the 'Thunderous Strikes' perk, increasing normal damage by 20% while your strength is over 80.");
    public static WeaponMastery: PerkDesc = new PerkDesc("Weapon Mastery", "Weapon Mastery",
        "[if(player.str>60)" +
        "Doubles damage bonus of weapons classified as 'Large'." +
        "|" +
        "<b>You aren't strong enough to benefit from this anymore.</b>" +
        "]",
        "You choose the 'Weapon Mastery' perk, doubling the effectiveness of large weapons.");
    public static WellAdjusted: PerkDesc = new PerkDesc("Well Adjusted", "Well Adjusted",
        "You gain half as much lust as time passes in Mareth.",
        "You choose the 'Well Adjusted' perk, reducing the amount of lust you naturally gain over time while in this strange land!");

    // Needlework perks
    public static ChiReflowAttack: PerkDesc = new PerkDesc("Chi Reflow - Attack", "Chi Reflow - Attack",
        "Regular attacks boosted, but damage resistance decreased.");
    public static ChiReflowDefense: PerkDesc = new PerkDesc("Chi Reflow - Defense", "Chi Reflow - Defense",
        "Passive damage resistance, but caps speed");
    public static ChiReflowLust: PerkDesc = new PerkDesc("Chi Reflow - Lust", "Chi Reflow - Lust",
        "Lust resistance and Tease are enhanced, but Libido and Sensitivity gains increased.");
    public static ChiReflowMagic: PerkDesc = new PerkDesc("Chi Reflow - Magic", "Chi Reflow - Magic",
        "Magic attacks boosted, but regular attacks are weaker.");
    public static ChiReflowSpeed: PerkDesc = new PerkDesc("Chi Reflow - Speed", "Chi Reflow - Speed",
        "Speed reductions are halved but caps strength");

    // Piercing perks
    public static PiercedCrimstone: PiercedCrimstonePerk = new PiercedCrimstonePerk();
    public static PiercedFertite: PiercedFertitePerk = new PiercedFertitePerk();
    public static PiercedFurrite: PerkDesc = new PerkDesc("Pierced: Furrite", "Pierced: Furrite",
        "Increases chances of encountering 'furry' foes.");
    public static PiercedLethite: PerkDesc = new PerkDesc("Pierced: Lethite", "Pierced: Lethite",
        "Increases chances of encountering demonic foes.");

    // Cock sock perks
    public static LustyRegeneration: PerkDesc = new PerkDesc("Lusty Regeneration", "Lusty Regeneration",
        "Regenerates 1% of HP per round in combat and 2% of HP per hour.");
    public static MidasCock: PerkDesc = new PerkDesc("Midas Cock", "Midas Cock",
        "Increases the gems awarded from victory in battle.");
    public static PentUp: PentUpPerk = new PentUpPerk();
    public static PhallicPotential: PerkDesc = new PerkDesc("Phallic Potential", "Phallic Potential",
        "Increases the effects of penis-enlarging transformations.");
    public static PhallicRestraint: PerkDesc = new PerkDesc("Phallic Restraint", "Phallic Restraint",
        "Reduces the effects of penis-enlarging transformations.");

    // Armor perks
    public static BloodMage: PerkDesc = new PerkDesc("Blood Mage", "Blood Mage",
        "Spellcasting now consumes health instead of fatigue!");
    public static SluttySeduction: SluttySeductionPerk = new SluttySeductionPerk();
    public static WizardsEndurance: WizardsEndurancePerk = new WizardsEndurancePerk();

    // Weapon perks
    public static WizardsFocus: WizardsFocusPerk = new WizardsFocusPerk();

    // Achievement perks
    public static BroodMother: PerkDesc = new PerkDesc("Brood Mother", "Brood Mother",
        "Pregnancy moves twice as fast as a normal woman's.");
    public static SpellcastingAffinity: SpellcastingAffinityPerk = new SpellcastingAffinityPerk();

    // Mutation perks
    public static Androgyny: PerkDesc = new PerkDesc("Androgyny", "Androgyny",
        "No gender limits on facial masculinity or femininity.");
    public static BasiliskWomb: PerkDesc = new PerkDesc("Basilisk Womb", "Basilisk Womb",
        "Enables your eggs to be properly fertilized into basilisks of both genders!");
    public static BeeOvipositor: PerkDesc = new PerkDesc("Bee Ovipositor", "Bee Ovipositor",
        "Allows you to lay eggs through a special organ on your insect abdomen, though you need at least 10 eggs to lay.");
    public static BimboBody: PerkDesc = new PerkDesc("Bimbo Body", "Bimbo Body",
        "Gives the body of a bimbo.  Tits will never stay below a 'DD' cup, libido is raised, lust resistance is raised, and upgrades tease.");
    public static BimboBrains: PerkDesc = new PerkDesc("Bimbo Brains", "Bimbo Brains",
        "Now that you've drank bimbo liquer, you'll never, like, have the attention span and intelligence you once did!  But it's okay, 'cause you get to be so horny an' stuff!");
    public static BroBody: PerkDesc = new PerkDesc("Bro Body", "Bro Body",
        "Grants an ubermasculine body that's sure to impress.");
    public static BroBrains: PerkDesc = new PerkDesc("Bro Brains", "Bro Brains",
        "Makes thou... thin... fuck, that shit's for nerds.");
    public static BunnyEggs: PerkDesc = new PerkDesc("Bunny Eggs", "Bunny Eggs",
        "Laying eggs has become a normal part of your bunny-body's routine.");
    public static CorruptedNinetails: PerkDesc = new PerkDesc("Corrupted Nine-tails", "Corrupted Nine-tails",
        "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells, but your method of attaining it has corrupted the transformation, preventing you from achieving true enlightenment.");
    public static Diapause: PerkDesc = new PerkDesc("Diapause", "Diapause",
        "Pregnancy does not advance normally, but develops quickly after taking in fluids.");
    public static Dragonfire: PerkDesc = new PerkDesc("Dragonfire", "Dragonfire",
        "Allows access to a dragon breath attack.");
    public static EnlightenedNinetails: PerkDesc = new PerkDesc("Enlightened Nine-tails", "Enlightened Nine-tails",
        "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells.");
    public static Feeder: PerkDesc = new PerkDesc("Feeder", "Feeder",
        "Lactation does not decrease and gives a compulsion to breastfeed others.");
    public static Flexibility: PerkDesc = new PerkDesc("Flexibility", "Flexibility",
        "Grants cat-like flexibility.  Useful for dodging and 'fun'.");
    public static FutaFaculties: PerkDesc = new PerkDesc("Futa Faculties", "Futa Faculties",
        "It's super hard to think about stuff that like, isn't working out or fucking!");
    public static FutaForm: PerkDesc = new PerkDesc("Futa Form", "Futa Form",
        "Ensures that your body fits the Futa look (Tits DD+, Dick 8\"+, & Pussy).  Also keeps your lusts burning bright and improves the tease skill.");
    public static HarpyWomb: PerkDesc = new PerkDesc("Harpy Womb", "Harpy Womb",
        "Increases all laid eggs to large size so long as you have harpy legs and a harpy tail.");
    public static Incorporeality: PerkDesc = new PerkDesc("Incorporeality", "Incorporeality",
        "Allows you to fade into a ghost-like state and temporarily possess others.");
    public static MinotaurCumAddict: PerkDesc = new PerkDesc("Minotaur Cum Addict", "Minotaur Cum Addict",
        "Causes you to crave minotaur cum frequently.  You cannot shake this addiction.");
    public static Oviposition: PerkDesc = new PerkDesc("Oviposition", "Oviposition",
        "Causes you to regularly lay eggs when not otherwise pregnant.");
    public static PurityBlessing: PerkDesc = new PerkDesc("Purity Blessing", "Purity Blessing",
        "Reduces the rate at which your corruption, libido, and lust increase.");
    public static SlimeCore: PerkDesc = new PerkDesc("Slime Core", "Slime Core",
        "Grants more control over your slimy body, allowing you to go twice as long without fluids.");
    public static SpiderOvipositor: PerkDesc = new PerkDesc("Spider Ovipositor", "Spider Ovipositor",
        "Allows you to lay eggs through a special organ on your arachnid abdomen, though you need at least 10 eggs to lay.");
    public static ThickSkin: PerkDesc = new PerkDesc("Thick Skin", "Thick Skin",
        "Toughens your dermis to provide 2 points of armor.");

    // Quest, Event & NPC perks
    public static BulgeArmor: PerkDesc = new PerkDesc("Bulge Armor", "Bulge Armor",
        "Grants a 5 point damage bonus to dick-based tease attacks.");
    public static Cornucopia: PerkDesc = new PerkDesc("Cornucopia", "Cornucopia",
        "Vaginal and Anal capacities increased by 30.");
    public static ElvenBounty: ElvenBountyPerk = new ElvenBountyPerk();
    public static FerasBoonAlpha: PerkDesc = new PerkDesc("Fera's Boon - Alpha", "Fera's Boon - Alpha",
        "Increases the rate your cum builds up and cum production in general.");
    public static FerasBoonBreedingBitch: PerkDesc = new PerkDesc("Fera's Boon - Breeding Bitch", "Fera's Boon - Breeding Bitch",
        "Increases fertility and reduces the time it takes to birth young.");
    public static FerasBoonMilkingTwat: PerkDesc = new PerkDesc("Fera's Boon - Milking Twat", "Fera's Boon - Milking Twat",
        "Keeps your pussy from ever getting too loose and increases pregnancy speed.",
        "Keeps your pussy from ever getting too loose and increases pregnancy speed.");
    public static FerasBoonSeeder: PerkDesc = new PerkDesc("Fera's Boon - Seeder", "Fera's Boon - Seeder",
        "Increases cum output by 1,000 mLs.",
        "Increases cum output by 1,000 mLs.");
    public static FerasBoonWideOpen: PerkDesc = new PerkDesc("Fera's Boon - Wide Open", "Fera's Boon - Wide Open",
        "Keeps your pussy permanently gaped and increases pregnancy speed.",
        "Keeps your pussy permanently gaped and increases pregnancy speed.");
    public static FireLord: PerkDesc = new PerkDesc("Fire Lord", "Fire Lord",
        "Akbal's blessings grant the ability to breathe burning green flames.");
    public static Hellfire: PerkDesc = new PerkDesc("Hellfire", "Hellfire",
        "Grants a corrupted fire breath attack, like the hellhounds in the mountains.");
    public static LuststickAdapted: PerkDesc = new PerkDesc("Luststick Adapted", "Luststick Adapted",
        "Grants immunity to the lust-increasing effects of lust-stick and allows its use.");
    public static MagicalFertility: PerkDesc = new PerkDesc("Magical Fertility", "Magical Fertility",
        "10% higher chance of pregnancy and increased pregnancy speed.",
        "10% higher chance of pregnancy and increased pregnancy speed.");
    public static MagicalVirility: PerkDesc = new PerkDesc("Magical Virility", "Magical Virility",
        "200 mLs more cum per orgasm and enhanced virility.",
        "200 mLs more cum per orgasm and enhanced virility.");
    public static MaraesGiftButtslut: PerkDesc = new PerkDesc("Marae's Gift - Buttslut", "Marae's Gift - Buttslut",
        "Makes your anus provide lubrication when aroused.");
    public static MaraesGiftFertility: PerkDesc = new PerkDesc("Marae's Gift - Fertility", "Marae's Gift - Fertility",
        "Greatly increases fertility and halves base pregnancy speed.");
    public static MaraesGiftProfractory: PerkDesc = new PerkDesc("Marae's Gift - Profractory", "Marae's Gift - Profractory",
        "Causes your cum to build up at 3x the normal rate.");
    public static MaraesGiftStud: PerkDesc = new PerkDesc("Marae's Gift - Stud", "Marae's Gift - Stud",
        "Increases your cum production and potency greatly.");
    public static MarbleResistant: PerkDesc = new PerkDesc("Marble Resistant", "Marble Resistant",
        "Provides resistance to the addictive effects of bottled LaBova milk.");
    public static MarblesMilk: PerkDesc = new PerkDesc("Marble's Milk", "Marble's Milk",
        "Requires you to drink LaBova milk frequently or eventually die.  You cannot shake this addiction.");
    public static Misdirection: PerkDesc = new PerkDesc("Misdirection", "Misdirection",
        "Grants additional evasion chances while wearing Raphael's red bodysuit.");
    public static OmnibusGift: PerkDesc = new PerkDesc("Omnibus' Gift", "Omnibus' Gift",
        "Increases minimum lust but provides some lust resistance.");
    public static OneTrackMind: PerkDesc = new PerkDesc("One Track Mind", "One Track Mind",
        "Your constant desire for sex causes your sexual organs to be able to take larger insertions and disgorge greater amounts of fluid.");
    public static PilgrimsBounty: PerkDesc = new PerkDesc("Pilgrim's Bounty", "Pilgrim's Bounty",
        "Causes you to always cum as hard as if you had max lust.");
    public static PureAndLoving: PerkDesc = new PerkDesc("Pure and Loving", "Pure and Loving",
        "Your caring attitude towards love and romance makes you slightly more resistant to lust and corruption.");
    public static SensualLover: PerkDesc = new PerkDesc("Sensual Lover", "Sensual Lover",
        "Your sensual attitude towards love and romance makes your tease ability slightly more effective.");
    public static Whispered: PerkDesc = new PerkDesc("Whispered", "Whispered",
        "Akbal's blessings grant limited telepathy that can induce fear.");

    public static ControlledBreath: ControlledBreathPerk = new ControlledBreathPerk();
    public static CleansingPalm: CleansingPalmPerk = new CleansingPalmPerk();
    public static Enlightened: EnlightenedPerk = new EnlightenedPerk();


    // Monster perks
    public static Acid: PerkDesc = new PerkDesc("Acid", "Acid", "");
    */
}
