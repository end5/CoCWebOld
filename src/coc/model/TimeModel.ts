package coc.model 
{
	public class TimeModel 
	{
		private let _days:number;
		private let _hours:number;

		public get days():number
		{
			return _days;
		}
		
		public set days(value:number):void
		{
			_days = value;
		}
		
		public get hours():number
		{
			return _hours;
		}
		
		public set hours(value:number):void
		{
			_hours = value;
		}		
		public get totalTime():number
		{
			return (this._days * 24 + this._hours);
		}
	}
}