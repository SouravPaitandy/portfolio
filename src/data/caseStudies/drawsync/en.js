const content = {
  "hero": {
    "title": "DrawSync",
    "subtitle": "A lightweight, real-time collaborative digital canvas engineered for instant visual communication and smooth vector sketching."
  },
  "problem": {
    "title": "Origins & Intent",
    "content": [
      "DrawSync was originally conceived as an embedded drawing and collaboration feature for a larger platform called Coordly.",
      "Inspired by tools like Excalidraw and Eraser, the goal was to build a lightweight whiteboarding experience. However, as the canvas and real-time collaboration mechanics matured, it became clear the engine was robust enough to stand on its own.",
      "Building a performant infinite canvas requires solving complex math around coordinate mapping, pointer-centered zooming, and smooth stroke interpolation—all while maintaining consistent state across multiple concurrent users."
    ]
  },
  "canvasEngine": {
    "title": "Canvas & Coordinate Engine"
  },
  "smoothStrokes": {
    "title": "Smooth Vector Ink"
  },
  "realTime": {
    "title": "Real-Time Collaboration"
  },
  "challenges": {
    "title": "Engineering Challenges",
    "items": [
      {
        "title": "Infinite Zoom Math"
      },
      {
        "title": "Eraser Collision Detection"
      }
    ]
  },
  "limitations": {
    "title": "Trade-offs & Limitations",
    "items": [
      "The rendering engine uses an O(N) redraw strategy. Re-rendering the entire history on every mouse move will eventually cause frame rate drops on extremely dense drawings.",
      "Erasing a stroke removes the entire vector path, rather than slicing or erasing a specific segment of the line.",
      "No external database is currently connected for long-term persistence outside of the Liveblocks environment.",
      "No built-in authentication system; users connect anonymously with random IDs."
    ]
  },
  "learned": {
    "title": "What I Learned",
    "content": [
      "Building DrawSync was a deep dive into spatial reasoning and canvas mathematics. Managing infinite coordinates, scaling, and hit-detection requires a fundamentally different mindset than standard DOM manipulation.",
      "I also learned that real-time collaboration is less about sending data fast, and more about carefully managing shared state, handling conflicts, and ensuring UI consistency across volatile network conditions."
    ]
  },
  "future": {
    "title": "What I Would Build Differently",
    "content": [
      "If I were to rebuild DrawSync today, I would architect it as a standalone product from day one. I'd focus on optimizing the O(N) rendering bottleneck for larger drawings, implement robust authentication, and explore AI assistance for generating diagrams or summarizing whiteboard sessions."
    ]
  },
  "techStack": {
    "title": "Technology Stack",
    "roles": {
      "drawsync_role_0": "React framework and routing",
      "drawsync_role_1": "UI state and component architecture",
      "drawsync_role_2": "High-performance rendering engine",
      "drawsync_role_3": "WebSockets, presence, and real-time events",
      "drawsync_role_4": "Responsive styling and dark mode",
      "drawsync_role_5": "Edge deployment and hosting"
    }
  },
  "toc": {
    "why-i-built-it": "Why I Built It",
    "canvas-engine": "How the Canvas Works",
    "smooth-ink": "Smooth Strokes",
    "collaboration": "Real-Time Collaboration",
    "challenges": "Engineering Challenges",
    "tradeoffs": "Trade-offs",
    "lessons": "What I Learned",
    "tech-stack": "Tech Stack"
  }
};
export default content;
