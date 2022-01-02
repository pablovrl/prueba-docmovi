import React from 'react';
import Formulario from './Formulario';
import Pacientes from './Pacientes';
import { ChakraProvider, Container } from '@chakra-ui/react'
import ColorModeChanger from './ColorModeChanger';


export const App = () => (
  <ChakraProvider>
    <Container maxW="container.xl">
      <ColorModeChanger />
      <Formulario />
      <Pacientes />
    </Container>
  </ChakraProvider>
);