import { auth } from '@/lib/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }
  return <div>Home page</div>;
}
