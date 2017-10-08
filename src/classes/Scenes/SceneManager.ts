import UpdateInterface from "../UpdateInterface";

export default class SceneManager implements UpdateInterface {
    // Scenes/
    public camp:Camp = new Camp(campInitialize);
    public exploration:Exploration = new Exploration();
    public followerInteractions:FollowerInteractions = new FollowerInteractions();
    public inventory:Inventory = new Inventory(saves);
    public masturbation:Masturbation = new Masturbation();
    // Scenes/Areas/
    public bog:Bog = new Bog();
    public desert:Desert = new Desert();
    public forest:Forest = new Forest();
    public highMountains:HighMountains = new HighMountains();
    public lake:Lake = new Lake();
    public mountain:Mountain = new Mountain();
    public plains:Plains = new Plains();
    public swamp:Swamp = new Swamp();
    // Scenes/Dungeons
    public brigidScene:BrigidScene = new BrigidScene();
    public d3:D3 = new D3();
    // Scenes/Explore/
    public gargoyle:Gargoyle = new Gargoyle();
    public lumi:Lumi = new Lumi();
    // Scenes/Monsters/
    public goblinScene:GoblinScene = new GoblinScene();
    public impScene:ImpScene = new ImpScene();
    public goblinAssassinScene:GoblinAssassinScene = new GoblinAssassinScene();
    // Scenes/NPC/
    public amilyScene:AmilyScene = new AmilyScene();
    public anemoneScene:AnemoneScene = new AnemoneScene();
    public arianScene:ArianScene = new ArianScene();
    public ceraphScene:CeraphScene = new CeraphScene();
    public ceraphFollowerScene:CeraphFollowerScene = new CeraphFollowerScene();
    public emberScene:EmberScene = new EmberScene();
    public exgartuan:Exgartuan = new Exgartuan();
    public helFollower:HelFollower = new HelFollower();
    public helScene:HelScene = new HelScene();
    public helSpawnScene:HelSpawnScene = new HelSpawnScene();
    public holliScene:HolliScene = new HolliScene();
    public isabellaScene:IsabellaScene = new IsabellaScene();
    public isabellaFollowerScene:IsabellaFollowerScene = new IsabellaFollowerScene();
    public izmaScene:IzmaScene = new IzmaScene();
    public jojoScene:JojoScene = new JojoScene();
    public kihaFollower:KihaFollower = new KihaFollower();
    public kihaScene:KihaScene = new KihaScene();
    public latexGirl:LatexGirl = new LatexGirl();
    public marbleScene:MarbleScene = new MarbleScene();
    public marblePurification:MarblePurification = new MarblePurification();
    public milkWaifu:MilkWaifu = new MilkWaifu();
    public raphael:Raphael = new Raphael();
    public rathazul:Rathazul = new Rathazul();
    public sheilaScene:SheilaScene = new SheilaScene();
    public shouldraFollower:ShouldraFollower = new ShouldraFollower();
    public shouldraScene:ShouldraScene = new ShouldraScene();
    public sophieBimbo:SophieBimbo = new SophieBimbo();
    public sophieFollowerScene:SophieFollowerScene = new SophieFollowerScene();
    public sophieScene:SophieScene = new SophieScene();
    public urta:Urta = new Urta();
    public urtaHeatRut:UrtaHeatRut = new UrtaHeatRut();
    public urtaPregs:UrtaPregs = new UrtaPregs();
    public valeria:Valeria = new Valeria();
    public vapula:Vapula = new Vapula();
    // Scenes/Places/
    public bazaar:Bazaar = new Bazaar();
    public boat:Boat = new Boat();
    public farm:Farm = new Farm();
    public owca:Owca = new Owca();
    public telAdre:TelAdre = new TelAdre();
    // Scenes/Quests/
    public urtaQuest:UrtaQuest = new UrtaQuest();


    public explored:boolean;
    public foundForest:boolean;
    public foundDesert:boolean;
    public foundMountain:boolean;
    public foundLake:boolean;
    public whitney:number;
    public monk:number;
    public sand:number;
    public giacomo: number;

    public update(hours: number) {
        camp.update(hours);
        exploration.update(hours);
        followerInteractions.update(hours);
        inventory.update(hours);
        masturbation.update(hours);
        // Scenes/Areas/
        bog.update(hours);
        desert.update(hours);
        forest.update(hours);
        highMountains.update(hours);
        lake.update(hours);
        mountain.update(hours);
        plains.update(hours);
        swamp.update(hours);
        // Scenes/Dungeons
        brigidScene.update(hours);
        d3.update(hours);
        // Scenes/Explore/
        gargoyle.update(hours);
        lumi.update(hours);
        // Scenes/Monsters/
        goblinScene.update(hours);
        impScene.update(hours);
        goblinAssassinScene.update(hours);
        // Scenes/NPC/
        amilyScene.update(hours);
        anemoneScene.update(hours);
        arianScene.update(hours);
        ceraphScene.update(hours);
        ceraphFollowerScene.update(hours);
        emberScene.update(hours);
        exgartuan.update(hours);
        helFollower.update(hours);
        helScene.update(hours);
        helSpawnScene.update(hours);
        holliScene.update(hours);
        isabellaScene.update(hours);
        isabellaFollowerScene.update(hours);
        izmaScene.update(hours);
        jojoScene.update(hours);
        kihaFollower.update(hours);
        kihaScene.update(hours);
        latexGirl.update(hours);
        marbleScene.update(hours);
        marblePurification.update(hours);
        milkWaifu.update(hours);
        raphael.update(hours);
        rathazul.update(hours);
        sheilaScene.update(hours);
        shouldraFollower.update(hours);
        shouldraScene.update(hours);
        sophieBimbo.update(hours);
        sophieFollowerScene.update(hours);
        sophieScene.update(hours);
        urta.update(hours);
        urtaHeatRut.update(hours);
        urtaPregs.update(hours);
        valeria.update(hours);
        vapula.update(hours);
        // Scenes/Places/
        bazaar.update(hours);
        boat.update(hours);
        farm.update(hours);
        owca.update(hours);
        telAdre.update(hours);
        // Scenes/Quests/
        urtaQuest.update(hours);
    }
}