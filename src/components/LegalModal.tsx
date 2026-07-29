import { useEffect } from "react"
import { X } from "lucide-react"

// ─── CONTENIDOS LEGALES ──────────────────────────────────────────────────────

const PRIVACY_POLICY = `
## Política de Privacidad

**Última actualización:** Julio 2025

### 1. Responsable del tratamiento
Julia San José (en adelante, "la Titular"), con email de contacto juliasjl30@gmail.com, es la responsable del tratamiento de los datos personales recogidos a través de este sitio web.

### 2. Datos que se recopilan
Este sitio web puede recopilar los siguientes datos personales cuando el usuario establece contacto voluntariamente:
- Nombre y apellidos
- Dirección de correo electrónico
- Cualquier otro dato que el usuario facilite libremente en el mensaje de contacto

### 3. Finalidad del tratamiento
Los datos facilitados se utilizarán exclusivamente para:
- Responder a las consultas y comunicaciones enviadas por el usuario.
- Gestionar posibles oportunidades profesionales o colaboraciones.

### 4. Base jurídica
El tratamiento de los datos se realiza con base en el **consentimiento expreso** del usuario al enviar el formulario o contactar directamente (art. 6.1.a RGPD).

### 5. Conservación de los datos
Los datos se conservarán únicamente durante el tiempo necesario para atender la consulta y, en ningún caso, más de 1 año desde el último contacto.

### 6. Derechos del usuario
El usuario puede ejercer sus derechos de **acceso, rectificación, supresión, limitación, portabilidad y oposición** enviando un correo a juliasjl30@gmail.com.

### 7. Comunicación a terceros
Los datos personales no se cederán a terceros salvo obligación legal.

### 8. Cambios en la política
La Titular se reserva el derecho de modificar esta política. Los cambios serán publicados en esta misma página.
`

const LEGAL_NOTICE = `
## Aviso Legal

**En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE)**

### 1. Datos identificativos
- **Titular:** Julia San José
- **Denominación:** Portfolio profesional personal
- **Correo electrónico:** juliasjl30@gmail.com

### 2. Objeto y ámbito de aplicación
El presente Aviso Legal regula el acceso y uso del sitio web (en adelante, "la Web") titularidad de Julia San José, cuya finalidad es la presentación de su perfil y actividad profesional como desarrolladora web.

### 3. Propiedad intelectual e industrial
Todos los contenidos de la Web (textos, imágenes, diseños, código fuente, logotipos y demás elementos) son propiedad de la Titular o de terceros que han autorizado su uso, y están protegidos por las leyes de Propiedad Intelectual e Industrial.

Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación de los contenidos sin autorización previa y por escrito de la Titular.

### 4. Responsabilidad
La Titular no se hace responsable de los daños que pudieran derivarse del uso incorrecto de la Web, ni de los contenidos o servicios de sitios web de terceros accesibles mediante enlaces.

### 5. Legislación aplicable y jurisdicción
Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio de la Titular.
`

const COOKIE_POLICY = `
## Política de Cookies

**Última actualización:** Julio 2025

### ¿Qué son las cookies?
Las cookies son pequeños archivos de texto que los sitios web almacenan en el navegador del usuario para recordar preferencias y mejorar la experiencia de navegación.

### Cookies utilizadas en este sitio web
Este sitio web utiliza únicamente **cookies técnicas o esenciales**, necesarias para el correcto funcionamiento de la web. No se utilizan cookies de seguimiento, analíticas o publicitarias de terceros.

| Tipo | Nombre | Finalidad | Duración |
|------|--------|-----------|----------|
| Técnica | Preferencia de tema (dark/light) | Recordar la preferencia visual del usuario | Sesión |

### Cookies de terceros
En la actualidad, este sitio web **no instala cookies de terceros** (Google Analytics, redes publicitarias, etc.).

### ¿Cómo deshabilitar las cookies?
El usuario puede deshabilitar o eliminar las cookies desde la configuración de su navegador:
- **Chrome:** Ajustes > Privacidad y seguridad > Cookies
- **Firefox:** Opciones > Privacidad y seguridad
- **Safari:** Preferencias > Privacidad
- **Edge:** Configuración > Privacidad, búsqueda y servicios

Tenga en cuenta que deshabilitar las cookies técnicas puede afectar al correcto funcionamiento del sitio.

### Actualizaciones de esta política
Esta política puede ser actualizada si se incorporan nuevas funcionalidades que impliquen el uso de cookies. Se recomienda revisarla periódicamente.
`

// TIPOS

export type LegalType = "privacy" | "legal" | "cookies"

interface LegalModalProps {
  type: LegalType | null
  onClose: () => void
}

const MODAL_CONFIG: Record<LegalType, { title: string; content: string }> = {
  privacy: { title: "Política de Privacidad", content: PRIVACY_POLICY },
  legal:   { title: "Aviso Legal",            content: LEGAL_NOTICE   },
  cookies: { title: "Política de Cookies",    content: COOKIE_POLICY  },
}

// RENDER SIMPLE DE MARKDOWN
// (sin librería externa, interpretamos los patrones manualmente)

function renderMarkdown(text: string) {
  const lines = text.trim().split("\n")
  const elements: React.ReactNode[] = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-2xl font-black mb-6 text-gradient-lilac">
          {line.replace("## ", "")}
        </h2>
      )
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-base font-bold mt-6 mb-2" style={{ color: "var(--fg)" }}>
          {line.replace("### ", "")}
        </h3>
      )
    } else if (line.startsWith("| ")) {
      // Tabla markdown simple
      const rows: string[][] = []
      while (i < lines.length && lines[i].startsWith("| ")) {
        if (!lines[i].includes("---")) {
          rows.push(lines[i].split("|").filter(Boolean).map(c => c.trim()))
        }
        i++
      }
      i-- // volver un paso atrás
      elements.push(
        <div key={key++} className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {rows[0]?.map((cell, ci) => (
                  <th key={ci} className="text-left px-3 py-2 border-b border-lilac-600/20 font-bold" style={{ color: "var(--fg)" }}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} className="border-b border-lilac-600/10">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2" style={{ color: "var(--fg-muted)" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else if (line.startsWith("- ")) {
      // Lista: agrupamos ítems consecutivos
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].replace("- ", ""))
        i++
      }
      i--
      elements.push(
        <ul key={key++} className="list-disc pl-5 space-y-1 my-2" style={{ color: "var(--fg-muted)" }}>
          {items.map((item, ii) => (
            <li key={ii} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong style='color:var(--fg)'>$1</strong>") }} />
          ))}
        </ul>
      )
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-2" />)
    } else {
      elements.push(
        <p
          key={key++}
          className="text-sm leading-relaxed"
          style={{ color: "var(--fg-muted)" }}
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.*?)\*\*/g, "<strong style='color:var(--fg)'>$1</strong>")
              .replace(/_(.*?)_/g, "<em>$1</em>"),
          }}
        />
      )
    }
  }

  return elements
}

// COMPONENTE MODAL

export default function LegalModal({ type, onClose }: LegalModalProps) {
  // Cerrar con Escape
  useEffect(() => {
    if (!type) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [type, onClose])

  if (!type) return null

  const { title, content } = MODAL_CONFIG[type]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Overlay oscuro */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel del modal */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-lilac-600/20 shadow-2xl shadow-lilac-500/10 overflow-hidden"
        style={{ backgroundColor: "var(--surface)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-lilac-600/15 shrink-0"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <h2 className="text-lg font-bold" style={{ color: "var(--fg)" }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-lilac-600/20 text-lilac-400 hover:text-lilac-200 hover:border-lilac-500/50 hover:bg-lilac-500/10 transition-all duration-200 cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido scrollable */}
        <div className="overflow-y-auto px-6 py-6 space-y-1 flex-1 scrollbar-thin">
          {renderMarkdown(content)}
        </div>

        {/* Footer del modal */}
        <div
          className="shrink-0 px-6 py-4 border-t border-lilac-600/15 flex justify-end"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-sm font-semibold bg-lilac-600 hover:bg-lilac-500 text-white transition-all duration-200 hover:shadow-[0_0_16px_rgba(139,92,246,0.4)] cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}
