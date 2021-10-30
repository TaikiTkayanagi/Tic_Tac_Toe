package com.localdev.tictactoe.Controller;

import com.localdev.tictactoe.Data.Board;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class webSocketController {

  @MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public Board put(Board board){
    return board;
  }
}
