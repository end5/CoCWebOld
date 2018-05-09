import { Creature } from '../Creature';

export interface IPregnancyEvent {
    incubationDisplay(creature: Creature, incubationTime: number);
    canBirth(creature: Creature, incubationTime: number);
    birthScene(creature: Creature);
}
