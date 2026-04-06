export type StudyMode =
  | "DEVOTIONAL"
  | "DAILY_STUDY"
  | "SMALL_GROUP"
  | "EXPOSITORY_SERMON"
  | "DOCTRINAL_STUDY";

export type JobStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface CreateStudyProjectInput {
  workspaceId: string;
  title: string;
  mode: StudyMode;
  sourceInput: {
    theme?: string;
    biblicalReference?: string;
    audience?: string;
    tone?: string;
    depth?: "BASIC" | "INTERMEDIATE" | "ADVANCED";
  };
}

export interface StudyProjectDTO {
  id: string;
  workspaceId: string;
  title: string;
  status: "draft" | "in_review" | "approved" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface StudyVersionDTO {
  id: string;
  studyProjectId: string;
  versionNumber: number;
  mode: StudyMode;
  content: Record<string, unknown>;
  createdAt: string;
}

export interface GenerateStudyRequest {
  studyProjectId: string;
  mode: StudyMode;
  promptTemplateKey?: string;
}

export interface GenerateStudyResponse {
  reviewJobId: string;
  status: JobStatus;
}

export interface CreateSlideDeckRequest {
  studyVersionId: string;
  templateId?: string;
  themeVariant?: "dark" | "light";
}

export interface SlideDeckDTO {
  id: string;
  studyVersionId: string;
  title: string;
  themeVariant: "dark" | "light";
  createdAt: string;
}

export interface ExportRequest {
  studyVersionId: string;
  format: "PPTX" | "PDF";
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
