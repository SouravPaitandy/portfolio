export const technical = {
  "canvasEngine": {
    "content": [
      "The drawing engine is built on the HTML5 Canvas 2D API, utilizing a retained-mode rendering loop. Instead of drawing directly to the screen and forgetting the shapes, every stroke and text object is stored in memory as JSON and re-rendered entirely on every frame update (`requestAnimationFrame`).",
      "This retained-mode approach simplifies infinite panning, zooming, and undo/redo mechanics, as the entire state can be re-projected at any time.",
      "To support an infinite coordinate model, the engine tracks `offsetX`, `offsetY`, and `zoom` factors. Every screen coordinate (where the mouse clicks) must be mathematically transformed into a virtual canvas coordinate before being stored."
    ],
    "details": [
      "Device pixel ratio scaling for crisp high-DPI (Retina) rendering.",
      "Custom pointer, mouse, and touch event handling.",
      "Object-based vector history."
    ]
  },
  "smoothStrokes": {
    "content": [
      "A common pitfall in canvas drawing is using standard `lineTo()` connections between rapid mouse events, which results in jagged, unnatural lines.",
      "DrawSync solves this by calculating the midpoints between successive pointer coordinates and drawing bezier curves (`quadraticCurveTo`) through them. This mathematical interpolation turns discrete pointer events into fluid, natural-looking ink strokes."
    ]
  },
  "realTime": {
    "content": [
      "To handle the complex requirements of real-time state synchronization, DrawSync utilizes Liveblocks.",
      "Initially, I experimented with a custom Socket.IO implementation. However, managing WebSocket connections, reconnections, and presence scaling for a side project added unnecessary backend overhead.",
      "Migrating to Liveblocks provided managed WebSockets and out-of-the-box presence. Ephemeral data, like remote cursors, syncs via Liveblocks presence (`updateMyPresence`), while persistent drawing events (strokes, clears, undo/redo) are broadcasted to the room via pub/sub payloads."
    ]
  },
  "challenges": [
    {
      "technicalProblem": "Implementing zoom that tracks the user's cursor (pointer-centered zooming) rather than zooming strictly into the top-left corner of the canvas.",
      "technicalApproach": "Adjusting the `offsetX` and `offsetY` relative to the current mouse coordinates before applying the new `zoom` scale in the `handleWheel` event.",
      "technicalResult": "A natural, predictable navigation experience familiar to users of modern design tools."
    },
    {
      "technicalProblem": "Because the canvas is rendered as pixels but stored as vectors, erasing requires mathematical hit-detection.",
      "technicalApproach": "Calculating whether a mouse click intersects with the bounding box or path of an existing stroke.",
      "technicalResult": "Allows users to erase entire vector strokes by clicking them, rather than pixel-by-pixel bitmap erasing."
    }
  ],
  "techStack": {
    "items": [
      {
        "name": "Next.js 15 (App Router)",
        "roleId": "drawsync_role_0"
      },
      {
        "name": "React 19",
        "roleId": "drawsync_role_1"
      },
      {
        "name": "HTML5 Canvas 2D",
        "roleId": "drawsync_role_2"
      },
      {
        "name": "Liveblocks",
        "roleId": "drawsync_role_3"
      },
      {
        "name": "Tailwind CSS",
        "roleId": "drawsync_role_4"
      },
      {
        "name": "Vercel",
        "roleId": "drawsync_role_5"
      }
    ]
  }
};