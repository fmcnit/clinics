import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import AddPatientButton from "./_components/add-patient-button";
import { DataTable } from "@/components/ui/data-table";
import { patientsTableColumns } from "./_components/table-columns";

const PatientsPage = async () => {

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const patients = await db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, session!.user.clinic!.id),
    });

    return(
    <PageContainer>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Pacientes</PageTitle>
            <PageDescription>
              Gerencie os pacientes da sua clínica
            </PageDescription>
          </PageHeaderContent>
          <PageActions>
            <AddPatientButton />
          </PageActions>
        </PageHeader>
        <PageContent>
          <DataTable data={patients} columns={patientsTableColumns} />
        </PageContent>
    </PageContainer>
  );
};

export default PatientsPage;
