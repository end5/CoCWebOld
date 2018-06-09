/**
 * Defines a composite display object of all the seperate components required to display a 
 * single BoundControlMethod, its associated primary and secondary bindings with the buttons
 * used to bind methods to new keys.
 * @author Gedan
 */
export class BindDisplay {
    // Object components and settings
    private _maxWidth: number;
    private _nameLabel: TextField;
    private _buttons: Array;
    private _buttonBgs: Array;

    // Shared formatting information
    // TODO: this should probably be statically initialized. Global static formatting class?
    private _textFormatLabel: TextFormat;
    private _textFormatButton: TextFormat;
    private _textFont: Font;

    // Storage attributes for the button text, so we can wrap it seperately in HTML tags
    // and store the raw value here, for return on demand.
    private _button1Text: string;
    private _button2Text: string;

    // Values for the contained button sizing/offsets
    private static BUTTON_X_OFFSET: number = 200;
    private static BUTTON_Y_OFFSET: number = 668;
    private static BUTTON_X_DELTA: number = 160;
    public static BUTTON_Y_DELTA: number = 52;
    private static BUTTON_REAL_WIDTH: number = 150;
    private static BUTTON_REAL_HEIGHT: number = 40;

    /**
     * Create a new composite object, initilizing the label to be used for display, as well as the two
     * buttons used for user interface.
     * 
     * @param	maxWidth	Defines the maximum available width that the control can consume for positining math
     */
    public BindDisplay(maxWidth: number) {
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
    private InitFormatting(): void {
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
    private InitButtons(): void {
        _buttons = new Array();
        _buttonBgs = new Array();

        var b: MovieClip;
        var button: CoCButton;
        var tf: TextField;

        var xPos: number;
        xPos = (_maxWidth - 15) - (2 * BUTTON_X_DELTA);

        for (var i: number = 0; i < 2; i++) {
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
    private InitLabel(): void {
        _nameLabel = new TextField();
        _nameLabel.defaultTextFormat = _textFormatLabel;
        _nameLabel.embedFonts = true;
        _nameLabel.antiAliasType = AntiAliasType.ADVANCED;
        _nameLabel.text = "THIS IS SOME KINDA CRAZY LABEL";
        _nameLabel.width = _maxWidth - (2 * BUTTON_X_DELTA) - 20;
        _nameLabel.y = _buttons[0].labelField.y;
        this.addChild(_nameLabel);
    }

    public get text(): string {
        return _nameLabel.text;
    }

    public set text(value: string): void {
        _nameLabel.text = value;
    }

    public get htmlText(): string {
        return _nameLabel.htmlText;
    }

    public set htmlText(value: string): void {
        _nameLabel.htmlText = value;
    }

    public get button1Text(): string {
        return _button1Text;
    }

    public get button2Text(): string {
        return _button2Text;
    }

    public set button1Text(value: string): void {
        if (value != _button1Text) {
            _button1Text = value;
            _buttons[0].labelField.htmlText = "<b>" + _button1Text + "</b>";
        }
    }

    public set button2Text(value: string): void {
        if (value != _button2Text) {
            _button2Text = value;
            _buttons[1].labelField.htmlText = "<b>" + _button2Text + "</b>";
        }
    }

    public set button1Callback(callback: Function): void {
        _buttons[0].callback = callback;
    }

    public set button2Callback(callback: Function): void {
        _buttons[1].callback = callback;
    }
}

}