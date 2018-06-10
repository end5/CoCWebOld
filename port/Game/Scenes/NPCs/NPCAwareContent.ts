/**
 * Created by aimozg on 08.01.14.
 */

	/**
	 * Contains handy references to scenes and methods
	 */
	export class NPCAwareContent extends BaseContent
	{
		public NPCAwareContent()
		{

		}
		// Common scenes
		protected function get telAdre():TelAdre
		{
			return kGAMECLASS.telAdre;
		}
		// Follower interactions
		protected function get finter():FollowerInteractions
		{
			return kGAMECLASS.followerInteractions;
		}

		// Amily
		protected function get amilyScene():AmilyScene
		{
			return kGAMECLASS.amilyScene;
		}

		public amilyFollower(): boolean
		{
			return kGAMECLASS.amilyScene.amilyFollower();
		}
		// Anemone
		protected function get anemoneScene():AnemoneScene
		{
			return kGAMECLASS.anemoneScene;
		}
		// Arian
		protected function get arianScene():ArianScene
		{
			return kGAMECLASS.arianScene;
		}
		public arianFollower(): boolean
		{
			return kGAMECLASS.arianScene.arianFollower();
		}
		// Ceraph
		protected function get ceraphScene():CeraphScene
		{
			return kGAMECLASS.ceraphScene;
		}
		protected function get ceraphFollowerScene():CeraphFollowerScene
		{
			return kGAMECLASS.ceraphFollowerScene;
		}
		public ceraphIsFollower(): boolean
		{
			return kGAMECLASS.ceraphFollowerScene.ceraphIsFollower();
		}
		// Ember
		protected function get emberScene():EmberScene
		{
			return kGAMECLASS.emberScene;
		}
		public followerEmber(): boolean
		{
			return kGAMECLASS.emberScene.followerEmber();
		}
		public emberMF(man: string,woman: string): string
		{
			return kGAMECLASS.emberScene.emberMF(man,woman);
		}
		// Exgartuan
		protected function get exgartuan():Exgartuan
		{
			return kGAMECLASS.exgartuan;
		}
		// Helia
		protected function get helScene():HelScene
		{
			return kGAMECLASS.helScene;
		}
		protected function get helFollower():HelFollower
		{
			return kGAMECLASS.helFollower;
		}
		public followerHel(): boolean
		{
			return kGAMECLASS.helScene.followerHel();
		}
		// Helia spawn
		protected function get helSpawnScene():HelSpawnScene
		{
			return kGAMECLASS.helSpawnScene;
		}

		public helPregnant(): boolean
		{
			return kGAMECLASS.helSpawnScene.helPregnant();
		}
		public helspawnFollower(): boolean
		{
			return kGAMECLASS.helSpawnScene.helspawnFollower();
		}

		// Holli
		protected function get holliScene():HolliScene
		{
			return kGAMECLASS.holliScene;
		}
		// Isabella
		protected function get isabellaScene():IsabellaScene
		{
			return kGAMECLASS.isabellaScene;
		}
		protected function get isabellaFollowerScene():IsabellaFollowerScene
		{
			return kGAMECLASS.isabellaFollowerScene;
		}

		public isabellaFollower(): boolean
		{
			return kGAMECLASS.isabellaFollowerScene.isabellaFollower();
		}

		public isabellaAccent(): boolean
		{
			return kGAMECLASS.isabellaFollowerScene.isabellaAccent();
		}

		// Izma
		public izmaFollower(): boolean
		{
			return kGAMECLASS.izmaScene.izmaFollower();
		}
		protected function get izmaScene():IzmaScene
		{
			return kGAMECLASS.izmaScene;
		}
		// Jojo
		protected function get jojoScene():JojoScene
		{
			return kGAMECLASS.jojoScene;
		}
		protected function get monk(): number {
			return kGAMECLASS.monk;
		}
		public campCorruptJojo(): boolean
		{
			return kGAMECLASS.jojoScene.campCorruptJojo();
		}
		// Kiha
		protected function get kihaFollower():KihaFollower
		{
			return kGAMECLASS.kihaFollower;
		}
		protected function get kihaScene():KihaScene
		{
			return kGAMECLASS.kihaScene;
		}

		public followerKiha(): boolean
		{
			return kGAMECLASS.kihaFollower.followerKiha();
		}

		// Latex Girl
		protected function get latexGirl():LatexGirl
		{
			return kGAMECLASS.latexGirl;
		}
		public latexGooFollower(): boolean
		{
			return kGAMECLASS.latexGirl.latexGooFollower();
		}
		// Marble
		protected function get marbleScene():MarbleScene
		{
			return kGAMECLASS.marbleScene;
		}
		protected function get marblePurification():MarblePurification
		{
			return kGAMECLASS.marblePurification;
		}
		public marbleFollower(): boolean
		{
			return kGAMECLASS.marbleScene.marbleFollower();
		}
		// Milk slave
		public milkSlave(): boolean
		{
			return kGAMECLASS.milkWaifu.milkSlave();
		}
		protected function get milkWaifu():MilkWaifu
		{
			return kGAMECLASS.milkWaifu;
		}
		// Raphael
		protected function raphael():Raphael
		{
			return kGAMECLASS.raphael;
		}
		public RaphaelLikes(): boolean
		{
			return kGAMECLASS.raphael.RaphaelLikes();
		}
		// Rathazul
		protected function rathazul():Rathazul
		{
			return kGAMECLASS.rathazul;
		}
		// Sheila
		protected function get sheilaScene():SheilaScene
		{
			return kGAMECLASS.sheilaScene;
		}
		// Shouldra
		protected function get shouldraFollower():ShouldraFollower
		{
			return kGAMECLASS.shouldraFollower;
		}

		protected function get shouldraScene():ShouldraScene
		{
			return kGAMECLASS.shouldraScene;
		}

		public followerShouldra(): boolean
		{
			return kGAMECLASS.shouldraFollower.followerShouldra();
		}

		// Sophie
		protected function get sophieBimbo():SophieBimbo
		{
			return kGAMECLASS.sophieBimbo;
		}
		protected function get sophieScene():SophieScene
		{
			return kGAMECLASS.sophieScene;
		}

		protected function get sophieFollowerScene():SophieFollowerScene
		{
			return kGAMECLASS.sophieFollowerScene;
		}

		public bimboSophie(): boolean
		{
			return kGAMECLASS.sophieBimbo.bimboSophie();
		}

		public sophieFollower(): boolean
		{
			return kGAMECLASS.sophieFollowerScene.sophieFollower();
		}
		// Urta
		public urtaLove(love: number = 0): boolean {
			return kGAMECLASS.urta.urtaLove(love);
		}
		protected function get urta():Urta
		{
			return kGAMECLASS.urta;
		}
		protected function get urtaPregs():UrtaPregs
		{
			return kGAMECLASS.urtaPregs;
		}
		protected function get urtaHeatRut():UrtaHeatRut
		{
			return kGAMECLASS.urtaHeatRut;
		}
		// Valeria
		protected function get valeria():Valeria
		{
			return kGAMECLASS.valeria;
		}
		// Vapula
		protected function get vapula():Vapula
		{
			return kGAMECLASS.vapula;
		}
		public vapulaSlave(): boolean
		{
			return kGAMECLASS.vapula.vapulaSlave();
		}

	}
}
