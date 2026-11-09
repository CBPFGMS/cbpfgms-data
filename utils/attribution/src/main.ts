import { fetchData } from "./fetchdata.js";
import { saveFile } from "./savedata.js";
import { apiFiles } from "./apislist.js";
import * as path from "path";
import { fileURLToPath } from "url";

export type ErrorResponse = {
	errorMessage: string;
	url: string;
	date: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIRECTORY_PATH = path.resolve(__dirname, "..", "data");

const errorArray: ErrorResponse[] = [];

const startYear = 2024,
	lastYear = new Date().getFullYear(),
	yearsRange = `${startYear}_${lastYear}`;

const csvFormatParameter = "&$format=csv",
	yearsRangeParameter = "&AllocationYears=" + yearsRange,
	startAndEndParameter = `&AllocationYearFrom=${startYear}&AllocationYearTo=${lastYear}`;

const yearRangeApis = apiFiles.filter(api => api.type === "range");
const startAndEndApis = apiFiles.filter(api => api.type === "startAndEnd");
const completeApis = apiFiles.filter(api => api.type === "complete");

for (const api of yearRangeApis) {
	const url = `${api.url}${yearsRangeParameter}${csvFormatParameter}`;
	const data = await fetchData(url, errorArray);
	if (data) {
		const fileName = `${api.name}.csv`;
		await saveFile(DIRECTORY_PATH, data, fileName);
	}
}

for (const api of startAndEndApis) {
	const url = `${api.url}${startAndEndParameter}${csvFormatParameter}`;
	const data = await fetchData(url, errorArray);
	if (data) {
		const fileName = `${api.name}.csv`;
		await saveFile(DIRECTORY_PATH, data, fileName);
	}
}

for (const api of completeApis) {
	const data = await fetchData(api.url, errorArray);
	if (data) {
		const fileName = `${api.name}.csv`;
		await saveFile(DIRECTORY_PATH, data, fileName);
	}
}

if (errorArray.length > 0) {
	const errorLogContent = JSON.stringify(errorArray, null, 2);
	const errorLogFileName = `error_log_${new Date()
		.toISOString()
		.replace(/[:.]/g, "-")}.json`;
	await saveFile(DIRECTORY_PATH, errorLogContent, errorLogFileName);
}

await saveFile(DIRECTORY_PATH, new Date().toISOString(), "last_updated.txt");
