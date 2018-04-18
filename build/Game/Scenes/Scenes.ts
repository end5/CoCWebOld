import * as Forest from './Areas/Forest';
import * as Camp from './Camp';
import * as EndDay from './EndDay';
import * as Exploration from './Exploration';
import * as Gargoyle from './Explore/Gargoyle';
import * as Lumi from './Explore/Lumi';
import * as Masturbation from './Masturbation';

class Scenes {
    // Scenes/
    public endDay = EndDay;
    public camp = Camp;
    public masturbation = Masturbation;
    // Scenes/Areas/
    public exploration = Exploration;
    public forest = Forest;
    // Scenes/Dungeons
    // Scenes/Monsters/
    // Scenes/NPC/
    // Scenes/Places/
    // Scenes/Quests/
}

const scenes = new Scenes();
export default scenes as Scenes;
