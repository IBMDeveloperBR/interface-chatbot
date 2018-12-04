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
  ) { }

  ngOnInit() {
    this.initChat();
  }

  initChat() {
    this.chatHistory = [];
    this.message = '';
    this.sendMessage(this.message);
  }

  sendMessage(msg) {
    const myMsg = {
      bot: false,
      text: msg,
    };
    if (msg !== '') {
      this.chatHistory.push(myMsg);
    }
    this.chatService.callWatson(msg).subscribe((res) => {
      this.chatService.setCtx(res.context);
      this.chatHistory.push({
        bot: true,
        text: res.output.text.join('\n')
      });
    });
    this.message = '';
  }

}
