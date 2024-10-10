////   JavaScript   ////

let numFigures = 12; // რამდენი ფიგურა (Shapes)

// ფუნქცია, რომელიც იწყებს შესრულების გაზომვას
function startPerformanceMeasurement() {
    const fpsDisplay = document.getElementById('fpsDisplay').children;
    let frameCount = 0;
    let startTime = performance.now();

    const updatePerformanceMetrics = () => {
        const currentTime = performance.now();
        const elapsedTime = (currentTime - startTime) / 1000; // წამებში
        const avgTimePerFrame = elapsedTime / frameCount;
        const triangles = 366659;
        const avgTimePerTriangle = avgTimePerFrame / triangles;

        fpsDisplay[1].textContent = `Triangles (Tr): ${triangles}`;
        fpsDisplay[2].textContent = `Draw calls (Geometries): ${numFigures}`;
        fpsDisplay[3].textContent = `(ATP)* frame: ${avgTimePerFrame.toFixed(6)} seconds`;
        fpsDisplay[4].textContent = `(ATP)* (Tr)*: ${avgTimePerTriangle.toFixed(9)} seconds`;
    };

    const measure = () => {
        frameCount++;
        requestAnimationFrame(measure);
    };

    measure();
    setInterval(updatePerformanceMetrics, 100);
}

// დაიწყეთ შესრულების გაზომვა
startPerformanceMeasurement();

////////////////////////////////////////////////   მოდელის დამატება

// ფუნქცია, რომელიც წინასწარ ტვირთავს GLB მოდელს
function preloadModel(src) {
    return new Promise((resolve, reject) => {
        const loader = new THREE.GLTFLoader();
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
        loader.setDRACOLoader(dracoLoader);
        loader.load(src, resolve, undefined, reject);
    });
}

// GLB მოდელის დამატების ფუნქცია
function addGlbModel(adres, nameGlb) {
    let fulladres = adres + nameGlb;

    // წინასწარი მოდელის ჩატვირთვა
    preloadModel(fulladres)
        .then(gltf => {
            const modelContainer = document.getElementById('modelContainer');
            const model = document.createElement('a-entity');
            const modelId = 'loadedModel_' + nameGlb;
            model.setAttribute('id', modelId);
            model.setAttribute('gltf-model', `#${modelId}`);
            modelContainer.appendChild(model);
            console.log(modelId);

            const modelElement = document.getElementById(modelId);
            modelElement.setObject3D('gltf-model', gltf.scene);

            model.setAttribute('visible', true);
        })
        .catch(error => {
            console.error('Error loading model( ' + nameGlb + ' ): ', error);
        });
}

// მოდელების დამატება
addGlbModel('./GLB/meore_scena/BIS_BIM_BIO/', 'muon-barrel-inner.glb');
addGlbModel('./GLB/meore_scena/BIS_BIM_BIO/', 'muon-barrel-middle.glb');
addGlbModel('./GLB/meore_scena/BIS_BIM_BIO/', 'muon-barrel-outer.glb');

// addGlbModel('./GLB/meore_scena/cavern/', 'pm15.glb');
// addGlbModel('./GLB/meore_scena/cavern/', 'px14.glb');
// addGlbModel('./GLB/meore_scena/cavern/', 'px15.glb');
// addGlbModel('./GLB/meore_scena/cavern/', 'px16.glb');
// addGlbModel('./GLB/meore_scena/cavern/', 'us15.glb');
// addGlbModel('./GLB/meore_scena/cavern/', 'usa15.glb');
addGlbModel('./GLB/meore_scena/cavern/', 'cavern.glb');

addGlbModel('./GLB/meore_scena/feets/', 'Feet-v1.glb');
