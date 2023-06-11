"use client"

const showImage = (image: Blob) => {
    if (image.length < 3145728) {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = () => {
            console.log(image)
        }
        reader.onerror = (error) => {
            console.log("Error: ", error)
        }
    }
}

export default function Profile() {
    return (
        <div>Profile</div>
    )
}