import { useEffect } from "react";
import { signIn, useSession, SessionProvider } from "next-auth/react"
import "./styles.css"

export default function App ({ 
    Component, 
    pageProps: { session, ...pageProps }, 
  }) {

    // https://simplernerd.com/next-auth-global-session
    // https://next-auth.js.org/getting-started/client#custom-client-session-handling
    function Auth({ children }) {  
      const { data: session, status} = useSession(); 
      const isUser = !!session?.user;  
        
      useEffect(() => {
        if (status === "loading") {
          return;
        }
        if (!isUser) {
          console.log("redirect to login");
          signIn(null, { redirect: false });
        }
      }, [status, isUser]);

      if (isUser) {
        return children;
      }
    
      return <div>Loading...</div>;
    }  

  // render
  return (
    <SessionProvider session={session}>      
      {Component.auth ? (        
        <Auth>          
          <Component {...pageProps} />        
        </Auth>      
        ) : (        
          <Component {...pageProps} />      
        )}    
        </SessionProvider>
  )

}

/*
  function Auth({ children }) {  
    const { data: session, loading } = useSession(); 
    const isUser = !!session?.user;  

    console.log("_app - isUser", isUser);
 
    useEffect( () => {  
      // Do nothing while loading  
      if (loading) return; 
      // If not authenticated, force log in      
      if (!isUser) signIn({ redirect: false });
    }, [isUser, loading])

    if (isUser) {    
      return children; 
    }
    
    // Session is being fetched, or no user.  
    // If no user, useEffect() will redirect.  
    return (
      <div>Loading...</div>
    )
  }

*/