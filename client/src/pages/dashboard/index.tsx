import React, { useRef, useState, useEffect } from 'react';
import { ChatMessage } from '../../type/chat.type';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchChatResponse } from '../../redux/chatSlice';
import { useOutletContext } from 'react-router-dom';
import { fetchMessagesBySessionId, postMessage } from '../../redux/messageSlice';
import { updateSession } from '../../redux/sessionSlice';
import { FiChevronDown, FiSend } from 'react-icons/fi';
import VoiceInput from '../../components/voice-input';
import { exportChatToPDF, exportChatToText } from '../../utils/utils.dashboard';
import UpwardSelect from '../../components/layouts/custome-select-tag';


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
   const FichevronDown = FiChevronDown as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

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
      handleSendMessage(value);
   };

   return (
      <div className="w-full flex flex-col h-[90vh] overflow-hidden">
         {/* Chat Area */}
         <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4 bg-gray-50 dark:bg-gray-800 scrollbar-hide"
         >
            {chatMsg.map((msg, index) => (
               <div
                  key={index}
                  className={`w-full flex px-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
               >
                  <div
                     className={`text-start inline-block max-w-[calc(100%-40px)] sm:max-w-[75%] md:max-w-[60%] px-3 py-2 rounded-lg
                                 text-sm break-words whitespace-pre-wrap font-inter ${msg.sender === 'user'
                                 ? 'bg-emerald-100 dark:bg-emerald-700 text-gray-800 dark:text-gray-100 font-medium'
                                 : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-normal' }`}>
                     {msg.message}
                  </div>
               </div>
            ))}
            {loading && (
               <div className="text-base sm:text-lg text-gray-500 font-inter">Bot is typing...</div>
            )}
         </div>

         {/* Input Area */}
         <div className="shrink-0 border-t bg-white dark:bg-gray-900 dark:border-gray-700 px-3 md:px-4 py-3 flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-stretch">
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
               className="w-[90%] md:w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none max-h-40 overflow-y-auto text-sm"
               placeholder="Type your message... (Shift + Enter for newline)"
            />

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
               <UpwardSelect
                  onSelect={(value) => {
                     if (value === 'pdf') exportChatToPDF(chatMsg);
                     if (value === 'txt') exportChatToText(chatMsg, activeSessionId ?? undefined);
                  }}
               />

               <div className="flex justify-center">
                  <VoiceInput
                     onTranscript={handleVoiceTranscript}
                     onInterimTranscript={(text) => setInputMessage(text)}
                  />
               </div>

               <button
                  onClick={() => handleSendMessage()}
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg">
                  <Fisend className="text-lg" />
               </button>
            </div>

         </div>
      </div>

   );
};

export default Dashboard;
