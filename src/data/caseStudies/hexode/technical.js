export const technical = {
  "architecture": {
    "diagram": "Browser\n  ├── React / Monaco Editor\n  └── Yjs client state\n          │\n       WebSocket\n          │\n          ▼\nNode.js + Express server\n  ├── Yjs synchronization\n  ├── REST API\n  ├── HexodeAI\n  └── code execution orchestration\n       │        │        │\n       ▼        ▼        ▼\n   MongoDB    Gemini    Judge0",
    "details": [
      "LevelDB is used for CRDT persistence.",
      "Clerk provides authentication.",
      "Vercel hosts the frontend."
    ]
  },
  "realTime": {
    "content": [
      "Monaco serves as the primary editing surface, while Yjs provides CRDT-based shared document state. File contents are represented as Y.Text, and project files are tracked using a Y.Map. Synchronization is transported over WebSocket, with Awareness providing real-time presence and cursor state. Chat messages are also persisted within the shared Yjs document.",
      "Crucially, the server implements the Yjs binary synchronization and awareness protocol directly using y-protocols/sync, y-protocols/awareness, and lib0 encoding/decoding.",
      "By avoiding the standard y-websocket server package, the HTTP and WebSocket state live together in the same Node.js process. This means the server already has access to the live Yjs documents, allowing the AI endpoint to access that state without requiring the browser to resend the full code context."
    ]
  },
  "syncBug": {
    "content": [
      "In the original approach, a simple setTimeout was used before initializing a project. This risked overwriting the state before the CRDT synchronization had fully completed.",
      "The final approach waits for the Websocket/Yjs provider to emit a 'synced' event. By combining provider.on('synced') with a check to ensure yFilesMap.size === 0, the project initializes only when appropriate. This is a correctness and race-condition fix, ensuring reliable document state."
    ]
  },
  "execution": {
    "content": [
      "Hexode supports multi-file projects, but Judge0 receives a single source_code string. This central mismatch requires a language-specific transformation pipeline.",
      "For Java, public classes are renamed to Main, packages are stripped, access modifiers are handled, and Main collisions are managed.",
      "For JavaScript, a custom require() shim is injected, resolving relative modules through an in-memory registry.",
      "For C, C++, and Python, files are merged via ordered concatenation."
    ],
    "supported": [
      "JavaScript",
      "Python",
      "Java",
      "C",
      "C++"
    ]
  },
  "hexodeAI": {
    "content": [
      "When a user sends a message, it hits the /api/ai/chat endpoint. After rate limiting, the server reads the current Yjs document state directly from memory. It builds the context (capped at 2000 characters) and sends it to the Gemini API (gemini-3-flash-preview).",
      "The response is streamed back via SSE (Server-Sent Events) and consumed by the client using a ReadableStream for incremental React rendering.",
      "The AI endpoint enforces limits of 5 requests per minute and 20 requests per day. Additionally, a keyword-based query firewall blocks unrelated queries before they even reach the Gemini API."
    ]
  },
  "challenges": [
    {
      "technicalProblem": "Initializing default project files could overwrite remote state if synchronization hadn't finished.",
      "technicalApproach": "Listen to the Yjs provider's 'synced' event and check if the document is empty before initializing.",
      "technicalResult": "Removed the initialization race that could overwrite synchronized project state."
    },
    {
      "technicalProblem": "Executing multi-file code against a single-string execution API (Judge0).",
      "technicalApproach": "Implement language-specific merging pipelines (e.g., custom require shims, class renaming, concatenation).",
      "technicalResult": "Enables multi-file execution across 5 supported languages."
    },
    {
      "technicalProblem": "Need to share HTTP and WebSocket state without running separate processes.",
      "technicalApproach": "Implement the Yjs binary sync protocol directly on the Express server using lib0 and y-protocols.",
      "technicalResult": "Unified server state, enabling the AI to read live documents from memory."
    },
    {
      "technicalProblem": "HTTP status codes cannot be changed once headers are sent during a Server-Sent Events stream.",
      "technicalApproach": "Stream specialized error event payloads that the client interprets and renders gracefully.",
      "technicalResult": "Robust UI error states even when the LLM API fails mid-generation."
    },
    {
      "technicalProblem": "Switching files in the IDE left lingering CRDT bindings on the editor instance.",
      "technicalApproach": "Destroy the previous MonacoBinding and rebind on file name changes.",
      "technicalResult": "Clean transitions between files with correct cursor and edit tracking."
    }
  ],
  "decisions": {
    "items": [
      {
        "title": "Manual Yjs Server",
        "why": "Sharing the HTTP and WebSocket server provides direct access to the server-side document state in memory."
      },
      {
        "title": "Sync-Event Initialization",
        "why": "Prevents premature default initialization that would corrupt incoming CRDT state."
      },
      {
        "title": "Server-Side Yjs Context for AI",
        "why": "Avoids sending the full document contents over the network from the browser with every AI request."
      },
      {
        "title": "Derived WebSocket URL",
        "why": "Deriving the WebSocket URL from the API URL reduces frontend deployment configuration surface."
      }
    ]
  },
  "techStack": {
    "items": [
      {
        "name": "React",
        "roleId": "hexode_role_0"
      },
      {
        "name": "Vite",
        "roleId": "hexode_role_1"
      },
      {
        "name": "Monaco",
        "roleId": "hexode_role_2"
      },
      {
        "name": "Yjs",
        "roleId": "hexode_role_3"
      },
      {
        "name": "WebSocket",
        "roleId": "hexode_role_4"
      },
      {
        "name": "Node.js",
        "roleId": "hexode_role_5"
      },
      {
        "name": "Express",
        "roleId": "hexode_role_6"
      },
      {
        "name": "MongoDB Atlas",
        "roleId": "hexode_role_7"
      },
      {
        "name": "Mongoose",
        "roleId": "hexode_role_8"
      },
      {
        "name": "LevelDB",
        "roleId": "hexode_role_9"
      },
      {
        "name": "Gemini",
        "roleId": "hexode_role_10"
      },
      {
        "name": "Judge0",
        "roleId": "hexode_role_11"
      },
      {
        "name": "Clerk",
        "roleId": "hexode_role_12"
      },
      {
        "name": "Framer Motion",
        "roleId": "hexode_role_13"
      },
      {
        "name": "Tailwind",
        "roleId": "hexode_role_14"
      }
    ]
  }
};