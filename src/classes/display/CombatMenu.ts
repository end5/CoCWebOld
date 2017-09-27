import MainScreen, { TopButton } from "./MainScreen";
import Flags, { FlagEnum } from "../Game/Flags";
import Player from "../Player";
import Game from "../Game/Game";

export default class CombatMenu {
    private static newRound = true;

    public static display(player: Player): void { //If returning from a sub menu set newRound to false
        MainScreen.clearText();
        Flags.set(FlagEnum.IN_COMBAT_USE_PLAYER_WAITED_FLAG, 0);
        MainScreen.hideTopButton(TopButton.MainMenu);
        MainScreen.hideTopButton(TopButton.Appearance);
        MainScreen.hideTopButton(TopButton.Perks);

        if (CombatMenu.newRound)
            combatStatusesUpdate(); //Update Combat Statuses
        display();
        updateStats(player);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        if (combatRoundOver())
            return;
        MainScreen.hideButtons();
        let attacks: Function = normalAttack;
        let magic: Function = (canUseMagic() ? magicMenu : null);
        let pSpecials: Function = physicalSpecials;

        if (Game.monster.statusAffects.has("AttackDisabled")) {
            MainScreen.text("\n<b>Chained up as you are, you can't manage any real physical attacks!</b>");
            attacks = null;
        }
        if (monster.statusAffects.has("PhysicalDisabled")) {
            MainScreen.text("<b>  Even physical special attacks are out of the question.</b>");
            pSpecials = null;
        }
        if (player.statusAffects.has("KnockedBack")) {
            MainScreen.text("\n<b>You'll need to close some distance before you can use any physical attacks!</b>");
            MainScreen.addButton(0, "Approach", approachAfterKnockback);
            MainScreen.addButton(1, "Tease", teaseAttack);
            MainScreen.addButton(2, "Spells", magic);
            MainScreen.addButton(3, "Items", inventory.inventoryMenu);
            MainScreen.addButton(4, "Run", runAway);
            if (player.hasKeyItem("Bow") >= 0) MainScreen.addButton(5, "Bow", fireBow);
            MainScreen.addButton(6, "M. Specials", magicalSpecials);
            MainScreen.addButton(7, "Wait", wait);
            MainScreen.addButton(8, "Fantasize", fantasize);
        }
        else if (player.statusAffects.has("IsabellaStunned") || player.statusAffects.has("Stunned")) {
            MainScreen.text("\n<b>You're too stunned to attack!</b>  All you can do is wait and try to recover!");
            MainScreen.addButton(0, "Recover", wait);
        }
        else if (player.statusAffects.has("Whispered")) {
            MainScreen.text("\n<b>Your mind is too addled to focus on combat!</b>  All you can do is try and recover!");
            MainScreen.addButton(0, "Recover", wait);
        }
        else if (player.statusAffects.has("Confusion")) {
            MainScreen.text("\nYou're too confused about who you are to try to attack!");
            MainScreen.addButton(0, "Recover", wait);
        }
        else if (player.statusAffects.has("HarpyBind") || player.statusAffects.has("GooBind") || player.statusAffects.has("TentacleBind") || player.statusAffects.has("NagaBind") || monster.statusAffects.has("QueenBind") || monster.statusAffects.has("PCTailTangle") || player.statusAffects.has("HolliConstrict") || player.statusAffects.has("GooArmorBind")) {
            MainScreen.addButton(0, "Struggle", struggle);
            MainScreen.addButton(5, "Wait", wait);
        }
        else if (monster.statusAffects.has("Constricted")) {
            MainScreen.addButton(0, "Squeeze", desert.nagaScene.naggaSqueeze);
            MainScreen.addButton(1, "Tease", desert.nagaScene.naggaTease);
            MainScreen.addButton(4, "Release", desert.nagaScene.nagaLeggoMyEggo);
        }
        else if (player.statusAffects.has("Bound")) {
            MainScreen.addButton(0, "Struggle", (monster as Ceraph).ceraphBindingStruggle);
            MainScreen.addButton(5, "Wait", (monster as Ceraph).ceraphBoundWait);
        }
        else if (monster.statusAffects.has("MinotaurEntangled")) {
            MainScreen.text("\n<b>You're bound up in the minotaur lord's chains!  All you can do is try to struggle free!</b>");
            MainScreen.addButton(0, "Struggle", struggle);
            MainScreen.addButton(5, "Wait", wait);
        }
        else if (player.statusAffects.has("UBERWEB")) {
            MainScreen.addButton(0, "Struggle", struggle);
            MainScreen.addButton(6, "M. Specials", magicalSpecials);
        }
        else if (player.statusAffects.has("Chokeslam")) {
            MainScreen.addButton(0, "Struggle", (monster as Izumi).chokeSlamStruggle);
            MainScreen.addButton(5, "Wait", (monster as Izumi).chokeSlamWait);
        }
        else if (player.statusAffects.has("Titsmother")) {
            MainScreen.addButton(0, "Struggle", (monster as Izumi).titSmotherStruggle);
            MainScreen.addButton(5, "Wait", (monster as Izumi).titSmotherWait);
        }
        else if (player.statusAffects.has("Tentagrappled")) {
            MainScreen.text("\n<b>The demonesses tentacles are constricting your limbs!</b>");
            MainScreen.addButton(0, "Struggle", (monster as SuccubusGardener).grappleStruggle);
            MainScreen.addButton(5, "Wait", (monster as SuccubusGardener).grappleWait);
        }
        else { //REGULAR MENU
            MainScreen.addButton(0, "Attack", attacks);
            MainScreen.addButton(1, "Tease", teaseAttack);
            MainScreen.addButton(2, "Spells", magic);
            MainScreen.addButton(3, "Items", inventory.inventoryMenu);
            MainScreen.addButton(4, "Run", runAway);
            MainScreen.addButton(5, "P. Specials", pSpecials);
            MainScreen.addButton(6, "M. Specials", magicalSpecials);
            MainScreen.addButton(7, (monster.statusAffects.has("Level") ? "Climb" : "Wait"), wait);
            MainScreen.addButton(8, "Fantasize", fantasize);
            if (CoC_Settings.debugBuild && !debug) MainScreen.addButton(9, "Inspect", debugInspect);
        }
    }

    public static physicalCost(mod: number): number {
        let costPercent: number = 100;
        if (player.perks.has("IronMan")) costPercent -= 50;
        mod *= costPercent / 100;
        return mod;
    }

    public static spellCost(player: Player, mod: number): number {
        //Addiditive mods
        let costPercent: number = 100;
        if (player.perks.has("SpellcastingAffinity")) costPercent -= player.perks.get("SpellcastingAffinity").value1;
        if (player.perks.has("WizardsEndurance")) costPercent -= player.perks.get("WizardsEndurance").value1;

        //Limiting it and multiplicative mods
        if (player.perks.has("BloodMage") && costPercent < 50) costPercent = 50;

        mod *= costPercent / 100;

        if (player.perks.has("HistoryScholar")) {
            if (mod > 2) mod *= .8;
        }
        if (player.perks.has("BloodMage") && mod < 5) mod = 5;
        else if (mod < 2) mod = 2;

        mod = Math.round(mod * 100) / 100;
        return mod;
    }
    /*
    public HPChange(changeNum: number, display: boolean): void {
        if (changeNum == 0) return;
        if (changeNum > 0) {
            //Increase by 20%!
            if (player.perks.has("HistoryHealer")) changeNum *= 1.2;
            if (player.HP + int(changeNum) > maxHP()) {
                if (player.HP >= maxHP()) {
                    if (display) MainScreen.text("You're as healthy as you can be.\n", false);
                    return;
                }
                if (display) MainScreen.text("Your HP maxes out at " + maxHP() + ".\n", false);
                player.HP = maxHP();
            }
            else {
                if (display) MainScreen.text("You gain " + int(changeNum) + " HP.\n", false);
                player.HP += int(changeNum);
                mainView.statsView.showStatUp('hp');
                // hpUp.visible = true;
            }
        }
        //Negative HP
        else {
            if (player.HP + changeNum <= 0) {
                if (display) MainScreen.text("You take " + int(changeNum * -1) + " damage, dropping your HP to 0.\n", false);
                player.HP = 0;
            }
            else {
                if (display) MainScreen.text("You take " + int(changeNum * -1) + " damage.\n", false);
                player.HP += changeNum;
            }
        }
        updateStats(player);
    }*/

}