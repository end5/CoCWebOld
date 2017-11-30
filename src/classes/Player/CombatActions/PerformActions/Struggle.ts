import Character from '../../../Character/Character';
import CombatAction from '../../../Combat/Actions/CombatAction';
import LowerBodyDescriptor from '../../../Descriptors/LowerBodyDescriptor';
import DisplayText from '../../../display/DisplayText';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Utils from '../../../Utilities/Utils';

export default class Struggle implements CombatAction {
    public name: string = "Struggle";
    public reasonCannotUse: string = "";

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, monster: Character): boolean {
        return true;
    }

    public use(character: Character, monster: Character) {
        if (monster.statusAffects.has(StatusAffectType.MinotaurEntangled)) {
            DisplayText.clear();
            if (character.stats.str / 9 + Utils.rand(20) + 1 >= 15) {
                DisplayText.text("Utilizing every ounce of your strength and cunning, you squirm wildly, shrugging through weak spots in the chain's grip to free yourself!  Success!");
                monster.statusAffects.remove(StatusAffectType.MinotaurEntangled);
                DisplayText.text("\n\n\"<i>No!  You fool!  You let her get away!  Hurry up and finish her up!  I need my serving!</i>\"  The succubus spits out angrily.\n\n");
                combatRoundOver();
            }
            //Struggle Free Fail*
            else {
                DisplayText.text("You wiggle and struggle with all your might, but the chains remain stubbornly tight, binding you in place.  Damnit!  You can't lose like this!\n\n");
                return;
            }
        }
        else if (monster.statusAffects.has(StatusAffectType.PCTailTangle)) {
            <Kitsune>monster.kitsuneStruggle();
        }
        else if (character.statusAffects.has(StatusAffectType.HolliConstrict)) {
            <Holli>monster.struggleOutOfHolli();
        }
        else if (monster.statusAffects.has(StatusAffectType.QueenBind)) {
            ropeStruggles();
        }
        else if (character.statusAffects.has(StatusAffectType.GooBind)) {
            DisplayText.clear();
            //[Struggle](successful) :
            if (Utils.rand(3) == 0 || Utils.rand(80) < character.stats.str) {
                DisplayText.text("You claw your fingers wildly within the slime and manage to brush against her heart-shaped nucleus. The girl silently gasps and loses cohesion, allowing you to pull yourself free while she attempts to solidify.");
                character.statusAffects.remove(StatusAffectType.GooBind);
            }
            //Failed struggle
            else {
                DisplayText.text("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours.");
                let damageTaken = character.combat.stats.loseHP(.15 * character.stats.maxHP(), monster);
                DisplayText.text(" (" + damageTaken + ")");
            }
            combatRoundOver();
        }
        else if (character.statusAffects.has(StatusAffectType.HarpyBind)) {
            harpyHordeGangBangStruggle();
        }
        else if (character.statusAffects.has(StatusAffectType.GooArmorBind)) {
            struggleAtGooBind();
        }
        else if (character.statusAffects.has(StatusAffectType.UBERWEB)) {
            DisplayText.clear();
            DisplayText.text("You claw your way out of the webbing while Kiha does her best to handle the spiders single-handedly!\n\n");
            character.statusAffects.remove(StatusAffectType.UBERWEB);
            return;
        }
        else if (character.statusAffects.has(StatusAffectType.NagaBind)) {
            DisplayText.clear();
            if (Utils.rand(3) == 0 || Utils.rand(80) < character.stats.str / 1.5) {
                DisplayText.text("You wriggle and squirm violently, tearing yourself out from within the naga's coils.");
                character.statusAffects.remove(StatusAffectType.NagaBind);
            }
            else {
                DisplayText.text("The naga's grip on you tightens as you struggle to break free from the stimulating pressure.");
                character.stats.lust += character.stats.sens / 10 + 2;
                character.combat.stats.loseHP(7 + Utils.rand(5), monster);
            }
            combatRoundOver();
        }
        else {
            DisplayText.clear();
            DisplayText.text("You struggle with all of your might to free yourself from the tentacles before the creature can fulfill whatever unholy desire it has for you.\n");
            //33% chance to break free + up to 50% chance for strength
            if (Utils.rand(3) == 0 || Utils.rand(80) < character.stats.str / 2) {
                DisplayText.text("As the creature attempts to adjust your position in its grip, you free one of your " + LowerBodyDescriptor.describeLegs(character) + " and hit the beast in its beak, causing it to let out an inhuman cry and drop you to the ground smartly.\n\n");
                character.statusAffects.remove(StatusAffectType.TentacleBind);
                monster.statusAffects.add(StatusAffectFactory.create(StatusAffectType.TentacleCoolDown, 3, 0, 0, 0));
                enemyAI();
            }
            //Fail to break free
            else {
                DisplayText.text("Despite trying to escape, the creature only tightens its grip, making it difficult to breathe.\n\n");
                takeDamage(5);
                if (character.lowerBody.cockSpot.count() > 0)
                    DisplayText.text("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
                else if (character.lowerBody.vaginaSpot.hasVagina())
                    DisplayText.text("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing!");
                else DisplayText.text("The creature continues probing at your asshole and has now latched " + Utils.numToCardinalText(character.upperBody.chest.countNipples()) + " more suckers onto your nipples, amplifying your growing lust.  You must escape or you will become a mere toy to this thing!");
                character.stats.lust += 3 + character.stats.sens / 10 + character.stats.lib / 20;
                combatRoundOver();
            }
        }
    }
}