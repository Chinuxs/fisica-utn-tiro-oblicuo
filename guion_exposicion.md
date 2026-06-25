# Guion de exposición - Tiro oblicuo y Cinemática

## 1. Introducción

Vamos a usar un modelo de tiro oblicuo para explicar conceptos básicos de Cinemática.

La Cinemática estudia el movimiento sin analizar sus causas. Describe cómo se mueve un cuerpo, pero no estudia todavía qué fuerzas producen ese movimiento.

En el simulador vemos una partícula, su posición, su velocidad, su aceleración y la trayectoria que describe.

---

## 2. Sistema de referencia

Para describir un movimiento necesitamos un sistema de referencia.

En este caso usamos un eje X horizontal, un eje Y vertical y un origen en el punto de lanzamiento.

Toda posición de la partícula se mide respecto de ese origen.

---

## 3. Posición

La posición indica dónde se encuentra la partícula en un instante determinado.

Se representa con el vector posición:

```math
\vec r(t)=x(t)\hat i+y(t)\hat j
```

El extremo del vector posición coincide con el punto que representa a la partícula.

---

## 4. Trayectoria

La trayectoria es el conjunto de puntos por los que pasa la partícula durante el movimiento.

En el tiro oblicuo, la trayectoria es parabólica.

---

## 5. Desplazamiento

El desplazamiento es el vector que une la posición inicial con la posición final.

No depende del camino recorrido, sino únicamente del punto inicial y del punto final.

---

## 6. Camino recorrido

El camino recorrido es la longitud total de la trayectoria.

Es una magnitud escalar.

No es lo mismo que el desplazamiento.

---

## 7. Velocidad

La velocidad indica cómo cambia la posición con el tiempo.

Es una magnitud vectorial: tiene módulo, dirección y sentido.

En el modelo, el vector velocidad está aplicado sobre la partícula y es tangente a la trayectoria.

```math
\vec v(t)=v_x(t)\hat i+v_y(t)\hat j
```

En el tiro oblicuo:

```math
v_x(t)=v_0\cos(\theta)
```

```math
v_y(t)=v_0\sin(\theta)-gt
```

La componente horizontal permanece constante y la vertical cambia por la gravedad.

---

## 8. Aceleración

La aceleración indica cómo cambia la velocidad con el tiempo.

En el tiro oblicuo ideal, despreciando el rozamiento del aire, la única aceleración es la gravedad.

```math
\vec a=-g\hat j
```

Apunta siempre verticalmente hacia abajo.

---

## 9. Independencia de movimientos

El movimiento horizontal y el movimiento vertical pueden estudiarse por separado.

En X hay MRU porque no hay aceleración horizontal.

En Y hay MRUV porque hay aceleración constante igual a la gravedad.

La combinación de ambos movimientos genera la parábola.

---

## 10. Cierre

El modelo permite visualizar posición, desplazamiento, trayectoria, camino recorrido, velocidad, aceleración e independencia de movimientos.

La idea principal es que el tiro oblicuo es la composición de un MRU horizontal y un MRUV vertical.
