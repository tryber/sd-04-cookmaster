<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cookmaster - Cadastro</title>
  </head>
  <body>
    <% if (message) {%>
    <div class="message"><%= message %></div>
    <% } %>
    <form action="/login" method="POST">
      <label for="emailInput">Email: </label>
      <input data-testid="email" type="text" name="email" id="emailInput" /><br />
      <label for="passwordInput">Senha: </label>
      <input data-testid="senha" type="password" name="password" id="passwordInput" /><br />
      <label for="confirmar-passwordInput">Confirmar senha: </label>
      <input data-testid="confirmar-senha" type="password" name="confirmar-password" id="confirmar-passwordInput" /><br />

      {/* <% if (redirect) { %>
      <input type="hidden" name="redirect" value="<%= decodeURIComponent(redirect) %>" />
      <% } %> */}

      <button href="/cadastro" data-testid="cadastrar" type="submit">Cadastre-se</button>
      <a href="/login" data-testid="login" type="submit">Login</a>
    </form>
  </body>
</html>
