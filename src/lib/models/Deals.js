import mongoose, { Schema, model, models } from 'mongoose';

const DealsSchema = new Schema({
  name: { type: String, required: true }, // Business name
  industry: { type: String }, // e.g., "Tech", "Retail"
  businessType: { 
    type: String, 
    enum: [
      "B2B", "B2C", "D2C", "C2C", "C2B", "B2G", "G2B", 
      "Franchise", "Subscription", "Freemium", "Marketplace", 
      "E-commerce", "Licensing", "Dropshipping", "Aggregator", 
      "On-Demand", "Other"
    ], 
    required: true 
  }, // Type of business
  amount: { type: Number, required: true }, // Deal amount
  title: { type: String, required: true }, // e.g., "Software Development Contract"
  description: { type: String }, // Details about the deal
  website: { 
    type: String, 
    match: /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9_.-]+)*\/?$/ 
  }, // Optional website with stricter URL validation 
  email: { type: String, match: /\S+@\S+\.\S+/ }, // Business email with basic email validation
  phone: { type: String }, // Business phone
  address: { type: String }, // Business address
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true }, // Linked business
  status: { 
    type: String, 
    enum: ["Pending", "In Progress", "Completed", "Canceled"], 
    default: "Pending" 
  }, // Deal status
  startDate: { type: Date, default: Date.now }, // When the deal started
  endDate: { type: Date }, // Optional end date
  month: { 
    type: String, 
    enum: [
      "January", "February", "March", "April", "May", 
      "June", "July", "August", "September", "October", 
      "November", "December"
    ], 
    required: true 
  }, // Month of the deal
  year: { type: Number, required: true }, // Year of the deal
}, { timestamps: true });

export default models.Deals || model('Deals', DealsSchema);
