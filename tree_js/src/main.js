import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
// // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();

// const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader()

// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);


// // const geometry = new THREE.BoxGeometry(1, 1, 1);
// // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// // const cube = new THREE.Mesh(geometry, material);
// // scene.add(cube);

// // camera.position.z = 5;

// const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
// camera.position.set(0, 0, 100);
// camera.lookAt(0, 0, 0)

// const points = [];
// points.push(new THREE.Vector3(- 10, 0, 0));
// points.push(new THREE.Vector3(0, 10, 0));
// points.push(new THREE.Vector3(10, 0, 0));

// const geometry = new THREE.BufferGeometry().setFromPoints(points);
// const line = new THREE.Line(geometry, material);

// scene.add(line);
// renderer.render(scene, camera);

// function animate() {
//     requestAnimationFrame(animate);

//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;

//     renderer.render(scene, camera);
// }

// // animate();

// Configuração básica
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criação do labirinto
const mazeSize = 10;
const cellSize = 1;
const wallThickness = 0.1;

// const createWall = (width, height, depth) => {
//     const geometry = new THREE.BoxGeometry(width, height, depth);
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     return new THREE.Mesh(geometry, material);
// };

// for (let i = 0; i < mazeSize; i++) {
//     for (let j = 0; j < mazeSize; j++) {
//         const cellValue = Math.random() > 0.5 ? 1 : 0; // 1 representa parede, 0 representa caminho

//         if (cellValue === 1) {
//             const wall = createWall(cellSize - wallThickness, cellSize - wallThickness, wallThickness);
//             wall.position.set(i * cellSize, j * cellSize, 0);
//             scene.add(wall);
//         }
//     }
// }

// // Adiciona uma câmera e ajusta a posição
// camera.position.z = 5;

// // Adiciona um controle de órbita para interação do usuário
// const controls = new OrbitControls(camera, renderer.domElement);

// // Função de renderização
// const animate = () => {
//     requestAnimationFrame(animate);
//     controls.update();
//     renderer.render(scene, camera);
// };

// // Ajusta o tamanho da janela
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });

// // Inicia a animação
// animate();

// Labirinto representado por uma matriz (1 representa parede, 0 representa caminho)
const mazeMatrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 'S', 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Criação do labirinto
const createWall = (width, height, depth) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);
};

for (let i = 0; i < mazeSize; i++) {
    for (let j = 0; j < mazeSize; j++) {
        if (mazeMatrix[i][j] === 1) {
            const wall = createWall(cellSize / 2, cellSize / 2, cellSize / 2);
            wall.position.set(i * cellSize / 2, j * cellSize / 2, cellSize / 2);
            scene.add(wall);
        }
    }
}

// Adiciona um jogador
const playerGeometry = new THREE.BoxGeometry(cellSize / 2, cellSize / 2, cellSize / 2);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(cellSize / 2, cellSize / 2, cellSize / 2);
scene.add(player);

// Adiciona uma câmera e ajusta a posição
camera.position.z = 5;

// Adiciona um controle de órbita para interação do usuário
const controls = new OrbitControls(camera, renderer.domElement);

// Função de renderização
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

// Ajusta o tamanho da janela
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Eventos de teclado para movimentar o jogador
window.addEventListener('keydown', (event) => {
    const speed = cellSize/2;
    const oldPosition = player.position.clone();

    switch (event.key) {
        case 'ArrowUp':
            player.position.y += speed;
            break;
        case 'ArrowDown':
            player.position.y -= speed;
            break;
        case 'ArrowLeft':
            player.position.x -= speed;
            break;
        case 'ArrowRight':
            player.position.x += speed;
            break;
    }

    if (checkCollision(player, mazeMatrix)) {
        // Se houver colisão, reverta a posição do jogador
        player.position.copy(oldPosition);
    }
});

// Função para verificar colisão com as paredes
const checkCollision = (player, mazeMatrix) => {
    const playerX = Math.floor((player.position.x) / (cellSize/2));
    // const playerY = Math.floor((player.position.y + player.geometry.parameters.height / 2) / cellSize);
    const playerY = Math.floor((player.position.y) / (cellSize/2));

    if (mazeMatrix[playerX] && mazeMatrix[playerX][playerY] === 1) {
        return true; // Houve colisão
    }

    return false; // Não houve colisão
};

// Inicia a animação
animate();