import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DoctorsPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/authentication");
  }

  if(!session.user.clinic){
    redirect("/clinic-form");
  }
    return (
      <PageContainer>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Médicos</PageTitle>
            <PageDescription>
              Gerencie os médicos da sua clínica
            </PageDescription>
          </PageHeaderContent>
          <PageActions>
            
          </PageActions>
        </PageHeader>
        <PageContent>
        </PageContent>
      </PageContainer>
    );
}
 
export default DoctorsPage;