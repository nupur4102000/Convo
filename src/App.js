
    
      

     import { useEffect, useRef, useState } from "react";
     import {
       Box,
       Button,
       Container,
       HStack,
       Input,
       StatHelpText,
       VStack,
     } from "@chakra-ui/react";
     import Messag from "./Components/Messag";
     import { app } from "./firebase";
     import {
       onAuthStateChanged,
       getAuth,
       GoogleAuthProvider,
       signInWithPopup,
       signOut,
     } from "firebase/auth";
     import {
       getFirestore,
       addDoc,
       collection,
       serverTimestamp,
       onSnapshot,
       query,
       orderBy,
     } from "firebase/firestore";
     
     const auth = getAuth(app);
     const db = getFirestore(app);
     
     
     
     function App() {
       const [user, setUser] = useState(false);
       
       const [message, setMessage] = useState("");
       const [messages, setMessages] = useState([]);
       const loginHandler = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
        setMessages([]);
      };
      
      const logoutHandler = () => {
        
       signOut(auth);

      
      }
       const divForScroll = useRef(null);
     
       const submitHandler = async (e) => {
         e.preventDefault();
     
         try {
           setMessage("");
           
     
           await addDoc(collection(db, "Messages"), {
             text: message,
             uid: user.uid,
             uri: user.photoURL,
             createdAt: serverTimestamp(),
           });
     
           divForScroll.current.scrollIntoView({ behavior: "smooth" });
         } catch (error) {
           alert(error);
         }
       };
     
       useEffect(() => {
         const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
     
         const unsubscribe = onAuthStateChanged(auth, (data) => {
           setUser(data);
         });
     
         const unsubscribeForMessage = onSnapshot(q, (snap) => {
           setMessages(
             snap.docs.map((item) => {
               const id = item.id;
               return { id, ...item.data() };
             })
           );
         });
     
         return () => {
           unsubscribe();
           unsubscribeForMessage();
         };
       }, []);
     
       return (
         <Box bg={"red.50"}>
           {user ? (
             <Container h={"100vh"} bg={"white"}>
               <VStack h="full" paddingY={"4"}>
                 <Button onClick={logoutHandler} colorScheme={"red"} w={"full"}>
                   Logout
                 </Button>
     
                 <VStack
                   h="full"
                   w={"full"}
                   overflowY="auto"
                   css={{
                     "&::-webkit-scrollbar": {
                       display: "none",
                     },
                   }}
                 >
                   {messages.map((item) => (
                     <Messag 
                       
                       key={item.id}
                       user={item.uid === user.uid ? "me" : "other"}
                       text={item.text}
                       uri={item.uri}
                     />
                   ))}
     
                   <div ref={divForScroll}></div>
                 </VStack>
     
                 <form onSubmit={submitHandler}  style={{ width: "100%" }}>
                   <HStack>
                     <Input
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                       placeholder="Start new convo ..."
                     />
                     <Button colorScheme={"purple"} type="submit">
                       Send
                     </Button>
                   </HStack>
                 </form>
               </VStack>
             </Container>
           ) : (<div backgroundColor="pink">
            <VStack  bg="pink" justifyContent={"center"} h="35vh" >
              <p style={{fontSize:"50px",fontWeight:"bold" ,fontFamily:'cursive',color:"darkblue"}}>Welcome to Convo</p>
              <p style={{fontSize:"25px",fontWeight:"revert-layer" ,fontFamily:'cursive'}}>Real-time  chat application</p>
            </VStack>
             <VStack bg="pink" justifyContent={"center"} h="25vh">
               <Button onClick={loginHandler} colorScheme={"purple"}>
                 Sign In With Google
               </Button>
             </VStack>
             </div>
           )}
         </Box>
       );
     }
     
     export default App;
