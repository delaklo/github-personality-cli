/* 
   Github REST API 
*/

import * as https from 'https';
import { URL } from 'url';
import { GitHubEvent } from './interfaces.js';

const BASE_URL = 'https://api.github.com';

export async function fetchUserActivity(username: string): Promise<GitHubEvent[]> {
  const url = new URL(`/users/${username}/events`, BASE_URL);

  return new Promise((resolve, reject) => {
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'GET',
      headers: {
        'User-Agent': 'github-personality-cli',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data) as GitHubEvent[]);
          } else if (res.statusCode === 404) {
            reject(new Error(`User '${username}' not found`));
          } else {
            reject(new Error(`Github API returned status ${res.statusCode}`));
          }
        } catch {
          reject(new Error('Failed to parse Github API response'));
        }
      });
    });

    req.on('error', err => reject(new Error(`Network error: ${err.message}`)));
    req.end();
  });
}
