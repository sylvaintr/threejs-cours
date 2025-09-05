import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ajout d'un sol
const textureLoader = new THREE.TextureLoader();
const texturesol = textureLoader.load('herbe.jpeg');
const geometrysol = new THREE.BoxGeometry(100, 0.1, 100);
const materialsol = new THREE.MeshBasicMaterial({ map: texturesol });
const sol = new THREE.Mesh(geometrysol, materialsol);

scene.add(sol);

sol.position.y = -1;




// ajout d'un cube
const geometrycube = new THREE.BoxGeometry(1, 1, 1);
const materialcube = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometrycube, materialcube);
scene.add(cube);

cube.position.z = -5;


// ajout d'une lumière
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);


// positionnement de la camera
camera.position.z = 0;
camera.position.y = 2;
camera.position.x = 0;


// document.addEventListener('keydown', (event) => {
//     const keyName = event.key;
//     if (keyName === 'ArrowUp') {
//         camera.position.z -= 0.1;
//     } else if (keyName === 'ArrowDown') {
//         camera.position.z += 0.1;
//     } else if (keyName === 'ArrowLeft') {
//         camera.position.x -= 0.1;
//     } else if (keyName === 'ArrowRight') {
//         camera.position.x += 0.1;
//     } else if (keyName === 'z') {
//         camera.rotation.x += 0.1;
//     } else if (keyName === 's') {
//         camera.rotation.x -= 0.1;
//     } else if (keyName === 'q') {
//         camera.rotation.y += 0.1;
//     } else if (keyName === 'd') {
//         camera.rotation.y -= 0.1;
//     } else if (keyName === ' ') {
//         camera.position.y += 0.5;
//     } else if (keyName === 'r') {
//         camera.position.y -= 0.5;
//     }

//     renderer.render(scene, camera);
// }, false);



renderer.render(scene, camera);

const loader = new GLTFLoader();

loader.load('./model3d/ac_-_honda_acty_ha3_free.glb', function (gltf) {

    gltf.scene.position.y = -0.8;
    gltf.scene.position.z = -5;
    gltf.scene.position.x = 5;

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        if (keyName === 'ArrowUp') {
            gltf.scene.position.z -= 0.1;
            gltf.scene.rotation.y = Math.PI;
            camera.rotation.y = Math.PI;
            camera.position.x = gltf.scene.position.x;
            camera.position.z = gltf.scene.position.z + 5;
        } else if (keyName === 'ArrowDown') {
            gltf.scene.position.z += 0.1;
            gltf.scene.rotation.y = 0;
            camera.rotation.y = 0;
            camera.position.x = gltf.scene.position.x;
            camera.position.z = gltf.scene.position.z - 5;
        } else if (keyName === 'ArrowLeft') {
            gltf.scene.position.x -= 0.1;
            gltf.scene.rotation.y = -Math.PI / 2;
            camera.rotation.y = -Math.PI / 2;
            camera.position.x = gltf.scene.position.x + 5;
            camera.position.z = gltf.scene.position.z;
        } else if (keyName === 'ArrowRight') {
            gltf.scene.position.x += 0.1;
            gltf.scene.rotation.y = Math.PI / 2;
            camera.rotation.y = Math.PI / 2;
            camera.position.x = gltf.scene.position.x - 5;
            camera.position.z = gltf.scene.position.z;
        }
        camera.lookAt(gltf.scene.position);
        renderer.render(scene, camera);
    }, false);


    scene.add(gltf.scene);
    camera.lookAt(gltf.scene.position);
    renderer.render(scene, camera);
}, undefined, function (error) {

    console.error(error);

});

