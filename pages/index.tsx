import Book, { BookProps } from "../components/Book"

import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import React from "react"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const books = await prisma.book.findMany({
    include: {
      authors: true,
    }
  });

  return {
    props: { books }
  };
};

type Props = {
  books: BookProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Books</h1>
        <main>
          {props.books.map((book) => (
            <div key={book.isbn} className="post">
              <Book book={book} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
