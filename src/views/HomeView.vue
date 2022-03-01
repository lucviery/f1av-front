<template>
  <div class="about">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Contatos</a>
      </div>
    </nav>

    <div class="container">
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Equipe</th>
            <th>Pontos</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="driver of tableDrivers" :key="driver.id">
            <td>{{ driver.position }}</td>
            <td>{{ driver.nameDriver }}</td>
            <td>{{ driver.equip }}</td>
            <td>{{ driver.pts }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TableDrivers from "../services/table-drivers-transmission";

export default {
  data() {
    return {
      driver: {
        driverId: null,
        position: null,
        pts: null,
        nameDriver: "",
        equip: "",
      },
      tableDrivers: [],
      errors: [],
    };
  },
  mounted() {
    TableDrivers.getTableAtualizada(6, 10)
      .then((result) => {
        this.tableDrivers = result.data;

        console.log(this.tableDrivers);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
