/**
 * Author: Gobi Mohanathas
 * File Name: media_service.js
 * Date of Creation: January 14, 2025
 * Purpose: 
 */

export async function fetchMedia() {
    try {
        const response = await fetch('/StreamSerenity/backend/media/list.php', {
            credentials: 'include'
        });

        
        if (!response.ok) {
            throw new Error('HTTP ${response.status}');
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
            console.warn('Unexpected media format: ', data);
            return [];
        }

        return data;
        
    } catch (e) {
        console.error('Media fetch error:', e);
        return [];
    }
}