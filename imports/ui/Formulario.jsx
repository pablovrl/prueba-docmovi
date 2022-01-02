import React, { useState } from 'react'
import { Button, Input, SimpleGrid, Heading, Select, VStack, Flex, FormLabel, FormControl } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import regiones from '../../regiones'
import { PacientesCollection } from '../api/PacientesCollection'
import { validateRut, formatRut } from 'rutlib/lib'

export default function Formulario() {

  const [region, setRegion] = useState("")
  const { register, handleSubmit, reset} = useForm()
  const onSubmit = data => {
    const paciente = data
    paciente["region"] = region

    if(!validateRut(paciente.rut)) {
      alert("Rut inválido")
    } else {
      paciente["rut"] = formatRut(paciente.rut)
      PacientesCollection.insert(paciente)
      reset()
    }
  }


  const handleChange = (evt) => {
    setRegion(evt.target.value)

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading my={5}>Crear Paciente</Heading>
      <SimpleGrid spacing={"24px"} columns={{ base: 1, md: 2 }}>
        <FormControl>
          <FormLabel>Nombre</FormLabel>
          <Input {...register("nombre", {required: true})} placeholder='Nombre' />
        </FormControl>
        <FormControl>
          <FormLabel>Apellido Paterno</FormLabel>
          <Input {...register("apellidoPaterno", {required: true})} placeholder='Apellido Paterno' />
        </FormControl>
        <FormControl>
          <FormLabel>Apellido Materno</FormLabel>
          <Input {...register("apellidoMaterno", {required: true})} placeholder='Apellido Materno' />
        </FormControl>
        <FormControl>
          <FormLabel>RUT</FormLabel>
          <Input maxLength={12} {...register("rut", {required: true})} placeholder='RUT' />
        </FormControl>
        <FormControl>
          <FormLabel>Región</FormLabel>
          <Select onChange={handleChange} defaultValue={""}>
            <option value="" disabled hidden>Seleccione aquí</option>
            {regiones.map(ubicacion => (
              <option key={ubicacion.region} value={ubicacion.region}>
                {ubicacion.region}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Comuna</FormLabel>
          <Select {...register("comuna", {required: true})} defaultValue={""} disabled={region === ""}>
            <option value="" disabled hidden>Seleccione aquí</option>
            {regiones.map(ubicacion => {
              if (ubicacion.region === region)
                return ubicacion.comunas.map(comuna => <option key={comuna} value={comuna}>{comuna}</option>)
            })}
          </Select>
        </FormControl>
      </SimpleGrid>
      <Flex my={2} justifyContent="end">
        <Button width={{base: "100%", md:"20rem"}} type='submit'>Submit</Button>
      </Flex>
    </form>
  )
}
