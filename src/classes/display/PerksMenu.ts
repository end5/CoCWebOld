export default class PerksMenu {
    public static display() {
        let temp: number = 0;
        MainScreen.text("", true);
        while (temp < player.perks.length) {
            MainScreen.text("<b>" + player.perk(temp).perkName + "</b> - " + player.perk(temp).perkDesc + "\n", false);
            temp++;
        }
        MainScreen.hideButtons();
        if (player.perkPoints > 0) {
            MainScreen.text("\n<b>You have " + num2Text(player.perkPoints) + " perk point", false);
            if (player.perkPoints > 1) MainScreen.text("s", false);
            MainScreen.text(" to spend.</b>", false);
            MainScreen.addButton(1, "Perk Up", perkBuyMenu);
        }
        if (player.perks.has("DoubleAttack")) {
            MainScreen.text("\n<b>You can adjust your double attack settings.</b>");
            MainScreen.addButton(2, "Dbl Options", doubleAttackOptions);
        }
        MainScreen.addButton(0, "Next", playerMenu);
    }

    public doubleAttackOptions(): void {
        MainScreen.clearText();
        MainScreen.hideButtons();
        if (Flags.get(FlagEnum.DOUBLE_ATTACK_STYLE) == 0) {
            MainScreen.text("You will currently always double attack in combat.  If your strength exceeds sixty, your double-attacks will be done at sixty strength in order to double-attack.");
            MainScreen.text("\n\nYou can change it to double attack until sixty strength and then dynamicly switch to single attacks.");
            MainScreen.text("\nYou can change it to always single attack.");
            MainScreen.addButton(1, "Dynamic", doubleAttackDynamic);
            MainScreen.addButton(2, "Single", doubleAttackOff);
        }
        else if (Flags.get(FlagEnum.DOUBLE_ATTACK_STYLE) == 1) {
            MainScreen.text("You will currently double attack until your strength exceeds sixty, and then single attack.");
            MainScreen.text("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
            MainScreen.text("\nYou can change it to always single attack.");
            MainScreen.addButton(0, "All Double", doubleAttackForce);
            MainScreen.addButton(2, "Single", doubleAttackOff);
        }
        else {
            MainScreen.text("You will always single attack your foes in combat.");
            MainScreen.text("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
            MainScreen.text("\nYou can change it to double attack until sixty strength and then switch to single attacks.");
            MainScreen.addButton(0, "All Double", doubleAttackForce);
            MainScreen.addButton(1, "Dynamic", doubleAttackDynamic);
        }
        let e: MouseEvent;
        MainScreen.addButton(4, "Back", displayPerks);
    }

    public doubleAttackForce(): void {
        Flags.get(FlagEnum.DOUBLE_ATTACK_STYLE) = 0;
        doubleAttackOptions();
    }
    public doubleAttackDynamic(): void {
        Flags.get(FlagEnum.DOUBLE_ATTACK_STYLE) = 1;
        doubleAttackOptions();
    }
    public doubleAttackOff(): void {
        Flags.get(FlagEnum.DOUBLE_ATTACK_STYLE) = 2;
        doubleAttackOptions();
    }

}