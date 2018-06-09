/**
 * ...
 * @author Yoffy
 */
export class Image {
    private _id: string;
    private _url: string
    private _width: number;
    private _height: number;

    public Image(id: string, url: string, w: number, h: number) {
        this._id = id;
        this._url = url;
        this._width = w;
        this._height = h;
    }

    public get id(): string {
        return this._id;
    }

    public get url(): string {
        return this._url;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

}
