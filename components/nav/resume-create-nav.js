import { useResume } from "@/context/resume";
import React from "react";
import { Button } from "../ui/button";

export default function ResumeCreateNav() {
  const { step, setStep } = useResume();

  return (
    <nav className="flex justify-center w-full py-4">
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5].map((stp) => (
          <Button
            className={`w-10 h-10 flex itesm-center justify-center rounded-full transition hover:bg-primary hover:text-slate-200 ${
              stp === step
                ? "bg-primary text-slate-200 dark:text-slate-800"
                : "bg-secondary text-gray-700 dark:text-gray-400"
            }`}
            key={stp}
            onClick={() => setStep(stp)}
          >
            {stp}
          </Button>
        ))}
      </div>
    </nav>
  );
}
