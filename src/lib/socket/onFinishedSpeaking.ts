import { Socket } from "socket.io";
import { Metrics } from "../metrics";
import { textToSpeech } from "../speech";
import { emitToSocket } from "./emitToSocket";
import { Interviewer } from "../interviewer";
import { onRuntimeError } from "./onRuntimeError";

export const onFinishedSpeaking = async (
  socket: Socket,
  {
    candidateResponse,
    metrics,
    interviewer,
  }: { candidateResponse: string; metrics: Metrics; interviewer: Interviewer }
) => {
  try {
    const { wordFrequency, answerTimeSeconds, quantifiedMetric } =
      await metrics.getAnswerMetrics(candidateResponse);

    const quietTimeSeconds = metrics.resetQuietTimeTimer();

    emitToSocket(socket, {
      event: "responseMetrics",
      data: {
        question: interviewer.getCurrentQuestion(),
        response: candidateResponse,
        wordFrequency,
        answerTimeSeconds,
        quietTimeSeconds,
        quantifiedMetric,
      },
    });

    const nextQuestionForCandidate = await interviewer.getNextQuestion(
      candidateResponse
    );

    if (nextQuestionForCandidate.includes("XQXQXQ")) {
      socket.disconnect();
    }

    const audioData = await textToSpeech({
      voice: interviewer.getInterviewerOptions().voice,
      text: nextQuestionForCandidate,
    });

    emitToSocket(socket, {
      event: "audio",
      data: {
        text: nextQuestionForCandidate,
        buffer: audioData,
      },
    });
  } catch (error) {
    onRuntimeError(socket, {
      message: "Error processing candidate response",
      error,
    });
  }
};
