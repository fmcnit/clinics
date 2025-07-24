"use client"

import { createClinic } from "@/actions/create-clinic";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const clinicFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
});

const ClinicForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof clinicFormSchema>>({
      resolver: zodResolver(clinicFormSchema),
      defaultValues:{
        name: ""
      }
    });

    const onSubmit = async (data: z.infer<typeof clinicFormSchema>) => {
      try{
        await createClinic(data.name)
        toast.success("Parabéns sua clínica foi criada")
        form.reset()
        router.push("/dashboard")
      }
      catch(error){
        console.log(error)
        toast.error("Erro ao criar a clínica")
        router.push("/authentication");
      }
    }
    return ( 
      <>
      <Form {...form}> 
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Clínica</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome da sua clínica"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <DialogFooter>
          <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitted}
                >
                {form.formState.isSubmitted ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  ) : (
                "Criar Clínica"
                )}
            </Button>
        </DialogFooter>
      </form>
      </Form>
      </>
    );
}
 
export default ClinicForm;