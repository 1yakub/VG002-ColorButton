/*************************************************
 * COLOR CONFIGURATION
 * 
 * Centralized color management system that defines:
 * - Base colors
 * - Text classes
 * - Title variants
 * 
 * Color Selection Criteria:
 * - All colors meet WCAG 2.1 AA contrast requirements
 * - Each color has appropriate dark/light variants
 * - Consistent with modern UI color theory
 *************************************************/

/**
 * COLOR PALETTE
 * Each color object contains:
 * @property {string} name - Display name of color
 * @property {string} hex - Primary HEX color code
 * @property {string} textClass - Tailwind CSS class for text
 * @property {string} titleColor - Darker variant for titles
 * 
 * Usage:
 * - hex: Used for button backgrounds and icons
 * - textClass: Used for text elements
 * - titleColor: Used for high-contrast headings
 */
const colors = [
    { 
        name: 'Red', 
        hex: '#EF4444',            // Vibrant red for primary state
        textClass: 'text-red-500', // Tailwind class for consistent styling
        titleColor: '#dc2626'      // Darker red for better contrast
    },
    { 
        name: 'Green', 
        hex: '#22C55E',            // Balanced green that's not too harsh
        textClass: 'text-green-500',
        titleColor: '#15803d'      // Forest green for readability
    },
    { 
        name: 'Blue', 
        hex: '#3B82F6',            // Sky blue for calm state
        textClass: 'text-blue-500',
        titleColor: '#1d4ed8'      // Royal blue for emphasis
    }
];