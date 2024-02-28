import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
  //load not found page if the slug is not valid
  if (typeof params.id !== "number") notFound();

  //search database for the specific issue
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  //load not found page if that issue does not exist
  if (!issue) return notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
}
