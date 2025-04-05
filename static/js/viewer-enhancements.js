// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Enhance 3D viewer functionality
    enhance3DViewer();
    
    // Add molecule animation
    addMoleculeAnimation();
    
    // Add measurement tooltips
    enhanceMeasurements();
    
    // Improve style controls
    enhanceStyleControls();
});

// Enhance 3D viewer functionality
function enhance3DViewer() {
    // Add loading animation to viewers
    const viewers = ['viewer', 'viewer3D'];
    viewers.forEach(viewerId => {
        const viewer = document.getElementById(viewerId);
        if (!viewer) return;
        
        // Add loading class when loading starts
        const originalView3DStructure = window.view3DStructure;
        if (originalView3DStructure && viewerId === 'viewer') {
            window.view3DStructure = function(sdfUrl) {
                if (viewer) viewer.classList.add('loading');
                const promise = originalView3DStructure.apply(this, arguments);
                if (promise && promise.then) {
                    promise.then(() => {
                        if (viewer) viewer.classList.remove('loading');
                    }).catch(() => {
                        if (viewer) viewer.classList.remove('loading');
                    });
                }
                return promise;
            };
        }
        
        const originalView3DBySmiles = window.view3DBySmiles;
        if (originalView3DBySmiles && viewerId === 'viewer3D') {
            window.view3DBySmiles = function() {
                if (viewer) viewer.classList.add('loading');
                const promise = originalView3DBySmiles.apply(this, arguments);
                if (promise && promise.then) {
                    promise.then(() => {
                        if (viewer) viewer.classList.remove('loading');
                    }).catch(() => {
                        if (viewer) viewer.classList.remove('loading');
                    });
                }
                return promise;
            };
        }
    });
    
    // Enhance viewer controls
    const styleControls = document.getElementById('styleControls');
    if (styleControls) {
        // Clear existing controls
        styleControls.innerHTML = '';
        
        // Create simplified controls - only 5 buttons as requested
        const buttons = [
            { text: 'Ball+Stick', action: function() { setNGLStyle('ball+stick'); } },
            { text: 'Spacefill', action: function() { setNGLStyle('spacefill'); } },
            { text: 'Color by Element', action: function() { setColorScheme('element'); } },
            { text: 'Spin', action: function() { toggleSpin(); } },
            { text: 'Remove Surface', action: function() { removeSurface(); } }
        ];
        
        // Create the buttons
        buttons.forEach(buttonInfo => {
            const button = document.createElement('button');
            button.className = 'style-btn';
            button.textContent = buttonInfo.text;
            button.onclick = buttonInfo.action;
            styleControls.appendChild(button);
        });
    }
    }


// Add molecule animation to the page
function addMoleculeAnimation() {
    // Create molecule animation container
    const moleculeAnimation = document.createElement('div');
    moleculeAnimation.className = 'molecule-animation';
    moleculeAnimation.innerHTML = `
        <div class="atom atom-1"></div>
        <div class="atom atom-2"></div>
        <div class="atom atom-3"></div>
        <div class="bond bond-1"></div>
        <div class="bond bond-2"></div>
    `;
    
    // Insert after the h1 element
    const h1 = document.querySelector('h1');
    if (h1 && h1.parentNode) {
        h1.parentNode.insertBefore(moleculeAnimation, h1.nextSibling);
    }
}

// Enhance measurement functionality
function enhanceMeasurements() {
    const originalMeasureDistance = window.measureNGLDistance;
    if (originalMeasureDistance) {
        window.measureNGLDistance = function() {
            // Create tooltip for instructions
            const viewer = document.getElementById('viewer');
            if (viewer) {
                const tooltip = document.createElement('div');
                tooltip.className = 'measurement-tooltip';
                tooltip.textContent = 'Click two atoms to measure distance';
                viewer.appendChild(tooltip);
                
                // Remove tooltip after 5 seconds
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 5000);
            }
            
            originalMeasureDistance.apply(this, arguments);
        };
    }
    
    const originalMeasureAngle = window.measureNGLAngle;
    if (originalMeasureAngle) {
        window.measureNGLAngle = function() {
            // Create tooltip for instructions
            const viewer = document.getElementById('viewer');
            if (viewer) {
                const tooltip = document.createElement('div');
                tooltip.className = 'measurement-tooltip';
                tooltip.textContent = 'Click three atoms to measure angle';
                viewer.appendChild(tooltip);
                
                // Remove tooltip after 5 seconds
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 5000);
            }
            
            originalMeasureAngle.apply(this, arguments);
        };
    }
    
    const originalMeasureDihedral = window.measureNGLDihedral;
    if (originalMeasureDihedral) {
        window.measureNGLDihedral = function() {
            // Create tooltip for instructions
            const viewer = document.getElementById('viewer');
            if (viewer) {
                const tooltip = document.createElement('div');
                tooltip.className = 'measurement-tooltip';
                tooltip.textContent = 'Click four atoms to measure dihedral angle';
                viewer.appendChild(tooltip);
                
                // Remove tooltip after 5 seconds
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 5000);
            }
            
            originalMeasureDihedral.apply(this, arguments);
        };
    }
}

// Enhance style controls
function enhanceStyleControls() {
    // Add animation to style buttons
    document.querySelectorAll('.style-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add active state
        button.addEventListener('click', function() {
            // Remove active class from all buttons in the same group
            const buttonsContainer = this.parentNode;
            if (buttonsContainer) {
                buttonsContainer.querySelectorAll('.style-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
}