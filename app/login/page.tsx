'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockUsers } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState(mockUsers[0].email);
  const router = useRouter();
  return (
    <div className="max-w-md mx-auto card mt-10">
      <h2 className="text-xl font-semibold mb-3">Login local (MVP)</h2>
      <select className="input" value={email} onChange={(e) => setEmail(e.target.value)}>
        {mockUsers.map((u) => <option key={u.email} value={u.email}>{u.nome} - {u.role}</option>)}
      </select>
      <button className="btn mt-3 w-full" onClick={() => router.push('/dashboard')}>Entrar</button>
      <p className="text-xs text-slate-500 mt-3">Estrutura preparada para Microsoft Entra ID e Graph.</p>
    </div>
  );
}
