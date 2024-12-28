import { createAgent, allAgents, Agent } from './agents/index.js';

const app = () => {
    const agent1 = new Agent('Agent 1', 1000);
    // const agent2 = new Agent('Agent 2', 2000);

    // const test = createAgent('Test');
    // agent1.performTask('Task 1');
    agent1.parseGitHubRepoLayout();
    // agent2.performTask('Task 2');

    // test.performTask('Test Task using a another exported method..');
    // console.log(agent1.getStatus());
    console.log('All Agenets ' + allAgents());
};

app();