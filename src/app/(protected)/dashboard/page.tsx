
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { usersToClinicsTable } from "@/db/schema";
import SingOutButton from "./_components/sign-out-button";



const DashboardPage = async () => {
    
    const session = await auth.api.getSession({
       headers: await headers()
    })

    if(!session){ 
        redirect("/authentication")
    }
    
    const clinics = await db.query.usersToClinicsTable.findMany({
        where: eq(usersToClinicsTable.userId, session.user.id)
    })
 

    if(clinics.length <= 0){
        redirect("/clinic-form")
    }
    

    return ( 
    <div>
        <h1>Meu Dashboard - {session?.user?.name}</h1>
        <p>{session?.user?.email}</p>
        <h2>{clinics.map(clinic => clinic.userId)}</h2>
        <SingOutButton/>
    </div> );
}
 
export default DashboardPage;