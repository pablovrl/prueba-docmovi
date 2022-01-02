import React from 'react'
import {
  Flex,
  Spacer,
  Button,
  useColorMode
} from '@chakra-ui/react';

export default function ColorModeChanger() {

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex>
      <Spacer />
      <Button my={4} onClick={toggleColorMode}>
        {colorMode === 'light' ? "Dark" : "Light" }
      </Button>
    </Flex>
  )
}