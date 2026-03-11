# Auditoría de Seguridad Maestra (Anti-Vulnerabilidades)

Bienvenido a la skill **Auditoría de Seguridad Maestra**. Esta skill está diseñada para transformar tu asistente de inteligencia artificial en un **Arquitecto de Seguridad Senior (SecOps)** para tu código. Su enfoque principal es aplicaciones web y móviles.

El objetivo es auditar exhaustivamente tu proyecto antes de cualquier commit o despliegue en producción basándose de forma estricta en el "Estándar de Seguridad Top 10".

## 🚀 Instalación y Uso

Instalar esta skill en tu agente es extremadamente simple. Vía `npx`, el instalador obtendrá el contenido de la skill desde este repositorio de GitHub y la inyectará en la carpeta local de configuraciones de skills de tu entorno de IA (`.agent/skills/auditor_seguridad/SKILL.md`).

Ejecuta el siguiente comando en la raíz de tu proyecto:

```bash
npx github:JefferCB1/skill_auditor_seguridad
```

## ⚙️ ¿Cómo activarla?

Una vez instalada, interactúa con la Inteligencia Artificial. En cualquier momento de tu flujo de trabajo, invoca la skill usando uno de los siguientes triggers:

- Escribe el comando `@auditar-seguridad`
- O pídele explícitamente: *"Revisa la seguridad del código"*

La IA detendrá sus otras tareas y procederá a ejecutar la auditoría de seguridad.

## 🛡️ Proceso de Auditoría (El "Estándar Top 10")

Cuando se active, la IA ejecutará los siguientes pasos:

### Paso 1: Escaneo Profundo (Silencioso)
La IA analizará todos los archivos modificados recientemente o aquellos que tú le indiques, evaluando:

1. **Fugas de Credenciales (Hardcodeadas):** API Keys, contraseñas, URIs de bases de datos.
2. **Endpoints Expuestos:** Falta de middleware de autenticación (JWT, Supabase, etc.).
3. **Validación de Inputs:** Vulnerabilidades en los parámetros que llegan a la API o BD sin ser validados por un integrador como Zod/Joi.
4. **Rate Limiting:** Límites de peticiones en las APIs públicas.
5. **Manejo Ciego de Errores:** Fallas no manejadas por `try/catch` o fallas silenciosas.
6. **Prompt Injection:** Si existen integraciones con LLM, separación correcta del input del usuario del System Prompt.
7. **Riesgo XSS (Cross Site Scripting):** Renderizado directo de HTML en el cliente.
8. **Permisos Excesivos:** Privilegios "Root" para consultas sencillas en Base de Datos.
9. **Dependencias Dudosas:** Revisiones de librerías vulnerables o desactualizadas en tu `package.json` o `pubspec.yaml`.
10. **Fugas en Logs:** Salida de variables sensibles, passwords, o información de correos a través de `console.log` o `print`.

### Paso 2: El Reporte de Auditoría
La IA solo reportará sus hallazgos, *no corregirá el código automáticamente en esta fase*. Te entregará un reporte estandarizado similar a este:

**🛡️ REPORTE DE AUDITORÍA DE SEGURIDAD**
* **Estado General:** [Aprobado ✅ / Alerta ⚠️ / Crítico 🚨]

| Archivo | Nivel de Riesgo | Regla Violada (1-10) | Descripción del Problema | Solución Sugerida |
| :--- | :--- | :--- | :--- | :--- |
| \`auth.js\` | Alto | 1 | Se encontró URI en plano | Pasar URI a variable \`.env\` |

### Paso 3: Corrección Interactiva
Al finalizar su reporte, la IA te preguntará: *"¿Deseas que aplique las correcciones sugeridas archivo por archivo?"*.

Si confirmas, la IA iniciará un proceso cauteloso, arreglando los problemas que encontró, garantizando que el funcionamiento actual del sistema no se rompa tras la reparación.
