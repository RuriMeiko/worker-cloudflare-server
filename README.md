# Worker Cloudflare Telegram MongoDB

## Project Initialization Guide

To start with the project, follow these steps:

1. **Install Dependencies**

   Run the following command to install the necessary packages from the `package.json` file:

   ```bash
   npm install
   ```

2. **Set Environment Variables**

   Create a file named `.dev.vars` in the root directory of the project and set the following environment variables:

   ```env
   API_MONGO_TOKEN=YourMongoToken
   URL_API_MONGO=YourMongoUrl
   ```

   Replace `YourMongoToken` and `YourMongoUrl` with your specific information.
   
   `YourMongoToken` and `YourMongoUrl` get [here](https://www.mongodb.com/docs/atlas/app-services/data-api/generated-endpoints/).

4. **Run the Application in Development Environment**

   Use the following command to run the application in the development environment:

   ```bash
   npm run dev
   ```

5. **Uploading Variables to Cloudflare Worker**
   
   To upload variables from the `.dev.vars` file to Cloudflare Worker using Wrangler, follow these steps:
   
   5.1. Open your terminal and navigate to the project directory.
   
   5.2. Use the following command to upload the variables from the `.dev.vars` file to Cloudflare Worker:
   
    ```bash
    npx wrangler secret put API_MONGO_TOKEN
    npx wrangler secret put URL_API_MONGO
    ```
   
   You will be prompted to interactively enter values for each variable. Enter the values corresponding to the variables in the `.dev.vars` file.
   
   5.3. To fill in information in the `wrangler.toml` file, open the file in a text editor and edit the following fields:
   
    ```toml
    name = "yourworkername"
    account_id = "yourcloudflareaccountid"
    ```
   
   Replace `"yourworkername"` and `"yourcloudflareaccountid"` with the desired name for your Worker and your Cloudflare account ID.
   
6. **Implement Additional Features**

   Now that you have set up the project and successfully run it in the development environment, you can start implementing additional features based on the project requirements and deploy it to Cloudflare worker by use the following command:
   
   ```bash
   npm run deploy
   ```
   
Note that you need to have Wrangler installed and be logged into your Cloudflare account before performing these steps.

## MongoDB Functions

MongoDB functions are written based on the MongoDB Atlas documented [here](https://www.mongodb.com/docs/atlas/app-services/data-api/openapi/).

Here is a demo of how to use MongoDB functions:

```typescript
const text = await this.database.db("").collection("").find();
```

## Router Functions

Here is a demo of how to use Router functions:

```typescript
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
```

## CPU Performance

The CPU performance of this project is approximately 1ms.

Feel free to customize and extend the project according to your needs.

## Contribution and Support

We encourage everyone to fork the project and consider giving it a star. Your contributions are highly appreciated!

## Thank you for using our project!
