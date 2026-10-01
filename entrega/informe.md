---
title: "Maquetación de Pantalla: Nuevo Producto"
subtitle: "Proyecto Recurrly — Expo SDK 54, React Native, TypeScript"
author:
  - "Nombre: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_"
  - "Carnet: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_"
  - "Curso: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_"
date: "1 de octubre de 2026"
geometry: margin=2.5cm
fontsize: 12pt
---

\newpage

## Resumen técnico

Se codificó la pantalla de creación de productos en
`app/(protected)/create-product.tsx`. La pantalla se compone de:

**Header de navegación.** Botón de retroceso (`arrow-back-outline`) que regresa
al Dashboard mediante `router.replace('/dashboard')`, con títulos jerárquicos
"ADMIN PORTAL" y "Nuevo Producto" más un ícono de cubo en círculo.

**Tarjeta 1 — Información General.** Input de nombre del producto
(`placeholder: "Ej. Zapato Nike"`), selector estilizado de categoría con ícono
`chevron-down`, input de "SKU / Código de Barra" con ícono `barcode-scan` como
prefijo, y área de texto multilínea (`multiline`, `textAlignVertical: 'top'`)
para la descripción detallada con contador dinámico de caracteres en tiempo real
(`{descripcion.length}/2000`, `maxLength={2000}`).

**Tarjeta 2 — Precios e Inventario.** Dos filas de dos columnas (`rowCols` con
`flexDirection: 'row'` y `gap: 8`; cada columna con `flex: 1`). Precio regular y
precio de oferta integran el símbolo `$` dentro del contenedor del input
(`inputPriceWrapper`, fila con `alignItems: 'center'`). Stock inicial y stock
mínimo usan inputs numéricos sin prefijo monetario. Todos los inputs numéricos
usan `keyboardType="numeric"`.

**Botón de acción.** `TouchableOpacity` "Guardar producto" con el color de marca
`#006C47`, ícono de confirmación `checkmark-outline` (Ionicons) y texto blanco.

**Scroll y teclado.** La pantalla está contenida en `SafeAreaView`,
`KeyboardAvoidingView` (`padding` en iOS, `height` en Android) y `ScrollView`,
por lo que el contenido es desplazable y no se oculta al abrir el teclado.

Validación: `npm run typecheck` sin errores; `npx expo config --type public`
correcto. La pantalla fue verificada en ejecución en un emulador Android
(Pixel 7, Expo Go SDK 54) contra el servidor de desarrollo `npx expo start`.

\newpage

## Evidencia de ejecución

Captura de pantalla completa del escritorio (sin recortes) mostrando
simultáneamente:

1. **Emulador Android (Pixel 7)** ejecutando la pantalla Nuevo Producto con las
   tarjetas Información General y Precios e Inventario y el botón Guardar
   producto.
2. **IDE (VS Code)** con el archivo `app/(protected)/create-product.tsx` abierto
   y visible en el editor.
3. **Terminal** con el servidor de desarrollo de Expo (`npx expo start`) activo
   y sin errores en consola.

\vspace{1cm}

\begin{center}
\fbox{\parbox[c][14cm][c]{0.9\textwidth}{\centering
\textit{Insertar captura de pantalla completa del escritorio aquí}\\[0.4cm]
(emulador + VS Code + terminal de Expo)}}
\end{center}
