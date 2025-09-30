/**
 * Playlist Generator Module
 * Creates and manages shuffled playlists
 */

import { getRandomNumber } from "./utils.js";

/**
 * Creates a shuffled playlist of song indices
 * @param {number} totalSongs - Total number of songs available
 * @returns {Array<number>} Array of shuffled song indices
 */
export default function createPlaylist(totalSongs) {
    if (totalSongs <= 0) {
        console.warn('Cannot create playlist: totalSongs must be greater than 0');
        return [];
    }

    const playlist = [];
    const usedIndices = new Set();

    // Generate unique random indices
    while (playlist.length < totalSongs) {
        const randomIndex = getRandomNumber(totalSongs);
        
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            playlist.push(randomIndex);
        }
    }

    console.log('Generated playlist:', playlist);
    return playlist;
}

/**
 * Creates a sequential playlist (0, 1, 2, ...)
 * @param {number} totalSongs - Total number of songs
 * @returns {Array<number>} Array of sequential song indices
 */
export function createSequentialPlaylist(totalSongs) {
    if (totalSongs <= 0) {
        return [];
    }
    
    return Array.from({ length: totalSongs }, (_, index) => index);
}

/**
 * Shuffles an existing playlist
 * @param {Array<number>} playlist - Existing playlist to shuffle
 * @returns {Array<number>} New shuffled playlist
 */
export function shufflePlaylist(playlist) {
    const shuffled = [...playlist];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}