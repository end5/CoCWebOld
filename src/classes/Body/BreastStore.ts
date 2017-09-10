package classes
{
	import classes.internals.Utils;
	import classes.Appearance;
	import classes.CoC;
	import classes.SaveAwareInterface;
	
	public class BreastStore extends Utils implements SaveAwareInterface
	{
		private static const MAX_FLAG_VALUE: number				= 2999;
		private static const BREAST_STORE_VERSION_1:string	= "1";
		private static const LACTATION_BOOST:Array          = [0, 0, 2, 3, 6, 9, 17]; //Disabled, None, Light, Moderate, Strong, Heavy, Epic

		public static const LACTATION_DISABLED: number			= 0;
		public static const LACTATION_NONE: number				= 1; //Full == (>= 50), Overfull == (>= 60 + 5 * _lactationLevel), Overload == (>= 60 + 20 * _lactationLevel)
		public static const LACTATION_LIGHT: number				= 2; //Full after 25 hours, overfull after 35 hours, overloaded after 50 hours
		public static const LACTATION_MODERATE: number			= 3; //Full after 17 hours, overfull after 25 hours, overloaded after 40 hours
		public static const LACTATION_STRONG: number			= 4; //Full after  9 hours, overfull after 15 hours, overloaded after 30 hours
		public static const LACTATION_HEAVY: number				= 5; //Full after  6 hours, overfull after 12 hours, overloaded after 27 hours
		public static const LACTATION_EPIC: number				= 6; //Full after  3 hours, overfull after  9 hours, overloaded after 24 hours

		private let _breastFlag: number;
		private let _cupSize: number							= 0;
		private let _fullness: number							= 0; //How much milk the breasts currently hold - use milkQuantity to decide how much milk is produced in a scene
																	//The milkIsFull and milkIsOverflowing functions let you know how much the NPC wants to be milked
		private let _lactation: number							= 0; //How fast the breasts refill with milk
		private let _nippleLength:number					= 0;
		private let _timesMilked: number						= 0; //How many times has this NPC been milked - only used internally
		private let _rows: number								= 0; //Number of rows of breasts. All assumed to be the same size

		public let preventLactationIncrease: number				= 0; //Control the points at which the lactation stops increasing or decreasing
		public let preventLactationDecrease: number				= 0;

		public BreastStore(breastFlag: number) {
			_breastFlag = breastFlag;
			if (_breastFlag < 1 || _breastFlag > MAX_FLAG_VALUE) trace("Error: BreastStore created with invalid flag value. BreastStore(" + breastFlag + ")");
		}

		//Implementation of SaveAwareInterface
		public updateAfterLoad(game:CoC):void {
			if (_breastFlag < 1 || _breastFlag > MAX_FLAG_VALUE) return;
			let flagData:Array = String(game.flags[_breastFlag]).split("^");
			if (flagData.length < 9) {
				//Loading from a file that doesn't contain appropriate save data.
				//Values will either have to be assigned in Saves.unFuckSave() or by the first encounter with this NPC
				return;
			}
			//For now there's no need to check the version. If this class is ever updated to save more the version will become useful.
			rows						= int(flagData[1]);
			cupSize						= int(flagData[2]);
			lactationLevel				= int(flagData[3]);
			nippleLength				= Number(flagData[4]);
			_fullness					= int(flagData[5]);
			_timesMilked				= int(flagData[6]);
			preventLactationIncrease	= int(flagData[7]);
			preventLactationDecrease	= int(flagData[8]);
		}

		public updateBeforeSave(game:CoC):void {
			if (_breastFlag < 1 || _breastFlag > MAX_FLAG_VALUE) return;
			game.flags[_breastFlag] = BREAST_STORE_VERSION_1 + "^" + rows + "^" + cupSize + "^" + lactationLevel + "^" + nippleLength + "^" + _fullness + "^" + _timesMilked
				+ "^" + preventLactationIncrease + "^" + preventLactationDecrease;
		}
		//End of Interface Implementation

		public static function breastDescript(size: number, lactation:number = 0):string {
			if (size < 1) return "flat breasts";
			let descript:string = (rand(2) == 0 ? Appearance.breastSize(size) : ""); //Add a description of the breast size 50% of the time
			switch (rand(10)) {
				case 1:
					if (lactation > 2) return descript + "milk-udders";
					break;
				case 2:
					if (lactation > 1.5) descript += "milky ";
					if (size > 4) return descript + "tits";
					break;
				case 4:
				case 5:
				case 6:
					return descript + "tits";
				case 7:
					if (lactation >= 2.5) return descript + "udders";
					if (lactation >= 1) descript += "milk ";
					return descript + "jugs";
				case 8:
					if (size > 6) return descript + "love-pillows";
					return descript + "boobs";
				case 9:
					if (size > 6) return descript + "tits";
				default:
			}
			return descript + "breasts";
		}

		public get cupSize(): number { return _cupSize; }

		public set cupSize(value: number):void {
			if (value < CoC.BREAST_CUP.FLAT) value = CoC.BREAST_CUP.FLAT;
			if (value > CoC.BREAST_CUP.ZZZ_LARGE) value = CoC.BREAST_CUP.ZZZ_LARGE;
			_cupSize = value;
		}

		public get lactationLevel(): number { return _lactation; }

		public set lactationLevel(value: number):void {
			if (value < LACTATION_DISABLED) value = LACTATION_DISABLED;
			if (value > LACTATION_EPIC) value = LACTATION_EPIC;
			if (_lactation <= LACTATION_NONE && value >= LACTATION_LIGHT) { //Lactation is just starting - zero the other vars involved
				_fullness = 0;
				_timesMilked = 0;
			}
			_lactation = value;
		}

		public advanceTime():void {
			if (_lactation <= LACTATION_NONE) return;
			//Add to breastFullness and possibly adjust lactationLevel. Even when lactationLevel == LACTATION_NONE this is still doing something useful, adjusting _breastTimesMilked
			_fullness += LACTATION_BOOST[_lactation]; //Higher lactation means faster refill
			if (_fullness > 60 + 20 * LACTATION_BOOST[_lactation]) { //100 at LACTATION_LIGHT, 180 at LACTATION_EPIC - fullness over this value is overloaded, lactation may be reduced
				_fullness = 50; //This way fullness won't immediately hit the limit again
				if (_timesMilked >= 5) {
					_timesMilked -= 5; //If enough milkings have occured then don't reduce lactation level right away
				}
				else if (preventLactationDecrease != _lactation) {
					_lactation--;
				}
			}
		}

		public adj():string {
			switch (_cupSize) {
				case CoC.BREAST_CUP.FLAT:		return "non-existent";
				case CoC.BREAST_CUP.A:			return "small";
				case CoC.BREAST_CUP.B:
				case CoC.BREAST_CUP.C:			return "palmable";
				case CoC.BREAST_CUP.D:
				case CoC.BREAST_CUP.DD:
				case CoC.BREAST_CUP.DD_BIG:		return "sizeable";
				case CoC.BREAST_CUP.E:
				case CoC.BREAST_CUP.E_BIG:
				case CoC.BREAST_CUP.EE:
				case CoC.BREAST_CUP.EE_BIG:
				case CoC.BREAST_CUP.F:
				case CoC.BREAST_CUP.F_BIG:
				case CoC.BREAST_CUP.FF:
				case CoC.BREAST_CUP.FF_BIG:		return "huge";
				case CoC.BREAST_CUP.G:
				case CoC.BREAST_CUP.G_BIG:
				case CoC.BREAST_CUP.GG:
				case CoC.BREAST_CUP.GG_BIG:
				case CoC.BREAST_CUP.H:
				case CoC.BREAST_CUP.H_BIG:
				case CoC.BREAST_CUP.HH:
				case CoC.BREAST_CUP.HH_BIG:
				case CoC.BREAST_CUP.I:
				case CoC.BREAST_CUP.I_BIG:
				case CoC.BREAST_CUP.II:
				case CoC.BREAST_CUP.II_BIG:		return "gigantic";
				case CoC.BREAST_CUP.J:
				case CoC.BREAST_CUP.J_BIG:
				case CoC.BREAST_CUP.JJ:
				case CoC.BREAST_CUP.JJ_BIG:
				case CoC.BREAST_CUP.K:
				case CoC.BREAST_CUP.K_BIG:
				case CoC.BREAST_CUP.KK:
				case CoC.BREAST_CUP.KK_BIG:
				case CoC.BREAST_CUP.L:
				case CoC.BREAST_CUP.L_BIG:
				case CoC.BREAST_CUP.LL:
				case CoC.BREAST_CUP.LL_BIG:
				case CoC.BREAST_CUP.M:
				case CoC.BREAST_CUP.M_BIG:
				case CoC.BREAST_CUP.MM:
				case CoC.BREAST_CUP.MM_BIG:
				case CoC.BREAST_CUP.MMM:
				case CoC.BREAST_CUP.MMM_LARGE:	return "mammoth";
				default:
			}
			return("titanic");
		}

		public canTitFuck():boolean { return _cupSize >= CoC.BREAST_CUP.C; }

		public cup():string { return Appearance.breastCup(_cupSize); } //The cup size alone

		public description(useAdj:boolean = false, isMale:boolean = false):string {
			if (_cupSize == CoC.BREAST_CUP.FLAT) return "flat" + (isMale ? " manly," : "") + " chest";
			return (useAdj ? adj() + " " : "") + cup() + " breasts";
		}

		public breastDesc():string {
			return breastDescript(cupSize, 0.5 * lactationLevel);
		}

		public hasBreasts():boolean { return _cupSize != CoC.BREAST_CUP.FLAT; }

		public lactating():boolean { return _lactation >= LACTATION_LIGHT; }

		public milked():boolean { //Returns true if this milking increased the NPC's lactationLevel
			_fullness = 0;
			_timesMilked++;
			if (preventLactationIncrease == _lactation) return false;
			switch (_lactation) { //With enough milking the lactation level increases
				case LACTATION_NONE: //If you suckle enough times the NPC will eventually start producing milk if they're set to LACTATION_NONE
					if (_timesMilked < 12) return false;
					break;
				case LACTATION_LIGHT:
					if (_timesMilked < 10) return false;
					break;
				case LACTATION_MODERATE:
					if (_timesMilked < 12) return false;
					break;
				case LACTATION_HEAVY:
					if (_timesMilked < 15) return false;
					break;
				case LACTATION_STRONG:
					if (_timesMilked < 20) return false;
					break;
				default: //No amount of suckling will increase lactation levels for this NPC
					return false;
			}
			//Only reach this point if the NPC has been milked enough times to justify increasing their milk production
			_timesMilked = 5;
			lactationLevel++;
			return true;
		}

		public milkIsFull():boolean { return (_lactation <= LACTATION_NONE ? 0 : _fullness >= 50); }

		public milkIsOverflowing():boolean {
			return (_lactation <= LACTATION_NONE ? 0 : _fullness >= 60 + 5 * LACTATION_BOOST[_lactation]); //Probably pretty desperate to be milked by this point
		}

		//At fullness == 50 the maximum amount of milk is produced. When overfull, lactation level is reduced and fullness drops to 50.
		//So a higher lactationLevel means more milk is produced and the breasts can stay full without drying up for longer. Will always return 0 if not lactating
		public milkQuantity():number
		{
			if (_lactation <= LACTATION_NONE) return 0;
			return 0.01 * Math.max(100, 2 * _fullness) * Number(20 * _rows * _cupSize * (_lactation - 1));
		}

		public nippleDescript(tiny:string = "tiny", small:string = "prominent", large:string = "large", huge:string = "elongated", massive:string = "massive"):string
		{
			if (_nippleLength < 3) return tiny;
			if (_nippleLength < 10) return small;
			if (_nippleLength < 20) return large;
			if (_nippleLength < 32) return huge;
			return massive;
		}

		public get nippleLength():number { return _nippleLength; }

		public set nippleLength(value:number):void {
			if (value < 0) value = 0;
			_nippleLength = 0.1 * Math.round(10 * value); //Ensure nipple length only goes to one decimal place
		}

		public get rows(): number { return _rows; }

		public set rows(value: number):void {
			if (value < 1) value = 1;
			_rows = value;
		}
	}	
}