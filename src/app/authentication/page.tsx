import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignForm from "./_components/sing-form";
import LoginForm from "./_components/login-form";


import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const AuthenticationPage = async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session?.user) {
      redirect("/dashboard");
    }
  

    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Criar Conta</TabsTrigger>
          </TabsList>

          {/* Formulário Login */}
          <TabsContent value="login">
            <LoginForm/>
          </TabsContent>

          {/* Formulário de Criar conta*/}
          <TabsContent value="register">
            <SignForm />
          </TabsContent>
        </Tabs>
      </div>
    );
}


 
export default AuthenticationPage;




