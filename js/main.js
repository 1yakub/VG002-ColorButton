/*************************************************
 * MAIN APPLICATION LOGIC
 * 
 * Core functionality handling:
 * - Color state management
 * - DOM interactions
 * - Event handling
 * - Visual updates
 * 
 * Architecture follows:
 * - Single responsibility principle
 * - Event-driven design
 * - Performant DOM manipulation
 *************************************************/

/**
 * STATE MANAGEMENT
 * Tracks the current position in the color cycle
 * @type {number}
 */
let currentColorIndex = 0;

/**
 * DOM ELEMENT REFERENCES
 * Cached for performance optimization
 * Only query the DOM once on initialization
 */
const button = document.getElementById('colorButton');
const colorText = document.getElementById('colorText');
const githubIcon = document.getElementById('githubIcon');
const authorName = document.getElementById('authorName');

/**
 * COLOR CHANGE HANDLER
 * Manages the color transition process
 * 
 * Process:
 * 1. Updates color index
 * 2. Retrieves new color data
 * 3. Updates all affected elements
 * 4. Maintains neomorphic effects
 * 
 * Visual Updates:
 * - Button background
 * - Title color
 * - Status text
 * - GitHub icon
 * - Author name
 * 
 * Performance Considerations:
 * - Batches DOM updates
 * - Uses CSS transitions for smooth changes
 * - Maintains consistent shadow effects
 */
function changeColor() {
    // Cycle to next color with modulo for array bounds
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    const newColor = colors[currentColorIndex];
    
    // Update primary button
    button.style.backgroundColor = newColor.hex;
    
    // Update title with high-contrast variant
    const title = document.querySelector('.neo-title');
    title.style.color = newColor.titleColor;
    
    // Update status display
    colorText.innerHTML = `Current Color: <span class="${newColor.textClass} font-semibold">${newColor.name}</span>`;
    
    // Update decorative elements
    githubIcon.style.fill = newColor.hex;
    authorName.style.color = newColor.hex;

    // Maintain consistent neomorphic effect
    button.style.boxShadow = `5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.7)`;
}

/**
 * EVENT LISTENERS
 * Sets up user interaction handling
 */
button.addEventListener('click', changeColor);