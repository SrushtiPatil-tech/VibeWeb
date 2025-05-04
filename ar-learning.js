// AR Models and their information
const arModels = {
    geometry: {
        models: {
            cube: {
                path: 'models/geometry/cube.gltf',
                description: 'A perfect cube with equal sides and right angles. Explore faces, vertices, and edges in 3D space.'
            },
            sphere: {
                path: 'models/geometry/sphere.gltf',
                description: 'A perfect sphere. Study radius, diameter, and surface area in real-time.'
            },
            pyramid: {
                path: 'models/geometry/pyramid.gltf',
                description: 'A regular pyramid. Examine base, height, and triangular faces in 3D.'
            }
        },
        defaultModel: 'cube'
    },
    chemistry: {
        models: {
            water: {
                path: 'models/chemistry/h2o.gltf',
                description: 'Water molecule (H2O). Observe the bond angle and molecular geometry.'
            },
            methane: {
                path: 'models/chemistry/ch4.gltf',
                description: 'Methane molecule (CH4). Study tetrahedral molecular geometry.'
            },
            benzene: {
                path: 'models/chemistry/c6h6.gltf',
                description: 'Benzene ring (C6H6). Explore aromatic structure and resonance.'
            }
        },
        defaultModel: 'water'
    },
    physics: {
        models: {
            pendulum: {
                path: 'models/physics/pendulum.gltf',
                description: 'Simple pendulum. Study periodic motion and gravitational effects.'
            },
            spring: {
                path: 'models/physics/spring.gltf',
                description: 'Oscillating spring. Observe Hooke\'s law and simple harmonic motion.'
            },
            circuit: {
                path: 'models/physics/circuit.gltf',
                description: 'Basic electric circuit. Examine current flow and component relationships.'
            }
        },
        defaultModel: 'pendulum'
    },
    biology: {
        models: {
            heart: {
                path: 'models/biology/heart.gltf',
                description: 'Human heart. Study chambers, valves, and blood flow patterns.'
            },
            brain: {
                path: 'models/biology/brain.gltf',
                description: 'Human brain. Explore different regions and their functions.'
            },
            cell: {
                path: 'models/biology/cell.gltf',
                description: 'Animal cell. Examine organelles and cellular structure.'
            }
        },
        defaultModel: 'heart'
    }
};

let currentModel = null;
let currentRotation = 0;
let currentScale = 1;

// Initialize AR session for a specific category
function startARSession(category) {
    const arViewer = document.getElementById('ar-viewer');
    const modelInfo = document.getElementById('modelInfo');
    const modelDescription = document.getElementById('modelDescription');
    
    // Show AR viewer
    arViewer.style.display = 'block';
    
    // Get default model for the category
    const categoryData = arModels[category];
    const defaultModelKey = categoryData.defaultModel;
    const modelData = categoryData.models[defaultModelKey];
    
    // Update model information
    modelDescription.textContent = modelData.description;
    
    // Load 3D model
    loadModel(modelData.path);
    
    // Initialize AR.js scene
    initARScene();
}

// Load 3D model into the scene
function loadModel(modelPath) {
    const modelEntity = document.getElementById('ar-model');
    
    // Remove existing model if any
    while (modelEntity.firstChild) {
        modelEntity.removeChild(modelEntity.firstChild);
    }
    
    // Create new model
    const model = document.createElement('a-entity');
    model.setAttribute('gltf-model', modelPath);
    model.setAttribute('scale', `${currentScale} ${currentScale} ${currentScale}`);
    model.setAttribute('rotation', `0 ${currentRotation} 0`);
    
    modelEntity.appendChild(model);
    currentModel = model;
}

// Initialize AR.js scene
function initARScene() {
    const scene = document.querySelector('a-scene');
    
    // Add event listeners for marker detection
    const marker = document.querySelector('a-marker');
    marker.addEventListener('markerFound', () => {
        console.log('Marker detected');
        // Add any additional functionality when marker is found
    });
    
    marker.addEventListener('markerLost', () => {
        console.log('Marker lost');
        // Add any additional functionality when marker is lost
    });
}

// Close AR viewer
function closeARViewer() {
    const arViewer = document.getElementById('ar-viewer');
    arViewer.style.display = 'none';
    currentModel = null;
}

// Rotate model
function rotateModel(direction) {
    if (!currentModel) return;
    
    const rotationDelta = direction === 'left' ? -45 : 45;
    currentRotation = (currentRotation + rotationDelta) % 360;
    
    currentModel.setAttribute('rotation', `0 ${currentRotation} 0`);
}

// Scale model
function scaleModel(direction) {
    if (!currentModel) return;
    
    const scaleDelta = direction === 'up' ? 0.2 : -0.2;
    currentScale = Math.max(0.5, Math.min(3, currentScale + scaleDelta));
    
    currentModel.setAttribute('scale', `${currentScale} ${currentScale} ${currentScale}`);
}

// Add touch gesture support
document.addEventListener('DOMContentLoaded', () => {
    let touchStartX = 0;
    let touchStartY = 0;
    
    const arViewer = document.getElementById('ar-viewer');
    
    arViewer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    arViewer.addEventListener('touchmove', (e) => {
        if (!currentModel) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;
        
        // Rotate based on horizontal movement
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            rotateModel(deltaX > 0 ? 'right' : 'left');
        }
        // Scale based on vertical movement
        else {
            scaleModel(deltaY < 0 ? 'up' : 'down');
        }
        
        touchStartX = touchX;
        touchStartY = touchY;
    });
}); 