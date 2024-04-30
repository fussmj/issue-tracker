import { Button, Flex } from "@radix-ui/themes";
import Pagination from "./components/Pagination";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import LatestIssues from "./api/LatestIssues";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return <LatestIssues />;
}
