<template>
      <div class="frame">
        <div name="cabecalho" class="titulo">
            Resultado Copa F1AV
        </div>

        <div
          class="position_master"
          v-for="equip of tableEquip"
          :key="equip.nameEquip"
        >
          <div class="position_equipe_logo table-cell">
            <div :class="getClassColorPosition(equip.position)">
              {{ equip.position }}
            </div>
            <div class="coll_div_barra">
              <img
                class="image_cabecalho"
                :src="getBarraEquip(equip.equip)"
                alt="Equipes"
              />
            </div>
            <div class="coll_div_barra coll_texto_equipe">
              {{ equip.nameEquip }}
            </div>             
          </div>         
          <div class="position_pts table-cell">
            <div class="number_pts">{{ equip.totalPts }}</div>
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
      equip: {
        position: null,
        totalPts: null,
        nameEquip: "",
      },
      tableEquip: [],
      errors: [],
      dataEvent: "",
      isError: false,
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
      this.isError = true;
    }

    if (
      this.$route.query.temporada === null ||
      isNaN(this.$route.query.temporada)
    ) {
      this.error =
        "Temporada não informada não informada, informe o número da temporada, exemplo: 2";
      console.log(
        "Temporada não informada não informada, informe o número da temporada, exemplo: 2"
      );
      console.log(this.$route.query.temporada);
      this.isError = true;
    }   

    if (!this.isError) {
        if (
          this.$route.query.data !== null
        ) {
            this.dataEvent = this.$route.query.data;

            TableDrivers.getTableEquipCopaComData(this.$route.query.categoria, this.$route.query.temporada, this.dataEvent)
            .then((result) => {
                this.tableEquip = result.data;
            })
            .catch((e) => {
                console.log(e);
            });     
        } else {
            TableDrivers.getTableEquipCopa(this.$route.query.categoria, this.$route.query.temporada)
            .then((result) => {
                this.tableEquip = result.data;
            })
            .catch((e) => {
                console.log(e);
            });          
        }
    }
  },
  methods: {
    getClassColorPosition(position) {
      if (position <= 1) return "coll_div_position destaque_position";
      else if (position >= 2) return "coll_div_position descenso_position";
      else return "coll_div_position meio_position";
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
  .titulo {
    text-align: center;
    padding-left: 5px;
    padding-top: 17px;
    padding-bottom: 17px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 22px;
    color: white;
  }

  .destaque_position {
    background-color: #24dd5c;
  }  
</style>