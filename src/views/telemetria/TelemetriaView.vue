<template>
  <div>{{ error }}</div>
  <div style="display: inline-block;vertical-align: top">
    <div style="font-weight: bolder;">Qualy</div>
    <div class="frame"
        v-for="weather of tableWeatherForecastQualy"
        :key="weather.id">
      <div name="icon" v-if="weather.sessionType == 'SHORT_Q'">
        <img
          class="image_cabecalho"
          :src="getLogWeather(weather)"
          alt="CLEAR"
          width="50"
          heigth="50"
        />
        <div> {{weather.timeOffset}} min </div>
      </div>

    </div>
  </div>
  <div style="display: inline-block;vertical-align: top">
    <div style="font-weight: bolder;">Corrida</div>
    <div class="frame"
        v-for="weather of tableWeatherForecastCorrida"
        :key="weather.id">
      <div name="icon" v-if="weather.sessionType == 'R'">
        <img
          class="image_cabecalho"
          :src="getLogWeather(weather)"
          width="50"
          heigth="50"
        />
        <div> {{weather.timeOffset}} min </div>
      </div>
    </div>  
  </div>
</template>
<script>
import TelemetryApi from "../../services/telemetry";

export default {
  data() {
    return {
      weather: {
        id: null,
        sessionType: "",
        timeOffset: null,
        weather: "",
        rainPercentage: null,
      },
      tableWeatherForecastQualy: [],
      tableWeatherForecastCorrida: [],
      errors: [],
    };
  },      
  mounted() {
    if (
      this.$route.query.season === null ||
      isNaN(this.$route.query.season)
    ) {
      this.error =
        "Sessão não informada, informe o número da Sessão, exemplo: 2";
      console.log(
        "Sessão não informada, informe o número da Sessão, exemplo: 2"
      );
      console.log(this.$route.query.season);
    } else {    
      TelemetryApi.getWeatherTelemetry(this.$route.query.season, "SHORT_Q")
        .then((result) => {
          this.tableWeatherForecastQualy = result.data;

          TelemetryApi.getWeatherTelemetry(this.$route.query.season, "R")
            .then((result) => {
              this.tableWeatherForecastCorrida = result.data;

              console.log(this.tableWeatherForecastCorrida);
            })
            .catch((e) => {
              console.log(e);
            });          
            })
        .catch((e) => {
          console.log(e);
        });	      
    }
  },    
  methods: {
    getLogWeather(weather) {
        var images = require.context(
          "../../assets/icons-telemetry/",
          false,
          /\.jpg$/
        );

        return images("./" + weather.weather + ".jpg");
    },
  },
};

</script>