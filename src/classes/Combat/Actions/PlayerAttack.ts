export default class PlayerAttack {
    public approachAfterKnockback(): void {
        MainScreen.clearText();
        MainScreen.text("You close the distance between you and " + monster.a + monster.short + " as quickly as possible.\n\n");
        player.statusAffects.remove("KnockedBack");
        enemyAI();
        return;
    }

    private canUseMagic(): boolean {
        if (player.statusAffects.has("ThroatPunch")) return false;
        if (player.statusAffects.has("WebSilence")) return false;
        if (player.statusAffects.has("GooArmorSilence")) return false;
        return true;
    }


    private teaseAttack(): void {
        if (monster.stats.lustVuln == 0) {
            MainScreen.clearText();
            MainScreen.text("You try to tease " + monster.a + monster.short + " with your body, but it doesn't have any effect on " + monster.pronoun2 + ".\n\n");
            enemyAI();
        }
        //Worms are immune!
        else if (monster.short == "worms") {
            MainScreen.clearText();
            MainScreen.text("Thinking to take advantage of its humanoid form, you wave your cock and slap your ass in a rather lewd manner. However, the creature fails to react to your suggestive actions.\n\n");
            enemyAI();
        }
        else {
            tease();
            if (!combatRoundOver()) enemyAI();
        }
    }

    private normalAttack(): void {
        MainScreen.clearText();
        attack();
    }
}