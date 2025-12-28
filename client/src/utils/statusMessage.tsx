

export default function statusMessage(statusCode: number): string {
    switch (statusCode) {
        case 500: return 'ada kesalahan dengan sistem!'; break;
        case 409: return 'Data ini sudah ada sebelumnya!'; break; // data sudah ada
        default: return 'not defined yet'
    }
}