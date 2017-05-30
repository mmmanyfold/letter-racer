var camera = null
var scene = null;
var renderer = null;
var mesh = null;

const wrapper = document.querySelector('#cassette-wrap');

init();
animate();

// standard cassette dimensions
// 56mm * 33mm

function init() {
    camera = new THREE.PerspectiveCamera(300, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;
    scene = new THREE.Scene();
    var texture = new THREE.TextureLoader().load('./img/splash-tony/cassette.jpg');
    var geometry = new THREE.BoxBufferGeometry(560, 340, 70);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateZ(115);
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    wrapper.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.0085;
    renderer.render(scene, camera);
}
