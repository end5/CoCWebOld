export default class BallsChangeDescriptor {
    public static ballsRemovalDescription(creature: Creature) {
        MainScreen.text("  <b>Your " + BallsDescriptor.sackDescript(creature) + " and " + BallsDescriptor.ballsDescription(creature) + " shrink and disappear, vanishing into your groin.</b>", false);
    }

}