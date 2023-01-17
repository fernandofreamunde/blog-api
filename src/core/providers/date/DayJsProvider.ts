import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDateProvider } from "./IDateProvider";

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider{

  compareDatesInHours(startDate: Date, endDate: Date ): number {
    const endDateUtc = this.convertToUtc(endDate);
    const startDateUtc = this.convertToUtc(startDate);

    return dayjs(endDateUtc).diff(startDateUtc, 'hours');
  }

  convertToUtc(date: Date){
    return dayjs(date).utc().local().format();
  }

  compareDatesInDays(startDate: Date, endDate: Date): number {
    const endDateUtc = this.convertToUtc(endDate);
    const startDateUtc = this.convertToUtc(startDate);

    return dayjs(endDateUtc).diff(startDateUtc, 'days');
  }

  addDays(date: Date, days: number): Date {
    return dayjs(date).add(days, 'days').toDate();
  }

  addHours(date: Date, hours: number): Date {
    return dayjs(date).add(hours, 'hours').toDate();
  }

  isInPast(date: Date): boolean {
    const dateUtc = this.convertToUtc(date);
    const now = this.convertToUtc(new Date());

    return dayjs(dateUtc).isBefore(now);
  }
}

export { DayjsDateProvider }
