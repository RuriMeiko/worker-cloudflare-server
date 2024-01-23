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
			dataSource: "YourDatabaseName",
		});

		// Use class RequestHandler
		const router = new RequestHandler(req);

		// Demo how to use middleware
		async function test(req: any, next: () => void) {
			console.log("Executing middleware");
			next();
		}
		router.use(test);
		// Router for each method
		router.get("/ok", async (req, res) => {
			//demo how to get query
			console.log(req.query);
			// default status code is 200
			return res.status().text("GET OK").send();
		});

		router.post("/ok", async (req, res) => {
			//demo how to read body
			console.log(await req.json());
			return res.status(203).text("POST OK").send();
		});

		router.delete("/ok", async (req, res) => {
			return res.status().text("DELETE OK").send();
		});

		router.put("/ok", async (req, res) => {
			return res.status().text("PUT OK").send();
		});

		router.patch("/ok", async (req, res) => {
			return res.status().text("PATCH OK").send();
		});

		router.head("/ok", async (req, res) => {
			return res.status().send();
		});

		router.options("/ok", async (req, res) => {
			return res.status().text("OPTIONS OK").send();
		});

		return await router.server();
	},

	async scheduled(event, env, ctx) {
		// do something
		console.log("cron processed");
	},
};

// Export for discoverability
export default worker;
