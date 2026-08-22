const content = {
  "hero": {
    "title": "Coordly",
    "subtitle": "Un espacio de trabajo unificado que consolida documentos colaborativos en tiempo real, tareas Kanban, chat de equipo y videoconferencia WebRTC en una sola arquitectura cohesiva."
  },
  "whyIBuiltIt": {
    "title": "Por Qué Construí Coordly",
    "content": [
      "La motivación para este proyecto surgió de la fricción constante de usar múltiples herramientas dispares para la colaboración en equipo. Un flujo de trabajo típico involucra Jira o Trello para tareas, Google Docs para escribir, Zoom o Google Meet para llamadas y Slack para chatear.",
      "Gestionar un proyecto en varias aplicaciones se sentía innecesariamente fragmentado. El objetivo principal de Coordly era explorar cómo construir un espacio de trabajo unificado donde un equipo pudiera manejar estas actividades de colaboración de forma nativa bajo un mismo techo."
    ]
  },
  "evolution": {
    "title": "De CollabHub a Coordly",
    "content": [
      "El proyecto originalmente se llamaba CollabHub. Sin embargo, el nombre se cambió más tarde a Coordly porque CollabHub parecía demasiado genérico y ya estaba asociado con otros productos.",
      "Se eligió Coordly porque es más corto, más moderno, fácil de comercializar y se alinea estrechamente con el objetivo central de la aplicación de la coordinación en equipo."
    ]
  },
  "theWorkspace": {
    "title": "El Espacio de Trabajo Unificado",
    "content": [
      "Coordly está construido en torno al concepto de 'Collabs' — espacios de nombres de contenedores de espacio de trabajo.",
      "Cuando los usuarios se unen a un Collab, obtienen acceso inmediato y sincronizado a un documento de texto enriquecido impulsado por Tiptap, un tablero de tareas Kanban de arrastrar y soltar, un canal de mensajería en tiempo real y una interfaz de videollamada persistente.",
      "Esta arquitectura elimina el cambio de contexto, permitiendo a los equipos referenciar un documento, charlar sobre una tarea y hablar por video simultáneamente dentro de la misma pestaña del navegador."
    ]
  },
  "threeRealtimeSystems": {
    "title": "Tres Sistemas en Tiempo Real, Un Espacio de Trabajo"
  },
  "multiplexing": {
    "title": "El Servidor Multiplexado"
  },
  "hotSwapping": {
    "title": "Intercambio en Caliente de Medios WebRTC"
  },
  "persistence": {
    "title": "Estrategia de Persistencia"
  },
  "authAndSecurity": {
    "title": "Autenticación y Autorización"
  },
  "challenges": {
    "title": "Desafíos de Ingeniería",
    "items": [
      {
        "title": "Multiplexación de Protocolos en Tiempo Real"
      },
      {
        "title": "Coordinación de Sistemas"
      },
      {
        "title": "Consistencia de REST y CRDT"
      }
    ]
  },
  "limitations": {
    "title": "Compromisos y Limitaciones",
    "items": [
      "El `documentServer.js` mantiene el estado de conexión en la memoria. El escalado horizontal requeriría un adaptador de infraestructura compartida (como Redis) para unir las instancias de Socket.IO y Yjs.",
      "PeerJS depende de las configuraciones STUN/TURN predeterminadas, lo que puede dificultar la negociación de conexiones WebRTC a través de cortafuegos corporativos estrictos.",
      "Actualmente no se ha implementado ninguna limitación de tasa API explícita en el backend de Node."
    ]
  },
  "learned": {
    "title": "Lo Que Aprendí",
    "content": [
      "Este fue mi primer gran proyecto backend con gran carga en tiempo real. Me enseñó los fundamentos de la arquitectura backend, especialmente cómo y cuándo usar diferentes tecnologías de comunicación como WebSockets, WebRTC y API HTTP.",
      "También aprendí las grandes diferencias entre el desarrollo local y las implementaciones de producción, el manejo de esquemas de bases de datos y la gestión segura de la autenticación de sesiones.",
      "A mitad del desarrollo, mi computadora portátil se averió y perdí todo el código fuente no confirmado. Reconstruirlo desde cero hizo que el valor de Git, el control de versiones y los repositorios remotos fueran muy reales para mí."
    ]
  },
  "future": {
    "title": "Qué Construiría Diferente Hoy",
    "content": [
      "Si comenzara este proyecto hoy, priorizaría un plan de arquitectura mucho más estricto desde el primer día, estableciendo límites de sistema más claros entre los servidores en tiempo real.",
      "También diseñaría la plataforma con la integración de IA como un pilar fundamental, en lugar de una ocurrencia tardía, permitiendo funciones como la generación automatizada de tareas o resúmenes de reuniones."
    ]
  },
  "techStack": {
    "title": "Pila de Tecnología",
    "roles": {
      "coordly_role_0": "Marco de trabajo frontend y rutas API",
      "coordly_role_1": "CRDT para edición de texto colaborativa en tiempo real",
      "coordly_role_2": "Chat, señalización y presencia",
      "coordly_role_3": "Transmisión de medios de igual a igual",
      "coordly_role_4": "Servidores multiplexados de WebSocket y señalización",
      "coordly_role_5": "Base de datos para metadatos de la aplicación y almacenamiento CRDT",
      "coordly_role_6": "Autenticación y gestión de sesiones JWT",
      "coordly_role_7": "Animaciones UI fluidas y PiP arrastrable"
    }
  },
  "toc": {
    "why-i-built-it": "Por Qué Lo Construí",
    "evolution": "Evolución de CollabHub",
    "the-workspace": "El Espacio de Trabajo Unificado",
    "realtime-systems": "Tres Sistemas en Tiempo Real",
    "multiplexing": "Multiplexación de WebSocket",
    "hot-swapping": "Intercambio en Caliente de Pistas",
    "persistence": "Estrategia de Persistencia",
    "auth": "Autenticación y Seguridad",
    "challenges": "Desafíos de Ingeniería",
    "tradeoffs": "Compromisos",
    "lessons": "Lo Que Aprendí",
    "tech-stack": "Pila de Tecnología"
  }
};

export default content;
