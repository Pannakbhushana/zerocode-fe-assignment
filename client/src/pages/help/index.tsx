import React from 'react';

const HelpPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-teal-700">Help & Support</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📌 Getting Started</h2>
        <p className="text-gray-700">
          To start chatting with the bot, simply click on <strong>+ New Chat</strong> in the sidebar. Type your question or message and press <kbd>Enter</kbd> to send.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">💬 What can I ask?</h2>
        <div className="list-disc pl-6 text-gray-700 space-y-1">
          <div>Ask general questions like facts or definitions.</div>
          <div>Get help with coding, writing, or grammar.</div>
          <div>Use it for brainstorming, idea generation, or daily tasks.</div>
          <div>Use follow-up questions to continue the same context.</div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">⚙️ Managing Chats</h2>
        <div className="list-disc pl-6 text-gray-700 space-y-1">
          <div>Use the sidebar to switch between chat sessions.</div>
          <div>Each chat is automatically saved with a title based on your first message.</div>
          <div>You can revisit older sessions anytime.</div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">❓Frequently Asked Questions</h2>
        <div className="text-gray-700 space-y-4">
          <div>
            <strong>Q: Is my data saved?</strong>
            <p>A: Your messages are saved only within your sessions. We do not store personal data beyond that.</p>
          </div>
          <div>
            <strong>Q: Can I delete or rename chats?</strong>
            <p>A: (Feature in development) You will soon be able to rename or delete any previous chat.</p>
          </div>
          <div>
            <strong>Q: What if the bot doesn't respond?</strong>
            <p>A: Please check your internet connection. If the issue persists, contact support below.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📩 Contact Support</h2>
        <p className="text-gray-700">
          Need more help? Reach out to our support team at{' '}
          <a href="mailto:rahulkumarmishra5338@gmail.com" className="text-teal-600 underline">
            support@chatbot.com
          </a>.
        </p>
      </section>
    </div>
  );
};

export default HelpPage;
