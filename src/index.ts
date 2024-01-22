import * as utils from "./utils";
import mongodb from "./mongodb/init";
// // The Worker's environment bindings. See `wrangler.toml` file.
interface Bindings {
	// MongoDB Realm Application ID
	API_MONGO_TOKEN: string;
	API_TELEGRAM: string;
	URL_API_MONGO: string;
}

// Define the Worker logic
const worker: ExportedHandler<Bindings> = {
	async fetch(req, env) {
		const database = new mongodb({
			apiKey: env.API_MONGO_TOKEN,
			apiUrl: env.URL_API_MONGO,
			dataSource: "AtlasCluster",
		});
		const url = new URL(req.url);
		const path = url.pathname.replace(/[/]$/, "");
		if (path !== "/your_api") {
			return utils.toError(`Unknown "${path}" URL; try "/your_api" instead.`, 404);
		}
		
		return utils.toJSON("ok", 200);
	},
	async scheduled(event, env, ctx) {
		console.log("cron processed");
	},
};

// Export for discoverability
export default worker;
