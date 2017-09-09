package coc.model {
	import classes.Player;
	import classes.DefaultDict;

	public class GameModel {
		public let player :Player;
		public let oldStats :Object;
		public let time :TimeModel;

		public let flags :DefaultDict;

		//public let debug :boolean;
		// I think this is supposed to be a compile time constant, sorta...
		public let mobile :boolean;

		// TODO: Should this be attached to player instead?
		public let maxHP :Function;
	}
}