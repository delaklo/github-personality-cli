import { ActivityStats, PersonalityProfile } from './interfaces.js';

interface ProfileDef {
  type: string;
  check: (stats: ActivityStats) => boolean;
  traits: string[];
}

export function generatePersonalityProfile(stats: ActivityStats): PersonalityProfile {
  const defs: ProfileDef[] = [
      {
        type: 'Night Coder',
        check: () => {
          const nightHours = [21, 22, 23, 0, 1, 2, 3, 4, 5];
          const nightActivity = nightHours.reduce((sum, hour) => sum + (stats.timeDistribution[hour] || 0), 0);
          return nightActivity / stats.totalEvents > 0.3;
        },
        traits: ['Night owl', 'Coffee dependent', 'Deep focus sessions']
      },
      {
        type: 'PR Maestro',
        check: () => (stats.eventTypes['PullRequestEvent'] || 0) / stats.totalEvents > 0.25,
        traits: ['Collaboration expert', 'Code reviewer', 'Feature driver']
      },
      {
        type: 'Issue Hunter',
        check: () => (stats.eventTypes['IssuesEvent'] || 0) / stats.totalEvents > 0.2,
        traits: ['Bug tracker', 'Problem solver', 'Issue organizer']
      },
      {
        type: 'Star Gazer',
        check: () => (stats.eventTypes['WatchEvent'] || 0) / stats.totalEvents > 0.3,
        traits: ['Curator', 'Explorer', 'Knowledge seeker']
      },
      {
        type: 'Commit Machine',
        check: () => (stats.eventTypes['PushEvent'] || 0) / stats.totalEvents > 0.4,
        traits: ['Productive coder', 'Consistent contributor', 'Fast developer']
      },
      {
        type: 'Forking Enthusiast',
        check: () => (stats.eventTypes['ForkEvent'] || 0) / stats.totalEvents > 0.15,
        traits: ['Experimenter', 'Project explorer', 'Customizer']
      },
      {
        type: 'Morning Warrior',
        check: () => {
          const morningHours = [6, 7, 8, 9, 10];
          const morningActivity = morningHours.reduce((sum, hour) => sum + (stats.timeDistribution[hour] || 0), 0);
          return morningActivity / stats.totalEvents > 0.4;
        },
        traits: ['Early riser', 'Morning productivity', 'Day planner']
      },
      {
        type: 'Social Coder',
        check: () => {
          const socialEvents = ['IssueCommentEvent', 'PullRequestReviewEvent', 'IssuesEvent'];
          const socialActivity = socialEvents.reduce((sum, event) => sum + (stats.eventTypes[event] || 0), 0);
          return socialActivity / stats.totalEvents > 0.3;
        },
        traits: ['Community builder', 'Collaborator', 'Communicator']
      }
    ];
    

  const matches = defs.filter(d => d.check(stats));
  if (matches.length === 0) {
    return {
      primaryType: 'Balanced Developer',
      secondaryType: '',
      score: 0.5,
      traits: ['Balanced approach', 'Versatile', 'Adaptive']
    };
  }

  const scored = matches.map(d => ({
    ...d,
    score: calculateProfileScore(d.type, stats)
  })).sort((a, b) => b.score - a.score);

  return {
    primaryType: scored[0].type,
    secondaryType: scored[1]?.type || '',
    score: scored[0].score,
    traits: scored[0].traits
  };
}

function calculateProfileScore(type: string, stats: ActivityStats): number {
  switch (type) {
    case 'Night Coder': {
      const night = [21, 22, 23, 0, 1, 2, 3, 4, 5];
      return night.reduce((sum, h) => sum + (stats.timeDistribution[h] || 0), 0) / stats.totalEvents;
    }
    case 'PR Maestro':
        return (stats.eventTypes['PullRequestEvent'] || 0) / stats.totalEvents;
      case 'Issue Hunter':
        return (stats.eventTypes['IssuesEvent'] || 0) / stats.totalEvents;
      case 'Star Gazer':
        return (stats.eventTypes['WatchEvent'] || 0) / stats.totalEvents;
      case 'Commit Machine':
        return (stats.eventTypes['PushEvent'] || 0) / stats.totalEvents;
      case 'Forking Enthusiast':
        return (stats.eventTypes['ForkEvent'] || 0) / stats.totalEvents;
      default:
        return 0.5;
  }
}
