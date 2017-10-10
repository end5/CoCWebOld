import CombatActions from './CombatActions';
import * as MagicalAttack from './PlayerMagicalAttacks';
import * as PhysicalAttack from './PlayerPhysicalAttacks';
import SpecialAction from './SpecialAction';
import Tease from './Tease';
import { FaceType } from '../Body/Face';
import { HornType } from '../Body/Head';
import { LowerBodyType, TailType } from '../Body/LowerBody';
import MainScreen from '../display/MainScreen';
import Perk from '../Effects/Perk';
import StatusAffect from '../Effects/StatusAffect';
import Flags, { FlagEnum } from '../Game/Flags';
import Monster from '../Monster';
import Player from '../Player';
import Utils from '../Utilities/Utils';

export default class PlayerCombatActions implements CombatActions {
    private _tease = new Tease();

    attack(): number {
        if (!player.statusAffects.has("FirstAttack")) {
            MainScreen.text("", true);
            fatigueRecovery();
        }
        if (player.statusAffects.has("Sealed") && player.statusAffects.get("Sealed").value2 == 0) {
            MainScreen.text("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  The kitsune's seals have made normal attack impossible!  Maybe you could try something else?\n\n", false);
            enemyAI();
            return;
        }
        if (Flags.list[FlagEnum.PC_FETISH] >= 3 && !urtaQuest.isUrta()) {
            MainScreen.text("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  Ceraph's piercings have made normal attack impossible!  Maybe you could try something else?\n\n", false);
            enemyAI();
            return;
        }
        //Amily!
        if (monster.statusAffects.has("Concentration")) {
            MainScreen.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            enemyAI();
            return;
        }
        if (monster.statusAffects.has("Level") && !player.statusAffects.has("FirstAttack")) {
            MainScreen.text("It's all or nothing!  With a bellowing cry you charge down the treacherous slope and smite the sandtrap as hard as you can!  ");
            (monster as SandTrap).trapLevel(-4);
        }
        if (player.perks.has("DoubleAttack") && player.stats.spe >= 50 && Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] < 2) {
            if (player.statusAffects.has("FirstAttack")) player.statusAffects.remove("FirstAttack");
            else {
                //Always!
                if (Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] == 0) player.statusAffects.add(new StatusAffect("FirstAttack", 0, 0, 0, 0)));
			//Alternate!
			else if (player.stats.str < 61 && Flags.list[FlagEnum.DOUBLE_ATTACK_STYLE] == 1) player.statusAffects.add(new StatusAffect("FirstAttack", 0, 0, 0, 0)));
            }
        }
        //"Brawler perk". Urta only. Thanks to Fenoxo for pointing this out... Even though that should have been obvious :<
        //Urta has fists and the Brawler perk. Don't check for that because Urta can't drop her fists or lose the perk!
        else if (urtaQuest.isUrta()) {
            if (player.statusAffects.has("FirstAttack")) {
                player.statusAffects.remove("FirstAttack");
            }
            else {
                player.statusAffects.add(new StatusAffect("FirstAttack", 0, 0, 0, 0)));
                MainScreen.text("Utilizing your skills as a bareknuckle brawler, you make two attacks!\n");
            }
        }
        //Blind
        if (player.statusAffects.has("Blind")) {
            MainScreen.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ", false);
        }
        if (monster instanceof Basilisk) {
            //basilisk counter attack (block attack, significant speed loss): 
            if (player.stats.int / 5 + rand(20) < 25) {
                MainScreen.text("Holding the basilisk in your peripheral vision, you charge forward to strike it.  Before the moment of impact, the reptile shifts its posture, dodging and flowing backward skillfully with your movements, trying to make eye contact with you. You find yourself staring directly into the basilisk's face!  Quickly you snap your eyes shut and recoil backwards, swinging madly at the lizard to force it back, but the damage has been done; you can see the terrible grey eyes behind your closed lids, and you feel a great weight settle on your bones as it becomes harder to move.", false);
                Basilisk.basiliskSpeed(player, 20);
                player.statusAffects.remove("FirstAttack");
                combatRoundOver();
                return;
            }
            //Counter attack fails: (random chance if PC int > 50 spd > 60; PC takes small physical damage but no block or spd penalty)
            else {
                MainScreen.text("Holding the basilisk in your peripheral vision, you charge forward to strike it.  Before the moment of impact, the reptile shifts its posture, dodging and flowing backward skillfully with your movements, trying to make eye contact with you. You twist unexpectedly, bringing your " + player.weaponName + " up at an oblique angle; the basilisk doesn't anticipate this attack!  ", false);
            }
        }
        //Worms are special
        if (monster.short == "worms") {
            //50% chance of hit (int boost)
            if (rand(100) + player.stats.int / 3 >= 50) {
                temp = int(player.stats.str / 5 - rand(5));
                if (temp == 0) temp = 1;
                MainScreen.text("You strike at the amalgamation, crushing countless worms into goo, dealing " + temp + " damage.\n\n", false);
                monster.stats.HP -= temp;
                if (monster.stats.HP <= 0) {
                    doNext(endHpVictory);
                    return;
                }
            }
            //Fail
            else {
                MainScreen.text("You attempt to crush the worms with your reprisal, only to have the collective move its individual members, creating a void at the point of impact, leaving you to attack only empty air.\n\n", false);
            }
            if (player.statusAffects.has("FirstAttack")) {
                attack();
                return;
            }
            enemyAI();
            return;
        }
    }
    
    public struggle(): void {
        if (monster.statusAffects.has("MinotaurEntangled")) {
            MainScreen.clearText();
            if (player.stats.str / 9 + rand(20) + 1 >= 15) {
                MainScreen.text("Utilizing every ounce of your strength and cunning, you squirm wildly, shrugging through weak spots in the chain's grip to free yourself!  Success!");
                monster.statusAffects.remove("MinotaurEntangled");
                MainScreen.text("\n\n\"<i>No!  You fool!  You let her get away!  Hurry up and finish her up!  I need my serving!</i>\"  The succubus spits out angrily.\n\n");
                combatRoundOver();
            }
            //Struggle Free Fail*
            else {
                MainScreen.text("You wiggle and struggle with all your might, but the chains remain stubbornly tight, binding you in place.  Damnit!  You can't lose like this!\n\n");
                enemyAI();
            }
        }
        else if (monster.statusAffects.has("PCTailTangle")) {
            (monster as Kitsune).kitsuneStruggle();
        }
        else if (player.statusAffects.has("HolliConstrict")) {
            (monster as Holli).struggleOutOfHolli();
        }
        else if (monster.statusAffects.has("QueenBind")) {
            ropeStruggles();
        }
        else if (player.statusAffects.has("GooBind")) {
            MainScreen.clearText();
            //[Struggle](successful) :
            if (rand(3) == 0 || rand(80) < player.stats.str) {
                MainScreen.text("You claw your fingers wildly within the slime and manage to brush against her heart-shaped nucleus. The girl silently gasps and loses cohesion, allowing you to pull yourself free while she attempts to solidify.");
                player.statusAffects.remove("GooBind");
            }
            //Failed struggle
            else {
                MainScreen.text("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours.");
                temp = takeDamage(.15 * maxHP());
                MainScreen.text(" (" + temp + ")", false);
            }
            combatRoundOver();
        }
        else if (player.statusAffects.has("HarpyBind")) {
            harpyHordeGangBangStruggle();
        }
        else if (player.statusAffects.has("GooArmorBind")) {
            struggleAtGooBind();
        }
        else if (player.statusAffects.has("UBERWEB")) {
            MainScreen.clearText();
            MainScreen.text("You claw your way out of the webbing while Kiha does her best to handle the spiders single-handedly!\n\n");
            player.statusAffects.remove("UBERWEB");
            enemyAI();
        }
        else if (player.statusAffects.has("NagaBind")) {
            MainScreen.clearText();
            if (rand(3) == 0 || rand(80) < player.stats.str / 1.5) {
                MainScreen.text("You wriggle and squirm violently, tearing yourself out from within the naga's coils.");
                player.statusAffects.remove("NagaBind");
            }
            else {
                MainScreen.text("The naga's grip on you tightens as you struggle to break free from the stimulating pressure.");
                dynStats("lus", player.stats.sens / 10 + 2);
                takeDamage(7 + rand(5));
            }
            combatRoundOver();
        }
        else {
            MainScreen.clearText();
            MainScreen.text("You struggle with all of your might to free yourself from the tentacles before the creature can fulfill whatever unholy desire it has for you.\n");
            //33% chance to break free + up to 50% chance for strength
            if (rand(3) == 0 || rand(80) < player.stats.str / 2) {
                MainScreen.text("As the creature attempts to adjust your position in its grip, you free one of your " + LowerBodyDescriptor.describeLegs(player) + " and hit the beast in its beak, causing it to let out an inhuman cry and drop you to the ground smartly.\n\n");
                player.statusAffects.remove("TentacleBind");
                monster.statusAffects.add(new StatusAffect("TentacleCoolDown", 3, 0, 0, 0)));
                enemyAI();
            }
            //Fail to break free
            else {
                MainScreen.text("Despite trying to escape, the creature only tightens its grip, making it difficult to breathe.\n\n");
                takeDamage(5);
                if (player.lowerBody.cockSpot.count() > 0)
                    MainScreen.text("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
                else if (player.lowerBody.vaginaSpot.hasVagina())
                    MainScreen.text("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing!");
                else MainScreen.text("The creature continues probing at your asshole and has now latched " + num2Text(player.upperBody.chest.countNipples()) + " more suckers onto your nipples, amplifying your growing lust.  You must escape or you will become a mere toy to this thing!");
                dynStats("lus", (3 + player.stats.sens / 10 + player.stats.lib / 20));
                combatRoundOver();
            }
        }
    }

    tease(player: Player, monster: Monster) {
        this._tease.use(player, monster, true);
    }
    spells() {
        throw new Error("Method not implemented.");
    }
    useItem() {
        throw new Error("Method not implemented.");
    }

    public run(player: Player, monster: Monster, success: boolean) {
        //ANEMONE OVERRULES NORMAL RUN
        if (monster.short == "anemone") {
            //Autosuccess - less than 60 lust
            if (player.stats.lust < 60) {
                MainScreen.text("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
                return;
            }
            //Speed dependent
            else {
                //Success
                if (success) {
                    MainScreen.text("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
                    return;
                }
                //Run failed:
                else {
                    MainScreen.text("You try to shake off the fog and run but the anemone slinks over to you and her tentacles wrap around your waist.  <i>\"Stay?\"</i> she asks, pressing her small breasts into you as a tentacle slides inside your " + player.inventory.armor.displayName + " and down to your nethers.  The combined stimulation of the rubbing and the tingling venom causes your knees to buckle, hampering your resolve and ending your escape attempt.", false);
                    //(gain lust, temp lose spd/str)
                    <Anemone>monster.applyVenom((4 + player.stats.sens / 20));
                    return;
                }
            }
        }
        //Ember is SPUCIAL
        if (monster.short == "Ember") {
            //GET AWAY
            if (success) {
                if (player.perks.has("Runner")) MainScreen.text("Using your skill at running, y");
                else MainScreen.text("Y");
                MainScreen.text("ou easily outpace the dragon, who begins hurling imprecations at you.  \"What the hell, [name], you weenie; are you so scared that you can't even stick out your punishment?\"");
                MainScreen.text("\n\nNot to be outdone, you call back, \"Sucks to you!  If even the mighty Last Ember of Hope can't catch me, why do I need to train?  Later, little bird!\"");
            }
            //Fail: 
            else {
                MainScreen.text("Despite some impressive jinking, " + emberScene.emberMF("he", "she") + " catches you, tackling you to the ground.\n\n");
            }
            return;
        }
        //SUCCESSFUL FLEE
        if (success) {
            //Fliers flee!
            if (player.canFly()) MainScreen.text(monster.capitalA + monster.short + " can't catch you.", false);
            //sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
            else if (player.lowerBody.tailType == TailType.RACCOON && player.upperBody.head.earType == EarType.RACCOON && player.perks.has("Runner")) {
                MainScreen.text("Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " + monster.pronoun1 + " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air!  You leave " + monster.pronoun2 + " behind with your clumsy, jerky, short-range flight.");
            }
            //Non-fliers flee
            else MainScreen.text(monster.capitalA + monster.short + " rapidly disappears into the shifting landscape behind you.", false);
            if (monster.short == "Izma") {
                MainScreen.text("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.", false);
            }
            return;
        }
        //Runner perk chance
        else if (success) {
            MainScreen.text("Thanks to your talent for running, you manage to escape.", false);
            if (monster.short == "Izma") {
                MainScreen.text("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.", false);
            }
            return;
        }
        //FAIL FLEE
        else {
            if (monster.short == "Holli") {
                <Holli>monster.escapeFailWithHolli();
                return;
            }
            //Flyers get special failure message.
            if (player.canFly()) {
                if (monster.plural) MainScreen.text(monster.capitalA + monster.short + " manage to grab your " + LowerBodyDescriptor.describeLegs(player) + " and drag you back to the ground before you can fly away!", false);
                else MainScreen.text(monster.capitalA + monster.short + " manages to grab your " + LowerBodyDescriptor.describeLegs(player) + " and drag you back to the ground before you can fly away!", false);
            }
            //fail
            else if (player.lowerBody.tailType == TailType.RACCOON && player.upperBody.head.earType == EarType.RACCOON && player.perks.has("Runner")) MainScreen.text("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!");
            //Nonflyer messages
            else {
                //Huge balls messages
                if (player.lowerBody.balls > 0 && player.lowerBody.ballSize >= 24) {
                    if (player.lowerBody.ballSize < 48) MainScreen.text("With your " + BallsDescriptor.describeBalls(true, true, player) + " swinging ponderously beneath you, getting away is far harder than it should be.  ", false);
                    else MainScreen.text("With your " + BallsDescriptor.describeBalls(true, true, player) + " dragging along the ground, getting away is far harder than it should be.  ", false);
                }
                //FATASS BODY MESSAGES
                if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 35 || player.lowerBody.butt.buttRating >= 20 || player.lowerBody.hipRating >= 20) {
                    //FOR PLAYERS WITH GIANT BREASTS
                    if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 35 && player.upperBody.chest.BreastRatingLargest[0].breastRating < 66) {
                        if (player.lowerBody.hipRating >= 20) {
                            MainScreen.text("Your " + LowerBodyDescriptor.describeHips(player) + " forces your gait to lurch slightly side to side, which causes the fat of your " + player.skinTone + " ", false);
                            if (player.lowerBody.butt.buttRating >= 20) MainScreen.text(ButtDescriptor.describeButt(player) + " and ", false);
                            MainScreen.text(BreastDescriptor.describeChest(player) + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.", false);
                        }
                        else if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("Your " + player.skinTone + ButtDescriptor.describeButt(player) + " and " + BreastDescriptor.describeChest(player) + " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.", false);
                        else MainScreen.text("Your " + BreastDescriptor.describeChest(player) + " jiggle and wobble side to side like the " + player.skinTone + " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.", false);
                    }
                    //FOR PLAYERS WITH MASSIVE BREASTS
                    else if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 66) {
                        if (player.lowerBody.hipRating >= 20) {
                            MainScreen.text("Your " + BreastDescriptor.describeChest(player) + " nearly drag along the ground while your " + LowerBodyDescriptor.describeHips(player) + " swing side to side ", false);
                            if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("causing the fat of your " + player.skinTone + ButtDescriptor.describeButt(player) + " to wobble heavily, ", false);
                            MainScreen.text("forcing your body off balance and preventing you from moving quick enough to get escape.", false);
                        }
                        else if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("Your " + BreastDescriptor.describeChest(player) + " nearly drag along the ground while the fat of your " + player.skinTone + ButtDescriptor.describeButt(player) + " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.", false);
                        else MainScreen.text("Your " + BreastDescriptor.describeChest(player) + " nearly drag along the ground, preventing you from moving quick enough to get escape.", false);
                    }
                    //FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
                    else if (player.lowerBody.hipRating >= 20) {
                        MainScreen.text("Your " + LowerBodyDescriptor.describeHips(player) + " swing heavily from side to side ", false);
                        if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("causing your " + player.skinTone + ButtDescriptor.describeButt(player) + " to wobble obscenely ", false);
                        MainScreen.text("and forcing your body into an awkward gait that slows you down, preventing you from escaping.", false);
                    }
                    //JUST DA BOOTAH
                    else if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("Your " + player.skinTone + ButtDescriptor.describeButt(player) + " wobbles so heavily that you're unable to move quick enough to escape.", false);
                }
                //NORMAL RUN FAIL MESSAGES
                else if (monster.plural) MainScreen.text(monster.capitalA + monster.short + " stay hot on your heels, denying you a chance at escape!", false);
                else MainScreen.text(monster.capitalA + monster.short + " stays hot on your heels, denying you a chance at escape!", false);
            }
        }
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
            temp = 80 + rand(40);
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
            takeDamage(5 + rand(5));
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
        if (player.inventory.armor.displayName == "goo armor") {
            MainScreen.text("As you fantasize, you feel Valeria rubbing her gooey body all across your sensitive skin");
            if (player.gender > 0) MainScreen.text(" and genitals");
            MainScreen.text(", arousing you even further.\n");
            temp2 = 25 + rand(player.stats.lib / 8 + player.stats.cor / 8)
        }
        else if (player.lowerBody.balls > 0 && player.lowerBody.ballSize >= 10 && rand(2) == 0) {
            MainScreen.text("You daydream about fucking " + monster.a + monster.short + ", feeling your balls swell with seed as you prepare to fuck " + monster.pronoun2 + " full of cum.\n", false);
            temp2 = 5 + rand(player.stats.lib / 8 + player.stats.cor / 8);
            MainScreen.text("You aren't sure if it's just the fantasy, but your " + BallsDescriptor.describeBalls(true, true, player) + " do feel fuller than before...\n", false);
            player.hoursSinceCum += 50;
        }
        else if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 6 && rand(2) == 0) {
            MainScreen.text("You fantasize about grabbing " + monster.a + monster.short + " and shoving " + monster.pronoun2 + " in between your jiggling mammaries, nearly suffocating " + monster.pronoun2 + " as you have your way.\n", false);
            temp2 = 5 + rand(player.stats.lib / 8 + player.stats.cor / 8)
        }
        else if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 6 && rand(2) == 0) {
            MainScreen.text("You fantasize about grabbing " + monster.a + monster.short + " and forcing " + monster.pronoun2 + " against a " + BreastDescriptor.describeNipple(0) + ", and feeling your milk let down.  The desire to forcefeed SOMETHING makes your nipples hard and moist with milk.\n", false);
            temp2 = 5 + rand(player.stats.lib / 8 + player.stats.cor / 8)
        }
        else {
            MainScreen.text("You fill your mind with perverted thoughts about " + monster.a + monster.short + ", picturing " + monster.pronoun2 + " in all kinds of perverse situations with you.\n", true);
            temp2 = 10 + rand(player.stats.lib / 5 + player.stats.cor / 8);
        }
        if (temp2 >= 20) MainScreen.text("The fantasy is so vivid and pleasurable you wish it was happening now.  You wonder if " + monster.a + monster.short + " can tell what you were thinking.\n\n", false);
        else MainScreen.text("\n", false);
        player.stats.lust += temp2;
        player.stats.resisted += false;
        if (player.stats.lust > 99) {
            if (monster.short == "pod") {
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