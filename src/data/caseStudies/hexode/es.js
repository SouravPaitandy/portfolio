const content = {
  "hero": {
    "subtitle": "Un IDE colaborativo en la nube nativo de IA para escribir, ejecutar y discutir código directamente en el navegador."
  },
  "overview": {
    "title": "Descripción General",
    "content": [
      "Hexode es un IDE colaborativo respaldado por la nube y basado en el navegador, diseñado para llevar el desarrollo nativo de IA y la colaboración en tiempo real directamente al navegador.",
      "Permite a múltiples usuarios editar proyectos de múltiples archivos de forma colaborativa, ejecutar código y consultar a un asistente de codificación de IA integrado sin ninguna instalación local. Hexode también sirve como un entorno de codificación en el navegador sin configuración, diseñado para entrevistas técnicas y práctica de DSA."
    ]
  },
  "problem": {
    "title": "Por Qué Construí Hexode",
    "content": [
      "Quería un entorno de desarrollo que viviera completamente en el navegador: sin configuración local, un lugar para escribir y ejecutar código, practicar problemas de entrevistas y DSA, colaborar con otras personas en tiempo real y usar IA dentro del mismo flujo de trabajo."
    ]
  },
  "architecture": {
    "title": "Arquitectura"
  },
  "realTime": {
    "title": "Colaboración en Tiempo Real"
  },
  "syncBug": {
    "title": "El Error de Sincronización",
    "subtitle": "Resolviendo la Condición de Carrera de Inicialización"
  },
  "execution": {
    "title": "Ejecución de Código de Múltiples Archivos"
  },
  "hexodeAI": {
    "title": "HexodeAI"
  },
  "challenges": {
    "title": "Desafíos de Ingeniería",
    "items": [
      {
        "title": "Condición de Carrera en Inicialización CRDT"
      },
      {
        "title": "Ejecución de Proyectos de Múltiples Archivos"
      },
      {
        "title": "Protocolo Manual WebSocket Yjs"
      },
      {
        "title": "Manejo de Errores a Mitad de Flujo SSE"
      },
      {
        "title": "Revinculación de Monaco/Yjs"
      }
    ]
  },
  "decisions": {
    "title": "Decisiones Técnicas"
  },
  "limitations": {
    "title": "Compromisos y Limitaciones",
    "items": [
      "Los documentos Yjs en memoria impiden el escalado horizontal directo.",
      "La autorización es actualmente solo del lado del cliente.",
      "Se utiliza la API pública de Judge0 CE, que tiene limitaciones de tarifa y SLA.",
      "No hay una suite de pruebas automatizadas.",
      "El código base es JavaScript sin TypeScript.",
      "La terminal es simulada en lugar de ser un verdadero PTY.",
      "No hay una interfaz de usuario dedicada para la resolución de conflictos, ya que Yjs maneja los conflictos CRDT automáticamente."
    ]
  },
  "learned": {
    "title": "Lo Que Aprendí",
    "content": [
      "Los sistemas en tiempo real son fundamentalmente problemas de sincronización.",
      "El estado CRDT cambia la forma en que se debe razonar sobre la persistencia y la inicialización. Ya no puedes simplemente cargar el estado desde una base de datos; tienes que fusionarlo de manera segura.",
      "El contexto de IA de múltiples archivos es un problema de arquitectura, no simplemente 'llamar a una API LLM'. Diseñar el sistema para que el servidor tenga acceso a los documentos en vivo elimina por completo la carga útil del cliente.",
      "La ejecución confiable requiere diseñar en torno a las limitaciones del servicio de ejecución."
    ]
  },
  "future": {
    "title": "Qué Construiría Diferente Hoy",
    "content": [
      "Si comenzara Hexode hoy, haría que la plataforma fuera nativa de IA desde el nivel de arquitectura en lugar de tratar a la IA como un asistente agregado a un IDE existente. También elegiría Judge0 desde el principio en lugar de pasar por el enfoque anterior basado en Piston."
    ]
  },
  "techStack": {
    "title": "Pila de Tecnología",
    "roles": {
      "hexode_role_0": "Biblioteca de interfaz de usuario frontend",
      "hexode_role_1": "Herramientas y empaquetador frontend",
      "hexode_role_2": "Superficie del editor de código",
      "hexode_role_3": "CRDT para colaboración en tiempo real",
      "hexode_role_4": "Transporte de sincronización en tiempo real",
      "hexode_role_5": "Entorno de tiempo de ejecución backend",
      "hexode_role_6": "API backend y host WebSocket",
      "hexode_role_7": "Base de datos principal para metadatos",
      "hexode_role_8": "Modelado de objetos MongoDB",
      "hexode_role_9": "Almacenamiento persistente para CRDT",
      "hexode_role_10": "LLM que impulsa HexodeAI",
      "hexode_role_11": "Motor de ejecución de código",
      "hexode_role_12": "Autenticación de usuario",
      "hexode_role_13": "Animaciones de interfaz de usuario",
      "hexode_role_14": "Estilo CSS utility-first"
    }
  },
  "toc": {
    "overview": "Descripción General",
    "why-i-built-it": "Por Qué Lo Construí",
    "architecture": "Arquitectura",
    "collaboration": "Colaboración",
    "sync-bug": "Error de Sincronización",
    "execution": "Ejecución de Múltiples Archivos",
    "hexodeai": "HexodeAI",
    "challenges": "Desafíos de Ingeniería",
    "decisions": "Decisiones Técnicas",
    "tradeoffs": "Compromisos",
    "lessons": "Lo Que Aprendí",
    "tech-stack": "Pila de Tecnología"
  }
};

export default content;
