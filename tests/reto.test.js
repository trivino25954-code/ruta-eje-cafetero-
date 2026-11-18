/*
 * RETO · Escribe AQUÍ tus propias pruebas para ordenarRutas(lista, criterio).
 * Mínimo 5 casos (ver RETO.md). Usa el patrón Preparar, Ejecutar, Verificar.
 *
 * Ejemplo de la forma de una prueba (bórralo o adáptalo):
 *
 *   test('describe lo que debe pasar', () => {
 *     // Preparar
 *     const lista = rutas;
 *     // Ejecutar
 *     const resultado = ordenarRutas(lista, 'precio');
 *     // Verificar
 *     assert.equal(resultado[0].precio, 0);
 *   });
 */
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { rutas } = require('../js/datos.js');
const { ordenarRutas } = require('../js/app.js');

describe('RETO · ordenarRutas(lista, criterio)', () => {
  test('Ordena por nombre de la A a la Z', () => {
    const preparacion = rutas;
    const resultado = ordenarRutas(preparacion, 'nombre');
    assert.equal(resultado[0].nombre, 'Ascenso al Nevado del Ruiz');
  });

  test('Ordena por precio de menor a mayor', () => {
    const preparacion = rutas;
    const resultado = ordenarRutas(preparacion, 'precio');
    assert.equal(resultado[0].precio, 0);
    assert.equal(resultado[resultado.length - 1].precio, 150000);
  });

  test('Ordena por duración de menor a mayor', () => {
    const preparacion = rutas;
    const resultado = ordenarRutas(preparacion, 'duracion');
    assert.equal(resultado[0].duracionHoras, 2);
  });

  test('No modifica el arreglo original', () => {
    const preparacion = rutas.slice();
    ordenarRutas(rutas, 'precio');
    assert.deepEqual(rutas.map((ruta) => ruta.id), preparacion.map((ruta) => ruta.id));
  });

  test('Un criterio desconocido devuelve una copia en el orden original', () => {
    const resultado = ordenarRutas(rutas, 'desconocido');
    assert.deepEqual(resultado.map((ruta) => ruta.id), rutas.map((ruta) => ruta.id));
    assert.notEqual(resultado, rutas);
  });

  test('Una lista vacía devuelve una lista vacía', () => {
    assert.deepEqual(ordenarRutas([], 'nombre'), []);
  });
});
