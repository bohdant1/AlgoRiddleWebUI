export class ProblemResponseModel {
    id: string;
    number: number;
    name: string;
    description: string; 
    difficulty: string;


    constructor(id: string, number: number, name: string, description: string, difficulty: string) {
        this.id = id;
        this.number = number;
        this.name = name;
        this.description = description; 
        this.difficulty = difficulty;
    }
}
