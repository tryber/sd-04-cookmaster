document
  .querySelectorAll('button[type="button"]')
  .forEach((btn) => btn.addEventListener('click', (event) => event.target.parentElement.remove()));

document
  .querySelector('a[data-testid="adicionar-ingrediente"]')
  .addEventListener('click', () => {
    const inputIngredients = document.getElementById('ingredientes');

    if (inputIngredients.value !== '') {
      const ul = document.querySelector('ul');
      const li = document.createElement('li');
      const input = document.createElement('input');
      const button = document.createElement('button');

      button.appendChild(document.createTextNode('Excluir Ingrediente'));
      button.onclick = function (event) {
        event.target.parentElement.remove();
      };

      input.value = inputIngredients.value;
      input.id = inputIngredients.value;
      input.name = 'ingredients[]';

      li.appendChild(input);
      li.appendChild(button);
      ul.appendChild(li);

      inputIngredients.value = '';
    }
  });
