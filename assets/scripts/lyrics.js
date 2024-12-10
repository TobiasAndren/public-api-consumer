addEventListener("submit", (e) => {  
    e.preventDefault();
    const artist = document.getElementById("artist")
    const artistValue = artist.value.toUpperCase()

    const title = document.getElementById("title")
    const titleValue = title.value.toUpperCase()

    let url = `https://api.lyrics.ovh/v1/${artistValue}/${titleValue}`

    const form = document.querySelector("form")
    form.classList.add("notVisible")
    form.classList.toggle("lyricForm")

    const goBack = document.querySelector(".goBack")
    goBack.classList.toggle("notVisible")
    goBack.classList.toggle("goBackContainer")

    fetch(url)
    .then((Response) => {
        return Response.json();
    })
    .then((json) => {
        if(json.lyrics){

            const div = document.createElement("div")
            div.innerHTML = `
            <h1 class="artistText">${artistValue}</h1>
            <h3 class="titleText">${titleValue}</h3>
            <pre class="lyricText">${json.lyrics}</pre>`
            
            document.body.appendChild(div)
            div.classList.add("lyricContainer")
        } else {
            const div = document.createElement("div")
            div.innerHTML = `
            <h2>Sorry! Song not found. Try again!</h2>
            `
            document.body.appendChild(div)
            div.classList.add("lyricContainer")
        }
    })
})