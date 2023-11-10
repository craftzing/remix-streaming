import { random, sleep } from "radash";

export const loadImage = async (): Promise<string> => {
  const response = await fetch("https://upload.wikimedia.org/wikipedia/commons/b/b6/TORTOR2.jpg");

  // make it artificially slow
  await sleep(random(1000, 2000));

  return Buffer.from(await response.arrayBuffer()).toString("base64");
}
