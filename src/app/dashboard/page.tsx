
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ButtonLogout from "./components/button-logout";
import { redirect } from "next/navigation";



const DashboardPage = async () => {
    const session = await auth.api.getSession({
       headers: await headers()
    })
    if(!session){
        redirect("/authentication")
    }

    return ( 
    <div>
        <h1>Meu Dashboard - {session?.user?.name}</h1>
        <p>{session?.user?.email}</p>
        <ButtonLogout/>
    </div> );
}
 
export default DashboardPage;