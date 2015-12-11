/**
 * Created by awissel on 11/12/15 - CW50.
 */

angular.module('proventalan')
  .controller('ChatController', function($scope, ChatService, $mdDialog) {
    var _self = this;
    var messageCache = [];

    this.history = [];
    this.clients = [];
    this.active = false;

    ChatService.initSocket($scope);

    $scope.$on('clientsReceived', function(angularEvent, clients) {

      /*_self.clients[clients.username] = { color: clients.color };*/

      console.log('clients received ', clients);

      _.forEach(clients, function(client, key) {
        _self.clients[client.username] = { color: client.color };
      });

      $scope.$apply();
    });

    $scope.$on('messageReceived', function(angularEvent, socketEvent) {
      _self.history.push({ id: socketEvent.id, username: socketEvent.username, message: socketEvent.msg });
      $('#history_container')[0].scrollHeight;
      $scope.$apply();
    });

    $scope.$on('historyReceived', function(angularEvent, socketEvent) {
      console.log(socketEvent);
      _self.history = socketEvent;
    });

    this.getClientColor = function(username) {
      if(username == 'Me') {
        return this.clients[_self.username].color;
      } else {
        return this.clients[username].color;
      }
    };

    this.setUsername = function(username) {
      _self.username = username;
      _self.active = true;

      ChatService.setUsername(username);
    };

    this.keydown = function(event) {
      if(event.keyCode == 13) {
        socket.emit('event', { type: 'msg', data: _self.message });
        messageCache.push(_self.message);
        _self.history.push({ id: '', username: 'Me', message: _self.message });
        _self.message = null;

        console.log('cache size ', messageCache.length);
      }
    }
  })
  .config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('blue')
      .dark();
  });;