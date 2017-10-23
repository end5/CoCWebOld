import Creature, { Gender } from '../Body/Creature';
import CockDescriptor from '../Descriptors/CockDescriptor';
import FaceDescriptor from '../Descriptors/FaceDescriptor';
import VaginaDescriptor from '../Descriptors/VaginaDescriptor';
import MainScreen from '../display/MainScreen';
import StatusAffect from '../Effects/StatusAffect';

export default class BodyModifier {
    public displayModThickness(creature: Creature, goal: number, strength: number = 1): string {
		if (goal == creature.thickness)
			return "";
		//Lose weight fatty!
		if (goal < creature.thickness && goal < 50) {
			creature.thickness -= strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (creature.thickness < goal)
				creature.thickness = goal;
		}
		//Sup tubby!
		if (goal > creature.thickness && goal > 50) {
			creature.thickness += strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (creature.thickness > goal)
				creature.thickness = goal;
		}

		//DIsplay 'U GOT FAT'
		if (goal >= creature.thickness && goal >= 50)
			return "\n\nYour center of balance changes a little bit as your body noticeably widens. (+" + strength + " body thickness)";
		//GET THIN BITCH
		else if (goal <= creature.thickness && goal <= 50)
			return "\n\nEach movement feels a tiny bit easier than the last.  Did you just lose a little weight!? (+" + strength + " thin)";
		return "";
	}

	public displayModTone(creature: Creature, goal: number, strength: number = 1): string {
		if (goal == creature.tone)
			return "";
		//Lose muscle visibility!
		if (goal < creature.tone && goal < 50) {
			creature.tone -= strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (creature.tone < goal) {
				creature.tone = goal;
				return "\n\nYou've lost some tone, but can't lose any more creature way. (-" + strength + " muscle tone)";
			}
		}
		//MOAR hulkness
		if (goal > creature.tone && goal > 50) {
			creature.tone += strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (creature.tone > goal) {
				creature.tone = goal;
				return "\n\nYou've gained some muscle tone, but can't gain any more creature way. (+" + strength + " muscle tone)";
			}
		}
		//DIsplay BITCH I WORK OUT
		if (goal >= creature.tone && goal > 50)
			return "\n\nYour body feels a little more solid as you move, and your muscles look slightly more visible. (+" + strength + " muscle tone)";
		//Display DERP I HAVE GIRL MUSCLES
		else if (goal <= creature.tone && goal < 50)
			return "\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles look less visible. (-" + strength + " muscle tone)";
		return "";
	}

	//Run creature every hour to 'fix' creature.femininity.
	public displayFixFemininity(creature: Creature): string {
		let output: string = "";
		//Genderless/herms share the same bounds
		if (creature.gender == Gender.NONE || creature.gender == Gender.HERM) {
			if (creature.femininity < 20) {
				output += "\n<b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
				if (creature.upperBody.head.face.hasBeard()) {
					output += "  As if that wasn't bad enough, your " + FaceDescriptor.describeBeard(creature) + " falls out too!";
					creature.upperBody.head.face.beardLength = 0;
					creature.upperBody.head.face.beardStyle = 0;
				}
				output += "</b>\n";
				creature.femininity = 20;
			}
			else if (creature.femininity > 85) {
				output += "\n<b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b>\n";
				creature.femininity = 85;
			}
		}
		//GURLS!
		else if (creature.gender == 2) {
			if (creature.femininity < 30) {
				output += "\n<b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
				if (creature.upperBody.head.face.hasBeard()) {
					output += "  As if that wasn't bad enough, your " + FaceDescriptor.describeBeard(creature) + " falls out too!";
					creature.upperBody.head.face.beardLength = 0;
					creature.upperBody.head.face.beardStyle = 0;
				}
				output += "</b>\n";
				creature.femininity = 30;
			}
		}
		//BOIZ!
		else if (creature.gender == 1) {
			if (creature.femininity > 70) {
				output += "\n<b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b>\n";
				creature.femininity = 70;
			}
			if (creature.femininity > 40 && creature.upperBody.head.face.hasBeard()) {
				output += "\n<b>Your beard falls out, leaving you with " + FaceDescriptor.describeFace(creature) + ".</b>\n";
				creature.upperBody.head.face.beardLength = 0;
				creature.upperBody.head.face.beardStyle = 0;
			}
		}
		if (creature.gender != 1 && creature.upperBody.head.face.hasBeard()) {
			output += "\n<b>Your beard falls out, leaving you with " + FaceDescriptor.describeFace(creature) + ".</b>\n";
			creature.upperBody.head.face.beardLength = 0;
			creature.upperBody.head.face.beardStyle = 0;
		}
		return output;
	}

	// Attempts to put the player in heat (or deeper in heat).
    // Returns true if successful, false if not.
    // The player cannot go into heat if she is already pregnant or is a he.
    // 
    // First parameter: boolean indicating if should output standard text.
    // Second parameter: intensity, an integer multiplier that can increase the 
    // duration and intensity. Defaults to 1.
    public static displayGoIntoHeat(body: Creature, intensity: number = 1) {
        //Already in heat, intensify further.
        if (body.inHeat) {
            MainScreen.text("\n\nYour mind clouds as your " + VaginaDescriptor.describeVagina(body, body.lowerBody.vaginaSpot.get(0)) + " moistens.  Despite already being in heat, the desire to copulate constantly grows even larger.", false);
            const statusAffectHeat: StatusAffect = body.statusAffects.get("Heat");
            statusAffectHeat.value1 += 5 * intensity;
            statusAffectHeat.value2 += 5 * intensity;
            statusAffectHeat.value3 += 48 * intensity;
            body.stats.libBimbo += 5 * intensity;
        }
        //Go into heat.  Heats v1 is bonus fertility, v2 is bonus libido, v3 is hours till it's gone
        else {
            MainScreen.text("\n\nYour mind clouds as your " + VaginaDescriptor.describeVagina(body, body.lowerBody.vaginaSpot.get(0)) + " moistens.  Your hands begin stroking your body from top to bottom, your sensitive skin burning with desire.  Fantasies about bending over and presenting your needy pussy to a male overwhelm you as <b>you realize you have gone into heat!</b>", false);
            body.statusAffects.add(new StatusAffect("Heat", 10 * intensity, 15 * intensity, 48 * intensity, 0));
            body.stats.libBimbo += 15 * intensity;
        }
    }

    // Attempts to put the player in rut (or deeper in heat).
    // Returns true if successful, false if not.
    // The player cannot go into heat if he is a she.
    // 
    // First parameter: boolean indicating if should output standard text.
    // Second parameter: intensity, an integer multiplier that can increase the 
    // duration and intensity. Defaults to 1.
    public static displayGoIntoRut(body: Creature, intensity: number = 1) {
        //Has rut, intensify it!
        if (body.inRut) {
            MainScreen.text("\n\nYour " + CockDescriptor.describeCock(body, body.lowerBody.cockSpot.get(0)) + " throbs and dribbles as your desire to mate intensifies.  You know that <b>you've sunken deeper into rut</b>, but all that really matters is unloading into a cum-hungry cunt.", false);
            const statusAffectRut: StatusAffect = body.statusAffects.get("Rut");
            statusAffectRut.value1 = 100 * intensity;
            statusAffectRut.value2 = 5 * intensity;
            statusAffectRut.value3 = 48 * intensity;
            body.stats.libBimbo += 5 * intensity;
        }
        else {
            MainScreen.text("\n\nYou stand up a bit straighter and look around, sniffing the air and searching for a mate.  Wait, what!?  It's hard to shake the thought from your head - you really could use a nice fertile hole to impregnate.  You slap your forehead and realize <b>you've gone into rut</b>!", false);
            //v1 - bonus cum production
            //v2 - bonus libido
            //v3 - time remaining!
            body.statusAffects.add(new StatusAffect("Rut", 150 * intensity, 5 * intensity, 100 * intensity, 0));
            body.stats.libBimbo += 5 * intensity;
        }
    }
}