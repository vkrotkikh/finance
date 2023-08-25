import { NotificationTypes } from "../../types";
import { v4 as uuid } from 'uuid';

const notification = ({ text, type }:{ text: string, type: NotificationTypes }):void => {
    const noteList = document.createElement('div');
    const notification = document.querySelector('.notification');
    const noteId = uuid();
    const note = document.createElement('p');

    noteList.className = 'notification';
    note.textContent = text;
    note.className = type;
    note.id = noteId;

    if(notification){
        notification.appendChild(note);
    } else {
        noteList.appendChild(note);
        document.body.appendChild(noteList);
    }

    setTimeout(() => {
        removeNotification(noteId);
    }, 2500);

};

const removeNotification = (id: string) => {
    const notification = document.querySelector('.notification');
    const note = document.getElementById(id)
    note && note.remove();
    notification?.innerHTML.trim() === '' && notification?.remove();
  };

  /*
  notification example:
  notification({text: 'Name is updated', type: NotificationTypes.Success});
  */

export default notification;