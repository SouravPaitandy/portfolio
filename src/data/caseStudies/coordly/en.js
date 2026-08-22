const content = {
  "hero": {
    "title": "Coordly",
    "subtitle": "A unified workspace consolidating real-time collaborative documents, Kanban tasks, team chat, and WebRTC video conferencing into a single cohesive architecture."
  },
  "whyIBuiltIt": {
    "title": "Why I Built Coordly",
    "content": [
      "The motivation for this project came from the constant friction of using multiple disparate tools for team collaboration. A typical workflow involves Jira or Trello for tasks, Google Docs for writing, Zoom or Google Meet for calls, and Slack for chatting.",
      "Managing one project across several applications felt unnecessarily fragmented. The primary goal of Coordly was to explore how to build a unified workspace where a team could handle these collaboration activities natively under one roof."
    ]
  },
  "evolution": {
    "title": "From CollabHub to Coordly",
    "content": [
      "The project was originally named CollabHub. However, the name was later changed to Coordly because CollabHub felt too generic and was already associated with other products.",
      "Coordly was chosen as it is shorter, more modern, brandable, and closely aligns with the application's core goal of team coordination."
    ]
  },
  "theWorkspace": {
    "title": "The Unified Workspace",
    "content": [
      "Coordly is built around the concept of 'Collabs'—workspace container namespaces.",
      "When users join a Collab, they gain immediate, synchronized access to a Tiptap-powered rich-text document, a drag-and-drop Kanban task board, a real-time messaging channel, and a persistent video call interface.",
      "This architecture eliminates context-switching, allowing teams to reference a document, chat about a task, and speak via video simultaneously within the same browser tab."
    ]
  },
  "threeRealtimeSystems": {
    "title": "Three Real-Time Systems, One Workspace"
  },
  "multiplexing": {
    "title": "The Multiplexed Server"
  },
  "hotSwapping": {
    "title": "WebRTC Media Hot-Swapping"
  },
  "persistence": {
    "title": "Persistence Strategy"
  },
  "authAndSecurity": {
    "title": "Authentication & Authorization"
  },
  "challenges": {
    "title": "Engineering Challenges",
    "items": [
      {
        "title": "Multiplexing Real-Time Protocols"
      },
      {
        "title": "Coordinating Systems"
      },
      {
        "title": "REST & CRDT Consistency"
      }
    ]
  },
  "limitations": {
    "title": "Trade-offs & Limitations",
    "items": [
      "The `documentServer.js` maintains connection state in memory. Horizontal scaling would require a shared infrastructure adapter (like Redis) to bridge Socket.IO and Yjs instances.",
      "PeerJS relies on default STUN/TURN configurations, which may struggle to negotiate WebRTC connections across strict corporate firewalls.",
      "No explicit API rate-limiting is currently implemented on the Node backend."
    ]
  },
  "learned": {
    "title": "What I Learned",
    "content": [
      "This was my first major backend and real-time heavy project. It taught me the fundamentals of backend architecture, especially how and when to use different communication technologies like WebSockets, WebRTC, and HTTP APIs.",
      "I also learned the stark differences between local development and production deployments, handling database schemas, and managing session authentication securely.",
      "Midway through development, my laptop crashed and I lost the entire uncommitted codebase. Rebuilding it from scratch made the value of Git, version control, and remote repositories very real to me."
    ]
  },
  "future": {
    "title": "What I Would Build Differently Today",
    "content": [
      "If I were starting this project today, I would prioritize a much stricter architecture plan from day one, establishing cleaner system boundaries between the real-time servers.",
      "I would also architect the platform with AI integration as a foundational pillar, rather than an afterthought, allowing for features like automated task generation or meeting summaries."
    ]
  },
  "techStack": {
    "title": "Technology Stack",
    "roles": {
      "coordly_role_0": "Frontend framework and API routes",
      "coordly_role_1": "CRDT real-time collaborative text editing",
      "coordly_role_2": "Chat, signaling, and presence",
      "coordly_role_3": "Peer-to-peer media streaming",
      "coordly_role_4": "Multiplexed WebSocket & Signaling servers",
      "coordly_role_5": "Database for app metadata and CRDT storage",
      "coordly_role_6": "Authentication and JWT session management",
      "coordly_role_7": "Fluid UI animations and draggable PiP"
    }
  },
  "toc": {
    "why-i-built-it": "Why I Built It",
    "evolution": "Evolution of CollabHub",
    "the-workspace": "The Unified Workspace",
    "realtime-systems": "Three Realtime Systems",
    "multiplexing": "WebSocket Multiplexing",
    "hot-swapping": "Track Hot-Swapping",
    "persistence": "Persistence Strategy",
    "auth": "Auth & Security",
    "challenges": "Engineering Challenges",
    "tradeoffs": "Trade-offs",
    "lessons": "What I Learned",
    "tech-stack": "Tech Stack"
  }
};
export default content;
