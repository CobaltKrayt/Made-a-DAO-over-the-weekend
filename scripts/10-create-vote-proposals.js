import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Our voting contract.
const voteModule = sdk.getVoteModule(
  "0xc257A853f47bF2F9dABFBd5f39fdA52d331Ea66d",
);

// Our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0x232Ad5751a94ab98F6dfd65367dBFb64686574E5",
);

(async () => {
	

  try {
    const amount = 6_900;
    // Create proposal to transfer ourselves 6,900 tokens for being awesome.
    await voteModule.propose(
      "Should the DAO transfer " +
      amount + " tokens from the treasury to " +
      "laptop" + " for being awesome?",
      [
        {
          // Again, we're sending ourselves 0 ETH. Just sending our own token.
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // We're doing a transfer from the treasury to our wallet.
            "transfer",
            [
              "0xfBde895951b39A9c9035a5cDF70136B560Dcc5FF",
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),

          toAddress: tokenModule.address,
        },
      ]
    );

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();