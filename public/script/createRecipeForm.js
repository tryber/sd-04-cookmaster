function addEvents(addIngredientBtn, ingredientsList, ingredientesInput) {
  addIngredientBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const li = document.createElement('li');
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
    button.style.marginLeft = '10px';
    button.innerText = 'Excluir Ingrediente';
    button.className = 'btn-danger';
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
  addEvents(addIngredientBtn, ingredientsList, ingredientesInput);
};
