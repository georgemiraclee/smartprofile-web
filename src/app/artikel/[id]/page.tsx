// views/artikel/[id].tsx
import * as React from "react";
import Detail from "@/views/artikel/[id]/[id]";

export default function DetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <Detail params={params} />
    </div>
  );
}
