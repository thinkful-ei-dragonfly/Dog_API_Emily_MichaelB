
'use strict';

const state = {
    img: [],
    breeds: [],
    num: 0,
};


function createOptionList() {
  let value = ""
  for (let i = 1; i <= 50; i++) {
    value += `<option value=${i}>${i}</option>`;
  }
  $('#num-selector').html(value);
};

function fetchBreedList() {
  fetch("https://dog.ceo/api/breeds/list/all")
  .then(response => response.json())
  .then(responseJson => {
    let breed = '';
    for (breed in responseJson.message) {
      state.breeds.push(breed);
      createBreedList();
    }
  })

  
}

function createBreedList() {
    let value = ""
    for (let i = 0; i < state.breeds.length; i++) {
      value += `<option value=${state.breeds[i]}>${state.breeds[i]}</option>`;
    }
    $('#breed-selector').html(value);
  };
  

function render() {
    let imgTag = "";
    for (let i = 0; i < state.img.length; i++) {
      imgTag += `<img class="results-img" src="${state.img[i]}" alt="Random Image">`;
    }
    $('#dogImages').html(imgTag);
}

function handleRandomClick() {
    $('form').submit(event => {
      event.preventDefault();
      state.num = $('#num-selector option:selected').text();
        getRandomDogs();
        render();
    });
}

// function handleCaptionChange() {
//     $('#caption-input').on('keyup', e => {
//         state.caption = $(e.target).val();
//         render();
//     });
// }


function getRandomDogs() {
  // return fetch("https://dog.ceo/api/breeds/image/random/" + state.num)
  return fetch("https://dog.ceo/api/breed/" +  $('#breed-selector option:selected').text() + "/images/random/" + state.num)
        .then(response => response.json())

        .then(responseJson => {
          state.img = responseJson.message;
          render();
        })
        };


$(() => {
    createOptionList();
    fetchBreedList();
    handleRandomClick();
    
    render();
});
