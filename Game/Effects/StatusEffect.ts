import { Effect } from './Effect';
import { EffectDescription } from './EffectDescription';
import { StatusEffectType } from './StatusEffectType';

export class StatusEffect extends Effect<StatusEffectType, EffectDescription> { }

export class StatusEffectDesc extends EffectDescription { }
