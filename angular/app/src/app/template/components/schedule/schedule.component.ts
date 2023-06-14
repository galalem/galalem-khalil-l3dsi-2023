import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateUtils, NumberUtils } from 'ngx-core';

export type ScheduleCell = {
    subject: string,
    target: string,
    place: string,
    start: number,
    end: number,
    fortnight?: 'A' | 'B',
    color?: string;
}

export const data: ScheduleCell[] = [
    {
        "subject": "Anglais",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 480,
        "end": 540
    },
    {
        "subject": "Arabe",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 540,
        "end": 600
    },
    {
        "subject": "Français",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 600,
        "end": 720
    },
    {
        "subject": "Histoire",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 960,
        "end": 1020
    },
    {
        "subject": "Edu. Civile",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 1020,
        "end": 1080
    },
    {
        "subject": "Edu. Islamique",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 1920,
        "end": 1980,
        "fortnight": "B"
    },
    {
        "subject": "Chimie",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 1980,
        "end": 2040
    },
    {
        "subject": "Arabe",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 2040,
        "end": 2160,
        color: "#281074"
    },
    {
        "subject": "Sciences TP",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 2280,
        "end": 2400,
        "fortnight": "A",
        "color": "#FFA28F"
    },
    {
        "subject": "Technologies",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 2400,
        "end": 2520,
        "color": "#FA6801"
    },
    {
        "subject": "Sciences",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 3360,
        "end": 3420,
        "fortnight": "B"
    },
    {
        "subject": "Anglais",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 3420,
        "end": 3480
    },
    {
        "subject": "Edu. Civile",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 3480,
        "end": 3540,
        "fortnight": "A"
    },
    {
        "subject": "Algèbre",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 3540,
        "end": 3600
    },
    {
        "subject": "Physiques",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 3720,
        "end": 3780
    },
    {
        "subject": "Informatiques",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 3780,
        "end": 3840
    },
    {
        "subject": "Géographie",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 4800,
        "end": 4860
    },
    {
        "subject": "Physiques",
        "target": "M. Foulen Ben Y.",
        "place": "Sn2",
        "start": 4860,
        "end": 4920
    },
    {
        "subject": "Géométrie",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 4920,
        "end": 5040
    },
    {
        "subject": "Edu. Islamique",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 5220,
        "end": 5280,
        "color": "#FF0000"
    },
    {
        "subject": "Français",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 5280,
        "end": 5340
    },
    {
        "subject": "Histoire",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 6240,
        "end": 6300,
        "fortnight": "A",
        "color": "#0000FF"
    },
    {
        "subject": "Géographie",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 6240,
        "end": 6300,
        "fortnight": "B",
        "color": "#00FF00"
    },
    {
        "subject": "Anglais",
        "target": "M. Foulen Ben Y.",
        "place": "Sn2",
        "start": 6300,
        "end": 6360
    },
    {
        "subject": "Arabe",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 6360,
        "end": 6480
    },
    {
        "subject": "Français",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 7680,
        "end": 7740,
    },
    {
        "subject": "Algèbre",
        "target": "M. Foulen Ben Y.",
        "place": "salle 4",
        "start": 7740,
        "end": 7800
    },
    {
        "subject": "Sport",
        "target": "M. Foulen Ben Y.",
        "place": "Salle Couverte",
        "start": 7800,
        "end": 7920
    }
];

@Component({
    standalone: true,
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css'],
    imports: [CommonModule]
})
export class ScheduleComponent {

    private $data: ScheduleCell[] = [];
    public cells: any[][] = [];

    constructor() {
        this.data = data
    }

    @Input()
    set data(v: ScheduleCell[]) {
        this.$data = v;
        this.cells = this.days.map((e, i) => {
            return this.$data.filter(cell => NumberUtils.intdiv(cell.start, 1440) == i).map(cell => {
                let start = cell.start % 1440;
                let end = cell.end % 1440;
                let color = cell.color || "#FFFFFF";
                return {
                    ...cell,
                    start: start,
                    end: end,
                    span: (end - start) / this.intervals,
                    left: (start - this.start) / this.intervals,
                    background: color,
                    color: decodeTextColor(color)
                }
            })
        });
    }

    @Input()
    public set start(value: number) {
        this.$start = value;
        this.data = this.$data;
    }
    public get start(): number { return this.$start }
    private $start: number = 480; // 08:00
    @Input()
    public set end(value: number) {
        this.$end = value;
        this.data = this.$data;
    }
    public get end(): number { return this.$end }
    private $end: number = 1080; // 18:00
    @Input()
    public set intervals(value: number) {
        this.$intervals = value;
        this.data = this.$data;
    }
    public get intervals(): number { return this.$intervals }
    private $intervals: number = 60; // one hour
    @Input()
    public set days(value: string[]) {
        this.$days = value;
        this.data = this.$data;
    }
    public get days(): string[] { return this.$days }
    private $days: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    get timeHeaders() {
        return Array(NumberUtils.intdiv(this.end - this.start, this.intervals)).fill(0).map((item, index) => {
            let start = this.start + (index * this.intervals);
            let end = start + this.intervals;
            return decodeTime(start) + " - " + decodeTime(end);
        });
    }
}

export function decodeTime(time: number):string {
    return DateUtils.zeros(NumberUtils.intdiv(time, 60)) + ":" + DateUtils.zeros(time % 60);
}

export function decodeTextColor(color: string):string {
    const regex = /[0-9A-F]{1,2}/ig;
    const rgb: number[] = color.match(regex)?.map(value => {
        let sRGB = Number("0x" + value) / 255;
        if (sRGB <= 0.03928)
            return sRGB / 12.92;
        else
            return Math.pow(((sRGB + 0.055) / 1.055), 2.4);
    }) || [];
    return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]) > 0.1791 ? "#000000" : "#ffffff";
}
