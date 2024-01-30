type HttpStatusInfo = {
	[key: string]: {
		status: string;
		description: string;
	};
};
export const statusCodeinfo: HttpStatusInfo = {
	"100": {
		status: "Continue",
		description:
			"Server has received the request headers and the client should proceed to send the request body.",
	},
	"101": {
		status: "Switching Protocols",
		description: "Server is switching protocols as per the client's request.",
	},
	"200": {
		status: "OK",
		description: "The request was successful.",
	},
	"201": {
		status: "Created",
		description: "The request has been fulfilled and resulted in a new resource being created.",
	},
	"204": {
		status: "No Content",
		description:
			"The server successfully processed the request but there is no additional content to send.",
	},
	"301": {
		status: "Moved Permanently",
		description: "The requested page has been permanently moved to another location.",
	},
	"302": {
		status: "Found",
		description: "The requested page has been temporarily moved to another location.",
	},
	"304": {
		status: "Not Modified",
		description: "The resource has not been modified since the last request.",
	},
	"400": {
		status: "Bad Request",
		description: "The request could not be understood or was missing required parameters.",
	},
	"401": {
		status: "Unauthorized",
		description: "Authentication is required and has failed or has not been provided.",
	},
	"403": {
		status: "Forbidden",
		description: "The server understood the request, but it refuses to authorize it.",
	},
	"404": {
		status: "Not Found",
		description: "The requested resource could not be found on the server.",
	},
	"500": {
		status: "Internal Server Error",
		description:
			"The server encountered an unexpected condition that prevented it from fulfilling the request.",
	},
	"502": {
		status: "Bad Gateway",
		description:
			"The server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed in attempting to fulfill the request.",
	},
	"503": {
		status: "Service Unavailable",
		description:
			"The server is not ready to handle the request. Common causes include a server that is down for maintenance or is overloaded.",
	},
};
