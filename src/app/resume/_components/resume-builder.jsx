"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Edit, Loader2, Monitor, Save } from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import EntryForm from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";

// ✅ React-PDF imports
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, fontFamily: "Helvetica" },
  header: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: { marginBottom: 12 },
  title: { fontSize: 13, marginBottom: 4, fontWeight: "bold" },
  text: { marginBottom: 2 },
});

const ResumePDF = ({ data, user }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.section}>
        <Text style={styles.header}>{user?.fullName || "Your Name"}</Text>
        {data.contactInfo?.email && <Text>{data.contactInfo.email}</Text>}
        {data.contactInfo?.mobile && <Text>{data.contactInfo.mobile}</Text>}
        {data.contactInfo?.linkedin && <Text>{data.contactInfo.linkedin}</Text>}
        {data.contactInfo?.twitter && <Text>{data.contactInfo.twitter}</Text>}
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.title}>Professional Summary</Text>
          <Text>{data.summary}</Text>
        </View>
      )}

      {/* Skills */}
      {data.skills && (
        <View style={styles.section}>
          <Text style={styles.title}>Skills</Text>
          <Text>{data.skills}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.title}>Work Experience</Text>
          {data.experience.map((exp, i) => (
            <Text key={i} style={styles.text}>
              {exp.title} - {exp.company} ({exp.startDate} - {exp.endDate})
            </Text>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.title}>Education</Text>
          {data.education.map((edu, i) => (
            <Text key={i} style={styles.text}>
              {edu.degree} - {edu.institution} ({edu.year})
            </Text>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.title}>Projects</Text>
          {data.projects.map((proj, i) => (
            <Text key={i} style={styles.text}>
              {proj.name} - {proj.description}
            </Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent || initialContent);
    }
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) toast.success("Resume saved successfully!");
    if (saveError) toast.error(saveError.message || "Failed to save resume");
  }, [saveResult, saveError, isSaving]);

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const onSubmit = async () => {
    try {
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div
      data-color-mode="light"
      className="space-y-4 min-h-screen overflow-y-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
          Resume Builder
        </h1>
        <div className="space-x-2">
          <Button
            variant="destructive"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save
              </>
            )}
          </Button>

          {/* ✅ React-PDF download button */}
          <PDFDownloadLink
            document={<ResumePDF data={formValues} user={user} />}
            fileName="resume.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button disabled>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating PDF...
                </Button>
              ) : (
                <Button>
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>

        {/* Form Tab */}
        <TabsContent value="edit">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                <div>
                  <label>Email</label>
                  <Input {...register("contactInfo.email")} type="email" />
                </div>
                <div>
                  <label>Mobile</label>
                  <Input {...register("contactInfo.mobile")} type="tel" />
                </div>
                <div>
                  <label>LinkedIn</label>
                  <Input {...register("contactInfo.linkedin")} type="url" />
                </div>
                <div>
                  <label>Twitter</label>
                  <Input {...register("contactInfo.twitter")} type="url" />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3>Professional Summary</h3>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => <Textarea {...field} className="h-32" />}
              />
            </div>

            {/* Skills */}
            <div>
              <h3>Skills</h3>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => <Textarea {...field} className="h-32" />}
              />
            </div>

            {/* Experience */}
            <div>
              <h3>Work Experience</h3>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Experience"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Education */}
            <div>
              <h3>Education</h3>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Projects */}
            <div>
              <h3>Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Project"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </form>
        </TabsContent>

        {/* Markdown Preview */}
        <TabsContent value="preview">
          <div className="mb-2">
            <Button
              variant="link"
              onClick={() =>
                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
              }
            >
              {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4" /> Edit Resume
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4" /> Show Preview
                </>
              )}
            </Button>
          </div>
          <div className="border rounded-lg mb-4 w-full max-w-6xl mx-auto">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              preview={resumeMode}
              height={600}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
