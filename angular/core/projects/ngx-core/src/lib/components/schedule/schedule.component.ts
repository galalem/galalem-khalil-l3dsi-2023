import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as DateUtils from '../../utils/dates';
import * as NumberUtils from '../../utils/numbers';

export type ScheduleCell = {
    subject: string,
    target: string,
    place: string,
    start: number,
    end: number,
    fortnight?: 'A' | 'B',
    color?: string;
}

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
