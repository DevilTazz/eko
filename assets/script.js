const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

// Ustaw rozmiar canvas na pełne wymiary okna
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tablice dla trzech warstw cząsteczek
let particlesLayer1 = [];
let particlesLayer2 = [];
let particlesLayer3 = [];

// Klasa cząsteczki
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  
    // Rysowanie cząsteczki
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  
    // Aktualizacja pozycji cząsteczki
  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0 || this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.reset();
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
  
    // Funkcja resetująca cząsteczkę, gdy wyjdzie poza ekran
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    // Losowy kierunek i prędkość
    this.directionX = (Math.random() * 0.03) - 0.015;
    // Bardzo wolny ruch dla pierwszej warstwy
    this.directionY = (Math.random() * 0.03) - 0.015;
    // Bardzo wolny ruch dla pierwszej warstwy
  }
}
// Funkcja tworzenia cząsteczek dla wszystkich warstw
function init() {
  particlesLayer1 = [];
  particlesLayer2 = [];
  particlesLayer3 = [];
  
  // Warstwa 1 (przednia): mniejsze cząsteczki, mniej cząsteczek, wolniejszy ruch
  let numberOfParticlesLayer1 = (canvas.width * canvas.height) / 20000;
  // Mniej cząsteczek
  for (let i = 0; i < numberOfParticlesLayer1; i++) {
    let size = (Math.random() * 2) + 0.5;
    let x = Math.random() * (innerWidth - size * 2) + size;
    let y = Math.random() * (innerHeight - size * 2) + size;
    // Bardzo wolny ruch (mniejsze wartości prędkości)
    let directionX = (Math.random() * 0.03) - 0.015;
    // Bardzo wolny ruch dla pierwszej warstwy
    let directionY = (Math.random() * 0.03) - 0.015;
    // Bardzo wolny ruch dla pierwszej warstwy
    particlesLayer1.push(new Particle(x, y, directionX, directionY, size, '#00ffff'));
  }
  
    // Warstwa 2 (środkowa): średnie cząsteczki, więcej cząsteczek, szybszy ruch
  let numberOfParticlesLayer2 = (canvas.width * canvas.height) / 4000;
  for (let i = 0; i < numberOfParticlesLayer2; i++) {
    let size = (Math.random() * 2) + 0.7;
    let x = Math.random() * (innerWidth - size * 2) + size;
    let y = Math.random() * (innerHeight - size * 2) + size;
    // Szybszy ruch (większe wartości prędkości)
    let directionX = (Math.random() * 0.09) - 0.045;
    // Bardziej przyspieszony ruch dla drugiej warstwy
    let directionY = (Math.random() * 0.09) - 0.045;
    // Bardziej przyspieszony ruch dla drugiej warstwy
    particlesLayer2.push(new Particle(x, y, directionX, directionY, size, '#00ffff'));
  }
  
    // Warstwa 3 (tylna): najmniejsze cząsteczki, najwięcej cząsteczek, jeszcze szybszy ruch
  let numberOfParticlesLayer3 = (canvas.width * canvas.height) / 1000;
  // Więcej cząsteczek
  for (let i = 0; i < numberOfParticlesLayer3; i++) {
  let size = (Math.random() * 1.5) + 0.3;
  let x = Math.random() * (innerWidth - size * 2) + size;
  let y = Math.random() * (innerHeight - size * 2) + size;
  // Jeszcze szybszy ruch (większe wartości prędkości)
  let directionX = (Math.random() * 0.15) - 0.06;
  // Jeszcze szybszy ruch dla trzeciej warstwy
  let directionY = (Math.random() * 0.15) - 0.06;
  // Jeszcze szybszy ruch dla trzeciej warstwy
  particlesLayer3.push(new Particle(x, y, directionX, directionY, size, '#00ffff'));
}
}

// Funkcja animująca cząsteczki
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  
    // Aktualizacja i rysowanie cząsteczek dla każdej warstwy
  particlesLayer3.forEach(particle => particle.update());
  particlesLayer2.forEach(particle => particle.update());
  particlesLayer1.forEach(particle => particle.update());
}
// Dopasowanie wielkości canvas po zmianie okna
window.addEventListener('resize', function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

// Inicjalizacja cząsteczek i rozpoczęcie animacji
init();
animate();
