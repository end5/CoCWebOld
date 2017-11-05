import Character from '../../Character/Character';
import MainScreen from '../../display/MainScreen';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class PlayerStruggle {
    public use(player: Player, monster: Character) {
        if (monster.statusAffects.has("MinotaurEntangled")) {
            MainScreen.clearText();
            if (player.stats.str / 9 + Utils.rand(20) + 1 >= 15) {
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
            if (Utils.rand(3) == 0 || Utils.rand(80) < player.stats.str) {
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
            if (Utils.rand(3) == 0 || Utils.rand(80) < player.stats.str / 1.5) {
                MainScreen.text("You wriggle and squirm violently, tearing yourself out from within the naga's coils.");
                player.statusAffects.remove("NagaBind");
            }
            else {
                MainScreen.text("The naga's grip on you tightens as you struggle to break free from the stimulating pressure.");
                dynStats("lus", player.stats.sens / 10 + 2);
                takeDamage(7 + Utils.rand(5));
            }
            combatRoundOver();
        }
        else {
            MainScreen.clearText();
            MainScreen.text("You struggle with all of your might to free yourself from the tentacles before the creature can fulfill whatever unholy desire it has for you.\n");
            //33% chance to break free + up to 50% chance for strength
            if (Utils.rand(3) == 0 || Utils.rand(80) < player.stats.str / 2) {
                MainScreen.text("As the creature attempts to adjust your position in its grip, you free one of your " + LowerBodyDescriptor.describeLegs(player) + " and hit the beast in its beak, causing it to let out an inhuman cry and drop you to the ground smartly.\n\n");
                player.statusAffects.remove("TentacleBind");
                monster.statusAffects.add(new StatusAffect("TentacleCoolDown", 3, 0, 0, 0));
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
                else MainScreen.text("The creature continues probing at your asshole and has now latched " + Utils.numToCardinalText(player.upperBody.chest.countNipples()) + " more suckers onto your nipples, amplifying your growing lust.  You must escape or you will become a mere toy to this thing!");
                dynStats("lus", (3 + player.stats.sens / 10 + player.stats.lib / 20));
                combatRoundOver();
            }
        }
    }
}