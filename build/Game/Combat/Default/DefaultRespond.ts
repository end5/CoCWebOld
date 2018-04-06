import Teased from './Teased';
import Character from '../../Character/Character';
import ActionRespond from '../ActionRespond';

export default class DefaultRespond implements ActionRespond {
    private self: Character;
    public constructor(character: Character) {
        this.self = character;
    }
    public enemyAttack() { }
    public enemyTease(damage: number, enemy: Character): void {
        Teased(damage, this.self, enemy);
    }
    public enemyUseItem() { }
    public enemyPhysicalAttack() { }
    public enemyMagicalAttack() { }
    public enemyDodge() { }
    public enemyRun() { }
    public feared() { }
    public stunned() { }
    public constricted() { }
    public blinded() { }
}
