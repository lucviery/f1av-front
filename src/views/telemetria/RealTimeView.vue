<template>
	<div>{{ error }}</div>
	<div style="display: inline-block;vertical-align: top">
		<div style="font-weight: bolder;">Real Time: {{dateUpdate}}</div>
		<div class="divTable">
			<div class="divTableBody">
				<div class="divTableRow">
					<div class="divTableCell" style="font-weight: bold">POS</div>
					<div class="divTableCell" style="font-weight: bold">Piloto</div>
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
					<div class="divSpace" style="font-weight: bold"></div>
					<div class="divSpace" style="font-weight: bold">Qualy</div>
					<div class="divSpace" style="font-weight: bold">Corrida</div>
				</div>
				<div class="divTableRow" v-for="telemetryRealTime of tableTelemetryRealTime"
					:key="telemetryRealTime.position">
					<div class="divTableCell"> {{ telemetryRealTime.position }}</div>
					<div class="divTableCell"> {{ telemetryRealTime.name }}</div>
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
					<div class="divSpace"></div>
					<div class="divSpace">
						<img class="image_cabecalho" :src="getLogWeatherQualy(telemetryRealTime.position)" width="50"
							heigth="50" />
						<br />
						{{getOffSetQualy(telemetryRealTime.position)}}
					</div>
					<div class="divSpace">
						<img class="image_cabecalho" :src="getLogWeatherCorrida(telemetryRealTime.position)" width="50"
							heigth="50" />
						<br />
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
			timer: "",
			dateUpdate: "",
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
			TelemetryApi.getWeatherTelemetry(this.$route.query.season, "R")
				.then((result) => {
					this.tableWeatherForecastCorrida = result.data;
				})
				.catch((e) => {
					console.log(e);
				});
			TelemetryApi.getWeatherTelemetry(this.$route.query.season, "SHORT_Q")
				.then((result) => {
					this.tableWeatherForecastQualy = result.data;
				})
				.catch((e) => {
					console.log(e);
				});
		}
	},
	methods: {
		async fetchData() {
			this.tableTelemetryRealTime = [];

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
				if (this.tableTelemetryRealTime.length !== result.data.length) {
					this.tableTelemetryRealTime = []
				}
				
				RealTimeTelemetry.getRealTimeTelemetry(this.$route.query.season)
					.then((result) => {
						this.tableTelemetryRealTime = result.data;
					})
					.catch((e) => {
						console.log(e);
					});
				TelemetryApi.getWeatherTelemetry(this.$route.query.season, "R")
					.then((result) => {
						this.tableWeatherForecastCorrida = result.data;
					})
					.catch((e) => {
						console.log(e);
					});
				TelemetryApi.getWeatherTelemetry(this.$route.query.season, "SHORT_Q")
					.then((result) => {
						this.tableWeatherForecastQualy = result.data;
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
				return "";
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
				return "";
			}
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
	padding: 3px 10px;
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
</style>