import { Button, Flex } from "@radix-ui/themes";
import Pagination from "./components/Pagination";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

export default function Home() {
  return <Pagination itemCount={99} itemsPerPage={10} currentPage={2} />;
}
