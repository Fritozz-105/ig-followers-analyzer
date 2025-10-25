export interface InstagramDataItem {
  title: string;
  media_list_data?: Array<{
    id?: string;
    type?: string;
    url?: string;
  }>;
  string_list_data: Array<{
    href: string;
    value?: string; // Optional because following.json doesn't have it
    timestamp: number;
  }>;
}

export interface InstagramFollowingData {
  relationships_following: InstagramDataItem[];
}

export interface FileUploadProps {
  onDataParsed: (data: { followers: string[]; following: string[] }) => void;
}

export interface FollowerResultsProps {
  followers: string[];
  following: string[];
  onReset: () => void;
}

export interface InstructionStep {
  id: number;
  title: string;
  description: string;
  codeSnippets?: string[];
}

export interface SimplifiedStep {
  id: number;
  title: string;
  description: string;
}

export interface ModalContent {
  header: {
    title: string;
    subtitle: string;
  };
  privacyNotice: {
    title: string;
    description: string;
  };
  instructions: {
    title: string;
    steps: InstructionStep[];
  };
  warning: {
    title: string;
    description: string;
  };
  buttons: {
    waiting: string;
    ready: string;
  };
}
