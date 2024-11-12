/*************************************************
 * MAIN APPLICATION LOGIC
 * Enhanced with error handling and loading states
 * 
 * Features added:
 * - Error handling for color changes
 * - Loading states during transitions
 * - Fallback mechanisms
 * - Better user feedback
 *************************************************/

/**
 * STATE MANAGEMENT
 * @type {number} - Tracks current color index
 * @type {boolean} - Tracks button loading state
 */
let currentColorIndex = 0;
let isButtonLoading = false;

/**
 * DOM ELEMENT REFERENCES
 * Cached for performance & error checking
 */
const button = document.getElementById('colorButton');
const colorText = document.getElementById('colorText');
const githubIcon = document.getElementById('githubIcon');
const authorName = document.getElementById('authorName');

// Verify all essential elements are present
if (!button || !colorText || !githubIcon || !authorName) {
    console.error('Essential DOM elements not found');
    // Add visible error message if in development
    if (process.env.NODE_ENV === 'development') {
        document.body.innerHTML = '<h1>Error: Missing essential elements</h1>';
    }
}

/**
 * RESET TO DEFAULT STATE
 * Fallback function for error recovery
 * @returns {void}
 */
function resetToDefaultState() {
    const defaultColor = {
        hex: '#EF4444',
        textClass: 'text-red-500',
        titleColor: '#dc2626',
        name: 'Red'
    };
    
    try {
        updateUIElements(defaultColor);
        console.info('Reset to default state successful');
    } catch (error) {
        console.error('Failed to reset state:', error);
    }
}

/**
 * UPDATE UI ELEMENTS
 * Centralized UI update function with error handling
 * @param {Object} color - Color configuration object
 * @throws {Error} If color object is invalid
 * @returns {void}
 */
function updateUIElements(color) {
    if (!color || !color.hex) {
        throw new Error('Invalid color configuration');
    }

    try {
        // Update button with loading state
        button.classList.add('button-loading');
        button.disabled = true;

        // Batch UI updates
        requestAnimationFrame(() => {
            button.style.backgroundColor = color.hex;
            button.style.boxShadow = `5px 5px 15px rgba(0, 0, 0, 0.2), 
                                    -5px -5px 15px rgba(255, 255, 255, 0.7)`;
            
            const title = document.querySelector('.neo-title');
            if (title) title.style.color = color.titleColor;

            colorText.innerHTML = `Current Color: <span class="${color.textClass} font-semibold">
                                    ${color.name}</span>`;
            
            githubIcon.style.fill = color.hex;
            authorName.style.color = color.hex;

            // Remove loading state after transition
            setTimeout(() => {
                button.classList.remove('button-loading');
                button.disabled = false;
            }, 300);
        });

    } catch (error) {
        console.error('Error updating UI:', error);
        resetToDefaultState();
        throw error;
    }
}

/**
 * COLOR CHANGE HANDLER
 * Enhanced with error handling and loading states
 * @returns {void}
 */
function changeColor() {
    if (isButtonLoading) return; // Prevent multiple clicks
    
    try {
        isButtonLoading = true;
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        
        if (!colors[currentColorIndex]) {
            throw new Error('Invalid color index');
        }

        updateUIElements(colors[currentColorIndex]);

    } catch (error) {
        console.error('Color change failed:', error);
        resetToDefaultState();
    } finally {
        // Ensure button is re-enabled
        setTimeout(() => {
            isButtonLoading = false;
            button.disabled = false;
            button.classList.remove('button-loading');
        }, 300);
    }
}

// Event Listeners with error boundary
try {
    button.addEventListener('click', changeColor);
} catch (error) {
    console.error('Failed to add event listener:', error);
}