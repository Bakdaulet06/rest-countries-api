const searchInput = document.querySelector(".search-input");
const filterCountries = document.querySelector("#filter-countries");
const countryList = document.querySelector(".country-list")
let allCountries = []

searchInput.addEventListener('input', updateCountryResults)
filterCountries.addEventListener('change', updateCountryResults)

function getSearchInput(){
  return searchInput.value.toLowerCase().trim()
}
function getFilterInput(){
  return filterCountries.value
}
function searchResults(countryData, searchQuery){
  return countryData.filter(item => item.name.toLowerCase().includes(searchQuery))
}
function filterResults(countryData, filterOption){
  return countryData.filter(item => item.region.toLowerCase().includes(filterOption.toLowerCase().trim()))
}
function updateCountryResults(){
  const searchTerm = getSearchInput()
  const selectedFilter = getFilterInput()

  const filteredResults = filterResults(allCountries, selectedFilter)
  const searchTermResults = searchResults(filteredResults, searchTerm)
  displayCountries(searchTermResults)
}

async function fetchCountries(){
    const res = await fetch("data.json")
    const data = await res.json()
    allCountries = data
    displayCountries(allCountries)
    console.log(allCountries)
}

function displayCountries(countriesData) {
  countryList.innerHTML = countriesData.map(country => {
    return `
      <div class="country-card">
        <img src="${country.flags.png}" alt="" class="country-card-img">
        <div class="country-card-text">
          <h4 class="country-name">${country.name}</h4>
          <div class="country-info">
            <p><span>Population: </span>${country.population}</p>
            <p><span>Region: </span>${country.region}</p>
            <p><span>Capital: </span>${country.capital}</p>
          </div>
        </div>
      </div>`;
  }).join(''); 

  const countryCards = document.querySelectorAll(".country-card");
  countryCards.forEach(card => {
    card.addEventListener("click", () => {
      const countryName = card.querySelector('.country-name');
      countriesData.forEach(country=>{
        if(country.name===countryName.textContent){
          displayCountryDetail(country);
        }
      })
    });
  });
}

const mainSectionWrapper = document.querySelector(".main-section-wrapper");
function displayCountryDetail(selectedCountry){
  const countryDetailContainer = document.querySelector(".country-detail-container");
  countryDetailContainer.innerHTML = `
  <div class="container">
      <div class="country-detail-container-wrapper">
        <button id="back-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
              Back
        </button>
        <div class="country-information">
            <div class="country-flag">
                <img src="${selectedCountry.flags.png}" alt="">
            </div>
            <div class="country-details">
                <h1>${selectedCountry.name}</h1>
                <div class="country-details-list">
                    <ul>
                        <li><strong>Native Name: </strong>${selectedCountry.nativeName}</li>
                        <li><strong>Population: </strong>${selectedCountry.population.toLocaleString()}</li>
                        <li><strong>Region: </strong>${selectedCountry.region}</li>
                        <li><strong>Sub Region: </strong>${selectedCountry.subregion}</li>
                        <li><strong>Capital: </strong>${selectedCountry.capital}</li>
                    </ul>
                    <ul>
                        <li><strong>Top Level Domain: </strong>${selectedCountry.topLevelDomain[0]}</li>
                        <li><strong>Currency: </strong>${selectedCountry.currencies[0].name}</li>
                        <li><strong>Languages: </strong>${selectedCountry.languages.map(language => language.name)}</li>
                    </ul>
                </div>
                ${selectedCountry.borders && selectedCountry.borders.length>0?
                  `<div class="country-borders"><strong>Border Countries: </strong>${selectedCountry.borders.map(country=>`<span>${country}</span>`).join(' ')}</div>`:
                  `<div><strong>Border Countries: </strong>None</div>`
                }
            </div>
        </div>
      </div>
    </div>
  `
  mainSectionWrapper.style.display = 'none'
  const backBtn = countryDetailContainer.querySelector('#back-btn')
  backBtn.addEventListener('click', ()=>{
    countryDetailContainer.innerHTML = ''
    mainSectionWrapper.style.display = 'flex'
  })
}
fetchCountries()


const themeSwitcher = document.querySelector(".theme-switcher");
const themeSwitcherText = document.querySelector(".theme-switcher p")
const body = document.querySelector("body");
const bodyElements = document.querySelectorAll(".header, .search-bar, .filtration, .filtration select");
const countryCards = document.querySelectorAll(".country-card");

themeSwitcher.addEventListener("click", ()=>{
  if(themeSwitcher.classList.contains("light-mode")){
    themeSwitcher.classList.remove("light-mode");
    themeSwitcherText.textContent = "Light Mode"
    body.style.backgroundColor = "hsl(207, 26%, 17%);"
    bodyElements.forEach(bodyElement =>{
      bodyElement.style.backgroundColor = "hsl(209, 23%, 22%)"
    })
    countryCards.forEach(country=>{
      country.style.backgroundColor = "hsl(209, 23%, 22%)"
    })
    body.style.color = "hsl(0, 0%, 100%)"
  }else{
    themeSwitcher.classList.add("light-mode");
    themeSwitcherText.textContent = "Dark Mode"
    body.style.backgroundColor = "hsl(0, 0%, 98%)";
    bodyElements.forEach(bodyElement =>{
      bodyElement.style.backgroundColor = "hsl(0, 0%, 100%)"
    })
    body.style.color = "hsl(200, 15%, 8%)"
  }
})