//////  JavaScript  //////


// Get the camera entity
const cam = document.getElementById('rig');
const camera = document.getElementById('camera');

window.addEventListener('load', function () {
    cam.setAttribute('position', '0 0 35');
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

let delta = 0.015;

let xMove;
let yMove;
let zMove;

let flyZones = [
    { x1: 13, x2: -16.5, y1: 12, y2: -10.5, z1: 21, z2: -21 }, //big zone in centre
    /////////////////////// many zones in floor ( bevri zonebi iatakshi ) 
    { x1: 6.5, x2: -7.7, y1: -10.5, y2: -12.5, z1: 22.4, z2: 13 },
    { x1: -7.7, x2: -14.3, y1: -10.5, y2: -12.5, z1: 19.8, z2: 13.2 },
    { x1: 2.6, x2: 1.8, y1: -10.5, y2: -12.5, z1: 13, z2: -13.3 },
    { x1: -1.8, x2: -2.6, y1: -10.5, y2: -12.5, z1: 13, z2: -13.3 },
    { x1: 1.8, x2: -1.8, y1: -10.5, y2: -12.5, z1: 13, z2: 7.1 },
    { x1: 1.8, x2: -1.8, y1: -11.2, y2: -12.5, z1: 4.6, z2: -4.8 },
    { x1: 1.8, x2: -1.8, y1: -10.5, y2: -11.2, z1: 7.1, z2: -7.4 },
    { x1: 1.8, x2: -1.8, y1: -10.5, y2: -12.5, z1: -7.4, z2: -13.3 },
    { x1: 1.3, x2: -1.3, y1: -10.5, y2: -13.5, z1: 6.6, z2: 5.3 },
    { x1: 1.3, x2: -1.3, y1: -10.5, y2: -13.5, z1: -5.4, z2: -6.8 },
    { x1: 6.5, x2: -7.7, y1: -10.5, y2: -12.5, z1: -13.3, z2: -22.4 },
    { x1: -7.7, x2: -14.3, y1: -10.5, y2: -12.5, z1: -13.3, z2: -19.8 },
    { x1: -12.5, x2: -16.5, y1: -10.5, y2: -12.5, z1: -1.7, z2: -12.6 },
    { x1: -12.5, x2: -16.5, y1: -11.9, y2: -12.5, z1: 2.7, z2: -1.7 },
    { x1: -12.5, x2: -16.5, y1: -10.5, y2: -12.5, z1: 8, z2: 2.7 },
    //////////////////////// zonebi saxuravshi // saxuravis radiusi 22.2
    { x1: 12, x2: -15.5, y1: 15, y2: 12, z1: 21, z2: -21 },
    { x1: 13, x2: -16.5, y1: 16.7, y2: 15, z1: 21, z2: -21 },
    //////////////////////// zonebi momgvalebuli kedeli-1
    { x1: -0.5, x2: -3, y1: -4.6, y2: -10.5, z1: 25, z2: 20 },
    { x1: 3.3, x2: 0.5, y1: -4.6, y2: -10.5, z1: 25, z2: 20 },
];

///////////////////////////// momgvalebuli zona saxuravshi
function saxuravi() {
    for (let i = 16.7; i <= 22.2; i = i + 0.01) {
        flyZones.push(
            {
                x1: Math.sqrt(22.2 * 22.2 - i * i) - 1.75,
                x2: (Math.sqrt(22.2 * 22.2 - i * i) * -1) - 1.75,
                y1: i,
                y2: 15,
                z1: 21,
                z2: -21
            }
        );
    }
}
saxuravi();

// ///////////////////////////// kutxe momgvalebuli saxuravis da momgvalebuli kedels shoris
// function saxuravKedeli() {
//     for (let i = 13; i >= -16.5; i = i - 0.01) {
//         flyZones.push(
//             {
//                 x1: i,
//                 x2: (i - 0.01),
//                 y1: (Math.sqrt(22.2 * 22.2 - i * i) - 1.75) > 15 ? (Math.sqrt(22.2 * 22.2 - i * i) - 1.75) : 15,
//                 y2: 15 < (Math.sqrt(22.2 * 22.2 - i * i) - 1.75) ? 15 : (Math.sqrt(22.2 * 22.2 - i * i) - 1.75),
//                 z1: (Math.sqrt(26 * 26 - i * i) - 1.75) > 21 ? (Math.sqrt(26 * 26 - i * i) - 1.75) : 21,
//                 z2: 21
//             }
//         );

//         flyZones.push(
//             {
//                 x1: i,
//                 x2: (i - 0.01),
//                 y1: (Math.sqrt(22.2 * 22.2 - i * i) - 1.75) > 15 ? (Math.sqrt(22.2 * 22.2 - i * i) - 1.75) : 15,
//                 y2: 15 < (Math.sqrt(22.2 * 22.2 - (i + 1.75) * (i + 1.75)) - 1.75) ? 15 : (Math.sqrt(22.2 * 22.2 - i * i) - 1.75),
//                 z1: -21,
//                 z2: (Math.sqrt(26 * 26 - i * i) - 1.75) * -1 < -21 ? (Math.sqrt(26 * 26 - i * i) - 1.75) * -1 : -21
//             }
//         );
//     }
// }
// saxuravKedeli();

///////////////////////////// momgvalebuli zona kedeli-1
function kedeli1() {

    for (let i = 21; i <= 26; i = i + 0.01) {

        let X1 = (Math.sqrt(26 * 26 - i * i) - 1.75)
        let X2 = ((Math.sqrt(26 * 26 - i * i) * -1) - 1.75);

        if (X1 > 13) {
            X1 = 13
        }

        if (X2 < -16.5) {
            X2 = -16.5
        }

        if (i <= 23) {
            flyZones.push(
                {
                    x1: X1,
                    x2: X2,
                    y1: -4.6,
                    y2: -10.5,
                    z1: i,
                    z2: 21
                }
            );
        }

        if (i >= 24.8) {
            flyZones.push(
                {
                    x1: X1,
                    x2: X2,
                    y1: -4.6,
                    y2: -10.5,
                    z1: i,
                    z2: 24.8
                }
            );
        }

        flyZones.push(
            {
                x1: (Math.sqrt(26 * 26 - i * i) - 1.75) > 13 ? 13 : (Math.sqrt(26 * 26 - i * i) - 1.75),
                x2: ((Math.sqrt(26 * 26 - i * i) * -1) - 1.75) < -16.5 ? -16.5 : ((Math.sqrt(26 * 26 - i * i) * -1) - 1.75),
                y1: 12,
                y2: 4.5,
                z1: i,
                z2: 21
            }
        );

        flyZones.push(
            {
                x1: Math.sqrt(26 * 26 - i * i) - 1.75,
                x2: 4.5,
                y1: 4.5,
                y2: -10.5,
                z1: i,
                z2: 21
            }
        );

        flyZones.push(
            {
                x1: -4.5,
                x2: (Math.sqrt(26 * 26 - i * i) * -1) - 1.75,
                y1: 4.5,
                y2: -10.5,
                z1: i,
                z2: 21
            }
        );
    }
}
kedeli1();


///////////////////////////// momgvalebuli zona kedeli-2
function kedeli2() {
    for (let i = -21; i >= -26; i = i - 0.01) {


        let X1 = (Math.sqrt(26 * 26 - i * i) - 1.75)
        let X2 = ((Math.sqrt(26 * 26 - i * i) * -1) - 1.75);

        if (X1 > 13) {
            X1 = 13
        }

        if (X2 < -16.5) {
            X2 = -16.5
        }

        if (i >= -23) {
            flyZones.push(
                {
                    x1: X1,
                    x2: X2,
                    y1: -4.6,
                    y2: -10.5,
                    z1: -21,
                    z2: i
                }
            );
        }

        if (i <= -24.8) {
            flyZones.push(
                {
                    x1: X1,
                    x2: X2,
                    y1: -4.6,
                    y2: -10.5,
                    z1: -24.8,
                    z2: i
                }
            );
        }

        flyZones.push(
            {
                x1: (Math.sqrt(26 * 26 - i * i) - 1.75) > 13 ? 13 : (Math.sqrt(26 * 26 - i * i) - 1.75),
                x2: ((Math.sqrt(26 * 26 - i * i) * -1) - 1.75) < -16.5 ? -16.5 : ((Math.sqrt(26 * 26 - i * i) * -1) - 1.75),
                y1: 12,
                y2: 5,
                z1: -21,
                z2: i
            }
        );

        flyZones.push(
            {
                x1: Math.sqrt(26 * 26 - i * i) - 1.75,
                x2: 4.5,
                y1: 5,
                y2: -10.5,
                z1: -21,
                z2: i
            }
        );

        flyZones.push(
            {
                x1: -4.5,
                x2: (Math.sqrt(26 * 26 - i * i) * -1) - 1.75,
                y1: 5,
                y2: -10.5,
                z1: -21,
                z2: i
            }
        );
    }
}
kedeli2();



function xyzMove(camPos, deltaX, deltaY, deltaZ) {

    let newX = camPos.x - deltaX;
    let newY = camPos.y - deltaY;
    let newZ = camPos.z - deltaZ;

    let curentZoneIndex = -1, nextZoneIndex = -1;

    for (let i = 0; i < flyZones.length; i++) {
        let thisZone = flyZones[i];

        if (camPos.x <= thisZone.x1 &&
            camPos.x >= thisZone.x2 &&
            camPos.y <= thisZone.y1 &&
            camPos.y >= thisZone.y2 &&
            camPos.z <= thisZone.z1 &&
            camPos.z >= thisZone.z2
        ) curentZoneIndex = i;
    }

    for (let i = 0; i < flyZones.length; i++) {
        let nextZone = flyZones[i];

        if (newX <= nextZone.x1 &&
            newX >= nextZone.x2 &&
            newY <= nextZone.y1 &&
            newY >= nextZone.y2 &&
            newZ <= nextZone.z1 &&
            newZ >= nextZone.z2
        ) nextZoneIndex = i;
    }

    if (nextZoneIndex < 0) {
        let thisZone = flyZones[curentZoneIndex];

        if (newX <= thisZone.x1 &&
            newX >= thisZone.x2
        ) xMove = 1; else xMove = 0;


        if (newY <= thisZone.y1 &&
            newY >= thisZone.y2
        ) yMove = 1; else yMove = 0;

        if (newZ <= thisZone.z1 &&
            newZ >= thisZone.z2
        ) zMove = 1; else zMove = 0;

        // if ( ( xMove + yMove + zMove ) === 1) {
        //     if (xMove){

        //     }
        // }
    } else {
        xMove = 1;
        yMove = 1;
        zMove = 1;
    }
}

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
            if (nextdroneN != droneN) {

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

            q += 0.003;

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
            let deltaX = delta * Math.sin(radY);
            let deltaY = -1 * delta * Math.sin(radX);
            let deltaZ = delta * Math.cos(radY);

            let newX,
                newY,
                newZ,
                newPosition;

            // Update the position components
            xyzMove(new THREE.Vector3(parseFloat(camPos.x), parseFloat(camPos.y), parseFloat(camPos.z)), deltaX, deltaY, deltaZ);

            newX = parseFloat(camPos.x) - xMove * deltaX;
            newY = parseFloat(camPos.y) - yMove * deltaY;
            newZ = parseFloat(camPos.z) - zMove * deltaZ;

            newPosition = `${newX} ${newY} ${newZ}`; // Move by a fixed distance


            // Set the new position
            cam.setAttribute('position', newPosition);
            break;
    }
    // console.log('COS(x): ', Math.cos(camera.getAttribute('rotation').x * (Math.PI / 180)),'COS(y): ', Math.cos(camera.getAttribute('rotation').y * (Math.PI / 180)),'COS(z): ', Math.cos(camera.getAttribute('rotation').z * (Math.PI / 180)))

    // animationRef = requestAnimationFrame(animate);
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();

// // Function to stop animation
// function stopAnimation() {
//     cancelAnimationFrame(animationRef);
// }

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

function addGlbModel(adres, nameGlb) {

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

addGlbModel('../GLB/trecer-geometry/vr/', 'UX15.glb');
addGlbModel('../GLB/models/core/support-structure/mechanical-structure/feet/', 'feet.glb');

addGlbModel('../GLB/models/core/main-components/platforms/ho-platforms/side-a/', 'ho-side-a-platforms.glb');
addGlbModel('../GLB/models/core/main-components/platforms/ho-platforms/side-c/', 'ho-side-c-platforms.glb');
addGlbModel('../GLB/models/core/main-components/platforms/hs-platforms/us15-platforms/', 'hs-us.glb');
addGlbModel('../GLB/models/core/main-components/platforms/hs-platforms/usa15-platforms/', 'hs-usa.glb');
