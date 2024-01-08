import { Button, FormControl, FormLabel, Input, InputGroup, InputRightAddon, VStack } from "@chakra-ui/react"
import { useState } from "react"

function SignUp() {
  const initialData = {name: '', email: '', password: '', confirmPassword: '', pics: ''}
  const [formData, setFormData] = useState(initialData)
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)

  const handleSubmit = () => {

  }

  return (
    <VStack spacing='5px'>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input 
        placeholder="Name" 
        value={formData.name}
        onChange={(e:any) => setFormData({...formData, name: e.target.value})}
        />
      </FormControl>
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
       <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
        <Input 
        placeholder="Confirm Password" 
        type={show1 ? "text" : "password"}
        value={formData.confirmPassword}
        onChange={(e:any) => setFormData({...formData, confirmPassword: e.target.value})}
        />
        <InputRightAddon width='4.5rem'>
        <Button h='1.75rem' size='small' onClick={() => setShow1(!show1)}>
         {show1 ? 'Hide' : 'Show'}
        </Button>
        </InputRightAddon>
        </InputGroup>
      </FormControl>
  <FormControl>
        <FormLabel>Upload your picture</FormLabel>
        <Input 
        type="file"
        p={1.5}
        accept="image/*"
        onChange={(e:any) => setFormData({...formData, pics: e.target.files[0]})}
        />
      </FormControl>
      <Button
      colorScheme="blue"
      width='100%'
      style={{marginTop: 15}}
      onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default SignUp
