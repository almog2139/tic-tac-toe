export const cloudinaryService = {
    uploadImg
  }
async function uploadImg(file) {
    const CLOUD_NAME = "dlqyarvbh"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', 'j1n9ersq');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log(data);
        return data

    } catch (err) {
        console.log(err);
    }
}

