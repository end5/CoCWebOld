import { readFile, writeFile, readdir, PathLike, stat, Stats, rename, writeFileSync, readFileSync } from 'fs';

function walk(dir: PathLike, modify: (file: string) => void, done: (err: NodeJS.ErrnoException, res?: string[]) => void) {
    let results: string[] = [];
    readdir(dir, (err, list) => {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(undefined, results);
            file = dir + '/' + file;
            stat(file, (err, stats) => {
                if (stats && stats.isDirectory()) {
                    walk(file, modify, (err, res) => {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    modify(file);
                    next();
                }
            });
        })();
    });
}

// walk('./Game/Scenes', fixFile, (err, res) => console.log(res));
// walk('test.as', fix, (err, res) => console.log(res));
fix('test.as');

function fix(file: string) {
    const data = readFileSync(file, 'utf-8');

    const newValue = fixText(data);

    writeFileSync(file.replace('.as', '.ts'), newValue, 'utf-8');
}

function fixText(text: string): string {
    const lines = text.split('\n');

    let packageStr = false;
    let className: string;
    const flags: Set<string> = new Set();

    let index = 0;
    while (index < lines.length) {
        if (lines[index].trimLeft().startsWith('package')) {
            lines.splice(index, 1);
            if (!lines[index].includes('{'))
                packageStr = true;
            continue;
        }

        if (packageStr && lines[index].trimLeft().startsWith('{')) {
            lines.splice(index, 1);
            packageStr = false;
            continue;
        }

        if (lines[index].trimLeft().startsWith('import')) {
            lines.splice(index, 1);
            continue;
        }

        if (lines[index].trimLeft().startsWith('public class')) {
            className = lines[index].match(/public class ([\w\d_]+)/)[1];
            if (className.endsWith('Scene'))
                className = className.substr(0, className.length - 5);
        }

        if (lines[index].trimLeft().startsWith('override ')) lines[index] = lines[index].replace('override ', '');

        if (lines[index].trimLeft().startsWith('public function ' + className)) lines[index] = lines[index].replace('public function ' + className, 'public constructor');

        if (lines[index].trimLeft().startsWith('public function')) lines[index] = lines[index].replace('public function', 'export function');

        if (lines[index].trimLeft().startsWith('private function')) lines[index] = lines[index].replace('private function', 'function');

        lines[index] = lines[index].replace(':Boolean', ': boolean');
        lines[index] = lines[index].replace(': Boolean', ': boolean');

        lines[index] = lines[index].replace(':Number', ': number');
        lines[index] = lines[index].replace(': Number', ': number');

        lines[index] = lines[index].replace(':int', ': number');
        lines[index] = lines[index].replace(': int', ': number');

        lines[index] = lines[index].replace(':String', ': string');
        lines[index] = lines[index].replace(': String', ': string');

        lines[index] = lines[index].replace('outputText(', 'DisplayText(');

        lines[index] = lines[index].replace(/DisplayText\(([^\n]+), false\)/, (match, p1) => 'DisplayText(' + p1 + ')');

        if (/DisplayText\([^\n]+, true\)/.test(lines[index])) {
            lines[index] = lines[index].replace(/DisplayText\(([^\n]+), true\)/, (match, p1) => 'DisplayText(' + p1 + ')');
            lines.splice(index, 0, 'DisplayText().clear();');
            index++;
        }

        if (lines[index].trimLeft().startsWith('DisplayText("")')) {
            lines.splice(index, 1);
            continue;
        }

        if (lines[index].trimLeft().startsWith('DisplayText(images')) {
            lines[index] = lines[index].replace(/DisplayText\(images\.showImage\(\"([^\"]+)\"\)\)/g, (match, p1) => 'DisplayImage("' + p1 + '")');
        }

        if (/flags\[kFLAGS\.([^\]]+)\]/.test(lines[index])) {
            lines[index] = lines[index].replace(/flags\[kFLAGS\.([^\]]+)\]/g, (match, p1) => {
                flags.add(p1);
                return className + 'Flags.' + p1;
            });

        }

        if (lines[index].trimLeft().startsWith('spriteSelect')) {
            lines.splice(index, 1, 'DisplaySprite(SpriteName.' + className + ');');
        }

        if (lines[index].trimLeft().startsWith('clearOutput')) {
            lines.splice(index, 1);
            continue;
        }

        lines[index] = lines[index].replace('player.str', 'player.stats.str');
        lines[index] = lines[index].replace('player.tou', 'player.stats.tou');
        lines[index] = lines[index].replace('player.spe', 'player.stats.spe');
        lines[index] = lines[index].replace('player.inte', 'player.stats.int');
        lines[index] = lines[index].replace('player.lib', 'player.stats.lib');
        lines[index] = lines[index].replace('player.sens', 'player.stats.sens');
        lines[index] = lines[index].replace('player.cor', 'player.stats.cor');
        lines[index] = lines[index].replace('player.fatigue', 'player.stats.fatigue');
        lines[index] = lines[index].replace('player.HP', 'player.stats.HP');
        lines[index] = lines[index].replace('player.bonusHP', 'player.stats.bonusHP');
        lines[index] = lines[index].replace('player.lus', 'player.stats.lust');
        lines[index] = lines[index].replace('player.lustVuln', 'player.stats.lustVuln');
        lines[index] = lines[index].replace('player.minLust', 'player.stats.minLust');
        lines[index] = lines[index].replace('player.XP', 'player.stats.XP');
        lines[index] = lines[index].replace('player.level', 'player.stats.level');
        lines[index] = lines[index].replace('player.additionalXP', 'player.stats.additionalXP');
        lines[index] = lines[index].replace('player.perkPoints', 'player.stats.perkPoints');
        lines[index] = lines[index].replace('player.teaseXP', 'player.stats.teaseXP');
        lines[index] = lines[index].replace('player.teaseLevel', 'player.stats.teaseLevel');

        index++;
    }

    if (flags.size > 0) {
        lines.unshift('}');
        for (const flag of flags.values()) {
            lines.unshift(flag + ': 0,');
        }
        lines.unshift('export const ' + className + 'Flags = {');
    }

    return lines.join('\n');
}
