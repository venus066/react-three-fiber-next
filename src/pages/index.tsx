import useStore from "@/helpers/store";
import dynamic from "next/dynamic";
import * as React from "react";
import {SkyBox} from "@/components/canvas/SkyBox";

// Prefer dynamic import for production builds
// But if you have issues and need to debug in local development
// comment these out and import above instead
// https://github.com/pmndrs/react-three-next/issues/49
const Shader = dynamic(
  () => import("@/components/canvas/ShaderExample/ShaderExample"),
  {
    ssr: false,
  }
);

// DOM elements here
const DOM = () => {
  return
    <></>;
};

// Canvas/R3F components here
const R3F = () => {
  // Example of using the router to change pages
  // It can also be inside R3F component (see `two.tsx` and `Box.tsx`)
  const { router } = useStore();
  const handleOnClick = () => {
    // router.push("/two");
  };

  return (
    <>
      <SkyBox />
      <Shader onClick={handleOnClick} />
    </>
  );
};

export default function Page() {
  return (
    <>
      <DOM />
      <R3F />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "next-react-three-fiber-typescript",
    },
  };
}
