"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const { _id } = useParams();
  console.log(`dashboard/resume/${_id}`);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">Dashboard/resume</h1>
    </main>
  );
}
