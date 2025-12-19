const saveToFavorites = (city) => {
    searchBtn.addEventListener("click", function(){
        favoritesList.push(city);
        console.log(favoritesList);
    })}
const favoritesList = [];

const saveToStorage = (city) => {

    let cityArr = getLocalStorage();


    if(!cityArr.includes(city)){
        cityArr.push(city);
    }

    localStorage.setItem('Cities', JSON.stringify(cityArr));
}

const getLocalStorage = () => {

let value = localStorage.getItem('Cities');

if (value === null){
    return [];
}


    return JSON.parse(value);

}
export {saveToFavorites, saveToStorage, getLocalStorage};