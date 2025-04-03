import { Divide } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useResume } from "@/context/resume";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function StepOneCreate() {
  const { resume, setResume, saveResume } = useResume();
  const { isSignedIn } = useUser();
  const handleSubmit = (e) => {
    e.preventDefault();
    saveResume();
  };

  const handleChange = (e) => {
    setResume((prevState) => {
      const { name, value } = e.target;
      const updatedResume = { ...prevState, [name]: value };
      localStorage.setItem("resume", JSON.stringify(updatedResume));
      return updatedResume;
    });
  };
  return (
    <div className="w-full lg:w-1/2 p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Personal Information</h2>

      <Input
        name="name"
        className="mb-3"
        onChange={handleChange}
        // value={resume.name}
        value={resume?.name || ""}
        placeholder={"Your name here"}
        autoFocus
        required
        type="text"
      />
      <Input
        name="job"
        className="mb-3"
        onChange={handleChange}
        // value={resume.job}
        value={resume?.job || ""}
        placeholder={"Job title"}
        type="text"
      />
      <Input
        name="address"
        className="mb-3"
        onChange={handleChange}
        // value={resume.address}
        value={resume?.address || ""}
        placeholder={"Address"}
      />
      <Input
        name="phone"
        className="mb-3"
        onChange={handleChange}
        value={resume?.phone || ""}
        placeholder={"Phone number"}
      />
      <Input
        name="userEmail"
        className="mb-3"
        onChange={handleChange}
        // value={resume.userEmail}
        value={resume?.userEmail || ""}
        placeholder={"Email"}
      />

      <div className="flex justify-end">
        {!isSignedIn ? (
          <SignInButton>
            <Button>Sign In to Save</Button>
          </SignInButton>
        ) : (
          <Button onClick={handleSubmit} className="mb-3">
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
