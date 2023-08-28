import React from "react";
import ReactMarkdown from "react-markdown";
import Router from "next/router";

export type Author = {
  id: string;
  name: string;
  lastname: string;
};

export type BookProps = {
  isbn: string;
  title: string;
  blurb: string;
  authors: Author[]
};

const Book: React.FC<{ book: BookProps }> = ({ book }) => {
  return (
    <div onClick={() => Router.push("/book/[id]", `/book/${book.isbn}`)}>
      <h2>{book.title} - {book.isbn}</h2>
      Written by {book.authors.map((author: Author) => <small key={author.id}>{author.name} {author.lastname}</small>)}
      <ReactMarkdown children={book.blurb} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Book;
