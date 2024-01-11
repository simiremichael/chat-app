import { Button, FormControl, FormLabel, Input, InputGroup, InputRightAddon, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

function SignUp() {
  const initialData = {name: '', email: '', password: '', confirmPassword: '', pics: ''}
  const [formData, setFormData] = useState(initialData)
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [loading, setLoading] = useState(false);
  const toast = useToast()
const navigate = useNavigate()
  const handlePics = (pics: any) => {
   setLoading(true);
   if (pics === undefined) {
  toast({
          title: 'No image selected.',
          description: "Please select an image!",
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
        return;
   }
   if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
const data = new FormData();
data.append('file', pics);
data.append("upload_preset", 'propertyImg')
data.append("cloud_name", "do2u3zzko");
fetch("https://api.cloudinary.com/v1_1/do2u3zzko/image/upload", {
method: "POST",
body: data,
})
.then(res => res.json())
.then((data: any) => {
setFormData({...formData, pics: data?.url.toString()})
setLoading(false);
})
.catch((err: any) => { 
console.log(err);
})
   }
  }

  const handleSubmit = async() => {
  setLoading(true);
  if(!formData.email || !formData.name || !formData.password || !formData.confirmPassword) {
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
  if (formData.password !== formData.confirmPassword) {
    toast({
          title: 'passord',
          description: "Password does not match!",
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
    const { data } = await axios.post("http://localhost:5000/api/user/register", 
    {
      ...formData
    }, 
    config
    );
    toast({
          title: 'Account created.',
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
        onChange={(e:any) => handlePics(e.target.files[0])}
        />
      </FormControl>
      <Button
      colorScheme="blue"
      width='100%'
      style={{marginTop: 15}}
      onClick={handleSubmit}
      isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default SignUp
