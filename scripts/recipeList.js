const list = [];
let existingLis = document.getElementsByTagName('li');
const listInput = document.getElementById('listInput');
const listItems = document.getElementById('listItems');
existingLis = [...existingLis];

if (existingLis) {
  existingLis.map((li) => {
    list.push(li.children[0].innerHTML);
    li.children[1].addEventListener('click', () => {
      list.splice(list.indexOf(li.children[0].textContent), 1);
      listItems.value = [...list];
      li.remove();
    });
    return null;
  });
  listItems.value = [...list];
  listInput.value = '';
}

const addIngredient = () => { // eslint-disable-line
  const li = document.createElement('li');
  const ul = document.getElementsByTagName('ul')[0];
  li.innerHTML = `<span>${listInput.value}</span>
          <button type="button" class="button">
            Excluir Ingrediente
          </button>`;
  li.children[1].addEventListener('click', () => {
    list.splice(list.indexOf(li.children[0].textContent), 1);
    li.remove();
  });
  ul.appendChild(li);
  list.push(listInput.value);
  listItems.value = [...list];
  listInput.value = '';
};
