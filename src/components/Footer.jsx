import React from "react"

function Footer({activeCount, filter, setFilter}) {
  return (
    <footer className="mt-4 flex justify-between items-center">
      <span>{activeCount} items left</span>
      <div>
        <button
          onClick={() => setFilter("all")}
          className={`mx-1 ${filter === "all" ? "font-bold" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`mx-1 ${filter === "active" ? "font-bold" : ""}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`mx-1 ${filter === "completed" ? "font-bold" : ""}`}
        >
          Completed
        </button>
      </div>
    </footer>
  )
}

export default Footer
