import fetch from "node-fetch";
import { performance } from "perf_hooks";
import { ApiList } from "./apilist";
import { Datum } from "./schemas";

const DEFAULT_TIMEOUT = 30000; // 30 seconds

const createErrorResult = (
	datum: ApiList[number],
	errorMessage: string,
): Datum => ({
	id: datum.id,
	apiName: datum.apiName,
	dataReceived: false,
	responseTime: null,
	downloadTime: null,
	totalTime: null,
	contentSize: null,
	date: new Date(),
	error: errorMessage,
});

const runBenchmark = async (endpoints: ApiList): Promise<Datum[]> => {
	const results: Datum[] = [];

	// Run sequentially to prevent network and resource contention
	for (const endpoint of endpoints) {
		const result = await benchmarkSingleEndpoint(endpoint);
		results.push(result);
	}

	return results;
};

const benchmarkSingleEndpoint = async (
	datum: ApiList[number],
): Promise<Datum> => {
	const controller = new AbortController();
	const timeout = datum.maxTimeout || DEFAULT_TIMEOUT;
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	const url = datum.queryString
		? `${datum.url}${datum.queryString}`
		: datum.url;

	try {
		const startTime = performance.now();
		const response = await fetch(url, { signal: controller.signal });
		const headersReceivedTime = performance.now();

		const responseTime = parseFloat(
			(headersReceivedTime - startTime).toFixed(2),
		);

		if (!response.ok) {
			clearTimeout(timeoutId);
			return createErrorResult(
				datum,
				`Request failed with status ${response.status}`,
			);
		}

		const buffer = await response.arrayBuffer();
		const downloadEndTime = performance.now();
		clearTimeout(timeoutId);

		const downloadTime = parseFloat(
			(downloadEndTime - headersReceivedTime).toFixed(2),
		);
		const totalTime = parseFloat((downloadEndTime - startTime).toFixed(2));

		return {
			id: datum.id,
			apiName: datum.apiName,
			dataReceived: true,
			responseTime,
			downloadTime,
			totalTime,
			contentSize: buffer.byteLength,
			date: new Date(),
			error: null,
		};
	} catch (error) {
		clearTimeout(timeoutId);

		const errorMessage =
			error instanceof Error
				? error.name === "AbortError"
					? `Request timed out after ${timeout}ms`
					: error.message
				: "Unknown error occurred";

		return createErrorResult(datum, errorMessage);
	}
};

export { runBenchmark };
