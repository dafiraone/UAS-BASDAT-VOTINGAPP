export declare global {
    interface Window {
        [key: any]: any
    }
}

interface User {
    id: number
    email: string
    name: string
    password: string
    role: string
    status_pilih: Boolean
}

interface Votes {
    id: number
    nama: string
    visi: string
    misi: string
    jumlah_pemilih: number
}