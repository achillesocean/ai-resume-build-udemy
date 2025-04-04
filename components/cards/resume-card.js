import Link from "next/link";
import PersonalDetails from "../preview/personal-details";

export default function ResumeCard({ resume }) {
  return (
    <Link href={`/dashboard/resume/edit/${resume._id}`}>
      <div
        className="shadow-lg h-[175px] w-full rounded-xl p-5 border-t-[20px]"
        style={{ borderColor: resume?.themeColor }}
      >
        <PersonalDetails resume={resume} />
      </div>
    </Link>
  );
}
