<template>
      <div class="frame">
        <div name="cabecalho" class="cabecalho">
            Resultado Copa F1AV
        </div>
        <div
            class="position_master"
            v-for="equip of tableEquip"
            :key="equip.nameEquip"
        >
        <div>
          {{ equip.position }}
        </div>
        <div>
          {{ equip.nameEquip }}
        </div>
        <div>
          {{ equip.totalPts }}
        </div>       
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
          this.$route.query.data !== null &&
        !isNaN(this.$route.query.data)
        ) {
            this.dataEvent = datathis.$route.query.data;

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
};
</script>