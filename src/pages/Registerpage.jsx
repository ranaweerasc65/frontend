import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import DividerWithText from '../components/DividerWithText'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import {useMounted} from '../hooks/useMounted'

export default function Registerpage() {
  const navigate = useNavigate()
  const { signInWithGoogle, register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()  //react hook

  const mounted = useMounted()
  


  return (
    <Layout>
      <Heading textAlign='center' my={12}>
        Register
      </Heading>
      <Card maxW='md' mx='auto' mt={4}>
        <chakra.form
          onSubmit={async e => {
            e.preventDefault()

            // your register logic here

            if (!email || !password) {
              toast({
                description: 'Credentials not valid.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
              //return
            }
            
            setIsSubmitting(true)
            register(email, password)
              .then(res => {navigate('/login')})
              .catch(error => {
                console.log(error.message)
                toast({
                  description: error.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
              })
              .finally(() => {
                mounted.current && setIsSubmitting(false)
              })
          }}

          
        >
          <Stack spacing='6'>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                name='email'
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                name='password'
                type='password'
                autoComplete='password'
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type='submit'
              colorScheme='pink'
              size='lg'
              fontSize='md'
              isLoading={isSubmitting}
            >
              Sign up
            </Button>
          </Stack>
        </chakra.form>
        <Center my={4}>
          <Button variant='link' onClick={() => navigate('/login')}>
            Login
          </Button>
        </Center>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant='outline'
          isFullWidth
          colorScheme='red'
          leftIcon={<FcGoogle />}
          onClick={() =>
            signInWithGoogle()
              .then(user=>navigate('/profile'))
              .catch(e => console.log(e.message))
          }
        >
          Sign in with Google
        </Button>
      </Card>
    </Layout>
  )
}