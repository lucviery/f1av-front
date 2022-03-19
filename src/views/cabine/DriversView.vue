<template>
  <div class="frame">
    <div>{{ error }}</div>
    <div name="cabecalho" class="cabecalho">
      <img
        class="image_cabecalho"
        src="../../assets/pilotos_top.png"
        alt="Equipes"
      />
    </div>
    <div
      class="position_master"
      v-for="driver of tableDrivers"
      :key="driver.id"
    >
      <div class="position_equipe_logo table-cell">
        <div :class="getClassColorPosition(driver.position)">
          {{ driver.position }}
        </div>
        <div class="coll_div_barra">
          <img
            class="image_cabecalho"
            :src="getBarraEquip(driver.equip)"
            alt="Equipes"
          />
        </div>
        <div class="coll_div_barra coll_texto_equipe">
          {{ driver.nameDriver }}
        </div>
        <div class="coll_logo_equipe">
          <img
            class="image_cabecalho"
            :src="getLogEquip(driver.equip)"
            alt="Equipes"
          />
        </div>
      </div>
      <div class="position_pts table-cell">
        <div class="number_pts">{{ driver.pts }}</div>
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

    TableDrivers.getTableAtualizada(this.$route.query.categoria)
      .then((result) => {
        this.tableDrivers = result.data;
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
    getClassColorPosition(position) {
      if (position <= 3) return "coll_div_position destaque_position";
      else return "coll_div_position";
    },
  },
};
</script>

<style>
.destaque_position {
  background-color: #ffce7c;
}

.frame {
  position: relative;
  width: 440px;
}

.rodape {
  text-align: center;
  height: 85px;
  background: rgba(22, 22, 25, 0.2);
}

.cabecalho {
  text-align: center;
  padding-top: 5px;
  width: 440px;
  height: 74px;
  left: 0px;
  top: 0px;
  background: #161619;
  border: 1px solid #000000;
  box-sizing: border-box;
}

.image_cabecalho {
  left: 9px;
  top: 6px;
}

.position_master {
  width: 100%;
  height: 41px;
}

.position_equipe_logo {
  text-align: left;
  vertical-align: middle;
  width: 355px;
  height: 41px;
  background: #161619;
  border: 1px solid #000000;
  box-sizing: border-box;
  color: #e5e5e5;
  padding-left: 10px;
}

.position_pts {
  width: 85px;
  height: 41px;
  background: #e5e5e5;
  border: 1px solid #a6a6a6;
  box-sizing: border-box;
}

.table-cell {
  display: table-cell;
}

.number_pts {
  display: table-cell;
  height: 41px;
  width: 350px;
  text-align: center;
  vertical-align: middle;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 23.2px;
  line-height: 27px;
  letter-spacing: -0.045em;
  color: #666666;
}

.coll_div_position {
  display: table-cell;
  width: 28px;
  height: 28px;
  vertical-align: middle;
  text-align: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 22px;
  /* BLACK */
  color: #161619;
  background: #e6e6e6;
  border-radius: 0px 0px 0px 8px;
}

.coll_div_barra {
  display: table-cell;
  width: 28px;
  height: 28px;
  vertical-align: middle;
  text-align: center;
}

.coll_texto_equipe {
  text-align: left;
  padding-left: 5px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 22px;
  width: 207px;
  color: #c4ccd6;
}

.coll_logo_equipe {
  display: table-cell;
  vertical-align: middle;
  width: 60px;
  text-align: right;
  padding-right: 15px;
}
</style>
