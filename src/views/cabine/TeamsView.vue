<template>
  <div class="frame">
    <div name="cabecalho" class="cabecalho cabecalhoTeams">
      <img
        class="image_cabecalho"
        src="../../assets/topo_constructors.png"
        alt="Equipes"
      />
    </div>
    <div class="position_master" v-for="team of tableTeam" :key="team.teamId">
      <div class="position_equipe_logo table-cell">
        <div class="coll_div_position">{{ team.position }}</div>
        <div class="coll_div_barra">
          <img
            class="image_cabecalho"
            :src="getBarraEquip(team.equip)"
            alt="Equipes"
          />
        </div>
        <div class="coll_div_barra coll_texto_equipe">
          {{ team.nameTableResult }}
        </div>
      </div>
      <div class="position_pts table-cell">
        <div class="number_pts">{{ team.pts }}</div>
      </div>
    </div>
    <div name="rodape" class="rodape">
      <img
        class="image_cabecalho"
        src="../../assets/endereco_site.png"
        alt="Equipes"
      />
    </div>
  </div>
</template>

<script>
import TableDrivers from "../../services/table-drivers-transmission";

export default {
  data() {
    return {
      team: {
        teamId: null,
        position: null,
        pts: null,
        equip: "",
      },
      tableTeam: [],
      errors: [],
    };
  },
  mounted() {
    TableDrivers.getTableConstructor(10)
      .then((result) => {
        this.tableTeam = result.data;

        console.log(this.tableTeam);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    getLogEquip(equip) {
      if (equip.trim() !== "") {
        let pic = equip.replace(/\s+/g, "");

        var images = require.context(
          "../../assets/logos-equipes/",
          false,
          /\.png$/
        );

        return images("./" + pic + ".png");
      } else {
        return "";
      }
    },
    getBarraEquip(equip) {
      if (equip.trim() !== "") {
        let pic = equip.replace(/\s+/g, "");

        var images = require.context(
          "../../assets/barras-equipes/",
          false,
          /\.png$/
        );

        return images("./" + pic + ".png");
      } else {
        return "";
      }
    },
  },
};
</script>
<style>
.coll_texto_equipe {
  width: 280px;
}
</style>
