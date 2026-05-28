"use client";

import { useEffect } from "react";

export function CodeCopyEnhancer() {
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>(".prose pre");
    const cleanups: Array<() => void> = [];

    blocks.forEach((block) => {
      if (block.querySelector(".copy-code-button")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-code-button";
      button.textContent = "复制";
      block.appendChild(button);

      const onClick = async () => {
        const code = block.querySelector("code")?.textContent ?? "";
        await navigator.clipboard.writeText(code);
        button.textContent = "已复制";
        window.setTimeout(() => {
          button.textContent = "复制";
        }, 1300);
      };

      button.addEventListener("click", onClick);
      cleanups.push(() => button.removeEventListener("click", onClick));
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
