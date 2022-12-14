/* --  Bartłomiej Grzesik 2022 Copyright©  -- */
/* --  objectsEngine.js  -- */


//
/* --  LIBRARY  -- */
//
import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

// OUTLINE
// import { OutlinePass } from './jsm/postprocessing/OutlinePass.js';
// import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from './jsm/postprocessing/RenderPass.js';
// import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';
// import { FXAAShader } from './jsm/shaders/FXAAShader.js';

//
/* --  INIT  -- */
//
window.addEventListener('load', init, false);
function init() {
    createLoader();
    createEnvironment();
    createLights();
    addMainObjects();
    addPortfolioObjects();
    responsiveScene();
    animate();
}
//
/* --  LOADING MANAGER  -- */
//
const loadingManager = new THREE.LoadingManager();
var animationStartTime = 3;
var zResponsivePoint;
function createLoader() {
    loadingManager.onLoad = function () {
        if(document.getElementById("loader").style.opacity = "0")
        document.getElementById("loader").style.transform = "translateY(-102%)";
        //
        stopAnimation(15000);
        gsap.to(camera.position, {
            y: 3,
            z: 1,
            duration: 0.2,
            onUpdate: function () {
                camera.lookAt(0, 0, 0);
            }
        });
        sleep(animationStartTime * 1000).then(() => { 
        gsap.to(camera.position, {
            y: 0.65,
            z: zResponsivePoint,
            duration: 2,
            onUpdate: function () {
                camera.lookAt(0, 0, 0);
            }
        })
        gsap.to(camera.rotation, {
            x: -0.223,
            duration: 2
        })
    
        });
    }
} // x: -0.523, y: 1.6,
//
/* --  CREATE ENVIRONMENT  -- */
//
var scene, camera, renderer, controls;
function createEnvironment() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111111, 1, 9);
    //
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    //
    // renderer settings
    renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.objects3d').appendChild(renderer.domElement); // set element where display
    renderer.setClearColor(0x111111, 0); // set background color
    renderer.setAnimationLoop(animate);
    //
    // controls settings
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableKeys = false; // disable pan, keys and move obj
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2; // create floor - dont see a down side
    controls.rotateSpeed = 0.9;
}
//
/* -- CREATE A RESPONSIVE SCENE -- */
//
function responsiveScene() {
    // responsive
    let windowWidth = window.innerWidth;
    if (windowWidth > 950) {
        zResponsivePoint = 3.2;
        camera.position.z = 2.9;
        controls.minDistance = 2.4;
        controls.maxDistance = 3.4;
    }
    if (windowWidth < 950) {
        zResponsivePoint = 3.8;
        camera.position.z = 3.6;
        controls.minDistance = 3.1;
        controls.maxDistance = 4.1;
    }
    if (windowWidth < 700) {
        zResponsivePoint = 4.2;
        camera.position.z = 4.3;
        controls.minDistance = 2.8;
        controls.maxDistance = 5.1;
        scene.fog = new THREE.Fog(0x111111, 3, 12);
    }


    window.addEventListener('resize', () => {
        // object responsive
        if (window.innerWidth > 950) {
            zResponsivePoint = 2.8;
            camera.position.z = 2.9;
            controls.minDistance = 2.4;
            controls.maxDistance = 3.4;
        }
        if (window.innerWidth < 950) {
            zResponsivePoint = 3.7;
            camera.position.z = 3.6;
            controls.minDistance = 3.1;
            controls.maxDistance = 4.1;
        }
        if (window.innerWidth < 700) {
            zResponsivePoint = 4.1;
            camera.position.z = 4.3;
            controls.minDistance = 2.8;
            controls.maxDistance = 5.1;
        }
        // 
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
        camera.updateProjectionMatrix();
    }, false);
}
//
/* --  CREATE LIGHTS  -- */
//
function createLights() {
    // main light
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);
    hemiLight.color.setHSL(0, 1, 0.85); //0.67, 0.27, 0.43
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    // small red point light
    const pLight = new THREE.PointLight(0xbf1c1c, 0.5, 4);
    pLight.position.set(-1, 1.75, 1);
    scene.add(pLight);
    // white directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(1, 0.1, 0.82);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(30);
    scene.add(dirLight);
    // light-yellow directional light
    const dirLight2 = new THREE.DirectionalLight(0xb18556, 0.3);
    dirLight2.position.set(1, 0.4, -1);
    scene.add(dirLight2);
}


//
/* --  ANIMATIONS  -- */
//
const clock = new THREE.Clock();
function animate() {
    if (isPlay) scene.rotation.y += 0.0006;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    if (mixer) mixer.update(clock.getDelta());
    //requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// sleep rotate animation function
var isPlay = 1;
function sleep(time) { return new Promise((resolve) => setTimeout(resolve, time)); }
function stopAnimation(time) {
    isPlay = 0;
    sleep(time).then(() => { isPlay = 1; });
}
// listener on click object. It sleep animation and hide info description
const infoTab = document.querySelector('.info');
var infoTab_status = 1;
document.querySelector('.objects3d').addEventListener('mousedown', () => {
    stopAnimation(10000);
    if (infoTab_status == 1) {
        infoTab.style.transform = 'translateY(100vh)';
        infoTab_status = 0;
    }

});
// start animation 
sleep(animationStartTime * 1000).then(() => { 
    infoTab.style.opacity = '1'; 
    document.querySelector('.logo').style.transform = 'translateY(0)';
    document.querySelector('.contact').style.transform = 'translateY(0)';
});
//
/* --  ADD MAIN OBJECT (CARDBOARD)  -- */
//
var onProgress;
let mixer;
function addMainObjects() {

    onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log('Download objects: ' + Math.round(percentComplete, 2) + '%');
        }
    };

    // PLANE
    // const plane = new THREE.Mesh(new THREE.PlaneGeometry(15, 15), 
    //                              new THREE.MeshBasicMaterial({color: 0x030303}));
    // plane.rotateX(-1.57);           
    // plane.position.set(0, -1.1, 0);
    // scene.add(plane);

    const Cardboard = new GLTFLoader(loadingManager);
    Cardboard.load('./res/HUGCardboard.glb',
        function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        mixer = new THREE.AnimationMixer(model);
        const clip = THREE.AnimationClip.findByName(gltf.animations, 'openBox');
        const action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopOnce);
        action.startAt(animationStartTime);
         action.play();
       
    }, onProgress, function (error) { console.error(error); });
}

//
/* -- ON CLICK PORTFOLIO OBJECTS -- */
//
let mouseClick = new THREE.Vector2();
function onClickObject(event) {
    //event.preventDefault();
    //
    mouseClick.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseClick.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouseClick, camera);
    let intersects = raycaster.intersectObjects(scene.children);
    // Main if 
    if (intersects.length > 0) {
        if (intersects[0].object.name == 'testMesh') console.log('czerwony');
        if (intersects[0].object.name == 'testMesh2') console.log('zielony');
    }
}
//
/* -- ON MOUSE OVER PORTFOLIO OBJECTS -- */
//
// let selectedObjects = [];
// function addSelectedObject( object ) {

//     selectedObjects = [];
//     selectedObjects.push( object );

// }
let mouseOver = new THREE.Vector2();
function onMouseOverObject(event) {
    //if ( event.isPrimary === false ) return;
    //
    mouseOver.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseOver.y = - (event.clientY / window.innerHeight) * 2 + 1;
    //
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouseOver, camera);
    let intersects = raycaster.intersectObject(scene, true);

    if (intersects.length > 0) {
        // const selectedObject = intersects[ 0 ].object;
        // addSelectedObject( selectedObject );
        // outlinePass.selectedObjects = selectedObjects;
        if (intersects[0].object.name == 'testMesh' ||
            intersects[0].object.name == 'testMesh2')
            document.querySelector('.content').style.cursor = 'pointer';
        if (intersects[0].object.name == 'testMesh') console.log('czerwonyNA');
        if (intersects[0].object.name == 'testMesh2') console.log('zielonyNA');
    } else {
        document.querySelector('.content').style.cursor = 'grab';
    }
}

//
/* -- ADD OBJECTS CONTENT IN CARDBOARD -- */
//
let testMesh, testMesh2, testMesh3;
//let composer, renderPass, outlinePass, effectFXAA;
function addPortfolioObjects() {
    //
    testMesh = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4),
        new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    testMesh2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    testMesh2.position.set(0, 0, -0.5);
    testMesh3 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }));
    testMesh3.position.set(0, 0, 0.5);

    scene.add(testMesh, testMesh2, testMesh3);
    testMesh.name = 'testMesh';
    testMesh2.name = 'testMesh2';
    testMesh3.name = 'testMesh3';

    // OUTLINE 
    // composer = new EffectComposer( renderer );
    // renderPass = new RenderPass( scene, camera );
    // composer.addPass( renderPass );

    // outlinePass = new OutlinePass(new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera);
    // outlinePass.edgeStrength = 10;
    // outlinePass.edgeGlow = 0;
    // outlinePass.edgeThickness = 1;
    // outlinePass.pulsePeriod = 0;
    // outlinePass.visibleEdgeColor.set( "#ffffff" );
    // outlinePass.hiddenEdgeColor.set( "#000000" );
    // composer.addPass( outlinePass );

    // effectFXAA = new ShaderPass(THREE.FXAAShader);
    // effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    // effectFXAA.renderToScreen = true;
    // composer.addPass(effectFXAA);
    // composer.addPass(outlinePass);


    // LISTENER ON CLICK AND HOVER OBJECTS
    window.addEventListener('click', onClickObject);
    window.addEventListener('pointermove', onMouseOverObject);

}

