const content = {
  "hero": {
    "subtitle": "An AI-native collaborative cloud IDE for writing, running, and discussing code directly in the browser."
  },
  "overview": {
    "title": "Overview",
    "content": [
      "Hexode is a browser-based, cloud-backed collaborative IDE designed to bring AI-native development and real-time collaboration directly into the browser.",
      "It enables multiple users to collaboratively edit multi-file projects, run code, and consult an integrated AI coding assistant without any local installation. Hexode also serves as a zero-setup browser coding playground tailored for technical interviews and DSA practice."
    ]
  },
  "problem": {
    "title": "Why I Built Hexode",
    "content": [
      "I wanted a development environment that lived entirely in the browser: no local setup, a place to write and run code, practice interview and DSA problems, collaborate with other people in real time, and use AI inside the same workflow."
    ]
  },
  "architecture": {
    "title": "Architecture"
  },
  "realTime": {
    "title": "Real-Time Collaboration"
  },
  "syncBug": {
    "title": "The Synchronization Bug",
    "subtitle": "Solving the Initialization Race Condition"
  },
  "execution": {
    "title": "Multi-File Code Execution"
  },
  "hexodeAI": {
    "title": "HexodeAI"
  },
  "challenges": {
    "title": "Engineering Challenges",
    "items": [
      {
        "title": "CRDT Initialization Race Condition"
      },
      {
        "title": "Multi-File Project Execution"
      },
      {
        "title": "Manual Yjs WebSocket Protocol"
      },
      {
        "title": "SSE Mid-Stream Error Handling"
      },
      {
        "title": "Monaco/Yjs Re-binding"
      }
    ]
  },
  "decisions": {
    "title": "Technical Decisions"
  },
  "limitations": {
    "title": "Trade-offs & Limitations",
    "items": [
      "In-memory Yjs docs prevent straightforward horizontal scaling.",
      "Authorization is currently client-side only.",
      "The Judge0 CE public API is used, which has rate and SLA limitations.",
      "There is no automated test suite.",
      "The codebase is JavaScript without TypeScript.",
      "The terminal is simulated rather than a true PTY.",
      "There is no dedicated conflict-resolution UI, as Yjs handles CRDT conflicts automatically."
    ]
  },
  "learned": {
    "title": "What I Learned",
    "content": [
      "Real-time systems are fundamentally synchronization problems.",
      "CRDT state changes the way persistence and initialization must be reasoned about. You can no longer just load state from a database; you have to merge it securely.",
      "Multi-file AI context is an architecture problem, not simply 'calling an LLM API'. Designing the system so the server has access to the live documents completely removes the client payload burden.",
      "Reliable execution requires designing around the constraints of the execution service."
    ]
  },
  "future": {
    "title": "What I Would Build Differently Today",
    "content": [
      "If I started Hexode today, I would make the platform AI-native from the architecture level rather than treating AI as an assistant added to an existing IDE. I would also choose Judge0 from the beginning instead of going through the earlier Piston-based approach."
    ]
  },
  "techStack": {
    "title": "Technology Stack",
    "roles": {
      "hexode_role_0": "Frontend UI library",
      "hexode_role_1": "Frontend tooling and bundler",
      "hexode_role_2": "Code editor surface",
      "hexode_role_3": "CRDT for real-time collaboration",
      "hexode_role_4": "Real-time synchronization transport",
      "hexode_role_5": "Backend runtime environment",
      "hexode_role_6": "Backend API and WebSocket host",
      "hexode_role_7": "Primary database for user and project metadata",
      "hexode_role_8": "MongoDB object modeling",
      "hexode_role_9": "Persistent storage for CRDT document updates",
      "hexode_role_10": "LLM powering HexodeAI",
      "hexode_role_11": "Code execution engine",
      "hexode_role_12": "User authentication",
      "hexode_role_13": "UI animations",
      "hexode_role_14": "Utility-first CSS styling"
    }
  },
  "toc": {
    "overview": "Overview",
    "why-i-built-it": "Why I Built It",
    "architecture": "Architecture",
    "collaboration": "Real-Time Collaboration",
    "sync-bug": "Synchronization Bug",
    "execution": "Multi-File Execution",
    "hexodeai": "HexodeAI",
    "challenges": "Engineering Challenges",
    "decisions": "Technical Decisions",
    "tradeoffs": "Trade-offs",
    "lessons": "What I Learned",
    "tech-stack": "Tech Stack"
  }
};
export default content;
