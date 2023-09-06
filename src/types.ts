export interface SubmitPrompt {
  contextDescription?: string;
  contextSample?: string;
  editId?: string;
  includeDocs?: string;
  includeResults?: string;
  language?: string;
  qty?: string;
  prompt: string;
  resultDescription?: string;
  resultSample?: string;
  sessionId?: string;
  translateResult?: boolean;
}

export interface CreateBoard {
  description?: string;
  title: string;
  options?: {
    docs: boolean;
    free: boolean;
    prompt: boolean;
    public: boolean;
    upload: boolean;
  };
}

export interface UpdateBoard {
  description?: string;
  notify?: boolean;
  options?: {
    docs?: boolean;
    free?: boolean;
    public?: boolean;
    prompt?: boolean;
    upload?: boolean;
  };
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
  contextSample: string;
  edit: boolean;
  includeDocs: boolean;
  language: string;
  qty: number;
  resultDescription: string;
  resultSample: string;
}
