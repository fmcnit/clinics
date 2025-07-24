
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ClinicForm from "./_components/clinic-form";




const ClinicsFormsPage = () => {

    
  return (
    <Dialog open>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Adicionar Clínica</DialogTitle>
                <DialogDescription>
                Adicione uma clinica para começar
                </DialogDescription>
            </DialogHeader>
            <ClinicForm/>
       
        <DialogFooter>     
           
        </DialogFooter>
    
    
      </DialogContent>
    </Dialog>
  )
};

export default ClinicsFormsPage;
