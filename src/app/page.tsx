'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  return (
    <>
      <h1>Hello World</h1>
      <Button type="button" variant="outline" onClick={() => router.push('/projects')}>Projects page</Button>
    </>
  );
}
