<template>
	<div>{{ error }}</div>
	<div style="display: inline-block;vertical-align: top">
		<div class="container">
			<div class="titulo">
				<div class="ctnFlex">
					<div class="op2" style="font-weight: bolder;display: inline-block;" v-on:click="visibleCabecalho = !visibleCabecalho">
						<img v-if="visibleCabecalho" class="image_cabecalho" style="padding-right: 10px; vertical-align:middle;"
											src="../../assets/icons-telemetry/seta-baixo.png" width="20" heigth="20" />
						<img v-if="!visibleCabecalho" class="image_cabecalho" style="padding-right: 10px; vertical-align:middle;"
											src="../../assets/icons-telemetry/seta-direita.png" width="20" heigth="20" />
					</div>				
					<div class="op2">
						<div style="font-weight: bolder;display: inline-block;">Sessão: {{sessaoNome}}</div>
					</div>
					<div class="op2">
						<div style="font-weight: bolder;display: inline-block;">Tempo Sessão: {{sessionTimeLeft}}</div>
					</div>	
					<div class="op2">
						<div style="font-weight: bolder;display: inline-block;">Voltas: {{voltas}}</div>
					</div>	
					<div class="op2">
						<div style="font-weight: bolder;display: inline-block;">Real Time: {{dateUpdate}}</div>
					</div>													
				</div>								
			</div>
			<div v-if="visibleCabecalho" id="hide" class="titulo">
				<div class="ctnFlex">
					<div class="op2" style="text-align: left; padding: 5px; background-color: teal;">
						Circuito: <strong>{{circuito}}</strong><br />
						Grid: <strong>{{grid}}</strong><br />
						Data: <strong>{{data}}</strong><br />
					</div>
					<div class="op2" style="text-align: left; padding: 5px; background-color: teal;">
						Comprimento: <strong>{{trackLength}} metros</strong><br />
						Pit Speed: <strong>{{pitSpeedLimit}} km/h</strong><br />
						Sessão Duração: <strong>{{sessionDuration}}</strong><br />
					</div>	
					<div class="op2" style="text-align: left; padding: 5px; background-color: teal;">
						Clima: <strong>{{weatherDesc}}</strong><br />
						Temperatura Pista: <strong>{{trackTemperature}}º</strong><br />
						Temperatura Ar: <strong>{{airTemperature}}º</strong><br />
					</div>	
					<div class="op2" style="padding: 5px; background-color: darkviolet;">
						Melhor Volta<br />
						<strong>{{driverFastLap}}</strong><br />
						<strong>{{fastLap}}</strong><br />
					</div>													
				</div>
			</div>		
			<div class="ctnFlex">
				<div class="op1">
					<div class="divTable">
						<div class="divTableBody">
							<div class="divTableRow">
								<div class="divTableCell" style="font-weight: bold">POS</div>
								<div class="divTableCell divTableCellName" style="font-weight: bold">Piloto</div>
								<div class="divTableCell divTableCellName" style="font-weight: bold">U. Volta</div>
								<div class="divTableCell divTableCellName" style="font-weight: bold">Delta</div>
								<div title="Punições e Avisos." class="divTableCell" style="font-weight: bold"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/icon-pa.png" width="25" heigth="25" /></div>
								<div title="Danos a Asa dianteira esquerda." class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-ASA_esq.png" width="55" heigth="55" /></div>
								<div title="Danos a Asa dianteira direita." class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-ASA_dir.png" width="55" heigth="55" /></div>
								<div title="Danos a Asa Traseira." class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-AsaTraseira.png" width="55" heigth="55" /></div>
								<div title="Danos ao Assoalho." class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-assoalho.png" width="55" heigth="55" /></div>
								<div title="Danos ao SIDEPOD´s." class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-SidePod-duplo.png" width="55" heigth="55" /></div>
								<div title="Danos ao diferencial." class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-diferencial.png" width="55" heigth="55" /></div>
								<div title="Quantidade de voltas de combustível excedente." class="divTableCell" style="font-weight: bold"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/fuel.png" width="30" heigth="30" /></div>
								<div title="Uso do ERS." class="divTableCell" style="font-weight: bold"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/ers.png" width="30" heigth="30" /></div>
								<div title="Desgaste pneus dianteiros." class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-pneus-frente.png" width="55" heigth="55" /></div>
								<div title="Desgaste pneus traseiros." class="divTableCell"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/79700-pneus-traseira.png" width="55" heigth="55" /></div>																		
								<div title="Pitstops e Voltas do atual pneu." class="divTableCell" style="font-weight: bold"><img class="image_cabecalho"
										src="../../assets/icons-telemetry/icon-pv.png" width="25" heigth="25" /></div>																		
								<div class="divTableCell" style="font-weight: bold"><img title="Pneus usados no atual momento pelos pilotos." class="image_cabecalho"
										src="../../assets/icons-telemetry/icon-pneus.png" width="40" heigth="40" /></div>
							</div>
							<div :class="getStatusRow(telemetryRealTime.status)" v-for="telemetryRealTime of tableTelemetryRealTime"
								:key="telemetryRealTime.position">
								<div class="divTableCell" style="text-align: left;"> <label style="font-size: 16px;font-weight: bold;">{{ telemetryRealTime.position }}</label> <label :style="getCorGainLostPostion(telemetryRealTime.gainPosition)">{{ telemetryRealTime.gainPosition }}</label></div>								
								<div class="divTableCell divTableCellName"><img class="image_cabecalho" style="vertical-align:middle;" :src="getLogoEquipe(telemetryRealTime.equip)" width="25"	heigth="25" /> {{ telemetryRealTime.name }}</div>
								<div class="divTableCell">{{ telemetryRealTime.lastLap }}</div>
								<div :class="getFont(telemetryRealTime.deltaCarFront)">{{ telemetryRealTime.deltaCarFront }}</div>
								<div class="divTableCell">{{ telemetryRealTime.penalties }} | {{ telemetryRealTime.warnings }}</div>
								<div :class="getCorAerodinamic(telemetryRealTime.perFrontLeftWingDamage)">{{ telemetryRealTime.perFrontLeftWingDamage }}</div>
								<div :class="getCorAerodinamic(telemetryRealTime.perFrontRightWingDamage)">{{ telemetryRealTime.perFrontRightWingDamage }}</div>
								<div :class="getCorAerodinamic(telemetryRealTime.perRearWingDamage)">{{ telemetryRealTime.perRearWingDamage }}</div>
								<div :class="getCorAerodinamic(telemetryRealTime.floorDamage)">{{ telemetryRealTime.floorDamage }}</div>
								<div :class="getCorAerodinamic(telemetryRealTime.sidpodDamage)">{{ telemetryRealTime.sidpodDamage }}</div>
								<div :class="getCorAerodinamic(telemetryRealTime.diffuserDamage)">{{ telemetryRealTime.diffuserDamage }}</div>
								<div :class="getCorFuel(telemetryRealTime.fuelRemainingLaps)">{{ telemetryRealTime.fuelRemainingLaps }}</div>
								<div class="divTableCell">{{ telemetryRealTime.ersStoreEnergy }}</div>
								<div class="divTableCell" :style="getCorPneus(telemetryRealTime.perWearFrontRight, telemetryRealTime.perWearFrontLeft)">{{ telemetryRealTime.perWearFrontRight }} | {{ telemetryRealTime.perWearFrontLeft }}</div>
								<div class="divTableCell" :style="getCorPneus(telemetryRealTime.perWearFrontRight, telemetryRealTime.perWearFrontLeft)">{{ telemetryRealTime.perWearRearRight }} | {{ telemetryRealTime.perWearRearLeft }}</div>								
								<div class="divTableCell">{{ telemetryRealTime.pitStops }} | {{ telemetryRealTime.tyresAgeLpas }}</div>
								<div class="divTableCell" style="background-color: #999999;"><img class="image_cabecalho" style="vertical-align:middle;" :src="getPneus(telemetryRealTime.tyre)" width="20"	heigth="20" /></div>								
							</div>
						</div>
					</div>
				</div>
				<div class="op2 op2-backcolor">
					<div class="divTableBody">
						<div class="divTableRow">
							<div class="divSpace" style="font-weight: bold">{{getsessionType()}}</div>
						</div>						
						<div class="divTableRow" v-for="itemWeatherForecast of tableWeather"
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
				gainPosition: null,
			},
			timer: "",
			filterWeather: "SHORT_Q",
			dateUpdate: "",
			tableTelemetryRealTime: [],
			tableWeather: [],
			errors: [],
			voltas: "",
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
			visibleCabecalho: true,
			sessaoNome: "",
			circuito: "",
			grid: "",
			data: "",
			trackTemperature: 0,
			airTemperature: 0,
			pitSpeedLimit: 0,
			trackLength: 0,
			sessionDuration: "",
			sessionTimeLeft: "",
			weatherDesc: "",
			driverFastLap: "",
			fastLap: "",
		};
	},
	created() {
		this.fetchData();
		this.timer = setInterval(this.fetchData, 5000);
	},
	mounted() {
		
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
						if (this.tableWeather.length === 0) {
							this.filterWeather = "R";
						}

						this.tableWeather.forEach(w => {
							if (w.sessionType === "R" && this.detailsEvent.sessionType === "SHORT_Q")
								this.filterWeather = "SHORT_Q";
							else
								this.filterWeather = "R";
						});

						this.tableWeather = [];

						this.detailsEvent = result.data;

						this.detailsEvent.weatherForecastSamples.forEach(i => {						
							if (i.sessionType === this.filterWeather) {
								this.tableWeather.push(i);
							}
						});
						
						this.voltas = this.detailsEvent.currentLap + "/" + this.detailsEvent.totalLaps;

						if (this.detailsEvent.sessionType === "R")
							this.sessaoNome = "Corrida";
						else
							this.sessaoNome = "Qualy";
						
						this.circuito = this.detailsEvent.circuito;
						this.grid = this.detailsEvent.grid;
						this.data = this.detailsEvent.data;
						this.trackTemperature = this.detailsEvent.trackTemperature;
						this.airTemperature = this.detailsEvent.airTemperature;
						this.pitSpeedLimit = this.detailsEvent.pitSpeedLimit;
						this.trackLength = this.detailsEvent.trackLength;
						this.sessionDuration = this.detailsEvent.sessionDuration;
						this.sessionTimeLeft = this.detailsEvent.sessionTimeLeft;
						this.weatherDesc = this.detailsEvent.weather;
						this.driverFastLap = this.detailsEvent.driverFastLap;
						this.fastLap = this.detailsEvent.fastLap;
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

			this.tableWeather.forEach(i => {
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

			this.tableWeather.forEach(i => {
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

			this.tableWeather.forEach(i => {
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
			if (this.detailsEvent !== null) {
				let timeOffset = -1;

				this.tableWeather.forEach(i => {
					if (offSet === i.timeOffset)
						timeOffset = i.timeOffset;
				});

				if (timeOffset >= 0)
					return timeOffset.toString() + " min";
				else
					return "";
			}
			
			return "";
		},
		enableSC() {
			if (this.detailsEvent !== null) {
				if (this.detailsEvent.safetyCarStatus === "FULL_SAFETY_CAR")
					return "visibility: visible;";			

				if (this.detailsEvent.safetyCarStatus === "VIRTUAL_SAFETY_CAR")
					return "visibility: visible;";			
			}

			return "visibility: hidden;";	
		},
		getSCorVSC() {
			if (this.detailsEvent !== null) {
				if (this.detailsEvent.safetyCarStatus === "FULL_SAFETY_CAR")
					return "SC";

				if (this.detailsEvent.safetyCarStatus === "VIRTUAL_SAFETY_CAR")
					return "VSC";											
			}
			return "";
		},
		getsessionType() {
			if (this.tableWeather.length > 0) {
				if (this.tableWeather[0].sessionType === "R")
					return "Corrida";
					else
						if (this.tableWeather[0].sessionType === "SHORT_Q")
							return "Qualy";
							else 
								return this.detailsEvent.sessionType;
			} else {
				return "";
			}
		},
		enableFormationLap() {
			if (this.detailsEvent !== null) {
				if (this.detailsEvent.safetyCarStatus === "FORMATION_LAP")
					return "visibility: visible;";			
				else
					return "visibility: hidden;";
			}

			return "visibility: hidden;";
		},
		getFormationLap() {
			if (this.detailsEvent !== null && this.detailsEvent.safetyCarStatus === "FORMATION_LAP")
				return "FL";	

			return "";
		},
		getDescription() {
			if (this.detailsEvent !== null)
				return this.detailsEvent.trackId;
			else 
				return "Evento não iniciado!";
		},
		getLogoEquipe(equip) {
			if (equip !== "") {
				var images = require.context(
					"../../assets/logos-equipes/",
					false,
					/\.png$/
				);

				return images("./" + equip + ".png");
			}
			else
				return "";
		},	
		getStatusRow(status) {
			if (status === "IN_GARAGE" || status === "IN_GARAGE")
				return "divTableRow statusPiloto";
			
			return "divTableRow";
		},
		getCorFuel(fuelRemainingLaps) {
			let floatFuel = parseFloat(fuelRemainingLaps);
			if (floatFuel < 0.20 && floatFuel > 0)
				return "divTableCell alert3";
			else if (floatFuel <= 0.0)
				return "divTableCell alert-critical";
				else return "divTableCell";
		},
		getCorAerodinamic(perFrontLeftWingDamage) {
			let floatFrontLeftWingDamage = parseFloat(perFrontLeftWingDamage);
			if (floatFrontLeftWingDamage > 0.0 && floatFrontLeftWingDamage < 10)
				return "divTableCell alert1";
			else if (floatFrontLeftWingDamage > 10.0 && floatFrontLeftWingDamage <= 30)
				return "divTableCell alert2";
			else if (floatFrontLeftWingDamage > 30.0 && floatFrontLeftWingDamage <= 50)
				return "divTableCell alert3";				
			else if (floatFrontLeftWingDamage > 50)
				return "divTableCell alert-critical";
				else return "divTableCell";
		},
		getPneus(pneu) {
			if (pneu !== "") {
				var images = require.context(
					"../../assets/icons-telemetry/",
					false,
					/\.png$/
				);

				return images("./" + pneu + ".png");
			}
			else
				return "";
		},
		getCorPneus(right, left) {
			let percR = parseFloat(right);
			let percL = parseFloat(left);
			let perc = 0.0;

			if (percR > percL)
				perc = percR;
			else
				perc = percL;

			if (perc <= 10)
				return "background-color:#ffff001c";
			else if (perc <= 20)
				return "background-color:#ffff002e";
			else if (perc <= 25)
				return "background-color:#ffff004a";				
			else if (perc <= 30)
				return "background-color:#ffff0050";
			else if (perc <= 35)
				return "background-color:#ffff0061";
			else if (perc <= 40)
				return "background-color:#ffff006b";
			else if (perc <= 45)
				return "background-color:#ffff00a3";												
			else if (perc <= 50)
				return "background-color:#ffff00bf";
			else if (perc <= 55)
				return "background-color:#ff9900a6";
			else if (perc <= 60)
				return "background-color:#ff9900ba";
			else if (perc <= 70)
				return "background-color:#ff9900d6";
			else if (perc <= 75)
				return "background-color:#ff3b00d6";				
			else if (perc <= 80)
				return "background-color:#ff3b00eb";																				
			else return "background-color:#ff0000fc";
		},
		getCorGainLostPostion(gainPosition) {
			if (gainPosition > 0) {
				return "font-size: 8px; color: green; font-weight: bold;";
			} else {
				if (gainPosition < 0) {
					return "font-size: 8px; color: red; font-weight: bold;";
				}
				else {
					return "font-size: 8px; font-weight: bold;";
				}				
			}
		},
		getFont(delta) {
			if (delta === "Interval")
				return "divTableCell font7";
			else
				return "divTableCell";
		}
	},
};

function formatDate(date) {
	var d = new Date(date);

	let hour = d.getHours();
	let minute = d.getMinutes();
	let second = d.getSeconds();

	if (hour < 10) hour = '0' + hour;
	if (minute < 10) minute = '0' + minute;
	if (second < 10) second = '0' + second;

	return [hour, minute, second].join(':');
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
	vertical-align: middle;
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
	font-size: 3mm;
	text-transform: uppercase;
}
 div.op1 {
	display: inline-block;
	background-color: rgb(243, 237, 237);
	text-align: center;
}
div.op2 {
	display: inline-block;
	margin-right: 0vw;
	text-align: center;
}
div.op2-backcolor {
	background-color: #809983;
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
div.statusPiloto {
	background-color: #999999;
	text-decoration: line-through;
}
div.alert1 {
	background-color: rgb(253, 255, 164);
}
div.alert2 {
	background-color: rgb(250, 229, 108);
}
div.alert3 {
	background-color: rgb(251, 255, 0);
}
div.alert-critical {
	background-color: maroon;
	color: white;
}
div.font7 {
	font-size: 7px;
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