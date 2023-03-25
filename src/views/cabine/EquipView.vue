<template>
  <div class="frame">
    <div>{{ error }}</div>
    <div name="cabecalho" class="cabecalho">
      <img
        class="image_cabecalho"
        src="../../assets/equipes_top_2.png"
        alt="Equipes"
      />
    </div>
    <div class="position_master" v-for="team of tableTeam" :key="team.position">
      <div class="position_equipe_logo table-cell">
        <div class="coll_div_position meio_position">{{ team.position }}</div>
        <div class="coll_div_barra">
          <img
            class="image_cabecalho"
            :src="getBarraEquip(team.equip)"
            alt="Equipes"
          />
        </div>
        <div class="coll_div_barra coll_texto_equipe">{{ team.teamName !== null ? team.teamName : team.equip }}</div>
        <div class="coll_logo_equipe">
          <img
            class="image_cabecalho"
            :src="getLogEquip(team.equip)"
            alt="Equipes"
          />
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
    if (
      this.$route.query.categoria === null ||
      isNaN(this.$route.query.categoria)
    ) {
      this.error =
        "Categoria não informada, informe o número da categoria, exemplo: 2";
      console.log(
        "Categoria não informada, informe o número da categoria, exemplo: 2"
      );
      console.log(this.$route.query.categoria);
    }

    TableDrivers.getTableEquip(this.$route.query.categoria)
      .then((result) => {
        console.log(result.data);
        this.tableTeam = result.data;
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
.meio_position {
  background: #e6e6e6;
}
</style>
