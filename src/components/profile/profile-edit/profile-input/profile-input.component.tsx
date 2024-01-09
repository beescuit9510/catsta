import { FormControl, FormLabel, Input } from '@chakra-ui/react'

export default function ProfileInput({
  value,
  setValue,
  label,
}: {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  label: string
}) {
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <Input
        placeholder={label}
        _placeholder={{ color: 'gray.500' }}
        type='text'
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </FormControl>
  )
}
