addEventListener("submit", (e) => {
  e.preventDefault();
  const artist = document.getElementById("artist");
  const artistValue = artist.value.toUpperCase();

  const title = document.getElementById("title");
  const titleValue = title.value.toUpperCase();

  let url = `https://api.lyrics.ovh/v1/${artistValue}/${titleValue}`;

  const form = document.querySelector("form");
  form.classList.add("notVisible");
  form.classList.toggle("lyricForm");

  const goBack = document.querySelector(".goBack");
  goBack.classList.toggle("notVisible");
  goBack.classList.toggle("goBackContainer");

  
  fetch(url)
  .then((Response) => {
      return Response.json();
    })
    .then((data) => {
        const lyrics = data.lyrics
        if (lyrics) {
          const skipAnimationBtn = document.querySelector(".skipAnimationBtn")
          skipAnimationBtn.classList.toggle("notVisible")
          
          const article = document.createElement("article");
          article.innerHTML = `
          <h1 class="artistText">${artistValue}</h1>
          <h3 class="titleText">${titleValue}</h3>`

          document.body.appendChild(article);
          article.classList.add("lyricContainer");
          
          const lines = lyrics.split('\n')

          lines.forEach((line, index) => {
              const lyricLine = document.createElement("span")
              lyricLine.classList.add("lyricText")
              lyricLine.textContent = line

              console.log(line)
              
              const delay = index * 0.5
              lyricLine.style.animationDelay = `${delay}s`
              
              article.appendChild(lyricLine)

              setTimeout(() => {
                  lyricLine.classList.add("animate")

              }, delay * 1000)
            });

      } else {
        const div = document.createElement("div");
        div.innerHTML = `
                    <h2>Sorry! Song not found. Try again!</h2>
                    `;
        document.body.appendChild(div);
        div.classList.add("lyricContainer");
      }
    });
});

const skipBtn = document.querySelector(".skipAnimationBtn")

skipBtn.addEventListener('click', (skip) => {
    skip.preventDefault()
    skipBtn.classList.add("notVisible")
    const lines = document.querySelectorAll(".lyricText")

    lines.forEach((line) => {
        line.style.width = '100%'
        line.style.opacity = '1'
        line.classList.add('animate')

        line.style.animation = 'none'
    })
})
