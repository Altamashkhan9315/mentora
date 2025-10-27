"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { Loader, Loader2 } from "lucide-react";

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

  const{
    loading:updateLoading,
    fn:updateUserFn,
    data:updateResult,
  }=useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });
  const onSubmit=async(values)=>{
    try {
      const formattedIndustry=`${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g,"-")}`

        await updateUserFn({
          ...values,
          industry:formattedIndustry,
        });
    } catch (error) {
      console.log("Onboarding Error :",error);
      toast.error("Failed to complete profile. Please try again.");
    }
    
  }

  useEffect(()=>{
    if(updateResult?.success && !updateLoading){
      toast.success("Profile Completed Successfully")
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    }
  },[updateResult, updateLoading, router])
  const watchIndustry = watch("industry")

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2 gradient-card">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="industry" className="mb-4">Industry</Label>
              <Select 
              onValueChange={(value)=>{
                setValue("industry",value);
                setSelectedIndustry(
                  industries.find((ind)=>ind.id===value)
                )
                
              }

              }
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent >
                  {industries.map((ind) => {
                    return(
                        <SelectItem key={ind.id} value={ind.id}>{ind.name}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )
                
              }
            </div>
            {watchIndustry && (
              <div>
              <Label htmlFor="subIndustry" className="mt-4 mb-4">Specialization</Label>
              <Select 
              onValueChange={(value)=>setValue("subIndustry",value)}
              >
                <SelectTrigger id="subIndustry" className="w-[500px]">
                  <SelectValue placeholder="Select an subIndustry" />
                </SelectTrigger>
                <SelectContent >
                  {selectedIndustry?.subIndustries.map((ind) => {
                    return(
                        <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {errors.subIndustry && (
                <p className="text-sm text-red-500">
                  {errors.subIndustry.message}
                </p>
              )
                
              }
            </div>
          )}
          <div>
              <Label htmlFor="experience" className="mt-4 mb-4">Years of Experience</Label>    
              <Input
              id="experience"
              type="number"
              min="0"
              max="50"
              placeholder="Enter years of experience"
              onKeyDown={(e) => {
                // Allow: backspace, delete, tab, escape, enter, and numbers
                if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                    (e.keyCode === 65 && e.ctrlKey === true) ||
                    (e.keyCode === 67 && e.ctrlKey === true) ||
                    (e.keyCode === 86 && e.ctrlKey === true) ||
                    (e.keyCode === 88 && e.ctrlKey === true) ||
                    // Allow numbers
                    (e.keyCode >= 48 && e.keyCode <= 57) ||
                    (e.keyCode >= 96 && e.keyCode <= 105)) {
                  return;
                }
                e.preventDefault();
              }}
              {...register("experience")}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="skills" className="mt-4 mb-4">Skills</Label>    
              <Input
              id="skills"
              placeholder="e.g. , Python, JavaScript, MernStack "
              {...register("skills")}
              />
              <p className="text-sm text-muted-foreground">
                Seperate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">
                  {errors.skills.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="bio" className="mt-4 mb-4">Professional bio</Label>    
              <Textarea
              id="bio"
              placeholder="Tell us about your professional background..."
              {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">
                  {errors.bio.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full mt-4 gradient-button" disabled={updateLoading}>
              {updateLoading ?(
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Completing Profile...
                </>
              ):(
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
