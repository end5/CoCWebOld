import Character from '../../../Character/Character';
import { CharacterType } from '../../../Character/CharacterType';
import CombatAction from '../../../Combat/Actions/CombatAction';
import CombatUtils from '../../../Combat/CombatUtils';
import DisplayText from '../../../display/DisplayText';
import CombatEffectFactory from '../../../Effects/CombatEffectFactory';
import { CombatEffectType } from '../../../Effects/CombatEffectType';
import { PerkType } from '../../../Effects/PerkType';
import Flags, { FlagEnum } from '../../../Game/Flags';
import Utils from '../../../Utilities/Utils';

export default class Attack implements CombatAction {
    public name: string = "Attack";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, monster: Character): boolean {
        return true;
    }

    public use(character: Character, monster: Character): void {
        this.miss(character, monster);
        let damage = this.determineDamage(character, monster);
        this.applyDamage(character, monster, damage);
    }

    private miss(character: Character, monster: Character): void {
        if (!character.combat.effects.has(CombatEffectType.FirstAttack)) {
            DisplayText.clear();
            CombatUtils.fatigueRecovery(character);
        }
        if (character.combat.effects.has(CombatEffectType.Sealed) && character.combat.effects.get(CombatEffectType.Sealed).value2 == 0) {
            DisplayText.text("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  The kitsune's seals have made normal attack impossible!  Maybe you could try something else?\n\n");
            return;
        }
        if (Flags.list[FlagEnum.PC_FETISH] >= 3 && !urtaQuest.isUrta()) {
            DisplayText.text("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  Ceraph's piercings have made normal attack impossible!  Maybe you could try something else?\n\n");
            return;
        }
        //Amily!
        if (monster.combat.effects.has(CombatEffectType.Concentration)) {
            DisplayText.clear();
            DisplayText.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        if (monster.combat.effects.has(CombatEffectType.Level) && !character.combat.effects.has(CombatEffectType.FirstAttack)) {
            DisplayText.text("It's all or nothing!  With a bellowing cry you charge down the treacherous slope and smite the sandtrap as hard as you can!  ");
            <SandTrap>monster.trapLevel(-4);
        }
        if (character.perks.has(PerkType.DoubleAttack) && character.stats.spe >= 50 && Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] < 2) {
            if (character.combat.effects.has(CombatEffectType.FirstAttack)) character.combat.effects.remove(CombatEffectType.FirstAttack);
            else {
                //Always!
                if (Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] == 0) character.combat.effects.add(CombatEffectFactory.create(CombatEffectType.FirstAttack, 0, 0, 0, 0));
                //Alternate!
                else if (character.stats.str < 61 && Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] == 1) character.combat.effects.add(CombatEffectFactory.create(CombatEffectType.FirstAttack, 0, 0, 0, 0));
            }
        }
        //"Brawler perk". Urta only. Thanks to Fenoxo for pointing this out... Even though that should have been obvious :<
        //Urta has fists and the Brawler perk. Don't check for that because Urta can't drop her fists or lose the perk!
        else if (urtaQuest.isUrta()) {
            if (character.combat.effects.has(CombatEffectType.FirstAttack)) {
                character.combat.effects.remove(CombatEffectType.FirstAttack);
            }
            else {
                character.combat.effects.add(CombatEffectFactory.create(CombatEffectType.FirstAttack, 0, 0, 0, 0));
                DisplayText.text("Utilizing your skills as a bareknuckle brawler, you make two attacks!\n");
            }
        }
        //Blind
        if (character.combat.effects.has(CombatEffectType.Blind)) {
            DisplayText.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ");
        }
        if (monster.charType == CharacterType.Basilisk) {
            //basilisk counter attack (block attack, significant speed loss): 
            if (character.stats.int / 5 + Utils.rand(20) < 25) {
                DisplayText.text("Holding the basilisk in your peripheral vision, you charge forward to strike it.  Before the moment of impact, the reptile shifts its posture, dodging and flowing backward skillfully with your movements, trying to make eye contact with you. You find yourself staring directly into the basilisk's face!  Quickly you snap your eyes shut and recoil backwards, swinging madly at the lizard to force it back, but the damage has been done; you can see the terrible grey eyes behind your closed lids, and you feel a great weight settle on your bones as it becomes harder to move.");
                Basilisk.basiliskSpeed(character, 20);
                character.combat.effects.remove(CombatEffectType.FirstAttack);
                return;
            }
            //Counter attack fails: (Utils.random chance if PC int > 50 spd > 60; PC takes small physical damage but no block or spd penalty)
            else {
                DisplayText.text("Holding the basilisk in your peripheral vision, you charge forward to strike it.  Before the moment of impact, the reptile shifts its posture, dodging and flowing backward skillfully with your movements, trying to make eye contact with you. You twist unexpectedly, bringing your " + character.inventory.weaponSlot.equipment.displayname + " up at an oblique angle; the basilisk doesn't anticipate this attack!  ");
            }
        }
        //Worms are special
        if (monster.desc.short == "worms") {
            //50% chance of hit (int boost)
            if (Utils.rand(100) + character.stats.int / 3 >= 50) {
                let damage = Math.floor(character.stats.str / 5 - Utils.rand(5));
                if (damage == 0) damage = 1;
                DisplayText.text("You strike at the amalgamation, crushing countless worms into goo, dealing " + damage + " damage.\n\n");
                monster.combat.stats.loseHP(damage, character);
            }
            //Fail
            else {
                DisplayText.text("You attempt to crush the worms with your reprisal, only to have the collective move its individual members, creating a void at the point of impact, leaving you to attack only empty air.\n\n");
            }
            if (character.combat.effects.has(CombatEffectType.FirstAttack)) {
                return;
            }
            return;
        }
        //Determine if dodged!
        if ((character.combat.effects.has(CombatEffectType.Blind) && Utils.rand(2) == 0) || (monster.stats.spe - character.stats.spe > 0 && Utils.rand(((monster.stats.spe - character.stats.spe) / 4) + 80) > 80)) {
            //Akbal dodges special education
            if (monster.desc.short == "Akbal")
                DisplayText.text("Akbal moves like lightning, weaving in and out of your furious strikes with the speed and grace befitting his jaguar body.\n");
            else if (monster.desc.short == "plain girl")
                DisplayText.text("You wait patiently for your opponent to drop her guard. She ducks in and throws a right cross, which you roll away from before smacking your " + character.inventory.weaponSlot.equipment.displayname + " against her side. Astonishingly, the attack appears to phase right through her, not affecting her in the slightest. You glance down to your " + character.inventory.weaponSlot.equipment.displayname + " as if betrayed.\n");
            else if (monster.desc.short == "kitsune") {
                // Player Miss:
                DisplayText.text("You swing your [weapon] ferociously, confident that you can strike a crushing blow.  To your surprise, you stumble awkwardly as the attack passes straight through her - a mirage!  You curse as you hear a giggle behind you, turning to face her once again.\n\n");
            }
            else {
                if (monster.stats.spe - character.stats.spe < 8)
                    DisplayText.text(monster.desc.capitalA + monster.desc.short + " narrowly avoids your attack!");
                if (monster.stats.spe - character.stats.spe >= 8 && monster.stats.spe - character.stats.spe < 20)
                    DisplayText.text(monster.desc.capitalA + monster.desc.short + " dodges your attack with superior quickness!");
                if (monster.stats.spe - character.stats.spe >= 20)
                    DisplayText.text(monster.desc.capitalA + monster.desc.short + " deftly avoids your slow attack.");
                DisplayText.text("\n");
                if (character.combat.effects.has(CombatEffectType.FirstAttack)) {
                    this.use(character, monster);
                    return;
                }
                else
                    DisplayText.text("\n");
            }
            return;
        }
        //BLOCKED ATTACK:
        if (monster.combat.effects.has(CombatEffectType.Earthshield) && Utils.rand(4) == 0) {
            DisplayText.text("Your strike is deflected by the wall of sand, dirt, and rock!  Damn!\n");
            if (character.combat.effects.has(CombatEffectType.FirstAttack)) {
                this.use(character, monster);
                return;
            }
            else
                DisplayText.text("\n");
            return;
        }

    }

    private determineDamage(character: Character, monster: Character): number {
        let damage: number = 0;
        //Determine damage
        /*Determine damage - str modified by enemy toughness!
        if(character.hasPerk("Double Attack") >= 0 && character.stats.str <= 60) {
            if(character.weaponName == "deadly spear") damage = int((character.stats.str + character.weaponAttack) - Math.random()*(monster.tou));
            else if(character.weaponName == "jeweled rapier") damage = int((character.stats.str + character.weaponAttack) - Math.random()*(monster.tou));
            else if(character.weaponName == "katana") damage = int((character.stats.str + character.weaponAttack) - Math.random()*(monster.tou + monster.combat.stats.defense() - 5));
            else damage = int((character.stats.str + character.weaponAttack) - Math.random()*(monster.tou + monster.combat.stats.defense()));
        }*/
        //BASIC DAMAGE STUFF
        //Double Attack Hybrid Reductions
        if (character.perks.has(PerkType.DoubleAttack) && character.stats.spe >= 50 && character.stats.str > 61 && Flags[FlagEnum.DOUBLE_ATTACK_STYLE] == 0) {
            damage = 60.5;
        }
        else
            damage = character.stats.str;
        //Weapon addition!
        damage += character.inventory.weaponSlot.equipment.attack;
        //Bonus sand trap damage!
        if (monster.combat.effects.has(CombatEffectType.Level)) damage = Math.round(damage * 1.75);
        //Determine if critical hit!
        var crit: Boolean = false;
        if (Utils.rand(100) <= 4 || (character.perks.has(PerkType.Tactician) && character.stats.int >= 50 && (character.stats.int - 50) / 5 > Utils.rand(100))) {
            crit = true;
            damage *= 1.75;
        }
        //Start figuring enemy damage resistance
        let reduction: number = Utils.rand(monster.stats.tou);
        //Add in enemy armor if needed
        if (character.inventory.weaponSlot.equipment.displayname != "jeweled rapier" && character.inventory.weaponSlot.equipment.displayname != "deadly spear") {
            reduction += monster.combat.stats.defense();
            //Remove half armor for lunging strikes
            if (character.perks.has(PerkType.LungingAttacks))
                reduction -= monster.combat.stats.defense() / 2;
        }
        //Take 5 off enemy armor for katana
        if (character.inventory.weaponSlot.equipment.displayname == "katana") {
            //Knock off 5
            if (monster.combat.stats.defense() >= 5)
                reduction -= 5;
            //Less than 5 armor?  TAKE IT ALL!
            else
                reduction -= monster.combat.stats.defense();
        }
        //Apply AND DONE!
        damage -= reduction;
        //Damage post processing!
        //Thunderous Strikes
        if (character.perks.has(PerkType.ThunderousStrikes) && character.stats.str >= 80)
            damage *= 1.2;

        if (character.perks.has(PerkType.ChiReflowMagic)) damage *= UmasShop.NEEDLEWORK_MAGIC_REGULAR_MULTI;
        if (character.perks.has(PerkType.ChiReflowAttack)) damage *= UmasShop.NEEDLEWORK_ATTACK_REGULAR_MULTI;

        //One final round
        damage = Math.round(damage);
        return damage;
    }

    private applyDamage(character: Character, monster: Character, damage: number): void {
        //ANEMONE SHIT
        if (monster.desc.short == "anemone") {
            //hit successful:
            //special event, block (no more than 10-20% of turns, also fails if PC has >75 corruption):
            if (Utils.rand(10) <= 1) {
                DisplayText.text("Seeing your " + character.inventory.weaponSlot.equipment.displayname + " raised, the anemone looks down at the water, angles her eyes up at you, and puts out a trembling lip.  ");
                if (character.stats.cor < 75) {
                    DisplayText.text("You stare into her hangdog expression and lose most of the killing intensity you had summoned up for your attack, stopping a few feet short of hitting her.\n");
                    damage = 0;
                    //Kick back to main if no damage occured!
                    if (monster.stats.HP > 0 && monster.stats.lust < 100) {
                        if (character.combat.effects.has(CombatEffectType.FirstAttack)) {
                            this.use(character, monster);
                            return;
                        }
                    }
                    return;
                }
                else
                    DisplayText.text("Though you lose a bit of steam to the display, the drive for dominance still motivates you to follow through on your swing.");
            }
        }

        // Have to put it before doDamage, because doDamage applies the change, as well as status effects and shit.
        if (monster.charType == CharacterType.Doppleganger) {
            if (!monster.combat.effects.has(CombatEffectType.Stunned)) {
                if (damage > 0 && character.perks.has(PerkType.HistoryFighter))
                    damage *= 1.1;
                if (damage > 0)
                    damage = monster.combat.stats.loseHP(damage, character);

                <Doppleganger>monster.mirrorAttack(damage);
                return;
            }

            // Stunning the doppleganger should now "buy" you another round.
        }

        if (damage > 0) {
            if (character.perks.has(PerkType.HistoryFighter))
                damage *= 1.1;
            damage = monster.combat.stats.loseHP(damage, character);
        }

        if (damage <= 0) {
            damage = 0;
            DisplayText.text("Your attacks are deflected or blocked by " + monster.desc.a + monster.desc.short + ".");
        }
        else {
            DisplayText.text("You hit " + monster.desc.a + monster.desc.short + "! (" + damage + ")");
            if (crit)
                DisplayText.text(" <b>*CRIT*</b>");
        }
        if (character.perks.has(PerkType.BrutalBlows) && character.stats.str > 75) {
            if (monster.combat.stats.defense() > 0)
                DisplayText.text("\nYour hits are so brutal that you damage " + monster.desc.a + monster.desc.short + "'s defenses!");
            if (monster.combat.stats.defense() - 10 > 0)
                monster.combat.stats.defenseMod -= 10;
            else
                monster.combat.stats.defenseMod = 0;
        }
        if (damage > 0) {
            //Lust raised by anemone contact!
            if (monster.desc.short == "anemone") {
                DisplayText.text("\nThough you managed to hit the anemone, several of the tentacles surrounding her body sent home jolts of venom when your swing brushed past them.");
                //(gain lust, temp lose str/spd)
                <Anemone>monster.applyVenom((1 + Utils.rand(2)));
            }

            //Lust raising weapon bonuses
            if (monster.stats.lustVuln > 0) {
                if (character.inventory.weaponSlot.equipment.perk == "Aphrodisiac Weapon") {
                    monster.stats.lust += monster.stats.lustVuln * (5 + character.stats.cor / 10);
                    DisplayText.text("\n" + monster.desc.capitalA + monster.desc.short + " shivers as your weapon's 'poison' goes to work.");
                }
                if (character.inventory.weaponSlot.equipment.displayname == "coiled whip" && Utils.rand(2) == 0) {
                    monster.stats.lust += monster.stats.lustVuln * (5 + character.stats.cor / 12);
                    if (!monster.desc.plural)
                        DisplayText.text("\n" + monster.desc.capitalA + monster.desc.short + " shivers and gets turned on from the whipping.");
                    else
                        DisplayText.text("\n" + monster.desc.capitalA + monster.desc.short + " shiver and get turned on from the whipping.");
                }
                if (character.inventory.weaponSlot.equipment.displayname == "succubi whip") {
                    monster.stats.lust += monster.stats.lustVuln * (20 + character.stats.cor / 15);
                    if (character.stats.cor < 90) character.stats.cor += 0.3;
                    if (!monster.desc.plural)
                        DisplayText.text("\n" + monster.desc.capitalA + monster.desc.short + " shivers and moans involuntarily from the whip's touches.");
                    else
                        DisplayText.text("\n" + monster.desc.capitalA + monster.desc.short + " shiver and moan involuntarily from the whip's touches.");
                    if (Utils.rand(2) == 0) {
                        DisplayText.text("  You get a sexual thrill from it.");
                        character.stats.lust += 1;
                    }
                }
            }
            //Weapon Procs!
            if (character.inventory.weaponSlot.equipment.displayname == "huge warhammer" || character.inventory.weaponSlot.equipment.displayname == "spiked gauntlet" || character.inventory.weaponSlot.equipment.displayname == "hooked gauntlets") {
                //10% chance
                if (Utils.rand(10) == 0 && !monster.perks.has(PerkType.Resolute)) {
                    DisplayText.text("\n" + monster.desc.capitalA + monster.desc.short + " reels from the brutal blow, stunned.");
                    monster.combat.effects.add(CombatEffectFactory.create(CombatEffectType.Stunned, 0, 0, 0, 0));
                }
                //50% Bleed chance
                if (character.inventory.weaponSlot.equipment.displayname == "hooked gauntlets" && Utils.rand(2) == 0 && monster.combat.stats.defense() < 10 && !monster.combat.effects.has(CombatEffectType.IzmaBleed)) {
                    if (monster.charType == CharacterType.LivingStatue) {
                        DisplayText.text("Despite the rents you've torn in its stony exterior, the statue does not bleed.");
                    }
                    else {
                        monster.combat.effects.add(CombatEffectFactory.create(CombatEffectType.IzmaBleed, 3, 0, 0, 0));
                        if (monster.desc.plural)
                            DisplayText.text("\n" + monster.desc.capitalA + monster.desc.short + " bleed profusely from the many bloody gashes your hooked gauntlets leave behind.");
                        else
                            DisplayText.text("\n" + monster.desc.capitalA + monster.desc.short + " bleeds profusely from the many bloody gashes your hooked gauntlets leave behind.");
                    }
                }
            }
        }

        if (monster.charType == CharacterType.JeanClaude && !character.combat.effects.has(CombatEffectType.FirstAttack)) {
            if (monster.stats.HP < 1 || monster.stats.lust > 99) {
                // noop
            }
            if (character.stats.lust <= 30) {
                DisplayText.text("\n\nJean-Claude doesn’t even budge when you wade into him with your [weapon].");

                DisplayText.text("\n\n“<i>Why are you attacking me, slave?</i>” he says. The basilisk rex sounds genuinely confused. His eyes pulse with hot, yellow light, reaching into you as he opens his arms, staring around as if begging the crowd for an explanation. “<i>You seem lost, unable to understand, lashing out at those who take care of you. Don’t you know who you are? Where you are?</i>” That compulsion in his eyes, that never-ending heat, it’s... it’s changing things. You need to finish this as fast as you can.");
            }
            else if (character.stats.lust <= 50) {
                DisplayText.text("\n\nAgain your [weapon] thumps into Jean-Claude. Again it feels wrong. Again it sends an aching chime through you, that you are doing something that revolts your nature.");

                DisplayText.text("\n\n“<i>Why are you fighting your master, slave?</i>” he says. He is bigger than he was before. Or maybe you are smaller. “<i>You are confused. Put your weapon down- you are no warrior, you only hurt yourself when you flail around with it. You have forgotten what you were trained to be. Put it down, and let me help you.</i>” He’s right. It does hurt. Your body murmurs that it would feel so much better to open up and bask in the golden eyes fully, let it move you and penetrate you as it may. You grit your teeth and grip your [weapon] harder, but you can’t stop the warmth the hypnotic compulsion is building within you.");
            }
            else if (character.stats.lust <= 80) {
                DisplayText.text("\n\n“<i>Do you think I will be angry at you?</i>” growls Jean-Claude lowly. Your senses feel intensified, his wild, musky scent rich in your nose. It’s hard to concentrate... or rather it’s hard not to concentrate on the sweat which runs down his hard, defined frame, the thickness of his bulging cocks, the assured movement of his powerful legs and tail, and the glow, that tantalizing, golden glow, which pulls you in and pushes so much delicious thought and sensation into your head…  “<i>I am not angry. You will have to be punished, yes, but you know that is only right, that in the end you will accept and enjoy being corrected. Come now, slave. You only increase the size of the punishment with this silliness.</i>”");
            }
            else {
                DisplayText.text("\n\nYou can’t... there is a reason why you keep raising your weapon against your master, but what was it? It can’t be that you think you can defeat such a powerful, godly alpha male as him. And it would feel so much better to supplicate yourself before the glow, lose yourself in it forever, serve it with your horny slut body, the only thing someone as low and helpless as you could possibly offer him. Master’s mouth is moving but you can no longer tell where his voice ends and the one in your head begins... only there is a reason you cling to like you cling onto your [weapon], whatever it is, however stupid and distant it now seems, a reason to keep fighting...");
            }
            character.stats.lust += 25;
        }

        DisplayText.text("\n");
        //Kick back to main if no damage occured!
        if (monster.stats.HP >= 1 && monster.stats.lust <= 99) {
            if (character.combat.effects.has(CombatEffectType.FirstAttack)) {
                this.use(character, monster);
                return;
            }
            DisplayText.text("\n");
        }
    }

}