export default class CustomResponseBuilder {
	private customResponse: CustomResponse;

	constructor() {
		this.customResponse = new CustomResponse();
	}

	status(code?: number): CustomResponseTextandJsonBuilder {
		return new CustomResponseTextandJsonBuilder(this.customResponse.status(code ? code : 200));
	}
}

class CustomResponseTextandJsonBuilder {
	private customResponse: CustomResponse;

	constructor(customResponse: CustomResponse) {
		this.customResponse = customResponse;
	}

	text(data: string): CustomResponseSender {
		return new CustomResponseSender(this.customResponse.text(data));
	}
	json(data: object): CustomResponseSender {
		return new CustomResponseSender(this.customResponse.json(data));
	}

	send(): Response {
		return this.customResponse.send();
	}
}

class CustomResponseSender {
	private customResponse: CustomResponse;

	constructor(customResponse: CustomResponse) {
		this.customResponse = customResponse;
	}

	send(): Response {
		return this.customResponse.send();
	}
}

class CustomResponse {
	private statuscode: number;
	private body: any;

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

	text(data: string): CustomResponse {
		return this.setBody(data);
	}

	json(data: object): CustomResponse {
		return this.setBody(JSON.stringify(data, null, 2));
	}

	status(code: number): CustomResponse {
		this.statuscode = code;
		return this;
	}

	send(): Response {
		const headers = { "Content-Type": "application/json" };
		const body = this.body;
		return new Response(body, { status: this.statuscode, headers });
	}
}
