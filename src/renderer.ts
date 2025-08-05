import { PersonalityProfile, ActivityStats } from './interfaces.js';

export function renderPersonalityProfile(profile: PersonalityProfile, stats: ActivityStats): void {
  console.log('\nDeveloper Personality Profile');
  console.log('='.repeat(50));
  console.log(`Primary Type: ${profile.primaryType}`);
  if (profile.secondaryType) console.log(`Secondary Type: ${profile.secondaryType}`);
  console.log(`Confidence: ${(profile.score * 100).toFixed(1)}%`);

  console.log('\nKey Traits:');
  profile.traits.forEach(t => console.log(`  - ${t}`));

  /* TODO
  console.log('\nActivity Breakdown:');
  */
}
