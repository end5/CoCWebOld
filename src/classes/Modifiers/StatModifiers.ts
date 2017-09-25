import CreatureBody from "../Body/Body";
import MainScreen from "../display/MainScreen";
import Player from "../Player";

export default class StatModifiers {
    public static HPChange(body: CreatureBody, changeAmount: number): number {
        if (changeAmount == 0) return;
        if (changeAmount > 0) {
            //Increase by 20%!
            if (body.perks.has("HistoryHealer"))
                changeAmount *= 1.2;
            if (body.stats.HP + Math.floor(changeAmount) > body.stats.maxHP()) {
                if (body.stats.HP >= body.stats.maxHP()) {
                    return;
                }
                body.stats.HP = body.stats.maxHP();
            }
            else {
                body.stats.HP += Math.floor(changeAmount);
                // mainView.statsView.showStatUp('hp');
                // hpUp.visible = true;
            }
        }
        //Negative HP
        else {
            if (body.stats.HP + changeAmount <= 0) {
                body.stats.HP = 0;
            }
            else {
                body.stats.HP += changeAmount;
            }
        }
    }

    //Modify fatigue
    //types:
    //        0 - normal
    //        1 - magic
    public static fatigue(player: Player, mod: number, type: number = 0): void {
        //Spell reductions
        if (type == 1) {
            mod = spellCost(mod);

            //Blood mages use HP for spells
            if (player.findPerk(PerkLib.BloodMage) >= 0) {
                takeDamage(mod);
                statScreenRefresh();
                return;
            }
        }
        //Physical special reductions
        if (type == 2) {
            mod = physicalCost(mod);
        }
        if (player.fatigue >= 100 && mod > 0) return;
        if (player.fatigue <= 0 && mod < 0) return;
        //Fatigue restoration buffs!
        if (mod < 0) {
            var multi: Number = 1;

            if (player.findPerk(PerkLib.HistorySlacker) >= 0) multi += 0.2;
            if (player.findPerk(PerkLib.ControlledBreath) >= 0 && player.cor < 30) multi += 0.1;

            mod *= multi;
        }
        player.fatigue += mod;
        if (mod > 0) {
            mainView.statsView.showStatUp('fatigue');
            // fatigueUp.visible = true;
            // fatigueDown.visible = false;
        }
        if (mod < 0) {
            mainView.statsView.showStatDown('fatigue');
            // fatigueDown.visible = true;
            // fatigueUp.visible = false;
        }
        if (player.fatigue > 100) player.fatigue = 100;
        if (player.fatigue < 0) player.fatigue = 0;
        statScreenRefresh();
    }
    //function changeFatigue
    public function changeFatigue(changeF: Number): void {
        fatigue(changeF);
    }
public function minLust(): Number {
    return player.minLust();
}
}