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
import Monster from '../Monster';
import Player from '../Player';
import Utils from '../Utilities/Utils';

export default class PlayerCombatActions implements CombatActions {
    private _tease = new Tease();

    attack(): number {
        throw new Error("Method not implemented.");
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
                            MainScreen.text(chestDesc() + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.", false);
                        }
                        else if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("Your " + player.skinTone + ButtDescriptor.describeButt(player) + " and " + chestDesc() + " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.", false);
                        else MainScreen.text("Your " + chestDesc() + " jiggle and wobble side to side like the " + player.skinTone + " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.", false);
                    }
                    //FOR PLAYERS WITH MASSIVE BREASTS
                    else if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 66) {
                        if (player.lowerBody.hipRating >= 20) {
                            MainScreen.text("Your " + chestDesc() + " nearly drag along the ground while your " + LowerBodyDescriptor.describeHips(player) + " swing side to side ", false);
                            if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("causing the fat of your " + player.skinTone + ButtDescriptor.describeButt(player) + " to wobble heavily, ", false);
                            MainScreen.text("forcing your body off balance and preventing you from moving quick enough to get escape.", false);
                        }
                        else if (player.lowerBody.butt.buttRating >= 20) MainScreen.text("Your " + chestDesc() + " nearly drag along the ground while the fat of your " + player.skinTone + ButtDescriptor.describeButt(player) + " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.", false);
                        else MainScreen.text("Your " + chestDesc() + " nearly drag along the ground, preventing you from moving quick enough to get escape.", false);
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

    public wait() {

    }

    public fantasize() {

    }


}