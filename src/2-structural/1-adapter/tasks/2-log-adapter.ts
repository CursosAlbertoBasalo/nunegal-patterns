type LogCategory = "info" | "error" | "debug";
type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};

interface Writer {
  write(entry: string): void;
}
interface Formatter {
  format(entry: LogEntry): string;
}

class ConsoleWriter implements Writer {
  write(entry: string): void {
    console.log(entry);
  }
}
class JsonFormatter implements Formatter {
  format(entry: LogEntry): string {
    return JSON.stringify(entry);
  }
}

class Logger {
  constructor(private readonly formatter: Formatter, private readonly writer: Writer) {}

  public log(entry: LogEntry) {
    this.writer.write(this.formatter.format(entry));
  }
}

class Client {
  private logger = new Logger(new JsonFormatter(), new ConsoleWriter());
  public log(entry: LogEntry) {
    this.logger.log(entry);
  }
}
const client = new Client();
client.log({ category: "info", message: "Hello world", timestamp: new Date() });
