import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { decryptionQueue } from '../../decrypt-worker/client';

export enum ProcessState {
  UNTOUCHED = 'UNTOUCHED',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}

export enum ListingMode {
  LIST = 'LIST',
  CARD = 'CARD',
}

export interface AudioMetadata {
  name: string;
  artist: string;
  album: string;
  albumArtist: string;
  cover: string; // blob uri
}

export interface DecryptedAudioFile {
  fileName: string;
  raw: string; // blob uri
  decrypted: string; // blob uri
  state: ProcessState;
  errorMessage: null | string;
  metadata: AudioMetadata;
}

export interface FileListingState {
  files: Record<string, DecryptedAudioFile>;
  displayMode: ListingMode;
}
const initialState: FileListingState = {
  files: Object.create(null),
  displayMode: ListingMode.LIST,
};

export const processFile = createAsyncThunk('fileListing/processFile', async (fileId: string, thunkAPI) => {
  const file = selectFiles(thunkAPI.getState() as RootState)[fileId];
  if (!file) {
    return thunkAPI.rejectWithValue('ERROR: File not found');
  }

  return decryptionQueue.add({ id: fileId, blobURI: file.raw });
});

export const fileListingSlice = createSlice({
  name: 'fileListing',
  initialState,
  reducers: {
    addNewFile: (state, { payload }: PayloadAction<{ id: string; fileName: string; blobURI: string }>) => {
      state.files[payload.id] = {
        fileName: payload.fileName,
        raw: payload.blobURI,
        decrypted: '',
        state: ProcessState.UNTOUCHED,
        errorMessage: null,
        metadata: {
          name: '',
          artist: '',
          album: '',
          albumArtist: '',
          cover: '',
        },
      };
    },
    setDecryptedContent: (state, { payload }: PayloadAction<{ id: string; decryptedBlobURI: string }>) => {
      const file = state.files[payload.id];
      if (file) {
        file.decrypted = payload.decryptedBlobURI;
      }
    },
  },
});

export const { addNewFile, setDecryptedContent } = fileListingSlice.actions;

export const selectFileCount = (state: RootState) => state.fileListing.files.length;
export const selectFiles = (state: RootState) => state.fileListing.files;
export const selectFileListingMode = (state: RootState) => state.fileListing.displayMode;

export default fileListingSlice.reducer;
