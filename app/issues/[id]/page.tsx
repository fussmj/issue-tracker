import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box className="col-span-1">
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
}
