import { ModalContent } from "@/types";

export const modalContent: ModalContent = {
  header: {
    title: "Welcome to Zooch IG Connections Analyzer!",
    subtitle: "Everything is processed locally - your data never leaves your browser",
  },
  privacyNotice: {
    title: "100% Private & Secure",
    description:
      "Your Instagram data is processed entirely in your browser. Your data is never sent to a server.",
  },
  instructions: {
    title: "How to get your Instagram data:",
    steps: [
      {
        id: 1,
        title: "Open Instagram Settings",
        description:
          "Go to your Instagram profile → Open settings by clicking the hamburger icon (≡).",
      },
      {
        id: 2,
        title: "Navigate to Account Center",
        description: 'Click "Account Center" in the settings menu.',
      },
      {
        id: 3,
        title: "Navigate to Your Information and Permissions",
        description: 'Under "Account Settings", select "Your Information and Permissions".',
      },
      {
        id: 4,
        title: "Export Your Information",
        description: 'Click on "Export your information" and select "Export to device".',
      },
      {
        id: 5,
        title: "Configure Your Export",
        description:
          "Ensure you have the following options: Customize information (Follower and Following), Data Range (All Time), Format (JSON), Media Quality (Lower).",
      },
      {
        id: 6,
        title: "Upload the ZIP File",
        description:
          "Once downloaded, simply upload the entire ZIP file to this analyzer. It will automatically find and extract the followers_1.json and following.json files.",
      },
    ],
  },
  warning: {
    title: "Important Note",
    description:
      "Usually it takes Instagram a couple of minutes to gather your information depending on how much data they have. You'll receive an email when it's ready to download.",
  },
  buttons: {
    waiting: "Please wait",
    ready: "Got it, let's start!",
  },
};
