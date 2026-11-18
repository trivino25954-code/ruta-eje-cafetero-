# Mis aprendizajes · Rutas del Eje

> Las pruebas automáticas dicen si tu código **funciona**. Este archivo muestra si **entiendes por qué funciona**.
> Responde con tus palabras, en 2 a 5 líneas por pregunta. No copies la documentación: explícala.
> En cada issue anota también **qué consultaste** (enlace) y **qué encontraste ahí**.
>
> Este archivo forma parte de la calificación del reto (criterio *Comprensión*).

**Aprendiz:** Juan Manuel Cobo Triviño

---

## Issue #1 · G1 Guía de estilo

**Consulté:** MDN sobre propiedades personalizadas, Bootstrap sobre variables CSS y botones, y WebAIM Contrast Checker. Aprendí a declarar tokens reutilizables y comprobar que el texto cumpla WCAG.

1. **Explica:** ¿qué ventaja tiene escribir los colores como variables en `:root` en vez de escribir el hex directamente en cada regla?
   Las variables permiten conservar una única fuente de verdad. Si cambio `--eje-primario`, todos los componentes que lo usan pueden actualizarse sin buscar y reemplazar cada valor hexadecimal.

2. **Experimenta y explica:** en DevTools selecciona el botón "Ver rutas", pestaña *Computed* (o *Calculado*) y busca `--bs-btn-bg`. ¿De dónde sale su valor? ¿Por qué cambiar `--bs-primary` no habría cambiado el color del botón?
   `--bs-btn-bg` toma su valor de `--eje-primario` mediante la regla `.btn-primary` de nuestro CSS. Bootstrap tiene variables propias para cada tipo de botón, por eso cambiar solamente `--bs-primary` no garantiza el cambio.

3. **¿Qué pasaría si…** enlazas `estilos.css` ANTES de `bootstrap.min.css` en el `<head>`? Pruébalo, describe lo que ves y vuelve a dejarlo como estaba.
   La hoja de Bootstrap se cargaría después y podría sobrescribir las personalizaciones de `.btn-primary` y las variables. Por eso `estilos.css` debe cargarse al final, como ocurre ahora, para que nuestras reglas tengan prioridad.

---

## Issue #2 · G2 Componentes

**Consulté:** la documentación de Bootstrap sobre navbar responsive y button groups, además de MDN sobre `aria-pressed` y atributos `data-*`. Aprendí a asociar el botón con el contenido que controla y a marcar visual y semánticamente el estado activo.

1. **Explica:** ¿qué relación hay entre `data-bs-target="#menu"` en el botón y el `id="menu"` del div? ¿Quién lee ese atributo?
   Ambos usan el mismo selector: `data-bs-target="#menu"` indica el elemento cuyo id es `menu`, y Bootstrap JavaScript lee ese atributo para abrirlo o cerrarlo.

2. **Experimenta:** abre y cierra el menú en un ancho de celular y observa en DevTools el atributo `aria-expanded` del botón. ¿Qué pasa con su valor? ¿Para quién es útil esa información?
   El valor cambia de `false` a `true` cuando el menú está abierto y vuelve a `false` al cerrarse. Es útil para lectores de pantalla y otras tecnologías de asistencia, porque comunican si el control desplegable está expandido.

3. **¿Qué pasaría si…** en un botón de filtro escribes `data-tipo="café"` (con tilde)? Piensa en lo que hay en `datos.js` antes de responder.
   El filtro no coincidiría correctamente con las rutas cuyo campo `tipo` es `cafe`, porque el valor incluiría una tilde. Los identificadores deben conservar exactamente el mismo texto que el dato de JavaScript.

---

## Issue #3 · G3 Datos → tarjetas

**Consulté:** MDN sobre template literals, `map()`, `join()`, `innerHTML` y el resumen de métodos de arrays de javascript.info. Aprendí que el HTML puede construirse dinámicamente a partir de un arreglo de objetos.

1. **Predice y comprueba:** antes de ejecutarlas en la consola del navegador, escribe qué crees que devuelve cada línea. Después ejecútalas y anota el resultado real.
   ```js
   [1, 2, 3].map((n) => n * 10)
   ['a', 'b', 'c'].join('')
   ['a', 'b', 'c'].join(' - ')
   rutas.map((r) => r.nombre).length
   ```
   | Línea | Mi predicción | Resultado real |
   |---|---|---|
   | 1 | ` [10, 20, 30] ` | `[10, 20, 30]` |
   | 2 | ` abc ` | `abc` |
   | 3 | ` a - b - c ` | `a - b - c` |
   | 4 | `11` | `11` |

2. **Experimenta y explica:** quita temporalmente `.join('')` de `pintarRutas`. ¿Qué aparece entre las tarjetas y por qué? (Pista: ¿qué hace `innerHTML` cuando le asignas un arreglo?). Vuelve a ponerlo.
   Si se asigna el arreglo directamente a `innerHTML`, JavaScript puede convertir sus elementos separándolos por comas. Por eso `join('')` transforma el arreglo en un único HTML sin caracteres de separación.

3. **Explica:** ¿por qué la tarjeta se escribe con comillas invertidas `` ` `` y no con comillas simples `' '`? ¿Qué hace `${ }`?
   Las comillas invertidas permiten crear template literals en varias líneas. `${ruta.nombre}` ejecuta la expresión y inserta el valor correspondiente dentro del texto HTML.

---

## Issue #4 · G4 Filtros y eventos

**Consulté:** MDN sobre `filter()`, funciones flecha, `includes()`, `addEventListener()`, eventos `input`, `dataset` y `aria-live`. Aprendí a encadenar filtros sin modificar los datos originales y a anunciar cambios de contenido.

1. **Predice y comprueba:** después de ejecutar `filtrarPorTipo(rutas, 'cafe')` en la consola, ¿cuánto vale `rutas.length`? ¿Por qué?
   `rutas.length` sigue siendo 11. `filter()` crea un arreglo nuevo con los elementos que cumplen la condición y no elimina ni modifica elementos del arreglo original.

2. **Explica el recorrido:** describe paso a paso qué pasa desde que la persona hace clic en el botón "Cultura" hasta que aparecen las tarjetas nuevas. Menciona: el evento, `estado`, `aplicarFiltros()`, `filtrarPorTipo()` y `pintarRutas()`.
   El `click` ejecuta su listener y guarda `cultura` en `estado.tipo`. Luego llama a `aplicarFiltros()`, que usa `filtrarPorTipo()` para crear un arreglo solo con rutas culturales y `buscarPorTexto()` para aplicar también el texto. Finalmente, `pintarRutas()` sustituye las tarjetas anteriores por las tarjetas obtenidas y actualiza el mensaje.

3. **¿Qué pasaría si…** usas el evento `'change'` en lugar de `'input'` en el buscador? Pruébalo y describe la diferencia.
   `input` filtra en cada pulsación o modificación del campo. `change` normalmente espera a que el valor pierda el foco o se confirme, por eso la actualización sería menos inmediata y la búsqueda sentiría menos fluida.

---

## Reto · Ordenar rutas

**Consulté:** _enlace(s)_ → _qué encontré_

1. **Explica:** ¿por qué `ordenarRutas` hace `const copia = [...lista]` antes de `sort()`? ¿Qué le pasaría a `rutas` si no se copia? ¿Qué prueba tuya lo demuestra?
   _Tu respuesta_

2. **Explica:** en `copia.sort((a, b) => a.precio - b.precio)`, ¿qué significa que la función devuelva un número negativo, cero o positivo?
   _Tu respuesta_

3. **Tus pruebas:** elige una de tus pruebas y explica qué error de programación detectaría si alguien dañara la función.
   _Tu respuesta_
