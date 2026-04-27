'use client';

import { useForm } from 'react-hook-form';

export function SimpleForm({ fields }: { fields: string[] }) {
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(() => undefined)} className="card grid md:grid-cols-2 gap-3">
      {fields.map((f) => (
        <label key={f} className="text-sm">
          {f}
          <input className="input mt-1" {...register(f)} />
        </label>
      ))}
      <button className="btn md:col-span-2" type="submit">Salvar</button>
    </form>
  );
}
