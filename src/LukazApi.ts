import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  isAxiosError,
} from 'axios';
import {
  CreateBoard,
  Instruction,
  PromptBody,
  Transcript,
  UpdateBoard,
  UpdatePrompt,
} from './types';

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

  // AUTH Guest Session for Landing Page

  /**
   * Create a Guest Account for a new user
   * @returns
   * @example
   * { sessionId: 'Id_for_the_user' }
   */

  // done
  async createGuest() {
    try {
      const res: AxiosResponse = await this.client.post(`/startSession/`);
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
        return {
          error: error.response?.status,
          errorText: error.response?.statusText,
        };
      } else {
        console.error(error.status);
      }
    }
  }

  // AUTH

  /**
   * Authenticate User
   * @returns an object
   * @example return
   * {
   * "displayName": "Example User",
   * "email": "user@example.com",
   * "photoURL": "https://example.com/Photo_File.jpg",
   * "quota": { "prompts": 1000, "boards": 10 },
   * "savedPrompts": ["<ID>", "<ID>"],
   * "usage": {"prompts": 834,"boards": 7 }
   * }
   * @see {@link https://docs.lukaz.ai/?javascript#get-authenticated-user}
   */
  async getUser() {
    try {
      const res: AxiosResponse = await this.client.get(`/user/`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  // BOARDS

  /**
   * Retrieves all boards that the authenticated user owns or has access to
   * @returns The array of retrieved boards
   * @example return
   *[{
   *     "createdAt": "2023-01-31T18:10:54.376Z",
   *     "description": "My custom AI board.",
   *     "documents": [{ "createdAt": "2023-01-31T18:10:54.376Z", "extension": "pdf", "name": "Text_File.pdf", "processed": true, "url": "https://example.com/Text_File.pdf" }],
   *     "id": "<BOARD_ID>",
   *     "ownerEmail": "owner@example.com",
   *     "options": { "prompt": true, "docs": false, "free": false, "public": false, "upload": true },
   *     "roles": { "owner@example.com": 5, "user@example.com": 4 },
   *     "stats": { "docs": 2, "prompts": 7, "results": 5},
   *     "updatedAt": "2023-01-31T18:10:54.376Z"
   *   }]
   * @see {@link https://docs.lukaz.ai/#get-all-boards}
   */
  // done
  async getBoards() {
    try {
      const res: AxiosResponse = await this.client.get(`/board/`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Retrieves a specific board
   * @param board the board id as string
   * @returns an object
   * @example return
   * {
   * "createdAt": "2023-01-31T18:10:54.376Z",
   * "description": "My custom AI board.",
   * "documents": [{ "createdAt": "2023-01-31T18:10:54.376Z", "extension": "pdf", "name": "Text_File.pdf", "processed": true, "url": "https://example.com/Text_File.pdf" }],
   * "id": "<BOARD_ID>",
   * "ownerEmail": "owner@example.com",
   * "options": { "docs": false, "free": false, "prompt": true, "public": false, "upload": true },
   * "roles": { "owner@example.com": 5, "user@example.com": 4 },
   * "stats": { "docs": 2, "prompts": 7, "results": 5 },
   * "updatedAt": "2023-01-31T18:10:54.376Z"
   *}
   * @see {@link https://docs.lukaz.ai/#get-board}
   */
  // done
  async getBoard(boardId: string) {
    try {
      const res: AxiosResponse = await this.client.get(`/board/${boardId}`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Create a new board, A board is basically a collection of prompts, their results and documents uploaded as context. It can be shared with other users or made publicly available.
   * @param body an object
   * @example of body
   * {
   * description: 'My custom AI board.',
   * title: 'My AI board',
   * options: { docs: false, free: false, prompt: true, public: false, upload: true }
   * }
   * @returns true
   * @see {@link https://docs.lukaz.ai/#create-new-board}
   */
  // done
  async createBoard(body: CreateBoard) {
    try {
      const res: AxiosResponse = await this.client.post(`/board/`, body);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Update configuration of a board
   * @param boardId board id as string
   * @param body An object with Description, Options and Roles
   * @example body: {
   * description: 'My custom AI board.',
   * notify: true,
   * options: {
   *     docs: true,
   *     free: false,
   *     public: false,
   *     prompt: true,
   *     upload: true
   * },
   * roles: {
   *     'user@example.com': 2
   * }
   *}
   * @returns true
   * @see {@link https://docs.lukaz.ai/#update-board}
   */
  // done
  async updateBoard(boardId: string, body: UpdateBoard) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/board/${boardId}`,
        body
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Delete a specific board
   * @param boardId board id as string
   * @returns true
   * @see {@link https://docs.lukaz.ai/#delete-board}
   */
  // done
  async deleteBoard(boardId: string) {
    try {
      const res: AxiosResponse = await this.client.post(`/board/${boardId}`, {
        deleted: true,
      });
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Upload a file onto chosen board
   * @param boardId board id as string
   * @param data file
   * @returns true
   * @see {@link https://docs.lukaz.ai/#upload-file-onto-board}
   */
  // check   NOT WORKING YET
  async uploadFile(boardId: string, data: any) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/file/${boardId}`,
        data
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   *
   * @param boardId board id as string
   * @param body an object with fileName key, and it's value as string
   * @example { fileName: "<FILE_NAME>" }
   * @see {@link https://docs.lukaz.ai/#delete-file-from-board}
   * @returns true
   */

  // check
  // it's working but it's returning error 400
  async deleteFile(boardId: string, body: { fileName: string }) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/file/${boardId}`,
        body
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
        return error.response;
      } else {
        console.error(error);
      }
    }
  }

  // PROMPTS

  /**
   *
   * @param boardId board id as string
   * @param audio contains audioUrl and filePath property
   * @example {audioUrl: 'https://example.com/Audio.wav', filePath: '<FILE_PATH>'}
   * @returns transcript of the prompt
   * @example {"transcript": "This is the text from the audio file.}
   * @see {@link https://docs.lukaz.ai/#get-prompt-transcript}
   */

  // check later
  async getTranscript(boardId: string, audio: Transcript) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/transcript/${boardId}`,
        audio
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Submits a prompt to a board. On the dev environment, it will return just a test result.
   * @param boardId - Your board ID as a string.
   * @param body - An object containing the prompt and translation preferences.
   * @example example of body = {prompt: 'What is this board about?', translateResult: false}
   * @returns {Promise<AxiosResponse>} An object
   * @example return
   * {
   *   "result": "This board is about AI.",
   *   "prompt": "What is this board about?",
   *   "promptId": "<PROMPT_ID>",
   *   "sensitive": false
   * }
   * @see {@link https://docs.lukaz.ai/#submit-prompt-to-board}
   */

  // done
  async prompt(boardId: string, body: PromptBody): Promise<any> {
    try {
      const res: AxiosResponse = await this.client.post(
        `/prompt/${boardId}`,
        body
      );
      return res.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
        return {
          error: error.response?.status,
          errorText: error.response?.statusText,
        };
      } else {
        console.error(error.status);
        return error.status;
      }
    }
  }

  /**
   * Get an url that you can play
   * @param promptId prompt id as a string
   * @returns audioUrl property
   * @example return {"audioUrl": "https://example.com/Audio.mp3"}
   * @see {@link https://docs.lukaz.ai/#get-result-audio}
   */

  // done
  async getAudio(promptId: string) {
    try {
      const res: AxiosResponse = await this.client.post(`/audio/${promptId}`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Retrieves all prompts of a board or made by the user
   * @param boardId board id as string
   * @returns an array of objects
   * @example return
   * [{
   *     "audioUrl": "https://example.com/Audio_File.mp3",
   *     "createdAt": "2023-01-31T18:10:54.376Z",
   *     "feedback": 0,
   *     "id": "<PROMPT_ID>",
   *     "original": "This board is about AI.",
   *     "prompt": "What is this board about?",
   *     "result": "An edited prompt result.",
   *     "sensitive": false,
   *     "updatedAt": "2023-01-31T18:10:54.376Z",
   *     "visible": true,
   *     "boardId": "<BOARD_ID>"
   *   }]
   * @see {@link https://docs.lukaz.ai/#get-all-prompts}
   */

  // check error 403, if no argument returns all prompts for the user
  async getPrompts(boardId?: string) {
    try {
      const res: AxiosResponse = await this.client.get(`/prompt/${boardId}`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Retrieves a prompt.
   * @param promptId The ID of the prompt to be retrieved
   * @returns an json
   * @example return
   * {
   *     "audioUrl": "https://example.com/Audio_File.mp3",
   *     "createdAt": "2023-01-31T18:10:54.376Z",
   *     "feedback": 0,
   *     "id": "<PROMPT_ID>",
   *     "original": "This board is about AI.",
   *     "prompt": "What is this board about?",
   *     "result": "An edited prompt result.",
   *     "sensitive": false,
   *     "updatedAt": "2023-01-31T18:10:54.376Z",
   *     "visible": true,
   *     "boardId": "<BOARD_ID>"
   *   }
   * @see {@link https://docs.lukaz.ai/#get-prompt}
   */

  // done
  async getPrompt(promptId: string) {
    try {
      const res: AxiosResponse = await this.client.get(`/prompt/${promptId}`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Updates some of the prompt's properties.
   * @param promptId prompt id as string
   * @param body an object with prompt properties
   * @example example of body {feedback: 1, saved: false, visible: true, result: 'An edited prompt result.',}
   * @returns true
   */

  // done
  async updatePrompt(promptId: string, body: UpdatePrompt) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/prompt/${promptId}`,
        body
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Delete a prompt.
   * @param promptId prompt id as string
   * @returns true
   */

  // done
  async deletePrompt(promptId: string) {
    try {
      const res: AxiosResponse = await this.client.post(`/prompt/${promptId}`, {
        deleted: true,
      });
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  // INSTRUCTIONS

  /**
   * Creates a new instruction for the user.
   * @param body
   * @example body
   * {
   * contextDescription: 'Product name - tagline',
   * contextSample: 'KatKlinik - Purrfect Care at Your Pawtips',
   * includeDocs: false,
   * qty: 4,
   * resultDescription: 'Short social media post with emojis',
   * resultSample: '😻 Can\'t get enough of cute cats? Follow our page for daily dose of furry purr-fection that will melt your heart! 🐈💕'}
   * @returns a json
   * @example return {"instructionId": "<INSTRUCTION_ID>"}
   */

  // done
  async createInsrruction(body: Instruction) {
    try {
      const res: AxiosResponse = await this.client.post(`/instruction/`, body);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }
  /**
   * Retrieves an instruction
   * @param instructionId Instruction id as string
   * @returns an JSON
   * @example return
   * {"contextDescription": "Product name - tagline",
   * "contextSample": "KatKlinik - Purrfect Care at Your Pawtips",
   * "id": "<INSTRUCTION_ID>",
   * "includeDocs": false,
   * "qty": 4,
   * "resultDescription": "Short social media post with emojis",
   * "resultSample": "😻 Cant get enough of cute cats? Follow our page for daily dose of furry purr-fection that will melt your heart! 🐈💕" }
   */

  // done
  async getInstruction(instructionId: string) {
    try {
      const res: AxiosResponse = await this.client.get(
        `/instruction/${instructionId}`
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * retrieves all instructions created by the user.
   * @returns an array of objects
   * @example return
   * [{
   * "contextDescription": "Product name - tagline",
   * "contextSample": "KatKlinik - Purrfect Care at Your Pawtips",
   * "id": "<INSTRUCTION_ID>",
   * "includeDocs": false,
   * "qty": 4,
   * "resultDescription": "Short social media post with emojis",
   * "resultSample": "😻 Cant get enough of cute cats? Follow our page for daily dose of furry purr-fection that will melt your heart! 🐈💕"
   * }]
   */

  // done
  async getInstructions() {
    try {
      const res: AxiosResponse = await this.client.get(`/instruction/`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Updates some of the instruction's properties.
   * @param instructionId instruction id as string
   * @param body
   * @example of body
   * {
   * contextDescription: 'Product name - tagline',
   * contextSample: 'KatKlinik - Purrfect Care at Your Pawtips',
   * includeDocs: false,
   * qty: 4,
   * resultDescription: 'Short social media post with emojis',
   * resultSample: '😻 Can\'t get enough of cute cats? Follow our page for daily dose of furry purr-fection that will melt your heart! 🐈💕'
   * }
   * @returns true
   */

  // done
  async updateInstruction(instructionId: string, body: Instruction) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/instruction/${instructionId}`,
        body
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  /**
   * Deletes an instruction.
   * @param instructionId instruction as string
   * @returns true
   */

  // check returning error 400
  async deleteInstruction(instructionId: string) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/instruction/${instructionId}`,
        { deleted: true }
      );
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          `Request failed, status code: ${error.response?.status}, check https://docs.lukaz.ai/?javascript#errors`
        );
      } else {
        console.error(error);
      }
    }
  }

  //end of class
}
