import { Table } from "@radix-ui/themes";
import Link from "../../components/Link";
import React from "react";
import prisma from "@/prisma/client";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
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

  //fetch filtered issues
  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: orderBy,
  });
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col: any, index: number) => (
              <Table.ColumnHeaderCell key={index} className={col.className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: col.value },
                  }}
                >
                  {col.label}
                </NextLink>
                {col.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
