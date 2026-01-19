
const themeToggle = document.getElementById('themeToggle');
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');

let dark = false;

// 🌙 Tema
themeToggle.onclick = () => {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeToggle.textContent = dark ? '☀️' : '🌙';
};

// ❤️ Likes
likeBtn.onclick = async () => {
  await fetch(`${API}/likes`, { method: 'POST' });
  cargarLikes();
};

async function cargarLikes() {
  const res = await fetch(`${API}/likes`);
  const data = await res.json();
  likeCount.textContent = data.total;
  likeBtn.textContent = data.liked ? '❤️' : '🤍';
}


//Mostrar Template
const temp = document.querySelector('template')
const newTemp = temp.content.cloneNode(true);
document.body.appendChild(newTemp);

//Muestra el valor del rango 
const range = document.getElementById('miRango');

// Actualizar el title cuando cambie el valor
range.addEventListener('input', function() {
  this.title = `Valor: ${this.value}`;
});

//Muestra el valor de Rango2
const range2 = document.getElementById('miRango2');
const valorDisplay = document.getElementById('valorRango');

range2.addEventListener('input', function() {
  valorDisplay.textContent = this.value;
  this.title = `Valor: ${this.value}`;
});

//Muestra el valor de Rango3
const range3 = document.getElementById('miRango3');
const output = document.getElementById('rangeOutput');

range3.addEventListener('input', function() {
  output.value = this.value;
  this.title = `Cantidad: ${this.value}`;
});