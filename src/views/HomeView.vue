<template>
  <div class="about">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Contatos</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        <li>
          <div class="card-panel red lighten-4">Campo</div>
        </li>
      </ul>

      <form>
        <label>Nome</label>
        <input type="text" placeholder="Nome" />
        <label>Sexo</label>
        <p>
          <label>
            <input name="gener" type="radio" value="Masculino" />
            <span>Masculino</span>
          </label>
        </p>
        <p>
          <label>
            <input name="gener" type="radio" value="Femininio" />
            <span>Feminino</span>
          </label>
        </p>
        <label>Telefone</label>
        <input type="text" placeholder="Telefone" />
        <label>Email</label>
        <input type="email" placeholder="Valor" />

        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>SEXO</th>
            <th>TELEFONE</th>
            <th>E-MAIL</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>contact name</td>
            <td>contact gener</td>
            <td>contact telephone</td>
            <td>contact email</td>
            <td>
              <button class="waves-effect btn-small blue darken-1">
                <i class="material-icons">create</i>
              </button>
              <button class="waves-effect btn-small red darken-1">
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TableDrivers from "../services/table-drivers-transmission";

export default {
  mounted() {
    TableDrivers.getTableAtualizada().then((result) => {
      console.log(result);
    });
  },
};
</script>
