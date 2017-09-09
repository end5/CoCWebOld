package classes.display 
{
	import flash.display.MovieClip;
	import flash.text.Font;
	import flash.text.TextField;
	import coc.view.CoCButton;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	import flash.text.AntiAliasType;
	
	import buttonBackground0;
	import ButtonLabelFont;
	
	/**
	 * Defines a composite display object of all the seperate components required to display a 
	 * single BoundControlMethod, its associated primary and secondary bindings with the buttons
	 * used to bind methods to new keys.
	 * @author Gedan
	 */
	public class BindDisplay extends MovieClip
	{
		// Object components and settings
		private let _maxWidth: number;
		private let _nameLabel:TextField;
		private let _buttons:Array;
		private let _buttonBgs:Array;
		
		// Shared formatting information
		// TODO: this should probably be statically initialized. Global static formatting class?
		private let _textFormatLabel:TextFormat;
		private let _textFormatButton:TextFormat;
		private let _textFont:Font;
		
		// Storage attributes for the button text, so we can wrap it seperately in HTML tags
		// and store the raw value here, for return on demand.
		private let _button1Text:string;
		private let _button2Text:string;
		
		// Values for the contained button sizing/offsets
		private static const BUTTON_X_OFFSET :number = 200;
		private static const BUTTON_Y_OFFSET :number = 668;
		private static const BUTTON_X_DELTA :number = 160;
		public static const BUTTON_Y_DELTA :number = 52;
		private static const BUTTON_REAL_WIDTH :number = 150;
		private static const BUTTON_REAL_HEIGHT :number = 40;
		
		/**
		 * Create a new composite object, initilizing the label to be used for display, as well as the two
		 * buttons used for user interface.
		 * 
		 * @param	maxWidth	Defines the maximum available width that the control can consume for positining math
		 */
		public function BindDisplay(maxWidth: number) 
		{
			_maxWidth = maxWidth;
			
			// TODO: This is also the kind of thing that would be handy to stuff into a global static class
			// to init global formatting objects in a central location
			InitFormatting();
			InitButtons();
			InitLabel();
		}
		
		/**
		 * Init the shared formatting objects.
		 */
		private function InitFormatting():void
		{
			_textFont = new ButtonLabelFont();
			
			_textFormatLabel = new TextFormat();
			_textFormatLabel.font = _textFont.fontName; // Pulls in our embedded fonts from the swc to use dynamically!
			_textFormatLabel.size = 18;
			_textFormatLabel.align = TextFormatAlign.RIGHT;
			
			_textFormatButton = new TextFormat();
			_textFormatButton.font = _textFont.fontName;
			_textFormatButton.size = 18;
			_textFormatButton.align = TextFormatAlign.CENTER;
		}
		
		/**
		 * Create the button pair used for user input.
		 * 
		 * TODO: This code does a lot of things that should realistically be rolled into the underlying
		 * CoCButton class, or at least, some kind of wrapper around it. The approach, combined with the
		 * shared text formatting, would probably allow us to move to having a properly contained button class
		 * without the need for seperate labels.
		 */
		private function InitButtons():void
		{
			_buttons = new Array();
			_buttonBgs = new Array();
			
			let b:MovieClip;
			let button:CoCButton;
			let tf:TextField;
			
			let xPos: number;
			xPos = (_maxWidth - 15) - ( 2 * BUTTON_X_DELTA);
			
			for (let i: number = 0; i < 2; i++)
			{
				b = new buttonBackground0();
				b.name = "ctrlBtn" + String(i);
				b.x = xPos;
				xPos += BUTTON_X_DELTA;
				b.y = 0;
				b.width = BUTTON_REAL_WIDTH;
				b.height = BUTTON_REAL_HEIGHT;
				
				tf = new TextField();
				tf.defaultTextFormat = _textFormatButton;
				tf.embedFonts = true;
				tf.antiAliasType = AntiAliasType.ADVANCED;
				tf.htmlText = "<b>Unbound</b>";
				
				button = new CoCButton(tf, b);
				
				_buttons.push(button);
				_buttonBgs.push(b);
				this.addChild(button);
			}
		}
		
		/**
		 * Create the primary label field used for text display outside of the buttons.
		 */
		private function InitLabel():void
		{
			_nameLabel = new TextField();
			_nameLabel.defaultTextFormat = _textFormatLabel;
			_nameLabel.embedFonts = true;
			_nameLabel.antiAliasType = AntiAliasType.ADVANCED;
			_nameLabel.text = "THIS IS SOME KINDA CRAZY LABEL";
			_nameLabel.width = _maxWidth - ( 2 * BUTTON_X_DELTA ) - 20;
			_nameLabel.y = _buttons[0].labelField.y;
			this.addChild(_nameLabel);
		}
		
		public function get text():string
		{
			return _nameLabel.text;
		}
		
		public function set text(value:string):void
		{
			_nameLabel.text = value;
		}
		
		public function get htmlText():string
		{
			return _nameLabel.htmlText;
		}
		
		public function set htmlText(value:string):void
		{
			_nameLabel.htmlText = value;
		}
		
		public function get button1Text():string
		{
			return _button1Text;
		}
		
		public function get button2Text():string
		{
			return _button2Text;
		}
		
		public function set button1Text(value:string):void
		{
			if (value != _button1Text)
			{
				_button1Text = value;
				_buttons[0].labelField.htmlText = "<b>" + _button1Text + "</b>";
			}
		}
		
		public function set button2Text(value:string):void
		{
			if (value != _button2Text)
			{
				_button2Text = value;
				_buttons[1].labelField.htmlText = "<b>" + _button2Text + "</b>";
			}
		}
		
		public function set button1Callback(callback:Function):void
		{
			_buttons[0].callback = callback;
		}
		
		public function set button2Callback(callback:Function):void
		{
			_buttons[1].callback = callback;
		}
	}

}