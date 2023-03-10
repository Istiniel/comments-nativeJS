import { formattedDate } from './Utility';

export class Comment {
  constructor(author, message, date, liked = false) {
    this.author = author;
    this.message = message;
    this.date = date;
    this.isLiked = liked;
  }

  bundleComment() {
    let container = this.createContainer();
    container.append(this.createTitle());
    container.append(this.createMessage());
    container.append(this.createFooter());

    return container;
  }

  createContainer() {
    let container = document.createElement('div');
    container.className = 'comment';
    return container;
  }

  createTitle() {
    let title = document.createElement('div');
    title.className = 'comment__author';
    title.textContent = this.author;

    return title;
  }

  createMessage() {
    let message = document.createElement('p');
    message.className = 'comment__content';
    message.textContent = this.message;

    return message;
  }

  createFooter() {
    let container = document.createElement('div');
    container.className = 'comment__info';

    container.append(this.createButtons());
    container.append(this.createTimestamp());

    return container;
  }

  createButtons() {
    let container = document.createElement('div');
    container.className = 'comment__buttons';

    container.append(this.createLikeButton());
    container.append(this.createDeleteButton());

    return container;
  }

  createLikeButton() {
    let likeButton = document.createElement('img');
    likeButton.src = './images/heart.svg';
    likeButton.className = 'comment__like';
    likeButton.addEventListener('click', this.likeComment());

    this.isLiked && (likeButton.src = './images/heart__filled.svg');

    return likeButton;
  }

  likeComment() {
    let isLiked = this.isLiked;
    return function (event) {
      if (!isLiked) {
        event.currentTarget.src = './images/heart__filled.svg';
        isLiked = true;
      } else {
        event.currentTarget.src = './images/heart.svg';
        isLiked = false;
      }
    };
  }

  createDeleteButton() {
    let deleteButton = document.createElement('img');
    deleteButton.src = './images/trash.svg';
    deleteButton.className = 'comment__delete';
    deleteButton.addEventListener('click', this.deleteComment);

    return deleteButton;
  }

  deleteComment(event) {
    event.currentTarget.closest('.comment').remove();

    // update comments count
    let commentsCount = document.querySelector('.comments-header__count');
    commentsCount.querySelector('span').textContent =
      document.querySelectorAll('.comment').length;
  }

  createTimestamp() {
    let timeStamp = document.createElement('div');
    timeStamp.className = 'comment__time';

    let date;
    switch (this.date) {
      case '':
      case formattedDate():
        date = 'Сегодня';
        break;
      case formattedDate(1):
        date = 'Вчера';
        break;

      default:
        date = this.date;
        break;
    }

    let time = new Date().toLocaleString('ru-RU', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    timeStamp.textContent = date + ' ' + time;

    return timeStamp;
  }
}
