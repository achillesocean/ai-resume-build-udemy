"use client";
import {
  getUserResumesFromDb,
  saveResumeToDb,
  getResumeFromDb,
  updateResumeFromDb,
} from "@/actions/resume";
import { useRouter, useParams } from "next/navigation";
import React, { Children, useEffect, useState } from "react";
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
  const [resume, setResume] = React.useState(initialState);
  const [resumes, setResumes] = useState([]);
  const [step, setStep] = React.useState(1);

  const router = useRouter();
  const { _id } = useParams(); // this is being called in a file that isn't under the [_id] route. does it actually work?
  console.log("id", _id);

  useEffect(() => {
    const savedResume = localStorage.getItem("resume");
    if (savedResume) {
      setResume(JSON.parse(savedResume));
    }
  }, []);

  useEffect(() => {
    getUserResumes();
  }, []);

  useEffect(() => {
    if (_id) {
      // check this pattern! whenever there's an id in the URL!
      // but this is being called in the context file. does it's dependency array actually hold for the id in some other file?
      getResume(_id);
    }
  }, [_id]);

  const saveResume = async () => {
    try {
      const data = await saveResumeToDb(resume);
      setResume(data);
      localStorage.removeItem("resume");
      toast.success("Resume saved successfully");
      router.push(`/dashboard/resume/edit/${data._id}`);
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save resume");
    }
  };

  const getUserResumes = async () => {
    try {
      const data = await getUserResumesFromDb();
      setResumes(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get resumes");
    }
  };

  const getResume = async (_id) => {
    try {
      const data = await getResumeFromDb(_id);
      setResume(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get resume");
    }
  };

  const updateResume = async () => {
    try {
      const data = await updateResumeFromDb(resume);
      setResume(data);
      toast.success("Resume updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update resume");
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        step,
        setStep,
        saveResume,
        resumes,
        updateResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext); // so in order to access this context we have to use this hook, while inside the provider we have to use this hook
