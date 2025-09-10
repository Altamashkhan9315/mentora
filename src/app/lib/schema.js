import {z} from "zod";

export const onboardingSchema = z.object({
   industry:z.string({
    required_error:"Please select an industry",
   }),
   subIndustry:z.string({
    required_error:"Please select a specialization",
   }),
   bio:z.string().max(500).optional(),
   experience:z.string()
   .min(1, "Experience is required")
   .regex(/^\d+$/, "Experience must be a number")
   .transform((val)=>parseInt(val,10))
   .pipe(
    z
    .number()
    .min(0,"Experience must be atleast 0 years")
    .max(50,"Experience cannot exceed 50 years")
   ),
   skills:z.string().optional().transform((val)=>
   val?
   val
   .split(",")
   .map((skill)=>skill.trim())
   .filter(Boolean)
   :[]
),
})

export const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  mobile: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
});