import { DOMAttributes } from "react";

type User = {
    id: number
    email: string
    name: string
    password: string
    role: string
    status_pilih: Boolean
}

type Votes = {
    id: number
    nama: string
    visi: string
    misi: string
    jumlah_pemilih?: number
}

declare namespace React {
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        htmlFor?: any;
    }
}

declare global {
    interface Window {
        [key: any]: any
        showModal: () => void
    }
}

export { }