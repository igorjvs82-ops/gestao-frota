import { PageHeader } from '@/components/page-header';
import { SimpleForm } from '@/components/simple-form';

export default function Page() {
  return (
    <div>
      <PageHeader title="Veiculos" subtitle="Cadastro e gestão" />
      <SimpleForm fields={['nome','status','observacoes']} />
    </div>
  );
}
