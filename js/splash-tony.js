var camera = null
var scene = null;
var renderer = null;
var mesh = null;

const wrapper = document.querySelector('#cassette-wrap');

init();
animate();

function init() {
    var material1 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./img/splash-tony/cassette-side2.jpg') } );
    var material2 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./img/splash-tony/cassette-side2.jpg') } );
    var material3 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./img/splash-tony/cassette-side1.jpg') } );
    var material4 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./img/splash-tony/cassette-side1.jpg') } );
    var material5 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./img/splash-tony/cassette-front.jpg') } );
    var material6 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./img/splash-tony/cassette-back.jpg') } );

    var materials = [material1, material2, material3, material4, material5, material6];

    camera = new THREE.PerspectiveCamera(290, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    scene = new THREE.Scene();
    var geometry = new THREE.BoxBufferGeometry(600, 450, 113);
    mesh = new THREE.Mesh(geometry, materials);
    mesh.rotateZ(115);
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize((window.innerHeight * 0.97), window.innerHeight);
    wrapper.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = (window.innerHeight * 0.97) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize((window.innerHeight * 0.97), window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.0085;
    renderer.render(scene, camera);
}
