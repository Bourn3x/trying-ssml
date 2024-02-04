export interface Chunk {
  end: number;
  endTime: number;
  start: number;
  startTime: number;
  type: string;
  value: string;
}

interface OuterChunks extends Chunk {
  chunks: Chunk[];
}

export interface SpeechMarks {
  chunks: OuterChunks[];
}

export interface GenerateAudioAPI {
  audioStream: string;
  format: "ogg";
  speechMarks: SpeechMarks;
}
