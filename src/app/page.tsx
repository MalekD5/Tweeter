import { signIn } from '@/lib/auth';

export default function Home() {
  return (
    <main>
      <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
    </main>
  );
}
