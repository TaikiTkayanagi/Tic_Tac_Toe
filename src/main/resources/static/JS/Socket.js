class Socket {
  constructor(test) {
    this.socket = new SockJS("/gs-guide-websocket");
    this.client = Stomp.over(this.socket);
  }

  connect() {
    this.client.connect({}, frame => {
      this.client.subscribe('/topic/greetings', response => {
        console.log("受け取りました。");
        receive(JSON.parse(response.body));
      })
    })
  }

  disconnect() {
    this.client.disconnect();
    console.log("接続をやめました。");
  }

  send(place, row, column, player) {
    this.client.send("/app/hello", {}, JSON.stringify({"place": place, "row": row, "column": column, "player": player }));
    console.log("送信しました。");
  }
}
