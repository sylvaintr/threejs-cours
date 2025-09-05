import * as THREE from 'three';
var scene, renderer, camera, cube;

function toRender() {
    cube.rotateX(0.006);
    cube.rotateY(0.02);
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
    camera.position.set(15, 15, 15);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // light
    var myAmbientLight = new THREE.AmbientLight(0xd0d0d0, 0.3);
    scene.add(myAmbientLight);

    var myDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    scene.add(myDirectionalLight);

    //object
    var geometry = new THREE.BoxGeometry(15, 15, 15);
    var material = new THREE.MeshStandardMaterial({ color: 0x00ffff, metalness: 0.70, roughness: 0.40, envMaps: 'reflection' });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    var SphereFille = new THREE.Mesh(new THREE.SphereGeometry(7.5, 32, 16), new THREE.MeshStandardMaterial({ color: 0x00ffff, metalness: 0.70, roughness: 0.40, envMaps: 'reflection' }));
    cube.add(SphereFille);
    SphereFille.position.set(0, 15, 0);

    cube.position.set(-15, 0, 0);

    const geometry2 = new THREE.BufferGeometry();

    const vertices = new Float32Array([
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
    ]);
    const indices = [
        0, 1, 2,
        2, 3, 0,
        1, 4, 5,
        5, 2, 1,
        4, 6, 7,
        7, 5, 4,
        6, 0, 3,
        3, 7, 6,
        3, 2, 5,
        5, 7, 3,
    ]

    geometry2.setIndex(indices);
    geometry2.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const test = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    scene.add(test);
    test.position.set(10, 0, -10);


    toRender();

}
start();