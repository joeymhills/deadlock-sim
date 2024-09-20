import { Hero } from "./Hero"; 

const STORAGE_KEY_PREFIX = "hero_build_";

// Save a hero build
export const saveBuild = (hero: Hero, buildName: string) => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${buildName}`, JSON.stringify(hero));
};

// Load a hero build
export const loadBuild = (buildName: string): Hero | undefined => {
    const savedBuild = localStorage.getItem(`${STORAGE_KEY_PREFIX}${buildName}`);
    return savedBuild ? JSON.parse(savedBuild) : null;
};

// Delete a hero build
const deleteBuild = (buildName: string) => {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${buildName}`);
};

// Rename a hero build
export const renameBuild = (oldName: string, newName: string) => {
    const savedBuild = localStorage.getItem(`${STORAGE_KEY_PREFIX}${oldName}`);
    if (savedBuild) {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}${newName}`, savedBuild);
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}${oldName}`);
    }
};

// Get all saved build names
export const getSavedBuilds = (): string[] => {
    return Object.keys(localStorage)
        .filter((key) => key.startsWith(STORAGE_KEY_PREFIX))
        .map((key) => key.replace(STORAGE_KEY_PREFIX, ""));
};