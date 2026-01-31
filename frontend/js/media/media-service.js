/**
 * Author: Gobi Mohanathas
 * File Name: media_service.js
 * Date of Creation: January 14, 2025
 * Purpose: 
 */

export async function fetchMedia() {
    try {
        const response = await fetch('/StreamSerenity/backend/media/list.php');

        if (!response.ok) {
            throw new Error('Failed to fetch media');
        }

        return await response.json()
    } catch (e) {
        console.error('Media fetch error:', e);
        return [];
    }
}