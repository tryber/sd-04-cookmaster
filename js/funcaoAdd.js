
// function add() {
//     // return console.log("teste")

//     // salva o label addIngredients na variavel listaDeIngredientes
//     const campoIngrediente = document.getElementById('addIngredients').value;
    
//     if (campoIngrediente !=='') {
        
//         const inputIngredients = document.getElementById('input');
//         inputIngredients.id = campoIngrediente;
//         inputIngredients.value = campoIngrediente;
//         inputIngredients.name = 'ingredients[]';

//         const newButton = document.createElement('button');
//         newButton.type = 'button';
//         newButton.innerText = 'Excluir Ingrediente';
//         newButton.onclick = () =>{
//             return document.getElementById(campoIngrediente).parentElement.remove();
//         }
        
//         inputIngredients.innerText = addIngredients.value;

//         const itensList = document.createElement('li').appendChild(inputIngredients).appendChild(newButton);

//         const listIngredients = document.getElementById('listRecipes').appendChild(itensList);

//         document.getElementById('addIngredients').value ='';
//     }
//     return null;
// }
