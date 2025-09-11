import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Clock, AnimationMixer } from 'three';
var scene, renderer, camera, clock, mixer, controls, invisibleBox, t = 0;

const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(97, 7, 1),      // point de départ
    new THREE.Vector3(60, 4, -12),    // premier point de contrôle
    new THREE.Vector3(25, 6, -21),   // deuxième point de contrôle
    new THREE.Vector3(-4, -9, -17),      // point d'arrivée
    new THREE.Vector3(-28, 12, 20),
    new THREE.Vector3(-46, 13, -30),
    new THREE.Vector3(-85, 9, -58),
    new THREE.Vector3(-129, 13, -80),
);
function toRender() {
    if (mixer && clock) {
        const delta = clock.getDelta();
        mixer.update(delta);
    }
    // if (invisibleBox) {
    //     animationdragon();
    // }
    animate();
    renderer.render(scene, camera);
    requestAnimationFrame(toRender);
}

function animate() {
    t += 0.0005; // vitesse
    if (t > 1) t = 0;
    const pos = curve.getPoint(t);
    invisibleBox.position.copy(pos);
}

function start() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    const textuerciel = new THREE.TextureLoader().load('modelsandtextures/textures/ciel-nuages.webp');
    scene.background = textuerciel;

    // camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(103, 37, -25);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // light
    // var myAmbientLight = new THREE.AmbientLight(0xd0d0d0, 0.3);
    // scene.add(myAmbientLight);

    var myDirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
    myDirectionalLight.castShadow = true;
    myDirectionalLight.position.set(102, 37, -25);
    myDirectionalLight.target.position.set(0, 0, 0);
    scene.add(myDirectionalLight);


    //object

    const invisibleBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const invisibleBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: true });
    invisibleBox = new THREE.Mesh(invisibleBoxGeometry, invisibleBoxMaterial);
    invisibleBox.position.set(0, 0, 0);
    scene.add(invisibleBox);

    const loader = new GLTFLoader();  // attention 
    // cuoube

    loader.load('modelsandtextures/dragon_flying.glb', function (gltf) {

        gltf.scene.position.set(0, 0, 0);
        gltf.scene.AmbientLight = new THREE.AmbientLight(0xdddddd, 0.8);
        gltf.scene.scale.set(0.025, 0.025, 0.025);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.rotation.y = -Math.PI / 2;
        invisibleBox.add(gltf.scene);
        gltf.scene.castShadow = true;

        controls = new OrbitControls(camera, renderer.domElement);
        controls.update();
        clock = new Clock();

        mixer = new AnimationMixer(gltf.scene);
        mixer.clipAction(gltf.animations[0]).play();





    }, function (xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); }, // called when loading has errors 
        function (error) { console.log('An error happened' + error); });

    // loader.load('modelsandtextures/oak_tree.glb', function (gltf) {

    //     gltf.scene.position.set(0, 0, 0);
    //     gltf.scene.AmbientLight = new THREE.AmbientLight(0xdddddd, 0.8);
    //     gltf.scene.scale.set(200, 200, 200);
    //     scene.add(gltf.scene);

    //     controls = new OrbitControls(camera, renderer.domElement);
    //     controls.update();
    //     clock = new Clock();






    // }, function (xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); }, // called when loading has errors 
    //     function (error) { console.log('An error happened' + error); });

    loader.load('modelsandtextures/mar_saba_monastery.glb', function (gltf) {

        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(1, 1, 1);
        gltf.scene.receiveShadow = true;
        scene.add(gltf.scene);






    }, function (xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); }, // called when loading has errors 
        function (error) { console.log('An error happened' + error); });


    toRender();

}
start();


function animationdragon() {
    invisibleBox.rotation.y -= 0.01;
}

addEventListener('keypress', (event) => {
    const keyName = event.key;
    if (keyName === 'a') {
        console.log(camera.position);
    }
});

