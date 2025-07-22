"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ButtonLogout = () => {
    const router = useRouter();

    const logOut = () => {
    
      authClient.signOut();
      router.push("/authentication");
    };
    return (
      <div>
        <Button onClick={() => logOut()}>Sair</Button>
      </div>
    );
}
 
export default ButtonLogout;