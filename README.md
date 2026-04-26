# Notes App with Zustand

A simple notes app with Zustand that allows adding, editing, and deleting notes

## Tech stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)

## Project Structure

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── NoteModal.tsx
│   ├── NoteCard.tsx
│   └── NoteList.tsx
├── hooks/
│   └── useNoteModal.ts
├── store/
│   └── noteStore.ts
└── constants/
    └── colors.ts
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## License

MIT