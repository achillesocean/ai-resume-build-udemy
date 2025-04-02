import db from "@/utils/db";

export default async function Dashboard() {
  await db();
  return <div>Dashboard</div>;
}
