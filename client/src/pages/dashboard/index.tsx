import React, { useRef, useState } from 'react';
import { ChatMessage } from '../../type/chat.type';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchChatResponse } from '../../redux/chatSlice';

const Dashboard: React.FC = () => {
   const [inputMessage, setInputMessage] = useState('');
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const dispatch = useAppDispatch();
   const loading = useAppSelector((state) => state.chat.loading);
   const chatContainerRef = useRef<HTMLDivElement>(null);

   const handleSendMessage = async () => {
      if (!inputMessage.trim()) return;

      const userMessage: ChatMessage = { sender: 'user', message: inputMessage };
      setMessages((prev) => [...prev, userMessage]);

      const result = await dispatch(fetchChatResponse({ prompt: inputMessage }));

      if (fetchChatResponse.fulfilled.match(result)) {
         const botReply: ChatMessage = {
            sender: 'bot',
            message: result.payload.response,
         };
         setMessages((prev) => [...prev, botReply]);
      } else if (fetchChatResponse.rejected.match(result)) {
         const errorReply: ChatMessage = {
            sender: 'bot',
            message: result.payload || 'Bot failed to respond.',
         };
         setMessages((prev) => [...prev, errorReply]);
      }

      setInputMessage('');
   };

   return (
      //   <div className="w-full min-h-screen bg-white flex flex-col items-center px-4 py-6">
      <div className="w-full flex flex-col h-[85vh] shadow-md border rounded-lg overflow-hidden">

         {/* Messages */}
         <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50"
         >
            {messages.length === 0 ? (
               <div className="text-gray-500 text-center h-full text-4xl flex justify-center items-center">
                  <p>👋 Start a conversation to begin chatting with the bot.</p>
               </div>
            ) : (
               messages.map((msg, index) => (
                  <div
                     key={index}
                     className={`px-4 py-2 rounded-lg w-full border border-red-500 ${msg.sender === 'user'
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
         <div className="border-t bg-white px-4 py-3 flex gap-2 items-end">
            <textarea
               value={inputMessage}
               onChange={(e) => setInputMessage(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                     e.preventDefault();
                     handleSendMessage();
                  }
               }}
               rows={3}
               className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none max-h-40 overflow-y-auto"
               placeholder="Type your message... (Shift + Enter for newline)"

            />
            <button
               onClick={handleSendMessage}
               disabled={loading}
               className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg"
            >
               Send
            </button>
         </div>

      </div>
      //  </div>
   );
};

export default Dashboard;
