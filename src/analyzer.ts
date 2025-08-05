import { GitHubEvent, ActivityStats } from './interfaces.js';

export function analyzeActivityStats(events: GitHubEvent[]): ActivityStats {
  const stats: ActivityStats = {
    totalEvents: events.length,
    eventTypes: {},
    timeDistribution: {},
    repositories: new Set(),
  };

  events.forEach(e => {
    stats.eventTypes[e.type] = (stats.eventTypes[e.type] || 0) + 1;
    stats.repositories.add(e.repo.name);

    const hour = new Date(e.created_at).getHours();
    stats.timeDistribution[hour] = (stats.timeDistribution[hour] || 0) + 1;
  });

  return stats;
}
