// ─── Root Layout — SERVER COMPONENT ──────────────────────────────────────────
// No "use client" — this file intentionally runs on the server.
import "../../globals.css";
import { getBaseMetadata, BaseLayout } from "../../../src/Components/server/BaseLayout";

export async function generateMetadata({ params }) {
  const { lang } = params;
  return getBaseMetadata(lang);
}

export default function RootLayout({ children, params }) {
  return <BaseLayout lang={params.lang}>{children}</BaseLayout>;
}
