import React from 'react'
import {FormControl, FormLabel, Input} from '@chakra-ui/react'

export default function InputConLabel({label, id, register, max}) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input {...register(id, { required: true })} placeholder={label} />
    </FormControl>
  )
}
