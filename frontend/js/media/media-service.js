/**
 * Author: Gobi Mohanathas
 * File Name: media_service.js
 * Date of Creation: January 14, 2025
 * Purpose: 
 */
import { API_BASE } from "../config.js";

export async function fetchMedia() {
    try {
        const response = await fetch(`${API_BASE}/media/list`, {
            credentials: 'include'
        });

        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        let data = [];
        try {
            data = await response.json();
        } catch (e) {
            console.warn("Non-JSON response from media-service.js endpoint");
        }

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