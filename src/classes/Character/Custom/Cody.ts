import { SkinType } from '../../Body/Skin';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';

export default function customCody(player: Player): void {
    DisplayText("Your orange and black tiger stripes make you cut a more imposing visage than normal, and with your great strength, armor, and claymore, you're a natural pick for champion.");
    // well to start off the name would be Cody
    // -Cat with (black and orange tiger fur if possible) if not just Orange fur
    player.torso.neck.head.hair.color = "black and orange";
    player.skin.type = SkinType.FUR;
    player.skin.desc = "fur";
    // -Chainmail armor
    player.setArmor(armors.FULLCHN);
    // -Large Claymore (i understand 40 Strength is need so if he could start with that would be great if not hit the gyms)"
    player.stats.str = 41;
    player.setWeapon(weapons.CLAYMOR);
}
