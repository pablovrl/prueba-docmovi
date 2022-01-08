import React, { useState, useEffect } from 'react'
import { Button, Input, SimpleGrid, Heading, Select, Flex, FormLabel, FormControl } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import regiones from '../../regiones'
import { PacientesCollection } from '../api/PacientesCollection'
import { validateRut, formatRut } from 'rutlib/lib'
import InputConLabel from './InputConLabel'

export default function Formulario() {

  // Uso un input controlado para la región, para así validar en tiempo real la comuna
  const [region, setRegion] = useState("")
  const { register, handleSubmit, reset, resetField} = useForm()

  useEffect(() => {
    resetField('comuna')
  }, [region])

  const onSubmit = data => {
    const paciente = data
    paciente["region"] = region

    if(!validateRut(paciente.rut)) {
      alert("Por favor ingrese un RUT válido.")
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
        
        <InputConLabel label="Nombre" id="nombre" register={register} />
        <InputConLabel label="Apellido Paterno" id="apellidoPaterno" register={register}/>
        <InputConLabel label="Apellido Materno" id="apellidoMaterno" register={register}/>
        <InputConLabel label="RUT" id="rut" register={register}/>
        
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
              // Mostrar sólo las comunas de la región seleccionada 
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
