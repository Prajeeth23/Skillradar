export type MissionCategory = 'aptitude' | 'personality' | 'interest' | 'ei' | 'approach';

export type MissionType =
  | 'basic_choice'
  | 'pattern_grid'
  | 'workspace_builder'
  | 'internship_cards'
  | 'scenario'
  | 'budget_sim'
  | 'multi_step';

export interface AvatarOption {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  gradient: string;
  ring: string;
  initTraits: Record<string, number>;
}

export interface ChoiceOption {
  id: string;
  text: string;
  subtext?: string;
  traits?: Record<string, number>;
  highlight?: boolean;
}

export interface GridCell {
  shape: 'sq' | 'ci' | 'tr';
  n: number;
}

export interface GridChoice {
  id: string;
  shape: 'sq' | 'ci' | 'tr';
  n: number;
  correct: boolean;
}

export interface WorkspaceItem {
  id: string;
  label: string;
  icon: string;
  desc: string;
  traits: Record<string, number>;
}

export interface InternshipChoice {
  id: string;
  title: string;
  icon: string;
  desc: string;
  tags: string[];
  gradient: string;
  border: string;
  glow: string;
  traits: Record<string, number>;
}

export interface ScenarioBranch {
  title: string;
  narrative: string[];
  resolution: string;
  bonusTraits: Record<string, number>;
  bonusXP: number;
}

export interface ScenarioChoice {
  id: string;
  text: string;
  subtext: string;
  traits: Record<string, number>;
  response: string | null;
  branch: ScenarioBranch | null;
}

export interface ScenarioCharacter {
  name: string;
  role: string;
  avatar: string;
  message: string;
  context: string;
}

export interface BudgetCategory {
  id: string;
  label: string;
  icon: string;
  defaultPct: number;
}

export interface CrisisChoice {
  id: string;
  text: string;
  icon: string;
  subtext: string;
  traits: Record<string, number>;
}

export interface MultiStepChoice {
  text: string;
  subtext: string;
  traits: Record<string, number>;
}

export interface MultiStepStep {
  title: string;
  prompt: string;
  choices: MultiStepChoice[];
}

export interface Mission {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: MissionCategory;
  categoryLabel: string;
  xpReward: number;
  categoryColor: string;
  categoryBg: string;
  categoryBorder: string;
  categoryText: string;
  setup: string;
  imageUrl?: string;
  type: MissionType;

  // Type specific properties
  choices?: ChoiceOption[];
  grid?: (GridCell | null)[];
  choicesForGrid?: GridChoice[];
  hint?: string;

  maxSelections?: number;
  items?: WorkspaceItem[];

  internshipChoices?: InternshipChoice[];

  character?: ScenarioCharacter;
  scenarioChoices?: ScenarioChoice[];

  budget?: number;
  categories?: BudgetCategory[];
  crisisTitle?: string;
  crisisEvent?: string;
  crisisChoices?: CrisisChoice[];

  steps?: MultiStepStep[];
}

export interface CareerCluster {
  id: string;
  title: string;
  icon: string;
  color: string;
  gradient: string;
  desc: string;
  roles: string[];
  triggers: {
    primary: string[];
    secondary: string[];
  };
  matchPct?: number;
}
