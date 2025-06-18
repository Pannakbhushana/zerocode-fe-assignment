import jsPDF from 'jspdf';
import { ChatMessage } from '../type/chat.type'; // Adjust path as needed

/**
 * Exports chat messages as a plain text (.txt) file
 */
export const exportChatToText = (chatMsg: ChatMessage[], sessionId?: string | null) => {
   if (!chatMsg || chatMsg.length === 0) {
      alert('No messages to export.');
      return;
   }

   const content = chatMsg
      .map((msg) => `${msg.sender === 'user' ? 'You' : 'Bot'}: ${msg.message}`)
      .join('\n\n');

   const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
   const url = URL.createObjectURL(blob);

   const a = document.createElement('a');
   a.href = url;
   a.download = `chat-session-${sessionId ?? 'export'}.txt`;
   a.click();

   URL.revokeObjectURL(url);
};

/**
 * Exports chat messages as a PDF file using jsPDF
 */
export const exportChatToPDF = (chatMsg: ChatMessage[], filename = 'chat-export.pdf') => {
   if (!chatMsg || chatMsg.length === 0) {
      alert('No messages to export.');
      return;
   }

   const doc = new jsPDF();
   let y = 10;

   chatMsg.forEach((msg, index) => {
      const prefix = msg.sender === 'user' ? 'You: ' : 'Bot: ';
      const text = prefix + msg.message;

      const lines = doc.splitTextToSize(text, 180);
      doc.text(lines, 10, y);
      y += lines.length * 10;

      if (y > 270 && index !== chatMsg.length - 1) {
         doc.addPage();
         y = 10;
      }
   });

   doc.save(filename);
};
