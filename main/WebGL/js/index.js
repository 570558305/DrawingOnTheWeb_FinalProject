/*
document.querySelector('#dropdown').onchange = function(event){
  var currentValue = event.currentTarget.value;
  console.log(currentValue);

  accessData = async() => {
    let url = 'https://www.fishwatch.gov/api/species'+currentValue;
    console.log(url)
    
    let response = await fetch(url);
    if (response.ok) {
      let json = await response.json();
      console.log(json);
      fishData(json)

    } else{
      console.log('Error: ' + response.status)
    }

  }

  fishData = (response) => {

  }

  accessData()
  fishData()

}
*/








let camera, scene, renderer, controls, mesh, light, model;
let image = document.querySelector('#ocean');


function init() {
  scene = new THREE.Scene();
  let width = window.innerWidth;
  let height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, width/height, 1, 25000);
  camera.position.z = 10; // back camera out
  camera.position.y = -10; // move camera up
  scene.add(camera);






  const lat = 30;
  const lng = 120;

  fetch(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=2021-04-22&end=2021-04-23`, {
  headers: {
    'Authorization': '7386f032-a375-11eb-8d12-0242ac130002-7386f0a0-a375-11eb-8d12-0242ac130002'
  }
  }).then((response) => response.json()).then((jsonData) => {
  // Do something with response data.

    var datas = []
    var counter = 0

    var data1 = jsonData.data[0].type
    var data2 = jsonData.data[1].type
    var data3 = jsonData.data[2].type
    var data4 = jsonData.data[3].type

    datas.push(data1)
    datas.push(data2)
    datas.push(data3)
    datas.push(data4)



    for (let i = 0; i < datas.length; i++){
      if (datas[i] == 'high'){
        counter += 1
      }
    }

    if (counter / 4 >= 2/3 ){
      let light = new THREE.DirectionalLight(0xff0000, 1);
      light.position.set(1, 1, 1);
      scene.add(light);

    }


    else if (counter / 4 >= 1/3){
      let light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(1, 1, 1);
      scene.add(light);
    }


    else{
      let light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(1, 1, 1);
      scene.add(light);

    }

  })






  scene.fog = new THREE.Fog(0xffffff, 1, 1000);




  let textureLoader = new THREE.TextureLoader();
  textureLoader.load('js/ocean.png', function(texture){
    let material = new THREE.MeshPhongMaterial({map: texture});



    // instantiate a GL Transmission Format loader
    let loader = new THREE.GLTFLoader();
    // load a glTF resource
    loader.load(
      // resource URL
      'scene.gltf',
      // called when the resource is loaded
      function(gltf) {
        model = gltf.scene;
        scene.add(model);
        //texture.flipY = false; 
        //model.material.map =textureLoader.load(texture);


        //model.children[0].material.map = textureLoader.load('js/ocean.png');
        
        /*
        var newm = new THREE.MeshPhongMaterial({color: 0xff0000});
        model.traverse((o) => {
          if (o.isMesh) o.material = newm;
        });
        */
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
      }
    );




  });




  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);
}


function heightMap() {
  const canvas = document.getElementById('drawing');
  const context = canvas.getContext('2d');

  context.drawImage(image, 0, 0, 200, 200);

  let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  console.log('Width: ' + imageData.width);
  console.log('Height: ' + imageData.height);

  let data = imageData.data;
  return data;
}


function vertices() {
  data = heightMap();

  let loader = new THREE.TextureLoader();

  let material = new THREE.MeshLambertMaterial({map: loader.load('js/ocean.jpg'), side: THREE.DoubleSide});

  // width, height, segments
  let geometry = new THREE.PlaneGeometry(800, 800, 199, 199);
  mesh = new THREE.Mesh(geometry, material);

  console.log(mesh.geometry.attributes.position.array.length);

  // generate height based on lightness of heigh map pixel
  for (let i = 0; i < data.length; i+=4 ) {
    // visit the red channel of every pixel from the height map for vertex Z axis
    mesh.geometry.attributes.position.array[i /4 * 3 + 2] = data[i];

  }

  mesh.rotation.x = -Math.PI / 2; // rotate flat

  // necessary for adding light to the scene
  geometry.computeVertexNormals();

  scene.add(mesh);
  
}


function animate() {


  let date = new Date(); // get date string
  let timer = date.getTime() * 0.0002; // get time string, changing speed
  //light.position.x = 800 * Math.cos(timer); // multiplier changes X coordinate
  //light.position.z = 800 * Math.sin(timer); // multiplier changes Z coordinate


  camera.position.x = 10 * Math.cos(timer); // multiplier changes X coordinate
  camera.position.z = -90 * Math.sin(timer); // multiplier changes Z coordinate

  if (model) {
    model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);

  controls.update();
  requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
  init();
  vertices();
  animate();
})
















