export const technical = {
  "threeRealtimeSystems": {
    "items": [
      {
        "title": "Collaborative Documents (Yjs)",
        "content": "Uses Yjs CRDTs over raw WebSockets (`y-websocket`) to coordinate document state across concurrent editors."
      },
      {
        "title": "Chat & Signaling (Socket.IO)",
        "content": "Employs Socket.IO for ephemeral, room-based message broadcasting, including typing indicators and emoji reactions."
      },
      {
        "title": "Video Calling (WebRTC & PeerJS)",
        "content": "Uses PeerJS and WebRTC for peer-to-peer media streaming, keeping the media path outside the application's main realtime server."
      }
    ]
  },
  "multiplexing": {
    "content": [
      "Because Yjs operates natively over raw WebSockets and the chat/signaling system operates over Socket.IO (which also uses WebSocket/HTTP upgrades), the backend node server needed to securely route traffic to the correct protocol handler over a single HTTP port.",
      "To solve this, the server intercepts the HTTP `upgrade` event. It analyzes the incoming request path—routing requests prefixed with `/socket.io/` to the Socket.IO engine, while passing all other relevant upgrade requests to the raw `wss.handleUpgrade` handler for Yjs document synchronization."
    ]
  },
  "hotSwapping": {
    "content": [
      "A significant UX challenge in building the video component was allowing users to toggle their camera or microphone without dropping and rebuilding the entire peer-to-peer call.",
      "Rather than tearing down the WebRTC connection, Coordly uses `RTCPeerConnection.getSenders().find(s => ...)` combined with `sender.replaceTrack()`. `replaceTrack()` swaps the active media track without tearing down the existing peer connection. This keeps the network connection alive while instantly reflecting the new hardware state."
    ]
  },
  "persistence": {
    "content": [
      "The application splits persistence based on data characteristics. Application metadata, user profiles, tasks, and chat history are structured via Mongoose and stored in standard MongoDB collections.",
      "Conversely, the real-time document state is decoupled from the REST API. It is captured by `y-mongodb-provider`, which stores the binary Yjs update buffers into a specialized MongoDB collection directly from the Node WebSocket server."
    ]
  },
  "authAndSecurity": {
    "content": [
      "Coordly uses NextAuth for identity management, supporting OAuth flows (GitHub, Google) with a JWT session strategy.",
      "Security is enforced server-side via `getServerSession` checks. API routes explicitly validate a user's `CollabParticipant` role before authorizing database operations, preventing unauthorized access to private workspaces."
    ]
  },
  "challenges": [
    {
      "technicalProblem": "Running Yjs (raw WebSockets) and Socket.IO concurrently on the same backend port.",
      "technicalApproach": "Intercepting the Node HTTP `upgrade` event and dynamically routing the socket based on the request URL path.",
      "technicalResult": "A single Node.js server can route the two realtime protocols to their appropriate handlers."
    },
    {
      "technicalProblem": "Ensuring video, chat, and document states remained consistent without overwhelming the client.",
      "technicalApproach": "Isolating component lifecycles and utilizing React Context to prevent unnecessary top-level re-renders.",
      "technicalResult": "An interface where users can keep the video call in a floating PiP window while working in Docs or Tasks."
    },
    {
      "technicalProblem": "Maintaining consistency between standard REST data (document titles/permissions) and CRDT document content.",
      "technicalApproach": "Decoupling the storage mechanisms—using Mongoose for metadata and `y-mongodb-provider` for binary state.",
      "technicalResult": "Keeps CRDT document state separate from conventional REST-managed metadata and permissions."
    }
  ],
  "techStack": {
    "items": [
      {
        "name": "Next.js 15",
        "roleId": "coordly_role_0"
      },
      {
        "name": "Yjs & Tiptap",
        "roleId": "coordly_role_1"
      },
      {
        "name": "Socket.IO",
        "roleId": "coordly_role_2"
      },
      {
        "name": "WebRTC & PeerJS",
        "roleId": "coordly_role_3"
      },
      {
        "name": "Node.js",
        "roleId": "coordly_role_4"
      },
      {
        "name": "MongoDB",
        "roleId": "coordly_role_5"
      },
      {
        "name": "NextAuth",
        "roleId": "coordly_role_6"
      },
      {
        "name": "Framer Motion",
        "roleId": "coordly_role_7"
      }
    ]
  }
};