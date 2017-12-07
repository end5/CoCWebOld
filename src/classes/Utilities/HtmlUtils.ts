export default class HtmlUtils {
    public static loadFromId<K extends keyof HTMLElementTagNameMap>(id: string): HTMLElementTagNameMap[K] {
        let element: HTMLElement = document.getElementById(id);
        if (!element)
            throw new Error("Could not find " + id + " on page");
        return <HTMLElementTagNameMap[K]>element;
    }

    public static loadFromClassName<K extends keyof HTMLElementTagNameMap>(classname: string, parentElement: HTMLElement): HTMLElementTagNameMap[K] {
        let element: HTMLElement = null;
        if (parentElement.getElementsByClassName(classname).length != 0)
            element = <HTMLElement>parentElement.getElementsByClassName(classname)[0];
        else
            throw new Error(classname + " was not found on " + parentElement.title);
        return <HTMLElementTagNameMap[K]>element;
    }
}