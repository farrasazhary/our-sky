export class DateHelper {
  /**
   * Calculates days remaining until target date
   */
  static calculateDaysLeft(targetDate: Date): number {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const target = new Date(targetDate)
    target.setHours(0, 0, 0, 0)

    const diffTime = target.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  /**
   * Calculates next occurrence date for yearly repeating events
   */
  static getNextYearlyDate(eventDate: Date): Date {
    const today = new Date()
    const currentYear = today.getFullYear()
    
    let nextDate = new Date(eventDate)
    nextDate.setFullYear(currentYear)

    // If event has passed this year, move to next year
    if (nextDate < today) {
      nextDate.setFullYear(currentYear + 1)
    }

    return nextDate
  }

  /**
   * Returns YYYY-MM-DD string format in Asia/Jakarta (WIB) timezone
   */
  static getIndonesianDateString(date: Date = new Date()): string {
    return new Date(date).toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" })
  }

  /**
   * Returns YYYY-MM-DD string format
   */
  static formatDateString(date: Date): string {
    return this.getIndonesianDateString(date)
  }
}
