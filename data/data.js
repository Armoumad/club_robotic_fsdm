// Media handling system supporting multiple image and video formats

class MediaHandler {
    constructor() {
        this.supportedImageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        this.supportedVideoFormats = ['mp4', 'webm', 'mov', 'avi'];
        this.cache = {};
    }

    // Detect media type
    detectMediaType(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        if (this.supportedImageFormats.includes(extension)) {
            return 'image';
        } else if (this.supportedVideoFormats.includes(extension)) {
            return 'video';
        } else {
            throw new Error('Unsupported media format');
        }
    }

    // Cache media
    cacheMedia(fileName, mediaData) {
        this.cache[fileName] = mediaData;
    }

    // Load media with error handling
    loadMedia(fileName) {
        try {
            const mediaType = this.detectMediaType(fileName);
            // Logic to load the media
            console.log(`Loading ${mediaType}: ${fileName}`);
            // Here you can add actual loading logic, e.g., using fetch or FileReader
            return this.cache[fileName] || 'Media not found in cache';
        } catch (error) {
            console.error(`Error loading media: ${error.message}`);
        }
    }
}

// Example usage
const mediaHandler = new MediaHandler();
mediaHandler.cacheMedia('example.jpg', 'Image data...');
mediaHandler.loadMedia('example.jpg');
mediaHandler.loadMedia('example.mp4');