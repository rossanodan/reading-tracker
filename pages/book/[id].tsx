import { Author, BookProps } from "../../components/Book"

import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import React from "react"
import ReactMarkdown from "react-markdown"
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const book = await prisma.book.findUnique({
    where: {
      isbn: String(params?.id),
    },
    include: {
      authors: true
    },
  });

  return {
    props: book,
  };
};

const Post: React.FC<BookProps> = (props) => {
  let title = props.title

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>Written by {props.authors.map((author: Author) => <small key={author.id}>{author.name} {author.lastname}</small>)}</p>
        <ReactMarkdown children={props.blurb} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
