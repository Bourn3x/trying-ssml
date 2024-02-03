export interface Chunks {
  end: number;
  endTime: number;
  start: number;
  startTime: number;
  type: string;
  value: string;
}

export interface SpeechMarks {
  chunks: { value: string } & Chunks[];
}

export interface GenerateAudioAPI {
  audioStream: string;
  format: "ogg";
  speechMarks: SpeechMarks;
}
