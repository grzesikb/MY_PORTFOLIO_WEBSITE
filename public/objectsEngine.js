/* --  Bartłomiej Grzesik 2022 Copyright©  -- */

/* --  OBJECT ENGINE  -- */

/* --  LIBRARY  -- */
import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
//import { MTLLoader } from './jsm/loaders/MTLLoader.js';
//import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
// import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from './jsm/postprocessing/RenderPass.js';
// import { OutlinePass } from './jsm/postprocessing/OutlinePass.js';




/* --  INIT ALL  -- */

window.addEventListener('load', init, false);

function init() {
    createLoader();
    createScene();
    createLights();
    addMainObjects();
    responsiveScene();
    aboutNavigation();
    animate();
}

/* --  LOADER & LOADING MANAGER  -- */
const loadingManager = new THREE.LoadingManager();
var progessRealStatus = 0;
var progessFakeStatus = 0;

function createLoader() {
    var interval = setInterval(() => {
        document.getElementById('progressCount').innerText = progessFakeStatus + '%';
        progessFakeStatus++;
        if (progessFakeStatus == 101) {
            if (progessRealStatus == 1 && progessFakeStatus == 101) {
                document.getElementById("loader").style.transform = "translateY(-110%)";
                document.getElementById("loader").style.borderRadius = "10%";
                document.querySelector('.objects3d').style.transform = 'translateY(0)';
            }
            clearInterval(interval);
        }
    }, 20);
    // loadingManager.onProgress = function(url, loaded, total) {      
    //     progessRealStatus = Math.round((loaded / total) * 100);
    // }
    loadingManager.onLoad = function () {
        progessRealStatus = 1;
    }
}

/* --  CREATE WORLD  -- */

var scene, camera, renderer, controls;
function createScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x111111, 1, 9 );
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


    //Change THEME
    const r = document.querySelector(':root');
    var themeStatus = 1;
    //
    document.querySelector('.theme__btn').addEventListener('click', () => {
        if (themeStatus) {
            themeStatus = 0;
            r.style.setProperty("--font-color", "#444");
            r.style.setProperty("--logo-color", "#000000");
            //r.style.setProperty("--font-color-hover", "#0c0c0c");
            r.style.setProperty("--background-color-menubtn", "rgba(90, 90, 90, 0.1)");
            r.style.setProperty("--backgroud-color-contrast", "#efefef");
            document.querySelector('html').style.backgroundColor = "#e4e4e4";
            //
            r.style.setProperty("--backgroud-color", "e4e4e4");
            // renderer.setClearColor(0xe4e4e4, 1);
        }
        else {
            themeStatus = 1;
            r.style.setProperty("--font-color", "#e6e6e6");
            r.style.setProperty("--logo-color", "#ffffff");
            //r.style.setProperty("--font-color-hover", "#ffffff");
            r.style.setProperty("--background-color-menubtn", "rgba(233, 233, 233, 0.1)");
            r.style.setProperty("--backgroud-color-contrast", "#222222");
            document.querySelector('html').style.backgroundColor = "#111111";
            //
            r.style.setProperty("--backgroud-color", "111111");
            // renderer.setClearColor(0x111111, 1);
        }
    });

    // controls settings
    controls = new OrbitControls(camera, renderer.domElement);
    //controls.enableZoom = false;
    controls.enableKeys = false; // disable pan, keys and move obj
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2; // create floor - dont see a down side
    controls.rotateSpeed = 0.9;


}

function responsiveScene() {
    // responsive
    let windowWidth = window.innerWidth;
    if (windowWidth > 950) {
        camera.position.z = 2.9;
        controls.minDistance = 2.4;
        controls.maxDistance = 3.4;
    }
    if (windowWidth < 950) {
        camera.position.z = 3.6;
        controls.minDistance = 3.1;
        controls.maxDistance = 4.1;
    }
    if (windowWidth < 700) {
        camera.position.z = 4.6;
        controls.minDistance = 4.1;
        controls.maxDistance = 5.1;
    }


    window.addEventListener('resize', () => {
        // object responsive
        if (window.innerWidth > 950) {
            camera.position.z = 2.9;
            controls.minDistance = 2.4;
            controls.maxDistance = 3.4;
        }
        if (window.innerWidth < 950) {
            camera.position.z = 3.6;
            controls.minDistance = 3.1;
            controls.maxDistance = 4.1;
        }
        if (window.innerWidth < 700) {
            camera.position.z = 4.6;
            controls.minDistance = 4.1;
            controls.maxDistance = 5.1;
        }
        // 
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
        camera.updateProjectionMatrix();
    }, false);
}

/* --  CREATE LIGHT  -- */

function createLights() {

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);
    hemiLight.color.setHSL(0, 1, 0.85); //0.67, 0.27, 0.43
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const pLight = new THREE.PointLight(0xbf1c1c, 0.5, 4); 
    pLight.position.set(-1, 1.75, 1);
    scene.add(pLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(1, 0.1, 0.82);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(30);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xb18556, 0.3);
    dirLight2.position.set(1, 0.4, -1);
    scene.add(dirLight2);
}

/* --  CREATE ALL MAIN OBJ  -- */

var onProgress;
let mixer;
function addMainObjects() {

    onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log('Download objects: ' + Math.round(percentComplete, 2) + '%');
        }
    };

    const Cardboard = new GLTFLoader(loadingManager);
    Cardboard.load('./res/DCardboard.glb',
        function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        }, onProgress, function(error) {console.error(error);}
    );
    

    // PLANE
    // const plane = new THREE.Mesh(new THREE.PlaneGeometry(15, 15), 
    //                              new THREE.MeshBasicMaterial({color: 0x030303}));
    // plane.rotateX(-1.57);           
    // plane.position.set(0, -1.1, 0);
    // scene.add(plane);


    // const Cardboard = new GLTFLoader(loadingManager);
    // Cardboard.load('./res/ACardboard.glb',
    //     function (gltf) {
    //     const model = gltf.scene;
    //     scene.add(model);
    //     mixer = new THREE.AnimationMixer(model);
    //     const clips = gltf.animations;
    //     const clip = THREE.AnimationClip.findByName(clips, 'openBox');
    //     const action = mixer.clipAction(clip);
    //     action.play();

    // }, undefined, function(error) {
    //     console.error(error);
    // });


    // add Flower
    //                     object.position.set(1.32, -1, 0.6);
    //                     //object.scale.set(0.9,0.9,0.9);
    //                     object.receiveShadow = true;

}

function aboutNavigation() {
    document.querySelector('.about__btn').addEventListener('click', () => {
        stopAnimation(15000);
        gsap.to(scene.rotation, {
            y: 1.8,
            duration: 1,
            onUpdate: function () {
                camera.lookAt(0, 0, 0);
            }
        })
        gsap.to(camera.position, {
            x: 0.45,
            y: -0.9,
            z: 2.1,
            duration: 2.5,
            onUpdate: function () {
                camera.lookAt(0, 0, 0);
            }
        });


    });
}



/* --  ANIMATIONS  -- */
//const clock = THREE.Clock();
function animate() {
    if (isPlay) scene.rotation.y += 0.0006;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    //mixer.update(clock.getDelta());
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// stop rotate animation 

var isPlay = 1;
function sleep(time) { return new Promise((resolve) => setTimeout(resolve, time)); }
function stopAnimation(time) {
    isPlay = 0;
    sleep(time).then(() => { isPlay = 1; });
}
const infoTab = document.querySelector('.info');
var infoTab_status = 1;
document.querySelector('.objects3d').addEventListener('mousedown', () => {
    stopAnimation(10000);
    if (infoTab_status == 1) {
        infoTab.style.transform = 'translateY(100vh)';
        infoTab_status = 0;
    }

});


