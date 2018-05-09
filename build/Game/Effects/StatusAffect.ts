import { Effect } from './Effect';
import { EffectDescription } from './EffectDescription';
import { StatusAffectType } from './StatusAffectType';

export class StatusAffect extends Effect<StatusAffectType, EffectDescription> { }

export class StatusAffectDesc extends EffectDescription { }
