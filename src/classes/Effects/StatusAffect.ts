import Effect from './Effect';
import EffectDescription from './EffectDescription';
import { StatusAffectType } from './StatusAffectType';

export default class StatusAffect extends Effect<StatusAffectType, EffectDescription> { }

export class StatusAffectDesc extends EffectDescription { }
