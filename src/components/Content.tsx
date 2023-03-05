import Flyer from "@/components/Flyer";
import { Container } from "react-bootstrap";

import { IFlyer } from "@/types/flyers";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFlyers } from "@/api/flyers";
import { useEffect } from "react";

const Content = () => {
  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    ["flyers"],
    ({ pageParam = 1 }) => getFlyers({ pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.flyers.length !== 0 ? nextPage : undefined;
      }
    }
  );

  useEffect(() => {
    let fetching = false;

    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      {status === "loading" && <span>Loading...</span>}
      {status === "error" && <span>Error: {(error as Error).message}</span>}
      {data?.pages.length === 0 && <span>No flyers found</span>}
      <Container className="items-grid">
        <>
          {data?.pages.map((page) => {
            return page.flyers.map((flyer: IFlyer) => (
              <Flyer key={flyer.id} flyer={flyer} />
            ));
          })}
        </>
      </Container>
    </>
  );
};

export default Content;
