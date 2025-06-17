import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { createSession, getAllSessions } from '../../../redux/sessionSlice';

interface SidebarProps {
  isOpen: boolean;
  activeSessionId: string | null;
  onClose: () => void;
  onSelectSession: (sessionId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onSelectSession, activeSessionId }) => {
  const dispatch = useAppDispatch();
  const { sessions } = useAppSelector((state) => state.session);

  useEffect(() => {
  const initializeSession = async () => {
    const result = await dispatch(getAllSessions());

    if (getAllSessions.fulfilled.match(result)) {
      const allSessions = result.payload;
      if (allSessions.length === 0) {
        const createResult = await dispatch(createSession({ title: 'New Chat' }));
        if (createSession.fulfilled.match(createResult)) {
          onSelectSession(createResult.payload._id);
        }
      } else if (!activeSessionId) {
        onSelectSession(allSessions[0]._id);
      }
    }
  };

  initializeSession();
}, [dispatch, onSelectSession, activeSessionId]);

  const handleNewChat = async () => {
    const result = await dispatch(createSession({ title: 'New Chat' }));
    if (createSession.fulfilled.match(result)) {
      console.log("result.payload---", result.payload)
      onSelectSession(result.payload._id);
    }
  };

  return (
    <div className={`min-w-[300px] max-h-[90vh] overflow-y-auto bg-white border-r p-4 space-y-4 ${isOpen ? 'block' : 'hidden'
      } md:block`}>
      <button
        className="w-full mt-1 bg-teal-600 text-white py-2 rounded-lg"
        onClick={handleNewChat}
      >
        + New Chat
      </button>

      <ul className="space-y-2 text-start">
        {sessions.map((session) => (
          <li
            key={session._id}
            onClick={() => onSelectSession(session._id)}
            className={`p-2 cursor-pointer rounded ${session._id === activeSessionId ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-200'
              }`}
          >
            {session.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
