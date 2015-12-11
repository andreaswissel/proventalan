/**
 * Created by awissel on 11/12/15 - CW50.
 */

angular.module('proventalan')
  .service('ChatService', function($location) {
    this.initSocket = function(scope) {
      socket.on('history', function(history) {
        scope.$emit('historyReceived', history);
      });

      socket.on('message', function(message) {
        scope.$emit('messageReceived', message);
      });

      socket.on('clients', function(clients) {
        scope.$emit('clientsReceived', clients);
      });
    };

    this.setUsername = function(username) {
      socket.emit('event', { type: 'logon', data: username });
    };
  });