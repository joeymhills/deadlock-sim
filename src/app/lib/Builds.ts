import { Hero } from "./Hero";

const STORAGE_KEY_PREFIX = "hero_build_";

// Check if we are in the browser
const isBrowser = typeof window !== "undefined";

// Save a hero build
export const saveBuild = (hero: Hero, buildName: string) => {
    if (isBrowser) {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}${buildName}`, JSON.stringify(hero));
        alert("Build saved.");
    }
};

// Load a hero build
export const loadBuild = (buildName: string): Hero | undefined => {
    if (isBrowser) {
        const savedBuild = localStorage.getItem(`${STORAGE_KEY_PREFIX}${buildName}`);
        return savedBuild ? JSON.parse(savedBuild) : null;
    }
    return undefined; // Return undefined if not in the browser
};

// Delete a hero build
export const deleteBuild = (buildName: string) => {
    if (isBrowser) {
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}${buildName}`);
        alert("Build deleted.");
    }
};

// Rename a hero build
export const renameBuild = (oldName: string, newName: string) => {
    if (isBrowser) {
        const savedBuild = localStorage.getItem(`${STORAGE_KEY_PREFIX}${oldName}`);
        if (savedBuild) {
            localStorage.setItem(`${STORAGE_KEY_PREFIX}${newName}`, savedBuild);
            localStorage.removeItem(`${STORAGE_KEY_PREFIX}${oldName}`);
            alert("Build renamed.")
        }
    }
};

// Get all saved build names
export const getSavedBuilds = (): string[] => {
    if (isBrowser) {
        return Object.keys(localStorage)
            .filter((key) => key.startsWith(STORAGE_KEY_PREFIX))
            .map((key) => key.replace(STORAGE_KEY_PREFIX, ""));
    }
    return []; // Return an empty array if not in the browser
};
