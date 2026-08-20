// ─── Root Layout — SERVER COMPONENT ──────────────────────────────────────────
// No "use client" — this file intentionally runs on the server.
import "../globals.css";
import { getBaseMetadata, BaseLayout } from "../../src/Components/server/BaseLayout";

export const metadata = getBaseMetadata("en");

export default function RootLayout({ children }) {
  return <BaseLayout lang="en">{children}</BaseLayout>;
}
