"use client";
import { saveResumeToDb } from "@/actions/resume";
import React, { Children, useEffect } from "react";
import toast, { useToasterStore } from "react-hot-toast";

const ResumeContext = React.createContext();
const initialState = {
  name: "",
  job: "",
  address: "",
  phone: "",
  email: "",
  themeColor: "",
};
export function ResumeProvider({ children }) {
  // why can't this be a default export?
  const [resume, setResume] = React.useState(initialState);
  const [step, setStep] = React.useState(1);

  useEffect(() => {
    const savedResume = localStorage.getItem("resume");
    if (saveResume) {
      setResume(JSON.parse(savedResume));
    }
  }, []);

  const saveResume = async () => {
    try {
      const data = saveResumeToDb(resume);
      setResume(data);
      toast.success("Resume saved successfully");
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save resume");
    }
  };
  return (
    <ResumeContext.Provider
      value={{ resume, setResume, step, setStep, saveResume }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext); // so in order to access this context we have to use this hook, while inside the provider we have to use this hook
