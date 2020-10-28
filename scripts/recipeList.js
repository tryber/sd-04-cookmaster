const list = [];

const addIngredient = () => { // eslint-disable-line
  const li = document.createElement('li');
  const ul = document.getElementsByTagName('ul')[0];
  const listInput = document.getElementById('listInput');
  const listItems = document.getElementById('listItems');
  li.innerHTML = `<span>${listInput.value}</span>
          <button
            type="button"
            class="button"
          >
            Excluir Ingrediente
          </button>`;
  li.children[1].onclick = () => {
    li.remove();
    list.splice(list.indexOf(li.children[0].textContent), 1);
  };
  ul.appendChild(li);
  list.push(listInput.value);
  listItems.value = [...list];
  listInput.value = '';
};
