import React, { useRef, useState, useEffect } from 'react';
import { ChatMessage } from '../../type/chat.type';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchChatResponse } from '../../redux/chatSlice';
import { useOutletContext } from 'react-router-dom';
import { fetchMessagesBySessionId, postMessage } from '../../redux/messageSlice';
import { updateSession } from '../../redux/sessionSlice';
import { FiSend } from 'react-icons/fi';
import VoiceInput from '../../components/voice-input';

const Dashboard: React.FC = () => {
   const [inputMessage, setInputMessage] = useState('');
   const [chatMsg, setChatMsg] = useState<ChatMessage[]>([]);
   const [hasTitleUpdated, setHasTitleUpdated] = useState(false);
   const dispatch = useAppDispatch();
   const loading = useAppSelector((state) => state.chat.loading);
   const chatContainerRef = useRef<HTMLDivElement>(null);
   const { activeSessionId } = useOutletContext<{ activeSessionId: string | null }>();
   const { messages } = useAppSelector((state) => state.message);
   const inputRef = useRef<HTMLTextAreaElement>(null);

   const Fisend = FiSend as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

   useEffect(() => {
      if (activeSessionId) {
         dispatch(fetchMessagesBySessionId(activeSessionId));
      }
   }, [activeSessionId]);

   useEffect(() => {
      if (activeSessionId && messages) {
         setChatMsg(messages);
      }
   }, [activeSessionId, messages]);

   useEffect(() => {
      setHasTitleUpdated(false);
   }, [activeSessionId]);

   useEffect(() => {
      if (activeSessionId) {
         setTimeout(() => {
            inputRef.current?.focus();
         }, 0);
      }
   }, [activeSessionId]);

   const handleSendMessage = async (msg?: string) => {
  const input = msg ?? inputMessage;
  if (!input.trim()) return;

  const userMessage: ChatMessage = { sender: 'user', message: input };
  setChatMsg((prev) => [...prev, userMessage]);

  const result = await dispatch(fetchChatResponse({ prompt: input }));
  if (activeSessionId) await dispatch(postMessage({ message: input, sender: 'user', sessionId: activeSessionId }));

  if (fetchChatResponse.fulfilled.match(result)) {
    const botReply: ChatMessage = {
      sender: 'bot',
      message: result.payload.response,
    };
    setChatMsg((prev) => [...prev, botReply]);

    if (activeSessionId) {
      if (!hasTitleUpdated) {
        const generatedTitle = input.split(' ').slice(0, 6).join(' ') + '...';
        await dispatch(updateSession({ sessionId: activeSessionId, newTitle: generatedTitle }));
        setHasTitleUpdated(true);
      }
      await dispatch(postMessage({ ...botReply, sessionId: activeSessionId }));
    }

  } else if (fetchChatResponse.rejected.match(result)) {
    const errorReply: ChatMessage = {
      sender: 'bot',
      message: result.payload || 'Bot failed to respond.',
    };
    setChatMsg((prev) => [...prev, errorReply]);
  }

  setInputMessage('');
};

const handleVoiceTranscript = (value: string) => {
  setInputMessage(value);
  handleSendMessage(value); // Send message right away
};

   return (
      //   <div className="w-full min-h-screen bg-white flex flex-col items-center px-4 py-6">
      <div className="w-full flex flex-col h-[85vh] shadow-md border rounded-lg overflow-hidden">

         {/* Messages */}
         <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50"
         >
            {chatMsg.length === 0 ? (
               <div className="text-gray-500 text-center h-full text-4xl flex justify-center items-center">
                  <p>What's on your mind today?</p>
               </div>
            ) : (
               chatMsg.map((msg, index) => (
                  <div
                     key={index}
                     className={`px-4 py-2 rounded-lg w-full ${msg.sender === 'user'
                        ? 'bg-teal-100 self-end text-right'
                        : 'bg-gray-200 self-start text-left'
                        }`}
                  >
                     <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                  </div>
               ))
            )}
            {loading && (
               <div className="text-sm text-gray-500">Bot is typing...</div>
            )}
         </div>

         {/* Input */}
         <div className="border-t bg-white px-4 py-3 flex gap-6  justify-center items-center">
            <textarea
               ref={inputRef}
               value={inputMessage}
               onChange={(e) => setInputMessage(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                     e.preventDefault();
                     handleSendMessage();
                  }
               }}
               rows={2}
               className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none max-h-40 overflow-y-auto"
               placeholder="Type your message... (Shift + Enter for newline)"

            />
            <div className='flex gap-8'>
               <button
                  onClick={()=>handleSendMessage()}
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg"
               >
                  <Fisend className="text-lg" />
               </button>
               <VoiceInput onTranscript={handleVoiceTranscript} />
            </div>
         </div>

      </div>
      //  </div>
   );
};

export default Dashboard;
