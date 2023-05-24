import baseAxios from '../Mixins/DataFetching'

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, _) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}

export const base64ToBlob = async (base64string: string): Promise<Blob> => {
  return (
    await baseAxios.get(base64string, {
      responseType: 'blob',
    })
  ).data
}
