import * as dayjs from 'dayjs';

export class FzUtil {
    static toTitleCase(value: string): string {
        return value
            .toLowerCase()
            .trim()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    static isEmptyNull(object: any): boolean {
        if (typeof object == "string") {
            return (object == null || object.trim() == "");
        }
        return (object == null);
    }

    static getCurrentDate(): Date {
        return new Date();
    }

    static getMonthOfDate(date: Date) {
        return dayjs(date).month();
    }

    static getYearOfDate(date: Date) {
        return dayjs(date).year();
    }

    static getNegative(number: number): number {
        return (number <= 0) ? number : number * -1;
    }
}