import * as THREE from 'three';
var scene, renderer, camera, cube;

function toRender() {

    renderer.render(scene, camera);
    requestAnimationFrame(toRender);

}


function start() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // light
    var myAmbientLight = new THREE.AmbientLight(0xd0d0d0, 0.3);
    scene.add(myAmbientLight);

    var myDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    scene.add(myDirectionalLight);

    //object
    addtree(0, 0);
    addtree(20, 0);
    addtree(-20, 0);
    addtree(0, 20);
    addtree(0, -20);
    addtree(20, 20);
    addtree(-20, -20);
    addtree(-20, 20);
    addtree(20, -20);


    toRender();

}
start();

function addtree(x, y) {
    const cylinderGeometry = new THREE.CylinderGeometry(4, 4, 20, 32);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x7a530f });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(x, 0, y);
    scene.add(cylinder);

    // sphere
    const sphereGeometry = new THREE.SphereGeometry(7, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x187a33 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 10, 0);
    cylinder.add(sphere);
}
