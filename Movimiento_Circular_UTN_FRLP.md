# Movimiento Circular - Cheat Sheet UTN FRLP

> Resumen de 15 minutos antes del parcial.

---

# 1. Conceptos básicos

## Velocidad angular

$$
\omega = \frac{\Delta \theta}{\Delta t}
$$

Unidad:

```text
rad/s
```

---

## Frecuencia y período

$$
f=\frac{1}{T}
$$

$$
\omega=2\pi f
$$

$$
\omega=\frac{2\pi}{T}
$$

---

## Relación lineal-angular

$$
v=\omega R
$$

---

# 2. Aceleraciones

## Aceleración centrípeta (radial)

$$
a_c=\frac{v^2}{R}
$$

o

$$
a_c=\omega^2 R
$$

### Características

* Siempre apunta hacia el centro.
* Cambia la dirección de la velocidad.
* Existe aunque la rapidez sea constante.

---

## Aceleración tangencial

$$
a_t=\alpha R
$$

### Características

* Tangente a la trayectoria.
* Cambia el módulo de la velocidad.

---

## Aceleración total

$$
a=\sqrt{a_c^2+a_t^2}
$$

---

# 3. MCU

Movimiento Circular Uniforme.

Condiciones:

```text
v = constante
ω = constante
α = 0
at = 0
ac ≠ 0
```

Pregunta típica:

> ¿Qué movimiento resulta cuando ac ≠ 0 y at = 0?

Respuesta:

```text
Movimiento Circular Uniforme.
```

---

# 4. MCUV

Movimiento Circular Uniformemente Variado.

$$
\omega=\omega_0+\alpha t
$$

$$
\theta=\theta_0+\omega_0t+\frac12\alpha t^2
$$

$$
\omega^2=\omega_0^2+2\alpha\Delta\theta
$$

---

# 5. Regla de oro

## NO EXISTE la fuerza centrípeta

La fuerza centrípeta es la resultante radial.

Siempre:

$$
\sum F_r = m\frac{v^2}{R}
$$

La fuerza que genera la centrípeta puede ser:

* Tensión
* Normal
* Rozamiento
* Peso
* Combinación de varias

---

# 6. Péndulo cónico

## Ecuación vertical

$$
T\cos\theta = mg
$$

## Ecuación horizontal

$$
T\sin\theta = m\frac{v^2}{R}
$$

## Radio

$$
R=L\sin\theta
$$

## Fórmula útil

$$
\tan\theta=\frac{v^2}{Rg}
$$

---

# 7. Curva plana con roce

## Fuerza centrípeta

$$
F_r=\mu N
$$

Como:

$$
N=mg
$$

queda:

$$
\mu mg = m\frac{v^2}{R}
$$

## Velocidad máxima

$$
v=\sqrt{\mu gR}
$$

---

# 8. Curva peraltada

## Fórmula clave

$$
\tan\alpha=\frac{v^2}{Rg}
$$

Despejes útiles:

$$
v=\sqrt{Rg\tan\alpha}
$$

$$
R=\frac{v^2}{g\tan\alpha}
$$

---

# 9. Loop vertical

## Punto más bajo

$$
N-mg=m\frac{v^2}{R}
$$

---

## Punto más alto

$$
N+mg=m\frac{v^2}{R}
$$

---

## Velocidad mínima para no perder contacto

En el punto más alto:

$$
N=0
$$

Entonces:

$$
mg=m\frac{v^2}{R}
$$

$$
v=\sqrt{gR}
$$

---

# 10. Método para resolver cualquier ejercicio

## Paso 1

DCL (Diagrama de Cuerpo Libre)

---

## Paso 2

Marcar centro de giro.

---

## Paso 3

Elegir ejes:

* radial
* tangencial

---

## Paso 4

Aplicar:

$$
\sum F_r=m\frac{v^2}{R}
$$

---

## Paso 5

Aplicar:

$$
\sum F_t=ma_t
$$

---

# 11. Preguntas teóricas frecuentes

## Posición vs desplazamiento

Posición:

* ubicación respecto a un sistema de referencia.

Desplazamiento:

* vector que une posición inicial y final.

---

## Rapidez vs velocidad

Rapidez:

* escalar.

Velocidad:

* vector.

---

## Primera Ley de Newton

Si la resultante de fuerzas es cero, el cuerpo permanece en reposo o MRU.

---

## Segunda Ley de Newton

$$
\sum F = ma
$$

---

## Tercera Ley de Newton

A toda acción corresponde una reacción de igual módulo, misma dirección y sentido contrario.

---

## Independencia de movimientos

Los movimientos en ejes perpendiculares son independientes.

Base del tiro oblicuo.

---

# 12. Errores que hacen perder puntos

❌ Inventar una fuerza centrípeta.

❌ Olvidar convertir rpm a rad/s.

$$
\omega=rpm\cdot\frac{2\pi}{60}
$$

❌ Confundir:

$$
a_t
$$

con

$$
a_c
$$

❌ No dibujar el DCL.

❌ No indicar sentido de la aceleración centrípeta.

---

# Checklist antes de entregar

* [ ] Hice el DCL.
* [ ] Marqué el centro.
* [ ] Elegí eje radial.
* [ ] Elegí eje tangencial.
* [ ] Apliqué Newton.
* [ ] Revisé unidades.
* [ ] Respondí con módulo y dirección si lo piden.
