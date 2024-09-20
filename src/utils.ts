// Random utils file

// Parses hero names into their corresponding file names to find their images
export function getImageName(str: string): string {
    return str.replace(/\s+/g, '_').replace(/%20/g, '_') + ".png";
}