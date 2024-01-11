import { Button, FormControl, FormLabel, Input, InputGroup, InputRightAddon, VStack, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

  const initialData = { email: '', password: ''}
  const [formData, setFormData] = useState(initialData)
  const [show, setShow] = useState(false)
 const [loading, setLoading] = useState(false);
  const toast = useToast()
const navigate = useNavigate()

  const handleSubmit = async() => {
 setLoading(true);
  if(!formData.email || !formData.password ) {
    toast({
          title: 'one or more input fileds empty.',
          description: "All fields are required!",
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
        setLoading(false);
        return;
  }

  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post("http://localhost:5000/api/user/login", 
    {
      ...formData
    }, 
    config
    );
    toast({
          title: 'login to account.',
          description: "Login successfully!",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setLoading(false);
        navigate('/chat');
  } catch (error) {
     toast({
          title: 'Error.',
          description: "Error occured!",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
        setLoading(false);
  }
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
      isLoading={loading}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login
