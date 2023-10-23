import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  isAxiosError,
} from 'axios';
import {
  CreateBoard,
  Instruction,
  SubmitPrompt,
  Transcript,
  UpdateBoard,
  UpdatePrompt,
} from './types';

export class Lukaz {
  private client: AxiosInstance;
  constructor(apiKey: string, mode?: 'stage' | 'dev' | 'prod' | null | undefined) {
    if (mode === 'stage') {
      this.client = axios.create({
        baseURL: 'https://europe-west1-lukaz-stage.cloudfunctions.net',
        headers: {
          'x-api-key': apiKey,
        },
      });
      console.log(
        'You are using %cStage mode!',
        'background-color: red'
      );
    }
    else if (mode === 'dev') {
      this.client = axios.create({
        baseURL: 'https://europe-west1-lukaz-dev.cloudfunctions.net',
        headers: {
          'x-api-key': apiKey,
        },
      });
      console.log(
        'You are using %cdevelopment mode!',
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
   *
   * @returns
   * @example
   * { "sessionId": "<USER_ID>" }
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
   * Get Authenticated User
   *
   * This endpoint retrieves the user data related to the API key in use.
   *
   * @example response body
   * {
   *   "displayName": "Example User",
   *   "email": "user@example.com",
   *   "photoURL": "https://example.com/Photo_File.jpg",
   *   "quota": { "prompts": 1000, "boards": 10 },
   *   "savedPrompts": ["<ID>", "<ID>"],
   *   "usage": {"prompts": 834,"boards": 7 }
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

  // @ts-ignore
  /**
   * Get All Boards
   *
   * This endpoint retrieves all boards that the authenticated user owns or has access to.
   * See getBoards for a detailed description of a board structure.
   *
   * @example response body
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
   * Get Board
   *
   * This endpoint retrieves a board.
   *
   * @param boardId - The ID of the board to retrieve
   * @example response body
   * {
   *   "createdAt": "2023-01-31T18:10:54.376Z",
   *   "description": "My custom AI board.",
   *   "documents": [{ "createdAt": "2023-01-31T18:10:54.376Z", "extension": "pdf", "name": "Text_File.pdf", "processed": true, "url": "https://example.com/Text_File.pdf" }],
   *   "id": "<BOARD_ID>",
   *   "ownerEmail": "owner@example.com",
   *   "options": { "docs": false, "free": false, "prompt": true, "public": false, "upload": true },
   *   "roles": { "owner@example.com": 5, "user@example.com": 4 },
   *   "stats": { "docs": 2, "prompts": 7, "results": 5 },
   *   "title": "My AI Board",
   *   "updatedAt": "2023-01-31T18:10:54.376Z"
   *}
   * @see {@link https://docs.lukaz.ai/#get-board}
   */
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
   * Create New Board
   *
   * This endpoint creates a new board.
   * A board is basically a collection of prompts, their results and documents uploaded as context.
   * It can be shared with other users or made publicly available.
   *
   * @param {CreateBoard} boardData
   * @example request body
   * {
   *   "description": "My custom AI board.",
   *   "title": "My AI board",
   *   "options": {"docs": false, "free": false, "prompt": true, "public": false, "upload": true}
   * }
   * @example response body
   * {
   *   "boardId": "<BOARD_ID>"
   * }
   * @see {@link https://docs.lukaz.ai/#create-new-board}
   */
  async createBoard(boardData: CreateBoard) {
    try {
      const res: AxiosResponse = await this.client.post(`/board/`, boardData);
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
   * Update Board
   *
   * This endpoint updates a board.
   *
   * @param {string} boardId - The ID of the board to update
   * @param {UpdateBoard} boardData - The data to update
   * @example response body
   * {
   *   "description": "My custom AI board.",
   *   "notify": true,
   *   "options": {
   *     "docs": true,
   *     "free": false,
   *     "public": false,
   *     "prompt": true,
   *     "upload": true
   *   },
   *   "roles": {
   *     "user@example.com": 2
   *   },
   *   "title": "My AI Board"
   *}
   * @returns true
   * @see {@link https://docs.lukaz.ai/#update-board}
   */
  async updateBoard(boardId: string, boardData: UpdateBoard) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/board/${boardId}`,
        boardData
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
   * Delete Board
   *
   * This endpoint deletes a board.
   *
   * @param {string} boardId - The ID of the board to delete
   * @returns true
   * @see {@link https://docs.lukaz.ai/#delete-board}
   */
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
   * Upload File onto Board
   *
   * This endpoint uploads a file onto a board.
   *
   * Supported formats: pdf, doc, docx, jpg, png, txt, md
   *
   * Max file size: 50MB
   *
   * @param {string} boardId - The ID of the board to upload the file
   * @param {filePath: string} fileData - Path of a local text file to upload
   * @returns true
   * @see {@link https://docs.lukaz.ai/#upload-file-onto-board}
   */
  // check - NOT WORKING YET
  async uploadFile(boardId: string, fileData: {filePath: string}) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/file/${boardId}`,
        fileData
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
   * Delete File from Board
   *
   * This endpoint deletes a file from a board.
   *
   * @param {string} boardId - The ID of the board to delete the file from
   * @param {fileName: string} fileData - The name of the file to be deleted
   * @example {"fileName": "<FILE_NAME>"}
   * @see {@link https://docs.lukaz.ai/#delete-file-from-board}
   * @returns true
   */
  // check
  // it's working but it's returning error 400
  async deleteFile(boardId: string, fileData: { fileName: string }) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/file/${boardId}`,
        fileData
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
   * Get Prompt Transcript
   *
   * This endpoint transcripts the text from an audio file hosted on the web or locally.
   *
   * Supported formats: mp3, mp4, mpeg, mpga, m4a, wav, webm
   *
   * Max file size: 5MB
   *
   * @param {string} boardId - The ID of the board to submit a prompt
   * @param {Transcript} audio - The URL or file path of the audio
   * @example request body {"audioUrl": "https://example.com/Audio.wav", "filePath": "<FILE_PATH>"}
   * @example response body {"transcript": "This is the text from the audio file."}
   * @see {@link https://docs.lukaz.ai/#get-prompt-transcript}
   */
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
   * Submit Prompt to Board
   *
   * This endpoint submits a prompt to a board. On the dev environment, it will return just a test result.
   *
   * On the dev environment, it will return just a test result.
   *
   * @param {string} boardId - The ID of the board to submit a prompt
   * @param {SubmitPrompt} promptData - Prompt options
   * @example request body {"prompt": "What is this board about?", {"instruction": {"includeDocs": true, "includeResults": true}}
   * @example response body
   * [{
   *   "result": "This board is about AI.",
   *   "prompt": "What is this board about?",
   *   "promptId": "<PROMPT_ID>",
   *   "sensitive": false
   * }]
   * @see {@link https://docs.lukaz.ai/#submit-prompt-to-board}
   */
  async prompt(boardId: string, promptData: SubmitPrompt): Promise<any> {
    try {
      const res: AxiosResponse = await this.client.post(
        `/prompt/${boardId}`,
        promptData
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
   * Get Result Audio
   *
   * This endpoint generates an audio file from the prompt's result.
   *
   * @param {string} promptId - The ID of the prompt to generate the audio
   * @example response body {"audioUrl": "https://example.com/Audio.mp3"}
   * @see {@link https://docs.lukaz.ai/#get-result-audio}
   */
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
   * Get All Prompts
   *
   * This endpoint retrieves all prompts of a board or made by the user.
   * See GET prompt for a detailed description of a prompt structure.
   *
   * @param {string} boardId - If <BOARD_ID> is not provided, then the prompts made by the user are retrieved.
   * @example response body
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
   * Get Prompt
   *
   * This endpoint retrieves a prompt.

   * @param {string} boardId
   * @param {string} promptId - The ID of the prompt to retrieve
   * @example response body
   * {
   *   "audioUrl": "https://example.com/Audio_File.mp3",
   *   "createdAt": "2023-01-31T18:10:54.376Z",
   *   "feedback": 0,
   *   "id": "<PROMPT_ID>",
   *   "original": "This board is about AI.",
   *   "prompt": "What is this board about?",
   *   "result": "An edited prompt result.",
   *   "sensitive": false,
   *   "updatedAt": "2023-01-31T18:10:54.376Z",
   *   "visible": true,
   *   "boardId": "<BOARD_ID>"
   *   }
   * @see {@link https://docs.lukaz.ai/#get-prompt}
   */
  async getPrompt(boardId: string, promptId: string) {
    try {
      const res: AxiosResponse = await this.client.get(`/prompt/${boardId}/${promptId}`);
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
   * Update Prompt
   *
   * This endpoint updates some of the prompt's properties.
   *
   * @param {string} promptId - The ID of the prompt to update
   * @param {UpdatePrompt} promptData - Prompt options
   * @example request body {"feedback": 1, "saved": false, "visible": true, "result": "An edited prompt result."}
   * @returns true
   */
  async updatePrompt(promptId: string, promptData: UpdatePrompt) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/prompt/${promptId}`,
        promptData
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
   * Delete Prompt
   *
   * This endpoint deletes a prompt.
   *
   * @param {string} promptId - The ID of the prompt to delete
   * @returns true
   */
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
   * Create Instruction
   * This endpoint creates a new instruction for the user.
   *
   * @param {Instruction} instructionData - The data of the instruction to create
   * @example request body
   * {
   *   "contextDescription": "Product name - tagline",
   *   "contextSample": "KatKlinik - Purrfect Care at Your Pawtips",
   *   "includeDocs": false,
   *   "qty": 4,
   *   "resultDescription": "Short social media post with emojis",
   *   "resultSample": "😻 Can\'t get enough of cute cats? Follow our page for daily dose of furry purr-fection that will melt your heart! 🐈💕"
   * }
   * @example response body {"instructionId": "<INSTRUCTION_ID>"}
   */
  async createInstruction(instructionData: Instruction) {
    try {
      const res: AxiosResponse = await this.client.post(`/instruction/`, instructionData);
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
   * Get Instruction
   *
   * This endpoint retrieves an instruction.
   *
   * @param {string} instructionId - The ID of the instruction to retrieve
   * @example response body
   * {
   *   "contextDescription": "Product name - tagline",
   *   "contextSample": "KatKlinik - Purrfect Care at Your Pawtips",
   *   "id": "<INSTRUCTION_ID>",
   *   "includeDocs": false,
   *   "qty": 4,
   *   "resultDescription": "Short social media post with emojis",
   *   "resultSample": "😻 Cant get enough of cute cats? Follow our page for daily dose of furry purr-fection that will melt your heart! 🐈💕"
   * }
   */
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
   * Get All Instructions
   *
   * This endpoint retrieves all instructions created by the user.
   * See GET instruction for a detailed description of a instruction structure.
   *
   * @example response body
   * [{
   *   "contextDescription": "Product name - tagline",
   *   "contextSample": "KatKlinik - Purrfect Care at Your Pawtips",
   *   "id": "<INSTRUCTION_ID>",
   *   "includeDocs": false,
   *   "qty": 4,
   *   "resultDescription": "Short social media post with emojis",
   *   "resultSample": "😻 Cant get enough of cute cats? Follow our page for daily dose of furry purr-fection that will melt your heart! 🐈💕"
   * }]
   */
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
   * Update Instruction
   *
   * This endpoint updates some of the instruction's properties.
   *
   * @param {string} instructionId - The ID of the instruction to update
   * @param {Instruction} instructionData - Data to update
   * @example request body
   * {
   *   "contextDescription": "Product name - tagline",
   *   "contextSample": "KatKlinik - Purrfect Care at Your Pawtips",
   *   "includeDocs": false,
   *   "qty": 4,
   *   "resultDescription": "Short social media post with emojis",
   *   "resultSample": "😻 Can\'t get enough of cute cats? Follow our page for daily dose of furry purr-fection that will melt your heart! 🐈💕"
   * }
   * @returns true
   */
  async updateInstruction(instructionId: string, instructionData: Instruction) {
    try {
      const res: AxiosResponse = await this.client.post(
        `/instruction/${instructionId}`,
        instructionData
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
   * Delete Instruction
   *
   * This endpoint deletes an instruction.
   *
   * @param {string} instructionId - The ID of the instruction to delete
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
}
