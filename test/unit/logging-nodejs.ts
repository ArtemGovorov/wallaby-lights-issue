export class ConsoleNodeAppender {
  debug(logger: any, ...rest: any[]): void {
    // tslint:disable-next-line:no-console
    console.log(`DEBUG [${logger.id}]`, ...rest);
  }

  info(logger: any, ...rest: any[]): void {
    // tslint:disable-next-line:no-console
    console.log(`INFO [${logger.id}]`, ...rest);
  }

  warn(logger: any, ...rest: any[]): void {
    // tslint:disable-next-line:no-console
    console.log(`WARN [${logger.id}]`, ...rest);
  }

  error(logger: any, ...rest: any[]): void {
    // tslint:disable-next-line:no-console
    console.log(`ERROR [${logger.id}]`, ...rest);
  }
}
