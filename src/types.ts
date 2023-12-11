export interface SubmitPrompt {
  instruction?: Instruction;
  model?: string;
  prompt: string;
  sessionId?: string;
  translateResult?: boolean;
}

export interface CreateBoard {
  description?: string;
  title: string;
  options?: BoardOptions;
}

export interface UpdateBoard {
  description?: string;
  notify?: boolean;
  options?: BoardOptions;
  roles?: {
    [email: string]: number;
  };
}

export interface Transcript {
  audioUrl?: string;
  filePath?: string;
}

export interface UpdatePrompt {
  feedback?: 0 | 1;
  saved?: boolean;
  visible?: boolean;
  result?: string;
}

export interface Instruction {
  edit?: boolean;
  editId?: boolean;
  includeDocs?: boolean;
  includeResults?: boolean;
  language?: string;
  qty?: number;
  resultDescription?: string;
  resultSample?: string;
}

export interface BoardOptions {
  behavior?: string;
  docs?: boolean;
  free?: boolean;
  prompt?: boolean;
  public?: boolean;
  upload?: boolean;
  voice?: VoiceOptions;
}

export interface ExportOptions {
  format?: DownloadFormats;
  includePrompts?: boolean;
  order?: 'asc' | 'desc';
}

export interface AudioOptions {
  format?: AudioFormats;
  voice?: VoiceOptions;
}

export type VoiceOptions = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'schimmer';
export type DownloadFormats = 'pdf' | 'docx';
export type AudioFormats = 'mp3' | 'opus' | 'aac' | 'flac';
