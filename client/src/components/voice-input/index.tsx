import React, { useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { FiMic, FiMicOff } from "react-icons/fi";

type VoiceInputProps = {
  onTranscript: (value: string) => void;
};

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const restartIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const FiMicIcon = FiMic as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const FiMicOffIcon = FiMicOff as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

  // Start mic and periodic restarts
  const startMic = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, interimResults: true });

    restartIntervalRef.current = setInterval(() => {
      SpeechRecognition.stopListening();
      SpeechRecognition.startListening({ continuous: true, interimResults: true });
    }, 25000);
  };

  // Stop mic and send final transcript
  const stopMic = () => {
    SpeechRecognition.stopListening();
    if (restartIntervalRef.current) clearInterval(restartIntervalRef.current);
    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);

    const finalText = transcript.trim();
    if (finalText) onTranscript(finalText);

    resetTranscript();
  };

  // Handle silence detection
  useEffect(() => {
    if (!listening) return;

    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);

    silenceTimeoutRef.current = setTimeout(() => {
      stopMic();
    }, 2000); // 2s of silence
  }, [transcript, listening]);

  // Cleanup
  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
      if (restartIntervalRef.current) clearInterval(restartIntervalRef.current);
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
    };
  }, []);

  const toggleMic = () => {
    if (listening) {
      stopMic();
    } else {
      startMic();
    }
  };

  return (
    <button onClick={toggleMic} className="p-2 rounded-full hover:bg-gray-100">
      {listening ? (
        <FiMicOffIcon className="text-3xl text-red-600" />
      ) : (
        <FiMicIcon className="text-3xl" />
      )}
    </button>
  );
};

export default VoiceInput;
