class UrlClient {
  baseUrl() {
    return 'https://api.mycaller.in/';
  }
  getISDCodes() {
    return 'first.php';
  }
  getKeysEndPoint() {
    return 'first.php';
  }

  postChat(){
    return  'chat/postChat.php';
  }

  chat_operations(){
     return 'chat/chat_operations.php';
   }
   chat_updateStatus(){
     return 'chat/chat_updateStatus.php';
   }


}

export default new UrlClient();
