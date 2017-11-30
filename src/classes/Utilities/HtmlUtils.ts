export default class HtmlUtils {
    public static loadFromId(id: string): HTMLElement {
        let element: HTMLElement = document.getElementById(id);
        if (!element)
            throw new Error("Could not find " + id + " on page");
        return element;
    }

    public static loadFromClassName(classname: string, parentElement: HTMLElement): HTMLElement {
        let element: HTMLElement = null;
        if (parentElement.getElementsByClassName(classname).length != 0)
            element = <HTMLElement>parentElement.getElementsByClassName(classname)[0];
        else
            throw new Error(classname + " was not found on " + parentElement.title);
        return element;
    }
}