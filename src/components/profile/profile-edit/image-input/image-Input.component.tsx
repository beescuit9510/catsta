import { Input } from '@chakra-ui/react'
import useShowToast from '../../../../hooks/useShowToast'

export default function ImageInput({
  inputRef,
  setFile,
  setPreviewURL,
  limitSize = 2 * 1024 * 10242, //2mb
}: {
  inputRef: React.MutableRefObject<HTMLInputElement | null>
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  setPreviewURL: React.Dispatch<React.SetStateAction<string>>
  limitSize?: number
}) {
  const toast = useShowToast()

  return (
    <Input
      hidden
      type='file'
      accept='image/*'
      ref={inputRef}
      onChange={(event) => {
        const file = event.target.files?.[0]
        if (!file) return
        if (file.size > limitSize)
          return toast('error', 'File is too big! Please, try under 2mb file')

        setFile(file)
        setPreviewURL(URL.createObjectURL(file))
      }}
    />
  )
}
