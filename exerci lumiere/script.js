import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
var scene, renderer, camera, cube, controls, invisibleBox;

function toRender() {

    invisibleBox.rotation.x -= 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(toRender);

}


function start() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Enable shadow mapping
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: softer shadows
    document.body.appendChild(renderer.domElement);
    // camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(15, 15, 15);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);


    //object
    var geometry = new THREE.PlaneGeometry(15, 15);
    var material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    plane.castShadow = true;
    scene.add(plane);

    cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xffff00, }));
    cube.position.set(0, 0.5, 0);
    cube.castShadow = true;
    scene.add(cube);


    const invisibleBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const invisibleBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: true });
    invisibleBox = new THREE.Mesh(invisibleBoxGeometry, invisibleBoxMaterial);
    invisibleBox.position.set(0, 0, 0);
    scene.add(invisibleBox);

    // light
    var myAmbientLight = new THREE.AmbientLight(0xd0d0d0, 0.3);
    var myDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    myDirectionalLight.castShadow = true;
    // Optional: improve shadow quality
    myDirectionalLight.shadow.mapSize.width = 1024;
    myDirectionalLight.shadow.mapSize.height = 1024;
    myDirectionalLight.shadow.camera.near = 0.5;
    myDirectionalLight.shadow.camera.far = 50;
    invisibleBox.add(myDirectionalLight);
    myDirectionalLight.position.set(2, 0, 15);
    scene.add(myAmbientLight);


    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();


    // Exemple d'utilisation des différentes lumières de THREE.js

    // Lumière directionnelle (déjà présente)
    // myDirectionalLight

    // Lumière ambiante (déjà présente)
    // myAmbientLight

    // Lumière ponctuelle (PointLight)
    // const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    // pointLight.position.set(5, 10, 5);
    // pointLight.castShadow = true;
    // scene.add(pointLight);

    // Lumière spot (SpotLight)
    // const spotLight = new THREE.SpotLight(0x00ff00, 1);
    // spotLight.position.set(-10, 15, 10);
    // spotLight.angle = Math.PI / 6;
    // spotLight.castShadow = true;
    // scene.add(spotLight);

    // Lumière hémisphérique (HemisphereLight)
    // const hemiLight = new THREE.HemisphereLight(0x0000ff, 0xffffff, 0.6);
    // hemiLight.position.set(10, 20, 0);
    // scene.add(hemiLight);

    // Pour visualiser les sources lumineuses, on peut ajouter des helpers :
    const dirLightHelper = new THREE.DirectionalLightHelper(myDirectionalLight, 2);
    scene.add(dirLightHelper);

    // const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
    // scene.add(pointLightHelper);

    // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);

    // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 2);
    // scene.add(hemiLightHelper);

    toRender();

}
start();