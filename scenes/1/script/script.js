//////  JavaScript  //////


// Get the camera entity
const cam = document.getElementById('rig');

let droneN = 1;
let nextdroneN;

////////////////////////////////////////////////////////////////////////// FILM's options

const targetPositions = [
    { x: 35, y: 35, z: 35 },
    { x: 22, y: 16, z: 14 },
    { x: 12, y: 3, z: 30 },
    { x: 0, y: 0, z: 35 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 35 },
    { x: 12, y: 3, z: 30 },
    { x: 22, y: 16, z: 14 },
    { x: 35, y: 35, z: 35 },
];

let currentIndex = 0;
let targetPosition = targetPositions[currentIndex];

let animationRef = 0;
let startRotate = false; // Flag to indicate if rotation should start
let rotationAngle = 0; // Track the rotation angle

////////////////////////////////////////////////////////////////////////// CIRCLE's options

let q = 0; // circle animation's cvladi
let r = 10; // circle's radius

const nextDronePositions = [
    { x: 35, y: 35, z: 35 },
    { x: (r * Math.cos(q)), y: 5, z: (r * Math.sin(q)) },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
];

// Component to change to a sequential color on click.
AFRAME.registerComponent('cursor-listener-buton', {
    init: function () {
        // console.log('I was clicked at: ', evt.detail.intersection.point);

        //  click on button
        this.el.addEventListener('click', function (evt) {
            nextdroneN = parseInt(this.getAttribute('id')[5]);

            let COLORS = ['red', 'green'];
            for (let i = 1; i < 5; i++) {
                let butoni = document.getElementById(("buton" + i));
                butoni.setAttribute('material', 'color', COLORS[0]);
            }
            this.setAttribute('material', 'color', COLORS[1]);
            console.log(nextdroneN);
            if (nextdroneN == 1 || nextdroneN == 2 && nextdroneN != droneN) {

                currentIndex = 0;
                targetPosition = targetPositions[currentIndex];
                animationRef = 0;
                startRotate = false; // Flag to indicate if rotation should start
                rotationAngle = 0; // Track the rotation angle

                q = 0; // circle animation's cvladi

                droneN = 0;
            }
        });

        //  mouseenter on button
        this.el.addEventListener('mouseenter', function (evt) {
            let opabox = document.getElementById("opabox");
            let xyz = this.getAttribute('position');
            opabox.setAttribute('position', `${xyz.x} 0.02 ${xyz.z}`);
        });

        //  mouseleave on button
        this.el.addEventListener('mouseleave', function (evt) {
            let opabox = document.getElementById("opabox");
            let xyz = this.getAttribute('position');
            opabox.setAttribute('position', `${xyz.x} -0.02 ${xyz.z}`);
        });
    }
});


// Animation loop
function animate() {
    switch (droneN) {
        case 0:
            const startdronePosition = cam.object3D.position.clone();
            const targetdronePosition = new THREE.Vector3(nextDronePositions[nextdroneN - 1].x, nextDronePositions[nextdroneN - 1].y, nextDronePositions[nextdroneN - 1].z);
            const distancedronePosition = startdronePosition.distanceTo(targetdronePosition);

            if (distancedronePosition > 0.3) {
                const direction = targetdronePosition.clone().sub(startdronePosition).normalize();
                const newPosition = startdronePosition.clone().add(direction.multiplyScalar(0.3)); // Move by a fixed distance
                cam.setAttribute('position', newPosition);
            } else {
                droneN = nextdroneN;
            }
            break;

        case 1:        //-------------------------- FILM ANIMATE -------------------------------

            const startPosition = cam.object3D.position.clone();
            const target = new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z);
            const distance = startPosition.distanceTo(target);

            // Ensure camera looks at (0, 0, 0)
            cam.setAttribute('rotation', `0 ${Math.atan2(startPosition.x, startPosition.z) * (180 / Math.PI)} 0`);


            if (startRotate) {
                // Perform rotation
                rotationAngle += 0.005; // Adjust rotation speed as needed
                cam.object3D.rotation.y = rotationAngle;

                // Check if rotation completed (360 degrees)
                if (rotationAngle >= Math.PI * 2) {
                    startRotate = false; // Stop rotation
                    rotationAngle = 0; // Reset rotation angle
                    currentIndex = (currentIndex + 1) % targetPositions.length; // Move to the next target position
                    targetPosition = targetPositions[currentIndex];
                }
            } else {
                // Move to the target position
                if (distance > 0.1) {
                    const direction = target.clone().sub(startPosition).normalize();
                    const newPosition = startPosition.clone().add(direction.multiplyScalar(0.1)); // Move by a fixed distance
                    cam.setAttribute('position', newPosition);
                } else {
                    // Check if the camera position is (0, 0, 0) to start rotation
                    if (currentIndex === 4) {
                        startRotate = true;
                    } else {
                        currentIndex = (currentIndex + 1) % targetPositions.length; // Move to the next target position
                        targetPosition = targetPositions[currentIndex];
                    }
                }
            }
            break;

        case 2:        //-------------------------- CIRCLE ANIMATE -------------------------------

            q += 0.01;

            let qSin = Math.sin(q);
            let qCos = Math.cos(q);

            let scaledCos = r * qCos;
            let scaledSin = r * qSin;

            // Set the position of the camera entity
            cam.setAttribute('position', `${scaledCos} 5 ${scaledSin}`);
            break;

        case 3:
            // code block
            break;

        case 4:
            // code block
            break;
    }




    animationRef = requestAnimationFrame(animate);
}

// Start the animation loop
animate();

// Function to stop animation
function stopAnimation() {
    cancelAnimationFrame(animationRef);
}

// Function to preload the GLB model
function preloadModel(src) {
    return new Promise((resolve, reject) => {
        const loader = new THREE.GLTFLoader();
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
        loader.setDRACOLoader(dracoLoader);
        loader.load(src, resolve, undefined, reject);
    });
}


// Preload the GLB model
preloadModel('../GLB/vr-cavern.glb')
    .then(gltf => {
        // Model loaded successfully
        const modelContainer = document.getElementById('modelContainer');
        const model = document.createElement('a-entity');
        const modelId = 'loadedModel_' + Math.random().toString(36).substr(2, 9); // Generate unique ID
        model.setAttribute('id', modelId);
        model.setAttribute('gltf-model', `#${modelId}`);
        modelContainer.appendChild(model);
        console.log(modelId);

        // Set the GLTF model data
        const modelElement = document.getElementById(modelId);
        modelElement.setObject3D('gltf-model', gltf.scene);

        // Make the model visible
        model.setAttribute('visible', true);
    })
    .catch(error => {
        console.error('Error loading model(vr-cavern.glb): ', error);
    });
