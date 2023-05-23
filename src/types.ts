export interface AskBody {
  question: string;
  translateAnswer: boolean;
}

export interface UpdateWorkspace {
  description?: string;
  options: {
    ask: boolean;
    free: boolean;
    public: boolean;
    upload: boolean;
  };
  roles?: {
    [email: string]: number;
  };
}

export interface UpdateQuestion {
  feedback: 0 | 1;
  saved: boolean;
  visible: boolean;
}
