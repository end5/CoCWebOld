import { PerkDesc } from './Perk';
import * as PerkDescs from './PerkDescs';
import { PerkType } from './PerkType';
import Dictionary from '../../Engine/Utilities/Dictionary';

export default class PerkDescLib extends Dictionary<PerkDesc>{
    public constructor() {
        super();
        this.set(PerkType.Brawler, new PerkDesc(PerkType.Brawler, "Brawler",
            "Brawling experience allows you to make two unarmed attacks in a turn.",
            "You choose the 'Brawler' perk, allowing you to make two unarmed attacks in a turn!"));
        this.set(PerkType.Buttslut, new PerkDesc(PerkType.Buttslut, "Buttslut", "Buttslut", ""));
        this.set(PerkType.Focused, new PerkDesc(PerkType.Focused, "Focused", "Focused", ""));

        // Player creation perks
        this.set(PerkType.Fast, new PerkDesc(PerkType.Fast, "Fast", "Fast",
            "Gains speed 25% faster."));
        this.set(PerkType.Lusty, new PerkDesc(PerkType.Lusty, "Lusty", "Lusty",
            "Gains lust 25% faster."));
        this.set(PerkType.Sensitive, new PerkDesc(PerkType.Sensitive, "Sensitive", "Sensitive",
            "Gains sensitivity 25% faster."));
        this.set(PerkType.Smart, new PerkDesc(PerkType.Smart, "Smart", "Smart",
            "Gains intelligence 25% faster."));
        this.set(PerkType.Strong, new PerkDesc(PerkType.Strong, "Strong", "Strong",
            "Gains strength 25% faster."));
        this.set(PerkType.Tough, new PerkDesc(PerkType.Tough, "Tough", "Tough",
            "Gains toughness 25% faster."));

        // Female creation perks
        this.set(PerkType.BigClit, new PerkDesc(PerkType.BigClit, "Big Clit", "Big Clit",
            "Allows your clit to grow larger more easily and faster."));
        this.set(PerkType.BigTits, new PerkDesc(PerkType.BigTits, "Big Tits", "Big Tits",
            "Makes your tits grow larger more easily."));
        this.set(PerkType.Fertile, new PerkDesc(PerkType.Fertile, "Fertile", "Fertile",
            "Makes you 15% more likely to become pregnant."));
        this.set(PerkType.WetPussy, new PerkDesc(PerkType.WetPussy, "Wet Pussy", "Wet Pussy",
            "Keeps your pussy wet and provides a bonus to capacity."));

        // Male creation perks
        this.set(PerkType.BigCock, new PerkDesc(PerkType.BigCock, "Big Cock", "Big Cock",
            "Gains cock size 25% faster and with less limitations."));
        this.set(PerkType.MessyOrgasms, new PerkDesc(PerkType.MessyOrgasms, "Messy Orgasms", "Messy Orgasms",
            "Produces 50% more cum volume."));

        // History perks
        this.set(PerkType.HistoryAlchemist, new PerkDesc(PerkType.HistoryAlchemist, "History: Alchemist", "History: Alchemist",
            "Alchemical experience makes items more reactive to your body."));
        this.set(PerkType.HistoryFighter, new PerkDesc(PerkType.HistoryFighter, "History: Fighter", "History: Fighter",
            "A Past full of conflict increases physical damage dealt by 10%."));
        this.set(PerkType.HistoryHealer, new PerkDesc(PerkType.HistoryHealer, "History: Healer", "History: Healer",
            "Healing experience increases HP gains by 20%."));
        this.set(PerkType.HistoryReligious, new PerkDesc(PerkType.HistoryReligious, "History: Religious", "History: Religious",
            "Replaces masturbate with meditate when corruption less than or equal to 66."));
        this.set(PerkType.HistoryScholar, new PerkDesc(PerkType.HistoryScholar, "History: Scholar", "History: Scholar",
            "Time spent focusing your mind makes spellcasting 20% less fatiguing."));
        this.set(PerkType.HistorySlacker, new PerkDesc(PerkType.HistorySlacker, "History: Slacker", "History: Slacker",
            "Regenerate fatigue 20% faster."));
        this.set(PerkType.HistorySlut, new PerkDesc(PerkType.HistorySlut, "History: Slut", "History: Slut",
            "Sexual experience has made you more able to handle large insertions and more resistant to stretching."));
        this.set(PerkType.HistorySmith, new PerkDesc(PerkType.HistorySmith, "History: Smith", "History: Smith",
            "Knowledge of armor and fitting increases armor effectiveness by roughly 10%."));
        this.set(PerkType.HistoryWhore, new PerkDesc(PerkType.HistoryWhore, "History: Whore", "History: Whore",
            "Seductive experience causes your tease attacks to be 15% more effective."));

        // Ordinary (levelup) perks
        this.set(PerkType.Acclimation, new PerkDesc(PerkType.Acclimation, "Acclimation",
            "Reduces lust gain by 15%.",
            "You choose the 'Acclimation' perk, making your body 15% more resistant to lust, up to a maximum of 75%."));
        this.set(PerkType.Agility, new PerkDesc(PerkType.Agility, "Agility",
            "Boosts armor points by a portion of your speed on light/medium armors.",
            "You choose the 'Agility' perk, increasing the effectiveness of Light/Medium armors by a portion of your speed."));
        this.set(PerkType.Archmage, new PerkDescs.Archmage());
        this.set(PerkType.ArousingAura, new PerkDesc(PerkType.ArousingAura, "Arousing Aura",
            "Exude a lust-inducing aura (Req's corruption of 70 or more)",
            "You choose the 'Arousing Aura' perk, causing you to radiate an aura of lust when your corruption is over 70."));
        this.set(PerkType.Berzerker, new PerkDescs.Berzerker());
        this.set(PerkType.BrutalBlows, new PerkDescs.BrutalBlows());
        this.set(PerkType.Channeling, new PerkDesc(PerkType.Channeling, "Channeling",
            "Increases base spell strength by 50%.",
            "You choose the 'Channeling' perk, boosting the strength of your spellcasting!"));
        this.set(PerkType.CorruptedLibido, new PerkDesc(PerkType.CorruptedLibido, "Corrupted Libido",
            "Reduces lust gain by 10%.",
            "You choose the 'Corrupted Libido' perk.  As a result of your body's corruption, you've become a bit harder to turn on. (Lust gain reduced by 10%!)"));
        this.set(PerkType.DoubleAttack, new PerkDescs.DoubleAttack());
        this.set(PerkType.Evade, new PerkDesc(PerkType.Evade, "Evade",
            "Increases chances of evading enemy attacks.",
            "You choose the 'Evade' perk, allowing you to avoid enemy attacks more often!"));
        this.set(PerkType.FertilityPlus, new PerkDesc(PerkType.FertilityPlus, "Fertility+",
            "Increases fertility rating by 15 and cum volume by up to 50%.",
            "You choose the 'Fertility+' perk, making it easier to get pregnant.  It also increases your cum volume by up to 50% (if appropriate)!"));
        this.set(PerkType.HotBlooded, new PerkDesc(PerkType.HotBlooded, "Hot Blooded",
            "Raises minimum lust by up to 20.",
            "You choose the 'Hot Blooded' perk.  As a result of your enhanced libido, your lust no longer drops below 20! (If you already have some minimum lust, it will be increased by 10)"));
        this.set(PerkType.ImmovableObject, new PerkDescs.ImmovableObject());
        this.set(PerkType.IronMan, new PerkDesc(PerkType.IronMan, "Iron Man",
            "Reduces the fatigue cost of physical specials by 50%.",
            "You choose the 'Iron Man' perk, reducing the fatigue cost of physical special attacks by 50%"));
        this.set(PerkType.LightningStrikes, new PerkDescs.LightningStrikes());
        this.set(PerkType.LungingAttacks, new PerkDescs.LungingAttacks());
        this.set(PerkType.Mage, new PerkDesc(PerkType.Mage, "Mage",
            "Increases base spell strength by 50%.",
            "You choose the 'Mage' perk.  You are able to focus your magical abilities even more keenly, boosting your base spell effects by 50%."));
        this.set(PerkType.Masochist, new PerkDesc(PerkType.Masochist, "Masochist",
            "Take 30% less physical damage but gain lust when damage.",
            "You choose the 'Masochist' perk, reducing the damage you take but raising your lust each time!  This perk only functions while your libido is at or above 60!"));
        this.set(PerkType.Medicine, new PerkDesc(PerkType.Medicine, "Medicine",
            "Grants 15% chance per round of cleansing poisons/drugs from your body.",
            "You choose the 'Medicine' perk, giving you a chance to remove debilitating poisons automatically!"));
        this.set(PerkType.Nymphomania, new PerkDesc(PerkType.Nymphomania, "Nymphomania",
            "Raises minimum lust by up to 30.",
            "You've chosen the 'Nymphomania' perk.  Due to the incredible amount of corruption you've been exposed to, you've begun to live in a state of minor constant arousal.  Your minimum lust will be increased by as much as 30 (If you already have minimum lust, the increase is 10-15)."));
        this.set(PerkType.Precision, new PerkDesc(PerkType.Precision, "Precision",
            "Reduces enemy armor by 10. (Req's 25+ Intelligence)",
            "You've chosen the 'Precision' perk.  Thanks to your intelligence, you're now more adept at finding and striking an enemy's weak points, reducing their damage resistance from armor by 10.  If your intelligence ever drops below 25 you'll no longer be smart enough to benefit from this perk."));
        this.set(PerkType.Regeneration, new PerkDesc(PerkType.Regeneration, "Regeneration",
            "Regenerates 2% of max HP/hour and 1% of max HP/round.",
            "You choose the 'Regeneration' perk, allowing you to heal 2% of max HP every hour and 1% of max HP every round of combat!"));
        this.set(PerkType.Regeneration2, new PerkDesc(PerkType.Regeneration2, "Regeneration 2",
            "Gain 2% of max HP per round of combat and 4% of max HP per hour out of combat.",
            "You choose the 'Regeneration 2' perk, giving you an additional 2% of max HP per turn in combat and 4% of max HP per hour."));
        this.set(PerkType.Resistance, new PerkDesc(PerkType.Resistance, "Resistance",
            "Reduces lust gain by 10%.",
            "You choose the 'Resistance' perk, reducing the rate at which your lust increases by 10%."));
        this.set(PerkType.Resolute, new PerkDescs.Resolute());
        this.set(PerkType.Runner, new PerkDesc(PerkType.Runner, "Runner",
            "Increases chances of escaping combat.",
            "You choose the 'Runner' perk, increasing your chances to escape from your foes when fleeing!"));
        this.set(PerkType.Sadist, new PerkDesc(PerkType.Sadist, "Sadist",
            "Deal 20% more damage, but gain lust at the same time.",
            "You choose the 'Sadist' perk, increasing damage by 20 percent but causing you to gain lust from dealing damage."));
        this.set(PerkType.Seduction, new PerkDesc(PerkType.Seduction, "Seduction",
            "Upgrades your tease attack, making it more effective.",
            "You choose the 'Seduction' perk, upgrading the 'tease' attack with a more powerful damage and a higher chance of success."));
        this.set(PerkType.SpeedyRecovery, new PerkDesc(PerkType.SpeedyRecovery, "Speedy Recovery",
            "Regain fatigue 50% faster.",
            "You choose the 'Speedy Recovery' perk, boosting your fatigue recovery rate!"));
        this.set(PerkType.Spellpower, new PerkDesc(PerkType.Spellpower, "Spellpower",
            "Increases base spell strength by 50%.",
            "You choose the 'Spellpower' perk.  Thanks to your sizeable intellect and willpower, you are able to more effectively use magic, boosting base spell effects by 50%."));
        this.set(PerkType.StrongBack, new PerkDesc(PerkType.StrongBack, "Strong Back",
            "Enables fourth item slot.",
            "You choose the 'Strong Back' perk, enabling a fourth item slot."));
        this.set(PerkType.StrongBack2, new PerkDesc(PerkType.StrongBack2, "Strong Back 2: Strong Harder",
            "Enables fifth item slot.",
            "You choose the 'Strong Back 2: Strong Harder' perk, enabling a fifth item slot."));
        this.set(PerkType.Tactician, new PerkDescs.Tactician());
        this.set(PerkType.Tank, new PerkDesc(PerkType.Tank, "Tank",
            "Raises max HP by 50.",
            "You choose the 'Tank' perk, giving you an additional 50 hp!"));
        this.set(PerkType.Tank2, new PerkDesc(PerkType.Tank2, "Tank 2",
            "+1 extra HP per point of toughness.",
            "You choose the 'Tank 2' perk, granting an extra maximum HP for each point of toughness."));
        this.set(PerkType.ThunderousStrikes, new PerkDesc(PerkType.ThunderousStrikes, "Thunderous Strikes",
            "+20% 'Attack' damage while strength is at or above 80.",
            "You choose the 'Thunderous Strikes' perk, increasing normal damage by 20% while your strength is over 80."));
        this.set(PerkType.WeaponMastery, new PerkDescs.WeaponMastery());
        this.set(PerkType.WellAdjusted, new PerkDesc(PerkType.WellAdjusted, "Well Adjusted",
            "You gain half as much lust as time passes in Mareth.",
            "You choose the 'Well Adjusted' perk, reducing the amount of lust you naturally gain over time while in this strange land!"));

        // Needlework perks
        this.set(PerkType.ChiReflowAttack, new PerkDesc(PerkType.ChiReflowAttack, "Chi Reflow - Attack", "Chi Reflow - Attack",
            "Regular attacks boosted, but damage resistance decreased."));
        this.set(PerkType.ChiReflowDefense, new PerkDesc(PerkType.ChiReflowDefense, "Chi Reflow - Defense", "Chi Reflow - Defense",
            "Passive damage resistance, but caps speed"));
        this.set(PerkType.ChiReflowLust, new PerkDesc(PerkType.ChiReflowLust, "Chi Reflow - Lust", "Chi Reflow - Lust",
            "Lust resistance and Tease are enhanced, but Libido and Sensitivity gains increased."));
        this.set(PerkType.ChiReflowMagic, new PerkDesc(PerkType.ChiReflowMagic, "Chi Reflow - Magic", "Chi Reflow - Magic",
            "Magic attacks boosted, but regular attacks are weaker."));
        this.set(PerkType.ChiReflowSpeed, new PerkDesc(PerkType.ChiReflowSpeed, "Chi Reflow - Speed", "Chi Reflow - Speed",
            "Speed reductions are halved but caps strength"));

        // Piercing perks
        this.set(PerkType.PiercedCrimstone, new PerkDescs.PiercedCrimstone());
        this.set(PerkType.PiercedFertite, new PerkDescs.PiercedFertite());
        this.set(PerkType.PiercedFurrite, new PerkDesc(PerkType.PiercedFurrite, "Pierced: Furrite", "Pierced: Furrite",
            "Increases chances of encountering 'furry' foes."));
        this.set(PerkType.PiercedLethite, new PerkDesc(PerkType.PiercedLethite, "Pierced: Lethite", "Pierced: Lethite",
            "Increases chances of encountering demonic foes."));

        // Cock sock perks
        this.set(PerkType.LustyRegeneration, new PerkDesc(PerkType.LustyRegeneration, "Lusty Regeneration", "Lusty Regeneration",
            "Regenerates 1% of HP per round in combat and 2% of HP per hour."));
        this.set(PerkType.MidasCock, new PerkDesc(PerkType.MidasCock, "Midas Cock", "Midas Cock",
            "Increases the gems awarded from victory in battle."));
        this.set(PerkType.PentUp, new PerkDescs.PentUp());
        this.set(PerkType.PhallicPotential, new PerkDesc(PerkType.PhallicPotential, "Phallic Potential", "Phallic Potential",
            "Increases the effects of penis-enlarging transformations."));
        this.set(PerkType.PhallicRestraint, new PerkDesc(PerkType.PhallicRestraint, "Phallic Restraint", "Phallic Restraint",
            "Reduces the effects of penis-enlarging transformations."));

        // Armor perks
        this.set(PerkType.BloodMage, new PerkDesc(PerkType.BloodMage, "Blood Mage", "Blood Mage",
            "Spellcasting now consumes health instead of fatigue!"));
        this.set(PerkType.SluttySeduction, new PerkDescs.SluttySeduction());
        this.set(PerkType.WizardsEndurance, new PerkDescs.WizardsEndurance());

        // Weapon perks
        this.set(PerkType.WizardsFocus, new PerkDescs.WizardsFocus());

        // Achievement perks
        this.set(PerkType.BroodMother, new PerkDesc(PerkType.BroodMother, "Brood Mother", "Brood Mother",
            "Pregnancy moves twice as fast as a normal woman's."));
        this.set(PerkType.SpellcastingAffinity, new PerkDescs.SpellcastingAffinity());

        // Mutation perks
        this.set(PerkType.Androgyny, new PerkDesc(PerkType.Androgyny, "Androgyny", "Androgyny",
            "No gender limits on facial masculinity or femininity."));
        this.set(PerkType.BasiliskWomb, new PerkDesc(PerkType.BasiliskWomb, "Basilisk Womb", "Basilisk Womb",
            "Enables your eggs to be properly fertilized into basilisks of both genders!"));
        this.set(PerkType.BeeOvipositor, new PerkDesc(PerkType.BeeOvipositor, "Bee Ovipositor", "Bee Ovipositor",
            "Allows you to lay eggs through a special organ on your insect abdomen, though you need at least 10 eggs to lay."));
        this.set(PerkType.BimboBody, new PerkDesc(PerkType.BimboBody, "Bimbo Body", "Bimbo Body",
            "Gives the body of a bimbo.  Tits will never stay below a 'DD' cup, libido is raised, lust resistance is raised, and upgrades tease."));
        this.set(PerkType.BimboBrains, new PerkDesc(PerkType.BimboBrains, "Bimbo Brains", "Bimbo Brains",
            "Now that you've drank bimbo liquer, you'll never, like, have the attention span and intelligence you once did!  But it's okay, 'cause you get to be so horny an' stuff!"));
        this.set(PerkType.BroBody, new PerkDesc(PerkType.BroBody, "Bro Body", "Bro Body",
            "Grants an ubermasculine body that's sure to impress."));
        this.set(PerkType.BroBrains, new PerkDesc(PerkType.BroBrains, "Bro Brains", "Bro Brains",
            "Makes thou... thin... fuck, that shit's for nerds."));
        this.set(PerkType.BunnyEggs, new PerkDesc(PerkType.BunnyEggs, "Bunny Eggs", "Bunny Eggs",
            "Laying eggs has become a normal part of your bunny-body's routine."));
        this.set(PerkType.CorruptedNinetails, new PerkDesc(PerkType.CorruptedNinetails, "Corrupted Nine-tails", "Corrupted Nine-tails",
            "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells, but your method of attaining it has corrupted the transformation, preventing you from achieving true enlightenment."));
        this.set(PerkType.Diapause, new PerkDesc(PerkType.Diapause, "Diapause", "Diapause",
            "Pregnancy does not advance normally, but develops quickly after taking in fluids."));
        this.set(PerkType.Dragonfire, new PerkDesc(PerkType.Dragonfire, "Dragonfire", "Dragonfire",
            "Allows access to a dragon breath attack."));
        this.set(PerkType.EnlightenedNinetails, new PerkDesc(PerkType.EnlightenedNinetails, "Enlightened Nine-tails", "Enlightened Nine-tails",
            "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells."));
        this.set(PerkType.Feeder, new PerkDesc(PerkType.Feeder, "Feeder", "Feeder",
            "Lactation does not decrease and gives a compulsion to breastfeed others."));
        this.set(PerkType.Flexibility, new PerkDesc(PerkType.Flexibility, "Flexibility", "Flexibility",
            "Grants cat-like flexibility.  Useful for dodging and 'fun'."));
        this.set(PerkType.FutaFaculties, new PerkDesc(PerkType.FutaFaculties, "Futa Faculties", "Futa Faculties",
            "It's super hard to think about stuff that like, isn't working out or fucking!"));
        this.set(PerkType.FutaForm, new PerkDesc(PerkType.FutaForm, "Futa Form", "Futa Form",
            "Ensures that your body fits the Futa look (Tits DD+, Dick 8\"+, & Pussy).  Also keeps your lusts burning bright and improves the tease skill."));
        this.set(PerkType.HarpyWomb, new PerkDesc(PerkType.HarpyWomb, "Harpy Womb", "Harpy Womb",
            "Increases all laid eggs to large size so long as you have harpy legs and a harpy tail."));
        this.set(PerkType.Incorporeality, new PerkDesc(PerkType.Incorporeality, "Incorporeality", "Incorporeality",
            "Allows you to fade into a ghost-like state and temporarily possess others."));
        this.set(PerkType.MinotaurCumAddict, new PerkDesc(PerkType.MinotaurCumAddict, "Minotaur Cum Addict", "Minotaur Cum Addict",
            "Causes you to crave minotaur cum frequently.  You cannot shake this addiction."));
        this.set(PerkType.Oviposition, new PerkDesc(PerkType.Oviposition, "Oviposition", "Oviposition",
            "Causes you to regularly lay eggs when not otherwise pregnant."));
        this.set(PerkType.PurityBlessing, new PerkDesc(PerkType.PurityBlessing, "Purity Blessing", "Purity Blessing",
            "Reduces the rate at which your corruption, libido, and lust increase."));
        this.set(PerkType.SlimeCore, new PerkDesc(PerkType.SlimeCore, "Slime Core", "Slime Core",
            "Grants more control over your slimy body, allowing you to go twice as long without fluids."));
        this.set(PerkType.SpiderOvipositor, new PerkDesc(PerkType.SpiderOvipositor, "Spider Ovipositor", "Spider Ovipositor",
            "Allows you to lay eggs through a special organ on your arachnid abdomen, though you need at least 10 eggs to lay."));
        this.set(PerkType.ThickSkin, new PerkDesc(PerkType.ThickSkin, "Thick Skin", "Thick Skin",
            "Toughens your dermis to provide 2 points of armor."));

        // Quest, Event & NPC perks
        this.set(PerkType.BulgeArmor, new PerkDesc(PerkType.BulgeArmor, "Bulge Armor", "Bulge Armor",
            "Grants a 5 point damage bonus to dick-based tease attacks."));
        this.set(PerkType.Cornucopia, new PerkDesc(PerkType.Cornucopia, "Cornucopia", "Cornucopia",
            "Vaginal and Anal capacities increased by 30."));
        this.set(PerkType.ElvenBounty, new PerkDescs.ElvenBounty());
        this.set(PerkType.FerasBoonAlpha, new PerkDesc(PerkType.FerasBoonAlpha, "Fera's Boon - Alpha", "Fera's Boon - Alpha",
            "Increases the rate your cum builds up and cum production in general."));
        this.set(PerkType.FerasBoonBreedingBitch, new PerkDesc(PerkType.FerasBoonBreedingBitch, "Fera's Boon - Breeding Bitch", "Fera's Boon - Breeding Bitch",
            "Increases fertility and reduces the time it takes to birth young."));
        this.set(PerkType.FerasBoonMilkingTwat, new PerkDesc(PerkType.FerasBoonMilkingTwat, "Fera's Boon - Milking Twat",
            "Keeps your pussy from ever getting too loose and increases pregnancy speed.",
            "Keeps your pussy from ever getting too loose and increases pregnancy speed."));
        this.set(PerkType.FerasBoonSeeder, new PerkDesc(PerkType.FerasBoonSeeder, "Fera's Boon - Seeder",
            "Increases cum output by 1,000 mLs.",
            "Increases cum output by 1,000 mLs."));
        this.set(PerkType.FerasBoonWideOpen, new PerkDesc(PerkType.FerasBoonWideOpen, "Fera's Boon - Wide Open",
            "Keeps your pussy permanently gaped and increases pregnancy speed.",
            "Keeps your pussy permanently gaped and increases pregnancy speed."));
        this.set(PerkType.FireLord, new PerkDesc(PerkType.FireLord, "Fire Lord", "Fire Lord",
            "Akbal's blessings grant the ability to breathe burning green flames."));
        this.set(PerkType.Hellfire, new PerkDesc(PerkType.Hellfire, "Hellfire", "Hellfire",
            "Grants a corrupted fire breath attack, like the hellhounds in the mountains."));
        this.set(PerkType.LuststickAdapted, new PerkDesc(PerkType.LuststickAdapted, "Luststick Adapted", "Luststick Adapted",
            "Grants immunity to the lust-increasing effects of lust-stick and allows its use."));
        this.set(PerkType.MagicalFertility, new PerkDesc(PerkType.MagicalFertility, "Magical Fertility",
            "10% higher chance of pregnancy and increased pregnancy speed.",
            "10% higher chance of pregnancy and increased pregnancy speed."));
        this.set(PerkType.MagicalVirility, new PerkDesc(PerkType.MagicalVirility, "Magical Virility",
            "200 mLs more cum per orgasm and enhanced virility.",
            "200 mLs more cum per orgasm and enhanced virility."));
        this.set(PerkType.MaraesGiftButtslut, new PerkDesc(PerkType.MaraesGiftButtslut, "Marae's Gift - Buttslut", "Marae's Gift - Buttslut",
            "Makes your anus provide lubrication when aroused."));
        this.set(PerkType.MaraesGiftFertility, new PerkDesc(PerkType.MaraesGiftFertility, "Marae's Gift - Fertility", "Marae's Gift - Fertility",
            "Greatly increases fertility and halves base pregnancy speed."));
        this.set(PerkType.MaraesGiftProfractory, new PerkDesc(PerkType.MaraesGiftProfractory, "Marae's Gift - Profractory", "Marae's Gift - Profractory",
            "Causes your cum to build up at 3x the normal rate."));
        this.set(PerkType.MaraesGiftStud, new PerkDesc(PerkType.MaraesGiftStud, "Marae's Gift - Stud", "Marae's Gift - Stud",
            "Increases your cum production and potency greatly."));
        this.set(PerkType.MarbleResistant, new PerkDesc(PerkType.MarbleResistant, "Marble Resistant", "Marble Resistant",
            "Provides resistance to the addictive effects of bottled LaBova milk."));
        this.set(PerkType.MarblesMilk, new PerkDesc(PerkType.MarblesMilk, "Marble's Milk", "Marble's Milk",
            "Requires you to drink LaBova milk frequently or eventually die.  You cannot shake this addiction."));
        this.set(PerkType.Misdirection, new PerkDesc(PerkType.Misdirection, "Misdirection", "Misdirection",
            "Grants additional evasion chances while wearing Raphael's red bodysuit."));
        this.set(PerkType.OmnibusGift, new PerkDesc(PerkType.OmnibusGift, "Omnibus' Gift", "Omnibus' Gift",
            "Increases minimum lust but provides some lust resistance."));
        this.set(PerkType.OneTrackMind, new PerkDesc(PerkType.OneTrackMind, "One Track Mind", "One Track Mind",
            "Your constant desire for sex causes your sexual organs to be able to take larger insertions and disgorge greater amounts of fluid."));
        this.set(PerkType.PilgrimsBounty, new PerkDesc(PerkType.PilgrimsBounty, "Pilgrim's Bounty", "Pilgrim's Bounty",
            "Causes you to always cum as hard as if you had max lust."));
        this.set(PerkType.PureAndLoving, new PerkDesc(PerkType.PureAndLoving, "Pure and Loving", "Pure and Loving",
            "Your caring attitude towards love and romance makes you slightly more resistant to lust and corruption."));
        this.set(PerkType.SensualLover, new PerkDesc(PerkType.SensualLover, "Sensual Lover", "Sensual Lover",
            "Your sensual attitude towards love and romance makes your tease ability slightly more effective."));
        this.set(PerkType.Whispered, new PerkDesc(PerkType.Whispered, "Whispered", "Whispered",
            "Akbal's blessings grant limited telepathy that can induce fear."));

        this.set(PerkType.ControlledBreath, new PerkDescs.ControlledBreathPerk());
        this.set(PerkType.CleansingPalm, new PerkDescs.CleansingPalm());
        this.set(PerkType.Enlightened, new PerkDescs.Enlightened());

        // Monster perks
        this.set(PerkType.Acid, new PerkDesc(PerkType.Acid, "Acid", "Acid", ""));
    }
}
