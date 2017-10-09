import CombatDrops from './CombatDrops';
import CombatEnd from './CombatEnd';
import Character from '../Character';
import MainScreen from '../display/MainScreen';
import CombatMenu from '../display/Menus/CombatMenu';
import Item from '../Items/Item';
import ItemStack from '../Items/ItemStack';
import Monster from '../Monster';
import Player from '../Player';

class LostContainer {
    public readonly character: Character;
    public readonly lostDetailsFunc: Function;
    public constructor(character: Character, lostFunc: Function) {
        this.character = character;
        this.lostDetailsFunc = lostFunc;
    }
}

class CombatParty {
    public party: Character[];
    public loseEvents: LostContainer[];
    private lostMember: boolean;

    public constructor(party: Character[]) {
        this.party = party;
    }

    public lostFight(lostFunction: Function) {
        this.lostMember = true;
        this.loseEvents.push(new LostContainer(this.party[0], lostFunction));
    }

    public updateMembers() {
        if (this.lostMember)
            this.party.shift();
        else
            this.party.push(this.party.shift());
    }
}


export default class CombatManager {
    public static run(player: Player, playerParty: Character[], monsterParty: Character[]) {
        // Cannot decide if player loses, battle is over
        let players = new CombatParty(playerParty.concat(player));
        let monsters = new CombatParty(monsterParty);

        while (players.party.length > 0 || monsters.party.length > 0) {
            if (players.party[0] instanceof Player) {
                // player pick action
                CombatMenu.display(<Player>players.party[0]);
            }
            else {
                //do ai
                players.party[0];
            }

            // do ai
            monsters.party[0];

            CombatManager.resolveCombatRound(players, monsters);

            players.updateMembers();
            monsters.updateMembers();
        }

        CombatManager.combatEnd(player, players, monsters);
    }

    private static resolveCombatRound(players: CombatParty, monsters: CombatParty) {
        let monster = monsters.party[0];
        let player = players.party[0];
        
        if (monster.stats.HP < 1) {
            MainScreen.text("You defeat " + monster.a + monster.short + ".\n", true);
            monsters.lostFight(CombatEnd.endHpVictory);
        }
        else if (monster.stats.lust > 99) {
            MainScreen.text("You smile as " + monster.a + monster.short + " collapses and begins masturbating feverishly.", true);
            monsters.lostFight(CombatEnd.endLustVictory);
        }

        if (monster.statusAffects.has("Level")) {
            if (<SandTrap>monster.trapLevel() <= 1) {
                players.lostFight(desert.sandTrapScene.sandtrapmentLoss());
            }
        }
        else if (monster.short == "basilisk" && player.stats.spe <= 1) {
            players.lostFight(CombatEnd.endHpLoss);
        }
        else if (player.stats.HP < 1) {
            players.lostFight(CombatEnd.endHpLoss);
        }
        else if (player.stats.lust > 99) {
            players.lostFight(CombatEnd.endLustLoss);
        }
    }

    private static combatEnd(player: Player, players: CombatParty, monsters: CombatParty) {
        if (players.party.length == 0) {
            // do player party lose
            for (let index: number = 0; index < players.loseEvents.length; index++) {
                players.loseEvents[index].lostDetailsFunc();
            }                
        }
        else if (monsters.party.length == 0) {
            // do monster party lose
            for (let index: number = 0; index < monsters.loseEvents.length; index++) {
                // This is questionable. Should it be character or monster?
                monsters.loseEvents[index].lostDetailsFunc();
                CombatDrops.awardPlayer(player, <Monster>monsters.loseEvents[index].character);            
            }
        }
        CombatStatusAffects.clearStatuses();
        // cleanup status affects
    }
}