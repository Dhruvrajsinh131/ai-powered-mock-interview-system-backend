import { model, Schema } from "mongoose";

const jobsSchema = new Schema({
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
