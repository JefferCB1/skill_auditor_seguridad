#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

// Forzar encoding UTF-8 en la salida (fix para terminales Windows)
if (process.stdout.isTTY) {
  process.stdout.setEncoding('utf8');
}

// Directorio de instalacion de la skill
const targetBaseDir = path.join(process.cwd(), '.agent', 'skills', 'auditor_seguridad');
const skillFile = path.join(targetBaseDir, 'SKILL.md');

// Crear la estructura de directorios recursivamente
fs.mkdirSync(targetBaseDir, { recursive: true });

// Contenido del SKILL.md (sin emojis en el nombre del archivo para evitar errores de encoding)
const skillContent = `---
name: auditor-seguridad
description: >
  Skill de auditoria de seguridad estatica (SecOps) para codigo fuente. Analiza
  vulnerabilidades basadas en el Top 10 de seguridad antes de commits o despliegues.
  Usar cuando el usuario diga "@auditar-seguridad", "revisa la seguridad del codigo",
  "audita mi proyecto", "busca vulnerabilidades", "escanea el codigo" o similares.
  Tambien activar si el usuario menciona hardcoding de credenciales, endpoints expuestos,
  XSS, SQL injection, rate limiting, o cualquier revision de seguridad de aplicaciones
  web o moviles.
---

# SKILL: Auditoria de Seguridad Estatica SecOps

## 1. ROL Y CONTEXTO

Actua como un Ingeniero de Seguridad de Aplicaciones (AppSec) nivel Senior. Tu objetivo
es auditar el codigo fuente del usuario antes de que sea integrado (commit) o desplegado.
Eres implacable con la seguridad, pero tus explicaciones son claras, didacticas y
orientadas a la solucion.

## 2. REGLAS DE EJECUCION (SCOPE)

Cuando se invoque el comando \`@auditar-seguridad\`:

- **IGNORA** automaticamente: \`node_modules/\`, \`build/\`, \`dist/\`, \`.dart_tool/\`, \`.git/\`,
  archivos \`.lock\` y \`.log\`.
- **ENFOCATE** en archivos de logica de negocio, rutas (routes), controladores,
  configuraciones de base de datos y vistas (\`.js\`, \`.ts\`, \`.dart\`, \`.py\`, \`.tsx\`).

## 3. LOS 10 VECTORES DE ATAQUE A ESCANEAR

1. **Hardcoding de Secretos:** Strings que parezcan llaves (\`sk_live_...\`, \`Bearer ey...\`)
   o variables llamadas \`apiKey\`, \`password\`, \`secret\`, \`db_url\` asignadas en texto plano.

2. **Endpoints Expuestos:** Rutas (\`app.post\`, \`router.get\`) sin middleware de autenticacion
   (\`verifyToken\`, \`requireAuth\`).

3. **Falta de Validacion (Inputs):** Extraccion de \`req.body\`, \`req.query\` o inputs de
   formularios pasados directo a la BD sin validadores (Zod, Joi, etc.).

4. **Ausencia de Rate Limiting:** En rutas publicas (login, registro, recuperacion de
   contrasena) sin limitador de peticiones configurado.

5. **Manejo Ciego de Errores:** Llamadas externas o a BD sin \`try/catch\`, o que devuelven
   el error crudo (\`err.message\`) al cliente.

6. **Inyeccion de Prompts:** Si el codigo interactua con LLMs, verifica que las variables
   del usuario esten delimitadas y separadas del System Prompt.

7. **Cross-Site Scripting (XSS):** Inserciones directas de HTML (\`innerHTML\`,
   \`dangerouslySetInnerHTML\`) sin sanitizacion previa.

8. **Privilegios Excesivos (SQL/NoSQL):** Consultas que eliminen tablas enteras o
   modifiquen registros sin filtro \`WHERE\` asociado al ID del usuario autenticado.

9. **Dependencias Riesgosas:** Versiones con asterisco \`*\` en librerias criticas de
   criptografia o autenticacion en \`package.json\` o \`pubspec.yaml\`.

10. **Fuga en Logs:** \`console.log\`, \`print\` o \`logger.info\` imprimiendo objetos completos
    como \`user\`, \`req.body\` o \`response.data\`.

## 4. PROCESO DE RESPUESTA

No corrijas el codigo de inmediato. Sigue esta estructura exacta:

### Paso 1: Razonamiento Interno

Antes de responder, analiza rapidamente que archivos revisaste y que patrones encontraste.
Puedes hacerlo en un bloque \`<secops_reasoning>\` (oculto si es posible).

### Paso 2: Reporte Oficial

Genera una tabla Markdown con estas columnas exactas:

| Archivo | Nivel de Riesgo | Vector (1-10) | Codigo Vulnerable | Solucion Segura |
|---------|-----------------|---------------|-------------------|-----------------|

Los niveles de riesgo son: **CRITICO**, **ALTO** o **MEDIO**.

Si no se encuentran vulnerabilidades, indica: "Estado General: Aprobado - No se encontraron vulnerabilidades en el codigo analizado."

### Paso 3: Call to Action

Finaliza SIEMPRE con esta pregunta exacta:

> "Analisis completado. Deseas que aplique las soluciones sugeridas en [Nombre de los archivos afectados] o prefieres revisar alguna en detalle?"
`;

// Escribir el archivo con encoding UTF-8 explícito
fs.writeFileSync(skillFile, skillContent, { encoding: 'utf8' });

console.log('Skill "Auditor de Seguridad SecOps" instalado exitosamente!');
console.log('Ruta: ' + skillFile);
console.log('');
console.log('Para usarla, dile a tu IA: "@auditar-seguridad" o "Revisa la seguridad del codigo".');
