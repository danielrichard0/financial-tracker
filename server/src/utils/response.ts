export default function response(statusCode: number, status: string, message: string, result: any) {
    return {
        status_code: statusCode,
        status: status,
        message: message,
        result: result
    }
}