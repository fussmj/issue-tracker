import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
    <Grid columns={{ initial: "1", sm: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
}
