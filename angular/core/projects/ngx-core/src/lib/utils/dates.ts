import { intdiv } from "./numbers";

const MONTHS = ['\\J\\a\\n\\v\\i\\e\\r', '\\F\\é\\v\\r\\i\\e\\r', '\\M\\a\\r\\s', '\\A\\v\\r\\i\\l', '\\M\\a\\i', '\\J\\u\\i\\n', '\\J\\u\\i\\l\\l\\e\\t', '\\A\\o\\û\\t', '\\S\\e\\p\\t\\e\\m\\b\\r\\e', '\\O\\c\\t\\o\\b\\r\\e', '\\N\\o\\v\\e\\m\\b\\r\\e', '\\D\\é\\c\\e\\m\\b\\r\\e'];
const MONTHS_SHORT = ['\\J\\a\\n', '\\F\\é\\v', '\\M\\a\\r\\s', '\\A\\v\\r', '\\M\\a\\i', '\\J\\u\\i\\n', '\\J\\u\\i\\l', '\\A\\o\\û\\t', '\\S\\e\\p\\t', '\\O\\c\\t', '\\N\\o\\v', '\\D\\é\\c'];
const DAYS = ['\\D\\i\\m\\a\\n\\c\\h\\e', '\\L\\u\\n\\d\\i', '\\M\\a\\r\\d\\i', '\\M\\e\\r\\c\\r\\e\\d\\i', '\\J\\e\\u\\d\\i', '\\V\\e\\n\\d\\r\\e\\d\\i', '\\S\\a\\m\\e\\d\\i'];
const DAYS_SHORT = ['\\D\\i\\m', '\\L\\u\\n', '\\M\\a\\r', '\\M\\e\\r', '\\J\\e\\u', '\\V\\e\\n', '\\S\\a\\m'];
const DAYS_EXTRA_SHORT = ['\\D\\i', '\\L\\u', '\\M\\a', '\\M\\e', '\\J\\e', '\\V\\e', '\\S\\a'];

export function zeros(digit: number, span:number=2, signed:boolean=false) {
    let negative = digit < 0;
    let str = Math.abs(digit) + '';
    while (str.length < span)
        str = '0' + str;
    if (negative)
        str = '-' + str;
    if (!negative && signed)
        str = '+' + str;
    return str;
}
export function ordinal(digit: number, female: boolean = false) {
    return digit + (digit === 1 ? (female ? '\\è\\r\\e' : '\\e\\r') : '\\è\\m\\e');
}

export function fromNow(iso_8601_date: string): string {
    let date = new Date(iso_8601_date);
    let now = new Date();
    const past = now.getTime() > date.getTime();
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const diff = past ? now.getTime() - date.getTime() : date.getTime() - now.getTime();
    if (diff < minute)
        return past ? "Il y a quelques secondes" : "dans quelques secondes";
    if (diff < hour) {
        let minutes = intdiv(diff, minute);
        return (past ? "Il y a " : "dans ") + (minutes > 1 ? minutes + ' minutes' : 'une minute');
    }
    if (diff < day) {
        let hours = intdiv(diff, hour);
        return (past ? "Il y a " : "dans ") + (hours > 1 ? hours + ' heures' : 'une heure');
    }
    const time = " à " + zeros(date.getHours()) + ":" + zeros(date.getMinutes());
    if (date.getFullYear() === now.getFullYear()) {
        if (date.getMonth() === now.getMonth() && date.getDate() + (past ? 1 : -1) === now.getDate())
            return (past ? "hier" : "demain") + time
        if (past && diff < day * 6)
            return DAYS[date.getDay()].replace(/\\/g, '') + time

        return date.getDate() + " " + MONTHS[date.getMonth()].replace(/\\/g, '') + time
    }
    return date.getDate() + " " + MONTHS[date.getMonth()].replace(/\\/g, '') + " " + date.getFullYear() + time
}

export function format(strDate: string, format: string): string {
    let date = new Date(strDate);
    return format
        // Month
        .replace(/(?<!\\)MMMM/g, MONTHS[date.getMonth()])
        .replace(/(?<!\\)MMM/g, MONTHS_SHORT[date.getMonth()])
        .replace(/(?<!\\)MM/g, zeros(date.getMonth() + 1))
        .replace(/(?<!\\)Mo/g, ordinal(date.getMonth() + 1))
        .replace(/(?<!\\)M/g, (date.getMonth() + 1) + '')

        // Day of Month
        .replace(/(?<!\\)DD/g, zeros(date.getDate()))
        .replace(/(?<!\\)Do/g, ordinal(date.getDate()))
        .replace(/(?<!\\)D/g, date.getDate() + '')

        // Day of Week
        .replace(/(?<!\\)dddd/g, DAYS[date.getDay()])
        .replace(/(?<!\\)ddd/g, DAYS_SHORT[date.getDay()])
        .replace(/(?<!\\)dd/g, DAYS_EXTRA_SHORT[date.getDay()])
        .replace(/(?<!\\)do/g, ordinal(date.getDay()))
        .replace(/(?<!\\)d/g, date.getDay() + '')

        // Year
        .replace(/(?<!\\)YYYY/g, date.getFullYear() + '')
        .replace(/(?<!\\)YY/g, (date.getFullYear() % 100) + '')

        // AM/PM
        .replace(/(?<!\\)A/g, date.getHours() > 11 ? '\\P\\M' : '\\A\\M')
        .replace(/(?<!\\)a/g, date.getHours() > 11 ? '\\p\\m' : '\\a\\m')

        // Hours
        .replace(/(?<!\\)HH/g, zeros(date.getHours()))
        .replace(/(?<!\\)H/g, date.getHours() + '')
        .replace(/(?<!\\)hh/g, zeros(date.getHours() % 12))
        .replace(/(?<!\\)h/g, (date.getHours() % 12) + '')
        .replace(/(?<!\\)kk/g, zeros(date.getHours() + 1))
        .replace(/(?<!\\)k/g, (date.getHours() + 1) + '')

        // Minutes
        .replace(/(?<!\\)mm/g, zeros(date.getMinutes()))
        .replace(/(?<!\\)m/g, date.getMinutes() + '')

        // Seconds
        .replace(/(?<!\\)ss/g, zeros(date.getSeconds()))
        .replace(/(?<!\\)s/g, date.getSeconds() + '')

        // Milliseconds
        .replace(/(?<!\\)SSS/g, zeros(date.getMilliseconds(), 3))
        .replace(/(?<!\\)SS/g, zeros(intdiv(date.getMilliseconds(), 10)))
        .replace(/(?<!\\)S/g, intdiv(date.getSeconds(),100) + '')

        // Timezone
        .replace(/(?<!\\)ZZ/g, zeros(intdiv(date.getTimezoneOffset(),60), 2, true) + Math.abs(date.getTimezoneOffset() % 60))
        .replace(/(?<!\\)Z/g, zeros(intdiv(date.getTimezoneOffset(),60), 2, true) + ':' + Math.abs(date.getTimezoneOffset() % 60))

        // Unix Timestamp
        .replace(/(?<!\\)X/g, intdiv(date.getTime(),1000) + '')
        .replace(/(?<!\\)x/g, date.getTime() + '')

        .replace(/\\/g, '');
}