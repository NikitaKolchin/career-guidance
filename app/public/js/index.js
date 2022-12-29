const hamburger_btn = document.getElementById("hamburger_btn")
hamburger_btn.addEventListener("click", toggleHam)
function toggleHam() {
  this.classList.toggle('is-active')
}