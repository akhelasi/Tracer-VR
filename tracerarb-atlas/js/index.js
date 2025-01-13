//      JavaScript      //


window.addEventListener('load', () => {
  const camera = document.querySelector('[camera]');

  const marker1 = document.querySelector('#marker1'); // main marker1
  const marker2 = document.querySelector('#marker2'); // main marker2
  let mainmarker = marker1;


  const entMarker = document.querySelector('#entmarker1'); // hidden marker entity

  const entModel1 = document.querySelector('#entmodel1');
  const entModel2 = document.querySelector('#entmodel2');

  // const model = document.querySelector('.clickable') // model in entmarker
  // const distanceDisplay = document.querySelector('#distaceDisplay'); // distance display element

  let entMarkerAdded = false; // track if entMarker1 is added
  // let check;
  let stabilizeInterval; // interval for stabilizeModel
  // let modelRotInt;

  let isNFTVisible = false;

  let howManyNFTVisible = 0;

  window.isMemoryMode = true;

  // კამერის პოზიციის მიღება
  const cameraPos = new THREE.Vector3();
  camera.object3D.getWorldPosition(cameraPos);


  function stabilizeModel() {
    if (window.isMemoryMode) { // თუ Memory რეჟიმში ვართ, გააკეთე

      const cameraPosition = camera.object3D.position;
      const markerPosition = mainmarker.object3D.position;
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

  }

  
  function stabilizeRotation() {
    if (window.isMemoryMode) { // თუ Memory რეჟიმში ვართ, გააკეთე
      const markerRotation = mainmarker.object3D.rotation;
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
  }


  marker1.addEventListener('markerFound', () => {
    howManyNFTVisible++;
    

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
    stabilizeInterval = setInterval(() => { // თუ Memory რეჟიმში ვართ, გააკეთე
      if (window.isMemoryMode) {
        stabilizeModel();
        stabilizeRotation();


        // მარკერების ხილვადობის შემოწმება
        const marker1Visible = marker1.getAttribute('visible');
        const marker2Visible = marker2.getAttribute('visible');

        // ორივე მარკერის ხილვადობის შემოწმება
        if (marker1Visible && marker2Visible) {
          const marker1Pos = new THREE.Vector3();
          const marker2Pos = new THREE.Vector3();
          marker1.object3D.getWorldPosition(marker1Pos);
          marker2.object3D.getWorldPosition(marker2Pos);

          const screenCenter = new THREE.Vector3(0, 0, -100).sub(cameraPos).normalize();
          const toMarker1 = marker1Pos.clone().sub(cameraPos).normalize();
          const toMarker2 = marker2Pos.clone().sub(cameraPos).normalize();

          const angleToMarker1 = screenCenter.dot(toMarker1);
          const angleToMarker2 = screenCenter.dot(toMarker2);

          if (angleToMarker1 > angleToMarker2) {
            entModel1.setAttribute('visible', true);
            entModel2.setAttribute('visible', false);
            mainmarker = marker1;
          } else {
            entModel1.setAttribute('visible', false);
            entModel2.setAttribute('visible', true);
            mainmarker = marker2;
          }
        } else if (marker1Visible) {
          entModel1.setAttribute('visible', true);
          entModel2.setAttribute('visible', false);
          mainmarker = marker1;
        } else if (marker2Visible) {
          entModel1.setAttribute('visible', false);
          entModel2.setAttribute('visible', true);
          mainmarker = marker2;
        } else {
          entModel1.setAttribute('visible', false);
          entModel2.setAttribute('visible', false);
        }

      } 
    }, 25);

    if (window.isMemoryMode) {
      // Get marker1's position and rotation
      const markerPosition = marker1.object3D.position;
      const markerRotation = marker1.object3D.rotation;

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
    isNFTVisible = true;
    console.log("NFT Marker Found");
  });

  marker1.addEventListener('markerLost', () => {
    howManyNFTVisible--;
    if ( howManyNFTVisible === 0 ) {
        
      // clearInterval(check);
      clearInterval(stabilizeInterval); // stop stabilizeModel interval

      if (window.isMemoryMode) {
        entMarkerAdded = false;
        entMarker.setAttribute('visible', 'false');
        console.log("Marker lost and entMarker hidden.");
      } else {
        console.log("Marker lost but Memory mode is deactive. entMarker remains visible.");
      }
      isNFTVisible = false;
      console.log("NFT Marker Lost");
    }
  });

  marker2.addEventListener('markerFound', () => {
    howManyNFTVisible++;
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
    stabilizeInterval = setInterval(() => { // თუ Memory რეჟიმში ვართ, გააკეთე
      if (window.isMemoryMode) {
        stabilizeModel();
        stabilizeRotation();

        
        // მარკერების ხილვადობის შემოწმება
        const marker1Visible = marker1.getAttribute('visible');
        const marker2Visible = marker2.getAttribute('visible');

        // ორივე მარკერის ხილვადობის შემოწმება
        if (marker1Visible && marker2Visible) {
          const marker1Pos = new THREE.Vector3();
          const marker2Pos = new THREE.Vector3();
          marker1.object3D.getWorldPosition(marker1Pos);
          marker2.object3D.getWorldPosition(marker2Pos);

          const screenCenter = new THREE.Vector3(0, 0, -100).sub(cameraPos).normalize();
          const toMarker1 = marker1Pos.clone().sub(cameraPos).normalize();
          const toMarker2 = marker2Pos.clone().sub(cameraPos).normalize();

          const angleToMarker1 = screenCenter.dot(toMarker1);
          const angleToMarker2 = screenCenter.dot(toMarker2);

          if (angleToMarker1 > angleToMarker2) {
            entModel1.setAttribute('visible', true);
            entModel2.setAttribute('visible', false);
          } else {
            entModel1.setAttribute('visible', false);
            entModel2.setAttribute('visible', true);
          }
        } else if (marker1Visible) {
          entModel1.setAttribute('visible', true);
          entModel2.setAttribute('visible', false);
        } else if (marker2Visible) {
          entModel1.setAttribute('visible', false);
          entModel2.setAttribute('visible', true);
        } else {
          entModel1.setAttribute('visible', false);
          entModel2.setAttribute('visible', false);
        }

      } 
    }, 25);


    if (window.isMemoryMode) {
      // Get marker1's position and rotation
      const markerPosition = marker1.object3D.position;
      const markerRotation = marker1.object3D.rotation;

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
    isNFTVisible = true;
    console.log("NFT Marker Found");
  });

  marker2.addEventListener('markerLost', () => {
    howManyNFTVisible--;
    if ( howManyNFTVisible === 0 ) {
        
      // clearInterval(check);
      clearInterval(stabilizeInterval); // stop stabilizeModel interval

      if (window.isMemoryMode) {
        entMarkerAdded = false;
        entMarker.setAttribute('visible', 'false');
        console.log("Marker lost and entMarker hidden.");
      } else {
        console.log("Marker lost but Memory mode is deactive. entMarker remains visible.");
      }
      isNFTVisible = false;
      console.log("NFT Marker Lost");
    }
  });

  
  // ნებისმიერ დროს ხილვადობის შემოწმება
  console.log(`NFT is ${isNFTVisible ? "Visible" : "Not Visible"}`);

  let memoryButton = document.getElementById('memory-button');



  memoryButton.addEventListener('click', () => {

    if (!window.isMemoryMode) {
      // Memory რეჟიმის ჩართვა
      window.isMemoryMode = true; // ჩართე Memory რეჟიმი

      entMarker.setAttribute('visible', (howManyNFTVisible > 0) );

      memoryButton.classList.remove("deactive-button"); 
      memoryButton.classList.add("active-button"); 

      console.log("Memory mode activated!")
    } else {
      // Memory რეჟიმის გათიშვა
      window.isMemoryMode = false;

      memoryButton.classList.remove("active-button"); 
      memoryButton.classList.add("deactive-button"); 

      console.log("Memory mode deactivated");
    }

    if(howManyNFTVisible > 0){


      // Call stabilizeModel every 25 milliseconds
      stabilizeInterval = setInterval(() => { // თუ Memory რეჟიმში ვართ, გააკეთე
        if (window.isMemoryMode) {
          stabilizeModel();
          stabilizeRotation();

          
          // მარკერების ხილვადობის შემოწმება
          const marker1Visible = marker1.getAttribute('visible');
          const marker2Visible = marker2.getAttribute('visible');

          // ორივე მარკერის ხილვადობის შემოწმება
          if (marker1Visible && marker2Visible) {
            const marker1Pos = new THREE.Vector3();
            const marker2Pos = new THREE.Vector3();
            marker1.object3D.getWorldPosition(marker1Pos);
            marker2.object3D.getWorldPosition(marker2Pos);

            const screenCenter = new THREE.Vector3(0, 0, -100).sub(cameraPos).normalize();
            const toMarker1 = marker1Pos.clone().sub(cameraPos).normalize();
            const toMarker2 = marker2Pos.clone().sub(cameraPos).normalize();

            const angleToMarker1 = screenCenter.dot(toMarker1);
            const angleToMarker2 = screenCenter.dot(toMarker2);

            if (angleToMarker1 > angleToMarker2) {
              entModel1.setAttribute('visible', true);
              entModel2.setAttribute('visible', false);
            } else {
              entModel1.setAttribute('visible', false);
              entModel2.setAttribute('visible', true);
            }
          } else if (marker1Visible) {
            entModel1.setAttribute('visible', true);
            entModel2.setAttribute('visible', false);
          } else if (marker2Visible) {
            entModel1.setAttribute('visible', false);
            entModel2.setAttribute('visible', true);
          } else {
            entModel1.setAttribute('visible', false);
            entModel2.setAttribute('visible', false);
          }

        } 
      }, 25);

      if (window.isMemoryMode) {
        // Get marker1's position and rotation
        const markerPosition = marker1.object3D.position;
        const markerRotation = marker1.object3D.rotation;

        // Update the position and rotation directly using object3D
        entMarker.object3D.position.set(markerPosition.x, markerPosition.y, markerPosition.z);
        entMarker.object3D.rotation.set(markerRotation.x, markerRotation.y, markerRotation.z);

        // Make the entmarker1 visible
        entMarker.setAttribute('visible', 'true');

        // Mark that entmarker1 has been added
        entMarkerAdded = true;

      }

    } else {
            // clearInterval(check);
      clearInterval(stabilizeInterval); // stop stabilizeModel interval

      if (window.isMemoryMode) {
        entMarkerAdded = false;
        entMarker.setAttribute('visible', 'false');
        console.log("Marker lost and entMarker hidden.");
      } else {
        console.log("Marker lost but Memory mode is deactive. entMarker remains visible.");
      }
    }
  });
});
