import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
  //search database for the specific issue
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  //load not found page if that issue does not exist
  if (!issue) return notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}
