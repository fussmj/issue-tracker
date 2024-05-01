import React from "react";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issue Tracker - Issues",
  description: "View a list of issues",
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

export default async function IssuesPage({ searchParams }: Props) {
  //create list for column headers for sorting
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  //validate search params prior to passing into prisma
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns.map((col) => col.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  //fetch filtered issues
  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable
        issues={issues}
        columns={columns}
        searchParams={searchParams}
      />
      <Pagination
        itemCount={issueCount}
        itemsPerPage={pageSize}
        currentPage={page}
      />
    </Flex>
  );
}
