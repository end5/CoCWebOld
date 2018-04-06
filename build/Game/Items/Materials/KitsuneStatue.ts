import Material from './Material';
import MaterialName from './MaterialName';
import Character from '../../Character/Character';
import Scenes from '../../Scenes/Scenes';
import ItemDesc from '../ItemDesc';

export default class KitsuneStatue extends Material {
    public constructor() {
        super(
            MaterialName.GoldenStatue,
            new ItemDesc("GldStat", "a golden statue",
                "An intricate golden idol of an androgynous humanoid figure with nine long tails.  It probably had some spiritual significance to its owner."),
            undefined,
            600
        );
    }

    public useText(character: Character) {
        Scenes.forest.kitsuneScene.kitsuneStatue(character);
    }
}
