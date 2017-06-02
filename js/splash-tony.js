var camera = null
var scene = null;
var renderer = null;
var mesh = null;

const wrapper = document.querySelector('#cassette-wrap');
const soundPlayer = document.querySelector('.sound-player')
    .querySelector('iframe');

// sound-player iframe width and height
const w = window.innerHeight * 0.65;
const h = window.innerHeight * 0.58;
soundPlayer.width = w;
soundPlayer.height = h;

init();
animate();

function init() {
    var material1 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./img/splash-tony/cassette-side2.jpg') } );
    var material2 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./img/splash-tony/cassette-side2.jpg') } );
    var material3 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./img/splash-tony/cassette-side2.jpg') } );
    var material4 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./img/splash-tony/cassette-side1.jpg') } );
    var material5 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./img/splash-tony/cassette-front.jpg') } );
    var material6 = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('./img/splash-tony/cassette-back.jpg') } );
    var materials = [material1, material2, material3, material4, material5, material6];

    camera = new THREE.PerspectiveCamera(290, 1.33, 1, 10000);
    camera.position.z = 1000;
    scene = new THREE.Scene();
    var geometry = new THREE.BoxGeometry(600, 450, 113, 15, 15, 15);

    // var modifier = new THREE.SubdivisionModifier(2);
    // geometry.mergeVertices();
    // geometry.computeFaceNormals();
    // geometry.computeVertexNormals();
    // modifier.modify(geometry);

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
    const w = window.innerHeight * 0.65;
    const h = window.innerHeight * 0.58;
    soundPlayer.width = w;
    soundPlayer.height = h;
    camera.updateProjectionMatrix();
    renderer.setSize((window.innerHeight * 0.97), window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.0085;
    renderer.render(scene, camera);
}
