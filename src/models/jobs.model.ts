import { model, Schema } from "mongoose";

export interface JobSchema {
  title: string;
  skills: string[];
  apply_url: string;
  company_name: string;
  job_type: string;
  company_logo: string;
  provider_id: number;
  candidate_required_location: string;
  description: string;
  category: string;
  salary: string;
  publication_date: Date;
  lastFetched: Date;
  ai_generated_test_data: object;
}

const jobsSchema = new Schema<JobSchema>({
  title: String,
  skills: [String],
  apply_url: String,
  company_name: String,
  job_type: String,
  company_logo: String,
  provider_id: Number,
  candidate_required_location: String,
  description: String,
  category: String,
  salary: String,
  publication_date: Date,
  lastFetched: Date,
  ai_generated_test_data: Object,
});

const jobsModel = model("job", jobsSchema);

export default jobsModel;
