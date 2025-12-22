export default function response(status: string, message: string, result: any) {
    return {
        status: status,
        message: message,
        result: result
    }
}