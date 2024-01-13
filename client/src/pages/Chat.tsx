import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider"
import ChatBox from "../components/ChatBox";
import MyChats from "../components/My Chats";
import SideDrawer from "../components/SideDrawer";

function Chat() {
  const  {user}  = ChatState();
  console.log(user)
  return (
    <div style={{width: '100%', height: '100%', backgroundColor: 'orange'}}>
     {user && <SideDrawer />}
     <Box
     display='flex'
     justifyContent='space-between'
     w='100%'
     h='96vh'
     p='10px'

     >
      {user && <MyChats />}
      {user && <ChatBox />} 
      </Box>
    </div>
  )
}

export default Chat
