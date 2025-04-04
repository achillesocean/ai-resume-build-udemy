"use server";
import db from "@/utils/db";
import Resume from "@/models/resume";
import { currentUser } from "@clerk/nextjs/server";

const checkOwnership = async (resumeId) => {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    if (!userEmail) {
      throw new Error("User not found");
    }

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      throw new Error("Resume not found");
    }

    if (resume.userEmail !== userEmail) {
      throw new Error("Unauthorized");
    }

    return true;
  } catch (err) {
    throw new Error(err);
  }
};
// does it handle updates? how?
export const saveResumeToDb = async (data) => {
  try {
    await db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const { _id, ...rest } = data; // if data is the resume state, why would it have _id?

    const resume = await Resume.create({ ...rest, userEmail }); // won't data already contain email?
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserResumesFromDb = async () => {
  try {
    db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const resumes = await Resume.find({ userEmail });
    return JSON.parse(JSON.stringify(resumes));
  } catch (err) {
    throw new Error(err);
  }
};

export const getResumeFromDb = async (_id) => {
  try {
    db();
    const resume = await Resume.findById(_id);
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateResumeFromDb = async (data) => {
  try {
    db();
    const { _id, ...rest } = data;
    await checkOwnership(_id); // don't we need to check the return of the awaited ownership ckeck?

    const resume = await Resume.findByIdAndUpdate(
      _id,
      { ...rest },
      { new: true }
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};
