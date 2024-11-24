// src/utils/helpers.js

/**
 * Validates if the given string is a valid Delivery ID.
 * @param {string} id - The Delivery ID to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
export const isValidDeliveryId = (id) => {
    // Example validation: alphanumeric, underscores, hyphens, 1 to 20 characters
    return /^[a-zA-Z0-9_-]{1,20}$/.test(id);
  };
  