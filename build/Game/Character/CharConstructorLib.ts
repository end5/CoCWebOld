import Character from './Character';
import { CharacterType } from './CharacterType';
import Player from './Player/Player';
import Dictionary from '../../Engine/Utilities/Dictionary';
import Akbal from '../Scenes/Areas/Forest/Akbal';
import BeeGirl from '../Scenes/Areas/Forest/BeeGirl';
import Kitsune from '../Scenes/Areas/Forest/Kitsune';

type CharConstructor = new () => Character;
export default class CharConstructorLib extends Dictionary<CharConstructor> {
    public constructor() {
        super();
        this.set(CharacterType.Player, Player);
        // Areas
        // Bog
        // this.set(CharacterType.ChameleonGirl, ChameleonGirl);
        // this.set(CharacterType.FrogGirl, FrogGirl);
        // this.set(CharacterType.Phouka, Phouka);
        // Desert
        // this.set(CharacterType.CumWitch, CumWitch);
        // this.set(CharacterType.DemonPack, DemonPack);
        // this.set(CharacterType.Naga, Naga);
        // this.set(CharacterType.SandTrap, SandTrap);
        // this.set(CharacterType.SandWitch, SandWitch);
        // Forest
        this.set(CharacterType.Akbal, Akbal);
        this.set(CharacterType.BeeGirl, BeeGirl);
        // this.set(CharacterType.Essrayle, Essrayle);
        // this.set(CharacterType.Faerie, Faerie);
        // this.set(CharacterType.Kitsune, Kitsune);
        // this.set(CharacterType.Tamani, Tamani);
        // this.set(CharacterType.TamaniDaughters, TamaniDaughters);
        // this.set(CharacterType.TentacleBeast, TentacleBeast);
        // High Mountains
        // this.set(CharacterType.Basilisk, Basilisk);
        // this.set(CharacterType.Harpy, Harpy);
        // this.set(CharacterType.Izumi, Izumi);
        // this.set(CharacterType.Minerva, Minerva);
        // this.set(CharacterType.MinotaurMob, MinotaurMob);
        // Lake
        // this.set(CharacterType.FetishCultist, FetishCultist);
        // this.set(CharacterType.FetishZealot, FetishZealot);
        // this.set(CharacterType.GooGirl, GooGirl);
        // this.set(CharacterType.GreenSlime, GreenSlime);
        // this.set(CharacterType.Kaiju, Kaiju);
        // Mountain
        // this.set(CharacterType.Hellhound, Hellhound);
        // this.set(CharacterType.InfestedHellhound, InfestedHellhound);
        // this.set(CharacterType.Minotaur, Minotaur);
        // this.set(CharacterType.WormMass, WormMass);
        // Plains
        // this.set(CharacterType.BunnyGirl, BunnyGirl);
        // this.set(CharacterType.Gnoll, Gnoll);
        // this.set(CharacterType.GnollSpearThrower, GnollSpearThrower);
        // this.set(CharacterType.Satyr, Satyr);
        // Swamp
        // this.set(CharacterType.CorruptedDrider, CorruptedDrider);
        // this.set(CharacterType.FemaleSpiderMorph, FemaleSpiderMorph);
        // this.set(CharacterType.MaleSpiderMorph, MaleSpiderMorph);
        // this.set(CharacterType.Rogar, Rogar);
        // this.set(CharacterType.SpiderMorphMob, SpiderMorphMob);
        // Camp
        // this.set(CharacterType.ImpGang, ImpGang);

        // Dungeons
        // D3
        // this.set(CharacterType.Doppleganger, Doppleganger);
        // this.set(CharacterType.HermCentaur, HermCentaur);
        // this.set(CharacterType.IncubusMechanic, IncubusMechanic);
        // this.set(CharacterType.JeanClaude, JeanClaude);
        // this.set(CharacterType.LivingStatue, LivingStatue);
        // this.set(CharacterType.SuccubusGardener, SuccubusGardener);
        // Deep Cave
        // this.set(CharacterType.EncapsulationPod, EncapsulationPod);
        // this.set(CharacterType.ImpHorde, ImpHorde);
        // this.set(CharacterType.Vala, Vala);
        // this.set(CharacterType.Zetaz, Zetaz);
        // Desert Cave
        // this.set(CharacterType.SandMother, SandMother);
        // this.set(CharacterType.SandWitchMob, SandWitchMob);
        // Factory
        // this.set(CharacterType.IncubusMechanic, IncubusMechanic);
        // this.set(CharacterType.OmnibusOverseer, OmnibusOverseer);
        // this.set(CharacterType.SecretarialSuccubus, SecretarialSuccubus);
        // Hel Dungeon
        // this.set(CharacterType.Brigid, Brigid);
        // this.set(CharacterType.HarpyMob, HarpyMob);
        // this.set(CharacterType.HarpyQueen, HarpyQueen);
        // this.set(CharacterType.PhoenixPlatoon, PhoenixPlatoon);

        // Explore
        // this.set(CharacterType.Gargoyle, Gargoyle);
        // this.set(CharacterType.Giacomo, Giacomo);
        // this.set(CharacterType.Lumi, Lumi);
        // this.set(CharacterType.PlantGirl, PlantGirl);
        // this.set(CharacterType.Worms, Worms);

        // Holiday

        // Monsters
        // this.set(CharacterType.Goblin, Goblin);
        // this.set(CharacterType.GoblinAssassin, GoblinAssassin);
        // this.set(CharacterType.Imp, Imp);
        // this.set(CharacterType.ImpLord, ImpLord);

        // NPC
        // this.set(CharacterType.Amily, Amily);
        // this.set(CharacterType.Anemone, Anemone);
        // this.set(CharacterType.Arian, Arian);
        // this.set(CharacterType.Ceraph, Ceraph);
        // this.set(CharacterType.Clara, Clara);
        // this.set(CharacterType.Ember, Ember);
        // this.set(CharacterType.Exgartuan, Exgartuan);
        // this.set(CharacterType.GooArmor, GooArmor);
        // this.set(CharacterType.Hel, Hel);
        // this.set(CharacterType.HelSpawn, HelSpawn);
        // this.set(CharacterType.Holli, Holli);
        // this.set(CharacterType.Isabella, Isabella);
        // this.set(CharacterType.Izma, Izma);
        // this.set(CharacterType.Jojo, Jojo);
        // this.set(CharacterType.Kiha, Kiha);
        // this.set(CharacterType.LatexGirl, LatexGirl);
        // this.set(CharacterType.Marble, Marble);
        // this.set(CharacterType.MilkWaifu, MilkWaifu);
        // this.set(CharacterType.Raphael, Raphael);
        // this.set(CharacterType.Sheila, Sheila);
        // this.set(CharacterType.Shouldra, Shouldra);
        // this.set(CharacterType.Sophie, Sophie);
        // this.set(CharacterType.Urta, Urta);
        // this.set(CharacterType.Valeria, Valeria);
        // this.set(CharacterType.Vapula, Vapula);

        // Places
        // Bazaar
        // this.set(CharacterType.Benoit, Benoit);
        // this.set(CharacterType.Cinnabar, Cinnabar);
        // this.set(CharacterType.Lilium, Lilium);
        // this.set(CharacterType.Roxanne, Roxanne);
        // Boat
        // this.set(CharacterType.Marae, Marae);
        // this.set(CharacterType.SharkGirl, SharkGirl);
        // Farm
        // this.set(CharacterType.Kelly, Kelly);
        // this.set(CharacterType.Kelt, Kelt);
        // Owca
        // this.set(CharacterType.Farmers, Farmers);
        // this.set(CharacterType.LustyDemons, LustyDemons);
        // TelAdre
        // this.set(CharacterType.AuntNancy, AuntNancy);
        // this.set(CharacterType.Brooke, Brooke);
        // this.set(CharacterType.Cotton, Cotton);
        // this.set(CharacterType.Dominika, Dominika);
        // this.set(CharacterType.Edryn, Edryn);
        // this.set(CharacterType.Frosty, Frosty);
        // this.set(CharacterType.Heckel, Heckel);
        // this.set(CharacterType.Ifris, Ifris);
        // this.set(CharacterType.Jasun, Jasun);
        // this.set(CharacterType.Katherine, Katherine);
        // this.set(CharacterType.Loppe, Loppe);
        // this.set(CharacterType.Lottie, Lottie);
        // this.set(CharacterType.Maddie, Maddie);
        // this.set(CharacterType.Niamh, Niamh);
        // this.set(CharacterType.Rubi, Rubi);
        // this.set(CharacterType.Scylla, Scylla);

        // Urta Quest
        // this.set(CharacterType.GoblinBroodmother, GoblinBroodmother);
        // this.set(CharacterType.MilkySuccubus, MilkySuccubus);
        // this.set(CharacterType.MinotaurLord, MinotaurLord);
        // Sirius
    }
}
