export function isBlank(str:string|undefined|null|false):boolean {
    if (!str)
        return true;
    str = str.trim();
    if (str)
        return str == "null" || str == "undefined";
    return true;
}

export function substringHTML(html:string, start:number, end:number|undefined = undefined):string {

    if (end === undefined || end > html.length)
        end = html.length;
    if (start > end)
        start = end;
    if (start >= html.length)
        return "";
    if (start < 0)
        start = 0;

    let str = "";
    let tags:string[] = [];

    let i=0, strlen=start;
    while(i < html.length && strlen < end) {
        if (html.startsWith('</', i)){
            str += '</' + tags.pop() + '>';
            i = html.indexOf('>', i) + 1;
            if (i === 0)
                break;
            continue;
        }
        
        if (html.startsWith('<', i)) {
            let index = html.indexOf('>', i);
            if (index === -1)
                break
            let tag = html.substring(i+1, index);
            if (tag.includes(" "))
                tags.push(tag.substring(0, tag.indexOf(' ')))
            else
                tags.push(tag);
            str += '<' + tag + '>';
            i = index + 1;
            continue;
        }

        let j = html.indexOf('<', i);
        if (j === -1) j = Infinity;
        j = Math.min(j, i + end - strlen);

        str += html.substring(i, j);
        strlen += (j-i);
        i = j;
    }
    
    return str + tags.reverse().map(tag => '</'+tag+'>').join('');
}