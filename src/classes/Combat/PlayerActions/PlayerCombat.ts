import PlayerAttack from './PlayerAttack';
import PlayerCombatAction from './PlayerCombatAction';
import PlayerCombatInterface from './PlayerCombatInterface';
import * as MagicalAttack from './PlayerMagicalAttacks';
import * as PhysicalAttack from './PlayerPhysicalAttacks';
import PlayerRun from './PlayerRun';
import PlayerStruggle from './PlayerStruggle';
import Tease from './Tease';
import { EarType } from '../../Body/Head';
import { TailType } from '../../Body/LowerBody';
import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import MainScreen from '../../display/MainScreen';
import StatusAffect from '../../Effects/StatusAffect';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class PlayerCombat implements PlayerCombatInterface {
    private attackAction = new PlayerAttack();
    private struggleAction = new PlayerStruggle();
    private teaseAction = new Tease();
    private runAction = new PlayerRun();
    
    public attack(player: Player, monster: Character): number {
        return this.attackAction.use(player, monster);
    }

    public struggle(player: Player, monster: Character): void {
        this.struggleAction.use(player, monster);
    }

    public tease(player: Player, monster: Character) {
        this.teaseAction.use(player, monster, true);
    }
    
    public spells(player: Player, monster: Character) {
        throw new Error("Method not implemented.");
    }
    
    public useItem(player: Player, monster: Character) {
        throw new Error("Method not implemented.");
    }

    public run(player: Player, monster: Character, success: boolean) {
        this.runAction.use(player, monster, success);
    }

    public physicalAttacks(player: Player): SpecialAction[] {
        let list: SpecialAction[] = [];
        if (player.upperBody.head.hairType == 4) {
            list.push(new PhysicalAttack.AnomoneSting());
        }
        //Bitez
        if (player.upperBody.head.face.faceType == FaceType.SHARK_TEETH) {
            list.push(new PhysicalAttack.Bite());
        }
        else if (player.upperBody.head.face.faceType == FaceType.SNAKE_FANGS) {
            list.push(new PhysicalAttack.NagaBiteAttack());
        }
        else if (player.upperBody.head.face.faceType == FaceType.SPIDER_FANGS) {
            list.push(new PhysicalAttack.SpiderBiteAttack());
        }
        //Bow attack
        if (player.hasKeyItem("Bow")) {
            list.push(new PhysicalAttack.FireBow());
        }
        //Constrict
        if (player.lowerBody.type == LowerBodyType.NAGA) {
            list.push(desert.nagaScene.nagaPlayerConstrict);
        }
        //Kick attackuuuu
        else if (player.lowerBody.isTaur() || player.lowerBody.type == LowerBodyType.HOOFED || player.lowerBody.type == LowerBodyType.BUNNY || player.lowerBody.type == LowerBodyType.KANGAROO) {
            list.push(new PhysicalAttack.Kick());
        }
        //Gore if mino horns
        if (player.upperBody.head.hornType == HornType.COW_MINOTAUR && player.upperBody.head.horns >= 6) {
            list.push(new PhysicalAttack.Gore());
        }
        //Infest if infested
        if (player.statusAffects.has("Infested") && player.statusAffects.get("Infested").value1 == 5 && player.lowerBody.cockSpot.hasCock()) {
            list.push(this.playerInfest);
        }
        //Kiss supercedes bite.
        if (player.statusAffects.has("LustStickApplied")) {
            list.push(new PhysicalAttack.Kiss());
        }
        switch (player.lowerBody.tailType) {
            case TailType.BEE_ABDOMEN:
                list.push(new PhysicalAttack.Sting());
                break;
            case TailType.SPIDER_ABDOMEN:
                list.push(new PhysicalAttack.Web());
                break;
            case TailType.SHARK:
            case TailType.LIZARD:
            case TailType.KANGAROO:
            case TailType.DRACONIC:
            case TailType.RACCOON:
                list.push(new PhysicalAttack.TailWhip());
            default:
        }
        return list;
    }

    public magicAttacks(player: Player): SpecialAction[] {
        let list: SpecialAction[] = [];
        if (player.perks.has("Berzerker")) {
            list.push(new MagicalAttack.Berserk());
        }
        if (player.perks.has("Dragonfire")) {
            list.push(new MagicalAttack.DragonBreath());
        }
        if (player.perks.has("FireLord")) {
            list.push(new MagicalAttack.Fireball());
        }
        if (player.perks.has("Hellfire")) {
            list.push(new MagicalAttack.Hellfire());
        }
        if (player.perks.has("Incorporeality")) {
            list.push(new MagicalAttack.Possess());
        }
        if (player.perks.has("Whispered")) {
            list.push(new MagicalAttack.SuperWhisperAttack());
        }
        if (player.perks.has("CorruptedNinetails")) {
            list.push(new MagicalAttack.CorruptedFoxFire());
            list.push(new MagicalAttack.KitsuneTerror());
        }
        if (player.perks.has("EnlightenedNinetails")) {
            list.push(new MagicalAttack.FoxFire());
            list.push(new MagicalAttack.KitsuneTerror());
        }
        if (player.statusAffects.has("ShieldingSpell"))
            list.push(new MagicalAttack.ShieldingSpell());
        if (player.statusAffects.has("ImmolationSpell"))
            list.push(new MagicalAttack.ImmolationSpell());

        return list;
    }

    public wait(player: Player, monster: Monster) {
        //Gain fatigue if not fighting sand tarps
        if (!monster.statusAffects.has("Level")) fatigue(-5);
        Flags.list[FlagEnum.IN_COMBAT_USE_PLAYER_WAITED_FLAG] = 1;
        if (monster.statusAffects.has("PCTailTangle")) {
            (monster as Kitsune).kitsuneWait();
        }
        else if (monster.statusAffects.has("Level")) {
            (monster as SandTrap).sandTrapWait();
        }
        else if (monster.statusAffects.has("MinotaurEntangled")) {
            MainScreen.clearText();
            MainScreen.text("You sigh and relax in the chains, eying the well-endowed minotaur as you await whatever rough treatment he desires to give.  His musky, utterly male scent wafts your way on the wind, and you feel droplets of your lust dripping down your thighs.  You lick your lips as you watch the pre-cum drip from his balls, eager to get down there and worship them.  Why did you ever try to struggle against this fate?\n\n");
            player.stats.lustResisted = false;
            player.stats.lust += 30 + Utils.rand(5);
            enemyAI();
        }
        else if (player.statusAffects.has("Whispered")) {
            MainScreen.clearText();
            MainScreen.text("You shake off the mental compulsions and ready yourself to fight!\n\n");
            player.statusAffects.remove("Whispered");
            enemyAI();
        }
        else if (player.statusAffects.has("HarpyBind")) {
            MainScreen.clearText();
            temp = 80 + Utils.rand(40);
            temp = takeDamage(temp);
            MainScreen.text("The brood continues to hammer away at your defenseless self. (" + temp + ")");
            combatRoundOver();
        }
        else if (monster.statusAffects.has("QueenBind")) {
            ropeStruggles(true);
        }
        else if (player.statusAffects.has("GooBind")) {
            MainScreen.clearText();
            MainScreen.text("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours.");
            temp = takeDamage(.35 * maxHP());
            MainScreen.text(" (" + temp + ")");
            combatRoundOver();
        }
        else if (player.statusAffects.has("GooArmorBind")) {
            MainScreen.clearText();
            MainScreen.text("Suddenly, the goo-girl leaks half-way out of her heavy armor and lunges at you. You attempt to dodge her attack, but she doesn't try and hit you - instead, she wraps around you, pinning your arms to your chest. More and more goo latches onto you - you'll have to fight to get out of this.");
            player.statusAffects.get("GooArmorBind").value1 = 1;
            if (player.statusAffects.get("GooArmorBind").value1 >= 5) {
                if (monster.statusAffects.has("Spar"))
                    valeria.pcWinsValeriaSparDefeat();
                else gooArmorBeatsUpPC();
                return;
            }
            combatRoundOver();
        }
        else if (player.statusAffects.has("NagaBind")) {
            MainScreen.clearText();
            MainScreen.text("The naga's grip on you tightens as you relax into the stimulating pressure.");
            dynStats("lus", player.stats.sens / 5 + 5);
            takeDamage(5 + Utils.rand(5));
            combatRoundOver();
        }
        else if (player.statusAffects.has("HolliConstrict")) {
            (monster as Holli).waitForHolliConstrict(true);
        }
        else if (player.statusAffects.has("TentacleBind")) {
            MainScreen.clearText();
            if (player.lowerBody.cockSpot.count() > 0)
                MainScreen.text("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
            else if (player.lowerBody.vaginaSpot.hasVagina())
                MainScreen.text("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing!");
            else MainScreen.text("The creature continues probing at your asshole and has now latched " + num2Text(player.upperBody.chest.countNipples()) + " more suckers onto your nipples, amplifying your growing lust.  You must escape or you will become a mere toy to this thing!");
            dynStats("lus", (8 + player.stats.sens / 10));
            combatRoundOver();
        }
        else if (player.statusAffects.has("IsabellaStunned")) {
            MainScreen.clearText();
            MainScreen.text("You wobble about for some time but manage to recover. Isabella capitalizes on your wasted time to act again.\n\n");
            player.statusAffects.remove("IsabellaStunned");
            enemyAI();
        }
        else if (player.statusAffects.has("Stunned")) {
            MainScreen.clearText();
            MainScreen.text("You wobble about, stunned for a moment.  After shaking your head, you clear the stars from your vision, but by then you've squandered your chance to act.\n\n");
            player.statusAffects.remove("Stunned");
            enemyAI();
        }
        else if (player.statusAffects.has("Confusion")) {
            MainScreen.clearText();
            MainScreen.text("You shake your head and file your memories in the past, where they belong.  It's time to fight!\n\n");
            player.statusAffects.remove("Confusion");
            enemyAI();
        }
        else if (monster instanceof Doppleganger) {
            MainScreen.clearText();
            MainScreen.text("You decide not to take any action this round.\n\n");
            (monster as Doppleganger).handlePlayerWait();
            enemyAI();
        }
        else {
            MainScreen.clearText();
            MainScreen.text("You decide not to take any action this round.\n\n");
            enemyAI();
        }
    }

    public fantasize() {
        let temp2: number = 0;
        doNext(combatMenu);
        MainScreen.text("", true);
        if (player.inventory.armorSlot.equipment.displayName == "goo armor") {
            MainScreen.text("As you fantasize, you feel Valeria rubbing her gooey body all across your sensitive skin");
            if (player.gender > 0) MainScreen.text(" and genitals");
            MainScreen.text(", arousing you even further.\n");
            temp2 = 25 + Utils.rand(player.stats.lib / 8 + player.stats.cor / 8)
        }
        else if (player.lowerBody.balls > 0 && player.lowerBody.ballSize >= 10 && Utils.rand(2) == 0) {
            MainScreen.text("You daydream about fucking " + monster.desc.a + monster.desc.short + ", feeling your balls swell with seed as you prepare to fuck " + monster.desc.objectivePronoun + " full of cum.\n", false);
            temp2 = 5 + Utils.rand(player.stats.lib / 8 + player.stats.cor / 8);
            MainScreen.text("You aren't sure if it's just the fantasy, but your " + BallsDescriptor.describeBalls(true, true, player) + " do feel fuller than before...\n", false);
            player.hoursSinceCum += 50;
        }
        else if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 6 && Utils.rand(2) == 0) {
            MainScreen.text("You fantasize about grabbing " + monster.desc.a + monster.desc.short + " and shoving " + monster.desc.objectivePronoun + " in between your jiggling mammaries, nearly suffocating " + monster.desc.objectivePronoun + " as you have your way.\n", false);
            temp2 = 5 + Utils.rand(player.stats.lib / 8 + player.stats.cor / 8)
        }
        else if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 6 && Utils.rand(2) == 0) {
            MainScreen.text("You fantasize about grabbing " + monster.desc.a + monster.desc.short + " and forcing " + monster.desc.objectivePronoun + " against a " + BreastDescriptor.describeNipple(0) + ", and feeling your milk let down.  The desire to forcefeed SOMETHING makes your nipples hard and moist with milk.\n", false);
            temp2 = 5 + Utils.rand(player.stats.lib / 8 + player.stats.cor / 8)
        }
        else {
            MainScreen.text("You fill your mind with perverted thoughts about " + monster.desc.a + monster.desc.short + ", picturing " + monster.desc.objectivePronoun + " in all kinds of perverse situations with you.\n", true);
            temp2 = 10 + Utils.rand(player.stats.lib / 5 + player.stats.cor / 8);
        }
        if (temp2 >= 20) MainScreen.text("The fantasy is so vivid and pleasurable you wish it was happening now.  You wonder if " + monster.desc.a + monster.desc.short + " can tell what you were thinking.\n\n", false);
        else MainScreen.text("\n", false);
        player.stats.lust += temp2;
        player.stats.resisted += false;
        if (player.stats.lust > 99) {
            if (monster.desc.short == "pod") {
                MainScreen.text("<b>You nearly orgasm, but the terror of the situation reasserts itself, muting your body's need for release.  If you don't escape soon, you have no doubt you'll be too fucked up to ever try again!</b>\n\n", false);
                player.stats.lust = 99;
                player.stats.lust += -25;
            }
            else {
                doNext(endLustLoss);
                return;
            }
        }
        enemyAI();
    }


}