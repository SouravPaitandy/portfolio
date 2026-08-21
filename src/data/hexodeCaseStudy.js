export const hexodeCaseStudyData = {
  hero: {
    subtitle: "An AI-native collaborative cloud IDE for writing, running, and discussing code directly in the browser.",
  },
  overview: {
    title: "Overview",
    content: [
      "Hexode is a browser-based, cloud-backed collaborative IDE designed to bring AI-native development and real-time collaboration directly into the browser.",
      "It enables multiple users to collaboratively edit multi-file projects, run code, and consult an integrated AI coding assistant without any local installation. Hexode also serves as a zero-setup browser coding playground tailored for technical interviews and DSA practice."
    ]
  },
  problem: {
    title: "Why I Built Hexode",
    content: [
      "I wanted a development environment that lived entirely in the browser: no local setup, a place to write and run code, practice interview and DSA problems, collaborate with other people in real time, and use AI inside the same workflow."
    ]
  },
  architecture: {
    title: "Architecture",
    diagram: `Browser
  ├── React / Monaco Editor
  └── Yjs client state
          │
       WebSocket
          │
          ▼
Node.js + Express server
  ├── Yjs synchronization
  ├── REST API
  ├── HexodeAI
  └── code execution orchestration
       │        │        │
       ▼        ▼        ▼
   MongoDB    Gemini    Judge0`,
    details: [
      "LevelDB is used for CRDT persistence.",
      "Clerk provides authentication.",
      "Vercel hosts the frontend."
    ]
  },
  realTime: {
    title: "Real-Time Collaboration",
    content: [
      "Monaco serves as the primary editing surface, while Yjs provides CRDT-based shared document state. File contents are represented as Y.Text, and project files are tracked using a Y.Map. Synchronization is transported over WebSocket, with Awareness providing real-time presence and cursor state. Chat messages are also persisted within the shared Yjs document.",
      "Crucially, the server implements the Yjs binary synchronization and awareness protocol directly using y-protocols/sync, y-protocols/awareness, and lib0 encoding/decoding.",
      "By avoiding the standard y-websocket server package, the HTTP and WebSocket state live together in the same Node.js process. This means the server already has access to the live Yjs documents, allowing the AI endpoint to access that state without requiring the browser to resend the full code context."
    ]
  },
  syncBug: {
    title: "The Synchronization Bug",
    subtitle: "Solving the Initialization Race Condition",
    content: [
      "In the original approach, a simple setTimeout was used before initializing a project. This risked overwriting the state before the CRDT synchronization had fully completed.",
      "The final approach waits for the Websocket/Yjs provider to emit a 'synced' event. By combining provider.on('synced') with a check to ensure yFilesMap.size === 0, the project initializes only when appropriate. This is a correctness and race-condition fix, ensuring reliable document state."
    ]
  },
  execution: {
    title: "Multi-File Code Execution",
    content: [
      "Hexode supports multi-file projects, but Judge0 receives a single source_code string. This central mismatch requires a language-specific transformation pipeline.",
      "For Java, public classes are renamed to Main, packages are stripped, access modifiers are handled, and Main collisions are managed.",
      "For JavaScript, a custom require() shim is injected, resolving relative modules through an in-memory registry.",
      "For C, C++, and Python, files are merged via ordered concatenation."
    ],
    supported: ["JavaScript", "Python", "Java", "C", "C++"]
  },
  hexodeAI: {
    title: "HexodeAI",
    content: [
      "When a user sends a message, it hits the /api/ai/chat endpoint. After rate limiting, the server reads the current Yjs document state directly from memory. It builds the context (capped at 2000 characters) and sends it to the Gemini API (gemini-3-flash-preview).",
      "The response is streamed back via SSE (Server-Sent Events) and consumed by the client using a ReadableStream for incremental React rendering.",
      "The AI endpoint enforces limits of 5 requests per minute and 20 requests per day. Additionally, a keyword-based query firewall blocks unrelated queries before they even reach the Gemini API."
    ]
  },
  challenges: {
    title: "Engineering Challenges",
    items: [
      {
        title: "CRDT Initialization Race Condition",
        problem: "Initializing default project files could overwrite remote state if synchronization hadn't finished.",
        approach: "Listen to the Yjs provider's 'synced' event and check if the document is empty before initializing.",
        result: "Removed the initialization race that could overwrite synchronized project state."
      },
      {
        title: "Multi-File Project Execution",
        problem: "Executing multi-file code against a single-string execution API (Judge0).",
        approach: "Implement language-specific merging pipelines (e.g., custom require shims, class renaming, concatenation).",
        result: "Enables multi-file execution across 5 supported languages."
      },
      {
        title: "Manual Yjs WebSocket Protocol",
        problem: "Need to share HTTP and WebSocket state without running separate processes.",
        approach: "Implement the Yjs binary sync protocol directly on the Express server using lib0 and y-protocols.",
        result: "Unified server state, enabling the AI to read live documents from memory."
      },
      {
        title: "SSE Mid-Stream Error Handling",
        problem: "HTTP status codes cannot be changed once headers are sent during a Server-Sent Events stream.",
        approach: "Stream specialized error event payloads that the client interprets and renders gracefully.",
        result: "Robust UI error states even when the LLM API fails mid-generation."
      },
      {
        title: "Monaco/Yjs Re-binding",
        problem: "Switching files in the IDE left lingering CRDT bindings on the editor instance.",
        approach: "Destroy the previous MonacoBinding and rebind on file name changes.",
        result: "Clean transitions between files with correct cursor and edit tracking."
      }
    ]
  },
  decisions: {
    title: "Technical Decisions",
    items: [
      {
        title: "Manual Yjs Server",
        why: "Sharing the HTTP and WebSocket server provides direct access to the server-side document state in memory."
      },
      {
        title: "Sync-Event Initialization",
        why: "Prevents premature default initialization that would corrupt incoming CRDT state."
      },
      {
        title: "Server-Side Yjs Context for AI",
        why: "Avoids sending the full document contents over the network from the browser with every AI request."
      },
      {
        title: "Derived WebSocket URL",
        why: "Deriving the WebSocket URL from the API URL reduces frontend deployment configuration surface."
      }
    ]
  },
  limitations: {
    title: "Trade-offs & Limitations",
    items: [
      "In-memory Yjs docs prevent straightforward horizontal scaling.",
      "Authorization is currently client-side only.",
      "The Judge0 CE public API is used, which has rate and SLA limitations.",
      "There is no automated test suite.",
      "The codebase is JavaScript without TypeScript.",
      "The terminal is simulated rather than a true PTY.",
      "There is no dedicated conflict-resolution UI, as Yjs handles CRDT conflicts automatically."
    ]
  },
  learned: {
    title: "What I Learned",
    content: [
      "Real-time systems are fundamentally synchronization problems.",
      "CRDT state changes the way persistence and initialization must be reasoned about. You can no longer just load state from a database; you have to merge it securely.",
      "Multi-file AI context is an architecture problem, not simply 'calling an LLM API'. Designing the system so the server has access to the live documents completely removes the client payload burden.",
      "Reliable execution requires designing around the constraints of the execution service."
    ]
  },
  future: {
    title: "What I Would Build Differently Today",
    content: [
      "If I started Hexode today, I would make the platform AI-native from the architecture level rather than treating AI as an assistant added to an existing IDE. I would also choose Judge0 from the beginning instead of going through the earlier Piston-based approach."
    ]
  },
  techStack: {
    title: "Technology Stack",
    items: [
      { name: "React", role: "Frontend UI library" },
      { name: "Vite", role: "Frontend tooling and bundler" },
      { name: "Monaco", role: "Code editor surface" },
      { name: "Yjs", role: "CRDT for real-time collaboration" },
      { name: "WebSocket", role: "Real-time synchronization transport" },
      { name: "Node.js", role: "Backend runtime environment" },
      { name: "Express", role: "Backend API and WebSocket host" },
      { name: "MongoDB Atlas", role: "Primary database for user and project metadata" },
      { name: "Mongoose", role: "MongoDB object modeling" },
      { name: "LevelDB", role: "Persistent storage for CRDT document updates" },
      { name: "Gemini", role: "LLM powering HexodeAI" },
      { name: "Judge0", role: "Code execution engine" },
      { name: "Clerk", role: "User authentication" },
      { name: "Framer Motion", role: "UI animations" },
      { name: "Tailwind", role: "Utility-first CSS styling" }
    ]
  }
};
