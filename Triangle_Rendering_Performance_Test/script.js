let numShapes = 500; // How many figures (Shapes)
let numTrianglesInShape = 200; // How many "triangles" in one figure (Shape)
// "tringles" რაოდენობა = numShapes * numTrianglesInShape

AFRAME.registerComponent('generate-shapes', {
    init: function () {
        const shapeContainer = this.el;
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff]; // Array of colors

        for (let i = 0; i < numShapes; i++) {
            const shapeGeometry = new THREE.BufferGeometry();

            // Generate 180 random vertices (0 or 1) for 20 triangles
            const vertices = new Float32Array(numTrianglesInShape * 9);
            for (let j = 0; j < numTrianglesInShape * 9; j++) {
                vertices[j] = Math.random() < 0.5 ? 0 : 1;
            }
            shapeGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

            // Randomly select a color from the array
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const shapeMaterial = new THREE.MeshBasicMaterial({ color: randomColor, side: THREE.DoubleSide });

            const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
            shape.position.set(Math.random() * 50 - 25, Math.random() * 50 - 25, Math.random() * 50 - 25);
            shapeContainer.setObject3D(`shape${i}`, shape);
        }

        this.startPerformanceMeasurement();
    },

    startPerformanceMeasurement: function () {
        const fpsDisplay = document.getElementById('fpsDisplay').children;
        let frameCount = 0;
        let startTime = performance.now();
        let totalTime = 0;

        const measure = () => {
            frameCount++;
            if (frameCount <= 100) {
                requestAnimationFrame(measure);
            } else {
                const endTime = performance.now();
                totalTime = (endTime - startTime) / 1000;
                const avgTimePerFrame = totalTime / 100;
                const triangles = numShapes * numTrianglesInShape;
                const avgTimePerTriangle = avgTimePerFrame / triangles;

                console.log(`Average time per frame: ${avgTimePerFrame.toFixed(6)} seconds`);
                console.log(`Average time per triangle: ${avgTimePerTriangle.toFixed(9)} seconds`);

                fpsDisplay[0].textContent = `Average time per frame: ${avgTimePerFrame.toFixed(6)} s`;
                fpsDisplay[1].textContent = `Average time per triangle: ${avgTimePerTriangle.toFixed(9)} s`;
            }
        };

        measure();
    }
});

document.querySelector('#shapes').setAttribute('generate-shapes', '');