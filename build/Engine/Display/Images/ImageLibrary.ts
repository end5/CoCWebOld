import ImageName from './ImageName';
import Dictionary from '../../Utilities/Dictionary';
import { randomChoice } from '../../Utilities/SMath';

interface ImageLoadPromise {
    imageName: ImageName;
    index: number;
    fileExtension: string[];
}

const directory: string = "img/";
const extentions: string[] = [".jpg", ".png", ".jpeg"];
const lib: Dictionary<string[]> = new Dictionary<string[]>();
const promises = {};

export function getImage(name: ImageName): string {
    if (lib.get(name) !== undefined)
        return randomChoice(lib.get(name));
    else return "";
}

function loadImage(imageName: ImageName, index: number, fileExtension: string[]) {
        new Promise<ImageLoadPromise>((resolve, reject) => {
            const imagePath = constructPath(imageName, index, fileExtension[0]);
            const img = new Image();
            img.onload = () => resolve({ imageName, index, fileExtension });
            img.onerror = () => reject({ imageName, index, fileExtension });

            img.src = imagePath;
        }).then(
            (value) => {
                const imagePath = constructPath(value.imageName, value.index, value.fileExtension[0]);
                lib.get(value.imageName).push(imagePath);
                loadImage(value.imageName, ++value.index, value.fileExtension);
            },
            (reason: ImageLoadPromise) => {
                reason.fileExtension.shift();
                if (reason.fileExtension.length > 0)
                    loadImage(reason.imageName, 0, reason.fileExtension);
            }
        );
}

function constructPath(imageName: string, imageIndex: number, extention: string): string {
    return directory + imageName + "_" + imageIndex + extention;
}

export function loadImages() {
    lib.clear();
    return new Promise(() => {
        for (const imageName of Object.keys(ImageName))
            loadImage(ImageName[imageName], 0, extentions.copyWithin(0, 0));
    });
}
