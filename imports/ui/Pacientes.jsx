import React from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { PacientesCollection } from '../api/PacientesCollection';
import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

export default function Pacientes() {

  const pacientes = useTracker(() => PacientesCollection.find({}).fetch())

  return (
    <>
      <Heading>Pacientes</Heading>
      <Box>
        <Table variant='striped' colorScheme='purple' size="md">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Apellido Paterno</Th>
              <Th>Apellido Materno</Th>
              <Th>RUT</Th>
              <Th>Región</Th>
              <Th>Comuna</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pacientes.map(paciente => (
              <Tr key={paciente._id}>
                <Td>{paciente.nombre}</Td>
                <Td>{paciente.apellidoPaterno}</Td>
                <Td>{paciente.apellidoMaterno}</Td>
                <Td>{paciente.rut}</Td>
                <Td>{paciente.region}</Td>
                <Td>{paciente.comuna}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}
