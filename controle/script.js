import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
var scene, renderer, camera, invisibleBox, robot, avancer, loader, sun;



function toRender() {

    sun.rotation.z += 0.00005
    invisibleBox.rotation.x -= 0.005;
    animationRobot()
    renderer.render(scene, camera);
    requestAnimationFrame(toRender);

}


function start() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Enable shadow mapping
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: softer shadows
    document.body.appendChild(renderer.domElement);
    // camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(15, 5, 15);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    const invisibleBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const invisibleBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: true });
    invisibleBox = new THREE.Mesh(invisibleBoxGeometry, invisibleBoxMaterial);
    invisibleBox.position.set(0, 0, 0);
    scene.add(invisibleBox);

    // light
    var myAmbientLight = new THREE.AmbientLight(0xd0d0d0, 0.3);
    var myDirectionalLight = new THREE.DirectionalLight(0xf27e3f, 0.8);
    myDirectionalLight.castShadow = true;
    // Optional: improve shadow quality
    myDirectionalLight.shadow.mapSize.width = 1024;
    myDirectionalLight.shadow.mapSize.height = 1024;
    myDirectionalLight.shadow.camera.near = 0.5;
    myDirectionalLight.shadow.camera.far = 50;
    invisibleBox.add(myDirectionalLight);
    myDirectionalLight.position.set(2, 0, 20);
    scene.add(myAmbientLight);

    //object

    const textuerciel = new THREE.TextureLoader().load('texture/2k_stars_milky_way.jpg');
    scene.background = textuerciel;

    const texturesol = new THREE.TextureLoader().load('texture/2k_makemake_fictional.jpg');


    var geometry = new THREE.PlaneGeometry(150, 150);
    var material = new THREE.MeshStandardMaterial({ map: texturesol });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    plane.castShadow = true;
    scene.add(plane);

    loader = new GLTFLoader();
    addHome(0, 0);
    addHome(6, 0);
    addHome(12, 0);
    addHome(-6, 0);
    addHome(-12, 0);

    addHome(6, 15);





    robot = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x000000, opacity: 0, transparent: true }));
    scene.add(robot)
    robot.position.set(-2.6, 0, 2.3);

    loader.load('model/robot.glb', function (gltf) {

        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.rotation.y = Math.PI;



        gltf.scene.traverse(function (child) {

            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                child.geometry.computeVertexNormals();
            }
        });
        robot.add(gltf.scene);



    }, function (xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); }, // called when loading has errors 
        function (error) { console.log('An error happened' + error); });
    avancer = true

    const texturesun = new THREE.TextureLoader().load('texture/sun.jpg');
    const sphereGeometry = new THREE.SphereGeometry(2, 10, 10);
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: texturesun });
    sun = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sun.position.set(0, 0, 0);
    myDirectionalLight.add(sun);




    var geometryroute = new THREE.BoxGeometry(40, 0.1, 9.25);
    var materialroute = new THREE.MeshStandardMaterial({ color: 0x717178, metalness: 0.70, roughness: 0.40 });
    const route = new THREE.Mesh(geometryroute, materialroute);

    route.receiveShadow = true;
    route.castShadow = true;
    route.position.set(-2, 0.1, 6.5)
    scene.add(route);


    toRender();

}
start();




function animationRobot() {

    if (avancer) {

        robot.position.x += 0.05;
    } else {
        robot.position.x -= 0.05;
    }

    if (robot.position.x > 13) {
        avancer = false
        robot.rotation.y = -Math.PI;
    }

    if (robot.position.x < -13) {
        robot.rotation.y = 0;
        avancer = true
    }

}



function addHome(x, z) {

    loader.load('model/futuristic_building.glb', function (gltf) {

        gltf.scene.position.set(x, 0, z);
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.rotation.y = -Math.PI / 2;

        gltf.scene.traverse(function (child) {

            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                child.geometry.computeVertexNormals();
            }
        });

        scene.add(gltf.scene);

    }, function (xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); }, // called when loading has errors 
        function (error) { console.log('An error happened' + error); });


}


