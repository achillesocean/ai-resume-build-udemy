"use server";
import db from "@/utils/db";
import Resume from "@/models/resume";
import { currentUser } from "@clerk/nextjs/server";

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
