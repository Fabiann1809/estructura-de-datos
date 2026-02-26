import { Request } from "../domain/Request";
import { WebServer } from "../server/WebServer";

/**
 * Entry point of the simulation.
 */
async function runSimulation(): Promise<void> {
  console.log("=== Simulación de Cola de Solicitudes del Servidor Web ===");

  const server = new WebServer();

  // Simulate multiple incoming requests.
  const now = new Date();

  const requests: Request[] = [
    new Request(1, "/api/users", "Juan", new Date(now.getTime())),
    new Request(2, "/api/products", "Mario", new Date(now.getTime() + 1000)),
    new Request(3, "/api/orders", "Nicole", new Date(now.getTime() + 2000)),
    new Request(4, "/api/cart", "Fabian", new Date(now.getTime() + 3000)),
    new Request(5, "/api/profile", "David", new Date(now.getTime() + 4000))
  ];

  console.log("[PRINCIPAL] Enviando solicitudes entrantes al servidor...");
  for (const request of requests) {
    server.receiveRequest(request);
  }

  console.log("");
  server.displayPendingRequests();
  console.log("");

  // Process all pending requests in FIFO order.
  await server.processAllPendingRequests();

  console.log("");
  console.log(
    `[PRINCIPAL] Simulación finalizada. Total de solicitudes procesadas: ${server.getProcessedRequestsCount()}`
  );
  console.log("==========================================================");
}

runSimulation().catch((error: unknown) => {
  console.error("[PRINCIPAL] Error inesperado durante la simulación:", error);
});

