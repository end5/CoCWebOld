export default class ButtModifier {

    public buttChange(cArea: number, display: boolean, spacingsF: boolean = true, spacingsB: boolean = true): boolean {
        let stretched: boolean = buttChangeNoDisplay(cArea);
        //STRETCH SUCCESSFUL - begin flavor text if outputting it!
        if (stretched && display) {
            if (spacingsF) Render.text("  ");
            buttChangeDisplay();
            if (spacingsB) Render.text("  ");
        }
        return stretched;
    }


}