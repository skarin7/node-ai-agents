import axios from 'axios';
import {load} from 'cheerio';

export default class GitHubParser {
    
    constructor(apiUrl, repoOwner, repoSlug) {
        this.apiUrl = apiUrl;
        this.repoOwner = repoOwner;
        this.repoSlug = repoSlug;
    }
    
    async  fetchGitHubRepoLayout() {
        const apiUrl = this.apiUrl || `https://github.com/paypal/junodb`;
    
            try {
                const response = await axios.get(this.repoUrl);
                const html = response.data;
                const $ = cheerio.load(html);
                const files = [];
    
                $('tr.react-directory-row').each((index, element) => {
                    const filePath = $(element).find('a').attr('title');
                    if (filePath) {
                        files.push(filePath);
                    }
                });
    
                console.log(`Project layout for ${this.repoUrl}:`);
                files.forEach(file => {
                    console.log(file);
                });
            } catch (error) {
                console.error('Error fetching repository layout:', error);
            }
        }
    }
