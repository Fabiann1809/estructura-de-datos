import { Request } from "../domain/Request";
import { WebServer } from "../server/WebServer";

const btnStart = document.getElementById("btnStart") as HTMLButtonElement;
const pendingCountEl = document.getElementById("pendingCount") as HTMLSpanElement;
const processedCountEl = document.getElementById("processedCount") as HTMLSpanElement;
const pendingListEl = document.getElementById("pendingList") as HTMLUListElement;
const pendingEmptyEl = document.getElementById("pendingEmpty") as HTMLParagraphElement;
const logOutputEl = document.getElementById("logOutput") as HTMLDivElement;

function appendLog(message: string, isError = false): void {
  const line = document.createElement("div");
  line.className = "log-line" + (isError ? " error" : "");
  line.textContent = message;
  logOutputEl.appendChild(line);
  logOutputEl.scrollTop = logOutputEl.scrollHeight;
}

function updatePendingList(server: WebServer): void {
  const pending = server.getPendingRequests();
  pendingCountEl.textContent = String(pending.length);

  if (pending.length === 0) {
    pendingListEl.innerHTML = "";
    pendingEmptyEl.classList.remove("hidden");
    return;
  }

  pendingEmptyEl.classList.add("hidden");
  pendingListEl.innerHTML = pending
    .map(
      (r) =>
        `<li><strong>#${r.getId()}</strong> [${r.getUser()}] → ${r.getEndpoint()}</li>`
    )
    .join("");
}

function updateProcessedCount(server: WebServer): void {
  processedCountEl.textContent = String(server.getProcessedRequestsCount());
}

async function runSimulation(): Promise<void> {
  btnStart.disabled = true;
  logOutputEl.innerHTML = "";
  appendLog("=== Simulación de Cola de Solicitudes del Servidor Web ===");

  const logger = {
    log: (msg: string) => appendLog(msg, false),
    error: (msg: string) => appendLog(msg, true)
  };

  const server = new WebServer(logger);

  const now = new Date();
  const requests: Request[] = [
    new Request(1, "/api/users", "Juan", new Date(now.getTime())),
    new Request(2, "/api/products", "Mario", new Date(now.getTime() + 1000)),
    new Request(3, "/api/orders", "Nicole", new Date(now.getTime() + 2000)),
    new Request(4, "/api/cart", "Fabian", new Date(now.getTime() + 3000)),
    new Request(5, "/api/profile", "David", new Date(now.getTime() + 4000))
  ];

  appendLog("[PRINCIPAL] Enviando solicitudes entrantes al servidor...");
  for (const request of requests) {
    server.receiveRequest(request);
    updatePendingList(server);
  }

  server.displayPendingRequests();
  updateProcessedCount(server);

  appendLog("[PRINCIPAL] Procesando todas las solicitudes en orden FIFO...");
  while (server.getPendingRequests().length > 0) {
    await server.processNextRequest();
    updatePendingList(server);
    updateProcessedCount(server);
  }

  appendLog(
    `[PRINCIPAL] Simulación finalizada. Total procesadas: ${server.getProcessedRequestsCount()}`
  );
  appendLog("==========================================================");
  btnStart.disabled = false;
}

btnStart.addEventListener("click", () => {
  runSimulation().catch((err: unknown) => {
    appendLog(`[PRINCIPAL] Error inesperado: ${String(err)}`, true);
    btnStart.disabled = false;
  });
});

pendingCountEl.textContent = "0";
processedCountEl.textContent = "0";
pendingEmptyEl.classList.remove("hidden");
