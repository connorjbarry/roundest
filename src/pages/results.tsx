import type { GetServerSideProps } from "next";
import { prisma } from "../server/db/client";

const Results = () => {
  return <div>results</div>;
};

export default Results;

export const getStaticProps: GetServerSideProps = async () => {
  const pokemon = await prisma.pokemon.findMany({
    orderBy: {
      votes: "desc",
    },
    take: 10,
  });
  return {
    props: {},
  };
};
