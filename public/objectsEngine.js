/* --  Bartłomiej Grzesik 2022 Copyright©  -- */

/* --  OBJECT ENGINE  -- */

/* --  LIBRARY  -- */
import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { MTLLoader } from './jsm/loaders/MTLLoader.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
// import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from './jsm/postprocessing/RenderPass.js';
// import { OutlinePass } from './jsm/postprocessing/OutlinePass.js';




/* --  INIT ALL  -- */

window.addEventListener('load', init, false);

function init() {
    useLoader();
    createWorld();
    createLight();
    createMainOBJ();
    responsiveScene();
    aboutNavigation();
    animate();
}

/* --  LOADER & LOADING MANAGER  -- */
const loadingManager = new THREE.LoadingManager();
var progessRealStatus = 0;
var progessFakeStatus = 0;

function useLoader() {
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
function createWorld() {
    scene = new THREE.Scene();
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

    // Change THEME
    const changeThemeBTN = document.querySelector('.changeTheme');
    const r = document.querySelector(':root');
    var themeStatus = 1;

    //

    changeThemeBTN.addEventListener('click', () => {
        if (themeStatus) {
            themeStatus = 0;
            r.style.setProperty("--font-color", "#000000");
            r.style.setProperty("--logo-color", "#000000");
            r.style.setProperty("--font-color-hover", "#0c0c0c");
            r.style.setProperty("--backgroud-color-contrast", "#eeeeee");
            document.querySelector('html').style.backgroundColor = "#e4e4e4";
            //
            r.style.setProperty("--backgroud-color", "e4e4e4");
            // renderer.setClearColor(0xe4e4e4, 1);
        }
        else {
            themeStatus = 1;
            r.style.setProperty("--font-color", "#e6e6e6");
            r.style.setProperty("--logo-color", "#ffffff");
            r.style.setProperty("--font-color-hover", "#ffffff");
            r.style.setProperty("--backgroud-color-contrast", "#1e1e1e");
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

function createLight() {

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);
    hemiLight.color.setHSL(0, 1, 0.85); //0.67, 0.27, 0.43
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(1, 0.1, 0.82);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(30);

    // dirLight.castShadow = true;
    // dirLight.shadow.mapSize.width = 1024;
    // dirLight.shadow.mapSize.height = 1024;
    // const d = 10;
    // dirLight.shadow.camera.left = - d;
    // dirLight.shadow.camera.right = d;
    // dirLight.shadow.camera.top = d;
    // dirLight.shadow.camera.bottom = - d;
    // dirLight.shadow.camera.far = 1000;

    scene.add(dirLight);



    const dirLight2 = new THREE.DirectionalLight(0xb18556, 0.3);
    dirLight2.position.set(1, 0.4, -1);
    scene.add(dirLight2);
}

/* --  CREATE ALL MAIN OBJ  -- */

var onProgress;
var Flower3d;

function createMainOBJ() {

    onProgress = function (xhr) {

        if (xhr.lengthComputable) {

            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');

        }

    };
    // add Cardboard
    new MTLLoader(loadingManager).load('./res/Cardboard.mtl',
        function (materials) {
            materials.preload();
            new OBJLoader(loadingManager)
                .setMaterials(materials)
                .load('./res/Cardboard.obj',
                    function (object) {
                        // object.position.set()
                        scene.add(object);
                    },
                    onProgress);
        });



    // add Flower
    Flower3d = new THREE.Object3D();
    new MTLLoader(loadingManager).load('./res/Flower.mtl',
        function (materials) {
            materials.preload();
            new OBJLoader(loadingManager)
                .setMaterials(materials)
                .load('./res/Flower.obj',
                    function (object) {
                        object.position.set(1.32, -1, 0.6);
                        //object.scale.set(0.9,0.9,0.9);
                        object.receiveShadow = true;
                        object.castShadow = true;

                        Flower3d.add(object);
                    },
                    onProgress);
        });
    scene.add(Flower3d);
}

const about = document.querySelector('.about');
function aboutNavigation() {
    about.addEventListener('click', () => {
        stopAnimation(15000);
        gsap.to(scene.rotation, {
            y: 1.8,
            duration: 1,
            onUpdate: function () {
                camera.lookAt(0, 0, 0);
            }
        })
        gsap.to(camera.position, {
            x: 0.5,
            y: -0.7,
            z: 1.7,
            duration: 2.5,
            onUpdate: function () {
                camera.lookAt(0, 0, 0);
            }
        });


    });
}




/* --  ANIMATIONS  -- */

function animate() {
    if (isPlay) scene.rotation.y += 0.0006;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
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


