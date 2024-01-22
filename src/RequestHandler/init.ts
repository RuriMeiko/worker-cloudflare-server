import CustomResponse from "./response";

type HandlerFunction = (request: Request, response: CustomResponse) => Promise<Response>;
type MiddlewareFunction = (request: Request, next: () => void) => void;

export default class RequestHandler {
	private routes: Record<string, HandlerFunction>;
	private middlewareStack: MiddlewareFunction[];
	private readonly request: Request;
	private response: CustomResponse;

	constructor(req: Request) {
		const res = new CustomResponse();
		this.response = res;
		this.request = req;
		this.routes = {};
		this.middlewareStack = [];
	}

	private addRoute(method: string, url: string, handler: HandlerFunction) {
		const routeKey = `${method} ${url}`;
		this.routes[routeKey] = handler;
	}

	use(middleware: MiddlewareFunction) {
		this.middlewareStack.push(middleware);
	}

	get(url: string, handler: HandlerFunction) {
		this.addRoute("GET", url, handler);
	}

	post(url: string, handler: HandlerFunction) {
		this.addRoute("POST", url, handler);
	}

	put(url: string, handler: HandlerFunction) {
		this.addRoute("PUT", url, handler);
	}

	delete(url: string, handler: HandlerFunction) {
		this.addRoute("DELETE", url, handler);
	}

	patch(url: string, handler: HandlerFunction) {
		this.addRoute("PATCH", url, handler);
	}

	head(url: string, handler: HandlerFunction) {
		this.addRoute("HEAD", url, handler);
	}

	options(url: string, handler: HandlerFunction) {
		this.addRoute("OPTIONS", url, handler);
	}

	async server(): Promise<Response> {
		const method = this.request.method;
		const url = new URL(this.request.url);
		const routeKey = `${method} ${url.pathname}`;
		const handler = this.routes[routeKey];

		if (handler) {
			return await this.runMiddleware(this.request, () =>
				handler(this.request, this.response)
			);
		} else {
			return this.response.status(404).json({ status: "Not Found" }).send();
		}
	}

	private async runMiddleware(
		request: Request,
		callback: () => Promise<Response>,
		index: number = 0
	): Promise<Response> {
		if (index < this.middlewareStack.length) {
			const currentMiddleware = this.middlewareStack[index];
			currentMiddleware(request, () => this.runMiddleware(request, callback, index + 1));
		}
		return callback();
	}
}
