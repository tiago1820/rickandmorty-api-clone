export class ResponseHandler {
    constructor(res) {
        this.res = res;
    }

    sendErrorResponse(statusCode, errorMessage) {
        const data = { error: errorMessage };
        return this.res.status(statusCode).json(data);
    }

    sendSuccessResponse(statusCode, responseData) {
        return this.res.status(statusCode).json(responseData);
    }
}