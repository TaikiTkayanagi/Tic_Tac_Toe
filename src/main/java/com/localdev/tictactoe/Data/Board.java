package com.localdev.tictactoe.Data;

public class Board {
  public String place;
  public String row;
  public String column;
  public String img;
  public String player;


  public Board(String place, String row, String column, String player){
    this.place = place;
    this.row = row;
    this.column = column;
    this.player = player;
  }

}
