	export default class CoCButton {
		public static const
			// How far down from the top of our registration point the TF is.
			LABEL_FIELD_Y_OFFSET :Number = 9,
			LABEL_FIELD_HEIGHT :Number = 25;

		protected _labelField :TextField,
			_backgroundGraphic :MovieClip,
			_callback :Function;

		public toolTipText :String;

		public constructor( labelField :TextField = null, backgroundGraphic :MovieClip = null ) :void {
			if( backgroundGraphic ) {
				this.x = backgroundGraphic.x;
				this.y = backgroundGraphic.y;
			}

			this.labelField = labelField;
			this.backgroundGraphic = backgroundGraphic;

			this.mouseChildren = false;

			this.addEventListener( MouseEvent.ROLL_OVER, this.hover );
			this.addEventListener( MouseEvent.ROLL_OUT, this.dim );
			this.addEventListener( MouseEvent.CLICK, this.click );
		};



		//////// Mouse Events... ////////

		public  hover( event: MouseEvent = null ) :void {
			if( this.backgroundGraphic )
				this.backgroundGraphic.alpha = 0.5;
		};

		public  dim( event :MouseEvent = null ) :void {
			if( this.backgroundGraphic )
				this.backgroundGraphic.alpha = 1;
		};

		public  click( event :MouseEvent = null ) :void {
			if( this._callback )
				this._callback();
		};



		//////// Getters and Setters ////////

		public  get labelField() :TextField {
			return this._labelField;
		};

		public  set labelField( value :TextField ) :void {
			// TODO: Remove previous labelField?

			this._labelField = value;

			if( ! this._labelField ) return;

			this.addChild( this._labelField );

			this._labelField.mouseEnabled = false;

			this._labelField.x = 0;
			this._labelField.y = LABEL_FIELD_Y_OFFSET;
			this._labelField.width = this.width;
			this._labelField.height = LABEL_FIELD_HEIGHT;
		};

		public  get backgroundGraphic() :MovieClip {
			return this._backgroundGraphic;
		};

		public  set backgroundGraphic( value :MovieClip ) :void {
			// TODO: Remove previous background graphic?

			this._backgroundGraphic = value;

			if( ! this._backgroundGraphic ) return;

			this.addChildAt( this._backgroundGraphic, 0 );

			this._backgroundGraphic.mouseEnabled = true;

			this._backgroundGraphic.x = 0;
			this._backgroundGraphic.y = 0;

			this.width = this._backgroundGraphic.width;
		};

		public  get labelText() :String {
			return this.labelField.text;
		};

		public  set labelText( value :String ) :void {
			this.labelField.text = value;
		};

		public  get callback() :Function {
			return this._callback;
		};

		public  set callback( value :Function ) :void {
			this._callback = value;
		};

		//// Overrides. ////
		public  get width() :Number {
			return this.backgroundGraphic ? this.backgroundGraphic.width : 0;
		};

		public  set width( value :Number ) :void {
			if( this.backgroundGraphic )
				this.backgroundGraphic.width = value;

			if( this.labelField )
				this.labelField.width = value;
		};

		public  get height() :Number {
			return this.backgroundGraphic ? this.backgroundGraphic.height : 0;
		};

		public  set height( value :Number ) :void {
			if( this.backgroundGraphic )
				this.backgroundGraphic.height = value;
			// TODO: Do anything to the text field?
		};
	}
}