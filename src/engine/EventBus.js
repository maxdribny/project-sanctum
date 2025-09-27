/**
 * @fileoverview Event system for communication between modules
 * @description Loose coupling between game systems using event-driven architecture
 * Skill Level: Intermediate
 */

/**
 * Global event bus for module communication
 * @class
 */
export class EventBus {
  constructor() {
    // TODO: Initialize event listeners map
  }

  /**
   * Subscribe to an event type
   * @param {string} eventType - Type of event to listen for
   * @param {Function} callback - Function to call when event occurs
   * @param {Object} context - Context for callback execution
   */
  on(eventType, callback, context) {
    // TODO: Add event listener to internal map
  }

  /**
   * Unsubscribe from an event type
   * @param {string} eventType - Type of event to stop listening for
   * @param {Function} callback - Callback function to remove
   * @param {Object} context - Context that was used for subscription
   */
  off(eventType, callback, context) {
    // TODO: Remove event listener from internal map
  }

  /**
   * Emit an event to all subscribers
   * @param {string} eventType - Type of event to emit
   * @param {*} data - Data to pass to event handlers
   */
  emit(eventType, data) {
    // TODO: Call all registered callbacks for this event type
  }

  /**
   * Subscribe to an event for one-time execution
   * @param {string} eventType - Type of event to listen for
   * @param {Function} callback - Function to call when event occurs
   * @param {Object} context - Context for callback execution
   */
  once(eventType, callback, context) {
    // TODO: Add event listener that removes itself after first execution
  }
}

// Global event bus instance
export const eventBus = new EventBus();