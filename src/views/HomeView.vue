<template>
  <div class="about">
    <div class="container">
      <div>{{ error }}</div>
      <table class="table_rodape">
        <thead>
          <tr style="text-align: left">
            <th rowspan="2">|</th>
            <th colspan="4" style="padding-top: 15px">TABELA DE</th>
          </tr>
          <tr style="text-align: left">
            <th colspan="4" style="padding-bottom: 15px">PILOTOS</th>
          </tr>
        </thead>
      </table>
      <table>
        <tbody>
          <tr v-for="driver of tableDrivers" :key="driver.id">
            <td class="td" style="text-align: center">
              <div id="my_box" class="td_pos">
                {{ driver.position }}
              </div>
            </td>
            <td class="td" style="text-align: center">
              <div class="td_traco" :style="getColorEquip(driver.equip)"></div>
            </td>
            <td class="td">{{ driver.nameDriver }}</td>
            <td class="td">
              <img
                :src="getLogEquip(driver.equip)"
                width="25"
                height="25"
                :alt="driver.equip"
              />
            </td>
            <td class="td_trans">{{ driver.pts }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table_rodape">
        <tr style="text-align: center">
          <td style="padding-top: 15px; padding-bottom: 15px">
            WWW.LIGAF1AV.COM
          </td>
        </tr>
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
    if (
      this.$route.query.temporada === null ||
      isNaN(this.$route.query.temporada)
    ) {
      this.error =
        "Temporada não informada, informe o número da temporada, exemplo: 10";
      console.log(
        "Temporada não informada, informe o número da temporada, exemplo: 10"
      );
      console.log(this.$route.query.temporada);
    }

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

    TableDrivers.getTableAtualizada(
      this.$route.query.categoria,
      this.$route.query.temporada
    )
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
          "../assets/logos-equipes/",
          false,
          /\.png$/
        );

        return images("./" + pic + ".png");
      } else {
        return "";
      }
    },
    getColorEquip(equip) {
      equip = equip.replace(/\s+/g, "");

      if (equip.trim() === "WILLIAMS") {
        return "background-color: #00a0de";
      } else {
        if (equip.trim() === "MERCEDES") {
          return "background-color: #2ea76f";
        } else {
          if (equip.trim() === "MCLAREN") {
            return "background-color: #eb911e";
          } else {
            if (equip.trim() === "HAAS") {
              return "background-color: #e5203f";
            } else {
              if (equip.trim() === "ALFAROMEO") {
                return "background-color: #630505";
              } else {
                if (equip.trim() === "FERRARI") {
                  return "background-color: red";
                } else {
                  if (equip.trim() === "ASTONMARTIN") {
                    return "background-color: #11544c";
                  } else {
                    if (equip.trim() === "ALPINE") {
                      return "background-color: #118ff4";
                    } else {
                      if (equip.trim() === "ALPHATAURI") {
                        return "background-color: #272745";
                      } else {
                        if (equip.trim() === "REDBULL") {
                          return "background-color: #7813ba";
                        } else {
                          return "background-color: black";
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
  },
};
</script>

<style>
table {
  width: 100%;
  background-color: black;
  color: white;
  font-weight: bold;
  line-height: 1;
  font-size: 25px;
  font-family: system-ui;
}

th,
td {
  border: 0px solid black;
}

.td {
  padding-bottom: 10px;
}

.td_trans {
  padding-bottom: 10px;
  padding-left: 10px;
  background: rgba(255, 255, 255, 0.2);
}

.table_rodape {
  background: rgba(0, 0, 0, 0.5);
}

.td_pos {
  width: 35px;
  background-color: white;
  color: black;
}

.td_pos_first_four {
  width: 35px;
  background-color: green;
  color: white;
}

.td_traco {
  width: 7px;
  height: 20px;
  background-color: red;
}
</style>
