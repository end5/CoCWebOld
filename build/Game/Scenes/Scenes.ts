import Forest from './Areas/Forest';
import * as Camp from './Camp';
import * as EndDay from './EndDay';
import Exploration from './Explore/Exploration';
import Gargoyle from './Explore/Gargoyle';
import Lumi from './Explore/Lumi';
import Masturbation from './Masturbation';

class Scenes {
    // Scenes/
    public endDay = EndDay;
    public camp = Camp;
    public masturbation = Masturbation;
    // Scenes/Areas/
    public exploration = Exploration;
    public forest: Forest = new Forest();
    // Scenes/Dungeons
    // Scenes/Monsters/
    // Scenes/NPC/
    // Scenes/Places/
    // Scenes/Quests/
}

const scenes = new Scenes();
export default scenes as Scenes;
