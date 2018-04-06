import Menus from './Game/Menus/Menus';
import ItemFactory from './Game/Items/ItemFactory';
import PerkFactory from './Game/Effects/PerkFactory';
import StatusAffectFactory from './Game/Effects/StatusAffectFactory';
import CombatEffectFactory from './Game/Effects/CombatEffectFactory';

new ItemFactory();
new PerkFactory();
new StatusAffectFactory();
new CombatEffectFactory();


Menus.Main(undefined);
