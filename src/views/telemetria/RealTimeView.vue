<template>
  <div>{{ error }}</div>
  <div style="display: inline-block;vertical-align: top">
    <div style="font-weight: bolder;">Real Time</div>
    <div class="divTable">
		<div class="divTableBody">
			<div class="divTableRow">
				<div class="divTableCell">POS</div>
				<div class="divTableCell">Piloto</div>
				<div class="divTableCell">Lap</div>
				<div class="divTableCell">PU</div>
				<div class="divTableCell">WA</div>
				<div class="divTableCell">Status</div>
				<div class="divTableCell">WFR</div>
				<div class="divTableCell">WFL</div>
				<div class="divTableCell">WRR</div>
				<div class="divTableCell">WRL</div>
				<div class="divTableCell">FLWD</div>
				<div class="divTableCell">FRWD</div>
				<div class="divTableCell">RWD</div>
				<div class="divTableCell">Floor</div>
				<div class="divTableCell">SID</div>
				<div class="divTableCell">DIF</div>
				<div class="divTableCell">Fuel</div>
				<div class="divTableCell">TAL</div>
				<div class="divTableCell">ERS</div>
				<div class="divTableCell">Pneus</div>
				<div class="divTableCell">Qualy</div>
				<div class="divTableCell">Corrida</div>
			</div>
			<div class="divTableRow"       
				v-for="telemetryRealTime of tableTelemetryRealTime" :key="telemetryRealTime.position">
				<div class="divTableCell"> {{ telemetryRealTime.position }}</div>
				<div class="divTableCell"> {{ telemetryRealTime.name }}</div>
				<div class="divTableCell">{{ telemetryRealTime.currentLap }}</div>
				<div class="divTableCell">{{ telemetryRealTime.penalties }}</div>
				<div class="divTableCell">{{ telemetryRealTime.warnings }}</div>
				<div class="divTableCell">{{ telemetryRealTime.status }}</div>
				<div class="divTableCell">{{ telemetryRealTime.perWearFrontRight }}</div>
				<div class="divTableCell">{{ telemetryRealTime.perWearFrontLeft }}</div>
				<div class="divTableCell">{{ telemetryRealTime.perWearRearRight }}</div>
				<div class="divTableCell">{{ telemetryRealTime.perWearRearLeft }}</div>
				<div class="divTableCell">{{ telemetryRealTime.perFrontLeftWingDamage }}</div>
				<div class="divTableCell">{{ telemetryRealTime.perFrontRightWingDamage }}</div>
				<div class="divTableCell">{{ telemetryRealTime.perRearWingDamage }}</div>
				<div class="divTableCell">{{ telemetryRealTime.floorDamage }}</div>
				<div class="divTableCell">{{ telemetryRealTime.sidpodDamage }}</div>
				<div class="divTableCell">{{ telemetryRealTime.diffuserDamage }}</div>
				<div class="divTableCell">{{ telemetryRealTime.fuelRemainingLaps }}</div>
				<div class="divTableCell">{{ telemetryRealTime.tyresAgeLpas }}</div>
				<div class="divTableCell">{{ telemetryRealTime.ersStoreEnergy }}</div>
				<div class="divTableCell">{{ telemetryRealTime.tyre }}</div>
				<div class="divTableCell">
					<img class="image_cabecalho" :src="getLogWeatherQualy(telemetryRealTime.position)" width="50" heigth="50"/>
					{{getOffSetQualy(telemetryRealTime.position)}}
				</div>
				<div class="divTableCell">
					<img class="image_cabecalho" :src="getLogWeatherCorrida(telemetryRealTime.position)" width="50" heigth="50"/>
					{{getOffSetCorrida(telemetryRealTime.position)}}
				</div>				
			</div>			
		</div>
	</div>    
  </div>
</template>
<script>
import RealTimeTelemetry from "../../services/telemetry";
import TelemetryApi from "../../services/telemetry";
export default {
  data() {
    return {
      telemetryRealTime: {
        position: null,
        name: "",
        currentLap: null,
        penalties: "",
        warnings: null,
		status: null,
		perWearFrontRight: null,
		perWearFrontLeft: null,
		perWearRearRight: null,
		perWearRearLeft: null,
		perFrontLeftWingDamage: null,
		perFrontRightWingDamage: null,
		perRearWingDamage: null,
		floorDamage: null,
		diffuserDamage: null,
		sidpodDamage: null,
		fuelRemainingLaps: null,
		tyresAgeLpas: null,
		ersStoreEnergy: null,
		tyre: null,
      },
      tableTelemetryRealTime: [],
      errors: [],
      weather: {
        id: null,
        sessionType: "",
        timeOffset: null,
        weather: "",
        rainPercentage: null,
      },
      tableWeatherForecastCorrida: [],  
		tableWeatherForecastQualy: [],
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
		RealTimeTelemetry.getRealTimeTelemetry(this.$route.query.season)
		.then((result) => {
			this.tableTelemetryRealTime = result.data;
		})
		.catch((e) => {
			console.log(e);
		});
		TelemetryApi.getWeatherTelemetry(this.$route.query.season, "R")
		.then((result) => {
			console.log(result.data);
			this.tableWeatherForecastCorrida = result.data;
		})
		.catch((e) => {
			console.log(e);
		});
		TelemetryApi.getWeatherTelemetry(this.$route.query.season, "SHORT_Q")
		.then((result) => {
			console.log(result.data);
			this.tableWeatherForecastQualy = result.data;
		})
		.catch((e) => {
			console.log(e);
		});	
	}  	     
  },    
  methods: {
	getLogWeatherQualy(index) {
		index = index - 1;
		if (this.tableWeatherForecastQualy.length > (index)) {
			var images = require.context(
			"../../assets/icons-telemetry/",
			false,
			/\.jpg$/
			);

			return images("./" + this.tableWeatherForecastQualy[index].weather + ".jpg");
		} else {
			return "";
		}
    }, 
	getOffSetQualy(index) {
		index = index - 1;
		if (this.tableWeatherForecastQualy.length > (index)) {
			return this.tableWeatherForecastQualy[index].timeOffset + " min";
		} else {
			return "-";
		}		
    },
	getLogWeatherCorrida(index) {
		index = index - 1;
		if (this.tableWeatherForecastCorrida.length > (index)) {
			var images = require.context(
			"../../assets/icons-telemetry/",
			false,
			/\.jpg$/
			);

			return images("./" + this.tableWeatherForecastCorrida[index].weather + ".jpg");
		} else {
			return "";
		}
    }, 
	getOffSetCorrida(index) {
		index = index - 1;
		if (this.tableWeatherForecastCorrida.length > (index)) {
			return this.tableWeatherForecastCorrida[index].timeOffset + " min";
		} else {
			return "-";
		}		
    }, 	 
  },
};

</script>
<style>
  /* DivTable.com */
.divTable{
	display: table;
	width: 100%;
}
.divTableRow {
	display: table-row;
}
.divTableHeading {
	background-color: #EEE;
	display: table-header-group;
}
.divTableCell, .divTableHead {
	border: 1px solid #999999;
	display: table-cell;
	padding: 3px 10px;
}
.divTableHeading {
	background-color: #EEE;
	display: table-header-group;
	font-weight: bold;
}
.divTableFoot {
	background-color: #EEE;
	display: table-footer-group;
	font-weight: bold;
}
.divTableBody {
	display: table-row-group;
}
</style>