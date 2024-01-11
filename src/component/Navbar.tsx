import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const Navbar = () => {
  const [searchParams] = useSearchParams();
  const todosData = searchParams.get("todos");
  return (
    <nav className="navBar">
      <Link to="/" id="link" className={todosData === null ? "active" : ""}>
        All
      </Link>
      <Link
        to="/?todo=active"
        className={todosData === "active" ? "active" : ""}
        id="link"
      >
        Active
      </Link>
      <Link
        to="/?todo=completed"
        className={todosData === "completed" ? "active" : ""}
        id="link"
      >
        Completed
      </Link>
    </nav>
  );
};

export default Navbar;
