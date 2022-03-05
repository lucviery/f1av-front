<template>
  <div class="about">
    <div class="container">
      <table class="table_rodape">
        <thead>
          <tr style="text-align: left">
            <th rowspan="2">|</th>
            <th colspan="4" style="padding-top: 15px">TABELA DE</th>
          </tr>
          <tr style="text-align: left">
            <th colspan="4" style="padding-bottom: 15px">CONSTRUTORES</th>
          </tr>
        </thead>
      </table>
      <table>
        <tbody>
          <tr v-for="team of tableTeam" :key="team.teamId">
            <td class="td" style="text-align: center">
              <div id="my_box" :class="getClassColorPosition(team.position)">
                {{ team.position }}
              </div>
            </td>
            <td class="td">{{ team.equip }}</td>
            <td class="td_trans">{{ team.pts }}</td>
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
    getClassColorPosition(position) {
      if (position < 5) return "td_pos_first_four";
      else return "td_pos";
    },
  },
};
</script>
