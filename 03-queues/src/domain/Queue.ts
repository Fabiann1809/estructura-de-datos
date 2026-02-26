/**
 * Generic Queue implementation using FIFO order.
 *
 * Responsible only for managing elements in queue order.
 */
export class Queue<T> {
  private readonly items: T[] = [];

  /**
   * Adds a new element to the end of the queue.
   */
  public enqueue(item: T): void {
    this.items.push(item);
  }

  /**
   * Removes and returns the element at the front of the queue.
   * Returns undefined if the queue is empty.
   */
  public dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items.shift();
  }

  /**
   * Returns the element at the front of the queue without removing it.
   * Returns undefined if the queue is empty.
   */
  public front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[0];
  }

  /**
   * Returns the current number of elements stored in the queue.
   */
  public size(): number {
    return this.items.length;
  }

  /**
   * Returns true when the queue has no elements.
   */
  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Returns a shallow copy of the internal array.
   * This method is provided for read-only inspection.
   */
  public toArray(): readonly T[] {
    return [...this.items];
  }
}

