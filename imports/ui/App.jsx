import React from 'react';
import Formulario from './Formulario';
import Pacientes from './Pacientes';
import { ChakraProvider, Container } from '@chakra-ui/react'


export const App = () => (
  <ChakraProvider>
    <Container maxW="container.xl">
      <Formulario />
      <Pacientes />
    </Container>
  </ChakraProvider>
);
