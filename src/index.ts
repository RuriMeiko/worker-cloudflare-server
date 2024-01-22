import mongodb from "./mongodb/init";
import RequestHandler from "./RequestHandler/init";
// // The Worker's environment bindings. See `wrangler.toml` file.
interface Bindings {
	// MongoDB Realm Application ID
	API_MONGO_TOKEN: string;
	URL_API_MONGO: string;
}

// Define the Worker logic
const worker: ExportedHandler<Bindings> = {
	async fetch(req, env) {
		const database = new mongodb({
			apiKey: env.API_MONGO_TOKEN,
			apiUrl: env.URL_API_MONGO,
			dataSource: "YourdatabaseSource",
		});

		// Sử dụng class RequestHandler
		const router = new RequestHandler(req);

		async function test(request: any, next: () => void) {
			console.log("Executing middleware");
			next();
		}

		router.use(test);

		router.get("/ok", async (request, res) => {
			return res.status(200).text("GET OK").send();
		});

		router.post("/ok", async (request, res) => {
			return res.status(200).text("POST OK").send();
		});

		router.delete("/ok", async (request, res) => {
			return res.status(200).text("DELETE OK").send();
		});

		router.put("/ok", async (request, res) => {
			return res.status(200).text("PUT OK").send();
		});

		router.patch("/ok", async (request, res) => {
			return res.status(200).text("PATCH OK").send();
		});

		router.head("/ok", async (request, res) => {
			return res.status(200).send();
		});

		router.options("/ok", async (request, res) => {
			return res.status(200).text("OPTIONS OK").send();
		});

		return await router.server();
	},
	async scheduled(event, env, ctx) {
		console.log("cron processed");
	},
};

// Export for discoverability
export default worker;
