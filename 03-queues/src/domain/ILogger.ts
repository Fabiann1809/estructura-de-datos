/**
 * Abstraction for logging so the same logic can output to console or to a UI.
 */
export interface ILogger {
  log(message: string): void;
  error(message: string): void;
}
