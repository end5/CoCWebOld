export default class MainScreen {

    public static text(text: string, purgeText: boolean = false, parseAsMarkdown: boolean = false) {
        // we have to purge the output text BEFORE calling parseText, because if there are scene commands in 
        // the parsed text, parseText() will write directly to the output


        // This is cleaup in case someone hits the Data or new-game button when the event-test window is shown. 
        // It's needed since those buttons are available even when in the event-tester
        mainView.hideTestInputPanel();

        if (purgeText) {
            clearOutput();
        }

        output = this.parser.recursiveParser(output, parseAsMarkdown);

        //OUTPUT!
        if (purgeText) {
            //if(!debug) mainText.htmlText = output;
            currentText = output;
        }
        else {
            currentText += output;
            //if(!debug) mainText.htmlText = currentText;
        }
        if (debug) {
            mainView.setOutputText(currentText);
        }


    }

    public static clearButton(number: number) {

    }

    public static clearButtons() {

    }

    public static addButton(buttonNumber: number, text: string, func: Function, disabled: boolean = false, arg0: any = null, arg1: any = null, arg2: any = null) {
        if (func1 == null) return;
        var callback: Function;
        var toolTipText: String;
        callback = createCallBackFunction(func1, arg1);


        toolTipText = getButtonToolTipText(text);
        mainView.showBottomButton(pos, text, callback, toolTipText);
        //mainView.setOutputText( currentText );
        flushOutputTextToGUI();

    }

    public static displayChoices(text: string[], func: Function[]) {

        for (let index = 0; index < text.length; index++) {
            MainScreen.addButton(index, text[index], func[index]);
        }
    }
}