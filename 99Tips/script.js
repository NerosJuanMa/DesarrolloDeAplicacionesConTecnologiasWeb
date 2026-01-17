
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
