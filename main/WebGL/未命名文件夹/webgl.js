/*
	A custom 3D geometric object layered in front of the background (3 points)

	Object material (1 point)

	Lighting (1 point)
*/
let camera, scene, renderer, controls, mesh, light, model;
let image = document.querySelector('#ocean');



function init(){
	scene = new THREE.Scene();

	let width = window.innerWidth;
	let height = window.innerHeight;


	camera = new THREE.PerspectiveCamera(45, width/height, 1, 25000);
	camera.position.set(0,400,400);
	scene.add(camera);


	light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(1,1,1);
	scene.add(light);


	renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	document.body.appendChild(renderer.domElement);
}


function depthMap(){
	const canvas = document.getElementById('drawing');
	const context = canvas.getContext('2d');

	context.drawImage(image, 0, 0, 200, 200);

	let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	let data = imageData.data;

	return data;
}

function vertices(){

	/*
	let gloader = new THREE.GLTFLoader(); ////// ////

	gloader.load(
		'scene.gltf',
		function(gltf){
			model = gltf.scene;
			scene.add(model);
		})

	*/

	
	data = depthMap();

	let loader = new THREE.TextureLoader();

	let material = new THREE.MeshLambertMaterial({map: loader.load('ocean.jpg'), side: THREE.DoubleSide});
	let geometry = new THREE.PlaneGeometry(800, 800, 199, 199);




	mesh = new THREE.Mesh(geometry, material);

	mesh.rotation.x = -Math.PI / 2;

	geometry.computeVertexNormals();

	scene.add(mesh);

	console.log(data.length);
	console.log(mesh.geometry.attributes.position.array.length);

	for (let i = 0; i <= data.length; i+=4){
		let vertex = (i/4)*3;

		mesh.geometry.attributes.position.array[vertex + 2] = data[i];

	}
}

function animate(){
	renderer.render(scene, camera);
	controls.update();

	requestAnimationFrame(animate);
}



window.addEventListener('load', () => {
	init();
	vertices();
	animate();
})



