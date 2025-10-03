// data/data.js

const mediaCache = new Map();

// Supported formats
const imageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
const videoFormats = ['mp4', 'webm', 'mov', 'avi'];

// Asynchronous function to generate media paths
async function generateMediaPaths(mediaItems) {
    const mediaPaths = [];
    for (const item of mediaItems) {
        try {
            const exists = await checkMediaExists(item);
            if (exists) {
                mediaPaths.push(item);
            }
        } catch (error) {
            console.error(`Error checking media existence for ${item}:`, error);
        }
    }
    return mediaPaths;
}

// Function to check if media exists
async function checkMediaExists(mediaPath) {
    // Logic to check if the media exists, e.g., using fs module
    // Placeholder for actual implementation
    return mediaPath in mediaCache; // Example check
}

// Function to find image format
function findImageFormat(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    if (imageFormats.includes(extension)) {
        return extension;
    } else {
        throw new Error(`Unsupported image format: ${extension}`);
    }
}

// Function to find video format
function findVideoFormat(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    if (videoFormats.includes(extension)) {
        return extension;
    } else {
        throw new Error(`Unsupported video format: ${extension}`);
    }
}

// Backward compatibility with synchronous function
function generateImagePathsSync(mediaItems) {
    // Synchronous logic for generating image paths
    return mediaItems.filter(item => {
        try {
            return findImageFormat(item);
        } catch (error) {
            console.warn(error.message);
            return false;
        }
    });
}

// Updated EVENTS array structure
const EVENTS = [
    {
        mediaCount: 10,
        mediaItems: await generateMediaPaths(['image1.jpg', 'video1.mp4']),
        // Other event properties...
    },
    // Additional events...
];

// Export functions and constants if needed
export { generateMediaPaths, checkMediaExists, findImageFormat, findVideoFormat, generateImagePathsSync, EVENTS };