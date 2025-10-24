# Spotify API Configuration

## Cómo obtener tus credenciales de Spotify:

1. Ve a https://developer.spotify.com/dashboard
2. Inicia sesión con tu cuenta de Spotify
3. Haz clic en "Create an App"
4. Rellena el formulario:
   - App Name: Music Player App
   - App Description: Angular music player with Spotify integration
5. Acepta los términos y condiciones
6. Haz clic en "Create"
7. Verás tu **Client ID** y **Client Secret** en el dashboard

## Configurar las credenciales:

Abre el archivo `src/app/services/spotify.ts` y reemplaza:

```typescript
private clientId = 'YOUR_SPOTIFY_CLIENT_ID';
private clientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET';
```

Con tus credenciales reales:

```typescript
private clientId = 'tu_client_id_aqui';
private clientSecret = 'tu_client_secret_aqui';
```

## IMPORTANTE:
- NO subas estas credenciales a un repositorio público
- Considera usar variables de entorno para producción
- Las credenciales deben mantenerse seguras

## Funcionalidades disponibles:

- ✅ Buscar canciones por nombre
- ✅ Obtener recomendaciones personalizadas
- ✅ Ver playlists de Spotify
- ✅ Reproducir previews de 30 segundos (API limitation)
- ✅ Agregar canciones a la cola

## Limitaciones:

- Solo se pueden reproducir previews de 30 segundos (limitación de la API de Spotify)
- Requiere conexión a internet
- Rate limits aplican según el plan de Spotify Developer
