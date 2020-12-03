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
      }
);

//check if the entry is a duplicate or not
GameSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew) {
    // Saving reference to this because of changing scopes
    const document = this;
  } else {
    next();
  }
});

// GameSchema.save(function(err, doc) {
//   // Check if document is new or a new password has been set
//   if (err) {
//     // Saving reference to this because of changing scopes
//     console.error(err)
//   } else {
//     console.log("success");
//   }
// });

module.exports = mongoose.model('Game', GameSchema);