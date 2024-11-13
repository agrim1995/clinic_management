class ApiResponse {
    constructor(status, data, msg , type) {
        this.status = status
        this.data = data
        this.type = type
        this.msg = msg

    }
}
module.exports = ApiResponse
