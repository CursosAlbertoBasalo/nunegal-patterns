import * as fs from "fs";
import * as path from "path";

export type LogCategory = "info" | "error" | "debug";
export type LogEntry = {
  category: LogCategory;
  message: string;
  timestamp: Date;
};

export interface Writer {
  write(entry: string): void;
}
export interface Formatter {
  format(entry: LogEntry): string;
}

export class ConsoleWriter implements Writer {
  public write(entry: string): void {
    console.log(entry);
  }
}
export class JsonFormatter implements Formatter {
  public format(entry: LogEntry): string {
    return JSON.stringify(entry);
  }
}
export class TextFileWriter implements Writer {
  private readonly filePath = path.resolve(__dirname, "./log.txt");
  public write(entry: string): void {
    fs.appendFileSync(this.filePath, entry + "\n");
  }
}
export class SimpleFormatter implements Formatter {
  public format(entry: LogEntry): string {
    return `${entry.timestamp.toISOString()} : [${entry.category}] ${entry.message}`;
  }
}

export class LoggerWriterFactory {
  public static createWriter(type: "console" | "textFile"): Writer {
    if (type === "console") {
      return new ConsoleWriter();
    } else {
      return new TextFileWriter();
    }
  }
}

export class LoggerFormatterFactory {
  public static createFormatter(type: "json" | "simple"): Formatter {
    if (type === "json") {
      return new JsonFormatter();
    } else {
      return new SimpleFormatter();
    }
  }
}

export class Logger {
  public log(entry: LogEntry) {
    const strategy = StrategyFactory.getStrategy(entry.category);
    strategy.writer.write(strategy.formatter.format(entry));
  }
}

export type LoggerStrategy = { writer: Writer; formatter: Formatter };

export class StrategyFactory {
  private static strategiesCatalog = [
    { category: "info", strategy: { writer: new ConsoleWriter(), formatter: new SimpleFormatter() } },
    { category: "error", strategy: { writer: new TextFileWriter(), formatter: new JsonFormatter() } },
    { category: "debug", strategy: { writer: new TextFileWriter(), formatter: new JsonFormatter() } },
  ];

  public static getStrategy(category: LogCategory): LoggerStrategy {
    const catalogMatch = this.strategiesCatalog.find(s => s.category == category) || this.strategiesCatalog[0];
    return catalogMatch.strategy;
  }
}

export class Client {
  private readonly logger: Logger = new Logger();
  public log(entry: LogEntry) {
    this.logger.log(entry);
  }
}

const client = new Client();
client.log({
  category: "info",
  message: "Hello World",
  timestamp: new Date(),
});
client.log({
  category: "error",
  message: "The world is ending",
  timestamp: new Date(),
});
