/**
 * Created by awissel on 11/12/15 - CW50.
 */

angular.module('proventalan')
  .controller('LadderController', function() {
    this.participants = [];
    this.showLadderOutput = false;

    this.addParticipant = function() {
      this.participants.push({ name: '' });
    };

    this.shuffle = function(array) {
      var tmp, current, top = array.length;

      if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }

      return array;
    }

    this.createLadder = function() {
      var participants = this.shuffle(this.participants);
      var teamsize = this.teamsize;
      var teams = [];
      var currentTeam = [];
      for(var i = 0; i <= participants.length; i++) {
        if(currentTeam.length < teamsize) {
          currentTeam.push(participants[i]);
        } else {
          teams.push(currentTeam);
          currentTeam = [participants[i]];
        }
      }

      this.teams = teams;

      this.showLadderOutput = true;
    };
  });