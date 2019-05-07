
'use strict';

const state = {
    img: [],
    num: 0,
};


function createOptionList() {
  let value = ""
  for (let i = 1; i <= 50; i++) {

    value += `<option value=${i}>${i}</option>`;
  }
  $('#num-selector').html(value);
    
  };








function render() {
    const imgTag = state.img ? `<img class="image" src="${state.img}" alt="Random Image">` : '<img />';

    const html = `
    ${imgTag}
    <span class="caption">${state.caption}</span>
  `;

    $('.image-container').html(html);
}

function handleRandomClick() {
    $('form').submit(event => {
      event.preventDefault();
      state.num = $('#num-selector option:selected').text();
        console.log(getRandomDogs());   
            // .then(response => {
            //     state.img = response.data.image_url;
            //     render();
          
    });
}





// function handleCaptionChange() {
//     $('#caption-input').on('keyup', e => {
//         state.caption = $(e.target).val();
//         render();
//     });
// }



function getRandomDogs() {
  return fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())

        .then(responseJson => console.log(responseJson))
        };


$(() => {
    createOptionList();
    handleRandomClick();
    
    render();
});
