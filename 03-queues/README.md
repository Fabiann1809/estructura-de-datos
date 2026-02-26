# Web Server Request Queue (TypeScript)

This project simulates a basic web server request management system using queues.

## Features

- **Request** class representing an HTTP request (`id`, `endpoint`, `user`, `timestamp`).
- **Generic `Queue<T>`** class with:
  - `enqueue()`
  - `dequeue()`
  - `front()`
  - `size()`
  - `isEmpty()`
- **WebServer** class that:
  - Receives requests.
  - Stores them in a FIFO queue.
  - Processes them in order.
  - Tracks processed requests count.
  - Displays pending requests.
  - Simulates processing delay.

## Requirements

- Node.js.

## Installation

```bash
cd 03-queues
npm install
```

## Cómo ejecutar

### Consola

```bash
npm start
```

Usa `ts-node` para ejecutar `src/app/main.ts` y ver los mensajes en la terminal.

### Interfaz gráfica (navegador)

```bash
npm run dev
```

