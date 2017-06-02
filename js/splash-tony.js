var camera = null
var scene = null;
var renderer = null;
var mesh = null;

const wrapper = document.querySelector('#cassette-wrap');
const soundPlayer = document.querySelector('.sound-player')
    .querySelector('iframe');

// soundcloud iframe responsive width and height
const w = window.innerHeight * 0.65;
const h = window.innerHeight * 0.58;
soundPlayer.width = w;
soundPlayer.height = h;

init();
animate();

function init() {
    var material1 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/splash-tony/cassette-side2.jpg') });
    var material2 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/splash-tony/cassette-side2.jpg') });
    var material3 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/splash-tony/cassette-side2.jpg') });
    var material4 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/splash-tony/cassette-side1.jpg') });
    var material5 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/splash-tony/cassette-front.jpg') });
    var material6 = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/splash-tony/cassette-back.jpg') });
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

// scroll arrows

$(window).on("scrollstart", function () {
    $("i").fadeOut(100);
    hideLeftArrow();
    hideRightArrow();
});

$(window).on("scrollstop", function () {
    $("i").fadeIn(100);
    hideLeftArrow();
    hideRightArrow();
});


function calculateWidth() {
    const ratios = [0.64, 1.52, 1.03, 0.58, 0.73, 1.24, 0.37];
    const windowHeight = window.innerHeight;
    return ratios.map(r => r * windowHeight).reduce((a, b) => a + b);
}

function hideLeftArrow() {
    const pos = $(window).scrollLeft();
    if (pos < 100) {
        $("i:nth-child(2)").hide();
    }
}

function hideRightArrow() {
    const pos = $(window).scrollLeft();
    const w = calculateWidth();
    if (pos > (w - (window.screen.width + 100))) {
        $("i:nth-child(1)").hide();
    }
}

hideLeftArrow();
hideRightArrow();

function jump(pos) {
    $('html,body').animate({
            scrollLeft: pos
        },
        400);
};

$('.fa-angle-right').click(() => {
    const pos = $(window).scrollLeft();
    jump(pos + 500);
});

$('.fa-angle-left').click(() => {
    const pos = $(window).scrollLeft();
    jump(pos - 500);
});

// neon flickers

let flickr_1 = false;
let flickr_2 = false;

const on1 = () => {
    flickr_1 = false;
    $('#neon-1').attr('src', 'img/splash-tony/1-neon-color.jpg')
}

const off1 = () => {
    flickr_1 = true;
    $('#neon-1').attr('src', 'img/splash-tony/1-neon-bw.jpg')
}

const on2 = () => {
    flickr_2 = false;
    $('#neon-2').attr('src', 'img/splash-tony/2-neon-color.jpg')
}

const off2 = () => {
    flickr_2 = true;
    $('#neon-2').attr('src', 'img/splash-tony/2-neon-bw.jpg')
}

var lastTime_1 = 0;
var lastTime_2 = 0;

function flickerPauses1() {
    if (lastTime_1 < 5) {
        lastTime_1++;
        return Math.random() * 100;
    } else {
        lastTime_1 = 0;
        return Math.random() * 2300;
    }
}

function flickerPauses2() {
    if (lastTime_2 < 5) {
        lastTime_2++;
        return Math.random() * 100;
    } else {
        lastTime_2 = 0;
        return Math.random() * 2300;
    }
}

function onFlickr1() {
    console.log(lastTime_1);
    if (flickr_1) {
        on1()
    } else {
        off1()
    }
    setTimeout(onFlickr1, flickerPauses1());
}

function onFlickr2() {
    console.log(lastTime_2);
    if (flickr_2) {
        on2()
    } else {
        off2()
    }
    setTimeout(onFlickr2, flickerPauses2());
}

onFlickr1();
onFlickr2();
