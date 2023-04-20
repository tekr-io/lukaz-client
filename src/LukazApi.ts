import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  isAxiosError,
} from 'axios';
import { askBody, updateWorkspace } from './types';

export class Lukaz {
  private client: AxiosInstance;
  constructor(apiKey: string, mode?: 'dev' | 'prod' | null | undefined) {
    if (mode === 'dev') {
      this.client = axios.create({
        baseURL: 'https://europe-west1-lukaz-dev.cloudfunctions.net',
        headers: {
          'x-api-key': apiKey,
        },
      });
      console.log(
        'You are using %cDevelopment mode!',
        'background-color: green'
      );
    } else {
      this.client = axios.create({
        baseURL: 'https://europe-west1-lukaz-api.cloudfunctions.net',
        headers: {
          'x-api-key': apiKey,
        },
      });
    }
  }

  /**
   * Create a Guest Account for a new user
   * @returns
   * @example
   * { sessionId: 'Id_for_the_user' }
   */
  async createGuest() {
    try {
      const res: AxiosResponse = await this.client.post(`/startSession/`);
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        return error.status;
      } else {
        console.error(error.status);
        return error.status;
      }
    }
  }

  /**
   * Send a question into Lukaz
   * @param {String} workspaceId - Your workspace ID as a string.
   * @param {askBody} body - An object containing the question and translation preferences.
   * @example example of body = {question: 'What is this workspace about?', translateAnswer: false}
   * @returns {Promise<AxiosResponse>} An object
   * @see {@link https://docs.lukaz.ai/?javascript#ask-question-to-workspace}
   */
  async ask(workspaceId: string, body: askBody): Promise<any> {
    try {
      const res: AxiosResponse = await this.client.post(
        `/ask/${workspaceId}`,
        body
      );
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        return error.status;
      } else {
        console.error(error.status);
        return error.status;
      }
    }
  }

  /**
   * Authenticate User
   * @returns an object
   * @see {@link https://docs.lukaz.ai/?javascript#get-authenticated-user}
   */
  async getUser() {
    try {
      const res: AxiosResponse = await this.client.get(`/getUser/`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Retrieves all the workspaces from a user
   * @returns an object
   * @see {@link https://docs.lukaz.ai/?javascript#get-all-workspaces}
   */
  async getWorkspaces() {
    try {
      const res: AxiosResponse = await this.client.post(`/getWorkspaces/`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Retrieves a specific workspace
   * @param workspace the workspace id as string
   * @returns an object
   * @see {@link https://docs.lukaz.ai/?javascript#get-workspace}
   */
  async getWorkspace(workspace: string) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/getWorkspace/${workspace}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Create a new workspace
   * @param workspace workspace id as string
   * @returns true
   * @see {@link https://docs.lukaz.ai/?javascript#create-new-workspace}
   */
  async workspace(
    workspace: string,
    body?: {
      description?: string;
      options?: {
        ask?: boolean;
        docs?: boolean;
        free?: boolean;
        public?: boolean;
        upload?: boolean;
      };
    }
  ) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/createWorkspace/${workspace}`,
        body
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Update configuration of a workspace
   * @param {String} workspace workspace id as string
   * @param {updateWorkspace} body An object with Description, Options and Roles
   * @example body: { 
   * description: 'Description of my AI workspace.',
    options: {
        ask: true,
        free: false,
        public: false,
        upload: true
    },
    roles: {
        'owner@ex.com': 5,
        'user@ex.com': 4
    }
   * @returns true
   * @see {@link https://docs.lukaz.ai/?javascript#update-workspace}
   */
  async updateWorkspace(workspace: string, body: updateWorkspace) {
    try {
      const res: AxiosResponse = await this.client.put(
        `/updateWorkspace/${workspace}`,
        body
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Delete a specific workspace
   * @param workspace workspace id as string
   * @returns true
   * @see {@link https://docs.lukaz.ai/?javascript#delete-workspace}
   */
  async deleteWorkspace(workspace: string) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/deleteWorkspace/${workspace}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Upload a file onto chosen workspace
   * @param {String} workspace workspace id as string
   * @param {any} data
   * @returns true
   * @see {@link https://docs.lukaz.ai/?javascript#upload-file-onto-workspace}
   */
  async upload(workspace: string, data: any) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/upload/${workspace}`,
        data
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   *
   * @param {String} workspace workspace id as string
   * @param {Object} body an object with fileName key, and it's value as string
   * @example example of body = { fileName: "my-first-workspace-xxxx" }
   * @see {@link https://docs.lukaz.ai/?javascript#delete-file-from-workspace}
   * @returns true
   */
  async deleteFile(workspace: string, body: { fileName: string }) {
    try {
      const res: AxiosResponse = await this.client.put(
        `/deleteFile/${workspace}`,
        body
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   *
   * @param workspace workspace id as string
   * @param body contains audioUrl property
   * @example example of body {audioUrl: 'https://example.com/Audio.wav'}
   * @returns transcript of the question
   * @example {"transcript": "This is the text from the audio file.}
   * @see {@link https://docs.lukaz.ai/?javascript#get-question-transcript}
   */
  async transcript(workspace: string, audio: any) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/getTranscript/${workspace}`,
        audio
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Get an url that you can play
   * @param questionId question id as a string
   * @returns audioUrl property
   * @example example of returns {"audioUrl": "https://example.com/Audio.mp3"}
   * @see {@link https://docs.lukaz.ai/?javascript#get-answer-audio}
   */
  async getAudio(questionId: string) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/getAudio/${questionId}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Retrieves all the questions from the workspace
   * @param workspace workspace id as string
   * @returns an array of questions
   * @see {@link https://docs.lukaz.ai/?javascript#get-all-questions}
   */
  async getQuestions(workspace: string) {
    try {
      const res: AxiosResponse = await this.client.get(
        `/getQuestions/${workspace}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Retrieves one question 
   * @param questionId The ID of the question to retrieve
   * @returns an json
   * @example example of returns {
  "answer": "This workspace is about AI.",
  "audioUrl": "https://example.com/Audio.mp3",
  "createdAt": "2023-01-31T18:10:54.376Z",
  "feedback": 0,
  "id": "<QUESTION_ID>",
  "question": "What is this workspace about?",
  "sensitive": false,
  "updatedAt": "2023-01-31T18:10:54.376Z",
  "visible": true,
  "workspaceId": "<WORKSPACE_ID>"
}
   * @see {@link https://docs.lukaz.ai/?javascript#get-question}
   */
  async getQuestion(questionId: string) {
    try {
      const res: AxiosResponse = await this.client.get(
        `/getQuestion/${questionId}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Makes a question visible on its workspace.
   * @param questionId The ID of the question to make visible
   * @returns true
   * @see {@link https://docs.lukaz.ai/?javascript#show-question-on-workspace}
   */
  async showQuestion(questionId: string) {
    try {
      const res: AxiosResponse = await this.client.put(
        `/showQuestion/${questionId}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Makes a question invisible on its workspace.
   * @param questionId The ID of the question to make invisible
   * @returns true
   * @see {@link https://docs.lukaz.ai/?javascript#hide-question-from-workspace}
   */
  async hideQuestion(questionId: string) {
    try {
      const res: AxiosResponse = await this.client.put(
        `/hideQuestion/${questionId}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Saves a question on user's favourites.
   * @param questionId  The ID of the question to save
   * @returns true
   * @see {@link https://docs.lukaz.ai/?javascript#save-question-to-favourites}
   */
  async saveQuestion(questionId: string) {
    try {
      const res: AxiosResponse = await this.client.put(
        `/saveQuestion/${questionId}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Removes a question from user's favourites.
   * @param questionId The ID of the question to remove
   * @returns true
   * @see {@link https://docs.lukaz.ai/?javascript#remove-question-from-favourites}
   */
  async removeQuestion(questionId: string) {
    try {
      const res: AxiosResponse = await this.client.put(
        `/removeQuestion/${questionId}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Rates the answer of question.
   * @param questionId The ID of the question to rate
   * @param body
   * @example example of body { feedback: 1 }
   * @returns true
   * @see {@link https://docs.lukaz.ai/?javascript#rate-answer}
   */
  async rateAnswer(questionId: string, body: { feedback: number }) {
    try {
      const res: AxiosResponse = await this.client.put(
        `/rateAnswer/${questionId}`,
        body
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }
  //end of class
}
