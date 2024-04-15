//////  JavaScript  //////


// Get the camera entity
const cam = document.getElementById('rig');
const camera = document.getElementById('camera');


window.addEventListener('load', function () {
    cam.setAttribute('position','0 0 35');
});

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

let currentIndex = 3;
let targetPosition = targetPositions[currentIndex];

let animationRef = 0;
let startRotate = false; // Flag to indicate if rotation should start
let rotationAngle = 0; // Track the rotation angle

////////////////////////////////////////////////////////////////////////// CIRCLE's options

let q = 0; // circle animation's cvladi
let r = 12; // circle's radius

////////////////////////////////////////////////////////////////////////// FREE FLY's options

let maxDistance = 50;
let minDistance = 3;

const nextDronePositions = [
    { x: 0, y: 0, z: 35 },
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
            // console.log(nextdroneN);
            if ( nextdroneN != droneN ) {

                currentIndex = 3;
                targetPosition = targetPositions[currentIndex];
                animationRef = 0;
                startRotate = false; // Flag to indicate if rotation should start
                rotationAngle = 0; // Track the rotation angle
                cam.setAttribute('rotation', `0 0 0`);

                q = 0;

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

            if (distancedronePosition > 0.3 && nextdroneN !== 4) {
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

        case 3:        //-------------------------- EXIT back to start page -------------------------------
            droneN = 1;
            window.location.href = "../../index.html";
            break;

        case 4:        //-------------------------- Free Fly ANIMATE -------------------------------
            let cameraRot = camera.getAttribute('rotation');
            let camPos = cam.getAttribute('position');
            const centerPos = new THREE.Vector3(0, 0, 0);
            const distanceFromCenter = camPos.distanceTo(centerPos);

            // Convert rotation degrees to radians
            let radX = cameraRot.x * Math.PI / 180;
            let radY = cameraRot.y * Math.PI / 180;

            // Calculate the new position based on camera rotation
            let delta = 0.04;
            let deltaX = delta * Math.sin(radY);
            let deltaY = -1 * delta * Math.sin(radX);
            let deltaZ = delta * Math.cos(radY);

            let newX,
                newY,
                newZ,
                newPosition;

            // Update the position components
            if ( distanceFromCenter < maxDistance && distanceFromCenter > minDistance) {
                newX = parseFloat(camPos.x) - deltaX;
                newY = parseFloat(camPos.y) - deltaY;
                newZ = parseFloat(camPos.z) - deltaZ;
                newPosition = `${newX} ${newY} ${newZ}`; // Move by a fixed distance

            } else {
                let distanceRecovery = distanceFromCenter < ((minDistance + maxDistance) / 2) ? -1 * (delta + (delta / 10)) : delta + (delta / 10);
                const direction = centerPos.clone().sub(camPos).normalize();
                newPosition = camPos.clone().add(direction.multiplyScalar(distanceRecovery)); // Move by a fixed distance
            }

            // Set the new position
            cam.setAttribute('position', newPosition);
            break;
    }
    // console.log('COS(x): ', Math.cos(camera.getAttribute('rotation').x * (Math.PI / 180)),'COS(y): ', Math.cos(camera.getAttribute('rotation').y * (Math.PI / 180)),'COS(z): ', Math.cos(camera.getAttribute('rotation').z * (Math.PI / 180)))

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

function addGlbModel(adres ,nameGlb) {

    let fulladres = adres + nameGlb;

// Preload the GLB model
preloadModel(fulladres)
    .then(gltf => {
        // Model loaded successfully
        const modelContainer = document.getElementById('modelContainer');
        const model = document.createElement('a-entity');
        // const modelId = 'loadedModel_' + Math.random().toString(36).substr(2, 9); // Generate unique ID
        const modelId = 'loadedModel_' + nameGlb;
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
        console.error('Error loading model( ' + nameGlb + ' ): ', error);
    });
}

addGlbModel('../GLB/models/core/support-structure/mechanical-structure/feet/', 'feet(asanadan).glb');
addGlbModel('../GLB/models/core/main-components/magnet-system/toroid/', 'op-bt-vacuum-vessel(asanadan).glb');
addGlbModel('../GLB/models/core/support-structure/mechanical-structure/warm-structure/', 'op-Warm-Structure(asanadan).glb');
