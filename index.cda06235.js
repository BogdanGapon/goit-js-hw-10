const e=document.getElementById("search-box");document.querySelector(".country-list");e.addEventListener("input",(function(e){(t=e.target.value,fetch(`https://restcountries.com/v2/name/${t}?fields=name,capital,population,flags,languages`).then((e=>e.json()))).then((e=>e.map((e=>{e.flag,e.name,e.name})).join(""))).then((e=>{console.log(e)}));var t}));
//# sourceMappingURL=index.cda06235.js.map
