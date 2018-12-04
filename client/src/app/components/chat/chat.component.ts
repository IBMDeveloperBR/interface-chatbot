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
  }

  initChat() {
    this.chatHistory = [];
    this.message = '';
    this.chatService.setCtx({});
    this.sendMessage();
  }

  sendMessage() {
    const myMsg = {
      bot: false,
      text: this.message,
    };
    if (this.message !== '') {
      this.chatHistory.push(myMsg);
    }
    this.chatService.callWatson(this.message).subscribe(
      (res) => {
        this.chatService.setCtx(res.context);
        this.chatHistory.push({
          bot: true,
          text: res.output.text.join('\n')
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
    this.moveScroll();
  }

  moveScroll() {
    const chatDiv = document.getElementsByClassName('body').item(0);
    chatDiv.scrollTop = 1000;
  }

}
