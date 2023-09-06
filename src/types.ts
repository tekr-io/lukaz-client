export interface SubmitPrompt {
  instruction?: Instruction;
  model?: 'gpt-3' | 'gpt-4';
  prompt: string;
  sessionId?: string;
  translateResult?: boolean;
}

export interface CreateBoard {
  description?: string;
  title: string;
  options?: {
    docs?: boolean;
    free?: boolean;
    prompt?: boolean;
    public?: boolean;
    upload?: boolean;
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
  contextSample?: string;
  edit?: boolean;
  editId?: boolean;
  includeDocs?: boolean;
  includeResults?: boolean;
  language?: string;
  qty?: number;
  resultDescription?: string;
  resultSample?: string;
}
