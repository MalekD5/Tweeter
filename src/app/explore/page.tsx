import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }
  return <div>username: {session.user?.name}</div>;
}
