// document.addEventListener("DOMContentLoaded", () => {
//   let url = "http://fiqon-backup.local/wp-json/wp/v2/apps";
//   const searchInput = document.getElementById('search-input');
//   const resultsDiv = document.getElementById('results');

//   function createLoadMoreButton() {
//     const loadMoreButton = document.createElement('button');

//     loadMoreButton.textContent = 'Carregar mais'
//     resultsDiv.after(loadMoreButton);
//   }

//   let fetchResults = async (query, page = 1) => {
//     try {
//       let response = await fetch(url);
//       let data = await response.json();

//       console.log(data.length)

//       if(data.length > 0) {
//         data.forEach((item) => {
//           console.log(item.acf)
//           // console.log(item.acf.app_title)


//         });
//       }

//       createLoadMoreButton()

//     } catch (erro) {
//       console.error("erro no fetch", erro);
//     }
//   };

//   fetchResults();

//   // abas 
//   const tabs = document.querySelectorAll(".tab-item");
//   const panels = document.querySelectorAll(".tab-panel");

//   tabs.forEach((tab) => {
//       tab.addEventListener("click", function () {
//           // Remove a classe ativa de todas as abas
//           tabs.forEach((item) => item.classList.remove("active"));
//           panels.forEach((panel) => panel.classList.remove("active"));

//           // Adiciona a classe ativa na aba clicada
//           this.classList.add("active");

//           // Mostra o painel correspondente
//           const target = this.getAttribute("data-tab");
//           document.getElementById(target).classList.add("active");
//       });
//   });
// });
