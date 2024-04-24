export class ProblemRequestModel {
    number: number;
    name: string;
    description: string;
    difficulty: string;
   

    constructor(number: number, name: string, description: string, difficulty: string) {
        this.number = number;
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
    }
}
