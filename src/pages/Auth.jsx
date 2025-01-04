// src/pages/Auth.jsx
import { useState } from 'react';
import { account, ID } from '../lib/appwrite';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Flex,
  IconButton,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const Auth = ({ onLogin, colorMode, toggleColorMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const toast = useToast();

  async function login(email, password) {
    toast({
      title: 'Signing In',
      status: 'loading',
      duration: 2000,
    });
    try {
      // Try to get the current session first
      try {
        const session = await account.getSession('current');
        // If we have a session, just get the user
        const user = await account.get();
        onLogin(user);
        return;
      } catch (error) {
        // No session exists, proceed with login
        await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        onLogin(user);
      }
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  }

  async function register(email, password, name) {
    try {
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  }

  return (
    <Box minH="100vh" py={12}>
      <Container maxW="lg">
        <VStack spacing={8}>
          <Flex w="full" justify="flex-end">
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
            />
          </Flex>

          <VStack spacing={6} w="full">
            <Heading>{isRegistering ? 'Create Account' : 'Welcome Back'}</Heading>
            <Card w="full" variant="outline">
              <CardBody>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </FormControl>

                  {isRegistering && (
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </FormControl>
                  )}

                  <Button
                    colorScheme="green"
                    w="full"
                    onClick={() =>
                      isRegistering ? register(email, password, name) : login(email, password)
                    }>
                    {isRegistering ? 'Sign Up' : 'Sign In'}
                  </Button>

                  <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering
                      ? 'Already have an account? Sign In'
                      : "Don't have an account? Sign Up"}
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Auth;
