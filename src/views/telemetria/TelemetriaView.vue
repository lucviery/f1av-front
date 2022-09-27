<template>
  <div>{{ error }}</div>
  <div style="display: inline-block;vertical-align: top">
    <div style="font-weight: bolder;">Qualy</div>
    <div class="frame"
        v-for="weather of tableWeatherForecast"
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
        v-for="weather of tableWeatherForecast"
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
      tableWeatherForecast: [],
      errors: [],
    };
  },      
  mounted() {
    TelemetryApi.getWeatherTelemetry()
      .then((result) => {
        console.log(result.data);
        this.tableWeatherForecast = result.data;
      })
      .catch((e) => {
        console.log(e);
      });
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