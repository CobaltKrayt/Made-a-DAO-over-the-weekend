import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x7492738bf84b3ED66aCc4Fecd5603D1c33C3b072",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Holy GPU",
        description: "This NFT will give you access to GpuDAO and end the gpu drought!",
        image: readFileSync("scripts/assets/gpu.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()