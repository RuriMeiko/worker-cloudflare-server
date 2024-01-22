export default class CustomResponse {
	private statuscode: number;
	private body: any;

	constructor() {
		this.statuscode = 200;
		this.body = null;
	}

	send(): Response {
		console.log(this.body);
		const headers = { "Content-Type": "application/json" };
		const body = this.body;
		return new Response(body, { status: this.statuscode, headers });
	}

	text(data: string): CustomResponse {
		if (data) this.body = data;
		else this.body = "OK";
		return this;
	}

	json(data: object): CustomResponse {
		if (data) this.body = JSON.stringify(data, null, 2);
		else this.body = "OK";
		return this;
	}

	status(code: number): CustomResponse {
		this.statuscode = code;
		return this;
	}
}
