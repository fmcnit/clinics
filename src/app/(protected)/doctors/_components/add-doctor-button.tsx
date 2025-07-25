"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import UpsertDoctorForm from "./upsert-doctor-form";
import { useState } from "react";

const AddDoctorButton = () => {

  const [isOpen, setIsOpen] = useState(false)
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Adicionar Médico
          </Button>
        </DialogTrigger>
        <UpsertDoctorForm onSuccess={() => setIsOpen(false)} />
      </Dialog>
    );
}
 
export default AddDoctorButton;