"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SingOutButton = () => {
    const router = useRouter();
    
    return (
      <div>
        <Button onClick={()=>{
          authClient.signOut({
            fetchOptions:{
              onSuccess: ()=>{
                router.push("/authentication");
              }
            }
          })
        }}>Sair</Button>
      </div>
    );
}
 
export default SingOutButton;