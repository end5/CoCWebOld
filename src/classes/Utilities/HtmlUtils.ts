export default class HtmlUtils {
    public static loadFromId(id: string): HTMLElement {
        let element: HTMLElement = document.getElementById("levelupIcon");
        if (!element)
            throw new Error("Could not find " + id + " on page");
        return element;
    }

    public static loadFromClassName(classname: string, parentElement: HTMLElement): HTMLElement {
        let element: HTMLElement = null;
        if (parentElement.getElementsByClassName("statsBar").length != 0)
            element = <HTMLElement>parentElement.getElementsByClassName("statsBar")[0];
        else
            throw new Error(classname + " was not found on " + parentElement.title);
        return element;
    }

    public static hideElement(element: HTMLElement) {
        element.style.visibility = "hidden";
    }

    public static showElement(element: HTMLElement) {
        element.style.visibility = "visible";
    }
}