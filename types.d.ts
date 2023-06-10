declare global {
    interface Window {
        [key: any]: any
        showModal: () => void
    }
}

export {}

interface User {
    id: number
    email: string
    name: string
    password: string
    role: string
    status_pilih: Boolean
}