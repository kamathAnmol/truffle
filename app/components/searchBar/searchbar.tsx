import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import "./searchBar.styles.scss";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import debounce from "loadsh/debounce";
import { search, MediaItem } from "@/app/api/fetchData";

const SearchBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [seachResults, setSearchResults] = useState<MediaItem[]>([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const updateSearch = debounce(async () => {
    setSearchResults(await search("multi", searchValue));
  }, 300);
  useEffect(() => {
    updateSearch();
  }, [searchValue]);

  return (
    <>
      <Search onClick={() => onOpen()} />

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
        size="5xl"
        placement="bottom-center"
      >
        <ModalContent>
          {(onClose) => (
            <div className="k p-9">
              <form action={`/search/${searchValue}`} className="pb-8">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search color="gray" />
                  </div>
                  <input
                    type="search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Movies,Shows and many more"
                    required
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="text-white absolute right-2.5  top-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  my-0"
                  >
                    Search
                  </Button>
                </div>
              </form>
              <Table
                isStriped
                isHeaderSticky
                aria-label="Search Results"
                classNames={{
                  base: "max-h-[520px] ",
                  table: "min-h-[100px]",
                }}
              >
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Media type</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No result."}>
                  {seachResults.map((item) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.name || item.title}</TableCell>
                        <TableCell>{item.media_type}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchBar;
