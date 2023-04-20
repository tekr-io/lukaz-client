export interface askBody {
  question: string;
  translateAnswer: boolean;
}

export interface updateWorkspace {
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
