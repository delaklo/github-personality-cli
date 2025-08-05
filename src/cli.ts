#!/usr/bin/env node
import { fetchUserActivity } from './api.js';
import { analyzeActivityStats } from './analyzer.js';
import { generatePersonalityProfile } from './personality.js';
import { renderPersonalityProfile } from './renderer.js';

async function run() {
  const [username] = process.argv.slice(2);
  if (!username) {
    console.error('Usage: TODO :)');
    process.exit(1);
  }

  try {
    console.log(`Fetching Github activity for user: ${username}...`);
    const events = await fetchUserActivity(username);
    if (events.length === 0) {
      console.log(`No recent activity found for user: ${username}`);
      return;
    }
    const stats = analyzeActivityStats(events);
    const profile = generatePersonalityProfile(stats);
    renderPersonalityProfile(profile, stats);
    /* 
    TODO
    console.log(`\nRecent Activity for ${username}:`);
    console.log('='.repeat(50));
    */
  } catch (err) {
    console.error('Error:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}


run();
