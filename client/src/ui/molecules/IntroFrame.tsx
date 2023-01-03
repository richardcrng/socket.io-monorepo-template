import { Image } from "@mantine/core";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export default function IntroFrame({ children }: Props): JSX.Element {
  return (
    <div className="h-full flex flex-col justify-between items-center text-center">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">{"[[ADD GAME NAME]]"}</h1>
        <Image
          src="https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
          styles={{
            image: {
              height: "50%",
              maxHeight: "400px",
            },
          }}
        />
      </div>
      {children}
    </div>
  );
}
