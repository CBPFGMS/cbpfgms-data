import { readdir, readFile, unlink } from "fs/promises";
import * as path from "path";

const MAX_FILES = 10;

async function loadLatestCsvFile(
	directoryPath: string,
): Promise<string | null> {
	try {
		const files = await readdir(directoryPath);

		const csvFiles = files.filter(
			file => path.extname(file).toLowerCase() === ".csv",
		);

		if (csvFiles.length === 0) {
			console.log("No CSV files found in directory");
			return null;
		}

		csvFiles.sort((a, b) => b.localeCompare(a));

		// Delete all files past MAX_FILES threshold
		if (csvFiles.length > MAX_FILES) {
			const filesToDelete = csvFiles.slice(MAX_FILES);

			for (const filename of filesToDelete) {
				const filePathToDelete = path.join(directoryPath, filename);
				try {
					await unlink(filePathToDelete);
					console.log(
						`Deleted file exceeding max limit: ${filename}`,
					);
				} catch (deleteError) {
					console.error(
						`Failed to delete file ${filename}:`,
						deleteError,
					);
				}
			}
		}

		const newestFilename = csvFiles[0];
		const newestFilePath = path.join(directoryPath, newestFilename);
		const fileContent = await readFile(newestFilePath, "utf-8");

		console.log(`File correctly loaded: ${newestFilePath}`);

		return fileContent;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Error processing CSV files: ${error.message}`);
		}
		throw error;
	}
}

export { loadLatestCsvFile };
