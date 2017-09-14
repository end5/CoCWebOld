/**
 * Created by aimozg on 03.01.14.
 */
package classes.Scenes.Areas.Swamp
{
	import classes.*;
	import classes.GlobalFlags.FlagEnum;
	import classes.Items.WeaponLib;

	public class AbstractSpiderMorph extends Monster
	{
		public AbstractSpiderMorph()
		{
		}

		override protected performCombatAction():void
		{
			if(player.stats.spe >= 2 && rand(2) == 0) {
				spiderMorphWebAttack();
			}
			else if(player.findStatusAffect(StatusAffects.WebSilence) < 0 && rand(3) == 0) {
				spiderSilence();
			}
			else if(player.findStatusAffect(StatusAffects.Disarmed) < 0 && player.weaponName != "fists" && rand(3) == 0) {
				spiderDisarm();
			}
			else if(rand(2) == 0 || player.stats.spe < 2) getBitten();
			else eAttack();
		}

		/**
		 * -Web - lowers speed by 25 each application and disables
		 * flight once hit.*/
		public spiderMorphWebAttack():void
		{
			MainScreen.text("Turning to the side, " + a + short + " raises " + mf("his", "her") + " abdomen and unleashes a spray of webbing in your direction!  ", false);
			//Blind dodge change
			if (statusAffects.has("Blind") && rand(3) < 2) {
				MainScreen.text(capitalA + short + " misses completely due to their blindness.", false);
			}
			//Determine if dodged!
			else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
				MainScreen.text("You dodge away, avoiding the sticky strands!", false);
			}
			//Determine if evaded
			else if (player.perks.has("Evade") && rand(100) < 10) {
				MainScreen.text("You evade, avoiding the sticky strands!", false);
			}
			//("Misdirection"
			else if (player.perks.has("Misdirection") && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
				MainScreen.text("Your misleading movements allow you to easily sidestep the sticky strands!", false);
			}
			//Determine if cat'ed
			else if (player.perks.has("Flexibility") && rand(100) < 6) {
				MainScreen.text("You throw yourself out of the way with cat-like agility at the last moment, avoiding " + mf("his", "her") + " attack.\n", false);
			}
			//Got hit
			else {
				if (player.findStatusAffect(StatusAffects.Web) < 0) {
					MainScreen.text("The silky strands hit you, webbing around you and making it hard to move with any degree of speed.", false);
					if (player.canFly()) MainScreen.text("  Your wings struggle uselessly in the bindings, no longer able to flap fast enough to aid you.", false);
					MainScreen.text("\n", false);
					player.statusAffects.add(new StatusAffect("Web", 0, 0, 0, 0)));
				}
				else {
					MainScreen.text("The silky strands hit you, weighing you down and restricting your movement even further.\n", false);
				}
				//Only apply as much speed slow as necessary.
				let amount:number = 25;
				if (player.stats.spe - amount < 1) {
					amount = player.stats.spe - 1;
				}
				//Apply changes, display arrows, and track speed lost
				player.stats.spe -= amount;
				showStatDown('spe');
				// speUp.visible = false;
				// speDown.visible = true;
				player.statusAffects.get("Web").value1 = amount;

			}
			combatRoundOver();
		}

		/**-Bite - Raises arousal by 30*/
		public getBitten():void
		{
			//-Languid Bite - Inflicted on PC's who have been reduced to 1 speed by webbing, raises arousal by 60.
			if (player.stats.spe < 2 && player.statusAffects.has("Web")) {
				MainScreen.text("The arachnid aggressor slowly saunters forward while you struggle under the heaps of webbing, gently placing " + mf("his", "her") + " arms around your back in a tender hug.  " + mf("His", "Her") + " fangs slide into your neck with agonizing slowness, immediately setting off a burning heat inside you that makes you dizzy and weak.  ", false);
				if (player.lowerBody.cockSpot.hasCock()) {
					MainScreen.text(player.SMultiCockDesc() + " turns rock hard and squirts weakly, suddenly so aroused that it starts soaking your " + player.armorName, false);
					if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" along with your " + player.vaginaDescript(), false);
					MainScreen.text(".  ", false);
				}
				else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("Your " + player.vaginaDescript() + " grows wet as hell and so sensitive that every step and movement reminds you of the powerful need for something between your sopping nether-lips.  ", false);
				MainScreen.text("While " + mf("his", "her") + " venom pours into you, the spider-" + mf("boy", "girl") + " reaches into your gear to play with your " + player.nippleDescript(0) + ", and you moan like a whore from the dual stimulation of " + mf("his", "her") + " venom and nipple-play.\n\n", false);
				if (hasVagina()) MainScreen.text("The saucy dominatrix exhausts her supply of aphrodisiac toxin for the moment and finally steps back, admiring her work and giving you a lewd wink.  You ", false);
				else MainScreen.text("The confident male exhausts his supply of aphrodisiac toxin for the moment and finally steps back, admiring his work and giving you a lewd wink.  You ", false);
				game.dynStats("lus", 60);
				if (player.lust > 99) MainScreen.text("wobble, utterly defeated and about to cave in to your lust.", false);
				else MainScreen.text("struggle not to fall down and start masturbating on the spot.", false);
				MainScreen.text("\n", false);
				combatRoundOver();
				return;
			}
			MainScreen.text("The spider-" + mf("boy", "girl") + " lunges forward with " + mf("his", "her") + " mouth open, " + mf("his", "her") + " two needle-like fangs closing rapidly.  ", false);
			//Blind dodge change
			if (statusAffects.has("Blind") && rand(3) < 2) {
				MainScreen.text(capitalA + short + " misses completely due to their blindness.", false);
			}
			//Determine if dodged!
			else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
				MainScreen.text("You dodge away, avoiding " + mf("his", "her") + " bite!", false);
			}
			//Determine if evaded
			else if (player.perks.has("Evade") && rand(100) < 10) {
				MainScreen.text("You evade, avoiding the bite!", false);
			}
			//("Misdirection"
			else if (player.perks.has("Misdirection") && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
				MainScreen.text("Your misleading movements allow you to easily sidestep the spider bite!", false);
			}
			//Determine if cat'ed
			else if (player.perks.has("Flexibility") && rand(100) < 6) {
				MainScreen.text("You throw yourself out of the way with cat-like agility at the last moment, avoiding " + mf("his", "her") + " attack.\n", false);
			}
			else {
				if (rand(5) == 0) {
					MainScreen.text("You react far too slowly, and before you can even think to dodge, " + mf("he", "she") + "'s bitten deep into you, pumping large squirts of venom deep into your body.  Unnatural heat rolls through you, pooling in your groin until you're lewdly bucking your hips against the spider-morph's thigh.  " + mf("He", "She") + " pulls out and steps back, ", false);
					if (hasVagina()) MainScreen.text("casually cupping her breasts while you watch with venom-dilated eyes, slowly touching yourself.  Once she stops, you shake your head and master yourself, remembering that you're supposed to be fighting this " + mf("boy", "girl") + "!\n", false);
					else MainScreen.text("casually tugging on his relatively short, girthy dick as you watch with venom-dilated eyes, slowly touching yourself.  Once he stops, you shake your head and master yourself, remembering that you're supposed to be fighting this " + mf("boy", "girl") + "!\n", false);
					game.dynStats("lus", 50);
				}
				else {
					MainScreen.text("You react too slowly, and before you can dodge, " + mf("he", "she") + "'s bitten you, leaving behind a burning venom that warms your blood and stokes your lust.\n", false);
					game.dynStats("lus", 30);
				}
			}
			combatRoundOver();
		}

		/**-Disarm - hits the PC's weapon with web and sticks it to a
		 nearby tree, reducing PC's attack to 0 for the rest of the fight.*/
		public spiderDisarm():void
		{
			MainScreen.text(capitalA + short + " shifts and sprays webbing, aiming a tight strand of it at your " + player.weaponName + ".  ", false);
			//Blind dodge change
			if (statusAffects.has("Blind") && rand(3) < 2) {
				MainScreen.text("The blind web-shot goes horribly wide, missing you entirely.", false);
			}
			//Determine if dodged!
			else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
				MainScreen.text("You pull your weapon back and the webbing goes wide, missing entirely.", false);
			}
			//Determine if evaded
			else if (player.perks.has("Evade") && rand(100) < 10) {
				MainScreen.text("You pull your weapon back evasively and the webbing goes wide, missing entirely!", false);
			}
			//("Misdirection"
			else if (player.perks.has("Misdirection") && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
				MainScreen.text("Your misleading movements allow you to easily sidestep the webbing!", false);
			}
			//Determine if cat'ed
			else if (player.perks.has("Flexibility") && rand(100) < 6) {
				MainScreen.text("You throw yourself out of the way with cat-like agility at the last moment, avoiding " + mf("his", "her") + " attack.\n", false);
			}
			else if (player.weaponName == "spiked gauntlet" || player.weaponName == "hooked gauntlets") {
				MainScreen.text("The webbing hits your ", false);
				if (player.weaponName == "spiked gauntlet") MainScreen.text("gauntlet, but it's so effectively fastened to your hands that the attack fails to disarm you.\n", false);
				else MainScreen.text("gauntlets, but they're so effectively fastened to your hands that the attack fails to disarm you.\n", false);
			}
			else {
				MainScreen.text("You don't react fast enough and the sticky webbing pulls your " + player.weaponName + " out of your grip, gluing it to a nearby tree.  There's no way to get it back right now, you'll have to fight bare-handed!", false);
				flags[FlagEnum.PLAYER_DISARMED_WEAPON_ID] = player.weapon.id;
				player.setWeapon(WeaponLib.FISTS);
//No longer appears to be used				flags[FlagEnum.PLAYER_DISARMED_WEAPON_ATTACK] = player.weaponAttack;
//				player.weapon.unequip(player,false,true);
				player.statusAffects.add(new StatusAffect("Disarmed", 0, 0, 0, 0)));
			}
			combatRoundOver();
		}

		/**-Silence - sprays webs on the PC's mouth, silencing them for 1 to 3 turns.*/
		public spiderSilence():void
		{
			MainScreen.text(capitalA + short + " squirts a concentrated spray of " + mf("his", "her") + " webs directly at your face!  ", false);
			//Blind dodge change
			if (statusAffects.has("Blind") && rand(3) < 2) {
				MainScreen.text("The blind web-shot goes horribly wide, missing you entirely.", false);
			}
			//Determine if dodged!
			else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
				MainScreen.text("You lean back and let them pass harmlessly overhead, avoiding the attack.", false);
			}
			//Determine if evaded
			else if (player.perks.has("Evade") && rand(100) < 10) {
				MainScreen.text("You pull your weapon back evasively and the webbing goes wide, missing entirely.", false);
			}
			//("Misdirection"
			else if (player.perks.has("Misdirection") && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
				MainScreen.text("Your misleading movements allow you to easily sidestep the webbing!", false);
			}
			//Determine if cat'ed
			else if (player.perks.has("Flexibility") && rand(100) < 6) {
				MainScreen.text("You throw yourself out of the way with cat-like agility at the last moment, avoiding " + mf("his", "her") + " attack.\n", false);
			}
			else {
				MainScreen.text("They hit you before you can move, covering most of your nose and mouth and making it hard to breathe.  You'll be unable to use your magic while you're constantly struggling just to draw air!\n", false);
				player.statusAffects.add(new StatusAffect("WebSilence", 0, 0, 0, 0)));
			}
			combatRoundOver();
		}
	}
}
