# Recurrly Agent Instructions

Recurrly is an Expo SDK 54 React Native application using TypeScript, Expo Router, NativeWind, Clerk, PostHog, and EAS.

## Development rules

- Keep route components inside `app/` and reusable UI inside `components/`.
- Use NativeWind classes for styling unless a platform-specific style requires `StyleSheet`.
- Keep Clerk publishable keys and PostHog configuration in environment variables; never commit secrets.
- Use `EXPO_PUBLIC_` only for values that are safe to expose in the client bundle.
- Keep EAS build configuration in `eas.json` and app metadata in `app.json`.
- Read the exact versioned Expo SDK 54 documentation at https://docs.expo.dev/versions/v54.0.0/ before changing Expo or React Native configuration.
- Prefer Expo-compatible package versions installed through `npx expo install`.

## Validation

Run these checks before handing off changes:

```bash
npm run typecheck
npx expo config --type public
```

When changing native configuration or dependencies, also run an appropriate EAS or platform build check.
