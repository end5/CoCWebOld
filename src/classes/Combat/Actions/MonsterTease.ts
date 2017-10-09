export default class MonsterTease {
    public use(player: Player, monster: Monster): void {
        if (player.stats.lust < 35) {
            MainScreen.text("The " + monster.short + " press in close against you and although they fail to hit you with an attack, the sensation of their skin rubbing against yours feels highly erotic.");
        }
        else if (player.stats.lust < 65) {
            MainScreen.text("The push of the " + monster.short + "' sweaty, seductive bodies sliding over yours is deliciously arousing and you feel your ");
            if (player.lowerBody.cockSpot.count() > 0)
                MainScreen.text(CockDescriptor.describeMultiCockShort(player) + " hardening ");
            else if (player.lowerBody.vaginaSpot.count() > 0) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " get wetter ");
            MainScreen.text("in response to all the friction.");
        }
        else {
            MainScreen.text("As the " + monster.short + " mill around you, their bodies rub constantly over yours, and it becomes harder and harder to keep your thoughts on the fight or resist reaching out to touch a well lubricated cock or pussy as it slips past.  You keep subconsciously moving your ");
            if (player.gender == 1) MainScreen.text(CockDescriptor.describeMultiCockShort(player) + " towards the nearest inviting hole.");
            if (player.gender == 2) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " towards the nearest swinging cock.");
            if (player.gender == 3) MainScreen.text("aching cock and thirsty pussy towards the nearest thing willing to fuck it.");
            if (player.gender == 0) MainScreen.text("groin, before remember there is nothing there to caress.");
        }
        player.stats.lust += 10 + player.stats.sens / 10;
    }
}