const mongoose = require('mongoose');

//enter game schema here
const GameSchema = new mongoose.Schema(
    {
        "schedule": {
          "date": {
            "type": "Date"
          },
          "tbaTime": {
            "type": "Boolean"
          }
        },
        "summary": {
          "type": "String"
        },
        "details": {
          "league": {
            "type": "String"
          },
          "seasonType": {
            "type": "String"
          },
          "season": {
            "type": "Number"
          },
          "conferenceGame": {
            "type": "Boolean"
          },
          "divisionGame": {
            "type": "Boolean"
          }
        },
        "status": {
          "type": "String"
        },
        "teams": {
          "away": {
            "team": {
              "type": "String"
            },
            "location": {
              "type": "String"
            },
            "mascot": {
              "type": "String"
            },
            "abbreviation": {
              "type": "String"
            },
            "conference": {
              "type": "String"
            }
          },
          "home": {
            "team": {
              "type": "String"
            },
            "location": {
              "type": "String"
            },
            "mascot": {
              "type": "String"
            },
            "abbreviation": {
              "type": "String"
            },
            "conference": {
              "type": "String"
            }
          }
        },
        "lastUpdated": {
          "type": "Date"
        },
        "gameId": {
          "type": "Number"
        },
        "venue": {
          "name": {
            "type": "String"
          },
          "city": {
            "type": "String"
          },
          "state": {
            "type": "String"
          },
          "neutralSite": {
            "type": "Boolean"
          }
        },
        "odds": {
          "type": [
            "Mixed"
          ]
        },
        "scoreboard": {
          "score": {
            "away": {
              "type": "Number"
            },
            "home": {
              "type": "Number"
            },
            "awayPeriods": {
              "type": [
                "Number"
              ]
            },
            "homePeriods": {
              "type": [
                "Number"
              ]
            }
          },
          "currentPeriod": {
            "type": "Number"
          },
          "periodTimeRemaining": {
            "type": "String"
          }
        }
      }, {
        collection: 'games'
    }
);

//check if the entry is a duplicate or not
GameSchema.pre('save', function(next) {
    next();
  }
);

module.exports = mongoose.model('Game', GameSchema);