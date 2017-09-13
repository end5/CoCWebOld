export default class SceneManager {
    // Scenes/
    public let camp:Camp = new Camp(campInitialize);
    public let exploration:Exploration = new Exploration();
    public let followerInteractions:FollowerInteractions = new FollowerInteractions();
    public let inventory:Inventory = new Inventory(saves);
    public let masturbation:Masturbation = new Masturbation();
    // Scenes/Areas/
    public let bog:Bog = new Bog();
    public let desert:Desert = new Desert();
    public let forest:Forest = new Forest();
    public let highMountains:HighMountains = new HighMountains();
    public let lake:Lake = new Lake();
    public let mountain:Mountain = new Mountain();
    public let plains:Plains = new Plains();
    public let swamp:Swamp = new Swamp();
    // Scenes/Dungeons
    public let brigidScene:BrigidScene = new BrigidScene();
    public let d3:D3 = new D3();
    // Scenes/Explore/
    public let gargoyle:Gargoyle = new Gargoyle();
    public let lumi:Lumi = new Lumi();
    // Scenes/Monsters/
    public let goblinScene:GoblinScene = new GoblinScene();
    public let impScene:ImpScene = new ImpScene();
    public let goblinAssassinScene:GoblinAssassinScene = new GoblinAssassinScene();
    // Scenes/NPC/
    public let amilyScene:AmilyScene = new AmilyScene();
    public let anemoneScene:AnemoneScene = new AnemoneScene();
    public let arianScene:ArianScene = new ArianScene();
    public let ceraphScene:CeraphScene = new CeraphScene();
    public let ceraphFollowerScene:CeraphFollowerScene = new CeraphFollowerScene();
    public let emberScene:EmberScene = new EmberScene();
    public let exgartuan:Exgartuan = new Exgartuan();
    public let helFollower:HelFollower = new HelFollower();
    public let helScene:HelScene = new HelScene();
    public let helSpawnScene:HelSpawnScene = new HelSpawnScene();
    public let holliScene:HolliScene = new HolliScene();
    public let isabellaScene:IsabellaScene = new IsabellaScene();
    public let isabellaFollowerScene:IsabellaFollowerScene = new IsabellaFollowerScene();
    public let izmaScene:IzmaScene = new IzmaScene();
    public let jojoScene:JojoScene = new JojoScene();
    public let kihaFollower:KihaFollower = new KihaFollower();
    public let kihaScene:KihaScene = new KihaScene();
    public let latexGirl:LatexGirl = new LatexGirl();
    public let marbleScene:MarbleScene = new MarbleScene();
    public let marblePurification:MarblePurification = new MarblePurification();
    public let milkWaifu:MilkWaifu = new MilkWaifu();
    public let raphael:Raphael = new Raphael();
    public let rathazul:Rathazul = new Rathazul();
    public let sheilaScene:SheilaScene = new SheilaScene();
    public let shouldraFollower:ShouldraFollower = new ShouldraFollower();
    public let shouldraScene:ShouldraScene = new ShouldraScene();
    public let sophieBimbo:SophieBimbo = new SophieBimbo();
    public let sophieFollowerScene:SophieFollowerScene = new SophieFollowerScene();
    public let sophieScene:SophieScene = new SophieScene();
    public let urta:Urta = new Urta();
    public let urtaHeatRut:UrtaHeatRut = new UrtaHeatRut();
    public let urtaPregs:UrtaPregs = new UrtaPregs();
    public let valeria:Valeria = new Valeria();
    public let vapula:Vapula = new Vapula();
    // Scenes/Places/
    public let bazaar:Bazaar = new Bazaar();
    public let boat:Boat = new Boat();
    public let farm:Farm = new Farm();
    public let owca:Owca = new Owca();
    public let telAdre:TelAdre = new TelAdre();
    // Scenes/Quests/
    public let urtaQuest:UrtaQuest = new UrtaQuest();


    public let explored:boolean;
    public let foundForest:boolean;
    public let foundDesert:boolean;
    public let foundMountain:boolean;
    public let foundLake:boolean;
    public let whitney:number;
    public let monk:number;
    public let sand:number;
    public let giacomo: number;

}