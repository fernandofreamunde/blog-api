interface IDateProvider {
  compareDatesInHours(startDate: Date, endDate: Date): number;
  compareDatesInDays(startDate: Date, endDate: Date): number;
  isInPast(date: Date): boolean;
  convertToUtc(date: Date): string;
  addDays(date: Date, days: number): Date;
  subtractDays(date: Date, days: number): Date;
  addHours(date: Date, hours: number): Date;
}

export { IDateProvider };
