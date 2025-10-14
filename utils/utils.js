/**
 * Utility Functions Module
 * Contains helper functions used throughout the application
 */

/**
 * Generates a random integer between 0 and max (exclusive)
 * @param {number} max - The maximum value (exclusive)
 * @returns {number} Random integer between 0 and max-1
 */
export function getRandomNumber(max) {
    if (max <= 0) {
        throw new Error('Max value must be greater than 0');
    }
    return Math.floor(Math.random() * max);
}

/**
 * Formats time in seconds to MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} New shuffled array
 */
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Keep the default export for backward compatibility
export default getRandomNumber;