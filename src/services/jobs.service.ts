import axios from "axios";
import jobsModel from "../models/jobs.model";
import openaiService from "./openai.service";

export const fetchAndStoreJobs = async () => {
  try {
    const jobsData = await axios.get(
      "https://remotive.com/api/remote-jobs?category=software-dev"
    );

    const jobs = jobsData.data.jobs;
    const now = new Date();

    for (const jobData of jobs) {
      console.log(" Started Processing ✅", jobData.id);

      let job = await jobsModel.findOne({ provider_id: jobData.id });

      if (job) {
        console.log("Job already exists in our records 😁👍");
      } else {
        const ai_generated_questiondata =
          await openaiService.generateLeetCodeQuestion(jobData.description);

        job = new jobsModel({
          title: jobData.title,
          skills: jobData.tags,
          apply_url: jobData.url,
          company_name: jobData.company_name,
          job_type: jobData.job_type,
          company_logo: jobData.company_logo,
          provider_id: jobData.id,
          description: jobData.description,
          category: jobData.category,
          salary: jobData.salary,
          publication_date: new Date(jobData.publication_date),
          lastFetched: now,
          ai_generated_test_data: ai_generated_questiondata,
        });
      }
      await job.save();

      console.log("Done  Processing ✅", jobData.id);
    }
    console.log(`Successfully fetched and stored ${jobs.length} jobs`);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};
