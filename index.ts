// src/game.ts
import inquirer from 'inquirer';

interface Room {
  message: string;
  choices: string[];
  outcomes: string[];
}

class TextAdventureGame {
  private rooms: Room[] = [
    {
      message: "You are in a dark room. There are two doors in front of you.",
      choices: ["Open door 1", "Open door 2", "Quit game"],
      outcomes: ["room1", "room2", "quit"],
    },
    {
      message: "You entered room 1. There is a chest in the corner.",
      choices: ["Open the chest", "Go back to the previous room", "Quit game"],
      outcomes: ["chest", "room0", "quit"],
    },
    {
      message: "You entered room 2. There is a key on the table.",
      choices: ["Take the key", "Go back to the previous room", "Quit game"],
      outcomes: ["key", "room0", "quit"],
    },
    {
      message: "You opened the chest and found a shiny diamond!",
      choices: ["Go back to the previous room", "Quit game"],
      outcomes: ["room1", "quit"],
    },
    {
      message: "You took the key from the table.",
      choices: ["Go back to the previous room", "Quit game"],
      outcomes: ["room2", "quit"],
    },
  ];

  private async mainLoop(): Promise<void> {
    let currentRoomIndex = 0;
    let shouldContinue = true;

    while (shouldContinue) {
      const currentRoom = this.rooms[currentRoomIndex];
      const { choice } = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: currentRoom.message,
        choices: currentRoom.choices,
      });

      const choiceIndex = currentRoom.choices.indexOf(choice);
      const outcome = currentRoom.outcomes[choiceIndex];

      switch (outcome) {
        case 'room0':
          currentRoomIndex = 0;
          break;
        case 'room1':
          currentRoomIndex = 1;
          break;
        case 'room2':
          currentRoomIndex = 2;
          break;
        case 'chest':
          currentRoomIndex = 3;
          break;
        case 'key':
          currentRoomIndex = 4;
          break;
        case 'quit':
          shouldContinue = false;
          break;
      }
    }

    console.log('Thank you for playing! Goodbye!');
  }

  public async start(): Promise<void> {
    console.log('Welcome to the Text-Based Adventure Game!');
    await this.mainLoop();
  }
}

// Entry point
const game = new TextAdventureGame();
game.start();
