"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignForm from "./components/sing-form";




const AuthenticationPage = () => {

  
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Criar Conta</TabsTrigger>
          </TabsList>

          {/* Formulário Login */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Faça login para continuar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2"></CardContent>
              <CardFooter>
                <Button>Entrar</Button>
              </CardFooter>
            </Card>
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




