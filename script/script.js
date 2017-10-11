var OrbitControls = require('three-orbit-controls')(THREE);

/*----------Сцена, камера и прочие плюшки---------*/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.z = 15;

var renderer = new THREE.WebGLRenderer({
	alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
var controls = new OrbitControls(camera, renderer.domElement);


/*---------Функция обратного вызова для загрузчика файла----------*/
function modelLoadedCallback(geometry, materials) {
		var object = new THREE.Mesh(geometry, materials);
		var xmin = ymin = zmin = Infinity;
		var xmax = ymax = zmax = -Infinity;

		for (var i = 0; i < geometry.vertices.length; i++) {
				var v = geometry.vertices[i];
				if (v.x < xmin)
						xmin = v.x;
				else if (v.x > xmax)
						xmax = v.x;
				if (v.y < ymin)
						ymin = v.y;
				else if (v.y > ymax)
						ymax = v.y;
				if (v.z < zmin)
						zmin = v.z;
				else if (v.z > zmax)
						zmax = v.z;
		}
		
		var centerX = (xmin+xmax)/2;
		var centerY = (ymin+ymax)/2; 
		var centerZ = (zmin+zmax)/2;
		var max = Math.max(centerX - xmin, xmax - centerX);
		max = Math.max(max, Math.max(centerY - ymin, ymax - centerY) );
		max = Math.max(max, Math.max(centerZ - zmin, zmax - centerZ) );
		var scale = 10/max;
		object.position.set( -centerX, -centerY, -centerZ );
				
		var model = new THREE.Object3D();
		model.add(object);
		model.scale.set(scale, scale, scale);
		rotateX = rotateY = 0;
		scene.add(model);
}

/*-------Загрузчик файла---------*/
var loader = new THREE.JSONLoader();
loader.load("script/table.js", modelLoadedCallback);


/*------------Освещение-----------*/
var light;
light = new THREE.DirectionalLight();
light.position.set(0,1,1);
scene.add(light);

document.body.appendChild(renderer.domElement);


/*--------Цикл анимации---------*/
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
