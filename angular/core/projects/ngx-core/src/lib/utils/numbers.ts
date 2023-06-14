export function formatNumber(value: number): string {
    if (value < 1E5)
        return "" + value;
    var suffixes = ["", "k", "m", "b", "t"];
    var index = Math.floor(("" + value).length / 3);
    return parseFloat((index != 0 ? (value / Math.pow(1000, index)) : value).toPrecision(2)).toFixed(1) + suffixes[index];
}
export function intdiv(dividend:number, divisor:number):number {
    if (divisor === 0)
        return 0;
    return Math.floor(dividend / divisor);
}

export function sortedIndex<T>(array:T[], value:T, callback: (a:T, b:T) => number):number {
	var low:number = 0,
		high:number = array.length;

	while (low < high) {
		var mid = low + high >>> 1;
		if (callback(array[mid], value) < 0) low = mid + 1;
		else high = mid;
	}
	return low;
}