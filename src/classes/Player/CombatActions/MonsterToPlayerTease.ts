import Character from '../../Character/Character';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';

export default class MonsterToPlayerTease {
    public use(player: Player, monster: Character): void {
        if (player.stats.lust < 35) {
            DisplayText.text("The " + monster.desc.short + " press in close against you and although they fail to hit you with an attack, the sensation of their skin rubbing against yours feels highly erotic.");
        }
        else if (player.stats.lust < 65) {
            DisplayText.text("The push of the " + monster.desc.short + "' sweaty, seductive bodies sliding over yours is deliciously arousing and you feel your ");
            if (player.lowerBody.cockSpot.count() > 0)
                DisplayText.text(CockDescriptor.describeMultiCockShort(player) + " hardening ");
            else if (player.lowerBody.vaginaSpot.count() > 0) DisplayText.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " get wetter ");
            DisplayText.text("in response to all the friction.");
        }
        else {
            DisplayText.text("As the " + monster.desc.short + " mill around you, their bodies rub constantly over yours, and it becomes harder and harder to keep your thoughts on the fight or resist reaching out to touch a well lubricated cock or pussy as it slips past.  You keep subconsciously moving your ");
            if (player.gender == 1) DisplayText.text(CockDescriptor.describeMultiCockShort(player) + " towards the nearest inviting hole.");
            if (player.gender == 2) DisplayText.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " towards the nearest swinging cock.");
            if (player.gender == 3) DisplayText.text("aching cock and thirsty pussy towards the nearest thing willing to fuck it.");
            if (player.gender == 0) DisplayText.text("groin, before remember there is nothing there to caress.");
        }
        player.stats.lust += 10 + player.stats.sens / 10;
    }
}