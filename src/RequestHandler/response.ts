import { statusCodeinfo } from "./data";

export default class CustomResponse {
	private statuscode: number;
	private body: any;
	headers: { [key: string]: string } = {};
	constructor() {
		this.statuscode = 200;
		this.body = null;
	}

	private setBody(data: any): CustomResponse {
		if (data) {
			this.body = data;
		} else {
			this.body = "OK";
		}
		return this;
	}

	text(data: string): Response {
		this.header("Content-type", "text/plain");
		this.setBody(data);
		return this.send();
	}

	json(data: object): Response {
		this.header("Content-type", "application/json");
		this.setBody(JSON.stringify(data, null, 2));
		return this.send();
	}

	status(code?: number): CustomResponse {
		this.statuscode = code ? code : 200;
		if (statusCodeinfo[this.statuscode]) {
			this.header("Content-type", "text/plain");
			this.setBody(statusCodeinfo[this.statuscode].status);
		}
		return this;
	}

	sendStatus(code?: number): Response {
		this.status(code);
		return this.send();
	}
	header(key: string, value: string): void {
		this.headers[key] = value;
	}

	private send(): Response {
		const headers = this.headers;
		const body = this.body;
		return new Response(body, { status: this.statuscode, headers });
	}
}
