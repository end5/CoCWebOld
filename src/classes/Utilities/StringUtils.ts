export default class StringUtils {
    public static capFirstLetter(string: string): string {
        if (string.length == 0) return "";
		return string.charAt(0).toUpperCase() + string.substr(1);
    }
}