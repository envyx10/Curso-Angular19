# Apuntes de Angular Renaissance Workshop

## Índice
1. [Componentes en Angular](#componentes-en-angular)
   1. [Definición de un Componente](#definición-de-un-componente)
   2. [Creación de un Componente](#creación-de-un-componente)
   3. [Decorador @Component](#decorador-component)
   4. [Propiedades del Decorador](#propiedades-del-decorador)
   5. [Primeros Pasos](#primeros-pasos)
   6. [Importar Componentes](#importar-componentes)
   7. [Interpolación](#interpolación)
   8. [Property Binding](#property-binding)
   9. [Ejemplo Completo](#ejemplo-completo)
   10. [Comunicación entre Componentes](#comunicación-entre-componentes)

## Componentes en Angular

### Definición de un Componente

Un componente en Angular se define utilizando el decorador `@Component`. Aquí tienes un ejemplo básico:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-renaissance-workshop';
}
```

En este ejemplo, `AppComponent` es un componente básico con un selector `app-root`, una plantilla HTML y un archivo de estilos.

### Creación de un Componente

Para crear un componente, puedes usar el comando Angular CLI:

```bash
ng g c components/hero-item
```

Este comando genera un nuevo componente llamado `HeroItemComponent` en la carpeta `components`.

### Decorador @Component

El decorador `@Component` es propio de Angular y se utiliza para definir un componente. Recibe un objeto con diferentes propiedades:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent {
  // Lógica del componente
}
```

### Propiedades del Decorador

- **selector**: El nombre del selector que se utilizará en el HTML para invocar este componente.
- **templateUrl**: La ruta del archivo HTML que define la vista del componente.
- **styleUrls**: La ruta del archivo SCSS que define los estilos del componente.
- **imports**: Aquí se ponen las dependencias que vamos a necesitar, como módulos o componentes.

### Primeros Pasos

Para empezar a usar tu nuevo componente, ve a `app.component.html` y elimina el código existente. Luego, invoca el componente que deseas ver utilizando su selector. Por ejemplo:

```html
<app-hero-item></app-hero-item>
```

Esto requiere volver a ejecutar `ng serve`. Si usas `ng serve -o`, se abrirá el navegador automáticamente.

### Importar Componentes

Es importante importar el componente en el módulo principal o en el componente que lo va a utilizar. Por ejemplo, en `app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { HeroItemComponent } from './components/hero-item/hero-item.component';

@Component({
  selector: 'app-root',
  imports: [HeroItemComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-renaissance-workshop';
}
```

### Interpolación

La interpolación se utiliza para mostrar datos del componente en el HTML. Por ejemplo, para mostrar el nombre de un héroe:

```html
{{ hero.name }}
```

Esto bindea el contenido de nuestro componente `HeroItemComponent` al HTML. Aquí tienes un ejemplo del componente:

```typescript
import { Component } from '@angular/core';
import { Hero } from '../../shared/interfaces/Hero.interface';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent {
  hero: Hero = {
    id: 620,
    name: 'Spider-Man',
    powerstats: {
      intelligence: 90,
      strength: 55,
      speed: 67,
      durability: 75,
      power: 74,
      combat: 85
    },
    image: 'https://www.superherodb.com/pictures2/portraits/10/100/133.jpg',
    alignment: 'good',
    description: ''
  };
}
```

### Property Binding

En lugar de usar interpolación, podemos usar property binding para enlazar propiedades del componente a atributos del HTML. Por ejemplo, para enlazar la propiedad `hero.image` a la fuente de una imagen:

```html
<div class="image">
  <img [src]="hero.image" alt="Hero Image">
</div>
```

Esto asegura que la imagen mostrada en el HTML esté siempre sincronizada con la propiedad `hero.image` del componente.

### Ejemplo Completo

Aquí tienes un ejemplo completo de cómo se vería el componente `HeroItemComponent` con interpolación y property binding:

```typescript
import { Component } from '@angular/core';
import { Hero } from '../../shared/interfaces/Hero.interface';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent {
  hero: Hero = {
    id: 620,
    name: 'Spider-Man',
    powerstats: {
      intelligence: 90,
      strength: 55,
      speed: 67,
      durability: 75,
      power: 74,
      combat: 85
    },
    image: 'https://www.superherodb.com/pictures2/portraits/10/100/133.jpg',
    alignment: 'good',
    description: ''
  };
}
```

```html
<div class="hero-item">
  <div class="hero-image">
    <div class="image">
      <img [src]="hero.image" alt="Hero Image">
    </div>
    <div class="details">
      {{ hero.name }}
    </div>
  </div>
</div>
```

# Angular 19 - Signals, Pipes y Control de Listas


# 📌 Comunicación entre Componentes en Angular 19

En Angular 19, la comunicación entre componentes es más eficiente gracias al uso de **signals** y nuevas directivas.  

## 🔄 Comunicación entre Padre e Hijo  

La comunicación entre componentes padre e hijo se realiza principalmente mediante **`@Input`** y **`@Output`**.  

### 📥 `@Input` con Signals  

Desde Angular 17, `@Input` puede trabajar con **signals**, lo que mejora la reactividad y evita problemas de inmutabilidad.  

Ejemplo de `@Input` con signals y tipado:

```typescript
import { Component, input } from '@angular/core';
import { Hero } from '../../shared/interfaces/Hero.interface';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent {
  hero = input.required<Hero>();
}
```

## 🛠️ Modificación de Propiedades

Antes, se podía acceder a las propiedades de hero directamente:

isHeroVillain = this.hero.alignment === 'bad'; // ❌ Esto ahora dará error

Con signals, hero se comporta como una función, por lo que debemos llamarla:

isHeroVillain = this.hero().alignment === 'bad'; // ✅ Corrección


## ⚡ Uso de Signals y computed()

En Angular 19, podemos usar computed() para generar una signal derivada. Esto permite optimizar la actualización de valores sin necesidad de mutar el estado original.

Ejemplo de uso de computed():

```typescript
import { Component, input, computed } from '@angular/core';
import { Hero } from '../../shared/interfaces/Hero.interface';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent {
  hero = input.required<Hero>();

  isHeroVillain = computed(() => this.hero().alignment === 'bad');
}

```

Aquí, isHeroVillain se recalcula automáticamente cuando hero cambia.

## 🛠️ Pipes en Angular 19
🔑 keyvalue

El pipe ``keyvalue`` nos permite iterar sobre objetos y obtener sus claves y valores fácilmente en una plantilla.

<ul>
  @for (item of objeto | keyvalue; track item.key) {
    <li>{{ item.key }}: {{ item.value }}</li>
  }
</ul>

🔠 titlecase
Si queremos convertir la primera letra de cada palabra en mayúscula, usamos el pipe | ``titlecase``

<p>{{ 'angular es genial' | titlecase }}</p>
<!-- Salida: Angular Es Genial -->


🔄 Bucles en Angular 19
Angular 19 introduce la nueva directiva ``@for``, reemplazando ``*ngFor``.

<ul>
  @for (item of lista; track item.id) {
    <li>{{ item.nombre }}</li>
  }
@empty {
    <li>No hay elementos disponibles</li>
  }
</ul>

``@for`` reemplaza ``*ngFor`` y permite una sintaxis más eficiente.
track item.id optimiza la renderización al hacer seguimiento de cambios en la lista.

``@empty`` se usa cuando la lista está vacía, permitiendo mostrar un mensaje personalizado.


Formularios


inject()
readonly #formBuilder = inject(FormBuilder)
patron builder

ReactiveFormsModule
ngSubmit
