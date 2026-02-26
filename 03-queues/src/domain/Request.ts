/**
 * Represents a basic HTTP request handled by the simulated web server.
 */
export class Request {
  private readonly id: number;
  private readonly endpoint: string;
  private readonly user: string;
  private readonly timestamp: Date;

  constructor(id: number, endpoint: string, user: string, timestamp: Date) {
    this.id = id;
    this.endpoint = endpoint;
    this.user = user;
    this.timestamp = timestamp;
  }

  public getId(): number {
    return this.id;
  }

  public getEndpoint(): string {
    return this.endpoint;
  }

  public getUser(): string {
    return this.user;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }

  /**
   * Returns a short, human-readable representation of the request.
   */
  public toString(): string {
    return `Solicitud#${this.id} [${this.user}] -> ${this.endpoint} el ${this.timestamp.toISOString()}`;
  }
}

