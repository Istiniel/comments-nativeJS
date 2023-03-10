import './styles/App.scss';

// class for create a comment
import { Comment } from './CommentCreator';

// current Date in (yyyy-mm-dd) format
import { formattedDate, decodeDate } from './Utility';

// validation
import { validateName, validateText } from './commentValidation';

// set form
let form = document.forms.comments__form;
form.addEventListener('submit', submitHandler);
let commentsList = document.querySelector('.comments__list');

// test filter option
let secondComment = new Comment(
  'Ed',
  'Greetings Traveler',
  formattedDate(5)
).bundleComment();
commentsList.append(secondComment);

let thirdComment = new Comment(
  'Ed',
  'Test Filter option',
  formattedDate(1),
  true
).bundleComment();
commentsList.append(thirdComment);

let newComment = new Comment(
  'Ed',
  'Test Filter option',
  formattedDate(),
  true
).bundleComment();
commentsList.append(newComment);

// handle form submit function
function submitHandler(event) {
  let target = event.currentTarget;

  let author = target.name.value;
  let message = target.content.value;
  let timeStamp = target.date.value;

  // delete all validation tooltips after submit
  for (const tooltip of document.querySelectorAll('.validation-tooltip')) {
    tooltip.remove();
  }

  // validate name
  let validationMessage = validateName(author);
  if (validationMessage) {
    showTooltip(validationMessage, target.name);
    target.name.classList.add('invalid');

    target.name.focus();
    event.preventDefault();
    return;
  }

  // validate text
  validationMessage = validateText(message);
  if (validationMessage) {
    showTooltip(validationMessage, target.content);
    target.content.classList.add('invalid');

    target.content.focus();
    event.preventDefault();
    return;
  }

  let newComment = new Comment(author, message, timeStamp).bundleComment();
  commentsList.append(newComment);

  form.reset();
  updateCommentsCount();

  event.preventDefault();
}

function showTooltip(validationMessage, input) {
  let boundingFrame = input.getBoundingClientRect();

  let tooltip = document.createElement('p');
  tooltip.className = 'validation-tooltip';
  tooltip.textContent = validationMessage;

  tooltip.style.top = boundingFrame.bottom + 5 + scrollY + 'px';
  tooltip.style.left = boundingFrame.left + scrollX + 'px';

  document.body.append(tooltip);
}

// delete validation tooltips when filling the input
for (const input of form.elements) {
  input.addEventListener('input', (e) => {
    // delete all red outlines
    for (const input of form.elements) {
      input.classList.remove('invalid');
    }
    // delete all tooltips
    document.querySelector('.validation-tooltip')?.remove();
  });
}

// delete validation tooltips when clicking outside
document.addEventListener('click', function (event) {
  if (![...form.elements].includes(event.target)) {
    for (const input of form.elements) {
      input.classList.remove('invalid');
    }
    // delete all tooltips
    document.querySelector('.validation-tooltip')?.remove();
  }
});

// update comments count
function updateCommentsCount() {
  let commentsCount = document.querySelector('.comments-header__count');

  commentsCount.querySelector('span').textContent =
    document.querySelectorAll('.comment').length;
}
updateCommentsCount();

// sort messages
function sortMessages(type) {
  if (type == 'rate') {
    let likedMessages = [...commentsList.children].filter((message) =>
      /filled/.test(message.querySelector('.comment__like').src)
    );
    let restMessages = [...commentsList.children].filter(
      (message) => !/filled/.test(message.querySelector('.comment__like').src)
    );

    let newList = document.createElement('div');
    newList.className = 'comments__list';
    newList.append(...likedMessages, ...restMessages);

    commentsList.replaceWith(newList);
    commentsList = newList;
  }

  if (type == 'date') {
    let sortedMessages = [...commentsList.children].sort((mes1, mes2) => {
      let mes1Time = mes1.querySelector('.comment__time').textContent;
      let mes2Time = mes2.querySelector('.comment__time').textContent;
      return decodeDate(mes1Time).localeCompare(decodeDate(mes2Time));
    });

    let newList = document.createElement('div');
    newList.className = 'comments__list';
    newList.append(...sortedMessages);

    commentsList.replaceWith(newList);
    commentsList = newList;
  }
}

// set filter select
let filterSelect = document.querySelector('.comments-header__sort');
filterSelect.addEventListener('input', filterMessages);

function filterMessages(event) {
  let select = event.currentTarget;
  let selectedValue = select[select.selectedIndex].value;

  sortMessages(selectedValue);
}
