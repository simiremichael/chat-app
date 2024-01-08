import { Button, FormControl, FormLabel, Input, InputGroup, InputRightAddon, VStack } from "@chakra-ui/react"
import { useState } from "react"

function Login() {

  const initialData = { email: '', password: ''}
  const [formData, setFormData] = useState(initialData)
  const [show, setShow] = useState(false)

  const handleSubmit = () => {

  }

  return (
     <VStack spacing='5px'>  
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input 
        placeholder="Email" 
        value={formData.email}
        onChange={(e:any) => setFormData({...formData, email: e.target.value})}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input 
        placeholder="Password" 
        type={show ? "text" : "password"}
        value={formData.password}
        onChange={(e:any) => setFormData({...formData, password: e.target.value})}
        />
        <InputRightAddon width='4.5rem'>
        <Button h='1.75rem' size='small' onClick={() => setShow(!show)}>
         {show ? 'Hide' : 'Show'}
        </Button>
        </InputRightAddon>
        </InputGroup>
      </FormControl>
      <Button
      colorScheme="blue"
      width='100%'
      style={{marginTop: 15}}
      onClick={handleSubmit}
      >
        Login
      </Button>
      <Button
      variant='solid'
      colorScheme="red"
      width= '100%'
      onClick={() => setFormData({...formData, email: 'guest@example.com', password: '1234'})}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login
