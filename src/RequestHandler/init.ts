import CustomResponse from "./response";
type RequestCustom = Request & {
	query: object;
};
type HandlerFunction = (request: RequestCustom, response: CustomResponse) => Promise<Response>;
type MiddlewareFunction = (request: Request, next: () => void) => void;

export default class RequestHandler {
	private routes: Record<string, HandlerFunction>;
	private middlewareStack: MiddlewareFunction[];
	private readonly request: Request;
	private response: CustomResponse;
	private methodStatus: any = {
		GET: false,
		POST: false,
		PUT: false,
		DELETE: false,
		PATCH: false,
		HEAD: false,
		OPTIONS: false,
	};

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
		if (this.methodStatus.GET) this.addRoute("GET", "*", handler);
		else {
			if (url === "*") this.methodStatus.GET = true;
			this.addRoute("GET", url, handler);
		}
	}

	post(url: string, handler: HandlerFunction) {
		if (this.methodStatus.POST) this.addRoute("POST", "*", handler);
		else {
			if (url === "*") this.methodStatus.POST = true;
			this.addRoute("POST", url, handler);
		}
	}

	put(url: string, handler: HandlerFunction) {
		if (this.methodStatus.PUT) this.addRoute("PUT", "*", handler);
		else {
			if (url === "*") this.methodStatus.PUT = true;
			this.addRoute("PUT", url, handler);
		}
	}

	delete(url: string, handler: HandlerFunction) {
		if (this.methodStatus.DELETE) this.addRoute("DELETE", "*", handler);
		else {
			if (url === "*") this.methodStatus.DELETE = true;
			this.addRoute("DELETE", url, handler);
		}
	}

	patch(url: string, handler: HandlerFunction) {
		if (this.methodStatus.PATCH) this.addRoute("PATCH", "*", handler);
		else {
			if (url === "*") this.methodStatus.PATCH = true;
			this.addRoute("PATCH", url, handler);
		}
	}

	head(url: string, handler: HandlerFunction) {
		if (this.methodStatus.HEAD) this.addRoute("HEAD", "*", handler);
		else {
			if (url === "*") this.methodStatus.HEAD = true;
			this.addRoute("HEAD", url, handler);
		}
	}

	options(url: string, handler: HandlerFunction) {
		if (this.methodStatus.OPTIONS) this.addRoute("OPTIONS", "*", handler);
		else {
			if (url === "*") this.methodStatus.OPTIONS = true;
			this.addRoute("OPTIONS", url, handler);
		}
	}
	header(key: string, value: string): void {
		this.response.headers[key] = value;
	}
	async server(): Promise<Response> {
		const method = this.request.method;
		const url = new URL(this.request.url);
		let routeKey: string;
		//@ts-ignore
		this.request.query = Object.fromEntries(url.searchParams);
		if (this.methodStatus[method]) routeKey = `${method} *`;
		else routeKey = `${method} ${url.pathname}`;
		const handler = this.routes[routeKey];

		if (handler) {
			await this.runMiddleware(this.request);
			//@ts-ignore
			return handler(this.request, this.response);
		} else {
			return this.response.status(404).text("Not Found");
		}
	}

	private async runMiddleware(request: Request, index: number = 0): Promise<void> {
		if (index < this.middlewareStack.length) {
			const currentMiddleware = this.middlewareStack[index];
			return currentMiddleware(request, () => this.runMiddleware(request, index + 1));
		}
	}
}
