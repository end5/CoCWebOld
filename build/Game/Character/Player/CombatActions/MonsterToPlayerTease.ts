import { DisplayText } from '../../../../Engine/display/DisplayText';
import { Character } from '../../../Character/Character';
import { Desc } from '../../../Descriptors/Descriptors';

export class MonsterToPlayerTease {
    public use(character: Character, monster: Character): void {
        if (character.stats.lust < 35) {
            DisplayText("The " + monster.desc.short + " press in close against you and although they fail to hit you with an attack, the sensation of their skin rubbing against yours feels highly erotic.");
        }
        else if (character.stats.lust < 65) {
            DisplayText("The push of the " + monster.desc.short + "' sweaty, seductive bodies sliding over yours is deliciously arousing and you feel your ");
            if (character.torso.cocks.count > 0)
                DisplayText(Desc.Cock.describeMultiCockShort(character) + " hardening ");
            else if (character.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " get wetter ");
            DisplayText("in response to all the friction.");
        }
        else {
            DisplayText("As the " + monster.desc.short + " mill around you, their bodies rub constantly over yours, and it becomes harder and harder to keep your thoughts on the fight or resist reaching out to touch a well lubricated cock or pussy as it slips past.  You keep subconsciously moving your ");
            if (character.gender === 1) DisplayText(Desc.Cock.describeMultiCockShort(character) + " towards the nearest inviting hole.");
            if (character.gender === 2) DisplayText(Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + " towards the nearest swinging cock.");
            if (character.gender === 3) DisplayText("aching cock and thirsty pussy towards the nearest thing willing to fuck it.");
            if (character.gender === 0) DisplayText("groin, before remember there is nothing there to caress.");
        }
        character.stats.lust += 10 + character.stats.sens / 10;
    }
}
