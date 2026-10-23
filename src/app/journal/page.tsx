import { permanentRedirect } from "next/navigation";

export default function JournalRedirectPage() {
  permanentRedirect("/blogs");
}
