"use client";
import { useResume } from "@/context/resume";
import { SkeletonDemo } from "@/components/cards/skeleton-card";
import ResumeCard from "@/components/cards/resume-card";
export default function Dashboard() {
  const { resumes } = useResume();

  if (!resumes?.length) {
    return (
      <div>
        <p className="text-center my-5">Loading...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
          <SkeletonDemo />
          <SkeletonDemo />
          <SkeletonDemo />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
      {resumes.map((resume) => (
        <ResumeCard key={resume._id} resume={resume} />
      ))}
    </div>
  );
}
