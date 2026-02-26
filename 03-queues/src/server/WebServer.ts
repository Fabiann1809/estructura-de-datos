import { ILogger } from "../domain/ILogger";
import { Queue } from "../domain/Queue";
import { Request } from "../domain/Request";

/**
 * Simulates a very simple web server that receives and processes HTTP requests.
 * Accepts an optional logger; if not provided, uses console.
 */
export class WebServer {
  private readonly pendingRequests: Queue<Request>;
  private processedRequestsCount: number;
  private readonly logger: ILogger;

  constructor(logger?: ILogger) {
    this.pendingRequests = new Queue<Request>();
    this.processedRequestsCount = 0;
    this.logger = logger ?? {
      log: (msg: string) => console.log(msg),
      error: (msg: string) => console.error(msg)
    };
  }

  /**
   * Receives a new request and places it into the pending queue.
   */
  public receiveRequest(request: Request): void {
    this.logger.log(`[SERVIDOR] Nueva solicitud recibida: ${request.toString()}`);
    this.pendingRequests.enqueue(request);
    this.logger.log(
      `[SERVIDOR] Tamaño de la cola después de encolar: ${this.pendingRequests.size()}`
    );
  }

  /**
   * Processes the next request in the queue (if any).
   * Includes a simulated delay to represent processing time.
   */
  public async processNextRequest(): Promise<void> {
    if (this.pendingRequests.isEmpty()) {
      this.logger.log("[SERVIDOR] No hay solicitudes pendientes por procesar.");
      return;
    }

    const nextRequest: Request | undefined = this.pendingRequests.dequeue();

    if (!nextRequest) {
      this.logger.error(
        "[SERVIDOR] Error inesperado: la cola indicó que no estaba vacía pero dequeue devolvió undefined."
      );
      return;
    }

    this.logger.log(
      `[SERVIDOR] Iniciando procesamiento de ${nextRequest.toString()} (restantes en cola: ${this.pendingRequests.size()})`
    );

    try {
      await this.simulateProcessingDelay();
      this.processedRequestsCount += 1;
      this.logger.log(
        `[SERVIDOR] Procesamiento finalizado de solicitud #${nextRequest.getId()}. Total procesadas: ${this.processedRequestsCount}`
      );
    } catch (error) {
      this.logger.error(
        `[SERVIDOR] Error al procesar la solicitud: ${(error as Error).message}`
      );
    }
  }

  /**
   * Processes all currently pending requests one by one.
   */
  public async processAllPendingRequests(): Promise<void> {
    this.logger.log("[SERVIDOR] Iniciando procesamiento de todas las solicitudes pendientes...");

    while (!this.pendingRequests.isEmpty()) {
      await this.processNextRequest();
    }

    this.logger.log(
      `[SERVIDOR] Todas las solicitudes pendientes procesadas. Total procesadas hasta ahora: ${this.processedRequestsCount}`
    );
  }

  /**
   * Logs all currently pending requests in the queue.
   */
  public displayPendingRequests(): void {
    if (this.pendingRequests.isEmpty()) {
      this.logger.log("[SERVIDOR] No hay solicitudes pendientes.");
      return;
    }

    this.logger.log(
      `[SERVIDOR] Solicitudes pendientes (${this.pendingRequests.size()} en cola):`
    );

    for (const request of this.pendingRequests.toArray()) {
      this.logger.log(`  - ${request.toString()}`);
    }
  }

  /**
   * Returns a read-only list of requests currently waiting in the queue (for UI).
   */
  public getPendingRequests(): readonly Request[] {
    return this.pendingRequests.toArray();
  }

  /**
   * Returns the number of requests that have been fully processed.
   */
  public getProcessedRequestsCount(): number {
    return this.processedRequestsCount;
  }

  /**
   * Simulates a delay that represents the server taking time to process a request.
   * The delay duration is randomized within a small range to make the simulation dynamic.
   */
  private simulateProcessingDelay(): Promise<void> {
    const minDelayMs = 500;
    const maxDelayMs = 1500;
    const delayMs =
      Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs;

    this.logger.log(
      `[SERVIDOR] Simulando demora de procesamiento de ${delayMs}ms para la solicitud actual...`
    );

    return new Promise((resolve) => {
      setTimeout(() => resolve(), delayMs);
    });
  }
}

