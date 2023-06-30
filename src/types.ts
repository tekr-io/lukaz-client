export interface PromptBody {
  prompt: string;
  translateResult: boolean;
  // check later
  contextDescription?: string;
  contextSample?: string;
  general?: string;
  includeDocs?: string;
  language?: string;
  qty?: string;
  resultDescription?: string;
  resultSample?: string;
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
  contextDescription: string;
  contextSample: string;
  includeDocs: boolean;
  qty: number;
  resultDescription: string;
  resultSample: string;
}
