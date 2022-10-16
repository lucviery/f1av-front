<template>
	<div>{{ error }}</div>
	<div style="display: inline-block;vertical-align: top">
		<div class="container">
			<div class="titulo"><div style="font-weight: bolder;">Real Time: {{dateUpdate}}</div></div>
			<div class="ctnFlex">
				<div class="op1">
					<div class="divTable">
						<div class="divTableBody">
							<div class="divTableRow">
								<div class="divTableCell" style="font-weight: bold">POS</div>
								<div class="divTableCell divTableCellName" style="font-weight: bold">Piloto</div>
								<div class="divTableCell" style="font-weight: bold">Voltas</div>
								<div class="divTableCell" style="font-weight: bold">PU</div>
								<div class="divTableCell" style="font-weight: bold">Avisos</div>
								<div class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-rodaeDireita.png" width="55" heigth="55" /></div>
								<div class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-rodaesquerda.png" width="55" heigth="55" /></div>
								<div class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-traseiraDir.png" width="55" heigth="55" /></div>
								<div class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-traseiraEsqr.png" width="55" heigth="55" /></div>
								<div class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-ASA_esq.png" width="55" heigth="55" /></div>
								<div class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-ASA_dir.png" width="55" heigth="55" /></div>
								<div class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-AsaTraseira.png" width="55" heigth="55" /></div>
								<div class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-assoalho.png" width="55" heigth="55" /></div>
								<div class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-SidePod-duplo.png" width="55" heigth="55" /></div>
								<div class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-diferencial.png" width="55" heigth="55" /></div>
								<div class="divTableCell" style="font-weight: bold">Fuel</div>
								<div class="divTableCell" style="font-weight: bold">TAL</div>
								<div class="divTableCell" style="font-weight: bold">ERS</div>
								<div class="divTableCell" style="font-weight: bold">Pneus</div>
							</div>
							<div class="divTableRow" v-for="telemetryRealTime of tableTelemetryRealTime"
								:key="telemetryRealTime.position">
								<div class="divTableCell"> {{ telemetryRealTime.position }}</div>
								<div class="divTableCell divTableCellName"> {{ telemetryRealTime.name }}</div>
								<div class="divTableCell">{{ telemetryRealTime.currentLap }}</div>
								<div class="divTableCell">{{ telemetryRealTime.penalties }}</div>
								<div class="divTableCell">{{ telemetryRealTime.warnings }}</div>
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
							</div>
						</div>
					</div>
				</div>
				<div class="op2">
					<div class="divTableBody">
						<div class="divTableRow">
							<div class="divSpace" style="font-weight: bold">{{getsessionType()}}</div>
						</div>						
						<div class="divTableRow" v-for="itemWeatherForecast of detailsEvent.weatherForecastSamples"
									:key="itemWeatherForecast.id">
							<div class="divSpace">
								<img class="image_cabecalho" :src="getLogWeatherCorrida(itemWeatherForecast.timeOffset)" width="50"
									heigth="50" />
								<br />
								{{getOffSetCorrida(itemWeatherForecast.timeOffset)}}
							</div>
						</div>					
					</div>
					<div class="statusCorridaSC" :style="enableSC()">
						<div class="fa-blink" style="background-color: black; font-size: xx-large; color: white;">
							{{getSCorVSC()}}		
						</div>
					</div>
					<div class="statusCorridaFormation" :style="enableFormationLap()">
						<div class="fa-blink" style="background-color: black; font-size: xx-large; color: white;">
							{{getFormationLap()}}		
						</div>
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
			timer: "",
			dateUpdate: "",
			tableTelemetryRealTime: [],
			errors: [],
			details: {
				sessionType: "",
				formula: "",
				trackId: "",
				trackLength: null,
				totalLaps: null,
				airTemperature: null,
				trackTemperature: null,
				sessionTimeLeft: null,
				sessionDuration: null,
				weather: "",
				pitSpeedLimit: null,
				safetyCarStatus: "",
				weatherForecastSamples: [],
			},
			weather: {
				id: null,
				sessionType: "",
				timeOffset: null,
				weather: "",
				rainPercentage: null,
			},
			detailsEvent: null,
		};
	},
	created() {
		this.fetchData();
		this.timer = setInterval(this.fetchData, 5000);
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
			TelemetryApi.getDetailsEvent(this.$route.query.season)
				.then((result) => {
					this.detailsEvent = result.data;
				})
				.catch((e) => {
					console.log(e);
				});
		}
	},
	methods: {
		async fetchData() {
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
						if (this.tableTelemetryRealTime.length !== result.data.length) {
							this.tableTelemetryRealTime = [];
							console.log("Registros diferentes!");
						}

						this.tableTelemetryRealTime = result.data;
					})
					.catch((e) => {
						console.log(e);
					});

				TelemetryApi.getDetailsEvent(this.$route.query.season)
					.then((result) => {
						this.detailsEvent = result.data;
					})
					.catch((e) => {
						console.log(e);
					});

				this.dateUpdate = formatDate(Date.now());
			}
		},
		cancelAutoUpdate() {
			clearInterval(this.timer);
		},
		getLogWeatherQualy(offSet) {
			let weather = "";

			this.detailsEvent.weatherForecastSamples.forEach(i => {
				if (offSet === i.timeOffset)
					weather = i.weather;
			});

			if (weather !== "") {
				var images = require.context(
					"../../assets/icons-telemetry/",
					false,
					/\.jpg$/
				);

				return images("./" + weather + ".jpg");
			}
			else
				return "";
		},
		getOffSetQualy(offSet) {
			let timeOffset = -1;

			this.detailsEvent.weatherForecastSamples.forEach(i => {
				if (offSet === i.timeOffset)
					timeOffset = i.timeOffset;
			});

			if (timeOffset >= 0)
				return timeOffset.toString() + " min";
			else
				return "";
		},
		getLogWeatherCorrida(offSet) {
			let weather = "";

			this.detailsEvent.weatherForecastSamples.forEach(i => {
				if (offSet === i.timeOffset)
					weather = i.weather;
			});

			if (weather !== "") {
				var images = require.context(
					"../../assets/icons-telemetry/",
					false,
					/\.jpg$/
				);

				return images("./" + weather + ".jpg");
			}
			else
				return "";
		},
		getOffSetCorrida(offSet) {
			let timeOffset = -1;

			this.detailsEvent.weatherForecastSamples.forEach(i => {
				if (offSet === i.timeOffset)
					timeOffset = i.timeOffset;
			});

			if (timeOffset >= 0)
				return timeOffset.toString() + " min";
			else
				return "";
		},
		enableSC() {
			if (this.detailsEvent.safetyCarStatus === "FULL_SAFETY_CAR")
				return "visibility: visible;";			

			if (this.detailsEvent.safetyCarStatus === "VIRTUAL_SAFETY_CAR")
				return "visibility: visible;";			

			return "visibility: hidden;";	
		},
		getSCorVSC() {
			if (this.detailsEvent.safetyCarStatus === "FULL_SAFETY_CAR")
				return "SC";

			if (this.detailsEvent.safetyCarStatus === "VIRTUAL_SAFETY_CAR")
				return "VSC";											
			
			return "";
		},
		getsessionType() {
			if (this.detailsEvent.sessionType === "R")
				return "Corrida";
				else
					if (this.detailsEvent.sessionType === "SHORT_Q")
						return "Qualy";
						else 
							return this.detailsEvent.sessionType;
		},
		enableFormationLap() {
			if (this.detailsEvent.safetyCarStatus === "FORMATION_LAP")
				return "visibility: visible;";			
			else
				return "visibility: hidden;";
		},
		getFormationLap() {
			if (this.detailsEvent.safetyCarStatus === "FORMATION_LAP")
				return "FL";	

			return "";
		},
	},
};

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	let hour = d.getHours();
	let minute = d.getMinutes();
	let second = d.getSeconds();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	if (hour < 10) hour = '0' + hour;
	if (minute < 10) minute = '0' + minute;
	if (second < 10) second = '0' + second;

	return [day, month, year].join('/') + ' ' + [hour, minute, second].join(':');
}
</script>
<style>
.divSpace {
	border: 0px;
	display: table-cell;
	padding: 3px 10px;
	vertical-align: middle;
}
.divTable {
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
.divTableCell,
.divTableHead {
	border: 1px solid #999999;
	display: table-cell;
	padding: 3px 8px;
	vertical-align: middle;
}
.divTableCellName {
	text-align: left;
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

.container{
  display: flex;
  flex-direction: column;
}
.titulo {
	background-color: rgb(100, 100, 102);
	text-align: left;
	position: relative;
	padding: 5px;
	color: aliceblue;
}
.ctnFlex{
	display: flex;
	justify-content: space-between;
}
 div.op1 {
	display: inline-block;
	background-color: rgb(243, 237, 237);
	text-align: center;
}
div.op2 {
	background-color: #809983;
	display: inline-block;
	margin-right: 0vw;
	text-align: center;
}
div.statusCorridaSC {
	padding: 8px; 
	vertical-align: middle; 
	text-align: center; 
	background-color: yellow;
}
div.statusCorridaFormation {
	padding: 8px; 
	vertical-align: middle; 
	text-align: center; 
	background-color: green;
}
div.statusCorridaDisabled {
	padding: 8px; 
	vertical-align: middle; 
	text-align: center; 
	background-color: black;
}

@keyframes fa-blink {
     0% { opacity: 1; }
     50% { opacity: 0.5; }
     100% { opacity: 0; }
 }
.fa-blink {
   -webkit-animation: fa-blink .75s linear infinite;
   -moz-animation: fa-blink .75s linear infinite;
   -ms-animation: fa-blink .75s linear infinite;
   -o-animation: fa-blink .75s linear infinite;
   animation: fa-blink .75s linear infinite;
}
</style>