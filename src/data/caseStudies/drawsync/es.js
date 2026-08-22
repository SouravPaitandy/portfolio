const content = {
  "hero": {
    "title": "DrawSync",
    "subtitle": "Un lienzo digital colaborativo en tiempo real, ligero y diseñado para la comunicación visual instantánea y el dibujo vectorial suave."
  },
  "problem": {
    "title": "Orígenes e Intención",
    "content": [
      "DrawSync se concibió originalmente como una función de dibujo y colaboración integrada para una plataforma más grande llamada Coordly.",
      "Inspirado en herramientas como Excalidraw y Eraser, el objetivo era construir una experiencia de pizarra ligera. Sin embargo, a medida que maduraba la mecánica del lienzo y la colaboración en tiempo real, quedó claro que el motor era lo suficientemente robusto como para valerse por sí mismo.",
      "La construcción de un lienzo infinito de alto rendimiento requiere resolver matemáticas complejas en torno al mapeo de coordenadas, el zoom centrado en el puntero y la interpolación suave de trazos, todo mientras se mantiene un estado consistente en múltiples usuarios concurrentes."
    ]
  },
  "canvasEngine": {
    "title": "Motor de Lienzo y Coordenadas"
  },
  "smoothStrokes": {
    "title": "Tinta Vectorial Suave"
  },
  "realTime": {
    "title": "Colaboración en Tiempo Real"
  },
  "challenges": {
    "title": "Desafíos de Ingeniería",
    "items": [
      {
        "title": "Matemáticas de Zoom Infinito"
      },
      {
        "title": "Detección de Colisión del Borrador"
      }
    ]
  },
  "limitations": {
    "title": "Compromisos y Limitaciones",
    "items": [
      "El motor de renderizado utiliza una estrategia de redibujado O(N). Volver a renderizar todo el historial en cada movimiento del mouse eventualmente causará caídas de la velocidad de fotogramas en dibujos extremadamente densos.",
      "Borrar un trazo elimina toda la ruta del vector, en lugar de cortar o borrar un segmento específico de la línea.",
      "Actualmente no hay ninguna base de datos externa conectada para la persistencia a largo plazo fuera del entorno de Liveblocks.",
      "No hay un sistema de autenticación incorporado; los usuarios se conectan de forma anónima con ID aleatorios."
    ]
  },
  "learned": {
    "title": "Lo Que Aprendí",
    "content": [
      "Construir DrawSync fue una inmersión profunda en el razonamiento espacial y las matemáticas del lienzo. Manejar coordenadas infinitas, escalado y detección de impactos requiere una mentalidad fundamentalmente diferente a la manipulación estándar de DOM.",
      "También aprendí que la colaboración en tiempo real se trata menos de enviar datos rápido y más de administrar cuidadosamente el estado compartido, manejar conflictos y garantizar la consistencia de la interfaz de usuario en condiciones de red volátiles."
    ]
  },
  "future": {
    "title": "Qué Construiría Diferente",
    "content": [
      "Si reconstruyera DrawSync hoy, lo diseñaría como un producto independiente desde el primer día. Me centraría en optimizar el cuello de botella de renderizado O(N) para dibujos más grandes, implementaría una autenticación sólida y exploraría la asistencia de IA para generar diagramas o resumir sesiones de pizarra."
    ]
  },
  "techStack": {
    "title": "Pila de Tecnología",
    "roles": {
      "drawsync_role_0": "Marco de trabajo React y enrutamiento",
      "drawsync_role_1": "Estado de la interfaz de usuario y arquitectura",
      "drawsync_role_2": "Motor de renderizado de alto rendimiento",
      "drawsync_role_3": "WebSockets, presencia y eventos en tiempo real",
      "drawsync_role_4": "Estilo responsivo y modo oscuro",
      "drawsync_role_5": "Implementación de Edge y alojamiento"
    }
  },
  "toc": {
    "why-i-built-it": "Por Qué Lo Construí",
    "canvas-engine": "Cómo Funciona el Lienzo",
    "smooth-ink": "Trazos Suaves",
    "collaboration": "Colaboración",
    "challenges": "Desafíos de Ingeniería",
    "tradeoffs": "Compromisos",
    "lessons": "Lo Que Aprendí",
    "tech-stack": "Pila de Tecnología"
  }
};

export default content;
