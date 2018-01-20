import Body from '../Creature';

export default interface IPregnancyEvent {
    incubationDisplay(creature: Body, incubationTime: number);
    canBirth(creature: Body, incubationTime: number);
    birthScene(creature: Body);
}
