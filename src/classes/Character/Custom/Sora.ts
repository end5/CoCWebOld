import { EarType } from '../../Body/Ears';
import Tail, { TailType } from '../../Body/Tail';
import { TongueType } from '../../Body/Tongue';
import DisplayText from '../../display/DisplayText';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';

export default function customSora(player: Player): void {
    // Character Creation	Female,virgin	A kitsune with a snake-like tongue	Sora
    if (player.torso.vaginas.count > 0) player.torso.vaginas.get(0).virgin = true;
    player.torso.neck.head.face.tongue.type = TongueType.SNAKE;
    player.torso.neck.head.ears.type = EarType.FOX;
    player.torso.tails.add(new Tail(TailType.FOX));
    player.torso.tails.get(0).vemon = 2;
    player.stats.int = 30;
    if (!player.statusAffects.has(StatusAffectType.BonusVCapacity))
        player.statusAffects.set(StatusAffectType.BonusVCapacity, StatusAffectFactory.create(StatusAffectType.BonusVCapacity, 0, 0, 0, 0));
    else player.statusAffects.get(StatusAffectType.BonusVCapacity).value1 += 5 + Utils.rand(10);
    DisplayText("As a Kitsune, you always got weird looks, but none could doubt your affinity for magic...");
}
