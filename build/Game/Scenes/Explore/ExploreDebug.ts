/**
 * Created by aimozg on 20.02.14.
 */
public class ExploreDebug {

	public doExploreDebug() {
		DisplayText().clear();
		

		DisplayText("<b>Monsters</b> &nbsp; combat each monster.\n\n");
		MainScreen.addButton(0, "Monsters", exploreDebugMonsters);
	}

	// array of lazy monster creators
	// 1) first go simple monsters that do not depend on/change game state
	// 2) then NPCs and quest monsters that might depend on/change game state
	// but still fightable without special initialization
	// 3) finally very special monsters, which rely on some kind of game state initialization (such as Ember)
	// and may crash or break something very heavily on attempt to fight
	private let allMonsters:Array = [
		// Generic monsters first...
		function (): Monster { return new Anemone(); },
		function (): Monster { return new Basilisk(); },
		function (): Monster { return new BeeGirl(); },
		function (): Monster { return new ChameleonGirl(); },
		function (): Monster { return new CorruptedDrider(); },
		function (): Monster { return new CumWitch(); },
		function (): Monster { return new DemonPack(); },
		function (): Monster { return new FemaleSpiderMorph(); },
		function (): Monster { return new FetishCultist(); },
		function (): Monster { return new FetishZealot(); },
		function (): Monster { return new Gnoll(); },
		function (): Monster { return new GnollSpearThrower(); },
		function (): Monster { return new Goblin(); },
		function (): Monster { return new GoblinAssassin(); },
		function (): Monster { return new GooGirl(); },
		function (): Monster { return new GreenSlime(); },
		function (): Monster { return new Harpy(); },
		function (): Monster { return new HellHound(); },
		function (): Monster { return new Imp(); },
		function (): Monster { return new ImpHorde(); },
		function (): Monster { return new ImpLord(); },
		function (): Monster { return new InfestedHellhound(); },
		function (): Monster { return new Kitsune("black"); },
		function (): Monster { return new Kitsune("blonde"); },
		function (): Monster { return new Kitsune("red"); },
		function (): Monster { return new MaleSpiderMorph(); },
		function (): Monster { return new Minotaur(true); },
		function (): Monster { return new Minotaur(false); },
		function (): Monster { return new MinotaurMob(); },
		function (): Monster { return new Naga(); },
		function (): Monster { return new SandTrap(); },
		function (): Monster { return new SandWitch(); },
		function (): Monster { return new Satyr(); },
		function (): Monster { return new SharkGirl(); },
		function (): Monster { return new TentacleBeast(); },
		function (): Monster { return new WormMass(); },
		// ...NPCs, quest, and named monsters second, ...
		function (): Monster { return new Akbal(); },
		function (): Monster { return new Amily(); },
		function (): Monster { return new Brigid(); },
		function (): Monster { return new Ceraph(); },
		function (): Monster { return new GooArmor(); },
		function (): Monster { return new Farmers(); },
		function (): Monster { return new GoblinBroodmother(); },
		function (): Monster { return new HarpyMob(); },
		function (): Monster { return new HarpyQueen(); },
		function (): Monster { return new Hel(); },
		function (): Monster { return new IncubusMechanic(); },
		function (): Monster { return new Isabella(); },
		function (): Monster { return new Izma(); },
		function (): Monster { return new Izumi(); },
		function (): Monster { return new Jojo(); },
		function (): Monster { return new Kelt(); },
		function (): Monster { return new Kiha(); },
		function (): Monster { return new LustyDemons(); },
		function (): Monster { return new Marble(); },
		function (): Monster { return new MilkySuccubus(); },
		function (): Monster { return new Minerva(); },
		function (): Monster { return new MinotaurLord(); },
		function (): Monster { return new OmnibusOverseer(); },
		function (): Monster { return new PhoenixPlatoon(); },
		function (): Monster { return new SandMother(); },
		function (): Monster { return new SandWitchMob(); },
		function (): Monster { return new SecretarialSuccubus(); },
		function (): Monster { return new Shouldra(); },
		function (): Monster { return new Sirius(); },
		function (): Monster { return new Sophie(); },
		function (): Monster { return new SpiderMorphMob(); },
		function (): Monster { return new Tamani(); },
		function (): Monster { return new TamanisDaughters(); },
		function (): Monster { return new Vala(); },
		function (): Monster { return new Zetaz(); },
		// ...VERY special monsters third.
		function (): Monster { return new EncapsulationPod(); },
		function (): Monster { return new Sheila(); },
		function (): Monster { return new Holli(); },
		function (): Monster { return new Helspawn(); },
		function (): Monster { return new Ember(); }
	];

	private exploreDebugMonsters(monsterIdx: number = 0) {
		DisplayText().clear();
		

		if (monsterIdx === 0) {
			DisplayText("<b>WARNING.</b> You are going to fight (probably) all the monsters. " +
				"You won't be penalized for defeat or awarded for victory. " +
				"Even though the monsters' victory and defeat events are removed, " +
				"fighting certain quest monsters/NPCs through this debug scene " +
				"may put their scenes into inconsistent state. \n\n");
		}

		if (monsterIdx >= allMonsters.length) {
			DisplayText("You have fought every monster.");
		} else {
			let m: Monster = allMonsters[monsterIdx]();
			m.onDefeated = function (hpVictory: boolean) {
				Game.inCombat = false;
				Game.clearStatuses(false);
				statScreenRefresh();
				exploreDebugMonsters(monsterIdx + 1);
			};
			m.onWon = function (hpVictory: boolean, pcCameWorms: boolean) {
				Game.inCombat = false;
				Game.clearStatuses(false);
				statScreenRefresh();
				exploreDebugMonsters(monsterIdx + 1);
			};
			m.onPcRunAttempt = function () {
				Game.inCombat = false;
				Game.clearStatuses(false);
				statScreenRefresh();
				exploreDebugMonsters(monsterIdx + 1);
			};
			DisplayText("You are going to fight " + m.a + " " + m.short + ".");
			MainScreen.addButton(0, "Fight", function () {
				DisplayText("\n\nStarting combat...");
				startCombat(m);
			});
			MainScreen.addButton(1, "Skip", exploreDebugMonsters, monsterIdx + 1);
			MainScreen.addButton(2, "Heal", function () {
				player.stats.HP = player.maxHP();
				player.stats.lust = 0;
				statScreenRefresh();
			});
		}
		if (monsterIdx > 1) MainScreen.addButton(6, "Go Back", exploreDebugMonsters, monsterIdx - 1);
		MainScreen.addButton(9, "Enough", playerMenu);
	}

	public ExploreDebug() {
	}
}
}
