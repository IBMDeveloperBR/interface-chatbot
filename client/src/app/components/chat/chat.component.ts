import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  openChat = false;
  chatHistory = [];
  message: String = '';

  constructor(
    public chatService: ChatService
  ) {
    this.chatService.setNewValue.subscribe((status) => {
      if (status) {
        this.initChat();
      }
    });
  }

  ngOnInit() {
    this.initChat();
    setTimeout(() => {
      this.moveScroll();
    }, 1000);
  }

  initChat() {
    this.chatHistory = [];
    this.message = '';
    this.chatService.setCtx({});
    this.sendMessage(this.message);
  }

  sendMessage(msg) {
    const myMsg = {
      bot: false,
      text: msg,
      type: 'text'
    };
    if (msg !== '') {
      this.chatHistory.push(myMsg);
    }
    this.chatService.callWatson(msg).subscribe(
      (res) => {
        this.chatService.setCtx(res.context);
        res.output.generic.forEach(element => {
          const newMsg = {
            bot: true,
            type: element.response_type,
            title: element.title || null,
            text: element.text || null,
            buttons: element.options || null,
            img: element.source || null,
            description: element.description || null,
          };
          this.chatHistory.push(newMsg);
        });
      },
      (err) => {
        this.chatHistory.push({
          bot: true,
          text: 'Ops... Algo deu errado...\nReveja as credenciais na configuração!'
        });
      }
    );
    this.message = '';
  }

  moveScroll() {
    const chatDiv = document.getElementsByClassName('body').item(0);
    chatDiv.scrollTop = chatDiv.scrollHeight;
    setTimeout(() => {
      this.moveScroll();
    }, 1000);
  }

}
