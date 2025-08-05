export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    display_login: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: any;
  public: boolean;
  created_at: string;
}

export interface ActivityStats {
  totalEvents: number;
  eventTypes: Record<string, number>;
  timeDistribution: Record<number, number>;
  repositories: Set<string>;
}

export interface PersonalityProfile {
  primaryType: string;
  secondaryType: string;
  score: number;
  traits: string[];
}
