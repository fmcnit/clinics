import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ClinicForm from "./_components/clinic-form";
import WithAuthentication from "@/hocs/with-authentication";


const ClinicsFormsPage = () => {
   
  return (
    <WithAuthentication mustHaveClinic>
      <Dialog open>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Clínica</DialogTitle>
            <DialogDescription>
              Adicione uma clinica para começar
            </DialogDescription>
          </DialogHeader>
          <ClinicForm />

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </WithAuthentication>
  );
};

export default ClinicsFormsPage;
