import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { GMMC_ADDRESS, TREASURY_ADDRESS } from "@/lib/constants";
import { GMMC_ABI } from "@/lib/contracts";

export async function POST() {
  try {
    // Assume wallet is connected via MetaMask or similar
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    // Check GMMC balance
    const token = new ethers.Contract(GMMC_ADDRESS, GMMC_ABI, signer);
    const balance: ethers.BigNumber = await token.balanceOf(userAddress);
    const required = ethers.utils.parseUnits("100000", 18);

    if (balance.lt(required)) {
      return NextResponse.json(
        { error: "Insufficient GMMC balance" },
        { status: 400 }
      );
    }

    // Transfer 100k GMMC to treasury
    const tx = await token.transfer(TREASURY_ADDRESS, required);
    await tx.wait();

    // TODO: Record check‑in in backend, award rewards, etc.

    return NextResponse.json({ reward: "10 GMMC" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
