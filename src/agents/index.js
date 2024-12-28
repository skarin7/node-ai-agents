import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import GitHubParser from '../utils/GitHubParser.js';

const agentNames = [];

export class Agent {
    constructor(name, timeOut) {
        this.name = name;
        this.status = 'idle';
        this.finalStatus = {};
        agentNames.push(name);
        this.timeOut = timeOut;
    }

    performTask(task) {
        this.status = 'busy';
        console.log(`${this.name} is performing task: ${task}`);
        this.finalStatus = { task: task, status: this.status };
        // Simulate task completion
        // setTimeout(() => {
        //     this.status = 'idle';
        //     console.log(`${this.name} has completed task: ${task} and has timeout of ${this.timeOut}`);
        // }, this.timeOut);

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, '../fat_file.json');
        const newFile = path.join(__dirname, 'filtered_data.json')

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            let data = JSON.parse(fileContent);
            let filteredData = this.extractUniqueNamesAndSkills(data) || [];
            fs.writeFileSync(newFile, JSON.stringify(filteredData, null, 2), 'utf8');
    
        }

    }

    async parseGitHubRepoLayout() {
        var githubParser = new GitHubParser("https://github.com/scala/scala3/", '', '');
        var result = await githubParser.fetchGitHubRepoLayout();
    }

    extractUniqueNamesAndSkills(data) {
        const uniqueNames = new Set();
        const uniqueSkills = new Set();
        const resp = {}    
        data.agents.forEach(agent => {
            uniqueNames.add(agent.name);
            agent.skills.forEach(skill => uniqueSkills.add(skill));
        });
        resp["names"]= Array.from(uniqueNames),
        resp["skills"] = Array.from(uniqueSkills)
        return resp;
    }
    getStatus() {
        return this.status;
    }
}

export function createAgent(name) {
    agentNames.push(name);
    return new Agent(name, 3000);
}

export function allAgents() {
    agentNames.map((name, index) => {
        console.log(` Index: ${index + 1} is ${name}`);
    });

    let newNames = agentNames.join(', ');
    console.log(`Agent names: "${agentNames}" are all agents`);
    let newArray = ['Extra1', 'Extra2'];

    return [...newArray, ...agentNames];
}
