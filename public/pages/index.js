document.getElementById("feeds").addEventListener("click", (e) => {
  document.body.classList.add("feed-selected");

  const selection = document.querySelector("#feeds li.selected");
  if (selection) selection.classList.remove("selected");

  e.target.closest("li").classList.add("selected");
});

document.getElementById("articles").addEventListener("click", (e) => {
  const selection = document.querySelector("#articles li.selected");
  if (selection) selection.classList.remove("selected");

  e.target.closest("li").classList.add("selected");
});

document.querySelector(".back").addEventListener("click", () => {
  document.body.classList.remove("feed-selected");
});
