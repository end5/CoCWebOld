import Character from '../../../Character/Character';
import DisplayText from '../../../display/DisplayText';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Utils from '../../../Utilities/Utils';
import Player from '../../Player';
import PlayerPhysicalAction from '../PlayerPhysicalAction';

export class FireBow extends PlayerPhysicalAction {
    public isPossible(player: Player): boolean {
        return player.hasKeyItem("Bow");
    }

    public readonly baseCost: number = 25;
    private reason: string;
    public canUse(player: Player, monster: Character): boolean {
        if (player.stats.fatigue + this.physicalCost(player) > 100) {
            this.reason = "You're too fatigued to fire the bow!";
            return false;
        }
        // ??????????????????????????????????????????????????????????????
        // ??????????????????????????????????????????????????????????????
        // ??????????????????????????????????????????????????????????????
        // ??????????????????????????????????????????????????????????????
        // wat VVVVVVVVVVVVVVVV
        if (monster.statusAffects.has(StatusAffectType.BowDisabled)) {
            this.reason = "You can't use your bow right now!";
            return false;
        }
        return true;
    }

    public reasonCannotUse(): string {
        return this.reason;
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        player.stats.fatiguePhysical(this.baseCost);
        //Keep logic sane if this attack brings victory
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        //Amily!
        if (monster.statusAffects.has(StatusAffectType.Concentration)) {
            DisplayText.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        //Prep messages vary by skill.
        if (player.statusAffects.get(StatusAffectType.Kelt).value1 < 30) {
            DisplayText.text("Fumbling a bit, you nock an arrow and fire!\n");
        }
        else if (player.statusAffects.get(StatusAffectType.Kelt).value1 < 50) {
            DisplayText.text("You pull an arrow and fire it at " + monster.desc.a + monster.desc.short + "!\n");
        }
        else if (player.statusAffects.get(StatusAffectType.Kelt).value1 < 80) {
            DisplayText.text("With one smooth motion you draw, nock, and fire your deadly arrow at your opponent!\n");
        }
        else if (player.statusAffects.get(StatusAffectType.Kelt).value1 <= 99) {
            DisplayText.text("In the blink of an eye you draw and fire your bow directly at " + monster.desc.a + monster.desc.short + ".\n");
        }
        else {
            DisplayText.text("You casually fire an arrow at " + monster.desc.a + monster.desc.short + " with supreme skill.\n");
            //Keep it from going over 100
            player.statusAffects.get(StatusAffectType.Kelt).value1 = 100;
        }
        if (monster.statusAffects.has(StatusAffectType.Sandstorm) && Utils.rand(10) > 1) {
            DisplayText.text("Your shot is blown off target by the tornado of sand and wind.  Damn!\n\n");
            return;
        }
        //[Bow Response]
        if (monster.desc.short == "Isabella") {
            if (monster.statusAffects.has(StatusAffectType.Blind))
                DisplayText.text("Isabella hears the shot and turns her shield towards it, completely blocking it with her wall of steel.\n\n");
            else DisplayText.text("You arrow thunks into Isabella's shield, completely blocked by the wall of steel.\n\n");
            if (isabellaFollowerScene.isabellaAccent())
                DisplayText.text("\"<i>You remind me of ze horse-people.  They cannot deal vith mein shield either!</i>\" cheers Isabella.\n\n");
            else DisplayText.text("\"<i>You remind me of the horse-people.  They cannot deal with my shield either!</i>\" cheers Isabella.\n\n");
            return;
        }
        //worms are immune
        if (monster.desc.short == "worms") {
            DisplayText.text("The arrow slips between the worms, sticking into the ground.\n\n");
            return;
        }
        //Vala miss chance!
        if (monster.desc.short == "Vala" && Utils.rand(10) < 7) {
            DisplayText.text("Vala flaps her wings and twists her body. Between the sudden gust of wind and her shifting of position, the arrow goes wide.\n\n");
            return;
        }
        //Blind miss chance
        if (player.statusAffects.has(StatusAffectType.Blind)) {
            DisplayText.text("The arrow hits something, but blind as you are, you don't have a chance in hell of hitting anything with a bow.\n\n");
            return;
        }
        //Miss chance 10% based on speed + 10% based on int + 20% based on skill
        if (monster.desc.short != "pod" && player.stats.spe / 10 + player.stats.int / 10 + player.statusAffects.get(StatusAffectType.Kelt).value1 / 5 + 60 < Utils.rand(101)) {
            DisplayText.text("The arrow goes wide, disappearing behind your foe.\n\n");
            return;
        }
        //Hit!  Damage calc! 20 +
        let damage: number = Math.floor((20 + player.stats.str / 3 + player.statusAffects.get(StatusAffectType.Kelt).value1 / 1.2) + player.stats.spe / 3 - Utils.rand(monster.stats.tou) - monster.defense());
        if (damage < 0) damage = 0;
        if (damage == 0) {
            if (monster.stats.int > 0)
                DisplayText.text(monster.desc.capitalA + monster.desc.short + " shrugs as the arrow bounces off them harmlessly.\n\n");
            else
                DisplayText.text("The arrow bounces harmlessly off " + monster.desc.a + monster.desc.short + ".\n\n");
            return;
        }
        if (monster.desc.short == "pod")
            DisplayText.text("The arrow lodges deep into the pod's fleshy wall");
        else if (monster.desc.plural)
            DisplayText.text(monster.desc.capitalA + monster.desc.short + " look down at the arrow that now protrudes from one of " + monster.desc.possessivePronoun + " bodies");
        else DisplayText.text(monster.desc.capitalA + monster.desc.short + " looks down at the arrow that now protrudes from " + monster.desc.possessivePronoun + " body");
        damage *= monster.physicalAttackMod();
        damage = monster.combat.loseHP(damage, player);
        monster.stats.lust -= 20;
        if (monster.stats.lust < 0) monster.stats.lust = 0;
        if (monster.combat.HP <= 0) {
            if (monster.desc.short == "pod")
                DisplayText.text(". (" + String(damage) + ")\n\n");
            else if (monster.desc.plural)
                DisplayText.text(" and stagger, collapsing onto each other from the wounds you've inflicted on " + monster.desc.objectivePronoun + ".  (" + String(damage) + ")\n\n");
            else DisplayText.text(" and staggers, collapsing from the wounds you've inflicted on " + monster.desc.objectivePronoun + ".  (" + String(damage) + ")\n\n");
            return;
        }
        else DisplayText.text(".  It's clearly very painful. (" + String(damage) + ")\n\n");
    }
}