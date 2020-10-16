function createListItem() {
  const li = document.createElement('li');
  return li;
}

function createInput(newValue) {
  const input = document.createElement('input');
  input.id = newValue;
  input.value = newValue;
  input.name = 'recipeIngredients[]';
  return input;
}

function createButton() {
  const button = document.createElement('button');
  button.textContent = 'Excluir Ingrediente';
  button.type = 'button';
  button.onclick = function () {
    event.target.parentElement.remove();
  };
  return button;
}

// Adicionar ingrediente add
function add() {
  const newIngredient = document.getElementById('ingredientInput');
  if (newIngredient.value !== '') {
    const ul = document.querySelector('ul');
    const li = createListItem();
    const input = createInput(newIngredient.value);
    const button = createButton();

    li.appendChild(input);
    li.appendChild(button);
    ul.appendChild(li);
  }
}

module.exports = { add, };