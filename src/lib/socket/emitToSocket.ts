import { Socket } from "socket.io";

type AudioEvent = {
  event: "audio";
  data: {
    text: string;
    buffer: ArrayBuffer;
  };
};

type SpeechRecognizedEvent = {
  event: "speechRecognized";
  data: {
    text: string;
    isCompletePhrase: boolean;
  };
};

type ResponseMetricsEvent = {
  event: "responseMetrics";
  data: {
    question: string;
    response: string;
    wordFrequency: Record<string, number>;
    answerTimeSeconds: number;
    quietTimeSeconds: number;
    quantifiedMetric: number;
  };
};

type InterviewMetricsEvent = {
  event: "interviewMetrics";
  data: {
    wordFrequency: Record<string, number>;
    lengthSeconds: number;
    feedback: string;
  };
};

type RecognitionStartedEvent = {
  event: "recognitionStarted";
  data: {};
};

type InterviewEndEvent = {
  event: "interviewEnd";
  data: {};
};

type RuntimeErrorEvent = {
  event: "error";
  data: {
    message: string;
  };
};

type SocketData =
  | AudioEvent
  | ResponseMetricsEvent
  | InterviewMetricsEvent
  | SpeechRecognizedEvent
  | RecognitionStartedEvent
  | InterviewEndEvent
  | RuntimeErrorEvent;

export const emitToSocket = (socket: Socket, { event, data }: SocketData) => {
  try {
    socket.emit(event, data);
  } catch (e) {
    console.error("Failed to emit", event, "data to socket:", e);
  }
};
