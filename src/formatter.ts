import { GitHubEvent } from './interfaces.js';

export function formatActivity(event: GitHubEvent): string {
  const repo = event.repo.name;
  const p = event.payload as any;

  switch (event.type) {
    case 'PushEvent': {
      const count = p.commits?.length || 0;
      return `- Pushed ${count} commit${count !== 1 ? 's' : ''} to ${repo}`;
    }


    case 'IssuesEvent': {
      const action = p.action === 'opened' ? 'Opened'
                    : p.action === 'closed' ? 'Closed'
                    : 'Updated';
      return `- ${action} issue #${p.issue?.number} in ${repo}`;
    }


    case 'PullRequestEvent': {
      const action = p.action === 'opened' ? 'Opened'
                    : p.action === 'closed' ? 'Closed'
                    : 'Updated';
      return `- ${action} pull request #${p.pull_request?.number} in ${repo}`;
    }


    case 'WatchEvent':
      return `- Starred ${repo}`;


    case 'ForkEvent':
      return `- Forked ${repo}`;


    case 'CreateEvent': {


      const type = p.ref_type;
      if (type === 'repository') {
        return `- Created repository ${repo}`;
      }
      return `- Created ${type}${p.ref ? ` ${p.ref}` : ''} in ${repo}`;
    }


    case 'IssueCommentEvent':
      return `- Commented on issue #${p.issue?.number} in ${repo}`;

    case 'PullRequestReviewEvent':
      return `- Reviewed pull request #${p.pull_request?.number} in ${repo}`;




    default:
      return `- ${event.type.replace('Event', '')} in ${repo}`;
  }
}
