import CombatDrops from './CombatDrops';
import CombatEnd from './CombatEnd';
import CombatUpdate from './CombatUpdate';
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
    public ableMembers: Character[];
    public loseEvents: LostContainer[];
    private lostMember: boolean;

    public constructor(party: Character[]) {
        this.ableMembers = party;
    }

    public lostFight(lostFunction: Function) {
        this.lostMember = true;
        this.loseEvents.push(new LostContainer(this.ableMembers[0], lostFunction));
    }

    public updateMembers() {
        if (this.lostMember)
            this.ableMembers.shift();
        else
            this.ableMembers.push(this.ableMembers.shift());
    }
}

/**
 * Special endings must perform all cleanup.
 */
export interface SpecialEnding {
    (player: Player, playerParty: Character[], monsterParty: Character[]);

}

export default class CombatManager {
    public static run(player: Player, playerParty: Character[], monsterParty: Character[], specialEnding: SpecialEnding = null) {
        // Cannot decide if player loses, battle is over
        let players = new CombatParty(playerParty.concat(player));
        let monsters = new CombatParty(monsterParty);

        while (players.ableMembers.length > 0 || monsters.ableMembers.length > 0) {
            if (players.ableMembers[0] instanceof Player) {
                // player pick action
                CombatMenu.display(<Player>players.ableMembers[0]);
            }
            else {
                //do ai
                players.ableMembers[0];
            }

            // do ai
            monsters.ableMembers[0];

            CombatManager.resolveCombatRound(players, monsters);

            players.updateMembers();
            monsters.updateMembers();
        }
        if (!specialEnding) {
            CombatManager.combatEnd(player, players, monsters);
            CombatEnd.combatCleanup(player, playerParty, monsterParty);
        }
        else
            specialEnding(player, playerParty, monsterParty);
    }

    private static resolveCombatRound(players: CombatParty, monsters: CombatParty) {
        let monster = monsters.ableMembers[0];
        let player = players.ableMembers[0];

        CombatUpdate.combatStatusAffectsUpdate(players.ableMembers, monsters.ableMembers);

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
            // should be basilisk lost fight
            players.lostFight(basilisk.scene.lost());
        }
        else if (player.stats.HP < 1) {
            players.lostFight(CombatEnd.endHpLoss);
        }
        else if (player.stats.lust > 99) {
            players.lostFight(CombatEnd.endLustLoss);
        }
    }

    private static combatEnd(player: Player, playerParty: CombatParty, monsters: CombatParty) {
        if (playerParty.ableMembers.length == 0) {
            // do player party lose
            for (let index: number = 0; index < playerParty.loseEvents.length; index++) {
                playerParty.loseEvents[index].lostDetailsFunc();
            }
        }
        else if (monsters.ableMembers.length == 0) {
            // do monster party lose
            for (let index: number = 0; index < monsters.loseEvents.length; index++) {
                // This is questionable. Should it be character or monster?
                monsters.loseEvents[index].lostDetailsFunc();
                CombatDrops.awardPlayer(player, <Monster>monsters.loseEvents[index].character);
            }
        }
    }
}