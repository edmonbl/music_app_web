# Music Player App 🎵# Angular Music Player App



Una aplicación de reproductor de música moderna construida con **Angular 20** e integrada con la **API de Spotify**.A modern, symmetrical square music player built with Angular 20, featuring a beautiful grey-blue aesthetic and responsive design.



![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=flat&logo=angular)## Features

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)

![Spotify API](https://img.shields.io/badge/Spotify-API-1DB954?style=flat&logo=spotify)🎵 **Modern Design**: Symmetrical 600x600px square layout with glass morphism effects  

🎛️ **Queue Panel**: Interactive queue with album art thumbnails  

## ✨ Características🎮 **Player Controls**: Play/pause, next/previous, progress bar, and volume control  

🎨 **Animations**: Rotating vinyl effect and smooth transitions  

- 🎧 **Búsqueda de canciones** - Busca cualquier canción de Spotify📱 **Responsive**: Adapts to different screen sizes while maintaining square aspect ratio  

- 🎵 **Reproducción de audio** - Reproduce previews de 30 segundos🔊 **Audio Service**: Reactive audio management with RxJS observables  

- 📋 **Cola de reproducción** - Administra tu lista de canciones

- ⏭️ **Controles de reproducción** - Play, Pause, Next, Previous## Development Server

- 🔊 **Control de volumen** - Ajusta el volumen a tu gusto

- 📊 **Progreso de reproducción** - Visualiza y controla el progresoTo start a local development server, run:

- 🎨 **Diseño moderno** - UI elegante con efectos glassmorphism

```bash

## 🚀 Instalación y Configuraciónng serve

```

### 1. Clonar e instalar

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

```bash

git clone https://github.com/edmonbl/music_app_web.git## Code scaffolding

cd music_app_web

npm installAngular CLI includes powerful code scaffolding tools. To generate a new component, run:

```

```bash

### 2. Configurar Spotify APIng generate component component-name

```

1. Ve a [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

2. Crea una nueva aplicaciónFor a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

3. Copia tu Client ID y Client Secret

4. Crea `src/app/config/spotify.config.ts`:```bash

ng generate --help

```typescript```

export const spotifyConfig = {

  clientId: 'TU_CLIENT_ID_AQUI',## Building

  clientSecret: 'TU_CLIENT_SECRET_AQUI'

};To build the project run:

```

```bash

### 3. Iniciar el servidorng build

```

```bash

ng serve --host 127.0.0.1 --port 4200This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

```

## Running unit tests

Abre `http://127.0.0.1:4200/` en tu navegador.

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

## 📁 Estructura del Proyecto

```bash

```ng test

src/```

├── app/

│   ├── components/## Running end-to-end tests

│   │   ├── music-player/       # Reproductor principal

│   │   ├── queue-panel/        # Panel de colaFor end-to-end (e2e) testing, run:

│   │   └── spotify-search/     # Búsqueda de Spotify

│   ├── services/```bash

│   │   ├── audio.ts           # Reproducción de audiong e2e

│   │   ├── playlist.ts        # Gestión de playlist```

│   │   └── spotify.ts         # API de Spotify

│   └── models/                # Modelos TypeScriptAngular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

```

## Additional Resources

## 🎮 Uso

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

- **Buscar**: Escribe el nombre de una canción o artista
- **Reproducir**: Haz clic en una canción para reproducirla
- **Controles**: Usa los botones de play/pause, next, previous
- **Cola**: Haz clic en **+** para agregar canciones sin reproducir

## ⚠️ Limitaciones

- Previews de 30 segundos (limitación de Spotify API)
- No todas las canciones tienen preview disponible
- Requiere conexión a internet

## 👨‍💻 Autor

**Eduardo M.N.** - [@edmonbl](https://github.com/edmonbl)
