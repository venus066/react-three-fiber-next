# react-three-fiber-next

This is a batteries included template for using React Three Fiber (R3F) with NextJS 🔋. Based on [create-r3f-app](https://github.com/utsuboco/create-r3f-app).

### Lint and Code Formatting

If you use VSCode, Prettier should run each time you save a compatible file.

> If you don't like this, go to `.vscode\settings.json` and disable there (or you can do it via your own VSCode settings).

`yarn lint` runs ESLint and Prettier, automatically formats files and rewrites them. Make sure to stage your code before running just in case.

### Upgrading to latest

1. `yarn upgrade-interactive --latest`

> Please note that when you update a major version, you should check the dependency's documentation to see if there are any necessary changes to make to app or dependency API.

## How to use

### DOM vs react-three-fiber

When you create a new page, you don't need to wrap anything in a canvas. This automatically happens in the `_app.jsx` file.

Each page should export `<DOM />` and `<react-three-fiber />` components. DOM first, then react-three-fiber second. The components can be named anything, even be blank (like no DOM elements).

```tsx
// newPage.tsx

// DOM elements here
const DOM = () => {
  return (
    <>
      <h1>Hello world</h1>
    </>
  );
};

// Canvas/react-three-fiber components here
const react-three-fiber = () => {
  return (
    <>
      <Yourreact-three-fiberComponent />
      <ThreeDBox />
      <Sphere />
    </>
  );
};

export default function Page() {
  return (
    <>
      <DOM />
      <react-three-fiber react-three-fiber />
    </>
  );
}
```

### Page Titles

You can use `getStaticProps` to pass a `title` prop. This gets passed to the `<Header />` component, which adds it to the page title. The **page title** is combined with your **site title** in the `site.config.js` (e.g. `Page 1 - Website Name`).

```tsx
export async function getStaticProps() {
  return {
    props: {
      title: "Welcome!",
    },
  };
}
```

### Where is Canvas?

The `<Canvas>` is located in `src\components\layout\canvas.jsx`. You can add any components here you want to share across all scenes (like a similar camera, lighting, etc).

If you need to have a **separate canvas per page** for any reason, you can just remove it from `_app.js` and return the react-three-fiber child:

```tsx
// src\pages\_app.tsx
const AppLayout = ({ children }) => {
  const newChildren = React.Children.map(children, (child, index) =>
    // 👉 Remove the <Canvas> here (which I already did in this example)
    index % 2 === 0 ? <Dom>{child}</Dom> : <>{child}</>
  );

  return newChildren;
};
```

### Importing react-three-fiber components

The rule is: you have to dynamically import any React component that uses ThreeJS/react-three-fiber components if it's the **top-level component**. Once you dynamically import that React component -- it can contain other ThreeJS/react-three-fiber component without dynamic imports.

See the `/pages/` and `/components/canvas/` for examples.

### Importing media (audio, video, etc)

1. Place media in `/public/` folder.
1. Use a relative URL to your media (`yoursite.com/video.mp4` if it's in `public/video.mp4`).

## Snippets

This project features VSCode snippets for quickly creating react-three-fiber components and patterns. You can find them and add more in `.vscode\react-three-fiber.code-snippets`.

- `react-three-fiberc` - Create react-three-fiber mesh
- `react-three-fiberg` - Create react-three-fiber group
- `tsreact-three-fiberc` - Create react-three-fiber mesh (with Typescript)
- `tsreact-three-fiberg` - Create react-three-fiber group (with Typescript)

## Tips

### Syntax Highlighting for Shaders

When you browse the shaders (`.frag` and `.vert`) in VSCode, you should see a popup to install a plugin for highlighting.

There's a few, but we recommend [Shader languages support for VS Code](https://marketplace.visualstudio.com/items?itemName=slevesque.shader).

## Typescript Guide

Check out [our guide on using react-three-fiber with Typescript.](./docs/typescript.md) And try using [the Typescript snippets](#snippets) for faster workflows.
