function addButtons(addIngredientBtn, ingredientsList, ingredientesInput) {
  addIngredientBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const li = document.createElement('li');
    li.className = 'item-ingredient';
    const input = document.createElement('input');
    const button = document.createElement('button');

    input.value = ingredientesInput.value;
    input.name = 'ingredients[]';
    input.readOnly = 'true';
    input.className = 'border-0';
    li.appendChild(input);

    button.addEventListener('click', () => {
      e.preventDefault();
      li.remove();
    });
    button.style.marginLeft = '2px';
    button.innerText = 'Excluir Ingrediente';
    button.className = 'delete-button btn-danger';
    if (input.value) {
      li.appendChild(button);
      ingredientsList.appendChild(li);
    }
    ingredientesInput.value = '';
  });
}
window.onload = () => {
  const addIngredientBtn = document.getElementById('addIngredient');
  const ingredientsList = document.getElementById('ingredientsList');
  const ingredientesInput = document.getElementById('ingredientesInput');

  addButtons(addIngredientBtn, ingredientsList, ingredientesInput);
  const liArray = [...document.getElementsByTagName('li')] || [];
  liArray.forEach((li) => {
    li.children[1].addEventListener('click', (e) => {
      e.preventDefault();
      li.remove();
    });
  });
};
