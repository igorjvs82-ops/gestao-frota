import { PageHeader } from '@/components/page-header';
import { SimpleForm } from '@/components/simple-form';

export default function Page() {
  return (
    <div>
      <PageHeader title="Colaboradores" subtitle="Cadastro e gestão" />
      <SimpleForm fields={['nome','status','observacoes']} />
    </div>
  );
}
