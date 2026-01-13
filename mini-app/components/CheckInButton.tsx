"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CheckInButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckIn = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/checkin", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Check‑in successful! You earned ${data.reward} GMMC.`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <Button onClick={handleCheckIn} disabled={loading}>
        {loading ? "Checking in…" : "Daily Check‑In (100 000 GMMC)"}
      </Button>
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
