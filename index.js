'use strict';

const state = {
  img: [],
  // breeds: [],
  breed: "",
  num: 0,
};

// function createOptionList() {
//   let value = '';
//   for (let i = 1; i <= 50; i++) {
//     value += `<option value=${i}>${i}</option>`;
//   }
//   $('#num-selector').html(value);
//   $('select option[value="3"]').attr("selected",true);
// }

// function fetchBreedList() {
//   fetch('https://dog.ceo/api/breeds/list/all')
//     .then(response => response.json())
//     .then(responseJson => {
//       for (let breed in responseJson.message) {
//         state.breeds.push(breed);
//         createBreedList();
//       }
//     });
// }

// function createBreedList() {
//   let value = '';
//   for (let i = 0; i < state.breeds.length; i++) {
//     value += `<option value=${state.breeds[i]}>${state.breeds[i]}</option>`;
//   }
//   $('#breed-selector').html(value);
// }

function render() {
  $('#errors').empty()
  let imgTag = '';
  for (let i = 0; i < state.img.length; i++) {
    imgTag += `<img class="results-img" src="${state.img[i]}" alt="Random Image">`;
  }
  $('#dogImages').html(imgTag);
}

function handleRandomClick() {
  $('#num-dog').submit(event => {
    event.preventDefault();
    state.num = $('.number-of-dogs').val();
    getRandomDogs();
  });
}

function handleBreedClick() {
  $('#breed-dog').submit(event => {
    event.preventDefault();
    state.breed = $('.dog-breed').val();
    getDogBreed();
  });
}

function getRandomDogs() {
  return fetch("https://dog.ceo/api/breeds/image/random/" + state.num)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(responseJson => {
      state.img = responseJson.message;
      render();
    }).catch(error => handleError(error));
}

function getDogBreed() {
  return fetch("https://dog.ceo/api/breed/" +  state.breed + "/images/random")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(responseJson => {
      state.img = [responseJson.message];
      render();
    }).catch(error => handleError(error));
}

function handleError(error) {
  console.log('There has been a problem with your fetch operation: ', error.message)
  $('#dogImages').empty()
  $('#errors').html(error)
}

$(() => {
  // createOptionList();
  // fetchBreedList();
  handleRandomClick();
  handleBreedClick();
  render();
});
