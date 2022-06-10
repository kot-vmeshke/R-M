const root = document.getElementById('root');
const charactersWrap = root.querySelector('#characters-wrap');
let charactersCount = 826;
let showCharactersCount = 5;
let cellsCount = 5;
const input = root.querySelector('#search-input');
const btnSearch = root.querySelector('#search-btn');
const btnLoadMore = root.querySelector('.load-more');

if (localStorage.length) {
  for (let i = 0; i < localStorage.length; i++) {
    let img = document.createElement('div');
    img.classList.add('character');
    img.setAttribute('id', localStorage.key(i));
    img.style.background = `url(${localStorage.getItem(localStorage.key(i))}) no-repeat center / cover`;
    img.innerHTML = `
      <div class="btn-delete" data-id="${localStorage.key(i)}">
      </div>
    `;
    charactersWrap.appendChild(img);
  }
  if (localStorage.length > showCharactersCount) {
    btnLoadMore.style.display = 'block';
  }
  let characters = root.querySelectorAll('.character');
  for (let n = 0; n < localStorage.length - showCharactersCount; n++) {
    characters[n].style.display = 'none';
  }
}

btnSearch.addEventListener('click', () => {
  let index = parseInt(input.value);
  if (localStorage.getItem(`${index}-RM`)) {
    alert('Character is already in the list');
  } else {
    if (index > charactersCount) {
      alert('Character not found, please input number from 1 to 826');
    } else {
      if (!isNaN(index)) {
        fetch(`https://rickandmortyapi.com/api/character/${index}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let background = data.image;
            localStorage.setItem(`${index}-RM`, background);
            let img = document.createElement('div');
            img.classList.add('character');
            img.setAttribute('id', index);
            img.style.background = `url(${background}) no-repeat center / cover`;
            img.innerHTML = `
              <div class="btn-delete" data-id="${index}">
              </div>
            `;
            charactersWrap.appendChild(img);
            if (localStorage.length > showCharactersCount) {
              btnLoadMore.style.display = 'block';
            }
            let characters = root.querySelectorAll('.character');
            if (characters.length > showCharactersCount) {
              for (let n = 0; n < characters.length - showCharactersCount; n++) {
                characters[n].style.display = 'none';
              }
            }
          });
      }
    }
  }
})

charactersWrap.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-delete')) {
    let character = document.getElementById(`${event.target.dataset.id}`);
    if (confirm('Do you want to delete this character?')) {
      charactersWrap.removeChild(character);
      localStorage.removeItem(`${parseInt(event.target.dataset.id)}-RM`);
    }
  }
});

let characters = root.querySelectorAll('.character');
btnLoadMore.addEventListener('click', () => {
  for (let n = 0; n < characters.length; n++) {
    if (n >= characters.length - showCharactersCount || n === 0) {
      characters[n].style.display = 'flex';
    } else {
      characters[n].style.display = 'none';
    }
  }
  showCharactersCount += cellsCount;
  window.scrollTo({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth'
  });
})