import PerkDesc from './PerkDesc';
import Archmage from './PerkDesc/Archmage';
import Berzerker from './PerkDesc/Berzerker';
import BrutalBlows from './PerkDesc/BrutalBlows';
import CleansingPalm from './PerkDesc/CleansingPalm';
import ControlledBreathPerk from './PerkDesc/ControlledBreath';
import DoubleAttack from './PerkDesc/DoubleAttack';
import ElvenBounty from './PerkDesc/ElvenBounty';
import Enlightened from './PerkDesc/Enlightened';
import ImmovableObject from './PerkDesc/ImmovableObject';
import LightningStrikes from './PerkDesc/LightningStrikes';
import LungingAttacks from './PerkDesc/LungingAttacks';
import PentUp from './PerkDesc/PentUp';
import PiercedCrimstone from './PerkDesc/PiercedCrimstone';
import PiercedFertite from './PerkDesc/PiercedFertite';
import Resolute from './PerkDesc/Resolute';
import SluttySeduction from './PerkDesc/SluttySeduction';
import SpellcastingAffinity from './PerkDesc/SpellcastingAffinity';
import Tactician from './PerkDesc/Tactician';
import WeaponMastery from './PerkDesc/WeaponMastery';
import WizardsEndurance from './PerkDesc/WizardsEndurance';
import WizardsFocus from './PerkDesc/WizardsFocus';
import { PerkType } from './PerkType';
import Library from '../Utilities/Library';

export default class PerkDescLib extends Library<PerkDesc>{
    public constructor() {
        super();
        this.add(new PerkDesc(PerkType.Brawler, "Brawler",
            "Brawling experience allows you to make two unarmed attacks in a turn.",
            "You choose the 'Brawler' perk, allowing you to make two unarmed attacks in a turn!"));
        this.add(new PerkDesc(PerkType.Buttslut, "Buttslut", "Buttslut", ""));
        this.add(new PerkDesc(PerkType.Focused, "Focused", "Focused", ""));

        // Player creation perks
        this.add(new PerkDesc(PerkType.Fast, "Fast", "Fast",
            "Gains speed 25% faster."));
        this.add(new PerkDesc(PerkType.Lusty, "Lusty", "Lusty",
            "Gains lust 25% faster."));
        this.add(new PerkDesc(PerkType.Sensitive, "Sensitive", "Sensitive",
            "Gains sensitivity 25% faster."));
        this.add(new PerkDesc(PerkType.Smart, "Smart", "Smart",
            "Gains intelligence 25% faster."));
        this.add(new PerkDesc(PerkType.Strong, "Strong", "Strong",
            "Gains strength 25% faster."));
        this.add(new PerkDesc(PerkType.Tough, "Tough", "Tough",
            "Gains toughness 25% faster."));

        // Female creation perks
        this.add(new PerkDesc(PerkType.BigClit, "Big Clit", "Big Clit",
            "Allows your clit to grow larger more easily and faster."));
        this.add(new PerkDesc(PerkType.BigTits, "Big Tits", "Big Tits",
            "Makes your tits grow larger more easily."));
        this.add(new PerkDesc(PerkType.Fertile, "Fertile", "Fertile",
            "Makes you 15% more likely to become pregnant."));
        this.add(new PerkDesc(PerkType.WetPussy, "Wet Pussy", "Wet Pussy",
            "Keeps your pussy wet and provides a bonus to capacity."));

        // Male creation perks
        this.add(new PerkDesc(PerkType.BigCock, "Big Cock", "Big Cock",
            "Gains cock size 25% faster and with less limitations."));
        this.add(new PerkDesc(PerkType.MessyOrgasms, "Messy Orgasms", "Messy Orgasms",
            "Produces 50% more cum volume."));

        // History perks
        this.add(new PerkDesc(PerkType.HistoryAlchemist, "History: Alchemist", "History: Alchemist",
            "Alchemical experience makes items more reactive to your body."));
        this.add(new PerkDesc(PerkType.HistoryFighter, "History: Fighter", "History: Fighter",
            "A Past full of conflict increases physical damage dealt by 10%."));
        this.add(new PerkDesc(PerkType.HistoryHealer, "History: Healer", "History: Healer",
            "Healing experience increases HP gains by 20%."));
        this.add(new PerkDesc(PerkType.HistoryReligious, "History: Religious", "History: Religious",
            "Replaces masturbate with meditate when corruption less than or equal to 66."));
        this.add(new PerkDesc(PerkType.HistoryScholar, "History: Scholar", "History: Scholar",
            "Time spent focusing your mind makes spellcasting 20% less fatiguing."));
        this.add(new PerkDesc(PerkType.HistorySlacker, "History: Slacker", "History: Slacker",
            "Regenerate fatigue 20% faster."));
        this.add(new PerkDesc(PerkType.HistorySlut, "History: Slut", "History: Slut",
            "Sexual experience has made you more able to handle large insertions and more resistant to stretching."));
        this.add(new PerkDesc(PerkType.HistorySmith, "History: Smith", "History: Smith",
            "Knowledge of armor and fitting increases armor effectiveness by roughly 10%."));
        this.add(new PerkDesc(PerkType.HistoryWhore, "History: Whore", "History: Whore",
            "Seductive experience causes your tease attacks to be 15% more effective."));

        // Ordinary (levelup) perks
        this.add(new PerkDesc(PerkType.Acclimation, "Acclimation",
            "Reduces lust gain by 15%.",
            "You choose the 'Acclimation' perk, making your body 15% more resistant to lust, up to a maximum of 75%."));
        this.add(new PerkDesc(PerkType.Agility, "Agility",
            "Boosts armor points by a portion of your speed on light/medium armors.",
            "You choose the 'Agility' perk, increasing the effectiveness of Light/Medium armors by a portion of your speed."));
        this.add(new Archmage());
        this.add(new PerkDesc(PerkType.ArousingAura, "Arousing Aura",
            "Exude a lust-inducing aura (Req's corruption of 70 or more)",
            "You choose the 'Arousing Aura' perk, causing you to radiate an aura of lust when your corruption is over 70."));
        this.add(new Berzerker());
        this.add(new BrutalBlows());
        this.add(new PerkDesc(PerkType.Channeling, "Channeling",
            "Increases base spell strength by 50%.",
            "You choose the 'Channeling' perk, boosting the strength of your spellcasting!"));
        this.add(new PerkDesc(PerkType.CorruptedLibido, "Corrupted Libido",
            "Reduces lust gain by 10%.",
            "You choose the 'Corrupted Libido' perk.  As a result of your body's corruption, you've become a bit harder to turn on. (Lust gain reduced by 10%!)"));
        this.add(new DoubleAttack());
        this.add(new PerkDesc(PerkType.Evade, "Evade",
            "Increases chances of evading enemy attacks.",
            "You choose the 'Evade' perk, allowing you to avoid enemy attacks more often!"));
        this.add(new PerkDesc(PerkType.FertilityPlus, "Fertility+",
            "Increases fertility rating by 15 and cum volume by up to 50%.",
            "You choose the 'Fertility+' perk, making it easier to get pregnant.  It also increases your cum volume by up to 50% (if appropriate)!"));
        this.add(new PerkDesc(PerkType.HotBlooded, "Hot Blooded",
            "Raises minimum lust by up to 20.",
            "You choose the 'Hot Blooded' perk.  As a result of your enhanced libido, your lust no longer drops below 20! (If you already have some minimum lust, it will be increased by 10)"));
        this.add(new ImmovableObject());
        this.add(new PerkDesc(PerkType.IronMan, "Iron Man",
            "Reduces the fatigue cost of physical specials by 50%.",
            "You choose the 'Iron Man' perk, reducing the fatigue cost of physical special attacks by 50%"));
        this.add(new LightningStrikes());
        this.add(new LungingAttacks());
        this.add(new PerkDesc(PerkType.Mage, "Mage",
            "Increases base spell strength by 50%.",
            "You choose the 'Mage' perk.  You are able to focus your magical abilities even more keenly, boosting your base spell effects by 50%."));
        this.add(new PerkDesc(PerkType.Masochist, "Masochist",
            "Take 30% less physical damage but gain lust when damage.",
            "You choose the 'Masochist' perk, reducing the damage you take but raising your lust each time!  This perk only functions while your libido is at or above 60!"));
        this.add(new PerkDesc(PerkType.Medicine, "Medicine",
            "Grants 15% chance per round of cleansing poisons/drugs from your body.",
            "You choose the 'Medicine' perk, giving you a chance to remove debilitating poisons automatically!"));
        this.add(new PerkDesc(PerkType.Nymphomania, "Nymphomania",
            "Raises minimum lust by up to 30.",
            "You've chosen the 'Nymphomania' perk.  Due to the incredible amount of corruption you've been exposed to, you've begun to live in a state of minor constant arousal.  Your minimum lust will be increased by as much as 30 (If you already have minimum lust, the increase is 10-15)."));
        this.add(new PerkDesc(PerkType.Precision, "Precision",
            "Reduces enemy armor by 10. (Req's 25+ Intelligence)",
            "You've chosen the 'Precision' perk.  Thanks to your intelligence, you're now more adept at finding and striking an enemy's weak points, reducing their damage resistance from armor by 10.  If your intelligence ever drops below 25 you'll no longer be smart enough to benefit from this perk."));
        this.add(new PerkDesc(PerkType.Regeneration, "Regeneration",
            "Regenerates 2% of max HP/hour and 1% of max HP/round.",
            "You choose the 'Regeneration' perk, allowing you to heal 2% of max HP every hour and 1% of max HP every round of combat!"));
        this.add(new PerkDesc(PerkType.Regeneration2, "Regeneration 2",
            "Gain 2% of max HP per round of combat and 4% of max HP per hour out of combat.",
            "You choose the 'Regeneration 2' perk, giving you an additional 2% of max HP per turn in combat and 4% of max HP per hour."));
        this.add(new PerkDesc(PerkType.Resistance, "Resistance",
            "Reduces lust gain by 10%.",
            "You choose the 'Resistance' perk, reducing the rate at which your lust increases by 10%."));
        this.add(new Resolute());
        this.add(new PerkDesc(PerkType.Runner, "Runner",
            "Increases chances of escaping combat.",
            "You choose the 'Runner' perk, increasing your chances to escape from your foes when fleeing!"));
        this.add(new PerkDesc(PerkType.Sadist, "Sadist",
            "Deal 20% more damage, but gain lust at the same time.",
            "You choose the 'Sadist' perk, increasing damage by 20 percent but causing you to gain lust from dealing damage."));
        this.add(new PerkDesc(PerkType.Seduction, "Seduction",
            "Upgrades your tease attack, making it more effective.",
            "You choose the 'Seduction' perk, upgrading the 'tease' attack with a more powerful damage and a higher chance of success."));
        this.add(new PerkDesc(PerkType.SpeedyRecovery, "Speedy Recovery",
            "Regain fatigue 50% faster.",
            "You choose the 'Speedy Recovery' perk, boosting your fatigue recovery rate!"));
        this.add(new PerkDesc(PerkType.Spellpower, "Spellpower",
            "Increases base spell strength by 50%.",
            "You choose the 'Spellpower' perk.  Thanks to your sizeable intellect and willpower, you are able to more effectively use magic, boosting base spell effects by 50%."));
        this.add(new PerkDesc(PerkType.StrongBack, "Strong Back",
            "Enables fourth item slot.",
            "You choose the 'Strong Back' perk, enabling a fourth item slot."));
        this.add(new PerkDesc(PerkType.StrongBack2, "Strong Back 2: Strong Harder",
            "Enables fifth item slot.",
            "You choose the 'Strong Back 2: Strong Harder' perk, enabling a fifth item slot."));
        this.add(new Tactician());
        this.add(new PerkDesc(PerkType.Tank, "Tank",
            "Raises max HP by 50.",
            "You choose the 'Tank' perk, giving you an additional 50 hp!"));
        this.add(new PerkDesc(PerkType.Tank2, "Tank 2",
            "+1 extra HP per point of toughness.",
            "You choose the 'Tank 2' perk, granting an extra maximum HP for each point of toughness."));
        this.add(new PerkDesc(PerkType.ThunderousStrikes, "Thunderous Strikes",
            "+20% 'Attack' damage while strength is at or above 80.",
            "You choose the 'Thunderous Strikes' perk, increasing normal damage by 20% while your strength is over 80."));
        this.add(new WeaponMastery());
        this.add(new PerkDesc(PerkType.WellAdjusted, "Well Adjusted",
            "You gain half as much lust as time passes in Mareth.",
            "You choose the 'Well Adjusted' perk, reducing the amount of lust you naturally gain over time while in this strange land!"));

        // Needlework perks
        this.add(new PerkDesc(PerkType.ChiReflowAttack, "Chi Reflow - Attack", "Chi Reflow - Attack",
            "Regular attacks boosted, but damage resistance decreased."));
        this.add(new PerkDesc(PerkType.ChiReflowDefense, "Chi Reflow - Defense", "Chi Reflow - Defense",
            "Passive damage resistance, but caps speed"));
        this.add(new PerkDesc(PerkType.ChiReflowLust, "Chi Reflow - Lust", "Chi Reflow - Lust",
            "Lust resistance and Tease are enhanced, but Libido and Sensitivity gains increased."));
        this.add(new PerkDesc(PerkType.ChiReflowMagic, "Chi Reflow - Magic", "Chi Reflow - Magic",
            "Magic attacks boosted, but regular attacks are weaker."));
        this.add(new PerkDesc(PerkType.ChiReflowSpeed, "Chi Reflow - Speed", "Chi Reflow - Speed",
            "Speed reductions are halved but caps strength"));

        // Piercing perks
        this.add(new PiercedCrimstone());
        this.add(new PiercedFertite());
        this.add(new PerkDesc(PerkType.PiercedFurrite, "Pierced: Furrite", "Pierced: Furrite",
            "Increases chances of encountering 'furry' foes."));
        this.add(new PerkDesc(PerkType.PiercedLethite, "Pierced: Lethite", "Pierced: Lethite",
            "Increases chances of encountering demonic foes."));

        // Cock sock perks
        this.add(new PerkDesc(PerkType.LustyRegeneration, "Lusty Regeneration", "Lusty Regeneration",
            "Regenerates 1% of HP per round in combat and 2% of HP per hour."));
        this.add(new PerkDesc(PerkType.MidasCock, "Midas Cock", "Midas Cock",
            "Increases the gems awarded from victory in battle."));
        this.add(new PentUp());
        this.add(new PerkDesc(PerkType.PhallicPotential, "Phallic Potential", "Phallic Potential",
            "Increases the effects of penis-enlarging transformations."));
        this.add(new PerkDesc(PerkType.PhallicRestraint, "Phallic Restraint", "Phallic Restraint",
            "Reduces the effects of penis-enlarging transformations."));

        // Armor perks
        this.add(new PerkDesc(PerkType.BloodMage, "Blood Mage", "Blood Mage",
            "Spellcasting now consumes health instead of fatigue!"));
        this.add(new SluttySeduction());
        this.add(new WizardsEndurance());

        // Weapon perks
        this.add(new WizardsFocus());

        // Achievement perks
        this.add(new PerkDesc(PerkType.BroodMother, "Brood Mother", "Brood Mother",
            "Pregnancy moves twice as fast as a normal woman's."));
        this.add(new SpellcastingAffinity());

        // Mutation perks
        this.add(new PerkDesc(PerkType.Androgyny, "Androgyny", "Androgyny",
            "No gender limits on facial masculinity or femininity."));
        this.add(new PerkDesc(PerkType.BasiliskWomb, "Basilisk Womb", "Basilisk Womb",
            "Enables your eggs to be properly fertilized into basilisks of both genders!"));
        this.add(new PerkDesc(PerkType.BeeOvipositor, "Bee Ovipositor", "Bee Ovipositor",
            "Allows you to lay eggs through a special organ on your insect abdomen, though you need at least 10 eggs to lay."));
        this.add(new PerkDesc(PerkType.BimboBody, "Bimbo Body", "Bimbo Body",
            "Gives the body of a bimbo.  Tits will never stay below a 'DD' cup, libido is raised, lust resistance is raised, and upgrades tease."));
        this.add(new PerkDesc(PerkType.BimboBrains, "Bimbo Brains", "Bimbo Brains",
            "Now that you've drank bimbo liquer, you'll never, like, have the attention span and intelligence you once did!  But it's okay, 'cause you get to be so horny an' stuff!"));
        this.add(new PerkDesc(PerkType.BroBody, "Bro Body", "Bro Body",
            "Grants an ubermasculine body that's sure to impress."));
        this.add(new PerkDesc(PerkType.BroBrains, "Bro Brains", "Bro Brains",
            "Makes thou... thin... fuck, that shit's for nerds."));
        this.add(new PerkDesc(PerkType.BunnyEggs, "Bunny Eggs", "Bunny Eggs",
            "Laying eggs has become a normal part of your bunny-body's routine."));
        this.add(new PerkDesc(PerkType.CorruptedNinetails, "Corrupted Nine-tails", "Corrupted Nine-tails",
            "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells, but your method of attaining it has corrupted the transformation, preventing you from achieving true enlightenment."));
        this.add(new PerkDesc(PerkType.Diapause, "Diapause", "Diapause",
            "Pregnancy does not advance normally, but develops quickly after taking in fluids."));
        this.add(new PerkDesc(PerkType.Dragonfire, "Dragonfire", "Dragonfire",
            "Allows access to a dragon breath attack."));
        this.add(new PerkDesc(PerkType.EnlightenedNinetails, "Enlightened Nine-tails", "Enlightened Nine-tails",
            "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells."));
        this.add(new PerkDesc(PerkType.Feeder, "Feeder", "Feeder",
            "Lactation does not decrease and gives a compulsion to breastfeed others."));
        this.add(new PerkDesc(PerkType.Flexibility, "Flexibility", "Flexibility",
            "Grants cat-like flexibility.  Useful for dodging and 'fun'."));
        this.add(new PerkDesc(PerkType.FutaFaculties, "Futa Faculties", "Futa Faculties",
            "It's super hard to think about stuff that like, isn't working out or fucking!"));
        this.add(new PerkDesc(PerkType.FutaForm, "Futa Form", "Futa Form",
            "Ensures that your body fits the Futa look (Tits DD+, Dick 8\"+, & Pussy).  Also keeps your lusts burning bright and improves the tease skill."));
        this.add(new PerkDesc(PerkType.HarpyWomb, "Harpy Womb", "Harpy Womb",
            "Increases all laid eggs to large size so long as you have harpy legs and a harpy tail."));
        this.add(new PerkDesc(PerkType.Incorporeality, "Incorporeality", "Incorporeality",
            "Allows you to fade into a ghost-like state and temporarily possess others."));
        this.add(new PerkDesc(PerkType.MinotaurCumAddict, "Minotaur Cum Addict", "Minotaur Cum Addict",
            "Causes you to crave minotaur cum frequently.  You cannot shake this addiction."));
        this.add(new PerkDesc(PerkType.Oviposition, "Oviposition", "Oviposition",
            "Causes you to regularly lay eggs when not otherwise pregnant."));
        this.add(new PerkDesc(PerkType.PurityBlessing, "Purity Blessing", "Purity Blessing",
            "Reduces the rate at which your corruption, libido, and lust increase."));
        this.add(new PerkDesc(PerkType.SlimeCore, "Slime Core", "Slime Core",
            "Grants more control over your slimy body, allowing you to go twice as long without fluids."));
        this.add(new PerkDesc(PerkType.SpiderOvipositor, "Spider Ovipositor", "Spider Ovipositor",
            "Allows you to lay eggs through a special organ on your arachnid abdomen, though you need at least 10 eggs to lay."));
        this.add(new PerkDesc(PerkType.ThickSkin, "Thick Skin", "Thick Skin",
            "Toughens your dermis to provide 2 points of armor."));

        // Quest, Event & NPC perks
        this.add(new PerkDesc(PerkType.BulgeArmor, "Bulge Armor", "Bulge Armor",
            "Grants a 5 point damage bonus to dick-based tease attacks."));
        this.add(new PerkDesc(PerkType.Cornucopia, "Cornucopia", "Cornucopia",
            "Vaginal and Anal capacities increased by 30."));
        this.add(new ElvenBounty());
        this.add(new PerkDesc(PerkType.FerasBoonAlpha, "Fera's Boon - Alpha", "Fera's Boon - Alpha",
            "Increases the rate your cum builds up and cum production in general."));
        this.add(new PerkDesc(PerkType.FerasBoonBreedingBitch, "Fera's Boon - Breeding Bitch", "Fera's Boon - Breeding Bitch",
            "Increases fertility and reduces the time it takes to birth young."));
        this.add(new PerkDesc(PerkType.FerasBoonMilkingTwat, "Fera's Boon - Milking Twat",
            "Keeps your pussy from ever getting too loose and increases pregnancy speed.",
            "Keeps your pussy from ever getting too loose and increases pregnancy speed."));
        this.add(new PerkDesc(PerkType.FerasBoonSeeder, "Fera's Boon - Seeder",
            "Increases cum output by 1,000 mLs.",
            "Increases cum output by 1,000 mLs."));
        this.add(new PerkDesc(PerkType.FerasBoonWideOpen, "Fera's Boon - Wide Open",
            "Keeps your pussy permanently gaped and increases pregnancy speed.",
            "Keeps your pussy permanently gaped and increases pregnancy speed."));
        this.add(new PerkDesc(PerkType.FireLord, "Fire Lord", "Fire Lord",
            "Akbal's blessings grant the ability to breathe burning green flames."));
        this.add(new PerkDesc(PerkType.Hellfire, "Hellfire", "Hellfire",
            "Grants a corrupted fire breath attack, like the hellhounds in the mountains."));
        this.add(new PerkDesc(PerkType.LuststickAdapted, "Luststick Adapted", "Luststick Adapted",
            "Grants immunity to the lust-increasing effects of lust-stick and allows its use."));
        this.add(new PerkDesc(PerkType.MagicalFertility, "Magical Fertility",
            "10% higher chance of pregnancy and increased pregnancy speed.",
            "10% higher chance of pregnancy and increased pregnancy speed."));
        this.add(new PerkDesc(PerkType.MagicalVirility, "Magical Virility",
            "200 mLs more cum per orgasm and enhanced virility.",
            "200 mLs more cum per orgasm and enhanced virility."));
        this.add(new PerkDesc(PerkType.MaraesGiftButtslut, "Marae's Gift - Buttslut", "Marae's Gift - Buttslut",
            "Makes your anus provide lubrication when aroused."));
        this.add(new PerkDesc(PerkType.MaraesGiftFertility, "Marae's Gift - Fertility", "Marae's Gift - Fertility",
            "Greatly increases fertility and halves base pregnancy speed."));
        this.add(new PerkDesc(PerkType.MaraesGiftProfractory, "Marae's Gift - Profractory", "Marae's Gift - Profractory",
            "Causes your cum to build up at 3x the normal rate."));
        this.add(new PerkDesc(PerkType.MaraesGiftStud, "Marae's Gift - Stud", "Marae's Gift - Stud",
            "Increases your cum production and potency greatly."));
        this.add(new PerkDesc(PerkType.MarbleResistant, "Marble Resistant", "Marble Resistant",
            "Provides resistance to the addictive effects of bottled LaBova milk."));
        this.add(new PerkDesc(PerkType.MarblesMilk, "Marble's Milk", "Marble's Milk",
            "Requires you to drink LaBova milk frequently or eventually die.  You cannot shake this addiction."));
        this.add(new PerkDesc(PerkType.Misdirection, "Misdirection", "Misdirection",
            "Grants additional evasion chances while wearing Raphael's red bodysuit."));
        this.add(new PerkDesc(PerkType.OmnibusGift, "Omnibus' Gift", "Omnibus' Gift",
            "Increases minimum lust but provides some lust resistance."));
        this.add(new PerkDesc(PerkType.OneTrackMind, "One Track Mind", "One Track Mind",
            "Your constant desire for sex causes your sexual organs to be able to take larger insertions and disgorge greater amounts of fluid."));
        this.add(new PerkDesc(PerkType.PilgrimsBounty, "Pilgrim's Bounty", "Pilgrim's Bounty",
            "Causes you to always cum as hard as if you had max lust."));
        this.add(new PerkDesc(PerkType.PureAndLoving, "Pure and Loving", "Pure and Loving",
            "Your caring attitude towards love and romance makes you slightly more resistant to lust and corruption."));
        this.add(new PerkDesc(PerkType.SensualLover, "Sensual Lover", "Sensual Lover",
            "Your sensual attitude towards love and romance makes your tease ability slightly more effective."));
        this.add(new PerkDesc(PerkType.Whispered, "Whispered", "Whispered",
            "Akbal's blessings grant limited telepathy that can induce fear."));

        this.add(new ControlledBreathPerk());
        this.add(new CleansingPalm());
        this.add(new Enlightened());


        // Monster perks
        this.add(new PerkDesc(PerkType.Acid, "Acid", "Acid", ""));

    }
}