let camera, scene, renderer, controls, model;

function init() {
  scene = new THREE.Scene();
  let width = window.innerWidth;
  let height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
  camera.position.z = 12; // back camera out
  camera.position.y = 12; // move camera up
  scene.add(camera);

  let light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  // instantiate a GL Transmission Format loader
  let loader = new THREE.GLTFLoader();

  // load a glTF resource
  loader.load(
    // resource URL
    'media/scene.gltf',
    // called when the resource is loaded
    function(gltf) {
      model = gltf.scene;
      scene.add(model);

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Scene
      gltf.scenes; // Array<THREE.Scene>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object
    }
  );

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  if (model) {
    model.rotation.y += 0.01;
  }

  controls.update();
}

init();
animate();