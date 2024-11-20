//      JavaScript      //


window.addEventListener('load', () => {
  const camera = document.querySelector('[camera]');
  const marker = document.querySelector('#marker1'); // main marker
  const entMarker = document.querySelector('#entmarker1'); // hidden marker entity
  // const distanceDisplay = document.querySelector('#distance-display'); // distance display element

  let entMarkerAdded = false; // track if entMarker1 is added
  // let check;
  let stabilizeInterval; // interval for stabilizeModel
  // let modelRotInt;


  function stabilizeModel() {
    const cameraPosition = camera.object3D.position;
    const markerPosition = marker.object3D.position;
    const entMarkerPosition = entMarker.object3D.position;
    const distanceToMarker = cameraPosition.distanceTo(markerPosition);
    const distanceMarkerToEnt = markerPosition.distanceTo(entMarkerPosition);
    // Check the stabilization condition
    if (distanceToMarker / 30 < distanceMarkerToEnt) {
      // Update entmarker1's position to match marker1
      // entMarker.object3D.position.set(markerPosition.x, markerPosition.y, markerPosition.z);
      entMarker.object3D.position.set( 0, 0, (0 - distanceToMarker) );
      console.log("Updated entMarker position to match marker1");
    } else {
      console.log("entMarker position remains the same");
    }
  }

  
  function stabilizeRotation() {
    const markerRotation = marker.object3D.rotation;
    const entMarkerRotation = entMarker.object3D.rotation;

    // Convert rotations from radians to degrees
    const markerRotX = THREE.MathUtils.radToDeg(markerRotation.x);
    const markerRotY = THREE.MathUtils.radToDeg(markerRotation.y);
    const markerRotZ = THREE.MathUtils.radToDeg(markerRotation.z);

    const entMarkerRotX = THREE.MathUtils.radToDeg(entMarkerRotation.x);
    const entMarkerRotY = THREE.MathUtils.radToDeg(entMarkerRotation.y);
    const entMarkerRotZ = THREE.MathUtils.radToDeg(entMarkerRotation.z);

    // Check if any rotation difference exceeds 5 degrees
    if (Math.abs(markerRotX - entMarkerRotX) > 5) {
      entMarkerRotation.x = markerRotation.x;
    }
    if (Math.abs(markerRotY - entMarkerRotY) > 5) {
      entMarkerRotation.y = markerRotation.y;
    }
    if (Math.abs(markerRotZ - entMarkerRotZ) > 5) {
      entMarkerRotation.z = markerRotation.z;
    }
  }


  marker.addEventListener('markerFound', () => {
    // let distance;

    // check = setInterval(() => {
    //   const cameraPosition = camera.object3D.position;
    //   const markerPosition = marker.object3D.position;
    //   distance = cameraPosition.distanceTo(markerPosition)

    //   // Convert distance to centimeters and update the display
    //   const distanceInCm = (distance * 100).toFixed(2); // convert to centimeters and round to 2 decimal places
    //   distanceDisplay.innerHTML = `Distance: ${distanceInCm} cm`;

    // }, 500);

    // Call stabilizeModel every 25 milliseconds
    stabilizeInterval = setInterval(() => {
      stabilizeModel();
      stabilizeRotation();
    }, 25);

  });

  marker.addEventListener('markerLost', () => {
    // clearInterval(check);
    clearInterval(stabilizeInterval); // stop stabilizeModel interval
  })

  marker.addEventListener('markerFound', () => {
    if (!entMarkerAdded) {
      // Get marker1's position and rotation
      const markerPosition = marker.object3D.position;
      const markerRotation = marker.object3D.rotation;

      // Update the position and rotation directly using object3D
      entMarker.object3D.position.set(markerPosition.x, markerPosition.y, markerPosition.z);
      entMarker.object3D.rotation.set(markerRotation.x, markerRotation.y, markerRotation.z);

      // Make the entmarker1 visible
      entMarker.setAttribute('visible', 'true');

      // Mark that entmarker1 has been added
      entMarkerAdded = true;


      // Rotation update interval (every 50ms for 20 updates per second)
      // modelRotInt = setInterval(() => {
      //   const updatedRotation = marker.object3D.rotation;
      //   entMarker.object3D.rotation.set(updatedRotation.x, updatedRotation.y, updatedRotation.z);
      // }, 50); // 50ms interval for 20 updates per second
      
    }
  });

  marker.addEventListener('markerLost', () => {
    // clearInterval(modelRotInt);
    entMarkerAdded = false;
    entMarker.setAttribute('visible', 'false');
    // Optionally hide or do something when marker is lost
  });
});


// const marker = document.querySelector('a-nft');
// let lastPosition = new THREE.Vector3();
// let tolerance = 10;
// const entmarker = document.querySelector('#entmarker1');

// marker.addEventListener('markerFound', () => {
//   setInterval(() => {

//     let currentMarkPosition = marker.object3D.position;
//     let currentEntPosition = entmarker.object3D.position;
//     if (lastPosition.distanceTo(currentMarkPosition) > tolerance) {
//       // განაახლე პოზიცია მხოლოდ მაშინ, თუ მნიშვნელოვნად შეიცვალა
//       lastPosition.copy(currentMarkPosition);
//     } else {
//       // გააჩერე მოდელი, თუ მცირე მერყეობაა
//       entmarker.object3D.position.copy(lastPosition);
//     }
//   }, 100); // განაახლე ყოველ 100 ms-ში
// });
