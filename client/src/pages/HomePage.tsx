import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../components/auth/Login'
import SignUp from '../components/auth/SignUp'
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

function HomePage() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('userInfo') || 'false');

useEffect(() => {
if (user) {
    navigate('/chat');
}
},[navigate]);

  return (
    <div style={{backgroundColor: 'orange', height: '100vh', width: '100%' }}>
      <Container maxW='xl' centerContent>
        <Box display='flex' alignItems='center' justifyContent='center' w='100%' m='40px 0 15px 0'  borderRadius='lg' borderWidth='1px' backgroundColor='#fff'>
          <Text fontSize='4xl' fontFamily='work sans' color='#000'>Talk-to-us</Text>
        </Box>
        <Box bg='#fff' w='100%' p={4} color='#000' borderRadius='lg' borderWidth='1px'>
<Tabs variant='soft-rounded'>
  <TabList mb='1em'>
    <Tab w='50%'>Login</Tab>
    <Tab w='50%'>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <SignUp />
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>
      </Container>
    </div>
  )
}

export default HomePage
