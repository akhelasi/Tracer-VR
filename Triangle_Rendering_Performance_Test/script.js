document.addEventListener('DOMContentLoaded', () => {
    const sceneEl = document.querySelector('a-scene');
    const modelContainer = document.getElementById('modelContainer');

    let startTime, endTime, frameCount = 0;
    const totalTriangles = 10000; // რამდენი სამკუთხედი გინდათ სცენაში
    const fpsDisplay = document.createElement('div');
    fpsDisplay.style.position = 'absolute';
    fpsDisplay.style.top = '10px';
    fpsDisplay.style.left = '10px';
    fpsDisplay.style.color = 'white';
    fpsDisplay.style.fontSize = '20px';
    document.body.appendChild(fpsDisplay);

    function createTriangle() {
        const entity = document.createElement('a-entity');
        entity.setAttribute('geometry', {
            primitive: 'triangle',
            vertexA: '0 0.5 0',
            vertexB: '0.5 -0.5 0',
            vertexC: '-0.5 -0.5 0'
        });
        entity.setAttribute('material', 'color', '#0077ff');
        entity.setAttribute('position', {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
            z: (Math.random() - 0.5) * 10
        });
        return entity;
    }

    function startTest() {
        startTime = performance.now();
        for (let i = 0; i < totalTriangles; i++) {
            const triangle = createTriangle();
            modelContainer.appendChild(triangle);
        }
        sceneEl.addEventListener('renderstart', measureFPS);
    }

    function measureFPS() {
        if (frameCount === 0) {
            startTime = performance.now();
        }
        frameCount++;

        if (frameCount === 100) {
            endTime = performance.now();
            const duration = (endTime - startTime) / 1000;
            const fps = frameCount / duration;
            const timePerTriangle = duration / (totalTriangles * frameCount);

            fpsDisplay.innerText = `FPS: ${fps.toFixed(2)}\nTime per Triangle: ${(timePerTriangle * 1000000).toFixed(2)} µs`;
            
            // stop measuring
            sceneEl.removeEventListener('renderstart', measureFPS);
        }
    }

    startTest();
});
